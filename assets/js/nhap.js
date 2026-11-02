/* =====================================================================
   NHẬP DỮ LIỆU TỪ AI (NotebookLM / Gem Gemini) – một chỗ dùng chung cho web, kiem-tra.js và nhap-du-lieu.py
   - Tách JSON từ câu trả lời của AI (khối ```json hoặc từ "{" đầu tới "}" cuối), sửa lỗi hay gặp:
     dấu \ của LaTeX viết đơn (\frac → \f…), dấu phẩy thừa, số trích dẫn [1] của NotebookLM.
   - Chuẩn hoá chuỗi: $…$ → \( … \), $$…$$ → \[ … \], < > trong công thức → \lt \gt, xuống dòng → <br>.
   - Kiểm: đủ trường, điểm bội 0,25, tổng điểm từng bước = điểm câu; Ngữ văn: ngữ liệu phải là
     tác phẩm trước 1929 hoặc văn bản tự viết (quy ước dự án, tránh vi phạm bản quyền).
   - Hai loại dữ liệu (mẫu JSON đầy đủ ở Xưởng dữ liệu → Menu prompt):
     "loai":"luyen_de_toan" → thêm đề vào bộ Luyện đề của bài tương ứng (LuyenDe)
     "loai":"de_van"        → đề Ngữ văn vào 10 (Van)
   - Dữ liệu của hệ thống: data/nhap/*.js gọi NhapDL.add(<json>) (tạo bằng tools/nhap-du-lieu.py).
     Dữ liệu chỉ trên máy này: lưu trong trình duyệt (U.get('nhap:may')), nạp ở App.start().
   ===================================================================== */
const NhapDL = (() => {
  const BAI = { 1: 'ham-so-parabol', 2: 'pt-bac-hai-viete', 3: 'xac-suat', 4: 'thuc-te-dai-so-hinh-hoc', 5: 'hinh-khong-gian',
    6: 'he-phuong-trinh-thuc-te', '7a': 'hinh-7a', '7b': 'hinh-7b', '7c': 'hinh-7c' };
  const DANG_VAN = { the_loai: 'Thể loại', phuong_thuc: 'Phương thức biểu đạt', chu_de: 'Chủ đề', noi_dung: 'Nội dung', chi_tiet: 'Chi tiết, hình ảnh',
    bien_phap: 'Biện pháp tu từ', tieng_viet: 'Tiếng Việt', thong_diep: 'Thông điệp', bai_hoc: 'Bài học', khac: 'Khác' };
  const NGUON_OK = ['truoc_1929', 'tu_viet'];
  const LATEX = 'dfrac|tfrac|frac|times|text|theta|neq|notin|ne|Rightarrow|rightarrow|right|Leftrightarrow|leftrightarrow|left|leq|le|geq|ge|beta|bar|sqrt|cdot|cdots|ldots|pi|alpha|gamma|Delta|delta|infty|in|approx|perp|parallel|widehat|hat|triangle|angle|overline|sin|cos|tan|cot|log|lim|sum|int|begin|end|quad|circ|backsim|sim|equiv|iff|mathbb|varnothing|emptyset|cup|cap|subset|pm|mp|div|lt|gt|vec|mathrm|displaystyle|Big|big';
  const items = [];                     // { json, src: 'he-thong' | 'may-nay', key?, r }
  const q4 = x => Math.abs(x * 4 - Math.round(x * 4)) < 1e-9;
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  const sum = a => a.reduce((s, x) => s + (+x || 0), 0);
  const num = x => typeof x === 'string' ? parseFloat(x.replace(',', '.')) : x;

  /* ---------- 1. Tách và đọc JSON ---------- */
  function extract(raw) {
    let t = String(raw || '').replace(/^﻿/, '').trim();
    const m = t.match(/```(?:json|JSON)?\s*([\s\S]*?)```/);
    if (m) t = m[1].trim();
    const a = t.indexOf('{'), b = t.lastIndexOf('}');
    if (a > 0 || (b >= 0 && b < t.length - 1)) t = t.slice(Math.max(a, 0), b + 1);
    return t;
  }
  const BAD = /[\x08\x0b\x0c]|\t(?:imes|ext|heta|riangle|an\b)|\r(?:ight)|\n(?:eq|otin)\b/;
  const hasBad = v => typeof v === 'string' ? BAD.test(v) : (v && typeof v === 'object' ? Object.values(v).some(hasBad) : false);
  function repair(t) {
    // Đọc từng cặp "\x" từ trái sang phải: "\\" giữ nguyên; "\" + lệnh LaTeX (frac, neq, times…) hoặc + kí tự
    // không phải mã thoát của JSON (\Omega, \{, \(…) → nhân đôi dấu gạch.
    return t
      .replace(new RegExp(`\\\\(\\\\|(?:${LATEX})(?![a-zA-Z])|[^"\\\\/bfnrtu])`, 'g'), (m, g) => g === '\\' ? m : '\\\\' + g)
      .replace(/,\s*([}\]])/g, '$1')                                                   // dấu phẩy thừa
      .replace(/[“”]/g, '"');
  }
  function parse(raw) {
    const notes = [], t = extract(raw);
    if (!t) throw new Error('Không thấy dữ liệu JSON. Hãy dán nguyên câu trả lời của AI (có khối ```json).');
    let v = null, e1 = null;
    try { v = JSON.parse(t); } catch (e) { e1 = e; }
    if (v === null || hasBad(v)) {
      try { const v2 = JSON.parse(repair(t)); if (!hasBad(v2) || v === null) { v = v2; notes.push('Đã sửa dấu \\ của công thức (AI viết một dấu thay vì hai).'); } }
      catch (e2) { if (v === null) throw new Error('JSON sai cú pháp: ' + (e1 ? e1.message : e2.message) + '. Bấm "Chép lệnh sửa" rồi dán cho AI.'); }
    }
    return { data: v, notes };
  }

  /* ---------- 2. Chuẩn hoá chuỗi ---------- */
  function mathFix(m) { return m.replace(/</g, ' \\lt ').replace(/>/g, ' \\gt ').replace(/\s{2,}/g, ' '); }
  function norm(s, o = {}) {
    if (s === undefined || s === null) return '';
    s = String(s).trim()
      .replace(/\s*\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g, '')                         // số trích dẫn NotebookLM
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => `\\[${m.trim()}\\]`)
      .replace(/(?<!\\)\$([^$]+?)(?<!\\)\$/g, (_, m) => `\\(${m.trim()}\\)`);
    // < > trong công thức → \lt \gt; ngoài công thức chỉ giữ thẻ b, i, u, br, sup, sub
    const parts = s.split(/(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/);
    s = parts.map((p, i) => i % 2 ? mathFix(p) : p.replace(/<(?!\/?(?:b|i|u|br|sup|sub)\b[^>]*>)/g, '&lt;').replace(/(?<!<[^>]*)>/g, '&gt;')
      .replace(/\.\.\.(?!\.)/g, '…').replace(/\n/g, o.keepNL ? '\n' : '<br>')).join('');
    return s;
  }
  const normArr = a => (Array.isArray(a) ? a : (a ? [a] : [])).map(x => norm(x)).filter(Boolean);

  /* ---------- 3. Kiểm ---------- */
  function stepsOf(arr) { return (Array.isArray(arr) ? arr : []).map(b => ({ s: b.buoc ?? b.y ?? b.noi_dung ?? '', p: num(b.diem) })); }
  function checkSteps(errs, where, steps, total) {
    if (!steps.length) { errs.push(`${where}: thiếu các bước chấm điểm`); return; }
    steps.forEach((b, i) => { if (!b.s) errs.push(`${where}: bước ${i + 1} trống`); if (!(b.p > 0) || !q4(b.p)) errs.push(`${where}: bước ${i + 1} điểm ${b.p} không là bội 0,25`); });
    const s = sum(steps.map(b => b.p)); if (!near(s, total)) errs.push(`${where}: tổng điểm các bước ${s} ≠ ${total}`);
  }
  function check(j) {
    const errs = [], warns = [];
    if (!j || typeof j !== 'object') return { loai: '?', errs: ['Không phải dữ liệu JSON dạng đối tượng { … }'], warns };
    const loai = j.loai || (j.doc_hieu ? 'de_van' : (j.de && j.bai !== undefined ? 'luyen_de_toan' : ''));
    if (loai === 'luyen_de_toan') {
      const bai = String(j.bai ?? '').toLowerCase().replace(/^bài\s*/, '');
      if (!BAI[bai]) errs.push(`"bai" phải là 1, 2, 3, 4, 5, 6, "7a", "7b" hoặc "7c" (đang là ${JSON.stringify(j.bai)})`);
      const de = Array.isArray(j.de) ? j.de : [];
      if (!de.length) errs.push('Thiếu danh sách đề "de": [ … ]');
      de.forEach((d, i) => {
        const w = `Đề ${i + 1}`, p = num(d.diem);
        ['de', 'dap_so'].forEach(k => { if (!d[k]) errs.push(`${w}: thiếu "${k}"`); });
        if (!(p > 0) || !q4(p)) errs.push(`${w}: "diem" phải là số, bội 0,25`);
        checkSteps(errs, w, stepsOf(d.loi_giai), p);
        if (!d.nguon) warns.push(`${w}: chưa ghi "nguon" (tên đề trong notebook làm dạng tham khảo)`);
        if (d.hinh) warns.push(`${w}: có hình – web in phần mô tả hình, thầy kiểm tra lại`);
      });
      return { loai, errs, warns, n: de.length, ten: `Toán – Bài ${bai} (${de.length} đề)`, id: BAI[bai] };
    }
    if (loai === 'de_van') {
      const dh = j.doc_hieu || {}, vb = dh.van_ban || {}, vt = j.viet || {};
      if (!j.ma_de) errs.push('Thiếu "ma_de"');
      if (!vb.noi_dung) errs.push('Đọc hiểu: thiếu văn bản "van_ban.noi_dung"');
      const chkNguon = (v, w) => { if (v && v.noi_dung && !NGUON_OK.includes(v.nguon_goc)) errs.push(`${w}: "nguon_goc" phải là "truoc_1929" (tác phẩm công bố trước 1929) hoặc "tu_viet" (văn bản tự viết) – không dùng tác phẩm còn bản quyền`); };
      chkNguon(vb, 'Văn bản đọc hiểu'); chkNguon(vt.van_ban, 'Văn bản phần Viết');
      const cau = Array.isArray(dh.cau) ? dh.cau : [];
      if (cau.length < 3) errs.push('Đọc hiểu: cần ít nhất 3 câu hỏi trong "cau"');
      cau.forEach((c, i) => {
        const w = `Đọc hiểu câu ${c.so || i + 1}`, p = num(c.diem);
        if (!c.de) errs.push(`${w}: thiếu "de"`); if (!c.dap_an) errs.push(`${w}: thiếu "dap_an"`);
        if (!c.goi_y) warns.push(`${w}: thiếu "goi_y" cho học sinh`);
        if (c.dang && !DANG_VAN[c.dang]) warns.push(`${w}: "dang" lạ (${c.dang})`);
        if (!(p > 0) || !q4(p)) errs.push(`${w}: "diem" phải là số, bội 0,25`);
        checkSteps(errs, w, stepsOf(c.cham), p);
      });
      const dv = dh.doan_van || {};
      if (!dv.de) errs.push('Thiếu đề đoạn văn "doan_van.de"'); else { checkSteps(errs, 'Đoạn văn', stepsOf(dv.cham), num(dv.diem)); if (!(dv.khung || []).length) warns.push('Đoạn văn: thiếu "khung"'); }
      const tDH = sum(cau.map(c => num(c.diem))) + (num(dv.diem) || 0);
      if (!near(tDH, num(dh.diem) || 6)) errs.push(`Đọc hiểu: tổng điểm các câu và đoạn văn = ${tDH}, cần ${num(dh.diem) || 6}`);
      if (!vt.de) errs.push('Thiếu đề phần Viết "viet.de"'); else checkSteps(errs, 'Phần Viết', stepsOf(vt.cham), num(vt.diem));
      if (!vt.dan_y || !(vt.dan_y.than_bai || []).length) warns.push('Phần Viết: thiếu dàn ý "dan_y.than_bai"');
      const tong = tDH + (num(vt.diem) || 0);
      if (!near(tong, 10)) errs.push(`Tổng điểm cả đề = ${tong}, cần 10`);
      return { loai, errs, warns, n: 1, ten: `Ngữ văn – đề ${j.ma_de || '?'}`, id: j.ma_de };
    }
    errs.push('Không nhận ra loại dữ liệu: cần "loai":"de_van" (Ngữ văn) hoặc "loai":"luyen_de_toan" (Toán).');
    return { loai: '?', errs, warns };
  }

  /* ---------- 4. Chuyển sang dữ liệu của web ---------- */
  function toanItems(j, src) {
    return (j.de || []).map(d => {
      const p = num(d.diem);
      const bang = Array.isArray(d.bang) && d.bang.length ? `<table class="tbl">${d.bang.map(r => `<tr>${r.map(c => `<td>${norm(c)}</td>`).join('')}</tr>`).join('')}</table>` : '';
      return { ten: norm(d.ten || d.dang || 'Đề nhập từ AI'), nguon: norm(d.nguon || 'Tổng hợp từ tài liệu trong NotebookLM'), pts: p,
        h: Math.min(Math.max(+d.o_li || Math.round(60 + 60 * p), 50), 180),
        de: norm(d.de) + bang + (d.hinh ? `<p class="ld-hinh"><i>Hình:</i> ${norm(d.hinh)}</p>` : ''),
        ans: norm(d.dap_so), barem: stepsOf(d.loi_giai).map(b => [norm(b.s), b.p]), loi: normArr(d.loi_hay_sai), nhap: true, may: src === 'may-nay' };
    });
  }
  function vanBan(v) {
    if (!v || !v.noi_dung) return null;
    return { ten: norm(v.ten), tac_gia: norm(v.tac_gia), the_loai: norm(v.the_loai), nguon_goc: v.nguon_goc,
      noi_dung: norm(v.noi_dung, { keepNL: true }), chu_thich: normArr(v.chu_thich) };
  }
  function vanEntry(j, src) {
    const dh = j.doc_hieu || {}, dv = dh.doan_van || {}, vt = j.viet || {}, dy = vt.dan_y || {};
    const st = a => stepsOf(a).map(b => [norm(b.s), b.p]);
    return {
      ma: String(j.ma_de), muc: j.muc_do || 'TB', phut: +j.thoi_gian || 120, theo: norm(j.cau_truc_theo), src,
      dh: { diem: num(dh.diem) || 6, vb: vanBan(dh.van_ban),
        cau: (dh.cau || []).map((c, i) => ({ so: c.so || i + 1, diem: num(c.diem), dang: c.dang || 'khac', de: norm(c.de), goi: norm(c.goi_y), mau: norm(c.mau_cau),
          dong: +c.dong_ke || Math.max(3, Math.round(num(c.diem) * 5)), dap: norm(c.dap_an), cham: st(c.cham) })),
        dv: { so: dv.so || (dh.cau || []).length + 1, diem: num(dv.diem), de: norm(dv.de), khung: normArr(dv.khung), mau: norm(dv.mau_cau),
          cham: st(dv.cham), loi: normArr(dv.loi_hay_sai) } },
      viet: { diem: num(vt.diem) || 4, de: norm(vt.de), vb: vanBan(vt.van_ban), mau: norm(vt.mau_cau), tu: normArr(vt.tu_ngu),
        dy: { mo: normArr(dy.mo_bai), than: normArr(dy.than_bai), ket: normArr(dy.ket_bai) }, cham: st(vt.cham), loi: normArr(vt.loi_hay_sai) },
      checklist: normArr(j.checklist),
    };
  }
  function apply(j, src) {
    const r = check(j);
    if (r.errs.length) return r;
    if (r.loai === 'luyen_de_toan' && typeof LuyenDe !== 'undefined') {
      if (!LuyenDe.get(r.id)) LuyenDe.add(r.id, { phut: 12, de: [] });
      LuyenDe.get(r.id).de.push(...toanItems(j, src));
    }
    if (r.loai === 'de_van' && typeof Van !== 'undefined') Van.add(vanEntry(j, src));
    return r;
  }

  /* ---------- 5. Kho dữ liệu ---------- */
  // Gọi từ data/nhap/*.js (dữ liệu của hệ thống).
  function add(j, file) { const r = apply(j, 'he-thong'); items.push({ json: j, src: 'he-thong', file, r }); return r; }
  const LKEY = 'nhap:may';
  const local = () => (typeof U !== 'undefined' ? U.get(LKEY, []) : []);
  function loadLocal() {
    local().forEach(x => {
      if (x.json.loai === 'de_van' && typeof Van !== 'undefined' && Van.get(String(x.json.ma_de))) return;   // hệ thống đã có mã đề này
      items.push({ json: x.json, src: 'may-nay', key: x.key, r: apply(x.json, 'may-nay') });
    });
  }
  function saveLocal(j) {
    const r = check(j), key = r.loai === 'de_van' ? `van-${j.ma_de}` : `toan-${String(j.bai).toLowerCase()}-${Date.now()}`;
    const a = local().filter(x => x.key !== key); a.push({ key, json: j, luc: new Date().toISOString() }); U.set(LKEY, a);
    return key;
  }
  function removeLocal(key) { U.set(LKEY, local().filter(x => x.key !== key)); }
  // Tên tệp chuẩn khi tải về (đặt vào thư mục nhap/ của dự án).
  function fileName(j) {
    const r = check(j), d = new Date(), ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    const safe = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    return r.loai === 'de_van' ? `van-${safe(j.ma_de)}.json` : `toan-bai${safe(j.bai)}-${ymd}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}.json`;
  }

  return { BAI, DANG_VAN, extract, parse, repair, norm, check, toanItems, vanEntry, add, items, loadLocal, saveLocal, removeLocal, local, fileName };
})();
