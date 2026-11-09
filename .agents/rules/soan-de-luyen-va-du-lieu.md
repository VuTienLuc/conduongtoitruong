---
trigger: model_decision
description: "Đọc khi soạn hoặc nhập đề luyện Toán vào 10, phiếu ôn tập, bài giảng – luyện tập, đề Văn (JSON từ NotebookLM/Gem) vào web Con đường tới trường."
---
# Soạn và nhập dữ liệu học tập (đề luyện, phiếu ôn tập, bài giảng)

Rút kinh nghiệm lần nhập đề Bài 3, Bài 5 (09/11/2026). Quy tắc chung ở AGENTS.md.

## Nhập dữ liệu: chỉ một đường
- JSON từ AI chép vào `nhap/` rồi chạy `python3 tools/nhap-du-lieu.py` (tự tạo `data/nhap/*.js`, tự thêm vào index.html, tự kiểm). Mẫu JSON và hướng dẫn: `notes/xuong-du-lieu.md`.
- KHÔNG tự viết thêm tệp `data/vao-10/luyen-de/*.js` có cùng nội dung với JSON trong `nhap/` – web sẽ hiện đề hai lần. Nếu đã chuyển tay thành tệp `ld*.js` thì chuyển JSON gốc sang `docs/nguon-ai/`, không để trong `nhap/`.
- Không gắn `nhap: true` để lách quy tắc "mỗi bộ 10, 20… đề".

## Nguồn
- Trường `nguon` chỉ ghi tài liệu có thật, đọc được trong `tai-lieu/` hoặc trong notebook thầy chỉ định, ghi đúng tên tài liệu (ví dụ "Bộ đề tham khảo tuyển sinh lớp 10 môn Toán 2025 – 2026 sở GD&ĐT TP Hồ Chí Minh (đề Quận Bình Tân)").
- Không đoán tên quận, trường, số đề. Không chắc thì ghi "Soạn theo dạng Bài N đề tuyển sinh lớp 10 TP HCM (…)".

## Kiểm đáp số
- Mỗi đề thêm phép tính độc lập vào `tools/kiem-dap-so.py`: tính lại TỪ SỐ LIỆU CỦA ĐỀ (không chép lại đáp số rồi so với chính nó), dùng `float`/`Fraction`, không trộn `sympy.Rational` với số thập phân rồi so bằng `==`.
- Chạy thật `python3 tools/kiem-dap-so.py` và `node tools/kiem-tra.js`; chỉ báo "đạt" khi dòng cuối là `KẾT QUẢ: ĐẠT ✓`.
- Điểm từng bước bội 0,25; tổng barem = điểm bài (Bài 3: 1,5; Bài 5: 1,0 theo đề tham khảo 2026 – 2027).

## Đẩy lên
- Xong thì chạy `python3 tools/day-len.py --khong-hoi --msg "…"` (xem `.agents/rules/dua-html-len-web.md`). Không để việc dở chưa kiểm trên máy.
