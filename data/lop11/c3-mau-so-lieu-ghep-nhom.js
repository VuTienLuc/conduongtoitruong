/* Toán 11 – Chương III. Vận dụng, vận dụng cao: số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm.
   Ma trận giữa kì I (MA_TR_N_GKI.docx): Đúng–Sai ĐS-3 – mẫu số liệu ghép nhóm, mức Vận dụng.
   Dạng bài lấy theo các đề trong tai-lieu/lop11/ (số liệu đã đổi, đáp số kiểm lại bằng tools/kiem-dap-so.py):
   - Đề cương/Đề cương giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT Quế Sơn – Đà Nẵng.pdf (tuổi thọ muỗi)
   - Đề giữa HK1/Đề giữa học kì 1 Toán 11 năm 2025 – 2026 trường THPT Lê Chân – Hải Phòng.pdf (thời gian, trung vị)
   - Đề cương/Đề cương ôn tập HK1 Toán 11 năm 2025 – 2026 trường THPT Linh Trung – TP HCM.pdf (doanh số, khen thưởng 25%)
   - Đề giữa HK1/Đề giữa học kì 1 Toán 11 năm 2025 – 2026 trường THPT Pleiku – Gia Lai.pdf (chọn 25% chạy nhanh nhất)
   - Đề cương/Đề cương học kì 1 Toán 11 năm 2025 – 2026 trường THPT Phan Đình Phùng – Hà Nội.pdf (cholesterol, mốc 50%)
   - Đề giữa HK1/Đề giữa kì 1 Toán 11 năm 2025 – 2026 trường THPT Duy Tân – Quảng Ngãi.pdf (tiền nước, tứ phân vị thứ ba)
   - Đề cương/Đề cương học kì 1 Toán 11 năm 2025 – 2026 trường THPT Xuân Phương – Hà Nội.pdf (cân nặng cam hai lô) */
(() => {
  const tb = (head, rows) => `<table class="tbl"><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
  Vdc.add({
    grade: 'lop11', id: 'c3-mau-so-lieu-ghep-nhom', ky: ['Giữa kì I'],
    nguon: 'Đề giữa HK1: THPT Lê Chân – Hải Phòng; THPT Pleiku – Gia Lai; THPT Duy Tân – Quảng Ngãi. Đề cương: THPT Quế Sơn – Đà Nẵng; THPT Linh Trung – TP HCM; THPT Phan Đình Phùng, Xuân Phương – Hà Nội',
    chuong: 'Chương III. Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm',
    bai: 'Bài 8. Mẫu số liệu ghép nhóm · Bài 9. Các số đặc trưng đo xu thế trung tâm',
    title: 'Số trung bình, trung vị, tứ phân vị, mốt của mẫu số liệu ghép nhóm',
    desc: 'Tính các số đặc trưng; tìm tần số chưa biết; dùng tứ phân vị, trung vị để chọn ngưỡng (25%, 50% cao nhất / thấp nhất).',
    kt: [
      { t: 'Số trung bình',
        b: S`Giá trị đại diện của nhóm \([a_i;\, a_{i+1})\) là \(c_i = \dfrac{a_i + a_{i+1}}{2}\). \[\bar x = \frac{m_1c_1 + m_2c_2 + \ldots + m_kc_k}{n}.\]` },
      { t: 'Trung vị và tứ phân vị',
        b: S`Trung vị: tìm nhóm \([u_m;\, u_{m+1})\) chứa đại lượng thứ \(\tfrac n2\) (dùng tần số tích lũy); với \(C\) là tổng tần số các nhóm đứng trước, \(m_m\) là tần số nhóm đó, \(h\) là độ dài nhóm: \[M_e = u_m + \frac{\tfrac n2 - C}{m_m}\cdot h.\] Tứ phân vị \(Q_1\), \(Q_3\): làm tương tự với \(\tfrac n4\) và \(\tfrac{3n}{4}\); \(Q_2 = M_e\).` },
      { t: 'Mốt',
        b: S`Nhóm chứa mốt là nhóm có tần số lớn nhất \([u_m;\, u_{m+1})\); với \(m_{m-1}\), \(m_{m+1}\) là tần số hai nhóm kề (không có thì lấy 0): \[M_0 = u_m + \frac{m_m - m_{m-1}}{(m_m - m_{m-1}) + (m_m - m_{m+1})}\cdot h.\]` },
      { t: 'Chọn ngưỡng',
        b: S`"25% có giá trị <b>thấp nhất</b>" ↔ dưới \(Q_1\); "25% <b>cao nhất</b>" ↔ từ \(Q_3\) trở lên; "50%" ↔ trung vị. Kết quả là giá trị ước lượng, làm tròn theo yêu cầu và trả lời bằng lời trong ngữ cảnh.` },
    ],
    dang: [
      { ten: 'Tính các số đặc trưng; tìm tần số chưa biết', muc: 'VD – VDC',
        pp: ['Lập bảng: giá trị đại diện c_i và tần số tích lũy.', 'Tính số trung bình bằng tổng m_i·c_i chia cho n.', 'Xác định nhóm chứa trung vị (tứ phân vị) nhờ tần số tích lũy, rồi thay vào công thức.', 'Mốt: chọn nhóm tần số lớn nhất, lấy đúng tần số hai nhóm kề.', 'Có tần số chưa biết: lập phương trình từ điều kiện đề (cỡ mẫu, số trung bình hoặc trung vị), giải rồi kiểm tra nhóm chứa trung vị đúng như đã giả sử.'],
        vd: [{
          de: S`Thời gian (phút) đi từ nhà đến trường của 40 học sinh: ${tb(['Thời gian', '[0; 10)', '[10; 20)', '[20; 30)', '[30; 40)', '[40; 50)'], [['Số học sinh', 5, 12, 14, 6, 3]])} Tính số trung bình, trung vị, mốt, \(Q_1\), \(Q_3\) (làm tròn đến hàng phần trăm).`,
          lg: [S`Giá trị đại diện: 5; 15; 25; 35; 45. \(\bar x = \dfrac{5 \cdot 5 + 15 \cdot 12 + 25 \cdot 14 + 35 \cdot 6 + 45 \cdot 3}{40} = \dfrac{900}{40} = 22{,}5\) phút.`,
            S`Tần số tích lũy: 5; 17; 31; 37; 40. \(\tfrac n2 = 20\) thuộc nhóm \([20;\, 30)\): \(M_e = 20 + \dfrac{20 - 17}{14}\cdot 10 \approx 22{,}14\).`,
            S`Mốt: nhóm \([20;\, 30)\) có tần số lớn nhất 14: \(M_0 = 20 + \dfrac{14 - 12}{(14 - 12) + (14 - 6)}\cdot 10 = 22\).`,
            S`\(\tfrac n4 = 10\) thuộc nhóm \([10;\, 20)\): \(Q_1 = 10 + \dfrac{10 - 5}{12}\cdot 10 \approx 14{,}17\). \(\tfrac{3n}{4} = 30\) thuộc nhóm \([20;\, 30)\): \(Q_3 = 20 + \dfrac{30 - 17}{14}\cdot 10 \approx 29{,}29\).`],
          ds: S`\(\bar x = 22{,}5\); \(M_e \approx 22{,}14\); \(M_0 = 22\); \(Q_1 \approx 14{,}17\); \(Q_3 \approx 29{,}29\).` }],
        bt: [
          { muc: 'VD', dong: 9,
            de: S`Tuổi thọ (ngày) của 100 con muỗi trong một phòng thí nghiệm: ${tb(['Tuổi thọ', '[0; 20)', '[20; 40)', '[40; 60)', '[60; 80)', '[80; 100)'], [['Số con', 6, 14, 25, 30, 25]])} Tính số trung bình, trung vị (làm tròn đến hàng phần trăm) và mốt.`,
            goiY: 'Tần số tích lũy: 6; 20; 45; 75; 100. Nhóm chứa trung vị và nhóm chứa mốt đều là [60; 80).',
            lg: [S`\(\bar x = \dfrac{10 \cdot 6 + 30 \cdot 14 + 50 \cdot 25 + 70 \cdot 30 + 90 \cdot 25}{100} = \dfrac{6080}{100} = 60{,}8\) ngày.`,
              S`\(\tfrac n2 = 50\) thuộc \([60;\, 80)\): \(M_e = 60 + \dfrac{50 - 45}{30}\cdot 20 \approx 63{,}33\) ngày.`,
              S`Mốt: \(M_0 = 60 + \dfrac{30 - 25}{(30 - 25) + (30 - 25)}\cdot 20 = 70\) ngày.`],
            ds: S`\(\bar x = 60{,}8\); \(M_e \approx 63{,}33\); \(M_0 = 70\).` },
          { muc: 'VD', dong: 9,
            de: S`Thời gian tự học (giờ/tuần) của một nhóm học sinh: ${tb(['Thời gian', '[0; 2)', '[2; 4)', '[4; 6)', '[6; 8)', '[8; 10)'], [['Số học sinh', 3, 8, S`\(x\)`, 12, 4]])} Biết số trung bình là 5,2 giờ. Tìm \(x\) và trung vị của mẫu số liệu (làm tròn đến hàng phần trăm).`,
            goiY: S`\(\bar x = \dfrac{1 \cdot 3 + 3 \cdot 8 + 5x + 7 \cdot 12 + 9 \cdot 4}{27 + x} = 5{,}2\).`,
            lg: [S`\(\dfrac{147 + 5x}{27 + x} = 5{,}2 \iff 147 + 5x = 140{,}4 + 5{,}2x \iff 0{,}2x = 6{,}6 \iff x = 33\).`,
              S`Cỡ mẫu \(n = 60\); tần số tích lũy: 3; 11; 44; 56; 60. \(\tfrac n2 = 30\) thuộc nhóm \([4;\, 6)\).`,
              S`\(M_e = 4 + \dfrac{30 - 11}{33}\cdot 2 \approx 5{,}15\) giờ.`],
            ds: S`\(x = 33\); \(M_e \approx 5{,}15\) giờ.` },
          { muc: 'VDC', dong: 11,
            de: S`Một mẫu số liệu ghép nhóm có cỡ mẫu \(n = 50\): ${tb(['Nhóm', '[0; 5)', '[5; 10)', '[10; 15)', '[15; 20)', '[20; 25)'], [['Tần số', 4, S`\(a\)`, 15, S`\(b\)`, 5]])} Biết trung vị bằng 14. Tìm \(a\), \(b\) và số trung bình.`,
            goiY: S`\(a + b = 26\). Trung vị 14 thuộc nhóm \([10;\, 15)\), nên \(M_e = 10 + \dfrac{25 - (4 + a)}{15}\cdot 5 = 14\).`,
            lg: [S`Cỡ mẫu: \(4 + a + 15 + b + 5 = 50 \Rightarrow a + b = 26\).`,
              S`Trung vị \(14 \in [10;\, 15)\), nên nhóm chứa trung vị là \([10;\, 15)\), các nhóm trước có tổng tần số \(4 + a\): \(10 + \dfrac{25 - 4 - a}{15}\cdot 5 = 14 \iff \dfrac{21 - a}{3} = 4 \iff a = 9\); suy ra \(b = 17\).`,
              S`Kiểm tra: tần số tích lũy \(4;\ 13;\ 28\) nên đại lượng thứ 25 đúng là thuộc nhóm \([10;\, 15)\).`,
              S`\(\bar x = \dfrac{2{,}5 \cdot 4 + 7{,}5 \cdot 9 + 12{,}5 \cdot 15 + 17{,}5 \cdot 17 + 22{,}5 \cdot 5}{50} = \dfrac{675}{50} = 13{,}5\).`],
            ds: S`\(a = 9\), \(b = 17\), \(\bar x = 13{,}5\).` },
        ] },
      { ten: 'Dùng trung vị, tứ phân vị, mốt để chọn ngưỡng và so sánh', muc: 'VD – VDC',
        pp: ['Đọc câu hỏi để biết cần số đặc trưng nào: 25% thấp nhất → Q1; 25% cao nhất → Q3; 50% → trung vị; giá trị "thường gặp nhất" → mốt.', 'Chú ý chiều: thời gian chạy càng nhỏ càng nhanh, nên "25% nhanh nhất" là dưới Q1.', 'Tính bằng công thức, làm tròn theo yêu cầu.', 'Kết luận bằng lời trong ngữ cảnh (ai được chọn, mức nào).'],
        vd: [{
          de: S`Doanh số bán hàng (triệu đồng) trong tháng của 60 nhân viên: ${tb(['Doanh số', '[20; 40)', '[40; 60)', '[60; 80)', '[80; 100)', '[100; 120)'], [['Số nhân viên', 6, 14, 20, 15, 5]])} Công ty thưởng cho 25% nhân viên có doanh số cao nhất. Nhân viên cần doanh số ít nhất bao nhiêu để được thưởng (làm tròn đến hàng phần mười)?`,
          lg: [S`Ngưỡng cần tìm là tứ phân vị thứ ba \(Q_3\). \(\tfrac{3n}{4} = 45\); tần số tích lũy: 6; 20; 40; 55; 60 nên \(Q_3\) thuộc nhóm \([80;\, 100)\).`,
            S`\(Q_3 = 80 + \dfrac{45 - 40}{15}\cdot 20 \approx 86{,}7\).`,
            'Nhân viên cần doanh số khoảng 86,7 triệu đồng trở lên.'],
          ds: 'Khoảng 86,7 triệu đồng.' }],
        bt: [
          { muc: 'VD', dong: 7,
            de: S`Thời gian chạy 100 m (giây) của 48 học sinh: ${tb(['Thời gian', '[12; 13)', '[13; 14)', '[14; 15)', '[15; 16)', '[16; 17)'], [['Số học sinh', 4, 10, 18, 11, 5]])} Thầy chọn 25% học sinh chạy nhanh nhất vào đội tuyển. Học sinh phải chạy trong thời gian tối đa bao nhiêu giây (làm tròn đến hàng phần mười)?`,
            goiY: S`Chạy nhanh là thời gian nhỏ: ngưỡng là \(Q_1\). \(\tfrac n4 = 12\).`,
            lg: [S`\(\tfrac n4 = 12\); tần số tích lũy 4; 14; … nên \(Q_1\) thuộc nhóm \([13;\, 14)\).`,
              S`\(Q_1 = 13 + \dfrac{12 - 4}{10}\cdot 1 = 13{,}8\) giây.`],
            ds: 'Tối đa khoảng 13,8 giây.' },
          { muc: 'VD', dong: 9,
            de: S`Nồng độ cholesterol (mg/dL) của 100 người: ${tb(['Nồng độ', '[150; 160)', '[160; 170)', '[170; 180)', '[180; 190)', '[190; 200)', '[200; 210)'], [['Số người', 8, 17, 32, 23, 12, 8]])} a) Tìm mốt và nêu ý nghĩa. b) Xác định mốc để chọn ra 50% số người có nồng độ cao nhất (làm tròn đến hàng phần trăm).`,
            goiY: 'Mốt ở nhóm [170; 180). Mốc 50% là trung vị; tần số tích lũy 8; 25; 57; …',
            lg: [S`a) \(M_0 = 170 + \dfrac{32 - 17}{(32 - 17) + (32 - 23)}\cdot 10 = 170 + \dfrac{150}{24} = 176{,}25\): nồng độ thường gặp nhất khoảng 176,25 mg/dL.`,
              S`b) \(\tfrac n2 = 50\) thuộc nhóm \([170;\, 180)\): \(M_e = 170 + \dfrac{50 - 25}{32}\cdot 10 \approx 177{,}81\). Những người có nồng độ từ khoảng 177,81 mg/dL trở lên là 50% có nồng độ cao nhất.`],
            ds: S`a) \(M_0 = 176{,}25\). b) Mốc \(\approx 177{,}81\) mg/dL.` },
          { muc: 'VDC', dong: 11,
            de: S`Lượng nước tiêu thụ (m³) trong tháng của 160 hộ gia đình: ${tb(['Lượng nước', '[3; 6)', '[6; 9)', '[9; 12)', '[12; 15)', '[15; 18)'], [['Số hộ', 20, 55, 45, 30, 10]])} a) Tính lượng nước trung bình mỗi hộ (làm tròn đến hàng phần trăm) và mốt. b) Công ty gửi thông báo nhắc tiết kiệm nước tới 25% số hộ dùng nhiều nước nhất. Hộ dùng từ bao nhiêu m³ trở lên thì nhận thông báo? c) Mốt và số trung bình, số nào lớn hơn? Giải thích ngắn gọn.`,
            goiY: S`\(\tfrac{3n}{4} = 120\) – đúng bằng tần số tích lũy hết nhóm \([9;\, 12)\). Lấy nhóm \([9;\, 12)\) để tính \(Q_3\).`,
            lg: [S`a) \(\bar x = \dfrac{4{,}5 \cdot 20 + 7{,}5 \cdot 55 + 10{,}5 \cdot 45 + 13{,}5 \cdot 30 + 16{,}5 \cdot 10}{160} = \dfrac{1545}{160} \approx 9{,}66\) m³. Mốt: nhóm \([6;\, 9)\): \(M_0 = 6 + \dfrac{55 - 20}{(55 - 20) + (55 - 45)}\cdot 3 \approx 8{,}33\) m³.`,
              S`b) Tần số tích lũy: 20; 75; 120; 150; 160. \(\tfrac{3n}{4} = 120\) thuộc nhóm \([9;\, 12)\): \(Q_3 = 9 + \dfrac{120 - 75}{45}\cdot 3 = 12\). Hộ dùng từ 12 m³ trở lên nhận thông báo.`,
              S`c) \(M_0 \approx 8{,}33 \lt \bar x \approx 9{,}66\): phần lớn hộ dùng mức vừa phải, một số hộ dùng nhiều (nhóm 12–18 m³) kéo số trung bình lên cao hơn mốt.`],
            ds: S`a) \(\bar x \approx 9{,}66\) m³, \(M_0 \approx 8{,}33\) m³. b) Từ 12 m³ trở lên. c) Số trung bình lớn hơn mốt.` },
        ] },
    ],
  });
})();
