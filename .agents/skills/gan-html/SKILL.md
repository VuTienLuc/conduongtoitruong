---
name: gan-html
description: Gắn một trang HTML (trình chiếu, trò chơi, bài giảng tương tác) vào đúng bài SGK Toán 9–12 trên web Con đường tới trường rồi đăng lên. Dùng khi thầy gõ /gan-html, gửi tệp .html và nói "gắn vào bài…", "đưa lên web bài…".
---
# /gan-html – gắn trang HTML vào bài học

Đọc trước: `.agents/rules/dua-html-len-web.md` (định dạng bắt buộc).

1. Xác định tệp và bài:
   - Tệp: đường dẫn thầy đưa, hoặc tệp trong `~/Desktop/Con đường tới trường (Thả HTML Vào Đây)`.
   - Lớp, số bài: tra `data/bai-hoc/muc-luc-kntt.js` theo tên bài thầy nói (ví dụ "hai đường thẳng song song lớp 11" → lớp 11, Bài 11). Không chắc thì hỏi thầy, không đoán.
2. Kiểm và gắn: `python3 tools/gan-html.py "<tệp>" --lop <L> --bai <B> [--ten "<tên hiện trên web>"] [--mo-ta "<một câu>"]`
   - Báo lỗi định dạng (gọi tệp ảnh/js/css nằm cạnh, thiếu charset…): sửa trên MỘT BẢN SAO của tệp (nhúng ảnh thành data URI, đưa css/js vào trang), giữ nguyên nội dung dạy học, rồi gắn bản sao. Nói với thầy đã sửa gì.
   - Lưu ý (thiếu viewport, title…): sửa trên bản sao nếu thầy đồng ý, hoặc gắn luôn và nêu lưu ý.
   - Không sửa tệp đã có trong `tuong-tac/`, không sửa tay `data/bai-hoc/tai-nguyen.js`.
3. Xem `python3 tools/gan-html.py --liet-ke` để chắc đã gắn đúng bài.
4. Làm tiếp các bước của skill **dang-web** để kiểm và đăng (message ví dụ: "Gắn trình chiếu … vào Toán 11 – Bài 11").
5. Báo thầy: Toán L – Bài B. <tên bài>, tên trang, đường dẫn trên web `#/bai-hoc/<L>/<B>`.
