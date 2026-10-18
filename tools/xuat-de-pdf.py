#!/usr/bin/env python3
"""Xuất bộ đề luyện vào 10 thành tệp PDF A4: de-luyen/<mã chủ đề>/De-01.pdf … De-10.pdf
(trang 1: đề + khung ô li; trang 2: đáp án – hướng dẫn chấm).
Chạy: python3 tools/xuat-de-pdf.py [mã chủ đề …]   (cần Playwright + Chromium; tự mở máy chủ tĩnh tạm).
Kiểm tra luôn: mỗi tệp đúng 2 trang, không lỗi công thức (mjx-merror)."""
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
        ids = await pg.evaluate('LuyenDe.ids()')
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
                np_ = pages(f)
                if np_ != 2: fails.append(f'{tid} đề {k}: {np_} trang (cần 2: đề + đáp án)')
            print(f'{tid}: đã xuất {n} tệp PDF vào de-luyen/{tid}/')
        await b.close()
    srv.shutdown()
    for x in fails: print('✗', x)
    print('KẾT QUẢ:', 'CHƯA ĐẠT ✗' if fails else 'ĐẠT ✓')
    return 1 if fails else 0


if __name__ == '__main__':
    raise SystemExit(asyncio.run(main(set(sys.argv[1:]))))
