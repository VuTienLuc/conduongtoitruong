/* =====================================================================
   BÀI GIẢNG – LUYỆN TẬP ONLINE (lớp 9, 10, 11, 12) – bài học xếp theo mục lục SGK Toán "Kết nối tri thức với cuộc sống"
   #/bai-hoc                    chọn lớp
   #/bai-hoc/<lớp>              mục lục: Tập 1, Tập 2 → chương → bài (tìm nhanh theo tên)
   #/bai-hoc/<lớp>/<bài>        📘 Bài giảng: mục tiêu, kiến thức từng mục, ví dụ có lời giải, lưu ý hay sai, cần nhớ
   #/bai-hoc/<lớp>/<bài>/luyen  ✍️ Luyện tập online: Phần I trắc nghiệm, Phần II đúng – sai, Phần III trả lời ngắn; chấm ngay, lưu điểm cao nhất
   Mục lục: data/bai-hoc/muc-luc-kntt.js (BaiHoc.mucLuc). Nội dung từng bài: JSON "loai":"bai_hoc" tạo bằng Xưởng dữ liệu
   (NotebookLM / Gem) → NhapDL (assets/js/nhap.js) → BaiHoc.add. Bài chưa có nội dung vẫn hiện trong mục lục.
   ===================================================================== */
const BaiHoc = (() => {
  const { esc, $, $$, get, set, shuffle } = U;
  const LOP = [9, 10, 11, 12];
  const ML = {};                       // lớp → { lop, ten, chuong: [{ tap, so, ten, bai: [{ so, ten }] }] }
  const LS = {};                       // 'lớp-bài' → bài học
  const key = (l, b) => `${l}-${b}`;
  // Bài lớp 9 gắn với chủ đề ôn thi vào 10; lớp 10–12 tự tìm chủ đề vận dụng – VDC có cùng số bài.
  const LIEN_9 = { 1: 'he-phuong-trinh-thuc-te', 2: 'he-phuong-trinh-thuc-te', 3: 'he-phuong-trinh-thuc-te', 11: 'kien-thuc-thong-nhat', 12: 'kien-thuc-thong-nhat',
    15: 'thuc-te-dai-so-hinh-hoc', 18: 'ham-so-parabol', 19: 'pt-bac-hai-viete', 20: 'pt-bac-hai-viete', 21: 'thuc-te-dai-so-hinh-hoc',
    25: 'xac-suat', 26: 'xac-suat', 27: 'hinh-7a', 28: 'hinh-7a', 29: 'hinh-7a', 31: 'hinh-khong-gian', 32: 'hinh-khong-gian' };

  /* ---------- Dữ liệu ---------- */
  function mucLuc(lop, ten, chuong) {
    ML[lop] = { lop, ten, chuong: chuong.map(([tap, so, t, bai]) => ({ tap, so, ten: t, bai: bai.map(([s, n]) => ({ so: s, ten: n })) })) };
  }
  const all = lop => (ML[lop] ? ML[lop].chuong.flatMap(c => c.bai.map(b => ({ ...b, chuong: c }))) : []);
  const baiOf = (lop, so) => all(lop).find(b => b.so === +so) || null;
  function add(e) { LS[key(e.lop, e.bai)] = e; }
  const get_ = (lop, bai) => LS[key(lop, bai)];
  const list = () => Object.values(LS);
  const prog = (lop, bai) => get('bh:' + key(lop, bai), null);

  /* ---------- Khung trang ---------- */
  const view = () => $('#view');
  const shell = (back, label, body) => `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="${back}">← ${label}</a></div>${body}</main>`;
  const fold = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

  function pickLop() {
    const cards = LOP.map(l => {
      const n = all(l).length, k = all(l).filter(b => get_(l, b.so)).length;
      return `<a class="card grade-card" href="#/bai-hoc/${l}"><span class="g-big">${l}</span><span class="g-body"><b>Toán ${l}</b>
        <span>${ML[l] ? esc(ML[l].ten) : 'Kết nối tri thức với cuộc sống'} · ${ML[l] ? ML[l].chuong.length : 0} chương</span>
        <span class="chips"><span class="chip">${n} bài</span>${k ? `<span class="chip ok">${k} bài có bài giảng</span>` : ''}</span></span></a>`;
    }).join('');
    view().innerHTML = shell('#/', 'Chọn lớp', `<section class="card hero"><p class="pill">📚 Học theo SGK</p><h2>Bài giảng – Luyện tập online</h2>
      <p>Học đúng thứ tự mục lục SGK Toán <b>Kết nối tri thức với cuộc sống</b>. Mỗi bài có bài giảng ngắn (kiến thức, ví dụ có lời giải, lưu ý hay sai) và bài luyện tập làm ngay trên máy theo ba dạng của đề thi: trắc nghiệm, đúng – sai, trả lời ngắn.</p></section>
      <div class="grade-grid">${cards}</div>`);
  }

  function mucLucPage(lop) {
    const M = ML[lop]; if (!M) return pickLop();
    const row = b => {
      const e = get_(lop, b.so), p = prog(lop, b.so);
      return `<a class="bh-row${e ? '' : ' trong'}" href="#/bai-hoc/${lop}/${b.so}" data-s="${esc(fold(`bai ${b.so} ${b.ten} ${b.chuong.ten}`))}">
        <span class="bh-no">${b.so}</span><span class="bh-ten">Bài ${b.so}. ${esc(b.ten)}</span>
        <span class="chips">${e ? `<span class="chip ok">📘 ✍️ ${e.tn.length + e.ds.length + e.tln.length} câu</span>` : '<span class="chip">Đang soạn</span>'}${p ? `<span class="chip">✓ ${p.best}/${p.total}</span>` : ''}</span></a>`;
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
    const tabs = [['', '📘', 'Bài giảng'], ['luyen', '✍️', 'Luyện tập online']].map(([k, ic, n]) =>
      `<a class="tab${k === tab ? ' on' : ''}" href="#/bai-hoc/${lop}/${so}${k ? '/' + k : ''}" ${k === tab ? 'aria-current="page"' : ''}><span aria-hidden="true">${ic}</span> ${n}</a>`).join('');
    view().innerHTML = `${App.topBar()}<main class="wrap">
      <div class="toolbar"><a class="back" href="#/bai-hoc/${lop}">← Mục lục Toán ${lop}</a>
        <span class="nav-mini">${prev ? `<a href="#/bai-hoc/${lop}/${prev.so}">‹ Bài ${prev.so}</a>` : ''}${next ? `<a href="#/bai-hoc/${lop}/${next.so}">Bài ${next.so} ›</a>` : ''}</span></div>
      <section class="thead card"><span class="tno big">${b.so}</span><div><p class="tbai">Toán ${lop} · Tập ${b.chuong.tap} · Chương ${b.chuong.so}. ${esc(b.chuong.ten)}</p>
        <h2>Bài ${b.so}. ${esc(b.ten)}</h2>${e ? `<p class="tdesc">${e.mau ? '<span class="chip warnc">Mẫu minh họa</span> ' : ''}${e.nguon ? `Nguồn: ${e.nguon}` : ''}</p>` : ''}</div></section>
      ${e ? `<nav class="tabs" aria-label="Bài học">${tabs}</nav><section id="pane" class="pane"></section>` : `<section id="pane" class="pane"></section>`}
      ${lienQuan(lop, b.so)}
      <div class="pane-foot">${e && !tab ? `<a class="btn primary" href="#/bai-hoc/${lop}/${so}/luyen">Luyện tập ngay ✍️ →</a>` : next ? `<a class="btn primary" href="#/bai-hoc/${lop}/${next.so}">Sang Bài ${next.so} →</a>` : `<a class="btn primary" href="#/bai-hoc/${lop}">Về mục lục</a>`}</div></main>`;
    const pane = $('#pane');
    if (!e) return paneTrong(lop, b, pane);
    if (tab === 'luyen') paneLuyen(e, pane); else paneGiang(e, pane);
  }
  function paneTrong(lop, b, pane) {
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
  function paneGiang(e, pane) { pane.innerHTML = giangHTML(e); set('bh:doc:' + key(e.lop, e.bai), 1); }

  /* ---------- ✍️ Luyện tập online ---------- */
  const numOf = s => {
    const t = String(s).trim().replace(/\s+/g, '').replace(/,/g, '.').replace(/−/g, '-');
    let m = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/); if (m) return +m[2] ? +m[1] / +m[2] : NaN;
    return /^-?\d*\.?\d+$/.test(t) ? +t : NaN;
  };
  const sameAns = (x, ans) => { const a = numOf(x), b = numOf(ans); return !isNaN(a) && !isNaN(b) ? Math.abs(a - b) < 1e-9 : fold(x).replace(/\s+/g, '') === fold(ans).replace(/\s+/g, ''); };
  const YL = 'abcd';
  function paneLuyen(e, pane) {
    const tn = e.tn.map(q => ({ ...q, good: q.a[0], opts: shuffle(q.a) }));
    const total = tn.length + 4 * e.ds.length + e.tln.length, nQ = tn.length + e.ds.length + e.tln.length;
    let done = 0, right = 0;
    pane.innerHTML = `<p class="lead">Làm lần lượt ba phần như đề thi. Mỗi câu bấm <b>Kiểm tra</b> là biết đúng sai ngay và đọc lời giải thích. Câu đúng – sai: mỗi ý đúng được 1 điểm.</p>
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
    const tick = (ok, pts = ok ? 1 : 0) => { done++; right += pts; $('#bhDone').textContent = done; $('#bhRight').textContent = right; if (done === nQ) finish(); };
    const why = (card, ok, txt) => { const w = $('.why', card); w.hidden = false; w.innerHTML = `${ok ? '<b class="okc">Đúng rồi!</b>' : '<b class="badc">Chưa đúng.</b>'} ${txt || ''}`; };
    $$('.bh-q', pane).forEach(card => {
      const q = tn[+card.dataset.k];
      $$('.opt', card).forEach(btn => btn.addEventListener('click', () => {
        if (card.classList.contains('locked')) return; card.classList.add('locked');
        const ok = q.opts[+btn.dataset.j] === q.good;
        $$('.opt', card).forEach(x => { x.disabled = true; if (q.opts[+x.dataset.j] === q.good) x.classList.add('good'); });
        if (!ok) btn.classList.add('bad');
        why(card, ok, q.why); tick(ok);
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
        w.innerHTML = `<b class="${n === 4 ? 'okc' : 'badc'}">Đúng ${n}/4 ý.</b> ${q.why || ''}`; tick(n === 4, n);
      });
    });
    $$('.bh-tl', pane).forEach(card => {
      const q = e.tln[+card.dataset.k], inp = $('.bh-in', card), chk = $('[data-chk]', card);
      const go = () => {
        if (card.classList.contains('locked') || !inp.value.trim()) { if (!inp.value.trim()) inp.focus(); return; }
        card.classList.add('locked'); chk.disabled = true; inp.readOnly = true;
        const ok = sameAns(inp.value, q.ans); inp.classList.add(ok ? 'good' : 'bad');
        why(card, ok, `${ok ? '' : `Đáp số đúng: <b>${esc(q.ans)}</b>. `}${q.why || ''}`); tick(ok);
      };
      chk.addEventListener('click', go); inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') go(); });
    });
    function finish() {
      const old = prog(e.lop, e.bai), best = Math.max(right, old ? old.best : 0);
      set('bh:' + key(e.lop, e.bai), { best, total, luc: Date.now() });
      const s = $('#bhScore'), r = right / total;
      s.innerHTML = `<p class="big-score">${right}/${total}</p><p>${r === 1 ? 'Xuất sắc! Em đã nắm chắc bài này.' : r >= 0.8 ? 'Tốt lắm. Đọc lại lời giải thích các câu sai rồi làm lại để đạt điểm tối đa.' : r >= 0.5 ? 'Em hiểu được phần lớn bài. Mở lại Bài giảng, xem mục Cần nhớ và các ví dụ rồi làm lại.' : 'Em nên học lại Bài giảng (đọc kĩ ví dụ) trước khi làm lại.'}</p>
        <p class="muted">Điểm cao nhất của em: ${best}/${total}</p><div class="row" style="justify-content:center"><button class="btn" type="button" id="bhRedo">↻ Làm lại (đảo phương án)</button><a class="btn ghost" href="#/bai-hoc/${e.lop}/${e.bai}">📘 Xem lại bài giảng</a></div>`;
      $('#bhRedo').addEventListener('click', () => { paneLuyen(e, pane); pane.scrollIntoView({ block: 'start' }); });
      s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
    if (!LOP.includes(lop)) pickLop(); else if (!so) mucLucPage(lop); else lesson(lop, so, parts[3] === 'luyen' ? 'luyen' : '');
    return true;
  }
  return { LOP, LIEN_9, mucLuc, all, baiOf, add, get: get_, list, prog, route, previewHTML, numOf, sameAns, ML };
})();
