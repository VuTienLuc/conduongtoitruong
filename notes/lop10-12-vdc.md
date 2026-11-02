# Lớp 10, 11, 12 – vận dụng, vận dụng cao (Cấp 2)

## Lớp 10, 11, 12 – chỉ luyện VẬN DỤNG và VẬN DỤNG CAO (thầy yêu cầu 18/10/2026)
Đối tượng: học sinh khá, giỏi muốn lấy điểm cao **giữa kì, cuối kì**. Không làm câu nhận biết, thông hiểu.
- Đường link: `#/` chọn lớp · `#/vao-10` ôn thi vào 10 (link cũ `#/cd/...` vẫn chạy) · `#/lop10` danh sách chủ đề theo kì · `#/lop10/<mã>` chủ đề · `#/lop10/<mã>/phieu` phiếu PDF · `#/lop10/<mã>/lg/<n>` lời giải bài n.
- Một chủ đề = các **dạng**; mỗi dạng có: phương pháp, ≥ 1 **ví dụ mẫu** (lời giải từng bước), ≥ 2 **bài tương tự** (mức VD hoặc VDC, có gợi ý, lời giải, đáp số, số dòng kẻ).
- **Phiếu PDF** (tự sinh, không viết thêm): kiến thức trọng tâm → đề luyện tập có **dòng kẻ** để làm → **dưới cùng là gợi ý phương pháp**, mỗi bài một **mã QR** quét ra trang lời giải. Tuỳ chọn kèm ví dụ mẫu.
- **Mã QR** trỏ tới địa chỉ trang đang mở (khi in từ web thật) hoặc `CONFIG.siteUrl` (khi mở tệp trên máy). Chưa có địa chỉ web thì phiếu ghi chú thay cho QR. Sau khi đưa web lên Vercel, điền `siteUrl` trong `config.js`.
- Hợp đồng dữ liệu (chi tiết ở đầu `assets/js/vdc.js`):
```js
Vdc.add({ grade:'lop10', id:'ma-khong-dau', ky:['Giữa kì I'|'Cuối kì I'|'Giữa kì II'|'Cuối kì II'…],
  chuong:'Chương …', bai:'Bài …', title:S`…`, desc:'…', nguon:'tên tệp trong tai-lieu/lop10/',
  kt:[{t, b, fig?}],
  dang:[{ ten, muc:'VD'|'VDC'|'VD – VDC', pp:['…'], vd:[{de, fig?, lg:['…'], ds}],
          bt:[{muc:'VD'|'VDC', de, figQ?, fig?, goiY, lg:['…'], ds, dong}] }] });
```
- `nguon` bắt buộc (tên tệp tài liệu đã dùng; danh sách đầy đủ tên tệp ghi trong chú thích đầu tệp dữ liệu); chủ đề soạn khi chưa có tài liệu phải ghi `mau:true` (web hiện nhãn "Mẫu minh họa").
- **Đã soạn theo ma trận giữa kì I** (`MA_TR_N_GKI.docx`: câu VD là TLN-1…4 và Đúng–Sai ĐS-1…3, mỗi lớp 1 câu VDC) và các đề, đề cương trong `tai-lieu/lop10`, `tai-lieu/lop11` (số liệu đã đổi, đáp số tự tính lại – nhiều đáp án trong tài liệu gốc bị sai):
  - Lớp 10: `c1-tap-hop-ven` (TLN-1/2, ĐS-1) · `c1-tap-hop-tham-so` (TLN-1/2, ĐS-1) · `c2-toi-uu-mien-nghiem` (TLN-3 VDC, ĐS-2) · `c3-he-thuc-luong-thuc-te` (TLN-4, ĐS-3).
  - Lớp 11: `c1-cong-thuc-luong-giac` (ĐS-1) · `c1-ham-so-luong-giac-thuc-te` (TLN-1) · `c1-phuong-trinh-luong-giac` (TLN-2 VDC) · `c2-cap-so-cong` (TLN-3, ĐS-2) · `c2-cap-so-nhan` (TLN-4) · `c3-mau-so-lieu-ghep-nhom` (ĐS-3). Tổng cấp số nhân lùi vô hạn thuộc chương Giới hạn – không có trong giữa kì I.
- Công thức dài: `math.js` tự gắn lớp `mjx-wide` (cuộn ngang riêng công thức) trên điện thoại. Trên phiếu in, gợi ý nằm trong ô hẹp (nửa trang) – tách công thức dài thành nhiều đoạn \( \) ngắn; `test_web.py` báo lỗi nếu công thức tràn khung trên phiếu. Mọi chuỗi có công thức phải viết bằng S`…` (`kiem-tra.js` báo lỗi nếu nằm trong nháy đơn).
- Hình: `Fig.plane` (miền nghiệm, đường thẳng, đỉnh), `Fig.venn` (Ven 2–3 tập, tô miền), `Fig.func` (đồ thị hàm số, mô hình lượng giác), `Fig.geo`, `Fig.parab`, `Fig.solid`. Bảng số liệu: `<table class="tbl">`.
- Mỗi chủ đề mới: thêm phép tính kiểm đáp số vào `tools/kiem-dap-so.py`; `tools/test_web.py` tự mở mọi trang, xuất PDF và **giải mã từng QR** so với đường link lời giải.
