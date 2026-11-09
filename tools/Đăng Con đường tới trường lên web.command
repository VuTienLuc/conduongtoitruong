#!/bin/bash
# =====================================================================
#  ĐĂNG "CON ĐƯỜNG TỚI TRƯỜNG" LÊN WEB – bấm đúp là chạy (macOS)
#  Trước khi bấm: thả tệp HTML (trình chiếu, trò chơi…) vào thư mục
#  "Con đường tới trường (Thả HTML Vào Đây)" ngoài Desktop. Đặt tên dạng
#  lop11-b11-ten-ngan.html thì khỏi phải trả lời lớp, bài.
#  Lệnh làm: lấy bản mới → gắn HTML vào bài → nhập dữ liệu AI → kiểm tra
#  → đóng gói → gửi lên GitHub (web tự cập nhật). Có lỗi thì DỪNG, không đăng.
#  Bản gốc của tệp này: tools/ trong dự án (tools/day-len.py làm phần việc chính).
# =====================================================================
THU_MUC_MAC_DINH="$HOME/Documents/con-duong-toi-truong"
THA="$HOME/Desktop/Con đường tới trường (Thả HTML Vào Đây)"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
do_()  { printf '\033[1;31m%s\033[0m\n' "$*"; }
xanh() { printf '\033[1;32m%s\033[0m\n' "$*"; }
vang() { printf '\033[1;33m%s\033[0m\n' "$*"; }
bao()  { command -v osascript >/dev/null && osascript -e "display notification \"$2\" with title \"Con đường tới trường\" subtitle \"$1\"" >/dev/null 2>&1; }
dong() { echo; read -r -p "Nhấn Enter để đóng cửa sổ… " _; exit "${1:-0}"; }

TU="$(cd "$(dirname "$0")" && pwd)"
if   [ -f "$TU/day-len.py" ];       then DIR="$(cd "$TU/.." && pwd)"
elif [ -f "$TU/tools/day-len.py" ]; then DIR="$TU"
else DIR="$THU_MUC_MAC_DINH"; fi
cd "$DIR" 2>/dev/null && [ -f tools/day-len.py ] || { do_ "✗ Không thấy thư mục dự án: $DIR"; dong 1; }
clear
echo "══════════════════════════════════════════════"
echo "   ĐĂNG CON ĐƯỜNG TỚI TRƯỜNG LÊN WEB"
echo "   Thư mục: $DIR"
echo "══════════════════════════════════════════════"
if ! git --version >/dev/null 2>&1; then
  vang "Máy chưa có git. Cửa sổ cài “Command Line Tools” sẽ hiện ra – bấm Cài đặt, chờ xong rồi bấm lại tệp này."
  xcode-select --install >/dev/null 2>&1; dong 1
fi
if ! command -v node >/dev/null 2>&1; then
  vang "Máy chưa có Node.js (cần để kiểm tra lỗi). Trang tải sẽ mở ra – cài bản LTS rồi bấm lại tệp này."
  open "https://nodejs.org/" 2>/dev/null; dong 1
fi
mkdir -p "$THA"

python3 tools/day-len.py --inbox "$THA"
KQ=$?
echo
if [ $KQ -eq 0 ]; then
  xanh "══════════════════════════════════════════════"
  xanh "  ✓ XONG. Web tự cập nhật sau khoảng 1–2 phút."
  xanh "══════════════════════════════════════════════"
  bao "Đã xong" "Web tự cập nhật sau khoảng 1–2 phút"
else
  do_ "✗ CHƯA đăng lên web – xem dòng báo lỗi ở trên."
  vang "Chụp màn hình hoặc chép các dòng lỗi gửi Claude: “Lệnh đăng web báo lỗi”."
  bao "CHƯA đăng lên web" "Xem dòng báo lỗi trong cửa sổ Terminal"
fi
dong $KQ
