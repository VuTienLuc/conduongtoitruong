# Ngữ văn vào 10 (Cấp 2)

## Ngữ văn vào 10 (thầy yêu cầu 19/10/2026)
Đối tượng: học sinh lực học trung bình. Cấu trúc đề thầy mô tả: **Đọc hiểu 6 điểm** (thể loại, chủ đề, thông điệp, bài học, tiếng Việt, đoạn văn khoảng 200 chữ) + **Viết 4 điểm** (bài văn khoảng 500 chữ phân tích, cảm nhận bài thơ hoặc truyện ngắn).
- Thầy đã chọn: thầy bổ sung đề Văn vào `tai-lieu/van9/` (không commit) → **đọc hết rồi mới soạn**, bám đúng cấu trúc và hướng dẫn chấm của Sở; ngữ liệu chỉ dùng **tác phẩm công bố trước 1929** (ca dao, thơ trung đại, Phạm Duy Tốn…) **và văn bản tự viết** – không chép thơ, truyện còn bản quyền; đặt trong web này (mục "Ngữ văn vào 10"); đợt đầu **10 đề** (5 phân tích thơ, 5 phân tích truyện ngắn).
- Phương pháp đã thống nhất: câu nhận biết trả lời 3 bước *Gọi tên – Chỉ ra – Tác dụng*; mẫu câu cho chủ đề, thông điệp, bài học; khung đoạn 200 chữ (Nêu vấn đề – Giải thích – 2 lí lẽ + 1 dẫn chứng – Phản đề – Bài học); dàn ý cố định bài 500 chữ (thơ: theo khổ/ý, nội dung + nghệ thuật + cảm nhận; truyện: tình huống, nhân vật, chi tiết, ngôi kể) kèm kho từ ngữ phân tích.
- Mỗi đề một PDF 3 trang: đề → **bài làm có gợi ý** (khung trả lời, câu mở đầu, dàn ý điền khuyết, giảm dần qua các đề) → **hướng dẫn chấm** từng ý + lỗi hay bị trừ.
- **Cập nhật 01/11/2026:** tài liệu Ngữ văn thầy để ở **NotebookLM** (không chép vào `tai-lieu/van9/`). Đề Văn được tạo bằng Xưởng dữ liệu: Gem có gắn notebook → JSON `"loai":"de_van"` → nhập vào web (notes/xuong-du-lieu.md). Không soạn tay đề Văn trong mã.
- Hiển thị: `assets/js/van.js`. Bài làm có gợi ý có 3 mức (Đầy đủ – Vừa – Ít), mặc định giảm dần theo thứ tự đề (3 đề đầu đầy đủ, 4 đề sau vừa, còn lại ít); học sinh chọn được mức khác.
- PDF: `python3 tools/xuat-de-pdf.py ngu-van` → `de-luyen/ngu-van/De-<mã>.pdf`. Đề mẫu `V00` (`nhap/van-v00.json`): thơ lục bát tự viết + "Câu cá mùa thu" (Nguyễn Khuyến, trước 1929).

