/* Chủ đề 9 – Bài 7 câu c (vận dụng cao): tính độ dài, chu vi, diện tích, số đo góc. */
(() => {
  const circ = (X, Y, cx, cy, r, u) => `M${X(cx - r)} ${Y(cy)}a${r * u} ${r * u} 0 1 0 ${2 * r * u} 0a${r * u} ${r * u} 0 1 0 ${-2 * r * u} 0Z`;
  const poly = (X, Y, ps) => 'M' + ps.map(([x, y]) => `${X(x)} ${Y(y)}`).join('L') + 'Z';
  const s3 = Math.sqrt(3);
  Topics.add({
    id: 'hinh-7c', no: 9, bai: 'Bài 7c · khoảng 1 điểm · Vận dụng cao', rules: true,
    title: 'Hình học 7c: tính độ dài, chu vi, diện tích, số đo góc',
    desc: 'Tam giác đều, vuông cân nội tiếp; tỉ số đồng dạng và tỉ số diện tích; hình quạt, viên phân, phần hình tròn nằm ngoài đa giác.',
    remind: [
      S`Tam giác đều cạnh \(a\): \(h = \frac{a\sqrt3}{2}\), \(R = \frac{a\sqrt3}{3}\), \(r = \frac{a\sqrt3}{6}\), \(S = \frac{a^2\sqrt3}{4}\).`,
      S`Vuông cân cạnh góc vuông \(a\): huyền \(a\sqrt2\), \(R = \frac{a\sqrt2}{2}\), \(S = \frac{a^2}{2}\).`,
      S`Đồng dạng tỉ số \(k\): tỉ số chu vi \(k\), tỉ số diện tích \(k^2\).`,
      'Góc nội tiếp = nửa góc ở tâm cùng chắn một cung; dây bằng bán kính ⇒ góc ở tâm 60°.',
    ],
    theory: [
      { t: 'Công thức được dùng trực tiếp (kiến thức thống nhất)',
        b: S`<table><tr><th></th><th>Tam giác đều cạnh \(a\)</th><th>Vuông cân, cạnh góc vuông \(a\)</th></tr>
          <tr><td>Đường cao / cạnh huyền</td><td>\(h = \dfrac{a\sqrt3}{2}\)</td><td>huyền \(a\sqrt2\)</td></tr>
          <tr><td>Bán kính ngoại tiếp</td><td>\(R = \dfrac{a\sqrt3}{3}\)</td><td>\(R = \dfrac{a\sqrt2}{2}\)</td></tr>
          <tr><td>Bán kính nội tiếp</td><td>\(r = \dfrac{a\sqrt3}{6}\)</td><td>\(r = \dfrac{(2 - \sqrt2)a}{2}\)</td></tr>
          <tr><td>Diện tích</td><td>\(S = \dfrac{a^2\sqrt3}{4}\)</td><td>\(S = \dfrac{a^2}{2}\)</td></tr></table>` },
      { t: 'Tính độ dài: Pythagore + đồng dạng',
        b: S`<ul><li>Định lí Pythagore trong tam giác vuông.</li>
          <li>Tam giác đồng dạng cho tỉ lệ cạnh: \(\triangle HBA \backsim \triangle ABC \Rightarrow BH = \dfrac{AB^2}{BC}\) (phải chứng minh đồng dạng trước).</li>
          <li>Đường cao từ diện tích: \(AB \cdot AC = AH \cdot BC\) (hai cách tính diện tích tam giác vuông).</li>
          <li>Tỉ số lượng giác theo định nghĩa: \(\sin\alpha = \dfrac{\text{đối}}{\text{huyền}}\), \(\cos\alpha = \dfrac{\text{kề}}{\text{huyền}}\) – được dùng; các hệ thức giữa chúng phải chứng minh lại.</li></ul>` },
      { t: 'Diện tích phần tô – trừ cho đúng',
        b: S`<ul><li>Phần hình tròn nằm ngoài tam giác: \(S_{\text{tròn}} - S_{\text{tam giác}}\).</li>
          <li>Viên phân: \(S_{\text{quạt}} - S_{\text{tam giác cân tại tâm}}\).</li>
          <li>Phần giữa hai tiếp tuyến và cung nhỏ: \(S_{\text{tứ giác}} - S_{\text{quạt}}\).</li>
          <li>Đồng dạng tỉ số \(k\) thì \(\dfrac{S_1}{S_2} = k^2\).</li></ul>`,
        fig: Fig.geo({ pts: { A: [-2, 0], B: [2, 0], O: [0, 0], C: [1, s3] }, circles: [{ c: 'O', r: 2 }], fill: [(X, Y, P, u) => circ(X, Y, 0, 0, 2, u) + poly(X, Y, [[-2, 0], [2, 0], [1, s3]])], segs: 'A-B B-C C-A O-C', rights: [['A', 'C', 'B']], dots: 'O', lab: { O: [0, 16] }, w: 230, label: 'Phần hình tròn nằm ngoài tam giác' }),
        warn: 'Để kết quả theo R và π, √3 nếu đề không yêu cầu làm tròn.' },
      { t: 'Số đo góc',
        b: S`<ul><li>Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung; góc nội tiếp chắn nửa đường tròn là \(90^\circ\).</li>
          <li>Dây cung bằng bán kính \(\Rightarrow\) tam giác tạo với tâm là tam giác đều \(\Rightarrow\) góc ở tâm \(60^\circ\).</li>
          <li>Tam giác vuông có cạnh góc vuông bằng nửa cạnh huyền thì góc đối diện cạnh đó bằng \(30^\circ\) (vì \(\sin = \dfrac12\)).</li></ul>` },
    ],
    tips: [
      { t: 'Thấy 30° – 60° – 90°: cạnh nhỏ bằng nửa huyền', b: S`Cạnh đối diện góc 30° bằng nửa cạnh huyền; cạnh còn lại bằng \(\dfrac{\sqrt3}{2}\) cạnh huyền.` },
      { t: 'Dây bằng bán kính – tam giác đều hiện ra', b: 'OB = OC = BC thì tam giác OBC đều: góc ở tâm 60°, diện tích dùng công thức a²√3/4.' },
      { t: 'Diện tích tỉ số k bình phương', b: 'Đồng dạng tỉ số 1/2 thì diện tích chỉ còn 1/4, không phải 1/2.' },
      { t: 'Phần tô = cái lớn trừ cái nhỏ', b: 'Vẽ lại hình, tô màu phần cần tính, xác định hình lớn bao ngoài và phần bị khoét.' },
      { t: 'Biết R – tính mọi thứ theo R', b: 'Đề cho bán kính chữ R: mọi độ dài, diện tích viết theo R, không thay số.' },
    ],
    quiz: [
      { q: S`Tam giác đều cạnh \(a\) có bán kính đường tròn ngoại tiếp là`, a: [S`\(\dfrac{a\sqrt3}{3}\)`, S`\(\dfrac{a\sqrt3}{2}\)`, S`\(\dfrac{a\sqrt3}{6}\)`, S`\(a\sqrt3\)`], why: S`\(R = \dfrac23 h = \dfrac23 \cdot \dfrac{a\sqrt3}{2} = \dfrac{a\sqrt3}{3}\).` },
      { q: S`Diện tích tam giác đều cạnh \(a\) là`, a: [S`\(\dfrac{a^2\sqrt3}{4}\)`, S`\(\dfrac{a^2\sqrt3}{2}\)`, S`\(\dfrac{a^2}{2}\)`, S`\(a^2\sqrt3\)`], why: S`\(S = \dfrac12 \cdot a \cdot \dfrac{a\sqrt3}{2} = \dfrac{a^2\sqrt3}{4}\).` },
      { q: S`\(\triangle ABC \backsim \triangle DEF\) theo tỉ số 2. Tỉ số diện tích \(\dfrac{S_{ABC}}{S_{DEF}}\) bằng`, a: ['4', '2', '8', '1/2'], why: 'Tỉ số diện tích bằng bình phương tỉ số đồng dạng: 2² = 4.' },
      { q: S`Góc nội tiếp chắn cung có số đo \(120^\circ\) có số đo`, a: ['60°', '120°', '240°', '30°'], why: 'Góc nội tiếp bằng nửa số đo cung bị chắn.' },
      { q: S`Tam giác vuông cân có cạnh góc vuông \(a\) thì cạnh huyền bằng`, a: [S`\(a\sqrt2\)`, S`\(2a\)`, S`\(a\sqrt3\)`, S`\(\dfrac{a\sqrt2}{2}\)`], why: S`Pythagore: \(\sqrt{a^2 + a^2} = a\sqrt2\).` },
      { q: 'Tam giác vuông có hai cạnh góc vuông 6 cm và 8 cm. Cạnh huyền dài', a: ['10 cm', '14 cm', '12 cm', '√28 cm'], why: S`\(\sqrt{36 + 64} = 10\).` },
      { q: S`Trong \((O;\ R)\), dây \(AB = R\). Khi đó \(\widehat{AOB}\) bằng`, a: ['60°', '90°', '120°', '30°'], why: S`\(OA = OB = AB = R\) nên tam giác \(OAB\) đều.` },
      { q: S`Tam giác \(ABC\) vuông tại \(A\), \(\widehat{B} = 30^\circ\), \(BC = 10\) cm. Khi đó \(AC\) bằng`, a: ['5 cm', '10 cm', '5√3 cm', '20 cm'], why: 'Cạnh đối diện góc 30° bằng nửa cạnh huyền.' },
    ],
    models: [
      { title: 'Tam giác nội tiếp nửa đường tròn – diện tích phần tô', pts: 1.5,
        de: S`Cho đường tròn \((O;\ R)\) đường kính \(AB\). Lấy điểm \(C\) trên đường tròn sao cho \(\widehat{CAB} = 30^\circ\).<br>a) Tính \(BC\) và \(AC\) theo \(R\).<br>b) Tính diện tích phần hình tròn nằm ngoài tam giác \(ABC\) theo \(R\).<br>c) Tính diện tích hình viên phân giới hạn bởi dây \(BC\) và cung nhỏ \(BC\).`,
        fig: Fig.geo({ pts: { A: [-2, 0], B: [2, 0], O: [0, 0], C: [1, s3] }, circles: [{ c: 'O', r: 2 }], fill: [(X, Y, P, u) => circ(X, Y, 0, 0, 2, u) + poly(X, Y, [[-2, 0], [2, 0], [1, s3]])], segs: 'A-B B-C C-A O-C', rights: [['A', 'C', 'B']], dots: 'O', lab: { O: [0, 16] }, w: 240 }),
        steps: [
          { part: 'a) Tính BC, AC – 0,5 điểm' },
          { s: S`\(\widehat{ACB} = 90^\circ\) (góc nội tiếp chắn nửa đường tròn), nên \(\widehat{ABC} = 90^\circ - 30^\circ = 60^\circ\). Tam giác \(OBC\) có \(OB = OC = R\), \(\widehat{OBC} = 60^\circ\) nên là tam giác đều: \(BC = R\).`, p: 0.25 },
          { s: S`Pythagore trong \(\triangle ACB\): \(AC = \sqrt{AB^2 - BC^2} = \sqrt{4R^2 - R^2} = R\sqrt3\).`, p: 0.25 },
          { part: 'b) Phần hình tròn ngoài tam giác – 0,5 điểm' },
          { s: S`\(S_{\text{tròn}} = \pi R^2\); \(S_{ABC} = \dfrac12 AC \cdot BC = \dfrac12 \cdot R\sqrt3 \cdot R = \dfrac{R^2\sqrt3}{2}\).`, p: 0.25 },
          { s: S`Diện tích cần tìm: \(\pi R^2 - \dfrac{R^2\sqrt3}{2} = \dfrac{R^2(2\pi - \sqrt3)}{2}\).`, p: 0.25 },
          { part: 'c) Viên phân – 0,5 điểm' },
          { s: S`\(\widehat{BOC} = 60^\circ\) (tam giác \(OBC\) đều): \(S_{\text{quạt}} = \dfrac{\pi R^2 \cdot 60}{360} = \dfrac{\pi R^2}{6}\); \(S_{OBC} = \dfrac{R^2\sqrt3}{4}\).`, p: 0.25 },
          { s: S`\(S_{\text{viên phân}} = \dfrac{\pi R^2}{6} - \dfrac{R^2\sqrt3}{4} = \dfrac{R^2(2\pi - 3\sqrt3)}{12}\).`, p: 0.25 },
        ],
        loi: ['Không giải thích vì sao tam giác OBC đều.', 'Nhầm diện tích tam giác vuông: lấy AB·AC/2.', 'Trừ nhầm thứ tự (tam giác − hình tròn).', 'Viết tan 30° = sin 30°/cos 30° mà không chứng minh lại.'] },
    ],
    present: [
      'Mỗi độ dài tính được ghi rõ dùng định lí nào (Pythagore, đồng dạng, tam giác đều…).',
      'Công thức tam giác đều, vuông cân: được dùng ngay, ghi công thức rồi thay số.',
      'Phần tô: viết rõ phép trừ "hình lớn − hình nhỏ" trước khi thay số.',
      'Kết quả theo R thì rút gọn, để dạng có π, √3.',
      'Hệ thức lượng, hệ thức lượng giác: chứng minh lại, không viện dẫn.',
    ],
    practice: [
      { lv: 'Cơ bản', pts: 1.5, h: 66,
        de: S`Tam giác đều \(ABC\) có cạnh 6 cm nội tiếp đường tròn \((O)\).<br>a) Tính bán kính \(R\) của đường tròn \((O)\).<br>b) Tính diện tích tam giác \(ABC\).<br>c) Tính diện tích phần hình tròn nằm ngoài tam giác \(ABC\) (lấy \(\pi \approx 3{,}14\), \(\sqrt3 \approx 1{,}732\), làm tròn đến hàng phần trăm).`,
        ans: S`a) \(R = 2\sqrt3\) cm. b) \(9\sqrt3\) cm². c) \(12\pi - 9\sqrt3 \approx 22{,}09\) cm² (π ≈ 3,14).`,
        fig: Fig.geo({ pts: { A: [0, 2 * s3], B: [-3, -s3], C: [3, -s3], O: [0, 0] }, circles: [{ c: 'O', r: 2 * s3 }], segs: 'A-B B-C C-A O-A', dots: 'O', lab: { O: [10, 8] }, w: 220 }),
        barem: [[S`\(R = \dfrac{a\sqrt3}{3} = \dfrac{6\sqrt3}{3}\)`, 0.25], [S`\(R = 2\sqrt3\) cm`, 0.25], [S`\(S = \dfrac{a^2\sqrt3}{4} = \dfrac{36\sqrt3}{4}\)`, 0.25], [S`\(= 9\sqrt3\) cm²`, 0.25], [S`\(S_{\text{tròn}} = \pi R^2 = 12\pi\); phần ngoài \(= 12\pi - 9\sqrt3\)`, 0.25], [S`\(\approx 37{,}68 - 15{,}59 = 22{,}09\) cm²`, 0.25]] },
      { lv: 'Khá', pts: 1.5, h: 72,
        de: S`Từ điểm \(M\) nằm ngoài đường tròn \((O;\ R)\) với \(OM = 2R\), kẻ hai tiếp tuyến \(MA, MB\) (\(A, B\) là tiếp điểm).<br>a) Tính \(MA\) theo \(R\).<br>b) Tính số đo \(\widehat{AOB}\).<br>c) Tính diện tích phần hình giới hạn bởi hai tiếp tuyến \(MA, MB\) và cung nhỏ \(AB\) theo \(R\).`,
        ans: S`a) \(R\sqrt3\). b) \(120^\circ\). c) \(R^2\sqrt3 - \dfrac{\pi R^2}{3} = \dfrac{R^2(3\sqrt3 - \pi)}{3}\).`,
        fig: Fig.geo({ pts: { O: [0, 0], M: [4, 0], A: [1, s3], B: [1, -s3] }, circles: [{ c: 'O', r: 2 }], fill: [(X, Y, P, u) => `M${X(4)} ${Y(0)}L${X(1)} ${Y(s3)}A${2 * u} ${2 * u} 0 0 1 ${X(1)} ${Y(-s3)}Z`], segs: 'M-A M-B O-A O-B O-M', rights: [['M', 'A', 'O'], ['M', 'B', 'O']], dots: 'O', lab: { O: [-12, 4] }, w: 250 }),
        barem: [[S`\(MA \perp OA\); Pythagore: \(MA = \sqrt{OM^2 - OA^2} = \sqrt{4R^2 - R^2}\)`, 0.25], [S`\(MA = R\sqrt3\)`, 0.25], [S`\(\cos\widehat{AOM} = \dfrac{OA}{OM} = \dfrac12 \Rightarrow \widehat{AOM} = 60^\circ\)`, 0.25], [S`\(OM\) là phân giác \(\widehat{AOB}\) nên \(\widehat{AOB} = 120^\circ\)`, 0.25], [S`\(S_{MAOB} = 2 \cdot \dfrac12 \cdot R \cdot R\sqrt3 = R^2\sqrt3\); \(S_{\text{quạt}} = \dfrac{\pi R^2 \cdot 120}{360} = \dfrac{\pi R^2}{3}\)`, 0.25], [S`Diện tích cần tìm \(= R^2\sqrt3 - \dfrac{\pi R^2}{3}\)`, 0.25]] },
      { lv: 'Nâng cao', pts: 1.5, h: 76,
        de: S`Cho đường tròn \((O;\ R)\) đường kính \(BC\), điểm \(A\) thuộc đường tròn sao cho \(AB = R\). Kẻ đường cao \(AH\) của tam giác \(ABC\).<br>a) Tính \(AC\) theo \(R\).<br>b) Tính \(AH\) và \(BH\) theo \(R\).<br>c) Tính tỉ số diện tích của tam giác \(HBA\) và tam giác \(ABC\).`,
        ans: S`a) \(R\sqrt3\). b) \(AH = \dfrac{R\sqrt3}{2}\), \(BH = \dfrac{R}{2}\). c) \(\dfrac14\).`,
        fig: Fig.geo({ pts: { B: [-2, 0], C: [2, 0], O: [0, 0], A: [-1, s3], H: [-1, 0] }, circles: [{ c: 'O', r: 2 }], segs: 'B-C A-B A-C A-H', rights: [['B', 'A', 'C'], ['A', 'H', 'C']], dots: 'O', lab: { O: [0, 16], H: [0, 16] }, w: 240 }),
        barem: [[S`\(\widehat{BAC} = 90^\circ\) (góc nội tiếp chắn nửa đường tròn)`, 0.25], [S`\(AC = \sqrt{BC^2 - AB^2} = \sqrt{4R^2 - R^2} = R\sqrt3\)`, 0.25], [S`\(AB \cdot AC = AH \cdot BC\) (hai lần diện tích) \(\Rightarrow AH = \dfrac{R \cdot R\sqrt3}{2R} = \dfrac{R\sqrt3}{2}\)`, 0.25], [S`\(\triangle HBA \backsim \triangle ABC\) (g.g) \(\Rightarrow \dfrac{BH}{AB} = \dfrac{AB}{BC} \Rightarrow BH = \dfrac{R^2}{2R} = \dfrac{R}{2}\)`, 0.25], [S`Tỉ số đồng dạng \(k = \dfrac{AB}{BC} = \dfrac12\)`, 0.25], [S`Tỉ số diện tích \(k^2 = \dfrac14\)`, 0.25]] },
    ],
  });
})();
