/* Luyện đề – Bài 4 (1,0 điểm): toán thực tế đại số – hình học (chu vi, diện tích, vành khăn, hình quạt; lập biểu thức, phương trình).
   Nội dung lớp 9 học kì I (đường tròn, độ dài cung, diện tích hình quạt, hình vành khăn – Chương V; biểu thức, phương trình, bất phương trình bậc nhất – Chương I, II, III).
   Phần b của một số đề dẫn tới phương trình bậc hai (học kì II) – đúng như đề tuyển sinh; các đề 3, 4, 5, 6, 7, 8, 9 giải được bằng kiến thức học kì I.
   Dạng bài lấy theo các đề trong tai-lieu/lop9/Lớp 9 - Tài liệu/Đề thi/ (số liệu đã đổi, đáp số kiểm bằng tools/kiem-dap-so.py):
   - Đề tuyển sinh lớp 10 môn Toán năm 2025 – 2026 và 2026 – 2027 sở GD&ĐT TP HCM (Bài 4)
   - Đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP Hồ Chí Minh (Bài 4)
   - Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (Cụm 1, 3, 5, 16)
   - Bộ 15 đề ôn thi tuyển sinh vào lớp 10 THPT môn Toán năm 2026 TP Hồ Chí Minh (Đề luyện 01, 03, 04, 11)
   - 53 đề ôn tập tuyển sinh lớp 10 môn Toán năm 2024 – 2025 sở GD&ĐT TP HCM (Đề 1, 40, 50) */
(() => {
  const G = Fig.geo;
  const ring = (X, Y, P, u, R, r) => {
    const c = rr => `M${X(-rr)} ${Y(0)}a${rr * u} ${rr * u} 0 1 0 ${2 * rr * u} 0a${rr * u} ${rr * u} 0 1 0 ${-2 * rr * u} 0Z`;
    return c(R) + c(r);
  };
  const ab = (a, b) => [[a[0], 0.25], [a[1], 0.25], [b[0], 0.25], [b[1], 0.25]];
  LuyenDe.add('thuc-te-dai-so-hinh-hoc', {
    phut: 12,
    soat: ['Biểu thức đã thu gọn, có đơn vị', 'Đúng công thức chu vi, diện tích, cung, quạt, vành khăn', 'Đối chiếu điều kiện khi nhận nghiệm', 'Làm tròn đúng yêu cầu, trả lời đủ câu hỏi'],
    de: [
      { ten: 'Mảnh đất và nhà ở – lập biểu thức, phương trình', nguon: 'Đề tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM, Bài 4 (mảnh đất và nhà ở)', pts: 1, h: 120,
        de: S`Bác Tư có một mảnh đất hình chữ nhật chiều rộng \(x\) (m) (\(x \gt 10\)), chiều dài hơn chiều rộng 10 m. Bác dùng một phần đất hình chữ nhật có các cạnh 12 m và \(x - 10\) (m) để xây nhà như hình vẽ.<br>a) Viết biểu thức thu gọn biểu diễn diện tích phần làm nhà và diện tích phần đất còn lại theo \(x\).<br>b) Tìm chiều dài, chiều rộng của mảnh đất, biết diện tích phần đất còn lại lớn hơn diện tích phần làm nhà 360 m².`,
        figQ: G({ pts: { A: [0, 20], B: [30, 20], C: [30, 0], D: [0, 0], E: [18, 20], F: [18, 10], H: [30, 10], Z: [-8, 0] }, segs: 'AB BC CD DA EF F-H', hide: 'A B C D E F H Z', texts: [[15, -3.2, 'x + 10 (m)'], [-4.5, 10, 'x (m)'], [24, 14.5, 'Nhà ở'], [24, 8, '12 m'], [12.5, 14.5, 'x − 10']], w: 240 }),
        ans: S`a) Nhà: \(12x - 120\) (m²); còn lại: \(x^2 - 2x + 120\) (m²). b) Rộng 20 m, dài 30 m.`,
        barem: ab([S`a) Diện tích làm nhà: \(12(x - 10) = 12x - 120\) (m²)`, S`Diện tích mảnh đất \(x(x + 10)\); phần còn lại \(x^2 + 10x - (12x - 120) = x^2 - 2x + 120\) (m²)`],
          [S`b) \((x^2 - 2x + 120) - (12x - 120) = 360 \iff x^2 - 14x - 120 = 0\)`, S`\(\iff (x - 20)(x + 6) = 0 \iff x = 20\) (nhận, vì \(x \gt 10\)) hoặc \(x = -6\) (loại). Mảnh đất rộng 20 m, dài 30 m`]),
        loi: ['Không thu gọn biểu thức ở câu a', 'Không đối chiếu điều kiện x > 10 khi nhận nghiệm'] },
      { ten: 'Lối đi quanh vườn – diện tích trồng hoa', nguon: 'Đề tuyển sinh lớp 10 môn Toán năm 2025 – 2026 sở GD&ĐT TP Hồ Chí Minh, Bài 4 (lối đi quanh khu vườn)', pts: 1, h: 120,
        de: S`Một khu vườn hình chữ nhật có chiều dài \(3x\) (m), chiều rộng \(x\) (m) (\(x \gt 3\)). Người ta làm một lối đi rộng 1,5 m chạy sát bên trong, quanh khu vườn; phần đất còn lại để trồng hoa.<br>a) Viết biểu thức thu gọn theo \(x\) biểu diễn diện tích phần đất trồng hoa.<br>b) Biết diện tích phần đất trồng hoa là 969 m². Tính chiều dài và chiều rộng của khu vườn.`,
        figQ: G({ pts: { A: [0, 20], B: [60, 20], C: [60, 0], D: [0, 0], E: [1.5, 18.5], F: [58.5, 18.5], K: [58.5, 1.5], L: [1.5, 1.5], Z: [-16, -8] }, segs: 'AB BC CD DA', dash: 'EF F-K K-L L-E', hide: 'A B C D E F K L Z', texts: [[30, -6.5, '3x (m)'], [-8.5, 9, 'x (m)'], [30, 9, 'Trồng hoa']], w: 260 }),
        ans: S`a) \(3x^2 - 12x + 9\) (m²). b) Dài 60 m, rộng 20 m.`,
        barem: ab([S`a) Phần trồng hoa là hình chữ nhật có các cạnh \(3x - 3\) và \(x - 3\) (m)`, S`Diện tích \((3x - 3)(x - 3) = 3x^2 - 12x + 9\) (m²)`],
          [S`b) \(3x^2 - 12x + 9 = 969 \iff x^2 - 4x - 320 = 0\)`, S`\(\iff (x - 20)(x + 16) = 0 \iff x = 20\) (nhận) hoặc \(x = -16\) (loại). Khu vườn dài 60 m, rộng 20 m`]),
        loi: ['Trừ chiều rộng lối đi một lần (phải trừ 2 · 1,5 m mỗi chiều)', 'Trả lời x mà không tính chiều dài 3x'] },
      { ten: 'Hồ tròn trong vườn hình chữ nhật', nguon: 'Đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP Hồ Chí Minh, Bài 4; Tuyển tập đề tham khảo 2026 – 2027 sở GD&ĐT TP HCM (Cụm 1, đề 2)', pts: 1, h: 120,
        de: S`Một khu vườn hình chữ nhật có chiều rộng \(x\) (m), chiều dài \(y\) (m) (\(y \gt x \gt 0\)). Người ta xây một hồ nước hình tròn tiếp xúc với hai cạnh dài và một cạnh rộng của khu vườn như hình vẽ.<br>a) Viết biểu thức tính diện tích phần còn lại của khu vườn theo \(x\) và \(y\).<br>b) Biết chiều dài gấp 2,5 lần chiều rộng và diện tích phần còn lại là 109,76 m². Tìm kích thước khu vườn (lấy \(\pi \approx 3{,}14\)).`,
        figQ: G({ pts: { A: [0, 8], B: [20, 8], C: [20, 0], D: [0, 0], Z: [-5, -3] }, circles: [{ c: [4, 4], r: 4 }], segs: 'AB BC CD DA', hide: 'A B C D Z', texts: [[10, -2.2, 'y (m)'], [-2.8, 3.6, 'x (m)'], [4, 3.6, 'Hồ']], w: 240 }),
        ans: S`a) \(xy - \dfrac{\pi x^2}{4}\) (m²). b) Rộng 8 m, dài 20 m.`,
        barem: ab([S`a) Hồ tiếp xúc hai cạnh dài nên đường kính bằng \(x\), bán kính \(\tfrac x2\); diện tích hồ \(\pi \cdot \dfrac{x^2}{4}\)`, S`Diện tích còn lại \(xy - \dfrac{\pi x^2}{4}\) (m²)`],
          [S`b) \(y = 2{,}5x\): \(2{,}5x^2 - 0{,}785x^2 = 109{,}76 \iff 1{,}715x^2 = 109{,}76 \iff x^2 = 64\)`, S`\(x = 8\) (vì \(x \gt 0\)), \(y = 20\). Khu vườn rộng 8 m, dài 20 m`]),
        loi: ['Lấy bán kính hồ bằng x', 'Viết x = ±8 mà không loại nghiệm âm'] },
      { ten: 'Hình vành khăn – lối đi quanh hồ tròn', nguon: 'Bộ 15 đề ôn thi tuyển sinh vào lớp 10 THPT môn Toán năm 2026 TP Hồ Chí Minh (Đề luyện 01: lối đi vành khăn)', pts: 1, h: 120,
        de: S`Quanh một hồ nước hình tròn bán kính \(R\) (m), người ta làm một lối đi có dạng hình vành khăn rộng \(w\) (m).<br>a) Viết biểu thức thu gọn tính diện tích \(S\) của lối đi theo \(R\), \(w\) và \(\pi\).<br>b) Biết lối đi rộng 1,5 m và có diện tích 65,94 m². Tính bán kính của hồ (lấy \(\pi \approx 3{,}14\)).`,
        figQ: G({ pts: { O: [0, 0], M: [3, 0], N: [4.5, 0] }, circles: [{ c: 'O', r: 4.5 }, { c: 'O', r: 3 }], fill: [(X, Y, P, u) => ring(X, Y, P, u, 4.5, 3)], segs: 'O-N', dots: 'O', hide: 'M N', lab: { O: [-10, -8] }, texts: [[1.5, 0.35, 'R'], [3.75, 0.35, 'w']], w: 200 }),
        ans: S`a) \(S = \pi(2Rw + w^2)\). b) \(R = 6{,}25\) m.`,
        barem: ab([S`a) Lối đi là phần giữa hai đường tròn bán kính \(R + w\) và \(R\): \(S = \pi(R + w)^2 - \pi R^2\)`, S`\(S = \pi(2Rw + w^2)\)`],
          [S`b) \(3{,}14(3R + 2{,}25) = 65{,}94 \iff 3R + 2{,}25 = 21\)`, S`\(\iff R = 6{,}25\). Bán kính hồ là 6,25 m`]),
        loi: ['Dùng (R + w)² − R² = w² (sai hằng đẳng thức)', 'Thay w = 1,5 nhưng quên bình phương'] },
      { ten: 'Hình quạt – vườn hoa có bờ kè', nguon: 'Bộ 15 đề ôn thi tuyển sinh vào lớp 10 THPT môn Toán năm 2026 TP Hồ Chí Minh (Đề luyện 03: khu vườn hình quạt)', pts: 1, h: 120,
        de: S`Một vườn hoa có dạng hình quạt tròn bán kính \(R\) (m), góc ở tâm \(n^\circ\); xung quanh vườn (gồm hai bán kính và cung tròn) có bờ kè.<br>a) Viết biểu thức tính độ dài cung \(l\) và diện tích \(S\) của vườn theo \(R\), \(n\). Chứng minh \(S = \dfrac{lR}{2}\).<br>b) Biết \(R = 12\) m và tổng chiều dài bờ kè là 40 m. Tính diện tích vườn hoa và số đo góc ở tâm (làm tròn đến hàng phần mười của độ, lấy \(\pi \approx 3{,}14\)).`,
        ans: S`a) \(l = \dfrac{\pi Rn}{180}\), \(S = \dfrac{\pi R^2 n}{360} = \dfrac{lR}{2}\). b) \(S = 96\) m², \(n \approx 76{,}4^\circ\).`,
        barem: ab([S`a) \(l = \dfrac{\pi R n}{180}\); \(S = \dfrac{\pi R^2 n}{360}\)`, S`\(S = \dfrac R2 \cdot \dfrac{\pi R n}{180} = \dfrac{lR}{2}\)`],
          [S`b) Bờ kè: \(2R + l = 40 \Rightarrow l = 40 - 24 = 16\) (m); \(S = \dfrac{16 \cdot 12}{2} = 96\) (m²)`, S`\(n = \dfrac{180\,l}{\pi R} = \dfrac{180 \cdot 16}{3{,}14 \cdot 12} \approx 76{,}4^\circ\)`]),
        loi: ['Quên hai bán kính khi tính chiều dài bờ kè', 'Dùng công thức độ dài cung với n tính bằng radian'] },
      { ten: 'Sân vận động – chu vi đường chạy', nguon: 'Bộ 15 đề ôn thi tuyển sinh vào lớp 10 THPT môn Toán năm 2026 TP Hồ Chí Minh (Đề luyện 04: sân điền kinh); Tuyển tập đề tham khảo 2026 – 2027 sở GD&ĐT TP HCM (Cụm 3, đề 1)', pts: 1, h: 120,
        de: S`Mặt sân của một sân vận động gồm một hình chữ nhật có chiều dài \(x\) (m), chiều rộng \(y\) (m) và hai nửa hình tròn đường kính \(y\) gắn vào hai đầu.<br>a) Viết biểu thức tính chu vi \(P\) (độ dài đường chạy bao quanh) và diện tích \(S\) của mặt sân theo \(x\), \(y\).<br>b) Biết \(y = 50\) m và đường chạy dài 400 m. Tính \(x\) và diện tích mặt sân (lấy \(\pi \approx 3{,}14\)).`,
        ans: S`a) \(P = 2x + \pi y\); \(S = xy + \dfrac{\pi y^2}{4}\). b) \(x = 121{,}5\) m; \(S = 8037{,}5\) m².`,
        barem: ab([S`a) Hai nửa đường tròn ghép thành một đường tròn đường kính \(y\): \(P = 2x + \pi y\)`, S`\(S = xy + \pi\left(\dfrac y2\right)^2 = xy + \dfrac{\pi y^2}{4}\)`],
          [S`b) \(2x + 3{,}14 \cdot 50 = 400 \iff x = 121{,}5\) (m)`, S`\(S = 121{,}5 \cdot 50 + \dfrac{3{,}14 \cdot 2500}{4} = 6075 + 1962{,}5 = 8037{,}5\) (m²)`]),
        loi: ['Cộng cả hai chiều rộng y vào chu vi đường chạy', 'Dùng bán kính bằng y khi tính diện tích hai nửa hình tròn'] },
      { ten: 'Tấm tôn cắt hình tròn – phần bỏ đi', nguon: 'Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (Cụm 16, đề 1: tấm tôn cắt nắp tròn)', pts: 1, h: 120,
        de: S`Từ một tấm tôn hình vuông cạnh \(x\) (cm), người thợ cắt ra một hình tròn có đường kính \(x\) để làm nắp thùng; phần còn lại bị bỏ đi.<br>a) Viết biểu thức thu gọn tính diện tích phần tôn bỏ đi theo \(x\) (lấy \(\pi \approx 3{,}14\)).<br>b) Biết phần tôn bỏ đi có diện tích 774 cm². Tính cạnh tấm tôn và diện tích chiếc nắp.`,
        ans: S`a) \(0{,}215x^2\) (cm²). b) Cạnh 60 cm; nắp 2826 cm².`,
        barem: ab([S`a) Hình tròn bán kính \(\tfrac x2\), diện tích \(\dfrac{\pi x^2}{4} = 0{,}785x^2\)`, S`Phần bỏ đi: \(x^2 - 0{,}785x^2 = 0{,}215x^2\) (cm²)`],
          [S`b) \(0{,}215x^2 = 774 \iff x^2 = 3600 \iff x = 60\) (vì \(x \gt 0\))`, S`Diện tích nắp \(0{,}785 \cdot 3600 = 2826\) (cm²)`]),
        loi: ['Lấy bán kính bằng x', 'Làm tròn π · x²/4 quá sớm'] },
      { ten: 'Hàm số bậc nhất – lợi nhuận quán cà phê', nguon: 'Bộ 15 đề ôn thi tuyển sinh vào lớp 10 THPT môn Toán năm 2026 TP Hồ Chí Minh (Đề luyện 11: quán cà phê)', pts: 1, h: 120,
        de: S`Một quán cà phê mỗi ngày tốn chi phí cố định 1 200 000 đồng (mặt bằng, điện nước, nhân viên). Mỗi ly cà phê có giá vốn 9 000 đồng và bán ra 25 000 đồng.<br>a) Viết hàm số \(L(x)\) (nghìn đồng) biểu diễn lợi nhuận một ngày khi quán bán được \(x\) ly. Bán 60 ly thì quán lãi hay lỗ bao nhiêu?<br>b) Mỗi ngày quán phải bán ít nhất bao nhiêu ly để lợi nhuận đạt ít nhất 1 000 000 đồng?`,
        ans: S`a) \(L(x) = 16x - 1200\); bán 60 ly lỗ 240 nghìn đồng. b) Ít nhất 138 ly.`,
        barem: ab([S`a) Mỗi ly lãi \(25 - 9 = 16\) (nghìn đồng): \(L(x) = 16x - 1200\)`, S`\(L(60) = 960 - 1200 = -240\): bán 60 ly thì lỗ 240 000 đồng`],
          [S`b) \(16x - 1200 \ge 1000 \iff 16x \ge 2200 \iff x \ge 137{,}5\)`, S`\(x\) là số tự nhiên nên ít nhất 138 ly`]),
        loi: ['Quên trừ chi phí cố định', 'Làm tròn 137,5 xuống 137 ly'] },
      { ten: 'Lập phương trình – khuyến mãi mua giày', nguon: '53 đề ôn tập tuyển sinh lớp 10 môn Toán năm 2024 – 2025 sở GD&ĐT TP HCM (Đề 1, Đề 40, Đề 50: khuyến mãi mua giày)', pts: 1, h: 120,
        de: S`Một cửa hàng giày có chương trình khuyến mãi: mua đôi thứ hai được giảm 25% giá niêm yết, đôi thứ ba chỉ phải trả 60% giá niêm yết. Các đôi giày có cùng giá niêm yết \(x\) (đồng).<br>a) Viết biểu thức thu gọn \(T\) là số tiền phải trả khi mua 3 đôi theo chương trình trên.<br>b) Bạn Bình mua 3 đôi giày và trả 1 410 000 đồng. Tính giá niêm yết một đôi. Nếu cửa hàng thay bằng chương trình "giảm 20% mỗi đôi" thì Bình nên chọn chương trình nào?`,
        ans: S`a) \(T = 2{,}35x\). b) \(x = 600\,000\) đồng; chọn chương trình ban đầu (1 410 000 đồng so với 1 440 000 đồng).`,
        barem: ab([S`a) \(T = x + 0{,}75x + 0{,}6x\)`, S`\(T = 2{,}35x\) (đồng)`],
          [S`b) \(2{,}35x = 1\,410\,000 \iff x = 600\,000\) (đồng)`, S`Giảm 20% mỗi đôi: \(3 \cdot 0{,}8 \cdot 600\,000 = 1\,440\,000 \gt 1\,410\,000\). Nên chọn chương trình ban đầu`]),
        loi: ['Hiểu "đôi thứ ba trả 60%" là giảm 60%', 'Không so sánh hai cách khi kết luận'] },
      { ten: 'Lối đi chữ thập – diện tích trồng hoa', nguon: 'Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (Cụm 5, đề 1: hai lối đi trong vườn hoa)', pts: 1, h: 120,
        de: S`Một vườn hoa hình chữ nhật dài 24 m, rộng 16 m. Người ta làm hai lối đi vuông góc với nhau, cùng rộng \(x\) (m) (\(0 \lt x \lt 16\)): một lối song song với chiều dài, một lối song song với chiều rộng, như hình vẽ; phần còn lại trồng hoa.<br>a) Viết biểu thức thu gọn tính diện tích phần trồng hoa theo \(x\).<br>b) Biết diện tích trồng hoa là 273 m². Tìm \(x\).`,
        figQ: G({ pts: { A: [0, 16], B: [24, 16], C: [24, 0], D: [0, 0], E: [0, 8], F: [24, 8], K: [0, 11], L: [24, 11], M: [10, 0], N: [10, 16], P: [13, 0], Q: [13, 16], Z: [-6, 0], W: [27, 0] }, segs: 'AB BC CD DA', dash: 'EF K-L M-N P-Q', hide: 'A B C D E F K L M N P Q Z W', texts: [[12, -2.2, '24 m'], [-3, 4, '16 m'], [11.5, 17, 'x'], [25.2, 9.5, 'x']], w: 240 }),
        ans: S`a) \(x^2 - 40x + 384\) (m²). b) \(x = 3\) m.`,
        barem: ab([S`a) Ghép bốn mảnh trồng hoa được hình chữ nhật có các cạnh \(24 - x\) và \(16 - x\)`, S`Diện tích \((24 - x)(16 - x) = x^2 - 40x + 384\) (m²)`],
          [S`b) \(x^2 - 40x + 384 = 273 \iff x^2 - 40x + 111 = 0 \iff (x - 3)(x - 37) = 0\)`, S`\(x = 3\) (nhận, vì \(0 \lt x \lt 16\)); \(x = 37\) (loại). Lối đi rộng 3 m`]),
        loi: ['Trừ diện tích hai lối đi mà quên phần giao nhau x² được trừ hai lần', 'Không loại nghiệm x = 37'] },
    ],
  });
})();
