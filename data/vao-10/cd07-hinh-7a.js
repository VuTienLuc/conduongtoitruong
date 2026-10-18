/* Chủ đề 7 – Bài 7 câu a: bốn điểm cùng thuộc đường tròn, song song, vuông góc, bằng nhau, hệ thức. */
(() => {
  const tanFig = Fig.geo({
    pts: { O: [0, 0], M: [5, 0], A: [0.8, 1.833], B: [0.8, -1.833], H: [0.8, 0], I: [2.5, 0] },
    circles: [{ c: 'O', r: 2 }, { c: 'I', r: 2.5, dash: true }],
    segs: 'M-A M-B O-A O-B A-B O-M', dots: 'O I H', rights: [['M', 'A', 'O'], ['M', 'B', 'O'], ['A', 'H', 'M']],
    lab: { H: [10, 14], I: [0, 16], O: [-12, 4] }, w: 320, label: 'Hai tiếp tuyến MA, MB',
  });
  const tri = { A: [1.2, 4], B: [0, 0], C: [5, 0], D: [2.628, 2.497], E: [0.413, 1.376], H: [1.2, 1.14] };
  Topics.add({
    id: 'hinh-7a', no: 7, bai: 'Bài 7a · khoảng 1 điểm', rules: true,
    title: 'Hình học 7a: bốn điểm cùng thuộc đường tròn, song song, vuông góc, hệ thức',
    desc: 'Chứng minh bốn điểm cùng thuộc một đường tròn theo đúng quy định (không dùng dấu hiệu tứ giác nội tiếp); vuông góc, song song; hệ thức bằng tam giác đồng dạng.',
    remind: [
      'Bốn điểm cùng thuộc đường tròn: chỉ ra chúng cách đều một điểm.',
      'Hai góc vuông cùng nhìn đoạn XY ⇒ hai tam giác vuông nội tiếp đường tròn đường kính XY.',
      'Không dùng 3 dấu hiệu tứ giác nội tiếp; được dùng: tứ giác nội tiếp ⇒ tổng hai góc đối 180°.',
      'Hệ thức tích AB·AC = AD·AE: chứng minh hai tam giác đồng dạng.',
    ],
    theory: [
      { t: 'Bốn điểm cùng thuộc một đường tròn – cách được chấm điểm',
        b: S`<p>Theo quy định thống nhất, <b>không được dùng</b> ba dấu hiệu "tổng hai góc đối bằng 180°", "hai góc bằng nhau cùng nhìn một cạnh", "góc ngoài bằng góc trong đối". Phải chỉ ra <b>bốn điểm cách đều một điểm</b>.</p>
          <p><b>Mẫu chủ lực – hai góc vuông cùng nhìn đoạn \(XY\):</b> \(\widehat{XAY} = \widehat{XBY} = 90^\circ\). Gọi \(I\) là trung điểm \(XY\). Tam giác \(XAY\) vuông tại \(A\) nên nội tiếp đường tròn đường kính \(XY\) (tâm \(I\)), tức \(IA = IX = IY = \dfrac{XY}{2}\). Tương tự \(IB = \dfrac{XY}{2}\). Vậy \(X, A, Y, B\) cùng thuộc đường tròn tâm \(I\), bán kính \(\dfrac{XY}{2}\).</p>`,
        warn: 'Phải nêu rõ TÂM và BÁN KÍNH của đường tròn đi qua bốn điểm.' },
      { t: 'Kiến thức về đường tròn được dùng trực tiếp',
        b: S`<ul><li>Góc nội tiếp chắn nửa đường tròn là góc vuông.</li><li>Các góc nội tiếp cùng chắn một cung (hoặc chắn các cung bằng nhau) thì bằng nhau; góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung.</li>
          <li>Tứ giác nội tiếp thì tổng hai góc đối bằng \(180^\circ\) (định lí thuận – được dùng sau khi đã chứng minh 4 điểm cùng thuộc đường tròn).</li>
          <li>Tiếp tuyến vuông góc với bán kính tại tiếp điểm; hai tiếp tuyến cắt nhau tại \(M\): \(MA = MB\), \(MO\) là phân giác góc \(AMB\).</li></ul>` },
      { t: 'Chứng minh vuông góc, song song, bằng nhau',
        b: S`<ul><li><b>Vuông góc</b>: chỉ ra đường trung trực (hai điểm cách đều hai đầu đoạn thẳng); đường cao của tam giác; góc nội tiếp chắn nửa đường tròn.</li>
          <li><b>Song song</b>: cùng vuông góc với một đường thẳng; cặp góc so le trong / đồng vị bằng nhau.</li>
          <li><b>Hai góc bằng nhau</b>: cùng chắn một cung; cùng phụ (cùng bù) với một góc; hai tam giác đồng dạng.</li></ul>` },
      { t: 'Hệ thức – tam giác đồng dạng',
        b: S`<p>Muốn chứng minh \(MA^2 = MH \cdot MO\) hay \(AE \cdot AB = AD \cdot AC\): viết thành tỉ số \(\dfrac{AE}{AC} = \dfrac{AD}{AB}\) rồi tìm hai tam giác chứa bốn đoạn đó, chứng minh đồng dạng (thường là g.g: một góc chung + một cặp góc vuông).</p>`,
        warn: S`Hệ thức lượng trong tam giác vuông (\(MA^2 = MH \cdot MO\)…) KHÔNG được dùng thẳng – phải chứng minh lại bằng tam giác đồng dạng.` },
    ],
    tips: [
      { t: 'Hai góc vuông chung cạnh huyền – lấy trung điểm', b: 'Thấy hai góc 90° cùng nhìn một đoạn: gọi trung điểm đoạn đó, bốn điểm cách đều trung điểm.' },
      { t: 'Tâm – bán kính – kết luận', b: 'Câu 7a luôn kết thúc bằng: "Vậy …, …, …, … cùng thuộc đường tròn tâm …, bán kính …".' },
      { t: 'Tích bằng tích – tìm cặp tam giác', b: 'Chuyển thành tỉ số, mỗi tỉ số lấy một đoạn của mỗi tam giác. Đồng dạng g.g thì tìm góc chung và góc vuông.' },
      { t: 'Tiếp tuyến – vẽ ngay góc vuông', b: 'Đề có tiếp tuyến tại A: đánh dấu góc vuông giữa tiếp tuyến và OA ngay khi vẽ hình.' },
      { t: 'Hình to, đúng, đủ kí hiệu', b: 'Vẽ đường tròn bằng compa, hình chiếm 1/3 trang; tam giác nhọn đừng vẽ cân để không "thấy" điều chưa chứng minh.' },
    ],
    quiz: [
      { q: 'Theo quy định thống nhất, cách nào được dùng để chứng minh bốn điểm cùng thuộc một đường tròn?', a: ['Chỉ ra bốn điểm cách đều một điểm', 'Tứ giác có tổng hai góc đối bằng 180°', 'Hai góc bằng nhau cùng nhìn một cạnh', 'Góc ngoài bằng góc trong đối'], why: 'Ba dấu hiệu tứ giác nội tiếp không được dùng; phải chỉ ra một điểm cách đều cả bốn điểm.' },
      { q: S`Tam giác \(ABC\) vuông tại \(A\) nội tiếp đường tròn có tâm là`, a: ['Trung điểm BC', 'Trung điểm AB', 'Đỉnh A', 'Trọng tâm tam giác'], why: 'Đường tròn ngoại tiếp tam giác vuông có tâm là trung điểm cạnh huyền.' },
      { q: 'Góc nội tiếp chắn nửa đường tròn có số đo', a: ['90°', '180°', '45°', '60°'], why: 'Đây là nhận xét về góc nội tiếp trong SGK – được dùng trực tiếp.' },
      { q: S`\(MA\) là tiếp tuyến của \((O)\) tại \(A\). Khi đó`, a: [S`\(MA \perp OA\)`, S`\(MA \parallel OA\)`, S`\(MA = OA\)`, S`\(MA \perp OM\)`], why: 'Tiếp tuyến vuông góc với bán kính tại tiếp điểm.' },
      { q: S`Tứ giác \(ABCD\) nội tiếp đường tròn, \(\widehat{A} = 70^\circ\). Khi đó \(\widehat{C}\) bằng`, a: ['110°', '70°', '20°', '90°'], why: 'Tứ giác nội tiếp thì tổng hai góc đối bằng 180° (định lí thuận được dùng).' },
      { q: S`Hai góc nội tiếp cùng chắn cung \(BC\) thì`, a: ['Bằng nhau', 'Bù nhau', 'Phụ nhau', 'Gấp đôi nhau'], why: 'Nhận xét trong SGK: các góc nội tiếp cùng chắn một cung thì bằng nhau.' },
      { q: S`Để chứng minh \(AE \cdot AB = AD \cdot AC\) ta thường`, a: ['Chứng minh hai tam giác đồng dạng', 'Dùng định lí Pythagore', 'Dùng hệ thức lượng trong tam giác vuông', 'Tính độ dài từng đoạn'], why: S`Viết thành \(\dfrac{AE}{AC} = \dfrac{AD}{AB}\) rồi chứng minh \(\triangle AEC \backsim \triangle ADB\).` },
      { q: 'Trung tuyến ứng với cạnh huyền của tam giác vuông', a: ['Bằng nửa cạnh huyền', 'Bằng cạnh huyền', 'Vuông góc với cạnh huyền', 'Bằng cạnh góc vuông nhỏ'], why: 'Đây là tính chất quen thuộc từ lớp 8, dùng để chỉ ra bốn điểm cách đều trung điểm.' },
    ],
    models: [
      { title: 'Hai tiếp tuyến cắt nhau', pts: 2,
        de: S`Từ điểm \(M\) nằm ngoài đường tròn \((O)\), kẻ hai tiếp tuyến \(MA, MB\) (\(A, B\) là các tiếp điểm). Gọi \(H\) là giao điểm của \(MO\) và \(AB\).<br>a) Chứng minh bốn điểm \(M, A, O, B\) cùng thuộc một đường tròn.<br>b) Chứng minh \(MO \perp AB\).<br>c) Chứng minh \(MA^2 = MH \cdot MO\).`,
        fig: tanFig,
        steps: [
          { part: 'a) Bốn điểm cùng thuộc đường tròn – 1 điểm' },
          { s: S`\(MA\) là tiếp tuyến tại \(A\) nên \(MA \perp OA\), tức \(\widehat{MAO} = 90^\circ\). Tương tự \(\widehat{MBO} = 90^\circ\).`, p: 0.25 },
          { s: S`Gọi \(I\) là trung điểm \(MO\). Tam giác \(MAO\) vuông tại \(A\) nên nội tiếp đường tròn đường kính \(MO\): \(IA = IM = IO = \dfrac{MO}{2}\).`, p: 0.25 },
          { s: S`Tương tự, tam giác \(MBO\) vuông tại \(B\) nên \(IB = \dfrac{MO}{2}\).`, p: 0.25 },
          { s: S`Vậy \(M, A, O, B\) cùng thuộc đường tròn tâm \(I\), bán kính \(\dfrac{MO}{2}\).`, p: 0.25, warn: S`Viết "tứ giác \(MAOB\) có \(\widehat{A} + \widehat{B} = 180^\circ\) nên nội tiếp" là dùng dấu hiệu bị cấm – không được điểm.` },
          { part: 'b) MO ⊥ AB – 0,5 điểm' },
          { s: S`\(MA = MB\) (tính chất hai tiếp tuyến cắt nhau) và \(OA = OB\) (bán kính).`, p: 0.25 },
          { s: S`Do đó \(M\) và \(O\) cùng cách đều \(A, B\), nên \(MO\) là đường trung trực của \(AB\). Vậy \(MO \perp AB\) tại \(H\).`, p: 0.25 },
          { part: 'c) MA² = MH·MO – 0,5 điểm' },
          { s: S`Xét \(\triangle MHA\) và \(\triangle MAO\): \(\widehat{M}\) chung, \(\widehat{MHA} = \widehat{MAO} = 90^\circ\). Nên \(\triangle MHA \backsim \triangle MAO\) (g.g).`, p: 0.25, warn: 'Ghi thẳng "theo hệ thức lượng trong tam giác vuông MAO" là không được điểm – phải chứng minh đồng dạng.' },
          { s: S`Suy ra \(\dfrac{MH}{MA} = \dfrac{MA}{MO}\), do đó \(MA^2 = MH \cdot MO\).`, p: 0.25 },
        ],
        loi: ['Dùng dấu hiệu tứ giác nội tiếp (tổng hai góc đối 180°).', 'Không nêu tâm và bán kính đường tròn.', 'Dùng thẳng hệ thức lượng trong tam giác vuông.', 'Viết sai thứ tự đỉnh tương ứng khi ghi hai tam giác đồng dạng.'] },
    ],
    present: [
      'Vẽ hình to bằng thước, compa; ghi đủ tên điểm, kí hiệu góc vuông.',
      'Mỗi khẳng định có lí do ngay sau chữ "vì / do" (tiếp tuyến, góc nội tiếp chắn nửa đường tròn…).',
      'Câu 4 điểm: nêu điểm cách đều, kết luận đủ tâm và bán kính.',
      'Tam giác đồng dạng: ghi đúng thứ tự đỉnh tương ứng và trường hợp (g.g).',
      'Không viện dẫn kiến thức bị cấm; nếu cần thì chứng minh lại ngắn gọn.',
    ],
    practice: [
      { lv: 'Cơ bản', pts: 1.5, h: 78,
        de: S`Cho tam giác \(ABC\) nhọn, các đường cao \(BD\) và \(CE\) cắt nhau tại \(H\).<br>a) Chứng minh bốn điểm \(B, C, D, E\) cùng thuộc một đường tròn.<br>b) Chứng minh \(AE \cdot AB = AD \cdot AC\).`,
        ans: S`a) Đường tròn tâm là trung điểm \(BC\), bán kính \(\dfrac{BC}{2}\). b) \(\triangle ADB \backsim \triangle AEC\) (g.g).`,
        fig: Fig.geo({ pts: tri, circles: [{ c: [2.5, 0], r: 2.5, dash: true }], segs: 'A-B B-C C-A B-D C-E', rights: [['B', 'D', 'C'], ['C', 'E', 'B']], dots: 'H', w: 260 }),
        barem: [[S`\(\widehat{BDC} = \widehat{BEC} = 90^\circ\) (đường cao)`, 0.25], [S`Gọi \(K\) là trung điểm \(BC\): hai tam giác vuông \(BDC, BEC\) có \(KD = KE = KB = KC = \dfrac{BC}{2}\)`, 0.25], [S`Kết luận bốn điểm thuộc đường tròn tâm \(K\), bán kính \(\dfrac{BC}{2}\)`, 0.25], [S`\(\triangle ADB\) và \(\triangle AEC\): \(\widehat{A}\) chung, \(\widehat{ADB} = \widehat{AEC} = 90^\circ\)`, 0.25], [S`\(\triangle ADB \backsim \triangle AEC\) (g.g)`, 0.25], [S`\(\dfrac{AD}{AE} = \dfrac{AB}{AC} \Rightarrow AE \cdot AB = AD \cdot AC\)`, 0.25]] },
      { lv: 'Khá', pts: 1.5, h: 78,
        de: S`Cho tam giác \(ABC\) nhọn, các đường cao \(BD\) và \(CE\) cắt nhau tại \(H\).<br>a) Chứng minh bốn điểm \(A, D, H, E\) cùng thuộc một đường tròn. Xác định tâm \(I\) của đường tròn đó.<br>b) Chứng minh \(\widehat{ADE} = \widehat{AHE}\).`,
        ans: S`a) Tâm \(I\) là trung điểm \(AH\). b) Hai góc nội tiếp cùng chắn cung \(AE\) của đường tròn \((I)\).`,
        fig: Fig.geo({ pts: tri, circles: [{ c: [1.2, 2.57], r: 1.43, dash: true }], segs: 'A-B B-C C-A B-D C-E A-H D-E', rights: [['A', 'D', 'H'], ['A', 'E', 'H']], dots: 'H', w: 260 }),
        barem: [[S`\(\widehat{ADH} = \widehat{AEH} = 90^\circ\)`, 0.25], [S`Gọi \(I\) là trung điểm \(AH\): \(ID = IE = IA = IH = \dfrac{AH}{2}\) (trung tuyến ứng cạnh huyền)`, 0.25], [S`Kết luận: \(A, D, H, E\) thuộc đường tròn tâm \(I\), bán kính \(\dfrac{AH}{2}\)`, 0.25], [S`Trong đường tròn \((I)\), \(\widehat{ADE}\) và \(\widehat{AHE}\) là hai góc nội tiếp`, 0.25], [S`cùng chắn cung \(AE\)`, 0.25], [S`nên \(\widehat{ADE} = \widehat{AHE}\)`, 0.25]] },
      { lv: 'Nâng cao', pts: 1.5, h: 82,
        de: S`Cho đường tròn \((O)\) đường kính \(AB\), \(C\) là một điểm trên đường tròn (\(C\) khác \(A, B\)). Tiếp tuyến tại \(A\) của \((O)\) cắt đường thẳng \(BC\) tại \(D\).<br>a) Chứng minh \(AC \perp BD\).<br>b) Chứng minh \(DA^2 = DC \cdot DB\).`,
        ans: S`a) \(\widehat{ACB} = 90^\circ\) (góc nội tiếp chắn nửa đường tròn). b) \(\triangle DCA \backsim \triangle DAB\) (g.g).`,
        fig: Fig.geo({ pts: { A: [-2, 0], B: [2, 0], O: [0, 0], C: [-1, 1.732], D: [-2, 2.309] }, circles: [{ c: 'O', r: 2 }], segs: 'A-B B-D A-D A-C', rights: [['A', 'C', 'B'], ['D', 'A', 'B']], dots: 'O', lab: { O: [0, 16] }, w: 240 }),
        barem: [[S`\(\widehat{ACB} = 90^\circ\) vì là góc nội tiếp chắn nửa đường tròn`, 0.25], [S`\(D\) thuộc đường thẳng \(BC\) nên \(AC \perp BD\)`, 0.25], [S`\(\widehat{DAB} = 90^\circ\) (tiếp tuyến vuông góc bán kính); \(\widehat{DCA} = 90^\circ\)`, 0.25], [S`\(\triangle DCA\) và \(\triangle DAB\): \(\widehat{D}\) chung, \(\widehat{DCA} = \widehat{DAB} = 90^\circ\)`, 0.25], [S`\(\triangle DCA \backsim \triangle DAB\) (g.g)`, 0.25], [S`\(\dfrac{DC}{DA} = \dfrac{DA}{DB} \Rightarrow DA^2 = DC \cdot DB\)`, 0.25]] },
    ],
  });
})();
