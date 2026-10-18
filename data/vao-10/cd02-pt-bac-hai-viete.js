/* Chủ đề 2 – Bài 2 (1 điểm): Phương trình bậc hai – điều kiện có nghiệm, định lí Viète. */
Topics.add({
  id: 'pt-bac-hai-viete', no: 2, bai: 'Bài 2 · 1 điểm',
  title: 'Phương trình bậc hai – điều kiện có nghiệm, định lí Viète',
  desc: 'Xét dấu Δ để biết số nghiệm; dùng Viète tính giá trị biểu thức của hai nghiệm mà không giải phương trình.',
  remind: [
    S`\(\Delta = b^2 - 4ac\); \(b = 2b'\) thì \(\Delta' = b'^2 - ac\).`,
    S`\(\Delta \gt 0\): 2 nghiệm phân biệt; \(\Delta = 0\): nghiệm kép; \(\Delta \lt 0\): vô nghiệm.`,
    S`\(a \cdot c \lt 0 \Rightarrow\) luôn có 2 nghiệm phân biệt trái dấu.`,
    S`Viète: \(S = x_1 + x_2 = -\dfrac{b}{a}\), \(P = x_1 x_2 = \dfrac{c}{a}\).`,
  ],
  theory: [
    { t: 'Số nghiệm theo biệt thức',
      b: S`<p>Phương trình \(ax^2 + bx + c = 0\ (a \ne 0)\), biệt thức \(\Delta = b^2 - 4ac\).</p>
        <table><tr><th>\(\Delta\)</th><th>Số nghiệm</th><th>Công thức</th></tr>
        <tr><td>\(\Delta \gt 0\)</td><td>2 nghiệm phân biệt</td><td>\(x_{1,2} = \dfrac{-b \pm \sqrt\Delta}{2a}\)</td></tr>
        <tr><td>\(\Delta = 0\)</td><td>nghiệm kép</td><td>\(x_1 = x_2 = -\dfrac{b}{2a}\)</td></tr>
        <tr><td>\(\Delta \lt 0\)</td><td>vô nghiệm</td><td>—</td></tr></table>
        <p>Khi \(b = 2b'\) (hệ số b chẵn) dùng \(\Delta' = b'^2 - ac\), nghiệm \(x_{1,2} = \dfrac{-b' \pm \sqrt{\Delta'}}{a}\).</p>` },
    { t: 'Điều kiện có nghiệm',
      b: S`<ul><li>Có nghiệm \(\iff \Delta \ge 0\) (hoặc \(\Delta' \ge 0\)).</li><li>Có 2 nghiệm phân biệt \(\iff \Delta \gt 0\).</li>
        <li>Nếu \(a \cdot c \lt 0\) thì \(\Delta = b^2 - 4ac \gt 0\): phương trình chắc chắn có 2 nghiệm phân biệt, trái dấu.</li></ul>`,
      warn: S`Phương trình có tham số m: tìm điều kiện có nghiệm TRƯỚC, cuối bài phải đối chiếu giá trị m tìm được với điều kiện đó.` },
    { t: 'Định lí Viète',
      b: S`<p>Nếu \(x_1, x_2\) là hai nghiệm của \(ax^2 + bx + c = 0\ (a \ne 0)\) thì
        \[S = x_1 + x_2 = -\frac{b}{a}, \qquad P = x_1 x_2 = \frac{c}{a}.\]</p>
        <p>Nhẩm nghiệm: \(a + b + c = 0 \Rightarrow x_1 = 1,\ x_2 = \dfrac{c}{a}\); \(a - b + c = 0 \Rightarrow x_1 = -1,\ x_2 = -\dfrac{c}{a}\).</p>` },
    { t: 'Biểu thức đối xứng – đưa về S và P',
      b: S`<table><tr><th>Biểu thức</th><th>Theo S, P</th></tr>
        <tr><td>\(x_1^2 + x_2^2\)</td><td>\(S^2 - 2P\)</td></tr>
        <tr><td>\((x_1 - x_2)^2\)</td><td>\(S^2 - 4P\)</td></tr>
        <tr><td>\(\dfrac{1}{x_1} + \dfrac{1}{x_2}\)</td><td>\(\dfrac{S}{P}\)</td></tr>
        <tr><td>\(\dfrac{x_1}{x_2} + \dfrac{x_2}{x_1}\)</td><td>\(\dfrac{S^2 - 2P}{P}\)</td></tr>
        <tr><td>\(x_1^3 + x_2^3\)</td><td>\(S^3 - 3SP\)</td></tr></table>
        <p><b>Biểu thức không đối xứng</b> (ví dụ có \(x_1^2\) mà không có \(x_2^2\)): dùng \(x_1\) là nghiệm, \(a x_1^2 = -b x_1 - c\), để hạ bậc rồi mới dùng Viète.</p>` },
  ],
  tips: [
    { t: 'Tổng trừ b, tích c chia a', b: S`\(S = -\dfrac{b}{a}\) (nhớ dấu trừ), \(P = \dfrac{c}{a}\) (không có dấu trừ).` },
    { t: 'a, c trái dấu – chắc chắn có nghiệm', b: S`Thấy \(a \cdot c \lt 0\) là kết luận ngay hai nghiệm phân biệt, khỏi tính \(\Delta\).` },
    { t: 'Trước Viète phải có nghiệm', b: 'Luôn viết một dòng: "Vì Δ > 0 (hoặc a·c < 0) nên phương trình có hai nghiệm x₁, x₂. Theo Viète…". Thiếu dòng này là mất điểm.' },
    { t: 'Bình phương tổng trừ hai tích', b: S`\(x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = S^2 - 2P\).` },
    { t: 'Không đối xứng thì hạ bậc', b: S`Thay \(x_1^2\) bằng \(\dfrac{-b x_1 - c}{a}\) (vì \(x_1\) là nghiệm) rồi gom về \(S, P\).` },
  ],
  quiz: [
    { q: S`Phương trình \(2x^2 - 5x - 3 = 0\) có \(\Delta\) bằng`, a: ['49', '1', '−1', '25'], why: S`\(\Delta = (-5)^2 - 4 \cdot 2 \cdot (-3) = 25 + 24 = 49\).` },
    { q: S`Phương trình \(x^2 + 4x + 5 = 0\)`, a: ['Vô nghiệm', 'Có nghiệm kép', 'Có hai nghiệm phân biệt', 'Có hai nghiệm trái dấu'], why: S`\(\Delta' = 2^2 - 5 = -1 \lt 0\) nên vô nghiệm.` },
    { q: S`Nếu \(a \cdot c \lt 0\) thì phương trình \(ax^2 + bx + c = 0\)`, a: ['Luôn có hai nghiệm phân biệt trái dấu', 'Luôn vô nghiệm', 'Luôn có nghiệm kép', 'Có hai nghiệm cùng dấu'], why: S`\(\Delta = b^2 - 4ac \gt 0\) vì \(-4ac \gt 0\); tích hai nghiệm \(\dfrac{c}{a} \lt 0\) nên trái dấu.` },
    { q: S`Phương trình \(x^2 - 7x + 10 = 0\) có tổng và tích hai nghiệm là`, a: ['S = 7, P = 10', 'S = −7, P = 10', 'S = 7, P = −10', 'S = 10, P = 7'], why: S`\(S = -\dfrac{-7}{1} = 7\), \(P = \dfrac{10}{1} = 10\).` },
    { q: S`\(x_1^2 + x_2^2\) viết theo \(S, P\) là`, a: [S`\(S^2 - 2P\)`, S`\(S^2 + 2P\)`, S`\(S^2 - 4P\)`, S`\(S - 2P\)`], why: S`\((x_1 + x_2)^2 = x_1^2 + x_2^2 + 2x_1x_2\) nên \(x_1^2 + x_2^2 = S^2 - 2P\).` },
    { q: S`Phương trình \(3x^2 - 5x + 2 = 0\) có hai nghiệm là`, a: [S`\(1\) và \(\dfrac23\)`, S`\(-1\) và \(-\dfrac23\)`, S`\(1\) và \(-\dfrac23\)`, S`\(\dfrac32\) và \(1\)`], why: S`\(a + b + c = 3 - 5 + 2 = 0\) nên \(x_1 = 1,\ x_2 = \dfrac{c}{a} = \dfrac23\).` },
    { q: S`Phương trình \(x^2 - 2x + m = 0\) có nghiệm khi và chỉ khi`, a: [S`\(m \le 1\)`, S`\(m \lt 1\)`, S`\(m \ge 1\)`, S`\(m \le 4\)`], why: S`\(\Delta' = 1 - m \ge 0 \iff m \le 1\). "Có nghiệm" thì lấy cả dấu bằng.` },
    { q: 'Vì sao phải khẳng định phương trình có nghiệm trước khi dùng Viète?', a: ['Vì Viète chỉ đúng khi phương trình có nghiệm', 'Vì giám khảo thích như vậy', 'Vì để tính Δ cho nhanh', 'Không cần, Viète luôn đúng'], why: S`Phương trình vô nghiệm thì không có \(x_1, x_2\) để nói tổng hay tích. Thiếu bước này bị trừ điểm.` },
  ],
  models: [
    { title: 'Chứng minh có hai nghiệm và tính giá trị biểu thức', pts: 1,
      de: S`Cho phương trình \(2x^2 - 5x - 3 = 0\).<br>a) Chứng minh phương trình có hai nghiệm phân biệt \(x_1, x_2\).<br>b) Không giải phương trình, tính \(A = x_1^2 + x_2^2 - 3x_1x_2\).`,
      steps: [
        { part: 'a) Chứng minh có hai nghiệm – 0,5 điểm' },
        { s: S`\(\Delta = (-5)^2 - 4 \cdot 2 \cdot (-3) = 25 + 24 = 49\).`, p: 0.25 },
        { s: S`Vì \(\Delta = 49 \gt 0\) nên phương trình có hai nghiệm phân biệt \(x_1, x_2\). <i>(Cách khác: \(a \cdot c = 2 \cdot (-3) = -6 \lt 0\).)</i>`, p: 0.25 },
        { part: 'b) Tính A – 0,5 điểm' },
        { s: S`Theo định lí Viète: \(S = x_1 + x_2 = \dfrac52\); \(P = x_1x_2 = -\dfrac32\).`, p: 0.25, warn: 'Sai dấu S (viết −5/2) là lỗi phổ biến nhất.' },
        { s: S`\(A = (x_1 + x_2)^2 - 2x_1x_2 - 3x_1x_2 = S^2 - 5P = \dfrac{25}{4} + \dfrac{15}{2} = \dfrac{55}{4}\).`, p: 0.25 },
      ],
      loi: ['Không kết luận "phương trình có hai nghiệm" trước khi dùng Viète.', 'Viết S = −5/2 (quên dấu trừ của −b/a).', 'Giải phương trình ra nghiệm rồi thay vào khi đề yêu cầu "không giải phương trình".'] },
    { title: 'Biểu thức không đối xứng – hạ bậc bằng nghiệm', pts: 0.5,
      de: S`Gọi \(x_1, x_2\) là hai nghiệm của phương trình \(x^2 - 3x - 1 = 0\). Tính \(E = x_1^2 + 3x_2 - x_1x_2\).`,
      steps: [
        { s: S`\(a \cdot c = -1 \lt 0\) nên phương trình có hai nghiệm phân biệt. Theo Viète: \(S = 3,\ P = -1\).`, p: 0.25 },
        { s: S`Vì \(x_1\) là nghiệm nên \(x_1^2 - 3x_1 - 1 = 0 \Rightarrow x_1^2 = 3x_1 + 1\). Do đó \(E = 3x_1 + 1 + 3x_2 - x_1x_2 = 3S + 1 - P = 9 + 1 + 1 = 11\).`, p: 0.25 },
      ],
      loi: ['Cố biến đổi E thành S, P trực tiếp (không được vì E không đối xứng).', 'Quên dấu: −x₁x₂ = −P = +1.'] },
  ],
  present: [
    'Tính Δ (hoặc Δ′, hoặc a·c) và viết câu kết luận số nghiệm.',
    'Viết rõ "Theo định lí Viète: S = …, P = …" trước khi biến đổi.',
    'Biến đổi biểu thức về S, P từng bước, không nhảy bước.',
    'Bài có tham số m: đối chiếu với điều kiện có nghiệm rồi mới kết luận.',
    'Kết quả để dạng phân số tối giản, không làm tròn.',
  ],
  practice: [
    { lv: 'Cơ bản', pts: 1, h: 52,
      de: S`Cho phương trình \(x^2 - 6x + 4 = 0\).<br>a) Chứng minh phương trình có hai nghiệm phân biệt \(x_1, x_2\).<br>b) Không giải phương trình, tính \(A = x_1^2 + x_2^2\) và \(B = \dfrac{1}{x_1} + \dfrac{1}{x_2}\).`,
      ans: S`a) \(\Delta' = 5 \gt 0\). b) \(A = 28\), \(B = \dfrac32\).`,
      barem: [[S`\(\Delta' = (-3)^2 - 4 = 5\)`, 0.25], [S`\(\Delta' \gt 0\) nên có hai nghiệm phân biệt`, 0.25], [S`Viète: \(S = 6,\ P = 4\)`, 0.25], [S`\(A = S^2 - 2P = 28\); \(B = \dfrac{S}{P} = \dfrac32\)`, 0.25]] },
    { lv: 'Khá', pts: 1, h: 56,
      de: S`Cho phương trình \(3x^2 + 4x - 2 = 0\).<br>a) Chứng minh phương trình có hai nghiệm phân biệt \(x_1, x_2\).<br>b) Không giải phương trình, tính \(C = (x_1 - x_2)^2\) và \(D = \dfrac{x_1}{x_2} + \dfrac{x_2}{x_1}\).`,
      ans: S`a) \(a \cdot c = -6 \lt 0\). b) \(C = \dfrac{40}{9}\), \(D = -\dfrac{14}{3}\).`,
      barem: [[S`\(a \cdot c = -6 \lt 0\) (hoặc \(\Delta = 40 \gt 0\))`, 0.25], [S`Kết luận hai nghiệm phân biệt`, 0.25], [S`Viète: \(S = -\dfrac43,\ P = -\dfrac23\)`, 0.25], [S`\(C = S^2 - 4P = \dfrac{40}{9}\); \(D = \dfrac{S^2 - 2P}{P} = -\dfrac{14}{3}\)`, 0.25]] },
    { lv: 'Nâng cao', pts: 1, h: 66,
      de: S`Cho phương trình \(x^2 - 2(m+1)x + m^2 + 3 = 0\) (\(m\) là tham số).<br>a) Tìm \(m\) để phương trình có nghiệm.<br>b) Tìm \(m\) để hai nghiệm \(x_1, x_2\) thỏa mãn \(x_1^2 + x_2^2 = 22\).`,
      ans: S`a) \(m \ge 1\). b) \(m = 2\) (loại \(m = -6\)).`,
      barem: [[S`\(\Delta' = (m+1)^2 - (m^2 + 3) = 2m - 2\)`, 0.25], [S`Có nghiệm \(\iff 2m - 2 \ge 0 \iff m \ge 1\)`, 0.25], [S`Viète: \(S = 2(m+1),\ P = m^2 + 3\); \(S^2 - 2P = 2m^2 + 8m - 2 = 22\)`, 0.25], [S`\(m^2 + 4m - 12 = 0 \iff m = 2\) hoặc \(m = -6\); đối chiếu \(m \ge 1\) được \(m = 2\)`, 0.25]] },
  ],
});
