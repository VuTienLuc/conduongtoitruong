/* =====================================================================
   TRÌNH CHIẾU BÀI GIẢNG – LUYỆN TẬP ONLINE (nút 📽️ trên trang bài học #/bai-hoc/<lớp>/<bài>)
   - Toàn màn hình (máy không cho thì phủ kín cửa sổ). Mỗi trang một ý: bìa, mục tiêu, từng mục kiến thức, từng ví dụ,
     cần nhớ, rồi từng câu luyện tập. Cỡ chữ tự tính cho nội dung lấp đầy màn hình, chừa lề.
   - Bấm → / phím cách / Enter: hiện bước tiếp (lời giải, đáp án, từng ý đúng – sai) rồi mới sang trang.
     ← lùi · Home / End · A–D chọn phương án · - / + chữ nhỏ / to (0: về 100%) · F bật/tắt toàn màn hình · O bật/tắt nhanh công cụ ⭐ · Esc thoát. Điện thoại, iPad: vuốt trái / phải.
   - Biểu tượng ✦ mờ góc dưới phải: công cụ CONFIG.congCuTrinhChieu (⭐, 🖼️) mở ngay trong lúc chiếu (BaiHoc.congCu).
   ===================================================================== */
const TrinhChieu = (() => {
  const { esc, $, $$, shuffle, get, set } = U;
  // Hệ số cỡ chữ thầy chỉnh bằng phím - / + (hoặc nút A− A+), nhân với cỡ chữ tự tính; nhớ cho lần chiếu sau.
  const CO_MIN = 0.6, CO_MAX = 2;
  let co = Math.min(CO_MAX, Math.max(CO_MIN, +get('tc:co', 1) || 1));
  const ABCD = 'ABCD', YL = 'abcd';
  let root = null, deck = [], cur = 0, ro = null, keyFn = null;

  /* ---------- Dựng các trang từ một bài học ---------- */
  function dung(e) {
    const b = BaiHoc.baiOf(e.lop, e.bai), out = [];
    const ten = `Bài ${e.bai}. ${esc(b ? b.ten : e.ten)}`;
    out.push({ loai: 'bia', html: `<p class="tc-kicker">Toán ${e.lop}${b ? ` · Chương ${b.chuong.so}. ${esc(b.chuong.ten)}` : ''}</p><h1>${ten}</h1>
      <p class="tc-sub">Bài giảng – Luyện tập</p>` });
    if (e.muc_tieu.length) out.push({ html: `<h2>🎯 Học xong bài này, em</h2><ul>${e.muc_tieu.map(x => `<li>${x}</li>`).join('')}</ul>` });
    let k = 0;
    e.giang.forEach(m => {
      if (m.b || m.luu_y) out.push({ html: `<h2>${m.t}</h2>${m.b ? `<div class="tc-body">${m.b}</div>` : ''}${m.luu_y ? `<p class="tc-warn">⚠️ ${m.luu_y}</p>` : ''}` });
      m.vd.forEach(v => { k++; out.push({ html: `<h2>Ví dụ ${k}</h2><div class="tc-body">${v.de}</div>
        <div class="tc-an tc-lg" data-b="1"><ol>${v.lg.map(x => `<li>${x}</li>`).join('')}</ol>${v.ds ? `<p class="tc-ds"><b>Đáp số:</b> ${v.ds}</p>` : ''}</div>`, buoc: 1 }); });
    });
    if (e.can_nho.length) out.push({ html: `<h2>🔑 Cần nhớ</h2><ul class="tc-can">${e.can_nho.map(x => `<li>${x}</li>`).join('')}</ul>` });
    const n = e.tn.length + e.ds.length + e.tln.length;
    if (n) out.push({ loai: 'bia', luyen: true, html: `<p class="tc-kicker">${ten}</p><h1>✍️ Luyện tập</h1><p class="tc-sub">${[e.tn.length && `${e.tn.length} câu trắc nghiệm`, e.ds.length && `${e.ds.length} câu đúng – sai`, e.tln.length && `${e.tln.length} câu trả lời ngắn`].filter(Boolean).join(' · ')}</p>` });
    e.tn.forEach((q, i) => {
      const opts = shuffle(q.a), good = opts.indexOf(q.a[0]);
      out.push({ loai: 'tn', good, html: `<h2 class="tc-qh">Câu ${i + 1} <span>· Trắc nghiệm</span></h2><div class="tc-body">${q.q}</div>
        <div class="tc-opts">${opts.map((o, j) => `<button type="button" class="tc-opt" data-j="${j}"><b>${ABCD[j]}</b><span>${o}</span></button>`).join('')}</div>
        <div class="tc-an tc-why" data-b="1"><b>Đáp án ${ABCD[good]}.</b> ${BaiHoc.doiChu(q, opts)}</div>`, buoc: 1 });
    });
    e.ds.forEach((q, i) => out.push({ loai: 'ds', html: `<h2 class="tc-qh">Câu ${i + 1} <span>· Đúng – Sai</span></h2><div class="tc-body">${q.q}</div>
      <ol class="tc-dsl">${q.y.map((y, j) => `<li data-j="${j}"><span><b>${YL[j]})</b> ${y[0]}</span><em class="tc-an ${y[1] ? 'dung' : 'sai'}" data-b="${j + 1}">${y[1] ? 'Đúng' : 'Sai'}</em></li>`).join('')}</ol>
      ${q.why ? `<div class="tc-an tc-why" data-b="5">${q.why}</div>` : ''}`, buoc: q.why ? 5 : 4 }));
    e.tln.forEach((q, i) => out.push({ html: `<h2 class="tc-qh">Câu ${i + 1} <span>· Trả lời ngắn</span></h2><div class="tc-body">${q.q}</div>
      <div class="tc-an tc-why" data-b="1"><p class="tc-ds"><b>Đáp số: ${esc(q.ans)}</b></p>${q.why || ''}</div>`, buoc: 1 }));
    out.push({ loai: 'bia', html: `<h1>🎉 Hết bài</h1><p class="tc-sub">${ten}</p>` });
    return out;
  }

  /* ---------- Cỡ chữ lấp đầy màn hình ---------- */
  function fit() {
    const sl = root && $('.tc-slide', root), inn = sl && $('.tc-in', sl); if (!inn) return;
    const bia = sl.classList.contains('bia'), cs = getComputedStyle(sl), W = sl.clientWidth;
    // trang nội dung: chữ bám mép trên, chỉ dùng tối đa 80% chiều cao – chừa phía dưới để thầy vẽ hình, viết thêm
    const H = (sl.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)) * (bia ? 1 : 0.8);
    let lo = 12, hi = Math.max(16, Math.min(H * (bia ? 0.11 : 0.085), W * (bia ? 0.06 : 0.045)));
    const vua = f => { inn.style.fontSize = f + 'px'; return inn.scrollHeight <= H + 1 && inn.scrollWidth <= inn.clientWidth + 1; };
    let f = hi;
    if (!vua(hi)) { for (let t = 0; t < 9; t++) { const m = (lo + hi) / 2; if (vua(m)) lo = m; else hi = m; } f = lo; }
    inn.style.fontSize = (f * co) + 'px';
    // phóng to quá khung thì cho cuộn trang (con lăn chuột, vuốt dọc)
    sl.classList.toggle('cuon', sl.scrollHeight > sl.clientHeight + 1);
    sl.scrollTop = 0;
  }
  function doiCo(d) {
    co = d === 0 ? 1 : Math.round(Math.min(CO_MAX, Math.max(CO_MIN, co + d)) * 10) / 10;
    set('tc:co', co); fit();
    const t = $('.tc-cop', root); if (t) t.textContent = Math.round(co * 100) + '%';
  }

  /* ---------- Hiện trang, từng bước ---------- */
  function ve(i) {
    cur = Math.max(0, Math.min(deck.length - 1, i));
    if (viTri) { const m = get(VT, {}); m[viTri] = { i: cur, t: Date.now() }; set(VT, m); }
    const d = deck[cur], sl = $('.tc-slide', root);
    d.da = d.da || 0;
    sl.className = 'tc-slide' + (d.loai === 'bia' ? ' bia' : '');
    sl.innerHTML = `<div class="tc-in">${d.html}</div>`;
    $('.tc-so', root).textContent = `${cur + 1} / ${deck.length}`;
    $('.tc-prog i', root).style.width = ((cur + 1) / deck.length * 100) + '%';
    if (d.loai === 'tn') $$('.tc-opt', sl).forEach(b => b.addEventListener('click', () => chon(+b.dataset.j)));
    if (d.loai === 'ds') $$('.tc-dsl li', sl).forEach(li => li.addEventListener('click', () => { const j = +li.dataset.j + 1; d.da = Math.max(d.da, j); hien(); }));
    hien();
    fit();
    if (window.MathTS) Promise.resolve(MathTS.done(sl)).then(fit);
  }
  function hien() {
    const d = deck[cur], sl = $('.tc-slide', root);
    $$('[data-b]', sl).forEach(x => x.classList.toggle('on', +x.dataset.b <= d.da));
    if (d.loai === 'tn' && d.da >= 1) $$('.tc-opt', sl).forEach(b => { if (+b.dataset.j === d.good) b.classList.add('good'); if (+b.dataset.j === d.chon && d.chon !== d.good) b.classList.add('bad'); });
  }
  function chon(j) { const d = deck[cur]; if (d.loai !== 'tn' || d.da) return; d.chon = j; d.da = 1; hien(); }
  function toi() { const d = deck[cur]; if (d.buoc && (d.da || 0) < d.buoc) { d.da = (d.da || 0) + 1; hien(); } else if (cur < deck.length - 1) ve(cur + 1); }
  function lui() { if (cur > 0) ve(cur - 1); }

  /* ---------- Mở, đóng ---------- */
  const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
  function toanManHinh() {
    const go = root.requestFullscreen || root.webkitRequestFullscreen;
    if (fsEl()) { tatTay = true; (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
    else if (go) Promise.resolve(go.call(root)).catch(() => {});
  }
  // Nhớ trang đang chiếu của từng bài: lỡ đóng (thoát toàn màn hình, chuyển trang) thì mở lại chiếu tiếp đúng chỗ.
  let viTri = null;
  const VT = 'tc:vitri', CON_HAN = 3 * 3600 * 1000;
  function mo(e, phan) {
    dong();
    deck = dung(e);
    root = document.createElement('div');
    root.className = 'tc-root is-full';
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', 'Trình chiếu bài học'); root.tabIndex = -1;
    root.innerHTML = `<div class="tc-main cc-main"><div class="tc-prog"><i></i></div><section class="tc-slide" aria-live="polite"></section>
      <nav class="tc-bar" aria-label="Điều khiển trình chiếu"><button type="button" data-k="lui" aria-label="Trang trước">‹</button><span class="tc-so"></span>
      <button type="button" data-k="toi" aria-label="Tiếp">›</button><button type="button" data-k="nho" aria-label="Chữ nhỏ hơn (phím -)">A−</button><span class="tc-cop" title="Cỡ chữ – bấm để về 100%">${Math.round(co * 100)}%</span><button type="button" data-k="lon" aria-label="Chữ to hơn (phím +)">A+</button><button type="button" data-k="fs" aria-label="Toàn màn hình">⛶</button><button type="button" data-k="x" aria-label="Thoát trình chiếu">✕</button></nav></div>`;
    document.body.appendChild(root); document.body.classList.add('bh-noscroll');
    BaiHoc.congCu(root, () => root.focus());
    $('.tc-bar', root).addEventListener('click', ev => {
      const k = ev.target.closest('button') && ev.target.closest('button').dataset.k;
      if (k === 'lui') lui(); else if (k === 'toi') toi(); else if (k === 'nho') doiCo(-0.1); else if (k === 'lon') doiCo(0.1); else if (k === 'fs') toanManHinh(); else if (k === 'x') dong();
      else if (ev.target.closest('.tc-cop')) doiCo(0);
    });
    // vuốt trên điện thoại, iPad
    let x0 = null;
    $('.tc-slide', root).addEventListener('pointerdown', ev => { x0 = ev.clientX; });
    $('.tc-slide', root).addEventListener('pointerup', ev => { if (x0 === null) return; const dx = ev.clientX - x0; x0 = null; if (Math.abs(dx) > 60) (dx < 0 ? toi : lui)(); });
    keyFn = ev => {
      if (!root || ev.altKey || ev.ctrlKey || ev.metaKey) return;
      const k = ev.key;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) { if (k === 'Enter' && ev.target.closest && ev.target.closest('.bh-cc')) return; ev.preventDefault(); toi(); }
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { ev.preventDefault(); lui(); }
      else if (k === '+' || k === '=') { ev.preventDefault(); doiCo(0.1); }
      else if (k === '-' || k === '_') { ev.preventDefault(); doiCo(-0.1); }
      else if (k === '0') doiCo(0);
      else if (k === 'Home') ve(0); else if (k === 'End') ve(deck.length - 1);
      else if (k === 'Escape') dong();
      else if (k === 'f' || k === 'F') toanManHinh();
      else if (k === 'o' || k === 'O' || ev.code === 'KeyO') { ev.preventDefault(); if (root.ccToggle) root.ccToggle(0); }
      else if (/^[a-dA-D]$/.test(k)) chon(ABCD.indexOf(k.toUpperCase()));
    };
    document.addEventListener('keydown', keyFn);
    ro = new ResizeObserver(() => fit()); ro.observe($('.tc-slide', root));
    viTri = `${e.lop}-${e.bai}`;
    const cu = get(VT, {})[viTri], dau = phan === 'luyen' ? Math.max(0, deck.findIndex(d => d.luyen)) : 0;
    ve(cu && Date.now() - cu.t < CON_HAN && cu.i < deck.length && cu.i >= dau ? cu.i : dau);
    toanManHinh();
    root.focus();
  }
  // Thoát toàn màn hình (Esc của trình duyệt) hoặc chuyển trang thì đóng trình chiếu luôn.
  let daFs = false, tatTay = false;   // tatTay: thầy tự tắt toàn màn hình (⛶ / F) thì vẫn chiếu trong cửa sổ
  // Trang công cụ (⭐, 🖼️) tự bật toàn màn hình bên trong trình chiếu: vẫn là đang chiếu, không đóng (lỗi thầy báo 09/11/2026).
  const cuaTa = el => !!el && (el === root || root.contains(el));
  const fsDoi = () => { if (!root) return; if (cuaTa(fsEl())) daFs = true; else if (daFs) { daFs = false; if (tatTay) tatTay = false; else dong(); } };
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('fullscreenchange', fsDoi); document.addEventListener('webkitfullscreenchange', fsDoi);
    window.addEventListener('hashchange', () => dong());
  }
  function dong() {
    if (!root) return;
    if (fsEl() === root) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    if (ro) ro.disconnect();
    document.removeEventListener('keydown', keyFn);
    root.remove(); root = null; daFs = false; document.body.classList.remove('bh-noscroll');
  }
  return { mo, dong, dung, fit };
})();
