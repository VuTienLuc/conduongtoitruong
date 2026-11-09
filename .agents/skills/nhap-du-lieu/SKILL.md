---
name: nhap-du-lieu
description: Nhập tệp JSON hoặc Markdown do Gem/NotebookLM xuất (đề luyện Toán vào 10, phiếu ôn tập 90 phút, bài giảng – luyện tập lớp 9–12, đề Ngữ văn) vào web Con đường tới trường, kiểm đáp số, nguồn rồi đăng. Dùng khi thầy gõ /nhap-du-lieu hoặc gửi tệp, dán câu trả lời của AI và nói "nhập vào web".
---
# /nhap-du-lieu – nhập dữ liệu AI vào web

Tài liệu: `notes/xuong-du-lieu.md` (các loại dữ liệu, trường bắt buộc). Mẫu JSON: `MAU_TOAN`, `MAU_ONTAP`, `MAU_BAIHOC`, `MAU_VAN` trong `assets/js/xuong.js`.

1. Lưu nguyên văn câu trả lời / tệp vào `nhap/` với tên chuẩn:
   - đề luyện Toán: `toan-bai<N>-dot<k>.json` · phiếu ôn tập: `on-tap-b<N>-dot<k>.json` hoặc `.md`
   - bài giảng: `bai-hoc-l<lớp>-b<bài 2 chữ số>.json` · Ngữ văn: `van-<mã đề>.json`
2. `python3 tools/nhap-du-lieu.py` – tệp lỗi bị bỏ qua và in lỗi. Sửa lỗi TRONG tệp ở `nhap/` (thiếu trường, điểm không bội 0,25, đáp số trả lời ngắn không phải số…), chạy lại tới khi tất cả ✓.
   - KHÔNG tự viết thêm `data/vao-10/luyen-de/*.js` hay `data/nhap/*.js` bằng tay – lệnh tự tạo.
3. Kiểm nội dung từng đề, bài mới:
   - Tự giải lại; thêm phép kiểm vào `tools/kiem-dap-so.py` (mục riêng, tên `NHẬP <tệp> câu …`), tính từ số liệu đề bằng float/Fraction/sympy rồi so với đáp số ghi trong tệp. Sai thì sửa tệp trong `nhap/` và báo thầy.
   - `nguon` phải có thật: `grep -ril "<từ khoá>" tai-lieu/_text`. Không thấy thì ghi "Soạn theo dạng …".
   - Văn: `nguon_goc` chỉ `truoc_1929` hoặc `tu_viet`; không chép văn bản còn bản quyền.
4. Xuất PDF nếu là đề luyện, phiếu ôn tập, đề Văn: `python3 tools/xuat-de-pdf.py <mã bộ | on-tap | ngu-van>`.
5. Làm tiếp các bước của skill **dang-web** (message ví dụ: "Nhập 5 đề luyện Bài 3 đợt 2").
6. Báo thầy: đã nhập gì, bao nhiêu đề/câu, sửa gì, đường dẫn trên web.
