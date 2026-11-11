/* =====================================================================
   SỔ TAY CÔNG THỨC TRA CỨU – TOÁN VÀO 10 TP.HCM (thầy yêu cầu 11/11/2026)
   Công thức, mẹo nhớ, lỗi hay sai được hệ thống theo DẠNG của từng bài trong đề tuyển sinh.
   #/so-tay          cả sổ tay: ô tìm (không dấu), chọn chủ đề, in PDF
   #/so-tay/<cd>     một chủ đề (nen, 1 … 7)
   #/so-tay/in       📕 IN THÀNH MỘT QUYỂN (thầy yêu cầu 11/11/2026): Toán vào 10 hoặc Toán 10 – 11 – 12
                     bìa, mục lục, mỗi chủ đề một màu, mỗi mục một mã (2.3, 11-I.4) để tra, bảng tra cứu A–Z cuối quyển;
                     kiểu in: tiết kiệm (A4 hai cột, chữ nhỏ, nối tiếp) · cân đối · quyển nhỏ A5 · chữ to; số trang ở chân trang.
                     Nguồn: vào 10 = chủ đề ôn thi (Topics: nhớ nhanh, kiến thức, mẹo) + sổ tay dạng (SoTay) + Thẻ công cụ hình học;
                     lớp 10–12 = chủ đề vận dụng (Vdc: kiến thức trọng tâm, phương pháp từng dạng) + bài giảng SGK (BaiHoc: cần nhớ),
                     xếp theo chương của mục lục SGK KNTT. Bỏ nội dung đánh dấu mẫu minh họa (mau:true).
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
          <button class="btn" type="button" id="stIn">🖨️ In ${cd ? 'chủ đề này' : 'các dạng'} (PDF)</button><a class="btn primary" href="#/so-tay/in">📕 In thành một quyển</a></div>
        <div class="chips st-chips">${CHU.map(([k, t]) => store[k] ? `<a class="chip${k === cd ? ' on' : ''}" href="#/so-tay/${k}">${esc(t.split(' – ')[0])} · ${store[k].dang.length} dạng</a>` : `<span class="chip muted" title="Đang soạn">${esc(t.split(' – ')[0])}</span>`).join('')}</div>` : ''}</section>
      ${ds.length ? `<p class="muted" id="stDem" aria-live="polite"></p><div id="stBody">${chon.map(chuDeHTML).join('')}</div>`
        : `<div class="card"><p>Các dạng bài chi tiết đang được soạn. Đã có thể <b>in cả quyển công thức</b> từ kiến thức, mẹo nhớ của 10 chủ đề ôn thi vào 10 và các chủ đề lớp 10 – 11 – 12.</p><a class="btn primary" href="#/so-tay/in">📕 In sổ tay thành một quyển</a></div>`}</main>`;
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

  /* ================= 📕 IN THÀNH MỘT QUYỂN ================= */
  const MAU_CD = ['#1f5fa8', '#b4462b', '#2f7d4f', '#7b45a6', '#b87400', '#00838f', '#a33a6b', '#4d6a1f', '#4b52c4', '#7a5530', '#2b6f8f', '#9c3d3d'];
  const LA_MA = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XI: 11, XII: 12 };
  const KIEU = {
    tietkiem: { ten: 'Tiết kiệm nhất – A4 hai cột, chữ 9,5pt, các chủ đề nối tiếp', kho: 'A4', cot: 2, co: 9.5, trang: false },
    candoi: { ten: 'Cân đối – A4 hai cột, chữ 10,5pt, mỗi chủ đề sang trang mới', kho: 'A4', cot: 2, co: 10.5, trang: true },
    a5: { ten: 'Quyển nhỏ – A5 một cột, chữ 10pt (in gập đôi thành sổ)', kho: 'A5', cot: 1, co: 10, trang: true },
    chuto: { ten: 'Chữ to – A4 một cột, chữ 12pt', kho: 'A4', cot: 1, co: 12, trang: true },
  };
  const bo = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  // Một mục của quyển: { ma, t (tiêu đề), b (nội dung HTML), w (lưu ý), loai: 'kt' | 'dang' | 'the' }
  function dangSoTay(d, ma, o) {
    return { ma, t: d.ten, loai: 'dang', b: `${d.nd ? `<p class="qs-nd"><i>Nhận ra:</i> ${d.nd}</p>` : ''}
      ${d.ct.map(c => `<p class="qs-ct"><b>${c.ten}:</b> ${c.ct}${c.dk ? ` <span class="qs-dk">(${c.dk})</span>` : ''}${c.gc ? ` – ${c.gc}` : ''}</p>`).join('')}
      ${d.cach.length ? `<p><i>Cách làm:</i> ${d.cach.map((x, i) => `<b>${i + 1}</b>) ${x}`).join(' ')}</p>` : ''}
      ${o.meo && d.meo ? `<p class="qs-meo">💡 ${d.meo}</p>` : ''}
      ${o.vd && d.vd ? `<div class="qs-vd"><i>Ví dụ:</i> ${d.vd.de} ${d.vd.lg.length ? `<br>${d.vd.lg.join('; ')}` : ''}${d.vd.ds ? ` <b>Đáp số:</b> ${d.vd.ds}` : ''}</div>` : ''}`,
      w: o.luuy && d.loi.length ? d.loi.join('; ') : '' };
  }
  // Toán vào 10: chủ đề ôn thi (Topics) + sổ tay dạng (SoTay) + Thẻ công cụ hình học
  function phanVao10(o) {
    const ds = [], cdOf = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7' };
    if (store.nen) ds.push({ so: '0', ten: TEN.nen, phu: 'Dùng cho mọi bài', nho: [], muc: store.nen.dang.map((d, k) => dangSoTay(d, `0.${k + 1}`, o)), meo: [], tra: store.nen.tra });
    (typeof Topics !== 'undefined' ? Topics.list : []).forEach(t => {
      const so = String(t.no), muc = [];
      (t.theory || []).forEach(x => muc.push({ ma: `${so}.${muc.length + 1}`, t: x.t, b: x.b, w: o.luuy ? x.warn || '' : '', loai: 'kt' }));
      const st = store[cdOf[t.no]];
      if (st) st.dang.forEach(d => muc.push(dangSoTay(d, `${so}.${muc.length + 1}`, o)));
      const L = typeof LuyenDe !== 'undefined' && LuyenDe.get(t.id);
      if (L && L.the && t.no === 7) muc.push({ ma: `${so}.${muc.length + 1}`, t: 'Thẻ công cụ – nhìn kết luận, chọn công cụ (dùng cho 7a, 7b, 7c)', loai: 'the',
        b: `<table class="qs-the">${L.the.map(x => `<tr><th>${x.ten}</th><td>${x.cc}</td></tr>`).join('')}</table>` });
      ds.push({ so, ten: t.title, phu: t.bai, nho: t.remind || [], muc, meo: o.meo ? (t.tips || []) : [], tra: st ? st.tra : [] });
    });
    return [{ ten: '', cd: ds }];
  }
  // Toán 10 – 11 – 12: Vdc (kiến thức trọng tâm + phương pháp từng dạng) + BaiHoc (cần nhớ), xếp theo chương SGK
  function phanTHPT(o, lops) {
    return lops.map(lop => {
      const g = {}, lay = (chuong, so) => (g[chuong] = g[chuong] || { chuong, so, nguon: [] });
      const soCh = c => { const m = String(c).match(/Chương\s+([IVX]+)/); return m ? LA_MA[m[1]] || 99 : 99; };
      (typeof Vdc !== 'undefined' ? Vdc.ofGrade('lop' + lop) : []).filter(t => !t.mau).forEach(t => lay(t.chuong || 'Chủ đề khác', soCh(t.chuong)).nguon.push({ vdc: t }));
      (typeof BaiHoc !== 'undefined' ? BaiHoc.list().filter(e => +e.lop === lop && !e.mau) : []).forEach(e => {
        const b = BaiHoc.baiOf(lop, e.bai), ch = b ? `Chương ${b.chuong.so}. ${b.chuong.ten}` : 'Chủ đề khác';
        lay(ch, b ? LA_MA[b.chuong.so] || 99 : 99).nguon.push({ bh: e, b });
      });
      const cd = Object.values(g).sort((a, b) => a.so - b.so).map(c => {
        const la = (c.chuong.match(/Chương\s+([IVX]+)/) || [])[1] || '•', muc = [], nho = [];
        c.nguon.forEach(n => {
          if (n.vdc) {
            n.vdc.kt.forEach(x => muc.push({ ma: `${lop}-${la}.${muc.length + 1}`, t: x.t, b: x.b + (x.fig ? `<div class="qs-hinh">${x.fig}</div>` : ''), loai: 'kt', nhom: bo(n.vdc.title) }));
            n.vdc.dang.forEach(d => muc.push({ ma: `${lop}-${la}.${muc.length + 1}`, t: `Dạng: ${d.ten}`, loai: 'dang', nhom: bo(n.vdc.title),
              b: `<ol class="qs-pp">${d.pp.map(x => `<li>${x}</li>`).join('')}</ol>${o.vd && d.vd && d.vd[0] ? `<div class="qs-vd"><i>Ví dụ:</i> ${d.vd[0].de}<br>${d.vd[0].lg.join(' ')} ${d.vd[0].ds ? `<b>Đáp số:</b> ${d.vd[0].ds}` : ''}</div>` : ''}` }));
          } else {
            const e = n.bh;
            muc.push({ ma: `${lop}-${la}.${muc.length + 1}`, t: `Bài ${e.bai}. ${n.b ? n.b.ten : e.ten} – cần nhớ`, loai: 'kt', b: `<ul>${e.can_nho.map(x => `<li>${x}</li>`).join('')}</ul>` });
          }
        });
        return { so: `${lop}-${la}`, ten: c.chuong.replace(/^Chương\s+[IVX]+\.\s*/, ''), phu: `Toán ${lop} · Chương ${la}`, nho, muc, meo: [], tra: [] };
      });
      return { ten: `TOÁN ${lop}`, lop, cd };
    }).filter(p => p.cd.length);
  }
  function quyenHTML(loai, o) {
    const k = KIEU[o.kieu] || KIEU.candoi, vao10 = loai === 'vao10';
    const lops = loai === 'thpt' ? [10, 11, 12] : [];
    const phan = vao10 ? phanVao10(o) : phanTHPT(o, lops);
    const tatCa = phan.flatMap(p => p.cd);
    if (!tatCa.length) return '';
    let mau = 0; tatCa.forEach(c => { c.mau = MAU_CD[mau++ % MAU_CD.length]; });
    const ten = vao10 ? 'SỔ TAY CÔNG THỨC TOÁN VÀO 10' : 'SỔ TAY CÔNG THỨC TOÁN 10 – 11 – 12';
    const phuDe = vao10 ? 'Tuyển sinh lớp 10 TP.HCM · công thức, cách làm, mẹo nhớ, lưu ý theo từng bài của đề thi' : 'Theo mục lục SGK Kết nối tri thức với cuộc sống · kiến thức trọng tâm, phương pháp từng dạng';
    const nMuc = tatCa.reduce((t, c) => t + c.muc.length, 0);
    const bia = o.bia ? `<section class="qs-bia"><div class="qs-bia-in"><p class="qs-bia-tren">${U.tenPhieu()}</p><h1>${ten}</h1><p class="qs-bia-phu">${phuDe}</p>
      <div class="qs-bia-cd">${tatCa.map(c => `<span style="--qc:${c.mau}"><b>${esc(c.so)}</b> ${bo(c.ten)}</span>`).join('')}</div>
      <div class="qs-bia-dung"><b>Cách tra:</b> mỗi chủ đề một màu; mỗi mục có <b>mã</b> (ví dụ <b>${esc(tatCa[0].muc[0] ? tatCa[0].muc[0].ma : '1.1')}</b>). Tìm theo <b>Mục lục</b> đầu quyển hoặc <b>Bảng tra cứu A–Z</b> cuối quyển.</div>
      <p class="qs-bia-duoi">${tatCa.length} chủ đề · ${nMuc} mục · Năm học ${new Date().getMonth() >= 7 ? new Date().getFullYear() : new Date().getFullYear() - 1} – ${new Date().getMonth() >= 7 ? new Date().getFullYear() + 1 : new Date().getFullYear()}</p>
      <p class="qs-bia-ten">Họ và tên: ................................................ Lớp: ..........</p></div></section>
      <section class="qs-mluc"><h2>MỤC LỤC</h2>${phan.map(p => `${p.ten ? `<h3 class="qs-ml-phan">${p.ten}</h3>` : ''}<div class="qs-ml">${p.cd.map(c => `<div class="qs-ml-cd" style="--qc:${c.mau}">
        <p class="qs-ml-t"><span class="qs-so">${esc(c.so)}</span> ${bo(c.ten)}</p><p class="qs-ml-m">${c.muc.map(m => `<span><b>${m.ma}</b> ${bo(m.t)}</span>`).join(' · ')}</p></div>`).join('')}</div>`).join('')}</section>` : '';
    const than = phan.map(p => `${p.ten ? `<h2 class="qs-phan">${p.ten}</h2>` : ''}${p.cd.map(c => `<section class="qs-cd" style="--qc:${c.mau}">
      <header class="qs-band"><span class="qs-so">${esc(c.so)}</span><div><b>${c.ten}</b>${c.phu ? `<small>${esc(c.phu)}</small>` : ''}</div></header>
      <div class="qs-cols">
        ${c.nho.length ? `<div class="qs-nho"><b>★ Nhớ nhanh</b><ul>${c.nho.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}
        ${c.muc.map((m, i) => `${m.nhom && (i === 0 || c.muc[i - 1].nhom !== m.nhom) ? `<p class="qs-nhom">${esc(m.nhom)}</p>` : ''}<div class="qs-b qs-${m.loai}"><h3><span class="qs-ma">${m.ma}</span> ${m.t}</h3><div class="qs-nd">${m.b}</div>${m.w ? `<p class="qs-w">⚠ ${m.w}</p>` : ''}</div>`).join('')}
        ${c.meo.length ? `<div class="qs-b qs-meo-ds"><h3>💡 Mẹo nhớ</h3><ul>${c.meo.map(x => `<li><b>${x.t}:</b> ${x.b}</li>`).join('')}</ul></div>` : ''}
        ${c.tra.length ? `<div class="qs-b"><h3>🔎 Thấy gì – dùng gì</h3><table class="qs-tra">${c.tra.map(x => `<tr><td>${x.hoi}</td><td>${x.dap}</td></tr>`).join('')}</table></div>` : ''}
      </div></section>`).join('')}`).join('');
    // Bảng tra cứu A–Z: mọi tiêu đề mục → mã
    const az = tatCa.flatMap(c => c.muc.map(m => ({ t: bo(m.t).replace(/^Dạng:\s*/, '').replace(/^Dạng\s*\d+\s*[.:]\s*/, ''), ma: m.ma, mau: c.mau })))
      .filter(x => x.t).sort((a, b) => fold(a.t).localeCompare(fold(b.t), 'vi'));
    let chu = '';
    const bang = o.az ? `<section class="qs-az"><h2>BẢNG TRA CỨU A – Z</h2><div class="qs-az-cot">${az.map(x => {
      const c0 = fold(x.t).charAt(0).toUpperCase(), h = c0 !== chu ? `<h4>${(chu = c0)}</h4>` : '';
      return `${h}<p><span>${esc(x.t)}</span> <b style="color:${x.mau}">${x.ma}</b></p>`; }).join('')}</div></section>` : '';
    return `<div class="qs qs-${k.kho.toLowerCase()} qs-c${k.cot}${k.trang ? ' qs-trang' : ''}" style="--qco:${k.co}pt">${bia}${than}${bang}</div>`;
  }

  // Công thức dài hơn cột (KaTeX/MathJax không tự xuống dòng) → thu nhỏ vừa cột, không để tràn sang cột bên.
  function vuaCongThuc(root) {
    const ms = () => [...root.querySelectorAll('.qs mjx-container')];
    const do_ = m => {
      const hop = m.closest('td, th, li, p, .qs-nd, .qs-nho, .qs-b'), w = (m.querySelector('mjx-math') || m).getBoundingClientRect().width;   // công thức hiển thị: đo phần chữ bên trong
      if (!hop || !w) return 1;
      const cs = getComputedStyle(hop); return (hop.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) / w;
    };
    ms().forEach(m => { m.style.fontSize = ''; });
    // công thức hiển thị dài gấp rưỡi cột (hai cột) → cho cả mục trải ngang hai cột thay vì thu quá nhỏ
    ms().forEach(m => { const b = m.closest('.qs-c2 .qs-b'); if (b && m.getAttribute('display') === 'true' && do_(m) < 0.75) b.classList.add('qs-rong'); });
    ms().forEach(m => { const k = do_(m); if (k < 1) m.style.fontSize = Math.max(60, Math.floor(k * 100)) + '%'; });
  }
  // Dựng quyển ở khổ giấy thật (ngoài màn hình) để đo cột, thu nhỏ công thức dài, rồi in.
  async function chuanBiIn(root, html, kho) {
    root.innerHTML = html;
    root.style.cssText = `display:block;position:absolute;left:-12000px;top:0;width:${kho === 'A5' ? 132 : 192}mm`;
    await MathTS.done(root); vuaCongThuc(root);
    root.style.cssText = '';
  }
  async function inQuyen(o, btn) {
    const lab = btn.textContent; btn.disabled = true; btn.textContent = 'Đang chuẩn bị…';
    let root = document.getElementById('print-root');
    if (!root) { root = document.createElement('div'); root.id = 'print-root'; document.body.appendChild(root); }
    await chuanBiIn(root, quyenHTML(o.loai, o), (KIEU[o.kieu] || KIEU.candoi).kho);
    document.body.classList.add('printing');
    const end = () => { document.body.classList.remove('printing'); root.innerHTML = ''; btn.disabled = false; btn.textContent = lab; window.removeEventListener('afterprint', end); };
    window.addEventListener('afterprint', end);
    setTimeout(() => { window.print(); setTimeout(() => { if (document.body.classList.contains('printing')) end(); }, 1500); }, 60);
  }

  function inPage() {
    const st = Object.assign({ loai: 'vao10', kieu: 'candoi', meo: true, luuy: true, vd: false, bia: true, az: true }, U.get('sotay:in', {}));
    view().innerHTML = `${App.topBar()}<main class="wrap"><div class="toolbar"><a class="back" href="#/so-tay">← Sổ tay công thức</a></div>
      <section class="card hero"><p class="pill">📕 In thành một quyển</p><h2>Sổ tay công thức – in thành quyển</h2>
        <p>Gộp mọi chủ đề thành một quyển: bìa, mục lục, mỗi chủ đề một màu, mỗi mục một mã để tra, bảng tra cứu A–Z cuối quyển, số trang ở chân trang.</p></section>
      <div class="card sheet-tools">
        <div class="opts-row"><label class="tog"><input type="radio" name="qLoai" value="vao10" ${st.loai !== 'thpt' ? 'checked' : ''}> Toán vào 10</label>
          <label class="tog"><input type="radio" name="qLoai" value="thpt" ${st.loai === 'thpt' ? 'checked' : ''}> Toán 10 – 11 – 12</label></div>
        <label class="xw-wide">Kiểu in <select id="qKieu">${Object.entries(KIEU).map(([v, x]) => `<option value="${v}" ${st.kieu === v ? 'selected' : ''}>${x.ten}</option>`).join('')}</select></label>
        <div class="opts-row"><label class="tog"><input type="checkbox" id="qMeo" ${st.meo ? 'checked' : ''}> Mẹo nhớ</label>
          <label class="tog"><input type="checkbox" id="qLuu" ${st.luuy ? 'checked' : ''}> Lưu ý, lỗi hay sai</label>
          <label class="tog"><input type="checkbox" id="qVd" ${st.vd ? 'checked' : ''}> Ví dụ minh họa (dày hơn)</label>
          <label class="tog"><input type="checkbox" id="qBia" ${st.bia ? 'checked' : ''}> Bìa + mục lục</label>
          <label class="tog"><input type="checkbox" id="qAz" ${st.az ? 'checked' : ''}> Bảng tra cứu A–Z</label></div>
        <div class="row"><button class="btn primary" type="button" id="qIn">🖨️ In / Lưu PDF cả quyển</button></div>
        <p class="muted small" id="qTom"></p>
        <p class="muted small">Hộp thoại in: chọn <b>Lưu dưới dạng PDF</b>, bật <b>Đồ họa nền</b> (Background graphics) để in màu chủ đề, Lề: <b>Mặc định</b>. Quyển nhỏ A5: in ra giấy A4 chọn “Tập sách nhỏ” (Booklet) nếu máy in hỗ trợ.</p></div>
      <div class="paper-wrap qs-xem" id="qXem"></div></main>`;
    const opt = () => ({ loai: document.querySelector('[name=qLoai]:checked').value, kieu: $i('qKieu').value, meo: $i('qMeo').checked, luuy: $i('qLuu').checked, vd: $i('qVd').checked, bia: $i('qBia').checked, az: $i('qAz').checked });
    const ve = () => {
      const o = opt(); U.set('sotay:in', o);
      const h = quyenHTML(o.loai, o);
      $i('qXem').innerHTML = h || '<p class="empty">Chưa có nội dung cho quyển này.</p>';
      if (h && typeof MathTS !== 'undefined') MathTS.done($i('qXem')).then(() => vuaCongThuc($i('qXem')));
      const d = document.createElement('div'); d.innerHTML = h;
      $i('qTom').textContent = h ? `${d.querySelectorAll('.qs-cd').length} chủ đề · ${d.querySelectorAll('.qs-b').length} mục.${o.loai === 'thpt' ? ' Lớp 12 chưa có chủ đề nào thì chưa có trong quyển.' : ''}` : '';
      $i('qIn').disabled = !h;
    };
    view().querySelectorAll('input, select').forEach(x => x.addEventListener('change', ve));
    $i('qIn').addEventListener('click', ev => inQuyen(opt(), ev.currentTarget));
    ve();
  }

  function route(parts) {
    if (parts[0] !== 'so-tay') return false;
    if (/^in(\?|$)/.test(parts[1] || '')) { if (/\?thpt/.test(parts[1])) { const st = U.get('sotay:in', {}); st.loai = 'thpt'; U.set('sotay:in', st); } inPage(); } else page(parts[1] && TEN[parts[1]] ? parts[1] : '');
    return true;
  }
  return { CHU, TEN, MUC, KIEU, add, get, list, tenDang, fpTen, sheetHTML, quyenHTML, chuanBiIn, route };
})();
