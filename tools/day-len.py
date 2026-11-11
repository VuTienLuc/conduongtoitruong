#!/usr/bin/env python3
"""ĐẨY WEB LÊN HỆ THỐNG – một lệnh làm hết (lệnh "Đăng Con đường tới trường lên web.command" ngoài Desktop gọi tệp này).
Chạy:  python3 tools/day-len.py [--inbox "<thư mục thả HTML>"] [--msg "nội dung thay đổi"] [--khong-hoi]
Các bước (bước nào lỗi thì dừng, KHÔNG đẩy):
  1. git pull – lấy bản mới nhất (giữ nguyên phần thầy đang sửa dở).
  2. Thư mục thả HTML (mặc định ~/Desktop/Con đường tới trường (Thả HTML Vào Đây)): tệp bài giảng .json (Trình soạn thảo bài học) chép vào nhap/;
     mỗi tệp .html được kiểm định dạng và gắn vào bài SGK
     (tools/gan-html.py). Tên tệp dạng lop11-b11-ten-ngan.html thì tự biết lớp, bài; tên khác thì hỏi lớp, bài
     (chế độ --khong-hoi thì bỏ qua tệp đó). Tệp đã gắn chuyển vào thư mục con "Đã đưa lên".
  3. Dữ liệu AI trong nhap/ → tools/nhap-du-lieu.py.
  4. Kiểm tra: node tools/kiem-tra.js; python3 tools/kiem-dap-so.py (nếu máy có sympy).
  5. Gộp bản một tệp: python3 tools/build.py.
  6. git add, commit, push lên GitHub (Vercel tự cập nhật web sau 1–2 phút).
Không bao giờ đưa tai-lieu/ lên (đã chặn trong .gitignore), không dùng push --force."""
import argparse, datetime, glob, importlib.util, os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
INBOX = os.path.join(os.path.expanduser('~'), 'Desktop', 'Con đường tới trường (Thả HTML Vào Đây)')
spec = importlib.util.spec_from_file_location('gan_html', os.path.join(ROOT, 'tools', 'gan-html.py'))
G = importlib.util.module_from_spec(spec); spec.loader.exec_module(G)


def run(cmd, show=True, check=False):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if show and (r.stdout.strip() or r.stderr.strip()):
        n = 45 if r.returncode else 12   # lỗi thì in nhiều dòng hơn để thấy dòng ✗
        print('\n'.join('   ' + l for l in (r.stdout + r.stderr).strip().split('\n')[-n:]))
    if check and r.returncode: raise SystemExit(f'✗ Lệnh lỗi: {" ".join(cmd)} – chưa đẩy gì lên. Sửa lỗi ở trên rồi chạy lại.')
    return r


def hoi(q, default=''):
    try: v = input(q).strip()
    except EOFError: v = ''
    return v or default


def buoc(n, t): print(f'\n── {n}. {t}')


def nhan_json(inbox):
    """Tệp bài giảng .json (Trình soạn thảo bài học / Xưởng dữ liệu "Tải tệp chuẩn") thả vào thư mục → chép vào nhap/.
    Không đè tệp cũ: trùng tên mà khác nội dung thì đặt …-bo2, -bo3 (web giữ bài giảng tệp đầu, câu luyện tập thành Bộ 2, 3)."""
    import json
    files = sorted(f for f in glob.glob(os.path.join(inbox, '*.json')) if os.path.isfile(f))
    done, n = os.path.join(inbox, 'Đã đưa lên'), 0
    for f in files:
        name = os.path.basename(f); print(f'   • {name}')
        try: j = json.load(open(f, encoding='utf-8'))
        except Exception as e: print(f'     ✗ không đọc được JSON: {e}'); continue
        if not isinstance(j, dict) or j.get('loai', 'bai_hoc') != 'bai_hoc' or not j.get('lop') or not j.get('bai'):
            print('     bỏ qua: không phải bài giảng (cần "loai":"bai_hoc", "lop", "bai")'); continue
        j['loai'] = 'bai_hoc'
        goc = f"bai-hoc-l{int(j['lop'])}-b{int(j['bai']):02d}"
        dst, k = os.path.join('nhap', goc + '.json'), 1
        while os.path.exists(dst):
            if json.load(open(dst, encoding='utf-8')) == j: dst = None; break
            k += 1; dst = os.path.join('nhap', f'{goc}-bo{k}.json')
        if dst is None: print('     đã có y hệt trong nhap/ – bỏ qua')
        else:
            json.dump(j, open(dst, 'w', encoding='utf-8'), ensure_ascii=False, indent=1); n += 1
            print(f'     → {dst}' + (f' (bài đã có → Bộ {k})' if k > 1 else ''))
        os.makedirs(done, exist_ok=True)
        d2 = os.path.join(done, name)
        if os.path.exists(d2): d2 = os.path.join(done, f'{os.path.splitext(name)[0]}-{datetime.datetime.now():%Y%m%d-%H%M}.json')
        shutil.move(f, d2)
    return n


def nhan_html(inbox, khong_hoi):
    os.makedirs(inbox, exist_ok=True)
    files = sorted(f for f in glob.glob(os.path.join(inbox, '*.htm*')) if os.path.isfile(f))
    if not files:
        print(f'   (không có tệp HTML mới trong "{inbox}")'); return 0
    ml, done, n = G.muc_luc(), os.path.join(inbox, 'Đã đưa lên'), 0
    for f in files:
        name = os.path.basename(f); print(f'   • {name}')
        m = re.match(r'^lop(\d+)-b(\d+)-', name, re.I)
        if m: lop, bai = int(m.group(1)), int(m.group(2))
        elif khong_hoi: print('     bỏ qua: tên tệp không có dạng lop<lớp>-b<bài>-… (chạy không hỏi)'); continue
        else:
            try:
                lop = int(hoi('     Lớp mấy (9/10/11/12, Enter = bỏ qua tệp này)? ', '0'))
                if lop not in ml: print('     bỏ qua tệp này'); continue
                bai = int(hoi(f'     Bài số mấy trong SGK Toán {lop} (1–{len(ml[lop])})? ', '0'))
            except ValueError: print('     bỏ qua: không phải số'); continue
            if bai not in ml[lop]: print(f'     bỏ qua: Toán {lop} không có Bài {bai}'); continue
            if hoi(f'     → Toán {lop} – Bài {bai}. {ml[lop][bai]} – đúng không (C/k)? ', 'c').lower().startswith('k'): continue
        rel, errs = G.gan(f, lop, bai)
        if errs:
            print('     ✗ chưa gắn:'); [print('       - ' + e) for e in errs]; continue
        os.makedirs(done, exist_ok=True)
        dst = os.path.join(done, name)
        if os.path.exists(dst): dst = os.path.join(done, f'{os.path.splitext(name)[0]}-{datetime.datetime.now():%Y%m%d-%H%M}.html')
        shutil.move(f, dst); n += 1
    return n


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--inbox', default=INBOX); ap.add_argument('--msg', default='')
    ap.add_argument('--khong-hoi', action='store_true', help='không hỏi gì (Antigravity, Claude dùng); thiếu sympy thì dừng')
    ap.add_argument('--khong-day', action='store_true', help='làm hết, chỉ không push (để thử)')
    ap.add_argument('--chi-kiem', action='store_true', help='chỉ nhập nhap/, kiểm tra, gộp dist – không đụng git, không gắn HTML')
    a = ap.parse_args()
    print('ĐẨY WEB "CON ĐƯỜNG TỚI TRƯỜNG" LÊN HỆ THỐNG')
    for tool in ('git', 'python3'):
        if not shutil.which(tool): raise SystemExit(f'✗ Máy chưa có {tool}. Cài Xcode Command Line Tools: mở Terminal, gõ  xcode-select --install')

    if run(['git', 'config', 'user.name'], show=False).returncode: run(['git', 'config', 'user.name', 'Vu Tien Luc'], show=False)
    if run(['git', 'config', 'user.email'], show=False).returncode: run(['git', 'config', 'user.email', 'vutluc@gmail.com'], show=False)
    buoc(1, 'Lấy bản mới nhất từ GitHub')
    if a.chi_kiem: print('   (chỉ kiểm – bỏ qua)')
    elif not a.khong_day:
        r = run(['git', 'pull', '--rebase', '--autostash', 'origin', 'main'])
        if r.returncode: raise SystemExit('✗ Không lấy được bản mới (mạng, hoặc hai nơi cùng sửa một chỗ). Chưa đẩy gì. Nhờ Claude: "git pull bị lỗi".')

    buoc(2, 'Gắn các trang HTML mới vào bài học, nhận tệp bài giảng .json')
    if a.chi_kiem: print('   (chỉ kiểm – bỏ qua)')
    else: nhan_html(a.inbox, a.khong_hoi); nhan_json(a.inbox)

    buoc(3, 'Nhập dữ liệu AI trong nhap/')
    if glob.glob('nhap/*.json') or glob.glob('nhap/*.md') or glob.glob('nhap/*.txt'):
        if shutil.which('node'): run(['python3', 'tools/nhap-du-lieu.py'], check=True)
        else: print('   ! máy chưa có Node (nodejs.org) – bỏ qua bước nhập; dữ liệu cũ vẫn giữ nguyên')

    buoc(4, 'Kiểm tra nội dung')
    if shutil.which('node'): run(['node', 'tools/kiem-tra.js'], check=True)
    else: print('   ! máy chưa có Node – bỏ qua kiểm tra tự động (cài tại https://nodejs.org để lệnh kiểm được)')
    if run(['python3', '-c', 'import sympy'], show=False).returncode == 0: run(['python3', 'tools/kiem-dap-so.py'], show=False, check=True); print('   kiểm đáp số: ĐẠT ✓')
    elif a.khong_hoi or a.chi_kiem: raise SystemExit('✗ Máy chưa có sympy nên chưa kiểm được đáp số – chưa đẩy. Cài: python3 -m pip install --user sympy  rồi chạy lại.')
    else: print('   ! máy chưa có sympy – bỏ qua kiểm đáp số (cài: python3 -m pip install --user sympy)')

    buoc(5, 'Gộp bản một tệp dist/')
    run(['python3', 'tools/build.py'], check=True)

    if a.chi_kiem:
        print('\n✓ KIỂM XONG: nội dung đạt. Chưa lưu, chưa đẩy (chế độ --chi-kiem).'); return 0
    buoc(6, 'Lưu và đẩy lên GitHub')
    run(['git', 'add', '-A'], show=False)
    ds = run(['git', 'diff', '--cached', '--name-status'], show=False).stdout.strip().split('\n')
    ds = [x for x in ds if x.strip()]
    if any(re.search(r'\ttai-lieu/(?!.*README\.md$)', x) for x in ds):
        run(['git', 'reset', '-q'], show=False); raise SystemExit('✗ Có tệp trong tai-lieu/ sắp bị đưa lên – đã dừng (tài liệu gốc chỉ giữ trên máy).')
    if not ds:
        print('   Không có gì mới để đẩy. Web đã là bản mới nhất.'); return 0
    print(f'   {len(ds)} tệp thay đổi:'); [print('     ' + x.replace('\t', ' ')) for x in ds[:25]]
    if len(ds) > 25: print(f'     … và {len(ds) - 25} tệp khác')
    tom = ', '.join(sorted({re.sub(r'^[A-Z]\d*\t', '', x).split('/')[0] for x in ds}))[:120]
    msg = a.msg or (hoi('   Ghi chú lần cập nhật (Enter để dùng ghi chú tự động): ') if not a.khong_hoi else '')
    msg = msg or f'Cập nhật từ máy thầy {datetime.datetime.now():%d/%m/%Y %H:%M}: {tom}'
    run(['git', 'commit', '-q', '-m', msg], check=True)
    if a.khong_day:
        print('   (chế độ thử: đã lưu commit trên máy, chưa đẩy lên)'); return 0
    r = run(['git', 'push', 'origin', 'HEAD:main'])
    if r.returncode:
        print('✗ Chưa đẩy lên được. Thường do: (1) mất mạng; (2) máy chưa đăng nhập GitHub – mở GitHub Desktop đăng nhập, '
              'hoặc Terminal gõ  gh auth login ; (3) trên GitHub có bản mới hơn – chạy lại lệnh này.')
        return 1
    print('\n✓ XONG. Đã đẩy lên GitHub. Web cập nhật sau khoảng 1–2 phút.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
