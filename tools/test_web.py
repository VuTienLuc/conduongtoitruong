#!/usr/bin/env python3
"""Kiểm thử giao diện thật bằng trình duyệt (Playwright):  python3 tools/test_web.py
- Điện thoại 390×844 và iPad 820×1180: mọi chủ đề × 6 tab không lỗi JS, không lỗi công thức (mjx-merror),
  không còn mã LaTeX thô, không cuộn ngang.
- Trắc nghiệm chấm đúng và lưu điểm; bài mẫu hiện từng bước đến hết; prompt đủ đề + đáp án, đổi \\( \\) thành $.
- Phiếu in: xuất PDF A4 thật, đếm trang (phiếu làm bài 2 trang; kèm mẫu và đáp án thì thêm trang)."""
import asyncio, functools, http.server, os, re, socketserver, sys, threading
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TABS = ['lt', 'meo', 'hieu', 'mau', 'phieu', 'ai']
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
            n = await pg.locator('.tcard').count()
            if n != len(ids): fails.append(f'{name}: trang chủ có {n} thẻ, cần {len(ids)}')
            routes = ['#/', '#/lo-trinh'] + [f'#/cd/{i}/{t}' for i in ids for t in TABS]
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
        if errs: fails.append(f'lỗi JS: {errs[:3]}')
        await b.close()
    srv.shutdown()
    if fails:
        print('\n'.join('✗ ' + f for f in fails)); print(f'KẾT QUẢ: CHƯA ĐẠT ✗ ({len(fails)} lỗi)'); sys.exit(1)
    print('KẾT QUẢ: ĐẠT ✓')

asyncio.run(main())
