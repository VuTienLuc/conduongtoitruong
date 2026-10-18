/* Chủ đề 1 – Bài 1 (1,5 điểm): Hàm số y = ax² (a ≠ 0) và đồ thị. */
Topics.add({
  id: 'ham-so-parabol', no: 1, bai: 'Bài 1 · 1,5 điểm',
  title: S`Hàm số \(y = ax^2\ (a \ne 0)\) và đồ thị`,
  desc: 'Vẽ parabol bằng bảng 5 giá trị; tìm điểm thuộc đồ thị thỏa điều kiện; giao điểm với đường thẳng.',
  remind: [
    S`Đồ thị \(y = ax^2\) là parabol đỉnh \(O\), nhận \(Oy\) làm trục đối xứng.`,
    S`\(a \gt 0\): nằm phía trên \(Ox\); \(a \lt 0\): nằm phía dưới \(Ox\).`,
    S`\(M(x_0;\, y_0)\) thuộc đồ thị \(\iff y_0 = a x_0^2\).`,
    S`Giao điểm với \(y = mx + n\): giải \(ax^2 = mx + n\).`,
  ],
  theory: [
    { t: 'Đồ thị là một parabol',
      b: S`<p>Đồ thị hàm số \(y = ax^2\ (a \ne 0)\) là một đường cong gọi là <b>parabol</b>, có đỉnh là gốc tọa độ \(O\) và nhận trục \(Oy\) làm trục đối xứng.</p>
        <ul><li>\(a \gt 0\): parabol nằm phía trên trục hoành, \(O\) là điểm thấp nhất.</li>
        <li>\(a \lt 0\): parabol nằm phía dưới trục hoành, \(O\) là điểm cao nhất.</li></ul>`,
      fig: Fig.parab({ a: 1, xr: [-3.2, 3.2], yr: [-0.6, 9.4], w: 260, ticksX: [-2, -1, 1, 2], ticksY: [1, 4], pts: [[-2, 4], [-1, 1], [1, 1], [2, 4]], name: [2.25, 7.3, 'y = x²'], label: 'Parabol y = x²' }) },
    { t: 'Lập bảng giá trị để vẽ',
      b: S`<p>Chọn <b>5 giá trị của \(x\) đối xứng nhau qua 0</b>, tính \(y\) rồi đánh dấu 5 điểm và nối thành đường cong trơn.</p>
        <ul><li>\(a = \pm 1,\ \pm 2\): chọn \(x = -2;\ -1;\ 0;\ 1;\ 2\).</li>
        <li>\(a = \pm\dfrac12\): chọn \(x = -4;\ -2;\ 0;\ 2;\ 4\) (hoặc \(-2;\,-1;\,0;\,1;\,2\)).</li>
        <li>\(a = \pm\dfrac14\): chọn \(x = -4;\ -2;\ 0;\ 2;\ 4\) để \(y\) là số nguyên.</li></ul>`,
      warn: 'Hai điểm đối xứng nhau qua Oy luôn có cùng tung độ – nếu bảng của em không đối xứng là đã tính sai.' },
    { t: 'Điểm thuộc đồ thị',
      b: S`<p>\(M(x_0;\, y_0)\) thuộc đồ thị \((P): y = ax^2 \iff y_0 = a x_0^2\).</p>
        <p>Muốn <b>tìm điểm thuộc (P) thỏa một điều kiện</b>: gọi \(M(x_0;\, a x_0^2)\), viết điều kiện thành phương trình ẩn \(x_0\), giải rồi tính \(y_0\).</p>
        <table><tr><th>Điều kiện</th><th>Phương trình</th></tr>
        <tr><td>Tung độ bằng \(k\)</td><td>\(a x_0^2 = k\)</td></tr>
        <tr><td>Tung độ gấp \(k\) lần hoành độ</td><td>\(a x_0^2 = k x_0\)</td></tr>
        <tr><td>Cách đều hai trục tọa độ</td><td>\(|a x_0^2| = |x_0|\)</td></tr>
        <tr><td>Hoành độ và tung độ đối nhau</td><td>\(a x_0^2 = -x_0\)</td></tr></table>`,
      warn: S`Phương trình dạng \(a x_0^2 = k x_0\): chuyển vế rồi đặt nhân tử chung \(x_0(a x_0 - k) = 0\). Chia hai vế cho \(x_0\) sẽ mất nghiệm \(x_0 = 0\).` },
    { t: 'Giao điểm của parabol và đường thẳng',
      b: S`<p>Hoành độ giao điểm của \((P): y = ax^2\) và \((d): y = mx + n\) là nghiệm của phương trình
        \[ax^2 = mx + n \iff ax^2 - mx - n = 0.\]
        Giải ra \(x\), thay vào \((d)\) (hoặc \((P)\)) để tìm \(y\). Số nghiệm của phương trình = số giao điểm.</p>` },
  ],
  tips: [
    { t: 'a dương mặt cười, a âm mặt buồn', b: S`Parabol của \(a \gt 0\) cong lên như miệng cười; \(a \lt 0\) úp xuống như miệng buồn.` },
    { t: 'Năm điểm đối xứng, đỉnh luôn ở O', b: 'Bảng giá trị phải đối xứng: cặp x đối nhau cho cùng y. Không đối xứng là sai.' },
    { t: 'Thuộc đồ thị = thay vào thấy đúng', b: S`Muốn biết điểm có thuộc không: thay \(x_0\) vào, tính \(a x_0^2\) rồi so với \(y_0\).` },
    { t: 'Hoành nằm ngang, tung đứng thẳng', b: S`Hoành độ là \(x\) (trục nằm ngang), tung độ là \(y\) (trục đứng). Điểm viết \((x;\, y)\): hoành trước, tung sau.` },
    { t: 'Đừng chia cho x – hãy đặt nhân tử', b: S`Gặp \(a x^2 = k x\): đưa hết về một vế rồi đặt \(x\) ra ngoài để giữ nghiệm \(x = 0\).` },
  ],
  quiz: [
    { q: S`Đồ thị hàm số \(y = -2x^2\) nằm ở đâu?`, a: ['Phía dưới trục hoành, đỉnh là O', 'Phía trên trục hoành, đỉnh là O', 'Bên phải trục tung', 'Cắt trục hoành tại hai điểm'], why: S`\(a = -2 \lt 0\) nên parabol nằm phía dưới trục hoành, \(O\) là điểm cao nhất.` },
    { q: S`Điểm nào thuộc đồ thị \(y = \dfrac12 x^2\)?`, a: [S`\((2;\, 2)\)`, S`\((2;\, 1)\)`, S`\((-2;\, -2)\)`, S`\((4;\, 4)\)`], why: S`Với \(x = 2\): \(\dfrac12 \cdot 2^2 = 2\). Đúng bằng tung độ 2.` },
    { q: S`Đồ thị \(y = ax^2\) đi qua \(A(2;\, 8)\). Giá trị của \(a\) là`, a: ['2', '4', '16', '1/2'], why: S`Thay \(x = 2,\ y = 8\): \(8 = a \cdot 4 \Rightarrow a = 2\).` },
    { q: S`Trục đối xứng của parabol \(y = 3x^2\) là`, a: ['Trục tung Oy', 'Trục hoành Ox', S`Đường thẳng \(y = x\)`, S`Đường thẳng \(y = 3\)`], why: 'Mọi parabol y = ax² đều nhận trục tung làm trục đối xứng.' },
    { q: S`Với \(y = -x^2\), khi \(x = -3\) thì \(y\) bằng`, a: ['−9', '9', '−6', '6'], why: S`\(y = -(-3)^2 = -9\). Bình phương trước, dấu trừ đứng ngoài giữ nguyên.` },
    { q: S`Các điểm thuộc \((P): y = x^2\) có tung độ bằng 4 là`, a: [S`\((2;\, 4)\) và \((-2;\, 4)\)`, S`Chỉ \((2;\, 4)\)`, S`\((4;\, 16)\)`, S`\((4;\, 2)\) và \((4;\, -2)\)`], why: S`\(x^2 = 4 \iff x = \pm 2\). Có hai điểm, đừng quên nghiệm âm.` },
    { q: S`Để vẽ \(y = \dfrac14 x^2\) cho tung độ là số nguyên, nên chọn \(x\) bằng`, a: ['−4; −2; 0; 2; 4', '−2; −1; 0; 1; 2', '0; 1; 2; 3; 4', '−1; 0; 1; 2; 3'], why: S`\(x = \pm 2\) cho \(y = 1\), \(x = \pm 4\) cho \(y = 4\): số đẹp, đối xứng qua 0.` },
    { q: S`Hoành độ giao điểm của \((P): y = x^2\) và \((d): y = x + 2\) là nghiệm của phương trình`, a: [S`\(x^2 - x - 2 = 0\)`, S`\(x^2 + x + 2 = 0\)`, S`\(x^2 + x - 2 = 0\)`, S`\(x^2 - x + 2 = 0\)`], why: S`Cho hai vế bằng nhau: \(x^2 = x + 2 \iff x^2 - x - 2 = 0\).` },
  ],
  models: [
    { title: 'Vẽ parabol và tìm điểm có tung độ gấp đôi hoành độ', pts: 1.5,
      de: S`Cho hàm số \(y = \dfrac12 x^2\) có đồ thị \((P)\).<br>a) Vẽ \((P)\) trên mặt phẳng tọa độ \(Oxy\).<br>b) Tìm các điểm thuộc \((P)\) có tung độ gấp đôi hoành độ.`,
      fig: Fig.parab({ a: 0.5, xr: [-5, 5], yr: [-1, 9], w: 300, ticksX: [-4, -2, 2, 4], ticksY: [2, 8], pts: [[-4, 8], [-2, 2], [2, 2], [4, 8, '(4; 8)', -58, -8]], name: [-4.9, 6.6, '(P)'], label: 'Parabol y = x²/2' }),
      steps: [
        { part: 'a) Vẽ (P) – 0,75 điểm' },
        { s: S`Bảng giá trị:
            <table><tr><td>\(x\)</td><td>\(-4\)</td><td>\(-2\)</td><td>\(0\)</td><td>\(2\)</td><td>\(4\)</td></tr>
            <tr><td>\(y = \frac12 x^2\)</td><td>\(8\)</td><td>\(2\)</td><td>\(0\)</td><td>\(2\)</td><td>\(8\)</td></tr></table>`, p: 0.25 },
        { s: S`Vẽ hệ trục \(Oxy\) có mũi tên, ghi \(x,\ y,\ O\); đánh dấu 5 điểm \((-4;8),\ (-2;2),\ (0;0),\ (2;2),\ (4;8)\); nối thành đường cong trơn và ghi tên \((P)\) (hình bên).`, p: 0.5, warn: 'Nối gấp khúc, đỉnh nhọn hoặc thiếu tên trục, thiếu O đều bị trừ.' },
        { part: 'b) Tìm điểm – 0,75 điểm' },
        { s: S`Gọi \(M(x_0;\, y_0)\) là điểm cần tìm. Vì tung độ gấp đôi hoành độ nên \(y_0 = 2x_0\). Vì \(M \in (P)\) nên \(y_0 = \dfrac12 x_0^2\). Suy ra \(\dfrac12 x_0^2 = 2x_0\).`, p: 0.25 },
        { s: S`\(\iff x_0^2 - 4x_0 = 0 \iff x_0(x_0 - 4) = 0 \iff x_0 = 0\) hoặc \(x_0 = 4\).`, p: 0.25, warn: S`Chia hai vế cho \(x_0\) sẽ mất nghiệm \(x_0 = 0\) – bị trừ 0,25.` },
        { s: S`\(x_0 = 0 \Rightarrow y_0 = 0\); \(x_0 = 4 \Rightarrow y_0 = 8\). Vậy có hai điểm: \(O(0;\, 0)\) và \(M(4;\, 8)\).`, p: 0.25 },
      ],
      loi: ['Bảng giá trị thiếu hoặc không đối xứng.', 'Vẽ parabol gấp khúc, nhọn ở đỉnh, không ghi tên (P), x, y, O.', 'Chia hai vế cho x₀ làm mất điểm O.', 'Kết luận thiếu điểm hoặc viết ngược (tung; hoành).'] },
  ],
  present: [
    'Lập bảng giá trị đủ 5 cặp số, đối xứng qua 0, trước khi vẽ.',
    'Hệ trục có mũi tên, ghi x, y, O; đánh dấu đúng 5 điểm trên lưới.',
    'Nối cong trơn qua đỉnh O (không gấp khúc), ghi tên (P) cạnh đồ thị.',
    'Câu b: gọi tọa độ điểm, lập phương trình, không chia hai vế cho x.',
    'Kết luận đủ mọi điểm tìm được, viết đúng dạng (hoành độ; tung độ).',
  ],
  practice: [
    { lv: 'Cơ bản', pts: 1.5, h: 72,
      de: S`Cho hàm số \(y = -x^2\) có đồ thị \((P)\).<br>a) Vẽ \((P)\).<br>b) Điểm \(A(-3;\, -9)\) có thuộc \((P)\) không? Tìm các điểm thuộc \((P)\) có tung độ bằng \(-4\).`,
      ans: S`a) Bảng: \(x = -2;-1;0;1;2 \Rightarrow y = -4;-1;0;-1;-4\). b) \(A\) thuộc \((P)\); hai điểm \((2;\, -4)\) và \((-2;\, -4)\).`,
      fig: Fig.parab({ a: -1, xr: [-3.5, 3.5], yr: [-9.5, 1], w: 220, ticksX: [-3, -2, -1, 1, 2], ticksY: [-1, -4, -9], pts: [[-2, -4], [-1, -1], [1, -1], [2, -4], [-3, -9, 'A', 8, 4]], name: [2.1, -6.5, '(P)'] }),
      barem: [[S`Bảng giá trị đúng (5 điểm)`, 0.25], [S`Vẽ đúng parabol, đủ tên trục, O, (P)`, 0.5], [S`Thay \(x = -3\): \(-(-3)^2 = -9\), kết luận \(A \in (P)\)`, 0.25], [S`\(-x^2 = -4 \iff x = \pm 2\)`, 0.25], [S`Kết luận hai điểm \((2;-4),\ (-2;-4)\)`, 0.25]] },
    { lv: 'Khá', pts: 1.5, h: 76,
      de: S`Cho hàm số \(y = \dfrac14 x^2\) có đồ thị \((P)\).<br>a) Vẽ \((P)\).<br>b) Tìm các điểm thuộc \((P)\) cách đều hai trục tọa độ.`,
      ans: S`a) \(x = -4;-2;0;2;4 \Rightarrow y = 4;1;0;1;4\). b) \(O(0;0),\ (4;\, 4),\ (-4;\, 4)\).`,
      fig: Fig.parab({ a: 0.25, xr: [-5, 5], yr: [-1, 5], w: 240, ticksX: [-4, -2, 2, 4], ticksY: [1, 4], pts: [[-4, 4], [-2, 1], [2, 1], [4, 4]], name: [3.1, 3.4, '(P)'] }),
      barem: [[S`Bảng giá trị đúng`, 0.25], [S`Vẽ đúng parabol`, 0.5], [S`Cách đều hai trục \(\iff |y_0| = |x_0| \iff \frac14 x_0^2 = |x_0|\)`, 0.25], [S`Xét \(x_0 \ge 0\): \(x_0 = 0\) hoặc \(4\); \(x_0 \lt 0\): \(x_0 = -4\)`, 0.25], [S`Kết luận ba điểm \(O,\ (4;4),\ (-4;4)\)`, 0.25]] },
    { lv: 'Nâng cao', pts: 1.5, h: 86,
      de: S`Cho \((P): y = -\dfrac12 x^2\) và đường thẳng \((d): y = x - 4\).<br>a) Vẽ \((P)\) và \((d)\) trên cùng một hệ trục tọa độ.<br>b) Tìm tọa độ giao điểm của \((P)\) và \((d)\) bằng phép tính.`,
      ans: S`b) \((2;\, -2)\) và \((-4;\, -8)\).`,
      fig: Fig.parab({ a: -0.5, xr: [-5, 5], yr: [-9, 2], w: 260, ticksX: [-4, -2, 2, 4], ticksY: [-2, -4, -8], pts: [[-4, -8], [-2, -2], [2, -2, '(2; −2)', 8, 4], [4, -8]], line: { m: 1, n: -4 }, lineLabel: [3.1, 0.6, '(d)'], name: [-4.9, -5.5, '(P)'] }),
      barem: [[S`Bảng giá trị của \((P)\): \(x = -4;-2;0;2;4 \Rightarrow y = -8;-2;0;-2;-8\)`, 0.25], [S`Vẽ đúng \((P)\)`, 0.25], [S`Vẽ \((d)\) qua hai điểm \((0;-4)\) và \((4;0)\)`, 0.25], [S`Phương trình hoành độ giao điểm \(-\frac12 x^2 = x - 4 \iff x^2 + 2x - 8 = 0\)`, 0.25], [S`Giải được \(x = 2\) hoặc \(x = -4\)`, 0.25], [S`Tính \(y\) và kết luận \((2;-2),\ (-4;-8)\)`, 0.25]] },
  ],
});
