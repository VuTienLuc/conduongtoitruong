# CLAUDE.md — Con đường tới trường
> Cấp 1. Giữ ≤ 50 dòng. Chỉ quy tắc chung và chỉ đường. Chi tiết để ở notes/. `AGENTS.md` giống hệt tệp này.

## Người dùng
- Thầy Vũ Tiến Lực, giáo viên Toán THPT Nguyễn Hữu Cảnh (TP.HCM). Xưng "thầy", trả lời tiếng Việt.

## Quy tắc tối thượng
- Model chính quyết định, viết code, sửa file. Subagent Haiku chỉ tìm file và đọc dữ liệu.
- Điều gì thầy nhắc từ 2–3 lần → ghi ngay vào đúng cấp bộ nhớ (xem Bản đồ).
- File này không vượt 50 dòng. Thêm chi tiết → viết vào notes/, ở đây chỉ để đường dẫn.
- Soạn nội dung bám tài liệu thầy đưa, đổi số liệu, ghi nguồn; không bịa số trang, số bài; thiếu hoặc mâu thuẫn thì hỏi (notes/soan-tu-tai-lieu.md).
- `tai-lieu/` không commit. Không chép văn bản còn bản quyền; ngữ liệu Văn chỉ trước 1929 hoặc tự viết.
- Mọi đáp số tính lại độc lập (`tools/kiem-dap-so.py`); hình học không dùng kiến thức bị cấm (`RULES` trong app.js).
- Chuỗi có công thức viết bằng S`…`; trong công thức dùng `\lt \gt`; điểm bội 0,25, tổng barem = điểm câu.

## Dự án
- Web tĩnh (HTML + JS thường, không npm) cho học sinh tự học: Toán vào 10 TP.HCM, Toán 10–12 vận dụng – vận dụng cao, Ngữ văn vào 10.
- Thư mục: `~/Documents/con-duong-toi-truong` · GitHub `VuTienLuc/conduongtoitruong` · mở `index.html` hoặc `dist/con-duong-toi-truong.html`.
- Sau mỗi thay đổi: `node tools/kiem-tra.js` → `python3 tools/kiem-dap-so.py` → `python3 tools/xuat-de-pdf.py [mã…]` → `python3 tools/test_web.py` → `python3 tools/build.py` → commit, push, `git pull` trên máy thầy.
- Dữ liệu mới từ AI: chép tệp vào `nhap/` → `python3 tools/nhap-du-lieu.py`.

## Bản đồ bộ nhớ
- Cấp 2 — notes/ (kiến thức, quyết định theo chủ đề):
  - notes/quyet-dinh.md — quyết định đã chốt: ngày, nội dung, lý do
  - notes/kien-truc.md — tệp, hợp đồng dữ liệu Topics, quy trình kiểm, mở rộng khối lớp
  - notes/soan-tu-tai-lieu.md — quy tắc soạn từ tài liệu gốc
  - notes/luyen-de-vao-10.md — luyện đề Toán vào 10, tiến độ từng bài, gợi ý 7b/7c, Thẻ công cụ
  - notes/lop10-12-vdc.md — lớp 10–12 vận dụng, vận dụng cao (Vdc, phiếu QR)
  - notes/ngu-van-vao-10.md — Ngữ văn vào 10: cấu trúc, phương pháp, hiển thị
  - notes/xuong-du-lieu.md — Xưởng dữ liệu: prompt cho AI, mẫu JSON, nhập vào hệ thống
  - notes/loi-da-gap.md — lỗi đã gặp và cách sửa
- Cấp 3 — ACTIVE.md: việc đang làm dở, cập nhật mỗi phiên.
- Dọn dẹp tuần: notes/don-dep-bo-nho.md

## Mỗi phiên làm việc
1. Đọc CLAUDE.md, rồi ACTIVE.md.
2. Chỉ mở file trong notes/ khi việc đang làm cần đến.
3. Cuối phiên: cập nhật ACTIVE.md; quyết định mới ghi vào notes/quyet-dinh.md.
