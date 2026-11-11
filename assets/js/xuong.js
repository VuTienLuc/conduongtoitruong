/* =====================================================================
   XƯỞNG DỮ LIỆU (dành cho thầy cô) – tài liệu ở NotebookLM → AI xuất JSON đúng mẫu → đưa vào web
   #/xuong          quy trình 4 bước + dữ liệu đã lưu trên máy này
   #/xuong/prompt   menu prompt: hướng dẫn Gem (dán một lần), lệnh từng đề, lệnh sửa JSON
                    – Ngữ văn đề luyện · Toán đề luyện theo bài · Toán phiếu ôn tập 90 phút (JSON hoặc Markdown, đợt sau tránh bài đợt trước)
                    – Bài giảng – luyện tập online lớp 9–12 theo mục lục SGK KNTT (BaiHoc)
                    – Sổ tay công thức tra cứu Toán vào 10: công thức, cách làm, mẹo nhớ, lỗi hay sai theo từng dạng (SoTay)
   #/xuong/nhap     nhập dữ liệu: dán câu trả lời AI hoặc kéo tệp .json → kiểm → xem trước, in → lưu máy này / tải tệp chuẩn
   Mẫu JSON ở đây phải khớp với NhapDL.check (assets/js/nhap.js). Sửa mẫu thì sửa cả hai.
   ===================================================================== */
const Xuong = (() => {
  const BT = '```';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const view = () => document.getElementById('view');
  const $i = id => document.getElementById(id);
  const BAI_TOAN = [['1', 'Bài 1 – Hàm số y = ax² và đồ thị', 1.5], ['2', 'Bài 2 – Phương trình bậc hai, Viète', 1], ['3', 'Bài 3 – Xác suất', 1.5],
    ['4', 'Bài 4 – Thực tế đại số – hình học', 1], ['5', 'Bài 5 – Hình học không gian thực tế', 1], ['6', 'Bài 6 – Hệ phương trình thực tế', 1],
    ['7a', 'Bài 7a – Hình phẳng câu a', 1], ['7b', 'Bài 7b – Hình phẳng câu b', 1], ['7c', 'Bài 7c – Hình phẳng câu c', 1]];
  const PT = x => String(x).replace('.', ',');

  /* ---------- Mẫu JSON và hướng dẫn cho AI ---------- */
  const DAU_RA = S`ĐẦU RA BẮT BUỘC
- Chỉ trả lời bằng MỘT khối code ${BT}json duy nhất chứa toàn bộ JSON. Không viết chữ nào trước hay sau khối code. Không dùng Canvas. Không chèn số trích dẫn [1].
- Giữ nguyên tên trường như MẪU, không thêm, không đổi tên trường. "diem" là số (0.5, 1.25), luôn là bội của 0.25.`;
  const MAU_VAN = S`{"loai":"de_van","ma_de":"V01","muc_do":"TB","thoi_gian":120,"cau_truc_theo":"tên đề trong notebook làm khung",
 "doc_hieu":{"diem":6,
  "van_ban":{"ten":"Tên văn bản","tac_gia":"Tên tác giả (văn bản tự viết ghi: Người soạn đề)","the_loai":"thơ lục bát","nguon_goc":"tu_viet",
   "noi_dung":"Dòng thơ 1\nDòng thơ 2\n\nKhổ 2 – dòng 1\nKhổ 2 – dòng 2","chu_thich":["(1) giải nghĩa từ khó"]},
  "cau":[{"so":1,"diem":0.5,"dang":"the_loai","de":"Xác định thể thơ của văn bản.","goi_y":"Đếm số chữ mỗi dòng, xem cách gieo vần.","mau_cau":"Văn bản được viết theo thể thơ …","dong_ke":3,
    "dap_an":"Thể thơ lục bát.","cham":[{"y":"Xác định đúng thể thơ lục bát","diem":0.5}]}],
  "doan_van":{"so":6,"diem":2,"de":"Từ nội dung văn bản, hãy viết đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của em về …",
   "khung":["Nêu vấn đề: …","Giải thích: …","Lí lẽ 1 + dẫn chứng: …","Lí lẽ 2: …","Phản đề: …","Bài học: …"],"mau_cau":"Câu mở đầu gợi ý …",
   "cham":[{"y":"Đảm bảo hình thức đoạn văn, khoảng 200 chữ","diem":0.25},{"y":"Xác định đúng vấn đề","diem":0.25},{"y":"Triển khai vấn đề: giải thích, lí lẽ, dẫn chứng","diem":1},{"y":"Chính tả, ngữ pháp","diem":0.25},{"y":"Sáng tạo","diem":0.25}],
   "loi_hay_sai":["…"]}},
 "viet":{"diem":4,"de":"Viết bài văn (khoảng 500 chữ) phân tích, cảm nhận …","van_ban":null,
  "dan_y":{"mo_bai":["…"],"than_bai":["Ý 1: … (nội dung + nghệ thuật + dẫn chứng)","Ý 2: …","Ý 3: …"],"ket_bai":["…"]},
  "mau_cau":"Mở bài mẫu …","tu_ngu":["từ ngữ phân tích dùng được"],
  "cham":[{"y":"a) Đảm bảo bố cục mở bài – thân bài – kết bài","diem":0.25},{"y":"b) Xác định đúng vấn đề cần phân tích","diem":0.25},{"y":"c) Triển khai: … (ghi rõ từng ý và điểm)","diem":2.5},{"y":"d) Chính tả, ngữ pháp","diem":0.5},{"y":"e) Sáng tạo","diem":0.5}],
  "loi_hay_sai":["…"]},
 "checklist":["3–5 bẫy riêng của đề"]}`;
  const HD_VAN = S`VAI TRÒ
Em là giáo viên Ngữ văn luyện thi vào 10 TP.HCM kiêm giám khảo chấm thi nhiều năm, chuyên dạy học sinh lực học TRUNG BÌNH. Việc của em: TỔNG HỢP toàn bộ tài liệu trong notebook NotebookLM đã gắn (đề thi, đề minh họa, hướng dẫn chấm, đề cương, SGK Ngữ văn 9, bài văn mẫu, bài làm học sinh) để soạn MỘT đề luyện mới theo lệnh của thầy, kèm bài làm có gợi ý và hướng dẫn chấm, trả về dạng JSON.

CẤU TRÚC ĐỀ (lệnh có ghi "Cấu trúc theo" thì theo tài liệu đó; không ghi thì theo đề minh họa mới nhất trong nguồn)
- Phần I. Đọc hiểu 6,0 điểm: các câu hỏi ngắn về thể loại, chủ đề, thông điệp, bài học, tiếng Việt, biện pháp tu từ, chi tiết… và câu cuối viết đoạn văn khoảng 200 chữ.
- Phần II. Viết 4,0 điểm: bài văn khoảng 500 chữ phân tích, cảm nhận một bài thơ hoặc truyện ngắn.
- Số câu, điểm từng câu, kiểu hỏi, cách chia ý chấm: theo các đề và hướng dẫn chấm trong nguồn.

NGỮ LIỆU (bắt buộc – quy định bản quyền của web)
- Chỉ dùng: (a) tác phẩm công bố TRƯỚC NĂM 1929 (ca dao, dân ca, tục ngữ, thơ trung đại, Nguyễn Trãi, Nguyễn Du, Hồ Xuân Hương, Nguyễn Khuyến, Tú Xương, Phạm Duy Tốn…), chép đúng nguyên văn bản phổ biến; hoặc (b) văn bản em TỰ VIẾT MỚI (bài thơ 12–24 dòng hoặc truyện ngắn 350–650 chữ) theo đúng kiểu ngữ liệu, đề tài, độ dài trong các đề nguồn.
- KHÔNG chép thơ, truyện của tác giả hiện đại còn bản quyền, kể cả khi văn bản đó có trong notebook.
- Ghi "nguon_goc": "truoc_1929" hoặc "tu_viet". Phần Viết dùng lại văn bản đọc hiểu ("van_ban": null) hoặc cho một văn bản khác trong "viet.van_ban" theo cùng quy định.

DÀNH CHO HỌC SINH TRUNG BÌNH
- Câu hỏi rõ ràng, một yêu cầu mỗi câu; "dang" là một trong: the_loai, phuong_thuc, chu_de, noi_dung, chi_tiet, bien_phap, tieng_viet, thong_diep, bai_hoc, khac.
- "goi_y": cách làm câu đó (1–2 câu, không lộ đáp án). "mau_cau": câu mở đầu để học sinh viết tiếp. "dong_ke": số dòng kẻ để trả lời (3–8).
- Đoạn văn: "khung" đúng 6 bước Nêu vấn đề – Giải thích – Lí lẽ 1 + dẫn chứng – Lí lẽ 2 – Phản đề – Bài học, mỗi bước ghi gợi ý nội dung cụ thể cho đề này.
- Bài văn: "dan_y" có mở bài, thân bài 3–5 ý (mỗi ý: nội dung + nghệ thuật + dẫn chứng trích từ văn bản), kết bài; "mau_cau" là mở bài mẫu; "tu_ngu" 6–10 từ ngữ phân tích dùng được.
- "cham": các ý chấm như hướng dẫn chấm của Sở trong nguồn; ghi rõ nội dung từng ý để học sinh tự chấm. "loi_hay_sai": lỗi học sinh hay mắc.

${DAU_RA}
- Văn bản trong "noi_dung": mỗi dòng thơ cách nhau bằng \n, giữa các khổ là \n\n; truyện: các đoạn cách nhau bằng \n.
- Tổng điểm: mỗi câu = tổng "cham"; đọc hiểu = 6; viết = 4; cả đề = 10.
MẪU:
${MAU_VAN}

TỰ KIỂM trước khi xuất
1. Đáp án đúng với văn bản; mọi dẫn chứng trích đúng văn bản trong đề.
2. Cộng điểm từng câu, phần đọc hiểu (6), phần viết (4).
3. Ngữ liệu đúng quy định, "nguon_goc" đúng.
4. Không chép nguyên câu hỏi hay văn bản hiện đại nào trong nguồn.
Sai ở đâu thì sửa rồi mới xuất.`;

  const MAU_TOAN = S`{"loai":"luyen_de_toan","bai":3,
 "de":[{"ten":"tên dạng ngắn","nguon":"tên đề trong notebook làm dạng tham khảo (ghi cả đề số, cụm)","diem":1.5,
   "de":"lời dẫn của bài\na) ý a\nb) ý b","bang":[["Giá trị","1","2","3"],["Tần số","4","5","6"]],"hinh":"",
   "dap_so":"a) …; b) …",
   "loi_giai":[{"buoc":"a) nội dung học sinh phải viết để được điểm, công thức $\\dfrac{1}{4}$","diem":0.25},{"buoc":"…","diem":0.25}],
   "loi_hay_sai":["lỗi thường bị trừ điểm"]}]}`;
  const HD_TOAN = S`VAI TRÒ
Em là giáo viên luyện thi Toán vào 10 TP.HCM kiêm giám khảo chấm thi nhiều năm. Việc của em: TỔNG HỢP tài liệu trong notebook NotebookLM đã gắn (đề thi, đề minh họa, hướng dẫn chấm, đề cương, SGK Toán 9, bài tập) để soạn các ĐỀ LUYỆN cho MỘT bài của đề tuyển sinh (ví dụ Bài 3 – xác suất, 1,5 điểm). Mỗi đề đúng dạng, đúng số điểm và cách chia ý của bài đó, kèm lời giải chấm điểm từng bước, trả về dạng JSON.

CÁCH TỔNG HỢP
1. Xem bài cùng số thứ tự ở NHIỀU đề trong nguồn để biết các dạng hay ra, độ khó, bối cảnh thực tế.
2. Các đề trong một lần trả lời phải khác dạng câu hỏi hoặc bối cảnh; đổi số liệu, không chép nguyên bài nào trong nguồn.
3. Chia điểm từng bước theo hướng dẫn chấm của Sở trong nguồn; ghi đúng điều học sinh phải viết để được điểm (đặt ẩn, điều kiện, lập phương trình, lí do, kết luận có đơn vị).
4. Bài hình học: nêu đủ giả thiết bằng lời; mô tả hình trong "hinh" (web không vẽ được hình từ mô tả, thầy sẽ bổ sung hình nếu cần).

${DAU_RA}
- Mọi công thức đặt trong $...$, trong chuỗi JSON viết HAI dấu gạch: "$\\dfrac{3}{8}$", "$x \\neq 3$", "$\\Omega$". Không viết dấu < > trần trong công thức: dùng "$\\lt$", "$\\gt$", "$\\le$", "$\\ge$".
- Xuống dòng trong đề bằng \n. Bảng số liệu ghi trong "bang" (mảng các hàng), không vẽ bảng bằng kí tự.
- Tổng "diem" các bước trong "loi_giai" = "diem" của đề.
MẪU:
${MAU_TOAN}

TỰ KIỂM trước khi xuất
1. Giải lại từng đề, thay đáp số vào đề; xác suất phải nằm trong [0; 1]; kiểm đơn vị, làm tròn.
2. Cộng điểm từng đề.
3. Đủ số đề như lệnh, đúng số điểm của bài.
Sai ở đâu thì sửa rồi mới xuất.`;

  const MAU_ONTAP = S`{"loai":"on_tap_toan","ma":"OT-B3-02","bai":3,"chu_de":"Bài 3 – Xác suất","dot":2,"thoi_gian":90,
 "muc_tieu":["mục tiêu ngắn của buổi ôn"],
 "kien_thuc":["Tên kiến thức: phát biểu đúng SGK, công thức, ví dụ Xác suất của biến cố: $P(A) = \\dfrac{n(A)}{n(\\Omega)}$ khi các kết quả đồng khả năng – Lưu ý: …","(4–8 mục, đủ để làm mọi bài trong phiếu)"],
 "phan":[
  {"muc":"Cơ bản","phut":25,"bai":[{"so":1,"de":"đề bài, các ý xuống dòng bằng \n","nguon":"tên tài liệu trong notebook – đề/cụm – bài số","can_nho":"kiến thức cần nhớ để làm bài này (tên định lí, công thức)","goi_y":"gợi ý phương pháp, không lộ đáp số","dong_ke":6,
    "dap_so":"đáp số ngắn","loi_giai":["bước 1 …","bước 2 …"]}]},
  {"muc":"Khá","phut":35,"bai":[…]},
  {"muc":"Nâng cao","phut":25,"bai":[…]}],
 "tu_danh_gia":["3–5 điều học sinh tự kiểm sau buổi ôn"]}`;
  const MAU_MD_ONTAP = S`---
loai: on_tap_toan
ma: OT-B3-02
bai: 3
chu_de: Bài 3 – Xác suất
dot: 2
thoi_gian: 90
---

# Phiếu ôn tập 90 phút – Bài 3 – Xác suất (đợt 2)

## Mục tiêu
- …

## Kiến thức cần nhớ
- Tên kiến thức: phát biểu, công thức – Lưu ý: …
- (4–8 mục, đủ để làm mọi bài trong phiếu)

## Phần A – Cơ bản (25 phút)

### Bài 1
Đề bài (công thức trong $...$)
*Nguồn:* tên tài liệu – đề/cụm – bài số
*Cần nhớ:* kiến thức dùng cho bài này
> Gợi ý: …
*Dòng kẻ:* 6

## Phần B – Khá (35 phút)
…

## Phần C – Nâng cao (25 phút)
…

## Tự đánh giá
- [ ] …

## Đáp án và lời giải

### Bài 1
**Đáp số:** …
1. bước 1
2. bước 2`;
  const HD_ONTAP = (md) => S`VAI TRÒ
Em là giáo viên luyện thi Toán vào 10 TP.HCM nhiều năm. Việc của em: TÌM trong notebook NotebookLM đã gắn (đề tuyển sinh, đề tham khảo, đề minh họa, đề cương, SGK Toán 9, tài liệu chuyên đề, phiếu bài tập) các bài tập đúng MỘT chủ đề của đề tuyển sinh để lập PHIẾU ÔN TẬP cho học sinh làm trong 90 phút, xếp từ cơ bản đến nâng cao, kèm gợi ý và lời giải.

CÁCH LẬP PHIẾU
1. Chỉ lấy bài đúng chủ đề trong lệnh; tìm ở NHIỀU tài liệu khác nhau, không lấy quá 2 bài từ cùng một đề.
2. Xếp ba phần: Cơ bản (nhận biết dạng, áp dụng trực tiếp) → Khá (bài đúng mức đề tuyển sinh) → Nâng cao (câu khó nhất của chủ đề trong các đề). Số bài, số phút từng phần theo lệnh; tổng phút các phần + thời gian soát = 90.
3. Lệnh ghi "giữ nguyên đề gốc" thì chép đúng đề và ghi nguồn CHÍNH XÁC (tên tài liệu – đề số/cụm – bài số); lệnh ghi "đổi số liệu" thì đổi số liệu, bối cảnh và vẫn ghi nguồn dạng tham khảo.
4. MỖI ĐỢT PHẢI KHÁC các đợt trước: không lấy lại bài nào trong danh sách "Đã dùng" của lệnh, kể cả bài giống hệt nhưng ở tài liệu khác; ưu tiên tài liệu và dạng bài chưa dùng.
5. Mỗi bài có "goi_y" (một câu, không lộ đáp số), "dong_ke" (số dòng kẻ để làm, 4–14), "dap_so" ngắn và "loi_giai" chia bước như bài thi.
6. "tu_danh_gia": điều học sinh tự kiểm sau buổi ôn.

KIẾN THỨC CẦN NHỚ (bắt buộc, đặt đầu phiếu)
- Nhắc lại ĐẦY ĐỦ kiến thức cần nhớ để làm được MỌI bài trong phiếu: định nghĩa, định lí, tính chất, công thức, quy tắc, cách trình bày; đúng thuật ngữ và kí hiệu SGK Toán 9 (GDPT 2018) trong nguồn.
- 4–8 mục, xếp theo thứ tự dùng trong phiếu; mỗi mục: tên kiến thức – phát biểu ngắn gọn hoặc công thức – lưu ý hay sai (nếu có).
- Chủ đề hình học: chỉ nhắc kiến thức được dùng trực tiếp theo quy định chấm thi; kiến thức phải chứng minh lại thì ghi rõ "phải chứng minh lại".
- Mỗi bài có "can_nho": chỉ ra kiến thức nào trong mục trên dùng cho bài đó (một dòng).

${md ? S`ĐẦU RA BẮT BUỘC (MARKDOWN)
- Chỉ trả lời bằng MỘT khối code ${BT}markdown duy nhất. Không viết chữ nào trước hay sau khối code. Không dùng Canvas. Không chèn số trích dẫn [1].
- Giữ đúng các dòng đầu (khối ---), đúng tên các mục ##, ### như MẪU; bài đánh số liên tục 1, 2, 3… qua các phần; mục "Đáp án và lời giải" có đủ mọi bài.
- Công thức trong $...$ (một dấu gạch: $\dfrac{3}{8}$). Không dùng bảng Markdown; bảng số liệu viết thành dòng "Giá trị: 1, 2, 3 | Tần số: 4, 5, 6".
MẪU:
${MAU_MD_ONTAP}` : S`${DAU_RA}
- Mọi công thức đặt trong $...$, trong chuỗi JSON viết HAI dấu gạch: "$\\dfrac{3}{8}$", "$\\Omega$". Không viết dấu < > trần trong công thức: dùng "$\\lt$", "$\\gt$", "$\\le$", "$\\ge$". Xuống dòng trong đề bằng \n.
- Bài đánh số liên tục 1, 2, 3… qua các phần.
MẪU:
${MAU_ONTAP}`}

TỰ KIỂM trước khi xuất
1. Giải lại từng bài, đối chiếu đáp số với lời giải trong nguồn (nếu có).
2. Đúng chủ đề, đúng số bài và số phút từng phần; độ khó tăng dần.
3. Không bài nào trùng danh sách "Đã dùng", không hai bài trùng nhau trong phiếu.
4. Mục kiến thức cần nhớ đủ để làm mọi bài; mỗi bài có "can_nho".
Sai ở đâu thì sửa rồi mới xuất.`;

  const MAU_BAIHOC = S`{"loai":"bai_hoc","lop":10,"bai":16,"ten_bai":"Hàm số bậc hai","nguon":"SGK Toán 10 KNTT tập 2 – Bài 16; SBT Toán 10 KNTT – Bài 16",
 "muc_tieu":["2–4 điều học sinh làm được sau bài"],
 "bai_giang":[{"tieu_de":"1. Tên mục như SGK","noi_dung":"Định nghĩa, công thức của mục: hàm số $y = ax^2 + bx + c$ với $a \\ne 0$.\n- ý liệt kê 1\n- ý liệt kê 2",
   "vi_du":[{"de":"đề ví dụ","loi_giai":["bước 1 …","bước 2 …"],"dap_so":"đáp số ngắn"}],"luu_y":"lỗi học sinh hay sai ở mục này"}],
 "can_nho":["Tên kiến thức – công thức hoặc phát biểu – lưu ý hay sai","(4–8 mục)"],
 "trac_nghiem":[{"cau":"câu hỏi","phuong_an":["…","…","…","…"],"dap_an":"B","giai_thich":"vì sao B đúng, các phương án kia sai ở đâu","muc":"NB"}],
 "dung_sai":[{"cau":"lời dẫn chung","y":[{"noi_dung":"ý a","dung":true},{"noi_dung":"ý b","dung":false},{"noi_dung":"ý c","dung":true},{"noi_dung":"ý d","dung":false}],"giai_thich":"a) … b) … c) … d) …"}],
 "tra_loi_ngan":[{"cau":"câu hỏi có đáp số là một số (ghi rõ làm tròn nếu cần)","dap_an":"2,5","giai_thich":"lời giải ngắn"}]}`;
  const HD_BAIHOC = S`VAI TRÒ
Em là giáo viên Toán giỏi, dạy đúng SGK Toán bộ "Kết nối tri thức với cuộc sống" (chương trình GDPT 2018). Việc của em: dựa vào tài liệu trong notebook NotebookLM đã gắn (SGK Toán 9, 10, 11, 12 Kết nối tri thức, sách bài tập, sách giáo viên, tài liệu của thầy cô) để soạn BÀI GIẢNG và BÀI LUYỆN TẬP ONLINE cho đúng MỘT bài SGK theo lệnh, cho học sinh tự học trên web, trả về dạng JSON.

BÀI GIẢNG (bám SGK)
1. Tìm đúng bài trong SGK theo lớp, số bài, tên bài của lệnh. Đi đúng thứ tự các mục của bài trong SGK; mỗi mục là một phần tử "bai_giang", tiêu đề đánh số như SGK ("1. …", "2. …").
2. "noi_dung": định nghĩa, định lí, tính chất, công thức, quy tắc của mục; đúng thuật ngữ và kí hiệu SGK. Viết lại ngắn gọn bằng lời của em, KHÔNG chép nguyên văn đoạn dài của sách. Ý liệt kê đặt đầu dòng "- ".
3. Mỗi mục 1–2 "vi_du" do em soạn (hoặc đổi số liệu ví dụ của SGK); "loi_giai" chia bước như học sinh trình bày; có "dap_so". "luu_y": lỗi học sinh hay sai ở mục đó.
4. "muc_tieu": 2–4 điều học sinh làm được sau bài, theo yêu cầu cần đạt của chương trình.
5. "can_nho" (bắt buộc): nhắc lại 4–8 kiến thức cần nhớ để làm được bài luyện tập; mỗi mục: tên – công thức hoặc phát biểu – lưu ý hay sai.
6. Chỉ dùng kiến thức đến hết bài này (không dùng kiến thức của bài sau). Không ghi số trang, số bài tập nếu không đọc được chắc chắn trong nguồn.

LUYỆN TẬP ONLINE (ba dạng câu hỏi của đề thi tốt nghiệp THPT)
- "trac_nghiem": 4 phương án, chỉ 1 phương án đúng; phương án nhiễu lấy từ lỗi học sinh hay mắc; "dap_an" là chữ A, B, C hoặc D ứng với vị trí trong "phuong_an" (không ghi "A." trong phương án); rải đều đáp án A, B, C, D. "muc": NB (nhận biết), TH (thông hiểu) hoặc VD (vận dụng).
- "dung_sai": mỗi câu một lời dẫn chung và đúng 4 ý a, b, c, d (không ghi "a)" trong nội dung), khó dần từ a đến d; "dung" là true hoặc false; mỗi câu có cả ý đúng và ý sai; "giai_thich" giải thích từng ý.
- "tra_loi_ngan": đáp số là MỘT số, tối đa 4 kí tự kể cả dấu phẩy và dấu trừ, dùng dấu phẩy thập phân ("2,5", "-3", "0,25"); đáp số không nguyên thì đề ghi rõ "làm tròn đến hàng …".
- Số câu, mức độ theo lệnh; xếp từ dễ đến khó. Câu hỏi do em soạn hoặc đổi số liệu từ bài tập trong nguồn, không chép nguyên câu. Lớp 9 cũng dùng ba dạng này, độ khó theo SGK Toán 9.

ĐẦU RA BẮT BUỘC
- Chỉ trả lời bằng MỘT khối code ${BT}json duy nhất chứa toàn bộ JSON. Không viết chữ nào trước hay sau khối code. Không dùng Canvas. Không chèn số trích dẫn [1].
- Giữ nguyên tên trường như MẪU, không thêm, không đổi tên trường. "lop", "bai" là số; "dung" là true hoặc false (không có dấu nháy).
- Mọi công thức đặt trong $...$, trong chuỗi JSON viết HAI dấu gạch: "$\\dfrac{3}{8}$", "$x \\neq 3$", "$\\sqrt{2}$". Không viết dấu < > trần trong công thức: dùng "$\\lt$", "$\\gt$", "$\\le$", "$\\ge$". Xuống dòng bằng \n.
MẪU:
${MAU_BAIHOC}

TỰ KIỂM trước khi xuất
1. Giải lại mọi ví dụ, mọi câu hỏi; thay đáp số vào đề. Trắc nghiệm chỉ một phương án đúng và "dap_an" chỉ đúng vị trí đó; từng ý đúng – sai kết luận đúng.
2. Đáp số trả lời ngắn là một số, tối đa 4 kí tự.
3. Đúng tên bài và thứ tự các mục như SGK; "can_nho" đủ để làm mọi câu luyện tập.
4. Không chép nguyên văn đoạn dài của SGK hay nguyên câu hỏi trong nguồn.
Sai ở đâu thì sửa rồi mới xuất.`;
  function lenhBaiHoc(o, k) {
    const ds = BaiHoc.all(+o.lop), i0 = ds.findIndex(b => b.so === +o.bai), b = ds[i0 + k];
    if (!b) return '';
    const co = BaiHoc.get(+o.lop, b.so), cu = co ? [...co.tn, ...co.ds, ...co.tln].map(q => String(q.q).replace(/\\\(|\\\)|\\\[|\\\]/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 70)) : [];
    return [`Bài giảng – luyện tập online | Toán ${o.lop} – Kết nối tri thức với cuộc sống | Bài ${b.so}. ${b.ten} (Chương ${b.chuong.so}. ${b.chuong.ten}, Tập ${b.chuong.tap})`,
      `Học sinh: ${{ TB: 'lực học trung bình – câu hỏi rõ, nhiều câu nhận biết, thông hiểu', KHA: 'lực học khá', GIOI: 'lực học khá, giỏi – tăng câu vận dụng' }[o.muc] || o.muc}`,
      '- Bài giảng: đủ các mục của bài theo SGK; mỗi mục có kiến thức, ví dụ kèm lời giải, lưu ý hay sai; nhắc lại 4–8 kiến thức cần nhớ.',
      `- Phần I trắc nghiệm: ${o.n1} câu (khoảng 40% NB, 40% TH, 20% VD)`, `- Phần II đúng – sai: ${o.n2} câu, mỗi câu 4 ý`, `- Phần III trả lời ngắn: ${o.n3} câu`,
      o.rieng ? `Yêu cầu riêng: ${o.rieng}` : '',
      cu.length ? `Bài này đã có trên web (bài giảng giữ nguyên) – bản này sẽ thành bộ câu luyện tập mới: soạn câu hỏi MỚI, khác hẳn các câu đã có (câu trùng bị bỏ):\n${cu.map(x => '- ' + x).join('\n')}` : '',
      `Trả về đúng một khối ${BT}json theo mẫu trong hướng dẫn ("loai":"bai_hoc", "lop":${o.lop}, "bai":${b.so}, "ten_bai":"${b.ten}").`].filter(Boolean).join('\n');
  }

  /* ---------- Sổ tay công thức tra cứu Toán vào 10 (thầy yêu cầu 11/11/2026) ---------- */
  const MAU_SOTAY = S`{"loai":"so_tay_toan","chu_de":"2","nguon":"SGK Toán 9 KNTT tập 2 – Chương VI; đề tuyển sinh 10 TP.HCM các năm trong notebook",
 "tong_quan":"Đề TP.HCM: Bài 2 (1 điểm) – thường hỏi chứng minh phương trình có nghiệm rồi tính giá trị biểu thức của hai nghiệm.",
 "tra_nhanh":[{"hoi":"Đề hỏi $x_1^2 + x_2^2$","dap":"Viết thành $(x_1 + x_2)^2 - 2x_1x_2$ rồi thay tổng, tích theo Viète"},{"hoi":"Thấy $a$ và $c$ trái dấu","dap":"$ac \\lt 0$ nên phương trình luôn có hai nghiệm phân biệt (trái dấu)"}],
 "dang":[{"ten":"Dạng 1. Tính giá trị biểu thức đối xứng của hai nghiệm","muc":"co_ban",
   "nhan_dien":"Cho phương trình bậc hai, yêu cầu tính biểu thức của $x_1, x_2$ mà không giải phương trình",
   "cong_thuc":[{"ten":"Định lí Viète","ct":"$x_1 + x_2 = -\\dfrac{b}{a}$; $x_1x_2 = \\dfrac{c}{a}$","dieu_kien":"phương trình có hai nghiệm: $a \\ne 0$, $\\Delta \\ge 0$","ghi_chu":"tổng đổi dấu $b$, tích giữ dấu $c$"},
     {"ten":"Tổng bình phương","ct":"$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2$","dieu_kien":"","ghi_chu":""}],
   "cach_lam":["Chứng tỏ phương trình có hai nghiệm ($\\Delta \\ge 0$ hoặc $ac \\lt 0$)","Viết tổng $S$, tích $P$ theo Viète","Biến đổi biểu thức về $S$, $P$ rồi thay số"],
   "meo_nho":"Tổng đổi dấu, tích giữ nguyên: $S = -\\dfrac{b}{a}$, $P = \\dfrac{c}{a}$.",
   "loi_hay_sai":["Không kiểm tra phương trình có nghiệm trước khi dùng Viète (bị trừ điểm)","Quên dấu trừ ở tổng $-\\dfrac{b}{a}$"],
   "vi_du":{"de":"Cho $x^2 - 5x + 3 = 0$ có hai nghiệm $x_1, x_2$. Tính $x_1^2 + x_2^2$.","loi_giai":["$\\Delta = 13 \\gt 0$ nên phương trình có hai nghiệm phân biệt","$S = 5$, $P = 3$","$x_1^2 + x_2^2 = S^2 - 2P = 25 - 6 = 19$"],"dap_so":"19"}}]}`;
  // Phạm vi gợi ý cho từng chủ đề (AI vẫn phải rà thêm mọi dạng thấy trong đề tuyển sinh)
  const GOI_Y_SOTAY = {
    nen: S`căn bậc hai, căn bậc ba và các phép biến đổi; hằng đẳng thức đáng nhớ; phân tích đa thức thành nhân tử; rút gọn biểu thức; phương trình, bất phương trình bậc nhất một ẩn; làm tròn số; đổi đơn vị đo (độ dài, diện tích, thể tích, khối lượng, thời gian, vận tốc); tỉ lệ thức, tỉ lệ thuận – nghịch, phần trăm`,
    1: S`hàm số $y = ax^2$ ($a \ne 0$): tính chất, bảng giá trị, vẽ đồ thị; điểm thuộc đồ thị, tìm hệ số $a$; đường thẳng $y = ax + b$ (hệ số góc, vị trí tương đối); tọa độ giao điểm parabol – đường thẳng bằng phép tính; bài toán thực tế dùng $y = ax^2$`,
    2: S`công thức nghiệm, công thức nghiệm thu gọn; nhẩm nghiệm ($a + b + c = 0$, $a - b + c = 0$); định lí Viète và biểu thức đối xứng; tìm hai số biết tổng và tích; điều kiện có nghiệm, dấu các nghiệm; phương trình quy về bậc hai (tích, chứa ẩn ở mẫu, trùng phương); bài có tham số $m$ (nếu đề tuyển sinh có)`,
    3: S`phép thử, không gian mẫu, biến cố; xác suất của biến cố (kết quả đồng khả năng); liệt kê bằng bảng, sơ đồ cây; bảng tần số, tần số tương đối, biểu đồ; bảng ghép nhóm; xác suất thực nghiệm`,
    4: S`phần trăm, tăng giảm phần trăm liên tiếp, giảm giá, thuế, lãi suất; hàm số bậc nhất trong thực tế (cước phí, giá điện bậc thang, nhiệt độ); chuyển động, năng suất, nồng độ; tỉ lệ bản đồ; hình học thực tế (định lí Pythagore, tỉ số lượng giác đo chiều cao, khoảng cách, diện tích, chu vi)`,
    5: S`hình trụ, hình nón, hình cầu (diện tích xung quanh, diện tích toàn phần, thể tích); hình lăng trụ đứng, hình chóp đều (nếu đề có); đổi lít – dm³ – cm³ – m³; bài đổ nước, nhúng vật, tính số lượng vật liệu; làm tròn, giá trị $\pi$ lấy theo đề`,
    6: S`hệ hai phương trình bậc nhất hai ẩn (thế, cộng đại số, máy tính cầm tay); các bước giải bài toán bằng cách lập hệ; dạng chuyển động (xuôi – ngược dòng), năng suất, phần trăm, mua bán, tìm số, hình học; đặt điều kiện ẩn, đối chiếu, kết luận`,
    7: S`đường tròn, tiếp tuyến và tính chất hai tiếp tuyến cắt nhau; góc ở tâm, góc nội tiếp và các hệ quả; tứ giác nội tiếp (chỉ cách chứng minh được phép); tam giác đồng dạng và hệ thức tích đoạn thẳng; hệ thức lượng, tỉ số lượng giác trong tam giác vuông (lưu ý phải chứng minh lại); đường tròn ngoại tiếp, nội tiếp tam giác, đa giác đều; độ dài cung, diện tích hình quạt, hình vành khuyên; chiến lược câu a – b – c (câu sau dùng kết quả câu trước)`,
  };
  const HD_SOTAY = S`VAI TRÒ
Em là giáo viên Toán THCS giỏi, nhiều năm luyện thi vào lớp 10 TP.HCM. Dựa vào tài liệu trong notebook NotebookLM đã gắn (SGK Toán 6–9 Kết nối tri thức với cuộc sống, các đề tuyển sinh 10 TP.HCM, đề tham khảo của Sở GD&ĐT, đề các quận, huyện, tài liệu ôn thi của thầy cô) để soạn MỘT CHỦ ĐỀ của SỔ TAY CÔNG THỨC TRA CỨU cho học sinh ôn thi vào 10, trả về dạng JSON.

CÁCH SOẠN – ĐẦY ĐỦ VÀ CÓ HỆ THỐNG
1. Rà toàn bộ đề tuyển sinh và tài liệu trong notebook, liệt kê MỌI DẠNG BÀI của chủ đề đã ra hoặc có thể ra; gộp dạng giống nhau; xếp từ cơ bản → khá → nâng cao. Mỗi dạng là một phần tử "dang", tên ngắn, đánh số "Dạng 1. …". Không bỏ sót dạng nào đã có trong đề tuyển sinh.
2. "nhan_dien": dấu hiệu trong đề cho biết bài thuộc dạng này (câu hỏi, từ khoá hay gặp).
3. "cong_thuc": đủ MỌI công thức, định lí, quy tắc dùng trong dạng; mỗi mục có "ten", "ct" (công thức trong $...$), "dieu_kien" (khi nào được dùng; bỏ trống nếu không có), "ghi_chu" (đơn vị, trường hợp đặc biệt, cách nhớ chiều biến đổi). Đúng kí hiệu, thuật ngữ SGK chương trình 2018; không ghi kiến thức đã bỏ khỏi chương trình.
4. "cach_lam": các bước giải ngắn gọn, đúng trình tự học sinh trình bày trong bài thi.
5. "meo_nho": MỘT câu mẹo nhớ ngắn, dễ thuộc (câu vần, hình ảnh, liên tưởng). Mẹo phải đúng toán học, không làm học sinh hiểu sai.
6. "loi_hay_sai": 2–4 lỗi học sinh hay mắc ở dạng này (bị trừ điểm vì đâu).
7. "vi_du" (khi lệnh yêu cầu): một ví dụ ngắn, đổi số liệu từ đề thật; "loi_giai" chia bước; "dap_so". Giải lại để chắc đáp số đúng.
8. "muc": "co_ban", "kha" hoặc "nang_cao".
9. "tra_nhanh": 6–15 dòng "thấy gì trong đề – dùng gì" để học sinh tra khi bí.
10. "tong_quan": 1–2 câu cho biết chủ đề này chiếm bao nhiêu điểm, thường hỏi gì trong đề tuyển sinh TP.HCM (chỉ ghi điều thấy trong nguồn).
11. Viết lại ngắn gọn bằng lời của em, KHÔNG chép nguyên văn đoạn dài của sách hay tài liệu. "nguon": tên các tài liệu đã dựa vào; không bịa số trang, năm đề, số bài nếu không thấy rõ trong nguồn.

HÌNH HỌC PHẲNG: theo quy định chấm thống nhất của Sở GD&ĐT TP.HCM ghi trong lệnh. Kiến thức "phải chứng minh lại" vẫn ghi vào sổ tay nhưng "ghi_chu" phải nói rõ "phải chứng minh lại khi dùng" kèm cách chứng minh ngắn; kiến thức "không được dùng" chỉ ghi trong "loi_hay_sai" như một lỗi cần tránh.

ĐẦU RA BẮT BUỘC
- Chỉ trả lời bằng MỘT khối code ${BT}json duy nhất chứa toàn bộ JSON. Không viết chữ nào trước hay sau khối code. Không dùng Canvas. Không chèn số trích dẫn [1].
- Giữ nguyên tên trường như MẪU, không thêm, không đổi tên trường.
- Mọi công thức đặt trong $...$, trong chuỗi JSON viết HAI dấu gạch: "$\\dfrac{3}{8}$", "$x \\neq 3$", "$\\sqrt{2}$". Không viết dấu < > trần trong công thức: dùng "$\\lt$", "$\\gt$", "$\\le$", "$\\ge$". Xuống dòng bằng \n.
MẪU (chỉ minh họa một dạng – bài thật phải đủ mọi dạng):
${MAU_SOTAY}

TỰ KIỂM trước khi xuất
1. Thử từng công thức bằng một bộ số cụ thể; điều kiện dùng đầy đủ; đơn vị đúng.
2. Mẹo nhớ không sai toán học. Ví dụ đúng đáp số.
3. Đối chiếu từng đề tuyển sinh trong notebook: mọi câu thuộc chủ đề này đều rơi vào một dạng trong sổ tay. Thiếu thì bổ sung dạng.
4. Không có hai dạng trùng nhau; không chép nguyên văn sách.
Sai ở đâu thì sửa rồi mới xuất.`;
  function lenhSoTay(o, cd) {
    const ten = SoTay.TEN[cd], co = SoTay.tenDang(cd);
    const rules = cd === '7' && typeof App !== 'undefined' && App.RULES ? `QUY ĐỊNH CHẤM THỐNG NHẤT CỦA SỞ GD&ĐT TP.HCM\nKhông được dùng trực tiếp (dùng là trừ điểm bước đó):\n${App.RULES.no.map(x => '- ' + x).join('\n')}\nĐược dùng trực tiếp:\n${App.RULES.yes.map(x => '- ' + x).join('\n')}` : '';
    return [`Sổ tay công thức tra cứu Toán vào 10 TP.HCM | Chủ đề: ${ten} | "chu_de":"${cd}"`,
      `Học sinh dùng: ${{ TB: 'lực học trung bình – viết thật dễ hiểu, nhiều dạng cơ bản', KHA: 'lực học khá – đủ cơ bản đến nâng cao', GIOI: 'lực học khá, giỏi – thêm các dạng nâng cao, câu hỏi phân loại' }[o.muc] || o.muc}.`,
      `Phạm vi cần rà (không giới hạn ở đây, thêm mọi dạng thấy trong đề tuyển sinh): ${GOI_Y_SOTAY[cd]}.`,
      `Tối thiểu ${o.min} dạng, càng đầy đủ càng tốt; mỗi dạng đủ nhận diện, công thức, cách làm, mẹo nhớ, lỗi hay sai.`,
      o.vd ? '- Mỗi dạng có một "vi_du" ngắn kèm lời giải chia bước.' : '- Không cần "vi_du" (bỏ trường này) để sổ tay gọn.',
      '- "tra_nhanh": 6–15 dòng "thấy gì – dùng gì".',
      rules,
      o.rieng ? `Yêu cầu riêng: ${o.rieng}` : '',
      co.length ? `Sổ tay ĐÃ CÓ các dạng sau – CHỈ soạn các dạng CÒN THIẾU (dạng trùng tên sẽ bị bỏ khi nhập):\n${co.map(x => '- ' + x).join('\n')}` : '',
      `Trả về đúng một khối ${BT}json theo mẫu trong hướng dẫn ("loai":"so_tay_toan", "chu_de":"${cd}").`].filter(Boolean).join('\n');
  }

  const SUA = (loai, loi) => S`Câu trả lời vừa rồi chưa đúng mẫu hoặc còn lỗi. Giữ nguyên nội dung vừa soạn (không đổi văn bản, số liệu), sửa các lỗi sau rồi viết lại TOÀN BỘ thành MỘT khối ${BT}json đúng mẫu:
${loi && loi.length ? loi.map(x => '- ' + x).join('\n') : '- Sai tên trường, thiếu phần chấm điểm hoặc thiếu dấu \\\\ của công thức.'}

${DAU_RA}
MẪU:
${loai === 'de_van' ? MAU_VAN : loai === 'on_tap_toan' ? MAU_ONTAP : loai === 'bai_hoc' ? MAU_BAIHOC : loai === 'so_tay_toan' ? MAU_SOTAY : MAU_TOAN}`;

  function lenhVan(o, k) {
    const ma = o.tien + String(o.so + k).padStart(2, '0');
    const tho = o.viet === 'tho' || (o.viet === 'xen' && k % 2 === 0);
    const ngl = { tu: 'văn bản tự viết mới', cu: 'tác phẩm công bố trước 1929', ai: 'tác phẩm trước 1929 hoặc văn bản tự viết (theo quy định)' }[o.ngl];
    return [`Mã đề: ${ma} | Cấu trúc theo: ${o.theo || 'cấu trúc chung của các đề nguồn'} | Mức: ${o.muc} | Thời gian: 120 phút`,
      `Phần Viết: phân tích, cảm nhận ${tho ? 'một bài thơ' : 'một truyện ngắn'}. Ngữ liệu: ${ngl}.`,
      'Tổng hợp các đề, hướng dẫn chấm, bài văn mẫu trong notebook để soạn đề mới dành cho học sinh lực học trung bình; không chép nguyên câu hỏi nào.',
      o.rieng ? `Yêu cầu riêng: ${o.rieng}` : '',
      `Trả về đúng một khối ${BT}json theo mẫu trong hướng dẫn ("loai":"de_van", "ma_de":"${ma}", đủ gợi ý, khung đoạn văn, dàn ý, hướng dẫn chấm).`].filter(Boolean).join('\n');
  }
  function lenhOnTap(o, k) {
    const b = BAI_TOAN.find(x => x[0] === o.bai), dot = o.dot + k, ma = `OT-B${o.bai.toUpperCase()}-${String(dot).padStart(2, '0')}`;
    const tl = o.tl.split('\n').map(x => x.trim()).filter(Boolean), uu = tl.length ? Array.from({ length: Math.min(4, tl.length) }, (_, i) => tl[((dot - 1) * 3 + i) % tl.length]) : [];
    const dung = [...OnTap.daDung(o.bai), ...o.them.split('\n').map(x => x.trim()).filter(Boolean)].slice(-80);
    const soat = 90 - o.p1 - o.p2 - o.p3;
    return [`Phiếu ôn tập 90 phút | Chủ đề: ${b[1]} (${PT(b[2])} điểm trong đề tuyển sinh) | Đợt: ${dot} | Mã: ${ma} | Định dạng: ${o.dd === 'md' ? 'Markdown' : 'JSON'}`,
      'Tìm trong notebook các bài tập đúng chủ đề này, xếp từ cơ bản đến nâng cao:',
      '- Đầu phiếu: nhắc lại đầy đủ kiến thức cần nhớ để làm các bài này (định nghĩa, định lí, công thức, lưu ý hay sai); mỗi bài ghi kiến thức cần nhớ của bài đó.',
      `- Phần A – Cơ bản: ${o.n1} bài, ${o.p1} phút`, `- Phần B – Khá: ${o.n2} bài, ${o.p2} phút`, `- Phần C – Nâng cao: ${o.n3} bài, ${o.p3} phút`, `- Soát bài: ${soat} phút (tổng 90 phút)`,
      o.goc === 'giu' ? 'Bài lấy từ tài liệu: giữ nguyên đề gốc, ghi nguồn chính xác (tên tài liệu – đề/cụm – bài số).' : 'Bài lấy từ tài liệu: đổi số liệu và bối cảnh, ghi nguồn dạng tham khảo.',
      `Đợt ${dot} phải KHÁC các đợt trước: không lấy lại bài nào trong danh sách "Đã dùng"; ưu tiên tài liệu và dạng bài chưa dùng.`,
      uu.length ? `Ưu tiên tìm trong: ${uu.join('; ')}.` : '',
      o.rieng ? `Yêu cầu riêng: ${o.rieng}` : '',
      dung.length ? `Đã dùng (không lấy lại):\n${dung.map(x => '- ' + x).join('\n')}` : 'Đã dùng: chưa có (đợt đầu).',
      o.dd === 'md' ? `Trả về đúng một khối ${BT}markdown theo MẪU MARKDOWN trong hướng dẫn (loai: on_tap_toan, ma: ${ma}, bai: ${o.bai}, dot: ${dot}).`
        : `Trả về đúng một khối ${BT}json theo mẫu trong hướng dẫn ("loai":"on_tap_toan", "ma":"${ma}", "bai":${/^\d+$/.test(o.bai) ? o.bai : `"${o.bai}"`}, "dot":${dot}).`].filter(Boolean).join('\n');
  }
  function lenhToan(o, k) {
    const b = BAI_TOAN.find(x => x[0] === o.bai), a = o.so + k * o.moi, z = a + o.moi - 1;
    return [`Bài: ${b[1]} (${PT(b[2])} điểm) | Đề số ${a}–${z} (${o.moi} đề) | Mức: ${o.muc} | Cấu trúc theo: ${o.theo || 'các đề tuyển sinh và đề tham khảo trong notebook'}`,
      `Tổng hợp các đề, hướng dẫn chấm và bài tập trong notebook; mỗi đề đúng dạng ${b[1].split(' – ')[0]} của đề tuyển sinh, ${PT(b[2])} điểm; đổi số liệu và bối cảnh; các đề khác nhau về dạng câu hỏi.`,
      o.rieng ? `Yêu cầu riêng: ${o.rieng}` : '',
      `Trả về đúng một khối ${BT}json theo mẫu trong hướng dẫn ("loai":"luyen_de_toan", "bai":${/^\d+$/.test(o.bai) ? o.bai : `"${o.bai}"`}, đủ ${o.moi} đề, "loi_giai" chia bước, công thức trong $...$).`].filter(Boolean).join('\n');
  }

  /* ---------- Giao diện ---------- */
  const shell = (back, body) => `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="${back}">← ${back === '#/' ? 'Chọn lớp' : 'Xưởng dữ liệu'}</a></div>${body}</main>`;
  const box = (id, title, text, note) => `<div class="card xw-box"><div class="xw-h"><b>${title}</b><button class="btn" type="button" data-copy="${id}">📋 Chép</button></div>
    ${note ? `<p class="muted">${note}</p>` : ''}<textarea id="${id}" class="xw-ta" readonly rows="8">${esc(text)}</textarea></div>`;
  function bindCopy(root) {
    root.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
      const ok = await U.copy($i(b.dataset.copy).value);
      U.toast(ok ? 'Đã chép. Dán vào Gem (hoặc NotebookLM) và gửi.' : 'Không chép được – chọn chữ trong ô rồi chép tay.');
    }));
  }
  function download(name, text, type = 'application/json') {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function home() {
    const loc = NhapDL.local();
    const he = NhapDL.items.filter(x => x.src === 'he-thong');
    view().innerHTML = shell('#/', `<section class="card hero"><p class="pill">🧰 Dành cho thầy cô</p><h2>Xưởng dữ liệu</h2>
      <p>Tài liệu nằm ở <b>NotebookLM</b>. Web tạo sẵn prompt để AI tổng hợp tài liệu và trả về <b>JSON đúng mẫu</b>; dán JSON vào đây là có đề in PDF ngay.</p>
      <ol class="xw-steps"><li><b>Menu prompt:</b> chọn loại dữ liệu, chép <i>Hướng dẫn Gem</i> (dán một lần khi tạo Gem có gắn notebook) và <i>Lệnh</i> từng đề.</li>
        <li><b>Gửi lệnh</b> trong Gem, bấm nút sao chép của khối ${BT}json.</li>
        <li><b>Nhập dữ liệu:</b> dán vào đây → web tự sửa lỗi hay gặp, kiểm điểm, cho xem trước và in PDF → <i>Lưu trên máy này</i>.</li>
        <li><b>Đưa lên hệ thống cho mọi học sinh:</b> bấm <i>Tải tệp chuẩn</i>, chép tệp vào thư mục <code>nhap/</code> của dự án rồi chạy <code>python3 tools/nhap-du-lieu.py</code> (hoặc nhắn Claude "nhập dữ liệu mới"), đẩy lên GitHub.</li></ol></section>
      <div class="two"><a class="card link-card" href="#/xuong/prompt"><span class="big">🧾</span><b>Menu prompt</b><span>Ngữ văn vào 10 · Toán luyện đề theo bài · Phiếu ôn tập 90 phút · Sổ tay công thức vào 10 · Bài giảng lớp 9–12</span></a>
        <a class="card link-card" href="#/xuong/nhap"><span class="big">📥</span><b>Nhập dữ liệu</b><span>Dán câu trả lời AI hoặc kéo tệp .json</span></a></div>
      ${/^https?:$/.test(location.protocol) ? `<div class="two"><a class="card link-card" href="cong-cu/soan-bai-hoc.html" target="_blank" rel="noopener"><span class="big">✏️</span><b>Trình soạn thảo bài học</b><span>Soạn, quản lý JSON bài giảng, đồng bộ Google Sheets, đưa bài lên web để trình chiếu</span></a></div>` : ''}
      <h2 class="sec">Đã lưu trên máy này (${loc.length})</h2>
      ${loc.length ? `<div class="card"><ul class="xw-list">${loc.map(x => { const r = NhapDL.check(x.json); return `<li><b>${esc(r.ten || x.key)}</b> <span class="muted">${new Date(x.luc).toLocaleString('vi-VN')}</span>
        <button class="btn ghost" type="button" data-dl="${esc(x.key)}">⬇️ Tải tệp chuẩn</button><button class="btn ghost" type="button" data-rm="${esc(x.key)}">🗑️ Xoá</button></li>`; }).join('')}</ul></div>`
        : '<p class="empty">Chưa có. Dữ liệu lưu ở đây chỉ hiện trên trình duyệt này.</p>'}
      <h2 class="sec">Đã có trong hệ thống (${he.length} tệp)</h2>
      ${he.length ? `<div class="card"><ul class="xw-list">${he.map(x => `<li><b>${esc(x.r.ten || '')}</b> <span class="muted">${esc(x.file || '')}</span>${x.r.ghep && x.r.ghep.bo > 1 ? ` <span class="chip">Bộ ${x.r.ghep.bo} · +${x.r.ghep.them} câu</span>` : x.r.ghep && !x.r.ghep.bo ? ' <span class="chip warnc">trùng hết – không thêm</span>' : ''}${x.r.errs.length ? ` <span class="chip warnc">${x.r.errs.length} lỗi – chưa hiện</span>` : ''}</li>`).join('')}</ul></div>` : '<p class="empty">Chưa có tệp nào trong data/nhap/.</p>'}`);
    view().querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { NhapDL.removeLocal(b.dataset.rm); location.reload(); }));
    view().querySelectorAll('[data-dl]').forEach(b => b.addEventListener('click', () => { const x = NhapDL.local().find(y => y.key === b.dataset.dl); if (x) download(NhapDL.fileName(x.json), JSON.stringify(x.json, null, 1)); }));
  }

  function promptPage() {
    const st = Object.assign({ loai: 'van', noi: 'gem', tien: 'V', so: 1, n: 5, muc: 'TB', viet: 'xen', ngl: 'ai', theo: '', rieng: '', bai: '3', moi: 5, lan: 2, mucT: 'KHA' }, U.get('xuong:prompt', {}));
    view().innerHTML = shell('#/xuong', `<section class="card hero"><h2>🧾 Menu prompt</h2><p>Chọn loại dữ liệu và các lựa chọn. Lần đầu: tạo một Gem trong Gemini, dán <b>Hướng dẫn Gem</b> vào mục Hướng dẫn, mục Kiến thức gắn notebook NotebookLM. Sau đó mỗi lần chỉ cần dán <b>Lệnh</b>.</p></section>
      <div class="card xw-form">
        <div class="opts-row"><label class="tog"><input type="radio" name="xLoai" value="van" ${st.loai === 'van' ? 'checked' : ''}> 📖 Ngữ văn vào 10 – đề luyện</label>
          <label class="tog"><input type="radio" name="xLoai" value="toan" ${st.loai === 'toan' ? 'checked' : ''}> 📐 Toán vào 10 – đề luyện theo bài</label>
          <label class="tog"><input type="radio" name="xLoai" value="ontap" ${st.loai === 'ontap' ? 'checked' : ''}> 🗂️ Toán vào 10 – phiếu ôn tập 90 phút theo chủ đề</label>
          <label class="tog"><input type="radio" name="xLoai" value="sotay" ${st.loai === 'sotay' ? 'checked' : ''}> 📒 Toán vào 10 – sổ tay công thức, mẹo nhớ theo dạng</label>
          <label class="tog"><input type="radio" name="xLoai" value="baihoc" ${st.loai === 'baihoc' ? 'checked' : ''}> 📚 Bài giảng – luyện tập online lớp 9–12 (SGK KNTT)</label></div>
        <div class="opts-row"><label class="tog"><input type="radio" name="xNoi" value="gem" ${st.noi === 'gem' ? 'checked' : ''}> Gem có gắn notebook (lệnh ngắn)</label>
          <label class="tog"><input type="radio" name="xNoi" value="nb" ${st.noi === 'nb' ? 'checked' : ''}> Dán thẳng vào NotebookLM (lệnh đầy đủ)</label></div>
        <div class="xw-grid" id="xVan">
          <label>Kí hiệu mã đề <input id="xTien" value="${esc(st.tien)}" maxlength="4"></label><label>Bắt đầu từ số <input id="xSo" type="number" min="0" value="${st.so}"></label>
          <label>Số đề <input id="xN" type="number" min="1" max="20" value="${st.n}"></label>
          <label>Mức <select id="xMuc"><option ${st.muc === 'TB' ? 'selected' : ''}>TB</option><option ${st.muc === 'KHA' ? 'selected' : ''}>KHA</option></select></label>
          <label>Phần Viết <select id="xViet"><option value="xen" ${st.viet === 'xen' ? 'selected' : ''}>Xen kẽ thơ / truyện</option><option value="tho" ${st.viet === 'tho' ? 'selected' : ''}>Phân tích thơ</option><option value="truyen" ${st.viet === 'truyen' ? 'selected' : ''}>Phân tích truyện ngắn</option></select></label>
          <label>Ngữ liệu <select id="xNgl"><option value="ai" ${st.ngl === 'ai' ? 'selected' : ''}>Trước 1929 hoặc tự viết</option><option value="tu" ${st.ngl === 'tu' ? 'selected' : ''}>Văn bản tự viết mới</option><option value="cu" ${st.ngl === 'cu' ? 'selected' : ''}>Tác phẩm trước 1929</option></select></label></div>
        <div class="xw-grid" id="xToan">
          <label>Bài <select id="xBai">${BAI_TOAN.map(b => `<option value="${b[0]}" ${st.bai === b[0] ? 'selected' : ''}>${b[1]} (${PT(b[2])}đ)</option>`).join('')}</select></label>
          <label>Bắt đầu từ đề số <input id="xSoT" type="number" min="1" value="${st.so || 1}"></label><label>Số đề mỗi lệnh <input id="xMoi" type="number" min="1" max="10" value="${st.moi}"></label>
          <label>Số lệnh <input id="xLan" type="number" min="1" max="10" value="${st.lan}"></label>
          <label>Mức <select id="xMucT"><option ${st.mucT === 'TB' ? 'selected' : ''}>TB</option><option ${st.mucT === 'KHA' ? 'selected' : ''}>KHA</option><option ${st.mucT === 'GIOI' ? 'selected' : ''}>GIOI</option></select></label></div>
        <div id="xOnTap">
          <div class="xw-grid">
            <label>Chủ đề <select id="oBai">${BAI_TOAN.map(b => `<option value="${b[0]}" ${st.oBai === b[0] ? 'selected' : ''}>${b[1]}</option>`).join('')}</select></label>
            <label>Đợt số (tự tăng) <input id="oDot" type="number" min="1"></label><label>Số phiếu (đợt liên tiếp) <input id="oN" type="number" min="1" max="5" value="${st.oN || 1}"></label>
            <label>Định dạng AI trả về <select id="oDd"><option value="json" ${st.oDd !== 'md' ? 'selected' : ''}>JSON (nhập thẳng vào web)</option><option value="md" ${st.oDd === 'md' ? 'selected' : ''}>Markdown .md chuẩn</option></select></label>
            <label>Bài lấy từ tài liệu <select id="oGoc"><option value="giu" ${st.oGoc !== 'doi' ? 'selected' : ''}>Giữ nguyên đề gốc, ghi nguồn</option><option value="doi" ${st.oGoc === 'doi' ? 'selected' : ''}>Đổi số liệu</option></select></label></div>
          <div class="xw-grid xw-3">
            <label>Cơ bản: số bài <input id="oN1" type="number" min="1" max="8" value="${st.n1 || 4}"></label><label>Cơ bản: phút <input id="oP1" type="number" min="5" max="60" value="${st.p1 || 25}"></label>
            <label>Khá: số bài <input id="oN2" type="number" min="1" max="8" value="${st.n2 || 4}"></label><label>Khá: phút <input id="oP2" type="number" min="5" max="60" value="${st.p2 || 35}"></label>
            <label>Nâng cao: số bài <input id="oN3" type="number" min="1" max="6" value="${st.n3 || 2}"></label><label>Nâng cao: phút <input id="oP3" type="number" min="5" max="60" value="${st.p3 || 25}"></label></div>
          <p class="muted" id="oTong"></p>
          <label class="xw-wide">Bài đã dùng thêm (ngoài các phiếu đã nhập vào web – mỗi dòng một bài: nguồn – tóm tắt) <textarea id="oThem" rows="3" class="xw-ta"></textarea></label>
          <label class="xw-wide">Tài liệu trong notebook để xoay vòng (tuỳ chọn, mỗi dòng một tên; mỗi đợt ưu tiên một nhóm khác) <textarea id="oTl" rows="3" class="xw-ta">${esc(U.get('xuong:tailieu', ''))}</textarea></label>
          <p class="muted" id="oDung"></p></div>
        <div id="xBaiHoc">
          <div class="xw-grid">
            <label>Lớp <select id="bLop">${BaiHoc.LOP.map(l => `<option value="${l}" ${String(st.bhLop || 10) === String(l) ? 'selected' : ''}>Toán ${l}</option>`).join('')}</select></label>
            <label class="xw-wide2">Bài (theo mục lục SGK) <select id="bBai"></select></label>
            <label>Số bài liên tiếp (mỗi bài một lệnh) <input id="bN" type="number" min="1" max="10" value="${st.bN || 1}"></label>
            <label>Học sinh <select id="bMuc"><option value="TB" ${st.bMuc === 'TB' ? 'selected' : ''}>Trung bình</option><option value="KHA" ${!st.bMuc || st.bMuc === 'KHA' ? 'selected' : ''}>Khá</option><option value="GIOI" ${st.bMuc === 'GIOI' ? 'selected' : ''}>Khá, giỏi</option></select></label></div>
          <div class="xw-grid xw-3">
            <label>Trắc nghiệm: số câu <input id="bN1" type="number" min="4" max="20" value="${st.bN1 || 8}"></label>
            <label>Đúng – sai: số câu <input id="bN2" type="number" min="1" max="6" value="${st.bN2 || 2}"></label>
            <label>Trả lời ngắn: số câu <input id="bN3" type="number" min="1" max="10" value="${st.bN3 || 4}"></label></div>
          <p class="muted" id="bCo"></p></div>
        <div id="xSoTay">
          <div class="xw-grid">
            <label class="xw-wide2">Chủ đề <select id="sCd"><option value="tat" ${st.sCd === 'tat' ? 'selected' : ''}>Tất cả 8 chủ đề (mỗi chủ đề một lệnh)</option>${SoTay.CHU.map(([k, t]) => `<option value="${k}" ${st.sCd === k ? 'selected' : ''}>${esc(t)}${SoTay.get(k) ? ` ✓ ${SoTay.get(k).dang.length} dạng` : ''}</option>`).join('')}</select></label>
            <label>Tối thiểu số dạng <input id="sMin" type="number" min="3" max="30" value="${st.sMin || 8}"></label>
            <label>Học sinh <select id="sMuc"><option value="TB" ${st.sMuc === 'TB' ? 'selected' : ''}>Trung bình</option><option value="KHA" ${!st.sMuc || st.sMuc === 'KHA' ? 'selected' : ''}>Khá</option><option value="GIOI" ${st.sMuc === 'GIOI' ? 'selected' : ''}>Khá, giỏi</option></select></label>
            <label>Ví dụ minh họa <select id="sVd"><option value="co" ${st.sVd !== 'khong' ? 'selected' : ''}>Mỗi dạng một ví dụ</option><option value="khong" ${st.sVd === 'khong' ? 'selected' : ''}>Không (sổ tay gọn)</option></select></label></div>
          <p class="muted" id="sCo"></p></div>
        <label class="xw-wide">Cấu trúc theo (tên đề trong notebook, bỏ trống nếu theo cấu trúc chung) <input id="xTheo" value="${esc(st.theo)}"></label>
        <label class="xw-wide">Yêu cầu riêng (lỗi học sinh hay mắc, chủ đề muốn có…) <input id="xRieng" value="${esc(st.rieng)}"></label>
      </div><div id="xOut"></div>`);
    const draw = () => {
      const loai = document.querySelector('[name=xLoai]:checked').value, noi = document.querySelector('[name=xNoi]:checked').value;
      $i('xVan').hidden = loai !== 'van'; $i('xToan').hidden = loai !== 'toan'; $i('xOnTap').hidden = loai !== 'ontap'; $i('xBaiHoc').hidden = loai !== 'baihoc'; $i('xSoTay').hidden = loai !== 'sotay';
      $i('xTheo').parentElement.hidden = loai === 'ontap' || loai === 'baihoc' || loai === 'sotay';
      const bLop = $i('bLop').value;
      if ($i('bLop').dataset.last !== bLop) {
        const want = $i('bLop').dataset.last ? '' : String(st.bhBai || '');
        $i('bBai').innerHTML = BaiHoc.all(+bLop).map(b => `<option value="${b.so}" ${String(b.so) === want ? 'selected' : ''}>Bài ${b.so}. ${esc(b.ten)}${BaiHoc.get(+bLop, b.so) ? ' ✓' : ''}</option>`).join('');
        $i('bLop').dataset.last = bLop;
      }
      const oBai = $i('oBai').value; if ($i('oBai').dataset.last !== oBai) { $i('oDot').value = OnTap.nextDot(oBai); $i('oThem').value = U.get('xuong:them:' + oBai, ''); $i('oBai').dataset.last = oBai; }
      const o = { loai, noi, tien: $i('xTien').value.trim() || 'V', so: loai === 'van' ? +$i('xSo').value || 0 : +$i('xSoT').value || 1, n: Math.min(+$i('xN').value || 1, 20), muc: $i('xMuc').value,
        viet: $i('xViet').value, ngl: $i('xNgl').value, theo: $i('xTheo').value.trim(), rieng: $i('xRieng').value.trim(),
        bai: $i('xBai').value, moi: Math.min(+$i('xMoi').value || 5, 10), lan: Math.min(+$i('xLan').value || 1, 10), mucT: $i('xMucT').value,
        oBai, oN: Math.min(+$i('oN').value || 1, 5), oDd: $i('oDd').value, oGoc: $i('oGoc').value,
        bhLop: bLop, bhBai: $i('bBai').value, bN: Math.min(+$i('bN').value || 1, 10), bMuc: $i('bMuc').value,
        bN1: Math.min(Math.max(+$i('bN1').value || 8, 4), 20), bN2: Math.min(+$i('bN2').value || 2, 6), bN3: Math.min(+$i('bN3').value || 4, 10),
        sCd: $i('sCd').value, sMin: Math.min(Math.max(+$i('sMin').value || 8, 3), 30), sMuc: $i('sMuc').value, sVd: $i('sVd').value,
        n1: +$i('oN1').value || 4, n2: +$i('oN2').value || 4, n3: +$i('oN3').value || 2, p1: +$i('oP1').value || 25, p2: +$i('oP2').value || 35, p3: +$i('oP3').value || 25 };
      U.set('xuong:prompt', o); U.set('xuong:tailieu', $i('oTl').value); U.set('xuong:them:' + oBai, $i('oThem').value);
      const soat = 90 - o.p1 - o.p2 - o.p3;
      $i('oTong').textContent = `Tổng: ${o.n1 + o.n2 + o.n3} bài · ${o.p1 + o.p2 + o.p3} phút làm + ${soat} phút soát = 90 phút${soat < 0 || soat > 15 ? ' ⚠️ chỉnh lại để thời gian soát từ 0 đến 15 phút' : ''}.`;
      $i('oDung').textContent = `Đã dùng ở các phiếu ${OnTap.TEN[oBai] ? 'của chủ đề này' : ''} trong web: ${OnTap.daDung(oBai).length} bài – lệnh tự đưa vào danh sách "Đã dùng" để đợt mới không lặp.`;
      const coBH = BaiHoc.all(+bLop).filter(b => BaiHoc.get(+bLop, b.so));
      $i('bCo').textContent = `Toán ${bLop}: ${coBH.length}/${BaiHoc.all(+bLop).length} bài đã có bài giảng trên web (đánh dấu ✓). Bài đã có thì lệnh tự liệt kê câu cũ để AI soạn câu mới; nhập bản mới sẽ thay bản cũ.`;
      const daSo = SoTay.list();
      $i('sCo').textContent = `Sổ tay trên web: ${daSo.length}/8 chủ đề, ${daSo.reduce((t, e) => t + e.dang.length, 0)} dạng. Chủ đề đã có thì lệnh tự liệt kê các dạng đã có để AI chỉ soạn dạng còn thiếu. Nhập vào: Xưởng → Nhập dữ liệu; xem ở #/so-tay.`;
      const hd = loai === 'van' ? HD_VAN : loai === 'ontap' ? HD_ONTAP(o.oDd === 'md') : loai === 'baihoc' ? HD_BAIHOC : loai === 'sotay' ? HD_SOTAY : HD_TOAN;
      const ls = loai === 'van' ? Array.from({ length: o.n }, (_, k) => lenhVan(o, k))
        : loai === 'ontap' ? Array.from({ length: o.oN }, (_, k) => lenhOnTap({ bai: oBai, dot: +$i('oDot').value || 1, dd: o.oDd, goc: o.oGoc, n1: o.n1, n2: o.n2, n3: o.n3, p1: o.p1, p2: o.p2, p3: o.p3, rieng: o.rieng, them: $i('oThem').value, tl: $i('oTl').value }, k))
        : loai === 'sotay' ? (o.sCd === 'tat' ? SoTay.CHU.map(c => c[0]) : [o.sCd]).map(cd => lenhSoTay({ muc: o.sMuc, min: o.sMin, vd: o.sVd !== 'khong', rieng: o.rieng }, cd))
        : loai === 'baihoc' ? Array.from({ length: o.bN }, (_, k) => lenhBaiHoc({ lop: bLop, bai: o.bhBai, muc: o.bMuc, n1: o.bN1, n2: o.bN2, n3: o.bN3, rieng: o.rieng }, k)).filter(Boolean)
        : Array.from({ length: o.lan }, (_, k) => lenhToan({ ...o, muc: o.mucT }, k));
      const full = l => noi === 'nb' ? `${hd}\n\n=== LỆNH ===\n${l}` : l;
      $i('xOut').innerHTML = (noi === 'gem' ? box('xHd', '① Hướng dẫn Gem (dán một lần vào mục Hướng dẫn của Gem)', hd, 'Mục Kiến thức của Gem: thêm notebook NotebookLM chứa tài liệu.') : '')
        + `<div class="card xw-box"><div class="xw-h"><b>${noi === 'gem' ? '②' : '①'} Lệnh ${loai === 'ontap' ? 'từng phiếu' : loai === 'baihoc' ? 'từng bài' : loai === 'sotay' ? 'từng chủ đề' : 'từng đề'} (${ls.length})</b><button class="btn" type="button" id="xAll">⬇️ Tải tất cả lệnh (.txt)</button></div>
          <p class="muted">${noi === 'gem' ? 'Mỗi lệnh gửi trong một cuộc trò chuyện mới của Gem.' : 'NotebookLM có thể cắt câu trả lời dài: nếu JSON bị cụt, dùng Gem hoặc giảm số đề mỗi lệnh.'}</p>
          ${ls.map((l, i) => `<div class="xw-h"><span>Lệnh ${i + 1}</span><button class="btn ghost" type="button" data-copy="xL${i}">📋 Chép lệnh ${i + 1}</button></div><textarea id="xL${i}" class="xw-ta" readonly rows="${noi === 'nb' ? 6 : 5}">${esc(full(l))}</textarea>`).join('')}</div>`
        + box('xSua', `${noi === 'gem' ? '③' : '②'} Lệnh sửa (khi AI trả về sai mẫu, thiếu chấm điểm)`, SUA(loai === 'van' ? 'de_van' : loai === 'ontap' ? 'on_tap_toan' : loai === 'baihoc' ? 'bai_hoc' : loai === 'sotay' ? 'so_tay_toan' : 'luyen_de_toan'), 'Trang Nhập dữ liệu tự tạo lệnh sửa kèm danh sách lỗi cụ thể (cả bài bị trùng đợt trước).');
      bindCopy($i('xOut'));
      $i('xAll').addEventListener('click', () => download(`lenh-${loai}-${new Date().toISOString().slice(0, 10)}.txt`, ls.map(full).join('\n=====\n'), 'text/plain'));
    };
    view().querySelectorAll('input, select, textarea').forEach(x => x.addEventListener('input', draw));
    draw();
  }

  /* ---------- Nhập dữ liệu ---------- */
  function previewHTML(j, r) {
    if (r.loai === 'de_van') return Van.sheetHTML(NhapDL.vanEntry(j, 'xem'), { muc: 'day' });
    if (r.loai === 'on_tap_toan') return OnTap.sheetHTML(NhapDL.onTapEntry(j, 'xem'), { key: true });
    if (r.loai === 'bai_hoc') return BaiHoc.previewHTML(NhapDL.bhEntry(j, 'xem'));
    if (r.loai === 'so_tay_toan') return SoTay.sheetHTML([NhapDL.soTayEntry(j, 'xem')]);
    const t = Topics.get(r.id) || { id: r.id, bai: 'Bài', title: '' };
    return LuyenDe.sheetHTML(t, { key: true }, null, { phut: 12, de: NhapDL.toanItems(j, 'xem') });
  }
  // Bài giảng trùng lớp + bài đã có trên web: báo trước sẽ lưu thành bộ mấy, thêm bao nhiêu câu, bỏ bao nhiêu câu trùng.
  function trungHTML(j) {
    const cu = BaiHoc.own(+j.lop, +j.bai); if (!cu) return '';
    const g = BaiHoc.thuGhep(NhapDL.bhEntry(j, 'xem')), nb = BaiHoc.boList(cu).length, nc = cu.tn.length + cu.ds.length + cu.tln.length;
    const dau = `<b>Toán ${+j.lop} – Bài ${+j.bai} đã có trên web</b> (${nb > 1 ? nb + ' bộ, ' : ''}${nc} câu).`;
    if (g.thay_mau) return `<div class="xw-trung"><p>${dau} Bản đang có là <i>bài mẫu minh họa</i> → bản này <b>thay hẳn</b> bài mẫu (cả bài giảng).</p></div>`;
    if (!g.them) return `<div class="xw-trung bad"><p>${dau} <b>Mọi câu trong bản này đều đã có</b> – lưu vào cũng không thêm gì. Nhờ AI soạn câu mới (Menu prompt tự liệt kê các câu đã có để AI tránh).</p></div>`;
    return `<div class="xw-trung"><p>${dau} Bản này sẽ thành <b>Bộ ${g.bo}</b> của phần Luyện tập: thêm <b>${g.them} câu mới</b>${g.bo_qua ? `, bỏ ${g.bo_qua} câu trùng câu đã có` : ''}. <b>Bài giảng giữ bản đã có</b>; học sinh chọn Bộ 1, Bộ ${g.bo}… hoặc 🎲 đề ngẫu nhiên từ mọi bộ.</p>
      <p class="muted small">Tệp chuẩn tải về tên <code>${esc(NhapDL.fileName(j))}</code> (không đè tệp cũ). Muốn sửa lỗi bản cũ thì sửa thẳng tệp cũ trong <code>nhap/</code>.</p></div>`;
  }
  function nhapPage() {
    view().innerHTML = shell('#/xuong', `<section class="card hero"><h2>📥 Nhập dữ liệu</h2><p>Dán nguyên câu trả lời của AI (khối ${BT}json, hoặc ${BT}markdown của phiếu ôn tập) hoặc kéo các tệp <code>.json</code>, <code>.md</code> vào ô dưới. Web tự tách JSON, sửa dấu \\ của công thức, đổi $…$ thành công thức, bỏ số trích dẫn, rồi kiểm điểm từng câu.</p></section>
      <div class="card"><div id="nDrop" class="xw-drop"><textarea id="nIn" rows="10" placeholder="Dán câu trả lời của AI vào đây…"></textarea>
        <p class="muted">hoặc <label class="btn ghost"><input type="file" id="nFile" accept=".json,.md,.txt,application/json,text/markdown" multiple hidden> Chọn tệp .json</label> · kéo thả tệp vào ô này</p></div>
        <div class="row"><button class="btn primary" type="button" id="nGo">🔎 Kiểm tra</button></div></div>
      <div id="nOut"></div>`);
    const run = srcs => {
      $i('nOut').innerHTML = srcs.map((s, i) => {
        let res;
        try { res = NhapDL.parse(s.text); } catch (e) { return `<div class="card xw-res bad"><h3>${esc(s.name)}</h3><p>✗ ${esc(e.message)}</p><button class="btn" type="button" data-fix="${i}">📋 Chép lệnh sửa</button></div>`; }
        const r = NhapDL.check(res.data); s.res = res; s.r = r;
        return `<div class="card xw-res ${r.errs.length ? 'bad' : 'ok'}"><h3>${esc(s.name)} · ${esc(r.ten || 'không rõ loại')}</h3>
          <p class="chips"><span class="chip ${r.errs.length ? 'warnc' : 'ok'}">${r.errs.length ? `${r.errs.length} lỗi` : 'Đúng mẫu ✓'}</span>${r.warns.length ? `<span class="chip">${r.warns.length} lưu ý</span>` : ''}${res.notes.map(n => `<span class="chip">${esc(n)}</span>`).join('')}</p>
          ${!r.errs.length && r.loai === 'bai_hoc' ? trungHTML(res.data) : ''}${r.errs.length ? `<ul class="xw-err">${r.errs.map(x => `<li>✗ ${esc(x)}</li>`).join('')}</ul>` : ''}${r.warns.length ? `<ul class="xw-warn">${r.warns.map(x => `<li>! ${esc(x)}</li>`).join('')}</ul>` : ''}
          <div class="row">${r.errs.length ? '' : `<button class="btn primary" type="button" data-save="${i}">💾 Lưu trên máy này</button><button class="btn" type="button" data-dl="${i}">⬇️ Tải tệp chuẩn (.json)</button>${r.loai === 'bai_hoc' ? '' : `<button class="btn" type="button" data-print="${i}">🖨️ In / Lưu PDF</button>`}${r.loai === 'on_tap_toan' ? `<button class="btn" type="button" data-md="${i}">⬇️ Tải Markdown (.md)</button>` : ''}`}
            ${r.errs.length || r.warns.length ? `<button class="btn" type="button" data-fix="${i}">📋 Chép lệnh sửa</button>` : ''}</div>
          ${r.errs.length ? '' : `<details class="xw-pre" open><summary>Xem trước</summary><div class="paper-wrap" id="nPre${i}"></div></details>`}</div>`;
      }).join('');
      srcs.forEach((s, i) => { if (s.r && !s.r.errs.length) $i(`nPre${i}`).innerHTML = previewHTML(s.res.data, s.r); });
      const S_ = i => srcs[+i];
      $i('nOut').querySelectorAll('[data-fix]').forEach(b => b.addEventListener('click', async () => {
        const s = S_(b.dataset.fix), loai = s.r ? s.r.loai : (/doc_hieu|de_van/.test(s.text) ? 'de_van' : /on_tap_toan/.test(s.text) ? 'on_tap_toan' : /bai_hoc/.test(s.text) ? 'bai_hoc' : /so_tay_toan/.test(s.text) ? 'so_tay_toan' : 'luyen_de_toan');
        const ok = await U.copy(SUA(loai, s.r ? [...s.r.errs, ...s.r.warns] : ['JSON sai cú pháp, không đọc được']));
        U.toast(ok ? 'Đã chép lệnh sửa. Dán vào đúng cuộc trò chuyện với AI vừa rồi.' : 'Không chép được.');
      }));
      $i('nOut').querySelectorAll('[data-save]').forEach(b => b.addEventListener('click', () => {
        const s = S_(b.dataset.save); NhapDL.saveLocal(s.res.data);
        U.toast('Đã lưu trên máy này. Đang mở…');
        setTimeout(() => { location.hash = s.r.loai === 'bai_hoc' ? `#/bai-hoc/${s.r.lop}/${s.r.bai}` : s.r.loai === 'de_van' ? `#/van-10/de/${encodeURIComponent(s.res.data.ma_de)}` : s.r.loai === 'on_tap_toan' ? `#/on-tap/${encodeURIComponent(s.res.data.ma)}` : `#/cd/${s.r.id}/de`; location.reload(); }, 600);
      }));
      $i('nOut').querySelectorAll('[data-md]').forEach(b => b.addEventListener('click', () => { const s = S_(b.dataset.md); download(`${s.res.data.ma}.md`, OnTap.toMd(NhapDL.onTapEntry(s.res.data, 'xem')), 'text/markdown'); }));
      $i('nOut').querySelectorAll('[data-dl]').forEach(b => b.addEventListener('click', () => { const s = S_(b.dataset.dl); download(NhapDL.fileName(s.res.data), JSON.stringify(s.res.data, null, 1)); }));
      $i('nOut').querySelectorAll('[data-print]').forEach(b => b.addEventListener('click', () => {
        const s = S_(b.dataset.print), html = previewHTML(s.res.data, s.r);
        let root = $i('print-root'); if (!root) { root = document.createElement('div'); root.id = 'print-root'; document.body.appendChild(root); }
        root.innerHTML = html; document.body.classList.add('printing');
        MathTS.done(root).then(() => { window.print(); setTimeout(() => { document.body.classList.remove('printing'); root.innerHTML = ''; }, 1500); });
      }));
    };
    $i('nGo').addEventListener('click', () => { const t = $i('nIn').value; if (t.trim()) run([{ name: 'Nội dung đã dán', text: t }]); });
    const readFiles = async fs => run(await Promise.all([...fs].map(async f => ({ name: f.name, text: await f.text() }))));
    $i('nFile').addEventListener('change', e => readFiles(e.target.files));
    const dz = $i('nDrop');
    dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('on'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('on'));
    dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('on'); if (e.dataTransfer.files.length) readFiles(e.dataTransfer.files); });
  }

  /* ---------- Nhận bài từ Trình soạn thảo bài học (cong-cu/soan-bai-hoc.html) ----------
     Trình soạn thảo mở trang này (#/xuong/nhan) trong cửa sổ mới; trang báo "cdtt-san-sang" cho cửa sổ mở nó, nhận
     { type:'cdtt-bai-hoc', json } rồi kiểm, cho xem trước. Chỉ nhận từ đúng cửa sổ đã mở trang; phải bấm Lưu mới ghi.
     Bài gửi từ trình soạn thảo lưu khoá cố định bh-gui-<lớp>-<bài>: gửi lại bản sửa thì thay bản trước (không thành bộ mới). */
  let ngheGui = null;
  function nhanPage() {
    view().innerHTML = shell('#/xuong', `<section class="card hero"><h2>📽️ Nhận bài từ Trình soạn thảo</h2>
      <p id="gStt">${window.opener ? '⏳ Đang chờ bài gửi sang…' : 'Trang này nhận bài khi thầy bấm <b>📽️ Đưa lên web</b> trong Trình soạn thảo bài học.'}</p></section><div id="gOut"></div>`);
    if (ngheGui) window.removeEventListener('message', ngheGui);
    ngheGui = ev => {
      const d = ev.data;
      if (!d || d.type !== 'cdtt-bai-hoc' || !window.opener || ev.source !== window.opener || !d.json || typeof d.json !== 'object' || !$i('gOut')) return;
      try { ev.source.postMessage({ type: 'cdtt-da-nhan' }, ev.origin === 'null' ? '*' : ev.origin); } catch (e) { /* bỏ qua */ }
      const j = { loai: 'bai_hoc', ...d.json }, r = NhapDL.check(j);
      $i('gStt').innerHTML = `Đã nhận: <b>${esc(r.ten || 'bài học')}</b> – ${new Date().toLocaleTimeString('vi-VN')}`;
      $i('gOut').innerHTML = `<div class="card xw-res ${r.errs.length ? 'bad' : 'ok'}">
        <p class="chips"><span class="chip ${r.errs.length ? 'warnc' : 'ok'}">${r.errs.length ? `${r.errs.length} lỗi` : 'Đúng mẫu ✓'}</span>${r.warns.length ? `<span class="chip">${r.warns.length} lưu ý</span>` : ''}</p>
        ${r.errs.length ? '' : r.loai === 'bai_hoc' && !NhapDL.local().some(x => x.key === `bh-gui-${r.lop}-${r.bai}`) ? trungHTML(j) : ''}
        ${r.errs.length ? `<ul class="xw-err">${r.errs.map(x => `<li>✗ ${esc(x)}</li>`).join('')}</ul><p>Sửa trong Trình soạn thảo rồi bấm <b>Đưa lên web</b> lần nữa – trang này nhận lại bản mới.</p>` : ''}
        ${r.warns.length ? `<details><summary>${r.warns.length} lưu ý</summary><ul class="xw-warn">${r.warns.map(x => `<li>! ${esc(x)}</li>`).join('')}</ul></details>` : ''}
        ${r.errs.length || r.loai !== 'bai_hoc' ? '' : `<div class="row"><button class="btn primary" type="button" id="gTC">📽️ Lưu &amp; trình chiếu ngay</button><button class="btn" type="button" id="gMo">💾 Lưu &amp; mở bài</button><button class="btn" type="button" id="gDl">⬇️ Tải tệp chuẩn (đăng cho mọi học sinh)</button></div>
          <p class="muted small">Lưu trên trình duyệt này (máy chiếu ở lớp). Gửi lại bản sửa của cùng bài thì thay bản trước. Muốn mọi học sinh thấy: tải tệp chuẩn, thả vào thư mục <i>Con đường tới trường (Thả HTML Vào Đây)</i> trên Desktop rồi bấm lệnh <i>Đăng Con đường tới trường lên web</i>.</p>
          <details class="xw-pre"><summary>Xem trước</summary><div class="paper-wrap" id="gPre"></div></details>`}</div>`;
      if (r.errs.length || r.loai !== 'bai_hoc') return;
      $i('gPre').innerHTML = previewHTML(j, r);
      const luu = tc => { NhapDL.saveLocal(j, `bh-gui-${r.lop}-${r.bai}`); if (tc) try { sessionStorage.setItem('bh:tc-tu-dong', `${r.lop}-${r.bai}`); } catch (e) { /* bỏ qua */ }
        U.toast(tc ? 'Đã lưu. Đang mở trình chiếu…' : 'Đã lưu trên máy này. Đang mở bài…');
        setTimeout(() => { history.replaceState(null, '', `#/bai-hoc/${r.lop}/${r.bai}`); location.reload(); }, 400); };   // replaceState: không phát hashchange trước khi tải lại
      $i('gTC').addEventListener('click', () => luu(true));
      $i('gMo').addEventListener('click', () => luu(false));
      $i('gDl').addEventListener('click', () => download(NhapDL.fileName(j), JSON.stringify(j, null, 1)));
    };
    window.addEventListener('message', ngheGui);
    if (window.opener) try { window.opener.postMessage({ type: 'cdtt-san-sang' }, '*'); } catch (e) { /* bỏ qua */ }
  }

  function route(parts) {
    if (parts[0] !== 'xuong') return false;
    if (parts[1] === 'prompt') promptPage(); else if (parts[1] === 'nhap') nhapPage(); else if (parts[1] === 'nhan') nhanPage(); else home();
    return true;
  }
  return { route, HD_VAN, HD_TOAN, HD_ONTAP, HD_BAIHOC, MAU_VAN, MAU_TOAN, MAU_ONTAP, MAU_MD_ONTAP, MAU_BAIHOC, SUA, lenhVan, lenhToan, lenhOnTap, lenhBaiHoc };
})();
