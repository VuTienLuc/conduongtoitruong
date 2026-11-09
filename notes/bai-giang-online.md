# Bài giảng – Luyện tập online lớp 9–12 (Cấp 2)
> Thầy yêu cầu 09/11/2026: "menu bài giảng – luyện tập online cho lớp 9-10-11-12, bài học theo mục lục SGK Toán KNTT".
> Đọc khi sửa trang bài học, thêm nội dung bài, sửa mục lục.

## Trang
- `#/bai-hoc` chọn lớp → `#/bai-hoc/<lớp>` mục lục (Tập 1, Tập 2 → chương → bài, ô tìm bài không dấu) → `#/bai-hoc/<lớp>/<bài>` 📘 Bài giảng, `/luyen` ✍️ Luyện tập online.
- Bài giảng: mục tiêu → từng mục kiến thức (ví dụ có "Xem lời giải", ⚠️ lưu ý hay sai) → 🔑 Cần nhớ.
- Luyện tập: Phần I trắc nghiệm (đảo phương án), Phần II đúng – sai (4 ý, mỗi ý 1 điểm), Phần III trả lời ngắn (nhận 2,5 / 2.5 / 3/4). Chấm ngay từng câu; xong hết thì lưu điểm cao nhất `bh:<lớp>-<bài>` (localStorage), hiện ✓ ở mục lục.
- Bài chưa có nội dung vẫn mở được: báo "đang soạn" + nút "Tạo prompt cho bài này" (mở Xưởng, chọn sẵn lớp, bài).
- "Học tiếp": lớp 9 nối sang chủ đề ôn thi vào 10 (`BaiHoc.LIEN_9`); lớp 10–12 tự nối chủ đề Vdc có cùng số bài trong trường `bai`.

## Trình chiếu, trò chơi HTML của thầy gắn vào bài (thầy yêu cầu 09/11/2026)
- Gắn bằng lệnh `python3 tools/gan-html.py <tệp> --lop L --bai B` (kiểm định dạng một tệp tự chạy, đặt tên, khai báo) hoặc thả tệp vào `~/Desktop/Con đường tới trường (Thả HTML Vào Đây)` rồi bấm `Đăng Con đường tới trường lên web.command` (`tools/day-len.py`). Quy tắc định dạng: `.agents/rules/dua-html-len-web.md`.
- Tệp HTML tự chạy đặt trong `tuong-tac/` (tên `lop<lớp>-b<bài>-<tên-ngắn>.html`, chép nguyên tệp thầy gửi, không sửa), khai báo trong `data/bai-hoc/tai-nguyen.js`: `BaiHoc.taiNguyen(lớp, bài, [{ ten, mo_ta, file, nguon }])`.
- Trang bài hiện khung 16:9 ở đầu tab Bài giảng (cả khi bài chưa có bài giảng chữ), nút ⛶ Toàn màn hình (iPhone không hỗ trợ thì mở tab mới) và ↗ Mở trong tab mới; mục lục hiện chip 🎬.
- Bản gộp `dist/`: `tools/build.py` nhúng nội dung tệp, web mở bằng địa chỉ blob. `kiem-tra.js` báo lỗi nếu tệp không có hoặc tệp trong `tuong-tac/` chưa gắn bài nào.
- Đã gắn: Toán 11 Bài 11 – trình chiếu tiết 1 "Vị trí tương đối của hai đường thẳng" (ô chữ PHẢN CHỨNG, hình 3D, phản biện AI, trắc nghiệm).

## Tệp
- `assets/js/baihoc.js` (BaiHoc): mucLuc, add, get, all, baiOf, route, previewHTML, numOf.
- `data/bai-hoc/muc-luc-kntt.js`: mục lục Toán 9 (32 bài), 10 (27), 11 (33), 12 (19) – chỉ tên chương, tên bài, không số trang. Đối chiếu web 09/11/2026 (Toán 9 đủ tên bài; Toán 10, 12 tên chương; Toán 11 tên từng bài). `kiem-tra.js` kiểm đủ số bài, đánh số liên tục.
- Nội dung bài: JSON `"loai":"bai_hoc"` (mẫu `Xuong.MAU_BAIHOC`, kiểm `NhapDL.check`, chuyển `NhapDL.bhEntry`) → `nhap/bai-hoc-l<lớp>-b<bài>.json` → `tools/nhap-du-lieu.py`. Nhập bản mới cùng lớp, bài thì thay bản cũ.
- Kiểm: lỗi nếu bài ngoài mục lục, < 2 mục bài giảng, không có ví dụ, `can_nho` < 3, trắc nghiệm < 4 câu hoặc không đủ 4 phương án, đúng – sai không đủ 4 ý true/false, đáp số trả lời ngắn không phải số. Lưu ý nếu đáp số > 4 kí tự, tên bài khác mục lục, 4 ý cùng Đúng/Sai.

## Bài mẫu (mau:true, "Mẫu minh họa" – tự soạn, chưa có SGK trong tai-lieu/)
- Toán 9 Bài 20 Viète · Toán 10 Bài 1 Mệnh đề · Toán 11 Bài 4 PT lượng giác cơ bản · Toán 12 Bài 1 Đơn điệu, cực trị. Mỗi bài 6 TN + 2 ĐS + 3 TLN.
- Nguồn sinh: script trong scratchpad phiên 09/11 (không lưu); sửa thì sửa thẳng tệp `nhap/*.json` rồi chạy lại nhap-du-lieu.py. Đáp số kiểm ở `kiem-dap-so.py` mục "Bài giảng – luyện tập online".
