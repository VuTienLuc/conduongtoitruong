#!/usr/bin/env python3
"""Gắn một trang HTML (trình chiếu, trò chơi, bài giảng tương tác…) vào một bài SGK trên web.
Chạy:  python3 tools/gan-html.py <tệp.html> --lop 11 --bai 11 [--ten "…"] [--mo-ta "…"] [--nguon "…"] [--ten-tep ngan-gon]
       python3 tools/gan-html.py --liet-ke            (xem các tệp đã gắn)
Việc làm:
  1. Kiểm định dạng: một tệp tự chạy (không gọi tệp ảnh, css, js nằm cạnh trên máy), có <title>, charset, viewport.
  2. Chép NGUYÊN tệp (không sửa nội dung) vào tuong-tac/lop<lớp>-b<bài>-<tên-ngắn>.html.
  3. Khai báo trong data/bai-hoc/tai-nguyen.js (đã có thì chỉ thay tệp).
  4. Chạy node tools/kiem-tra.js nếu máy có Node.
Lớp, bài phải có trong mục lục SGK Kết nối tri thức (data/bai-hoc/muc-luc-kntt.js)."""
import argparse, html, json, os, re, shutil, subprocess, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TN = os.path.join(ROOT, 'data', 'bai-hoc', 'tai-nguyen.js')
ML = os.path.join(ROOT, 'data', 'bai-hoc', 'muc-luc-kntt.js')
NGUON = 'Bài dạy của thầy Vũ Tiến Lực'
OK_URL = re.compile(r'^(https:|data:|blob:|#|mailto:|tel:|javascript:|about:|\$\{|{{)', re.I)


def muc_luc():
    """{lớp: {số bài: tên bài}} đọc từ tệp mục lục (không cần Node)."""
    out = {}
    parts = re.split(r'BaiHoc\.mucLuc\((\d+),', open(ML, encoding='utf-8').read())
    for lop, seg in zip(parts[1::2], parts[2::2]):
        out[int(lop)] = {int(a): b for a, b in re.findall(r"\[(\d+),\s*'([^']*)'\]", seg)}
    return out


def slug(s):
    s = unicodedata.normalize('NFD', s).replace('đ', 'd').replace('Đ', 'D')
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')[:60] or 'trang'


def kiem_html(text):
    """Trả về (lỗi, lưu ý). Chỉ xét thẻ thật – nội dung trong srcdoc đã mã hoá &quot; nên không bị bắt nhầm."""
    errs, warns = [], []
    low = text.lower()
    if '<html' not in low or '<body' not in low: errs.append('không phải trang HTML đầy đủ (thiếu <html> hoặc <body>)')
    for tag, attr, url in re.findall(r'<(script|link|img|iframe|source|video|audio|embed)\b[^>]*?\b(src|href)\s*=\s*"([^"]*)"', text, re.I):
        if url.startswith('http:'): warns.append(f'<{tag}> dùng http:// (nên https://): {url[:80]}')
        elif not OK_URL.match(url) and url.strip(): errs.append(f'<{tag} {attr}="{url[:80]}"> gọi tệp nằm cạnh trên máy – web không có tệp này. Nhúng thẳng vào trang (data: URI, <style>, <script>) hoặc dùng link https://')
    for url in re.findall(r'url\(\s*[\'"]?([^\'")]+)', text):
        if not OK_URL.match(url.strip()) and not url.startswith('http'): errs.append(f'CSS url({url[:60]}) gọi tệp nằm cạnh trên máy')
    if not re.search(r'<title>\s*[^<\s]', text, re.I): warns.append('thiếu <title> (tên hiện trên tab trình duyệt)')
    if not re.search(r'<meta[^>]+charset', text, re.I): warns.append('thiếu <meta charset="utf-8"> – tiếng Việt có thể lỗi font')
    if not re.search(r'<meta[^>]+name="viewport"', text, re.I): warns.append('thiếu <meta name="viewport"> – điện thoại hiện chữ rất nhỏ')
    if re.search(r'(api[_-]?key|AIza[0-9A-Za-z_-]{30,}|sk-[A-Za-z0-9]{20,})', text): errs.append('có vẻ chứa khoá API – không đưa lên web công khai')
    if len(text.encode()) > 8 * 1024 * 1024: warns.append(f'tệp nặng {len(text.encode()) // 1024 // 1024} MB – học sinh mở bằng điện thoại sẽ chậm')
    return errs, warns


def title_of(text):
    m = re.search(r'<title>(.*?)</title>', text, re.I | re.S)
    return html.unescape(re.sub(r'\s+', ' ', m.group(1)).strip()) if m else ''


def desc_of(text):
    m = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]*)"', text, re.I)
    return html.unescape(m.group(1)).strip() if m else ''


def da_gan():
    """[(lớp, bài, tệp)] đã khai báo."""
    t = open(TN, encoding='utf-8').read()
    out = []
    for m in re.finditer(r'BaiHoc\.taiNguyen\((\d+),\s*(\d+),\s*\[(.*?)\]\);', t, re.S):
        out += [(int(m.group(1)), int(m.group(2)), f) for f in re.findall(r"file:\s*'([^']+)'", m.group(3))]
    return out


def gan(src, lop, bai, ten=None, mo_ta=None, nguon=None, ten_tep=None, quiet=False):
    """Gắn tệp; trả về (đường dẫn trong dự án, lỗi[]). Không ghi gì nếu có lỗi."""
    ml = muc_luc()
    if lop not in ml: return None, [f'không có lớp {lop} (chỉ có {", ".join(map(str, ml))})']
    if bai not in ml[lop]: return None, [f'Toán {lop} không có Bài {bai} trong mục lục SGK Kết nối tri thức (có {len(ml[lop])} bài)']
    raw = open(src, 'rb').read()
    try: text = raw.decode('utf-8')
    except UnicodeDecodeError: return None, ['tệp không mã hoá UTF-8 – mở bằng trình soạn thảo, lưu lại dạng UTF-8']
    errs, warns = kiem_html(text)
    if errs: return None, errs
    ten = ten or title_of(text) or os.path.splitext(os.path.basename(src))[0]
    mo_ta = mo_ta if mo_ta is not None else desc_of(text)
    base = os.path.splitext(os.path.basename(src))[0]
    m = re.match(r'^lop0*' + str(lop) + r'-b0*' + str(bai) + r'-(.+)$', base, re.I)   # nhận cả b09 lẫn b9
    duoi = slug(ten_tep or (m.group(1) if m else base if not re.match(r'^[0-9a-f]{6,}-', base) else ten))
    rel = f'tuong-tac/lop{lop}-b{bai}-{duoi}.html'
    os.makedirs(os.path.join(ROOT, 'tuong-tac'), exist_ok=True)
    cu = [x for x in da_gan() if x[2] == rel]
    dst = os.path.join(ROOT, rel)
    if not (os.path.exists(dst) and os.path.samefile(src, dst)):
        shutil.copyfile(src, dst)
    if not cu:
        o = "{ ten: %s,\n    mo_ta: %s,\n    file: '%s', nguon: %s }" % (json.dumps(ten, ensure_ascii=False), json.dumps(mo_ta, ensure_ascii=False), rel, json.dumps(nguon or NGUON, ensure_ascii=False))
        with open(TN, 'a', encoding='utf-8') as f:
            f.write(f"BaiHoc.taiNguyen({lop}, {bai}, [\n  {o},\n]);\n")
    if not quiet:
        print(f"✓ {'Đã thay tệp' if cu else 'Đã gắn'}: {rel}\n  → Toán {lop} – Bài {bai}. {ml[lop][bai]}\n  Tên hiện trên web: {ten}")
        for w in warns: print('  ! ' + w)
    return rel, []


def main():
    ap = argparse.ArgumentParser(description='Gắn trang HTML vào bài SGK trên web Con đường tới trường')
    ap.add_argument('tep', nargs='?'); ap.add_argument('--lop', type=int); ap.add_argument('--bai', type=int)
    ap.add_argument('--ten'); ap.add_argument('--mo-ta'); ap.add_argument('--nguon'); ap.add_argument('--ten-tep')
    ap.add_argument('--liet-ke', action='store_true'); ap.add_argument('--khong-kiem', action='store_true')
    a = ap.parse_args()
    if a.liet_ke:
        ml = muc_luc()
        for l, b, f in da_gan(): print(f'Toán {l} – Bài {b}. {ml.get(l, {}).get(b, "?")}: {f}')
        return 0
    if not a.tep or a.lop is None or a.bai is None: ap.print_help(); return 2
    rel, errs = gan(a.tep, a.lop, a.bai, a.ten, a.mo_ta, a.nguon, a.ten_tep)
    if errs:
        print(f'✗ Chưa gắn {a.tep}:'); [print('  - ' + e) for e in errs]; return 1
    if not a.khong_kiem and shutil.which('node'):
        k = subprocess.run(['node', os.path.join(ROOT, 'tools/kiem-tra.js')], capture_output=True, text=True)
        print(k.stdout.strip().split('\n')[-1]); return k.returncode
    return 0


if __name__ == '__main__':
    sys.exit(main())
