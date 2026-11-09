---
name: soan-noi-dung
description: Soạn nội dung mới cho web Con đường tới trường từ tài liệu của thầy – đề luyện Toán vào 10 theo bài (Bài 1…7c), phiếu ôn tập 90 phút, bài giảng – luyện tập online một bài SGK Toán 9–12 KNTT – rồi kiểm và đăng. Dùng khi thầy gõ /soan-noi-dung hoặc nói "soạn 5 đề Bài 3", "làm bài giảng Toán 10 Bài 16".
---
# /soan-noi-dung – soạn nội dung mới

Đọc trước: AGENTS.md, `notes/soan-tu-tai-lieu.md`, và ghi chú đúng mảng: `notes/luyen-de-vao-10.md` (đề luyện), `notes/xuong-du-lieu.md` (phiếu ôn tập), `notes/bai-giang-online.md` (bài giảng), `notes/ngu-van-vao-10.md` (Văn).

1. Hỏi thầy nếu thiếu: bài/chủ đề nào, bao nhiêu đề hoặc câu, mức học sinh. Kiểm phần đã có để không trùng (`grep -n "ten:" data/vao-10/luyen-de/*.js`, `ls nhap`).
2. Lấy dạng bài từ tài liệu thật: `tai-lieu/_text/` (đề tham khảo TP HCM các năm, chuyên đề) hoặc notebook thầy chỉ định. Đổi số liệu, giữ dạng; ghi `nguon` đúng tên tài liệu; không đoán tên quận, trường.
3. Viết JSON đúng mẫu (`MAU_TOAN` / `MAU_ONTAP` / `MAU_BAIHOC` trong `assets/js/xuong.js`):
   - công thức `$…$`, trong JSON viết hai dấu gạch `\\dfrac`; không viết `<`, `>` trần trong công thức;
   - điểm từng bước bội 0,25, tổng bằng điểm bài (Bài 1, 3: 1,5; Bài 2, 4, 5, 6: 1,0 – đối chiếu đề tham khảo mới nhất);
   - hình học: chỉ dùng kiến thức được phép (RULES trong `assets/js/app.js`);
   - bài giảng: bám thứ tự mục của bài SGK, viết lại ngắn gọn, không chép nguyên văn; `can_nho` 4–8 mục; đáp số trả lời ngắn ≤ 4 kí tự.
4. Lưu vào `nhap/` với tên chuẩn rồi làm các bước 2–6 của skill **nhap-du-lieu** (nhập, kiểm đáp số, PDF, đăng).
5. Mỗi đợt đề luyện nên đủ 5 hoặc 10 đề; cập nhật tiến độ trong `ACTIVE.md`.
