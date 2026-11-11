/* =====================================================================
   CORE – sổ đăng ký chủ đề và các tiện ích dùng chung.
   Nội dung chủ đề nằm trong data/cdNN-*.js, mỗi tệp gọi Topics.add({...}).
   Công thức viết LaTeX trong \( … \) (trong dòng) hoặc \[ … \] (riêng dòng).
   Trong tệp dữ liệu nên viết chuỗi bằng S`…` (= String.raw) để KHÔNG phải gấp đôi dấu \.
   ===================================================================== */
const S = String.raw;

const Topics = (() => {
  const list = [];
  const REQUIRED = ['id', 'no', 'bai', 'title', 'desc', 'remind', 'theory', 'tips', 'quiz', 'models', 'present', 'practice'];
  function add(t) {
    REQUIRED.forEach(k => { if (t[k] === undefined) console.warn('Chủ đề thiếu trường', k, t.id); });
    list.push(t);
    list.sort((a, b) => a.no - b.no);
  }
  const get = id => list.find(t => t.id === id);
  return { add, get, list };
})();

/* ---------- Tiện ích ---------- */
const U = (() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  // Lưu trữ an toàn (trình duyệt chặn localStorage thì vẫn chạy).
  const KEY = k => `${(window.CONFIG && CONFIG.storeKey) || 'vao10'}:${k}`;
  function get(k, d) { try { const v = localStorage.getItem(KEY(k)); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(KEY(k), JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }

  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // Số điểm kiểu Việt Nam: 0.25 → "0,25".
  const pt = x => (Math.round(x * 100) / 100).toString().replace('.', ',');
  const sum = arr => arr.reduce((s, x) => s + x, 0);

  // HTML có công thức → văn bản thuần cho prompt AI: \( \) → $ $, bỏ thẻ, giữ xuống dòng.
  function plain(html) {
    let s = String(html)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|tr|h\d)>/gi, '\n')
      .replace(/<li[^>]*>/gi, '- ')
      .replace(/<td[^>]*>/gi, ' | ')
      .replace(/<sup>(.*?)<\/sup>/gi, '^$1')
      .replace(/<[^>]+>/g, '')
      .replace(/\\\(\s*/g, '$').replace(/\s*\\\)/g, '$')
      .replace(/\\\[\s*/g, '$$$$').replace(/\s*\\\]/g, '$$$$');
    const t = document.createElement('textarea'); t.innerHTML = s; s = t.value;
    return s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', '');
      t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
      t.remove(); return ok;
    }
  }

  function toast(msg) {
    let el = $('#toast'); if (!el) { el = h('<div id="toast" role="status" aria-live="polite"></div>'); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // Dòng tên in ở đầu mọi phiếu, đề PDF (sửa ở config.js → tenPhieu)
  const tenPhieu = () => (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.tenPhieu) || 'LỚP TOÁN – THẦY VŨ TIẾN LỰC';

  // Kiểu in dùng chung mọi phiếu, đề (trừ Sổ tay – có kiểu in riêng): 0 chuẩn · 1 tiết kiệm · 2 siêu tiết kiệm.
  // Đặt lớp in-eco (và in-eco2) trên <html>; CSS mục "In tiết kiệm" lo phần còn lại, xem trước trên màn hình cũng đổi theo.
  // Tiết kiệm: chữ 10, dòng sát, lề hẹp, các phần in liền · Siêu tiết kiệm: thêm bỏ khung ô li, dòng kẻ (làm ra giấy riêng)
  const KIEU_IN = ['Chuẩn – chữ 12', 'Tiết kiệm – chữ 10, giữ chỗ làm', 'Siêu tiết kiệm – chữ 10, bỏ chỗ làm'];
  const kieuIn = () => { const v = +get('in:kieu', 0); return v === 1 || v === 2 ? v : 0; };
  function apKieuIn(v) {
    const r = document.documentElement; if (!r) return;
    r.classList.toggle('in-eco', v > 0); r.classList.toggle('in-eco2', v === 2);
  }
  const kieuInHTML = () => `<label class="tog kieu-in">Kiểu in <select class="js-kieu-in" aria-label="Kiểu in">${KIEU_IN.map((x, i) => `<option value="${i}" ${kieuIn() === i ? 'selected' : ''}>${x}</option>`).join('')}</select></label>`;
  if (typeof document !== 'undefined' && document.addEventListener) {
    apKieuIn(kieuIn());
    document.addEventListener('change', e => {
      if (!e.target || !e.target.classList || !e.target.classList.contains('js-kieu-in')) return;
      const v = +e.target.value; set('in:kieu', v); apKieuIn(v);
      document.querySelectorAll('.js-kieu-in').forEach(x => { if (x !== e.target) x.value = String(v); });
      document.dispatchEvent(new CustomEvent('kieu-in', { detail: v }));
    });
  }
  return { esc, $, $$, h, get, set, shuffle, pt, sum, plain, copy, toast, tenPhieu, kieuIn, kieuInHTML };
})();
