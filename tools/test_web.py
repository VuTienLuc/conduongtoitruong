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
            routes += ['#/on-tap'] + [f'#/on-tap/{m}' for m in await pg.evaluate("OnTap.list().map(e => e.ma)")]
            routes += ['#/van-10', '#/van-10/phuong-phap', '#/xuong', '#/xuong/prompt', '#/xuong/nhap'] + [f'#/van-10/de/{m}' for m in await pg.evaluate("Van.list().map(e => e.ma)")]
            routes += [r for g, i, nb in vdc for r in [f'#/{g}/{i}', f'#/{g}/{i}/phieu'] + [f'#/{g}/{i}/lg/{k}' for k in range(1, nb + 1)]]
            routes += ['#/bai-hoc', '#/bai-hoc/9', '#/bai-hoc/10', '#/bai-hoc/11', '#/bai-hoc/12', '#/bai-hoc/10/2'] + [r for l, b in await pg.evaluate("BaiHoc.list().map(e => [e.lop, e.bai])") for r in (f'#/bai-hoc/{l}/{b}', f'#/bai-hoc/{l}/{b}/luyen')] + [f'#/bai-hoc/{k.replace("-", "/")}' for k in await pg.evaluate("Object.keys(BaiHoc.TN)")] + [f'#/bai-hoc/9/{b}{t}' for b in await pg.evaluate("Object.keys(BaiHoc.DUNG_9)") for t in ('', '/luyen')]
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
        # Xưởng dữ liệu: menu prompt ra đủ hướng dẫn và lệnh cho cả hai loại; nhập câu trả lời AI mẫu (lỗi dấu \, $…$, trích dẫn) → đúng mẫu, xem trước sạch.
        await pg.goto(base + '#/xuong/prompt'); await pg.wait_for_timeout(200)
        for loai in ('van', 'toan'):
            await pg.locator(f'[name=xLoai][value={loai}]').check(); await pg.wait_for_timeout(100)
            n = await pg.evaluate("[...document.querySelectorAll('#xOut textarea')].filter(t => t.value.length > 80).length")
            if n < 3: fails.append(f'menu prompt {loai}: chỉ có {n} ô prompt')
            if loai == 'van' and not await pg.evaluate("document.querySelector('#xHd').value.includes('truoc_1929')"): fails.append('hướng dẫn Gem Ngữ văn thiếu quy định ngữ liệu')
        mau = open(os.path.join(ROOT, 'docs/mau-nhap/toan-bai3-cau-tra-loi-ai.txt'), encoding='utf-8').read()
        await pg.goto(base + '#/xuong/nhap'); await pg.wait_for_timeout(200)
        await pg.fill('#nIn', mau); await pg.click('#nGo'); await pg.wait_for_timeout(500)
        await pg.evaluate("MathTS.done(document.getElementById('nOut'))")
        r = await pg.evaluate(r"({ ok: document.querySelectorAll('.xw-res.ok').length, merr: document.querySelectorAll('#nOut mjx-merror').length, pages: document.querySelectorAll('#nOut .sh-page').length, raw: /\\\(|\$/.test(document.querySelector('#nOut .paper-wrap').innerText) })")
        if r['ok'] != 1 or r['merr'] or r['pages'] < 4 or r['raw']: fails.append(f'nhập dữ liệu mẫu Toán: {r}')
        # Phiếu ôn tập 90 phút: menu prompt có lệnh JSON và Markdown kèm danh sách "Đã dùng"; nhập mẫu → lưu → mở phiếu;
        # nhập lại cùng bài với mã đợt 2 → cảnh báo TRÙNG; Markdown xuất ra đọc lại đúng.
        await pg.goto(base + '#/xuong/prompt'); await pg.wait_for_timeout(200)
        await pg.locator('[name=xLoai][value=ontap]').check(); await pg.select_option('#oBai', '3'); await pg.wait_for_timeout(150)
        for dd in ('json', 'md'):
            await pg.select_option('#oDd', dd); await pg.wait_for_timeout(150)
            ok = await pg.evaluate(f"document.querySelector('#xHd').value.includes('{'```markdown' if dd == 'md' else 'on_tap_toan'}') && document.querySelector('#xL0').value.includes('Đợt') && document.querySelector('#xHd').value.includes('KIẾN THỨC CẦN NHỚ') && document.querySelector('#xL0').value.includes('kiến thức cần nhớ')")
            if not ok: fails.append(f'menu prompt phiếu ôn tập ({dd}): thiếu hướng dẫn hoặc lệnh')
        mau = open(os.path.join(ROOT, 'docs/mau-nhap/on-tap-bai3-mau.txt'), encoding='utf-8').read()
        await pg.goto(base + '#/xuong/nhap'); await pg.wait_for_timeout(200)
        await pg.fill('#nIn', mau); await pg.click('#nGo'); await pg.wait_for_timeout(400)
        await pg.evaluate("MathTS.done(document.getElementById('nOut'))")
        r = await pg.evaluate("({ ok: document.querySelectorAll('.xw-res.ok').length, merr: document.querySelectorAll('#nOut mjx-merror').length, md: document.querySelectorAll('[data-md]').length })")
        if r != {'ok': 1, 'merr': 0, 'md': 1}: fails.append(f'nhập phiếu ôn tập mẫu: {r}')
        await pg.click('[data-save]'); await pg.wait_for_timeout(1800)
        if not await pg.locator('.ot-sheet').count(): fails.append('phiếu ôn tập vừa lưu không mở được')
        await pg.goto(base + '#/xuong/nhap'); await pg.wait_for_timeout(300)
        await pg.fill('#nIn', mau.replace('"ma":"OT-B3-01"', '"ma":"OT-B3-02"').replace('"dot":1', '"dot":2')); await pg.click('#nGo'); await pg.wait_for_timeout(400)
        if await pg.locator('.xw-warn li', has_text='TRÙNG').count() != 10: fails.append('nhập lại bài cũ: không cảnh báo trùng đợt trước')
        rt = await pg.evaluate("(() => { const e = OnTap.get('OT-B3-01'); const b = NhapDL.parse(OnTap.toMd(e)); const r = NhapDL.check(b.data); return [r.errs.length, r.n]; })()")
        if rt != [0, 10]: fails.append(f'Markdown phiếu ôn tập đọc lại sai: {rt}')
        await pg.evaluate("localStorage.removeItem((window.CONFIG && CONFIG.storeKey || 'vao10') + ':nhap:may')")
        # Bài giảng – luyện tập online: mục lục đủ bài, tìm bài; làm bài luyện tập → chấm đúng, lưu điểm; prompt và nhập loại bai_hoc.
        await pg.goto(base + '#/bai-hoc'); await pg.wait_for_timeout(200)
        if await pg.locator('.grade-card').count() != 4: fails.append('bài giảng: trang chọn lớp không đủ 4 lớp')
        for l, n in ((9, 32), (10, 27), (11, 33), (12, 19)):
            await pg.goto(base + f'#/bai-hoc/{l}'); await pg.wait_for_timeout(150)
            if await pg.locator('.bh-row').count() != n: fails.append(f'mục lục Toán {l}: {await pg.locator(".bh-row").count()} bài, cần {n}')
        await pg.fill('#bhFind', 'cuc tri'); await pg.wait_for_timeout(100)
        vis = await pg.evaluate("[...document.querySelectorAll('.bh-row')].filter(r => !r.hidden && r.closest('details') && !r.closest('details').hidden).map(r => r.querySelector('.bh-ten').textContent)")
        if not vis or not all('cực trị' in v for v in vis) or not any(v.startswith('Bài 1.') for v in vis): fails.append(f'mục lục Toán 12: tìm "cuc tri" ra {vis}')
        for l, bb in await pg.evaluate("BaiHoc.list().map(e => [e.lop, e.bai])"):
            await pg.evaluate(f"localStorage.removeItem((window.CONFIG && CONFIG.storeKey || 'vao10') + ':bh:{l}-{bb}')")
            await pg.goto(base + f'#/bai-hoc/{l}/{bb}/luyen'); await pg.wait_for_timeout(250)
            cards = pg.locator('.bh-q'); k = await cards.count()
            for q in range(k): await cards.nth(q).locator('.opt').first.click()
            tn_ok = await pg.locator('.bh-q .opt.good.bad').count()   # không thể vừa đúng vừa sai
            tn_right = await pg.evaluate("[...document.querySelectorAll('.bh-q')].filter(c => c.querySelector('.opt[data-j=\"0\"]').classList.contains('good')).length")
            dsv = await pg.evaluate(f"BaiHoc.get({l}, {bb}).ds.map(q => q.y.map(y => y[1]))")
            for q, ys in enumerate(dsv):
                card = pg.locator('.bh-dsq').nth(q)
                for jj, v in enumerate(ys): await card.locator(f'li[data-j="{jj}"] button[data-v="{1 if v else 0}"]').click()
                await card.locator('[data-chk]').click()
            ans = await pg.evaluate(f"BaiHoc.get({l}, {bb}).tln.map(q => q.ans)")
            for q, a_ in enumerate(ans):
                card = pg.locator('.bh-tl').nth(q)
                await card.locator('.bh-in').fill(a_.replace(',', '.') if q == 1 else ('-999' if q == len(ans) - 1 and len(ans) > 2 else a_))
                await card.locator('.bh-in').press('Enter')
            want = tn_right + 4 * len(dsv) + len(ans) - (1 if len(ans) > 2 else 0)
            got = await pg.locator('#bhScore .big-score').inner_text() if await pg.locator('#bhScore .big-score').count() else 'chưa xong'
            total = k + 4 * len(dsv) + len(ans)
            if tn_ok or got != f'{want}/{total}': fails.append(f'luyện tập Toán {l} bài {bb}: điểm {got}, cần {want}/{total}')
            saved = await pg.evaluate(f"JSON.parse(localStorage.getItem((window.CONFIG && CONFIG.storeKey || 'vao10') + ':bh:{l}-{bb}') || 'null')")
            if not saved or saved['best'] != want: fails.append(f'luyện tập Toán {l} bài {bb}: không lưu điểm ({saved})')
        # Bài lớp 9 dùng nội dung chủ đề ôn thi vào 10 (BaiHoc.DUNG_9): có bài giảng, liên kết đề luyện, trắc nghiệm chấm được.
        for so in await pg.evaluate("Object.keys(BaiHoc.DUNG_9).map(Number).filter(b => !BaiHoc.own(9, b))"):
            await pg.goto(base + f'#/bai-hoc/9/{so}'); await pg.wait_for_timeout(200)
            ok = await pg.evaluate("document.querySelectorAll('#pane .kt').length > 0 && !!document.querySelector('.bh-v10 a[href*=\"/de\"]')")
            await pg.goto(base + f'#/bai-hoc/9/{so}/luyen'); await pg.wait_for_timeout(200)
            n = await pg.locator('.bh-q').count()
            if n: await pg.locator('.bh-q').first.locator('.opt').first.click()
            if not ok or not n or await pg.locator('.bh-q .why:not([hidden])').count() != 1: fails.append(f'bài lớp 9 – Bài {so} (nội dung vào 10): thiếu bài giảng, liên kết đề luyện hoặc trắc nghiệm')
        # 📽️ Trình chiếu bài giảng – luyện tập: đi hết các trang, chữ vừa khung (không tràn), chọn đáp án, Esc thoát; đổi chữ cái trong lời giải thích
        dc = await pg.evaluate("BaiHoc.doiChu({ a: ['x', 'y', 'z', 'w'], goc: [3, 0, 1, 2], why: 'Phương án D sai; các phương án A, B và C đúng.' }, ['x', 'w', 'y', 'z'])")
        if dc != 'Phương án A sai; các phương án C, D và B đúng.': fails.append(f'đổi chữ cái lời giải thích: {dc}')
        for l, bb in [(10, 1), (9, 31)]:
            await pg.goto(base + f'#/bai-hoc/{l}/{bb}'); await pg.wait_for_timeout(300)
            await pg.click('#bhTC'); await pg.wait_for_timeout(400)
            n = int((await pg.locator('.tc-so').inner_text()).split('/')[1])
            tran = []
            for k in range(n * 6):
                await pg.evaluate("TrinhChieu.fit()")
                r = await pg.evaluate("(() => { const s = document.querySelector('.tc-slide'), i = s.querySelector('.tc-in'), c = getComputedStyle(s); return [document.querySelector('.tc-so').textContent, i.scrollHeight - (s.clientHeight - parseFloat(c.paddingTop) - parseFloat(c.paddingBottom)), parseFloat(i.style.fontSize)]; })()")
                if r[1] > 2 and r[2] > 12.5: tran.append(r)
                if r[0].startswith(f'{n} /'): break
                if await pg.locator('.tc-opt').count() and not await pg.locator('.tc-opt.good').count(): await pg.keyboard.press('a')
                else: await pg.keyboard.press('ArrowRight')
            f0 = await pg.evaluate("parseFloat(document.querySelector('.tc-in').style.fontSize)")
            await pg.keyboard.press('+'); await pg.keyboard.press('+'); f1 = await pg.evaluate("parseFloat(document.querySelector('.tc-in').style.fontSize)")
            await pg.keyboard.press('-'); await pg.keyboard.press('-'); await pg.keyboard.press('-'); f2 = await pg.evaluate("parseFloat(document.querySelector('.tc-in').style.fontSize)")
            await pg.keyboard.press('0'); f3 = await pg.evaluate("parseFloat(document.querySelector('.tc-in').style.fontSize)")
            if not (f1 > f0 * 1.15 and f2 < f0 * 0.95 and abs(f3 - f0) < 0.6): fails.append(f'trình chiếu cỡ chữ +/-: {f0, f1, f2, f3}')
            last = await pg.locator('.tc-so').inner_text(); good = await pg.evaluate("TrinhChieu.dung(BaiHoc.get(%d, %d)).filter(d => d.loai === 'tn').length" % (l, bb))
            await pg.keyboard.press('Escape'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(200)
            if not last.startswith(f'{n} /') or tran or not good or await pg.locator('.tc-root').count(): fails.append(f'trình chiếu Toán {l} bài {bb}: {last}, tràn {tran[:3]}, còn mở {await pg.locator(".tc-root").count()}')
        # 🖨️ Phiếu làm bài: có đủ câu, phương án đảo theo mã đề, đáp án khớp phương án đúng, không lỗi công thức
        for l, bb in await pg.evaluate("BaiHoc.list().map(e => [e.lop, e.bai]).concat([[9, 31]])"):
            await pg.goto(base + f'#/bai-hoc/{l}/{bb}/phieu'); await pg.wait_for_timeout(300)
            await pg.check('#pDa'); await pg.wait_for_timeout(300); await pg.evaluate("MathTS.done(document.getElementById('paper'))")
            r = await pg.evaluate("""(([l, b]) => { const e = BaiHoc.get(l, b), d1 = BaiHoc.phieuData(e, 1), d2 = BaiHoc.phieuData(e, 2);
              const p = document.getElementById('paper'); return { trang: p.querySelectorAll('.sh-page').length, cau: p.querySelectorAll('.sh-q').length, n: e.tn.length + e.ds.length + e.tln.length,
                dung: d1.every(x => x.opts[x.good] === x.q.a[0]), khac: d1.some((x, i) => x.opts.join() !== d2[i].opts.join()), on: d1.every((x, i) => x.opts.join() === BaiHoc.phieuData(e, 1)[i].opts.join()),
                loi: p.querySelectorAll('mjx-merror').length }; })""", [l, bb])
            if r['trang'] != 2 or r['cau'] != r['n'] or not r['dung'] or not r['khac'] or not r['on'] or r['loi']: fails.append(f'phiếu làm bài Toán {l} bài {bb}: {r}')
        # Công cụ ⭐/🖼️ tự bật toàn màn hình trong lúc trình chiếu: không được đóng trình chiếu, không về trang đầu; mở lại chiếu tiếp đúng trang
        async def fs_page(route): await route.fulfill(status=200, content_type='text/html; charset=utf-8', body='<html><body style="margin:0;height:100vh;display:grid;place-items:center"><button id="fs" onclick="document.documentElement.requestFullscreen().catch(() => document.title = `bi-chan`)">FS</button></body></html>')
        await pg.route(await pg.evaluate("new URL(CONFIG.congCuTrinhChieu[0].url).origin") + '/**', fs_page)
        st = "(() => [document.querySelectorAll('.tc-root').length, document.querySelector('.tc-so') && document.querySelector('.tc-so').textContent])()"
        await pg.goto(base + '#/bai-hoc/10/1'); await pg.wait_for_timeout(300); await pg.evaluate("localStorage.removeItem((CONFIG.storeKey || 'vao10') + ':tc:vitri')")
        await pg.click('#bhTC'); await pg.wait_for_timeout(300)
        for _ in range(4): await pg.keyboard.press('ArrowRight')
        a0 = await pg.evaluate(st)
        await pg.click('.tc-root .bh-cc-fab'); await pg.click('.tc-root .bh-cc-ic[data-i="0"]'); await pg.wait_for_timeout(400); await pg.click('.tc-root .bh-cc-bar [data-m="full"]')
        await pg.frame_locator('.tc-root .bh-cc-pane iframe').first.locator('#fs').click(); await pg.wait_for_timeout(300); a1 = await pg.evaluate(st)
        # trang công cụ không được tự bật toàn màn hình (bị chặn) → trình chiếu vẫn giữ nguyên, nút ◧ ▁ vẫn thấy
        a2 = await pg.evaluate(st); a2b = await pg.frame_locator('.tc-root .bh-cc-pane iframe').first.locator('title').text_content(); vis_bar = await pg.locator('.tc-root .bh-cc-bar [data-m="half"]').is_visible()
        if a2b != 'bi-chan' or not vis_bar: fails.append(f'công cụ tự bật toàn màn hình phải bị chặn: {a2b, vis_bar}')
        await pg.evaluate("TrinhChieu.dong()"); await pg.click('#bhTC'); await pg.wait_for_timeout(300); a3 = await pg.evaluate(st)
        # Phím O: mở nhanh ⭐ (nửa màn hình), O lần nữa thu gọn, O lần ba mở lại; trang trình chiếu không đổi
        mo = "(() => document.querySelector('.tc-root .bh-cc').dataset.mode)()"
        await pg.keyboard.press('o'); o1 = await pg.evaluate(mo); await pg.keyboard.press('O'); o2 = await pg.evaluate(mo)
        await pg.keyboard.press('o'); o3 = await pg.evaluate(mo); o4 = await pg.evaluate(st)
        # bấm vào trong trang công cụ (focus sang trang khác nguồn) rồi đưa chuột về bài giảng → O vẫn thu gọn được
        await pg.frame_locator('.tc-root .bh-cc-pane iframe').first.locator('body').click(position={'x': 5, 'y': 5})
        vp = pg.viewport_size; await pg.mouse.move(vp['width'] * 0.2, vp['height'] * 0.5); await pg.mouse.move(vp['width'] * 0.25, vp['height'] * 0.5)
        await pg.keyboard.press('o'); o5 = await pg.evaluate(mo)
        # mở bằng chuột (biểu tượng ⭐) rồi bấm O là thu gọn; công cụ không được tự bật toàn màn hình (mất nút ◧ ▁)
        await pg.click('.tc-root .bh-cc-fab'); await pg.click('.tc-root .bh-cc-ic[data-i="0"]'); await pg.keyboard.press('o'); o6 = await pg.evaluate(mo)
        o7 = await pg.evaluate("[...document.querySelectorAll('.bh-cc-pane iframe')].some(f => f.hasAttribute('allowfullscreen') || /fullscreen/.test(f.allow))")
        if o5 != 'min' or o6 != 'min' or o7: fails.append(f'phím O sau khi bấm vào công cụ / mở bằng chuột: {o5, o6, o7}')
        await pg.evaluate("TrinhChieu.dong()")
        if not (a0 == a1 == a2 == a3 and a0[0] == 1): fails.append(f'trình chiếu + công cụ toàn màn hình: {a0, a1, a2, a3}')
        if (o1, o2, o3, o4) != ('full', 'min', 'full', a3) and (o1, o2, o3) != ('half', 'min', 'half'): fails.append(f'phím O trong trình chiếu: {o1, o2, o3, o4}')
        # Trình chiếu gắn vào bài (tuong-tac/): khung 16:9 nạp được trang, có các slide, không lỗi JS bên trong.
        for (l, bb) in await pg.evaluate("Object.keys(BaiHoc.TN).map(k => k.split('-').map(Number))"):
            await pg.goto(base + f'#/bai-hoc/{l}/{bb}'); await pg.wait_for_timeout(1500)
            fr = pg.frame_locator('.bh-frame iframe').first
            n = await fr.locator('.slide').count() if await pg.locator('.bh-frame iframe').count() else 0
            box = await pg.locator('.bh-frame').first.bounding_box() if n else None
            if not n or not box or abs(box['width'] / box['height'] - 16 / 9) > 0.05: fails.append(f'trình chiếu Toán {l} bài {bb}: không nạp được ({n} slide, khung {box})')
        # Bộ công cụ mở nhanh khi trình chiếu toàn màn hình (CONFIG.congCuTrinhChieu): ẩn khi chưa toàn màn hình; biểu tượng mờ → chọn → nửa / cả màn hình / thu gọn / đóng
        if await pg.evaluate("Object.keys(BaiHoc.TN).length && (CONFIG.congCuTrinhChieu || []).length"):
            async def gia_lap(route): await route.fulfill(status=200, content_type='text/html; charset=utf-8', body='<html><body>cong cu</body></html>')
            for x in await pg.evaluate("CONFIG.congCuTrinhChieu.map(x => new URL(x.url).origin)"): await pg.route(x + '/**', gia_lap)
            l, bb = (await pg.evaluate("Object.keys(BaiHoc.TN)[0]")).split('-')
            await pg.goto(base + f'#/bai-hoc/{l}/{bb}'); await pg.wait_for_timeout(500)
            st = "(() => { const fr = document.querySelector('.bh-frame'), cc = fr.querySelector('.bh-cc'), pn = cc.querySelector('.bh-cc-pane'); return [fr.classList.contains('is-full'), cc.dataset.mode, Math.round(pn.getBoundingClientRect().width / fr.getBoundingClientRect().width * 100), Math.round(fr.querySelector(':scope > iframe').getBoundingClientRect().width / fr.getBoundingClientRect().width * 100)]; })()"
            r0 = await pg.locator('.bh-cc').first.is_visible()
            await pg.click('[data-fs="0"]'); await pg.wait_for_timeout(500)
            r1 = await pg.evaluate(st); vis = await pg.locator('.bh-cc-fab').first.is_visible()
            await pg.click('.bh-cc-fab'); n_ic = await pg.locator('.bh-cc-ic:visible').count(); txt = await pg.locator('.bh-cc-menu').first.inner_text()
            await pg.locator('.bh-cc-ic').first.click(); await pg.wait_for_timeout(300); r2 = await pg.evaluate(st)
            await pg.click('.bh-cc-bar [data-m="full"]'); r3 = await pg.evaluate(st)
            await pg.click('.bh-cc-bar [data-m="min"]'); r4 = await pg.evaluate(st)
            # phím O khi focus nằm trong trang bài giảng HTML: thu gọn ↔ mở lại (chế độ lần trước: cả màn hình)
            await pg.frame_locator('.bh-frame > iframe').first.locator('body').press('o'); r5 = await pg.evaluate(st)
            await pg.frame_locator('.bh-frame > iframe').first.locator('body').press('o'); r6 = await pg.evaluate(st)
            if r5[1] != 'full' or r6[1] != 'min': fails.append(f'phím O trong bài giảng HTML: {r5, r6}')
            await pg.evaluate("document.exitFullscreen && document.fullscreenElement && document.exitFullscreen()"); await pg.wait_for_timeout(300)
            want_ic = await pg.evaluate("CONFIG.congCuTrinhChieu.length")
            if r0 or not vis or r1[:2] != [True, ''] or n_ic != want_ic or 'vercel' in txt.lower() or r2[1:] != ['half', 50, 50] or r3[1:3] != ['full', 100] or r4[1] != 'min':
                fails.append(f'công cụ trình chiếu: {r0, vis, r1, n_ic, txt, r2, r3, r4}')
        await pg.goto(base + '#/xuong/prompt'); await pg.wait_for_timeout(200)
        await pg.locator('[name=xLoai][value=baihoc]').check(); await pg.select_option('#bLop', '10'); await pg.wait_for_timeout(100); await pg.select_option('#bBai', '1'); await pg.wait_for_timeout(150)
        ok = await pg.evaluate("document.querySelector('#xHd').value.includes('bai_hoc') && document.querySelector('#xHd').value.includes('can_nho') && document.querySelector('#xL0').value.includes('Bài 1. Mệnh đề') && document.querySelector('#xL0').value.includes('đã có trên web')")
        if not ok: fails.append('menu prompt bài giảng: thiếu hướng dẫn hoặc lệnh')
        mau = open(os.path.join(ROOT, 'nhap/bai-hoc-l10-b01.json'), encoding='utf-8').read()
        await pg.goto(base + '#/xuong/nhap'); await pg.wait_for_timeout(200)
        await pg.fill('#nIn', mau.replace('"bai": 1,', '"bai": 2,')); await pg.click('#nGo'); await pg.wait_for_timeout(400)
        await pg.evaluate("MathTS.done(document.getElementById('nOut'))")
        r = await pg.evaluate("({ ok: document.querySelectorAll('.xw-res.ok').length, merr: document.querySelectorAll('#nOut mjx-merror').length, warn: [...document.querySelectorAll('.xw-warn li')].some(li => li.textContent.includes('ten_bai')) })")
        if r != {'ok': 1, 'merr': 0, 'warn': True}: fails.append(f'nhập bài giảng mẫu: {r}')
        await pg.fill('#nIn', mau.replace('"bai": 1,', '"bai": 40,')); await pg.click('#nGo'); await pg.wait_for_timeout(300)
        if not await pg.locator('.xw-err li', has_text='không có Bài 40').count(): fails.append('nhập bài giảng: không báo lỗi số bài ngoài mục lục')
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
