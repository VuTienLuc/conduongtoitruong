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
     "loai":"on_tap_toan"   → phiếu ôn tập 90 phút theo chủ đề, cơ bản → nâng cao (OnTap); đọc được cả Markdown chuẩn
     "loai":"bai_hoc"       → bài giảng – luyện tập online một bài SGK Toán 9–12 KNTT (BaiHoc): bài giảng, cần nhớ,
                              trắc nghiệm, đúng – sai, trả lời ngắn
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
    const md = mdOf(raw);
    if (md) return { data: mdToJson(md), notes: ['Đọc từ Markdown chuẩn.'] };
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

  /* ---------- 1b. Markdown chuẩn của phiếu ôn tập (mẫu: Xuong.MAU_MD_ONTAP; xuất ngược: OnTap.toMd) ---------- */
  function mdOf(raw) {
    let t = String(raw || '').replace(/^\uFEFF/, '').trim();
    const m = t.match(/```(?:markdown|md)\s*([\s\S]*?)```/i); if (m) t = m[1].trim();
    return /^---\s*\n[\s\S]*?loai:\s*on_tap_toan/.test(t) ? t : '';
  }
  function mdToJson(t) {
    const fm = t.match(/^---\s*\n([\s\S]*?)\n---/), j = { loai: 'on_tap_toan', muc_tieu: [], kien_thuc: [], phan: [], tu_danh_gia: [] };
    (fm ? fm[1] : '').split('\n').forEach(l => { const m = l.match(/^(\w+):\s*(.*)$/); if (m) j[m[1]] = /^\d+$/.test(m[2].trim()) ? +m[2].trim() : m[2].trim().replace(/^"|"$/g, ''); });
    const body = fm ? t.slice(fm[0].length) : t, bai = {};
    let sec = '', cur = null, phan = null;
    body.split('\n').forEach(raw => {
      const l = raw.replace(/\s+$/, ''); let m;
      if ((m = l.match(/^##\s+(.*)$/))) {
        const h = m[1]; cur = null;
        if (/^Mục tiêu/i.test(h)) sec = 'mt'; else if (/^(Nhắc nhanh|Kiến thức cần nhớ)/i.test(h)) sec = 'kt'; else if (/^Tự đánh giá/i.test(h)) sec = 'tdg';
        else if (/^Đáp án/i.test(h)) sec = 'da';
        else if ((m = h.match(/^Phần\s+\S+\s*[–-]\s*(.+?)\s*\((\d+)\s*phút\)/i))) { sec = 'ph'; phan = { muc: m[1].trim(), phut: +m[2], bai: [] }; j.phan.push(phan); }
        else sec = '';
        return;
      }
      if ((m = l.match(/^###\s+Bài\s+(\d+)/i))) {
        const n = +m[1];
        if (sec === 'ph' && phan) { cur = bai[n] = { so: n, de: '', loi_giai: [] }; phan.bai.push(cur); }
        else if (sec === 'da') cur = bai[n] || null;
        return;
      }
      if (sec === 'mt' && (m = l.match(/^[-*]\s+(.*)/))) j.muc_tieu.push(m[1]);
      else if (sec === 'kt' && (m = l.match(/^[-*]\s+(.*)/))) j.kien_thuc.push(m[1]);
      else if (sec === 'tdg' && (m = l.match(/^[-*]\s+(?:\[[ x]\]\s*)?(.*)/))) j.tu_danh_gia.push(m[1]);
      else if (sec === 'ph' && cur) {
        if ((m = l.match(/^\*Nguồn:\*\s*(.*)/i))) cur.nguon = m[1];
        else if ((m = l.match(/^\*Cần nhớ:\*\s*(.*)/i))) cur.can_nho = m[1];
        else if ((m = l.match(/^>\s*Gợi ý:\s*(.*)/i))) cur.goi_y = m[1];
        else if ((m = l.match(/^\*Dòng kẻ:\*\s*(\d+)/i))) cur.dong_ke = +m[1];
        else if (l.trim()) cur.de += (cur.de ? '\n' : '') + l.trim();
      } else if (sec === 'da' && cur) {
        if ((m = l.match(/^\*\*Đáp số:\*\*\s*(.*)/i))) cur.dap_so = m[1];
        else if ((m = l.match(/^\d+[.)]\s+(.*)/))) cur.loi_giai.push(m[1]);
      }
    });
    return j;
  }
  // Dấu vân tay một bài (để phát hiện bài lấy lại ở đợt trước): bỏ dấu, kí hiệu, khoảng trắng, lệnh LaTeX.
  const fp = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
    .replace(/\\[a-z]+|<[^>]*>|[^a-z0-9]/g, '').slice(0, 90);

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
  // Đoạn nhiều dòng: dòng bắt đầu bằng "- " gom thành danh sách, các dòng khác cách nhau bằng <br>.
  function normBlock(s) {
    const out = []; let ul = [];
    const flush = () => { if (ul.length) out.push(`<ul>${ul.map(x => `<li>${x}</li>`).join('')}</ul>`); ul = []; };
    String(s ?? '').split(/\n/).forEach(l => { const m = l.match(/^\s*[-•*]\s+(.*)/); if (m) ul.push(norm(m[1])); else { flush(); if (l.trim()) out.push(norm(l)); } });
    flush();
    return out.reduce((a, x, i) => a + (i && !x.startsWith('<ul>') && !out[i - 1].startsWith('<ul>') ? '<br>' : '') + x, '');
  }

  /* ---------- 3. Kiểm ---------- */
  const numVN = s => { const t = String(s).trim().replace(/\s+/g, '').replace(/,/g, '.').replace(/−/g, '-'); const m = t.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    return m ? (+m[2] ? +m[1] / +m[2] : NaN) : (/^-?\d*\.?\d+$/.test(t) ? +t : NaN); };
  const boolOf = v => v === true || /^(true|đúng|dung|đ|1)$/i.test(String(v).trim()) ? true : v === false || /^(false|sai|s|0)$/i.test(String(v).trim()) ? false : null;
  function dapIdx(q, pa) {
    const d = String(q.dap_an ?? '').trim(), m = d.match(/^([A-D])(?:[.)]|$)/i);
    if (m) return 'ABCD'.indexOf(m[1].toUpperCase());
    return pa.findIndex(x => x.trim() === d.replace(/^\s*[A-D][.)]\s+/, ''));
  }
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
    if (loai === 'on_tap_toan') {
      const bai = String(j.bai ?? '').toLowerCase().replace(/^bài\s*/, '');
      if (!BAI[bai]) errs.push(`"bai" phải là 1, 2, 3, 4, 5, 6, "7a", "7b" hoặc "7c" (đang là ${JSON.stringify(j.bai)})`);
      if (!j.ma) errs.push('Thiếu "ma" (mã phiếu)');
      const ph = Array.isArray(j.phan) ? j.phan : [], tg = +j.thoi_gian || 90;
      if (ph.length < 2) errs.push('Cần ít nhất 2 phần (Cơ bản → Nâng cao) trong "phan"');
      if ((Array.isArray(j.kien_thuc) ? j.kien_thuc.filter(Boolean).length : 0) < 3) errs.push('Thiếu mục "kien_thuc": cần nhắc lại ít nhất 3 kiến thức cần nhớ để làm các bài trong phiếu');
      const all = [];
      ph.forEach((p, k) => {
        if (!p.muc) errs.push(`Phần ${k + 1}: thiếu "muc"`); if (!(+p.phut > 0)) errs.push(`Phần ${k + 1}: thiếu "phut"`);
        (Array.isArray(p.bai) ? p.bai : []).forEach((b, i) => {
          const w = `Phần ${k + 1} (${p.muc || '?'}) bài ${b.so || i + 1}`;
          if (!b.de) errs.push(`${w}: thiếu "de"`); if (!b.dap_so) errs.push(`${w}: thiếu "dap_so"`);
          if (!(Array.isArray(b.loi_giai) ? b.loi_giai.length : b.loi_giai)) errs.push(`${w}: thiếu "loi_giai"`);
          if (!b.nguon) warns.push(`${w}: chưa ghi "nguon"`);
          if (!b.can_nho) warns.push(`${w}: chưa ghi "can_nho" (kiến thức cần nhớ của bài)`);
          all.push({ w, f: fp(b.de), nguon: b.nguon });
        });
        if (!(p.bai || []).length) errs.push(`Phần ${k + 1}: chưa có bài nào`);
      });
      const tong = sum(ph.map(p => +p.phut || 0));
      if (tong > tg || tong < tg - 15) errs.push(`Tổng thời gian các phần ${tong} phút, cần từ ${tg - 15} đến ${tg} phút (còn lại để soát bài)`);
      all.forEach((x, i) => { if (all.findIndex(y => y.f === x.f) < i) errs.push(`${x.w}: trùng với một bài khác trong cùng phiếu`); });
      // khác các đợt trước: so với các phiếu đã có của cùng chủ đề
      if (typeof OnTap !== 'undefined') OnTap.list().filter(e => e.bai === bai && e.ma !== String(j.ma)).forEach(e => e.phan.forEach(p => p.bai.forEach(b => {
        all.forEach(x => { if (x.f && x.f === b.f) warns.push(`${x.w}: TRÙNG với phiếu ${e.ma} (đợt ${e.dot}) bài ${b.so} – nên thay bằng bài khác`); });
      })));
      return { loai, errs, warns, n: all.length, ten: `Phiếu ôn tập 90 phút – Bài ${bai}, đợt ${j.dot || '?'} (${all.length} bài)`, id: BAI[bai], bai, dup: warns.some(w => /TRÙNG/.test(w)) };
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
    if (loai === 'bai_hoc') {
      const lop = +j.lop, bai = +j.bai, ML = typeof BaiHoc !== 'undefined' ? BaiHoc : null;
      if (![9, 10, 11, 12].includes(lop)) errs.push(`"lop" phải là 9, 10, 11 hoặc 12 (đang là ${JSON.stringify(j.lop)})`);
      if (!(bai >= 1) || bai !== Math.floor(bai)) errs.push(`"bai" phải là số thứ tự bài trong SGK (đang là ${JSON.stringify(j.bai)})`);
      const sgk = ML && ML.ML[lop] ? ML.baiOf(lop, bai) : null;
      if (ML && ML.ML[lop] && bai >= 1 && !sgk) errs.push(`Toán ${lop} không có Bài ${bai} trong mục lục SGK Kết nối tri thức (có ${ML.all(lop).length} bài)`);
      const fold = x => fp(x).replace(/^bai\d+/, '');
      if (sgk && j.ten_bai && fold(j.ten_bai) !== fold(sgk.ten)) warns.push(`"ten_bai" là "${j.ten_bai}", mục lục SGK ghi "${sgk.ten}" – web dùng tên trong mục lục`);
      if (!j.nguon) warns.push('Chưa ghi "nguon" (tài liệu trong notebook đã dùng: SGK, sách bài tập…)');
      const bg = Array.isArray(j.bai_giang) ? j.bai_giang : [];
      if (bg.length < 2) errs.push('"bai_giang" cần ít nhất 2 mục kiến thức');
      bg.forEach((m, i) => { if (!m.tieu_de || !m.noi_dung) errs.push(`Bài giảng mục ${i + 1}: thiếu "tieu_de" hoặc "noi_dung"`);
        (m.vi_du || []).forEach((v, k) => { if (!v.de || !(Array.isArray(v.loi_giai) ? v.loi_giai.length : v.loi_giai)) errs.push(`Bài giảng mục ${i + 1} ví dụ ${k + 1}: thiếu "de" hoặc "loi_giai"`); }); });
      if (!bg.some(m => (m.vi_du || []).length)) errs.push('Bài giảng chưa có ví dụ nào ("vi_du" kèm lời giải)');
      if ((Array.isArray(j.can_nho) ? j.can_nho.filter(Boolean).length : 0) < 3) errs.push('Thiếu "can_nho": cần ít nhất 3 kiến thức cần nhớ của bài');
      if (!(j.muc_tieu || []).length) warns.push('Chưa có "muc_tieu"');
      const tn = Array.isArray(j.trac_nghiem) ? j.trac_nghiem : [], ds = Array.isArray(j.dung_sai) ? j.dung_sai : [], tl = Array.isArray(j.tra_loi_ngan) ? j.tra_loi_ngan : [];
      if (tn.length < 4) errs.push(`Phần I cần ít nhất 4 câu trắc nghiệm (đang có ${tn.length})`);
      if (ds.length < 1) errs.push('Phần II cần ít nhất 1 câu đúng – sai'); if (tl.length < 1) errs.push('Phần III cần ít nhất 1 câu trả lời ngắn');
      const fps = [];
      tn.forEach((q, i) => { const w = `Trắc nghiệm câu ${i + 1}`, pa = (q.phuong_an || []).map(x => String(x).replace(/^\s*[A-D][.)]\s+/, ''));
        if (!q.cau) errs.push(`${w}: thiếu "cau"`);
        if (pa.length !== 4 || new Set(pa).size !== 4) errs.push(`${w}: cần đúng 4 phương án khác nhau`);
        if (dapIdx(q, pa) < 0) errs.push(`${w}: "dap_an" phải là A, B, C hoặc D`);
        if (!q.giai_thich) warns.push(`${w}: thiếu "giai_thich"`); fps.push([w, fp(q.cau)]); });
      ds.forEach((q, i) => { const w = `Đúng – sai câu ${i + 1}`, y = Array.isArray(q.y) ? q.y : [];
        if (!q.cau) errs.push(`${w}: thiếu "cau" (lời dẫn)`);
        if (y.length !== 4) errs.push(`${w}: cần đúng 4 ý a, b, c, d (đang có ${y.length})`);
        y.forEach((x, k) => { if (!x.noi_dung) errs.push(`${w} ý ${'abcd'[k]}: thiếu "noi_dung"`); if (boolOf(x.dung) === null) errs.push(`${w} ý ${'abcd'[k]}: "dung" phải là true hoặc false`); });
        if (y.length === 4 && y.every(x => boolOf(x.dung) === boolOf(y[0].dung))) warns.push(`${w}: cả 4 ý cùng ${boolOf(y[0].dung) ? 'Đúng' : 'Sai'} – nên có cả ý đúng và ý sai`);
        if (!q.giai_thich) warns.push(`${w}: thiếu "giai_thich"`); fps.push([w, fp(q.cau)]); });
      tl.forEach((q, i) => { const w = `Trả lời ngắn câu ${i + 1}`, a = String(q.dap_an ?? '').trim();
        if (!q.cau) errs.push(`${w}: thiếu "cau"`);
        if (!a || isNaN(numVN(a))) errs.push(`${w}: "dap_an" phải là MỘT số (ví dụ "2,5", "-3", "0,25"), đang là ${JSON.stringify(q.dap_an)}`);
        else if (a.replace(/^-/, '').length > 4) warns.push(`${w}: đáp số "${a}" dài hơn 4 kí tự – đề thi THPT chỉ ghi được 4 kí tự, nên yêu cầu làm tròn`);
        if (!q.giai_thich) warns.push(`${w}: thiếu "giai_thich"`); fps.push([w, fp(q.cau)]); });
      fps.forEach(([w, f], i) => { if (f && fps.findIndex(x => x[1] === f) < i) errs.push(`${w}: trùng với một câu khác`); });
      const n = tn.length + ds.length + tl.length;
      return { loai, errs, warns, n, ten: `Bài giảng – luyện tập Toán ${lop} – Bài ${bai}${sgk ? '. ' + sgk.ten : ''} (${n} câu)`, id: `${lop}-${bai}`, lop, bai };
    }
    errs.push('Không nhận ra loại dữ liệu: cần "loai":"de_van" (Ngữ văn), "luyen_de_toan" (đề luyện Toán), "on_tap_toan" (phiếu ôn tập 90 phút) hoặc "bai_hoc" (bài giảng – luyện tập lớp 9–12).');
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
  function onTapEntry(j, src) {
    const bai = String(j.bai).toLowerCase().replace(/^bài\s*/, '');
    const lg = x => (Array.isArray(x) ? x.map(y => typeof y === 'object' ? (y.buoc ?? y.noi_dung ?? '') : y) : String(x || '').split(/\n+/)).map(y => norm(y)).filter(Boolean);
    let so = 0;
    return { ma: String(j.ma), bai, id: BAI[bai], chu_de: norm(j.chu_de), dot: +j.dot || 1, phut: +j.thoi_gian || 90, src,
      muc_tieu: normArr(j.muc_tieu), kt: normArr(j.kien_thuc), tdg: normArr(j.tu_danh_gia),
      phan: (j.phan || []).map(p => ({ muc: norm(p.muc), phut: +p.phut, bai: (p.bai || []).map(b => ({ so: ++so, de: norm(b.de), f: fp(b.de),
        nguon: norm(b.nguon), can: norm(b.can_nho), goi: norm(b.goi_y), dap: norm(b.dap_so), lg: lg(b.loi_giai), dong: +b.dong_ke || 6 })) })) };
  }
  function bhEntry(j, src) {
    const lg = x => (Array.isArray(x) ? x : String(x || '').split(/\n+/)).map(y => norm(typeof y === 'object' ? (y.buoc ?? y.noi_dung ?? '') : y)).filter(Boolean);
    const sgk = typeof BaiHoc !== 'undefined' ? BaiHoc.baiOf(+j.lop, +j.bai) : null;
    return { lop: +j.lop, bai: +j.bai, ten: sgk ? sgk.ten : norm(j.ten_bai), nguon: norm(j.nguon), mau: !!j.mau, src,
      muc_tieu: normArr(j.muc_tieu), can_nho: normArr(j.can_nho),
      giang: (j.bai_giang || []).map(m => ({ t: norm(m.tieu_de), b: normBlock(m.noi_dung), luu_y: norm(m.luu_y),
        vd: (m.vi_du || []).map(v => ({ de: normBlock(v.de), lg: lg(v.loi_giai), ds: norm(v.dap_so) })) })),
      tn: (j.trac_nghiem || []).map(q => { const pa = q.phuong_an.map(x => String(x).replace(/^\s*[A-D][.)]\s+/, '')), k = dapIdx(q, pa);
        return { q: normBlock(q.cau), a: [pa[k], ...pa.filter((_, i) => i !== k)].map(x => norm(x)), goc: [k, ...[0, 1, 2, 3].filter(i => i !== k)],
          why: norm(q.giai_thich), muc: q.muc || '' }; }),
      ds: (j.dung_sai || []).map(q => ({ q: normBlock(q.cau), y: q.y.map(x => [norm(x.noi_dung).replace(/^[a-d]\)\s*/, ''), boolOf(x.dung)]), why: normBlock(q.giai_thich) })),
      tln: (j.tra_loi_ngan || []).map(q => ({ q: normBlock(q.cau), ans: String(q.dap_an).trim(), why: normBlock(q.giai_thich) })) };
  }
  function apply(j, src) {
    const r = check(j);
    if (r.errs.length) return r;
    if (r.loai === 'luyen_de_toan' && typeof LuyenDe !== 'undefined') {
      if (!LuyenDe.get(r.id)) LuyenDe.add(r.id, { phut: 12, de: [] });
      LuyenDe.get(r.id).de.push(...toanItems(j, src));
    }
    if (r.loai === 'de_van' && typeof Van !== 'undefined') Van.add(vanEntry(j, src));
    if (r.loai === 'on_tap_toan' && typeof OnTap !== 'undefined') OnTap.add(onTapEntry(j, src));
    if (r.loai === 'bai_hoc' && typeof BaiHoc !== 'undefined') r.ghep = BaiHoc.add(bhEntry(j, src));   // trùng bài đã có → thành Bộ 2, 3…
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
      if (x.json.loai === 'on_tap_toan' && typeof OnTap !== 'undefined' && OnTap.get(String(x.json.ma))) return;
      items.push({ json: x.json, src: 'may-nay', key: x.key, r: apply(x.json, 'may-nay') });
    });
  }
  function saveLocal(j) {
    const r = check(j), key = r.loai === 'de_van' ? `van-${j.ma_de}` : r.loai === 'on_tap_toan' ? `ontap-${j.ma}` : r.loai === 'bai_hoc' ? `bh-${+j.lop}-${+j.bai}-${hashOf(JSON.stringify([j.trac_nghiem, j.dung_sai, j.tra_loi_ngan]))}` : `toan-${String(j.bai).toLowerCase()}-${Date.now()}`;
    const a = local().filter(x => x.key !== key); a.push({ key, json: j, luc: new Date().toISOString() }); U.set(LKEY, a);
    return key;
  }
  const hashOf = t => { let h = 2166136261; for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619); return (h >>> 0).toString(36); };
  // Bài giảng trùng bài đã có: tên tệp thêm -bo<N> để không đè tệp cũ trong nhap/ (web lưu thành Bộ N).
  function boSo(j) {
    if (typeof BaiHoc === 'undefined' || !BaiHoc.own(+j.lop, +j.bai)) return 0;
    const e = bhEntry(j, 'xem'), cu = BaiHoc.own(+j.lop, +j.bai), f = new Set(['tn', 'ds', 'tln'].flatMap(p => e[p].map(q => BaiHoc.fpQ(q.q))));
    // bản này đã nằm trong web (đã lưu trên máy / đã nhập) → đúng số bộ của nó; chưa có → bộ sẽ tạo khi nhập
    const i = BaiHoc.boList(cu).findIndex(b => { const a = ['tn', 'ds', 'tln'].flatMap(p => b[p]); return a.length && a.every(q => f.has(BaiHoc.fpQ(q.q))); });
    if (i >= 0) return i ? i + 1 : 0;
    const g = BaiHoc.thuGhep(e); return g.bo > 1 ? g.bo : 0;
  }
  function removeLocal(key) { U.set(LKEY, local().filter(x => x.key !== key)); }
  // Tên tệp chuẩn khi tải về (đặt vào thư mục nhap/ của dự án).
  function fileName(j) {
    const r = check(j), d = new Date(), ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    const safe = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    return r.loai === 'bai_hoc' ? `bai-hoc-l${+j.lop}-b${String(+j.bai).padStart(2, '0')}${boSo(j) ? '-bo' + boSo(j) : ''}.json` : r.loai === 'de_van' ? `van-${safe(j.ma_de)}.json` : r.loai === 'on_tap_toan' ? `on-tap-${safe(j.ma)}.json` : `toan-bai${safe(j.bai)}-${ymd}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}.json`;
  }

  return { BAI, DANG_VAN, extract, parse, repair, norm, check, toanItems, vanEntry, onTapEntry, bhEntry, normBlock, numVN, mdToJson, fp, add, items, loadLocal, saveLocal, removeLocal, local, fileName };
})();
