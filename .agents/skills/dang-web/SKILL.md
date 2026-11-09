---
name: dang-web
description: Kiểm tra toàn bộ rồi đẩy web Con đường tới trường lên GitHub để web tự cập nhật. Dùng khi thầy gõ /dang-web, nói "đăng web", "đẩy lên", "cập nhật lên web", và tự dùng sau khi làm xong bất kì thay đổi nào về nội dung hoặc code của web.
---
# /dang-web – kiểm tra rồi đăng lên web

Chạy trong thư mục dự án (`~/Documents/con-duong-toi-truong`). Trả lời thầy bằng tiếng Việt, xưng "thầy".

## Các bước
1. `git status --short` – nắm những tệp sẽ được đăng. Thấy tệp lạ không thuộc việc vừa làm thì vẫn đăng (đó là việc của thầy trên máy) nhưng kể tên trong báo cáo.
2. Kiểm: `python3 tools/day-len.py --chi-kiem`
   - Lỗi ở đâu thì đọc kĩ, sửa ĐÚNG nguyên nhân trong dữ liệu, chạy lại cho tới khi dòng cuối là `KIỂM XONG`.
   - Thiếu sympy: `python3 -m pip install --user sympy`. Thiếu Node: báo thầy cài ở https://nodejs.org.
   - CẤM sửa `tools/kiem-tra.js`, `tools/kiem-dap-so.py` để lách lỗi (chỉ được THÊM phép kiểm cho nội dung mới).
3. Nếu đã sửa code web (`assets/`, `tools/`, `index.html`): chạy thêm `python3 tools/test_web.py` (cần Playwright: `python3 -m pip install --user playwright && python3 -m playwright install chromium`). Không cài được thì nói rõ với thầy là chưa kiểm thử trình duyệt.
4. Nếu đã thêm, sửa đề luyện, phiếu ôn tập, đề Văn: xuất PDF `python3 tools/xuat-de-pdf.py <mã bộ…>` (ví dụ `xac-suat`, `hinh-khong-gian`, `ngu-van`, `on-tap`; cũng cần Playwright).
5. Đăng: `python3 tools/day-len.py --khong-hoi --msg "<một câu tiếng Việt nói rõ đã thay đổi gì>"`
   - Lệnh tự: git pull → gắn HTML trong thư mục thả ngoài Desktop → nhập `nhap/` → kiểm → gộp dist → commit → push.
   - Push lỗi vì chưa đăng nhập GitHub: dừng, báo thầy mở GitHub Desktop đăng nhập (không tự tạo token, không nhập mật khẩu).
6. Báo thầy ngắn gọn: đã đăng gì (số tệp, nội dung chính), kết quả kiểm, web cập nhật sau 1–2 phút. Có lưu ý (nguồn chưa rõ, chưa kiểm thử trình duyệt…) thì nêu.

## Cấm
`git push --force`, `git reset --hard`, `git clean`, xoá tệp của thầy, đưa `tai-lieu/` lên, bỏ qua bước kiểm.
