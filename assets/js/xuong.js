/* =====================================================================
   XƯỞNG DỮ LIỆU (dành cho thầy cô) – tài liệu ở NotebookLM → AI xuất JSON đúng mẫu → đưa vào web
   #/xuong          quy trình 4 bước + dữ liệu đã lưu trên máy này
   #/xuong/prompt   menu prompt: hướng dẫn Gem (dán một lần), lệnh từng đề, lệnh sửa JSON
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

  const SUA = (loai, loi) => S`Câu trả lời vừa rồi chưa đúng mẫu hoặc còn lỗi. Giữ nguyên nội dung vừa soạn (không đổi văn bản, số liệu), sửa các lỗi sau rồi viết lại TOÀN BỘ thành MỘT khối ${BT}json đúng mẫu:
${loi && loi.length ? loi.map(x => '- ' + x).join('\n') : '- Sai tên trường, thiếu phần chấm điểm hoặc thiếu dấu \\\\ của công thức.'}

${DAU_RA}
MẪU:
${loai === 'de_van' ? MAU_VAN : MAU_TOAN}`;

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
      <div class="two"><a class="card link-card" href="#/xuong/prompt"><span class="big">🧾</span><b>Menu prompt</b><span>Ngữ văn vào 10 · Toán luyện đề theo bài</span></a>
        <a class="card link-card" href="#/xuong/nhap"><span class="big">📥</span><b>Nhập dữ liệu</b><span>Dán câu trả lời AI hoặc kéo tệp .json</span></a></div>
      <h2 class="sec">Đã lưu trên máy này (${loc.length})</h2>
      ${loc.length ? `<div class="card"><ul class="xw-list">${loc.map(x => { const r = NhapDL.check(x.json); return `<li><b>${esc(r.ten || x.key)}</b> <span class="muted">${new Date(x.luc).toLocaleString('vi-VN')}</span>
        <button class="btn ghost" type="button" data-dl="${esc(x.key)}">⬇️ Tải tệp chuẩn</button><button class="btn ghost" type="button" data-rm="${esc(x.key)}">🗑️ Xoá</button></li>`; }).join('')}</ul></div>`
        : '<p class="empty">Chưa có. Dữ liệu lưu ở đây chỉ hiện trên trình duyệt này.</p>'}
      <h2 class="sec">Đã có trong hệ thống (${he.length} tệp)</h2>
      ${he.length ? `<div class="card"><ul class="xw-list">${he.map(x => `<li><b>${esc(x.r.ten || '')}</b> <span class="muted">${esc(x.file || '')}</span>${x.r.errs.length ? ` <span class="chip warnc">${x.r.errs.length} lỗi – chưa hiện</span>` : ''}</li>`).join('')}</ul></div>` : '<p class="empty">Chưa có tệp nào trong data/nhap/.</p>'}`);
    view().querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { NhapDL.removeLocal(b.dataset.rm); location.reload(); }));
    view().querySelectorAll('[data-dl]').forEach(b => b.addEventListener('click', () => { const x = NhapDL.local().find(y => y.key === b.dataset.dl); if (x) download(NhapDL.fileName(x.json), JSON.stringify(x.json, null, 1)); }));
  }

  function promptPage() {
    const st = Object.assign({ loai: 'van', noi: 'gem', tien: 'V', so: 1, n: 5, muc: 'TB', viet: 'xen', ngl: 'ai', theo: '', rieng: '', bai: '3', moi: 5, lan: 2, mucT: 'KHA' }, U.get('xuong:prompt', {}));
    view().innerHTML = shell('#/xuong', `<section class="card hero"><h2>🧾 Menu prompt</h2><p>Chọn loại dữ liệu và các lựa chọn. Lần đầu: tạo một Gem trong Gemini, dán <b>Hướng dẫn Gem</b> vào mục Hướng dẫn, mục Kiến thức gắn notebook NotebookLM. Sau đó mỗi lần chỉ cần dán <b>Lệnh</b>.</p></section>
      <div class="card xw-form">
        <div class="opts-row"><label class="tog"><input type="radio" name="xLoai" value="van" ${st.loai === 'van' ? 'checked' : ''}> 📖 Ngữ văn vào 10 – đề luyện</label>
          <label class="tog"><input type="radio" name="xLoai" value="toan" ${st.loai === 'toan' ? 'checked' : ''}> 📐 Toán vào 10 – đề luyện theo bài</label></div>
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
        <label class="xw-wide">Cấu trúc theo (tên đề trong notebook, bỏ trống nếu theo cấu trúc chung) <input id="xTheo" value="${esc(st.theo)}"></label>
        <label class="xw-wide">Yêu cầu riêng (lỗi học sinh hay mắc, chủ đề muốn có…) <input id="xRieng" value="${esc(st.rieng)}"></label>
      </div><div id="xOut"></div>`);
    const draw = () => {
      const loai = document.querySelector('[name=xLoai]:checked').value, noi = document.querySelector('[name=xNoi]:checked').value;
      $i('xVan').hidden = loai !== 'van'; $i('xToan').hidden = loai !== 'toan';
      const o = { loai, noi, tien: $i('xTien').value.trim() || 'V', so: loai === 'van' ? +$i('xSo').value || 0 : +$i('xSoT').value || 1, n: Math.min(+$i('xN').value || 1, 20), muc: $i('xMuc').value,
        viet: $i('xViet').value, ngl: $i('xNgl').value, theo: $i('xTheo').value.trim(), rieng: $i('xRieng').value.trim(),
        bai: $i('xBai').value, moi: Math.min(+$i('xMoi').value || 5, 10), lan: Math.min(+$i('xLan').value || 1, 10), mucT: $i('xMucT').value };
      U.set('xuong:prompt', o);
      const hd = loai === 'van' ? HD_VAN : HD_TOAN;
      const ls = loai === 'van' ? Array.from({ length: o.n }, (_, k) => lenhVan(o, k)) : Array.from({ length: o.lan }, (_, k) => lenhToan({ ...o, muc: o.mucT }, k));
      const full = l => noi === 'nb' ? `${hd}\n\n=== LỆNH ===\n${l}` : l;
      $i('xOut').innerHTML = (noi === 'gem' ? box('xHd', '① Hướng dẫn Gem (dán một lần vào mục Hướng dẫn của Gem)', hd, 'Mục Kiến thức của Gem: thêm notebook NotebookLM chứa tài liệu.') : '')
        + `<div class="card xw-box"><div class="xw-h"><b>${noi === 'gem' ? '②' : '①'} Lệnh từng đề (${ls.length})</b><button class="btn" type="button" id="xAll">⬇️ Tải tất cả lệnh (.txt)</button></div>
          <p class="muted">${noi === 'gem' ? 'Mỗi lệnh gửi trong một cuộc trò chuyện mới của Gem.' : 'NotebookLM có thể cắt câu trả lời dài: nếu JSON bị cụt, dùng Gem hoặc giảm số đề mỗi lệnh.'}</p>
          ${ls.map((l, i) => `<div class="xw-h"><span>Lệnh ${i + 1}</span><button class="btn ghost" type="button" data-copy="xL${i}">📋 Chép lệnh ${i + 1}</button></div><textarea id="xL${i}" class="xw-ta" readonly rows="${noi === 'nb' ? 6 : 5}">${esc(full(l))}</textarea>`).join('')}</div>`
        + box('xSua', `${noi === 'gem' ? '③' : '②'} Lệnh sửa (khi AI trả về sai mẫu, thiếu chấm điểm)`, SUA(loai === 'van' ? 'de_van' : 'luyen_de_toan'), 'Trang Nhập dữ liệu tự tạo lệnh sửa kèm danh sách lỗi cụ thể.');
      bindCopy($i('xOut'));
      $i('xAll').addEventListener('click', () => download(`lenh-${loai}-${new Date().toISOString().slice(0, 10)}.txt`, ls.map(full).join('\n=====\n'), 'text/plain'));
    };
    view().querySelectorAll('input, select').forEach(x => x.addEventListener('input', draw));
    draw();
  }

  /* ---------- Nhập dữ liệu ---------- */
  function previewHTML(j, r) {
    if (r.loai === 'de_van') return Van.sheetHTML(NhapDL.vanEntry(j, 'xem'), { muc: 'day' });
    const t = Topics.get(r.id) || { id: r.id, bai: 'Bài', title: '' };
    return LuyenDe.sheetHTML(t, { key: true }, null, { phut: 12, de: NhapDL.toanItems(j, 'xem') });
  }
  function nhapPage() {
    view().innerHTML = shell('#/xuong', `<section class="card hero"><h2>📥 Nhập dữ liệu</h2><p>Dán nguyên câu trả lời của AI (có khối ${BT}json) hoặc kéo các tệp <code>.json</code> vào ô dưới. Web tự tách JSON, sửa dấu \\ của công thức, đổi $…$ thành công thức, bỏ số trích dẫn, rồi kiểm điểm từng câu.</p></section>
      <div class="card"><div id="nDrop" class="xw-drop"><textarea id="nIn" rows="10" placeholder="Dán câu trả lời của AI vào đây…"></textarea>
        <p class="muted">hoặc <label class="btn ghost"><input type="file" id="nFile" accept=".json,.txt,application/json" multiple hidden> Chọn tệp .json</label> · kéo thả tệp vào ô này</p></div>
        <div class="row"><button class="btn primary" type="button" id="nGo">🔎 Kiểm tra</button></div></div>
      <div id="nOut"></div>`);
    const run = srcs => {
      $i('nOut').innerHTML = srcs.map((s, i) => {
        let res;
        try { res = NhapDL.parse(s.text); } catch (e) { return `<div class="card xw-res bad"><h3>${esc(s.name)}</h3><p>✗ ${esc(e.message)}</p><button class="btn" type="button" data-fix="${i}">📋 Chép lệnh sửa</button></div>`; }
        const r = NhapDL.check(res.data); s.res = res; s.r = r;
        return `<div class="card xw-res ${r.errs.length ? 'bad' : 'ok'}"><h3>${esc(s.name)} · ${esc(r.ten || 'không rõ loại')}</h3>
          <p class="chips"><span class="chip ${r.errs.length ? 'warnc' : 'ok'}">${r.errs.length ? `${r.errs.length} lỗi` : 'Đúng mẫu ✓'}</span>${r.warns.length ? `<span class="chip">${r.warns.length} lưu ý</span>` : ''}${res.notes.map(n => `<span class="chip">${esc(n)}</span>`).join('')}</p>
          ${r.errs.length ? `<ul class="xw-err">${r.errs.map(x => `<li>✗ ${esc(x)}</li>`).join('')}</ul>` : ''}${r.warns.length ? `<ul class="xw-warn">${r.warns.map(x => `<li>! ${esc(x)}</li>`).join('')}</ul>` : ''}
          <div class="row">${r.errs.length ? '' : `<button class="btn primary" type="button" data-save="${i}">💾 Lưu trên máy này</button><button class="btn" type="button" data-dl="${i}">⬇️ Tải tệp chuẩn (.json)</button><button class="btn" type="button" data-print="${i}">🖨️ In / Lưu PDF</button>`}
            ${r.errs.length || r.warns.length ? `<button class="btn" type="button" data-fix="${i}">📋 Chép lệnh sửa</button>` : ''}</div>
          ${r.errs.length ? '' : `<details class="xw-pre" open><summary>Xem trước</summary><div class="paper-wrap" id="nPre${i}"></div></details>`}</div>`;
      }).join('');
      srcs.forEach((s, i) => { if (s.r && !s.r.errs.length) $i(`nPre${i}`).innerHTML = previewHTML(s.res.data, s.r); });
      const S_ = i => srcs[+i];
      $i('nOut').querySelectorAll('[data-fix]').forEach(b => b.addEventListener('click', async () => {
        const s = S_(b.dataset.fix), loai = s.r ? s.r.loai : (/doc_hieu|de_van/.test(s.text) ? 'de_van' : 'luyen_de_toan');
        const ok = await U.copy(SUA(loai, s.r ? [...s.r.errs, ...s.r.warns] : ['JSON sai cú pháp, không đọc được']));
        U.toast(ok ? 'Đã chép lệnh sửa. Dán vào đúng cuộc trò chuyện với AI vừa rồi.' : 'Không chép được.');
      }));
      $i('nOut').querySelectorAll('[data-save]').forEach(b => b.addEventListener('click', () => {
        const s = S_(b.dataset.save); NhapDL.saveLocal(s.res.data);
        U.toast('Đã lưu trên máy này. Đang mở…');
        setTimeout(() => { location.hash = s.r.loai === 'de_van' ? `#/van-10/de/${encodeURIComponent(s.res.data.ma_de)}` : `#/cd/${s.r.id}/de`; location.reload(); }, 600);
      }));
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

  function route(parts) {
    if (parts[0] !== 'xuong') return false;
    if (parts[1] === 'prompt') promptPage(); else if (parts[1] === 'nhap') nhapPage(); else home();
    return true;
  }
  return { route, HD_VAN, HD_TOAN, MAU_VAN, MAU_TOAN, SUA, lenhVan, lenhToan };
})();
