# Luyện đề Toán vào 10 (Cấp 2)

## Luyện đề vào 10 – mỗi chủ đề 10 đề, mỗi đề một PDF (thầy yêu cầu 18/10/2026)
Mục đích: rèn thành thạo từng chủ đề theo đúng dạng, đúng số điểm của bài tương ứng trong đề tuyển sinh TP.HCM. **Làm lần lượt từng chủ đề, ưu tiên nội dung lớp 9 học kì I**:
Bài 6 hệ PT thực tế ✅ (20 đề) → Bài 4 thực tế đại số – hình học ✅ (20 đề: thêm cung, quạt, viên phân, vành khăn) → Bài 7a, 7b, 7c hình học phẳng ✅ (20 đề mỗi câu) → (học kì II) Bài 1 parabol ✅ (20 đề: vẽ (P), tìm điểm thỏa điều kiện, giao điểm) → Bài 2 Viète ✅ (20 đề: Δ, hai nghiệm trái dấu, biểu thức đối xứng và không đối xứng, tham số m) → Bài 3 xác suất, Bài 5 hình không gian.
- Dữ liệu: `data/vao-10/luyen-de/ldNN-<mã chủ đề>.js`, nạp SAU tệp chủ đề trong `index.html`; hợp đồng ở đầu `assets/js/luyende.js`:
  `LuyenDe.add('<mã>', { phut, soat?, de:[{ ten, nguon, pts, h, de, figQ?, fig?, ans, barem:[[bước, điểm]…], loi:[…] }×10k] })` (10, 20… đề).
- Đề lấy dạng từ `tai-lieu/lop9/Lớp 9 - Tài liệu/Đề thi/` (đề Sở, bộ đề tham khảo, tuyển tập 2026–2027, 53 đề, bộ 15 đề), **đổi số liệu**, ghi `nguon` (tên tệp + đề/cụm). Barem bội 0,25, tổng = `pts`. Mọi đáp số thêm phép kiểm vào `tools/kiem-dap-so.py`.
- Bài 7: `ld07-hinh-7.js` có 20 cấu hình dùng chung cho ba bộ `hinh-7a/7b/7c` (7a hỏi câu a, học sinh tự vẽ hình; 7b cho hình + kết quả câu a, hỏi b; 7c cho hình + kết quả a, b, hỏi c). Mỗi cấu hình kiểm bằng toạ độ trong `kiem-dap-so.py`.
- Web: tab 📝 Luyện đề (`#/cd/<mã>/de/<k>`), in một đề hoặc cả bộ, tuỳ chọn kèm đáp án.
- **Gợi ý từng nấc cho 7b, 7c** (thầy yêu cầu 19/10/2026 – học sinh hay bí): mảng `GY` trong `ld07-hinh-7.js`, mỗi câu b, c có `goi:[Nấc 1 Nhận dạng, Nấc 2 Hướng đi, Nấc 3 Khung lời giải có chỗ trống ……]` và `cc` (mã công cụ). PDF thêm trang **Gợi ý** giữa đề và đáp án (3 trang); gợi ý **giảm dần** theo `giam:[7, 14]` (đề 1–7: 3 nấc, 8–14: 2 nấc, 15–20: chỉ Nấc 1) để học sinh quen tự suy luận. Trên web mở lần lượt từng nấc.
- **Thẻ công cụ** (`THE`: dạng kết luận → công cụ, chỉ cách lập luận được phép): `#/cd/hinh-7b/de/the`, tệp `de-luyen/the-cong-cu-hinh-hoc.pdf` (1 trang). **Luyện tư duy 10 phút mỗi ngày** `#/cd/hinh-7b/de/tuduy`: 4 câu chọn công cụ + 2 câu sắp xếp bước barem, đổi theo ngày, ưu tiên dạng hay sai, lưu chuỗi ngày (`ld:tuduy`).
- Tệp PDF: `python3 tools/xuat-de-pdf.py [mã…]` → `de-luyen/<mã>/De-01.pdf …` (trang 1 đề + ô li, [trang gợi ý], trang cuối đáp án – barem); công cụ báo lỗi nếu sai số trang (2, hoặc 3 khi có gợi ý). Chạy lại sau mỗi lần sửa đề và commit các PDF.
