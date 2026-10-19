#!/usr/bin/env python3
"""Xuất bộ đề luyện vào 10 thành tệp PDF A4: de-luyen/<mã chủ đề>/De-01.pdf … De-10.pdf
(trang 1: đề + khung ô li; [trang Gợi ý từng nấc nếu đề có]; trang cuối: đáp án – hướng dẫn chấm).
Bộ có Thẻ công cụ: thêm de-luyen/the-cong-cu-hinh-hoc.pdf (1 trang).
Chạy: python3 tools/xuat-de-pdf.py [mã chủ đề …]   (cần Playwright + Chromium; tự mở máy chủ tĩnh tạm).
Kiểm tra luôn: mỗi tệp đúng số trang (2, hoặc 3 nếu có gợi ý), không lỗi công thức (mjx-merror)."""
import asyncio, os, re, sys, threading, functools, http.server, socketserver
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'de-luyen')


def serve():
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Q, directory=ROOT)
    srv = socketserver.TCPServer(('127.0.0.1', 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def pages(path):
    data = open(path, 'rb').read()
    return len(re.findall(rb'/Type\s*/Page[^s]', data))


async def main(only):
    srv = serve(); base = f'http://127.0.0.1:{srv.server_address[1]}/index.html'
    fails = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page()
        await pg.goto(base + '#/vao-10'); await pg.wait_for_timeout(800)
        ids = await pg.evaluate('LuyenDe.ids()'); the_done = False
        for tid in ids:
            if only and tid not in only: continue
            n = await pg.evaluate(f"LuyenDe.get('{tid}').de.length")
            os.makedirs(os.path.join(OUT, tid), exist_ok=True)
            for k in range(1, n + 1):
                await pg.evaluate('''([id, k]) => { let r = document.getElementById('print-root');
                    if (!r) { r = document.createElement('div'); r.id = 'print-root'; document.body.appendChild(r); }
                    r.innerHTML = LuyenDe.sheetHTML(Topics.get(id), { key: true }, [k]); document.body.classList.add('printing'); }''', [tid, k])
                await pg.evaluate("MathTS.done(document.getElementById('print-root'))")
                if await pg.locator('#print-root mjx-merror').count(): fails.append(f'{tid} đề {k}: lỗi công thức')
                f = os.path.join(OUT, tid, f'De-{k:02d}.pdf')
                await pg.pdf(path=f, format='A4', prefer_css_page_size=True, print_background=True)
                np_, want = pages(f), await pg.evaluate(f"LuyenDe.pages(LuyenDe.get('{tid}'), {k}, {{ key: true }})")
                if np_ != want: fails.append(f'{tid} đề {k}: {np_} trang (cần {want}: đề{" + gợi ý" if want == 3 else ""} + đáp án)')
            print(f'{tid}: đã xuất {n} tệp PDF vào de-luyen/{tid}/')
            if await pg.evaluate(f"!!LuyenDe.get('{tid}').the") and not the_done:
                await pg.evaluate(f"document.getElementById('print-root').innerHTML = LuyenDe.theHTML(Topics.get('{tid}'))")
                await pg.evaluate("MathTS.done(document.getElementById('print-root'))")
                f = os.path.join(OUT, 'the-cong-cu-hinh-hoc.pdf')
                await pg.pdf(path=f, format='A4', prefer_css_page_size=True, print_background=True)
                if pages(f) != 1: fails.append(f'Thẻ công cụ: {pages(f)} trang (cần 1)')
                the_done = True; print('Thẻ công cụ: de-luyen/the-cong-cu-hinh-hoc.pdf')
        await b.close()
    srv.shutdown()
    for x in fails: print('✗', x)
    print('KẾT QUẢ:', 'CHƯA ĐẠT ✗' if fails else 'ĐẠT ✓')
    return 1 if fails else 0


if __name__ == '__main__':
    raise SystemExit(asyncio.run(main(set(sys.argv[1:]))))
