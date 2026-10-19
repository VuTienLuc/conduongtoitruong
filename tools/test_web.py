#!/usr/bin/env python3
"""Kiểm thử giao diện thật bằng trình duyệt (Playwright):  python3 tools/test_web.py
- Điện thoại 390×844 và iPad 820×1180: mọi chủ đề × 7 tab (kể cả từng đề luyện) không lỗi JS, không lỗi công thức (mjx-merror),
  không còn mã LaTeX thô, không cuộn ngang.
- Trắc nghiệm chấm đúng và lưu điểm; bài mẫu hiện từng bước đến hết; prompt đủ đề + đáp án, đổi \\( \\) thành $.
- Phiếu in: xuất PDF A4 thật, đếm trang (phiếu làm bài 2 trang; kèm mẫu và đáp án thì thêm trang)."""
import asyncio, functools, http.server, os, re, socketserver, sys, threading
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TABS = ['lt', 'meo', 'hieu', 'mau', 'phieu', 'de', 'ai']
OUT = os.environ.get('TEST_OUT', '/tmp')
fails = []


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Quiet, directory=ROOT)
    s = socketserver.TCPServer(('127.0.0.1', 0), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s, s.server_address[1]


def pdf_pages(path):
    data = open(path, 'rb').read()
    return len(re.findall(rb'/Type\s*/Page[^s]', data))


async def main():
    srv, port = serve()
    base = f'http://127.0.0.1:{port}/index.html'
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for vw, vh, name in [(390, 844, 'điện thoại'), (820, 1180, 'iPad')]:
            pg = await b.new_page(viewport={'width': vw, 'height': vh})
            errs = []
            pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(base + '#/')
            await pg.wait_for_function('window.MathJax && MathJax.typesetPromise')
            ids = await pg.evaluate('Topics.list.map(t => t.id)')
            await pg.goto(base + '#/vao-10'); await pg.wait_for_timeout(200)
            n = await pg.locator('.tcard').count()
            if n != len(ids): fails.append(f'{name}: trang chủ có {n} thẻ, cần {len(ids)}')
            vdc = await pg.evaluate("Vdc.list.map(t => [t.grade, t.id, Vdc.allBt(t).length])")
            routes = ['#/', '#/vao-10', '#/lo-trinh', '#/lop10', '#/lop11', '#/lop12'] + [f'#/cd/{i}/{t}' for i in ids for t in TABS]
            ld = await pg.evaluate("LuyenDe.ids().map(i => [i, LuyenDe.get(i).de.length])")
            routes += [f'#/cd/{i}/de/{k}' for i, n in ld for k in range(2, n + 1)]
            routes += [f'#/cd/{i}/de/{s}' for i in await pg.evaluate("LuyenDe.ids().filter(i => LuyenDe.get(i).the)") for s in ('the', 'tuduy')]
            routes += [r for g, i, nb in vdc for r in [f'#/{g}/{i}', f'#/{g}/{i}/phieu'] + [f'#/{g}/{i}/lg/{k}' for k in range(1, nb + 1)]]
            for r in routes:
                await pg.goto(base + r)
                await pg.wait_for_timeout(350)
                await pg.evaluate('MathTS.done(document.body)')
                bad = await pg.evaluate(r'''() => ({
                    merr: document.querySelectorAll('mjx-merror').length,
                    raw: /\\\(|\\\[/.test(document.querySelector('#view').innerText),
                    ow: document.documentElement.scrollWidth - innerWidth })''')
                if bad['merr']: fails.append(f'{name} {r}: {bad["merr"]} công thức lỗi')
                if bad['raw']: fails.append(f'{name} {r}: còn mã LaTeX thô')
                if bad['ow'] > 1: fails.append(f'{name} {r}: tràn ngang {bad["ow"]}px')
            if errs: fails.append(f'{name}: lỗi JS {errs[:3]}')
            print(f'{name}: đã mở {len(routes)} trang')
            await pg.close()

        pg = await b.new_page(viewport={'width': 820, 'height': 1180})
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(base + '#/')
        await pg.wait_for_function('window.MathJax && MathJax.typesetPromise')
        ids = await pg.evaluate('Topics.list.map(t => t.id)')
        # Luyện đề có gợi ý từng nấc: đề 1 mở được 3 nấc, đề cuối chỉ 1 nấc (giảm dần).
        for i in await pg.evaluate("LuyenDe.ids().filter(i => LuyenDe.get(i).de.some(d => d.goi))"):
            for k, want in ((1, 3), (await pg.evaluate(f"LuyenDe.get('{i}').de.length"), None)):
                await pg.goto(base + f'#/cd/{i}/de/{k}'); await pg.wait_for_timeout(200)
                if want is None: want = await pg.evaluate(f"(L => !L.giam ? 3 : {k} <= L.giam[0] ? 3 : {k} <= L.giam[1] ? 2 : 1)(LuyenDe.get('{i}'))")
                for _ in range(3):
                    if await pg.locator('#ldNext').is_enabled(): await pg.locator('#ldNext').click()
                got = await pg.locator('#ldNac .ld-nac').count()
                if got != want: fails.append(f'{i} đề {k}: mở được {got} nấc gợi ý, cần {want}')
        # Luyện tư duy: trả lời hết 6 câu (chọn công cụ đúng, xếp đúng thứ tự) → 6/6, lưu ngày luyện.
        for i in await pg.evaluate("LuyenDe.ids().filter(i => LuyenDe.get(i).the)"):
            await pg.evaluate("localStorage.removeItem((window.CONFIG && CONFIG.storeKey || 'vao10') + ':ld:tuduy')")
            await pg.goto(base + f'#/cd/{i}/de/tuduy'); await pg.wait_for_timeout(300)
            await pg.evaluate('''() => document.querySelectorAll('.td-card').forEach(c => {
                const cc = [...c.querySelectorAll('.td-opt')];
                if (cc.length) { const it = c.querySelector('.td-q'); cc[0].click(); return; }
                [...c.querySelectorAll('.td-step')].sort((a, b) => a.dataset.j - b.dataset.j).forEach(b => b.click()); })''')
            # câu chọn công cụ: bấm phương án đầu (có thể sai) – chỉ kiểm có phản hồi; câu sắp xếp phải đúng
            n_fb = await pg.locator('.td-fb p').count(); xep_ok = await pg.locator('.td-fb b', has_text='Đúng thứ tự').count()
            if n_fb < 6: fails.append(f'{i} luyện tư duy: chỉ {n_fb}/6 câu có phản hồi')
            if xep_ok != 2: fails.append(f'{i} luyện tư duy: câu sắp xếp đúng thứ tự nhưng chấm {xep_ok}/2')
            if not await pg.locator('#tdSum').is_visible(): fails.append(f'{i} luyện tư duy: không hiện tổng kết')
            if not await pg.evaluate("Object.keys(JSON.parse(localStorage.getItem((window.CONFIG && CONFIG.storeKey || 'vao10') + ':ld:tuduy')).days).length"): fails.append(f'{i} luyện tư duy: không lưu ngày luyện')
        for i in ids:
            # Trắc nghiệm: chọn phương án A mọi câu, điểm phải bằng số câu chọn đúng.
            await pg.goto(base + f'#/cd/{i}/hieu'); await pg.wait_for_timeout(200)
            cards = pg.locator('.qcard'); k = await cards.count()
            for j in range(k): await cards.nth(j).locator('.opt').first.click()
            right = await pg.locator('.qcard .opt.good[data-j="0"]').count()
            score = await pg.locator('.big-score').inner_text()
            if score != f'{right}/{k}': fails.append(f'{i}: điểm trắc nghiệm {score} ≠ {right}/{k}')
            saved = await pg.evaluate(f"JSON.parse(localStorage.getItem('vao10:p:{i}')).quiz")
            if saved < right: fails.append(f'{i}: không lưu điểm trắc nghiệm')
            # Bài mẫu: hiện từng bước tới hết.
            await pg.goto(base + f'#/cd/{i}/mau'); await pg.wait_for_timeout(200)
            for card in await pg.locator('.model').all():
                btn = card.locator('[data-act="one"]')
                for _ in range(40):
                    if await btn.is_disabled(): break
                    await btn.click()
                hid = await card.locator('.steps > li.hid').count()
                if hid: fails.append(f'{i}: bài mẫu còn {hid} bước bị ẩn')
            # Prompt.
            pr = await pg.evaluate(f"App.promptGrade(Topics.get('{i}'))")
            if '\\(' in pr or '<' in pr: fails.append(f'{i}: prompt còn \\( hoặc thẻ HTML')
            if pr.count('Bài ') < 6 or 'ĐÁP ÁN' not in pr: fails.append(f'{i}: prompt thiếu đề hoặc đáp án')
            # Phiếu in PDF.
            for opt, lim in [({'model': False, 'key': False}, 2), ({'model': True, 'key': True}, 6)]:
                await pg.evaluate('''([id, o]) => { let r = document.getElementById('print-root');
                    if (!r) { r = document.createElement('div'); r.id = 'print-root'; document.body.appendChild(r); }
                    r.innerHTML = App.sheetHTML(Topics.get(id), o); document.body.classList.add('printing'); }''', [i, opt])
                await pg.evaluate("MathTS.done(document.getElementById('print-root'))")
                pdf = os.path.join(OUT, f'phieu-{i}-{"du" if opt["model"] else "lam"}.pdf')
                await pg.pdf(path=pdf, format='A4', prefer_css_page_size=True, print_background=True)
                await pg.evaluate("document.body.classList.remove('printing'); document.getElementById('print-root').innerHTML=''")
                n = pdf_pages(pdf)
                tag = 'kèm mẫu + đáp án' if opt['model'] else 'phiếu làm bài'
                print(f'  {i}: {tag} = {n} trang')
                if n > lim: fails.append(f'{i}: {tag} {n} trang (tối đa {lim})')
        # Lớp 10–12: trang chủ đề (gợi ý, đáp số, ví dụ mẫu), phiếu PDF có QR giải mã được.
        import cv2, numpy as np
        vdc = await pg.evaluate("Vdc.list.map(t => [t.grade, t.id, Vdc.allBt(t).length])")
        await pg.evaluate("CONFIG.siteUrl = 'https://vi-du.vercel.app/'")
        for g, i, nb in vdc:
            await pg.goto(base + f'#/{g}/{i}'); await pg.wait_for_timeout(250)
            card = pg.locator('.bt-card').first
            await card.locator('[data-show="hint"]').click()
            if not await card.locator('.hint').is_visible(): fails.append(f'{g}/{i}: nút Gợi ý không mở')
            for vd in await pg.locator('.vd-card').all():
                await vd.locator('[data-all]').click()
                if await vd.locator('.rv > li.hid').count(): fails.append(f'{g}/{i}: ví dụ mẫu còn bước ẩn')
            for opt in [{'vd': False, 'qr': True}, {'vd': True, 'qr': True}]:
                await pg.evaluate('''([g, id, o]) => { let r = document.getElementById('print-root');
                    if (!r) { r = document.createElement('div'); r.id = 'print-root'; document.body.appendChild(r); }
                    r.innerHTML = Vdc.sheetHTML(Vdc.get(g, id), o); document.body.classList.add('printing'); }''', [g, i, opt])
                await pg.evaluate("MathTS.done(document.getElementById('print-root'))")
                await pg.emulate_media(media='print')
                tran = await pg.evaluate('''() => [...document.querySelectorAll('#print-root mjx-container')].filter(c => {
                    const box = c.parentElement.closest('.sh-hint > div, .sh-de, li, p, td'); const m = c.firstElementChild;
                    return box && m && m.getBoundingClientRect().right > box.getBoundingClientRect().right + 2; }).map(c => c.closest('.sh-hint, .sh-q, .sh-vd, .sh-kt, li, p').textContent.slice(0, 50))''')
                await pg.emulate_media(media='screen')
                for t_ in tran: fails.append(f'{g}/{i}: công thức tràn khung trên phiếu – "{t_}"')
                qn = await pg.locator('#print-root .qr').count()
                if qn != nb: fails.append(f'{g}/{i}: phiếu có {qn} mã QR, cần {nb}')
                pdf = os.path.join(OUT, f'vdc-{g}-{i}-{"vd" if opt["vd"] else "lam"}.pdf')
                await pg.pdf(path=pdf, format='A4', prefer_css_page_size=True, print_background=True)
                print(f'  {g}/{i}: phiếu {"kèm ví dụ" if opt["vd"] else "luyện tập"} = {pdf_pages(pdf)} trang, {qn} QR')
                if not opt['vd']:
                    # Giải mã từng QR (chụp riêng từng mã) và so với đường link lời giải.
                    # Lấy đúng mã SVG in trên phiếu, vẽ to trên trang riêng rồi giải mã.
                    qrs = await pg.evaluate("[...document.querySelectorAll('#print-root .sh-qr svg')].map(e => e.outerHTML)")
                    det = cv2.QRCodeDetector()
                    qp = await b.new_page(viewport={'width': 400, 'height': 400})
                    for k, svg in enumerate(qrs, 1):
                        await qp.set_content('<body style="margin:0;background:#fff"><div id="q" style="width:320px;height:320px">' + svg.replace('<svg ', '<svg width="320" height="320" ', 1) + '</div></body>')
                        img = cv2.imdecode(np.frombuffer(await qp.locator('#q').screenshot(), np.uint8), cv2.IMREAD_COLOR)
                        img = cv2.copyMakeBorder(img, 40, 40, 40, 40, cv2.BORDER_CONSTANT, value=(255, 255, 255))
                        txt = det.detectAndDecode(img)[0]
                        want = f'https://vi-du.vercel.app/#/{g}/{i}/lg/{k}'
                        if txt != want: fails.append(f'{g}/{i}: QR bài {k} đọc được "{txt}", cần "{want}"')
                    await qp.close()
                    print(f'  {g}/{i}: đã giải mã {len(qrs)} mã QR')
                await pg.evaluate("document.body.classList.remove('printing'); document.getElementById('print-root').innerHTML=''")
        if errs: fails.append(f'lỗi JS: {errs[:3]}')
        await b.close()
    srv.shutdown()
    if fails:
        print('\n'.join('✗ ' + f for f in fails)); print(f'KẾT QUẢ: CHƯA ĐẠT ✗ ({len(fails)} lỗi)'); sys.exit(1)
    print('KẾT QUẢ: ĐẠT ✓')

asyncio.run(main())
