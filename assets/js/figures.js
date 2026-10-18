/* =====================================================================
   FIGURES – hình vẽ SVG (trả về chuỗi). Màu lấy từ class f-* trong style.css
   nên tự đổi theo chế độ tối và in ra đen trắng.
   - Fig.parab({...})  hệ trục + parabol y = ax² (+ đường thẳng, các điểm)
   - Fig.geo({...})    hình phẳng: điểm, đoạn, đường tròn, góc vuông (toạ độ thực, y hướng lên)
   - Fig.solid(kind)   hình khối: 'tru', 'non', 'cau', 'kem', 'coc-bi'
   ===================================================================== */
const Fig = (() => {
  const f2 = x => Math.round(x * 100) / 100;
  const num = x => String(x).replace('.', ',').replace('-', '−');

  /* ---------- Parabol ---------- */
  function parab(o) {
    const a = o.a, [x0, x1] = o.xr || [-5, 5], [y0, y1] = o.yr || [-1, 9];
    const W = o.w || 300, u = W / (x1 - x0), H = f2((y1 - y0) * u);
    const X = x => f2((x - x0) * u), Y = y => f2((y1 - y) * u);
    let s = `<svg class="fig" viewBox="-14 -14 ${W + 28} ${H + 28}" role="img" aria-label="${o.label || 'Đồ thị'}">`;
    // lưới
    s += '<g class="f-grid">';
    for (let x = Math.ceil(x0); x <= x1; x++) s += `<line x1="${X(x)}" y1="0" x2="${X(x)}" y2="${H}"/>`;
    for (let y = Math.ceil(y0); y <= y1; y++) s += `<line x1="0" y1="${Y(y)}" x2="${W}" y2="${Y(y)}"/>`;
    s += '</g>';
    // trục
    s += `<g class="f-axis"><line x1="0" y1="${Y(0)}" x2="${W + 8}" y2="${Y(0)}"/><line x1="${X(0)}" y1="${H}" x2="${X(0)}" y2="-8"/>`;
    s += `<path d="M${W + 8} ${Y(0)}l-7 -4v8z" class="f-fill"/><path d="M${X(0)} -8l-4 7h8z" class="f-fill"/></g>`;
    s += `<text class="f-lab" x="${W + 4}" y="${Y(0) + 16}">x</text><text class="f-lab" x="${X(0) + 8}" y="0">y</text>`;
    s += `<text class="f-lab" x="${X(0) - 14}" y="${Y(0) + 15}">O</text>`;
    // vạch số
    (o.ticksX || []).forEach(x => { s += `<line class="f-axis" x1="${X(x)}" y1="${Y(0) - 3}" x2="${X(x)}" y2="${Y(0) + 3}"/><text class="f-num" x="${X(x)}" y="${Y(0) + 15}" text-anchor="middle">${num(x)}</text>`; });
    (o.ticksY || []).forEach(y => { s += `<line class="f-axis" x1="${X(0) - 3}" y1="${Y(y)}" x2="${X(0) + 3}" y2="${Y(y)}"/><text class="f-num" x="${X(0) - 6}" y="${Y(y) + 4}" text-anchor="end">${num(y)}</text>`; });
    // parabol
    let d = '';
    for (let i = 0; i <= 200; i++) {
      const x = x0 + (x1 - x0) * i / 200, y = a * x * x;
      if (y < y0 - 0.5 || y > y1 + 0.5) continue;
      d += (d ? 'L' : 'M') + X(x) + ' ' + Y(y);
    }
    s += `<path class="f-curve" d="${d}"/>`;
    if (o.line) {
      const { m, n } = o.line;
      s += `<line class="f-line2" x1="${X(x0)}" y1="${Y(m * x0 + n)}" x2="${X(x1)}" y2="${Y(m * x1 + n)}"/>`;
      if (o.lineLabel) s += `<text class="f-lab f-acc" x="${X(o.lineLabel[0])}" y="${Y(o.lineLabel[1])}">${o.lineLabel[2]}</text>`;
    }
    (o.pts || []).forEach(([x, y, lab, dx = 6, dy = -6]) => {
      s += `<line class="f-dash" x1="${X(x)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(0)}"/><line class="f-dash" x1="${X(x)}" y1="${Y(y)}" x2="${X(0)}" y2="${Y(y)}"/>`;
      s += `<circle class="f-dot" cx="${X(x)}" cy="${Y(y)}" r="3.6"/>`;
      if (lab) s += `<text class="f-lab" x="${X(x) + dx}" y="${Y(y) + dy}">${lab}</text>`;
    });
    if (o.name) s += `<text class="f-lab f-acc" x="${X(o.name[0])}" y="${Y(o.name[1])}">${o.name[2]}</text>`;
    return s + '</svg>';
  }

  /* ---------- Hình phẳng ---------- */
  function geo(o) {
    const P = o.pts, names = Object.keys(P);
    const xs = [], ys = [];
    names.forEach(k => { xs.push(P[k][0]); ys.push(P[k][1]); });
    (o.circles || []).forEach(c => { const [cx, cy] = typeof c.c === 'string' ? P[c.c] : c.c; xs.push(cx - c.r, cx + c.r); ys.push(cy - c.r, cy + c.r); });
    const mx = Math.min(...xs), Mx = Math.max(...xs), my = Math.min(...ys), My = Math.max(...ys);
    const W = o.w || 300, pad = 26, u = (W - 2 * pad) / (Mx - mx || 1), H = f2((My - my) * u + 2 * pad);
    const X = x => f2(pad + (x - mx) * u), Y = y => f2(pad + (My - y) * u);
    const at = k => (Array.isArray(k) ? k : P[k]);
    let s = `<svg class="fig" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.label || 'Hình vẽ'}">`;
    (o.fill || []).forEach(f => { s += `<path class="f-shade" d="${f(X, Y, P, u)}"/>`; });
    (o.circles || []).forEach(c => { const [cx, cy] = typeof c.c === 'string' ? P[c.c] : c.c; s += `<circle class="${c.dash ? 'f-dash' : 'f-stroke'}" cx="${X(cx)}" cy="${Y(cy)}" r="${f2(c.r * u)}" fill="none"/>`; });
    const seg = (cls, list) => (list || '').split(/\s+/).filter(Boolean).forEach(pq => {
      const [p, q] = pq.length === 2 ? [pq[0], pq[1]] : pq.split('-');
      const A = at(p), B = at(q);
      s += `<line class="${cls}" x1="${X(A[0])}" y1="${Y(A[1])}" x2="${X(B[0])}" y2="${Y(B[1])}"/>`;
    });
    seg('f-stroke', o.segs); seg('f-dash', o.dash); seg('f-line2', o.acc);
    // góc vuông: [P, đỉnh, Q]
    (o.rights || []).forEach(([p, v, q]) => {
      const V = at(v), A = at(p), B = at(q), k = (o.rs || 0.22) * (o.rsUnit || 1);
      const ua = [A[0] - V[0], A[1] - V[1]], ub = [B[0] - V[0], B[1] - V[1]];
      const la = Math.hypot(...ua), lb = Math.hypot(...ub);
      const a1 = [V[0] + ua[0] / la * k, V[1] + ua[1] / la * k], b1 = [V[0] + ub[0] / lb * k, V[1] + ub[1] / lb * k];
      const c1 = [a1[0] + ub[0] / lb * k, a1[1] + ub[1] / lb * k];
      s += `<path class="f-thin" d="M${X(a1[0])} ${Y(a1[1])}L${X(c1[0])} ${Y(c1[1])}L${X(b1[0])} ${Y(b1[1])}" fill="none"/>`;
    });
    // điểm và nhãn
    const cx = names.reduce((t, k) => t + P[k][0], 0) / names.length, cy = names.reduce((t, k) => t + P[k][1], 0) / names.length;
    const dots = (o.dots || '').split(/\s+/).filter(Boolean);
    names.forEach(k => {
      if ((o.hide || '').split(/\s+/).includes(k)) return;
      const [x, y] = P[k];
      let dx, dy;
      if (o.lab && o.lab[k]) [dx, dy] = o.lab[k];
      else { const vx = x - cx, vy = y - cy, l = Math.hypot(vx, vy) || 1; dx = vx / l * 14; dy = -vy / l * 14; }
      if (dots.includes(k)) s += `<circle class="f-dot" cx="${X(x)}" cy="${Y(y)}" r="2.8"/>`;
      s += `<text class="f-lab" x="${f2(X(x) + dx)}" y="${f2(Y(y) + dy + 5)}" text-anchor="middle">${k}</text>`;
    });
    (o.texts || []).forEach(([x, y, t]) => { s += `<text class="f-num" x="${X(x)}" y="${Y(y)}" text-anchor="middle">${t}</text>`; });
    return s + '</svg>';
  }

  /* ---------- Hình khối ---------- */
  function solid(kind, t = {}) {
    const lab = (x, y, s, a = 'middle') => `<text class="f-num" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
    let s = '<svg class="fig fig-sm" viewBox="0 0 240 230" role="img" aria-label="Hình khối">';
    if (kind === 'tru') {
      s += '<ellipse class="f-stroke" cx="120" cy="40" rx="70" ry="18" fill="none"/>';
      s += '<path class="f-stroke" d="M50 40V190M190 40V190" fill="none"/>';
      s += '<path class="f-stroke" d="M50 190A70 18 0 0 0 190 190" fill="none"/><path class="f-dash" d="M50 190A70 18 0 0 1 190 190" fill="none"/>';
      s += '<line class="f-dash" x1="120" y1="40" x2="120" y2="190"/><line class="f-dash" x1="120" y1="190" x2="190" y2="190"/>';
      s += lab(155, 184, t.r || 'r') + lab(128, 120, t.h || 'h', 'start');
    } else if (kind === 'non') {
      s += '<path class="f-stroke" d="M120 20L50 190M120 20L190 190" fill="none"/>';
      s += '<path class="f-stroke" d="M50 190A70 18 0 0 0 190 190" fill="none"/><path class="f-dash" d="M50 190A70 18 0 0 1 190 190" fill="none"/>';
      s += '<line class="f-dash" x1="120" y1="20" x2="120" y2="190"/><line class="f-dash" x1="120" y1="190" x2="190" y2="190"/>';
      s += lab(155, 184, t.r || 'r') + lab(126, 120, t.h || 'h', 'start') + lab(170, 100, t.l || 'l', 'start');
    } else if (kind === 'cau') {
      s += '<circle class="f-stroke" cx="120" cy="115" r="85" fill="none"/>';
      s += '<path class="f-stroke" d="M35 115A85 22 0 0 0 205 115" fill="none"/><path class="f-dash" d="M35 115A85 22 0 0 1 205 115" fill="none"/>';
      s += '<circle class="f-dot" cx="120" cy="115" r="3"/><line class="f-dash" x1="120" y1="115" x2="205" y2="115"/>';
      s += lab(162, 108, t.r || 'R');
    } else if (kind === 'kem') {
      s += '<path class="f-stroke" d="M60 95A60 60 0 0 1 180 95" fill="none"/>';
      s += '<path class="f-stroke" d="M60 95A60 14 0 0 0 180 95" fill="none"/><path class="f-dash" d="M60 95A60 14 0 0 1 180 95" fill="none"/>';
      s += '<path class="f-stroke" d="M60 95L120 220L180 95" fill="none"/>';
      s += '<line class="f-dash" x1="120" y1="95" x2="120" y2="220"/><line class="f-dash" x1="120" y1="95" x2="180" y2="95"/>';
      s += lab(150, 89, t.r || 'r') + lab(126, 165, t.h || 'h', 'start');
    } else if (kind === 'coc-bi') {
      s += '<ellipse class="f-stroke" cx="120" cy="30" rx="70" ry="14" fill="none"/>';
      s += '<path class="f-stroke" d="M50 30V200M190 30V200M50 200A70 14 0 0 0 190 200" fill="none"/>';
      s += '<path class="f-shade" d="M50 90A70 14 0 0 0 190 90V200A70 14 0 0 1 50 200Z"/>';
      s += '<ellipse class="f-thin" cx="120" cy="90" rx="70" ry="14" fill="none"/>';
      [[90, 170], [140, 178], [116, 140]].forEach(([x, y]) => { s += `<circle class="f-stroke" cx="${x}" cy="${y}" r="18" fill="none"/>`; });
    }
    return s + '</svg>';
  }

  /* ---------- Mặt phẳng toạ độ: đường thẳng ax + by = c, miền tô, các đỉnh ----------
     o = { xr:[x0,x1], yr:[y0,y1], w, step (vạch số cách nhau), lines:[{a,b,c,lab:[x,y,'d1']}],
           poly:[[x,y]…] (miền nghiệm, tô nhạt), pts:[[x,y,'A',dx,dy]…] } */
  function plane(o) {
    const [x0, x1] = o.xr, [y0, y1] = o.yr, W = o.w || 300, u = W / (x1 - x0), H = f2((y1 - y0) * u);
    const X = x => f2((x - x0) * u), Y = y => f2((y1 - y) * u), st = o.step || 1;
    let s = `<svg class="fig" viewBox="-16 -16 ${W + 32} ${H + 32}" role="img" aria-label="${o.label || 'Miền nghiệm'}">`;
    s += '<g class="f-grid">';
    for (let x = Math.ceil(x0 / st) * st; x <= x1; x += st) s += `<line x1="${X(x)}" y1="0" x2="${X(x)}" y2="${H}"/>`;
    for (let y = Math.ceil(y0 / st) * st; y <= y1; y += st) s += `<line x1="0" y1="${Y(y)}" x2="${W}" y2="${Y(y)}"/>`;
    s += '</g>';
    if (o.poly) s += `<path class="f-shade" d="M${o.poly.map(([x, y]) => `${X(x)} ${Y(y)}`).join('L')}Z"/>`;
    s += `<g class="f-axis"><line x1="0" y1="${Y(0)}" x2="${W + 8}" y2="${Y(0)}"/><line x1="${X(0)}" y1="${H}" x2="${X(0)}" y2="-8"/>`;
    s += `<path d="M${W + 8} ${Y(0)}l-7 -4v8z" class="f-fill"/><path d="M${X(0)} -8l-4 7h8z" class="f-fill"/></g>`;
    s += `<text class="f-lab" x="${W + 4}" y="${Y(0) + 16}">x</text><text class="f-lab" x="${X(0) + 8}" y="-2">y</text><text class="f-lab" x="${X(0) - 14}" y="${Y(0) + 15}">O</text>`;
    for (let x = Math.ceil(x0 / st) * st; x <= x1 - st / 2; x += st) if (x) s += `<text class="f-num" x="${X(x)}" y="${Y(0) + 15}" text-anchor="middle">${num(x)}</text>`;
    for (let y = Math.ceil(y0 / st) * st; y <= y1 - st / 2; y += st) if (y) s += `<text class="f-num" x="${X(0) - 6}" y="${Y(y) + 4}" text-anchor="end">${num(y)}</text>`;
    (o.lines || []).forEach(({ a, b, c, lab }) => {
      let p;
      if (Math.abs(b) < 1e-12) p = [[c / a, y0], [c / a, y1]];
      else p = [[x0, (c - a * x0) / b], [x1, (c - a * x1) / b]];
      s += `<line class="f-line2" x1="${X(p[0][0])}" y1="${Y(p[0][1])}" x2="${X(p[1][0])}" y2="${Y(p[1][1])}"/>`;
      if (lab) s += `<text class="f-lab f-acc" x="${X(lab[0])}" y="${Y(lab[1])}">${lab[2]}</text>`;
    });
    (o.pts || []).forEach(([x, y, lab, dx = 6, dy = -6]) => {
      s += `<circle class="f-dot" cx="${X(x)}" cy="${Y(y)}" r="3.4"/>`;
      if (lab) s += `<text class="f-lab" x="${X(x) + dx}" y="${Y(y) + dy}">${lab}</text>`;
    });
    return s + '</svg>';
  }

  /* ---------- Biểu đồ Ven: 2 hoặc 3 tập ----------
     o = { sets:['A','B'(,'C')], vals:{ a:'..', b:'..', ab:'..', … , out:'..' } (số ghi trong từng miền, tuỳ chọn),
           shade:['ab', …] (các miền tô), w }. Miền: a, b, c, ab, ac, bc, abc (chỉ thuộc đúng các tập đó), out. */
  function venn(o) {
    const three = o.sets.length === 3, W = o.w || 280, H = three ? 230 : 170, r = three ? 62 : 64;
    const C = three ? { a: [W / 2 - 42, 88], b: [W / 2 + 42, 88], c: [W / 2, 158] } : { a: [W / 2 - 40, 85], b: [W / 2 + 40, 85] };
    const P = three
      ? { a: [W / 2 - 78, 70], b: [W / 2 + 78, 70], c: [W / 2, 196], ab: [W / 2, 62], ac: [W / 2 - 46, 140], bc: [W / 2 + 46, 140], abc: [W / 2, 112], out: [W - 22, 20] }
      : { a: [W / 2 - 74, 90], b: [W / 2 + 74, 90], ab: [W / 2, 90], out: [W - 22, 20] };
    const keys = Object.keys(C);
    let s = `<svg class="fig" viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ Ven">`;
    s += `<rect class="f-stroke" x="2" y="2" width="${W - 4}" height="${H - 4}" rx="8" fill="none"/>`;
    const sh = new Set(o.shade || []);
    // tô từng miền bằng mặt nạ: miền = giao các hình tròn trong khoá, trừ các hình tròn còn lại
    sh.forEach(reg => {
      const inn = reg.split(''), outs = keys.filter(k => !inn.includes(k));
      const id = 'v' + Math.random().toString(36).slice(2, 8);
      s += `<defs><mask id="${id}"><rect x="0" y="0" width="${W}" height="${H}" fill="${reg === 'out' ? '#fff' : '#000'}"/>`;
      if (reg !== 'out') s += `<circle cx="${C[inn[0]][0]}" cy="${C[inn[0]][1]}" r="${r}" fill="#fff"/>`;
      (reg === 'out' ? keys : outs).forEach(k => { s += `<circle cx="${C[k][0]}" cy="${C[k][1]}" r="${r}" fill="#000"/>`; });
      s += '</mask>';
      inn.slice(1).forEach((k, j) => { s += `<clipPath id="${id}c${j}"><circle cx="${C[k][0]}" cy="${C[k][1]}" r="${r}"/></clipPath>`; });
      s += '</defs>';
      let rect = `<rect class="f-shade" x="0" y="0" width="${W}" height="${H}" mask="url(#${id})"/>`;
      if (reg !== 'out') inn.slice(1).forEach((k, j) => { rect = `<g clip-path="url(#${id}c${j})">${rect}</g>`; });
      s += rect;
    });
    keys.forEach((k, i) => {
      s += `<circle class="f-stroke" cx="${C[k][0]}" cy="${C[k][1]}" r="${r}" fill="none"/>`;
      const lx = C[k][0] + (k === 'a' ? -r + 6 : k === 'b' ? r - 14 : r - 6), ly = C[k][1] + (k === 'c' ? r - 4 : -r + 14);
      s += `<text class="f-lab" x="${lx}" y="${ly}">${o.sets[i]}</text>`;
    });
    Object.entries(o.vals || {}).forEach(([k, v]) => { if (P[k]) s += `<text class="f-num" x="${P[k][0]}" y="${P[k][1] + 4}" text-anchor="middle">${v}</text>`; });
    return s + '</svg>';
  }

  /* ---------- Đồ thị hàm số y = f(x) (dùng cho hàm số lượng giác, mô hình thực tế) ----------
     o = { f, xr:[x0,x1], yr:[y0,y1], w, h, xt:[[giá trị, 'nhãn'], …], yt:[[giá trị,'nhãn'],…], pts:[[x,y,'nhãn',dx,dy]],
           hl:[y…] (đường ngang nét đứt), xl:'x', yl:'y' } */
  function func(o) {
    const [x0, x1] = o.xr, [y0, y1] = o.yr, W = o.w || 320, H = o.h || 180;
    const X = x => f2((x - x0) / (x1 - x0) * W), Y = y => f2((y1 - y) / (y1 - y0) * H);
    let s = `<svg class="fig" viewBox="-36 -16 ${W + 58} ${H + 34}" role="img" aria-label="${o.label || 'Đồ thị'}">`;
    const ox = x0 <= 0 && x1 >= 0 ? X(0) : 0, oy = y0 <= 0 && y1 >= 0 ? Y(0) : H;
    (o.hl || []).forEach(y => { s += `<line class="f-dash" x1="0" y1="${Y(y)}" x2="${W}" y2="${Y(y)}"/>`; });
    s += `<g class="f-axis"><line x1="0" y1="${oy}" x2="${W + 10}" y2="${oy}"/><line x1="${ox}" y1="${H}" x2="${ox}" y2="-10"/>`;
    s += `<path d="M${W + 10} ${oy}l-7 -4v8z" class="f-fill"/><path d="M${ox} -10l-4 7h8z" class="f-fill"/></g>`;
    s += `<text class="f-lab" x="${W + 6}" y="${oy + 16}">${o.xl || 'x'}</text><text class="f-lab" x="${ox + 8}" y="-4">${o.yl || 'y'}</text>`;
    (o.xt || []).forEach(([x, t]) => { s += `<line class="f-axis" x1="${X(x)}" y1="${oy - 3}" x2="${X(x)}" y2="${oy + 3}"/><text class="f-num" x="${X(x)}" y="${oy + 15}" text-anchor="middle">${t}</text>`; });
    (o.yt || []).forEach(([y, t]) => { s += `<line class="f-axis" x1="${ox - 3}" y1="${Y(y)}" x2="${ox + 3}" y2="${Y(y)}"/><text class="f-num" x="${ox - 6}" y="${Y(y) + 4}" text-anchor="end">${t}</text>`; });
    let d = '';
    for (let i = 0; i <= 300; i++) { const x = x0 + (x1 - x0) * i / 300, y = o.f(x); d += (i ? 'L' : 'M') + X(x) + ' ' + Y(y); }
    s += `<path class="f-curve" d="${d}"/>`;
    (o.pts || []).forEach(([x, y, lab, dx = 6, dy = -6]) => { s += `<circle class="f-dot" cx="${X(x)}" cy="${Y(y)}" r="3.4"/>${lab ? `<text class="f-lab" x="${X(x) + dx}" y="${Y(y) + dy}">${lab}</text>` : ''}`; });
    return s + '</svg>';
  }

  return { parab, geo, solid, plane, venn, func };
})();
