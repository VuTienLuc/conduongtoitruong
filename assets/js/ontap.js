/* =====================================================================
   PHIẾU ÔN TẬP 90 PHÚT THEO CHỦ ĐỀ (Toán vào 10) – bài tập do AI (NotebookLM / Gem) tìm trong tài liệu,
   xếp từ cơ bản đến nâng cao; mỗi đợt một phiếu, đợt sau không lặp bài của đợt trước (NhapDL.check so dấu vân tay).
   #/on-tap            danh sách phiếu theo chủ đề (Bài 1 … Bài 7c)
   #/on-tap/<mã>       một phiếu: in PDF (mục tiêu, nhắc nhanh → các phần có dòng kẻ → gợi ý cuối phiếu → tự đánh giá → lời giải)
   Dữ liệu: JSON "loai":"on_tap_toan" hoặc Markdown chuẩn (NhapDL), tạo bằng Xưởng dữ liệu → Menu prompt.
   ===================================================================== */
const OnTap = (() => {
  const store = [];
  const THU = ['1', '2', '3', '4', '5', '6', '7a', '7b', '7c'];
  const TEN = { 1: 'Bài 1 – Hàm số y = ax² và đồ thị', 2: 'Bài 2 – Phương trình bậc hai, Viète', 3: 'Bài 3 – Xác suất', 4: 'Bài 4 – Thực tế đại số – hình học',
    5: 'Bài 5 – Hình học không gian thực tế', 6: 'Bài 6 – Hệ phương trình thực tế', '7a': 'Bài 7a – Hình học phẳng (câu a)', '7b': 'Bài 7b – Hình học phẳng (câu b)', '7c': 'Bài 7c – Hình học phẳng (câu c)' };
  const CHU = 'ABCDEFGH';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const view = () => document.getElementById('view');
  const key = e => `${THU.indexOf(e.bai)}-${String(e.dot).padStart(3, '0')}-${e.ma}`;
  function add(e) { const i = store.findIndex(x => x.ma === e.ma); if (i >= 0) store[i] = e; else store.push(e); store.sort((a, b) => key(a).localeCompare(key(b))); }
  const get = ma => store.find(x => x.ma === ma);
  const list = () => store.slice();
  const ofTopic = id => store.filter(e => e.id === id);
  const nextDot = bai => Math.max(0, ...store.filter(e => e.bai === String(bai)).map(e => e.dot)) + 1;
  const allBai = e => e.phan.flatMap(p => p.bai);
  // danh sách đã dùng (nguồn – tóm tắt) để đưa vào lệnh cho AI
  const daDung = bai => store.filter(e => e.bai === String(bai)).flatMap(e => allBai(e).map(b => {
    const t = b.de.replace(/\\\(|\\\)|\\\[|\\\]/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return `${b.nguon ? b.nguon.replace(/<[^>]+>/g, '') + ' – ' : ''}${t.slice(0, 70)}${t.length > 70 ? '…' : ''} (${e.ma})`;
  }));

  /* ---------- Phiếu in ---------- */
  const lines = n => `<div class="sh-lines">${'<i></i>'.repeat(n)}</div>`;
  const head = (l, r) => `<div class="sh-head"><span>${l}</span><span>${r}</span></div>`;
  function pagePhieu(e) {
    const goi = allBai(e).filter(b => b.goi);
    return `<section class="sh-page ot-page">${head('CON ĐƯỜNG TỚI TRƯỜNG · PHIẾU ÔN TẬP TOÁN VÀO 10', `${esc(e.ma)} · đợt ${e.dot}`)}
      <h1 class="sh-title">PHIẾU ÔN TẬP ${e.phut} PHÚT</h1><p class="sh-sub">${e.chu_de || TEN[e.bai]} · từ cơ bản đến nâng cao</p>
      <p class="sh-info">Họ và tên: ........................................................ Lớp: .............. Ngày: ......../......../........ Thời gian bắt đầu: ............</p>
      ${e.muc_tieu.length || e.kt.length ? `<div class="sh-remind ot-kt">${e.muc_tieu.length ? `<p><b>Mục tiêu:</b> ${e.muc_tieu.join('; ')}.</p>` : ''}${e.kt.length ? `<b>Kiến thức cần nhớ:</b><ul>${e.kt.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}</div>` : ''}
      ${e.phan.map((p, k) => `<h2 class="sh-h">PHẦN ${CHU[k]} – ${p.muc.toUpperCase()} (${p.phut} phút)</h2>
        ${p.bai.map(b => `<div class="sh-q"><div class="sh-de"><b>Bài ${b.so}.</b> ${b.de}</div>${b.can ? `<p class="ot-can">🔑 Cần nhớ: ${b.can}</p>` : ''}${lines(b.dong)}</div>`).join('')}`).join('')}
      ${goi.length ? `<div class="sh-hints"><h2 class="sh-h">GỢI Ý – CHỈ XEM KHI BÍ</h2><div class="ot-goi">${goi.map(b => `<p><b>Bài ${b.so}:</b> ${b.goi}</p>`).join('')}</div></div>` : ''}
      <div class="sh-check"><b>Tự đánh giá:</b>${(e.tdg.length ? e.tdg : ['Làm hết phần Cơ bản trong thời gian', 'Trình bày đủ bước, có kết luận', 'Đánh dấu bài sai để làm lại sau 3 ngày']).map(x => `<span>☐ ${x}</span>`).join('')}
        <span>Thời gian làm: ............ phút · Số bài đúng: ......../${allBai(e).length}</span></div></section>`;
  }
  function pageLoiGiai(e) {
    return `<section class="sh-page ot-page">${head('ĐÁP ÁN – LỜI GIẢI', `${esc(e.ma)} · đợt ${e.dot}`)}<h1 class="sh-title">LỜI GIẢI PHIẾU ÔN TẬP</h1><p class="sh-sub">${e.chu_de || TEN[e.bai]}</p>
      ${e.phan.map((p, k) => `<h2 class="sh-h">PHẦN ${CHU[k]} – ${p.muc.toUpperCase()}</h2>${p.bai.map(b => `<div class="sh-vd"><p><b>Bài ${b.so}.</b> <b>Đáp số:</b> ${b.dap}</p>
        ${b.can ? `<p class="ot-can">🔑 Kiến thức dùng: ${b.can}</p>` : ''}<ol class="sh-lg">${b.lg.map(x => `<li>${x}</li>`).join('')}</ol>${b.nguon ? `<p class="ld-src">Nguồn: ${b.nguon}</p>` : ''}</div>`).join('')}`).join('')}</section>`;
  }
  const sheetHTML = (e, o = {}) => `<div class="sheet math ot-sheet">${pagePhieu(e)}${o.key ? pageLoiGiai(e) : ''}</div>`;

  // Markdown chuẩn (đọc lại được bằng NhapDL.parse) – để thầy dùng ở công cụ khác (Typst, Word…)
  const plain = s => String(s || '').replace(/<br\s*\/?>/g, '\n').replace(/\\\(\s*/g, '$').replace(/\s*\\\)/g, '$').replace(/\\\[\s*/g, '$$$$').replace(/\s*\\\]/g, '$$$$')
    .replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  function toMd(e) {
    const L = [`---`, `loai: on_tap_toan`, `ma: ${e.ma}`, `bai: ${e.bai}`, `chu_de: ${plain(e.chu_de || TEN[e.bai])}`, `dot: ${e.dot}`, `thoi_gian: ${e.phut}`, `---`, '',
      `# Phiếu ôn tập ${e.phut} phút – ${plain(e.chu_de || TEN[e.bai])} (đợt ${e.dot})`, ''];
    if (e.muc_tieu.length) L.push('## Mục tiêu', ...e.muc_tieu.map(x => `- ${plain(x)}`), '');
    if (e.kt.length) L.push('## Kiến thức cần nhớ', ...e.kt.map(x => `- ${plain(x)}`), '');
    e.phan.forEach((p, k) => {
      L.push(`## Phần ${CHU[k]} – ${plain(p.muc)} (${p.phut} phút)`, '');
      p.bai.forEach(b => { L.push(`### Bài ${b.so}`, plain(b.de)); if (b.nguon) L.push(`*Nguồn:* ${plain(b.nguon)}`); if (b.can) L.push(`*Cần nhớ:* ${plain(b.can)}`); if (b.goi) L.push(`> Gợi ý: ${plain(b.goi)}`); L.push(`*Dòng kẻ:* ${b.dong}`, ''); });
    });
    if (e.tdg.length) L.push('## Tự đánh giá', ...e.tdg.map(x => `- [ ] ${plain(x)}`), '');
    L.push('## Đáp án và lời giải', '');
    allBai(e).forEach(b => L.push(`### Bài ${b.so}`, `**Đáp số:** ${plain(b.dap)}`, ...b.lg.map((x, i) => `${i + 1}. ${plain(x)}`), ''));
    return L.join('\n');
  }

  async function printHTML(html, btn) {
    const lab = btn.textContent; btn.disabled = true; btn.textContent = 'Đang chuẩn bị…';
    let root = document.getElementById('print-root');
    if (!root) { root = document.createElement('div'); root.id = 'print-root'; document.body.appendChild(root); }
    root.innerHTML = html; await MathTS.done(root); document.body.classList.add('printing');
    const end = () => { document.body.classList.remove('printing'); root.innerHTML = ''; btn.disabled = false; btn.textContent = lab; window.removeEventListener('afterprint', end); };
    window.addEventListener('afterprint', end);
    setTimeout(() => { window.print(); setTimeout(() => { if (document.body.classList.contains('printing')) end(); }, 1500); }, 60);
  }
  function download(name, text, type) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- Trang ---------- */
  const doneKey = ma => 'ontap:xong:' + ma;
  function listPage() {
    const sec = THU.map(b => {
      const es = store.filter(e => e.bai === b);
      return `<h2 class="sec">${TEN[b]}</h2>${es.length ? `<div class="tgrid">${es.map(e => `<a class="tcard" href="#/on-tap/${encodeURIComponent(e.ma)}"><span class="tno">${e.dot}</span><span class="tbody">
        <span class="tbai">Đợt ${e.dot} · ${e.phut} phút · ${allBai(e).length} bài</span><span class="ttitle">${esc(e.ma)}</span><span class="tdesc">${e.phan.map(p => `${p.muc}: ${p.bai.length} bài`).join(' · ')}</span>
        <span class="chips">${U.get(doneKey(e.ma), false) ? '<span class="chip ok">Đã làm</span>' : ''}${e.src === 'may-nay' ? '<span class="chip warnc">Chỉ trên máy này</span>' : ''}</span></span></a>`).join('')}</div>`
        : '<p class="empty">Chưa có phiếu. Thầy cô tạo bằng Xưởng dữ liệu → Menu prompt → Phiếu ôn tập 90 phút.</p>'}`;
    }).join('');
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/vao-10">← Ôn thi vào 10</a></div>
      <section class="card hero"><p class="pill">🗂️ Phiếu ôn tập 90 phút</p><h2>Ôn từng chủ đề, từ cơ bản đến nâng cao</h2>
      <p>Mỗi phiếu là một buổi ôn 90 phút: làm <b>phần Cơ bản</b> cho chắc, rồi <b>Khá</b>, cuối cùng thử <b>Nâng cao</b>. Bí thì xem <b>gợi ý</b> cuối phiếu, làm xong in kèm <b>lời giải</b> để tự chấm. Mỗi đợt là bài mới, không lặp đợt trước.</p></section>${sec}</main>`;
  }
  function phieuPage(e) {
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/on-tap">← Phiếu ôn tập</a></div>
      <section class="card sheet-tools"><h2>${esc(e.ma)} · đợt ${e.dot}</h2><p class="lead">${e.chu_de || TEN[e.bai]} – ${e.phan.map(p => `${p.muc} ${p.phut} phút`).join(' → ')}.</p>
        <div class="opts-row"><label class="tog"><input type="checkbox" id="oKey"> Kèm lời giải (trang sau)</label><label class="tog"><input type="checkbox" id="oXong" ${U.get(doneKey(e.ma), false) ? 'checked' : ''}> Em đã làm xong phiếu này</label></div>
        <div class="row"><button class="btn primary" type="button" id="oIn">🖨️ In / Lưu PDF</button><button class="btn" type="button" id="oMd">⬇️ Tải Markdown (.md)</button><a class="btn" href="#/cd/${e.id}/lt">📘 Học lại chủ đề</a></div></section>
      <div class="paper-wrap" id="paper"></div></main>`;
    const $i = id => document.getElementById(id);
    const draw = () => { $i('paper').innerHTML = sheetHTML(e, { key: $i('oKey').checked }); };
    $i('oKey').addEventListener('change', draw);
    $i('oXong').addEventListener('change', ev => U.set(doneKey(e.ma), ev.target.checked));
    $i('oIn').addEventListener('click', ev => printHTML(sheetHTML(e, { key: $i('oKey').checked }), ev.currentTarget));
    $i('oMd').addEventListener('click', () => download(`${e.ma}.md`, toMd(e), 'text/markdown'));
    draw();
  }
  function route(parts) {
    if (parts[0] !== 'on-tap') return false;
    const e = parts[1] && get(decodeURIComponent(parts[1]));
    if (e) phieuPage(e); else listPage();
    return true;
  }
  return { add, get, list, ofTopic, nextDot, daDung, sheetHTML, toMd, route, TEN, THU };
})();
