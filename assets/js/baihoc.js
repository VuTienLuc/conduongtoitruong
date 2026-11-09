/* =====================================================================
   BÀI GIẢNG – LUYỆN TẬP ONLINE (lớp 9, 10, 11, 12) – bài học xếp theo mục lục SGK Toán "Kết nối tri thức với cuộc sống"
   #/bai-hoc                    chọn lớp
   #/bai-hoc/<lớp>              mục lục: Tập 1, Tập 2 → chương → bài (tìm nhanh theo tên)
   #/bai-hoc/<lớp>/<bài>        📘 Bài giảng: mục tiêu, kiến thức từng mục, ví dụ có lời giải, lưu ý hay sai, cần nhớ
   #/bai-hoc/<lớp>/<bài>/luyen  ✍️ Luyện tập online: Phần I trắc nghiệm, Phần II đúng – sai, Phần III trả lời ngắn; chấm ngay, lưu điểm cao nhất
   Mục lục: data/bai-hoc/muc-luc-kntt.js (BaiHoc.mucLuc). Trình chiếu, trò chơi HTML của thầy gắn vào bài: data/bai-hoc/tai-nguyen.js
   (BaiHoc.taiNguyen, tệp trong tuong-tac/) – hiện ở đầu tab Bài giảng, có nút toàn màn hình. Nội dung từng bài: JSON "loai":"bai_hoc" tạo bằng Xưởng dữ liệu
   (NotebookLM / Gem) → NhapDL (assets/js/nhap.js) → BaiHoc.add. Bài chưa có nội dung vẫn hiện trong mục lục.
   ===================================================================== */
const BaiHoc = (() => {
  const { esc, $, $$, get, set, shuffle } = U;
  const LOP = [9, 10, 11, 12];
  const ML = {};                       // lớp → { lop, ten, chuong: [{ tap, so, ten, bai: [{ so, ten }] }] }
  const LS = {};                       // 'lớp-bài' → bài học
  const TN = {};                       // 'lớp-bài' → [{ ten, mo_ta, file, nguon }] trình chiếu, trò chơi HTML
  let NHUNG = {};                      // bản gộp dist/: nội dung các tệp tuong-tac/ (tools/build.py nhúng vào)
  const key = (l, b) => `${l}-${b}`;
  // Bài lớp 9 gắn với chủ đề ôn thi vào 10; lớp 10–12 tự tìm chủ đề vận dụng – VDC có cùng số bài.
  const LIEN_9 = { 1: 'he-phuong-trinh-thuc-te', 2: 'he-phuong-trinh-thuc-te', 3: 'he-phuong-trinh-thuc-te', 11: 'kien-thuc-thong-nhat', 12: 'kien-thuc-thong-nhat',
    15: 'thuc-te-dai-so-hinh-hoc', 18: 'ham-so-parabol', 19: 'pt-bac-hai-viete', 20: 'pt-bac-hai-viete', 21: 'thuc-te-dai-so-hinh-hoc',
    25: 'xac-suat', 26: 'xac-suat', 27: 'hinh-7a', 28: 'hinh-7a', 29: 'hinh-7a', 31: 'hinh-khong-gian', 32: 'hinh-khong-gian' };

  // Bài lớp 9 trùng hẳn nội dung một chủ đề ôn thi vào 10: chưa có bài giảng riêng thì dùng luôn nội dung chủ đề đó
  // (lý thuyết, nhắc nhanh, mẹo, bài mẫu có barem, trắc nghiệm hiểu bài) và trỏ sang bộ đề luyện PDF.
  const DUNG_9 = { 3: 'he-phuong-trinh-thuc-te', 15: 'thuc-te-dai-so-hinh-hoc', 18: 'ham-so-parabol', 19: 'pt-bac-hai-viete', 20: 'pt-bac-hai-viete',
    25: 'xac-suat', 26: 'xac-suat', 31: 'hinh-khong-gian', 32: 'hinh-khong-gian' };

  /* ---------- Dữ liệu ---------- */
  function mucLuc(lop, ten, chuong) {
    ML[lop] = { lop, ten, chuong: chuong.map(([tap, so, t, bai]) => ({ tap, so, ten: t, bai: bai.map(([s, n]) => ({ so: s, ten: n })) })) };
  }
  const all = lop => (ML[lop] ? ML[lop].chuong.flatMap(c => c.bai.map(b => ({ ...b, chuong: c }))) : []);
  const baiOf = (lop, so) => all(lop).find(b => b.so === +so) || null;
  /* Nhập trùng một bài đã có (cùng lớp, bài): GIỮ bài giảng bản đầu, phần luyện tập của bản mới lưu thành "Bộ 2, Bộ 3…".
     Câu đã có ở các bộ trước (so dấu vân tay lời đề) thì bỏ; mọi câu đều trùng thì không thêm bộ. Bài đang là bài MẪU (mau:true)
     mà nhập bản thật thì bản thật thay hẳn. e.tn / e.ds / e.tln = ngân hàng câu của mọi bộ; e.bo = các bộ. (thầy chọn 09/11/2026) */
  const fpQ = q => fold(String(q || '').replace(/<[^>]+>/g, ' ')).replace(/\\(?:left|right|,|;|!|quad)/g, '').replace(/[^a-z0-9]+/g, '');
  const PHAN = ['tn', 'ds', 'tln'];
  const nCau = x => x.tn.length + x.ds.length + x.tln.length;
  const boMot = e => ({ tn: e.tn, ds: e.ds, tln: e.tln, nguon: e.nguon, src: e.src, mau: !!e.mau });
  function ghep(e, thu) {
    const k = key(e.lop, e.bai), cu = LS[k], tong = nCau(e);
    if (!cu || (cu.mau && !e.mau)) {
      if (!thu) { e.bo = [boMot(e)]; LS[k] = e; }
      return { bo: 1, them: tong, bo_qua: 0, thay_mau: !!cu, tong };
    }
    const da = new Set(PHAN.flatMap(p => cu[p].map(q => fpQ(q.q))));
    const nb = boMot(e);
    PHAN.forEach(p => { nb[p] = e[p].filter(q => { const f = fpQ(q.q); if (da.has(f)) return false; da.add(f); return true; }); });
    const them = nCau(nb), so = cu.bo.length + 1;
    if (them && !thu) { cu.bo.push(nb); PHAN.forEach(p => { cu[p] = cu[p].concat(nb[p]); }); }
    return { bo: them ? so : 0, them, bo_qua: tong - them, tong, co: cu.bo.length };
  }
  const add = e => ghep(e, false);
  const thuGhep = e => ghep(e, true);          // xem trước (Xưởng dữ liệu): nhập vào thì thành bộ mấy, thêm bao nhiêu câu
  function taiNguyen(lop, bai, arr) { (TN[key(lop, bai)] = TN[key(lop, bai)] || []).push(...arr); }
  const tnOf = (lop, bai) => TN[key(lop, bai)] || [];
  function nhung(m) { NHUNG = Object.assign(NHUNG, m); }
  const blobs = {};
  // Thư mục web: dùng đường dẫn tệp. Bản gộp một tệp: tạo địa chỉ blob từ nội dung đã nhúng.
  const srcOf = f => NHUNG[f] ? (blobs[f] = blobs[f] || URL.createObjectURL(new Blob([NHUNG[f]], { type: 'text/html' }))) : f;
  const own = (lop, bai) => LS[key(lop, bai)];          // bài giảng soạn riêng (nhập qua Xưởng dữ liệu)
  const cache9 = {};
  function tuVao10(lop, so) {
    if (lop !== 9 || !DUNG_9[so] || typeof Topics === 'undefined' || !Topics.get(DUNG_9[so])) return null;
    if (cache9[so]) return cache9[so];
    const t = Topics.get(DUNG_9[so]), b = baiOf(lop, so), L = typeof LuyenDe !== 'undefined' && LuyenDe.get(t.id);
    const fig = f => (f ? `<div class="figbox">${f}</div>` : '');
    const giang = (t.theory || []).map(x => ({ t: x.t, b: x.b + fig(x.fig), luu_y: x.warn || '', vd: [] }));
    if ((t.tips || []).length) giang.push({ t: 'Mẹo nhớ', b: `<ul>${t.tips.map(x => `<li><b>${x.t}.</b> ${x.b}</li>`).join('')}</ul>`, luu_y: '', vd: [] });
    if ((t.models || []).length) giang.push({ t: 'Bài mẫu trình bày theo barem', b: '', luu_y: (t.present || []).length ? 'Trình bày: ' + t.present.join(' ') : '',
      vd: t.models.map(m => ({ de: `<b>${m.title}.</b> ${m.de}${fig(m.fig)}`,
        lg: m.steps.map(x => x.part ? `<b>${x.part}</b>` : `${x.s}${x.p ? ` <span class="pts">${String(x.p).replace('.', ',')}đ</span>` : ''}`),
        ds: (m.loi || []).length ? 'Lỗi hay bị trừ điểm: ' + m.loi.join(' ') : '' })) });
    return (cache9[so] = { lop, bai: so, ten: b ? b.ten : t.title, vao10: t, nld: L && L.de ? L.de.length : 0, mau: false,
      nguon: `nội dung Chủ đề ${t.no} ôn thi vào 10 – ${t.title}`,
      muc_tieu: [], can_nho: t.remind || [], giang,
      tn: (t.quiz || []).map(q => ({ q: q.q, a: q.a, why: q.why || '' })), ds: [], tln: [] });
  }
  const get_ = (lop, bai) => LS[key(lop, bai)] || tuVao10(+lop, +bai);
  const list = () => Object.values(LS);
  const boList = e => (e.bo && e.bo.length ? e.bo : [boMot(e)]);

  /* Chọn câu cho một lượt luyện tập / phiếu in: 'tat' tất cả; '0','1'… một bộ; 'ngau' rút HAN câu mỗi phần từ ngân hàng.
     Luyện online: ưu tiên câu em làm sai, rồi câu chưa làm, rồi câu đã đúng (lịch sử 'bh:cau:<lớp>-<bài>'). Phiếu in: rút theo mã đề. */
  const HAN = { tn: 12, ds: 2, tln: 4 };
  const vuot = e => PHAN.some(p => e[p].length > HAN[p]);
  const coChon = e => boList(e).length > 1 || vuot(e);
  const lsCau = e => get('bh:cau:' + key(e.lop, e.bai), {});
  function rut(e, r, ls) {
    const out = {};
    PHAN.forEach(p => {
      const a = e[p].map((q, i) => ({ i, h: ls ? ls[fpQ(q.q)] : undefined, r: r() }));
      a.sort((x, y) => (x.h === 0 ? 0 : x.h === undefined ? 1 : 2) - (y.h === 0 ? 0 : y.h === undefined ? 1 : 2) || x.r - y.r);
      out[p] = a.slice(0, HAN[p]).sort((x, y) => x.i - y.i).map(x => e[p][x.i]);
    });
    return out;
  }
  function chonCau(e, chon, r, ls) {
    if (!coChon(e) || chon === 'tat') return { tn: e.tn, ds: e.ds, tln: e.tln, ten: 'Tất cả' };
    const B = boList(e);
    if (/^\d+$/.test(String(chon)) && B[+chon]) return { ...B[+chon], ten: `Bộ ${+chon + 1}` };
    return { ...rut(e, r || Math.random, ls), ten: 'Ngẫu nhiên' };
  }
  const chonMacDinh = e => { const c = get('bh:bo:' + key(e.lop, e.bai), null); return c !== null && (c === 'tat' || c === 'ngau' || boList(e)[+c]) ? String(c) : vuot(e) ? 'ngau' : 'tat'; };
  const DANG = {};                              // lượt đang hiện ở tab Luyện tập → trình chiếu dùng đúng các câu đó
  function deTrinhChieu(e) {
    if (!coChon(e)) return e;
    const k = key(e.lop, e.bai), s = DANG[k] || (DANG[k] = chonCau(e, chonMacDinh(e), null, lsCau(e)));
    return { ...e, tn: s.tn, ds: s.ds, tln: s.tln };
  }
  const chonHTML = (e, cur, id) => coChon(e) ? `<div class="bh-bo" role="group" aria-label="Chọn bộ câu hỏi">${[
      ...(vuot(e) ? [['ngau', `🎲 Ngẫu nhiên (${PHAN.reduce((t, p) => t + Math.min(HAN[p], e[p].length), 0)} câu)`]] : []),
      ...boList(e).map((b, i) => [String(i), `Bộ ${i + 1} (${nCau(b)} câu)`]), ['tat', `Tất cả (${nCau(e)} câu)`]]
    .map(([v, t]) => `<button type="button" class="chip-btn${v === cur ? ' on' : ''}" data-${id}="${v}" aria-pressed="${v === cur}">${t}</button>`).join('')}</div>` : '';
  const prog = (lop, bai) => get('bh:' + key(lop, bai), null);

  /* ---------- Khung trang ---------- */
  const view = () => $('#view');
  const shell = (back, label, body) => `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="${back}">← ${label}</a></div>${body}</main>`;
  const fold = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

  function pickLop() {
    const cards = LOP.map(l => {
      const n = all(l).length, k = all(l).filter(b => get_(l, b.so)).length, t = all(l).filter(b => tnOf(l, b.so).length).length;
      return `<a class="card grade-card" href="#/bai-hoc/${l}"><span class="g-big">${l}</span><span class="g-body"><b>Toán ${l}</b>
        <span>${ML[l] ? esc(ML[l].ten) : 'Kết nối tri thức với cuộc sống'} · ${ML[l] ? ML[l].chuong.length : 0} chương</span>
        <span class="chips"><span class="chip">${n} bài</span>${k ? `<span class="chip ok">${k} bài có bài giảng</span>` : ''}${t ? `<span class="chip ok">🎬 ${t} bài có trình chiếu</span>` : ''}</span></span></a>`;
    }).join('');
    view().innerHTML = shell('#/', 'Chọn lớp', `<section class="card hero"><p class="pill">📚 Học theo SGK</p><h2>Bài giảng – Luyện tập online</h2>
      <p>Học đúng thứ tự mục lục SGK Toán <b>Kết nối tri thức với cuộc sống</b>. Mỗi bài có bài giảng ngắn (kiến thức, ví dụ có lời giải, lưu ý hay sai) và bài luyện tập làm ngay trên máy theo ba dạng của đề thi: trắc nghiệm, đúng – sai, trả lời ngắn.</p></section>
      <div class="grade-grid">${cards}</div>`);
  }

  function mucLucPage(lop) {
    const M = ML[lop]; if (!M) return pickLop();
    const row = b => {
      const e = get_(lop, b.so), p = prog(lop, b.so), t = tnOf(lop, b.so);
      return `<a class="bh-row${e || t.length ? '' : ' trong'}" href="#/bai-hoc/${lop}/${b.so}" data-s="${esc(fold(`bai ${b.so} ${b.ten} ${b.chuong.ten}`))}">
        <span class="bh-no">${b.so}</span><span class="bh-ten">Bài ${b.so}. ${esc(b.ten)}</span>
        <span class="chips">${t.length ? '<span class="chip ok">🎬 Trình chiếu</span>' : ''}${e ? `<span class="chip ok">${e.vao10 ? '🎯 ' : ''}📘 ✍️ ${e.tn.length + e.ds.length + e.tln.length} câu${boList(e).length > 1 ? ` · ${boList(e).length} bộ` : ''}${e.nld ? ` · ${e.nld} đề luyện` : ''}</span>` : t.length ? '' : '<span class="chip">Đang soạn</span>'}${p ? `<span class="chip">✓ ${p.best}/${p.total}</span>` : ''}</span></a>`;
    };
    const taps = [...new Set(M.chuong.map(c => c.tap))];
    view().innerHTML = shell('#/bai-hoc', 'Chọn lớp', `<section class="card hero"><p class="pill soft">Lớp ${lop}</p><h2>${esc(M.ten)}</h2>
      <p>${all(lop).length} bài trong ${M.chuong.length} chương. Bấm vào bài để xem bài giảng và luyện tập.</p>
      <label class="bh-find">🔎 <input id="bhFind" type="search" placeholder="Tìm bài: ví dụ “cực trị”, “Bài 12”…" autocomplete="off"></label></section>
      ${taps.map(t => `<h2 class="sec bh-tap" data-tap="${t}">Tập ${t}</h2>${M.chuong.filter(c => c.tap === t).map(c => `<details class="card bh-ch" data-tap="${t}" open>
        <summary><span>Chương ${c.so}. ${esc(c.ten)}</span><span class="chip">${c.bai.length} bài</span></summary>
        <div class="bh-rows">${c.bai.map(b => row({ ...b, chuong: c })).join('')}</div></details>`).join('')}`).join('')}
      <p class="empty" id="bhNone" hidden>Không thấy bài nào khớp.</p>`);
    $('#bhFind').addEventListener('input', e => {
      const q = fold(e.target.value.trim()); let any = false;
      $$('.bh-ch').forEach(d => { let n = 0; $$('.bh-row', d).forEach(r => { const ok = !q || r.dataset.s.includes(q); r.hidden = !ok; if (ok) n++; }); d.hidden = !n; if (n) any = true; if (q) d.open = true; });
      $$('.bh-tap').forEach(h => { h.hidden = !$$('.bh-ch').some(d => !d.hidden && d.dataset.tap === h.dataset.tap); });
      $('#bhNone').hidden = any;
    });
  }

  /* ---------- Trang một bài ---------- */
  function lienQuan(lop, so) {
    const out = [];
    if (lop === 9 && LIEN_9[so] && typeof Topics !== 'undefined' && Topics.get(LIEN_9[so])) {
      const t = Topics.get(LIEN_9[so]); out.push(`<a href="#/cd/${t.id}/lt">🎯 Ôn thi vào 10 – Chủ đề ${t.no}: ${t.title}</a>`);
    }
    if (lop >= 10 && typeof Vdc !== 'undefined') Vdc.ofGrade('lop' + lop)
      .filter(t => [...String(t.bai || '').matchAll(/Bài (\d+)\./g)].some(m => +m[1] === so))
      .forEach(t => out.push(`<a href="#/lop${lop}/${t.id}">🚀 Vận dụng – vận dụng cao: ${t.title}</a>`));
    return out.length ? `<div class="card bh-lien"><b>Học tiếp sau bài này</b>${out.map(x => `<p>${x}</p>`).join('')}</div>` : '';
  }
  function lesson(lop, so, tab) {
    const b = baiOf(lop, so); if (!b) return mucLucPage(lop);
    const e = get_(lop, so), ds = all(lop), i = ds.findIndex(x => x.so === b.so), prev = ds[i - 1], next = ds[i + 1];
    const tabs = [['', '📘', 'Bài giảng'], ['luyen', '✍️', 'Luyện tập online'], ['phieu', '🖨️', 'Phiếu làm bài']].map(([k, ic, n]) =>
      `<a class="tab${k === tab ? ' on' : ''}" href="#/bai-hoc/${lop}/${so}${k ? '/' + k : ''}" ${k === tab ? 'aria-current="page"' : ''}><span aria-hidden="true">${ic}</span> ${n}</a>`).join('');
    view().innerHTML = `${App.topBar()}<main class="wrap">
      <div class="toolbar"><a class="back" href="#/bai-hoc/${lop}">← Mục lục Toán ${lop}</a>
        <span class="nav-mini">${prev ? `<a href="#/bai-hoc/${lop}/${prev.so}">‹ Bài ${prev.so}</a>` : ''}${next ? `<a href="#/bai-hoc/${lop}/${next.so}">Bài ${next.so} ›</a>` : ''}</span></div>
      <section class="thead card"><span class="tno big">${b.so}</span><div><p class="tbai">Toán ${lop} · Tập ${b.chuong.tap} · Chương ${b.chuong.so}. ${esc(b.chuong.ten)}</p>
        <h2>Bài ${b.so}. ${esc(b.ten)}</h2>${e ? `<p class="tdesc">${e.mau ? '<span class="chip warnc">Mẫu minh họa</span> ' : ''}${e.nguon ? `Nguồn: ${e.nguon}` : ''}</p>` : ''}</div></section>
      ${e ? `<nav class="tabs" aria-label="Bài học">${tabs}${typeof TrinhChieu !== 'undefined' ? `<button type="button" class="tab bh-tc-btn" id="bhTC" title="Trình chiếu toàn màn hình (phím ← →)"><span aria-hidden="true">📽️</span> Trình chiếu</button>` : ''}</nav><section id="pane" class="pane"></section>` : `<section id="pane" class="pane"></section>`}
      ${lienQuan(lop, b.so)}
      <div class="pane-foot">${e && !tab ? `<a class="btn primary" href="#/bai-hoc/${lop}/${so}/luyen">Luyện tập ngay ✍️ →</a>` : next ? `<a class="btn primary" href="#/bai-hoc/${lop}/${next.so}">Sang Bài ${next.so} →</a>` : `<a class="btn primary" href="#/bai-hoc/${lop}">Về mục lục</a>`}</div></main>`;
    const pane = $('#pane');
    if (e && $('#bhTC')) $('#bhTC').addEventListener('click', () => TrinhChieu.mo(deTrinhChieu(e), tab === 'luyen' ? 'luyen' : 'giang'));
    if (!e) { paneTrong(lop, b, pane); return ttMount(lop, b.so, pane); }
    if (tab === 'phieu') panePhieu(e, pane); else if (tab === 'luyen') paneLuyen(e, pane); else { paneGiang(e, pane); ttMount(lop, b.so, pane); }
  }
  // Trình chiếu, trò chơi HTML của bài: khung 16:9 ở đầu tab Bài giảng, nút toàn màn hình, mở tab mới.
  // Toàn màn hình áp cho cả khung (không chỉ iframe) để hiện được bộ công cụ mở nhanh ở góc dưới phải.
  function ttMount(lop, so, pane) {
    const ts = tnOf(lop, so); if (!ts.length) return;
    pane.insertAdjacentHTML('afterbegin', ts.map((t, i) => `<article class="card bh-tt"><h3>🎬 ${esc(t.ten)}</h3>${t.mo_ta ? `<p class="muted small">${esc(t.mo_ta)}</p>` : ''}
      <div class="bh-frame" data-tt="${i}"><iframe class="cc-main" src="${esc(srcOf(t.file))}" title="${esc(t.ten)}" allow="fullscreen; autoplay; clipboard-write" allowfullscreen loading="lazy"></iframe></div>
      <div class="row"><button class="btn primary" type="button" data-fs="${i}">⛶ Toàn màn hình</button><a class="btn ghost" href="${esc(srcOf(t.file))}" target="_blank" rel="noopener">↗ Mở trong tab mới</a>${t.nguon ? `<span class="muted small">${esc(t.nguon)}</span>` : ''}</div></article>`).join(''));
    $$('.bh-frame[data-tt]', pane).forEach(fr => {
      congCu(fr);
      const f = $(':scope > iframe', fr);   // focus thường nằm trong trang bài giảng (cùng nguồn) → nghe phím O ở đó
      f.addEventListener('load', () => { try {
        const d = f.contentWindow.document;
        d.addEventListener('keydown', ev => { if (fr.classList.contains('is-full')) phimO(ev, fr); });
        d.addEventListener('pointermove', () => fr.ccVe && fr.ccVe());
      } catch (e) { /* khác nguồn */ } });
    });
    $$('[data-fs]', pane).forEach(btn => btn.addEventListener('click', () => {
      const fr = $(`.bh-frame[data-tt="${btn.dataset.fs}"]`, pane), go = fr.requestFullscreen || fr.webkitRequestFullscreen;
      const gia = () => { fr.classList.add('gia', 'is-full'); document.body.classList.add('bh-noscroll'); ttFocus(fr); };   // máy không cho toàn màn hình (iPhone): phủ kín cửa sổ
      if (go) Promise.resolve(go.call(fr)).then(() => ttFocus(fr)).catch(gia); else gia();
    }));
  }
  const ttFocus = fr => { try { $(':scope > iframe', fr).focus(); $(':scope > iframe', fr).contentWindow.focus(); } catch (e) { /* khác nguồn */ } };
  function ttThoat(fr) { fr.classList.remove('gia', 'is-full'); document.body.classList.remove('bh-noscroll'); }
  function ttSync() {
    const fe = document.fullscreenElement || document.webkitFullscreenElement;
    // công cụ bên trong khung tự bật toàn màn hình thì khung vẫn đang chiếu (không ẩn bộ công cụ, không thu khung)
    $$('.bh-frame[data-tt]').forEach(fr => fr.classList.toggle('is-full', (!!fe && (fe === fr || fr.contains(fe))) || fr.classList.contains('gia')));
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('fullscreenchange', ttSync); document.addEventListener('webkitfullscreenchange', ttSync);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') $$('.bh-frame.gia').forEach(ttThoat);
      const fr = $('.bh-frame.is-full'); if (fr) phimO(e, fr);
    });
  }

  // Bộ công cụ mở nhanh (CONFIG.congCuTrinhChieu): biểu tượng mờ góc dưới phải → các biểu tượng công cụ (không ghi tên web)
  // → trang mở ngay trong bài giảng: ◧ nửa màn hình (bài giảng thu về nửa trái) · ⛶ cả màn hình · ▁ thu gọn (giữ nguyên trang) · ✕ đóng.
  const CC = () => ((window.CONFIG && window.CONFIG.congCuTrinhChieu) || []).filter(x => x && x.url);
  const icHTML = x => /^(https?:|data:)/.test(String(x.icon || '')) ? `<img src="${esc(x.icon)}" alt="">` : esc(x.icon || '●');
  function congCu(fr, focusFn) {
    const ve = focusFn || (() => ttFocus(fr));
    const ds = CC();
    fr.insertAdjacentHTML('beforeend', `<button type="button" class="bh-cc-exit" aria-label="Thoát toàn màn hình">✕</button>${ds.length ? `<div class="bh-cc" data-mode="">
      <div class="bh-cc-pane"><div class="bh-cc-bar"><button type="button" data-m="half" aria-label="Nửa màn hình">◧</button><button type="button" data-m="full" aria-label="Cả màn hình">⛶</button><button type="button" data-m="min" aria-label="Thu gọn">▁</button><button type="button" data-m="off" aria-label="Đóng">✕</button></div></div>
      <div class="bh-cc-menu">${ds.map((x, i) => `<button type="button" class="bh-cc-ic" data-i="${i}" aria-label="Công cụ ${i + 1}">${icHTML(x)}</button>`).join('')}</div>
      <button type="button" class="bh-cc-fab" aria-label="Công cụ" aria-expanded="false"><span aria-hidden="true">✦</span></button></div>` : ''}`);
    $('.bh-cc-exit', fr).addEventListener('click', () => ttThoat(fr));
    const cc = $('.bh-cc', fr); if (!cc) return;
    const pane = $('.bh-cc-pane', cc), fab = $('.bh-cc-fab', cc);
    let cur = -1, moCuoi = 'half';   // moCuoi: chế độ mở gần nhất (nửa / cả màn hình) để phím O mở lại đúng như cũ
    const mode = m => {
      if (m === 'half' || m === 'full') moCuoi = m;
      cc.dataset.mode = m; fr.classList.toggle('cc-half', m === 'half');
      cc.classList.toggle('dang', m === 'min');
      if (m === '' || m === 'min') ve();
    };
    const menu = on => { cc.classList.toggle('open', on); fab.setAttribute('aria-expanded', on ? 'true' : 'false'); };
    fab.addEventListener('click', () => menu(!cc.classList.contains('open')));
    const moCC = (i, phim) => {
      let f = $(`iframe[data-i="${i}"]`, pane);
      if (!f) {   // tạo khi bấm lần đầu, giữ lại để mở lại không phải tải lại
        pane.insertAdjacentHTML('beforeend', `<iframe data-i="${i}" src="${esc(ds[i].url)}" title="Công cụ ${i + 1}" allow="autoplay; clipboard-read; clipboard-write; camera; microphone" referrerpolicy="no-referrer"></iframe>`);
        f = $(`iframe[data-i="${i}"]`, pane);
      }
      $$('iframe', pane).forEach(x => { x.hidden = x !== f; });
      const giu = cc.dataset.mode === 'full' && cur === i;
      cur = i; menu(false); mode(giu ? 'full' : cc.dataset.mode === 'full' ? 'full' : phim ? moCuoi : 'half');
      ve();   // focus ở lại bài giảng để phím O, →, ← vẫn dùng được; bấm vào công cụ thì công cụ mới nhận phím
    };
    $$('.bh-cc-ic', cc).forEach(b => b.addEventListener('click', () => moCC(+b.dataset.i)));
    $$('.bh-cc-bar [data-m]', cc).forEach(b => b.addEventListener('click', () => mode(b.dataset.m === 'off' ? '' : b.dataset.m)));
    // Phím O: công cụ i đang hiện → thu gọn (giữ nguyên trang công cụ); đang ẩn → mở lại như lần trước. Không chuyển focus sang công cụ để bấm O lần nữa vẫn tắt được.
    // Đã bấm vào trang công cụ (khác nguồn, giữ hết phím) → đưa chuột về phía bài giảng là lấy lại focus, phím O dùng lại được
    fr.ccVe = () => { if (pane.contains(document.activeElement)) ve(); };
    fr.addEventListener('pointermove', fr.ccVe);
    fr.ccToggle = (i = 0) => {
      if (!ds[i]) return;
      const m = cc.dataset.mode;
      if ((m === 'half' || m === 'full') && cur === i) mode('min');
      else moCC(i, true);
    };
  }
  // phím tắt O (bật/tắt công cụ đầu tiên ⭐) – bỏ qua khi đang gõ chữ vào ô nhập
  const dangGo = t => !!t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName || '') || t.isContentEditable);
  const laO = ev => ev.key === 'o' || ev.key === 'O' || ev.code === 'KeyO';   // code: bộ gõ tiếng Việt có thể đổi ev.key
  function phimO(ev, fr) {
    if (ev.altKey || ev.ctrlKey || ev.metaKey || !laO(ev) || dangGo(ev.target) || !fr.ccToggle) return false;
    ev.preventDefault(); fr.ccToggle(0); return true;
  }
  function paneTrong(lop, b, pane) {
    if (tnOf(lop, b.so).length) {
      pane.innerHTML = `<div class="card"><p>📭 Bài giảng tóm tắt và bài luyện tập online của bài này đang được soạn. Trong lúc chờ, em xem phần trình chiếu ở trên và làm bài tập trong SGK.</p>
        <button class="btn ghost" type="button" id="bhMake">🧰 Thầy cô: tạo prompt cho bài này</button></div>`;
      $('#bhMake').addEventListener('click', () => { set('xuong:prompt', Object.assign(get('xuong:prompt', {}), { loai: 'baihoc', bhLop: String(lop), bhBai: String(b.so) })); location.hash = '#/xuong/prompt'; });
      return;
    }
    pane.innerHTML = `<div class="card"><h3>📭 Bài này đang được soạn</h3><p>Em vẫn học được: đọc SGK Toán ${lop} – Bài ${b.so}, làm các ví dụ và bài tập trong sách, rồi quay lại đây khi bài giảng online có trên web.</p>
      <p class="muted small">Thầy cô: tạo nội dung bài này bằng Xưởng dữ liệu (NotebookLM / Gem có gắn SGK, sách bài tập).</p>
      <button class="btn" type="button" id="bhMake">🧰 Tạo prompt cho bài này</button></div>`;
    $('#bhMake').addEventListener('click', () => { set('xuong:prompt', Object.assign(get('xuong:prompt', {}), { loai: 'baihoc', bhLop: String(lop), bhBai: String(b.so) })); location.hash = '#/xuong/prompt'; });
  }

  /* ---------- 📘 Bài giảng ---------- */
  const vdHTML = (v, k) => `<div class="bh-vd"><p><b>Ví dụ ${k}.</b> ${v.de}</p><details><summary>Xem lời giải</summary><ol class="lg-steps">${v.lg.map(x => `<li>${x}</li>`).join('')}</ol>
    ${v.ds ? `<p class="ds-box"><b>Đáp số:</b> ${v.ds}</p>` : ''}</details></div>`;
  function giangHTML(e) {
    let k = 0;
    return (e.muc_tieu.length ? `<div class="card remind"><h3>🎯 Học xong bài này, em</h3><ul>${e.muc_tieu.map(x => `<li>${x}</li>`).join('')}</ul></div>` : '')
      + e.giang.map((m, i) => `<article class="card kt"><h3>${/^\d+\./.test(m.t) ? '' : `<span class="kno">${i + 1}</span>`}${m.t}</h3><div class="kb">${m.b}</div>
        ${m.vd.map(v => vdHTML(v, ++k)).join('')}${m.luu_y ? `<p class="warn">⚠️ ${m.luu_y}</p>` : ''}</article>`).join('')
      + (e.can_nho.length ? `<article class="card remind bh-can"><h3>🔑 Cần nhớ</h3><ul>${e.can_nho.map(x => `<li>${x}</li>`).join('')}</ul></article>` : '');
  }
  const vao10Box = e => e.vao10 ? `<div class="card bh-lien bh-v10"><b>🎯 Đây là ${esc(String(e.vao10.bai || '').split('·')[0].trim() || 'một bài')} của đề thi vào 10 TP.HCM</b>
    <p>Nội dung lấy từ Chủ đề ${e.vao10.no} ôn thi vào 10. Học xong, luyện tiếp: <a href="#/cd/${e.vao10.id}/de">📝 ${e.nld ? e.nld + ' đề luyện' : 'Luyện đề'} (in PDF, có đáp án – barem)</a> · <a href="#/cd/${e.vao10.id}/phieu">🖨️ Phiếu làm bài</a> · <a href="#/cd/${e.vao10.id}/ai">🤖 Nhờ AI nhận xét</a></p></div>` : '';
  function paneGiang(e, pane) { pane.innerHTML = vao10Box(e) + giangHTML(e); set('bh:doc:' + key(e.lop, e.bai), 1); }

  /* ---------- ✍️ Luyện tập online ---------- */
  const numOf = s => {
    const t = String(s).trim().replace(/\s+/g, '').replace(/,/g, '.').replace(/−/g, '-');
    let m = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/); if (m) return +m[2] ? +m[1] / +m[2] : NaN;
    return /^-?\d*\.?\d+$/.test(t) ? +t : NaN;
  };
  const sameAns = (x, ans) => { const a = numOf(x), b = numOf(ans); return !isNaN(a) && !isNaN(b) ? Math.abs(a - b) < 1e-9 : fold(x).replace(/\s+/g, '') === fold(ans).replace(/\s+/g, ''); };
  const YL = 'abcd';
  // Lời giải thích AI viết theo thứ tự phương án GỐC ("Phương án D sai…"); web đảo phương án nên đổi chữ cái cho khớp chỗ mới.
  function doiChu(q, opts) {
    if (!q.why || !Array.isArray(q.goc)) return q.why || '';
    const moi = {}; opts.forEach((o, p) => { const i = q.a.indexOf(o); if (i >= 0) moi['ABCD'[q.goc[i]]] = 'ABCD'[p]; });
    return q.why.replace(/((?:phương|Phương|PHƯƠNG|đáp|Đáp|ĐÁP)\s+án|[Cc]họn|[Cc]âu trả lời)((?:\s*(?:,|và|hoặc|hay|\/)?\s*(?:<\/?b>)?[A-D](?:<\/?b>)?(?![\p{L}\d]))+)/gu,
      (m, k, ds) => k + ds.replace(/[A-D](?![\p{L}\d])/g, c => moi[c] || c));
  }
  function paneLuyen(e0, pane, chon) {
    chon = chon || chonMacDinh(e0);
    const k0 = key(e0.lop, e0.bai), s = DANG[k0] = chonCau(e0, chon, null, lsCau(e0));
    const e = { ...e0, tn: s.tn, ds: s.ds, tln: s.tln };
    const ghi = (q, ok) => { const h = lsCau(e0); h[fpQ(q.q)] = ok ? 1 : 0; set('bh:cau:' + k0, h); };
    const tn = e.tn.map(q => ({ ...q, good: q.a[0], opts: shuffle(q.a) }));
    const total = tn.length + 4 * e.ds.length + e.tln.length, nQ = tn.length + e.ds.length + e.tln.length;
    let done = 0, right = 0;
    pane.innerHTML = vao10Box(e) + (coChon(e0) ? `<div class="card bh-bo-card"><p><b>Bài này có ${nCau(e0)} câu${boList(e0).length > 1 ? ` trong ${boList(e0).length} bộ` : ''}.</b> ${chon === 'ngau' ? 'Mỗi lượt web rút ngẫu nhiên một đề, ưu tiên câu em làm sai và câu chưa làm.' : 'Chọn bộ câu hỏi để luyện:'}</p>${chonHTML(e0, chon, 'bo')}</div>` : '') + (e.ds.length || e.tln.length
      ? `<p class="lead">Làm lần lượt ba phần như đề thi. Mỗi câu bấm <b>Kiểm tra</b> là biết đúng sai ngay và đọc lời giải thích. Câu đúng – sai: mỗi ý đúng được 1 điểm.</p>`
      : `<p class="lead">Chọn một đáp án cho mỗi câu là biết đúng sai ngay và đọc lời giải thích. Làm xong thì sang <b>Luyện đề</b> để làm bài tự luận như đề thi.</p>`) + `
      ${tn.length ? `<h3 class="sub">Phần I. Trắc nghiệm nhiều phương án (${tn.length} câu)</h3><div class="quiz">${tn.map((q, k) => `<article class="card qcard bh-q" data-k="${k}">
        <p class="qtext"><b>Câu ${k + 1}.</b> ${q.q}</p><div class="opts">${q.opts.map((o, j) => `<button type="button" class="opt" data-j="${j}"><span class="ol">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div>
        <div class="why" hidden></div></article>`).join('')}</div>` : ''}
      ${e.ds.length ? `<h3 class="sub">Phần II. Đúng – Sai (${e.ds.length} câu)</h3>${e.ds.map((q, k) => `<article class="card bh-dsq" data-k="${k}"><p class="qtext"><b>Câu ${k + 1}.</b> ${q.q}</p>
        <ol class="bh-ds">${q.y.map((y, j) => `<li data-j="${j}"><span class="bh-y"><b>${YL[j]})</b> ${y[0]}</span><span class="bh-dsb"><button type="button" class="tog" data-v="1">Đúng</button><button type="button" class="tog" data-v="0">Sai</button></span></li>`).join('')}</ol>
        <div class="row"><button class="btn primary" type="button" data-chk disabled>Kiểm tra</button></div><div class="why" hidden></div></article>`).join('')}` : ''}
      ${e.tln.length ? `<h3 class="sub">Phần III. Trả lời ngắn (${e.tln.length} câu)</h3>${e.tln.map((q, k) => `<article class="card bh-tl" data-k="${k}"><p class="qtext"><b>Câu ${k + 1}.</b> ${q.q}</p>
        <div class="row bh-tlrow"><label>Đáp số: <input class="bh-in" type="text" inputmode="decimal" autocomplete="off" aria-label="Đáp số câu ${k + 1}"></label><button class="btn primary" type="button" data-chk>Kiểm tra</button></div>
        <div class="why" hidden></div></article>`).join('')}<p class="muted small">Trả lời ngắn: ghi số, dùng dấu phẩy hoặc dấu chấm cho số thập phân (2,5 hoặc 2.5); được ghi phân số dạng 3/4.</p>` : ''}
      <div class="card score bh-score" id="bhScore"><p>Đã làm <b id="bhDone">0</b>/${nQ} câu · đúng <b id="bhRight">0</b>/${total} ý</p></div>`;
    $$('[data-bo]', pane).forEach(b => b.addEventListener('click', () => { set('bh:bo:' + k0, b.dataset.bo); paneLuyen(e0, pane, b.dataset.bo); }));
    const tick = (ok, pts = ok ? 1 : 0) => { done++; right += pts; $('#bhDone').textContent = done; $('#bhRight').textContent = right; if (done === nQ) finish(); };
    const why = (card, ok, txt) => { const w = $('.why', card); w.hidden = false; w.innerHTML = `${ok ? '<b class="okc">Đúng rồi!</b>' : '<b class="badc">Chưa đúng.</b>'} ${txt || ''}`; };
    $$('.bh-q', pane).forEach(card => {
      const q = tn[+card.dataset.k];
      $$('.opt', card).forEach(btn => btn.addEventListener('click', () => {
        if (card.classList.contains('locked')) return; card.classList.add('locked');
        const ok = q.opts[+btn.dataset.j] === q.good;
        $$('.opt', card).forEach(x => { x.disabled = true; if (q.opts[+x.dataset.j] === q.good) x.classList.add('good'); });
        if (!ok) btn.classList.add('bad');
        why(card, ok, doiChu(q, q.opts)); ghi(q, ok); tick(ok);
      }));
    });
    $$('.bh-dsq', pane).forEach(card => {
      const q = e.ds[+card.dataset.k], pick = [null, null, null, null], chk = $('[data-chk]', card);
      $$('.bh-ds li', card).forEach(li => $$('button', li).forEach(btn => btn.addEventListener('click', () => {
        if (card.classList.contains('locked')) return;
        pick[+li.dataset.j] = btn.dataset.v === '1'; $$('button', li).forEach(x => x.classList.toggle('on', x === btn));
        chk.disabled = pick.some(x => x === null);
      })));
      chk.addEventListener('click', () => {
        if (card.classList.contains('locked')) return; card.classList.add('locked'); chk.disabled = true;
        let n = 0;
        $$('.bh-ds li', card).forEach(li => { const j = +li.dataset.j, ok = pick[j] === q.y[j][1]; if (ok) n++;
          li.classList.add(ok ? 'good' : 'bad'); li.insertAdjacentHTML('beforeend', `<span class="bh-mark">${ok ? '✓' : '✗'} ${q.y[j][1] ? 'Đúng' : 'Sai'}</span>`);
          $$('button', li).forEach(x => { x.disabled = true; }); });
        const w = $('.why', card); w.hidden = false;
        w.innerHTML = `<b class="${n === 4 ? 'okc' : 'badc'}">Đúng ${n}/4 ý.</b> ${q.why || ''}`; ghi(q, n === 4); tick(n === 4, n);
      });
    });
    $$('.bh-tl', pane).forEach(card => {
      const q = e.tln[+card.dataset.k], inp = $('.bh-in', card), chk = $('[data-chk]', card);
      const go = () => {
        if (card.classList.contains('locked') || !inp.value.trim()) { if (!inp.value.trim()) inp.focus(); return; }
        card.classList.add('locked'); chk.disabled = true; inp.readOnly = true;
        const ok = sameAns(inp.value, q.ans); inp.classList.add(ok ? 'good' : 'bad');
        why(card, ok, `${ok ? '' : `Đáp số đúng: <b>${esc(q.ans)}</b>. `}${q.why || ''}`); ghi(q, ok); tick(ok);
      };
      chk.addEventListener('click', go); inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') go(); });
    });
    function finish() {
      // nhiều bộ / rút ngẫu nhiên: số câu mỗi lượt khác nhau → điểm cao nhất tính theo tỉ lệ, quy về thang của lượt này
      // nhiều bộ / rút ngẫu nhiên: mỗi lượt số câu khác nhau → giữ lượt có tỉ lệ đúng cao nhất
      const old = prog(e.lop, e.bai), hon = !old || !old.total || right / total >= old.best / old.total;
      const kq = hon ? { best: right, total } : { best: old.best, total: old.total };
      set('bh:' + key(e.lop, e.bai), { ...kq, luc: Date.now() });
      const s = $('#bhScore'), r = right / total;
      s.innerHTML = `<p class="big-score">${right}/${total}</p><p>${r === 1 ? 'Xuất sắc! Em đã nắm chắc bài này.' : r >= 0.8 ? 'Tốt lắm. Đọc lại lời giải thích các câu sai rồi làm lại để đạt điểm tối đa.' : r >= 0.5 ? 'Em hiểu được phần lớn bài. Mở lại Bài giảng, xem mục Cần nhớ và các ví dụ rồi làm lại.' : 'Em nên học lại Bài giảng (đọc kĩ ví dụ) trước khi làm lại.'}</p>
        <p class="muted">Điểm cao nhất của em: ${kq.best}/${kq.total}</p><div class="row" style="justify-content:center"><button class="btn" type="button" id="bhRedo">${chon === 'ngau' ? '🎲 Làm lượt mới' : '↻ Làm lại (đảo phương án)'}</button><a class="btn ghost" href="#/bai-hoc/${e.lop}/${e.bai}">📘 Xem lại bài giảng</a></div>`;
      $('#bhRedo').addEventListener('click', () => { paneLuyen(e0, pane, chon); pane.scrollIntoView({ block: 'start' }); });
      s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ---------- 🖨️ Phiếu làm bài trên lớp (in / lưu PDF) ----------
     Trắc nghiệm đảo phương án theo "mã đề" (cố định với mỗi mã – in 2 mã cho 2 dãy bàn), đúng – sai có ô Đúng/Sai,
     trả lời ngắn có ô ghi số; trang đáp án riêng cho thầy (kèm lời giải thích nếu chọn). */
  function rngOf(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function daoTheoMa(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const chuThuong = h => String(h).replace(/\\\(|\\\)|\\\[|\\\]/g, '').replace(/<[^>]+>/g, '').replace(/\\[a-zA-Z]+/g, 'x').length;
  // Câu của phiếu: một bộ, tất cả, hoặc rút ngẫu nhiên CỐ ĐỊNH theo mã đề (in lại cùng mã ra cùng câu).
  const phieuBo = (e, ma, chon) => { const c = chonCau(e, chon === undefined ? (vuot(e) ? 'ngau' : 'tat') : chon, rngOf(e.lop * 7919 + e.bai * 131 + ma)); return { ...e, tn: c.tn, ds: c.ds, tln: c.tln }; };
  function phieuData(e, ma, chon) {
    const r = rngOf(e.lop * 100000 + e.bai * 100 + ma);
    return phieuBo(e, ma, chon).tn.map(q => { const opts = daoTheoMa(q.a, r); return { q, opts, good: opts.indexOf(q.a[0]) }; });
  }
  // Mã đề in trên phiếu: 3 chữ số (máy chấm / tệp đáp án UNT cần đúng 3 chữ số). Thầy chọn mã đầu (mặc định 001) → mã 1–4 = 001…004.
  const maBa = (o, m) => String(Math.min(999, Math.max(0, (o && Number.isInteger(o.maDau) ? o.maDau : 1) + m - 1))).padStart(3, '0');
  /* Đáp án dạng UNT (bảng Excel): cột A "Câu" đánh số liên tục cả ba phần, mỗi mã đề một cột (tiêu đề 3 chữ số).
     Phần I: A/B/C/D · Phần II: mỗi câu một ô 4 chữ Đ/S theo ý a–d (ví dụ ĐSĐS) · Phần III: đáp số tối đa 4 kí tự, dấu chấm thập phân (-1.5). */
  const soUNT = a => { let t = String(a).trim().replace(/−/g, '-').replace(/\s+/g, '').replace(/,/g, '.');
    if (t.includes('/')) { const v = numOf(t); if (!isNaN(v)) t = String(+v.toFixed(4)); } return t; };
  function dapAnUNT(e, o, soMa = 4) {
    const ms = Array.from({ length: soMa }, (_, k) => k + 1);
    const cot = ms.map(m => { const x = phieuBo(e, m, o.bo); return [...phieuData(e, m, o.bo).map(t => 'ABCD'[t.good]), ...x.ds.map(q => q.y.map(y => (y[1] ? 'Đ' : 'S')).join('')), ...x.tln.map(q => soUNT(q.ans))]; });
    const n = Math.max(0, ...cot.map(c => c.length));
    return [['Câu', ...ms.map(m => maBa(o, m))], ...Array.from({ length: n }, (_, i) => [i + 1, ...cot.map(c => c[i] ?? '')])];
  }
  function phieuHTML(e0, o) {
    const e = phieuBo(e0, o.ma, o.bo);
    const b = baiOf(e.lop, e.bai), ten = `Bài ${e.bai}. ${esc(b ? b.ten : e.ten)}`, ma = maBa(o, o.ma);
    const tn = phieuData(e0, o.ma, o.bo);
    const head = r => `<div class="sh-head"><span>${U.tenPhieu()} · PHIẾU LÀM BÀI TRÊN LỚP</span><span>${r}</span></div>`;
    const cot = opts => { const m = Math.max(...opts.map(chuThuong)); return m <= 22 ? 'c4' : m <= 48 ? 'c2' : 'c1'; };
    let s1 = `<section class="sh-page">${head(`Toán ${e.lop} · <span class="bh-tt-ma">Mã ${ma}</span>`)}
      <h1 class="sh-title">PHIẾU LÀM BÀI</h1><p class="sh-sub">Toán ${e.lop} – ${ten}</p>
      <p class="sh-info">Họ và tên: ................................................................ Lớp: .............. Ngày: ......../......../........</p>
      ${o.canNho && e.can_nho.length ? `<div class="sh-remind"><b>Kiến thức cần nhớ:</b><ul>${e.can_nho.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}`;
    if (tn.length) s1 += `<h2 class="sh-h">PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN (${tn.length} câu) – khoanh tròn chữ cái trước phương án đúng</h2>
      ${tn.map((x, k) => `<div class="sh-q"><div class="sh-de"><b>Câu ${k + 1}.</b> ${x.q.q}</div><div class="bh-opts ${cot(x.opts)}">${x.opts.map((op, j) => `<span><b>${'ABCD'[j]}.</b>${op}</span>`).join('')}</div></div>`).join('')}`;
    if (e.ds.length) s1 += `<h2 class="sh-h">PHẦN II. ĐÚNG – SAI (${e.ds.length} câu) – đánh dấu ✗ vào ô Đúng hoặc Sai của từng ý</h2>
      ${e.ds.map((q, k) => `<div class="sh-q"><div class="sh-de"><b>Câu ${k + 1}.</b> ${q.q}</div><table class="bh-ds-t"><tr><th>Ý</th><th class="o">Đúng</th><th class="o">Sai</th></tr>
        ${q.y.map((y, j) => `<tr><td><b>${YL[j]})</b> ${y[0]}</td><td class="o">☐</td><td class="o">☐</td></tr>`).join('')}</table></div>`).join('')}`;
    if (e.tln.length) s1 += `<h2 class="sh-h">PHẦN III. TRẢ LỜI NGẮN (${e.tln.length} câu) – ghi đáp số vào ô, trình bày vắn tắt bên dưới</h2>
      ${e.tln.map((q, k) => `<div class="sh-q"><div class="sh-de"><b>Câu ${k + 1}.</b> ${q.q}</div><p>Đáp số: <span class="bh-tl-o"><i></i><i></i><i></i><i></i></span></p>${o.dong ? `<div class="sh-lines">${'<i></i>'.repeat(o.dong)}</div>` : ''}</div>`).join('')}`;
    s1 += `<div class="sh-check"><b>Tự đánh giá:</b><span>Phần I: ......../${tn.length}</span>${e.ds.length ? `<span>Phần II: ......../${e.ds.length * 4} ý</span>` : ''}${e.tln.length ? `<span>Phần III: ......../${e.tln.length}</span>` : ''}<span>☐ Câu sai đã xem lại lời giải</span></div></section>`;
    if (!o.dapAn) return `<div class="sheet math">${s1}</div>`;
    const s2 = `<section class="sh-page">${head(`ĐÁP ÁN · Mã ${ma}`)}<h1 class="sh-title">ĐÁP ÁN PHIẾU LÀM BÀI</h1><p class="sh-sub">Toán ${e.lop} – ${ten} · Mã ${ma}</p>
      ${tn.length ? `<h2 class="sh-h">PHẦN I</h2><table class="bh-key"><tr><th>Câu</th>${tn.map((_, k) => `<th>${k + 1}</th>`).join('')}</tr><tr><th>Đáp án</th>${tn.map(x => `<td><b>${'ABCD'[x.good]}</b></td>`).join('')}</tr></table>
        ${o.giai ? tn.map((x, k) => x.q.why ? `<div class="sh-vd"><p><b>Câu ${k + 1} (${'ABCD'[x.good]}).</b> ${doiChu(x.q, x.opts)}</p></div>` : '').join('') : ''}` : ''}
      ${e.ds.length ? `<h2 class="sh-h">PHẦN II</h2><table class="bh-key"><tr><th>Câu</th><th>a</th><th>b</th><th>c</th><th>d</th></tr>${e.ds.map((q, k) => `<tr><th>${k + 1}</th>${q.y.map(y => `<td><b>${y[1] ? 'Đ' : 'S'}</b></td>`).join('')}</tr>`).join('')}</table>
        ${o.giai ? e.ds.map((q, k) => q.why ? `<div class="sh-vd"><p><b>Câu ${k + 1}.</b> ${q.why}</p></div>` : '').join('') : ''}` : ''}
      ${e.tln.length ? `<h2 class="sh-h">PHẦN III</h2><table class="bh-key"><tr><th>Câu</th>${e.tln.map((_, k) => `<th>${k + 1}</th>`).join('')}</tr><tr><th>Đáp số</th>${e.tln.map(q => `<td><b>${esc(q.ans)}</b></td>`).join('')}</tr></table>
        ${o.giai ? e.tln.map((q, k) => q.why ? `<div class="sh-vd"><p><b>Câu ${k + 1} (${esc(q.ans)}).</b> ${q.why}</p></div>` : '').join('') : ''}` : ''}</section>`;
    return `<div class="sheet math">${s1}${s2}</div>`;
  }
  function panePhieu(e, pane) {
    const st = Object.assign({ ma: 1, canNho: true, dapAn: false, giai: true, dong: 3, maDau: 1, soMa: 4 }, get('bh:phieu', {}));
    let bo = vuot(e) ? 'ngau' : 'tat';
    const moTa = () => { const x = phieuBo(e, +($('#pMa') ? $('#pMa').value : st.ma), bo); return `${x.tn.length} câu trắc nghiệm${x.ds.length ? `, ${x.ds.length} câu đúng – sai` : ''}${x.tln.length ? `, ${x.tln.length} câu trả lời ngắn` : ''}`; };
    pane.innerHTML = `<section class="card sheet-tools"><h3>🖨️ Phiếu làm bài trên lớp</h3>
      ${coChon(e) ? `<p><b>Câu hỏi in:</b></p>${chonHTML(e, bo, 'pbo')}<p class="muted small">🎲 Ngẫu nhiên: mỗi mã đề rút một bộ câu khác nhau từ ${nCau(e)} câu của bài (in lại cùng mã ra đúng các câu đó).</p>` : ''}
      <p class="muted">In phát cho học sinh làm tại lớp: <span id="pMoTa">${moTa()}</span>. Mỗi <b>mã đề</b> đảo thứ tự phương án khác nhau – in 2 mã cho 2 dãy bàn.</p>
      <div class="opts-row"><label class="tog">Mã đề đầu (3 chữ số) <input id="pMaDau" type="text" inputmode="numeric" maxlength="3" size="3" value="${maBa(st, 1)}" aria-label="Mã đề đầu tiên, 3 chữ số"></label>
        <label class="tog">In mã <select id="pMa">${[1, 2, 3, 4].map(m => `<option value="${m}" ${st.ma === m ? 'selected' : ''}>${maBa(st, m)}</option>`).join('')}</select></label>
        <label class="tog"><input type="checkbox" id="pCan" ${st.canNho ? 'checked' : ''}> In phần Cần nhớ</label>
        ${e.tln.length ? `<label class="tog">Dòng kẻ mỗi câu trả lời ngắn <select id="pDong">${[0, 2, 3, 5].map(n => `<option ${st.dong === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label>` : ''}
        <label class="tog"><input type="checkbox" id="pDa" ${st.dapAn ? 'checked' : ''}> Kèm trang đáp án (cho thầy cô)</label>
        <label class="tog"><input type="checkbox" id="pGiai" ${st.giai ? 'checked' : ''}> Đáp án kèm lời giải thích</label></div>
      <div class="row"><button class="btn primary" type="button" id="pIn">🖨️ In / Lưu PDF</button>${typeof Xlsx !== 'undefined' ? `<button class="btn" type="button" id="pXls">📊 Xuất Excel đáp án (UNT)</button>
        <label class="tog">gồm <select id="pSoMa">${[1, 2, 3, 4].map(n => `<option value="${n}" ${st.soMa === n ? 'selected' : ''}>${n}</option>`).join('')}</select> mã đề</label>` : ''}</div>
      <p class="muted small">Lưu PDF: trong hộp thoại in chọn “Lưu dưới dạng PDF” (Save as PDF), khổ A4. Excel đáp án: mỗi mã đề một cột, câu đánh số liên tục (Phần I: A–D · Phần II: ĐSĐS · Phần III: đáp số, dấu chấm) – nạp vào phần mềm chấm.</p></section>
      <div class="paper-wrap" id="paper"></div>`;
    const maDau = () => { const v = parseInt($('#pMaDau').value, 10); return Number.isInteger(v) && v >= 0 && v <= 996 ? v : 1; };
    const opt = () => ({ ma: +$('#pMa').value, canNho: $('#pCan').checked, dapAn: $('#pDa').checked, giai: $('#pGiai').checked, dong: $('#pDong') ? +$('#pDong').value : 0, maDau: maDau(), soMa: $('#pSoMa') ? +$('#pSoMa').value : 4, bo });
    const draw = () => { const o = opt(); const { bo: _, ...luu } = o; set('bh:phieu', luu); $('#pMoTa').textContent = moTa(); $('#paper').innerHTML = phieuHTML(e, o); };
    $$('[data-pbo]', pane).forEach(b => b.addEventListener('click', () => { bo = b.dataset.pbo; $$('[data-pbo]', pane).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); draw(); }));
    $$('#pMa, #pCan, #pDa, #pGiai, #pDong, #pSoMa', pane).forEach(x => x.addEventListener('change', draw));
    $('#pMaDau').addEventListener('change', () => { const o = opt(); $('#pMaDau').value = maBa(o, 1); $$('#pMa option', pane).forEach(x => { x.textContent = maBa(o, +x.value); }); draw(); });
    if ($('#pXls')) $('#pXls').addEventListener('click', () => { const o = opt(), b = baiOf(e.lop, e.bai);
      Xlsx.taiVe(`dap-an-UNT-toan${e.lop}-bai${String(e.bai).padStart(2, '0')}-ma${maBa(o, 1)}-${maBa(o, o.soMa)}.xlsx`, 'Đáp án', dapAnUNT(e, o, o.soMa), { cot: [8, ...Array(o.soMa).fill(12)] });
      U.toast(`Đã xuất đáp án ${o.soMa} mã đề (${maBa(o, 1)}–${maBa(o, o.soMa)}) – Toán ${e.lop} Bài ${e.bai}${b ? '. ' + b.ten : ''}`); });
    $('#pIn').addEventListener('click', ev => OnTap.printHTML(phieuHTML(e, opt()), ev.currentTarget));
    draw();
  }

  /* ---------- Xem trước khi nhập (Xưởng dữ liệu): bài giảng + mọi câu kèm đáp án ---------- */
  function previewHTML(e) {
    const b = baiOf(e.lop, e.bai);
    return `<div class="bh-pre math"><h2>Toán ${e.lop} – Bài ${e.bai}. ${esc(b ? b.ten : e.ten)}</h2>${giangHTML(e)}
      <h3 class="sub">Luyện tập – đáp án</h3><ol>${e.tn.map(q => `<li>${q.q}<br><b>Đúng:</b> ${q.a[0]} · <span class="muted">sai: ${q.a.slice(1).join(' | ')}</span>${q.why ? `<br><i>${q.why}</i>` : ''}</li>`).join('')}</ol>
      <ol>${e.ds.map(q => `<li>${q.q}<ul>${q.y.map((y, j) => `<li>${YL[j]}) ${y[0]} → <b>${y[1] ? 'Đúng' : 'Sai'}</b></li>`).join('')}</ul>${q.why ? `<i>${q.why}</i>` : ''}</li>`).join('')}</ol>
      <ol>${e.tln.map(q => `<li>${q.q} → <b>${esc(q.ans)}</b>${q.why ? `<br><i>${q.why}</i>` : ''}</li>`).join('')}</ol></div>`;
  }

  function route(parts) {
    if (parts[0] !== 'bai-hoc') return false;
    const lop = +parts[1], so = +parts[2];
    if (!LOP.includes(lop)) pickLop(); else if (!so) mucLucPage(lop); else lesson(lop, so, ['luyen', 'phieu'].includes(parts[3]) ? parts[3] : '');
    return true;
  }
  return { LOP, LIEN_9, DUNG_9, HAN, dapAnUNT, maBa, own, thuGhep, boList, chonCau, coChon, fpQ, tuVao10, doiChu, congCu, phieuHTML, phieuData, mucLuc, all, baiOf, add, get: get_, list, prog, route, previewHTML, numOf, sameAns, ML, taiNguyen, tnOf, nhung, TN };
})();
