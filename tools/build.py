#!/usr/bin/env python3
"""Gộp cả thư mục thành MỘT tệp dist/toan-vao-10.html (gửi Zalo, đăng web, mở trực tiếp).
Bản gộp lấy MathJax từ CDN jsDelivr (cần mạng); bản thư mục dùng MathJax đặt sẵn, chạy không cần mạng.
Chạy: python3 tools/build.py"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CDN = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-chtml.js'


def read(p):
    with open(os.path.join(ROOT, p), encoding='utf-8') as f:
        return f.read()


html = read('index.html')
html = html.replace('<link rel="stylesheet" href="assets/css/style.css">', '<style>\n' + read('assets/css/style.css') + '\n</style>')


def inline(m):
    src = m.group(1)
    if 'vendor/mathjax' in src:
        return f'<script src="{CDN}" async></script>'
    code = read(src).replace('</script', '<\\/script')
    return f'<script>/* {src} */\n{code}\n</script>'


html = re.sub(r'<script src="([^"]+)"(?: async)?></script>', inline, html)
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
out = os.path.join(ROOT, 'dist', 'toan-vao-10.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Đã tạo {os.path.relpath(out, ROOT)} ({len(html.encode()) // 1024} KB)')
