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
const ctx = { console, window: {} }; vm.createContext(ctx);
// cùng thứ tự với index.html: core (U) → baihoc + mục lục SGK (để kiểm số bài) → nhap
const R = process.argv[1].replace(/assets\/js\/nhap\.js$/, '');
['assets/js/core.js', 'assets/js/baihoc.js', 'data/bai-hoc/muc-luc-kntt.js', 'assets/js/sotay.js'].forEach(f => vm.runInContext(fs.readFileSync(R + f, 'utf8'), ctx));
vm.runInContext(fs.readFileSync(process.argv[1], 'utf8') + '\n;globalThis.NhapDL = NhapDL;', ctx);
const BH = vm.runInContext('BaiHoc', ctx), ST = vm.runInContext('SoTay', ctx);
const out = JSON.parse(fs.readFileSync(0, 'utf8')).map(([name, text]) => {
  try { const { data, notes } = ctx.NhapDL.parse(text); const r = ctx.NhapDL.check(data);
    // bài giảng trùng lớp + bài với tệp trước → Bộ 2, 3… (giữ bài giảng tệp đầu), báo số câu thêm / bỏ vì trùng
    let ghep = null; try { if (!r.errs.length && r.loai === 'bai_hoc') ghep = BH.add(ctx.NhapDL.bhEntry(data, 'he-thong'));
      if (!r.errs.length && r.loai === 'so_tay_toan') ghep = { sotay: 1, ...ST.add(ctx.NhapDL.soTayEntry(data, 'he-thong')) }; } catch (e) { ghep = null; }
    return { name, ok: !r.errs.length, errs: r.errs, warns: r.warns, notes, ten: r.ten, data, ghep }; }
  catch (e) { return { name, ok: false, errs: [e.message], warns: [], notes: [] }; }
});
process.stdout.write(JSON.stringify(out));
"""


def main():
    os.makedirs(SRC, exist_ok=True); os.makedirs(OUT, exist_ok=True)
    # tệp gốc trước tệp -bo2, -bo3 (bai-hoc-l10-b01.json trước bai-hoc-l10-b01-bo2.json): bỏ đuôi rồi mới xếp
    files = sorted((f for f in os.listdir(SRC) if f.lower().endswith(('.json', '.txt', '.md'))), key=lambda f: os.path.splitext(f)[0])
    if not files:
        print('Thư mục nhap/ trống. Tải "tệp chuẩn" ở Xưởng dữ liệu → Nhập dữ liệu rồi chép vào nhap/.')
    texts = [[f, open(os.path.join(SRC, f), encoding='utf-8').read()] for f in files]
    res = json.loads(subprocess.run(['node', '-e', NODE, os.path.join(ROOT, 'assets/js/nhap.js')], input=json.dumps(texts),
                                    capture_output=True, text=True, check=True).stdout) if texts else []
    keep, bad = [], 0
    for r in res:
        stem = re.sub(r'[^a-z0-9-]+', '-', os.path.splitext(r['name'])[0].lower()).strip('-')
        js = f"data/nhap/{stem}.js"
        if not r['ok']:
            bad += 1; print(f"✗ {r['name']}: KHÔNG nhập"); [print('   - ' + e) for e in r['errs']]
            if os.path.exists(os.path.join(ROOT, js)): keep.append(js); print(f'   (giữ bản cũ {js} đang có trên web – sửa tệp rồi chạy lại)')
            continue
        with open(os.path.join(ROOT, js), 'w', encoding='utf-8') as f:
            f.write(f"/* Nhập từ AI qua Xưởng dữ liệu: nhap/{r['name']} – {r['ten']}. Sửa nội dung thì sửa tệp trong nhap/ rồi chạy lại tools/nhap-du-lieu.py. */\n")
            f.write('NhapDL.add(' + json.dumps(r['data'], ensure_ascii=False, indent=1) + f", 'nhap/{r['name']}');\n")
        keep.append(js)
        g = r.get('ghep') or {}
        if g.get('sotay'):
            if not g.get('moi'): r['warns'].insert(0, f"chủ đề đã có ở tệp trước → thêm {g['them']} dạng mới, bỏ {g['bo_qua']} dạng trùng tên")
        elif g.get('thay_mau'): r['warns'].insert(0, 'bài này đang là bài MẪU → bản này thay hẳn bài mẫu')
        elif g and g.get('bo', 1) > 1: r['warns'].insert(0, f"bài đã có ở tệp trước → thành Bộ {g['bo']} phần luyện tập: thêm {g['them']} câu, bỏ {g['bo_qua']} câu trùng (bài giảng giữ bản đầu)")
        elif g and not g.get('bo'): r['warns'].insert(0, f"MỌI câu đều trùng tệp trước – không thêm gì (xoá tệp này hoặc nhờ AI soạn câu mới)")
        print(f"✓ {r['name']} → {js} ({r['ten']})" + ''.join(f"\n   ! {w}" for w in r['warns']) + ''.join(f"\n   · {n}" for n in r['notes']))
    # gỡ tệp cũ không còn nguồn
    for f in os.listdir(OUT):
        p = f"data/nhap/{f}"
        if f.endswith('.js') and p not in keep:
            os.remove(os.path.join(ROOT, p)); print(f'– gỡ {p} (không còn trong nhap/)')
    idx = os.path.join(ROOT, 'index.html'); html = open(idx, encoding='utf-8').read()
    tags = ''.join(f'<script src="{p}"></script>\n' for p in sorted(keep, key=lambda p: p[:-3]))
    html2 = re.sub(r'(<!-- nhap:dau -->\n)[\s\S]*?(<!-- nhap:cuoi -->)', lambda m: m.group(1) + tags + m.group(2), html)
    if html2 != html:
        open(idx, 'w', encoding='utf-8').write(html2)
    print(f'Đã nhập {len(keep)} tệp' + (f', {bad} tệp lỗi (sửa bằng "Chép lệnh sửa" ở web)' if bad else '') + '. Kiểm tra toàn bộ:')
    k = subprocess.run(['node', os.path.join(ROOT, 'tools/kiem-tra.js')], capture_output=True, text=True)
    out = k.stdout.strip().split('\n')
    if k.returncode:   # có lỗi: in hết các dòng ✗ (và lỗi của node nếu có) để thầy chép gửi Claude
        print('\n'.join([l for l in out if l.startswith('✗')][:30] + out[-1:]))
        if k.stderr.strip(): print('Lỗi node:\n' + '\n'.join(k.stderr.strip().split('\n')[-12:]))
        if not k.stdout.strip(): print('(node ' + subprocess.run(['node', '-v'], capture_output=True, text=True).stdout.strip() + ')')
    else: print('\n'.join(out[-4:]))
    return 1 if (bad or k.returncode) else 0


if __name__ == '__main__':
    sys.exit(main())
