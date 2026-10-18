/* Toán 11 – Chương I. Vận dụng, vận dụng cao: hàm số lượng giác – giá trị lớn nhất, nhỏ nhất và mô hình thực tế.
   Ma trận giữa kì I (MA_TR_N_GKI.docx): Trả lời ngắn TLN-1 (hàm số lượng giác trong thực tế), Đúng–Sai ĐS-1 – mức Vận dụng.
   Dạng bài lấy theo các đề trong tai-lieu/lop11/ (số liệu đã đổi, đáp số kiểm lại bằng tools/kiem-dap-so.py):
   - Đề giữa HK1/Đề giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT Tử Đà – Phú Thọ.pdf (mực nước kênh)
   - Đề giữa HK1/Đề giữa học kì 1 Toán 11 năm 2025 – 2026 trường THPT Nhữ Văn Lan – Hải Phòng.pdf (vòng quay)
   - Đề giữa HK1/Đề giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT Lê Hồng Phong 1 – Đắk Lắk.pdf (số giờ có ánh sáng)
   - Đề giữa HK1/Đề giữa học kỳ 1 Toán 11 năm 2025 – 2026 trường THPT Nguyễn Công Trứ – Đắk Lắk.pdf (huyết áp)
   - Đề cương/Đề cương giữa kỳ 1 Toán 11 năm 2026 – 2027 trường THPT Hoàng Văn Thụ – Hà Nội.pdf (GTLN, GTNN)
   - Đề cương/Ôn tập giữa học kì 1 Toán 11 năm 2025 – 2026 trường THPT Trần Phú – Hà Nội.pdf (GTLN trên đoạn bằng cách đặt ẩn phụ) */
(() => {
  const FN = Fig.func, PI = Math.PI;
  Vdc.add({
    grade: 'lop11', id: 'c1-ham-so-luong-giac-thuc-te', ky: ['Giữa kì I'],
    nguon: 'Đề giữa HK1: THPT Tử Đà – Phú Thọ; THPT Nhữ Văn Lan – Hải Phòng; THPT Lê Hồng Phong 1, Nguyễn Công Trứ – Đắk Lắk. Đề cương: THPT Hoàng Văn Thụ, Trần Phú – Hà Nội',
    chuong: 'Chương I. Hàm số lượng giác và phương trình lượng giác',
    bai: 'Bài 3. Hàm số lượng giác',
    title: 'Hàm số lượng giác: giá trị lớn nhất, nhỏ nhất và mô hình thực tế',
    desc: 'GTLN, GTNN (đưa về một hàm, đặt ẩn phụ trên đoạn); thủy triều, vòng quay, số giờ có ánh sáng, huyết áp.',
    kt: [
      { t: 'Tập giá trị',
        b: S`\(-1 \le \sin u \le 1\), \(-1 \le \cos u \le 1\) với mọi \(u\). Hàm \(y = a\sin(\omega x + \varphi) + d\) (hoặc \(\cos\)) có <b>GTLN</b> \(d + |a|\), <b>GTNN</b> \(d - |a|\) và chu kì \(T = \dfrac{2\pi}{|\omega|}\).` },
      { t: 'Đưa về một hàm lượng giác',
        b: S`\(\sin x\cos x = \tfrac12\sin 2x\); \(\cos^2 x = \tfrac{1 + \cos 2x}{2}\); \(a\sin u + b\cos u = \sqrt{a^2 + b^2}\sin(u + \varphi)\) nên \(-\sqrt{a^2 + b^2} \le a\sin u + b\cos u \le \sqrt{a^2 + b^2}\).` },
      { t: 'Đặt ẩn phụ',
        b: S`Hàm chứa \(\cos 2x\) và \(\sin x\): thay \(\cos 2x = 1 - 2\sin^2 x\), đặt \(s = \sin x\) được hàm bậc hai theo \(s\). <b>Tìm đúng tập giá trị của \(s\)</b> (với \(x\) trong đoạn đề cho) rồi so sánh giá trị tại đỉnh parabol (nếu thuộc) và hai đầu mút.` },
      { t: 'Mô hình thực tế',
        b: S`\(h(t) = a\cos(bt + c) + d\): giá trị lớn nhất \(d + |a|\) đạt khi \(\cos(bt + c) = 1\) (nếu \(a \gt 0\)); muốn tìm thời điểm thì giải phương trình lượng giác cơ bản rồi chọn \(t\) trong khoảng đề cho.`,
        fig: FN({ f: t => 2.5 * Math.cos(PI * t / 6 + PI / 3) + 10, xr: [0, 24], yr: [0, 13.5], w: 300, h: 150, xt: [[4, '4'], [10, '10'], [16, '16'], [22, '22']], yt: [[7.5, '7,5'], [12.5, '12,5']], hl: [12.5, 7.5], xl: 't', yl: 'h' }) },
    ],
    dang: [
      { ten: 'Giá trị lớn nhất, nhỏ nhất của hàm số lượng giác', muc: 'VD – VDC',
        pp: ['Biến đổi về một hàm lượng giác (hạ bậc, nhân đôi, a sin + b cos) hoặc về hàm bậc hai của s = sin x (s = cos x).', 'Dùng −1 ≤ sin, cos ≤ 1 (hoặc tập giá trị đúng của s trên đoạn đề cho).', 'Hàm bậc hai theo s trên đoạn: so sánh giá trị tại đỉnh (nếu đỉnh thuộc đoạn) và tại hai đầu mút.', 'Chỉ ra giá trị x để dấu bằng xảy ra.'],
        vd: [{
          de: S`Tìm giá trị lớn nhất và nhỏ nhất của \(y = \cos 2x - 2\sin x + 3\).`,
          lg: [S`\(\cos 2x = 1 - 2\sin^2 x\) nên \(y = -2\sin^2 x - 2\sin x + 4\). Đặt \(s = \sin x\), \(s \in [-1;\, 1]\): \(y = g(s) = -2s^2 - 2s + 4\).`,
            S`Parabol \(g\) có hệ số \(a = -2 \lt 0\), đỉnh tại \(s = -\tfrac12 \in [-1;\, 1]\): \(g\left(-\tfrac12\right) = -\tfrac12 + 1 + 4 = \tfrac92\).`,
            S`\(g(-1) = -2 + 2 + 4 = 4\); \(g(1) = -2 - 2 + 4 = 0\).`,
            S`GTLN \(\tfrac92\) khi \(\sin x = -\tfrac12\); GTNN \(0\) khi \(\sin x = 1\).`],
          ds: S`\(\max y = \tfrac92\) (khi \(\sin x = -\tfrac12\)); \(\min y = 0\) (khi \(\sin x = 1\)).` }],
        bt: [
          { muc: 'VD', dong: 6,
            de: S`Tìm giá trị lớn nhất và nhỏ nhất của \(y = 7 - 6\sin x\cos x\).`,
            goiY: S`\(6\sin x\cos x = 3\sin 2x\).`,
            lg: [S`\(y = 7 - 3\sin 2x\). Vì \(-1 \le \sin 2x \le 1\) nên \(4 \le y \le 10\).`,
              S`\(y = 10\) khi \(\sin 2x = -1\) (ví dụ \(x = -\tfrac\pi4\)); \(y = 4\) khi \(\sin 2x = 1\) (ví dụ \(x = \tfrac\pi4\)).`],
            ds: S`\(\max y = 10\), \(\min y = 4\).` },
          { muc: 'VD', dong: 7,
            de: S`Tìm giá trị lớn nhất và nhỏ nhất của \(y = 2\cos^2 x + \sqrt3\sin 2x\).`,
            goiY: S`Hạ bậc \(2\cos^2 x = 1 + \cos 2x\), rồi đưa \(\sqrt3\sin 2x + \cos 2x\) về dạng \(2\sin(2x + \varphi)\).`,
            lg: [S`\(y = 1 + \cos 2x + \sqrt3\sin 2x = 1 + 2\left(\tfrac{\sqrt3}{2}\sin 2x + \tfrac12\cos 2x\right) = 1 + 2\sin\left(2x + \tfrac\pi6\right)\).`,
              S`Do \(-1 \le \sin\left(2x + \tfrac\pi6\right) \le 1\) nên \(-1 \le y \le 3\).`,
              S`\(y = 3\) khi \(x = \tfrac\pi6 + k\pi\); \(y = -1\) khi \(x = -\tfrac\pi3 + k\pi\).`],
            ds: S`\(\max y = 3\), \(\min y = -1\).` },
          { muc: 'VDC', dong: 10,
            de: S`Tìm giá trị lớn nhất và nhỏ nhất của \(y = \cos 2x + 2\sin x\) trên đoạn \(\left[-\tfrac\pi6;\, \tfrac{5\pi}{6}\right]\).`,
            goiY: S`Đặt \(s = \sin x\). Khi \(x\) chạy trên \(\left[-\tfrac\pi6;\, \tfrac{5\pi}{6}\right]\) thì \(s\) chạy trên \(\left[-\tfrac12;\, 1\right]\) (xem đường tròn lượng giác).`,
            lg: [S`\(y = 1 - 2\sin^2 x + 2\sin x\). Đặt \(s = \sin x\). Với \(x \in \left[-\tfrac\pi6;\, \tfrac{5\pi}{6}\right]\), \(\sin x\) nhỏ nhất bằng \(-\tfrac12\) (tại \(x = -\tfrac\pi6\)) và lớn nhất bằng 1 (tại \(x = \tfrac\pi2\)), nên \(s \in \left[-\tfrac12;\, 1\right]\).`,
              S`\(g(s) = -2s^2 + 2s + 1\), đỉnh \(s = \tfrac12\) thuộc đoạn: \(g\left(\tfrac12\right) = \tfrac32\). \(g\left(-\tfrac12\right) = -\tfrac12\); \(g(1) = 1\).`,
              S`GTLN \(\tfrac32\) khi \(\sin x = \tfrac12\) (\(x = \tfrac\pi6\) hoặc \(x = \tfrac{5\pi}{6}\)); GTNN \(-\tfrac12\) khi \(x = -\tfrac\pi6\).`],
            ds: S`\(\max y = \tfrac32\); \(\min y = -\tfrac12\).` },
        ] },
      { ten: S`Mô hình thực tế \(h(t) = a\sin(bt + c) + d\)`, muc: 'VD – VDC',
        pp: ['Giá trị lớn nhất, nhỏ nhất của đại lượng: d ± |a|.', 'Thời điểm đạt giá trị lớn nhất (nhỏ nhất): giải sin(bt + c) = ±1 (hoặc cos = ±1).', 'Thời điểm đạt một giá trị cho trước: giải phương trình lượng giác cơ bản, rồi chọn các nghiệm t thuộc khoảng thời gian đề cho (lập bất phương trình theo k).', 'Chu kì T = 2π/|b| cho biết sau bao lâu hiện tượng lặp lại (ví dụ số nhịp tim, thời gian một vòng quay).'],
        vd: [{
          de: S`Độ sâu \(h\) (m) của mực nước ở một cảng tại thời điểm \(t\) (giờ) trong một ngày được cho bởi \(h(t) = 2{,}5\cos\left(\tfrac{\pi t}{6} + \tfrac\pi3\right) + 10\), \(0 \le t \le 24\). Tìm độ sâu lớn nhất, nhỏ nhất và các thời điểm mực nước sâu nhất trong ngày.`,
          fig: FN({ f: t => 2.5 * Math.cos(PI * t / 6 + PI / 3) + 10, xr: [0, 24], yr: [0, 13.5], w: 300, h: 150, xt: [[4, '4'], [10, '10'], [16, '16'], [22, '22']], yt: [[7.5, '7,5'], [12.5, '12,5']], hl: [12.5, 7.5], pts: [[10, 12.5, '', 0, 0], [22, 12.5, '', 0, 0]], xl: 't', yl: 'h' }),
          lg: [S`Vì \(-1 \le \cos\left(\tfrac{\pi t}{6} + \tfrac\pi3\right) \le 1\) nên \(7{,}5 \le h \le 12{,}5\).`,
            S`\(h = 12{,}5 \iff \cos\left(\tfrac{\pi t}{6} + \tfrac\pi3\right) = 1 \iff \tfrac{\pi t}{6} + \tfrac\pi3 = k2\pi \iff t = -2 + 12k\ (k \in \mathbb Z)\).`,
            S`\(0 \le -2 + 12k \le 24 \iff \tfrac16 \le k \le \tfrac{13}{6}\), nên \(k \in \{1;\, 2\}\): \(t = 10\) và \(t = 22\).`,
            S`(Tương tự, \(h = 7{,}5\) khi \(t = 4 + 12k\), tức lúc 4 giờ và 16 giờ.)`],
          ds: 'Sâu nhất 12,5 m lúc 10 giờ và 22 giờ; nông nhất 7,5 m (lúc 4 giờ và 16 giờ).' }],
        bt: [
          { muc: 'VD', dong: 9,
            de: S`Một vòng quay có bán kính 50 m, trục quay cách mặt đất 52 m, quay đều mỗi vòng hết 20 phút. Độ cao của một cabin so với mặt đất sau \(t\) phút là \(h(t) = 52 - 50\cos\tfrac{\pi t}{10}\) (m). a) Lúc bắt đầu cabin cao bao nhiêu? Sau bao lâu cabin lên cao nhất? b) Trong vòng quay đầu tiên, sau bao nhiêu phút cabin lần đầu đạt độ cao 77 m (làm tròn đến hàng phần trăm)?`,
            goiY: S`Cao nhất khi \(\cos\tfrac{\pi t}{10} = -1\). Độ cao 77 m: \(\cos\tfrac{\pi t}{10} = -\tfrac12\), lấy nghiệm dương nhỏ nhất.`,
            lg: [S`a) \(h(0) = 52 - 50 = 2\) m. Cao nhất \(102\) m khi \(\cos\tfrac{\pi t}{10} = -1 \iff \tfrac{\pi t}{10} = \pi\) (vòng đầu) \(\iff t = 10\) phút.`,
              S`b) \(h = 77 \iff \cos\tfrac{\pi t}{10} = -\tfrac12 \iff \tfrac{\pi t}{10} = \pm\tfrac{2\pi}{3} + k2\pi\).`,
              S`Trong vòng đầu (\(0 \le t \le 20\)): \(t = \tfrac{20}{3}\) hoặc \(t = \tfrac{40}{3}\). Lần đầu là \(t = \tfrac{20}{3} \approx 6{,}67\) phút.`],
            ds: S`a) 2 m; sau 10 phút. b) \(t = \tfrac{20}{3} \approx 6{,}67\) phút.` },
          { muc: 'VD', dong: 8,
            de: S`Số giờ có ánh sáng mặt trời của một thành phố vào ngày thứ \(t\) của năm (không nhuận) được cho bởi \(d(t) = 4\sin\left[\tfrac{\pi}{182}(t - 79)\right] + 12\), \(t \in \mathbb Z\), \(1 \le t \le 365\). Ngày nào trong năm có nhiều giờ ánh sáng nhất, ngày nào ít nhất? Tính số giờ tương ứng.`,
            goiY: S`Nhiều nhất khi \(\sin[\ldots] = 1\), ít nhất khi \(\sin[\ldots] = -1\); chọn \(k\) để \(t\) nguyên và thuộc \([1;\, 365]\).`,
            lg: [S`\(d(t) = 16 \iff \tfrac{\pi}{182}(t - 79) = \tfrac\pi2 + k2\pi \iff t = 170 + 364k\). Với \(1 \le t \le 365\): \(t = 170\).`,
              S`\(d(t) = 8 \iff \tfrac{\pi}{182}(t - 79) = -\tfrac\pi2 + k2\pi \iff t = -12 + 364k\). Với \(1 \le t \le 365\): \(t = 352\).`],
            ds: 'Ngày thứ 170 có nhiều nhất (16 giờ); ngày thứ 352 có ít nhất (8 giờ).' },
          { muc: 'VDC', dong: 12,
            de: S`Huyết áp của một người được mô hình hóa bởi \(P(t) = 115 + 25\sin\tfrac{7\pi t}{3}\) (mmHg), \(t\) tính bằng giây. a) Tìm huyết áp tâm thu (lớn nhất), tâm trương (nhỏ nhất) và số nhịp tim mỗi phút. b) Trong 2 giây đầu (\(0 \le t \le 2\)), huyết áp bằng 140 mmHg mấy lần? Bằng 127,5 mmHg mấy lần?`,
            goiY: S`Một nhịp tim là một chu kì \(T = \dfrac{2\pi}{7\pi/3}\). \(P = 127{,}5 \iff \sin\tfrac{7\pi t}{3} = \tfrac12\): có hai họ nghiệm, đếm từng họ trong \([0;\, 2]\).`,
            lg: [S`a) Tâm thu \(115 + 25 = 140\) mmHg, tâm trương \(115 - 25 = 90\) mmHg. Chu kì \(T = \tfrac67\) giây nên mỗi phút có \(60 : \tfrac67 = 70\) nhịp.`,
              S`b) \(P = 140 \iff \tfrac{7\pi t}{3} = \tfrac\pi2 + k2\pi \iff t = \tfrac{3}{14} + \tfrac{6k}{7}\). \(0 \le t \le 2 \iff k \in \{0;\, 1;\, 2\}\): 3 lần.`,
              S`\(P = 127{,}5 \iff \sin\tfrac{7\pi t}{3} = \tfrac12 \iff t = \tfrac{1}{14} + \tfrac{6k}{7}\) hoặc \(t = \tfrac{5}{14} + \tfrac{6k}{7}\).`,
              S`Họ thứ nhất trong \([0;\, 2]\): \(k = 0, 1, 2\) (3 giá trị); họ thứ hai: \(t = \tfrac5{14}, \tfrac{17}{14}, \tfrac{29}{14}\) – giá trị cuối \(\gt 2\), còn 2 giá trị. Tổng: 5 lần.`],
            ds: 'a) 140 mmHg, 90 mmHg, 70 nhịp/phút. b) 3 lần; 5 lần.' },
        ] },
    ],
  });
})();
