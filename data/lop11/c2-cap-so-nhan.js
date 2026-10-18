/* Toán 11 – Chương II. Vận dụng, vận dụng cao: cấp số nhân – hệ điều kiện, ba số, bài toán thực tế.
   Ma trận giữa kì I (MA_TR_N_GKI.docx): Trả lời ngắn TLN-4 – cấp số nhân, mức Vận dụng.
   (Tổng cấp số nhân lùi vô hạn thuộc chương Giới hạn, không có trong ma trận giữa kì I nên không đưa vào.)
   Dạng bài lấy theo các đề trong tai-lieu/lop11/ (số liệu đã đổi, đáp số kiểm lại bằng tools/kiem-dap-so.py):
   - Đề giữa HK1/Đề giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT chuyên Vị Thanh – Cần Thơ.pdf (u1 + u5, u2 + u6)
   - Đề giữa HK1/Đề giữa học kỳ 1 Toán 11 năm 2025 – 2026 trường THPT Ngô Gia Tự 1 – Đắk Lắk.pdf (tìm n từ S_n)
   - Đề cương/Ôn tập giữa học kì 1 Toán 11 năm 2025 – 2026 trường THPT Trần Phú – Hà Nội.pdf (ba số CSN rồi CSC; lãi kép; vi khuẩn)
   - Đề giữa HK1/Đề giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT Ea H’Leo – Đắk Lắk.pdf (ba số CSC rồi CSN; khấu hao máy)
   - Đề cương/Đề cương học kì 1 Toán 11 năm 2025 – 2026 trường THPT Xuân Phương – Hà Nội.pdf (vi khuẩn và thuốc)
   - Đề giữa HK1/Đề giữa học kì 1 Toán 11 năm 2025 – 2026 trường THPT Lê Lợi – Quảng Ngãi.pdf (vi khuẩn tăng gấp đôi)
   - Đề cương/Đề cương giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT Quế Sơn – Đà Nẵng.pdf (gửi thêm tiền hằng tháng) */
(() => {
  Vdc.add({
    grade: 'lop11', id: 'c2-cap-so-nhan', ky: ['Giữa kì I'],
    nguon: 'Đề giữa HK1: THPT chuyên Vị Thanh – Cần Thơ; THPT Ngô Gia Tự 1, Ea H’Leo – Đắk Lắk; THPT Lê Lợi – Quảng Ngãi. Đề cương: THPT Trần Phú, Xuân Phương – Hà Nội; THPT Quế Sơn – Đà Nẵng',
    chuong: 'Chương II. Dãy số. Cấp số cộng và cấp số nhân',
    bai: 'Bài 7. Cấp số nhân',
    title: 'Cấp số nhân: hệ điều kiện, ba số và bài toán thực tế',
    desc: 'Tìm u1, q từ hệ; ba số vừa lập cấp số nhân vừa lập cấp số cộng; lãi kép, khấu hao, vi khuẩn, gửi tiết kiệm hằng tháng.',
    kt: [
      { t: 'Số hạng tổng quát và tổng',
        b: S`\(u_n = u_1 q^{n-1}\). Với \(q \ne 1\): \(S_n = u_1 \dfrac{1 - q^n}{1 - q}\). Ba số khác 0 \(a, b, c\) liên tiếp của cấp số nhân \(\iff b^2 = ac\).` },
      { t: 'Chia vế để tìm công bội',
        b: S`Hệ dạng \(u_1 q^a(\ldots) = A\), \(u_1 q^b(\ldots) = B\) với cùng biểu thức trong ngoặc: chia vế được \(q^{b - a} = \tfrac BA\).` },
      { t: 'Tăng, giảm theo tỉ lệ',
        b: S`Mỗi kì tăng \(r\%\): sau \(n\) kì giá trị là \(A(1 + r)^n\) (lãi kép, dân số). Mỗi kì giảm \(r\%\): \(A(1 - r)^n\) (khấu hao). Tăng gấp đôi sau mỗi chu kì: \(A \cdot 2^n\) với \(n\) là số chu kì.` },
      { t: 'Gửi đều hằng tháng',
        b: S`Đầu mỗi tháng gửi \(a\), lãi kép \(r\)/tháng. Cuối tháng thứ \(n\): khoản gửi đầu tiên thành \(a(1 + r)^n\), khoản cuối thành \(a(1 + r)\). Tổng là tổng cấp số nhân: \[T_n = a(1 + r)\dfrac{(1 + r)^n - 1}{r}.\]` },
    ],
    dang: [
      { ten: 'Hệ điều kiện; ba số lập cấp số nhân, cấp số cộng', muc: 'VD – VDC',
        pp: [S`Viết các số hạng theo \(u_1\) và \(q\); chia vế hai phương trình để tìm \(q\).`, S`Ba số lập cấp số nhân: đặt \(a, aq, aq^2\); ba số lập cấp số cộng có tổng cho trước: đặt \(x - d, x, x + d\).`, S`Dùng điều kiện còn lại (\(b^2 = ac\) hoặc \(a + c = 2b\)) để lập phương trình.`, 'Chọn nghiệm theo đề (dãy tăng, số dương…) và thử lại.'],
        vd: [{
          de: S`Cho cấp số nhân \((u_n)\) có \(u_2 + u_4 = 30\) và \(u_3 + u_5 = 90\). Tìm \(u_1\), \(q\). Tổng bao nhiêu số hạng đầu bằng 3280? Số 729 là số hạng thứ mấy?`,
          lg: [S`\(u_1 q(1 + q^2) = 30\) và \(u_1 q^2(1 + q^2) = 90\). Chia vế: \(q = 3\); suy ra \(u_1 \cdot 3 \cdot 10 = 30 \Rightarrow u_1 = 1\).`,
            S`\(S_n = \dfrac{3^n - 1}{3 - 1} = 3280 \iff 3^n = 6561 = 3^8 \iff n = 8\).`,
            S`\(u_n = 3^{n-1} = 729 = 3^6 \iff n = 7\).`],
          ds: S`\(u_1 = 1\), \(q = 3\); \(n = 8\); 729 là số hạng thứ 7.` }],
        bt: [
          { muc: 'VD', dong: 6,
            de: S`Cấp số nhân \((u_n)\) có các số hạng dương, \(u_3 = 12\) và \(u_5 = 48\). Tìm \(u_1\), \(q\) và \(S_{10}\).`,
            goiY: S`\(\tfrac{u_5}{u_3} = q^2\); các số hạng dương nên \(q \gt 0\).`,
            lg: [S`\(q^2 = \tfrac{48}{12} = 4\), các số hạng dương nên \(q = 2\); \(u_1 = \tfrac{12}{4} = 3\).`,
              S`\(S_{10} = 3 \cdot \dfrac{2^{10} - 1}{2 - 1} = 3 \cdot 1023 = 3069\).`],
            ds: S`\(u_1 = 3\), \(q = 2\), \(S_{10} = 3069\).` },
          { muc: 'VDC', dong: 11,
            de: 'Ba số dương có tổng 39 lập thành một cấp số nhân tăng. Nếu thêm 1 vào số thứ nhất, giữ nguyên số thứ hai và bớt 13 ở số thứ ba thì được một cấp số cộng. Tìm ba số đó.',
            goiY: S`Đặt \(a, aq, aq^2\). Điều kiện cấp số cộng: \((a + 1) + (aq^2 - 13) = 2aq\), tức \(a(q - 1)^2 = 12\). Chia cho \(a(1 + q + q^2) = 39\).`,
            lg: [S`Đặt ba số \(a, aq, aq^2\) (\(a \gt 0\), \(q \gt 1\)): \(a(1 + q + q^2) = 39\).`,
              S`Cấp số cộng: \((a + 1) + (aq^2 - 13) = 2aq \iff a(q^2 - 2q + 1) = 12 \iff a(q - 1)^2 = 12\).`,
              S`Chia vế: \(\dfrac{1 + q + q^2}{(q - 1)^2} = \dfrac{39}{12} \iff 12 + 12q + 12q^2 = 39q^2 - 78q + 39 \iff 3q^2 - 10q + 3 = 0\).`,
              S`\(q = 3\) hoặc \(q = \tfrac13\); dãy tăng nên \(q = 3\), \(a = \tfrac{12}{4} = 3\). Ba số: 3, 9, 27 (thử lại: 4, 9, 14 là cấp số cộng).`],
            ds: '3; 9; 27.' },
          { muc: 'VDC', dong: 11,
            de: 'Ba số lập thành một cấp số cộng có tổng bằng 24. Nếu thêm lần lượt 3, 4, 6 vào ba số đó thì được một cấp số nhân. Tìm ba số.',
            goiY: S`Đặt \(8 - d,\ 8,\ 8 + d\). Điều kiện cấp số nhân: \((11 - d)(14 + d) = 12^2\).`,
            lg: [S`Ba số \(8 - d, 8, 8 + d\) (tổng 24). Sau khi thêm: \(11 - d,\ 12,\ 14 + d\).`,
              S`Cấp số nhân: \((11 - d)(14 + d) = 144 \iff 154 - 3d - d^2 = 144 \iff d^2 + 3d - 10 = 0 \iff d = 2\) hoặc \(d = -5\).`,
              S`\(d = 2\): 6, 8, 10 (thành 9, 12, 16, công bội \(\tfrac43\)). \(d = -5\): 13, 8, 3 (thành 16, 12, 9, công bội \(\tfrac34\)).`],
            ds: '6; 8; 10 hoặc 13; 8; 3.' },
        ] },
      { ten: 'Bài toán thực tế: lãi kép, khấu hao, tăng trưởng, gửi tiết kiệm', muc: 'VD – VDC',
        pp: ['Xác định giá trị ban đầu, tỉ lệ thay đổi mỗi kì (nhân với 1 + r hoặc 1 − r, hoặc 2) và số kì n (đổi giờ ra số chu kì).', S`Giá trị sau \(n\) kì là số hạng của cấp số nhân; tổng tích lũy nhiều khoản là tổng cấp số nhân.`, S`Hỏi "sau bao lâu đạt mức M": tính lần lượt theo \(n\) (hoặc đưa về lũy thừa của 2) đến khi vượt M.`, S`Dãy truy hồi \(a_{n+1} = q\,a_n + b\): đặt \(b_n = a_n - c\) với \(c\) thỏa \(c = qc + b\) để \((b_n)\) là cấp số nhân.`],
        vd: [{
          de: 'Bác Bình gửi 100 triệu đồng vào ngân hàng, kì hạn 1 năm, lãi suất 6,5%/năm theo hình thức lãi kép (không rút lãi). Tính số tiền bác nhận được sau 5 năm (làm tròn đến hàng phần mười). Sau ít nhất bao nhiêu năm thì số tiền vượt 150 triệu đồng?',
          lg: [S`Số tiền sau mỗi năm lập cấp số nhân với công bội \(1{,}065\): sau \(n\) năm là \(A_n = 100 \cdot 1{,}065^n\) (triệu đồng).`,
            S`\(A_5 = 100 \cdot 1{,}065^5 \approx 137{,}0\) triệu đồng.`,
            S`\(A_6 \approx 145{,}9 \lt 150\); \(A_7 \approx 155{,}4 \gt 150\). Vậy sau ít nhất 7 năm.`],
          ds: 'Khoảng 137,0 triệu đồng; sau ít nhất 7 năm.' }],
        bt: [
          { muc: 'VD', dong: 6,
            de: 'Một máy photocopy mua với giá 60 triệu đồng. Sau mỗi năm, giá trị còn lại của máy bằng 85% giá trị năm trước. Tính giá trị còn lại của máy sau 5 năm (làm tròn đến hàng phần trăm).',
            goiY: S`Giá trị sau \(n\) năm: \(60 \cdot 0{,}85^n\).`,
            lg: [S`Giá trị sau mỗi năm lập cấp số nhân, công bội \(0{,}85\).`, S`Sau 5 năm: \(60 \cdot 0{,}85^5 \approx 26{,}62\) triệu đồng.`],
            ds: 'Khoảng 26,62 triệu đồng.' },
          { muc: 'VD', dong: 7,
            de: 'Một loại vi khuẩn cứ sau 15 phút thì số lượng tăng gấp đôi. Ban đầu có 50 con. Hỏi sau 2 giờ có bao nhiêu con? Sau bao lâu thì có 409 600 con?',
            goiY: S`2 giờ = 8 chu kì 15 phút. \(409\,600 : 50 = 8192 = 2^{13}\).`,
            lg: [S`Sau \(k\) chu kì 15 phút có \(50 \cdot 2^k\) con. 2 giờ = 120 phút = 8 chu kì: \(50 \cdot 2^8 = 12\,800\) con.`,
              S`\(50 \cdot 2^k = 409\,600 \iff 2^k = 8192 = 2^{13} \iff k = 13\), tức sau \(13 \cdot 15 = 195\) phút (3 giờ 15 phút).`],
            ds: '12 800 con; sau 195 phút (3 giờ 15 phút).' },
          { muc: 'VD', dong: 8,
            de: 'Đầu mỗi tháng, chị Mai gửi vào ngân hàng 5 triệu đồng với lãi suất 0,5%/tháng theo hình thức lãi kép (lãi nhập vào gốc). Hỏi ngay sau khi hết tháng thứ 12, chị Mai có bao nhiêu tiền (làm tròn đến hàng phần trăm)?',
            goiY: S`Khoản gửi tháng thứ \(i\) được tính lãi \(13 - i\) tháng. Tổng \(5(1{,}005 + 1{,}005^2 + \ldots + 1{,}005^{12})\).`,
            lg: [S`Khoản gửi đầu tháng 1 sau 12 tháng thành \(5 \cdot 1{,}005^{12}\); khoản gửi đầu tháng 12 thành \(5 \cdot 1{,}005\).`,
              S`Tổng: \(T = 5(1{,}005 + 1{,}005^2 + \ldots + 1{,}005^{12}) = 5 \cdot 1{,}005 \cdot \dfrac{1{,}005^{12} - 1}{0{,}005}\).`,
              S`\(T \approx 61{,}99\) triệu đồng.`],
            ds: 'Khoảng 61,99 triệu đồng.' },
          { muc: 'VDC', dong: 13,
            de: S`Một thí nghiệm bắt đầu với 1000 triệu vi khuẩn và dùng ngay liều thuốc thứ nhất. Mỗi liều thuốc diệt ngay 150 triệu vi khuẩn; sau đó trong 4 giờ trước liều kế tiếp, số vi khuẩn tăng thêm 10%. Gọi \(a_n\) (triệu con) là số vi khuẩn ngay trước liều thứ \(n\) (\(a_1 = 1000\)). a) Chứng minh \(b_n = a_n - 1650\) là cấp số nhân, tìm \(a_5\). b) Liều thứ mấy thì diệt hết vi khuẩn?`,
            goiY: S`\(a_{n+1} = 1{,}1(a_n - 150)\). Thay \(a_n = b_n + 1650\) để thấy \(b_{n+1} = 1{,}1\,b_n\). Diệt hết khi \(a_n \le 150\).`,
            lg: [S`\(a_{n+1} = 1{,}1(a_n - 150) = 1{,}1a_n - 165\). Khi đó \(b_{n+1} = a_{n+1} - 1650 = 1{,}1a_n - 1815 = 1{,}1(a_n - 1650) = 1{,}1\,b_n\).`,
              S`\((b_n)\) là cấp số nhân với \(b_1 = 1000 - 1650 = -650\), \(q = 1{,}1\): \(a_n = 1650 - 650 \cdot 1{,}1^{n-1}\).`,
              S`a) \(a_5 = 1650 - 650 \cdot 1{,}1^4 = 1650 - 951{,}665 = 698{,}335\) triệu con.`,
              S`b) Diệt hết ở liều thứ \(n\) khi \(a_n \le 150 \iff 650 \cdot 1{,}1^{n-1} \ge 1500\). Tính: \(a_9 \approx 256{,}7 \gt 150\), \(a_{10} \approx 117{,}3 \le 150\). Liều thứ 10 diệt hết vi khuẩn.`],
            ds: S`a) \(a_n = 1650 - 650 \cdot 1{,}1^{n-1}\), \(a_5 \approx 698{,}3\) triệu con. b) Liều thứ 10.` },
        ] },
    ],
  });
})();
