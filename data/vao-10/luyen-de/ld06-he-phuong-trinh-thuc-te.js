/* Luyện đề – Bài 6 (1,0 điểm, vận dụng cao): giải bài toán thực tế bằng cách lập phương trình, hệ phương trình bậc nhất hai ẩn.
   Nội dung lớp 9 học kì I (Chương I – II, KNTT). 10 đề, mỗi đề đúng dạng Bài 6 của đề tuyển sinh TP.HCM.
   Dạng bài lấy theo các đề trong tai-lieu/lop9/Lớp 9 - Tài liệu/Đề thi/ (số liệu đã đổi, đáp số kiểm bằng tools/kiem-dap-so.py):
   - Đề tuyển sinh lớp 10 môn Toán năm 2024 – 2025, 2025 – 2026, 2026 – 2027 sở GD&ĐT TP HCM (Bài 6)
   - Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (Cụm 1, 3, 4, 9)
   - Bộ đề tham khảo tuyển sinh lớp 10 môn Toán 2025 – 2026 và 2024 – 2025 sở GD&ĐT TP Hồ Chí Minh
   - 53 đề ôn tập tuyển sinh lớp 10 môn Toán năm 2024 – 2025 sở GD&ĐT TP HCM; Bộ 15 đề ôn thi tuyển sinh vào lớp 10 năm 2026 TP Hồ Chí Minh
   Dạng gặp nhiều nhất trong tài liệu: phần trăm – giá, chuyển động có sự cố (xe hỏng), pha trộn, đếm bằng hệ phương trình. */
LuyenDe.add('he-phuong-trinh-thuc-te', {
  phut: 12,
  de: [
    { ten: 'Công việc chung – làm lần lượt', nguon: 'Đề tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM, Bài 6 (hai đội làm lần lượt)', pts: 1, h: 165,
      de: S`Hai đội A và B dự kiến cùng làm chung thì xong một công việc trong một số ngày. Nếu đội A làm \(\tfrac13\) công việc rồi đội B làm phần còn lại thì chậm hơn dự kiến 9 ngày. Nếu đội B làm \(\tfrac13\) công việc rồi đội A làm phần còn lại thì chậm hơn dự kiến 6 ngày. Hỏi hai đội dự kiến làm chung xong công việc trong bao nhiêu ngày? (Năng suất mỗi đội không đổi.)`,
      ans: 'Dự kiến 6 ngày (đội A làm riêng 9 ngày, đội B làm riêng 18 ngày).',
      barem: [
        [S`Gọi \(a, b\) (ngày) là thời gian đội A, B làm riêng xong công việc (\(a, b \gt 0\)); \(T\) là số ngày dự kiến làm chung: \(\dfrac1T = \dfrac1a + \dfrac1b\)`, 0.25],
        [S`Lập được \(\dfrac a3 + \dfrac{2b}{3} = T + 9\) và \(\dfrac b3 + \dfrac{2a}{3} = T + 6\). Trừ vế: \(b - a = 9\); cộng vế: \(a + b = 2T + 15\)`, 0.25],
        [S`Suy ra \(b = a + 9\), \(T = a - 3\). Thay vào \(T(a + b) = ab\): \((a - 3)(2a + 9) = a(a + 9) \iff a^2 - 6a - 27 = 0 \iff a = 9\) (loại \(a = -3\))`, 0.25],
        [S`\(b = 18\), \(T = 6\); thử lại: \(3 + 12 = 15 = 6 + 9\), \(6 + 6 = 12 = 6 + 6\). Kết luận: dự kiến 6 ngày`, 0.25]],
      loi: ['Viết thời gian làm "một phần ba công việc" là a : 3 nhưng quên phần còn lại là hai phần ba', 'Không thử lại, không loại nghiệm âm'] },
    { ten: 'Chuyển động có sự cố – chuyển sang đi bộ', nguon: 'Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (Cụm 1, đề 2: xe hỏng, đi bộ); Bộ 15 đề ôn thi tuyển sinh vào lớp 10 THPT môn Toán năm 2026 TP Hồ Chí Minh (đề tham khảo: ván trượt)', pts: 1, h: 165,
      de: S`Lan và Mai cùng lúc đạp xe từ nhà Lan đến trường. Khi đạp xe bình thường, vận tốc của Lan gấp 1,5 lần vận tốc của Mai. Đi được 20 phút thì xe của Lan bị hỏng, Lan gửi xe và đi bộ nốt quãng đường còn lại. Biết vận tốc đạp xe của Mai gấp 3 lần vận tốc đi bộ của Lan và hai bạn đến trường cùng lúc. Hỏi hai bạn đi từ nhà Lan đến trường hết bao nhiêu phút? (Các vận tốc không đổi.)`,
      ans: 'Hết 35 phút.',
      barem: [
        [S`Gọi \(v\) (m/phút) là vận tốc đạp xe của Mai và \(t\) (phút) là thời gian hai bạn đi đến trường (\(v \gt 0,\ t \gt 20\)). Vận tốc đạp xe của Lan là \(1{,}5v\), đi bộ là \(\tfrac v3\)`, 0.25],
        [S`Quãng đường Mai đi: \(vt\). Quãng đường Lan đi: \(1{,}5v \cdot 20 + \tfrac v3(t - 20)\)`, 0.25],
        [S`Hai bạn đi cùng quãng đường nên \(30v + \tfrac v3(t - 20) = vt \iff 30 + \tfrac t3 - \tfrac{20}{3} = t\) (chia hai vế cho \(v \gt 0\))`, 0.25],
        [S`\(\iff \tfrac{2t}{3} = \tfrac{70}{3} \iff t = 35\) (thỏa \(t \gt 20\)). Kết luận: 35 phút`, 0.25]],
      loi: ['Đặt quá nhiều ẩn mà không nhận ra có thể chia cho v', 'Quên rằng Lan chỉ đi bộ trong (t − 20) phút'] },
    { ten: 'Chuyển động có sự cố – giảm tốc độ', nguon: 'Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (Cụm 3, đề 1: xe hỏng giảm tốc)', pts: 1, h: 165,
      de: 'Hai xe máy cùng lúc xuất phát từ A đến B. Tốc độ của xe thứ nhất gấp 1,25 lần tốc độ của xe thứ hai. Đi được 40 phút thì xe thứ nhất gặp trục trặc nên phải giảm tốc độ, chỉ còn bằng một nửa tốc độ của xe thứ hai, và chạy với tốc độ đó đến B. Biết hai xe đến B cùng lúc. Hỏi xe thứ hai đi từ A đến B hết bao nhiêu phút?',
      ans: 'Hết 60 phút (1 giờ).',
      barem: [
        [S`Gọi \(v\) (km/phút) là tốc độ xe thứ hai, \(t\) (phút) là thời gian đi từ A đến B (\(v \gt 0,\ t \gt 40\)). Xe thứ nhất: \(1{,}25v\) trong 40 phút đầu, \(0{,}5v\) trong \(t - 40\) phút sau`, 0.25],
        [S`Hai xe đi cùng quãng đường AB: \(1{,}25v \cdot 40 + 0{,}5v(t - 40) = vt\)`, 0.25],
        [S`Chia cho \(v \gt 0\): \(50 + 0{,}5t - 20 = t \iff 0{,}5t = 30\)`, 0.25],
        [S`\(t = 60\) (thỏa \(t \gt 40\)). Kết luận: xe thứ hai đi hết 60 phút`, 0.25]],
      loi: ['Tính tốc độ sau sự cố là một nửa tốc độ cũ của chính xe thứ nhất', 'Không đối chiếu điều kiện t > 40'] },
    { ten: 'Pha trộn theo tỉ lệ – dùng hết nguyên liệu', nguon: 'Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (Cụm 4, đề 1: nhiên liệu từ chất A và B)', pts: 1, h: 165,
      de: 'Một kho có 200 lít chất A và 600 lít chất B. Người ta dùng hai chất này để pha chế hai loại nhiên liệu: loại I có tỉ lệ thể tích A : B = 1 : 4, loại II có tỉ lệ thể tích A : B = 1 : 2. Nếu dùng hết lượng chất A và chất B trong kho thì pha chế được bao nhiêu lít nhiên liệu mỗi loại?',
      ans: '500 lít loại I và 300 lít loại II.',
      barem: [
        [S`Gọi \(x, y\) (lít) là thể tích nhiên liệu loại I, loại II (\(x, y \gt 0\)). Loại I chứa \(\tfrac x5\) lít A và \(\tfrac{4x}{5}\) lít B; loại II chứa \(\tfrac y3\) lít A và \(\tfrac{2y}{3}\) lít B`, 0.25],
        [S`Dùng hết chất A, B: \(\dfrac x5 + \dfrac y3 = 200\); \(\dfrac{4x}{5} + \dfrac{2y}{3} = 600\)`, 0.25],
        [S`Nhân phương trình đầu với 2 rồi trừ vế: \(\tfrac{2x}{5} = 200 \Rightarrow x = 500\); suy ra \(\tfrac y3 = 100 \Rightarrow y = 300\)`, 0.25],
        [S`Thử lại: A dùng \(100 + 100 = 200\), B dùng \(400 + 200 = 600\). Kết luận`, 0.25]],
      loi: ['Hiểu tỉ lệ 1 : 4 là A chiếm 1/4 (đúng là 1/5)', 'Lập phương trình theo số lít A, B thay vì theo lượng nhiên liệu cần tìm rồi trả lời nhầm đại lượng'] },
    { ten: 'Phần trăm – mua sắm khuyến mãi', nguon: '53 đề ôn tập tuyển sinh lớp 10 môn Toán năm 2024 – 2025 sở GD&ĐT TP HCM (Đề số 11: tủ lạnh, máy giặt giảm 40%, 25%)', pts: 1, h: 165,
      de: 'Bạn Lan mua 2 chiếc áo và 3 chiếc quần với tổng giá niêm yết là 1 550 000 đồng. Nhân dịp khuyến mãi, áo được giảm 20%, quần được giảm 10% so với giá niêm yết nên Lan chỉ phải trả 1 330 000 đồng. Tính giá niêm yết của mỗi chiếc áo và mỗi chiếc quần.',
      ans: 'Áo 325 000 đồng/chiếc, quần 300 000 đồng/chiếc.',
      barem: [
        [S`Gọi \(x, y\) (nghìn đồng) là giá niêm yết một chiếc áo, một chiếc quần (\(x, y \gt 0\))`, 0.25],
        [S`Lập hệ \(2x + 3y = 1550\); \(2 \cdot 0{,}8x + 3 \cdot 0{,}9y = 1330 \iff 1{,}6x + 2{,}7y = 1330\)`, 0.25],
        [S`Nhân phương trình đầu với 0,8: \(1{,}6x + 2{,}4y = 1240\); trừ vế: \(0{,}3y = 90 \Rightarrow y = 300\), \(x = 325\)`, 0.25],
        [S`Đối chiếu điều kiện, kết luận: áo 325 000 đồng, quần 300 000 đồng`, 0.25]],
      loi: ['Lấy giảm 20% là nhân 0,2 (đúng là nhân 0,8)', 'Nhân phần trăm cho tổng thay vì cho từng loại'] },
    { ten: 'Chuyển động quanh hình vuông – hai lần gặp nhau', nguon: 'Đề tuyển sinh lớp 10 môn Toán năm 2025 – 2026 sở GD&ĐT TP Hồ Chí Minh, Bài 6', pts: 1, h: 98,
      de: S`Từ vị trí \(A\) của một công viên hình vuông \(ABCD\) cạnh \(a\) (km), hai bạn Hòa và Bình cùng lúc chạy bộ dọc theo các cạnh với vận tốc không đổi, theo hai hướng ngược nhau: Hòa chạy theo hướng \(A \to B \to C \to D\), Bình chạy theo hướng \(A \to D \to C \to B\). Hai bạn gặp nhau lần thứ nhất tại \(E\) trên cạnh \(CD\) với \(AE = 1{,}5\) km, gặp nhau lần thứ hai tại \(F\) trên cạnh \(AB\) với \(AF = 0{,}6\) km. Gọi \(x, y\) (km/h) lần lượt là vận tốc của Hòa và Bình.<br>a) Chứng minh \(\dfrac xy = \dfrac{AB + BC + CE}{AD + DE}\).<br>b) Tìm \(a\) và tỉ số \(\dfrac xy\).`,
      figQ: Fig.geo({ pts: { A: [0, 1.2], B: [1.2, 1.2], C: [1.2, 0], D: [0, 0], E: [0.9, 0], F: [0.6, 1.2] }, segs: 'AB BC CD DA', dash: 'AE', dots: 'E F', lab: { A: [-10, -4], B: [10, -4], C: [10, 10], D: [-10, 10], E: [0, 14], F: [0, -10] }, w: 170 }),
      ans: S`a) Thời gian đến lần gặp thứ nhất bằng nhau. b) \(a = 1{,}2\) km, \(\dfrac xy = \dfrac97\).`,
      barem: [
        [S`a) Hai bạn xuất phát cùng lúc, gặp nhau tại \(E\) nên thời gian bằng nhau: \(\dfrac{AB + BC + CE}{x} = \dfrac{AD + DE}{y} \Rightarrow \dfrac xy = \dfrac{AB + BC + CE}{AD + DE}\)`, 0.25],
        [S`b) Đến lần gặp thứ nhất, hai bạn chạy tổng cộng \(4a\); đến lần gặp thứ hai tổng cộng \(8a\), nên thời gian gấp đôi và quãng đường của Bình cũng gấp đôi: \(AD + DC + CB + BF = 2(AD + DE)\)`, 0.25],
        [S`\(\iff 3a + (a - 0{,}6) = 2a + 2DE \iff DE = a - 0{,}3\). Tam giác \(ADE\) vuông tại \(D\): \(a^2 + (a - 0{,}3)^2 = 1{,}5^2\)`, 0.25],
        [S`\(\iff a^2 - 0{,}3a - 1{,}08 = 0 \iff a = 1{,}2\) (loại \(a = -0{,}9\)). \(DE = 0{,}9\), \(CE = 0{,}3\): \(\dfrac xy = \dfrac{2{,}4 + 0{,}3}{1{,}2 + 0{,}9} = \dfrac97\)`, 0.25]],
      loi: ['Không giải thích vì sao thời gian đến lần gặp thứ hai gấp đôi lần thứ nhất', 'Quên điều kiện 0 < DE < a khi nhận nghiệm'] },
    { ten: 'Năng suất – vượt kế hoạch', nguon: 'Bộ đề tham khảo tuyển sinh lớp 10 môn Toán 2025 – 2026 sở GD&ĐT TP Hồ Chí Minh (Đề 02: hai cửa hàng vượt 15%, 20%); Bộ đề tham khảo môn Toán tuyển sinh 10 năm 2024 – 2025 sở GD&ĐT TP Hồ Chí Minh (Nhà Bè, đề 1)', pts: 1, h: 165,
      de: 'Theo kế hoạch, trong một tháng hai tổ sản xuất phải làm 720 sản phẩm. Thực tế tổ I làm vượt mức kế hoạch 15%, tổ II làm vượt mức kế hoạch 12% nên cả hai tổ làm được 819 sản phẩm. Tính số sản phẩm mỗi tổ phải làm theo kế hoạch.',
      ans: 'Tổ I: 420 sản phẩm; tổ II: 300 sản phẩm.',
      barem: [
        [S`Gọi \(x, y\) (sản phẩm) là số sản phẩm tổ I, II làm theo kế hoạch (\(x, y \in \mathbb N^*\), \(x, y \lt 720\))`, 0.25],
        [S`Lập hệ \(x + y = 720\); \(1{,}15x + 1{,}12y = 819\)`, 0.25],
        [S`Từ đó \(0{,}15x + 0{,}12y = 99\); thay \(y = 720 - x\): \(0{,}03x = 12{,}6 \Rightarrow x = 420\), \(y = 300\)`, 0.25],
        [S`Đối chiếu điều kiện, kết luận`, 0.25]],
      loi: ['Lập 0,15x + 0,12y = 819 (quên phần kế hoạch)', 'Trả lời số sản phẩm thực tế thay vì theo kế hoạch'] },
    { ten: 'Điện năng tiêu thụ – hai loại bóng đèn', nguon: 'Bộ 15 đề ôn thi tuyển sinh vào lớp 10 THPT môn Toán năm 2026 TP Hồ Chí Minh (Đề luyện số 01: bóng đèn tiết kiệm)', pts: 1, h: 165,
      de: 'Một lớp học dùng 15 bóng đèn gồm hai loại: loại A công suất 12 W, loại B công suất 20 W. Mỗi ngày mỗi bóng thắp sáng 6 giờ. Trong 30 ngày, lượng điện năng các bóng đèn tiêu thụ là 39,6 kWh. Hỏi lớp học dùng bao nhiêu bóng mỗi loại? (Điện năng tiêu thụ = công suất × thời gian; 1 kWh = 1000 Wh.)',
      ans: '10 bóng loại A và 5 bóng loại B.',
      barem: [
        [S`Gọi \(x, y\) là số bóng loại A, B (\(x, y \in \mathbb N\)): \(x + y = 15\)`, 0.25],
        [S`Thời gian thắp mỗi bóng trong 30 ngày: \(6 \cdot 30 = 180\) giờ. Điện năng: \((12x + 20y) \cdot 180 = 39\,600\) (Wh) \(\iff 12x + 20y = 220\)`, 0.25],
        [S`Thay \(x = 15 - y\): \(180 + 8y = 220 \Rightarrow y = 5\), \(x = 10\)`, 0.25],
        [S`Đối chiếu điều kiện, kết luận`, 0.25]],
      loi: ['Không đổi kWh ra Wh (hoặc ngược lại)', 'Quên nhân số giờ trong 30 ngày'] },
    { ten: 'Hệ phương trình đếm – thiệp và hạc giấy', nguon: 'Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (Cụm 9, đề 3: thiệp và hạc giấy)', pts: 1, h: 165,
      de: 'Lớp 9B có 24 học sinh nam và 16 học sinh nữ chuẩn bị quà cho ngày hội. Mỗi bạn nam làm 4 tấm thiệp; mỗi bạn nữ xếp 3 con hạc hoặc 7 con hạc. Biết tổng số tấm thiệp bằng tổng số con hạc. Hỏi có bao nhiêu bạn nữ xếp 3 con hạc và bao nhiêu bạn nữ xếp 7 con hạc?',
      ans: '4 bạn nữ xếp 3 con hạc, 12 bạn nữ xếp 7 con hạc.',
      barem: [
        [S`Gọi \(x, y\) là số bạn nữ xếp 3 con hạc, 7 con hạc (\(x, y \in \mathbb N\), \(x, y \le 16\)): \(x + y = 16\)`, 0.25],
        [S`Số tấm thiệp: \(24 \cdot 4 = 96\). Số con hạc: \(3x + 7y = 96\)`, 0.25],
        [S`Thay \(x = 16 - y\): \(48 + 4y = 96 \Rightarrow y = 12\), \(x = 4\)`, 0.25],
        [S`Đối chiếu điều kiện, kết luận`, 0.25]],
      loi: ['Đặt ẩn là số con hạc thay vì số bạn nữ', 'Không kiểm tra nghiệm là số tự nhiên'] },
    { ten: 'Chuyển động ngược chiều – gặp nhau', nguon: 'Đề tuyển sinh lớp 10 môn Toán năm 2024 – 2025 sở GD&ĐT TP Hồ Chí Minh, Bài 6 (xe máy và ô tô đi ngược chiều)', pts: 1, h: 165,
      de: 'Hai thành phố A và B cách nhau 180 km. Hai xe máy khởi hành cùng lúc từ A và B, đi ngược chiều nhau thì gặp nhau sau 2 giờ. Nếu xe đi từ A khởi hành trước xe đi từ B 54 phút thì hai xe gặp nhau sau khi xe đi từ B đi được 1 giờ 30 phút. Tính vận tốc mỗi xe.',
      ans: 'Xe đi từ A: 50 km/h; xe đi từ B: 40 km/h.',
      barem: [
        [S`Gọi \(x, y\) (km/h) là vận tốc xe đi từ A, từ B (\(x, y \gt 0\)). Đổi 54 phút \(= 0{,}9\) giờ, 1 giờ 30 phút \(= 1{,}5\) giờ`, 0.25],
        [S`Lần 1: \(2x + 2y = 180\). Lần 2: xe từ A đi \(0{,}9 + 1{,}5 = 2{,}4\) giờ: \(2{,}4x + 1{,}5y = 180\)`, 0.25],
        [S`Từ \(y = 90 - x\): \(2{,}4x + 135 - 1{,}5x = 180 \Rightarrow 0{,}9x = 45 \Rightarrow x = 50\), \(y = 40\)`, 0.25],
        [S`Đối chiếu điều kiện, kết luận`, 0.25]],
      loi: ['Quên cộng 54 phút vào thời gian của xe đi trước', 'Đổi 54 phút thành 0,54 giờ'] },
  ],
});
