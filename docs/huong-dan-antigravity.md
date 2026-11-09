# Lệnh cho Antigravity – web "Con đường tới trường"

Mở thư mục `~/Documents/con-duong-toi-truong` trong Antigravity, rồi gõ vào khung chat của Agent:

| Gõ | Việc Antigravity làm |
|---|---|
| `/dang-web` | Kiểm toàn bộ (dữ liệu, đáp số, định dạng) → đăng lên GitHub → web tự cập nhật sau 1–2 phút |
| `/kiem-tra-web` | Chỉ kiểm (đáp số, nguồn có thật, điểm bội 0,25…), sửa lỗi nhỏ, báo lại – CHƯA đăng |
| `/gan-html <tệp> vào <bài>` | Gắn trang trình chiếu, trò chơi HTML vào bài SGK rồi đăng. Ví dụ: `/gan-html tệp này vào Toán 11 bài Hai đường thẳng song song` |
| `/nhap-du-lieu` | Nhập JSON / Markdown do Gem, NotebookLM xuất (đề luyện, phiếu ôn tập, bài giảng, đề Văn), kiểm đáp số, nguồn, xuất PDF, đăng |
| `/soan-noi-dung <việc>` | Soạn mới từ tài liệu của thầy rồi nhập, kiểm, đăng. Ví dụ: `/soan-noi-dung 5 đề luyện Bài 3 đợt 2`, `/soan-noi-dung bài giảng Toán 10 Bài 16` |

- Không cần gõ lệnh vẫn được: Antigravity luôn tự kiểm rồi đăng sau khi làm xong (quy tắc `.agents/rules/luon-kiem-roi-dang.md`). Muốn xem trước thì dặn "chưa đăng".
- Nếu Antigravity chưa hiện lệnh `/…`: gõ "dùng skill dang-web" (hoặc tên skill khác). Các skill nằm ở `.agents/skills/`.
- Không dùng Antigravity: thả HTML vào thư mục "Con đường tới trường (Thả HTML Vào Đây)" ngoài Desktop rồi bấm đúp "Đăng Con đường tới trường lên web.command".
- Antigravity chỉ đăng khi kiểm đạt. Lần đầu có thể phải cài thêm: `python3 -m pip install --user sympy` (kiểm đáp số) và Playwright (xuất PDF, kiểm thử trình duyệt) – Antigravity tự đề nghị cài.
