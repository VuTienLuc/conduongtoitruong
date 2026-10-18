/* Toán 11 – Chương II. Vận dụng, vận dụng cao: cấp số cộng – hệ điều kiện và bài toán thực tế.
   Ma trận giữa kì I (MA_TR_N_GKI.docx): Trả lời ngắn TLN-3, Đúng–Sai ĐS-2 – cấp số cộng, mức Vận dụng.
   Dạng bài lấy theo các đề trong tai-lieu/lop11/ (số liệu đã đổi, đáp số kiểm lại bằng tools/kiem-dap-so.py):
   - Đề giữa HK1/Đề giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT An Lạc – TP HCM.pdf (hệ u2 + u5 − u3, u4 + u6)
   - Đề giữa HK1/Đề giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT Trà Ôn – Vĩnh Long.pdf (hệ điều kiện, tính S_n)
   - Đề cương/Ôn tập giữa học kì 1 Toán 11 năm 2025 – 2026 trường THPT Trần Phú – Hà Nội.pdf (cấp số cộng có chẵn số hạng)
   - Đề cương/Đề cương học kỳ 1 Toán 11 năm 2026 – 2027 trường THPT Yên Hòa – Hà Nội.pdf (ba cạnh tam giác vuông)
   - Đề giữa HK1/Đề giữa kỳ 1 Toán 11 năm 2025 – 2026 trường Nguyễn Bỉnh Khiêm – Hà Nội.pdf (cho S_n, tìm u_n)
   - Đề cương/Đề cương học kì 1 Toán 11 năm 2025 – 2026 trường THPT Phan Đình Phùng – Hà Nội.pdf (số hàng ghế tối thiểu)
   - Đề cương/Đề cương cuối học kỳ 1 Toán 11 năm 2025 – 2026 trường THPT Sơn Động 3 – Bắc Ninh.pdf (khoan giếng hai cơ sở)
   - Đề cương/Đề cương giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT Hướng Hóa – Quảng Trị.pdf (hai phương án lương) */
(() => {
  Vdc.add({
    grade: 'lop11', id: 'c2-cap-so-cong', ky: ['Giữa kì I'],
    nguon: 'Đề giữa HK1: THPT An Lạc – TP HCM; THPT Trà Ôn – Vĩnh Long; Nguyễn Bỉnh Khiêm – Hà Nội. Đề cương: THPT Trần Phú, Yên Hòa, Phan Đình Phùng – Hà Nội; THPT Sơn Động 3 – Bắc Ninh; THPT Hướng Hóa – Quảng Trị',
    chuong: 'Chương II. Dãy số. Cấp số cộng và cấp số nhân',
    bai: 'Bài 6. Cấp số cộng',
    title: 'Cấp số cộng: hệ điều kiện và bài toán thực tế',
    desc: 'Tìm số hạng đầu, công sai từ hệ; cho S_n tìm u_n; cấp số cộng có chẵn số hạng; ghế hội trường, khoan giếng, so sánh phương án lương.',
    kt: [
      { t: 'Số hạng tổng quát và tổng',
        b: S`\(u_n = u_1 + (n - 1)d\). \(S_n = \dfrac{n(u_1 + u_n)}{2} = \dfrac{n\big[2u_1 + (n - 1)d\big]}{2}\).` },
      { t: 'Tính chất ba số liên tiếp',
        b: S`\(a, b, c\) là ba số hạng liên tiếp của cấp số cộng \(\iff a + c = 2b\). Ba số lập cấp số cộng có tổng cho trước: đặt \(x - d,\ x,\ x + d\) (tổng là \(3x\)).` },
      { t: 'Biết tổng S_n',
        b: S`\(u_1 = S_1\) và \(u_n = S_n - S_{n - 1}\) với \(n \ge 2\). Dãy là cấp số cộng khi \(u_n - u_{n-1}\) không đổi.` },
      { t: 'Bài toán thực tế',
        b: S`Đại lượng tăng (giảm) thêm một lượng <b>không đổi</b> sau mỗi bước (mỗi hàng, mỗi mét, mỗi năm) là cấp số cộng. Xác định rõ \(u_1\), \(d\), \(n\) (số hàng, số mét, số năm hay số quý) và câu hỏi là \(u_n\) hay \(S_n\). Tìm \(n\) nhỏ nhất để \(S_n \ge M\): giải bất phương trình bậc hai theo \(n\), nhận \(n\) nguyên dương.` },
    ],
    dang: [
      { ten: 'Tìm số hạng đầu, công sai từ hệ điều kiện', muc: 'VD – VDC',
        pp: [S`Viết mọi số hạng theo \(u_1\) và \(d\): \(u_k = u_1 + (k - 1)d\).`, S`Lập hệ hai phương trình ẩn \(u_1, d\) rồi giải (có thể ra phương trình bậc hai khi đề có tích).`, 'Tính đại lượng đề hỏi: số hạng thứ n, tổng S_n, số hạng nào bằng một số cho trước.', 'Bài có ba số (cạnh tam giác…): đặt x − d, x, x + d.'],
        vd: [{
          de: S`Cho cấp số cộng \((u_n)\) có \(u_2 + u_5 - u_3 = 13\) và \(u_4 + u_6 = 34\). Tìm \(u_1\), \(d\); tính \(S_{20}\) và cho biết 401 là số hạng thứ bao nhiêu.`,
          lg: [S`\(u_2 + u_5 - u_3 = (u_1 + d) + (u_1 + 4d) - (u_1 + 2d) = u_1 + 3d = 13\).`,
            S`\(u_4 + u_6 = 2u_1 + 8d = 34 \iff u_1 + 4d = 17\). Trừ vế: \(d = 4\), \(u_1 = 1\).`,
            S`\(S_{20} = \dfrac{20(2 \cdot 1 + 19 \cdot 4)}{2} = 10 \cdot 78 = 780\).`,
            S`\(u_n = 1 + 4(n - 1) = 401 \iff n = 101\).`],
          ds: S`\(u_1 = 1\), \(d = 4\), \(S_{20} = 780\); 401 là số hạng thứ 101.` }],
        bt: [
          { muc: 'VD', dong: 8,
            de: S`Cho cấp số cộng \((u_n)\) thỏa mãn \(u_3 + u_7 = 22\) và \(u_2 \cdot u_8 = 40\). Tìm \(u_1\) và công sai \(d\).`,
            goiY: S`\(u_3 + u_7 = 2u_5\) nên \(u_5 = 11\). Viết \(u_2 = u_5 - 3d\), \(u_8 = u_5 + 3d\).`,
            lg: [S`\(u_3 + u_7 = 2u_1 + 8d = 2u_5 = 22 \Rightarrow u_5 = 11\).`,
              S`\(u_2 u_8 = (11 - 3d)(11 + 3d) = 121 - 9d^2 = 40 \Rightarrow d^2 = 9 \Rightarrow d = \pm 3\).`,
              S`\(d = 3\): \(u_1 = u_5 - 4d = -1\). \(d = -3\): \(u_1 = 23\).`],
            ds: S`\(u_1 = -1, d = 3\) hoặc \(u_1 = 23, d = -3\).` },
          { muc: 'VD', dong: 7,
            de: S`Cho dãy số \((u_n)\) có tổng \(n\) số hạng đầu là \(S_n = 2n^2 - n\). Chứng minh \((u_n)\) là cấp số cộng, tìm công sai và cho biết 197 là số hạng thứ bao nhiêu.`,
            goiY: S`\(u_n = S_n - S_{n-1}\) với \(n \ge 2\), \(u_1 = S_1\).`,
            lg: [S`\(u_1 = S_1 = 1\). Với \(n \ge 2\): \(u_n = (2n^2 - n) - \big[2(n - 1)^2 - (n - 1)\big] = 4n - 3\); công thức cũng đúng với \(n = 1\).`,
              S`\(u_{n+1} - u_n = 4\) không đổi, nên \((u_n)\) là cấp số cộng với \(d = 4\).`,
              S`\(4n - 3 = 197 \iff n = 50\).`],
            ds: S`\(u_n = 4n - 3\), \(d = 4\); 197 là số hạng thứ 50.` },
          { muc: 'VD', dong: 7,
            de: 'Ba cạnh của một tam giác vuông lập thành một cấp số cộng và chu vi tam giác bằng 36 cm. Tính diện tích tam giác.',
            goiY: S`Đặt ba cạnh \(x - d,\ x,\ x + d\) (\(d \gt 0\)); cạnh huyền là \(x + d\).`,
            lg: [S`Ba cạnh \(x - d, x, x + d\) với \(0 \lt d \lt x\). Chu vi \(3x = 36 \Rightarrow x = 12\).`,
              S`Định lí Pythagore: \((12 + d)^2 = 12^2 + (12 - d)^2 \iff 48d = 144 \iff d = 3\).`,
              S`Ba cạnh 9, 12, 15 cm; diện tích \(\tfrac12 \cdot 9 \cdot 12 = 54\) cm².`],
            ds: '54 cm² (ba cạnh 9, 12, 15 cm).' },
          { muc: 'VDC', dong: 11,
            de: S`Một cấp số cộng có số số hạng là số chẵn. Tổng các số hạng ở vị trí lẻ là 36, tổng các số hạng ở vị trí chẵn là 45, và số hạng cuối lớn hơn số hạng đầu \(\tfrac{33}{2}\). Cấp số cộng đó có bao nhiêu số hạng?`,
            goiY: S`Gọi số số hạng là \(2k\). Mỗi số hạng chẵn \(u_{2i}\) lớn hơn số hạng lẻ \(u_{2i-1}\) đúng \(d\), nên hiệu hai tổng là \(kd\). Số hạng cuối trừ số hạng đầu là \((2k - 1)d\).`,
            lg: [S`Gọi số số hạng là \(2k\). \((u_2 - u_1) + (u_4 - u_3) + \ldots + (u_{2k} - u_{2k-1}) = kd = 45 - 36 = 9\).`,
              S`\(u_{2k} - u_1 = (2k - 1)d = \tfrac{33}{2}\).`,
              S`Thay \(d = \tfrac9k\): \((2k - 1) \cdot \tfrac9k = \tfrac{33}{2} \iff 36k - 18 = 33k \iff k = 6\).`,
              S`Cấp số cộng có \(2k = 12\) số hạng (\(d = \tfrac32\), \(u_1 = -\tfrac32\); thử lại: tổng lẻ 36, tổng chẵn 45).`],
            ds: '12 số hạng.' },
        ] },
      { ten: 'Bài toán thực tế dùng cấp số cộng', muc: 'VD – VDC',
        pp: ['Nhận ra đại lượng tăng (giảm) đều một lượng d sau mỗi bước.', 'Xác định u_1, d và số bước n; câu hỏi là một số hạng (u_n) hay tổng (S_n).', 'Tìm n nhỏ nhất để S_n đạt ít nhất một mức: lập bất phương trình bậc hai theo n, thử lại với n vừa tìm và n − 1.', 'So sánh phương án: tính tổng của từng phương án trong cùng khoảng thời gian (chú ý năm ↔ quý: 1 năm = 4 quý).'],
        vd: [{
          de: 'Một hội trường có 25 dãy ghế. Dãy đầu tiên có 20 ghế, mỗi dãy sau nhiều hơn dãy ngay trước 3 ghế. Hỏi dãy cuối cùng có bao nhiêu ghế và hội trường có tất cả bao nhiêu ghế?',
          lg: [S`Số ghế các dãy lập cấp số cộng với \(u_1 = 20\), \(d = 3\), \(n = 25\).`,
            S`Dãy cuối: \(u_{25} = 20 + 24 \cdot 3 = 92\) ghế.`,
            S`Tổng số ghế: \(S_{25} = \dfrac{25(20 + 92)}{2} = 1400\) ghế.`],
          ds: 'Dãy cuối 92 ghế; tổng 1400 ghế.' }],
        bt: [
          { muc: 'VD', dong: 8,
            de: 'Một hội trường được thiết kế có hàng thứ nhất 18 ghế, mỗi hàng sau nhiều hơn hàng trước 2 ghế. Muốn hội trường có sức chứa ít nhất 1000 ghế thì phải thiết kế tối thiểu bao nhiêu hàng ghế?',
            goiY: S`\(S_n = \dfrac{n[36 + 2(n - 1)]}{2} = n(n + 17)\). Giải \(n(n + 17) \ge 1000\).`,
            lg: [S`\(u_1 = 18\), \(d = 2\): \(S_n = \dfrac{n[2 \cdot 18 + 2(n - 1)]}{2} = n(n + 17)\).`,
              S`\(n^2 + 17n - 1000 \ge 0 \iff n \ge \dfrac{-17 + \sqrt{4289}}{2} \approx 24{,}25\) (vì \(n \gt 0\)).`,
              S`Thử lại: \(n = 24\): \(24 \cdot 41 = 984 \lt 1000\); \(n = 25\): \(25 \cdot 42 = 1050 \ge 1000\). Cần tối thiểu 25 hàng.`],
            ds: '25 hàng.' },
          { muc: 'VD', dong: 9,
            de: 'Anh Hải muốn khoan một giếng sâu 40 m. Cơ sở A: giá mét đầu tiên 100 nghìn đồng, từ mét thứ hai mỗi mét đắt hơn mét trước 8 nghìn đồng. Cơ sở B: giá mét đầu tiên 70 nghìn đồng, từ mét thứ hai mỗi mét đắt hơn mét trước 10 nghìn đồng. Anh nên chọn cơ sở nào để tiết kiệm hơn, và tiết kiệm được bao nhiêu?',
            goiY: S`Mỗi cơ sở là một cấp số cộng, \(n = 40\). Tính \(S_{40}\) của từng cơ sở.`,
            lg: [S`Cơ sở A: \(S_{40} = \dfrac{40(2 \cdot 100 + 39 \cdot 8)}{2} = 20 \cdot 512 = 10\,240\) nghìn đồng.`,
              S`Cơ sở B: \(S_{40} = \dfrac{40(2 \cdot 70 + 39 \cdot 10)}{2} = 20 \cdot 530 = 10\,600\) nghìn đồng.`,
              S`Chọn cơ sở A, tiết kiệm \(10\,600 - 10\,240 = 360\) nghìn đồng.`],
            ds: 'Chọn cơ sở A (10 240 nghìn đồng), rẻ hơn 360 nghìn đồng.' },
          { muc: 'VDC', dong: 13,
            de: 'Một doanh nghiệp đưa ra hai phương án trả lương. Phương án 1: năm thứ nhất 120 triệu đồng, từ năm thứ hai mỗi năm tăng 30 triệu đồng. Phương án 2: quý thứ nhất 32 triệu đồng, từ quý thứ hai mỗi quý tăng 1,2 triệu đồng. Em nên chọn phương án nào nếu kí hợp đồng a) 3 năm; b) 10 năm?',
            goiY: S`Phương án 1 tính theo năm (\(n = 3\) hoặc 10); phương án 2 tính theo quý (\(n = 12\) hoặc 40). So sánh hai tổng.`,
            lg: [S`a) PA1: \(S_3 = \dfrac{3(240 + 2 \cdot 30)}{2} = 450\) triệu. PA2 (12 quý): \(S_{12} = \dfrac{12(64 + 11 \cdot 1{,}2)}{2} = 6 \cdot 77{,}2 = 463{,}2\) triệu. Chọn phương án 2.`,
              S`b) PA1: \(S_{10} = \dfrac{10(240 + 9 \cdot 30)}{2} = 2550\) triệu. PA2 (40 quý): \(S_{40} = \dfrac{40(64 + 39 \cdot 1{,}2)}{2} = 20 \cdot 110{,}8 = 2216\) triệu. Chọn phương án 1.`,
              'Nhận xét: phương án 2 khởi đầu cao hơn nhưng tăng chậm hơn, nên chỉ có lợi khi hợp đồng ngắn.'],
            ds: 'a) Phương án 2 (463,2 triệu so với 450 triệu). b) Phương án 1 (2550 triệu so với 2216 triệu).' },
        ] },
    ],
  });
})();
