---
trigger: model_decision
description: "Đọc khi tạo, sửa hoặc gắn trang HTML (trình chiếu, trò chơi, bài giảng tương tác) vào web Con đường tới trường, hoặc khi thầy nói đẩy / đưa lên web, lên GitHub, lên hệ thống."
---
# Đưa trang HTML lên web "Con đường tới trường"

Người dùng: thầy Vũ Tiến Lực, giáo viên Toán. Xưng "thầy", trả lời tiếng Việt. Quy tắc chung của dự án ở AGENTS.md (luôn áp dụng).

## 1. Định dạng một trang HTML được nhận
- MỘT tệp tự chạy: CSS trong `<style>`, JS trong `<script>`, ảnh nhúng bằng `data:` URI hoặc SVG viết thẳng. KHÔNG gọi tệp nằm cạnh (`anh.png`, `app.js`, `style.css`) – web không có các tệp đó.
- Thư viện ngoài chỉ dùng link `https://` từ cdn.jsdelivr.net, cdnjs.cloudflare.com hoặc unpkg.com, ghi rõ phiên bản (`katex@0.16.9`); font từ Google Fonts. Không dùng `http://`.
- Đầu trang bắt buộc: `<!DOCTYPE html>`, `<html lang="vi">`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<title>` (tên ngắn – web lấy làm tên trình chiếu), `<meta name="description" content="…">` (một câu – web lấy làm mô tả).
- Trang được hiện trong khung 16:9 trên trang bài học và ở chế độ toàn màn hình: bố cục co giãn theo khung (dùng vw, vh, %), không cuộn ngang, chữ đủ to khi chiếu, nút bấm cao từ 44px.
- Học sinh dùng điện thoại: mọi thao tác làm được bằng chạm. Nút chuyển trang, thanh điều khiển không được chỉ hiện khi rê chuột.
- `localStorage` luôn bọc `try { … } catch (e) {}`; tên khoá có tiền tố riêng của trang (ví dụ `l11b11_`) vì nhiều trang chạy chung một web.
- Công thức: KaTeX hoặc MathJax qua CDN, viết `$…$`. Thuật ngữ, kí hiệu đúng SGK Toán Kết nối tri thức; tự giải lại mọi đáp số trước khi đưa lên.
- Không chứa khoá API, mật khẩu, tên hoặc thông tin cá nhân học sinh; không chép văn bản còn bản quyền.

## 2. Đặt tên và gắn vào bài học
- Tên tệp: `lop<lớp>-b<số bài SGK>-<ten-ngan-khong-dau>.html`, ví dụ `lop11-b11-hai-duong-thang-song-song-tiet1.html`. Số bài tra trong `data/bai-hoc/muc-luc-kntt.js` (Toán 9: 32 bài, 10: 27, 11: 33, 12: 19).
- KHÔNG tự chép tệp vào `tuong-tac/` và KHÔNG sửa tay `data/bai-hoc/tai-nguyen.js`. Luôn gắn bằng lệnh:
  `python3 tools/gan-html.py <tệp.html> --lop <L> --bai <B> [--ten "…"] [--mo-ta "…"]`
  Lệnh kiểm định dạng ở mục 1, chép NGUYÊN tệp vào `tuong-tac/`, khai báo vào bài, chạy `node tools/kiem-tra.js`. Lệnh báo lỗi thì sửa tệp HTML gốc rồi chạy lại.
- Gắn lại cùng tên tệp là thay bản cũ. Một bài gắn được nhiều trang (tiết 1, tiết 2, trò chơi…). Xem danh sách: `python3 tools/gan-html.py --liet-ke`.
- Không sửa các tệp trong `tuong-tac/` khi thầy không yêu cầu. Cần sửa thì sửa bản gốc của thầy rồi gắn lại.

## 3. Đẩy lên hệ thống (GitHub → web tự cập nhật)
- Chỉ dùng một lệnh, chạy trong thư mục dự án:
  `python3 tools/day-len.py --khong-hoi --msg "<mô tả ngắn điều đã thay đổi>"`
  Lệnh tự làm: git pull → gắn các tệp HTML đặt tên đúng dạng trong `~/Desktop/Con đường tới trường (Thả HTML Vào Đây)` → nhập dữ liệu AI trong `nhap/` → `kiem-tra.js`, `kiem-dap-so.py` → `build.py` → commit → push.
- Thầy tự làm: bấm đúp `Đăng Con đường tới trường lên web.command` ngoài Desktop (cùng lệnh, có hỏi lớp, bài cho tệp chưa đặt tên đúng dạng).
- Lệnh dừng ở bước nào thì đọc lỗi, sửa, chạy lại. Không bỏ qua bước kiểm tra.
- CẤM: `git push --force`, `git reset --hard`, `git clean`, xoá tệp của thầy, đưa `tai-lieu/` lên GitHub.
- Khi đổi code của web (assets/js, assets/css, tools/): chạy thêm `python3 tools/test_web.py` (cần Playwright) trước khi đẩy.

## 4. Báo lại cho thầy
Một đoạn ngắn: trang đã gắn vào bài nào (Toán L – Bài B. tên bài), lệnh kiểm có lưu ý gì, đã đẩy lên chưa. Không dán lại mã HTML.
