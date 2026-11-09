#!/usr/bin/env node
/* =====================================================================
   KIỂM TRA NHANH NỘI DUNG (không cần trình duyệt):  node tools/kiem-tra.js
   - Mọi tệp JS đúng cú pháp; mọi chủ đề đủ trường theo hợp đồng dữ liệu.
   - Trắc nghiệm: 4 phương án khác nhau, có lời giải thích.
   - Barem: tổng điểm các bước = điểm của bài (mẫu và bài tự luyện).
   - Công thức: \( \) và \[ \] cân nhau; không có thẻ HTML hay < > trần trong công thức.
   - Thẻ HTML mở/đóng cân nhau; không có chỗ làm tắt (TODO, ...).
   ===================================================================== */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const errs = [], warns = [];
const err = (where, msg) => errs.push(`✗ ${where}: ${msg}`);

// 1) Nạp mã như trình duyệt (không cần DOM cho dữ liệu).
const ctx = { console, Math, JSON, window: {}, document: undefined };
vm.createContext(ctx);
const load = f => {
  const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
  try { new vm.Script(code, { filename: f }); } catch (e) { err(f, 'lỗi cú pháp – ' + e.message); return; }
  if (/\bTODO\b|\bFIXME\b|phần còn lại giữ nguyên/.test(code)) err(f, 'còn chỗ làm tắt (TODO/FIXME/phần còn lại)');
  // Công thức trong chuỗi nháy đơn bị mất dấu \ khi chạy: phải viết bằng S`…`.
  if (f.startsWith('data/')) code.split('\n').forEach((l, i) => { if (/(^|[\s,(:\[])'[^'`]*\\[(\[][^'`]*'/.test(l)) err(`${f}:${i + 1}`, 'công thức \\( \\) trong chuỗi thường – dùng S`…`'); });
  try { vm.runInContext(code + `\n;globalThis.Topics = typeof Topics !== 'undefined' ? Topics : globalThis.Topics; globalThis.LuyenDe = typeof LuyenDe !== 'undefined' ? LuyenDe : globalThis.LuyenDe; globalThis.Vdc = typeof Vdc !== 'undefined' ? Vdc : globalThis.Vdc; globalThis.NhapDL = typeof NhapDL !== 'undefined' ? NhapDL : globalThis.NhapDL; globalThis.Van = typeof Van !== 'undefined' ? Van : globalThis.Van; globalThis.OnTap = typeof OnTap !== 'undefined' ? OnTap : globalThis.OnTap; globalThis.BaiHoc = typeof BaiHoc !== 'undefined' ? BaiHoc : globalThis.BaiHoc;`, ctx, { filename: f }); }
  catch (e) { err(f, 'lỗi khi chạy – ' + e.message); }
};
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !s.includes('vendor/'));
scripts.filter(s => s !== 'assets/js/app.js' && s !== 'assets/js/math.js').forEach(load);
['assets/js/app.js', 'assets/js/math.js'].forEach(f => { try { new vm.Script(fs.readFileSync(path.join(ROOT, f), 'utf8')); } catch (e) { err(f, 'lỗi cú pháp – ' + e.message); } });
// Mọi tệp .js trong data/ (kể cả thư mục con vao-10/, lop10/…) phải có thẻ <script> trong index.html.
const walk = d => fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walk(`${d}/${e.name}`) : (e.name.endsWith('.js') ? [`${d}/${e.name}`] : []));
walk('data').forEach(f => { if (!scripts.includes(f)) err('index.html', `thiếu thẻ <script> cho ${f}`); });

const T = ctx.Topics ? ctx.Topics.list : [];
if (T.length < 1) err('dữ liệu', 'không nạp được chủ đề nào');

// 2) Kiểm từng chuỗi nội dung.
const TAGS = ['b', 'i', 'p', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'div'];
function checkStr(where, s) {
  if (typeof s !== 'string') return;
  const o1 = (s.match(/\\\(/g) || []).length, c1 = (s.match(/\\\)/g) || []).length;
  const o2 = (s.match(/\\\[/g) || []).length, c2 = (s.match(/\\\]/g) || []).length;
  if (o1 !== c1) err(where, `\\( và \\) không cân (${o1}/${c1})`);
  if (o2 !== c2) err(where, `\\[ và \\] không cân (${o2}/${c2})`);
  for (const m of s.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g)) {
    const t = m[1] || m[2] || '';
    if (/[<>]/.test(t)) err(where, `có < hoặc > trong công thức "${t.slice(0, 40)}" – dùng \\lt, \\gt`);
    const ob = (t.match(/(?<!\\)\{/g) || []).length, cb = (t.match(/(?<!\\)\}/g) || []).length;
    if (ob !== cb) err(where, `ngoặc { } không cân trong "${t.slice(0, 40)}"`);
  }
  if (s.startsWith('<svg')) return;
  TAGS.forEach(tag => {
    const op = (s.match(new RegExp(`<${tag}(\\s[^>]*)?>`, 'g')) || []).length, cl = (s.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    if (op !== cl) err(where, `thẻ <${tag}> mở ${op} đóng ${cl}`);
  });
  if (/(^|[^.])\.\.\.([^.]|$)/.test(s.replace(/\.{3}[A-Za-z]/g, ''))) err(where, 'có chuỗi "..." (làm tắt?)');
}
const near = (a, b) => Math.abs(a - b) < 1e-9;
const sum = a => a.reduce((x, y) => x + y, 0);

const ids = new Set(), nos = new Set();
T.forEach(t => {
  const W = `Chủ đề ${t.no} (${t.id})`;
  if (ids.has(t.id)) err(W, 'trùng id'); ids.add(t.id);
  if (nos.has(t.no)) err(W, 'trùng số thứ tự'); nos.add(t.no);
  ['title', 'desc', 'bai'].forEach(k => { if (!t[k]) err(W, `thiếu ${k}`); checkStr(`${W} › ${k}`, t[k]); });
  if (!(t.remind || []).length || t.remind.length < 3) err(W, 'nhắc nhanh cần ≥ 3 dòng');
  (t.remind || []).forEach((r, i) => checkStr(`${W} › nhắc nhanh ${i + 1}`, r));
  if (!(t.theory || []).length || t.theory.length < 3) err(W, 'lý thuyết cần ≥ 3 mục');
  (t.theory || []).forEach((x, i) => { if (!x.t || !x.b) err(W, `lý thuyết ${i + 1} thiếu t/b`); checkStr(`${W} › lý thuyết ${i + 1}`, x.b); checkStr(`${W} › lý thuyết ${i + 1} (lưu ý)`, x.warn); });
  if (!(t.tips || []).length || t.tips.length < 4) err(W, 'mẹo nhớ cần ≥ 4 câu');
  (t.tips || []).forEach((x, i) => { if (!x.t || !x.b) err(W, `mẹo ${i + 1} thiếu t/b`); checkStr(`${W} › mẹo ${i + 1}`, x.b); });
  if (!(t.quiz || []).length || t.quiz.length < 8) err(W, 'trắc nghiệm hiểu bài cần ≥ 8 câu');
  (t.quiz || []).forEach((q, i) => {
    const w = `${W} › trắc nghiệm ${i + 1}`;
    if (!q.q || !q.why) err(w, 'thiếu câu hỏi hoặc lời giải thích');
    if (!Array.isArray(q.a) || q.a.length !== 4) err(w, 'cần đúng 4 phương án (phương án đúng đứng đầu)');
    else if (new Set(q.a).size !== 4) err(w, 'có phương án trùng nhau');
    [q.q, q.why, ...(q.a || [])].forEach(s => checkStr(w, s));
  });
  if (!(t.models || []).length) err(W, 'cần ít nhất 1 bài tự luận mẫu');
  (t.models || []).forEach((m, i) => {
    const w = `${W} › bài mẫu ${i + 1}`;
    if (!m.title || !m.de || !m.pts) err(w, 'thiếu title/de/pts');
    const ps = sum((m.steps || []).filter(s => !s.part).map(s => s.p || 0));
    if (!near(ps, m.pts)) err(w, `tổng điểm các bước ${ps} ≠ ${m.pts}`);
    (m.steps || []).forEach((s, j) => { if (!s.part && !s.s) err(w, `bước ${j + 1} trống`); checkStr(`${w} › bước ${j + 1}`, s.s || s.part); checkStr(`${w} › bước ${j + 1}`, s.warn); });
    if (!(m.loi || []).length || m.loi.length < 2) err(w, 'cần ≥ 2 lỗi hay bị trừ điểm');
    checkStr(w, m.de);
  });
  if (!(t.present || []).length || t.present.length < 4) err(W, 'hướng dẫn trình bày cần ≥ 4 ý');
  if (!(t.practice || []).length || t.practice.length !== 3) err(W, 'phiếu cần đúng 3 bài (Cơ bản, Khá, Nâng cao)');
  (t.practice || []).forEach((p, i) => {
    const w = `${W} › bài tự luyện ${i + 1}`;
    if (!p.lv || !p.de || !p.ans || !p.pts || !p.h) err(w, 'thiếu lv/de/ans/pts/h');
    const bs = sum((p.barem || []).map(b => b[1]));
    if (!near(bs, p.pts)) err(w, `tổng barem ${bs} ≠ ${p.pts}`);
    (p.barem || []).forEach(b => { if (!near(b[1] * 4, Math.round(b[1] * 4))) err(w, `điểm ${b[1]} không là bội 0,25`); checkStr(w, b[0]); });
    checkStr(w, p.de); checkStr(w, p.ans);
  });
});

// 2b) Lớp 10–12: vận dụng, vận dụng cao (Vdc).
const V = ctx.Vdc ? ctx.Vdc.list : [];
const KY = ctx.Vdc ? ctx.Vdc.KY : [];
const vids = new Set();
V.forEach(t => {
  const W = `${t.grade}/${t.id}`;
  if (!['lop10', 'lop11', 'lop12'].includes(t.grade)) err(W, 'grade phải là lop10, lop11 hoặc lop12');
  if (vids.has(W)) err(W, 'trùng mã chủ đề'); vids.add(W);
  if (!/^[a-z0-9-]+$/.test(t.id)) err(W, 'mã chủ đề chỉ gồm chữ thường không dấu, số, gạch ngang');
  if (!Array.isArray(t.ky) || !t.ky.length || t.ky.some(k => !KY.includes(k))) err(W, `ky phải là một hoặc nhiều trong: ${KY.join(', ')}`);
  if (!t.mau && !t.nguon) err(W, 'thiếu nguon (tên tệp tài liệu trong tai-lieu/) – hoặc đánh dấu mau:true');
  ['title', 'desc'].forEach(k => { if (!t[k]) err(W, `thiếu ${k}`); checkStr(`${W} › ${k}`, t[k]); });
  if (!(t.kt || []).length) err(W, 'thiếu kiến thức trọng tâm (kt)');
  (t.kt || []).forEach((k, i) => { if (!k.t || !k.b) err(W, `kt ${i + 1} thiếu t/b`); checkStr(`${W} › kt ${i + 1}`, k.b); });
  if (!(t.dang || []).length) err(W, 'cần ít nhất 1 dạng');
  (t.dang || []).forEach((d, i) => {
    const w = `${W} › dạng ${i + 1}`;
    if (!d.ten || !/^(VD|VDC|VD – VDC)$/.test(d.muc || '')) err(w, 'thiếu tên hoặc muc (VD | VDC | VD – VDC)');
    if (!(d.pp || []).length) err(w, 'thiếu phương pháp (pp)');
    if (!(d.vd || []).length) err(w, 'cần ít nhất 1 ví dụ mẫu');
    (d.vd || []).forEach((v, j) => { if (!v.de || !(v.lg || []).length || !v.ds) err(w, `ví dụ ${j + 1} thiếu de/lg/ds`); [v.de, v.ds, ...(v.lg || [])].forEach(x => checkStr(`${w} › ví dụ ${j + 1}`, x)); });
    if ((d.bt || []).length < 2) err(w, 'cần ít nhất 2 bài tương tự');
    (d.bt || []).forEach((b, j) => {
      const wb = `${w} › bài ${b.n || j + 1}`;
      if (!['VD', 'VDC'].includes(b.muc)) err(wb, 'muc phải là VD hoặc VDC');
      if (!b.de || !b.goiY || !(b.lg || []).length || !b.ds) err(wb, 'thiếu de/goiY/lg/ds');
      if (!b.dong || b.dong < 4 || b.dong > 30) err(wb, 'dong (số dòng kẻ) từ 4 đến 30');
      [b.de, b.goiY, b.ds, ...(b.lg || [])].forEach(x => checkStr(wb, x));
    });
  });
});

// 2b) Luyện đề vào 10: mỗi bộ 10, 20… đề, barem cộng đúng điểm, bội 0,25.
let nLD = 0;
if (ctx.LuyenDe) ctx.LuyenDe.ids().forEach(id => {
  const L = ctx.LuyenDe.get(id), W = `Luyện đề ${id}`;
  if (!ids.has(id)) err(W, 'không có chủ đề vào 10 mã này');
  const goc = (L.de || []).filter(d => !d.nhap);   // đề soạn sẵn; đề nhập từ AI (nhap) được thêm số lượng bất kì
  if (!L.de || !L.de.length || (goc.length && goc.length % 10)) err(W, `số đề soạn sẵn phải là bội của 10 (đang có ${goc.length})`);
  // Đề trùng: thường do vừa để JSON trong nhap/ (tự nhập thành data/nhap/*.js) vừa viết tay cùng đề vào data/vao-10/luyen-de/*.js
  const dau = d => String(d.de || '').replace(/<[^>]+>|\\[()\[\]]|\s+/g, ' ').toLowerCase().trim().slice(0, 160);
  const gap = new Map();
  (L.de || []).forEach((d, i) => { const k = dau(d); if (gap.has(k)) err(W, `đề ${i + 1} "${d.ten}" TRÙNG đề ${gap.get(k) + 1} – có thể vừa để JSON trong nhap/ vừa viết tay vào data/vao-10/luyen-de/; chỉ giữ một nơi (JSON gốc đã chuyển tay thì để ở docs/nguon-ai/)`); else gap.set(k, i); });
  (L.de || []).forEach((d, i) => {
    const w = `${W} › đề ${i + 1}`; nLD++;
    ['ten', 'nguon', 'de', 'ans'].forEach(k => { if (!d[k]) err(w, `thiếu ${k}`); });
    if (!d.pts || !(d.h >= 30 && d.h <= 200)) err(w, 'thiếu pts hoặc h (mm ô li, 30–200)');
    const bs = sum((d.barem || []).map(b => b[1]));
    if (!near(bs, d.pts)) err(w, `tổng barem ${bs} ≠ ${d.pts}`);
    (d.barem || []).forEach(b => { if (!near(b[1] * 4, Math.round(b[1] * 4))) err(w, `điểm ${b[1]} không là bội 0,25`); checkStr(w, b[0]); });
    [d.de, d.ans, d.ten, ...(d.loi || [])].forEach(x => checkStr(w, x));
    if (d.goi) { if (d.goi.length !== 3) err(w, 'gợi ý phải đủ 3 nấc (Nhận dạng, Hướng đi, Khung lời giải)'); d.goi.forEach(x => checkStr(w + ' › gợi ý', x)); }
    if (L.the && !d.nhap) {
      if (!d.cc || !d.cc.length || !d.q || !d.ch) err(w, 'bộ có Thẻ công cụ: mỗi đề cần cc, q, ch');
      (d.cc || []).forEach(c => { if (!L.the.some(x => x.id === c)) err(w, `mã công cụ không có trong Thẻ: ${c}`); });
    }
  });
  (L.the || []).forEach(r => { if (!r.id || !r.ten || !r.cc) err(W, 'Thẻ công cụ thiếu id/ten/cc'); checkStr(W + ' › Thẻ', r.cc); });
  if (L.giam && !(L.giam.length === 2 && L.giam[0] < L.giam[1])) err(W, 'giam phải là [k1, k2] với k1 < k2');
});

// 2c) Dữ liệu nhập từ AI (data/nhap/*.js): cùng bộ kiểm với web; chuỗi đã chuẩn hoá phải sạch công thức, thẻ HTML.
let nNhap = 0;
if (ctx.NhapDL) ctx.NhapDL.items.forEach(x => { nNhap++; const W = `Nhập ${x.file || ''}`; x.r.errs.forEach(e => err(W, e)); });
const walkStr = (w, v) => { if (typeof v === 'string') checkStr(w, v); else if (v && typeof v === 'object') Object.values(v).forEach(y => walkStr(w, y)); };
if (ctx.Van) ctx.Van.list().forEach(e => walkStr(`Ngữ văn đề ${e.ma}`, e));
if (ctx.OnTap) ctx.OnTap.list().forEach(e => walkStr(`Phiếu ôn tập ${e.ma}`, e));

// 2d) Bài giảng – luyện tập online: mục lục SGK KNTT đủ bài, đánh số liên tục; mỗi bài học trỏ đúng bài trong mục lục.
const BH = ctx.BaiHoc, SO_BAI = { 9: 32, 10: 27, 11: 33, 12: 19 };
if (!BH) err('baihoc.js', 'không nạp được BaiHoc');
else {
  BH.LOP.forEach(l => {
    const a = BH.all(l);
    if (a.length !== SO_BAI[l]) err(`Mục lục Toán ${l}`, `có ${a.length} bài, SGK KNTT có ${SO_BAI[l]} bài`);
    a.forEach((b, i) => { if (b.so !== i + 1) err(`Mục lục Toán ${l}`, `bài thứ ${i + 1} đánh số ${b.so}`); if (!b.ten) err(`Mục lục Toán ${l}`, `Bài ${b.so} thiếu tên`); });
  });
  BH.list().forEach(e => {
    const W = `Bài giảng Toán ${e.lop} – Bài ${e.bai}`;
    if (!BH.baiOf(e.lop, e.bai)) err(W, 'không có trong mục lục');
    if (e.giang.length < 2 || e.can_nho.length < 3 || e.tn.length < 4 || !e.ds.length || !e.tln.length) err(W, 'thiếu bài giảng, cần nhớ hoặc câu luyện tập');
    e.tn.forEach((q, i) => { if (q.a.length !== 4 || new Set(q.a).size !== 4) err(W, `trắc nghiệm ${i + 1}: cần 4 phương án khác nhau`); });
    e.ds.forEach((q, i) => { if (q.y.length !== 4 || q.y.some(y => typeof y[1] !== 'boolean')) err(W, `đúng – sai ${i + 1}: cần 4 ý có kết luận Đúng/Sai`); });
    e.tln.forEach((q, i) => { if (isNaN(BH.numOf(q.ans))) err(W, `trả lời ngắn ${i + 1}: đáp số "${q.ans}" không phải số`); });
    walkStr(W, e);
  });
  // Trình chiếu, trò chơi HTML gắn vào bài: tệp có thật trong tuong-tac/, bài có trong mục lục; mọi tệp trong tuong-tac/ đều được gắn.
  const dung = new Set();
  Object.entries(BH.TN).forEach(([k, arr]) => { const [l, b] = k.split('-').map(Number);
    if (!BH.baiOf(l, b)) err(`Tài nguyên Toán ${l} – Bài ${b}`, 'bài không có trong mục lục');
    arr.forEach(t => { if (!t.ten || !t.file) err(`Tài nguyên Toán ${l} – Bài ${b}`, 'thiếu ten hoặc file'); else { dung.add(t.file); if (!fs.existsSync(path.join(ROOT, t.file))) err(`Tài nguyên Toán ${l} – Bài ${b}`, `không có tệp ${t.file}`); } }); });
  if (fs.existsSync(path.join(ROOT, 'tuong-tac'))) fs.readdirSync(path.join(ROOT, 'tuong-tac')).filter(f => f.endsWith('.html')).forEach(f => { if (!dung.has('tuong-tac/' + f)) err('tuong-tac/' + f, 'chưa gắn vào bài nào (data/bai-hoc/tai-nguyen.js)'); });
  Object.values(BH.LIEN_9).forEach(id => { if (!ids.has(id)) err('baihoc.js LIEN_9', `liên kết tới chủ đề vào 10 không có: ${id}`); });
}

// 3) Liên kết trong app.js trỏ tới chủ đề có thật.
const app = fs.readFileSync(path.join(ROOT, 'assets/js/app.js'), 'utf8');
const used = new Set([...app.matchAll(/\[('[a-z0-9-]+'(?:,\s*'[a-z0-9-]+')*)\]\]/g)].flatMap(m => m[1].split(',').map(s => s.trim().replace(/'/g, ''))));
[...app.matchAll(/, '([a-z0-9-]+)'\]/g)].forEach(m => { if (m[1]) used.add(m[1]); });
used.forEach(id => { if (id && !/^lop\d+$/.test(id) && !ids.has(id)) err('app.js', `liên kết tới chủ đề không có: ${id}`); });

console.log(`Ôn thi vào 10: ${T.length} chủ đề, ${sum(T.map(t => t.quiz.length))} câu trắc nghiệm, ${sum(T.map(t => t.models.length))} bài mẫu, ${sum(T.map(t => t.practice.length))} bài tự luyện, ${nLD} đề luyện (${ctx.LuyenDe ? ctx.LuyenDe.ids().length : 0} chủ đề).`);
console.log(`Ngữ văn vào 10: ${ctx.Van ? ctx.Van.list().length : 0} đề · phiếu ôn tập 90 phút: ${ctx.OnTap ? ctx.OnTap.list().length : 0} · dữ liệu nhập từ AI: ${nNhap} tệp.`);
if (BH) console.log(`Bài giảng – luyện tập online: mục lục ${BH.LOP.map(l => `Toán ${l} ${BH.all(l).length} bài`).join(', ')}; ${BH.list().length} bài có nội dung, ${Object.keys(BH.TN).length} bài có trình chiếu, ${sum(BH.list().map(e => e.tn.length + e.ds.length + e.tln.length))} câu luyện tập.`);
console.log(`Lớp 10–12 (VD–VDC): ${V.length} chủ đề, ${sum(V.map(t => t.dang.length))} dạng, ${sum(V.map(t => sum(t.dang.map(d => d.bt.length))))} bài tương tự.`);
warns.forEach(w => console.log('! ' + w));
if (errs.length) { errs.forEach(e => console.log(e)); console.log(`KẾT QUẢ: CHƯA ĐẠT ✗ (${errs.length} lỗi)`); process.exit(1); }
console.log('KẾT QUẢ: ĐẠT ✓');
