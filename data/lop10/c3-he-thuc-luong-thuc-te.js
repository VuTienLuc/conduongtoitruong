/* Toán 10 – Chương III. Vận dụng, vận dụng cao: hệ thức lượng trong tam giác – đo đạc và bài toán thực tế.
   Ma trận giữa kì I (MA_TR_N_GKI.docx): Trả lời ngắn TLN-4, Đúng–Sai ĐS-3 – mức Vận dụng.
   Dạng bài lấy theo các đề trong tai-lieu/lop10/ (số liệu đã đổi, đáp số kiểm lại bằng tools/kiem-dap-so.py):
   - Đề giữa HK1/Đề giữa kỳ 1 Toán 10 năm 2025 – 2026 trường THPT Tôn Thất Tùng – Đà Nẵng.pdf (khoảng cách qua sông)
   - Đề giữa HK1/Đề giữa kỳ 1 Toán 10 năm 2025 – 2026 trường THPT Hồ Thị Kỷ – Cà Mau.pdf (đo qua đầm cá)
   - Đề giữa HK1/Đề giữa học kỳ 1 Toán 10 năm 2025 – 2026 trường THPT Huỳnh Thúc Kháng – Nghệ An.pdf (hai xe theo góc 120°)
   - Đề giữa HK1/Đề ôn tập giữa kì 1 Toán 10 năm 2025 – 2026 trường THPT Việt Đức – Hà Nội.pdf (hai tàu đến đảo)
   - Đề giữa HK1/Đề giữa kỳ 1 Toán 10 năm 2025 – 2026 trường THPT Phan Bội Châu – Đà Nẵng.pdf (chiều cao tháp)
   - Đề giữa HK1/Đề giữa kì 1 Toán 10 năm 2025 – 2026 trường THPT Chu Văn An – Thái Nguyên.pdf (cột cờ trên tòa nhà)
   - Đề giữa HK1/Đề giữa học kỳ 1 Toán 10 năm 2025 – 2026 trường THPT Lục Nam – Bắc Ninh.pdf (xe thang cứu hỏa)
   - Đề giữa HK1/Đề ôn tập GK1 Toán 10 năm 2026 – 2027 trường THPT Lê Thị Hồng Gấm – TP HCM.pdf (mảnh vườn tứ giác)
   - Đề giữa HK1/Đề giữa kì 1 Toán 10 năm 2025 – 2026 trường THPT Lạng Giang 1 – Bắc Ninh.pdf (lát gạch tứ giác)
   - Đề giữa HK1/Đề giữa học kỳ 1 Toán 10 năm 2025 – 2026 trường THPT Lý Tự Trọng – Đà Nẵng.pdf (giếng trời) */
(() => {
  const G = Fig.geo;
  Vdc.add({
    grade: 'lop10', id: 'c3-he-thuc-luong-thuc-te', ky: ['Giữa kì I', 'Cuối kì I'],
    nguon: 'Đề giữa HK1: THPT Tôn Thất Tùng, Phan Bội Châu, Lý Tự Trọng – Đà Nẵng; THPT Hồ Thị Kỷ – Cà Mau; THPT Huỳnh Thúc Kháng – Nghệ An; THPT Việt Đức – Hà Nội; THPT Chu Văn An – Thái Nguyên; THPT Lục Nam, Lạng Giang 1 – Bắc Ninh (2025 – 2026); THPT Lê Thị Hồng Gấm – TP HCM (2026 – 2027)',
    chuong: 'Chương III. Hệ thức lượng trong tam giác',
    bai: 'Bài 6. Hệ thức lượng trong tam giác',
    title: 'Hệ thức lượng trong tam giác: đo đạc và bài toán thực tế',
    desc: 'Đo khoảng cách không đến được, đo chiều cao, hai vật chuyển động theo hai hướng; diện tích mảnh đất, bán kính đường tròn.',
    kt: [
      { t: 'Định lí côsin',
        b: S`\[a^2 = b^2 + c^2 - 2bc\cos A, \qquad \cos A = \frac{b^2 + c^2 - a^2}{2bc}.\] Dùng khi biết <b>hai cạnh và góc xen giữa</b> (tìm cạnh thứ ba) hoặc biết <b>ba cạnh</b> (tìm góc).` },
      { t: 'Định lí sin',
        b: S`\[\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R.\] Dùng khi biết <b>một cạnh và hai góc</b> (nhớ tính góc còn lại bằng \(180^\circ\) trừ tổng hai góc), hoặc để tìm bán kính \(R\) đường tròn ngoại tiếp.` },
      { t: 'Công thức diện tích',
        b: S`\(S = \tfrac12 ab\sin C = \dfrac{abc}{4R} = pr = \sqrt{p(p - a)(p - b)(p - c)}\) với \(p = \tfrac{a + b + c}{2}\) (Heron). Mảnh đất tứ giác: kẻ một đường chéo, chia thành hai tam giác rồi cộng diện tích.` },
      { t: 'Đo chiều cao từ hai điểm',
        b: S`Hai điểm \(A, B\) thẳng hàng với chân \(C\) của tháp \(CD\), \(B\) nằm giữa \(A\) và \(C\), góc nhìn đỉnh \(D\) từ \(A, B\) là \(\alpha \lt \beta\). Trong tam giác \(ABD\): \(\widehat{ADB} = \beta - \alpha\) (góc ngoài), \(BD = \dfrac{AB\sin\alpha}{\sin(\beta - \alpha)}\), rồi \(CD = BD\sin\beta\). Kết quả làm tròn ở <b>bước cuối</b>, giữ nhiều chữ số ở các bước giữa.`,
        fig: G({ pts: { A: [-58.19, 0], B: [-34.19, 0], C: [0, 0], D: [0, 48.83] }, segs: 'AC CD AD BD', rights: [['B', 'C', 'D']], rsUnit: 18, texts: [[-50, 3, 'α'], [-27.5, 3, 'β']], w: 260 }) },
    ],
    dang: [
      { ten: 'Đo khoảng cách không đến được; hai vật chuyển động theo hai hướng', muc: 'VD – VDC',
        pp: ['Vẽ hình, đặt tên các điểm, ghi số liệu (cạnh, góc) lên hình.', 'Chọn tam giác chứa đoạn cần tìm và đủ dữ kiện.', S`Biết hai cạnh và góc xen giữa → định lí côsin; biết một cạnh và hai góc → định lí sin.`, 'Bài chuyển động: quãng đường = vận tốc × thời gian, góc giữa hai hướng là góc xen giữa.', 'Đổi đơn vị (phút ↔ giờ, m ↔ km) trước khi kết luận; làm tròn theo yêu cầu.'],
        vd: [{
          de: S`Để đo khoảng cách từ điểm \(A\) trên bờ sông đến cây \(C\) trên cù lao, người ta chọn điểm \(B\) cùng bờ với \(A\) sao cho \(AB = 50\) m và đo được \(\widehat{CAB} = 62^\circ\), \(\widehat{CBA} = 48^\circ\). Tính \(AC\) (làm tròn đến hàng phần mười).`,
          fig: G({ pts: { A: [0, 0], B: [50, 0], C: [18.56, 34.91] }, segs: 'AB BC CA', texts: [[7, 3, '62°'], [43, 3, '48°']], w: 230 }),
          lg: [S`Trong tam giác \(ABC\): \(\widehat{C} = 180^\circ - 62^\circ - 48^\circ = 70^\circ\).`,
            S`Theo định lí sin: \(\dfrac{AC}{\sin B} = \dfrac{AB}{\sin C} \Rightarrow AC = \dfrac{50\sin 48^\circ}{\sin 70^\circ}\).`,
            S`\(AC \approx \dfrac{50 \cdot 0{,}7431}{0{,}9397} \approx 39{,}5\) (m).`],
          ds: S`\(AC \approx 39{,}5\) m.` }],
        bt: [
          { muc: 'VD', dong: 7,
            de: S`Không đo trực tiếp được khoảng cách \(AB\) vì phải qua một đầm cá. Người ta chọn điểm \(C\) nhìn \(A\) và \(B\) dưới góc \(65^\circ\), đo được \(CA = 180\) m, \(CB = 150\) m. Tính \(AB\) (làm tròn đến hàng đơn vị).`,
            goiY: 'Biết hai cạnh và góc xen giữa: dùng định lí côsin.',
            lg: [S`\(AB^2 = CA^2 + CB^2 - 2 \cdot CA \cdot CB\cos 65^\circ = 180^2 + 150^2 - 2 \cdot 180 \cdot 150\cos 65^\circ\).`,
              S`\(AB^2 \approx 32400 + 22500 - 54000 \cdot 0{,}4226 \approx 32078\), nên \(AB \approx 179\) m.`],
            ds: S`\(AB \approx 179\) m.` },
          { muc: 'VD', dong: 7,
            de: 'Hai xe cùng xuất phát từ vị trí O, đi thẳng theo hai hướng tạo với nhau góc 120°. Xe thứ nhất chạy 40 km/h, xe thứ hai chạy 50 km/h. Sau 1 giờ 30 phút hai xe cách nhau bao nhiêu ki-lô-mét (làm tròn đến hàng phần mười)?',
            goiY: S`Sau 1,5 giờ: \(OA = 60\) km, \(OB = 75\) km, \(\widehat{AOB} = 120^\circ\). Nhớ \(\cos 120^\circ = -\tfrac12\).`,
            lg: [S`Sau 1,5 giờ: \(OA = 40 \cdot 1{,}5 = 60\) km, \(OB = 50 \cdot 1{,}5 = 75\) km.`,
              S`\(AB^2 = 60^2 + 75^2 - 2 \cdot 60 \cdot 75 \cdot \cos 120^\circ = 3600 + 5625 + 4500 = 13725\).`,
              S`\(AB = \sqrt{13725} \approx 117{,}2\) km.`],
            ds: S`\(\approx 117{,}2\) km.` },
          { muc: 'VDC', dong: 12,
            de: S`Hai cảng \(A\) và \(B\) cách nhau 180 km; từ hai cảng có hai tàu cùng đi thẳng đến đảo \(C\). Biết \(\widehat{CAB} = 35^\circ\), \(\widehat{CBA} = 50^\circ\). Tàu 1 rời \(A\) lúc 7 giờ, tàu 2 rời \(B\); cả hai tàu đều chạy 60 km/h. Hỏi tàu 2 phải khởi hành sau tàu 1 bao nhiêu phút để hai tàu đến \(C\) cùng lúc (làm tròn đến hàng đơn vị)?`,
            goiY: S`Tính \(\widehat C\), dùng định lí sin để tìm \(AC\), \(BC\). Hai tàu cùng vận tốc nên thời gian chênh lệch bằng \(\dfrac{AC - BC}{60}\) giờ.`,
            lg: [S`\(\widehat{C} = 180^\circ - 35^\circ - 50^\circ = 95^\circ\).`,
              S`Định lí sin: \(AC = \dfrac{180\sin 50^\circ}{\sin 95^\circ} \approx 138{,}41\) km; \(BC = \dfrac{180\sin 35^\circ}{\sin 95^\circ} \approx 103{,}64\) km.`,
              S`Tàu 1 đi hết \(\dfrac{138{,}41}{60}\) giờ, tàu 2 đi hết \(\dfrac{103{,}64}{60}\) giờ. Chênh lệch: \(\dfrac{138{,}41 - 103{,}64}{60} \approx 0{,}5796\) giờ \(\approx 34{,}8\) phút.`,
              'Tàu 2 phải khởi hành sau tàu 1 khoảng 35 phút.'],
            ds: 'Khoảng 35 phút.' },
        ] },
      { ten: 'Đo chiều cao (tháp, ngọn hải đăng, cột cờ)', muc: 'VD – VDC',
        pp: ['Vẽ hình: chân tháp, đỉnh tháp, hai vị trí quan sát; đánh dấu góc vuông ở chân tháp.', S`Tìm góc tại đỉnh của tam giác "xiên" bằng tính chất góc ngoài: \(\beta - \alpha\).`, 'Dùng định lí sin trong tam giác xiên để tìm một cạnh nối tới đỉnh, rồi dùng tỉ số lượng giác trong tam giác vuông.', 'Nếu mắt người quan sát cao h so với mặt đất thì cộng thêm h vào kết quả.'],
        vd: [{
          de: S`Để đo chiều cao tháp \(CD\) (\(C\) là chân tháp), người ta chọn hai điểm \(A, B\) trên mặt đất thẳng hàng với \(C\), \(B\) nằm giữa \(A\) và \(C\), \(AB = 24\) m và đo được \(\widehat{CAD} = 40^\circ\), \(\widehat{CBD} = 55^\circ\). Tính chiều cao tháp (làm tròn đến hàng phần mười).`,
          fig: G({ pts: { A: [-58.19, 0], B: [-34.19, 0], C: [0, 0], D: [0, 48.83] }, segs: 'AC CD AD BD', rights: [['B', 'C', 'D']], rsUnit: 18, texts: [[-50, 3, '40°'], [-27, 3, '55°']], w: 260 }),
          lg: [S`Góc \(\widehat{CBD}\) là góc ngoài của tam giác \(ABD\) nên \(\widehat{ADB} = 55^\circ - 40^\circ = 15^\circ\).`,
            S`Định lí sin trong tam giác \(ABD\): \(BD = \dfrac{AB\sin 40^\circ}{\sin 15^\circ} = \dfrac{24\sin 40^\circ}{\sin 15^\circ} \approx 59{,}605\) m.`,
            S`Tam giác \(BCD\) vuông tại \(C\): \(CD = BD\sin 55^\circ \approx 59{,}605 \cdot 0{,}8192 \approx 48{,}8\) m.`],
          ds: S`\(CD \approx 48{,}8\) m.` }],
        bt: [
          { muc: 'VD', dong: 8,
            de: S`Một người đi dọc bờ biển từ \(A\) đến \(B\) với \(AB = 50\) m và quan sát ngọn hải đăng \(C\). Góc giữa hướng nhìn tới hải đăng và đường đi tại \(A\) là \(40^\circ\), tại \(B\) là \(70^\circ\) (\(B\) gần hải đăng hơn). Ngọn hải đăng cách bờ biển bao nhiêu mét (làm tròn đến hàng đơn vị)?`,
            goiY: S`Gọi \(H\) là chân đường vuông góc từ \(C\) xuống bờ. Trong tam giác \(ABC\): \(\widehat{ACB} = 70^\circ - 40^\circ\). Tìm \(BC\) rồi \(CH = BC\sin 70^\circ\).`,
            fig: G({ pts: { A: [0, 0], B: [50, 0], H: [71.98, 0], C: [71.98, 60.4] }, segs: 'AH AC BC', dash: 'CH', rights: [['B', 'H', 'C']], rsUnit: 16, texts: [[10, 3, '40°'], [58, 3, '70°']], w: 230 }),
            lg: [S`\(\widehat{ACB} = 70^\circ - 40^\circ = 30^\circ\) (góc ngoài tại \(B\)).`,
              S`Định lí sin: \(BC = \dfrac{AB\sin 40^\circ}{\sin 30^\circ} = 100\sin 40^\circ \approx 64{,}28\) m.`,
              S`Khoảng cách tới bờ: \(CH = BC\sin 70^\circ \approx 64{,}28 \cdot 0{,}9397 \approx 60\) m.`],
            ds: S`\(\approx 60\) m.` },
          { muc: 'VD', dong: 7,
            de: S`Trên nóc một tòa nhà có cột cờ. Từ điểm \(M\) trên mặt đất cách chân tòa nhà 20 m, người ta nhìn chân cột cờ dưới góc \(38^\circ\) và đỉnh cột cờ dưới góc \(46^\circ\) so với phương nằm ngang. Tính chiều cao cột cờ (làm tròn đến hàng phần mười).`,
            goiY: S`Chiều cao từ mặt đất tới chân cột là \(20\tan 38^\circ\), tới đỉnh cột là \(20\tan 46^\circ\).`,
            lg: [S`Gọi \(H\) là chân tòa nhà, \(P\) là chân cột cờ, \(Q\) là đỉnh cột: \(HP = 20\tan 38^\circ\), \(HQ = 20\tan 46^\circ\).`,
              S`Chiều cao cột cờ: \(PQ = 20(\tan 46^\circ - \tan 38^\circ) \approx 20(1{,}0355 - 0{,}7813) \approx 5{,}1\) m.`],
            ds: S`\(\approx 5{,}1\) m.` },
          { muc: 'VDC', dong: 12,
            de: S`Hai người đứng tại \(A\) và \(B\) cách nhau 25 m, thẳng hàng với chân \(C\) của một tòa nhà (\(B\) gần tòa nhà hơn), nhìn điểm cháy \(D\) trên tường tòa nhà dưới các góc \(32^\circ\) và \(52^\circ\) so với phương ngang. Xe cứu hỏa có thang dài tối đa 40 m, chân thang đặt trên xe ở độ cao 1,8 m. Hỏi xe phải đỗ cách chân tòa nhà xa nhất bao nhiêu mét để thang chạm tới điểm cháy (làm tròn đến hàng phần mười)?`,
            goiY: S`Tìm chiều cao \(CD\) như bài đo tháp. Thang là cạnh huyền của tam giác vuông có cạnh đứng \(CD - 1{,}8\); khoảng cách xa nhất ứng với thang dài 40 m.`,
            lg: [S`\(\widehat{ADB} = 52^\circ - 32^\circ = 20^\circ\); \(BD = \dfrac{25\sin 32^\circ}{\sin 20^\circ} \approx 38{,}735\) m.`,
              S`\(CD = BD\sin 52^\circ \approx 30{,}523\) m.`,
              S`Thang dài 40 m, độ cao cần vươn tới: \(30{,}523 - 1{,}8 = 28{,}723\) m. Khoảng cách ngang lớn nhất: \(d = \sqrt{40^2 - 28{,}723^2} \approx \sqrt{774{,}99} \approx 27{,}8\) m.`],
            ds: S`Xa nhất khoảng 27,8 m.` },
        ] },
      { ten: 'Diện tích mảnh đất, bán kính đường tròn từ số đo thực tế', muc: 'VD – VDC',
        pp: ['Tam giác biết ba cạnh: dùng công thức Heron.', S`Biết hai cạnh và góc xen giữa: \(S = \tfrac12 ab\sin C\).`, S`Đường tròn đi qua ba điểm đo được: tính cạnh thứ ba bằng định lí côsin rồi \(R = \dfrac{a}{2\sin A}\).`, 'Tứ giác: kẻ đường chéo chia thành hai tam giác; tính đường chéo bằng định lí côsin, tính góc cần thiết bằng định lí sin hoặc côsin.', 'Nhân diện tích với đơn giá khi bài hỏi chi phí.'],
        vd: [{
          de: S`Mảnh vườn hình tứ giác lồi \(ABCD\) có \(AB = 12\) m, \(BC = 16\) m, \(CD = 10\) m, \(DA = 14\) m và \(\widehat{ABC} = 60^\circ\). Tính diện tích mảnh vườn (làm tròn đến hàng phần mười).`,
          lg: [S`Kẻ đường chéo \(AC\). Định lí côsin trong tam giác \(ABC\): \(AC^2 = 12^2 + 16^2 - 2 \cdot 12 \cdot 16\cos 60^\circ = 208\), \(AC = \sqrt{208} \approx 14{,}422\) m.`,
            S`\(S_{ABC} = \tfrac12 \cdot 12 \cdot 16 \cdot \sin 60^\circ = 48\sqrt3 \approx 83{,}138\) m².`,
            S`Tam giác \(ACD\) có ba cạnh \(14{,}422;\ 10;\ 14\): \(p \approx 19{,}211\), \(S_{ACD} = \sqrt{p(p - 14{,}422)(p - 10)(p - 14)} \approx 66{,}453\) m².`,
            S`Diện tích mảnh vườn: \(S \approx 83{,}138 + 66{,}453 \approx 149{,}6\) m².`],
          ds: S`\(\approx 149{,}6\) m².` }],
        bt: [
          { muc: 'VD', dong: 7,
            de: 'Một mảnh đất hình tam giác có ba cạnh 25 m, 29 m, 36 m. Người ta trồng cỏ phủ kín mảnh đất với giá 70 000 đồng/m². Tính số tiền mua cỏ.',
            goiY: S`Heron: \(p = 45\).`,
            lg: [S`\(p = \tfrac{25 + 29 + 36}{2} = 45\).`, S`\(S = \sqrt{45 \cdot 20 \cdot 16 \cdot 9} = \sqrt{129600} = 360\) m².`, S`Tiền cỏ: \(360 \cdot 70\,000 = 25\,200\,000\) đồng.`],
            ds: '25 200 000 đồng (25,2 triệu đồng).' },
          { muc: 'VD', dong: 8,
            de: S`Để tính diện tích miệng một giếng trời hình tròn, người ta đánh dấu ba điểm \(A, B, C\) trên mép giếng và đo được \(AB = 4\) m, \(AC = 3\) m, \(\widehat{BAC} = 120^\circ\). Tính diện tích miệng giếng (lấy \(\pi \approx 3{,}14\), làm tròn đến hàng phần mười).`,
            goiY: S`Đường tròn mép giếng là đường tròn ngoại tiếp tam giác \(ABC\). Tính \(BC\) rồi \(R = \dfrac{BC}{2\sin A}\).`,
            lg: [S`\(BC^2 = 4^2 + 3^2 - 2 \cdot 4 \cdot 3\cos 120^\circ = 16 + 9 + 12 = 37\).`,
              S`\(R = \dfrac{BC}{2\sin 120^\circ} = \dfrac{\sqrt{37}}{\sqrt3}\), nên \(R^2 = \dfrac{37}{3}\).`,
              S`Diện tích: \(S = \pi R^2 \approx 3{,}14 \cdot \dfrac{37}{3} \approx 38{,}7\) m².`],
            ds: S`\(\approx 38{,}7\) m².` },
          { muc: 'VDC', dong: 12,
            de: S`Người ta lát gạch trên mảnh đất hình tứ giác lồi \(ABCD\) có \(AB = 8\) m, \(BC = 5\) m, \(CD = 6\) m, \(\widehat{ABC} = 105^\circ\), \(\widehat{BCD} = 110^\circ\). Giá lát gạch (cả công thợ) là 350 nghìn đồng/m². Tính số tiền lát gạch (làm tròn đến hàng nghìn đồng).`,
            goiY: S`Kẻ \(AC\). Tính \(AC\) (định lí côsin), góc \(\widehat{BCA}\) (định lí sin), suy ra \(\widehat{ACD} = 110^\circ - \widehat{BCA}\). Cộng diện tích hai tam giác.`,
            lg: [S`\(AC^2 = 8^2 + 5^2 - 2 \cdot 8 \cdot 5\cos 105^\circ \approx 109{,}706\), \(AC \approx 10{,}474\) m.`,
              S`Định lí sin: \(\sin\widehat{BCA} = \dfrac{AB\sin 105^\circ}{AC} \approx 0{,}7378\). Vì \(\widehat{B}\) tù nên \(\widehat{BCA}\) nhọn, \(\widehat{BCA} \approx 47{,}54^\circ\); suy ra \(\widehat{ACD} \approx 62{,}46^\circ\).`,
              S`\(S_{ABC} = \tfrac12 \cdot 8 \cdot 5\sin 105^\circ \approx 19{,}319\) m²; \(S_{ACD} = \tfrac12 \cdot AC \cdot CD\sin\widehat{ACD} \approx 27{,}861\) m².`,
              S`\(S \approx 47{,}180\) m². Số tiền: \(47{,}180 \cdot 350 \approx 16\,513\) nghìn đồng.`],
            ds: 'Khoảng 16 513 000 đồng.' },
        ] },
    ],
  });
})();
