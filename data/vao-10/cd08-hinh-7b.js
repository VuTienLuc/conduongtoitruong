/* Chủ đề 8 – Bài 7 câu b: hệ thức, các yếu tố bằng nhau, thẳng hàng, đồng quy. */
(() => {
  const big = { A: [2, 4.5], B: [0, 0], C: [6, 0], O: [3, 1.361], H: [2, 1.778], K: [4, -1.778], F: [2, 0], D: [3.352, 2.979], E: [0.99, 2.227], M: [3, 0] };
  const tri = { A: [1.2, 4], B: [0, 0], C: [5, 0], D: [2.628, 2.497], E: [0.413, 1.376], H: [1.2, 1.14], F: [1.2, 0] };
  Topics.add({
    id: 'hinh-7b', no: 8, bai: 'Bài 7b · khoảng 1 điểm', rules: true,
    title: 'Hình học 7b: hệ thức, bằng nhau, thẳng hàng, đồng quy',
    desc: 'Hình bình hành trong đường tròn, ba điểm thẳng hàng, đường trung bình, hệ thức cộng từ hai cặp tam giác đồng dạng, góc cùng phụ.',
    remind: [
      'Thẳng hàng: góc bẹt 180°, hoặc điểm là trung điểm đường chéo hình bình hành, hoặc cùng song song / vuông góc với một đường.',
      'Đồng quy: ba đường cao (trung tuyến, phân giác, trung trực) của một tam giác.',
      'Đường trung bình: song song cạnh thứ ba và bằng nửa cạnh đó.',
      'Hai góc cùng phụ (cùng bù) với góc thứ ba thì bằng nhau – được dùng trực tiếp.',
    ],
    theory: [
      { t: 'Chứng minh ba điểm thẳng hàng',
        b: S`<ul><li>Chỉ ra \(\widehat{XYZ} = 180^\circ\) (cộng các góc kề nhau).</li>
          <li>\(Y\) là trung điểm của đoạn \(XZ\) (ví dụ: giao điểm hai đường chéo hình bình hành là trung điểm mỗi đường chéo).</li>
          <li>\(XY\) và \(XZ\) cùng song song (hoặc cùng vuông góc) với một đường thẳng – theo tiên đề Euclid.</li>
          <li>\(Y\) nằm trên một đường đã biết đi qua \(X, Z\) (đường trung trực, đường kính…).</li></ul>` },
      { t: 'Chứng minh ba đường đồng quy',
        b: S`<ul><li>Ba đường đó là ba đường cao (hoặc ba trung tuyến, ba phân giác, ba trung trực) của cùng một tam giác.</li>
          <li>Gọi giao điểm của hai đường, chứng minh điểm đó thuộc đường thứ ba.</li></ul>
          <p>Ví dụ: các đường cao \(BD, CE\) cắt nhau tại \(H\) thì \(H\) là trực tâm, nên \(AH \perp BC\).</p>` },
      { t: 'Hình bình hành, đường trung bình',
        b: S`<ul><li>Tứ giác có các cặp cạnh đối song song là hình bình hành; hai đường chéo cắt nhau tại trung điểm mỗi đường.</li>
          <li>Đường trung bình của tam giác song song với cạnh thứ ba và bằng nửa cạnh ấy: dùng để chứng minh \(AH = 2\,OM\), \(OH = \dfrac{BC}{2}\)…</li></ul>`,
        fig: Fig.geo({ pts: big, circles: [{ c: 'O', r: 3.294 }], segs: 'A-B B-C C-A A-F B-D C-E A-K B-K C-K', dash: 'H-K O-M', rights: [['A', 'F', 'C']], dots: 'O H M', lab: { H: [-12, -4], M: [6, 14], F: [-8, 14], O: [12, 0] }, w: 280, label: 'Đường kính AK, hình bình hành BHCK' }) },
      { t: 'Hệ thức "cộng" từ hai cặp tam giác đồng dạng',
        b: S`<p>Muốn chứng minh \(BH \cdot BD + CH \cdot CE = BC^2\): chứng minh riêng \(BH \cdot BD = BF \cdot BC\) và \(CH \cdot CE = CF \cdot CB\) bằng tam giác đồng dạng, rồi cộng vế: \(BC(BF + CF) = BC \cdot BC = BC^2\).</p>`,
        warn: 'Câu b, c được dùng kết quả của câu trước kể cả khi em chưa chứng minh được câu trước – đừng bỏ trống.' },
    ],
    tips: [
      { t: 'Thẳng hàng – nghĩ đến trung điểm', b: 'Trung điểm M của BC cũng là trung điểm HK khi BHCK là hình bình hành ⇒ H, M, K thẳng hàng.' },
      { t: 'Đường kính AK – có ngay hai góc vuông', b: S`\(\widehat{ABK} = \widehat{ACK} = 90^\circ\) (góc nội tiếp chắn nửa đường tròn).` },
      { t: 'Cùng vuông góc thì song song', b: 'BK ⊥ AB và CH ⊥ AB ⇒ BK ∥ CH. Đây là cách nhanh nhất ra cạnh song song.' },
      { t: 'Cùng phụ một góc – bằng nhau', b: S`Trong tam giác vuông có đường cao: \(\widehat{HAC} = \widehat{ABC}\) vì cùng phụ với \(\widehat{C}\).` },
      { t: 'Tổng tích – tách ra hai tích rồi cộng', b: 'Gặp hệ thức có dấu cộng: chứng minh từng tích bằng một tích có chung thừa số, rồi cộng vế.' },
    ],
    quiz: [
      { q: S`Cách nào chứng minh được ba điểm \(A, B, C\) thẳng hàng?`, a: [S`\(\widehat{ABC} = 180^\circ\)`, S`\(\widehat{ABC} = 90^\circ\)`, S`\(AB = BC\)`, S`\(AB + BC \gt AC\)`], why: 'Góc bẹt (180°) thì ba điểm thẳng hàng.' },
      { q: 'Tứ giác có hai cặp cạnh đối song song là', a: ['Hình bình hành', 'Hình thang cân', 'Tứ giác nội tiếp', 'Hình vuông'], why: 'Đây là định nghĩa hình bình hành.' },
      { q: 'Hai đường chéo của hình bình hành', a: ['Cắt nhau tại trung điểm của mỗi đường', 'Luôn bằng nhau', 'Luôn vuông góc', 'Không cắt nhau'], why: 'Tính chất hình bình hành – dùng để chứng minh thẳng hàng.' },
      { q: 'Ba đường cao của một tam giác', a: ['Cùng đi qua một điểm (trực tâm)', 'Song song với nhau', 'Bằng nhau', 'Cắt nhau tại tâm đường tròn ngoại tiếp'], why: 'Ba đường cao đồng quy tại trực tâm.' },
      { q: 'Đường trung bình của tam giác', a: ['Song song với cạnh thứ ba và bằng nửa cạnh đó', 'Vuông góc với cạnh thứ ba', 'Bằng cạnh thứ ba', 'Đi qua trọng tâm'], why: 'Dùng để chứng minh AH = 2OM, OH = BC/2…' },
      { q: S`\(\triangle ABC \backsim \triangle DEF\) theo tỉ số \(k\) thì`, a: [S`\(\dfrac{AB}{DE} = k\)`, S`\(\dfrac{AB}{EF} = k\)`, S`\(\dfrac{DE}{AB} = k\)`, S`\(AB \cdot DE = k\)`], why: 'Tỉ số đồng dạng là tỉ số các cạnh tương ứng theo đúng thứ tự đỉnh.' },
      { q: 'Hai góc cùng phụ với một góc thứ ba thì', a: ['Bằng nhau', 'Bù nhau', 'Phụ nhau', 'Không so sánh được'], why: 'Kiến thức thống nhất: được dùng trực tiếp không cần chứng minh.' },
      { q: 'Qua một điểm nằm ngoài một đường thẳng, số đường thẳng song song với đường thẳng đó là', a: ['Đúng một', 'Hai', 'Vô số', 'Không có'], why: 'Tiên đề Euclid – cơ sở để chứng minh thẳng hàng bằng song song.' },
    ],
    models: [
      { title: 'Hình bình hành BHCK, thẳng hàng và AH = 2OM', pts: 2,
        de: S`Cho tam giác \(ABC\) nhọn (\(AB \lt AC\)) nội tiếp đường tròn \((O)\), các đường cao \(AF, BD, CE\) cắt nhau tại \(H\). Vẽ đường kính \(AK\) của \((O)\), gọi \(M\) là trung điểm \(BC\).<br>a) Chứng minh tứ giác \(BHCK\) là hình bình hành.<br>b) Chứng minh ba điểm \(H, M, K\) thẳng hàng.<br>c) Chứng minh \(AH = 2\,OM\).`,
        fig: Fig.geo({ pts: big, circles: [{ c: 'O', r: 3.294 }], segs: 'A-B B-C C-A A-F B-D C-E A-K B-K C-K', dash: 'H-K O-M', rights: [['A', 'F', 'C']], dots: 'O H M', lab: { H: [-12, -4], M: [6, 14], F: [-8, 14], O: [12, 0] }, w: 300 }),
        steps: [
          { part: 'a) BHCK là hình bình hành – 1 điểm' },
          { s: S`\(\widehat{ABK} = 90^\circ\) (góc nội tiếp chắn nửa đường tròn) nên \(BK \perp AB\).`, p: 0.25 },
          { s: S`\(CE \perp AB\) (đường cao) nên \(CH \perp AB\). Do đó \(BK \parallel CH\).`, p: 0.25 },
          { s: S`Tương tự \(\widehat{ACK} = 90^\circ \Rightarrow CK \perp AC\); \(BH \perp AC\). Do đó \(CK \parallel BH\).`, p: 0.25 },
          { s: S`Tứ giác \(BHCK\) có các cặp cạnh đối song song nên là hình bình hành.`, p: 0.25 },
          { part: 'b) H, M, K thẳng hàng – 0,5 điểm' },
          { s: S`\(BHCK\) là hình bình hành nên hai đường chéo \(BC\) và \(HK\) cắt nhau tại trung điểm của mỗi đường.`, p: 0.25 },
          { s: S`\(M\) là trung điểm \(BC\) nên \(M\) cũng là trung điểm \(HK\). Vậy \(H, M, K\) thẳng hàng.`, p: 0.25 },
          { part: 'c) AH = 2OM – 0,5 điểm' },
          { s: S`\(O\) là trung điểm \(AK\) (tâm đường tròn, \(AK\) là đường kính), \(M\) là trung điểm \(HK\).`, p: 0.25 },
          { s: S`Nên \(OM\) là đường trung bình của \(\triangle AHK\), suy ra \(OM = \dfrac{AH}{2}\), tức \(AH = 2\,OM\).`, p: 0.25 },
        ],
        loi: ['Chỉ ghi "BK ∥ CH" mà không nêu hai đường cùng vuông góc với AB.', 'Kết luận thẳng hàng vì "nhìn hình thấy thẳng".', 'Quên nêu O là trung điểm AK.'] },
    ],
    present: [
      'Mỗi cặp song song: nêu rõ cùng vuông góc với đường nào, vì sao vuông góc.',
      'Thẳng hàng: chỉ ra lí do hình học (trung điểm, góc bẹt…), không "nhìn hình".',
      'Hệ thức: ghi hai tam giác đồng dạng đúng thứ tự đỉnh, rồi suy ra tỉ số.',
      'Được dùng kết quả câu trước: ghi "theo câu a)".',
      'Góc bằng nhau do cùng phụ: ghi rõ cùng phụ với góc nào.',
    ],
    practice: [
      { lv: 'Cơ bản', pts: 1.5, h: 80,
        de: S`Từ điểm \(M\) nằm ngoài đường tròn \((O)\) kẻ hai tiếp tuyến \(MA, MB\) (\(A, B\) là tiếp điểm). Vẽ đường kính \(AC\) của \((O)\). Gọi \(H\) là giao điểm của \(OM\) và \(AB\).<br>a) Chứng minh \(OM \perp AB\).<br>b) Chứng minh \(BC \parallel OM\).<br>c) Chứng minh \(OH = \dfrac{BC}{2}\).`,
        ans: S`a) \(OM\) là trung trực của \(AB\). b) cùng vuông góc với \(AB\). c) \(OH\) là đường trung bình của \(\triangle ABC\).`,
        fig: Fig.geo({ pts: { O: [0, 0], M: [5, 0], A: [0.8, 1.833], B: [0.8, -1.833], C: [-0.8, -1.833], H: [0.8, 0] }, circles: [{ c: 'O', r: 2 }], segs: 'M-A M-B A-B O-M A-C B-C', rights: [['A', 'H', 'M'], ['A', 'B', 'C']], dots: 'O', lab: { H: [10, 14], O: [-6, 16] }, w: 260 }),
        barem: [[S`\(MA = MB\) (hai tiếp tuyến cắt nhau), \(OA = OB\)`, 0.25], [S`\(OM\) là trung trực của \(AB\) nên \(OM \perp AB\) tại \(H\), \(H\) là trung điểm \(AB\)`, 0.25], [S`\(\widehat{ABC} = 90^\circ\) (góc nội tiếp chắn nửa đường tròn) nên \(BC \perp AB\)`, 0.25], [S`\(BC\) và \(OM\) cùng vuông góc với \(AB\) nên \(BC \parallel OM\)`, 0.25], [S`\(O\) là trung điểm \(AC\), \(H\) là trung điểm \(AB\)`, 0.25], [S`\(OH\) là đường trung bình của \(\triangle ABC\) nên \(OH = \dfrac{BC}{2}\)`, 0.25]] },
      { lv: 'Khá', pts: 1.5, h: 80,
        de: S`Cho tam giác \(ABC\) nhọn, các đường cao \(AF, BD, CE\) cắt nhau tại \(H\).<br>a) Chứng minh \(BH \cdot BD = BF \cdot BC\).<br>b) Chứng minh \(CH \cdot CE = CF \cdot CB\).<br>c) Chứng minh \(BH \cdot BD + CH \cdot CE = BC^2\).`,
        ans: S`a) \(\triangle BFH \backsim \triangle BDC\). b) \(\triangle CFH \backsim \triangle CEB\). c) Cộng vế, \(BF + CF = BC\).`,
        fig: Fig.geo({ pts: tri, segs: 'A-B B-C C-A A-F B-D C-E', rights: [['A', 'F', 'C'], ['B', 'D', 'C'], ['C', 'E', 'B']], dots: 'H', lab: { H: [12, -2] }, w: 250 }),
        barem: [[S`\(\triangle BFH\) và \(\triangle BDC\): \(\widehat{B}\) chung, \(\widehat{BFH} = \widehat{BDC} = 90^\circ\) nên đồng dạng (g.g)`, 0.25], [S`\(\dfrac{BF}{BD} = \dfrac{BH}{BC} \Rightarrow BH \cdot BD = BF \cdot BC\)`, 0.25], [S`\(\triangle CFH \backsim \triangle CEB\) (g.g: \(\widehat{C}\) chung, góc vuông)`, 0.25], [S`\(\Rightarrow CH \cdot CE = CF \cdot CB\)`, 0.25], [S`Cộng vế: \(BH \cdot BD + CH \cdot CE = BC(BF + CF)\)`, 0.25], [S`\(F\) nằm giữa \(B, C\) (tam giác nhọn) nên \(BF + CF = BC\); kết luận \(= BC^2\)`, 0.25]] },
      { lv: 'Nâng cao', pts: 1.5, h: 86,
        de: S`Cho tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\). Gọi \(D, E\) lần lượt là hình chiếu của \(H\) trên \(AB, AC\); \(M\) là trung điểm \(BC\).<br>a) Chứng minh tứ giác \(ADHE\) là hình chữ nhật và \(AH = DE\).<br>b) Chứng minh \(\widehat{AED} = \widehat{ABC}\).<br>c) Chứng minh \(AM \perp DE\).`,
        ans: S`b) \(\widehat{AED} = \widehat{HAC} = \widehat{ABC}\). c) \(\widehat{MAB} = \widehat{ABC} = \widehat{AED}\), suy ra \(\widehat{AKE} = 90^\circ\) với \(K = AM \cap DE\).`,
        fig: Fig.geo({ pts: { A: [0, 0], B: [4, 0], C: [0, 3], H: [1.44, 1.92], D: [1.44, 0], E: [0, 1.92], M: [2, 1.5], K: [0.922, 0.691] }, segs: 'A-B B-C C-A A-H H-D H-E D-E A-M', rights: [['B', 'A', 'C'], ['A', 'H', 'B']], dots: 'M', lab: { K: [-4, 16], D: [0, 16], A: [-10, 10] }, w: 250 }),
        barem: [[S`Tứ giác \(ADHE\) có ba góc vuông nên là hình chữ nhật`, 0.25], [S`Hai đường chéo hình chữ nhật bằng nhau: \(AH = DE\)`, 0.25], [S`Gọi \(I\) là giao điểm \(AH, DE\): \(IA = IE\) nên \(\widehat{AED} = \widehat{HAC}\)`, 0.25], [S`\(\widehat{HAC} = \widehat{ABC}\) (cùng phụ với \(\widehat{ACB}\)); suy ra \(\widehat{AED} = \widehat{ABC}\)`, 0.25], [S`\(MA = MB = \dfrac{BC}{2}\) (trung tuyến ứng cạnh huyền) nên \(\widehat{MAB} = \widehat{ABC} = \widehat{AED}\)`, 0.25], [S`Gọi \(K = AM \cap DE\): \(\widehat{KAE} + \widehat{AEK} = \widehat{MAC} + \widehat{MAB} = 90^\circ\) nên \(\widehat{AKE} = 90^\circ\), tức \(AM \perp DE\)`, 0.25]] },
    ],
  });
})();
