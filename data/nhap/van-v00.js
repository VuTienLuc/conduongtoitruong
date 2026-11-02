/* Nhập từ AI qua Xưởng dữ liệu: nhap/van-v00.json – Ngữ văn – đề V00. Sửa nội dung thì sửa tệp trong nhap/ rồi chạy lại tools/nhap-du-lieu.py. */
NhapDL.add({
 "loai": "de_van",
 "ma_de": "V00",
 "muc_do": "TB",
 "thoi_gian": 120,
 "cau_truc_theo": "Đề mẫu minh họa cấu trúc Đọc hiểu 6 điểm – Viết 4 điểm (thầy mô tả)",
 "doc_hieu": {
  "diem": 6,
  "van_ban": {
   "ten": "Ngọn đèn của mẹ",
   "tac_gia": "Người soạn đề",
   "the_loai": "thơ lục bát",
   "nguon_goc": "tu_viet",
   "noi_dung": "Đêm đông gió thổi ngoài hiên,\nMẹ ngồi bên ngọn đèn hiền vá may.\nTừng đường kim chỉ đêm nay,\nMẹ khâu cả những tháng ngày con đi.\n\nCon nằm nghe gió thầm thì,\nNgọn đèn như mắt mẹ khi ngóng chờ.\nMai sau con đến bến bờ,\nVẫn mang ánh lửa đơn sơ theo cùng.\n\nĐường đời gió bụi mịt mùng,\nCó đèn của mẹ ung dung soi đường.\nDẫu xa ngàn dặm quê hương,\nLòng con vẫn ấm tình thương thuở nào.",
   "chu_thich": []
  },
  "cau": [
   {
    "so": 1,
    "diem": 0.5,
    "dang": "the_loai",
    "de": "Xác định thể thơ của văn bản.",
    "goi_y": "Đếm số chữ trong từng cặp dòng thơ, xem chữ cuối dòng trên vần với chữ nào ở dòng dưới.",
    "mau_cau": "Văn bản được viết theo thể thơ …",
    "dong_ke": 3,
    "dap_an": "Thể thơ lục bát (các cặp dòng 6 chữ – 8 chữ).",
    "cham": [
     {
      "y": "Xác định đúng thể thơ lục bát",
      "diem": 0.5
     }
    ]
   },
   {
    "so": 2,
    "diem": 0.5,
    "dang": "tieng_viet",
    "de": "Từ \"thầm thì\" trong dòng thơ \"Con nằm nghe gió thầm thì\" là từ láy hay từ ghép? Nêu tác dụng của từ đó.",
    "goi_y": "Xem hai tiếng có lặp lại âm đầu không; rồi nói từ đó gợi âm thanh như thế nào.",
    "mau_cau": "Từ \"thầm thì\" là từ … Từ này gợi …",
    "dong_ke": 4,
    "dap_an": "\"Thầm thì\" là từ láy (láy âm đầu \"th\"). Từ này gợi âm thanh nhỏ, nhẹ của gió như lời thì thầm, làm nổi bật không khí tĩnh lặng của đêm đông.",
    "cham": [
     {
      "y": "Xác định đúng từ láy",
      "diem": 0.25
     },
     {
      "y": "Nêu được tác dụng: gợi âm thanh nhỏ nhẹ, không khí tĩnh lặng",
      "diem": 0.25
     }
    ]
   },
   {
    "so": 3,
    "diem": 1,
    "dang": "bien_phap",
    "de": "Chỉ ra và nêu tác dụng của biện pháp tu từ so sánh trong dòng thơ \"Ngọn đèn như mắt mẹ khi ngóng chờ\".",
    "goi_y": "Gọi tên – chỉ ra hai sự vật được so sánh và từ so sánh – nêu tác dụng về hình ảnh và về tình cảm.",
    "mau_cau": "Biện pháp so sánh: … được so sánh với … qua từ \"như\". Tác dụng: …",
    "dong_ke": 6,
    "dap_an": "So sánh \"ngọn đèn\" với \"mắt mẹ\" qua từ \"như\". Tác dụng: làm câu thơ sinh động, gợi hình, gợi cảm; ngọn đèn trở nên gần gũi như ánh mắt mẹ dõi theo con; nhấn mạnh tình yêu thương, sự mong chờ của mẹ và lòng biết ơn của người con.",
    "cham": [
     {
      "y": "Chỉ ra đúng hai vế so sánh và từ so sánh \"như\"",
      "diem": 0.25
     },
     {
      "y": "Tác dụng: câu thơ sinh động, gợi hình, gợi cảm",
      "diem": 0.25
     },
     {
      "y": "Nhấn mạnh tình yêu thương, sự mong chờ, che chở của mẹ",
      "diem": 0.25
     },
     {
      "y": "Thể hiện tình cảm trân trọng, biết ơn của người con",
      "diem": 0.25
     }
    ]
   },
   {
    "so": 4,
    "diem": 1,
    "dang": "chu_de",
    "de": "Nêu chủ đề của văn bản và tình cảm của người con dành cho mẹ.",
    "goi_y": "Văn bản viết về ai, về điều gì; người con nghĩ gì, cảm thấy gì khi nhớ tới ngọn đèn.",
    "mau_cau": "Văn bản viết về … qua đó thể hiện …",
    "dong_ke": 5,
    "dap_an": "Chủ đề: ca ngợi tình yêu thương, sự hi sinh thầm lặng của người mẹ, hình ảnh ngọn đèn tượng trưng cho tình mẹ soi đường con đi. Người con yêu thương, biết ơn mẹ, luôn mang theo tình mẹ trên đường đời.",
    "cham": [
     {
      "y": "Nêu đúng chủ đề: tình yêu thương, sự hi sinh của người mẹ",
      "diem": 0.5
     },
     {
      "y": "Nêu đúng tình cảm của người con: yêu thương, biết ơn, luôn nhớ về mẹ",
      "diem": 0.5
     }
    ]
   },
   {
    "so": 5,
    "diem": 1,
    "dang": "thong_diep",
    "de": "Thông điệp nào trong văn bản có ý nghĩa nhất với em? Vì sao?",
    "goi_y": "Chọn một thông điệp gắn với tình mẹ, lòng biết ơn; nêu một lí do gắn với cuộc sống của em.",
    "mau_cau": "Thông điệp em tâm đắc nhất là … vì …",
    "dong_ke": 6,
    "dap_an": "Học sinh nêu một thông điệp hợp lí, ví dụ: hãy trân trọng, biết ơn tình yêu thương và sự hi sinh thầm lặng của mẹ; tình mẹ là chỗ dựa giúp con vững vàng trên đường đời. Lí giải hợp lí, chân thành.",
    "cham": [
     {
      "y": "Nêu được một thông điệp hợp lí, gắn với văn bản",
      "diem": 0.5
     },
     {
      "y": "Lí giải thuyết phục, gắn với bản thân",
      "diem": 0.5
     }
    ]
   }
  ],
  "doan_van": {
   "so": 6,
   "diem": 2,
   "de": "Từ nội dung văn bản, hãy viết đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của em về lòng biết ơn cha mẹ.",
   "khung": [
    "Nêu vấn đề: lòng biết ơn cha mẹ là tình cảm thiêng liêng, cần có ở mỗi người",
    "Giải thích: biết ơn là ghi nhớ công lao sinh thành, nuôi dưỡng và đền đáp bằng việc làm",
    "Lí lẽ 1 + dẫn chứng: cha mẹ hi sinh thầm lặng, như người mẹ thức khuya vá áo trong bài thơ",
    "Lí lẽ 2: biết ơn giúp ta sống tử tế, gia đình thêm gắn bó",
    "Phản đề: phê phán người vô ơn, coi sự hi sinh của cha mẹ là điều hiển nhiên",
    "Bài học: chăm ngoan, học tốt, giúp đỡ việc nhà, nói lời cảm ơn cha mẹ"
   ],
   "mau_cau": "Trong cuộc đời mỗi người, cha mẹ là những người đã hi sinh cho ta nhiều nhất, vì vậy lòng biết ơn cha mẹ là tình cảm không thể thiếu.",
   "cham": [
    {
     "y": "Đảm bảo hình thức đoạn văn, dung lượng khoảng 200 chữ",
     "diem": 0.25
    },
    {
     "y": "Xác định đúng vấn đề: lòng biết ơn cha mẹ",
     "diem": 0.25
    },
    {
     "y": "Triển khai vấn đề: giải thích, lí lẽ, dẫn chứng, phản đề, bài học",
     "diem": 1
    },
    {
     "y": "Đảm bảo chuẩn chính tả, ngữ pháp",
     "diem": 0.25
    },
    {
     "y": "Sáng tạo: cách diễn đạt mới mẻ, suy nghĩ riêng",
     "diem": 0.25
    }
   ],
   "loi_hay_sai": [
    "Viết thành nhiều đoạn",
    "Chỉ kể lại bài thơ, không bàn về vấn đề",
    "Không có dẫn chứng"
   ]
  }
 },
 "viet": {
  "diem": 4,
  "de": "Viết bài văn (khoảng 500 chữ) phân tích bài thơ \"Câu cá mùa thu\" (Thu điếu) của Nguyễn Khuyến.",
  "van_ban": {
   "ten": "Câu cá mùa thu (Thu điếu)",
   "tac_gia": "Nguyễn Khuyến",
   "the_loai": "thơ thất ngôn bát cú Đường luật",
   "nguon_goc": "truoc_1929",
   "noi_dung": "Ao thu lạnh lẽo nước trong veo,\nMột chiếc thuyền câu bé tẻo teo.\nSóng biếc theo làn hơi gợn tí,\nLá vàng trước gió khẽ đưa vèo.\nTầng mây lơ lửng trời xanh ngắt,\nNgõ trúc quanh co khách vắng teo.\nTựa gối, buông cần lâu chẳng được,\nCá đâu đớp động dưới chân bèo.",
   "chu_thich": [
    "(1) Thu điếu: câu cá mùa thu."
   ]
  },
  "dan_y": {
   "mo_bai": [
    "Giới thiệu Nguyễn Khuyến, nhà thơ gắn bó với làng quê Bắc Bộ, và bài thơ \"Câu cá mùa thu\".",
    "Nêu cảm nhận chung: bức tranh thu làng quê trong trẻo, tĩnh lặng và tâm sự thầm kín của nhà thơ."
   ],
   "than_bai": [
    "Ý 1 – Hai câu đầu: ao thu \"lạnh lẽo\", nước \"trong veo\", thuyền câu \"bé tẻo teo\"; vần \"eo\" gợi không gian nhỏ hẹp, tĩnh lặng, se lạnh.",
    "Ý 2 – Hai câu 3, 4: sóng biếc \"hơi gợn tí\", lá vàng \"khẽ đưa vèo\"; chuyển động rất nhẹ làm nổi bật cái tĩnh (lấy động tả tĩnh); màu xanh, màu vàng đặc trưng mùa thu làng quê.",
    "Ý 3 – Hai câu 5, 6: tầng mây \"lơ lửng\", trời \"xanh ngắt\", ngõ trúc \"quanh co\", \"khách vắng teo\"; không gian mở lên cao, ra xa nhưng vắng lặng, gợi nỗi cô quạnh.",
    "Ý 4 – Hai câu cuối: tư thế \"tựa gối, buông cần\", tiếng cá \"đớp động dưới chân bèo\"; người câu cá không chú tâm vào cá mà đang suy tư, gợi tâm sự buồn thầm kín của nhà thơ.",
    "Ý 5 – Nghệ thuật: thể thất ngôn bát cú, vần \"eo\" độc đáo, lấy động tả tĩnh, ngôn ngữ giản dị mà tinh tế."
   ],
   "ket_bai": [
    "Khẳng định giá trị: bức tranh thu làng quê đẹp, tình yêu thiên nhiên, quê hương và tâm sự thầm kín của tác giả.",
    "Liên hệ: em thêm yêu cảnh sắc bình dị của làng quê Việt Nam."
   ]
  },
  "mau_cau": "Nhắc đến mùa thu trong thơ ca Việt Nam, người đọc khó quên bài thơ \"Câu cá mùa thu\" của Nguyễn Khuyến. Bằng những nét vẽ giản dị, nhà thơ đã gợi lên bức tranh thu làng quê trong trẻo, tĩnh lặng và gửi gắm tâm sự thầm kín của mình.",
  "tu_ngu": [
   "trong trẻo, tĩnh lặng",
   "lấy động tả tĩnh",
   "gợi hình, gợi cảm",
   "không gian được mở rộng",
   "vần \"eo\" gợi sự nhỏ hẹp, quạnh vắng",
   "tâm sự thầm kín",
   "tình yêu thiên nhiên, quê hương",
   "ngôn ngữ giản dị mà tinh tế"
  ],
  "cham": [
   {
    "y": "a) Đảm bảo bố cục mở bài – thân bài – kết bài",
    "diem": 0.25
   },
   {
    "y": "b) Xác định đúng vấn đề: phân tích bức tranh thu và tâm sự của nhà thơ",
    "diem": 0.25
   },
   {
    "y": "c1) Hai câu đầu: không gian ao thu, chiếc thuyền câu, tác dụng của vần \"eo\"",
    "diem": 0.5
   },
   {
    "y": "c2) Hai câu 3, 4: chuyển động nhẹ của sóng, lá; nghệ thuật lấy động tả tĩnh",
    "diem": 0.5
   },
   {
    "y": "c3) Hai câu 5, 6: không gian cao rộng, vắng lặng",
    "diem": 0.5
   },
   {
    "y": "c4) Hai câu cuối: tư thế người câu cá, tâm sự thầm kín",
    "diem": 0.5
   },
   {
    "y": "c5) Đánh giá nghệ thuật và nội dung của bài thơ",
    "diem": 0.5
   },
   {
    "y": "d) Đảm bảo chuẩn chính tả, ngữ pháp",
    "diem": 0.5
   },
   {
    "y": "e) Sáng tạo: cảm nhận riêng, diễn đạt mới mẻ",
    "diem": 0.5
   }
  ],
  "loi_hay_sai": [
   "Chỉ diễn xuôi câu thơ, không phân tích từ ngữ, hình ảnh",
   "Không trích dẫn thơ",
   "Thiếu mở bài hoặc kết bài"
  ]
 },
 "checklist": [
  "Câu 2: \"thầm thì\" là từ láy, không phải từ ghép",
  "Câu 3 phải chỉ rõ hai vế so sánh và từ \"như\"",
  "Câu 6 viết thành một đoạn văn, không xuống dòng",
  "Phần Viết phân tích theo từng cặp câu, có trích dẫn"
 ]
}, 'nhap/van-v00.json');
