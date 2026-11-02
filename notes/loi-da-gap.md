# Lỗi đã gặp và cách sửa (Cấp 2)

- Chú thích `/* … */` lồng nhau trong JS làm hỏng cả tệp → không viết `/*` bên trong chú thích.
- PDF đề luyện quá số trang → giảm `h` (mm ô li), thu nhỏ hình (`.ld-page .sh-fig .fig{max-height:58mm}`); `xuat-de-pdf.py` báo lỗi khi sai số trang.
- Nhãn điểm của `Fig.geo` bị cắt ở mép → thêm điểm ẩn (`hide`) để nới khung, chỉnh `lab`.
- Công thức trong chuỗi nháy đơn mất dấu `\` → mọi chuỗi có công thức viết bằng S`…` (kiem-tra.js bắt lỗi).
- Trang Luyện tư duy tràn ngang trên điện thoại khi bước barem có công thức dài → `.td-card mjx-container{max-width:100%;overflow-x:auto}`.
- JSON của AI viết `\frac`, `\Omega` một dấu gạch: `\f` thành kí tự lạ hoặc JSON lỗi → `NhapDL.repair` đọc từng cặp `\x`, nhân đôi khi gặp lệnh LaTeX hoặc kí tự không phải mã thoát JSON.
- Đáp án trong tài liệu gốc nhiều chỗ sai → luôn tính lại bằng `tools/kiem-dap-so.py` (sympy, toạ độ).
