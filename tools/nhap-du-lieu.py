#!/usr/bin/env python3
"""Đưa dữ liệu AI xuất ra (Xưởng dữ liệu) vào hệ thống cho mọi học sinh.
Chạy: python3 tools/nhap-du-lieu.py
- Đọc mọi tệp nhap/*.json, *.md (Markdown chuẩn của phiếu ôn tập) hoặc .txt chứa nguyên câu trả lời của AI.
- Dùng đúng bộ đọc – kiểm của web (assets/js/nhap.js, chạy bằng node): sửa dấu \\ của công thức,
  bỏ số trích dẫn, kiểm trường và điểm. Tệp có lỗi thì bỏ qua và in lỗi.
- Tệp đạt → data/nhap/<tên>.js (gọi NhapDL.add) và tự thêm thẻ <script> vào index.html giữa
  hai dấu mốc <!-- nhap:dau --> … <!-- nhap:cuoi -->; tệp đã xoá khỏi nhap/ thì gỡ khỏi web.
- Cuối cùng chạy node tools/kiem-tra.js. Sau đó: xuất PDF (tools/xuat-de-pdf.py), build, commit, push."""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, OUT = os.path.join(ROOT, 'nhap'), os.path.join(ROOT, 'data', 'nhap')

NODE = r"""
const fs = require('fs'), vm = require('vm');
const ctx = { console }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(process.argv[1], 'utf8') + '\n;globalThis.NhapDL = NhapDL;', ctx);
const out = JSON.parse(fs.readFileSync(0, 'utf8')).map(([name, text]) => {
  try { const { data, notes } = ctx.NhapDL.parse(text); const r = ctx.NhapDL.check(data);
    return { name, ok: !r.errs.length, errs: r.errs, warns: r.warns, notes, ten: r.ten, data }; }
  catch (e) { return { name, ok: false, errs: [e.message], warns: [], notes: [] }; }
});
process.stdout.write(JSON.stringify(out));
"""


def main():
    os.makedirs(SRC, exist_ok=True); os.makedirs(OUT, exist_ok=True)
    files = sorted(f for f in os.listdir(SRC) if f.lower().endswith(('.json', '.txt', '.md')))
    if not files:
        print('Thư mục nhap/ trống. Tải "tệp chuẩn" ở Xưởng dữ liệu → Nhập dữ liệu rồi chép vào nhap/.')
    texts = [[f, open(os.path.join(SRC, f), encoding='utf-8').read()] for f in files]
    res = json.loads(subprocess.run(['node', '-e', NODE, os.path.join(ROOT, 'assets/js/nhap.js')], input=json.dumps(texts),
                                    capture_output=True, text=True, check=True).stdout) if texts else []
    keep, bad = [], 0
    for r in res:
        stem = re.sub(r'[^a-z0-9-]+', '-', os.path.splitext(r['name'])[0].lower()).strip('-')
        if not r['ok']:
            bad += 1; print(f"✗ {r['name']}: KHÔNG nhập"); [print('   - ' + e) for e in r['errs']]; continue
        js = f"data/nhap/{stem}.js"
        with open(os.path.join(ROOT, js), 'w', encoding='utf-8') as f:
            f.write(f"/* Nhập từ AI qua Xưởng dữ liệu: nhap/{r['name']} – {r['ten']}. Sửa nội dung thì sửa tệp trong nhap/ rồi chạy lại tools/nhap-du-lieu.py. */\n")
            f.write('NhapDL.add(' + json.dumps(r['data'], ensure_ascii=False, indent=1) + f", 'nhap/{r['name']}');\n")
        keep.append(js)
        print(f"✓ {r['name']} → {js} ({r['ten']})" + ''.join(f"\n   ! {w}" for w in r['warns']) + ''.join(f"\n   · {n}" for n in r['notes']))
    # gỡ tệp cũ không còn nguồn
    for f in os.listdir(OUT):
        p = f"data/nhap/{f}"
        if f.endswith('.js') and p not in keep:
            os.remove(os.path.join(ROOT, p)); print(f'– gỡ {p} (không còn trong nhap/)')
    idx = os.path.join(ROOT, 'index.html'); html = open(idx, encoding='utf-8').read()
    tags = ''.join(f'<script src="{p}"></script>\n' for p in sorted(keep))
    html2 = re.sub(r'(<!-- nhap:dau -->\n)[\s\S]*?(<!-- nhap:cuoi -->)', lambda m: m.group(1) + tags + m.group(2), html)
    if html2 != html:
        open(idx, 'w', encoding='utf-8').write(html2)
    print(f'Đã nhập {len(keep)} tệp' + (f', {bad} tệp lỗi (sửa bằng "Chép lệnh sửa" ở web)' if bad else '') + '. Kiểm tra toàn bộ:')
    k = subprocess.run(['node', os.path.join(ROOT, 'tools/kiem-tra.js')], capture_output=True, text=True)
    print('\n'.join(k.stdout.strip().split('\n')[-4:]))
    return 1 if (bad or k.returncode) else 0


if __name__ == '__main__':
    sys.exit(main())
