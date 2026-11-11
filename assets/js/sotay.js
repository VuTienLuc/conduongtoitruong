/* =====================================================================
   SỔ TAY CÔNG THỨC TRA CỨU – TOÁN VÀO 10 TP.HCM (thầy yêu cầu 11/11/2026)
   Công thức, mẹo nhớ, lỗi hay sai được hệ thống theo DẠNG của từng bài trong đề tuyển sinh.
   #/so-tay          cả sổ tay: ô tìm (không dấu), chọn chủ đề, in PDF
   #/so-tay/<cd>     một chủ đề (nen, 1 … 7)
   Dữ liệu: JSON "loai":"so_tay_toan" do AI soạn (Xưởng dữ liệu → Menu prompt → Sổ tay công thức), kiểm ở NhapDL.check.
   Nhập thêm tệp cùng chủ đề: chỉ thêm DẠNG chưa có (so tên dạng), dạng trùng giữ bản đầu; "tra_nhanh" gộp, bỏ dòng trùng.
   ===================================================================== */
const SoTay = (() => {
  const CHU = [
    ['nen', 'Kiến thức nền – Căn thức, hằng đẳng thức, biến đổi, làm tròn, đơn vị đo'],
    ['1', 'Bài 1 – Hàm số y = ax² và đồ thị, đường thẳng'],
    ['2', 'Bài 2 – Phương trình bậc hai, định lí Viète'],
    ['3', 'Bài 3 – Xác suất, thống kê'],
    ['4', 'Bài 4 – Toán thực tế đại số – hình học'],
    ['5', 'Bài 5 – Hình học không gian thực tế'],
    ['6', 'Bài 6 – Hệ phương trình, lập hệ giải toán thực tế'],
    ['7', 'Bài 7 – Hình học phẳng (câu a, b, c)'],
  ];
  const TEN = Object.fromEntries(CHU);
  const MUC = { co_ban: 'Cơ bản', kha: 'Khá', nang_cao: 'Nâng cao' };
  const store = {};
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const view = () => document.getElementById('view');
  const $i = id => document.getElementById(id);
  const fold = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\\[a-zA-Z]+/g, ' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  const fpTen = s => fold(s).replace(/^dang\s*\d+\s*[.:)–-]?\s*/, '').replace(/[^a-z0-9]/g, '');

  function add(e) {
    const cu = store[e.cd];
    if (!cu) { store[e.cd] = e; return { moi: true, them: e.dang.length, bo_qua: 0 }; }
    const co = new Set(cu.dang.map(d => fpTen(d.ten)));
    const moi = e.dang.filter(d => !co.has(fpTen(d.ten)));
    cu.dang.push(...moi);
    const tn = new Set(cu.tra.map(x => fold(x.hoi)));
    cu.tra.push(...e.tra.filter(x => !tn.has(fold(x.hoi))));
    if (e.nguon && !cu.nguon.includes(e.nguon)) cu.nguon = [cu.nguon, e.nguon].filter(Boolean).join('; ');
    if (!cu.tq && e.tq) cu.tq = e.tq;
    return { moi: false, them: moi.length, bo_qua: e.dang.length - moi.length };
  }
  const get = cd => store[cd];
  const list = () => CHU.map(c => store[c[0]]).filter(Boolean);
  const tenDang = cd => (store[cd] ? store[cd].dang.map(d => d.ten.replace(/<[^>]+>/g, '').replace(/\\\(|\\\)/g, '$')) : []);   // cho lệnh AI: dạng đã có

  /* ---------- Hiển thị ---------- */
  const dangHTML = (d, cd, k) => `<article class="card st-dang" data-tim="${esc(fold([d.ten, d.nd, d.ct.map(c => c.ten + ' ' + c.ct + ' ' + c.dk + ' ' + c.gc).join(' '), d.cach.join(' '), d.meo, d.loi.join(' ')].join(' ')))}" id="st-${cd}-${k}">
      <h3>${d.ten}${d.muc ? ` <span class="chip">${MUC[d.muc] || esc(d.muc)}</span>` : ''}</h3>
      ${d.nd ? `<p class="st-nd"><b>Nhận ra:</b> ${d.nd}</p>` : ''}
      ${d.ct.length ? `<table class="st-ct"><tbody>${d.ct.map(c => `<tr><th scope="row">${c.ten}</th><td>${c.ct}${c.dk || c.gc ? `<div class="st-dk">${c.dk ? `Điều kiện: ${c.dk}` : ''}${c.dk && c.gc ? ' · ' : ''}${c.gc}</div>` : ''}</td></tr>`).join('')}</tbody></table>` : ''}
      ${d.cach.length ? `<div class="st-cach"><b>Cách làm:</b><ol>${d.cach.map(x => `<li>${x}</li>`).join('')}</ol></div>` : ''}
      ${d.meo ? `<p class="st-meo">💡 <b>Mẹo nhớ:</b> ${d.meo}</p>` : ''}
      ${d.loi.length ? `<div class="st-loi">⚠️ <b>Lỗi hay sai:</b><ul>${d.loi.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}
      ${d.vd ? `<details class="st-vd"><summary>Ví dụ minh họa</summary><p>${d.vd.de}</p>${d.vd.lg.length ? `<ol>${d.vd.lg.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}${d.vd.ds ? `<p><b>Đáp số:</b> ${d.vd.ds}</p>` : ''}</details>` : ''}
    </article>`;
  const chuDeHTML = e => `<section class="st-cd" data-cd="${esc(e.cd)}"><h2 class="sec">${esc(TEN[e.cd])}</h2>
      ${e.tq ? `<p class="lead">${e.tq}</p>` : ''}
      ${e.tra.length ? `<div class="card st-tra"><b>🔎 Tra nhanh – thấy gì, dùng gì</b><table><tbody>${e.tra.map(x => `<tr data-tim="${esc(fold(x.hoi + ' ' + x.dap))}"><th scope="row">${x.hoi}</th><td>${x.dap}</td></tr>`).join('')}</tbody></table></div>` : ''}
      <nav class="st-muc" aria-label="Các dạng">${e.dang.map((d, k) => `<a href="#/so-tay/${e.cd}" data-den="st-${e.cd}-${k}">${d.ten.replace(/<[^>]+>/g, '')}</a>`).join('')}</nav>
      ${e.dang.map((d, k) => dangHTML(d, e.cd, k)).join('')}
      ${e.nguon ? `<p class="muted small">Nguồn: ${e.nguon}</p>` : ''}</section>`;

  // Bản in: gọn, hai cột, mỗi chủ đề sang trang mới
  function sheetHTML(ds) {
    return `<div class="sheet st-sheet">${ds.map(e => `<section class="sh-page st-page"><div class="sh-head"><span>${U.tenPhieu()} · SỔ TAY CÔNG THỨC TOÁN VÀO 10</span><span>${esc(TEN[e.cd])}</span></div>
      <h1 class="sh-title">${esc(TEN[e.cd]).toUpperCase()}</h1>${e.tq ? `<p class="sh-sub">${e.tq}</p>` : ''}
      ${e.tra.length ? `<div class="sh-remind"><b>Tra nhanh – thấy gì, dùng gì</b><table class="st-tra-in"><tbody>${e.tra.map(x => `<tr><td>${x.hoi}</td><td>${x.dap}</td></tr>`).join('')}</tbody></table></div>` : ''}
      <div class="st-cot">${e.dang.map(d => `<div class="st-in-dang"><h3>${d.ten}</h3>${d.nd ? `<p><i>Nhận ra:</i> ${d.nd}</p>` : ''}
        ${d.ct.map(c => `<p class="st-in-ct"><b>${c.ten}:</b> ${c.ct}${c.dk ? ` <i>(${c.dk})</i>` : ''}${c.gc ? ` – ${c.gc}` : ''}</p>`).join('')}
        ${d.cach.length ? `<p><i>Cách làm:</i> ${d.cach.map((x, i) => `(${i + 1}) ${x}`).join(' ')}</p>` : ''}
        ${d.meo ? `<p>💡 ${d.meo}</p>` : ''}${d.loi.length ? `<p>⚠️ ${d.loi.join('; ')}</p>` : ''}</div>`).join('')}</div></section>`).join('')}</div>`;
  }

  function page(cd) {
    const ds = list(), chon = cd && store[cd] ? [store[cd]] : ds;
    const tong = ds.reduce((t, e) => t + e.dang.length, 0);
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="${cd ? '#/so-tay' : '#/vao-10'}">← ${cd ? 'Cả sổ tay' : 'Toán vào 10'}</a></div>
      <section class="card hero"><p class="pill">📒 Toán vào 10 TP.HCM</p><h2>Sổ tay công thức tra cứu</h2>
        <p>Công thức, cách làm, mẹo nhớ và lỗi hay sai – xếp theo <b>dạng bài</b> của từng câu trong đề tuyển sinh. ${tong ? `${tong} dạng trong ${ds.length} chủ đề.` : ''}</p>
        ${ds.length ? `<div class="st-tools"><input id="stTim" type="search" placeholder="Tìm: viete, delta, the tich non, tiep tuyen…" aria-label="Tìm trong sổ tay" autocomplete="off">
          <button class="btn" type="button" id="stIn">🖨️ In ${cd ? 'chủ đề này' : 'cả sổ tay'} (PDF)</button></div>
        <div class="chips st-chips">${CHU.map(([k, t]) => store[k] ? `<a class="chip${k === cd ? ' on' : ''}" href="#/so-tay/${k}">${esc(t.split(' – ')[0])} · ${store[k].dang.length} dạng</a>` : `<span class="chip muted" title="Đang soạn">${esc(t.split(' – ')[0])}</span>`).join('')}</div>` : ''}</section>
      ${ds.length ? `<p class="muted" id="stDem" aria-live="polite"></p><div id="stBody">${chon.map(chuDeHTML).join('')}</div>`
        : '<p class="empty">Sổ tay đang được soạn. Thầy cô tạo nội dung ở Xưởng dữ liệu → Menu prompt → 📒 Sổ tay công thức Toán vào 10.</p>'}</main>`;
    if (!ds.length) return;
    const tim = () => {
      const q = fold($i('stTim').value).trim().split(/\s+/).filter(Boolean);
      let n = 0;
      view().querySelectorAll('.st-dang, .st-tra tr').forEach(x => { const ok = q.every(w => x.dataset.tim.includes(w)); x.hidden = !ok; if (ok && x.classList.contains('st-dang')) n++; });
      view().querySelectorAll('.st-cd').forEach(s => { s.hidden = q.length > 0 && !s.querySelector('.st-dang:not([hidden]), .st-tra tr:not([hidden])'); });
      view().querySelectorAll('.st-muc').forEach(m => { m.hidden = q.length > 0; });
      $i('stDem').textContent = q.length ? `${n} dạng khớp “${$i('stTim').value.trim()}”` : '';
    };
    $i('stTim').addEventListener('input', tim);
    view().querySelectorAll('[data-den]').forEach(a => a.addEventListener('click', ev => { ev.preventDefault(); const t = $i(a.dataset.den); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
    $i('stIn').addEventListener('click', ev => OnTap.printHTML(sheetHTML(chon), ev.currentTarget));
  }

  function route(parts) {
    if (parts[0] !== 'so-tay') return false;
    page(parts[1] && TEN[parts[1]] ? parts[1] : '');
    return true;
  }
  return { CHU, TEN, MUC, add, get, list, tenDang, fpTen, sheetHTML, route };
})();
