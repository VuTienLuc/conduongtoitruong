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
| `data/lop10/`, `data/lop11/`, `data/lop12/` | **Lớp 10–12: vận dụng, vận dụng cao** – mỗi chủ đề một tệp, gọi `Vdc.add({...})` (mục 7) |
| `assets/js/vdc.js` | Trang lớp 10–12: danh sách theo kì, trang chủ đề, phiếu PDF có dòng kẻ + gợi ý + QR, trang lời giải (đích của QR) |
| `assets/vendor/qrcode/qrcode.js` | Thư viện tạo mã QR (Kazuhiko Arase, MIT), chạy không cần mạng |
| `docs/` | Tài liệu kèm theo: kế hoạch 6 tháng luyện thi vào 10 |
| `tai-lieu/lop9`, `lop10`, `lop11`, `lop12` | **Tài liệu gốc thầy cung cấp** (SGK, mục lục, đề, ma trận, hướng dẫn chấm). Chỉ ở trên máy thầy, không đưa lên GitHub |
| `assets/js/core.js` | `Topics`, tiện ích `U` (lưu trữ, sao chép, chuyển HTML → văn bản cho prompt), `S` = `String.raw` |
| `assets/js/figures.js` | Hình SVG: `Fig.parab`, `Fig.geo` (toạ độ thực, y hướng lên), `Fig.solid('tru'|'non'|'cau'|'kem'|'coc-bi')` |
| `assets/js/app.js` | Điều hướng, 6 tab, phiếu in (`App.sheetHTML`), prompt (`App.promptGrade/promptHint`), `STRUCT`, `RULES`, `ROADMAP` |
| `assets/js/math.js` + `assets/vendor/mathjax/` | MathJax 3 đặt sẵn |
| `tools/kiem-tra.js` | Kiểm hợp đồng dữ liệu, barem, LaTeX, thẻ HTML |
| `tools/kiem-dap-so.py` | Tính lại độc lập mọi đáp số (sympy) |
| `tools/test_web.py` | Playwright: mọi chủ đề × 6 tab trên điện thoại + iPad, trắc nghiệm, bài mẫu, prompt, PDF phiếu |
| `tools/build.py` | Gộp thành `dist/con-duong-toi-truong.html` |

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

## 5. Mở rộng cho lớp 10, 11, 12 (ghi chú cũ – nay làm theo mục 7)
- Giữ nguyên khuôn 6 tab (Lý thuyết · Mẹo nhớ · Hiểu bài · Tự luận mẫu · Phiếu làm bài · Nhờ AI nhận xét) và hợp đồng dữ liệu mục 3; mỗi chủ đề thêm trường `grade:'vao-10'|'lop10'|'lop11'|'lop12'`.
- Nội dung đặt trong `data/lop10/`, `data/lop11/`, `data/lop12/`, mỗi chủ đề một tệp; bám SGK Kết nối tri thức, chương trình GDPT 2018; đề thi tốt nghiệp THPT cho lớp 12 theo cấu trúc 3 phần (TN, Đúng–Sai, Trả lời ngắn).
- Khi có khối thứ hai: thêm trang chọn khối ở `#/` và đường link `#/<khối>/cd/<mã>/<tab>`; `Topics.list` lọc theo `grade`; `STRUCT`, `ROADMAP`, `RULES` chuyển thành dữ liệu theo khối (tệp `data/<khối>/_khoi.js`). Bản vào 10 hiện tại là khối đầu tiên, link cũ `#/cd/...` vẫn phải chạy.
- Phiếu in, prompt AI, kiểm tra (`kiem-tra.js`, `kiem-dap-so.py`, `test_web.py`) dùng chung cho mọi khối.

## 6. Soạn nội dung từ tài liệu gốc (thầy yêu cầu 18/10/2026)
- Trước khi soạn chủ đề của lớp nào, **đọc hết tài liệu trong `tai-lieu/<lớp>/`** (lớp 9 → `data/vao-10/`, lớp 10 → `data/lop10/`, lớp 11 → `data/lop11/`, lớp 12 → `data/lop12/`).
- Bám **đúng chương trình** trong tài liệu: tên chương, tên bài, thứ tự, yêu cầu cần đạt, cấu trúc đề. Không tự thêm nội dung ngoài chương trình; không bịa số trang, số bài.
- Tài liệu thiếu hoặc mâu thuẫn: hỏi thầy, không đoán. Đề lấy từ tài liệu thì ghi nguồn (tên tệp) trong chú thích của tệp dữ liệu.
- Không chép nguyên văn dài từ SGK; diễn đạt lại, giữ đúng thuật ngữ và kí hiệu của SGK.
- Tệp trong `tai-lieu/` không commit (đã có `.gitignore`); chỉ commit phần web soạn ra.

## 7. Lớp 10, 11, 12 – chỉ luyện VẬN DỤNG và VẬN DỤNG CAO (thầy yêu cầu 18/10/2026)
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
- `nguon` bắt buộc (tên tệp tài liệu đã dùng); chủ đề soạn khi chưa có tài liệu phải ghi `mau:true` (web hiện nhãn "Mẫu minh họa"). Hiện có 1 chủ đề mẫu: Toán 10 Chương II `c2-toi-uu-mien-nghiem` – thay/sửa theo tài liệu của thầy khi có.
- Hình: `Fig.plane` (miền nghiệm, đường thẳng, đỉnh), `Fig.geo`, `Fig.parab`, `Fig.solid`.
- Mỗi chủ đề mới: thêm phép tính kiểm đáp số vào `tools/kiem-dap-so.py`; `tools/test_web.py` tự mở mọi trang, xuất PDF và **giải mã từng QR** so với đường link lời giải.
