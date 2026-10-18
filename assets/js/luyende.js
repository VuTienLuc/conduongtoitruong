/* =====================================================================
   LUYỆN ĐỀ – mỗi chủ đề ôn thi vào 10 có 10 đề luyện đúng dạng, đúng số điểm
   của bài tương ứng trong đề tuyển sinh TP.HCM. Mỗi đề in thành một tệp PDF A4:
   trang 1 là đề + khung ô li để làm, trang 2 (tuỳ chọn) là đáp án – hướng dẫn chấm.
   Tab "📝 Luyện đề" của chủ đề: #/cd/<mã>/de  ·  một đề: #/cd/<mã>/de/<k>

   Hợp đồng dữ liệu (data/vao-10/luyen-de/ldNN-*.js, nạp SAU tệp chủ đề):
   LuyenDe.add('<mã chủ đề>', {
     phut: 12,                         // thời gian gợi ý cho một đề
     soat: ['…'],                      // (tuỳ chọn) 4 ý tự soát in cuối trang đề
     de: [{ ten:'Dạng …', nguon:'tệp đề gốc (dạng tham khảo)', pts:1, h:70 (mm ô li),
            de, figQ?, fig?, ans, barem:[[bước, điểm]…], loi:['lỗi hay bị trừ điểm'…] } ×10] })
   ===================================================================== */
const LuyenDe = (() => {
  const store = {};
  const SOAT = ['Gọi ẩn có đơn vị, điều kiện', 'Lập đúng phương trình / hệ', 'Giải đúng, đối chiếu điều kiện', 'Trả lời đủ câu hỏi, có đơn vị'];
  const add = (id, o) => { store[id] = o; };
  const get = id => store[id];
  const ids = () => Object.keys(store);
  const pt = x => String(x).replace('.', ',');
  const sum = a => a.reduce((s, x) => s + x, 0);

  function pageDe(t, L, k) {
    const d = L.de[k - 1];
    return `<section class="sh-page ld-page">
      <div class="sh-head"><span>CON ĐƯỜNG TỚI TRƯỜNG · LUYỆN ĐỀ TUYỂN SINH 10 – MÔN TOÁN</span><span>Đề số ${k}/${L.de.length}</span></div>
      <h1 class="sh-title">ĐỀ LUYỆN SỐ ${k} – ${t.bai.split('·')[0].trim().toUpperCase()} (${pt(d.pts.toFixed(1))} điểm)</h1>
      <p class="sh-sub">${t.title} · ${d.ten} · Thời gian gợi ý: ${L.phut || 12} phút</p>
      <p class="sh-info">Họ và tên: ........................................................ Lớp: .............. Ngày: ......../......../........ Điểm: ......../${pt(d.pts)}</p>
      <div class="sh-q"><div class="sh-de"><b>${t.bai.split('·')[0].trim()}.</b> <i>(${pt(d.pts.toFixed(1))} điểm)</i> ${d.de}</div>${d.figQ ? `<div class="sh-fig">${d.figQ}</div>` : ''}
        <div class="sh-write" style="height:${d.h || 70}mm"></div></div>
      <div class="sh-check"><b>Tự soát:</b> ${(L.soat || SOAT).map(x => `<span>☐ ${x}</span>`).join('')}</div>
    </section>`;
  }
  function pageKey(t, L, k) {
    const d = L.de[k - 1];
    return `<section class="sh-page ld-page">
      <div class="sh-head"><span>ĐÁP ÁN – HƯỚNG DẪN CHẤM</span><span>Đề số ${k}/${L.de.length} · ${t.bai.split('·')[0].trim()}</span></div>
      <h1 class="sh-title">ĐÁP ÁN ĐỀ LUYỆN SỐ ${k}</h1><p class="sh-sub">${d.ten}</p>
      <div class="sh-key"><p><b>Đáp số:</b> ${d.ans}</p>${d.fig ? `<div class="sh-fig">${d.fig}</div>` : ''}
        <table class="sh-barem"><tbody>${d.barem.map(([s, x]) => `<tr><td>${s}</td><td class="num">${pt(x)}</td></tr>`).join('')}
          <tr><td><b>Tổng</b></td><td class="num"><b>${pt(sum(d.barem.map(b => b[1])))}</b></td></tr></tbody></table>
        ${(d.loi || []).length ? `<p class="sh-loi"><b>Hay bị trừ điểm:</b> ${d.loi.join(' · ')}</p>` : ''}
        <p class="ld-src">Dạng bài tham khảo: ${d.nguon} (số liệu đã đổi).</p></div>
    </section>`;
  }
  // o.key: kèm trang đáp án; ks: danh sách số đề (mặc định cả bộ)
  function sheetHTML(t, o = {}, ks) {
    const L = get(t.id); if (!L) return '';
    ks = ks || L.de.map((_, i) => i + 1);
    return `<div class="sheet math">${ks.map(k => pageDe(t, L, k) + (o.key ? pageKey(t, L, k) : '')).join('')}</div>`;
  }

  async function printHTML(html, btn) {
    const lab = btn.textContent; btn.disabled = true; btn.textContent = 'Đang chuẩn bị…';
    let root = document.getElementById('print-root');
    if (!root) { root = document.createElement('div'); root.id = 'print-root'; document.body.appendChild(root); }
    root.innerHTML = html;
    await MathTS.done(root);
    document.body.classList.add('printing');
    const end = () => { document.body.classList.remove('printing'); root.innerHTML = ''; btn.disabled = false; btn.textContent = lab; window.removeEventListener('afterprint', end); };
    window.addEventListener('afterprint', end);
    setTimeout(() => { window.print(); setTimeout(() => { if (document.body.classList.contains('printing')) end(); }, 1500); }, 60);
  }

  const isDone = (id, k) => !!(U.get('ld:' + id, {})[k]);
  const setDone = (id, k, v) => { const o = U.get('ld:' + id, {}); o[k] = v; U.set('ld:' + id, o); };

  function pane(t, el, sel) {
    const L = get(t.id);
    if (!L) { el.innerHTML = '<div class="card empty"><p>Bộ 10 đề luyện của chủ đề này đang được soạn. Thầy cô sẽ bổ sung sớm.</p></div>'; return; }
    const total = L.de.length, done = L.de.filter((_, i) => isDone(t.id, i + 1)).length;
    const k = Math.min(Math.max(parseInt(sel, 10) || 1, 1), total);
    el.innerHTML = `<div class="card sheet-tools">
        <p class="lead"><b>${total} đề luyện</b> đúng dạng ${t.bai.split('·')[0].trim()} của đề tuyển sinh. Mỗi đề in thành <b>một tệp PDF</b>: trang đề có khung ô li để làm, trang sau là đáp án – hướng dẫn chấm. Làm đúng giờ (${L.phut || 12} phút/đề), tự chấm theo barem, sai ở đâu xem lại tab Tự luận mẫu.</p>
        <p class="chips"><span class="chip">Đã làm ${done}/${total}</span></p>
        <div class="ld-list">${L.de.map((d, i) => `<a class="ld-item${i + 1 === k ? ' on' : ''}${isDone(t.id, i + 1) ? ' ok' : ''}" href="#/cd/${t.id}/de/${i + 1}"><b>Đề ${i + 1}</b><span>${d.ten}</span></a>`).join('')}</div>
        <div class="opts-row"><label class="tog"><input type="checkbox" id="ldKey"> Kèm đáp án – hướng dẫn chấm (trang sau mỗi đề)</label>
          <label class="tog"><input type="checkbox" id="ldDone" ${isDone(t.id, k) ? 'checked' : ''}> Em đã làm xong Đề ${k}</label></div>
        <div class="row"><button class="btn primary" type="button" id="ldOne">🖨️ In / Lưu PDF Đề ${k}</button><button class="btn" type="button" id="ldAll">🖨️ In cả ${total} đề</button></div></div>
      <div class="paper-wrap" id="paper"></div>`;
    const key = () => document.getElementById('ldKey').checked;
    const draw = () => { document.getElementById('paper').innerHTML = sheetHTML(t, { key: key() }, [k]); };
    draw();
    document.getElementById('ldKey').addEventListener('change', draw);
    document.getElementById('ldDone').addEventListener('change', e => { setDone(t.id, k, e.target.checked); pane(t, el, k); });
    document.getElementById('ldOne').addEventListener('click', e => printHTML(sheetHTML(t, { key: key() }, [k]), e.currentTarget));
    document.getElementById('ldAll').addEventListener('click', e => printHTML(sheetHTML(t, { key: key() }), e.currentTarget));
  }

  return { add, get, ids, sheetHTML, pane };
})();
