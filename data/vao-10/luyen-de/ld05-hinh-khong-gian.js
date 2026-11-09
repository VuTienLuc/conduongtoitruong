/* Luyện đề – Bài 5 (1,0 điểm): Hình học không gian thực tế (công thức cho sẵn).
   Nội dung lớp 9 học kì II (Chương X, KNTT: hình trụ, hình nón, hình cầu; kết hợp hình hộp, lăng trụ, chóp đều lớp 8).
   Đúng cấu trúc đề tuyển sinh TP.HCM: đề cho sẵn công thức liên quan, ý a tính diện tích/thể tích, ý b giải quyết bài toán thực tế (đổi sang lít, thời gian, chi phí, khối lượng, nước dâng, nước tràn).
   Barem bội 0,25, tổng = 1,0 điểm. Đáp số được kiểm tra độc lập bằng tools/kiem-dap-so.py. */
LuyenDe.add('hinh-khong-gian', {
  phut: 12,
  soat: [
    'Đọc kĩ đề: nếu cho đường kính phải chia đôi lấy bán kính r = d / 2',
    'Ghi đúng công thức và thay số cẩn thận, lấy đúng giá trị π đề yêu cầu',
    'Đổi đúng đơn vị (1 m³ = 1000 lít; 1 dm³ = 1 lít; 1 m² = 10 000 cm²)',
    'Làm tròn đúng quy định và trả lời đầy đủ kèm đơn vị'
  ],
  de: [
    {
      ten: 'Hình trụ – bể chứa nước và thời gian bơm đầy',
      nguon: 'Soạn theo dạng Bài 5 đề tuyển sinh lớp 10 TP HCM (bể nước hình trụ)',
      pts: 1,
      h: 120,
      de: S`Một bể chứa nước sinh hoạt hình trụ có đường kính đáy là \(2\text{ m}\) và chiều cao là \(1{,}5\text{ m}\). Cho biết công thức tính thể tích hình trụ là \(V = \pi R^2 h\) (với \(R\) là bán kính đáy, \(h\) là chiều cao).<br>a) Tính thể tích của bể chứa nước này (lấy \(\pi \approx 3{,}14\)).<br>b) Người ta cần bơm nước vào bể. Biết lúc đầu bể cạn, máy bơm mỗi phút bơm được \(50\) lít nước. Hỏi sau bao lâu thì bể đầy nước? (Biết \(1\text{ m}^3 = 1\,000\) lít).`,
      figQ: Fig.solid('tru'),
      ans: S`a) \(V = 4{,}71\text{ m}^3\). b) Sau \(94{,}2\) phút (hay 1 giờ 34 phút 12 giây).`,
      barem: [
        [S`a) Bán kính đáy bể nước: \(R = 2 : 2 = 1\text{ (m)}\)`, 0.25],
        [S`Thể tích của bể chứa nước: \(V = \pi R^2 h \approx 3{,}14 \cdot 1^2 \cdot 1{,}5 = 4{,}71\text{ (m}^3\text{)}\)`, 0.25],
        [S`b) Đổi \(4{,}71\text{ m}^3 = 4\,710\text{ dm}^3 = 4\,710\) lít`, 0.25],
        [S`Thời gian bơm đầy bể: \(4\,710 : 50 = 94{,}2\) phút (hay 1 giờ 34 phút 12 giây)`, 0.25]
      ],
      loi: [
        'Quên chia đôi đường kính (dùng R = 2 m)',
        'Đổi sai đơn vị từ m³ sang lít'
      ]
    },
    {
      ten: 'Hình nón – chiếc nón lá và số hộp sơn bảo vệ',
      nguon: 'Soạn theo dạng Bài 5 đề tuyển sinh lớp 10 TP HCM (nón lá hình nón)',
      pts: 1,
      h: 120,
      de: S`Một chiếc nón lá có dạng hình nón. Biết bán kính đường tròn đáy của chiếc nón là \(20\text{ cm}\), chiều cao của nón là \(15\text{ cm}\). Cho công thức tính diện tích xung quanh hình nón là \(S_{xq} = \pi R \ell\) (với \(R\) là bán kính đáy, \(\ell\) là độ dài đường sinh).<br>a) Tính diện tích xung quanh của chiếc nón lá đó (kết quả làm tròn đến hàng đơn vị, lấy \(\pi \approx 3{,}14\)).<br>b) Người thợ thủ công cần phủ một lớp sơn bảo vệ bề mặt ngoài của \(100\) chiếc nón lá. Nếu \(1\) hộp sơn có thể sơn được tối đa \(2\text{ m}^2\) bề mặt thì người thợ cần mua ít nhất bao nhiêu hộp sơn để sơn đủ \(100\) chiếc nón trên?`,
      figQ: Fig.solid('non'),
      ans: S`a) \(S_{xq} \approx 1\,570\text{ cm}^2\). b) Cần mua ít nhất 8 hộp sơn.`,
      barem: [
        [S`a) Độ dài đường sinh của hình nón: \(\ell = \sqrt{R^2 + h^2} = \sqrt{20^2 + 15^2} = 25\text{ (cm)}\)`, 0.25],
        [S`Diện tích xung quanh của 1 chiếc nón: \(S_{xq} = \pi R \ell \approx 3{,}14 \cdot 20 \cdot 25 = 1\,570\text{ (cm}^2\text{)}\)`, 0.25],
        [S`b) Đổi \(1\,570\text{ cm}^2 = 0{,}157\text{ m}^2\). Diện tích bề mặt ngoài của 100 chiếc nón: \(0{,}157 \cdot 100 = 15{,}7\text{ (m}^2\text{)}\)`, 0.25],
        [S`Số hộp sơn cần dùng: \(15{,}7 : 2 = 7{,}85\). Vì số hộp sơn phải là số nguyên nên cần mua ít nhất 8 hộp`, 0.25]
      ],
      loi: [
        'Thay nhầm chiều cao h = 15 cm vào vị trí đường sinh ℓ trong công thức Sxq',
        'Đổi sai đơn vị từ cm² sang m² (1 m² = 10 000 cm²)',
        'Làm tròn xuống 7 hộp khiến không đủ sơn'
      ]
    },
    {
      ten: 'Hình cầu – bồn chứa khí gas và chi phí sơn bảo vệ',
      nguon: 'Soạn theo dạng Bài 5 đề tuyển sinh lớp 10 TP HCM (bồn chứa hình cầu)',
      pts: 1,
      h: 120,
      de: S`Một bồn chứa khí gas của một nhà máy có dạng hình cầu với đường kính \(4\text{ m}\). Cho biết công thức tính thể tích hình cầu là \(V = \dfrac{4}{3}\pi R^3\) và diện tích mặt cầu là \(S = 4\pi R^2\) (với \(R\) là bán kính hình cầu).<br>a) Tính thể tích của bồn chứa khí gas này (làm tròn đến chữ số thập phân thứ hai, lấy \(\pi \approx 3{,}14\)).<br>b) Để chống gỉ sét, người ta cần sơn bảo vệ toàn bộ bề mặt ngoài của bồn chứa. Biết chi phí sơn (bao gồm cả nhân công và vật tư) cho mỗi mét vuông bề mặt là \(150\,000\) đồng. Tính tổng số tiền cần dùng để sơn bồn chứa gas đó.`,
      figQ: Fig.solid('cau'),
      ans: S`a) \(V \approx 33{,}49\text{ m}^3\). b) Chi phí sơn: \(7\,536\,000\) đồng.`,
      barem: [
        [S`a) Bán kính của bồn chứa gas: \(R = 4 : 2 = 2\text{ (m)}\)`, 0.25],
        [S`Thể tích bồn chứa: \(V = \dfrac{4}{3}\pi R^3 \approx \dfrac{4}{3} \cdot 3{,}14 \cdot 2^3 = \dfrac{100{,}48}{3} \approx 33{,}49\text{ (m}^3\text{)}\)`, 0.25],
        [S`b) Diện tích bề mặt ngoài cần sơn: \(S = 4\pi R^2 \approx 4 \cdot 3{,}14 \cdot 2^2 = 50{,}24\text{ (m}^2\text{)}\)`, 0.25],
        [S`Tổng số tiền cần dùng: \(50{,}24 \cdot 150\,000 = 7\,536\,000\) (đồng)`, 0.25]
      ],
      loi: [
        'Lấy R = 4 m (quên chia đôi đường kính)',
        'Nhầm công thức thể tích với diện tích mặt cầu ở câu b'
      ]
    },
    {
      ten: 'Khối ghép – hình trụ nối nửa hình cầu và khối lượng kim loại',
      nguon: 'Soạn theo dạng Bài 5 đề tuyển sinh lớp 10 TP HCM (khối ghép trụ – nửa cầu, khối lượng riêng)',
      pts: 1,
      h: 120,
      de: S`Một thiết bị công nghiệp làm bằng kim loại đặc nguyên khối có hình dạng gồm một khối trụ và một nửa khối cầu úp lên trên mặt đáy trên của khối trụ. Biết khối trụ có chiều cao \(1{,}2\text{ m}\) và bán kính đáy là \(0{,}5\text{ m}\). Cho biết công thức tính thể tích hình trụ \(V = \pi R^2 h\) và hình cầu \(V = \dfrac{4}{3}\pi R^3\).<br>a) Tính thể tích của thiết bị này (làm tròn đến 4 chữ số thập phân, lấy \(\pi \approx 3{,}14\)).<br>b) Biết khối lượng riêng của loại kim loại này là \(7\,850\text{ kg/m}^3\). Tính khối lượng của thiết bị trên (biết công thức tính khối lượng \(m = D \cdot V\), kết quả làm tròn đến hàng đơn vị).`,
      ans: S`a) \(V \approx 1{,}2037\text{ m}^3\). b) \(m \approx 9\,449\text{ kg}\).`,
      barem: [
        [S`a) Thể tích phần hình trụ: \(V_1 = \pi R^2 h \approx 3{,}14 \cdot 0{,}5^2 \cdot 1{,}2 = 0{,}9420\text{ (m}^3\text{)}\)`, 0.25],
        [S`Thể tích phần nửa hình cầu: \(V_2 = \dfrac{1}{2} \cdot \dfrac{4}{3}\pi R^3 = \dfrac{2}{3} \cdot 3{,}14 \cdot 0{,}5^3 \approx 0{,}2617\text{ (m}^3\text{)}\). Thể tích thiết bị: \(V = V_1 + V_2 \approx 0{,}9420 + 0{,}2617 = 1{,}2037\text{ (m}^3\text{)}\)`, 0.25],
        [S`b) Khối lượng của thiết bị: \(m = D \cdot V = 7\,850 \cdot 1{,}2037\)`, 0.25],
        [S`\(m \approx 9\,449\text{ (kg)}\)`, 0.25]
      ],
      loi: [
        'Tính cả quả cầu thay vì chỉ tính một nửa khối cầu',
        'Làm tròn quá sớm ở bước trung gian dẫn đến sai lệch kết quả khối lượng'
      ]
    },
    {
      ten: 'Thả vật thể chìm – tính độ dâng của mực nước trong bình trụ',
      nguon: 'Phóng tác theo dạng bài vật chìm làm nước dâng trong Bộ đề tham khảo tuyển sinh lớp 10 môn Toán 2025 – 2026 sở GD&ĐT TP Hồ Chí Minh',
      pts: 1,
      h: 120,
      de: S`Một bình thủy tinh hình trụ có bán kính đáy bên trong là \(10\text{ cm}\) đang chứa một lượng nước, mức nước chưa đầy bình. Cho công thức thể tích khối nón là \(V = \dfrac{1}{3}\pi R^2 h\) và thể tích khối trụ là \(V = \pi R^2 h\).<br>a) Người ta chuẩn bị thả một khối sắt hình nón đặc có bán kính đáy \(6\text{ cm}\) và chiều cao \(10\text{ cm}\) vào bình. Tính thể tích của khối sắt hình nón (lấy \(\pi \approx 3{,}14\)).<br>b) Khi thả chìm hoàn toàn khối sắt hình nón vào trong bình nước (giả sử bình đủ cao để nước không tràn ra ngoài), nước trong bình sẽ dâng lên. Hỏi mức nước trong bình dâng lên thêm bao nhiêu cm so với lúc đầu?`,
      ans: S`a) \(V_{\text{nón}} = 376{,}8\text{ cm}^3\). b) Mức nước dâng lên thêm \(1{,}2\text{ cm}\).`,
      barem: [
        [S`a) Thể tích của khối sắt hình nón: \(V_{\text{nón}} = \dfrac{1}{3}\pi r^2 h \approx \dfrac{1}{3} \cdot 3{,}14 \cdot 6^2 \cdot 10 = 376{,}8\text{ (cm}^3\text{)}\)`, 0.5],
        [S`b) Thể tích nước dâng lên bằng thể tích khối sắt bị chìm: \(V_{\text{dâng}} = 376{,}8\text{ cm}^3\). Phần nước dâng lên có dạng hình trụ đáy \(R = 10\text{ cm}\), chiều cao \(x\): \(V_{\text{dâng}} = \pi R^2 x = 3{,}14 \cdot 10^2 \cdot x = 314x\)`, 0.25],
        [S`Chiều cao cột nước dâng lên: \(x = 376{,}8 : 314 = 1{,}2\text{ (cm)}\). Vậy nước dâng thêm \(1{,}2\text{ cm}\)`, 0.25]
      ],
      loi: [
        'Nhầm bán kính đáy của hình nón (6 cm) với bán kính đáy của bình trụ (10 cm)',
        'Quên hệ số 1/3 trong công thức thể tích hình nón'
      ]
    },
    {
      ten: 'Hình trụ – lon nước ngọt và diện tích nhôm làm vỏ lon',
      nguon: 'Phóng tác từ Bộ đề tham khảo môn Toán tuyển sinh 10 năm 2024 – 2025 sở GD&ĐT TP Hồ Chí Minh (đề Phú Nhuận, lon nước ngọt)',
      pts: 1,
      h: 120,
      de: S`Một công ty nước giải khát thiết kế lon nước ngọt dạng hình trụ có đường kính đáy là \(6\text{ cm}\) và chiều cao \(12\text{ cm}\). Cho biết công thức tính diện tích toàn phần hình trụ là \(S_{tp} = 2\pi R h + 2\pi R^2\) và thể tích hình trụ là \(V = \pi R^2 h\) (với \(R\) là bán kính đáy, \(h\) là chiều cao, lấy \(\pi \approx 3{,}14\)).<br>a) Tính diện tích nhôm tối thiểu để làm vỏ một lon nước ngọt (tức là diện tích toàn phần của hình trụ, bỏ qua các mép nối).<br>b) Để tránh tình trạng lon bị nổ do áp suất khi vận chuyển, nhà sản xuất chỉ rót lượng nước ngọt chiếm \(90\%\) dung tích của lon. Tính thể tích nước ngọt thực tế có trong một lon (đơn vị ml, biết \(1\text{ cm}^3 = 1\text{ ml}\)).`,
      figQ: Fig.solid('tru'),
      ans: S`a) \(S_{tp} = 282{,}6\text{ cm}^2\). b) \(V_{\text{nước}} = 305{,}208\text{ ml}\).`,
      barem: [
        [S`a) Bán kính đáy lon nước ngọt: \(R = 6 : 2 = 3\text{ (cm)}\). Thay số: \(S_{tp} = 2 \cdot 3{,}14 \cdot 3 \cdot 12 + 2 \cdot 3{,}14 \cdot 3^2\)`, 0.25],
        [S`\(S_{tp} = 226{,}08 + 56{,}52 = 282{,}6\text{ (cm}^2\text{)}\). Vậy diện tích nhôm vỏ lon là \(282{,}6\text{ cm}^2\)`, 0.25],
        [S`b) Thể tích lon nước ngọt: \(V = \pi R^2 h \approx 3{,}14 \cdot 3^2 \cdot 12 = 339{,}12\text{ (cm}^3\text{)}\)`, 0.25],
        [S`Thể tích nước ngọt thực tế: \(V_{\text{nước}} = 339{,}12 \cdot 90\% = 305{,}208\text{ (cm}^3\text{)} = 305{,}208\text{ ml}\)`, 0.25]
      ],
      loi: [
        'Lấy R = 6 cm (quên chia đôi đường kính)',
        'Tính thiếu 2 đáy trong diện tích toàn phần'
      ]
    },
    {
      ten: 'Khối ghép – cốc kem ốc quế (hình nón úp nửa hình cầu)',
      nguon: 'Phóng tác từ Bộ đề tham khảo tuyển sinh lớp 10 môn Toán 2025 – 2026 sở GD&ĐT TP Hồ Chí Minh (đề Quận Bình Tân, que kem ốc quế)',
      pts: 1,
      h: 120,
      de: S`Một chiếc kem ốc quế gồm hai phần: phần bánh ốc quế bên dưới có dạng hình nón và phần kem úp bên trên có dạng nửa hình cầu. Biết phần bánh ốc quế hình nón có bán kính đáy là \(3\text{ cm}\), chiều cao là \(10\text{ cm}\) và phần kem nửa hình cầu có cùng bán kính với đáy nón. Cho công thức tính thể tích khối nón là \(V = \dfrac{1}{3}\pi R^2 h\) và khối cầu là \(V = \dfrac{4}{3}\pi R^3\) (lấy \(\pi \approx 3{,}14\)).<br>a) Giả sử kem được lấp đầy chặt phần bánh ốc quế bên dưới, hãy tính thể tích kem chứa trong phần hình nón.<br>b) Tính tổng dung tích kem của toàn bộ chiếc kem ốc quế đó (kể cả phần nón và phần nửa hình cầu phía trên).`,
      ans: S`a) \(V_{\text{nón}} = 94{,}2\text{ cm}^3\). b) Tổng dung tích kem: \(150{,}72\text{ cm}^3\).`,
      barem: [
        [S`a) Thể tích kem trong phần hình nón: \(V_{\text{nón}} = \dfrac{1}{3}\pi R^2 h \approx \dfrac{1}{3} \cdot 3{,}14 \cdot 3^2 \cdot 10\)`, 0.25],
        [S`\(V_{\text{nón}} = 94{,}2\text{ (cm}^3\text{)}\)`, 0.25],
        [S`b) Thể tích phần kem nửa hình cầu phía trên: \(V_{\text{cầu}} = \dfrac{1}{2} \cdot \dfrac{4}{3}\pi R^3 = \dfrac{2}{3} \cdot 3{,}14 \cdot 3^3 = 56{,}52\text{ (cm}^3\text{)}\)`, 0.25],
        [S`Tổng dung tích kem: \(V = V_{\text{nón}} + V_{\text{cầu}} = 94{,}2 + 56{,}52 = 150{,}72\text{ (cm}^3\text{)}\)`, 0.25]
      ],
      loi: [
        'Tính cả quả cầu thay vì một nửa hình cầu',
        'Quên hệ số 1/3 trong thể tích hình nón'
      ]
    },
    {
      ten: 'Hình trụ rỗng – ống cống bê tông và chi phí đúc cống',
      nguon: 'Phóng tác từ 53 đề ôn tập tuyển sinh lớp 10 môn Toán năm 2024 – 2025 sở GD&ĐT TP HCM (đúc ống cống bê tông)',
      pts: 1,
      h: 120,
      de: S`Một xí nghiệp đúc ống cống thoát nước bằng bê tông có dạng hình trụ rỗng. Chiều dài của ống cống là \(2\text{ m}\), đường kính ngoài là \(1{,}2\text{ m}\) và bề dày thành cống là \(10\text{ cm}\). Cho biết công thức tính thể tích khối trụ là \(V = \pi R^2 h\) (với \(R\) là bán kính đáy, \(h\) là chiều cao, lấy \(\pi \approx 3{,}14\)).<br>a) Đổi các đơn vị sang mét (m). Tính thể tích khối trụ có đường kính bằng đường kính ngoài của ống và thể tích phần rỗng bên trong ống (khối trụ có đường kính bằng đường kính trong).<br>b) Tính thể tích bê tông thực tế cần dùng để đúc một ống cống. Nếu \(1\text{ m}^3\) bê tông tươi có giá \(1\,200\,000\) đồng, hỏi chi phí tiền bê tông để đúc \(50\) ống cống là bao nhiêu?`,
      ans: S`a) \(V_{\text{ngoài}} = 2{,}2608\text{ m}^3\); \(V_{\text{trong}} = 1{,}57\text{ m}^3\). b) Chi phí: \(41\,448\,000\) đồng.`,
      barem: [
        [S`a) Đổi \(10\text{ cm} = 0{,}1\text{ m}\). Bán kính ngoài: \(R_{\text{ngoài}} = 1{,}2 : 2 = 0{,}6\text{ (m)}\). Thể tích trụ ngoài: \(V_{\text{ngoài}} = 3{,}14 \cdot 0{,}6^2 \cdot 2 = 2{,}2608\text{ (m}^3\text{)}\)`, 0.25],
        [S`Bán kính trong: \(R_{\text{trong}} = 0{,}6 - 0{,}1 = 0{,}5\text{ (m)}\). Thể tích trụ trong: \(V_{\text{trong}} = 3{,}14 \cdot 0{,}5^2 \cdot 2 = 1{,}57\text{ (m}^3\text{)}\)`, 0.25],
        [S`b) Thể tích bê tông đúc 1 ống cống: \(V_{\text{bê tông}} = V_{\text{ngoài}} - V_{\text{trong}} = 2{,}2608 - 1{,}57 = 0{,}6908\text{ (m}^3\text{)}\)`, 0.25],
        [S`Thể tích bê tông cho 50 ống cống: \(0{,}6908 \cdot 50 = 34{,}54\text{ (m}^3\text{)}\). Chi phí: \(34{,}54 \cdot 1\,200\,000 = 41\,448\,000\) (đồng)`, 0.25]
      ],
      loi: [
        'Lấy bán kính trong bằng đường kính ngoài trừ bề dày: 1,2 − 0,1 = 1,1 m',
        'Quên nhân với 50 ống cống ở bước tính chi phí'
      ]
    },
    {
      ten: 'Hình hộp chữ nhật – bể cá bằng kính và số tiền mua kính',
      nguon: 'Soạn theo dạng Bài 5 đề tuyển sinh lớp 10 TP HCM (bể cá hình hộp chữ nhật)',
      pts: 1,
      h: 120,
      de: S`Một người thợ làm một bể cá cảnh bằng kính (không có nắp đậy) có dạng hình hộp chữ nhật với chiều dài \(1{,}5\text{ m}\), chiều rộng \(0{,}8\text{ m}\) và chiều cao \(0{,}6\text{ m}\). Cho biết công thức tính diện tích xung quanh hình hộp chữ nhật là \(S_{xq} = 2(a + b)h\) và thể tích là \(V = a \cdot b \cdot h\) (với \(a, b\) là các cạnh đáy, \(h\) là chiều cao).<br>a) Tính thể tích của bể cá. Người ta đổ nước vào bể sao cho mực nước bằng \(80\%\) chiều cao của bể, hỏi lượng nước trong bể là bao nhiêu lít? (Biết \(1\text{ m}^3 = 1\,000\) lít).<br>b) Người thợ cần mua kính cường lực để ghép thành bể cá đó (gồm 1 tấm kính đáy và 4 tấm kính mặt xung quanh). Tính tổng diện tích kính cần dùng và số tiền mua kính, biết giá mỗi mét vuông kính cường lực là \(500\,000\) đồng.`,
      ans: S`a) \(V = 0{,}72\text{ m}^3\); lượng nước: \(576\) lít. b) Diện tích kính: \(3{,}96\text{ m}^2\); tiền mua kính: \(1\,980\,000\) đồng.`,
      barem: [
        [S`a) Thể tích bể cá: \(V = a \cdot b \cdot h = 1{,}5 \cdot 0{,}8 \cdot 0{,}6 = 0{,}72\text{ (m}^3\text{)}\)`, 0.25],
        [S`Lượng nước trong bể: \(V_{\text{nước}} = 0{,}72 \cdot 80\% = 0{,}576\text{ (m}^3\text{)} = 576\) lít`, 0.25],
        [S`b) Bể không có nắp nên diện tích kính cần dùng: \(S_{\text{kính}} = S_{\text{đáy}} + S_{xq} = (1{,}5 \cdot 0{,}8) + 2(1{,}5 + 0{,}8) \cdot 0{,}6 = 1{,}2 + 2{,}76 = 3{,}96\text{ (m}^2\text{)}\)`, 0.25],
        [S`Số tiền mua kính: \(3{,}96 \cdot 500\,000 = 1\,980\,000\) (đồng)`, 0.25]
      ],
      loi: [
        'Tính thêm tấm kính nắp dù bể không có nắp',
        'Đổi sai 0,576 m³ sang lít'
      ]
    },
    {
      ten: 'Thả vật chìm – 5 viên bi sắt vào ly nước hình trụ',
      nguon: 'Phóng tác từ Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM (thả bi sắt vào ly nước)',
      pts: 1,
      h: 120,
      de: S`Một ly nước hình trụ có bán kính đáy lòng trong là \(4\text{ cm}\), chiều cao \(15\text{ cm}\). Hiện tại trong ly đang chứa một lượng nước có chiều cao mực nước là \(12\text{ cm}\). Người ta thả chìm hoàn toàn 5 viên bi sắt đặc dạng hình cầu, mỗi viên bi có bán kính \(2\text{ cm}\) vào ly. Cho công thức tính thể tích khối trụ \(V = \pi R^2 h\), thể tích khối cầu \(V = \dfrac{4}{3}\pi R^3\) (lấy \(\pi \approx 3{,}14\)).<br>a) Tính tổng thể tích của 5 viên bi sắt hình cầu (làm tròn đến hai chữ số thập phân).<br>b) Xác định xem nước trong ly có bị tràn ra ngoài hay không? Nếu có, hãy tính thể tích nước bị tràn ra ngoài (kết quả làm tròn hai chữ số thập phân).`,
      ans: S`a) \(V_{\text{5 bi}} \approx 167{,}47\text{ cm}^3\). b) Nước bị tràn ra ngoài; thể tích nước tràn là \(16{,}75\text{ cm}^3\).`,
      barem: [
        [S`a) Thể tích của 1 viên bi sắt: \(V_1 = \dfrac{4}{3}\pi r^3 \approx \dfrac{4}{3} \cdot 3{,}14 \cdot 2^3 \approx 33{,}49\text{ (cm}^3\text{)}\)`, 0.25],
        [S`Tổng thể tích 5 viên bi: \(V_{\text{5 bi}} = 5 \cdot \dfrac{4}{3} \cdot 3{,}14 \cdot 2^3 \approx 167{,}47\text{ (cm}^3\text{)}\)`, 0.25],
        [S`b) Chiều cao phần ly còn trống: \(h_{\text{trống}} = 15 - 12 = 3\text{ (cm)}\). Thể tích phần trống: \(V_{\text{trống}} = \pi R^2 h_{\text{trống}} \approx 3{,}14 \cdot 4^2 \cdot 3 = 150{,}72\text{ (cm}^3\text{)}\)`, 0.25],
        [S`Vì \(167{,}47 \gt 150{,}72\) nên nước tràn ra ngoài. Thể tích nước tràn: \(V_{\text{tràn}} = 167{,}47 - 150{,}72 = 16{,}75\text{ (cm}^3\text{)}\)`, 0.25]
      ],
      loi: [
        'Quên tính tổng thể tích của cả 5 viên bi (chỉ so sánh 1 viên bi với phần trống)',
        'Lấy chiều cao toàn phần 15 cm thay vì chiều cao phần trống 3 cm'
      ]
    }
  ]
});
