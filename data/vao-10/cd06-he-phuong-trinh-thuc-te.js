/* Chủ đề 6 – Bài 6 (1 điểm, vận dụng cao): Toán thực tế – phương trình, hệ phương trình bậc nhất hai ẩn. */
Topics.add({
  id: 'he-phuong-trinh-thuc-te', no: 6, bai: 'Bài 6 · 1 điểm · Vận dụng cao',
  title: 'Toán thực tế: giải bài toán bằng cách lập hệ phương trình',
  desc: 'Mua bán – khuyến mãi phần trăm, chuyển động xuôi – ngược dòng, công việc – năng suất, số học. Gọi ẩn, lập hệ, giải, đối chiếu.',
  remind: [
    'Gọi ẩn: ghi rõ đại lượng, đơn vị, điều kiện.',
    S`Giảm \(a\%\): giá mới \(= \text{giá} \cdot (1 - a\%)\); tăng \(a\%\): nhân \((1 + a\%)\).`,
    S`Xuôi dòng: \(v + v_n\); ngược dòng: \(v - v_n\); quãng đường \(s = v \cdot t\).`,
    S`Làm riêng xong trong \(x\) ngày thì 1 ngày làm được \(\dfrac1x\) công việc.`,
  ],
  theory: [
    { t: 'Bốn bước giải bài toán bằng cách lập hệ',
      b: S`<ol><li><b>Gọi ẩn</b> \(x, y\): ghi đại lượng, đơn vị, điều kiện (nguyên dương, lớn hơn số nào…).</li>
        <li><b>Biểu diễn</b> các đại lượng chưa biết theo \(x, y\) – nên kẻ bảng.</li>
        <li><b>Lập hệ</b> hai phương trình từ hai dữ kiện; giải bằng cộng đại số hoặc thế.</li>
        <li><b>Đối chiếu</b> điều kiện rồi <b>trả lời</b> đúng câu hỏi, có đơn vị.</li></ol>` },
    { t: 'Kẻ bảng để không lẫn dữ kiện',
      b: S`<p>Ví dụ chuyển động: hàng là đối tượng, cột là đại lượng.</p>
        <table><tr><th></th><th>Vận tốc (km/h)</th><th>Thời gian (h)</th><th>Quãng đường (km)</th></tr>
        <tr><td>Xuôi dòng</td><td>\(x + y\)</td><td>\(2\)</td><td>\(2(x + y)\)</td></tr>
        <tr><td>Ngược dòng</td><td>\(x - y\)</td><td>\(3\)</td><td>\(3(x - y)\)</td></tr></table>
        <p>Công việc: hai đội cùng làm xong trong 12 ngày thì \(\dfrac1x + \dfrac1y = \dfrac{1}{12}\) (đặt \(a = \dfrac1x,\ b = \dfrac1y\) để giải cho gọn).</p>` },
    { t: 'Phần trăm – chỗ hay sai nhất',
      b: S`<ul><li>Giá \(x\) giảm 10%: \(0{,}9x\). Giảm 20% rồi giảm tiếp 10%: \(0{,}8 \cdot 0{,}9 x = 0{,}72x\) (giảm 28%, <b>không</b> phải 30%).</li>
        <li>Năm nay tăng 15% so với năm ngoái \(x\): \(1{,}15x\).</li>
        <li>Vượt mức 20% kế hoạch \(x\): thực tế \(1{,}2x\).</li></ul>`,
      warn: 'Phần trăm luôn tính trên giá trị ban đầu của lần thay đổi đó. Hai lần giảm không được cộng phần trăm.' },
    { t: 'Giải hệ nhanh bằng cộng đại số',
      b: S`<p>Nhân hai vế cho hệ số của một ẩn bằng nhau (hoặc đối nhau) rồi trừ (cộng) vế với vế. Hệ có số thập phân: nhân lên để hết số thập phân hoặc nhân phương trình kia cho khéo.</p>
        <p>Kiểm tra nhanh bằng máy tính cầm tay, nhưng bài làm vẫn phải trình bày các bước biến đổi.</p>` },
  ],
  tips: [
    { t: 'Đề hỏi gì – gọi ẩn cái đó', b: 'Ẩn càng gần câu hỏi càng ít bước. Hỏi giá mỗi loại thì gọi giá mỗi loại.' },
    { t: 'Hàng là đối tượng, cột là đại lượng', b: 'Kẻ bảng trước khi lập hệ: mỗi ô là một biểu thức theo x, y. Hệ sẽ hiện ra từ hai cột.' },
    { t: 'Giảm hai lần thì nhân hai lần', b: S`Giảm 20% rồi 10%: \(\times 0{,}8 \times 0{,}9\). Không cộng 20% + 10%.` },
    { t: 'Xuôi cộng, ngược trừ', b: S`Ca nô xuôi dòng \(v + v_n\), ngược dòng \(v - v_n\). Điều kiện \(v \gt v_n\).` },
    { t: 'Thử lại trước khi kết luận', b: 'Thay nghiệm vào đề (không phải vào hệ) xem có khớp mọi dữ kiện không.' },
  ],
  quiz: [
    { q: 'Một món hàng giá 200 000 đồng được giảm 10%. Giá sau khi giảm là', a: ['180 000 đồng', '190 000 đồng', '20 000 đồng', '220 000 đồng'], why: S`\(200\,000 \cdot 0{,}9 = 180\,000\).` },
    { q: S`Giá \(x\) giảm 20% rồi giảm tiếp 10%. Giá cuối cùng là`, a: [S`\(0{,}72x\)`, S`\(0{,}7x\)`, S`\(0{,}3x\)`, S`\(0{,}9x\)`], why: S`\(x \cdot 0{,}8 \cdot 0{,}9 = 0{,}72x\).` },
    { q: S`Ca nô có vận tốc riêng \(x\) km/h, vận tốc dòng nước \(y\) km/h. Vận tốc xuôi dòng là`, a: [S`\(x + y\)`, S`\(x - y\)`, S`\(y - x\)`, S`\(xy\)`], why: 'Xuôi dòng được nước đẩy thêm nên cộng.' },
    { q: S`Vòi I chảy riêng đầy bể trong \(x\) giờ. Trong 1 giờ, vòi I chảy được`, a: [S`\(\dfrac1x\) bể`, S`\(x\) bể`, S`\(\dfrac{x}{60}\) bể`, S`\(1 - x\) bể`], why: S`Cả bể là 1 đơn vị công việc; chia đều cho \(x\) giờ.` },
    { q: 'Mua 2 cây bút và 3 quyển vở hết 54 000 đồng. Gọi giá bút là x, giá vở là y (đồng). Phương trình là', a: [S`\(2x + 3y = 54\,000\)`, S`\(3x + 2y = 54\,000\)`, S`\(x + y = 54\,000\)`, S`\(5(x + y) = 54\,000\)`], why: '2 bút 2x, 3 vở 3y.' },
    { q: 'Điều kiện của ẩn "số học sinh của lớp" là', a: ['Số nguyên dương', 'Số thực dương', 'Số nguyên', 'Số hữu tỉ'], why: 'Số người phải là số tự nhiên khác 0.' },
    { q: 'Hai số có tổng 50, số thứ nhất gấp 4 lần số thứ hai. Hệ phương trình là', a: [S`\(x + y = 50,\ x = 4y\)`, S`\(x + y = 50,\ y = 4x\)`, S`\(x - y = 50,\ x = 4y\)`, S`\(x + y = 50,\ x + 4 = y\)`], why: S`"x gấp 4 lần y" viết là \(x = 4y\).` },
    { q: S`Năm ngoái sản lượng là \(x\) tấn, năm nay tăng 15%. Sản lượng năm nay là`, a: [S`\(1{,}15x\)`, S`\(0{,}15x\)`, S`\(x + 15\)`, S`\(0{,}85x\)`], why: S`\(x + 15\%x = 1{,}15x\).` },
  ],
  models: [
    { title: 'Mua áo trong đợt khuyến mãi', pts: 1,
      de: S`Trong đợt khuyến mãi, một cửa hàng giảm 10% giá niêm yết mỗi chiếc áo loại I và giảm 20% giá niêm yết mỗi chiếc áo loại II. Bạn An mua 2 áo loại I và 3 áo loại II nên chỉ phải trả 930 000 đồng; nếu không có khuyến mãi thì An phải trả 1 100 000 đồng. Tính giá niêm yết của mỗi loại áo.`,
      steps: [
        { s: S`Gọi giá niêm yết một áo loại I là \(x\) (đồng), một áo loại II là \(y\) (đồng); điều kiện \(x, y \gt 0\).`, p: 0.25 },
        { s: S`Không khuyến mãi: \(2x + 3y = 1\,100\,000\) (1).<br>Có khuyến mãi: \(2 \cdot 0{,}9x + 3 \cdot 0{,}8y = 930\,000 \iff 1{,}8x + 2{,}4y = 930\,000\) (2).`, p: 0.25, warn: 'Viết 2·0,1x (lấy phần được giảm) thay vì 2·0,9x là lỗi hay gặp.' },
        { s: S`Nhân (1) với 0,9: \(1{,}8x + 2{,}7y = 990\,000\). Trừ vế với vế cho (2): \(0{,}3y = 60\,000 \Rightarrow y = 200\,000\). Thay vào (1): \(2x = 1\,100\,000 - 600\,000 \Rightarrow x = 250\,000\).`, p: 0.25 },
        { s: 'Hai giá trị thỏa điều kiện. Vậy giá niêm yết áo loại I là 250 000 đồng, áo loại II là 200 000 đồng.', p: 0.25 },
      ],
      loi: ['Không ghi đơn vị và điều kiện của ẩn.', 'Cộng phần trăm giảm hoặc nhân nhầm với phần được giảm.', 'Chỉ ghi kết quả bấm máy, không trình bày cách giải hệ.', 'Thiếu câu kết luận trả lời đề.'] },
  ],
  present: [
    'Câu "Gọi …" có đủ đại lượng, đơn vị, điều kiện của từng ẩn.',
    'Mỗi phương trình kèm một câu giải thích nó đến từ dữ kiện nào.',
    'Trình bày các bước giải hệ (không chỉ ghi kết quả máy tính).',
    'Đối chiếu điều kiện rồi mới kết luận.',
    'Câu trả lời cuối đúng câu hỏi, có đơn vị.',
  ],
  practice: [
    { lv: 'Cơ bản', pts: 1, h: 56,
      de: 'Hai lớp 9A và 9B có tổng cộng 82 học sinh. Trong đợt quyên góp ủng hộ học sinh vùng lũ, mỗi bạn lớp 9A góp 3 quyển vở, mỗi bạn lớp 9B góp 2 quyển vở; cả hai lớp góp được 207 quyển. Tính số học sinh của mỗi lớp.',
      ans: 'Lớp 9A có 43 học sinh, lớp 9B có 39 học sinh.',
      barem: [[S`Gọi \(x, y\) là số học sinh lớp 9A, 9B (\(x, y\) nguyên dương)`, 0.25], [S`Lập hệ \(x + y = 82,\ 3x + 2y = 207\)`, 0.25], [S`Giải được \(x = 43,\ y = 39\)`, 0.25], [S`Đối chiếu, kết luận`, 0.25]] },
    { lv: 'Khá', pts: 1, h: 62,
      de: 'Một ca nô đi xuôi dòng trong 2 giờ và ngược dòng trong 3 giờ thì được tất cả 97 km. Nếu ca nô đi xuôi dòng trong 3 giờ và ngược dòng trong 2 giờ thì được 103 km. Tính vận tốc riêng của ca nô và vận tốc dòng nước (vận tốc riêng và vận tốc dòng nước không đổi).',
      ans: 'Vận tốc riêng 20 km/h, vận tốc dòng nước 3 km/h.',
      barem: [[S`Gọi \(x\), \(y\) (km/h) là vận tốc riêng và vận tốc dòng nước, \(x \gt y \gt 0\); xuôi \(x + y\), ngược \(x - y\)`, 0.25], [S`\(2(x + y) + 3(x - y) = 97 \iff 5x - y = 97\); \(3(x + y) + 2(x - y) = 103 \iff 5x + y = 103\)`, 0.25], [S`Cộng vế: \(10x = 200 \Rightarrow x = 20\); \(y = 3\)`, 0.25], [S`Đối chiếu, kết luận`, 0.25]] },
    { lv: 'Nâng cao', pts: 1, h: 70,
      de: 'Hai đội công nhân cùng làm một đoạn đường thì 12 ngày xong. Nếu đội I làm một mình trong 6 ngày, sau đó đội II làm tiếp một mình trong 15 ngày thì xong đoạn đường đó. Hỏi nếu làm riêng thì mỗi đội làm xong đoạn đường trong bao nhiêu ngày?',
      ans: 'Đội I: 36 ngày; đội II: 18 ngày.',
      barem: [[S`Gọi \(x, y\) (ngày) là thời gian đội I, II làm riêng xong, \(x, y \gt 12\); một ngày làm được \(\frac1x, \frac1y\) công việc`, 0.25], [S`Lập hệ \(\frac1x + \frac1y = \frac{1}{12}\); \(\frac6x + \frac{15}{y} = 1\)`, 0.25], [S`Đặt \(a = \frac1x,\ b = \frac1y\): giải được \(b = \frac{1}{18},\ a = \frac{1}{36}\)`, 0.25], [S`\(x = 36,\ y = 18\); đối chiếu, kết luận`, 0.25]] },
  ],
});
