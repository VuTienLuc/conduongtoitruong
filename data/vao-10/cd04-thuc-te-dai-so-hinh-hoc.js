/* Chủ đề 4 – Bài 4 (1 điểm): Toán thực tế đại số – hình học phẳng. */
(() => {
  const ring = (X, Y, P, u, R, r) => {
    const c = (rr) => `M${X(-rr)} ${Y(0)}a${rr * u} ${rr * u} 0 1 0 ${2 * rr * u} 0a${rr * u} ${rr * u} 0 1 0 ${-2 * rr * u} 0Z`;
    return c(R) + c(r);
  };
  Topics.add({
    id: 'thuc-te-dai-so-hinh-hoc', no: 4, bai: 'Bài 4 · 1 điểm',
    title: 'Toán thực tế: chu vi, diện tích, cung tròn, quạt, vành khăn – lập biểu thức, phương trình',
    desc: 'Tính độ dài cung, diện tích hình quạt, viên phân, vành khăn trong tình huống thực tế; lập biểu thức đại số và phương trình bậc hai.',
    remind: [
      S`Đường tròn: \(C = 2\pi R\), hình tròn \(S = \pi R^2\).`,
      S`Cung \(n^\circ\): \(\ell = \dfrac{\pi R n}{180}\); quạt \(n^\circ\): \(S = \dfrac{\pi R^2 n}{360}\).`,
      S`Vành khăn: \(S = \pi(R^2 - r^2)\); viên phân = quạt − tam giác.`,
      'Lập phương trình: gọi ẩn, đơn vị, điều kiện → giải → đối chiếu, loại nghiệm.',
    ],
    theory: [
      { t: 'Công thức hình phẳng cần thuộc',
        b: S`<table><tr><th>Hình</th><th>Chu vi</th><th>Diện tích</th></tr>
          <tr><td>Hình chữ nhật \(a \times b\)</td><td>\(2(a + b)\)</td><td>\(ab\)</td></tr>
          <tr><td>Hình vuông cạnh \(a\)</td><td>\(4a\)</td><td>\(a^2\)</td></tr>
          <tr><td>Tam giác</td><td>tổng 3 cạnh</td><td>\(\frac12 \cdot\) đáy \(\cdot\) cao</td></tr>
          <tr><td>Hình thang</td><td>tổng 4 cạnh</td><td>\(\frac12 (a + b) h\)</td></tr>
          <tr><td>Hình thoi</td><td>\(4a\)</td><td>\(\frac12 d_1 d_2\)</td></tr></table>` },
      { t: 'Đường tròn, cung, hình quạt',
        b: S`<ul><li>Chu vi đường tròn \(C = 2\pi R = \pi d\); diện tích hình tròn \(S = \pi R^2\).</li>
          <li>Độ dài cung \(n^\circ\): \(\ell = \dfrac{\pi R n}{180}\).</li>
          <li>Diện tích hình quạt \(n^\circ\): \(S_q = \dfrac{\pi R^2 n}{360} = \dfrac{\ell R}{2}\).</li></ul>`,
        warn: 'Kim phút quay 360° trong 60 phút, tức 6° mỗi phút; kim giờ quay 30° mỗi giờ.' },
      { t: 'Viên phân, vành khăn, quạt vành khăn',
        b: S`<ul><li><b>Hình viên phân</b> (giới hạn bởi dây và cung): \(S = S_{\text{quạt}} - S_{\text{tam giác}}\).</li>
          <li><b>Hình vành khăn</b> (giữa hai đường tròn đồng tâm): \(S = \pi R^2 - \pi r^2 = \pi (R^2 - r^2)\).</li>
          <li><b>Quạt vành khăn</b> góc \(n^\circ\): \(S = \dfrac{\pi (R^2 - r^2) n}{360}\) (quạt giấy, cánh quạt, mặt đồng hồ…).</li></ul>`,
        fig: Fig.geo({ pts: { O: [0, 0], M: [3, 0], N: [4, 0] }, circles: [{ c: 'O', r: 4 }, { c: 'O', r: 3 }], fill: [(X, Y, P, u) => ring(X, Y, P, u, 4, 3)], segs: 'O-N', dots: 'O', hide: 'M N', lab: { O: [-10, -8] }, texts: [[1.5, 0.25, 'r'], [3.5, 0.25, 'R − r']], w: 220, label: 'Hình vành khăn' }) },
      { t: 'Lập biểu thức, lập phương trình',
        b: S`<ol><li>Gọi ẩn \(x\), ghi <b>đơn vị</b> và <b>điều kiện</b> (dương, nhỏ hơn kích thước đã cho…).</li>
          <li>Biểu diễn các đại lượng chưa biết theo \(x\).</li>
          <li>Lập phương trình theo dữ kiện còn lại; giải.</li>
          <li>Đối chiếu điều kiện, <b>loại nghiệm không thỏa</b>, trả lời đúng câu hỏi.</li></ol>
          <p>Ví dụ biểu thức: taxi 12 000 đ cho 1 km đầu, 15 000 đ mỗi km sau; đi \(x\) km (\(x \ge 1\)) thì \(T = 12\,000 + 15\,000(x - 1)\) đồng.</p>` },
    ],
    tips: [
      { t: 'Cung chia 180, quạt chia 360', b: S`\(\ell = \dfrac{\pi R n}{180}\), \(S_q = \dfrac{\pi R^2 n}{360}\). Độ dài có R mũ 1, diện tích có R mũ 2.` },
      { t: 'Vành khăn = tròn lớn trừ tròn nhỏ', b: S`\(\pi R^2 - \pi r^2\). Lối đi rộng \(d\) bao quanh bồn bán kính \(r\) thì \(R = r + d\).` },
      { t: 'Viên phân = quạt trừ tam giác', b: 'Tính hai phần riêng rồi trừ. Góc ở tâm 60° thì tam giác là tam giác đều; 90° là vuông cân.' },
      { t: 'Giữ π đến cuối, làm tròn một lần', b: 'Viết kết quả theo π trước (ví dụ 7π), rồi mới thay π ≈ 3,14 và làm tròn theo đề.' },
      { t: 'Đổi đơn vị trước khi tính', b: 'cm với m, phút với giờ: đổi cho cùng đơn vị ngay từ đầu.' },
    ],
    quiz: [
      { q: S`Độ dài cung \(60^\circ\) của đường tròn bán kính 6 cm là`, a: [S`\(2\pi\) cm`, S`\(6\pi\) cm`, S`\(\pi\) cm`, S`\(12\pi\) cm`], why: S`\(\ell = \dfrac{\pi \cdot 6 \cdot 60}{180} = 2\pi\) cm.` },
      { q: S`Diện tích hình quạt \(90^\circ\), bán kính 4 cm là`, a: [S`\(4\pi\) cm²`, S`\(2\pi\) cm²`, S`\(8\pi\) cm²`, S`\(16\pi\) cm²`], why: S`\(S = \dfrac{\pi \cdot 4^2 \cdot 90}{360} = 4\pi\) cm².` },
      { q: S`Hình vành khăn giới hạn bởi hai đường tròn đồng tâm bán kính 5 cm và 3 cm có diện tích`, a: [S`\(16\pi\) cm²`, S`\(4\pi\) cm²`, S`\(2\pi\) cm²`, S`\(34\pi\) cm²`], why: S`\(\pi(5^2 - 3^2) = 16\pi\). Không phải \(\pi(5 - 3)^2\).` },
      { q: S`Đường tròn \((O;\ 2\text{ cm})\), \(\widehat{AOB} = 90^\circ\). Diện tích hình viên phân giới hạn bởi dây AB và cung nhỏ AB là`, a: [S`\(\pi - 2\) cm²`, S`\(\pi\) cm²`, S`\(4\pi - 2\) cm²`, S`\(2\pi - 2\) cm²`], why: S`Quạt: \(\dfrac{\pi \cdot 4 \cdot 90}{360} = \pi\); tam giác vuông cân \(OAB\): \(\dfrac{2 \cdot 2}{2} = 2\). Viên phân \(= \pi - 2\).` },
      { q: 'Bánh xe đạp có đường kính 0,7 m. Mỗi vòng quay xe đi được khoảng (π ≈ 3,14)', a: ['2,2 m', '1,1 m', '4,4 m', '0,7 m'], why: S`Quãng đường một vòng = chu vi \(= \pi d \approx 3{,}14 \cdot 0{,}7 \approx 2{,}2\) m.` },
      { q: S`Mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng 5 m, diện tích 84 m². Gọi chiều rộng là \(x\) (m), phương trình là`, a: [S`\(x(x + 5) = 84\)`, S`\(2(x + x + 5) = 84\)`, S`\(x(x - 5) = 84\)`, S`\(x + 5 = 84\)`], why: S`Chiều dài \(x + 5\); diện tích = dài × rộng.` },
      { q: 'Taxi: 1 km đầu giá 12 000 đ, mỗi km tiếp theo 15 000 đ. Đi x km (x ≥ 1) phải trả', a: [S`\(12\,000 + 15\,000(x - 1)\) đồng`, S`\(12\,000 + 15\,000x\) đồng`, S`\(27\,000x\) đồng`, S`\(15\,000x - 12\,000\) đồng`], why: 'Km đầu tính riêng; còn lại x − 1 km mỗi km 15 000 đ.' },
      { q: S`Giải \(x(x + 5) = 84\) được \(x = 7\) hoặc \(x = -12\). Chiều rộng mảnh vườn là`, a: ['7 m', '−12 m', '7 m hoặc 12 m', '12 m'], why: S`Chiều rộng phải dương nên loại \(x = -12\).` },
    ],
    models: [
      { title: 'Lối đi hình vành khăn quanh bồn hoa', pts: 1,
        de: S`Một bồn hoa hình tròn có bán kính 3 m. Người ta làm một lối đi rộng 1 m bao quanh bồn hoa (phần tô đậm trong hình).<br>a) Tính diện tích lối đi (lấy \(\pi \approx 3{,}14\)).<br>b) Lát gạch lối đi với giá 150 000 đồng mỗi mét vuông. Tính số tiền lát gạch.`,
        fig: Fig.geo({ pts: { O: [0, 0], M: [3, 0], N: [4, 0] }, circles: [{ c: 'O', r: 4 }, { c: 'O', r: 3 }], fill: [(X, Y, P, u) => ring(X, Y, P, u, 4, 3)], segs: 'O-N', dots: 'O', hide: 'M N', lab: { O: [-10, -8] }, texts: [[1.5, 0.25, '3 m'], [3.5, 0.25, '1 m']], w: 220, label: 'Lối đi quanh bồn hoa' }),
        steps: [
          { part: 'a) Diện tích lối đi – 0,5 điểm' },
          { s: S`Lối đi là hình vành khăn: bán kính trong \(r = 3\) m, bán kính ngoài \(R = 3 + 1 = 4\) m.`, p: 0.25 },
          { s: S`\(S = \pi(R^2 - r^2) = \pi(16 - 9) = 7\pi \approx 7 \cdot 3{,}14 = 21{,}98\) (m²).`, p: 0.25, warn: S`Tính \(\pi \cdot 1^2\) (coi lối đi là hình tròn bán kính 1) là sai hoàn toàn.` },
          { part: 'b) Chi phí – 0,5 điểm' },
          { s: S`Số tiền lát gạch: \(21{,}98 \cdot 150\,000 = 3\,297\,000\) (đồng).`, p: 0.25 },
          { s: 'Vậy diện tích lối đi khoảng 21,98 m², chi phí lát gạch khoảng 3 297 000 đồng.', p: 0.25 },
        ],
        loi: ['Quên cộng chiều rộng lối đi vào bán kính.', 'Làm tròn π·7 trước rồi nhân tiền làm sai số.', 'Thiếu đơn vị m², đồng; thiếu câu trả lời.'] },
      { title: 'Lập phương trình bậc hai từ chu vi và diện tích', pts: 1,
        de: 'Một mảnh đất hình chữ nhật có chu vi 34 m và diện tích 60 m². Tính chiều dài và chiều rộng của mảnh đất.',
        steps: [
          { s: S`Nửa chu vi: \(34 : 2 = 17\) (m). Gọi chiều rộng là \(x\) (m), điều kiện \(0 \lt x \lt 8{,}5\). Chiều dài là \(17 - x\) (m).`, p: 0.25, warn: 'Thiếu điều kiện x < 8,5 thì không loại được nghiệm.' },
          { s: S`Diện tích 60 m² nên \(x(17 - x) = 60 \iff x^2 - 17x + 60 = 0\).`, p: 0.25 },
          { s: S`\(\Delta = 289 - 240 = 49\), \(x_1 = \dfrac{17 + 7}{2} = 12\), \(x_2 = \dfrac{17 - 7}{2} = 5\).`, p: 0.25 },
          { s: S`Đối chiếu điều kiện: \(x = 5\) thỏa, \(x = 12\) loại. Vậy chiều rộng 5 m, chiều dài \(17 - 5 = 12\) m.`, p: 0.25 },
        ],
        loi: ['Lấy chu vi chia 4 hoặc quên chia 2.', 'Không đối chiếu điều kiện, kết luận chiều rộng 12 m.', 'Thiếu đơn vị.'] },
    ],
    present: [
      'Ghi rõ đã biết gì: R, r, góc ở tâm n°, đơn vị.',
      'Viết công thức trước, thay số sau; giữ π đến bước cuối.',
      'Làm tròn đúng yêu cầu đề (nếu đề không nói thì để dạng có π hoặc 2 chữ số thập phân).',
      'Bài lập phương trình: gọi ẩn có đơn vị và điều kiện, đối chiếu rồi mới kết luận.',
      'Câu trả lời cuối có đơn vị (m, m², đồng…).',
    ],
    practice: [
      { lv: 'Cơ bản', pts: 1, h: 50,
        de: 'Kim phút của một chiếc đồng hồ treo tường dài 10 cm. Hỏi trong 20 phút, đầu kim phút vạch nên một cung tròn dài bao nhiêu xentimét? (lấy π ≈ 3,14, làm tròn đến hàng phần trăm)',
        ans: S`\(\dfrac{20\pi}{3} \approx 20{,}93\) cm.`,
        barem: [[S`20 phút kim phút quay \(\dfrac{20}{60} \cdot 360^\circ = 120^\circ\)`, 0.25], [S`Công thức \(\ell = \dfrac{\pi R n}{180}\)`, 0.25], [S`\(\ell = \dfrac{\pi \cdot 10 \cdot 120}{180} = \dfrac{20\pi}{3}\)`, 0.25], [S`\(\approx 20{,}93\) cm, kết luận`, 0.25]] },
      { lv: 'Khá', pts: 1, h: 58,
        de: S`Một chiếc quạt giấy khi xòe ra có dạng hình quạt vành khăn với bán kính ngoài 25 cm, bán kính trong 10 cm (phần nan tre không dán giấy) và góc ở tâm \(120^\circ\). Tính diện tích phần giấy dán trên quạt (lấy π ≈ 3,14).`,
        ans: S`\(175\pi \approx 549{,}5\) cm².`,
        barem: [[S`Diện tích quạt lớn: \(\dfrac{\pi \cdot 25^2 \cdot 120}{360} = \dfrac{625\pi}{3}\)`, 0.25], [S`Diện tích quạt nhỏ: \(\dfrac{\pi \cdot 10^2 \cdot 120}{360} = \dfrac{100\pi}{3}\)`, 0.25], [S`Phần giấy: \(\dfrac{525\pi}{3} = 175\pi\)`, 0.25], [S`\(\approx 549{,}5\) cm², kết luận`, 0.25]] },
      { lv: 'Nâng cao', pts: 1, h: 66,
        de: 'Một khu vườn hình chữ nhật dài 20 m, rộng 15 m. Người ta làm một lối đi có chiều rộng không đổi chạy sát quanh mép bên trong vườn; phần còn lại trồng rau có diện tích 176 m². Tính chiều rộng của lối đi.',
        ans: '2 m.',
        barem: [[S`Gọi chiều rộng lối đi là \(x\) (m), \(0 \lt x \lt 7{,}5\)`, 0.25], [S`Phần trồng rau có kích thước \(20 - 2x\) và \(15 - 2x\); phương trình \((20 - 2x)(15 - 2x) = 176\)`, 0.25], [S`\(\iff 2x^2 - 35x + 62 = 0 \iff x = 2\) hoặc \(x = 15{,}5\)`, 0.25], [S`Loại \(x = 15{,}5\); lối đi rộng 2 m`, 0.25]] },
    ],
  });
})();
