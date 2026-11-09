---
name: kiem-tra-web
description: Chỉ kiểm tra web Con đường tới trường (dữ liệu, đáp số, nguồn, định dạng) mà chưa đăng. Dùng khi thầy gõ /kiem-tra-web, nói "kiểm tra giúp", "xem dữ liệu đúng chưa", hoặc trước khi đăng một thay đổi lớn.
---
# /kiem-tra-web – kiểm, chưa đăng

1. `git status --short` và `git diff --stat` – liệt kê thay đổi chưa đăng.
2. `python3 tools/day-len.py --chi-kiem` (nhập `nhap/`, `kiem-tra.js`, `kiem-dap-so.py`, gộp dist). Thiếu sympy: `python3 -m pip install --user sympy`.
3. Với mỗi đề, bài mới trong thay đổi:
   - Tự giải lại đáp số từ số liệu đề; kiểm `tools/kiem-dap-so.py` đã có phép kiểm tính TỪ SỐ LIỆU ĐỀ cho từng đề (không phải chép đáp số so với chính nó). Thiếu thì thêm.
   - Trường `nguon`: tìm tên tài liệu trong `tai-lieu/_text/` (`grep -ril "<từ khoá>" tai-lieu/_text`). Không thấy thì sửa thành "Soạn theo dạng …" và báo thầy.
   - Điểm bội 0,25, tổng barem bằng điểm bài; công thức trong S`…`, dùng `\lt \gt`.
   - Không có bản trùng: cùng nội dung không được vừa ở `nhap/` vừa ở `data/vao-10/luyen-de/`.
4. Báo thầy: đạt hay chưa, đã sửa gì, còn gì cần thầy quyết. KHÔNG đăng – muốn đăng thì thầy gõ /dang-web.
