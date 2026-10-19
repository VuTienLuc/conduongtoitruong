# Hướng dẫn cho AI – dự án "Con đường tới trường"

Thư mục gốc: `~/Documents/con-duong-toi-truong`. Phần đã có: **Toán vào 10** (luyện thi tuyển sinh lớp 10 TP.HCM). Dự định mở rộng thành web nhiều chủ đề cho lớp 10, 11, 12 (mục 5).

> Người dùng là thầy Vũ Tiến Lực. Trả lời bằng tiếng Việt, gọi người dùng là "thầy". `AGENTS.md` giống hệt tệp này.

## 1. Dự án là gì
Web tĩnh (HTML + JS thường, không framework, không npm) cho học sinh lớp 9 tự ôn thi vào 10 theo **cấu trúc đề thống nhất 2026–2027 của Sở GD&ĐT TP.HCM** (7 bài, 10 điểm, 120 phút). Khuôn giao diện "vở ô chấm" giống web Học mà chơi.
Mỗi chủ đề có 7 tab: 📘 Lý thuyết · 💡 Mẹo nhớ · ✅ Hiểu bài (trắc nghiệm) · ✍️ Tự luận mẫu (barem từng bước + lỗi bị trừ điểm + cách trình bày) · 🖨️ Phiếu làm bài (A4, khung ô li, tuỳ chọn kèm bài mẫu / đáp án) · 📝 Luyện đề (10 đề đúng dạng tuyển sinh, mỗi đề một PDF – mục 8) · 🤖 Nhờ AI nhận xét (prompt A chấm bài kèm ảnh, prompt B gợi ý khi bí).

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
| `assets/js/luyende.js`, `data/vao-10/luyen-de/`, `tools/xuat-de-pdf.py`, `de-luyen/` | Luyện đề vào 10: 10 đề/chủ đề, mỗi đề một PDF (mục 8) |

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
- `nguon` bắt buộc (tên tệp tài liệu đã dùng; danh sách đầy đủ tên tệp ghi trong chú thích đầu tệp dữ liệu); chủ đề soạn khi chưa có tài liệu phải ghi `mau:true` (web hiện nhãn "Mẫu minh họa").
- **Đã soạn theo ma trận giữa kì I** (`MA_TR_N_GKI.docx`: câu VD là TLN-1…4 và Đúng–Sai ĐS-1…3, mỗi lớp 1 câu VDC) và các đề, đề cương trong `tai-lieu/lop10`, `tai-lieu/lop11` (số liệu đã đổi, đáp số tự tính lại – nhiều đáp án trong tài liệu gốc bị sai):
  - Lớp 10: `c1-tap-hop-ven` (TLN-1/2, ĐS-1) · `c1-tap-hop-tham-so` (TLN-1/2, ĐS-1) · `c2-toi-uu-mien-nghiem` (TLN-3 VDC, ĐS-2) · `c3-he-thuc-luong-thuc-te` (TLN-4, ĐS-3).
  - Lớp 11: `c1-cong-thuc-luong-giac` (ĐS-1) · `c1-ham-so-luong-giac-thuc-te` (TLN-1) · `c1-phuong-trinh-luong-giac` (TLN-2 VDC) · `c2-cap-so-cong` (TLN-3, ĐS-2) · `c2-cap-so-nhan` (TLN-4) · `c3-mau-so-lieu-ghep-nhom` (ĐS-3). Tổng cấp số nhân lùi vô hạn thuộc chương Giới hạn – không có trong giữa kì I.
- Công thức dài: `math.js` tự gắn lớp `mjx-wide` (cuộn ngang riêng công thức) trên điện thoại. Trên phiếu in, gợi ý nằm trong ô hẹp (nửa trang) – tách công thức dài thành nhiều đoạn \( \) ngắn; `test_web.py` báo lỗi nếu công thức tràn khung trên phiếu. Mọi chuỗi có công thức phải viết bằng S`…` (`kiem-tra.js` báo lỗi nếu nằm trong nháy đơn).
- Hình: `Fig.plane` (miền nghiệm, đường thẳng, đỉnh), `Fig.venn` (Ven 2–3 tập, tô miền), `Fig.func` (đồ thị hàm số, mô hình lượng giác), `Fig.geo`, `Fig.parab`, `Fig.solid`. Bảng số liệu: `<table class="tbl">`.
- Mỗi chủ đề mới: thêm phép tính kiểm đáp số vào `tools/kiem-dap-so.py`; `tools/test_web.py` tự mở mọi trang, xuất PDF và **giải mã từng QR** so với đường link lời giải.

## 8. Luyện đề vào 10 – mỗi chủ đề 10 đề, mỗi đề một PDF (thầy yêu cầu 18/10/2026)
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
