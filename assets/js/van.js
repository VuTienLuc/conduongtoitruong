/* =====================================================================
   NGỮ VĂN VÀO 10 – học sinh lực học trung bình
   #/van-10                 danh sách đề + cấu trúc đề + phương pháp
   #/van-10/phuong-phap     phương pháp làm từng loại câu (khung trả lời, khung đoạn 200 chữ, dàn ý 500 chữ)
   #/van-10/de/<mã>         một đề: in PDF gồm Đề → Bài làm có gợi ý (3 mức, giảm dần) → Hướng dẫn chấm
   Dữ liệu đề do NhapDL chuyển từ JSON (Xưởng dữ liệu → Menu prompt → AI → Nhập dữ liệu); không soạn tay ở đây.
   Ngữ liệu chỉ dùng tác phẩm công bố trước 1929 hoặc văn bản tự viết (NhapDL kiểm "nguon_goc").
   ===================================================================== */
const Van = (() => {
  const store = [];
  const MUC = { day: 'Đầy đủ', vua: 'Vừa', it: 'Ít' };
  const TIP = {
    the_loai: 'Thơ: đếm số chữ mỗi dòng, xem cách gieo vần, số dòng. Truyện: có cốt truyện, nhân vật, người kể chuyện.',
    phuong_thuc: 'Chọn phương thức chính: tự sự (kể), miêu tả, biểu cảm (bộc lộ cảm xúc), nghị luận (bàn bạc).',
    chu_de: 'Văn bản viết về … (đối tượng), qua đó thể hiện … (tình cảm, tư tưởng).',
    noi_dung: 'Tìm câu, từ ngữ trong văn bản trả lời đúng điều đề hỏi, trích dẫn rồi nói ý nghĩa.',
    chi_tiet: 'Chỉ ra chi tiết (trích dẫn) → chi tiết đó cho thấy điều gì về nhân vật, cảm xúc, chủ đề.',
    bien_phap: 'Gọi tên biện pháp → Chỉ ra từ ngữ trong văn bản → Nêu tác dụng (gợi hình, gợi cảm, nhấn mạnh …, thể hiện …).',
    tieng_viet: 'Nhận diện → gọi tên đúng thuật ngữ → giải thích hoặc nêu tác dụng trong câu văn, câu thơ.',
    thong_diep: 'Thông điệp em tâm đắc nhất là … vì … (một lí do gắn với cuộc sống).',
    bai_hoc: 'Bài học: … (một câu) → vì sao → em sẽ làm gì (một việc cụ thể).',
    khac: 'Đọc kĩ yêu cầu, gạch chân từ khoá, trả lời đúng trọng tâm, có dẫn chứng từ văn bản.',
  };
  const KHUNG_DV = ['Nêu vấn đề', 'Giải thích', 'Lí lẽ 1 + dẫn chứng', 'Lí lẽ 2', 'Phản đề (mở rộng)', 'Bài học, liên hệ bản thân'];
  const pt = x => String(Math.round(x * 100) / 100).replace('.', ',');
  const pt1 = x => pt(x) + (Number.isInteger(x) ? ',0' : '');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const view = () => document.getElementById('view');

  const sortKey = e => String(e.ma).replace(/\d+/g, n => n.padStart(4, '0'));
  function add(e) {
    const i = store.findIndex(x => x.ma === e.ma);
    if (i >= 0) store[i] = e; else store.push(e);
    store.sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
  }
  const get = ma => store.find(x => x.ma === ma);
  const list = () => store.slice();
  const isTho = vb => /thơ|ca dao|lục bát|thất ngôn|song thất|ngũ ngôn|hát nói/i.test(vb.the_loai || '') ||
    (vb.noi_dung.split('\n').filter(Boolean).length >= 4 && vb.noi_dung.split('\n').every(l => l.length < 70));
  // mức gợi ý mặc định giảm dần theo thứ tự đề: 3 đề đầu đầy đủ, 4 đề sau vừa, còn lại ít
  const mucAuto = e => { const i = store.indexOf(e); return i < 3 ? 'day' : i < 7 ? 'vua' : 'it'; };
  const nguonTxt = v => v.nguon_goc === 'truoc_1929' ? 'tác phẩm công bố trước năm 1929' : 'văn bản soạn riêng để luyện tập';

  function vbHTML(vb) {
    if (!vb) return '';
    const body = isTho(vb)
      ? `<div class="van-tho">${vb.noi_dung.split(/\n\s*\n/).map(k => `<p>${k.split('\n').map(l => l.trim()).filter(Boolean).join('<br>')}</p>`).join('')}</div>`
      : `<div class="van-xuoi">${vb.noi_dung.split(/\n+/).map(p => p.trim()).filter(Boolean).map(p => `<p>${p}</p>`).join('')}</div>`;
    return `<div class="van-vb">${vb.ten ? `<p class="van-vb-ten">${vb.ten}</p>` : ''}${body}
      ${vb.tac_gia ? `<p class="van-vb-tg">(${vb.tac_gia})</p>` : ''}${vb.chu_thich.length ? `<p class="van-ct">${vb.chu_thich.join('<br>')}</p>` : ''}</div>`;
  }
  const lines = n => `<div class="sh-lines">${'<i></i>'.repeat(n)}</div>`;
  const head = (l, r) => `<div class="sh-head"><span>${l}</span><span>${r}</span></div>`;

  function pageDe(e) {
    const c = e.dh.cau, dv = e.dh.dv;
    return `<section class="sh-page van-page">${head(`${U.tenPhieu()} · LUYỆN ĐỀ TUYỂN SINH 10 – MÔN NGỮ VĂN`, `Đề ${esc(e.ma)}`)}
      <h1 class="sh-title">ĐỀ LUYỆN NGỮ VĂN – ĐỀ ${esc(e.ma)}</h1>
      <p class="sh-sub">Thời gian làm bài: ${e.phut} phút (không kể thời gian phát đề)</p>
      <p class="sh-info">Họ và tên: ........................................................ Lớp: .............. Ngày: ......../......../........ Điểm: ......../10</p>
      <h2 class="van-phan">PHẦN I. ĐỌC HIỂU (${pt1(e.dh.diem)} điểm)</h2>
      <p>Đọc văn bản sau và thực hiện các yêu cầu:</p>${vbHTML(e.dh.vb)}
      <ol class="van-cau">${c.map(x => `<li><b>Câu ${x.so}</b> <i>(${pt(x.diem)} điểm)</i>. ${x.de}</li>`).join('')}
        <li><b>Câu ${dv.so}</b> <i>(${pt(dv.diem)} điểm)</i>. ${dv.de}</li></ol>
      <h2 class="van-phan">PHẦN II. VIẾT (${pt1(e.viet.diem)} điểm)</h2>
      <p>${e.viet.de}</p>${vbHTML(e.viet.vb)}
      <p class="van-het">— Hết —</p></section>`;
  }
  function pageGoi(e, muc) {
    const c = e.dh.cau, dv = e.dh.dv, vt = e.viet;
    const goiCau = x => muc === 'it' ? `<p class="van-tip">💡 ${TIP[x.dang] || TIP.khac}</p>`
      : `<p class="van-tip">💡 ${x.goi || TIP[x.dang] || TIP.khac}</p>${muc === 'day' && x.mau ? `<p class="van-mau">✍️ Bắt đầu: <i>${x.mau}</i></p>` : ''}`;
    const khung = muc === 'it' ? `<p class="van-tip">💡 Khung 6 câu: ${KHUNG_DV.join(' → ')}.</p>`
      : `<ol class="van-khung">${(dv.khung.length ? dv.khung : KHUNG_DV).map(k => `<li>${muc === 'vua' ? k.split(/[:–]/)[0] : k}</li>`).join('')}</ol>${muc === 'day' && dv.mau ? `<p class="van-mau">✍️ Câu mở đầu: <i>${dv.mau}</i></p>` : ''}`;
    const dy = vt.dy, dyHTML = muc === 'it'
      ? `<p class="van-tip">💡 Mở bài (giới thiệu tác giả, tác phẩm, vấn đề) → Thân bài (từng ý: nội dung + nghệ thuật + cảm nhận) → Kết bài (khẳng định giá trị, liên hệ).</p>`
      : `<div class="van-dy"><p><b>Mở bài:</b> ${dy.mo.join(' ')}</p><p><b>Thân bài:</b></p><ol>${dy.than.map(t => `<li>${t}</li>`).join('')}</ol><p><b>Kết bài:</b> ${dy.ket.join(' ')}</p></div>
        ${muc === 'day' && vt.mau ? `<p class="van-mau">✍️ Mở bài mẫu: <i>${vt.mau}</i></p>` : ''}`;
    const tu = vt.tu.length ? `<p class="van-tu"><b>Từ ngữ dùng được:</b> ${vt.tu.join(' · ')}</p>` : '';
    return `<section class="sh-page van-page">${head('BÀI LÀM CÓ GỢI Ý', `Đề ${esc(e.ma)} · mức gợi ý: ${MUC[muc]}`)}
      <h1 class="sh-title">BÀI LÀM – ĐỀ ${esc(e.ma)}</h1>
      <p class="sh-info">Họ và tên: ........................................................ Lớp: .............. Ngày: ......../......../........</p>
      <div class="sh-check"><b>Tự soát:</b><span>☐ Mỗi câu đọc hiểu có dẫn chứng từ văn bản</span><span>☐ Đoạn văn đúng hình thức một đoạn, khoảng 200 chữ</span><span>☐ Bài văn đủ mở bài – thân bài – kết bài</span><span>☐ Chính tả, dấu câu, không gạch xoá nhiều</span></div>
      <h2 class="van-phan">PHẦN I. ĐỌC HIỂU</h2>
      ${c.map(x => `<div class="van-q"><p><b>Câu ${x.so}</b> <i>(${pt(x.diem)}đ · ${NhapDL.DANG_VAN[x.dang] || 'Khác'})</i></p>${goiCau(x)}${lines(x.dong)}</div>`).join('')}
      <div class="van-q"><p><b>Câu ${dv.so}</b> <i>(${pt(dv.diem)}đ · đoạn văn khoảng 200 chữ)</i></p>${khung}${lines(15)}</div>
      <h2 class="van-phan">PHẦN II. VIẾT <i>(khoảng 500 chữ)</i></h2>
      <div class="van-q">${dyHTML}${tu}${lines(34)}</div>
</section>`;
  }
  function pageCham(e) {
    const row = (lab, dap, cham) => `<tr class="van-row-h"><td><b>${lab}</b></td><td colspan="2">${dap}</td></tr>${cham.map(([s, p]) => `<tr><td></td><td>${s}</td><td class="num">${pt(p)}</td></tr>`).join('')}`;
    const dv = e.dh.dv, vt = e.viet;
    const loi = [...dv.loi, ...vt.loi];
    return `<section class="sh-page van-page sh-dapan">${head('HƯỚNG DẪN CHẤM', `Đề ${esc(e.ma)}`)}
      <h1 class="sh-title">HƯỚNG DẪN CHẤM – ĐỀ ${esc(e.ma)}</h1>
      <table class="sh-barem van-barem"><thead><tr><th>Câu</th><th>Đáp án – ý cần đạt</th><th>Điểm</th></tr></thead><tbody>
        <tr class="van-row-p"><td colspan="3"><b>PHẦN I. ĐỌC HIỂU (${pt1(e.dh.diem)} điểm)</b></td></tr>
        ${e.dh.cau.map(x => row(`Câu ${x.so}`, x.dap, x.cham)).join('')}
        ${row(`Câu ${dv.so}`, 'Đoạn văn khoảng 200 chữ', dv.cham)}
        <tr class="van-row-p"><td colspan="3"><b>PHẦN II. VIẾT (${pt1(vt.diem)} điểm)</b></td></tr>
        ${row('Bài văn', 'Bài văn khoảng 500 chữ', vt.cham)}
        <tr><td colspan="2"><b>Tổng</b></td><td class="num"><b>${pt(e.dh.diem + vt.diem)}</b></td></tr></tbody></table>
      ${loi.length ? `<p class="sh-loi"><b>Hay bị trừ điểm:</b> ${loi.join(' · ')}</p>` : ''}
      ${e.checklist.length ? `<p class="sh-loi"><b>Bẫy của đề này:</b> ${e.checklist.join(' · ')}</p>` : ''}
      <p class="ld-src">Ngữ liệu: ${[e.dh.vb, vt.vb].filter(Boolean).map(v => `${v.ten || 'văn bản'} – ${nguonTxt(v)}`).join('; ')}.${e.theo ? ` Cấu trúc theo: ${e.theo}.` : ''} Giám khảo linh hoạt khi học sinh diễn đạt khác nhưng đúng ý.</p></section>`;
  }
  // o.phan: các phần in ('de', 'goi', 'cham'); o.muc: 'day' | 'vua' | 'it'
  function sheetHTML(e, o = {}) {
    const ph = o.phan || ['de', 'goi', 'cham'], muc = o.muc || mucAuto(e);
    return `<div class="sheet van-sheet">${ph.includes('de') ? pageDe(e) : ''}${ph.includes('goi') ? pageGoi(e, muc) : ''}${ph.includes('cham') ? pageCham(e) : ''}</div>`;
  }

  async function printHTML(html, btn) {
    const lab = btn.textContent; btn.disabled = true; btn.textContent = 'Đang chuẩn bị…';
    let root = document.getElementById('print-root');
    if (!root) { root = document.createElement('div'); root.id = 'print-root'; document.body.appendChild(root); }
    root.innerHTML = html;
    document.body.classList.add('printing');
    const end = () => { document.body.classList.remove('printing'); root.innerHTML = ''; btn.disabled = false; btn.textContent = lab; window.removeEventListener('afterprint', end); };
    window.addEventListener('afterprint', end);
    setTimeout(() => { window.print(); setTimeout(() => { if (document.body.classList.contains('printing')) end(); }, 1500); }, 60);
  }
  const doneKey = ma => 'van:xong:' + ma;

  /* ---------- Trang danh sách ---------- */
  function listPage() {
    const es = list();
    const cards = es.map(e => {
      const vt = e.viet.vb || e.dh.vb, tho = vt && isTho(vt);
      return `<a class="tcard" href="#/van-10/de/${encodeURIComponent(e.ma)}"><span class="tno">${esc(e.ma)}</span><span class="tbody">
        <span class="tbai">${tho ? 'Phân tích thơ' : 'Phân tích truyện'} · ${e.phut} phút</span><span class="ttitle">${e.dh.vb ? e.dh.vb.ten || 'Văn bản đọc hiểu' : ''}</span>
        <span class="tdesc">${e.viet.de.replace(/<[^>]+>/g, '').slice(0, 140)}</span>
        <span class="chips">${U.get(doneKey(e.ma), false) ? '<span class="chip ok">Đã làm</span>' : ''}${e.src === 'may-nay' ? '<span class="chip warnc">Chỉ trên máy này</span>' : ''}${/^mau|^v?00$/i.test(e.ma) ? '<span class="chip">Đề mẫu</span>' : ''}</span></span></a>`;
    }).join('');
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/">← Chọn lớp</a></div>
      <section class="card hero"><p class="pill">📖 Ngữ văn vào 10 · dành cho học sinh lực học trung bình</p><h2>Làm chắc từng câu, viết đúng khung</h2>
      <p>Mỗi đề in thành PDF gồm <b>đề</b>, <b>bài làm có gợi ý</b> (khung trả lời, câu mở đầu, dàn ý – gợi ý giảm dần qua các đề) và <b>hướng dẫn chấm</b> từng ý để tự chấm.</p></section>
      <h2 class="sec">Cấu trúc đề (120 phút)</h2>
      <div class="card table-wrap"><table class="struct"><thead><tr><th>Phần</th><th>Điểm</th><th>Nội dung</th><th>Thời gian gợi ý</th></tr></thead><tbody>
        <tr><th scope="row">I. Đọc hiểu</th><td class="num">6,0</td><td>Câu hỏi về thể loại, chủ đề, thông điệp, bài học, tiếng Việt; viết đoạn văn khoảng 200 chữ</td><td>45 phút</td></tr>
        <tr><th scope="row">II. Viết</th><td class="num">4,0</td><td>Bài văn khoảng 500 chữ phân tích, cảm nhận một bài thơ hoặc truyện ngắn</td><td>65 phút</td></tr>
        <tr><th scope="row">Soát bài</th><td></td><td>Chính tả, dấu câu, đủ ý theo khung</td><td>10 phút</td></tr></tbody></table></div>
      <div class="two"><a class="card link-card" href="#/van-10/phuong-phap"><span class="big">🧭</span><b>Phương pháp làm bài</b><span>Khung trả lời từng loại câu, khung đoạn 200 chữ, dàn ý bài 500 chữ</span></a>
        <a class="card link-card" href="#/xuong"><span class="big">🧰</span><b>Xưởng dữ liệu (thầy cô)</b><span>Tạo prompt cho AI, nhập đề mới vào web</span></a></div>
      <h2 class="sec">Đề luyện (${es.length})</h2>
      ${es.length ? `<div class="tgrid">${cards}</div>` : '<p class="empty">Chưa có đề. Thầy cô tạo đề bằng Xưởng dữ liệu → Menu prompt, rồi nhập JSON vào web.</p>'}</main>`;
  }

  /* ---------- Trang phương pháp ---------- */
  function methodPage() {
    const tr = (a, b) => `<tr><th scope="row">${a}</th><td>${b}</td></tr>`;
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/van-10">← Ngữ văn vào 10</a></div>
      <section class="card hero"><h2>Phương pháp làm bài Ngữ văn</h2><p>Học sinh lực học trung bình lấy điểm bằng cách <b>trả lời đúng khung</b>: mỗi loại câu có một khung cố định, thuộc khung là có chữ để viết.</p></section>
      <h2 class="sec">1. Câu hỏi đọc hiểu</h2>
      <div class="card table-wrap"><table class="struct"><tbody>
        ${tr('Thể loại', TIP.the_loai)}${tr('Phương thức biểu đạt', TIP.phuong_thuc)}${tr('Biện pháp tu từ', TIP.bien_phap + ' Mẫu: "Biện pháp … qua từ ngữ "…" làm cho câu thơ sinh động, gợi hình; nhấn mạnh …; thể hiện tình cảm … của tác giả."')}
        ${tr('Chủ đề', TIP.chu_de)}${tr('Nội dung, chi tiết', TIP.chi_tiet)}${tr('Thông điệp', TIP.thong_diep)}${tr('Bài học', TIP.bai_hoc)}${tr('Tiếng Việt', TIP.tieng_viet)}</tbody></table></div>
      <div class="card"><h3>Ba bước cho mọi câu hỏi</h3><ol><li><b>Gạch chân từ khoá</b> của câu hỏi (xác định, chỉ ra, nêu tác dụng, theo em…).</li><li><b>Tìm dẫn chứng</b> trong văn bản, đánh dấu ngay trên đề.</li><li><b>Trả lời đủ ý</b>: câu 0,5 điểm viết 2–3 dòng; câu 1,0 điểm viết 4–6 dòng, có trích dẫn.</li></ol></div>
      <h2 class="sec">2. Đoạn văn khoảng 200 chữ</h2>
      <div class="card"><ol class="van-khung">${KHUNG_DV.map((k, i) => `<li><b>${k}</b>${['', ': … là gì, biểu hiện thế nào', ': vì sao quan trọng + một ví dụ người thật, việc thật', ': nếu không có / nếu ngược lại thì sao', ': phê phán biểu hiện trái ngược', ': em rút ra điều gì, sẽ làm gì'][i]}</li>`).join('')}</ol>
      <p>Viết thành <b>một đoạn</b> (lùi đầu dòng một lần, không xuống dòng giữa chừng), khoảng 12–15 dòng vở.</p></div>
      <h2 class="sec">3. Bài văn khoảng 500 chữ</h2>
      <div class="two"><div class="card"><h3>Phân tích bài thơ</h3><ol><li><b>Mở bài:</b> giới thiệu tác giả, bài thơ, cảm nhận chung.</li><li><b>Thân bài:</b> đi theo khổ hoặc theo ý; mỗi ý gồm <i>nội dung</i> (thơ nói gì) + <i>nghệ thuật</i> (từ ngữ, hình ảnh, biện pháp tu từ, nhịp, vần) + <i>cảm nhận</i> của em.</li><li><b>Đánh giá:</b> nét đặc sắc về nội dung, nghệ thuật.</li><li><b>Kết bài:</b> khẳng định giá trị, liên hệ bản thân.</li></ol></div>
        <div class="card"><h3>Phân tích truyện ngắn</h3><ol><li><b>Mở bài:</b> giới thiệu tác giả, truyện, vấn đề cần phân tích.</li><li><b>Thân bài:</b> tóm tắt ngắn; phân tích tình huống truyện, nhân vật (ngoại hình, lời nói, hành động, suy nghĩ), chi tiết đặc sắc, ngôi kể.</li><li><b>Đánh giá:</b> chủ đề, thông điệp, nghệ thuật kể chuyện.</li><li><b>Kết bài:</b> khẳng định giá trị, liên hệ bản thân.</li></ol></div></div>
      <div class="card"><h3>Câu chuyển ý dùng được ngay</h3><ul><li>Mở đầu bài thơ / câu chuyện, tác giả đã …</li><li>Không chỉ … mà còn …, đến khổ thơ tiếp theo, …</li><li>Đặc sắc hơn cả là chi tiết …</li><li>Qua đó, ta thấy …; Có thể nói, …</li></ul></div>
      <h2 class="sec">4. Luyện mỗi ngày 15 phút</h2>
      <div class="card"><ul><li>Thứ Hai – Tư – Sáu: 3 câu đọc hiểu theo khung (in phần Bài làm có gợi ý).</li><li>Thứ Ba – Năm: một đoạn văn 200 chữ theo khung 6 câu.</li><li>Cuối tuần: một đề đủ 120 phút, tự chấm theo hướng dẫn chấm, ghi lỗi vào sổ.</li></ul></div></main>`;
  }

  /* ---------- Trang một đề ---------- */
  function dePage(e) {
    const d = U.get(doneKey(e.ma), false), auto = mucAuto(e);
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/van-10">← Ngữ văn vào 10</a></div>
      <section class="card sheet-tools"><h2>Đề ${esc(e.ma)}</h2>
        <p class="lead">In ra làm trên giấy: trang <b>Đề</b>, trang <b>Bài làm có gợi ý</b> (viết thẳng vào dòng kẻ) và <b>Hướng dẫn chấm</b> để tự chấm sau khi làm xong.</p>
        <div class="opts-row"><label class="tog">Mức gợi ý <select id="vMuc"><option value="${auto}">Tự động (${MUC[auto]})</option><option value="day">Đầy đủ</option><option value="vua">Vừa</option><option value="it">Ít</option></select></label>
          <label class="tog"><input type="checkbox" id="vDe" checked> Đề</label><label class="tog"><input type="checkbox" id="vGoi" checked> Bài làm có gợi ý</label><label class="tog"><input type="checkbox" id="vCham"> Hướng dẫn chấm</label>
          <label class="tog"><input type="checkbox" id="vXong" ${d ? 'checked' : ''}> Em đã làm xong đề này</label>${U.kieuInHTML()}</div>
        <div class="row"><button class="btn primary" type="button" id="vIn">🖨️ In / Lưu PDF</button></div></section>
      <div class="paper-wrap" id="paper"></div></main>`;
    const $i = id => document.getElementById(id);
    const o = () => ({ muc: $i('vMuc').value, phan: [['de', 'vDe'], ['goi', 'vGoi'], ['cham', 'vCham']].filter(x => $i(x[1]).checked).map(x => x[0]) });
    const draw = () => { $i('paper').innerHTML = sheetHTML(e, o()); };
    ['vMuc', 'vDe', 'vGoi', 'vCham'].forEach(id => $i(id).addEventListener('change', draw));
    $i('vXong').addEventListener('change', ev => U.set(doneKey(e.ma), ev.target.checked));
    $i('vIn').addEventListener('click', ev => printHTML(sheetHTML(e, o()), ev.currentTarget));
    draw();
  }

  function route(parts) {
    if (parts[0] !== 'van-10') return false;
    if (parts[1] === 'phuong-phap') methodPage();
    else if (parts[1] === 'de' && get(decodeURIComponent(parts[2] || ''))) dePage(get(decodeURIComponent(parts[2])));
    else listPage();
    return true;
  }
  return { add, get, list, sheetHTML, route, isTho, TIP, MUC };
})();
