# Xưởng dữ liệu – tài liệu NotebookLM → AI → JSON → web (Cấp 2)
> Thầy yêu cầu 01/11/2026. Đọc khi thầy gửi JSON, nhờ "nhập dữ liệu mới", hoặc sửa mẫu JSON.

## Luồng làm việc
1. Web `#/xuong/prompt` (assets/js/xuong.js): chọn loại → chép **Hướng dẫn Gem** (dán một lần vào Gem, mục Kiến thức gắn notebook) và **Lệnh** từng đề. Chế độ "Dán thẳng vào NotebookLM" ghép hướng dẫn + lệnh.
2. AI trả về MỘT khối ```json, công thức trong `$…$` (giống quy trình /giam-khao-vao-10 thầy đang dùng).
3. Web `#/xuong/nhap`: dán câu trả lời hoặc kéo tệp → `NhapDL.parse` (tách JSON, sửa `\` đơn của LaTeX, bỏ trích dẫn [1], dấu phẩy thừa) → `NhapDL.check` → xem trước, in PDF → **Lưu trên máy này** (localStorage `nhap:may`, chỉ trình duyệt đó) hoặc **Tải tệp chuẩn**.
4. Đưa vào hệ thống: chép tệp chuẩn vào `nhap/` → `python3 tools/nhap-du-lieu.py` (tạo `data/nhap/<tên>.js` gọi `NhapDL.add`, tự thêm `<script>` giữa `<!-- nhap:dau -->` và `<!-- nhap:cuoi -->`, chạy kiem-tra) → `python3 tools/xuat-de-pdf.py` → build → commit, push. Tệp có lỗi bị bỏ qua, in lỗi.

## Các loại dữ liệu (mẫu đầy đủ: `Xuong.MAU_VAN`, `Xuong.MAU_TOAN`; kiểm ở `NhapDL.check` – sửa mẫu thì sửa cả hai)
- `"loai":"de_van"`: `ma_de`, `doc_hieu{diem 6, van_ban{ten, tac_gia, the_loai, nguon_goc, noi_dung, chu_thich}, cau[{so, diem, dang, de, goi_y, mau_cau, dong_ke, dap_an, cham[{y, diem}]}], doan_van{so, diem, de, khung[6], mau_cau, cham, loi_hay_sai}}`, `viet{diem 4, de, van_ban|null, dan_y{mo_bai, than_bai, ket_bai}, mau_cau, tu_ngu, cham, loi_hay_sai}`, `checklist`.
  `nguon_goc` bắt buộc `truoc_1929` hoặc `tu_viet` (quy định bản quyền) – sai là lỗi, không nhập.
- `"loai":"luyen_de_toan"`: `bai` (1…6, "7a/7b/7c"), `de[{ten, nguon, diem, de, bang?, hinh?, o_li?, dap_so, loi_giai[{buoc, diem}], loi_hay_sai}]` → thêm vào bộ Luyện đề của bài đó (đánh dấu `nhap: true`, hiện nhãn "· AI"). Bài 3, 5 chưa có bộ soạn sẵn thì tạo mới.
- Điểm bội 0,25; tổng bước = điểm câu; Văn: đọc hiểu = 6, viết = 4.

## Phiếu ôn tập 90 phút theo chủ đề (thầy yêu cầu 04/11/2026)
- Menu prompt → "Toán vào 10 – phiếu ôn tập 90 phút": chọn chủ đề (Bài 1 … 7c), đợt (tự tăng = đợt lớn nhất đã có + 1), số bài và số phút từng phần (mặc định Cơ bản 4 bài 25' · Khá 4 bài 35' · Nâng cao 2 bài 25' · soát 5'), định dạng JSON hoặc Markdown, giữ nguyên đề gốc (ghi nguồn chính xác) hoặc đổi số liệu.
- **Khác lần trước:** lệnh tự đưa danh sách "Đã dùng" (nguồn – tóm tắt mọi bài ở các phiếu cùng chủ đề đã nhập vào web, cộng ô "Bài đã dùng thêm"); tuỳ chọn danh sách tài liệu xoay vòng (mỗi đợt ưu tiên nhóm khác). Khi nhập, `NhapDL.check` so dấu vân tay `fp(de)` với các phiếu cũ → cảnh báo "TRÙNG", "Chép lệnh sửa" kèm danh sách bài cần thay.
- Dữ liệu `"loai":"on_tap_toan"`: `ma` (OT-B<bài>-<đợt>), `bai`, `chu_de`, `dot`, `thoi_gian`, `muc_tieu`, `kien_thuc`, `phan[{muc, phut, bai[{so, de, nguon, goi_y, dong_ke, dap_so, loi_giai[]}]}]`, `tu_danh_gia`. Markdown chuẩn (`Xuong.MAU_MD_ONTAP`) đọc bằng `NhapDL.mdToJson`; web xuất ngược `OnTap.toMd`.
- Hiển thị `assets/js/ontap.js`: `#/on-tap`, `#/on-tap/<mã>` (phiếu có dòng kẻ, gợi ý cuối phiếu, tự đánh giá, lời giải; tải .md). PDF: `python3 tools/xuat-de-pdf.py on-tap` → `de-luyen/on-tap/<mã>.pdf`. Mẫu thử: `docs/mau-nhap/on-tap-bai3-mau.txt`.

## Lưu ý
- Web không vẽ hình từ "hinh" (chỉ in mô tả). Đề hình học nhập từ AI cần thầy kiểm và bổ sung hình nếu cần.
- AI có thể ra đề và đáp án lệch nhau: khi thầy gửi JSON nhờ kiểm, thay số kiểm từng đáp số bằng Python trước khi nhập.
- Mẫu câu trả lời AI để thử: `docs/mau-nhap/toan-bai3-cau-tra-loi-ai.txt` (có lỗi `\` đơn, trích dẫn – test_web.py dùng để kiểm trang nhập).
