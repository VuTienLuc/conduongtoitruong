/* =====================================================================
   MATH – cấu hình MathJax 3 (bản đặt sẵn trong assets/vendor/mathjax, chạy không cần mạng)
   và tự vẽ công thức mỗi khi nội dung trang đổi. Nạp TRƯỚC tex-chtml.js.
   ===================================================================== */
window.MathJax = {
  loader: { load: [] },
  tex: { inlineMath: [['\\(', '\\)']], displayMath: [['\\[', '\\]']], processEscapes: false },
  chtml: { scale: 1.02, matchFontHeight: false, displayAlign: 'left', displayIndent: '0' },
  options: { enableMenu: false, ignoreHtmlClass: 'no-math', processHtmlClass: 'math' },
  startup: {
    typeset: false,
    ready() {
      MathJax.startup.defaultReady();
      MathJax.startup.promise.then(() => MathTS.start());
    },
  },
};

const MathTS = (() => {
  const queued = new Set(); let timer = null, busy = Promise.resolve(), started = false;
  const HAS = /\\\(|\\\[/;
  function flush() {
    timer = null;
    const nodes = [...queued]; queued.clear();
    if (!window.MathJax || !MathJax.typesetPromise) return;
    busy = busy.then(async () => {
      for (const n of nodes) {
        if (!n.isConnected || !HAS.test(n.textContent)) continue;
        try { await MathJax.typesetPromise([n]); fit(n); }
        catch (e) { if (n.isConnected) setTimeout(() => add(n), 30); }
      }
    });
  }
  // Công thức dài hơn khung (điện thoại): cho cuộn ngang riêng công thức đó, trang không bị tràn.
  function fit(root) {
    (root || document.body).querySelectorAll('mjx-container').forEach(c => {
      c.classList.remove('mjx-wide');
      const box = c.parentElement && c.parentElement.closest('li, p, div, td, th, section, article');
      const inner = c.firstElementChild, w = Math.max(c.getBoundingClientRect().width, inner ? inner.getBoundingClientRect().width : 0);
      if (box && w > box.clientWidth + 1) c.classList.add('mjx-wide');
    });
  }
  let rz = null;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => fit(document.body), 150); });
  function add(n) {
    if (!n || n.nodeType !== 1) n = n && n.parentElement;
    if (!n || n.closest('mjx-container')) return;
    queued.add(n); if (!timer) timer = setTimeout(flush, 0);
  }
  function start() {
    started = true;
    add(document.body);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(add)))
      .observe(document.body, { childList: true, subtree: true });
  }
  // Chờ vẽ xong công thức trong một vùng (dùng trước khi in). Không có MathJax thì trả về ngay.
  async function done(node) {
    for (let i = 0; i < 100 && !started; i++) await new Promise(r => setTimeout(r, 100));
    if (!window.MathJax || !MathJax.typesetPromise) return;
    await busy;
    try { await MathJax.typesetPromise([node || document.body]); fit(node); } catch (e) { /* bỏ qua */ }
  }
  return { start, typeset: add, done, fit };
})();
