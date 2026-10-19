/* =====================================================================
   LUYỆN ĐỀ – mỗi chủ đề ôn thi vào 10 có 10, 20… đề luyện đúng dạng, đúng số điểm
   của bài tương ứng trong đề tuyển sinh TP.HCM. Mỗi đề in thành một tệp PDF A4:
   trang 1 là đề + khung ô li để làm, [trang Gợi ý từng nấc nếu đề có], trang cuối (tuỳ chọn) là đáp án – hướng dẫn chấm.
   Tab "📝 Luyện đề" của chủ đề: #/cd/<mã>/de  ·  một đề: #/cd/<mã>/de/<k>
   Bộ có Thẻ công cụ (the): #/cd/<mã>/de/the (thẻ in một trang) · #/cd/<mã>/de/tuduy (luyện tư duy 10 phút mỗi ngày)

   Hợp đồng dữ liệu (data/vao-10/luyen-de/ldNN-*.js, nạp SAU tệp chủ đề):
   LuyenDe.add('<mã chủ đề>', {
     phut: 12,                         // thời gian gợi ý cho một đề
     soat: ['…'],                      // (tuỳ chọn) 4 ý tự soát in cuối trang đề
     the: [{ id, ten, cc }],           // (tuỳ chọn) Thẻ công cụ: dạng kết luận → công cụ
     giam: [7, 14],                    // (tuỳ chọn) giảm dần gợi ý: đề ≤ 7 đủ 3 nấc, ≤ 14 còn 2 nấc, sau đó 1 nấc
     de: [{ ten:'Dạng …', nguon:'tệp đề gốc (dạng tham khảo)', pts:1, h:70 (mm ô li),
            de, figQ?, fig?, ans, barem:[[bước, điểm]…], loi:['lỗi hay bị trừ điểm'…],
            goi?: [nấc 1 Nhận dạng, nấc 2 Hướng đi, nấc 3 Khung lời giải],   // gợi ý từng nấc
            q?, ch?, cc?: ['mã công cụ'…], part? } ×10k] })                  // dùng cho Luyện tư duy
   ===================================================================== */
const LuyenDe = (() => {
  const store = {};
  const SOAT = ['Gọi ẩn có đơn vị, điều kiện', 'Lập đúng phương trình / hệ', 'Giải đúng, đối chiếu điều kiện', 'Trả lời đủ câu hỏi, có đơn vị'];
  const NAC = ['Nhận dạng', 'Hướng đi', 'Khung lời giải'];
  const ASK = ['Kết luận thuộc dạng nào? (tra Thẻ công cụ)', 'Câu trước đã cho mình điều gì?', 'Đoạn thẳng, góc nào có mặt ở cả hai vế?', 'Trên hình còn góc vuông, tam giác cân, tiếp tuyến nào chưa dùng?'];
  const add = (id, o) => { store[id] = o; };
  const get = id => store[id];
  const ids = () => Object.keys(store);
  const pt = x => String(x).replace('.', ',');
  const sum = a => a.reduce((s, x) => s + x, 0);
  const baiOf = t => t.bai.split('·')[0].trim();
  // số nấc gợi ý được in cho đề k (giảm dần để học sinh quen tự suy luận)
  const nac = (L, k) => !L.giam ? 3 : k <= L.giam[0] ? 3 : k <= L.giam[1] ? 2 : 1;
  const nacNote = L => L.giam ? `đề 1–${L.giam[0]}: 3 nấc · đề ${L.giam[0] + 1}–${L.giam[1]}: 2 nấc · từ đề ${L.giam[1] + 1}: chỉ còn Nấc 1` : '';
  const pages = (L, k, o = {}) => 1 + (o.goi !== false && L.de[k - 1].goi ? 1 : 0) + (o.key ? 1 : 0);

  function pageDe(t, L, k) {
    const d = L.de[k - 1];
    return `<section class="sh-page ld-page">
      <div class="sh-head"><span>CON ĐƯỜNG TỚI TRƯỜNG · LUYỆN ĐỀ TUYỂN SINH 10 – MÔN TOÁN</span><span>Đề số ${k}/${L.de.length}${d.goi ? ' · bí thì lật trang Gợi ý' : ''}</span></div>
      <h1 class="sh-title">ĐỀ LUYỆN SỐ ${k} – ${baiOf(t).toUpperCase()} (${pt(d.pts.toFixed(1))} điểm)</h1>
      <p class="sh-sub">${t.title} · ${d.ten} · Thời gian gợi ý: ${L.phut || 12} phút</p>
      <p class="sh-info">Họ và tên: ........................................................ Lớp: .............. Ngày: ......../......../........ Điểm: ......../${pt(d.pts)}</p>
      <div class="sh-q"><div class="sh-de"><b>${baiOf(t)}.</b> <i>(${pt(d.pts.toFixed(1))} điểm)</i> ${d.de}</div>${d.figQ ? `<div class="sh-fig">${d.figQ}</div>` : ''}
        <div class="sh-write" style="height:${d.h || 70}mm"></div></div>
      <div class="sh-check"><b>Tự soát:</b> ${(L.soat || SOAT).map(x => `<span>☐ ${x}</span>`).join('')}</div>
    </section>`;
  }
  function theTable(L, withEx) {
    const ex = id => {
      const m = {};
      ids().filter(i => get(i).the).forEach(i => get(i).de.forEach((d, j) => { if ((d.cc || []).includes(id)) (m[d.part || i] = m[d.part || i] || []).push(j + 1); }));
      return Object.keys(m).sort().map(p => `7${p}: ${m[p].length >= 20 ? 'mọi đề' : m[p].join(', ')}`).join('<br>') || '—';
    };
    return `<table class="ld-the${withEx ? ' full' : ''}">${withEx ? '<colgroup><col style="width:24%"><col style="width:56%"><col style="width:20%"></colgroup>' : '<colgroup><col style="width:26%"><col></colgroup>'}<thead><tr><th>Kết luận cần có</th><th>Công cụ</th>${withEx ? '<th>Luyện ở đề</th>' : ''}</tr></thead><tbody>${L.the.map(r => `<tr><td><b>${r.ten}</b></td><td>${r.cc}</td>${withEx ? `<td class="ld-ex">${ex(r.id)}</td>` : ''}</tr>`).join('')}</tbody></table>`;
  }
  function pageGoi(t, L, k) {
    const d = L.de[k - 1], n = nac(L, k);
    const box = (i) => i < n
      ? `<div class="ld-nac"><div class="ld-nac-h">☐ Nấc ${i + 1} – ${NAC[i]}</div><div>${d.goi[i]}</div></div>`
      : `<div class="ld-nac off"><div class="ld-nac-h">Nấc ${i + 1} – ${NAC[i]}: đã bỏ ở đề này</div><div>Em đã quen dần – hãy tự đi tiếp từ nấc trên${i === 2 ? ', tự viết khung lời giải' : ''} rồi đối chiếu đáp án.</div></div>`;
    return `<section class="sh-page ld-page">
      <div class="sh-head"><span>GỢI Ý TỪNG NẤC – CHỈ MỞ KHI BÍ</span><span>Đề số ${k}/${L.de.length} · ${baiOf(t)}</span></div>
      <h1 class="sh-title">GỢI Ý ĐỀ LUYỆN SỐ ${k}</h1><p class="sh-sub">${d.ten}</p>
      <p class="ld-howto"><b>Cách dùng:</b> tự làm ít nhất 5 phút. Bí thì che trang, chỉ đọc <b>Nấc 1</b> rồi làm tiếp; 3 phút sau vẫn bí mới đọc nấc tiếp theo. Đánh dấu ☑ nấc đã mở để biết mình cần luyện dạng nào. Gợi ý giảm dần qua các đề (${nacNote(L)}).</p>
      <div class="ld-ask"><b>Tự hỏi trước khi mở gợi ý:</b> ${ASK.map((x, i) => `<span>${i + 1}) ${x}</span>`).join(' ')}</div>
      ${[0, 1, 2].map(box).join('')}
      ${L.the ? `<div class="ld-the-mini"><b>Thẻ công cụ</b> – nhìn kết luận, chọn công cụ:${theTable(L, false)}</div>` : ''}
    </section>`;
  }
  function pageKey(t, L, k) {
    const d = L.de[k - 1];
    return `<section class="sh-page ld-page">
      <div class="sh-head"><span>ĐÁP ÁN – HƯỚNG DẪN CHẤM</span><span>Đề số ${k}/${L.de.length} · ${baiOf(t)}</span></div>
      <h1 class="sh-title">ĐÁP ÁN ĐỀ LUYỆN SỐ ${k}</h1><p class="sh-sub">${d.ten}</p>
      <div class="sh-key"><p><b>Đáp số:</b> ${d.ans}</p>${d.fig ? `<div class="sh-fig">${d.fig}</div>` : ''}
        <table class="sh-barem"><tbody>${d.barem.map(([s, x]) => `<tr><td>${s}</td><td class="num">${pt(x)}</td></tr>`).join('')}
          <tr><td><b>Tổng</b></td><td class="num"><b>${pt(sum(d.barem.map(b => b[1])))}</b></td></tr></tbody></table>
        ${(d.loi || []).length ? `<p class="sh-loi"><b>Hay bị trừ điểm:</b> ${d.loi.join(' · ')}</p>` : ''}
        <p class="ld-src">Dạng bài tham khảo: ${d.nguon} (số liệu đã đổi).</p></div>
    </section>`;
  }
  // o.key: kèm trang đáp án; o.goi (mặc định có): kèm trang gợi ý nếu đề có; ks: danh sách số đề (mặc định cả bộ)
  function sheetHTML(t, o = {}, ks) {
    const L = get(t.id); if (!L) return '';
    ks = ks || L.de.map((_, i) => i + 1);
    return `<div class="sheet math">${ks.map(k => pageDe(t, L, k) + (o.goi !== false && L.de[k - 1].goi ? pageGoi(t, L, k) : '') + (o.key ? pageKey(t, L, k) : '')).join('')}</div>`;
  }
  // Thẻ công cụ in một trang (dán vào vở)
  function theHTML(t) {
    const L = get(t.id); if (!L || !L.the) return '';
    return `<div class="sheet math"><section class="sh-page ld-page">
      <div class="sh-head"><span>CON ĐƯỜNG TỚI TRƯỜNG · BÀI 7 HÌNH HỌC PHẲNG</span><span>Thẻ công cụ – dán vào vở</span></div>
      <h1 class="sh-title">THẺ CÔNG CỤ: NHÌN KẾT LUẬN – CHỌN CÔNG CỤ</h1>
      <p class="sh-sub">Dùng cho câu 7a, 7b, 7c · chỉ dùng cách lập luận được phép theo quy định chấm thống nhất</p>
      <div class="ld-ask"><b>Phân tích ngược 4 bước:</b> <span>1) Gạch chân kết luận, xếp nó vào một dòng của thẻ.</span> <span>2) Đánh dấu trên hình mọi góc vuông, mọi đoạn bằng nhau (bán kính, tiếp tuyến, trung điểm).</span> <span>3) Hỏi: câu trước cho mình gì? Câu b thường dùng câu a, câu c thường dùng tỉ số của câu b.</span> <span>4) Viết ngược "muốn có … cần … ; muốn có … cần …", rồi trình bày xuôi.</span></div>
      ${theTable(L, true)}
      <p class="sh-loi"><b>Không được viện dẫn, phải chứng minh lại:</b> ba dấu hiệu tứ giác nội tiếp (thay bằng "bốn điểm cách đều một điểm") · hệ thức cạnh – đường cao trong tam giác vuông (thay bằng tam giác đồng dạng) · "đường kính vuông góc với dây thì đi qua trung điểm" (thay bằng tam giác cân) · tính chất đường phân giác ngoài.</p>
    </section></div>`;
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
    if (L.the && sel === 'the') return paneThe(t, el, L);
    if (L.the && sel === 'tuduy') return paneTuDuy(t, el, L);
    const total = L.de.length, done = L.de.filter((_, i) => isDone(t.id, i + 1)).length;
    const k = Math.min(Math.max(parseInt(sel, 10) || 1, 1), total), d = L.de[k - 1];
    const hasGoi = L.de.some(x => x.goi);
    el.innerHTML = `<div class="card sheet-tools">
        <p class="lead"><b>${total} đề luyện</b> đúng dạng ${baiOf(t)} của đề tuyển sinh. Mỗi đề in thành <b>một tệp PDF</b>: trang đề có khung ô li để làm,${hasGoi ? ' trang <b>Gợi ý từng nấc</b> (giảm dần qua các đề),' : ''} trang sau là đáp án – hướng dẫn chấm. Làm đúng giờ (${L.phut || 12} phút/đề), tự chấm theo barem, sai ở đâu xem lại tab Tự luận mẫu.</p>
        ${L.the ? `<div class="row ld-tools"><a class="btn" href="#/cd/${t.id}/de/tuduy">🧠 Luyện tư duy hôm nay (10 phút)</a><a class="btn" href="#/cd/${t.id}/de/the">📇 Thẻ công cụ</a></div>` : ''}
        <p class="chips"><span class="chip">Đã làm ${done}/${total}</span></p>
        <div class="ld-list">${L.de.map((x, i) => `<a class="ld-item${i + 1 === k ? ' on' : ''}${isDone(t.id, i + 1) ? ' ok' : ''}" href="#/cd/${t.id}/de/${i + 1}"><b>Đề ${i + 1}</b><span>${x.ten}</span></a>`).join('')}</div>
        <div class="opts-row">${hasGoi ? '<label class="tog"><input type="checkbox" id="ldGoi" checked> Kèm trang gợi ý từng nấc</label>' : ''}<label class="tog"><input type="checkbox" id="ldKey"> Kèm đáp án – hướng dẫn chấm (trang cuối mỗi đề)</label>
          <label class="tog"><input type="checkbox" id="ldDone" ${isDone(t.id, k) ? 'checked' : ''}> Em đã làm xong Đề ${k}</label></div>
        <div class="row"><button class="btn primary" type="button" id="ldOne">🖨️ In / Lưu PDF Đề ${k}</button><button class="btn" type="button" id="ldAll">🖨️ In cả ${total} đề</button></div></div>
      ${d.goi ? `<div class="card ld-hint"><h3>💡 Gợi ý từng nấc cho Đề ${k}</h3><p class="muted">Tự làm ít nhất 5 phút rồi mới mở. Đề này có ${nac(L, k)} nấc${L.giam ? ` (${nacNote(L)})` : ''}.</p><div id="ldNac"></div><button class="btn" type="button" id="ldNext">Mở Nấc 1 – ${NAC[0]}</button></div>` : ''}
      <div class="paper-wrap" id="paper"></div>`;
    const $i = id => document.getElementById(id);
    const opt = () => ({ key: $i('ldKey').checked, goi: $i('ldGoi') ? $i('ldGoi').checked : false });
    const draw = () => { $i('paper').innerHTML = sheetHTML(t, opt(), [k]); };
    draw();
    $i('ldKey').addEventListener('change', draw);
    if ($i('ldGoi')) $i('ldGoi').addEventListener('change', draw);
    $i('ldDone').addEventListener('change', e => { setDone(t.id, k, e.target.checked); pane(t, el, k); });
    $i('ldOne').addEventListener('click', e => printHTML(sheetHTML(t, opt(), [k]), e.currentTarget));
    $i('ldAll').addEventListener('click', e => printHTML(sheetHTML(t, opt()), e.currentTarget));
    if (d.goi) {
      let open = 0; const n = nac(L, k);
      $i('ldNext').addEventListener('click', e => {
        $i('ldNac').insertAdjacentHTML('beforeend', `<div class="ld-nac"><div class="ld-nac-h">Nấc ${open + 1} – ${NAC[open]}</div><div>${d.goi[open]}</div></div>`);
        open++;
        if (open >= n) { e.currentTarget.disabled = true; e.currentTarget.textContent = n < 3 ? 'Đề này chỉ có ' + n + ' nấc – tự đi tiếp nhé' : 'Đã mở hết 3 nấc'; }
        else e.currentTarget.textContent = `Mở Nấc ${open + 1} – ${NAC[open]}`;
      });
    }
  }

  function paneThe(t, el, L) {
    el.innerHTML = `<div class="card sheet-tools"><p class="lead"><b>📇 Thẻ công cụ</b> – in ra dán vào vở. Khi bí, nhìn kết luận, tìm dòng tương ứng để biết dùng công cụ nào. Cột cuối là các đề luyện dùng công cụ đó.</p>
      <div class="row"><a class="btn" href="#/cd/${t.id}/de">← Về danh sách đề</a><a class="btn" href="#/cd/${t.id}/de/tuduy">🧠 Luyện tư duy hôm nay</a><button class="btn primary" type="button" id="ldThePrint">🖨️ In / Lưu PDF thẻ</button></div></div>
      <div class="paper-wrap">${theHTML(t)}</div>`;
    document.getElementById('ldThePrint').addEventListener('click', e => printHTML(theHTML(t), e.currentTarget));
  }

  /* ---------- 🧠 Luyện tư duy 10 phút mỗi ngày: chọn công cụ cho kết luận + sắp xếp các bước lời giải ---------- */
  const KEY_TD = 'ld:tuduy';
  const today = () => ymd(new Date());
  const rng = s => { let h = 1779033703; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 3432918353), h = h << 13 | h >>> 19;
    return () => { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; };
  const shuffle = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const ymd = x => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
  // số ngày luyện liên tiếp tính tới hôm nay (hôm nay chưa luyện thì tính tới hôm qua)
  function streak(st) {
    const x = new Date(); if (!st.days[ymd(x)]) x.setDate(x.getDate() - 1);
    let n = 0; while (st.days[ymd(x)]) { n++; x.setDate(x.getDate() - 1); }
    return n;
  }
  function pickDay(L, st, variant) {
    const r = rng(today() + ':' + variant);
    const pool = [];
    ids().filter(i => get(i).the).forEach(i => get(i).de.forEach((d, j) => { if (d.cc && d.q) pool.push({ id: i, k: j + 1, d }); }));
    const weak = it => Math.min(1, Math.max(0, ...it.d.cc.map(c => (st.sai[c] || 0) - (st.dung[c] || 0) / 2)) / 3);
    const ranked = shuffle(pool.filter(x => x.d.part !== 'c'), r).map(x => [x, r() + 0.7 * weak(x)]).sort((a, b) => b[1] - a[1]).map(x => x[0]);
    const tools = [], seen = new Set();
    for (const x of ranked) { const key = x.d.ch; if (seen.has(key)) continue; seen.add(key); tools.push(x); if (tools.length === 4) break; }
    const order = shuffle(pool.filter(x => !seen.has(x.d.ch)), r).slice(0, 2);
    return [...tools.map(x => ({ type: 'cc', ...x })), ...order.map(x => ({ type: 'xep', ...x, perm: shuffle(x.d.barem.map((_, n) => n), r) }))];
  }
  function paneTuDuy(t, el, L, variant = 0) {
    const st = Object.assign({ days: {}, sai: {}, dung: {} }, U.get(KEY_TD, {}));
    const items = pickDay(L, st, variant), name = id => (L.the.find(x => x.id === id) || {}).ten || id;
    const weakTop = Object.keys(st.sai).filter(k => (st.sai[k] || 0) > (st.dung[k] || 0) / 2).sort((a, b) => st.sai[b] - st.sai[a]).slice(0, 2);
    const res = items.map(() => null);
    el.innerHTML = `<div class="card sheet-tools"><p class="lead"><b>🧠 Luyện tư duy hôm nay</b> – 10 phút, 6 câu: 4 câu <b>chọn công cụ</b> cho kết luận (theo Thẻ công cụ), 2 câu <b>sắp xếp các bước</b> lời giải. Bài mỗi ngày tự đổi, ưu tiên dạng em hay chọn sai.</p>
      <p class="chips"><span class="chip">Chuỗi ngày luyện: ${streak(st)} 🔥</span><span class="chip">Đã luyện ${Object.keys(st.days).length} ngày</span>${weakTop.length ? `<span class="chip warnc">Cần luyện thêm: ${weakTop.map(name).join(', ')}</span>` : ''}</p>
      <div class="row"><a class="btn" href="#/cd/${t.id}/de">← Về danh sách đề</a><a class="btn" href="#/cd/${t.id}/de/the">📇 Thẻ công cụ</a><button class="btn" type="button" id="tdNew">🔄 Bài khác</button></div></div>
      ${items.map((it, i) => `<div class="card td-card" data-i="${i}">
        <p class="td-h"><span class="chip">Câu ${i + 1}/6</span> ${it.type === 'cc' ? 'Kết luận này cần dùng công cụ nào? <i>(chọn một)</i>' : 'Sắp xếp các bước lời giải theo đúng thứ tự <i>(chạm lần lượt)</i>'}</p>
        <details class="td-gt"><summary>Xem giả thiết và hình (Đề ${it.k} · ${it.id.replace('hinh-', 'Bài ')})</summary><div>${it.d.ch}</div>${it.d.figQ || it.d.fig ? `<div class="sh-fig td-fig">${it.d.figQ || it.d.fig}</div>` : ''}</details>
        <p class="td-q"><b>${it.d.part})</b> ${it.d.q}</p>
        ${it.type === 'cc' ? `<div class="td-tools">${L.the.map(x => `<button type="button" class="td-opt" data-id="${x.id}">${x.ten}</button>`).join('')}</div>`
          : `<ol class="td-pick"></ol><div class="td-steps">${it.perm.map(j => `<button type="button" class="td-step" data-j="${j}">${it.d.barem[j][0]}</button>`).join('')}</div><button type="button" class="btn ghost td-reset">Chọn lại</button>`}
        <div class="td-fb" aria-live="polite"></div></div>`).join('')}
      <div class="card td-sum" id="tdSum" hidden></div>`;
    const save = () => U.set(KEY_TD, st);
    const finish = () => {
      if (res.some(x => x === null)) return;
      const diem = res.filter(Boolean).length;
      st.days[today()] = { diem: Math.max(diem, (st.days[today()] || {}).diem || 0), n: res.length }; save();
      const box = document.getElementById('tdSum'); box.hidden = false;
      box.innerHTML = `<h3>Hoàn thành hôm nay: ${diem}/${res.length} câu đúng</h3><p>${diem >= 5 ? 'Rất tốt! Ngày mai luyện tiếp để giữ chuỗi ngày.' : 'Đọc lại Thẻ công cụ ở các dòng em chọn sai, rồi làm một đề 7b có gợi ý nấc 1.'} Chuỗi ngày luyện: <b>${streak(st)}</b> 🔥</p>`;
    };
    el.querySelectorAll('.td-card').forEach(card => {
      const i = +card.dataset.i, it = items[i], fb = card.querySelector('.td-fb');
      if (it.type === 'cc') {
        card.querySelectorAll('.td-opt').forEach(b => b.addEventListener('click', () => {
          if (res[i] !== null) return;
          const ok = it.d.cc.includes(b.dataset.id); res[i] = ok;
          b.classList.add(ok ? 'good' : 'bad');
          card.querySelectorAll('.td-opt').forEach(x => { if (it.d.cc.includes(x.dataset.id)) x.classList.add('good'); x.disabled = true; });
          it.d.cc.forEach(c => { if (ok) st.dung[c] = (st.dung[c] || 0) + 1; else st.sai[c] = (st.sai[c] || 0) + 1; }); save();
          fb.innerHTML = `<p><b>${ok ? 'Đúng hướng!' : 'Chưa đúng.'}</b> Công cụ cần dùng: ${it.d.cc.map(name).join('; ')}.</p>${it.d.goi ? `<p class="muted">Nấc 1: ${it.d.goi[0]}</p>` : `<p class="muted">Bước đầu: ${it.d.barem[0][0]}</p>`}`;
          finish();
        }));
      } else {
        const pick = [], ol = card.querySelector('.td-pick');
        const reset = () => { if (res[i] !== null) return; pick.length = 0; ol.innerHTML = ''; card.querySelectorAll('.td-step').forEach(b => { b.disabled = false; b.classList.remove('used'); }); };
        card.querySelector('.td-reset').addEventListener('click', reset);
        card.querySelectorAll('.td-step').forEach(b => b.addEventListener('click', () => {
          if (res[i] !== null || b.disabled) return;
          pick.push(+b.dataset.j); b.disabled = true; b.classList.add('used');
          ol.insertAdjacentHTML('beforeend', `<li>${it.d.barem[+b.dataset.j][0]}</li>`);
          if (pick.length === it.d.barem.length) {
            const ok = pick.every((j, n) => j === n); res[i] = ok;
            card.querySelector('.td-reset').disabled = true;
            fb.innerHTML = `<p><b>${ok ? 'Đúng thứ tự!' : 'Chưa đúng thứ tự.'}</b>${ok ? ' Lập luận đi từ giả thiết tới kết luận.' : ' Thứ tự đúng:'}</p>${ok ? '' : `<ol class="td-right">${it.d.barem.map(x => `<li>${x[0]}</li>`).join('')}</ol>`}`;
            finish();
          }
        }));
      }
    });
    document.getElementById('tdNew').addEventListener('click', () => paneTuDuy(t, el, L, variant + 1));
  }

  return { add, get, ids, sheetHTML, theHTML, pages, pane };
})();
