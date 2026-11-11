#!/bin/bash
# Đăng nhập GitHub cho lệnh Đăng (git push) bằng tài khoản VuTienLuc – chạy một lần trên máy Mac.
# Không lưu mật khẩu ở đâu: thầy tự đăng nhập trên trình duyệt; gh giữ quyền trong Keychain của máy.
cd "$(dirname "$0")/.." || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
CAN="VuTienLuc"
dung() { echo; read -r -p "Nhấn Enter để đóng cửa sổ… " _; exit "${1:-0}"; }
echo "══════════════════════════════════════════════"
echo "   ĐĂNG NHẬP GITHUB CHO CON ĐƯỜNG TỚI TRƯỜNG"
echo "══════════════════════════════════════════════"

# 1. Cần công cụ gh (GitHub CLI)
if ! command -v gh >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then
    echo "── Máy chưa có gh – đang cài bằng Homebrew (1–2 phút)…"
    brew install gh || { echo "✗ Cài gh không được. Gửi màn hình này cho Claude."; dung 1; }
  else
    echo "✗ Máy chưa có gh và chưa có Homebrew."
    echo "  Trình duyệt sẽ mở trang tải gh: tải tệp macOS (.pkg), cài xong chạy lại tệp này."
    open "https://cli.github.com/"
    dung 1
  fi
fi

# 2. Bỏ đăng nhập GitHub cũ của git (tài khoản khác) trong Keychain
printf 'protocol=https\nhost=github.com\n\n' | git credential-osxkeychain erase >/dev/null 2>&1

# 3. Đăng nhập (nếu gh chưa có tài khoản VuTienLuc)
if ! gh auth status -h github.com 2>&1 | grep -Eqi "(account|as) $CAN( |$)"; then
  echo
  echo "── Sắp mở trình duyệt. Cách làm:"
  echo "   1) Chép MÃ 8 kí tự hiện bên dưới (dạng XXXX-XXXX)"
  echo "   2) Nhấn Enter → trình duyệt mở github.com/login/device"
  echo "   3) Đăng nhập tài khoản  $CAN  (nếu đang ở tài khoản khác thì đăng xuất trước), dán mã, bấm Authorize"
  echo
  gh auth login -h github.com -p https -w -s repo || { echo "✗ Chưa đăng nhập xong."; dung 1; }
fi
gh auth switch -h github.com -u "$CAN" >/dev/null 2>&1

# 4. Cho git dùng đăng nhập của gh
gh auth setup-git -h github.com

# 5. Kiểm tra
AI=$(gh api user --jq .login 2>/dev/null)
QUYEN=$(gh api repos/VuTienLuc/conduongtoitruong --jq .permissions.push 2>/dev/null)
echo
echo "   Tài khoản đang dùng: ${AI:-?}"
if [ "$QUYEN" = "true" ]; then
  echo "✓ XONG. Máy đã có quyền đẩy lên kho VuTienLuc/conduongtoitruong."
  echo "  Từ nay chạy lệnh Đăng bình thường."
  dung 0
else
  echo "✗ Tài khoản ${AI:-?} chưa có quyền ghi kho. Chạy lại tệp này và đăng nhập đúng tài khoản $CAN."
  dung 1
fi
