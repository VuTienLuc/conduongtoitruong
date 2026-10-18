/* Chủ đề 10 – Luật chơi: kiến thức được dùng trực tiếp và phải chứng minh lại (thống nhất 2026 – 2027). */
(() => {
  const YES = 'Được dùng trực tiếp';
  const NO = 'Không được dùng trực tiếp – phải chứng minh lại hoặc đổi cách';
  const D1 = 'Chỉ được dùng khi đề bài cho sẵn';
  const D2 = 'Được dùng nếu ghi rõ "theo SGK"';
  Topics.add({
    id: 'kien-thuc-thong-nhat', no: 10, bai: 'Luật chơi · áp dụng cho Bài 4, 7', rules: true,
    title: 'Kiến thức thống nhất: được dùng ngay hay phải chứng minh lại',
    desc: 'Danh sách kiến thức Sở cho dùng trực tiếp, danh sách phải chứng minh lại, và 7 mẫu chứng minh lại ngắn gọn để học thuộc.',
    remind: [
      'Không dùng: 3 dấu hiệu tứ giác nội tiếp, phân giác ngoài, các tính chất đường kính – dây.',
      'Chứng minh lại: hệ thức cạnh – đường cao tam giác vuông; tan = sin/cos, sin² + cos² = 1…',
      'Được dùng: nhận xét về góc nội tiếp; công thức tam giác đều, vuông cân; trung tuyến bằng nửa cạnh ⇒ vuông.',
      'Tam giác cân có góc Ở ĐÁY 45° mới là vuông cân.',
    ],
    theory: [
      { t: 'Được dùng trực tiếp (không cần chứng minh)',
        b: S`<ul><li>Các chú ý, nhận xét về <b>góc nội tiếp</b> trong SGK.</li>
          <li>Tam giác vuông có một góc \(45^\circ\); tam giác có hai góc \(45^\circ\); tam giác cân có một góc \(45^\circ\) là tam giác vuông cân.</li>
          <li>Tam giác có <b>đường trung tuyến ứng với một cạnh bằng nửa cạnh ấy</b> là tam giác vuông (cho sử dụng từ lớp 8).</li>
          <li>Thừa nhận các tính chất của tam giác cân, tam giác vuông cân, tam giác đều.</li>
          <li>Công nhận mọi công thức độ dài, bán kính đường tròn ngoại tiếp – nội tiếp, diện tích của tam giác vuông cân, tam giác đều.</li>
          <li>Hai góc cùng phụ, cùng bù với một góc thứ ba thì bằng nhau.</li>
          <li>Tính chất đường phân giác <b>trong</b> của tam giác (yêu cầu cần đạt của chương trình).</li></ul>`,
        warn: S`Câu "tam giác cân có một góc 45° là tam giác vuông cân" chỉ đúng khi 45° là góc ở đáy. Góc ở đỉnh 45° thì các góc là 45°, 67,5°, 67,5° – không vuông. Khi trình bày hãy viết "tam giác cân có góc ở đáy bằng 45°".` },
      { t: 'Không được dùng – phải chứng minh lại hoặc đổi cách',
        b: S`<ul><li>Đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy.</li>
          <li>Đường kính đi qua trung điểm của một dây không đi qua tâm thì vuông góc với dây ấy.</li>
          <li>Đường kính vuông góc với dây cung AB thì đi qua điểm chính giữa của cung AB và ngược lại.</li>
          <li>Chứng minh tứ giác nội tiếp bằng dấu hiệu "tổng hai góc đối bằng 180°", "hai góc bằng nhau cùng nhìn một cạnh", "góc ngoài bằng góc đối trong".</li>
          <li>Tính chất đường phân giác <b>ngoài</b> của tam giác.</li>
          <li>Một số hệ thức về cạnh và đường cao trong tam giác vuông.</li>
          <li>\(\tan\alpha = \dfrac{\sin\alpha}{\cos\alpha}\), \(\cot\alpha = \dfrac{\cos\alpha}{\sin\alpha}\), \(\tan\alpha \cdot \cot\alpha = 1\), \(\sin^2\alpha + \cos^2\alpha = 1\).</li></ul>` },
      { t: '7 mẫu chứng minh lại – học thuộc',
        b: S`<table><tr><th>#</th><th>Kết quả</th><th>Viết lại trong bài</th></tr>
          <tr><td>1</td><td>Đường kính ⊥ dây ⇒ qua trung điểm</td><td>\(OA = OB\) ⇒ \(\triangle OAB\) cân tại \(O\); \(OH \perp AB\) nên \(OH\) vừa là đường cao vừa là trung tuyến ⇒ \(HA = HB\).</td></tr>
          <tr><td>2</td><td>Qua trung điểm dây ⇒ ⊥ dây</td><td>\(\triangle OAB\) cân tại \(O\), \(OH\) là trung tuyến nên cũng là đường cao ⇒ \(OH \perp AB\).</td></tr>
          <tr><td>3</td><td>Đường kính ⊥ dây AB ⇒ qua điểm chính giữa cung AB</td><td>\(\triangle OAB\) cân, \(OM \perp AB\) ⇒ \(OM\) là phân giác: \(\widehat{AOM} = \widehat{BOM}\) ⇒ cung \(AM\) = cung \(BM\).</td></tr>
          <tr><td>4</td><td>Bốn điểm cùng thuộc đường tròn</td><td>Hai góc vuông cùng nhìn \(XY\): trung điểm \(I\) của \(XY\) cách đều bốn điểm (trung tuyến ứng cạnh huyền).</td></tr>
          <tr><td>5</td><td>Phân giác ngoài</td><td>Qua \(C\) kẻ \(CF \parallel AE\) (\(F \in AB\)) ⇒ \(\triangle ACF\) cân, \(AF = AC\); Thalès: \(\dfrac{EB}{EC} = \dfrac{AB}{AF} = \dfrac{AB}{AC}\).</td></tr>
          <tr><td>6</td><td>\(AB^2 = BH \cdot BC\), \(AH^2 = HB \cdot HC\), \(AH \cdot BC = AB \cdot AC\)</td><td>\(\triangle HBA \backsim \triangle ABC\) (g.g) ⇒ \(AB^2 = BH \cdot BC\); \(\triangle HBA \backsim \triangle HAC\) ⇒ \(AH^2 = HB \cdot HC\); hai cách tính diện tích ⇒ \(AH \cdot BC = AB \cdot AC\).</td></tr>
          <tr><td>7</td><td>\(\tan = \sin/\cos\), \(\sin^2 + \cos^2 = 1\)</td><td>Viết theo cạnh: \(\dfrac{\sin\alpha}{\cos\alpha} = \dfrac{\text{đối}/\text{huyền}}{\text{kề}/\text{huyền}} = \dfrac{\text{đối}}{\text{kề}}\); \(\sin^2 + \cos^2 = \dfrac{\text{đối}^2 + \text{kề}^2}{\text{huyền}^2} = 1\) (Pythagore).</td></tr></table>` },
    ],
    tips: [
      { t: 'Bốn cấm – hai chứng minh lại', b: 'Cấm: dấu hiệu tứ giác nội tiếp, phân giác ngoài, đường kính – dây, đường kính – điểm chính giữa cung. Chứng minh lại: hệ thức lượng tam giác vuông, hệ thức lượng giác.' },
      { t: 'Đường kính – dây: nghĩ ngay tam giác cân', b: 'Hai bán kính OA = OB tạo tam giác cân; đường cao = trung tuyến = phân giác.' },
      { t: 'Hệ thức lượng: đồng dạng một dòng', b: 'Viết "△HBA ∽ △ABC (g.g: chung góc B, góc vuông)" rồi suy ra tỉ số – đủ điểm.' },
      { t: 'Lượng giác: dựng tam giác vuông', b: 'Biết tan α = 3/4: vẽ tam giác vuông cạnh đối 3, kề 4, huyền 5 rồi đọc sin, cos – không cần sin² + cos² = 1.' },
      { t: 'Góc 45° ở đáy', b: 'Tam giác cân chỉ thành vuông cân khi góc ở đáy bằng 45°.' },
    ],
    quiz: [
      { q: '"Đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy."', a: [NO, YES, D1, D2], why: 'Theo quy định thống nhất phải chứng minh lại bằng tam giác cân OAB.' },
      { q: '"Góc nội tiếp chắn nửa đường tròn là góc vuông."', a: [YES, NO, D1, D2], why: 'Đây là nhận xét về góc nội tiếp trong SGK – được dùng trực tiếp.' },
      { q: '"Tứ giác có tổng hai góc đối bằng 180° thì nội tiếp được đường tròn."', a: [NO, YES, D1, D2], why: 'Ba dấu hiệu tứ giác nội tiếp không được dùng; phải chỉ ra bốn điểm cách đều một điểm.' },
      { q: '"Tam giác có trung tuyến ứng với một cạnh bằng nửa cạnh ấy là tam giác vuông."', a: [YES, NO, D1, D2], why: 'Được dùng trực tiếp (kiến thức lớp 8).' },
      { q: S`"\(\sin^2\alpha + \cos^2\alpha = 1\)."`, a: [NO, YES, D1, D2], why: 'Phải chứng minh lại từ định nghĩa và định lí Pythagore.' },
      { q: S`"Trong tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\): \(AB^2 = BH \cdot BC\)."`, a: [NO, YES, D1, D2], why: S`Phải chứng minh lại: \(\triangle HBA \backsim \triangle ABC\) (g.g).` },
      { q: '"Hai góc cùng bù với một góc thứ ba thì bằng nhau."', a: [YES, NO, D1, D2], why: 'Được dùng trực tiếp theo hướng dẫn thống nhất.' },
      { q: S`Tam giác cân có góc ở đỉnh bằng \(45^\circ\) là`, a: ['Tam giác không vuông (các góc 45°, 67,5°, 67,5°)', 'Tam giác vuông cân', 'Tam giác đều', 'Tam giác vuông tại đỉnh'], why: 'Chỉ khi góc ở đáy bằng 45° thì tam giác cân mới là vuông cân.' },
    ],
    models: [
      { title: 'Đường kính và dây – chứng minh lại rồi tính', pts: 1,
        de: S`Cho đường tròn \((O;\ 5\text{ cm})\) và dây \(AB = 8\) cm không đi qua tâm. Gọi \(H\) là trung điểm của \(AB\).<br>a) Chứng minh \(OH \perp AB\).<br>b) Tính khoảng cách từ \(O\) đến dây \(AB\).`,
        fig: Fig.geo({ pts: { O: [0, 0], A: [-4, -3], B: [4, -3], H: [0, -3] }, circles: [{ c: 'O', r: 5 }], segs: 'A-B O-A O-B O-H', rights: [['O', 'H', 'B']], dots: 'O', lab: { H: [0, 16], O: [0, -10] }, w: 220 }),
        steps: [
          { part: 'a) OH ⊥ AB – 0,5 điểm' },
          { s: S`\(OA = OB = 5\) cm (bán kính) nên \(\triangle OAB\) cân tại \(O\).`, p: 0.25 },
          { s: S`\(OH\) là đường trung tuyến của tam giác cân \(OAB\) nên đồng thời là đường cao: \(OH \perp AB\).`, p: 0.25, warn: 'Viết "đường kính đi qua trung điểm của dây thì vuông góc với dây" là dùng kiến thức bị cấm.' },
          { part: 'b) Khoảng cách – 0,5 điểm' },
          { s: S`Khoảng cách từ \(O\) đến \(AB\) là \(OH\); \(HB = \dfrac{AB}{2} = 4\) cm.`, p: 0.25 },
          { s: S`Pythagore trong \(\triangle OHB\) vuông tại \(H\): \(OH = \sqrt{OB^2 - HB^2} = \sqrt{25 - 16} = 3\) (cm).`, p: 0.25 },
        ],
        loi: ['Viện dẫn tính chất đường kính – dây thay vì chứng minh lại.', 'Quên chia đôi AB.', 'Thiếu đơn vị.'] },
      { title: 'Tam giác vuông có đường cao – không dùng hệ thức lượng', pts: 1,
        de: S`Cho tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\) cm, \(AC = 8\) cm, đường cao \(AH\). Tính \(BC\), \(BH\) và \(AH\).`,
        fig: Fig.geo({ pts: { A: [0, 4.8], B: [-3.6, 0], C: [6.4, 0], H: [0, 0] }, segs: 'A-B B-C C-A A-H', rights: [['B', 'A', 'C'], ['A', 'H', 'C']], lab: { H: [0, 16] }, rs: 0.5, w: 260 }),
        steps: [
          { s: S`Pythagore: \(BC = \sqrt{AB^2 + AC^2} = \sqrt{36 + 64} = 10\) (cm).`, p: 0.25 },
          { s: S`Xét \(\triangle HBA\) và \(\triangle ABC\): \(\widehat{B}\) chung, \(\widehat{BHA} = \widehat{BAC} = 90^\circ\) nên \(\triangle HBA \backsim \triangle ABC\) (g.g).`, p: 0.25, warn: 'Viết thẳng "theo hệ thức lượng AB² = BH·BC" không được điểm.' },
          { s: S`Suy ra \(\dfrac{BH}{AB} = \dfrac{AB}{BC} \Rightarrow BH = \dfrac{AB^2}{BC} = \dfrac{36}{10} = 3{,}6\) (cm).`, p: 0.25 },
          { s: S`Hai cách tính diện tích: \(AH \cdot BC = AB \cdot AC \Rightarrow AH = \dfrac{6 \cdot 8}{10} = 4{,}8\) (cm).`, p: 0.25 },
        ],
        loi: ['Dùng hệ thức lượng không chứng minh.', 'Ghi sai thứ tự đỉnh khi viết hai tam giác đồng dạng.'] },
    ],
    present: [
      'Gặp kết quả trong danh sách "không được dùng": viết 1–2 dòng chứng minh lại theo mẫu.',
      'Ghi lí do sau mỗi bước: "vì OA = OB", "vì cùng phụ với góc C"…',
      'Tam giác đồng dạng: ghi trường hợp (g.g) và thứ tự đỉnh tương ứng.',
      'Kiến thức được dùng trực tiếp: vẫn nêu tên để giám khảo thấy căn cứ.',
      'Kết luận có đơn vị đo.',
    ],
    practice: [
      { lv: 'Cơ bản', pts: 1, h: 52,
        de: S`Cho đường tròn \((O;\ 13\text{ cm})\) và dây \(AB = 24\) cm. Gọi \(H\) là chân đường vuông góc kẻ từ \(O\) đến \(AB\).<br>a) Chứng minh \(H\) là trung điểm của \(AB\) (không dùng tính chất đường kính – dây).<br>b) Tính \(OH\).`,
        ans: S`a) \(\triangle OAB\) cân tại \(O\), đường cao \(OH\) cũng là trung tuyến. b) \(OH = 5\) cm.`,
        barem: [[S`\(OA = OB\) nên \(\triangle OAB\) cân tại \(O\)`, 0.25], [S`\(OH\) là đường cao nên cũng là trung tuyến, \(H\) là trung điểm \(AB\)`, 0.25], [S`\(HA = 12\) cm`, 0.25], [S`\(OH = \sqrt{13^2 - 12^2} = 5\) cm`, 0.25]] },
      { lv: 'Khá', pts: 1, h: 56,
        de: S`Cho góc nhọn \(\alpha\) có \(\tan\alpha = \dfrac34\).<br>a) Tính \(\sin\alpha\) và \(\cos\alpha\) (không dùng hệ thức \(\sin^2\alpha + \cos^2\alpha = 1\)).<br>b) Tính \(P = \dfrac{2\sin\alpha + \cos\alpha}{\sin\alpha - 2\cos\alpha}\).`,
        ans: S`a) \(\sin\alpha = \dfrac35\), \(\cos\alpha = \dfrac45\). b) \(P = -2\).`,
        barem: [[S`Dựng tam giác vuông có góc nhọn \(\alpha\), cạnh đối \(3k\), cạnh kề \(4k\) (\(k \gt 0\))`, 0.25], [S`Cạnh huyền \(\sqrt{9k^2 + 16k^2} = 5k\) (Pythagore)`, 0.25], [S`\(\sin\alpha = \dfrac{3k}{5k} = \dfrac35\), \(\cos\alpha = \dfrac45\)`, 0.25], [S`\(P = \dfrac{6/5 + 4/5}{3/5 - 8/5} = \dfrac{2}{-1} = -2\)`, 0.25]] },
      { lv: 'Nâng cao', pts: 1, h: 62,
        de: S`Cho tam giác \(ABC\) vuông tại \(A\) có \(AB = 9\) cm, \(AC = 12\) cm, đường cao \(AH\). Tính \(BC\), \(BH\), \(AH\) và \(HC\). Trình bày đầy đủ, không viện dẫn hệ thức lượng trong tam giác vuông.`,
        ans: S`\(BC = 15\), \(BH = 5{,}4\), \(AH = 7{,}2\), \(HC = 9{,}6\) (cm).`,
        fig: Fig.geo({ pts: { A: [0, 7.2], B: [-5.4, 0], C: [9.6, 0], H: [0, 0] }, segs: 'A-B B-C C-A A-H', rights: [['B', 'A', 'C'], ['A', 'H', 'C']], lab: { H: [0, 16] }, rs: 0.8, w: 260 }),
        barem: [[S`\(BC = \sqrt{81 + 144} = 15\) cm`, 0.25], [S`\(\triangle HBA \backsim \triangle ABC\) (g.g: \(\widehat{B}\) chung, góc vuông)`, 0.25], [S`\(BH = \dfrac{AB^2}{BC} = \dfrac{81}{15} = 5{,}4\) cm; \(HC = 15 - 5{,}4 = 9{,}6\) cm`, 0.25], [S`\(AH = \dfrac{AB \cdot AC}{BC} = \dfrac{108}{15} = 7{,}2\) cm (hai cách tính diện tích)`, 0.25]] },
    ],
  });
})();
