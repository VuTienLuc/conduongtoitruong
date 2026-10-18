/* Chủ đề 3 – Bài 3 (1,5 điểm): Xác suất của biến cố (dạng đơn giản). */
(() => {
  // Bảng tổng số chấm khi gieo hai xúc xắc (dùng trong lý thuyết).
  let dice = '<div class="tbl-wrap"><table><tr><th>I \\ II</th>' + [1, 2, 3, 4, 5, 6].map(j => `<th>${j}</th>`).join('') + '</tr>';
  for (let i = 1; i <= 6; i++) dice += `<tr><th>${i}</th>` + [1, 2, 3, 4, 5, 6].map(j => `<td>(${i};${j})</td>`).join('') + '</tr>';
  dice += '</table></div>';

  Topics.add({
    id: 'xac-suat', no: 3, bai: 'Bài 3 · 1,5 điểm',
    title: 'Xác suất của biến cố (dạng đơn giản)',
    desc: 'Mô tả không gian mẫu bằng liệt kê, bảng, sơ đồ cây; đếm kết quả thuận lợi; tính P(A) = n(A)/n(Ω).',
    remind: [
      S`Không gian mẫu \(\Omega\): tập hợp mọi kết quả có thể; \(n(\Omega)\) là số phần tử.`,
      S`\(P(A) = \dfrac{n(A)}{n(\Omega)}\) khi các kết quả đồng khả năng.`,
      S`\(0 \le P(A) \le 1\); rút gọn phân số ở kết quả.`,
      'Gieo 2 xúc xắc: 36 kết quả (bảng 6 × 6); tung đồng xu n lần: 2ⁿ kết quả.',
    ],
    theory: [
      { t: 'Phép thử, không gian mẫu, biến cố',
        b: S`<ul><li><b>Phép thử ngẫu nhiên</b>: việc làm mà biết trước các kết quả có thể xảy ra nhưng không biết kết quả nào sẽ xảy ra (gieo xúc xắc, rút thẻ, lấy bóng…).</li>
          <li><b>Không gian mẫu</b> \(\Omega\): tập hợp tất cả các kết quả có thể. Phải <b>viết ra</b> \(\Omega\) và đếm \(n(\Omega)\).</li>
          <li><b>Biến cố</b> \(A\): một sự kiện liên quan đến phép thử; <b>kết quả thuận lợi</b> cho \(A\) là kết quả làm \(A\) xảy ra.</li></ul>` },
      { t: 'Công thức tính xác suất',
        b: S`<p>Nếu các kết quả của phép thử là <b>đồng khả năng</b> (xúc xắc, đồng xu cân đối; thẻ, bóng giống nhau…) thì
          \[P(A) = \frac{\text{số kết quả thuận lợi cho } A}{\text{số phần tử của } \Omega} = \frac{n(A)}{n(\Omega)}.\]</p>` },
      { t: 'Cách liệt kê không gian mẫu',
        b: S`<ul><li><b>Liệt kê trực tiếp</b> khi ít kết quả: gieo 1 xúc xắc \(\Omega = \{1; 2; 3; 4; 5; 6\}\).</li>
          <li><b>Sơ đồ hình cây</b> khi làm nhiều bước: tung đồng xu 2 lần \(\Omega = \{SS;\ SN;\ NS;\ NN\}\) – 4 kết quả (không phải 3!).</li>
          <li><b>Bảng</b> khi gieo hai xúc xắc: 36 kết quả \((i;\ j)\):</li></ul>${dice}` },
      { t: 'Lấy lần lượt hay lấy cùng lúc?',
        b: S`<table><tr><th>Cách lấy</th><th>Có thứ tự?</th><th>Ví dụ: 3 thẻ 1, 2, 3 lấy 2 thẻ</th></tr>
          <tr><td>Lần lượt, <b>không</b> hoàn lại</td><td>Có</td><td>6 kết quả: (1;2), (2;1), (1;3), (3;1), (2;3), (3;2)</td></tr>
          <tr><td>Lần lượt, <b>có</b> hoàn lại</td><td>Có, được trùng</td><td>9 kết quả (thêm (1;1), (2;2), (3;3))</td></tr>
          <tr><td>Lấy <b>đồng thời</b> 2 thẻ</td><td>Không</td><td>3 kết quả: {1;2}, {1;3}, {2;3}</td></tr></table>`,
        warn: 'Đọc kĩ chữ "lần lượt", "hoàn lại", "đồng thời" – đây là chỗ hay đếm sai n(Ω).' },
    ],
    tips: [
      { t: 'Liệt kê trước – đếm sau – chia cuối', b: 'Ba bước cố định: viết Ω, đếm n(Ω); liệt kê kết quả thuận lợi, đếm n(A); chia và rút gọn.' },
      { t: 'Hai xúc xắc là bảng 6 × 6', b: 'Kẻ bảng 6 dòng 6 cột, tô các ô thỏa điều kiện rồi đếm – không sót, không trùng.' },
      { t: 'Đồng xu n lần: 2 mũ n', b: '1 lần: 2 kết quả; 2 lần: 4; 3 lần: 8. Vẽ sơ đồ cây để liệt kê.' },
      { t: 'Xác suất lớn hơn 1 là sai ngay', b: 'Kết quả phải nằm trong đoạn [0; 1]. Ra 7/5 thì đã đếm sai.' },
      { t: '"Ít nhất một" – nghĩ cách ngược lại', b: 'Đếm các kết quả KHÔNG có cái nào rồi lấy n(Ω) trừ đi cho nhanh.' },
    ],
    quiz: [
      { q: 'Gieo một con xúc xắc cân đối. Số phần tử của không gian mẫu là', a: ['6', '1', '12', '36'], why: S`\(\Omega = \{1; 2; 3; 4; 5; 6\}\) có 6 phần tử.` },
      { q: 'Tung một đồng xu hai lần. Không gian mẫu là', a: ['{SS; SN; NS; NN}', '{SS; SN; NN}', '{S; N}', '{SN; NS}'], why: 'SN (sấp trước, ngửa sau) khác NS. Có 4 kết quả.' },
      { q: 'Gieo hai con xúc xắc cân đối. Số kết quả có thể là', a: ['36', '12', '21', '6'], why: 'Mỗi xúc xắc 6 kết quả, ghép thành bảng 6 × 6 = 36 ô.' },
      { q: 'Hộp có 3 bi đỏ và 2 bi xanh giống nhau về kích thước. Lấy ngẫu nhiên 1 bi. Xác suất lấy được bi xanh là', a: [S`\(\dfrac25\)`, S`\(\dfrac35\)`, S`\(\dfrac23\)`, S`\(\dfrac12\)`], why: S`\(n(\Omega) = 5\), có 2 bi xanh nên \(P = \dfrac25\).` },
      { q: 'Rút ngẫu nhiên 1 thẻ trong 20 thẻ đánh số 1 đến 20. Xác suất rút được thẻ ghi số chia hết cho 5 là', a: [S`\(\dfrac15\)`, S`\(\dfrac14\)`, S`\(\dfrac{1}{20}\)`, S`\(\dfrac{3}{20}\)`], why: S`Các số 5, 10, 15, 20: 4 thẻ. \(P = \dfrac{4}{20} = \dfrac15\).` },
      { q: 'Gieo hai con xúc xắc. Xác suất tổng số chấm bằng 7 là', a: [S`\(\dfrac16\)`, S`\(\dfrac{7}{36}\)`, S`\(\dfrac{1}{12}\)`, S`\(\dfrac{5}{36}\)`], why: S`(1;6), (2;5), (3;4), (4;3), (5;2), (6;1): 6 kết quả. \(P = \dfrac{6}{36} = \dfrac16\).` },
      { q: 'Giá trị nào KHÔNG thể là xác suất của một biến cố?', a: [S`\(\dfrac75\)`, '0', '1', S`\(\dfrac12\)`], why: S`Xác suất luôn thỏa \(0 \le P \le 1\); \(\dfrac75 \gt 1\).` },
      { q: 'Hộp có 3 thẻ ghi 1, 2, 3. Lấy lần lượt 2 thẻ, không hoàn lại. Số kết quả có thể là', a: ['6', '3', '9', '2'], why: 'Lần đầu 3 cách, lần sau còn 2 cách: 3 · 2 = 6 cặp có thứ tự.' },
    ],
    models: [
      { title: 'Rút lần lượt hai thẻ không hoàn lại', pts: 1.5,
        de: S`Một hộp có 4 tấm thẻ giống nhau ghi các số 1, 2, 3, 4. Rút ngẫu nhiên lần lượt hai tấm thẻ (rút xong không trả lại vào hộp).<br>a) Mô tả không gian mẫu của phép thử.<br>b) Tính xác suất của các biến cố \(A\): "Tổng hai số trên hai thẻ là số lẻ" và \(B\): "Tích hai số trên hai thẻ chia hết cho 3".`,
        steps: [
          { part: 'a) Không gian mẫu – 0,5 điểm' },
          { s: S`Mỗi kết quả là cặp \((a;\ b)\) với \(a\) là số trên thẻ rút lần 1, \(b\) là số trên thẻ rút lần 2, \(a \ne b\).`, p: 0.25 },
          { s: S`\(\Omega = \{(1;2), (1;3), (1;4), (2;1), (2;3), (2;4), (3;1), (3;2), (3;4), (4;1), (4;2), (4;3)\}\), \(n(\Omega) = 12\).`, p: 0.25, warn: 'Thiếu các cặp đảo như (2;1) là đếm sai: rút "lần lượt" thì có thứ tự.' },
          { part: 'b) Tính P(A), P(B) – 1 điểm' },
          { s: S`Tổng lẻ khi một thẻ lẻ, một thẻ chẵn. Các kết quả thuận lợi cho \(A\): (1;2), (1;4), (2;1), (2;3), (3;2), (3;4), (4;1), (4;3). Có 8 kết quả.`, p: 0.25 },
          { s: S`\(P(A) = \dfrac{8}{12} = \dfrac23\).`, p: 0.25 },
          { s: S`Tích chia hết cho 3 khi có thẻ số 3. Các kết quả thuận lợi cho \(B\): (1;3), (2;3), (3;1), (3;2), (3;4), (4;3). Có 6 kết quả.`, p: 0.25 },
          { s: S`\(P(B) = \dfrac{6}{12} = \dfrac12\).`, p: 0.25 },
        ],
        loi: ['Không mô tả Ω mà ghi ngay n(Ω) = 12.', 'Chỉ ghi số kết quả thuận lợi, không liệt kê ra.', 'Không rút gọn phân số ở kết quả.', 'Coi (1;2) và (2;1) là một kết quả.'] },
    ],
    present: [
      'Nêu rõ mỗi kết quả là gì (ví dụ: cặp (a; b) với a là số lần 1).',
      'Viết đầy đủ Ω hoặc kẻ bảng / sơ đồ cây, ghi n(Ω).',
      'Liệt kê các kết quả thuận lợi cho từng biến cố, ghi n(A).',
      'Viết công thức P(A) = n(A)/n(Ω) rồi thay số, rút gọn.',
      'Mỗi biến cố một câu kết luận riêng.',
    ],
    practice: [
      { lv: 'Cơ bản', pts: 1.5, h: 52,
        de: S`Gieo một con xúc xắc cân đối và đồng chất một lần.<br>a) Mô tả không gian mẫu.<br>b) Tính xác suất của các biến cố \(A\): "Mặt xuất hiện có số chấm chẵn" và \(B\): "Số chấm xuất hiện chia hết cho 3".`,
        ans: S`a) \(\Omega = \{1;2;3;4;5;6\}\). b) \(P(A) = \dfrac12\), \(P(B) = \dfrac13\).`,
        barem: [[S`\(\Omega = \{1; 2; 3; 4; 5; 6\}\), \(n(\Omega) = 6\)`, 0.5], [S`Kết quả thuận lợi cho A: 2, 4, 6`, 0.25], [S`\(P(A) = \dfrac36 = \dfrac12\)`, 0.25], [S`Kết quả thuận lợi cho B: 3, 6`, 0.25], [S`\(P(B) = \dfrac26 = \dfrac13\)`, 0.25]] },
      { lv: 'Khá', pts: 1.5, h: 62,
        de: S`Tổ 1 có 5 bạn: An, Bình, Cường (nam) và Dung, Em (nữ). Cô giáo chọn ngẫu nhiên đồng thời 2 bạn đi trực nhật.<br>a) Liệt kê không gian mẫu.<br>b) Tính xác suất của biến cố \(C\): "Chọn được 1 bạn nam và 1 bạn nữ" và \(D\): "Cả hai bạn được chọn đều là nữ".`,
        ans: S`a) 10 kết quả. b) \(P(C) = \dfrac35\), \(P(D) = \dfrac{1}{10}\).`,
        barem: [[S`Liệt kê đủ 10 nhóm {An; Bình}, {An; Cường}, {An; Dung}, {An; Em}, {Bình; Cường}, {Bình; Dung}, {Bình; Em}, {Cường; Dung}, {Cường; Em}, {Dung; Em}`, 0.5], [S`Kết quả thuận lợi cho C: 6 nhóm có 1 nam 1 nữ`, 0.25], [S`\(P(C) = \dfrac{6}{10} = \dfrac35\)`, 0.25], [S`Kết quả thuận lợi cho D: {Dung; Em}`, 0.25], [S`\(P(D) = \dfrac{1}{10}\)`, 0.25]] },
      { lv: 'Nâng cao', pts: 1.5, h: 70,
        de: S`Gieo đồng thời hai con xúc xắc cân đối và đồng chất.<br>a) Không gian mẫu có bao nhiêu phần tử? Hãy kẻ bảng mô tả.<br>b) Tính xác suất của biến cố \(E\): "Tổng số chấm không nhỏ hơn 10" và \(F\): "Số chấm trên hai xúc xắc hơn kém nhau 2".`,
        ans: S`a) 36. b) \(P(E) = \dfrac16\), \(P(F) = \dfrac29\).`,
        barem: [[S`Kẻ bảng 6 × 6, \(n(\Omega) = 36\)`, 0.5], [S`E: (4;6), (5;5), (6;4), (5;6), (6;5), (6;6) – 6 kết quả`, 0.25], [S`\(P(E) = \dfrac{6}{36} = \dfrac16\)`, 0.25], [S`F: (1;3), (3;1), (2;4), (4;2), (3;5), (5;3), (4;6), (6;4) – 8 kết quả`, 0.25], [S`\(P(F) = \dfrac{8}{36} = \dfrac29\)`, 0.25]] },
    ],
  });
})();
