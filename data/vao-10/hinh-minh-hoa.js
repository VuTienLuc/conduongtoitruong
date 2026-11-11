/* Hình minh họa trực quan cho phần KIẾN THỨC của các chủ đề Toán vào 10 (thầy yêu cầu 11/11/2026: sổ tay công thức cần hình vẽ).
   Gắn thêm "fig" vào mục lý thuyết theo đúng tiêu đề; hiện ở trang chủ đề (📘 Kiến thức) và trong quyển Sổ tay công thức in.
   Mọi toạ độ đã tính đúng (điểm trên đường tròn, chân đường cao, giao điểm); kiem-tra.js báo lỗi nếu không tìm thấy mục để gắn.
   Hình học phẳng: chỉ minh họa kiến thức được dùng, không vẽ dấu hiệu tứ giác nội tiếp (bị cấm). */
(() => {
  const thieu = [];
  const gan = (id, t, fig) => {
    const tp = Topics.get(id), x = tp && (tp.theory || []).find(y => y.t === t);
    if (!x) { thieu.push(`${id}: ${t}`); return; }
    if (!x.fig) x.fig = fig;
  };
  const s3 = Math.sqrt(3);
  const tren = (r, d) => [+(r * Math.cos(d * Math.PI / 180)).toFixed(3), +(r * Math.sin(d * Math.PI / 180)).toFixed(3)];   // điểm trên đường tròn tâm O

  /* Bài 1 – giao điểm parabol y = x² và đường thẳng y = x + 2: x² = x + 2 ⇔ x = −1 hoặc x = 2 → A(−1; 1), B(2; 4) */
  gan('ham-so-parabol', 'Giao điểm của parabol và đường thẳng',
    Fig.parab({ a: 1, xr: [-3, 3.2], yr: [-0.6, 7], w: 250, ticksX: [-1, 2], ticksY: [1, 4], line: { m: 1, n: 2 }, lineLabel: [2.55, 5.3, 'd'],
      pts: [[-1, 1, 'A', -16, -6], [2, 4, 'B', 8, 4]], name: [-2.9, 6.3, '(P)'], label: 'Parabol y = x² cắt đường thẳng y = x + 2 tại A(−1; 1) và B(2; 4)' }));
  gan('ham-so-parabol', 'Lập bảng giá trị để vẽ',
    Fig.hang([[Fig.parab({ a: 1, xr: [-2.6, 2.6], yr: [-0.5, 5], w: 150, ticksX: [-2, 2], ticksY: [4], label: 'a > 0: bề lõm hướng lên' }), S`\(a \gt 0\): quay lên, O thấp nhất`],
      [Fig.parab({ a: -1, xr: [-2.6, 2.6], yr: [-5, 0.5], w: 150, ticksX: [-2, 2], ticksY: [-4], label: 'a < 0: bề lõm hướng xuống' }), S`\(a \lt 0\): quay xuống, O cao nhất`]]));

  /* Bài 2 – số giao điểm của y = ax² + bx + c với Ox ứng với dấu của Δ */
  const mini = (f, lab, pts) => Fig.func({ f, xr: [-2, 2], yr: [-1.4, 3.5], w: 140, h: 100, pts, label: lab });
  gan('pt-bac-hai-viete', 'Số nghiệm theo biệt thức',
    Fig.hang([[mini(x => 0.7 * x * x - 1, 'Δ > 0', [[-1.195, 0], [1.195, 0]]), S`\(\Delta \gt 0\): cắt Ox tại 2 điểm`],
      [mini(x => 0.7 * x * x, 'Δ = 0', [[0, 0]]), S`\(\Delta = 0\): tiếp xúc Ox`],
      [mini(x => 0.7 * x * x + 0.6, 'Δ < 0', []), S`\(\Delta \lt 0\): không cắt Ox`]]));

  /* Bài 3 – sơ đồ cây: gieo một đồng xu hai lần, S = sấp, N = ngửa → Ω = {SS; SN; NS; NN} */
  gan('xac-suat', 'Cách liệt kê không gian mẫu',
    Fig.tree({ tang: [['S', 'N'], ['S', 'N']], ten: ['Lần 1', 'Lần 2'], w: 220, label: 'Sơ đồ cây gieo đồng xu hai lần: 4 kết quả SS, SN, NS, NN' }));

  /* Bài 4 – hình thang (đáy a, b, chiều cao h) và hình quạt n°: cung AB, bán kính R */
  gan('thuc-te-dai-so-hinh-hoc', 'Công thức hình phẳng cần thuộc',
    Fig.hang([[Fig.geo({ pts: { A: [0, 0], B: [6, 0], C: [4.5, 3], D: [1, 3], H: [1, 0] }, segs: 'A-B B-C C-D D-A', dash: 'D-H', rights: [['A', 'H', 'D']], rs: 0.45,
        texts: [[3, -0.55, 'a'], [2.75, 3.35, 'b'], [1.35, 1.6, 'h']], w: 180, label: 'Hình thang đáy a, b, chiều cao h' }), S`Hình thang: \(S = \dfrac{(a + b)h}{2}\)`],
      [Fig.geo({ pts: { A: [-2, 0], B: [0, -1.2], C: [2, 0], D: [0, 1.2], I: [0, 0] }, segs: 'A-B B-C C-D D-A', dash: 'A-C B-D', rights: [['C', 'I', 'D']], rs: 0.3, hide: 'I',
        texts: [[1, 0.25, 'd₁'], [0.35, -0.6, 'd₂']], w: 170, label: 'Hình thoi hai đường chéo d1, d2' }), S`Hình thoi: \(S = \dfrac{d_1 d_2}{2}\)`]]));
  const A20 = tren(3, 20), B100 = tren(3, 100);
  gan('thuc-te-dai-so-hinh-hoc', 'Đường tròn, cung, hình quạt',
    Fig.geo({ pts: { O: [0, 0], A: A20, B: B100 }, circles: [{ c: 'O', r: 3, dash: true }], segs: 'O-A O-B', dots: 'O',
      fill: [(X, Y, P, u) => `M${X(0)} ${Y(0)}L${X(A20[0])} ${Y(A20[1])}A${3 * u} ${3 * u} 0 0 0 ${X(B100[0])} ${Y(B100[1])}Z`],
      texts: [[0.15, 0.75, 'n°'], [1.6, 0.12, 'R'], [1.75, 3.05, 'ℓ']], w: 200, label: 'Hình quạt tròn bán kính R, góc ở tâm n°, cung AB dài ℓ' }));

  /* Bài 6 – nghiệm của hệ là giao điểm hai đường thẳng: x + y = 5, x − y = 1 → (3; 2) */
  gan('he-phuong-trinh-thuc-te', 'Giải hệ nhanh bằng cộng đại số',
    Fig.plane({ xr: [-1, 6], yr: [-1.5, 5.5], w: 210, lines: [{ a: 1, b: 1, c: 5, lab: [0.3, 4.9, 'x + y = 5'] }, { a: 1, b: -1, c: 1, lab: [3.6, 3.6, 'x − y = 1'] }],
      pts: [[3, 2, 'M(3; 2)', 8, 14]], label: 'Hai đường thẳng x + y = 5 và x − y = 1 cắt nhau tại M(3; 2): nghiệm của hệ' }));

  /* 7a – hai góc vuông cùng nhìn đoạn XY: A, B thuộc đường tròn tâm I (trung điểm XY), bán kính XY/2 */
  gan('hinh-7a', 'Bốn điểm cùng thuộc một đường tròn – cách được chấm điểm',
    Fig.geo({ pts: { X: [-3, 0], Y: [3, 0], I: [0, 0], A: tren(3, 125), B: tren(3, 55) }, circles: [{ c: 'I', r: 3, dash: true }],
      segs: 'X-Y X-A A-Y X-B B-Y', dash: 'I-A I-B', rights: [['X', 'A', 'Y'], ['X', 'B', 'Y']], rs: 0.38, dots: 'I', lab: { I: [0, 16] }, w: 230,
      label: 'Góc XAY và XBY vuông: IA = IB = IX = IY = XY/2 nên X, Y, A, B cùng thuộc đường tròn tâm I' }));
  /* 7a – góc nội tiếp chắn nửa đường tròn là góc vuông; tiếp tuyến Bx vuông góc với bán kính OB */
  gan('hinh-7a', 'Kiến thức về đường tròn được dùng trực tiếp',
    Fig.geo({ pts: { A: [-3, 0], B: [3, 0], O: [0, 0], C: [-1, 2.828], x: [3, 2.8] }, circles: [{ c: 'O', r: 3 }], segs: 'A-B A-C C-B', acc: 'B-x',
      rights: [['A', 'C', 'B'], ['O', 'B', 'x']], rs: 0.38, dots: 'O', lab: { O: [0, 16], x: [12, 4] }, w: 220,
      label: 'AB là đường kính nên góc ACB = 90°; Bx là tiếp tuyến tại B nên Bx vuông góc OB' }));
  /* 7a – hai tiếp tuyến MA, MB; AB cắt MO tại H: MA² = MH·MO (R = 2, MO = 5: MA² = 21 = 4,2·5) */
  gan('hinh-7a', 'Hệ thức – tam giác đồng dạng',
    Fig.geo({ pts: { O: [0, 0], M: [5, 0], A: [0.8, 1.833], B: [0.8, -1.833], H: [0.8, 0] }, circles: [{ c: 'O', r: 2 }], segs: 'M-A M-B O-A O-M', acc: 'A-B',
      rights: [['O', 'A', 'M'], ['A', 'H', 'M']], rs: 0.28, dots: 'O H', lab: { O: [-4, 16], H: [10, 16] }, w: 230,
      label: 'Hai tiếp tuyến MA, MB; AB vuông góc MO tại H: tam giác MAH đồng dạng tam giác MOA nên MA² = MH·MO' }));

  /* 7b – ba đường cao AF, BD, CE đồng quy tại trực tâm H. A(1; 4), B(0; 0), C(5; 0): F(1; 0), D(2,5; 2,5), E(0,294; 1,176), H(1; 1) */
  gan('hinh-7b', 'Chứng minh ba đường đồng quy',
    Fig.geo({ pts: { A: [1, 4], B: [0, 0], C: [5, 0], F: [1, 0], D: [2.5, 2.5], E: [0.294, 1.176], H: [1, 1] }, segs: 'A-B B-C C-A A-F B-D C-E',
      rights: [['A', 'F', 'C'], ['B', 'D', 'C'], ['C', 'E', 'A']], rs: 0.3, dots: 'H', lab: { H: [12, 2], F: [0, 16], E: [-12, 0], D: [12, -2] }, w: 220,
      label: 'Ba đường cao AF, BD, CE cùng đi qua trực tâm H' }));

  /* 7c – tam giác ABC vuông tại A, đường cao AH: AB = 4, AC = 3, BC = 5, H(1,44; 1,92) */
  gan('hinh-7c', 'Tính độ dài: Pythagore + đồng dạng',
    Fig.geo({ pts: { A: [0, 0], B: [4, 0], C: [0, 3], H: [1.44, 1.92] }, segs: 'A-B A-C B-C', acc: 'A-H', rights: [['B', 'A', 'C'], ['A', 'H', 'B']], rs: 0.3,
      texts: [[2, -0.45, '4'], [-0.35, 1.5, '3'], [2.35, 1.7, '5']], w: 200, label: 'Tam giác vuông ABC, đường cao AH: tam giác HBA đồng dạng tam giác ABC' }));
  /* 7c – góc nội tiếp ACB bằng nửa góc ở tâm AOB cùng chắn cung AB (A ở −30°, B ở 210°, C ở 90°) */
  gan('hinh-7c', 'Số đo góc',
    Fig.geo({ pts: { O: [0, 0], A: tren(3, -30), B: tren(3, 210), C: tren(3, 90) }, circles: [{ c: 'O', r: 3 }], segs: 'C-A C-B', acc: 'O-A O-B', dots: 'O',
      lab: { O: [0, -10] }, w: 200, label: 'Góc nội tiếp ACB bằng nửa góc ở tâm AOB cùng chắn cung AB' }));

  /* Luật chơi – tam giác có trung tuyến AM bằng nửa cạnh BC thì vuông tại A: A(1,8; 2,4) trên đường tròn tâm M bán kính 3 */
  gan('kien-thuc-thong-nhat', 'Được dùng trực tiếp (không cần chứng minh)',
    Fig.geo({ pts: { B: [-3, 0], C: [3, 0], M: [0, 0], A: [1.8, 2.4] }, circles: [{ c: 'M', r: 3, dash: true }], segs: 'A-B A-C B-C', acc: 'A-M', rights: [['B', 'A', 'C']], rs: 0.38,
      dots: 'M', lab: { M: [0, 16] }, w: 210, label: 'Trung tuyến AM bằng nửa cạnh BC thì tam giác ABC vuông tại A' }));

  Topics.hinhThieu = thieu;   // kiem-tra.js: phải rỗng
})();
