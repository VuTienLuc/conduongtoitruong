/* =====================================================================
   APP – điều hướng theo hash và hiển thị:
   #/                 trang chủ (cấu trúc đề, các chủ đề, tiến độ)
   #/cd/<mã>/<tab>    một chủ đề; tab: lt · meo · hieu · mau · phieu · ai
   #/lo-trinh         lộ trình 26 tuần
   Nội dung lấy từ Topics (data/cdNN-*.js). Không sửa tệp này khi chỉ thêm nội dung.
   ===================================================================== */
const App = (() => {
  const { esc, $, $$, h, get, set, shuffle, pt, sum, plain, copy, toast } = U;

  const TABS = [
    ['lt', '📘', 'Lý thuyết'],
    ['meo', '💡', 'Mẹo nhớ'],
    ['hieu', '✅', 'Hiểu bài'],
    ['mau', '✍️', 'Tự luận mẫu'],
    ['phieu', '🖨️', 'Phiếu làm bài'],
    ['ai', '🤖', 'Nhờ AI nhận xét'],
  ];

  // Cấu trúc đề theo hướng dẫn thống nhất của Sở GD&ĐT TP.HCM (năm học 2026–2027).
  const STRUCT = [
    ['Bài 1', '1,5', 'Vẽ đồ thị y = ax²; tìm điểm thuộc đồ thị thỏa điều kiện', ['ham-so-parabol']],
    ['Bài 2', '1,0', 'Điều kiện có nghiệm của phương trình bậc hai; Viète', ['pt-bac-hai-viete']],
    ['Bài 3', '1,5', 'Xác suất (dạng đơn giản)', ['xac-suat']],
    ['Bài 4', '1,0', 'Thực tế đại số – hình học: chu vi, diện tích, cung, quạt, viên phân, vành khăn; lập biểu thức, phương trình', ['thuc-te-dai-so-hinh-hoc']],
    ['Bài 5', '1,0', 'Hình học không gian thực tế, cho sẵn công thức', ['hinh-khong-gian']],
    ['Bài 6', '1,0', 'Thực tế vận dụng cao: phương trình, hệ phương trình bậc nhất hai ẩn', ['he-phuong-trinh-thuc-te']],
    ['Bài 7', '3,0', 'Hình học phẳng 3 câu: a) bốn điểm cùng đường tròn, song song, vuông góc… b) hệ thức, thẳng hàng, đồng quy… c) tính toán (vận dụng cao)', ['hinh-7a', 'hinh-7b', 'hinh-7c']],
  ];

  // Quy định thống nhất (dùng trong prompt và chủ đề "Luật chơi").
  const RULES = {
    no: [
      'Đường kính vuông góc với dây thì đi qua trung điểm của dây (và chiều ngược lại) – phải chứng minh lại bằng tam giác cân.',
      'Đường kính vuông góc với dây cung AB thì đi qua điểm chính giữa cung AB và ngược lại – phải chứng minh lại.',
      'Ba dấu hiệu tứ giác nội tiếp (tổng hai góc đối 180°; hai góc bằng nhau cùng nhìn một cạnh; góc ngoài bằng góc trong đối) – KHÔNG được dùng; phải chỉ ra bốn điểm cách đều một điểm.',
      'Tính chất đường phân giác ngoài của tam giác – không được dùng.',
      'Hệ thức về cạnh và đường cao trong tam giác vuông – phải chứng minh lại bằng tam giác đồng dạng.',
      'Các hệ thức tan = sin/cos, cot = cos/sin, tan·cot = 1, sin² + cos² = 1 – phải chứng minh lại từ định nghĩa.',
    ],
    yes: [
      'Các chú ý, nhận xét về góc nội tiếp trong SGK (góc nội tiếp chắn nửa đường tròn là góc vuông; cùng chắn một cung thì bằng nhau…).',
      'Tam giác vuông có một góc 45°, tam giác có hai góc 45°, tam giác cân có góc ở đáy 45° là tam giác vuông cân.',
      'Tam giác có trung tuyến ứng với một cạnh bằng nửa cạnh ấy là tam giác vuông.',
      'Tính chất và mọi công thức độ dài, bán kính đường tròn ngoại tiếp – nội tiếp, diện tích của tam giác cân, vuông cân, đều.',
      'Hai góc cùng phụ (cùng bù) với một góc thứ ba thì bằng nhau.',
      'Tính chất đường phân giác trong của tam giác.',
    ],
  };

  // Lộ trình 26 tuần (tóm tắt từ kế hoạch 6 tháng).
  const ROADMAP = [
    ['GĐ1 · Xây móng, khóa điểm dễ', [
      [1, '30/11 – 6/12', 'Làm đề chẩn đoán; hệ phương trình bậc nhất hai ẩn', 'he-phuong-trinh-thuc-te'],
      [2, '7/12 – 13/12', 'Lập hệ phương trình: chuyển động, năng suất, phần trăm', 'he-phuong-trinh-thuc-te'],
      [3, '14/12 – 20/12', 'Hệ thức lượng, tỉ số lượng giác – chứng minh lại', 'kien-thuc-thong-nhat'],
      [4, '21/12 – 27/12', 'Ôn thi học kì I trên trường', ''],
      [5, '28/12 – 3/1', 'Đường tròn: dây cung, tiếp tuyến (chứng minh lại)', 'kien-thuc-thong-nhat'],
      [6, '4/1 – 10/1', 'Độ dài cung, hình quạt, viên phân, vành khăn', 'thuc-te-dai-so-hinh-hoc'],
      [7, '11/1 – 17/1', 'Hàm số y = ax² – vẽ đồ thị, tìm điểm', 'ham-so-parabol'],
      [8, '18/1 – 24/1', 'Phương trình bậc hai, điều kiện có nghiệm, Viète', 'pt-bac-hai-viete'],
      [9, '25/1 – 31/1', 'Viète nâng cao + KIỂM TRA ĐỊNH KÌ 1', 'pt-bac-hai-viete'],
    ]],
    ['GĐ2 · Thực tế và hình học trọng tâm', [
      [10, '1/2 – 7/2', 'Nghỉ Tết: 20 phút mỗi ngày đọc lại Mẹo nhớ', ''],
      [11, '8/2 – 14/2', 'Lấy lại nhịp: mỗi ngày 2 câu Bài 1, 2 câu Bài 2', 'ham-so-parabol'],
      [12, '15/2 – 21/2', 'Xác suất: không gian mẫu, bảng, sơ đồ cây', 'xac-suat'],
      [13, '22/2 – 28/2', 'Xác suất theo mô hình; lỗi có thứ tự / có hoàn lại', 'xac-suat'],
      [14, '1/3 – 7/3', 'Lập biểu thức, phương trình bậc hai từ bài toán thực tế', 'thuc-te-dai-so-hinh-hoc'],
      [15, '8/3 – 14/3', 'Bài 6 vận dụng cao: hệ phương trình nhiều tầng', 'he-phuong-trinh-thuc-te'],
      [16, '15/3 – 21/3', 'Câu 7a: bốn điểm cùng thuộc đường tròn', 'hinh-7a'],
      [17, '22/3 – 28/3', 'Câu 7b: hệ thức, thẳng hàng, đồng quy', 'hinh-7b'],
      [18, '29/3 – 4/4', 'KIỂM TRA ĐỊNH KÌ 2 – đề đủ 7 bài, 120 phút', ''],
    ]],
    ['GĐ3 · Luyện đề và tăng tốc', [
      [19, '5/4 – 11/4', 'Hình khối thực tế; đổi đơn vị, làm tròn', 'hinh-khong-gian'],
      [20, '12/4 – 18/4', 'Câu 7c: tính độ dài, diện tích, góc', 'hinh-7c'],
      [21, '19/4 – 25/4', 'Đề 1, 2 bấm giờ 120 phút', ''],
      [22, '26/4 – 2/5', 'Nghỉ lễ; đề 3; ôn thi học kì II', ''],
      [23, '3/5 – 9/5', 'Thi học kì II; đề 4', ''],
      [24, '10/5 – 16/5', 'Đề 5, 6', ''],
      [25, '17/5 – 23/5', 'Đề 7, 8; luyện phân bổ thời gian', ''],
      [26, '24/5 – 30/5', 'Giảm tải: ôn Mẹo nhớ, sổ lỗi, luật chứng minh lại', 'kien-thuc-thong-nhat'],
    ]],
  ];

  /* ---------- Tiến độ ---------- */
  const prog = id => get('p:' + id, {});
  const saveProg = (id, patch) => set('p:' + id, Object.assign(prog(id), patch));

  /* ---------- Khung trang ---------- */
  const view = () => $('#view');
  function topBar() {
    const [a, b] = CONFIG.brand;
    return `<header class="top"><a class="brand-link" href="#/"><h1 class="brand">${esc(a)} <span>${esc(b)}</span></h1></a>
      <p class="sub">${esc(CONFIG.sub)}</p><p class="author">${esc(CONFIG.author)} · Năm học ${esc(CONFIG.year)}</p>
      <button class="theme-btn" id="themeBtn" type="button" aria-label="Đổi nền sáng/tối">🌓</button></header>`;
  }

  /* ---------- Trang chủ ---------- */
  function home() {
    const topics = Topics.list;
    const cards = topics.map(t => {
      const p = prog(t.id), q = t.quiz.length;
      const chips = [
        p.read ? '<span class="chip ok">📘 Đã học</span>' : '',
        p.quiz !== undefined ? `<span class="chip ${p.quiz === q ? 'ok' : ''}">✅ ${p.quiz}/${q}</span>` : '',
        p.model ? '<span class="chip ok">✍️ Đã xem mẫu</span>' : '',
        p.printed ? '<span class="chip ok">🖨️ Đã in</span>' : '',
      ].join('');
      return `<a class="tcard" href="#/cd/${t.id}/lt"><span class="tno">${t.no}</span>
        <span class="tbody"><span class="tbai">${esc(t.bai)}</span><span class="ttitle">${t.title}</span>
        <span class="tdesc">${t.desc}</span><span class="chips">${chips}</span></span></a>`;
    }).join('');
    const rows = STRUCT.map(([b, d, nd, ids]) => `<tr><th scope="row">${b}</th><td class="num">${d}</td><td>${esc(nd)}</td>
      <td>${ids.map(id => { const t = Topics.get(id); return t ? `<a href="#/cd/${id}/lt">Chủ đề ${t.no}</a>` : ''; }).join(' · ')}</td></tr>`).join('');
    view().innerHTML = `${topBar()}<main class="wrap">
      <section class="hero card"><p class="pill">🎯 ${esc(CONFIG.examLine)}</p>
        <h2>Mỗi chủ đề học theo 6 bước</h2>
        <ol class="steps6"><li>📘 Đọc <b>lý thuyết</b></li><li>💡 Thuộc <b>mẹo nhớ</b></li><li>✅ Làm <b>trắc nghiệm hiểu bài</b></li>
        <li>✍️ Xem <b>bài tự luận mẫu</b> và barem</li><li>🖨️ <b>In phiếu</b>, tự làm trên giấy</li><li>🤖 Chụp ảnh, <b>nhờ AI nhận xét</b></li></ol>
        <p class="hint-line">Vùng an toàn 7 điểm: Bài 1–5 và câu 7a. Học chắc phần này trước, rồi mới chinh phục Bài 6, 7b, 7c.</p>
      </section>
      <h2 class="sec">Cấu trúc đề thi (thống nhất 2026 – 2027)</h2>
      <div class="card table-wrap"><table class="struct"><thead><tr><th>Bài</th><th>Điểm</th><th>Nội dung</th><th>Học ở</th></tr></thead><tbody>${rows}</tbody></table></div>
      <h2 class="sec">10 chủ đề luyện thi</h2>
      <div class="tgrid">${cards}</div>
      <div class="two">
        <a class="card link-card" href="#/cd/kien-thuc-thong-nhat/lt"><span class="big">📜</span><b>Luật chơi</b><span>Kiến thức được dùng ngay và phải chứng minh lại</span></a>
        <a class="card link-card" href="#/lo-trinh"><span class="big">📅</span><b>Lộ trình 26 tuần</b><span>30/11/2026 – 30/5/2027, tuần nào học chủ đề nào</span></a>
      </div></main>`;
  }

  /* ---------- Lộ trình ---------- */
  function roadmap() {
    const body = ROADMAP.map(([gd, weeks]) => `<h2 class="sec">${esc(gd)}</h2><div class="card table-wrap"><table class="struct">
      <thead><tr><th>Tuần</th><th>Thời gian</th><th>Học gì</th><th>Chủ đề</th></tr></thead><tbody>${weeks.map(([n, d, w, id]) => {
        const t = id && Topics.get(id);
        return `<tr><th scope="row">${n}</th><td class="nowrap">${d}</td><td>${esc(w)}</td><td>${t ? `<a href="#/cd/${id}/lt">Chủ đề ${t.no}</a>` : '—'}</td></tr>`;
      }).join('')}</tbody></table></div>`).join('');
    view().innerHTML = `${topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/">← Trang chủ</a></div>
      <section class="card hero"><h2>Lộ trình 26 tuần</h2><p>Mỗi tuần: 5 buổi × 90 phút (10 phút ôn mẹo nhớ · 15 phút giữ điểm dễ · 45 phút chủ đề tuần · 15 phút ghi sổ lỗi · 5 phút tự đánh giá), thứ Bảy kiểm tra nhanh 45 phút. Tuần 9 và tuần 18 là hai cửa kiểm tra: chưa đạt thì ôn lại 1 tuần rồi mới đi tiếp.</p></section>
      ${body}</main>`;
  }

  /* ---------- Trang chủ đề ---------- */
  function topic(id, tab) {
    const t = Topics.get(id);
    if (!t) return home();
    if (!TABS.some(x => x[0] === tab)) tab = 'lt';
    const i = Topics.list.indexOf(t), prev = Topics.list[i - 1], next = Topics.list[i + 1];
    const tabs = TABS.map(([k, ic, name]) => `<a class="tab${k === tab ? ' on' : ''}" href="#/cd/${id}/${k}" ${k === tab ? 'aria-current="page"' : ''}><span aria-hidden="true">${ic}</span> ${name}</a>`).join('');
    const ti = TABS.findIndex(x => x[0] === tab), nt = TABS[ti + 1];
    const nextBtn = nt ? `<a class="btn primary" href="#/cd/${id}/${nt[0]}">Tiếp: ${nt[1]} ${nt[2]} →</a>`
      : (next ? `<a class="btn primary" href="#/cd/${next.id}/lt">Sang chủ đề ${next.no} →</a>` : '<a class="btn primary" href="#/">Về trang chủ</a>');
    view().innerHTML = `${topBar()}<main class="wrap">
      <div class="toolbar"><a class="back" href="#/">← Các chủ đề</a>
        <span class="nav-mini">${prev ? `<a href="#/cd/${prev.id}/${tab}">‹ Chủ đề ${prev.no}</a>` : ''}${next ? `<a href="#/cd/${next.id}/${tab}">Chủ đề ${next.no} ›</a>` : ''}</span></div>
      <section class="thead card"><span class="tno big">${t.no}</span><div><p class="tbai">${esc(t.bai)}</p><h2>${t.title}</h2><p class="tdesc">${t.desc}</p></div></section>
      <nav class="tabs" aria-label="Các bước học">${tabs}</nav>
      <section id="pane" class="pane"></section>
      <div class="pane-foot">${nextBtn}</div></main>`;
    const pane = $('#pane');
    ({ lt: paneTheory, meo: paneTips, hieu: paneQuiz, mau: paneModel, phieu: paneSheet, ai: paneAI })[tab](t, pane);
    const on = $('.tab.on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  /* ---------- 📘 Lý thuyết ---------- */
  function paneTheory(t, pane) {
    saveProg(t.id, { read: true });
    pane.innerHTML = `<div class="card remind"><h3>Nhắc nhanh</h3><ul>${t.remind.map(r => `<li>${r}</li>`).join('')}</ul></div>` +
      t.theory.map((x, i) => `<article class="card kt"><h3><span class="kno">${i + 1}</span>${x.t}</h3><div class="kb">${x.b}</div>
        ${x.fig ? `<div class="figbox">${x.fig}</div>` : ''}${x.warn ? `<p class="warn">⚠️ ${x.warn}</p>` : ''}</article>`).join('');
  }

  /* ---------- 💡 Mẹo nhớ ---------- */
  function paneTips(t, pane) {
    pane.innerHTML = `<p class="lead">Đọc to từng câu mẹo, che phần giải thích và tự nhắc lại. Mỗi tối trước khi ngủ đọc lại một lần.</p>
      <div class="tips">${t.tips.map(x => `<article class="card tip"><p class="tip-key">💡 ${x.t}</p><div class="tip-b">${x.b}</div></article>`).join('')}</div>`;
  }

  /* ---------- ✅ Trắc nghiệm hiểu bài ---------- */
  function paneQuiz(t, pane) {
    const qs = t.quiz.map((q, i) => ({ i, q: q.q, why: q.why, good: q.a[0], opts: shuffle(q.a) }));
    let done = 0, right = 0;
    pane.innerHTML = `<p class="lead">${qs.length} câu kiểm tra em đã <b>hiểu</b> lý thuyết chưa. Chọn một đáp án; sai thì đọc lời giải thích rồi làm câu tiếp.</p>
      <div class="quiz">${qs.map((q, k) => `<article class="card qcard" data-k="${k}"><p class="qtext"><b>Câu ${k + 1}.</b> ${q.q}</p>
        <div class="opts">${q.opts.map((o, j) => `<button type="button" class="opt" data-j="${j}"><span class="ol">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div>
        <div class="why" hidden></div></article>`).join('')}</div>
      <div class="card score" id="score" hidden></div>`;
    $$('.qcard', pane).forEach(card => {
      const q = qs[+card.dataset.k];
      $$('.opt', card).forEach(btn => btn.addEventListener('click', () => {
        if (card.classList.contains('locked')) return;
        card.classList.add('locked');
        const pick = q.opts[+btn.dataset.j], ok = pick === q.good;
        $$('.opt', card).forEach(b => { b.disabled = true; if (q.opts[+b.dataset.j] === q.good) b.classList.add('good'); });
        if (!ok) btn.classList.add('bad');
        const w = $('.why', card); w.hidden = false;
        w.innerHTML = `${ok ? '<b class="okc">Đúng rồi!</b>' : '<b class="badc">Chưa đúng.</b>'} ${q.why}`;
        done++; if (ok) right++;
        if (done === qs.length) finish();
      }));
    });
    function finish() {
      const best = Math.max(right, prog(t.id).quiz ?? 0);
      saveProg(t.id, { quiz: best });
      const s = $('#score'); s.hidden = false;
      const msg = right === qs.length ? 'Tuyệt vời! Em đã hiểu bài. Sang bước Tự luận mẫu nhé.'
        : right >= qs.length - 2 ? 'Khá tốt. Đọc lại phần giải thích các câu sai rồi làm lại cho đủ điểm.'
          : 'Em nên đọc lại Lý thuyết và Mẹo nhớ rồi làm lại.';
      s.innerHTML = `<p class="big-score">${right}/${qs.length}</p><p>${msg}</p><button class="btn" type="button" id="redo">↻ Làm lại (đảo đáp án)</button>`;
      $('#redo').addEventListener('click', () => paneQuiz(t, pane));
      s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ---------- ✍️ Tự luận mẫu ---------- */
  function stepHTML(st) {
    if (st.part) return `<li class="part">${st.part}</li>`;
    return `<li class="st"><div class="st-t">${st.s}${st.warn ? `<p class="warn">⚠️ ${st.warn}</p>` : ''}</div>${st.p ? `<span class="pts">${pt(st.p)}đ</span>` : '<span class="pts empty"></span>'}</li>`;
  }
  function paneModel(t, pane) {
    saveProg(t.id, { model: true });
    pane.innerHTML = t.models.map((m, mi) => `<article class="card model" data-m="${mi}">
        <p class="pill soft">Bài mẫu ${mi + 1} · ${pt(m.pts)} điểm</p><h3>${m.title}</h3>
        <div class="de"><b>Đề.</b> ${m.de}</div>${m.fig ? `<div class="figbox">${m.fig}</div>` : ''}
        <div class="reveal-bar"><button class="btn" type="button" data-act="one">👣 Hiện từng bước</button><button class="btn ghost" type="button" data-act="all">Hiện toàn bộ</button></div>
        <p class="lead small">Tự làm ra nháp trước, rồi mới mở lời giải để so cách trình bày. Cột bên phải là điểm của từng bước theo barem.</p>
        <ol class="steps">${m.steps.map(stepHTML).join('')}</ol>
        <div class="loi"><h4>Lỗi hay bị trừ điểm ở bài này</h4><ul>${m.loi.map(x => `<li>${x}</li>`).join('')}</ul></div>
      </article>`).join('') +
      `<article class="card present"><h3>Trình bày thế nào để không bị trừ điểm</h3><ul class="checks">${t.present.map(x => `<li>${x}</li>`).join('')}</ul></article>`;
    $$('.model', pane).forEach(card => {
      const items = $$('.steps > li', card);
      let shown = 0;
      const show = n => { shown = n; items.forEach((li, i) => li.classList.toggle('hid', i >= n)); };
      show(0);
      card.addEventListener('click', e => {
        const b = e.target.closest('[data-act]'); if (!b) return;
        if (b.dataset.act === 'all') show(items.length);
        else { let n = shown + 1; while (n < items.length && items[n - 1].classList.contains('part')) n++; show(Math.min(n, items.length)); }
        if (shown >= items.length) $$('[data-act]', card).forEach(x => { x.disabled = true; });
      });
    });
  }

  /* ---------- 🖨️ Phiếu làm bài ---------- */
  function sheetHTML(t, o) {
    const total = sum(t.practice.map(p => p.pts));
    const head = `<div class="sh-head"><span>TOÁN VÀO 10 · PHIẾU LUYỆN THI</span><span>Chủ đề ${t.no} · ${esc(t.bai)}</span></div>`;
    const modelPage = o.model ? `<section class="sh-page">${head}<h1 class="sh-title">BÀI MẪU – TRÌNH BÀY ĐỦ ĐIỂM</h1><p class="sh-sub">${t.title}</p>
      ${t.models.map((m, i) => `<div class="sh-model"><p><b>Bài mẫu ${i + 1} (${pt(m.pts)} điểm). ${m.title}.</b> ${m.de}</p>${m.fig ? `<div class="sh-fig">${m.fig}</div>` : ''}
        <ol class="sh-steps">${m.steps.map(st => st.part ? `<li class="part">${st.part}</li>` : `<li><span>${st.s}</span>${st.p ? `<b class="sh-pt">${pt(st.p)}đ</b>` : ''}</li>`).join('')}</ol>
        <p class="sh-loi"><b>Hay bị trừ điểm:</b> ${m.loi.join(' · ')}</p></div>`).join('')}</section>` : '';
    const work = `<section class="sh-page">${head}<h1 class="sh-title">PHIẾU LÀM BÀI</h1><p class="sh-sub">${t.title}</p>
      <p class="sh-info">Họ và tên: ........................................................ Lớp: .............. Ngày: ......../......../........ Điểm: ......../${pt(total)}</p>
      <div class="sh-remind"><b>Nhắc nhanh:</b><ul>${t.remind.map(r => `<li>${r}</li>`).join('')}</ul></div>
      ${t.practice.map((p, i) => `<div class="sh-q"><p><b>Bài ${i + 1}</b> <i>(${p.lv} · ${pt(p.pts)} điểm).</i> ${p.de}</p>${p.figQ ? `<div class="sh-fig">${p.figQ}</div>` : ''}
        <div class="sh-write" style="height:${p.h || 60}mm"></div></div>`).join('')}
      <div class="sh-check"><b>Tự soát trước khi chụp ảnh nộp:</b> ${t.present.slice(0, 4).map(x => `<span>☐ ${plainShort(x)}</span>`).join('')}</div>
      <div class="sh-ai">🤖 <b>Làm xong:</b> chụp ảnh rõ từng trang → mở web <b>Toán vào 10</b> → Chủ đề ${t.no} → mục <b>Nhờ AI nhận xét</b> → bấm <b>Sao chép prompt</b> → dán vào ChatGPT / Gemini / Claude cùng ảnh bài làm.</div></section>`;
    const keyPage = o.key ? `<section class="sh-page">${head}<h1 class="sh-title">ĐÁP ÁN – HƯỚNG DẪN CHẤM</h1><p class="sh-sub">${t.title}</p>
      ${t.practice.map((p, i) => `<div class="sh-key"><p><b>Bài ${i + 1} (${pt(p.pts)} điểm).</b> Đáp số: ${p.ans}</p>${p.fig ? `<div class="sh-fig">${p.fig}</div>` : ''}
        <table class="sh-barem"><tbody>${p.barem.map(([s, x]) => `<tr><td>${s}</td><td class="num">${pt(x)}</td></tr>`).join('')}</tbody></table></div>`).join('')}</section>` : '';
    return `<div class="sheet math">${modelPage}${work}${keyPage}</div>`;
  }
  function plainShort(html) { return String(html).replace(/<[^>]+>/g, ''); }

  function paneSheet(t, pane) {
    const o = get('sheetOpt', { model: false, key: false });
    pane.innerHTML = `<div class="card sheet-tools">
        <p class="lead">Phiếu A4 gồm <b>nhắc nhanh</b>, <b>${t.practice.length} bài</b> (cơ bản → khá → nâng cao) và khung ô li để làm ngay trên giấy. Bấm <b>In / Lưu PDF</b>; trên iPad chọn Chia sẻ → In.</p>
        <div class="opts-row"><label class="tog"><input type="checkbox" id="oModel" ${o.model ? 'checked' : ''}> Kèm trang bài mẫu (in trước)</label>
        <label class="tog"><input type="checkbox" id="oKey" ${o.key ? 'checked' : ''}> Kèm đáp án – hướng dẫn chấm (trang cuối, cho phụ huynh/thầy cô)</label></div>
        <div class="row"><button class="btn primary" type="button" id="printBtn">🖨️ In / Lưu PDF</button></div></div>
      <div class="paper-wrap" id="paper"></div>`;
    const draw = () => { $('#paper').innerHTML = sheetHTML(t, get('sheetOpt', o)); };
    draw();
    ['oModel', 'oKey'].forEach(idk => $('#' + idk).addEventListener('change', () => {
      set('sheetOpt', { model: $('#oModel').checked, key: $('#oKey').checked }); draw();
    }));
    $('#printBtn').addEventListener('click', async () => {
      const b = $('#printBtn'); b.disabled = true; b.textContent = 'Đang chuẩn bị…';
      await MathTS.done($('#paper'));
      let root = $('#print-root'); if (!root) { root = h('<div id="print-root"></div>'); document.body.appendChild(root); }
      root.innerHTML = $('#paper').innerHTML;
      document.body.classList.add('printing');
      saveProg(t.id, { printed: true });
      const end = () => { document.body.classList.remove('printing'); root.innerHTML = ''; b.disabled = false; b.textContent = '🖨️ In / Lưu PDF'; window.removeEventListener('afterprint', end); };
      window.addEventListener('afterprint', end);
      setTimeout(() => { window.print(); setTimeout(() => { if (document.body.classList.contains('printing')) end(); }, 1500); }, 60);
    });
  }

  /* ---------- 🤖 Prompt nhờ AI ---------- */
  function promptGrade(t) {
    const total = sum(t.practice.map(p => p.pts));
    const de = t.practice.map((p, i) => `Bài ${i + 1} (${p.lv}, ${pt(p.pts)} điểm): ${plain(p.de)}`).join('\n\n');
    const key = t.practice.map((p, i) => `Bài ${i + 1} – đáp số: ${plain(p.ans)}\n${p.barem.map(([s, x]) => `  • ${plain(s)} (${pt(x)} điểm)`).join('\n')}`).join('\n\n');
    const rules = t.rules ? `\n\nQUY ĐỊNH CHẤM THỐNG NHẤT CỦA SỞ GD&ĐT TP.HCM (2026–2027)\nKhông được dùng trực tiếp (dùng là trừ điểm bước đó):\n${RULES.no.map(x => '- ' + x).join('\n')}\nĐược dùng trực tiếp:\n${RULES.yes.map(x => '- ' + x).join('\n')}` : '';
    return `Bạn là thầy giáo dạy Toán lớp 9 giỏi, nhiều năm luyện thi vào lớp 10 TP.HCM. Em là học sinh lớp 9. Em gửi kèm ẢNH bài làm trên phiếu luyện thi "Chủ đề ${t.no}: ${plain(t.title)}" (${t.bai}).

ĐỀ BÀI TRÊN PHIẾU
${de}

ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM (chỉ để thầy chấm, KHÔNG đưa nguyên lời giải cho em khi em chưa tự làm)
${key}${rules}

THẦY HÃY LÀM ĐÚNG THỨ TỰ SAU
1. Đọc ảnh và chép lại thật ngắn em đã làm được gì ở từng bài. Chỗ nào ảnh mờ hoặc không đọc được thì hỏi lại em, không đoán.
2. Chấm từng bài theo hướng dẫn chấm: ghi điểm từng bước, chỉ rõ bước nào bị trừ và vì sao (thiếu điều kiện, thiếu kết luận, quên đơn vị, làm tròn sai, dùng kiến thức không được dùng…). Bài làm cách khác mà đúng vẫn cho đủ điểm.
3. Khen một điều em làm tốt.
4. Với phần em làm SAI hoặc CHƯA LÀM: không giải hộ ngay. Đưa "Gợi ý 1" là một câu hỏi dẫn dắt ngắn rồi DỪNG LẠI chờ em trả lời. Nếu em vẫn bí thì đưa "Gợi ý 2" cụ thể hơn. Chỉ khi em nhắn "cho em xem lời giải" mới trình bày lời giải mẫu từng bước, mỗi bước ghi rõ vì sao làm vậy và được mấy điểm.
5. Viết thật dễ hiểu cho học sinh lớp 9: câu ngắn, xưng "thầy" gọi "em", công thức viết rõ ràng (ví dụ x^2, √3, phân số a/b).
6. Kết thúc bằng: tổng điểm …/${pt(total)} và đúng 3 việc em cần sửa ở lần làm sau.`;
  }
  function promptHint(t) {
    const de = t.practice.map((p, i) => `Bài ${i + 1}: ${plain(p.de)}`).join('\n\n');
    return `Bạn là thầy giáo dạy Toán lớp 9 luyện thi vào lớp 10 TP.HCM. Em đang làm phiếu "Chủ đề ${t.no}: ${plain(t.title)}" và bị bí, chưa làm được.

ĐỀ BÀI
${de}

Em bí ở: [em ghi số bài, câu và chỗ bí, ví dụ "Bài 2b, không biết bắt đầu từ đâu"]
Em đã làm được: [em chép phần đã làm, hoặc gửi ảnh]

THẦY HÃY
1. Không giải hộ. Hỏi em một câu dẫn dắt ngắn để em tự nghĩ ra bước tiếp theo, rồi dừng chờ em trả lời.
2. Nếu em trả lời sai hoặc vẫn bí, gợi ý cụ thể hơn một chút (chỉ một bước).
3. Khi em làm xong, kiểm tra lại và chỉ ra chỗ trình bày dễ bị trừ điểm.
4. Câu ngắn, dễ hiểu, xưng "thầy" gọi "em".`;
  }
  function paneAI(t, pane) {
    const ais = CONFIG.ai.map(a => `<a class="btn" href="${a.url}" target="_blank" rel="noopener">Mở ${esc(a.name)} ↗</a>`).join('');
    pane.innerHTML = `<div class="card ai-how"><h3>3 bước nhờ AI chấm và hướng dẫn</h3>
        <ol class="how"><li><b>In phiếu</b> (tab Phiếu làm bài) và tự làm trên giấy, không xem đáp án.</li>
        <li><b>Chụp ảnh</b> rõ, thẳng, đủ sáng từng trang bài làm.</li>
        <li>Bấm <b>Sao chép prompt</b> bên dưới → mở ChatGPT / Gemini / Claude → <b>dán prompt và gửi kèm ảnh</b>. Trả lời các câu hỏi gợi ý của AI để tự làm nốt phần chưa xong.</li></ol>
        <p class="warn">⚠️ Prompt đã chứa đáp án để AI chấm cho đúng. Em đừng đọc phần đáp án trong prompt trước khi tự làm nhé.</p></div>
      ${[['A', '📸 Chấm bài và hướng dẫn phần chưa làm', 'Dùng sau khi em đã làm xong phiếu (gửi kèm ảnh).', promptGrade(t)],
        ['B', '🧭 Gợi ý khi đang bí (không giải hộ)', 'Dùng khi đang làm mà bí: sửa hai dòng trong ngoặc vuông rồi gửi.', promptHint(t)]]
        .map(([k, title, note, text]) => `<article class="card prompt"><h3>Prompt ${k}. ${title}</h3><p class="lead small">${note}</p>
          <details><summary>Xem nội dung prompt</summary><pre class="no-math">${esc(text)}</pre></details>
          <div class="row"><button class="btn primary" type="button" data-copy="${k}">📋 Sao chép prompt ${k}</button>${ais}</div></article>`).join('')}`;
    const texts = { A: promptGrade(t), B: promptHint(t) };
    $$('[data-copy]', pane).forEach(b => b.addEventListener('click', async () => {
      const ok = await copy(texts[b.dataset.copy]);
      toast(ok ? 'Đã sao chép. Mở AI, dán vào ô chat và gửi kèm ảnh bài làm.' : 'Không sao chép được – mở "Xem nội dung prompt" và chép tay.');
    }));
  }

  /* ---------- Điều hướng ---------- */
  function route() {
    const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
    if (parts[0] === 'cd') topic(parts[1], parts[2] || 'lt');
    else if (parts[0] === 'lo-trinh') roadmap();
    else home();
    window.scrollTo(0, 0);
    bindTheme();
  }
  function bindTheme() {
    const b = $('#themeBtn'); if (!b) return;
    b.addEventListener('click', () => {
      const cur = document.documentElement.dataset.theme;
      const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.dataset.theme = dark ? 'light' : 'dark';
      set('theme', document.documentElement.dataset.theme);
    });
  }
  function start() {
    const th = get('theme', ''); if (th) document.documentElement.dataset.theme = th;
    window.addEventListener('hashchange', route);
    route();
  }
  return { start, promptGrade, promptHint, sheetHTML, RULES, STRUCT };
})();

document.addEventListener('DOMContentLoaded', App.start);
