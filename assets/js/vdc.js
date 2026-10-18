/* =====================================================================
   VDC – Luyện VẬN DỤNG và VẬN DỤNG CAO cho lớp 10, 11, 12 (học sinh khá giỏi,
   lấy điểm cao giữa kì và cuối kì). Nạp TRƯỚC data/lop10/*.js… và TRƯỚC app.js.

   Đường link:
   #/lop10                 danh sách chủ đề theo kì (Giữa kì I, Cuối kì I, Giữa kì II, Cuối kì II)
   #/lop10/<mã>            trang chủ đề: kiến thức trọng tâm → từng dạng (phương pháp, ví dụ mẫu, bài tương tự)
   #/lop10/<mã>/phieu      phiếu PDF: kiến thức trọng tâm, đề luyện tập có dòng kẻ, gợi ý phương pháp + mã QR ở cuối
   #/lop10/<mã>/lg/<n>     lời giải bài n (đích của mã QR, đọc tốt trên điện thoại)

   Hợp đồng dữ liệu (một chủ đề = một tệp data/lopN/*.js):
   Vdc.add({ grade:'lop10', id:'ma-khong-dau', ky:['Giữa kì I', …], chuong:'Chương …', bai:'Bài …',
     title:S`…`, desc:'…', nguon:'tên tệp trong tai-lieu/ (bắt buộc khi có tài liệu)', mau:true? (nội dung minh họa),
     kt:[{t, b, fig?}],                                      // kiến thức trọng tâm
     dang:[{ ten, muc:'VD'|'VDC'|'VD – VDC', pp:['bước…'],   // phương pháp
             vd:[{ de, fig?, lg:['bước…'], ds }],            // ví dụ mẫu (lời giải đầy đủ)
             bt:[{ muc:'VD'|'VDC', de, figQ?, fig?, goiY, lg:['bước…'], ds, dong }] }] })   // bài tương tự
   ===================================================================== */
const Vdc = (() => {
  const GRADES = {
    lop10: { name: 'Toán 10', short: 'Lớp 10' },
    lop11: { name: 'Toán 11', short: 'Lớp 11' },
    lop12: { name: 'Toán 12', short: 'Lớp 12' },
  };
  const KY = ['Giữa kì I', 'Cuối kì I', 'Giữa kì II', 'Cuối kì II'];
  const list = [];
  function add(t) {
    ['grade', 'id', 'ky', 'title', 'kt', 'dang'].forEach(k => { if (t[k] === undefined) console.warn('Chủ đề VDC thiếu', k, t.id); });
    let n = 0; t.dang.forEach(d => d.bt.forEach(b => { b.n = ++n; b.dang = d; }));
    list.push(t);
  }
  const get = (g, id) => list.find(t => t.grade === g && t.id === id);
  const ofGrade = g => list.filter(t => t.grade === g);
  const allBt = t => t.dang.flatMap(d => d.bt);

  /* ---------- Địa chỉ web cho mã QR ---------- */
  function siteBase() {
    if (typeof location !== 'undefined' && /^https?:$/.test(location.protocol) && !/^(localhost|127\.)/.test(location.hostname))
      return location.origin + location.pathname;
    return (window.CONFIG && CONFIG.siteUrl) || '';
  }
  const lgUrl = (t, b, base) => `${base}#/${t.grade}/${t.id}/lg/${b.n}`;
  function qrSvg(text) {
    if (typeof qrcode === 'undefined') return '';
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    const q = qrcode(0, 'M'); q.addData(text); q.make();
    const n = q.getModuleCount();
    let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    return `<svg class="qr" viewBox="-2 -2 ${n + 4} ${n + 4}" shape-rendering="crispEdges" role="img" aria-label="Mã QR lời giải"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  }

  /* ---------- Tiến độ ---------- */
  const doneKey = (t, b) => `vdc:${t.grade}:${t.id}:${b.n}`;

  /* ---------- Các trang ---------- */
  const { esc, $, $$, h, get: sget, set: sset } = U;
  const view = () => $('#view');
  const chip = m => `<span class="muc ${m === 'VDC' ? 'vdc' : 'vd'}">${esc(m)}</span>`;
  const steps = arr => `<ol class="lg-steps">${arr.map(s => `<li>${s}</li>`).join('')}</ol>`;

  function gradePage(g) {
    const G = GRADES[g], ts = ofGrade(g);
    const sec = KY.map(k => {
      const items = ts.filter(t => t.ky.includes(k));
      const cards = items.map(t => {
        const bt = allBt(t), done = bt.filter(b => sget(doneKey(t, b), false)).length;
        return `<a class="tcard" href="#/${g}/${t.id}"><span class="tno">${t.dang.length}</span><span class="tbody">
          <span class="tbai">${esc(t.chuong || '')}</span><span class="ttitle">${t.title}</span><span class="tdesc">${t.desc}</span>
          <span class="chips"><span class="chip">${t.dang.length} dạng · ${bt.length} bài</span>${done ? `<span class="chip ok">Đã làm ${done}/${bt.length}</span>` : ''}${t.mau ? '<span class="chip warnc">Mẫu minh họa</span>' : ''}</span></span></a>`;
      }).join('');
      return `<h2 class="sec">${k}</h2>${items.length ? `<div class="tgrid">${cards}</div>` : '<p class="empty">Đang soạn theo tài liệu của thầy.</p>'}`;
    }).join('');
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/">← Chọn lớp</a></div>
      <section class="card hero"><p class="pill">🎯 ${esc(G.name)} · Vận dụng – Vận dụng cao</p><h2>Lấy điểm cao giữa kì và cuối kì</h2>
      <p>Dành cho học sinh khá, giỏi. Mỗi chủ đề gồm các <b>dạng</b> hay ra ở phần vận dụng: đọc <b>kiến thức trọng tâm</b>, xem <b>ví dụ mẫu</b>, tự làm <b>bài tương tự</b>; in <b>phiếu PDF</b> làm trên giấy, bí thì xem <b>gợi ý</b> cuối phiếu, làm xong <b>quét mã QR</b> để so lời giải.</p></section>
      ${sec}</main>`;
  }

  function topicPage(t) {
    let html = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/${t.grade}">← ${esc(GRADES[t.grade].name)}</a>
      <a class="btn primary" href="#/${t.grade}/${t.id}/phieu">🖨️ Phiếu PDF</a></div>
      <section class="thead card"><span class="tno big">${t.dang.length}</span><div><p class="tbai">${esc(t.chuong || '')}${t.bai ? ' · ' + esc(t.bai) : ''}</p><h2>${t.title}</h2>
      <p class="tdesc">${t.desc}</p><p class="chips">${t.ky.map(k => `<span class="chip">${esc(k)}</span>`).join('')}${t.mau ? '<span class="chip warnc">Mẫu minh họa – sẽ thay theo tài liệu của thầy</span>' : ''}</p></div></section>
      <nav class="tabs" aria-label="Các phần">${['<a class="tab" href="#kt">📘 Kiến thức</a>'].concat(t.dang.map((d, i) => `<a class="tab" href="#dang-${i + 1}">Dạng ${i + 1}</a>`)).join('')}</nav>
      <section class="card remind" id="kt"><h3>Kiến thức trọng tâm</h3>${t.kt.map(k => `<div class="kt-item"><h4>${k.t}</h4><div class="kb">${k.b}</div>${k.fig ? `<div class="figbox">${k.fig}</div>` : ''}</div>`).join('')}</section>`;
    t.dang.forEach((d, i) => {
      html += `<section class="dang" id="dang-${i + 1}"><h2 class="sec">Dạng ${i + 1}. ${d.ten} ${chip(d.muc)}</h2>
        <article class="card"><h3>Phương pháp</h3>${steps(d.pp)}</article>
        ${d.vd.map((v, j) => `<article class="card model vd-card"><p class="pill soft">Ví dụ mẫu ${j + 1}</p><div class="de">${v.de}</div>${v.fig ? `<div class="figbox">${v.fig}</div>` : ''}
          <div class="reveal-bar"><button class="btn" type="button" data-step>👣 Hiện từng bước</button><button class="btn ghost" type="button" data-all>Hiện toàn bộ</button></div>
          <ol class="lg-steps rv">${v.lg.map(s => `<li class="hid">${s}</li>`).join('')}</ol><p class="ds hid"><b>Đáp số:</b> ${v.ds}</p></article>`).join('')}
        <h3 class="sub">Bài tương tự</h3>
        ${d.bt.map(b => `<article class="card bt-card" data-n="${b.n}"><p class="bt-head"><b>Bài ${b.n}</b> ${chip(b.muc)}
            <label class="tog small"><input type="checkbox" data-done="${b.n}" ${sget(doneKey(t, b), false) ? 'checked' : ''}> Em đã làm được</label></p>
          <div class="de">${b.de}</div>${b.figQ ? `<div class="figbox">${b.figQ}</div>` : ''}
          <div class="row"><button class="btn" type="button" data-show="hint">💡 Gợi ý</button><button class="btn" type="button" data-show="ds">✅ Đáp số</button><a class="btn ghost" href="#/${t.grade}/${t.id}/lg/${b.n}">📖 Lời giải</a></div>
          <p class="warn hint" hidden>💡 ${b.goiY}</p><p class="ds-box" hidden><b>Đáp số:</b> ${b.ds}</p></article>`).join('')}
      </section>`;
    });
    html += `<div class="pane-foot"><a class="btn primary" href="#/${t.grade}/${t.id}/phieu">🖨️ In phiếu luyện tập</a></div></main>`;
    view().innerHTML = html;
    $$('.vd-card').forEach(card => {
      const items = $$('.rv > li', card), ds = $('.ds', card);
      let k = 0;
      const show = n => { k = n; items.forEach((li, i) => li.classList.toggle('hid', i >= n)); ds.classList.toggle('hid', n < items.length); };
      $('[data-step]', card).addEventListener('click', () => show(Math.min(k + 1, items.length)));
      $('[data-all]', card).addEventListener('click', () => show(items.length));
    });
    $$('.bt-card').forEach(card => {
      $$('[data-show]', card).forEach(btn => btn.addEventListener('click', () => {
        const el = $(btn.dataset.show === 'hint' ? '.hint' : '.ds-box', card); el.hidden = !el.hidden;
      }));
      const cb = $('[data-done]', card);
      cb.addEventListener('change', () => { const b = allBt(t).find(x => x.n === +cb.dataset.done); sset(doneKey(t, b), cb.checked); });
    });
    $$('.tabs a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const el = document.getElementById(a.getAttribute('href').slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
  }

  function lgPage(t, n) {
    const b = allBt(t).find(x => x.n === n);
    if (!b) return topicPage(t);
    const bt = allBt(t), prev = bt[n - 2], next = bt[n];
    view().innerHTML = `${App.topBar()}<main class="wrap lg-page"><div class="toolbar"><a class="back" href="#/${t.grade}/${t.id}">← Về chủ đề</a>
        <span class="nav-mini">${prev ? `<a href="#/${t.grade}/${t.id}/lg/${prev.n}">‹ Bài ${prev.n}</a>` : ''}${next ? `<a href="#/${t.grade}/${t.id}/lg/${next.n}">Bài ${next.n} ›</a>` : ''}</span></div>
      <section class="card"><p class="tbai">${esc(GRADES[t.grade].name)} · ${t.title}</p><h2>Lời giải Bài ${b.n} ${chip(b.muc)}</h2>
        <p class="lead small">Dạng: ${b.dang.ten}</p><div class="de">${b.de}</div>${b.fig || b.figQ ? `<div class="figbox">${b.fig || b.figQ}</div>` : ''}
        <p class="warn">💡 <b>Phương pháp:</b> ${b.goiY}</p>
        <h3>Lời giải</h3>${steps(b.lg)}<p class="ds-final"><b>Đáp số:</b> ${b.ds}</p></section>
      <section class="card"><h3>Tự chấm</h3><p>So từng bước với bài của em. Sai ở bước nào thì xem lại <a href="#/${t.grade}/${t.id}">ví dụ mẫu của dạng này</a> rồi làm lại bài trên phiếu.</p>
        <label class="tog"><input type="checkbox" id="lgDone" ${sget(doneKey(t, b), false) ? 'checked' : ''}> Em đã làm đúng bài này</label></section></main>`;
    $('#lgDone').addEventListener('change', e => sset(doneKey(t, b), e.target.checked));
  }

  /* ---------- Phiếu PDF ---------- */
  function sheetHTML(t, o) {
    const base = siteBase(), G = GRADES[t.grade];
    const head = `<div class="sh-head"><span>CON ĐƯỜNG TỚI TRƯỜNG · ${esc(G.name.toUpperCase())} · VẬN DỤNG – VẬN DỤNG CAO</span><span>${esc(t.ky.join(' · '))}</span></div>`;
    let s = `<section class="sh-page">${head}<h1 class="sh-title">PHIẾU LUYỆN TẬP</h1><p class="sh-sub">${t.title}</p>
      <p class="sh-info">Họ và tên: .......................................................... Lớp: .............. Ngày: ......../......../........</p>
      <div class="sh-kt"><p class="sh-h">KIẾN THỨC TRỌNG TÂM</p>${t.kt.map(k => `<div class="sh-kt-i"><b>${k.t}.</b> ${k.b}</div>`).join('')}</div>`;
    if (o.vd) s += `<p class="sh-h">VÍ DỤ MẪU</p>${t.dang.map((d, i) => d.vd.map(v => `<div class="sh-vd"><p><b>Dạng ${i + 1} – Ví dụ.</b> ${v.de}</p>${v.fig ? `<div class="sh-fig">${v.fig}</div>` : ''}<ol class="sh-lg">${v.lg.map(x => `<li>${x}</li>`).join('')}</ol><p><b>Đáp số:</b> ${v.ds}</p></div>`).join('')).join('')}`;
    s += `<p class="sh-h">ĐỀ LUYỆN TẬP</p>`;
    t.dang.forEach((d, i) => {
      s += `<p class="sh-dang">Dạng ${i + 1}. ${d.ten}</p>`;
      d.bt.forEach(b => {
        s += `<div class="sh-q"><p><b>Bài ${b.n}</b> <i>(${esc(b.muc)})</i>. ${b.de}</p>${b.figQ ? `<div class="sh-fig">${b.figQ}</div>` : ''}<div class="sh-lines">${'<i></i>'.repeat(b.dong || 8)}</div></div>`;
      });
    });
    const qrNote = base ? `Quét mã QR để xem lời giải từng bài.` : `Chưa có địa chỉ web nên chưa in được mã QR – thầy điền <code>siteUrl</code> trong config.js sau khi đưa web lên mạng.`;
    s += `<div class="sh-hints"><p class="sh-h">GỢI Ý PHƯƠNG PHÁP <span class="sh-note">(chỉ xem khi đã tự làm mà vẫn bí · ${qrNote})</span></p><div class="sh-hgrid">
      ${allBt(t).map(b => `<div class="sh-hint">${base && o.qr ? `<div class="sh-qr">${qrSvg(lgUrl(t, b, base))}</div>` : ''}<div><b>Bài ${b.n}.</b> ${b.goiY}</div></div>`).join('')}</div></div></section>`;
    return `<div class="sheet math">${s}</div>`;
  }

  function sheetPage(t) {
    const o = Object.assign({ vd: false, qr: true }, sget('vdcSheet', {}));
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/${t.grade}/${t.id}">← Về chủ đề</a></div>
      <div class="card sheet-tools"><h2>Phiếu luyện tập · ${t.title}</h2>
        <p class="lead">Phiếu A4: kiến thức trọng tâm, ${allBt(t).length} bài vận dụng có dòng kẻ để làm, cuối phiếu là gợi ý phương pháp và mã QR lời giải từng bài.</p>
        <div class="opts-row"><label class="tog"><input type="checkbox" id="oVd" ${o.vd ? 'checked' : ''}> Kèm ví dụ mẫu có lời giải</label>
        <label class="tog"><input type="checkbox" id="oQr" ${o.qr ? 'checked' : ''}> In mã QR lời giải</label></div>
        <div class="row"><button class="btn primary" type="button" id="printBtn">🖨️ In / Lưu PDF</button></div></div>
      <div class="paper-wrap" id="paper"></div></main>`;
    const draw = () => { $('#paper').innerHTML = sheetHTML(t, sget('vdcSheet', o)); };
    draw();
    ['oVd', 'oQr'].forEach(k => $('#' + k).addEventListener('change', () => { sset('vdcSheet', { vd: $('#oVd').checked, qr: $('#oQr').checked }); draw(); }));
    $('#printBtn').addEventListener('click', async () => {
      const btn = $('#printBtn'); btn.disabled = true; btn.textContent = 'Đang chuẩn bị…';
      await MathTS.done($('#paper'));
      let root = $('#print-root'); if (!root) { root = h('<div id="print-root"></div>'); document.body.appendChild(root); }
      root.innerHTML = $('#paper').innerHTML; document.body.classList.add('printing');
      const end = () => { document.body.classList.remove('printing'); root.innerHTML = ''; btn.disabled = false; btn.textContent = '🖨️ In / Lưu PDF'; window.removeEventListener('afterprint', end); };
      window.addEventListener('afterprint', end);
      setTimeout(() => { window.print(); setTimeout(() => { if (document.body.classList.contains('printing')) end(); }, 1500); }, 60);
    });
  }

  /* ---------- Điều hướng: parts = ['lop10', mã?, 'phieu'|'lg'?, n?] ---------- */
  function route(parts) {
    const g = parts[0];
    if (!GRADES[g]) return false;
    const t = parts[1] && get(g, parts[1]);
    if (!t) gradePage(g);
    else if (parts[2] === 'phieu') sheetPage(t);
    else if (parts[2] === 'lg') lgPage(t, +parts[3]);
    else topicPage(t);
    return true;
  }

  return { add, get, list, ofGrade, allBt, GRADES, KY, route, sheetHTML, qrSvg, lgUrl, siteBase };
})();
