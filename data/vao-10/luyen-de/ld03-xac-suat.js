/* Luyện đề – Bài 3 (1,5 điểm): Xác suất của biến cố (dạng đơn giản).
   Nội dung lớp 9 học kì II (Chương VIII, KNTT: mô tả không gian mẫu, đếm kết quả thuận lợi, tính xác suất P(A) = n(A)/n(Ω), xác suất thực nghiệm).
   Đúng cấu trúc đề tuyển sinh TP.HCM: câu a mô tả không gian mẫu hoặc đếm n(Ω); câu b tính xác suất của biến cố.
   Barem bội 0,25, tổng = 1,5 điểm. Đáp số được kiểm tra độc lập bằng tools/kiem-dap-so.py. */
LuyenDe.add('xac-suat', {
  phut: 12,
  soat: [
    'Xác định rõ phép thử: liệt kê không gian mẫu hoặc tính đúng n(Ω)',
    'Liệt kê đầy đủ, không sót kết quả thuận lợi cho biến cố',
    'Phân biệt chọn có thứ tự (lần lượt) và không thứ tự (đồng thời)',
    'Tính xác suất P = n(A) / n(Ω) và rút gọn phân số tối giản'
  ],
  de: [
    {
      ten: 'Gieo hai xúc xắc – tổng số chấm bằng 8',
      nguon: 'Soạn theo SGK Toán 9 Kết nối tri thức – Chương VIII (gieo hai xúc xắc)',
      pts: 1.5,
      h: 120,
      de: S`Trong một trò chơi, người ta gieo đồng thời hai con xúc xắc cân đối và đồng chất.<br>a) Hãy mô tả không gian mẫu của phép thử và cho biết số phần tử của không gian mẫu.<br>b) Tính xác suất của biến cố \(A\): “Tổng số chấm xuất hiện trên hai con xúc xắc bằng 8”.`,
      ans: S`a) \(n(\Omega) = 36\). b) \(P(A) = \dfrac{5}{36}\).`,
      barem: [
        [S`a) Không gian mẫu \(\Omega = \{(i; j) \mid 1 \le i, j \le 6\}\) với \(i, j\) là số chấm xuất hiện trên hai con xúc xắc`, 0.5],
        [S`Số phần tử của không gian mẫu: \(n(\Omega) = 6 \cdot 6 = 36\)`, 0.25],
        [S`b) Các kết quả thuận lợi cho biến cố \(A\) (tổng bằng 8): \((2; 6), (3; 5), (4; 4), (5; 3), (6; 2)\)`, 0.5],
        [S`Số kết quả thuận lợi là \(n(A) = 5\). Xác suất của biến cố \(A\): \(P(A) = \dfrac{n(A)}{n(\Omega)} = \dfrac{5}{36}\)`, 0.25]
      ],
      loi: [
        'Quên các cặp đảo vị trí như (2; 6) và (6; 2) là hai kết quả phân biệt',
        'Tính nhầm tổng số kết quả của 2 xúc xắc thành 12 thay vì 36'
      ],
      nhap: true
    },
    {
      ten: 'Rút ngẫu nhiên thẻ từ hộp – số chính phương',
      nguon: 'Phóng tác theo dạng bài số chính phương trong Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM',
      pts: 1.5,
      h: 120,
      de: S`Một chiếc hộp chứa \(50\) tấm thẻ cùng loại được đánh số lần lượt từ \(1\) đến \(50\). Rút ngẫu nhiên một tấm thẻ từ trong hộp.<br>a) Xác định số phần tử của không gian mẫu của phép thử trên.<br>b) Tính xác suất của biến cố \(B\): “Số ghi trên tấm thẻ được rút ra là số chính phương”.`,
      ans: S`a) \(n(\Omega) = 50\). b) \(P(B) = \dfrac{7}{50}\).`,
      barem: [
        [S`a) Phép thử rút ngẫu nhiên 1 thẻ từ 50 tấm thẻ có \(50\) kết quả đồng khả năng: \(n(\Omega) = 50\)`, 0.5],
        [S`b) Các số chính phương từ \(1\) đến \(50\) là: \(1, 4, 9, 16, 25, 36, 49\). Số kết quả thuận lợi là \(n(B) = 7\)`, 0.5],
        [S`Xác suất của biến cố \(B\): \(P(B) = \dfrac{n(B)}{n(\Omega)} = \dfrac{7}{50}\)`, 0.5]
      ],
      loi: [
        'Bỏ sót số 1 (vì 1 = 1² là số chính phương)',
        'Đếm thừa số lớn hơn 50 như 64'
      ],
      nhap: true
    },
    {
      ten: 'Tung đồng xu liên tiếp 3 lần – đúng 2 lần liên tiếp sấp',
      nguon: 'Soạn theo SGK Toán 9 Kết nối tri thức – Chương VIII (gieo đồng xu nhiều lần)',
      pts: 1.5,
      h: 120,
      de: S`Bạn Minh thực hiện phép thử gieo một đồng xu cân đối và đồng chất liên tiếp \(3\) lần.<br>a) Hãy liệt kê tất cả các kết quả có thể xảy ra của phép thử (mô tả không gian mẫu).<br>b) Tính xác suất của biến cố \(C\): “Có đúng 2 lần liên tiếp xuất hiện mặt sấp”.`,
      ans: S`a) \(n(\Omega) = 8\). b) \(P(C) = \dfrac{1}{4}\).`,
      barem: [
        [S`a) Kí hiệu \(S\) là mặt sấp, \(N\) là mặt ngửa. Không gian mẫu: \(\Omega = \{SSS, SSN, SNS, SNN, NSS, NSN, NNS, NNN\}\)`, 0.5],
        [S`Số phần tử của không gian mẫu: \(n(\Omega) = 8\)`, 0.25],
        [S`b) Biến cố \(C\) “Có đúng 2 lần liên tiếp xuất hiện mặt sấp” gồm các kết quả: \(\{SSN, NSS\}\) (không lấy \(SSS\) vì có 3 lần liên tiếp)`, 0.5],
        [S`Số kết quả thuận lợi là \(n(C) = 2\). Xác suất biến cố \(C\): \(P(C) = \dfrac{2}{8} = \dfrac{1}{4}\)`, 0.25]
      ],
      loi: [
        'Liệt kê thiếu kết quả của không gian mẫu (chỉ nghĩ có 6 kết quả thay vì 2³ = 8)',
        'Lấy cả trường hợp SSS (sai yêu cầu "đúng 2 lần liên tiếp")'
      ],
      nhap: true
    },
    {
      ten: 'Rút đồng thời 2 bông hoa – hai bông cùng màu',
      nguon: 'Phóng tác theo dạng bài bó hoa hai màu trong Tuyển tập đề tham khảo tuyển sinh lớp 10 môn Toán năm 2026 – 2027 sở GD&ĐT TP HCM',
      pts: 1.5,
      h: 120,
      de: S`Một bó hoa gồm \(4\) bông hoa màu hồng và \(3\) bông hoa màu trắng (các bông hoa đôi một khác nhau). Bạn Hương chọn ngẫu nhiên đồng thời \(2\) bông hoa từ bó hoa đó.<br>a) Hỏi có bao nhiêu cách chọn ra \(2\) bông hoa từ bó hoa trên? (Xác định số phần tử không gian mẫu).<br>b) Tính xác suất của biến cố \(D\): “Hai bông hoa được chọn ra có cùng màu”.`,
      ans: S`a) \(n(\Omega) = 21\). b) \(P(D) = \dfrac{3}{7}\).`,
      barem: [
        [S`a) Tổng số hoa trong bó: \(4 + 3 = 7\) bông. Số cách chọn đồng thời 2 bông hoa từ 7 bông: \(n(\Omega) = \dfrac{7 \cdot 6}{2} = 21\) (cách)`, 0.5],
        [S`b) Trường hợp 1: Chọn được 2 bông hồng từ 4 bông hồng có \(\dfrac{4 \cdot 3}{2} = 6\) cách`, 0.25],
        [S`Trường hợp 2: Chọn được 2 bông trắng từ 3 bông trắng có \(\dfrac{3 \cdot 2}{2} = 3\) cách`, 0.25],
        [S`Số kết quả thuận lợi cho \(D\): \(n(D) = 6 + 3 = 9\). Xác suất biến cố \(D\): \(P(D) = \dfrac{9}{21} = \dfrac{3}{7}\)`, 0.5]
      ],
      loi: [
        'Tính nhầm không gian mẫu có thứ tự: 7 · 6 = 42 thay vì 21',
        'Quên không cộng cả hai trường hợp 2 bông hồng và 2 bông trắng',
        'Chưa rút gọn phân số 9/21'
      ],
      nhap: true
    },
    {
      ten: 'Xác suất thực nghiệm – bảng thống kê điểm bắn',
      nguon: 'Soạn theo SGK Toán 9 Kết nối tri thức – Chương VIII (xác suất thực nghiệm)',
      pts: 1.5,
      h: 120,
      de: S`Một xạ thủ bắn \(50\) viên đạn vào bia. Số lần đạt được các mức điểm được thống kê trong bảng dưới đây:<br><table class="tbl"><tr><td>Mức điểm</td><td>\(7\)</td><td>\(8\)</td><td>\(9\)</td><td>\(10\)</td></tr><tr><td>Số lần</td><td>\(10\)</td><td>\(15\)</td><td>\(13\)</td><td>\(12\)</td></tr></table>a) Hỏi xạ thủ đã bắn đạt điểm 9 bao nhiêu lần trong tổng số 50 lần bắn?<br>b) Tính xác suất thực nghiệm của biến cố \(E\): “Xạ thủ bắn được điểm lớn hơn 8”.`,
      ans: S`a) \(13\) lần. b) \(P(E) = \dfrac{1}{2}\).`,
      barem: [
        [S`a) Dựa vào bảng thống kê tần số, số lần xạ thủ bắn đạt điểm 9 là \(13\) lần trong tổng số \(50\) lần bắn`, 0.5],
        [S`b) Các mức điểm lớn hơn 8 là điểm 9 và điểm 10. Số lần bắn đạt điểm lớn hơn 8: \(13 + 12 = 25\) (lần)`, 0.5],
        [S`Xác suất thực nghiệm của biến cố \(E\): \(P(E) = \dfrac{25}{50} = \dfrac{1}{2}\)`, 0.5]
      ],
      loi: [
        'Tính cả mức điểm 8 vào điều kiện "lớn hơn 8"',
        'Chưa rút gọn phân số xác suất 25/50'
      ],
      nhap: true
    },
    {
      ten: 'Rút lần lượt không hoàn lại 2 thẻ – số chia hết cho 3',
      nguon: 'Soạn theo SGK Toán 9 Kết nối tri thức – Chương VIII (rút thẻ lần lượt không hoàn lại)',
      pts: 1.5,
      h: 120,
      de: S`Một hộp chứa \(5\) tấm thẻ cùng loại được ghi các chữ số: \(1; 2; 3; 4; 5\). Rút ngẫu nhiên một tấm thẻ từ hộp làm chữ số hàng chục, không trả lại hộp, sau đó rút tiếp một tấm thẻ nữa làm chữ số hàng đơn vị để tạo thành một số tự nhiên có hai chữ số.<br>a) Hãy xác định số phần tử của không gian mẫu của phép thử trên.<br>b) Tính xác suất của biến cố \(A\): “Số tự nhiên được tạo thành chia hết cho 3”.`,
      ans: S`a) \(n(\Omega) = 20\). b) \(P(A) = \dfrac{2}{5}\).`,
      barem: [
        [S`a) Rút tấm thẻ thứ nhất làm chữ số hàng chục có \(5\) cách chọn. Do không hoàn lại nên rút tấm thẻ thứ hai làm chữ số hàng đơn vị có \(4\) cách chọn`, 0.5],
        [S`Số phần tử của không gian mẫu: \(n(\Omega) = 5 \cdot 4 = 20\) (số)`, 0.25],
        [S`b) Số tự nhiên chia hết cho 3 khi tổng các chữ số chia hết cho 3. Các cặp chữ số có tổng chia hết cho 3 là: \(\{1; 2\}, \{1; 5\}, \{2; 4\}, \{4; 5\}\)`, 0.25],
        [S`Các số tạo thành là: \(12, 21, 15, 51, 24, 42, 45, 54\) (có 8 số), suy ra \(n(A) = 8\)`, 0.25],
        [S`Xác suất biến cố \(A\): \(P(A) = \dfrac{8}{20} = \dfrac{2}{5}\)`, 0.25]
      ],
      loi: [
        'Tính nhầm không gian mẫu có hoàn lại (5 · 5 = 25)',
        'Bỏ sót các cặp số như {1; 5} hoặc {4; 5}',
        'Chưa rút gọn phân số 8/20'
      ],
      nhap: true
    },
    {
      ten: 'Chọn ngẫu nhiên 2 học sinh – có ít nhất 1 học sinh nữ',
      nguon: 'Soạn theo SGK Toán 9 Kết nối tri thức – Chương VIII (chọn đồng thời hai người)',
      pts: 1.5,
      h: 120,
      de: S`Đội tình nguyện Mùa hè xanh của một lớp 9 gồm \(7\) học sinh xuất sắc, trong đó có \(4\) nam và \(3\) nữ. Giáo viên chủ nhiệm cần chọn ngẫu nhiên đồng thời \(2\) học sinh từ đội tình nguyện trên để phân công nhiệm vụ.<br>a) Có bao nhiêu cách chọn ra 2 học sinh từ đội tình nguyện đó? (Xác định số phần tử của không gian mẫu).<br>b) Tính xác suất của biến cố \(B\): “Trong 2 học sinh được chọn, có ít nhất 1 học sinh nữ”.`,
      ans: S`a) \(n(\Omega) = 21\). b) \(P(B) = \dfrac{5}{7}\).`,
      barem: [
        [S`a) Số cách chọn đồng thời 2 học sinh từ 7 học sinh: \(n(\Omega) = \dfrac{7 \cdot 6}{2} = 21\)`, 0.5],
        [S`b) Xét biến cố đối \(\overline{B}\): “Trong 2 học sinh được chọn không có học sinh nữ nào” (tức là chọn được 2 học sinh nam)`, 0.25],
        [S`Số cách chọn 2 nam từ 4 nam: \(n(\overline{B}) = \dfrac{4 \cdot 3}{2} = 6\) (cách)`, 0.25],
        [S`Số kết quả thuận lợi cho \(B\): \(n(B) = n(\Omega) - n(\overline{B}) = 21 - 6 = 15\) (kết quả)`, 0.25],
        [S`Xác suất của biến cố \(B\): \(P(B) = \dfrac{15}{21} = \dfrac{5}{7}\)`, 0.25]
      ],
      loi: [
        'Tính không gian mẫu có thứ tự: 7 · 6 = 42 thay vì 21',
        'Bỏ sót trường hợp cả 2 bạn đều là nữ khi tính trực tiếp',
        'Chưa rút gọn phân số 15/21'
      ],
      nhap: true
    },
    {
      ten: 'Vòng quay may mắn – kim chỉ vào ô số nguyên tố',
      nguon: 'Soạn theo SGK Toán 9 Kết nối tri thức – Chương VIII (đĩa quay)',
      pts: 1.5,
      h: 120,
      de: S`Một đĩa tròn bằng bìa cứng được chia làm \(8\) hình quạt bằng nhau và ghi các số \(1; 2; 3; 4; 5; 6; 7; 8\). Chiếc kim được gắn cố định vào trục quay ở tâm của đĩa. Xét phép thử “Quay đĩa tròn một lần” (giả sử kim không bao giờ dừng lại ở vạch chia giữa 2 ô).<br>a) Hãy mô tả không gian mẫu của phép thử và cho biết số phần tử của không gian mẫu.<br>b) Tính xác suất của biến cố \(C\): “Kim chỉ vào ô ghi số nguyên tố”.`,
      ans: S`a) \(n(\Omega) = 8\). b) \(P(C) = \dfrac{1}{2}\).`,
      barem: [
        [S`a) Không gian mẫu: \(\Omega = \{1; 2; 3; 4; 5; 6; 7; 8\}\)`, 0.5],
        [S`Số phần tử của không gian mẫu là \(n(\Omega) = 8\)`, 0.25],
        [S`b) Các số nguyên tố từ 1 đến 8 là: \(2, 3, 5, 7\)`, 0.25],
        [S`Các kết quả thuận lợi cho \(C\) là \(\{2; 3; 5; 7\}\). Số kết quả thuận lợi là \(n(C) = 4\)`, 0.25],
        [S`Xác suất của biến cố \(C\): \(P(C) = \dfrac{4}{8} = \dfrac{1}{2}\)`, 0.25]
      ],
      loi: [
        'Tính cả số 1 là số nguyên tố dẫn đến n(C) = 5',
        'Bỏ sót số nguyên tố chẵn 2'
      ],
      nhap: true
    },
    {
      ten: 'Gieo 2 con xúc xắc – hiệu số chấm bằng 2',
      nguon: 'Soạn theo SGK Toán 9 Kết nối tri thức – Chương VIII (gieo hai xúc xắc)',
      pts: 1.5,
      h: 120,
      de: S`Bạn An gieo đồng thời hai con xúc xắc cân đối và đồng chất.<br>a) Phép thử trên có bao nhiêu kết quả có thể xảy ra?<br>b) Tính xác suất của biến cố \(D\): “Số chấm xuất hiện trên 2 con xúc xắc chênh lệch nhau đúng 2 chấm”.`,
      ans: S`a) \(n(\Omega) = 36\). b) \(P(D) = \dfrac{2}{9}\).`,
      barem: [
        [S`a) Khi gieo đồng thời 2 con xúc xắc, số phần tử của không gian mẫu là: \(n(\Omega) = 6 \cdot 6 = 36\)`, 0.5],
        [S`b) Gọi kết quả gieo là cặp \((i; j)\) với \(i, j \in \{1; 2; 3; 4; 5; 6\}\). Biến cố \(D\) xảy ra khi \(|i - j| = 2\)`, 0.25],
        [S`Các cặp số có hiệu bằng 2: \((1; 3), (2; 4), (3; 5), (4; 6)\) và đảo vị trí: \((3; 1), (4; 2), (5; 3), (6; 4)\)`, 0.25],
        [S`Tổng cộng có \(8\) kết quả thuận lợi: \(n(D) = 8\)`, 0.25],
        [S`Xác suất của biến cố \(D\): \(P(D) = \dfrac{8}{36} = \dfrac{2}{9}\)`, 0.25]
      ],
      loi: [
        'Quên các cặp đảo vị trí như (1; 3) và (3; 1)',
        'Chưa rút gọn phân số 8/36'
      ],
      nhap: true
    },
    {
      ten: 'Xác suất thực nghiệm – khảo sát phương tiện đến trường',
      nguon: 'Soạn theo SGK Toán 9 Kết nối tri thức – Chương VIII (xác suất thực nghiệm)',
      pts: 1.5,
      h: 120,
      de: S`Trường THCS A tiến hành khảo sát phương tiện đi đến trường của \(50\) học sinh khối 9. Kết quả được ghi nhận ở bảng sau:<br><table class="tbl"><tr><td>Phương tiện</td><td>Xe buýt</td><td>Xe đạp</td><td>Đi bộ</td><td>Phụ huynh chở</td></tr><tr><td>Số học sinh</td><td>\(15\)</td><td>\(12\)</td><td>\(8\)</td><td>\(15\)</td></tr></table>a) Hãy xác định tổng số học sinh đã được khảo sát để lấy số liệu cho bảng trên (nêu phép tính minh họa).<br>b) Chọn ngẫu nhiên 1 học sinh trong 50 học sinh trên. Tính xác suất thực nghiệm của biến cố \(E\): “Học sinh được chọn đến trường bằng xe buýt hoặc đi bộ”.`,
      ans: S`a) \(50\) học sinh. b) \(P(E) = \dfrac{23}{50}\).`,
      barem: [
        [S`a) Tổng số học sinh tham gia khảo sát là: \(15 + 12 + 8 + 15 = 50\) (học sinh). Đây cũng là số lần thực hiện phép thử`, 0.5],
        [S`b) Số học sinh đến trường bằng xe buýt là \(15\); số học sinh đi bộ là \(8\)`, 0.25],
        [S`Số kết quả thuận lợi cho biến cố \(E\) (đi xe buýt hoặc đi bộ) là: \(15 + 8 = 23\)`, 0.5],
        [S`Xác suất thực nghiệm của biến cố \(E\): \(P(E) = \dfrac{23}{50}\) (hay \(46\%\))`, 0.25]
      ],
      loi: [
        'Cộng thiếu một nhóm phương tiện khi tính tổng học sinh',
        'Tính nhầm số học sinh đi xe buýt hoặc đi bộ'
      ],
      nhap: true
    }
  ]
});
