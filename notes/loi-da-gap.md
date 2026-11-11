# Lỗi đã gặp và cách sửa (Cấp 2)

- Chú thích `/* … */` lồng nhau trong JS làm hỏng cả tệp → không viết `/*` bên trong chú thích.
- PDF đề luyện quá số trang → giảm `h` (mm ô li), thu nhỏ hình (`.ld-page .sh-fig .fig{max-height:58mm}`); `xuat-de-pdf.py` báo lỗi khi sai số trang.
- Nhãn điểm của `Fig.geo` bị cắt ở mép → thêm điểm ẩn (`hide`) để nới khung, chỉnh `lab`.
- Công thức trong chuỗi nháy đơn mất dấu `\` → mọi chuỗi có công thức viết bằng S`…` (kiem-tra.js bắt lỗi).
- Trang Luyện tư duy tràn ngang trên điện thoại khi bước barem có công thức dài → `.td-card mjx-container{max-width:100%;overflow-x:auto}`.
- JSON của AI viết `\frac`, `\Omega` một dấu gạch: `\f` thành kí tự lạ hoặc JSON lỗi → `NhapDL.repair` đọc từng cặp `\x`, nhân đôi khi gặp lệnh LaTeX hoặc kí tự không phải mã thoát JSON.
- Đáp án trong tài liệu gốc nhiều chỗ sai → luôn tính lại bằng `tools/kiem-dap-so.py` (sympy, toạ độ).
- `kiem-dap-so.py`: `round(sp.Rational(4,3)*3.14*8, 2) == 33.49` cho False (sympy Float khác float) → tính bằng float/Fraction, tính lại từ số liệu đề (09/11/2026, phần Bài 5 Antigravity viết).
- Antigravity vừa để JSON trong `nhap/` vừa viết tay `ld*.js` cùng nội dung → lệnh đăng web sẽ nhập lặp; quy tắc `.agents/rules/soan-de-luyen-va-du-lieu.md`.
- Đề trùng trong một bộ luyện đề (JSON trong `nhap/` + viết tay `ld*.js`) → `kiem-tra.js` báo TRÙNG, lệnh đăng web dừng (09/11/2026).
- Lời giải thích trắc nghiệm ghi "Phương án D sai…" nhưng web đảo phương án → chữ cái lệch. Sửa: giữ thứ tự gốc (`goc`) và đổi chữ cái khi hiển thị (`BaiHoc.doiChu`) (09/11/2026).
- Công cụ trong iframe tự bật toàn màn hình → document.fullscreenElement là iframe con → trình chiếu tưởng đã thoát nên đóng, mở lại về trang đầu. Sửa: coi phần tử con của khung là vẫn đang chiếu; nhớ trang đang chiếu (09/11/2026).
- 11/11/2026: Kéo bản mới về máy thầy (qua công cụ máy, chưa xin quyền xoá) bằng `git pull --autostash` → "could not reset --hard", kẹt `.git/index.lock`. Mỗi phiên mới: xin quyền xoá thư mục Documents trước rồi mới pull; kẹt thì xoá `.git/index.lock` rồi pull lại (thay đổi dở của máy vẫn còn nguyên).
- 11/11/2026: Lệnh Đăng báo TRÙNG đề Bài 3 – Antigravity vừa chép tay 5 đề đợt 2 vào ld03 vừa để JSON trong nhap/ (lần 2). Đã chuyển JSON sang docs/nguon-ai/luyen-de/, sửa nguồn, thêm nhap:true. gan-html.py đặt tên lop10-b9-lop10-b09-… khi tệp có b09 → sửa nhận cả b09.
- 11/11/2026: Lệnh Đăng trên Mac báo lỗi kiểm tra nhưng không hiện dòng ✗: kiem-tra.js gọi process.exit(1) ngay sau console.log → trên macOS đầu ra qua pipe bị cắt. Đổi sang process.exitCode; nhap-du-lieu.py in hết dòng ✗ + lỗi node; day-len.py in 45 dòng khi lỗi.
