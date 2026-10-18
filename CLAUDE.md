# Hướng dẫn cho AI – dự án "Con đường tới trường"

Thư mục gốc: `~/Documents/con-duong-toi-truong`. Phần đã có: **Toán vào 10** (luyện thi tuyển sinh lớp 10 TP.HCM). Dự định mở rộng thành web nhiều chủ đề cho lớp 10, 11, 12 (mục 5).

> Người dùng là thầy Vũ Tiến Lực. Trả lời bằng tiếng Việt, gọi người dùng là "thầy". `AGENTS.md` giống hệt tệp này.

## 1. Dự án là gì
Web tĩnh (HTML + JS thường, không framework, không npm) cho học sinh lớp 9 tự ôn thi vào 10 theo **cấu trúc đề thống nhất 2026–2027 của Sở GD&ĐT TP.HCM** (7 bài, 10 điểm, 120 phút). Khuôn giao diện "vở ô chấm" giống web Học mà chơi.
Mỗi chủ đề có 6 tab: 📘 Lý thuyết · 💡 Mẹo nhớ · ✅ Hiểu bài (trắc nghiệm) · ✍️ Tự luận mẫu (barem từng bước + lỗi bị trừ điểm + cách trình bày) · 🖨️ Phiếu làm bài (A4, khung ô li, tuỳ chọn kèm bài mẫu / đáp án) · 🤖 Nhờ AI nhận xét (prompt A chấm bài kèm ảnh, prompt B gợi ý khi bí).

## 2. Tệp
| Tệp | Vai trò |
|---|---|
| `config.js` | Tên web, người soạn, năm, đường link ChatGPT/Gemini/Claude |
| `data/vao-10/cdNN-*.js` | **Nội dung Toán vào 10** – mỗi chủ đề một tệp, gọi `Topics.add({...})` |
| `data/lop10/`, `data/lop11/`, `data/lop12/` | Dành sẵn cho nội dung lớp 10–12 (đang trống) |
| `docs/` | Tài liệu kèm theo: kế hoạch 6 tháng luyện thi vào 10 |
| `assets/js/core.js` | `Topics`, tiện ích `U` (lưu trữ, sao chép, chuyển HTML → văn bản cho prompt), `S` = `String.raw` |
| `assets/js/figures.js` | Hình SVG: `Fig.parab`, `Fig.geo` (toạ độ thực, y hướng lên), `Fig.solid('tru'|'non'|'cau'|'kem'|'coc-bi')` |
| `assets/js/app.js` | Điều hướng, 6 tab, phiếu in (`App.sheetHTML`), prompt (`App.promptGrade/promptHint`), `STRUCT`, `RULES`, `ROADMAP` |
| `assets/js/math.js` + `assets/vendor/mathjax/` | MathJax 3 đặt sẵn |
| `tools/kiem-tra.js` | Kiểm hợp đồng dữ liệu, barem, LaTeX, thẻ HTML |
| `tools/kiem-dap-so.py` | Tính lại độc lập mọi đáp số (sympy) |
| `tools/test_web.py` | Playwright: mọi chủ đề × 6 tab trên điện thoại + iPad, trắc nghiệm, bài mẫu, prompt, PDF phiếu |
| `tools/build.py` | Gộp thành `dist/toan-vao-10.html` |

## 3. Hợp đồng dữ liệu một chủ đề
```js
Topics.add({
  id:'ma-khong-dau', no:11, bai:'Bài x · y điểm', rules:true /* hình học: đưa quy định chấm vào prompt */,
  title:S`…`, desc:'…',
  remind:[S`…`×≥3],                          // Nhắc nhanh (in trên phiếu)
  theory:[{t, b, warn?, fig?}×≥3],            // b là HTML, công thức \( \) hoặc \[ \]
  tips:[{t, b}×≥4],                           // Mẹo nhớ
  quiz:[{q, a:[ĐÚNG, sai, sai, sai], why}×≥8],// phương án đúng đứng ĐẦU, web tự đảo
  models:[{title, pts, de, fig?, steps:[{part}|{s, p, warn?}], loi:[…]}],  // tổng p = pts
  present:['…'×≥4],                            // Trình bày để không bị trừ điểm
  practice:[{lv:'Cơ bản'|'Khá'|'Nâng cao', pts, h /*mm khung ô li*/, de, figQ? /*in trên phiếu*/, fig? /*chỉ ở đáp án*/, ans, barem:[[nội dung, điểm]…]}×3],
});
```
Quy tắc: điểm là bội 0,25; tổng barem = `pts`; viết chuỗi bằng `S\`…\`` để không phải gấp đôi `\`; trong công thức dùng `\lt \gt`, không gõ `<` `>`. Hình học: **không** viện dẫn kiến thức bị cấm (xem `RULES` trong app.js) – phải chứng minh lại.

## 4. Sau mỗi thay đổi
```bash
node tools/kiem-tra.js          # phải in ĐẠT ✓
python3 tools/kiem-dap-so.py    # thêm phép tính cho bài mới, phải ĐẠT ✓
python3 tools/test_web.py       # phiếu làm bài ≤ 2 trang A4, không lỗi công thức, không tràn ngang
python3 tools/build.py
```
Thêm chủ đề vào 10 = thêm tệp `data/vao-10/cdNN-*.js` + một dòng `<script>` trong `index.html` (+ cập nhật `STRUCT`/`ROADMAP` nếu cần). `tools/kiem-tra.js` báo lỗi nếu một tệp trong `data/` chưa có thẻ `<script>`.

## 5. Mở rộng cho lớp 10, 11, 12 (chưa làm – hướng đi đã thống nhất)
- Giữ nguyên khuôn 6 tab (Lý thuyết · Mẹo nhớ · Hiểu bài · Tự luận mẫu · Phiếu làm bài · Nhờ AI nhận xét) và hợp đồng dữ liệu mục 3; mỗi chủ đề thêm trường `grade:'vao-10'|'lop10'|'lop11'|'lop12'`.
- Nội dung đặt trong `data/lop10/`, `data/lop11/`, `data/lop12/`, mỗi chủ đề một tệp; bám SGK Kết nối tri thức, chương trình GDPT 2018; đề thi tốt nghiệp THPT cho lớp 12 theo cấu trúc 3 phần (TN, Đúng–Sai, Trả lời ngắn).
- Khi có khối thứ hai: thêm trang chọn khối ở `#/` và đường link `#/<khối>/cd/<mã>/<tab>`; `Topics.list` lọc theo `grade`; `STRUCT`, `ROADMAP`, `RULES` chuyển thành dữ liệu theo khối (tệp `data/<khối>/_khoi.js`). Bản vào 10 hiện tại là khối đầu tiên, link cũ `#/cd/...` vẫn phải chạy.
- Phiếu in, prompt AI, kiểm tra (`kiem-tra.js`, `kiem-dap-so.py`, `test_web.py`) dùng chung cho mọi khối.
