# Bài giảng – Luyện tập online lớp 9–12 (Cấp 2)
> Thầy yêu cầu 09/11/2026: "menu bài giảng – luyện tập online cho lớp 9-10-11-12, bài học theo mục lục SGK Toán KNTT".
> Đọc khi sửa trang bài học, thêm nội dung bài, sửa mục lục.

## Trang
- `#/bai-hoc` chọn lớp → `#/bai-hoc/<lớp>` mục lục (Tập 1, Tập 2 → chương → bài, ô tìm bài không dấu) → `#/bai-hoc/<lớp>/<bài>` 📘 Bài giảng, `/luyen` ✍️ Luyện tập online.
- Bài giảng: mục tiêu → từng mục kiến thức (ví dụ có "Xem lời giải", ⚠️ lưu ý hay sai) → 🔑 Cần nhớ.
- Luyện tập: Phần I trắc nghiệm (đảo phương án), Phần II đúng – sai (4 ý, mỗi ý 1 điểm), Phần III trả lời ngắn (nhận 2,5 / 2.5 / 3/4). Chấm ngay từng câu; xong hết thì lưu điểm cao nhất `bh:<lớp>-<bài>` (localStorage), hiện ✓ ở mục lục.
- Bài chưa có nội dung vẫn mở được: báo "đang soạn" + nút "Tạo prompt cho bài này" (mở Xưởng, chọn sẵn lớp, bài).
- Lớp 9: bài trùng hẳn một chủ đề ôn thi vào 10 (`BaiHoc.DUNG_9`: Bài 3, 15, 18, 19, 25, 26, 31, 32; Bài 20 có bài riêng) chưa có bài giảng riêng thì tự dùng nội dung chủ đề (lý thuyết, mẹo, bài mẫu barem, trắc nghiệm) + khung 🎯 trỏ sang đề luyện PDF. Nhập bài giảng riêng (`bai_hoc`) thì bài riêng được ưu tiên. (thầy nhắc 09/11/2026: Chủ đề 5 đã có mà Bài 31, 32 ghi "Đang soạn")
- "Học tiếp": lớp 9 nối sang chủ đề ôn thi vào 10 (`BaiHoc.LIEN_9`); lớp 10–12 tự nối chủ đề Vdc có cùng số bài trong trường `bai`.
- 📽️ Trình chiếu (nút trên thanh tab, `assets/js/trinhchieu.js`, thầy yêu cầu 09/11/2026): toàn màn hình; mỗi trang một ý (bìa, mục tiêu, từng mục kiến thức, từng ví dụ, cần nhớ, bìa Luyện tập, từng câu, hết bài); cỡ chữ tự tính lấp đầy màn hình, lề 5vh/6vw; → / cách / Enter hiện từng bước (lời giải, đáp án, từng ý đúng – sai) rồi sang trang; ← lùi; A–D chọn; F bật/tắt toàn màn hình (vẫn chiếu trong cửa sổ); Esc hoặc thoát toàn màn hình = đóng; vuốt trên điện thoại. Có bộ công cụ ✦ (⭐ dojotienluc, 🖼️ picvtl) như khung HTML. Bấm ở tab Luyện tập thì bắt đầu ở bìa Luyện tập.
- Trình chiếu: trang nội dung chữ bám mép trên, chỉ dùng tối đa 80% chiều cao để chừa chỗ vẽ hình (thầy yêu cầu 09/11/2026); trang bìa vẫn canh giữa.
- 🖨️ Tab "Phiếu làm bài" (`#/bai-hoc/<lớp>/<bài>/phieu`): phiếu A4 in phát trên lớp – Cần nhớ (tuỳ chọn), Phần I trắc nghiệm (phương án đảo theo mã đề <lớp><bài 2 số><1–4>, cố định theo mã), Phần II bảng Đúng/Sai, Phần III ô đáp số + dòng kẻ, tự đánh giá; trang đáp án riêng (kèm lời giải thích, chữ cái đã đổi theo mã). In bằng `OnTap.printHTML` → Lưu PDF.
- Trình chiếu: - / + (nút A− A+) đổi cỡ chữ, 0 về 100%, nhớ cho lần sau; nhớ trang đang chiếu của từng bài 3 giờ (đóng nhầm mở lại chiếu tiếp). Công cụ ⭐/🖼️ tự bật toàn màn hình bên trong thì vẫn tính là đang chiếu (trước đây làm đóng trình chiếu, về trang đầu – thầy báo 09/11/2026).
- Phím O (thầy yêu cầu 09/11/2026): bật/tắt nhanh công cụ đầu tiên ⭐ (`CONFIG.congCuTrinhChieu[0]`) – trong 📽️ Trình chiếu và khung HTML toàn màn hình. O lần 1 mở (nửa hoặc cả màn hình như lần mở trước), O lần 2 thu gọn (giữ nguyên trang công cụ). Mở công cụ (bằng O hay bằng chuột) thì focus vẫn ở bài giảng. Đã bấm vào trong trang công cụ thì trang đó giữ phím (khác nguồn) – đưa chuột về phía bài giảng (hoặc lên thanh nút) là focus tự về, O dùng lại được. Khung công cụ không có quyền toàn màn hình riêng (bỏ `allowfullscreen`, thầy báo 09/11/2026: công cụ tự bật toàn màn hình thì mất nút ◧ ▁ để quay lại bài giảng) – dùng ⛶ của khung. Nhận cả `ev.code === 'KeyO'` (bộ gõ tiếng Việt). Bỏ qua khi đang gõ vào ô nhập (ô chữ trong HTML). `BaiHoc.congCu` gắn `fr.ccToggle(i)`.
- Lời giải thích trắc nghiệm AI viết theo thứ tự phương án gốc: `nhap.js` giữ `goc`, `BaiHoc.doiChu` đổi "Phương án D…" theo thứ tự đã đảo (lỗi thầy chụp màn hình 09/11/2026).

## Trình chiếu, trò chơi HTML của thầy gắn vào bài (thầy yêu cầu 09/11/2026)
- Gắn bằng lệnh `python3 tools/gan-html.py <tệp> --lop L --bai B` (kiểm định dạng một tệp tự chạy, đặt tên, khai báo) hoặc thả tệp vào `~/Desktop/Con đường tới trường (Thả HTML Vào Đây)` rồi bấm `Đăng Con đường tới trường lên web.command` (`tools/day-len.py`). Quy tắc định dạng: `.agents/rules/dua-html-len-web.md`.
- Tệp HTML tự chạy đặt trong `tuong-tac/` (tên `lop<lớp>-b<bài>-<tên-ngắn>.html`, chép nguyên tệp thầy gửi, không sửa), khai báo trong `data/bai-hoc/tai-nguyen.js`: `BaiHoc.taiNguyen(lớp, bài, [{ ten, mo_ta, file, nguon }])`.
- Trang bài hiện khung 16:9 ở đầu tab Bài giảng (cả khi bài chưa có bài giảng chữ), nút ⛶ Toàn màn hình (iPhone không hỗ trợ thì mở tab mới) và ↗ Mở trong tab mới; mục lục hiện chip 🎬.
- Toàn màn hình áp cho cả khung `.bh-frame` (máy không hỗ trợ như iPhone: phủ kín cửa sổ, có ✕ mờ góc trên). Khi toàn màn hình có biểu tượng ✦ rất mờ góc dưới phải → các biểu tượng công cụ `CONFIG.congCuTrinhChieu` trong `config.js` (hiện: dojotienluc.vercel.app ⭐, picvtl.vercel.app 🖼️; không hiện tên web) → trang mở trong khung ngay trong bài giảng: ◧ nửa màn hình (bài giảng thu về nửa trái), ⛶ cả màn hình, ▁ thu gọn (giữ trang, chấm xanh trên ✦), ✕ đóng. Trang công cụ phải cho phép nhúng iframe (không đặt X-Frame-Options). Thầy yêu cầu 09/11/2026.
- Bản gộp `dist/`: `tools/build.py` nhúng nội dung tệp, web mở bằng địa chỉ blob. `kiem-tra.js` báo lỗi nếu tệp không có hoặc tệp trong `tuong-tac/` chưa gắn bài nào.
- Đã gắn: Toán 11 Bài 11 – trình chiếu tiết 1 "Vị trí tương đối của hai đường thẳng" (ô chữ PHẢN CHỨNG, hình 3D, phản biện AI, trắc nghiệm).

## Nhập trùng bài đã có → Bộ 2, Bộ 3… (thầy chọn 09/11/2026)
- Cùng lớp + bài đã có: GIỮ bài giảng bản đầu; câu luyện tập của bản mới thành "Bộ N" (`BaiHoc.add` → `ghep`); câu trùng lời đề câu đã có (`BaiHoc.fpQ`) bị bỏ; mọi câu trùng thì không thêm bộ. Bài đang là MẪU (`mau:true`) thì bản thật thay hẳn. `e.tn/ds/tln` = ngân hàng mọi bộ, `e.bo` = từng bộ.
- Tên tệp bộ mới: `bai-hoc-l<lớp>-b<bài>-bo<N>.json` (Xưởng "Tải tệp chuẩn" tự đặt; `nhap-du-lieu.py` xếp tệp gốc trước tệp -bo). Không bao giờ đè tệp cũ.
- Xưởng → Nhập dữ liệu báo trước: "sẽ thành Bộ N: thêm x câu mới, bỏ y câu trùng" hoặc "mọi câu đều đã có". Lưu trên máy (localStorage) cũng ghép thành bộ, không còn bị bỏ qua khi hệ thống đã có bài.
- Luyện tập online: có chọn 🎲 Ngẫu nhiên (khi ngân hàng vượt 12 TN / 2 ĐS / 4 TLN – `BaiHoc.HAN`) · Bộ 1, Bộ 2… · Tất cả. Ngẫu nhiên ưu tiên câu em làm sai, rồi chưa làm, rồi đã đúng (`bh:cau:<lớp>-<bài>`); nút "🎲 Làm lượt mới". Lựa chọn nhớ ở `bh:bo:<lớp>-<bài>`. Điểm cao nhất giữ lượt có tỉ lệ đúng cao nhất.
- 📊 Xuất Excel đáp án dạng UNT (tab Phiếu làm bài, thầy yêu cầu 09/11/2026, mẫu thầy chụp): sheet "Đáp án", cột A "Câu" đánh số liên tục cả 3 phần, mỗi mã đề một cột tiêu đề 3 chữ số (chữ, giữ số 0 đầu); Phần I A–D, Phần II một ô 4 chữ Đ/S theo ý a–d (ĐSĐS), Phần III đáp số dấu chấm (-1.5), phân số đổi ra thập phân. Mã đề in trên phiếu đổi thành 3 chữ số: "Mã đề đầu" (mặc định 001) → mã 1–4 = 001–004; chọn xuất 1–4 mã. Tạo .xlsx bằng `assets/js/xlsx.js` (không thư viện ngoài), `BaiHoc.dapAnUNT(e, o, soMa)`. Chưa có ô LĐ/LS (luôn đúng/luôn sai) – thầy sửa tay trong Excel khi cần.
- Phiếu làm bài: chọn bộ như trên; 🎲 rút theo mã đề (cùng mã in lại ra cùng câu). Trình chiếu dùng đúng lượt đang hiện ở tab Luyện tập.
- `nhap-du-lieu.py`: tệp lỗi thì giữ bản cũ đang có trên web (trước đây bị gỡ).

## Tệp
- `assets/js/baihoc.js` (BaiHoc): mucLuc, add, get, all, baiOf, route, previewHTML, numOf.
- `data/bai-hoc/muc-luc-kntt.js`: mục lục Toán 9 (32 bài), 10 (27), 11 (33), 12 (19) – chỉ tên chương, tên bài, không số trang. Đối chiếu web 09/11/2026 (Toán 9 đủ tên bài; Toán 10, 12 tên chương; Toán 11 tên từng bài). `kiem-tra.js` kiểm đủ số bài, đánh số liên tục.
- Nội dung bài: JSON `"loai":"bai_hoc"` (mẫu `Xuong.MAU_BAIHOC`, kiểm `NhapDL.check`, chuyển `NhapDL.bhEntry`) → `nhap/bai-hoc-l<lớp>-b<bài>.json` → `tools/nhap-du-lieu.py`. Sửa lỗi một bản = sửa thẳng tệp đó trong `nhap/` (cùng tên → thay).
- Kiểm: lỗi nếu bài ngoài mục lục, < 2 mục bài giảng, không có ví dụ, `can_nho` < 3, trắc nghiệm < 4 câu hoặc không đủ 4 phương án, đúng – sai không đủ 4 ý true/false, đáp số trả lời ngắn không phải số. Lưu ý nếu đáp số > 4 kí tự, tên bài khác mục lục, 4 ý cùng Đúng/Sai.

## Bài mẫu (mau:true, "Mẫu minh họa" – tự soạn, chưa có SGK trong tai-lieu/)
- Toán 9 Bài 20 Viète · Toán 10 Bài 1 Mệnh đề · Toán 11 Bài 4 PT lượng giác cơ bản · Toán 12 Bài 1 Đơn điệu, cực trị. Mỗi bài 6 TN + 2 ĐS + 3 TLN.
- Nguồn sinh: script trong scratchpad phiên 09/11 (không lưu); sửa thì sửa thẳng tệp `nhap/*.json` rồi chạy lại nhap-du-lieu.py. Đáp số kiểm ở `kiem-dap-so.py` mục "Bài giảng – luyện tập online".
