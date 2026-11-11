# Quyết định đã chốt (Cấp 2)
> Mỗi dòng một quyết định. Quyết định bị thay thì sửa dòng cũ, ghi "(trước đây: …)".

| Ngày | Quyết định | Lý do |
|---|---|---|
| 18/10/2026 | Soạn nội dung từ tài liệu thầy đưa, đổi số liệu, ghi nguồn; không commit `tai-lieu/` | Bám đúng chương trình, tài liệu có bản quyền |
| 18/10/2026 | Lớp 10–12 chỉ luyện vận dụng, vận dụng cao; phiếu PDF có dòng kẻ, gợi ý, QR lời giải | Đối tượng học sinh khá, giỏi lấy điểm cao giữa kì, cuối kì |
| 18/10/2026 | Toán vào 10: mỗi chủ đề 10, 20… đề luyện, mỗi đề một PDF; ưu tiên học kì I | Rèn thành thạo từng bài của đề tuyển sinh |
| 19/10/2026 | 7b, 7c có gợi ý 3 nấc giảm dần (đề 1–7: 3, 8–14: 2, 15–20: 1), Thẻ công cụ, Luyện tư duy mỗi ngày; 7a và Bài 1 không cần gợi ý | Học sinh hay bí 7b, 7c; 7a, Bài 1 là cơ bản |
| 19/10/2026 | Ngữ văn vào 10 cho học sinh trung bình: Đọc hiểu 6 + Viết 4; 10 đề đợt đầu (5 thơ, 5 truyện); đặt trong web này | Thầy chọn |
| 19/10/2026 | Ngữ liệu Văn chỉ dùng tác phẩm công bố trước 1929 hoặc văn bản tự viết | Không chép thơ, truyện còn bản quyền |
| 01/11/2026 | Tài liệu Văn ở NotebookLM; dữ liệu mới vào web qua Xưởng dữ liệu (prompt → JSON → nhập) thay vì soạn tay | Thầy chọn; tiết kiệm token, dùng hạn mức Gemini |
| 01/11/2026 | Tổ chức bộ nhớ dự án 3 cấp: CLAUDE.md ≤ 50 dòng, notes/, ACTIVE.md | Thầy yêu cầu (CLAUDE.md dài làm loãng bộ nhớ) |
| 04/11/2026 | Phiếu ôn tập 90 phút theo chủ đề: AI tìm bài trong notebook (mặc định giữ nguyên đề gốc, ghi nguồn), cơ bản → nâng cao; mỗi đợt tránh bài đợt trước bằng danh sách "Đã dùng" + kiểm trùng khi nhập; JSON hoặc Markdown | Thầy yêu cầu; dùng lại tài liệu thật để ôn sát đề |
| 09/11/2026 | Thêm menu Bài giảng – Luyện tập online lớp 9–12 xếp theo mục lục SGK Toán KNTT; nội dung từng bài tạo bằng Xưởng dữ liệu (JSON `bai_hoc`), luyện tập theo 3 dạng đề THPT chấm ngay; 4 bài mẫu minh họa | Thầy yêu cầu; dùng chung một quy trình prompt → JSON → nhập |
| 09/11/2026 | Trình chiếu, trò chơi HTML thầy soạn được gắn vào trang bài học (thư mục `tuong-tac/`, khai báo `data/bai-hoc/tai-nguyen.js`), giữ nguyên tệp gốc, nhúng khung 16:9 + toàn màn hình | Thầy yêu cầu gắn bài dạy Hai đường thẳng song song vào bài 11 lớp 11 |
| 09/11/2026 | Đẩy lên web bằng một lệnh `tools/day-len.py` (Desktop: `Đăng Con đường tới trường lên web.command`, thư mục thả HTML `~/Desktop/Con đường tới trường (Thả HTML Vào Đây)`); gắn HTML bằng `tools/gan-html.py`; Antigravity làm theo `.agents/rules/` | Thầy yêu cầu: tự đẩy từ Desktop, Antigravity đưa HTML đúng định dạng |
| 09/11/2026 | Antigravity có 5 lệnh (skill) `/dang-web`, `/kiem-tra-web`, `/gan-html`, `/nhap-du-lieu`, `/soan-noi-dung`; quy tắc luôn bật: làm xong tự kiểm (`day-len.py --chi-kiem`) rồi đăng (`day-len.py --khong-hoi`), kiểm chưa đạt thì không đăng | Thầy yêu cầu lệnh hướng dẫn cho Antigravity và tự động cập nhật lên web |
| 09/11/2026 | Dòng tên đầu mọi phiếu, đề PDF: "LỚP TOÁN – THẦY VŨ TIẾN LỰC" (thay "CON ĐƯỜNG TỚI TRƯỜNG"), sửa ở `config.js` → `tenPhieu`; tên web giữ nguyên | Thầy yêu cầu |
| 09/11/2026 | Phím O bật/tắt nhanh công cụ ⭐ khi trình chiếu (thu gọn giữ trang, mở lại như lần trước); không chiếm phím khi đang gõ vào ô nhập | Thầy yêu cầu |
| 09/11/2026 | Trang công cụ ⭐/🖼️ trong khung không được tự bật toàn màn hình (bỏ allowfullscreen); thanh ◧ ⛶ ▁ ✕ rõ hơn khi cả màn hình; focus luôn trả về bài giảng | Thầy báo: công cụ full màn hình không có nút về nửa màn hình / thu gọn, phím O không chạy |
| 09/11/2026 | Nhập bài giảng trùng lớp + bài đã có: giữ bài giảng bản đầu, câu luyện tập thành Bộ 2, 3… (bỏ câu trùng); luyện tập có 🎲 ngẫu nhiên 12 TN + 2 ĐS + 4 TLN ưu tiên câu sai/chưa làm, chọn từng bộ hoặc tất cả; phiếu in rút theo mã đề | Thầy chọn "Lưu thành bộ đề mới" + "Rút ngẫu nhiên mỗi lượt" |
| 09/11/2026 | Phiếu làm bài bài giảng: mã đề in 3 chữ số (mặc định 001–004) + nút Xuất Excel đáp án dạng UNT (Câu liên tục, mỗi mã một cột, ĐS ghép 4 chữ, TLN dấu chấm) | Thầy gửi mẫu Excel UNT |
| 10/11/2026 | Trình soạn thảo bài học của thầy đưa vào `cong-cu/`: thêm Quản lý JSON (thư viện trên máy), nút Đưa lên web để trình chiếu (postMessage, khoá bh-gui thay bản trước), web hiện hình SVG figures; lệnh Đăng nhận cả tệp .json | Thầy yêu cầu |
| 11/11/2026 | Sổ tay công thức tra cứu vào 10: Menu prompt soạn theo chủ đề (nền, Bài 1–7), dữ liệu so_tay_toan, trang #/so-tay (tìm, in PDF); nhập thêm chỉ thêm dạng mới | Thầy yêu cầu |
| 11/11/2026 | In sổ tay công thức thành một quyển (vào 10 hoặc 10–11–12) từ dữ liệu sẵn có: bìa, mục lục, màu chủ đề, mã mục, bảng A–Z, 4 kiểu in (tiết kiệm/cân đối/A5/chữ to) | Thầy yêu cầu |
| 11/11/2026 | Sổ tay vào 10: thêm hình minh họa trực quan cho phần kiến thức (hinh-minh-hoa.js) và lưu ý trình bày đạt điểm tối đa (trang quy tắc chung + khung mỗi chủ đề + trường trinh_bay cho dạng) | Thầy yêu cầu |
| 11/11/2026 | Ô "Kiểu in" chung cho mọi phiếu, đề (trừ Sổ tay): Chuẩn · Tiết kiệm (chữ 10, dòng sát, lề 7–8 mm, các phần in liền, giữ chỗ làm) · Siêu tiết kiệm (bỏ khung ô li, dòng kẻ). Đáp án (.sh-dapan) luôn sang trang mới; Luyện đề dồn đáp án về cuối. Lưu `in:kieu`, lớp `in-eco/in-eco2` trên html. Xuất PDF de-luyen/ vẫn kiểu chuẩn | Thầy yêu cầu |
