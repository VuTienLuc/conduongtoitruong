#!/usr/bin/env python3
"""Tính lại ĐỘC LẬP mọi đáp số của bài mẫu, bài tự luyện và câu trắc nghiệm có số liệu.
Chạy: python3 tools/kiem-dap-so.py   (cần sympy). Sửa đề trong data/ thì sửa phép tính tương ứng ở đây."""
from fractions import Fraction as Fr
from itertools import permutations, combinations, product
import math
import sympy as sp

x, m = sp.symbols('x m')
ok_all = True


def chk(name, got, want, tol=1e-9):
    global ok_all
    good = (abs(float(got) - float(want)) < tol) if not isinstance(want, (set, tuple, list)) else (got == want)
    print(('✓' if good else '✗'), name, '→', got, '' if good else f'(mong đợi {want})')
    ok_all &= good


def roots(expr):
    return sorted(sp.solve(sp.Eq(expr, 0), x), key=lambda r: float(r))


# ---------- Chủ đề 1: parabol ----------
chk('CĐ1 mẫu: ½x² = 2x', set(roots(sp.Rational(1, 2) * x**2 - 2 * x)), {0, 4})
chk('CĐ1 mẫu: bảng y = x²/2', tuple(sp.Rational(1, 2) * v**2 for v in (-4, -2, 0, 2, 4)), (8, 2, 0, 2, 8))
chk('CĐ1 B1: −(−3)² = −9', -(-3) ** 2, -9)
chk('CĐ1 B1: −x² = −4', set(roots(-x**2 + 4)), {-2, 2})
pts = set()
for r in roots(sp.Rational(1, 4) * x**2 - x) + roots(sp.Rational(1, 4) * x**2 + x):
    pts.add((r, sp.Rational(1, 4) * r**2))
chk('CĐ1 B2: cách đều hai trục', pts, {(0, 0), (4, 4), (-4, 4)})
chk('CĐ1 B3: giao (P) và (d)', {(r, r - 4) for r in roots(-sp.Rational(1, 2) * x**2 - (x - 4))}, {(2, -2), (-4, -8)})
chk('CĐ1 quiz: a qua (2;8)', sp.Rational(8, 4), 2)

# ---------- Chủ đề 2: Viète ----------
def SP(a, b, c):
    return sp.Rational(-b, a), sp.Rational(c, a)


r = roots(2 * x**2 - 5 * x - 3)
chk('CĐ2 mẫu 1: A', sp.nsimplify(r[0]**2 + r[1]**2 - 3 * r[0] * r[1]), sp.Rational(55, 4))
r = roots(x**2 - 3 * x - 1)
for a1, a2 in ((r[0], r[1]), (r[1], r[0])):
    chk('CĐ2 mẫu 2: E (cả hai cách gán)', sp.simplify(a1**2 + 3 * a2 - a1 * a2), 11)
r = roots(x**2 - 6 * x + 4)
chk('CĐ2 B1: A', sp.simplify(r[0]**2 + r[1]**2), 28)
chk('CĐ2 B1: B', sp.simplify(1 / r[0] + 1 / r[1]), sp.Rational(3, 2))
r = roots(3 * x**2 + 4 * x - 2)
chk('CĐ2 B2: C', sp.simplify((r[0] - r[1])**2), sp.Rational(40, 9))
chk('CĐ2 B2: D', sp.simplify(r[0] / r[1] + r[1] / r[0]), sp.Rational(-14, 3))
dp = sp.expand((m + 1)**2 - (m**2 + 3))
chk('CĐ2 B3: Δ′ − (2m − 2)', sp.simplify(dp - (2 * m - 2)), 0)
sol = [s for s in sp.solve(sp.Eq((2 * (m + 1))**2 - 2 * (m**2 + 3), 22), m) if dp.subs(m, s) >= 0]
chk('CĐ2 B3: m', set(sol), {2})
chk('CĐ2 quiz: Δ của 2x²−5x−3', 25 + 24, 49)

# ---------- Chủ đề 3: xác suất ----------
om = list(permutations([1, 2, 3, 4], 2))
chk('CĐ3 mẫu: n(Ω)', len(om), 12)
chk('CĐ3 mẫu: P(A) tổng lẻ', Fr(sum((a + b) % 2 for a, b in om), len(om)), Fr(2, 3))
chk('CĐ3 mẫu: P(B) tích ⋮ 3', Fr(sum((a * b) % 3 == 0 for a, b in om), len(om)), Fr(1, 2))
chk('CĐ3 B1: P chẵn', Fr(3, 6), Fr(1, 2)); chk('CĐ3 B1: P ⋮ 3', Fr(len([v for v in range(1, 7) if v % 3 == 0]), 6), Fr(1, 3))
nam, nu = ['An', 'Bình', 'Cường'], ['Dung', 'Em']
grp = list(combinations(nam + nu, 2))
chk('CĐ3 B2: n(Ω)', len(grp), 10)
chk('CĐ3 B2: P(1 nam 1 nữ)', Fr(sum((a in nam) != (b in nam) for a, b in grp), 10), Fr(3, 5))
chk('CĐ3 B2: P(2 nữ)', Fr(sum(a in nu and b in nu for a, b in grp), 10), Fr(1, 10))
d2 = list(product(range(1, 7), repeat=2))
chk('CĐ3 B3: P(tổng ≥ 10)', Fr(sum(a + b >= 10 for a, b in d2), 36), Fr(1, 6))
chk('CĐ3 B3: P(hơn kém 2)', Fr(sum(abs(a - b) == 2 for a, b in d2), 36), Fr(2, 9))
chk('CĐ3 quiz: tổng 7', Fr(sum(a + b == 7 for a, b in d2), 36), Fr(1, 6))

# ---------- Chủ đề 4 ----------
chk('CĐ4 mẫu 1: 7π ≈', round(7 * 3.14, 2), 21.98)
chk('CĐ4 mẫu 1: tiền', round(21.98 * 150000), 3297000)
chk('CĐ4 mẫu 2: kích thước', set(roots(x * (17 - x) - 60)), {5, 12})
chk('CĐ4 B1: 20 phút = 120°', 20 / 60 * 360, 120); chk('CĐ4 B1: 20π/3 ≈', round(10 * 120 / 180 * 3.14, 2), 20.93)
chk('CĐ4 B2: 175π', sp.Rational(25**2 - 10**2, 3), 175); chk('CĐ4 B2: ≈', round(175 * 3.14, 2), 549.5)
chk('CĐ4 B3: lối đi', [r for r in roots((20 - 2 * x) * (15 - 2 * x) - 176) if 0 < r < 7.5], [2])
chk('CĐ4 quiz: viên phân', sp.pi * 4 * 90 / 360 - 2, sp.pi - 2)

# ---------- Chủ đề 5 ----------
chk('CĐ5 mẫu: V (lít)', round(0.6**2 * 1.5 * 3.14 * 1000, 1), 1695.6)
chk('CĐ5 mẫu: Sxq', round(2 * 0.6 * 1.5 * 3.14, 3), 5.652)
chk('CĐ5 B1: 4πR²', round(4 * 11**2 * 3.14, 2), 1519.76)
v = sp.Rational(1, 3) * sp.Rational(5, 2)**2 * 10 + sp.Rational(2, 3) * sp.Rational(5, 2)**3
chk('CĐ5 B2: hệ số π', v, sp.Rational(125, 4)); chk('CĐ5 B2: ≈', round(31.25 * 3.14, 1), 98.1)
chk('CĐ5 B3: nước dâng', (3 * sp.Rational(4, 3) * 8) / 16, 2)
chk('CĐ5 quiz: cầu R=3', sp.Rational(4, 3) * 27, 36)

# ---------- Chủ đề 6 ----------
X, Y = sp.symbols('X Y')
s = sp.solve([2 * X + 3 * Y - 1100000, sp.Rational(18, 10) * X + sp.Rational(24, 10) * Y - 930000], [X, Y])
chk('CĐ6 mẫu: giá áo', (s[X], s[Y]), (250000, 200000))
s = sp.solve([X + Y - 82, 3 * X + 2 * Y - 207], [X, Y]); chk('CĐ6 B1', (s[X], s[Y]), (43, 39))
s = sp.solve([2 * (X + Y) + 3 * (X - Y) - 97, 3 * (X + Y) + 2 * (X - Y) - 103], [X, Y]); chk('CĐ6 B2', (s[X], s[Y]), (20, 3))
s = sp.solve([1 / X + 1 / Y - sp.Rational(1, 12), 6 / X + 15 / Y - 1], [X, Y], dict=True); chk('CĐ6 B3', (s[0][X], s[0][Y]), (36, 18))
chk('CĐ6 quiz: giảm 20% rồi 10%', 0.8 * 0.9, 0.72)

# ---------- Hình học: kiểm bằng toạ độ ----------
def d(P, Q): return math.dist(P, Q)


R = 2.0; O = (0, 0); M = (5, 0); A = (0.8, math.sqrt(4 - 0.64)); H = (0.8, 0)
chk('CĐ7 mẫu: MA ⊥ OA', (M[0] - A[0]) * (O[0] - A[0]) + (M[1] - A[1]) * (O[1] - A[1]), 0, 1e-9)
chk('CĐ7 mẫu: MA² = MH·MO', d(M, A)**2, d(M, H) * d(M, O), 1e-9)
C = (-1, math.sqrt(3)); B = (2, 0); D = (-2, 2 * math.sqrt(3) * 2 / 3)
chk('CĐ7 B3: D thẳng hàng B, C', (C[0] - B[0]) * (D[1] - B[1]) - (C[1] - B[1]) * (D[0] - B[0]), 0, 1e-9)
chk('CĐ7 B3: DA² = DC·DB', d(D, (-2, 0))**2, d(D, C) * d(D, B), 1e-9)
# Chủ đề 9
Rr = 1.0; s3 = math.sqrt(3)
chk('CĐ9 mẫu: phần ngoài (R=1)', math.pi - s3 / 2, (2 * math.pi - s3) / 2)
chk('CĐ9 mẫu: viên phân (R=1)', math.pi / 6 - s3 / 4, (2 * math.pi - 3 * s3) / 12)
chk('CĐ9 B1: ≈', round(12 * 3.14 - 9 * 1.732, 2), 22.09)
chk('CĐ9 B2: MA (R=1)', math.sqrt(4 - 1), s3); chk('CĐ9 B2: ∠AOM', math.degrees(math.acos(1 / 2)), 60, 1e-9)
chk('CĐ9 B3: AH (R=1)', 1 * s3 / 2, s3 / 2); chk('CĐ9 B3: tỉ số S', (0.5 * 0.5 * s3 / 2) / (0.5 * 1 * s3), 0.25)
# Chủ đề 10
chk('CĐ10 mẫu 1: OH', math.sqrt(25 - 16), 3); chk('CĐ10 mẫu 2: BH', 36 / 10, 3.6); chk('CĐ10 mẫu 2: AH', 6 * 8 / 10, 4.8)
chk('CĐ10 B1: OH', math.sqrt(169 - 144), 5)
sa, ca = 3 / 5, 4 / 5
chk('CĐ10 B2: P', (2 * sa + ca) / (sa - 2 * ca), -2)
chk('CĐ10 B3: BH', 81 / 15, 5.4); chk('CĐ10 B3: AH', 9 * 12 / 15, 7.2); chk('CĐ10 B3: HC', 144 / 15, 9.6)

# ---------- Lớp 10 · Chương II · GTLN, GTNN trên miền nghiệm (data/lop10/c2-toi-uu-mien-nghiem.js) ----------
from itertools import combinations as _cb


def dinh(cons):  # cons: (a, b, c) nghĩa là a·x + b·y ≤ c
    V = []
    for (a1, b1, c1), (a2, b2, c2) in _cb(cons, 2):
        d = a1 * b2 - a2 * b1
        if d == 0: continue
        px, py = Fr(c1 * b2 - c2 * b1, d), Fr(a1 * c2 - a2 * c1, d)
        if all(a * px + b * py <= c for a, b, c in cons) and (px, py) not in V: V.append((px, py))
    return V


def toi_uu(cons, f):
    vals = [(f(px, py), px, py) for px, py in dinh(cons)]
    return max(vals), min(vals)


X0, Y0 = (-1, 0, 0), (0, -1, 0)
mx, mn = toi_uu([X0, Y0, (1, 1, 6), (1, 2, 8)], lambda a, b: 3 * a + 4 * b)
chk('L10 VD1: max F', mx[0], 20); chk('L10 VD1: tại (4;2)', (mx[1], mx[2]), (4, 2)); chk('L10 VD1: min F', mn[0], 0)
mx, _ = toi_uu([X0, Y0, (2, 1, 8), (1, 3, 9)], lambda a, b: 2 * a + 3 * b)
chk('L10 Bài 1: max', mx[0], 12); chk('L10 Bài 1: tại (3;2)', (mx[1], mx[2]), (3, 2))
mx, mn = toi_uu([(-1, 0, -1), (0, -1, -1), (1, 1, 5)], lambda a, b: a - 2 * b)
chk('L10 Bài 2: max', mx[0], 2); chk('L10 Bài 2: min', mn[0], -7); chk('L10 Bài 2: min tại (1;4)', (mn[1], mn[2]), (1, 4))
mm = [mv for mv in [Fr(k, 4) for k in range(-40, 41)] if toi_uu([X0, Y0, (1, 1, 4)], lambda a, b: a + mv * b)[0][0] == 8]
chk('L10 Bài 3: m (quét m = k/4)', mm, [2])
mx, _ = toi_uu([X0, Y0, (2, 1, 10), (1, 2, 8)], lambda a, b: 40 * a + 30 * b)
chk('L10 VD2: lãi max', mx[0], 220); chk('L10 VD2: tại (4;2)', (mx[1], mx[2]), (4, 2))
_, mn = toi_uu([(-3, -1, -9), (-1, -2, -8), (1, 0, 5), (0, 1, 5), X0, Y0], lambda a, b: 20 * a + 25 * b)
chk('L10 Bài 4: chi phí min', mn[0], 115); chk('L10 Bài 4: tại (2;3)', (mn[1], mn[2]), (2, 3))
_, mn = toi_uu([(-3, -2, -14), (-1, -2, -12), (1, 0, 6), (0, 1, 6), X0, Y0], lambda a, b: 4 * a + 3 * b)
chk('L10 Bài 5: min liên tục 20,5 tại (1; 5,5)', (mn[0], mn[1], mn[2]), (Fr(41, 2), 1, Fr(11, 2)))
nguyen = min((4 * a + 3 * b, a, b) for a in range(7) for b in range(7) if 3 * a + 2 * b >= 14 and a + 2 * b >= 12)
chk('L10 Bài 5: nghiệm nguyên', nguyen, (22, 1, 6))


# L10 Chương II – bài bổ sung
mx, mn = toi_uu([(-1, -1, -4), (1, -2, 1), (0, 1, 3)], lambda a, b: 3 * a - 4 * b)
chk('L10 C2 m nhỏ nhất (= −min(3x − 4y))', -mn[0], 9)
mx, _ = toi_uu([X0, Y0, (2, 1, 160), (1, 2, 110)], lambda a, b: 45 * a + 50 * b)
chk('L10 C2 trà sữa: max', mx[0], 4150); chk('L10 C2 trà sữa: tại (70;20)', (mx[1], mx[2]), (70, 20))
mx, _ = toi_uu([(-1, 3, 0), Y0, (-1, -1, -1200), (1, 1, 1500)], lambda a, b: Fr(165) - Fr(5, 100) * a - Fr(3, 100) * b)
chk('L10 C2 trái phiếu: lãi max', mx[0], 111); chk('L10 C2 trái phiếu: (900;300)', (mx[1], mx[2]), (900, 300))

# ---------- Lớp 10 · Chương I · Biểu đồ Ven (data/lop10/c1-tap-hop-ven.js): vét cạn trên các miền Ven ----------
chk('Ven VD hai tập: không thích môn nào', 45 - (25 + 20 - 8), 8); chk('Ven VD: đúng một môn', (25 - 8) + (20 - 8), 29)
chk('Ven bài 1: cả hai', 26 + 21 - 40, 7); chk('Ven bài 2: cả hai', 70 + 65 - 105, 30)
aa = [a for a in range(0, 50) if 2 * a + (a + 6) - (a - 3) + 9 == 42 and 0 <= a - 3 <= min(2 * a, a + 6)]
chk('Ven bài 3: a', aa, [12]); chk('Ven bài 3: đúng một môn', (24 - 9) + (18 - 9), 24)
def ven3(A, B, C, AB, AC, BC, ABC):
    ab, ac, bc = AB - ABC, AC - ABC, BC - ABC
    a, b, c = A - ab - ac - ABC, B - ab - bc - ABC, C - ac - bc - ABC
    assert min(a, b, c, ab, ac, bc) >= 0
    return a + b + c, ab + ac + bc, a + b + c + ab + ac + bc + ABC
mot, hai, hop = ven3(20, 18, 15, 7, 6, 5, 3); chk('Ven VD ba tập: không chơi', 40 - hop, 2); chk('Ven VD ba tập: đúng một', mot, 26)
# bài 4: vét cạn mọi cách chia giao từng đôi để chắc chắn số "đúng hai" không phụ thuộc cách chia
dh = {ven3(22, 20, 18, x, y, 24 - x - y, 5)[1] for x in range(5, 20) for y in range(5, 20) if 24 - x - y >= 5 and ven3(22, 20, 18, x, y, 24 - x - y, 5)[2] == 41 if min(22 - x - y + 5, 20 - x - (24 - x - y) + 5, 18 - y - (24 - x - y) + 5) >= 0}
chk('Ven bài 4: đúng hai môn', dh, {9})
mot, _, hop = ven3(32, 26, 22, 14, 12, 10, 6); chk('Ven bài 5: S = m + n + p', mot, 26); chk('Ven bài 5: số thành viên', hop, 50)
mm = [k for k in range(-20, 20) if (40 + k) + (35 + k) + 30 - (12 + 2 * k) - 10 - (8 + k) + 4 == 75]
chk('Ven bài 6: m', mm, [4]); mot, _, hop = ven3(44, 39, 30, 20, 10, 12, 4); chk('Ven bài 6: đúng một môn', mot, 41); chk('Ven bài 6: hợp', hop, 75)

# ---------- Lớp 10 · Chương I · Khoảng, đoạn có tham số (data/lop10/c1-tap-hop-tham-so.js): quét m trên lưới ----------
def giao_rong(a, ai, b, bi, c, ci, d, di):  # [a,b] với cờ có lấy đầu mút; kiểm tra A ∩ B = ∅ bằng quét điểm hữu tỉ
    pts = {a, b, c, d} | {Fr(a + b, 2), Fr(c + d, 2)} | {max(a, c), min(b, d), Fr(max(a, c) + min(b, d), 2)}
    inA = lambda t: (a < t or (ai and t == a)) and (t < b or (bi and t == b))
    inB = lambda t: (c < t or (ci and t == c)) and (t < d or (di and t == d))
    return not any(inA(t) and inB(t) for t in pts)
ms = [Fr(k, 4) for k in range(-40, 41)]
chk('Tham số VD: A ∩ B ≠ ∅ ⇔ −4 < m < 5', all((not giao_rong(m_, 0, m_ + 3, 0, -1, 1, 5, 1)) == (-4 < m_ < 5) for m_ in ms), 1)
chk('Tham số VD: số nguyên', sum(1 for k in range(-20, 20) if not giao_rong(k, 0, k + 3, 0, -1, 1, 5, 1)), 8)
chk('Tham số bài 1: số nguyên m', sum(1 for k in range(-2026, 2027) if giao_rong(k, 0, k + 2, 1, -3, 1, 4, 1)), 4044)
cnt = sum(1 for k in range(-100, 7) if all(not (Fr(-10**6) < t < -2 or t >= 4) for t in [Fr(k - 1), Fr(k + 5, 2)]))
chk('Tham số bài 2: số nguyên m', cnt, 4)
def so_nguyen(mv): return len({k for k in range(1, 6) if k >= mv} | {1, 3})
chk('Tham số bài 3: m nguyên có đúng 4 số nguyên', [k for k in range(-5, 10) if so_nguyen(k) == 4], [3, 4])
chk('Tham số VD2: A ⊂ B ⇔ m < 5', all(((m_ + 1 > 2 * m_ - 1) or (m_ + 1 > -2 and 2 * m_ - 1 < 9)) == (m_ < 5) for m_ in ms), 1)
chk('Tham số bài 4: số nguyên m', sum(1 for k in range(0, 3000) if k > 2 and 3 * k + 1 <= 2027), 673)
chk('Tham số bài 5: 1 < m ≤ 4', all((m_ - 2 > -1 and m_ + 3 <= 7) == (1 < m_ <= 4) for m_ in ms), 1)
def con6(m_):
    if 2 * m_ - 1 > m_ + 3: return True
    return m_ + 3 < -1 or 2 * m_ - 1 >= 6
chk('Tham số bài 6: m < −4 hoặc m ≥ 7/2', all(con6(m_) == (m_ < -4 or m_ >= Fr(7, 2)) for m_ in ms), 1)

# ---------- Lớp 10 · Chương III · Hệ thức lượng thực tế (data/lop10/c3-he-thuc-luong-thuc-te.js): toạ độ hoá ----------
R_ = math.radians
def tam_giac(AB, A, B):  # A(0,0), B(AB,0), góc tại A, B → toạ độ C
    t = AB / (1 / math.tan(R_(A)) + 1 / math.tan(R_(B))); return (t / math.tan(R_(A)), t)
C_ = tam_giac(50, 62, 48); chk('HTL VD: AC', round(math.hypot(*C_), 1), 39.5)
chk('HTL bài 1: AB', round(math.dist((180, 0), (150 * math.cos(R_(65)), 150 * math.sin(R_(65))))), 179)
chk('HTL bài 2: hai xe', round(math.dist((60, 0), (75 * math.cos(R_(120)), 75 * math.sin(R_(120)))), 1), 117.2)
C_ = tam_giac(180, 35, 50); chk('HTL bài 3: phút', round((math.hypot(*C_) - math.dist((180, 0), C_)) / 60 * 60), 35)
def cao(AB, a, b):  # A, B thẳng hàng với chân tháp, góc nâng a < b
    return AB / (1 / math.tan(R_(a)) - 1 / math.tan(R_(b)))
chk('HTL VD tháp', round(cao(24, 40, 55), 1), 48.8); chk('HTL bài 4: hải đăng', round(cao(50, 40, 70)), 60)
chk('HTL bài 5: cột cờ', round(20 * (math.tan(R_(46)) - math.tan(R_(38))), 1), 5.1)
h_ = cao(25, 32, 52); chk('HTL bài 6: xe thang', round(math.sqrt(40 ** 2 - (h_ - 1.8) ** 2), 1), 27.8)
def heron(a, b, c): p_ = (a + b + c) / 2; return math.sqrt(p_ * (p_ - a) * (p_ - b) * (p_ - c))
B_, A_, C_ = (0, 0), (12, 0), (16 * math.cos(R_(60)), 16 * math.sin(R_(60)))
ac = math.dist(A_, C_); chk('HTL VD tứ giác: diện tích', round(heron(12, 16, ac) + heron(ac, 10, 14), 1), 149.6)
chk('HTL bài 7: Heron', heron(25, 29, 36), 360, 1e-6)
chk('HTL bài 8: giếng trời', round(3.14 * (16 + 9 + 12) / (4 * math.sin(R_(120)) ** 2), 1), 38.7)
# bài 9: toạ độ hoá tứ giác B(0,0), A trên tia Ox, C theo góc 105°, D theo góc BCD = 110°, rồi công thức shoelace
B_, A_ = (0, 0), (8, 0); C_ = (5 * math.cos(R_(105)), 5 * math.sin(R_(105)))
hCB = math.atan2(B_[1] - C_[1], B_[0] - C_[0])
def loi(P):  # tứ giác lồi: mọi tích có hướng cùng dấu
    cr = [(P[(i + 1) % 4][0] - P[i][0]) * (P[(i + 2) % 4][1] - P[(i + 1) % 4][1]) - (P[(i + 1) % 4][1] - P[i][1]) * (P[(i + 2) % 4][0] - P[(i + 1) % 4][0]) for i in range(4)]
    return all(c > 0 for c in cr) or all(c < 0 for c in cr)
P_ = [P for sg in (1, -1) for P in [[A_, B_, C_, (C_[0] + 6 * math.cos(hCB + sg * R_(110)), C_[1] + 6 * math.sin(hCB + sg * R_(110)))]] if loi(P)][0]
S_ = abs(sum(P_[i][0] * P_[(i + 1) % 4][1] - P_[(i + 1) % 4][0] * P_[i][1] for i in range(4))) / 2
chk('HTL bài 9: tiền (nghìn đồng)', round(S_ * 350), 16513)

# ---------- Lớp 11 · Công thức lượng giác (data/lop11/c1-cong-thuc-luong-giac.js) ----------
a_ = sp.pi - sp.asin(sp.Rational(4, 5)); b_ = sp.acos(sp.Rational(5, 13))
chk('CTLG VD: cos(α+β)', sp.nsimplify(sp.cos(a_ + b_)), sp.Rational(-63, 65)); chk('CTLG VD: tan 2α', sp.nsimplify(sp.tan(2 * a_)), sp.Rational(24, 7))
t_ = sp.atan(3); chk('CTLG bài 1: P', sp.nsimplify((2 * sp.sin(t_) - sp.cos(t_)) / (sp.sin(t_) + 3 * sp.cos(t_))), sp.Rational(5, 6)); chk('CTLG bài 1: sin 2α', sp.nsimplify(sp.sin(2 * t_)), sp.Rational(3, 5))
xs_ = [float(v) for v in sp.solve(sp.sin(x) + sp.cos(x) - sp.Rational(2, 3), x)]
xv = [v % (2 * math.pi) for v in xs_ if math.pi / 2 < v % (2 * math.pi) < math.pi][0]
chk('CTLG bài 2: sin 2a', math.sin(2 * xv), -5 / 9); chk('CTLG bài 2: sin⁴+cos⁴', math.sin(xv) ** 4 + math.cos(xv) ** 4, 137 / 162); chk('CTLG bài 2: sin − cos', math.sin(xv) - math.cos(xv), math.sqrt(14) / 3)
r1, r2 = [complex(z).real for z in sp.Poly(4 * x ** 2 + 3 * x - 5).nroots()]; u_ = math.atan(r1) + math.atan(r2)
chk('CTLG bài 3: T', 4 * math.sin(u_) ** 2 + 3 * math.sin(u_) * math.cos(u_) - 5 * math.cos(u_) ** 2, -5)
chk('CTLG VD2: rút gọn = tan 3x', all(abs((math.sin(v) + math.sin(3 * v) + math.sin(5 * v)) / (math.cos(v) + math.cos(3 * v) + math.cos(5 * v)) - math.tan(3 * v)) < 1e-9 for v in (0.1, 0.37, 1.2)), 1)
chk('CTLG bài 4: sin⁴ + cos⁴', sp.simplify(sp.sin(x) ** 4 + sp.cos(x) ** 4 - (3 + sp.cos(4 * x)) / 4), 0)
Pf = lambda v: math.cos(v + math.pi / 3) * math.cos(v - math.pi / 3); grid = [k * 0.001 for k in range(6284)]
chk('CTLG bài 5: max P', max(map(Pf, grid)), 0.25, 1e-6); chk('CTLG bài 5: min P', min(map(Pf, grid)), -0.75, 1e-6)
chk('CTLG bài 6: sin20 sin40 sin80', math.sin(R_(20)) * math.sin(R_(40)) * math.sin(R_(80)), math.sqrt(3) / 8)
chk('CTLG VD3: k', math.hypot(2, 2 * math.sqrt(3)), 4); chk('CTLG VD3: φ', math.atan2(2 * math.sqrt(3), 2), math.pi / 3)
chk('CTLG bài 7: vòng/giây', round(10 / (0.6 * math.pi), 1), 5.3); chk('CTLG bài 7: rad/giây', round(10 / 0.3, 1), 33.3)
chk('CTLG bài 8: góc ACB', round(math.degrees(math.atan(25 / 25) - math.atan(10 / 25)), 1), 23.2)
chk('CTLG bài 9: x', max((math.atan(6 / v) - math.atan(2 / v), v) for v in [k / 1000 for k in range(1, 20000)])[1], round(2 * math.sqrt(3), 3), 1e-3)

# ---------- Lớp 11 · Hàm số lượng giác thực tế (data/lop11/c1-ham-so-luong-giac-thuc-te.js) ----------
gx = [k * 2 * math.pi / 200000 for k in range(200001)]
y_ = [math.cos(2 * v) - 2 * math.sin(v) + 3 for v in gx]; chk('HSLG VD: max', max(y_), 4.5, 1e-6); chk('HSLG VD: min', min(y_), 0, 1e-6)
y_ = [7 - 6 * math.sin(v) * math.cos(v) for v in gx]; chk('HSLG bài 1: max', max(y_), 10, 1e-6); chk('HSLG bài 1: min', min(y_), 4, 1e-6)
y_ = [2 * math.cos(v) ** 2 + math.sqrt(3) * math.sin(2 * v) for v in gx]; chk('HSLG bài 2: max', max(y_), 3, 1e-6); chk('HSLG bài 2: min', min(y_), -1, 1e-6)
g2 = [-math.pi / 6 + k * math.pi / 200000 for k in range(200001)]
y_ = [math.cos(2 * v) + 2 * math.sin(v) for v in g2]; chk('HSLG bài 3: max', max(y_), 1.5, 1e-6); chk('HSLG bài 3: min', min(y_), -0.5, 1e-6)
h_ = lambda t: 2.5 * math.cos(math.pi * t / 6 + math.pi / 3) + 10
chk('HSLG VD2: thời điểm cao nhất', [t for t in range(25) if abs(h_(t) - 12.5) < 1e-9], [10, 22]); chk('HSLG VD2: thấp nhất', [t for t in range(25) if abs(h_(t) - 7.5) < 1e-9], [4, 16])
w_ = lambda t: 52 - 50 * math.cos(math.pi * t / 10)
chk('HSLG bài 4: h(0)', w_(0), 2); chk('HSLG bài 4: lần đầu 77 m', min(t / 1000 for t in range(20001) if w_(t / 1000) >= 77), 20 / 3, 1e-3)
dl = {t: 4 * math.sin(math.pi / 182 * (t - 79)) + 12 for t in range(1, 366)}
chk('HSLG bài 5: ngày nhiều nắng nhất', max(dl, key=dl.get), 170); chk('HSLG bài 5: ngày ít nắng nhất', min(dl, key=dl.get), 352)
P_ = lambda t: 115 + 25 * math.sin(7 * math.pi * t / 3)
def so_lan(f, a, b, val, n=400000):  # đếm số lần f(t) = val trên [a,b]: số lần cắt + số lần chạm (cực trị)
    ts = [a + (b - a) * i / n for i in range(n + 1)]; v = [f(t) - val for t in ts]
    cat = sum(1 for i in range(n) if v[i] == 0 or v[i] * v[i + 1] < 0)
    cham = sum(1 for i in range(1, n) if abs(v[i]) < 1e-6 and v[i - 1] < 0 and v[i + 1] < 0 or abs(v[i]) < 1e-6 and v[i - 1] > 0 and v[i + 1] > 0)
    return cat + cham
chk('HSLG bài 6: số nhịp/phút', 60 / (2 / (7 / 3)), 70); chk('HSLG bài 6: lần đạt 140', len([k for k in range(10) if 3 / 14 + 6 * k / 7 <= 2]), 3)
chk('HSLG bài 6: lần đạt 127,5', so_lan(P_, 0, 2, 127.5), 5)

# ---------- Lớp 11 · Phương trình lượng giác (data/lop11/c1-phuong-trinh-luong-giac.js) ----------
def nghiem(f, a, b, n=2000000, mo=(False, False)):  # đếm nghiệm đơn bằng đổi dấu (các nghiệm ở đây đều đơn)
    h = (b - a) / n; c = 0; prev = f(a + h * 1e-3)
    for i in range(1, n + 1):
        cur = f(a + i * h - (h * 1e-3 if i == n else 0))
        if prev == 0 or prev * cur < 0: c += 1
        prev = cur
    return c
chk('PTLG VD: tổng nghiệm trên [0; π]', sum(v for k in range(-3, 4) for v in {math.pi / 12 + k * math.pi / 2, -math.pi / 6 + k * math.pi} if -1e-12 <= v <= math.pi + 1e-12) / math.pi, 1.5)
chk('PTLG VD: số nghiệm (đổi dấu)', nghiem(lambda v: math.cos(3 * v) - math.sin(v + math.pi / 6), 0, math.pi, 200000), 3)
sl = sorted(v for k in range(-3, 4) for v in (5 * math.pi / 12 + k * math.pi, -5 * math.pi / 12 + k * math.pi) if 0 < v < 2 * math.pi)
chk('PTLG bài 1: số nghiệm', len(sl), 4); chk('PTLG bài 1: tổng / π', sum(sl) / math.pi, 4); chk('PTLG bài 1: lớn nhất ·12/π', sl[-1] * 12 / math.pi, 19)
chk('PTLG bài 1: đổi dấu', nghiem(lambda v: math.cos(2 * v) + math.sqrt(3) / 2, 0, 2 * math.pi, 200000), 4)
sl = [v for v in range(-179, 180) if abs(math.tan(R_(2 * v + 20)) - math.sqrt(3)) < 1e-9]
chk('PTLG bài 2: nghiệm (độ)', sl, [-160, -70, 20, 110]); chk('PTLG bài 2: tổng', sum(sl), -100)
chk('PTLG bài 3: cos4x + cos x = 0 trên (−10π; 10π)', nghiem(lambda v: math.cos(4 * v) + math.cos(v), -10 * math.pi, 10 * math.pi), 70)
chk('PTLG VD2: số m nguyên', len([k for k in range(-10, 10) if -1 <= k * k - 3 * k + 1 <= 1]), 4)
chk('PTLG bài 4: tổng m nguyên', sum(k for k in range(-10, 10) if -3 <= 2 * k - 1 <= 3), 2)
def nghiem_tich(mv, f1, g, a, b):  # tập nghiệm (làm tròn) của f1(x)=0 hoặc g(x)=mv trên [a,b]
    out = set(); n = 200000; h = (b - a) / n
    for F_ in (f1, lambda v: g(v) - mv):
        vals = [F_(a + i * h) for i in range(n + 1)]
        for i in range(n + 1):
            if abs(vals[i]) < 1e-12: out.add(round(a + i * h, 3))
            elif i < n and vals[i] * vals[i + 1] < 0: out.add(round(a + (i + 0.5) * h, 3))
            elif 0 < i < n and abs(vals[i]) < 1e-7 and vals[i - 1] * vals[i + 1] > 0 and abs(vals[i]) <= min(abs(vals[i - 1]), abs(vals[i + 1])): out.add(round(a + i * h, 3))
    return len({round(v, 2) for v in out})
mtest = [-1.0, -0.9, -math.sqrt(3) / 2, -0.5, 0.0, 0.5, math.sqrt(3) / 2, 0.95, 1.0]
dung5 = [mv for mv in mtest if nghiem_tich(mv, lambda v: 2 * math.sin(v) - 1, math.cos, 0, math.pi) == 3]
chk('PTLG bài 5: các m thử có đúng 3 nghiệm', [round(v, 3) for v in dung5], [-1.0, -0.9, -0.5, 0.0, 0.5, 0.95, 1.0])
dung6 = [mv for mv in mtest if nghiem_tich(mv, lambda v: 2 * math.cos(v) - 1, math.sin, 0, 2 * math.pi) == 4]
chk('PTLG bài 6: các m thử có đúng 4 nghiệm', [round(v, 3) for v in dung6], [-0.9, -0.5, 0.5, 0.95])
chk('PTLG bài 6: phân tích nhân tử', sp.simplify(sp.sin(2 * x) - 2 * m * sp.cos(x) - sp.sin(x) + m - (2 * sp.cos(x) - 1) * (sp.sin(x) - m)), 0)
chk('PTLG VD3: qua VTCB trong [0;5]', nghiem(lambda t: math.cos(4 * t - math.pi / 3), 0, 5, 200000), 6)
chk('PTLG bài 7: vệ tinh', [t for t in range(91) if abs(600 + 400 * math.cos(math.pi * t / 45) - 400) < 1e-9], [30, 60])
chk('PTLG bài 8: số ngày', len([t for t in range(1, 31) if abs(40 + 20 * math.cos(math.pi * t / 3) - 50) < 1e-9]), 10)
chk('PTLG bài 9: số lần cùng li độ', nghiem(lambda t: 4 * math.cos(2 * math.pi * t) - 4 * math.sin(2 * math.pi * t + math.pi / 6), 0, 2, 200000), 4)

# ---------- Lớp 11 · Cấp số cộng (data/lop11/c2-cap-so-cong.js) ----------
sol = [(u, d) for u in range(-50, 51) for d in range(-20, 21) if (u + d) + (u + 4 * d) - (u + 2 * d) == 13 and (u + 3 * d) + (u + 5 * d) == 34]
chk('CSC VD: (u1, d)', sol, [(1, 4)]); chk('CSC VD: S20', sum(1 + 4 * k for k in range(20)), 780); chk('CSC VD: 401 là số hạng thứ', 1 + (401 - 1) // 4, 101)
sol = [(u, d) for u in range(-50, 51) for d in range(-20, 21) if (u + 2 * d) + (u + 6 * d) == 22 and (u + d) * (u + 7 * d) == 40]
chk('CSC bài 1', sorted(sol), [(-1, 3), (23, -3)])
Sn = lambda n: 2 * n * n - n; chk('CSC bài 2: u_n = 4n − 3', all(Sn(n) - Sn(n - 1) == 4 * n - 3 for n in range(1, 60)), 1); chk('CSC bài 2: 197', (197 + 3) // 4, 50)
sol = [(xx, dd) for xx in range(1, 40) for dd in range(1, 40) if 3 * xx == 36 and (xx + dd) ** 2 == xx ** 2 + (xx - dd) ** 2 and xx - dd > 0]
chk('CSC bài 3: diện tích', [(xx - dd) * xx / 2 for xx, dd in sol], [54])
sol = [k for k in range(1, 50) for d in [Fr(9, k)] if (2 * k - 1) * d == Fr(33, 2)]
chk('CSC bài 4: số số hạng', [2 * k for k in sol], [12]); u_ = [Fr(-3, 2) + i * Fr(3, 2) for i in range(12)]; chk('CSC bài 4: thử lại', (sum(u_[0::2]), sum(u_[1::2])), (36, 45))
chk('CSC VD2: dãy cuối', 20 + 24 * 3, 92); chk('CSC VD2: tổng', sum(20 + 3 * k for k in range(25)), 1400)
chk('CSC bài 5: số hàng', next(n for n in range(1, 100) if sum(18 + 2 * k for k in range(n)) >= 1000), 25)
chk('CSC bài 6: A', sum(100 + 8 * k for k in range(40)), 10240); chk('CSC bài 6: B', sum(70 + 10 * k for k in range(40)), 10600)
pa1 = lambda n: sum(120 + 30 * k for k in range(n)); pa2 = lambda q: sum(Fr(32) + Fr(6, 5) * k for k in range(q))
chk('CSC bài 7: 3 năm', (pa1(3), pa2(12)), (450, Fr(2316, 5))); chk('CSC bài 7: 10 năm', (pa1(10), pa2(40)), (2550, 2216))

# ---------- Lớp 11 · Cấp số nhân (data/lop11/c2-cap-so-nhan.js) ----------
sol = [(u, q) for u in range(1, 30) for q in range(-6, 7) if q and u * q + u * q ** 3 == 30 and u * q ** 2 + u * q ** 4 == 90]
chk('CSN VD: (u1, q)', sol, [(1, 3)]); chk('CSN VD: n', next(n for n in range(1, 20) if (3 ** n - 1) // 2 == 3280), 8); chk('CSN VD: 729', next(n for n in range(1, 20) if 3 ** (n - 1) == 729), 7)
chk('CSN bài 1: S10', sum(3 * 2 ** k for k in range(10)), 3069)
sol = [(a, a * q, a * q * q) for q in [Fr(k, 6) for k in range(7, 60)] for a in [Fr(39) / (1 + q + q * q)] if (a + 1) + (a * q * q - 13) == 2 * a * q]
chk('CSN bài 2: ba số', sol, [(3, 9, 27)])
sol = [(8 - d, 8, 8 + d) for d in range(-20, 21) if (11 - d) * (14 + d) == 144]
chk('CSN bài 3: ba số', sorted(sol), [(6, 8, 10), (13, 8, 3)])
chk('CSN VD2: sau 5 năm', round(100 * 1.065 ** 5, 1), 137.0); chk('CSN VD2: số năm vượt 150', next(n for n in range(1, 30) if 100 * 1.065 ** n > 150), 7)
chk('CSN bài 4: máy photocopy', round(60 * 0.85 ** 5, 2), 26.62)
chk('CSN bài 5: sau 2 giờ', 50 * 2 ** (120 // 15), 12800); chk('CSN bài 5: phút', 15 * next(k for k in range(40) if 50 * 2 ** k == 409600), 195)
T_ = 0
for _ in range(12): T_ = (T_ + 5) * 1.005
chk('CSN bài 6: gửi đều (mô phỏng từng tháng)', round(T_, 2), 61.99)
a_ = [1000.0]
for _ in range(12): a_.append(1.1 * (a_[-1] - 150))
chk('CSN bài 7: a5', round(a_[4], 3), 698.335); chk('CSN bài 7: liều diệt hết', next(i + 1 for i, v in enumerate(a_) if v <= 150), 10)

# ---------- Lớp 11 · Mẫu số liệu ghép nhóm (data/lop11/c3-mau-so-lieu-ghep-nhom.js): bung mẫu thành từng giá trị đều trong nhóm ----------
def dac_trung(b, h, f):
    n = sum(f); c = [v + Fr(h, 2) for v in b]; mean = sum(ci * fi for ci, fi in zip(c, f)) / n
    def q(p):
        t, cum = p * n, 0
        for i, fi in enumerate(f):
            if cum + fi >= t: return b[i] + (t - cum) / fi * h
            cum += fi
    i = max(range(len(f)), key=lambda j: f[j]); fp = f[i - 1] if i else 0; fn = f[i + 1] if i + 1 < len(f) else 0
    return mean, q(Fr(1, 4)), q(Fr(1, 2)), q(Fr(3, 4)), b[i] + Fr(f[i] - fp, (f[i] - fp) + (f[i] - fn)) * h
D = dac_trung([0, 10, 20, 30, 40], 10, [5, 12, 14, 6, 3])
chk('GN VD: tb, Q1, Me, Q3, Mo', tuple(round(float(v), 2) for v in D), (22.5, 14.17, 22.14, 29.29, 22.0))
D = dac_trung([0, 20, 40, 60, 80], 20, [6, 14, 25, 30, 25]); chk('GN bài 1: tb, Me, Mo', (float(D[0]), round(float(D[2]), 2), float(D[4])), (60.8, 63.33, 70.0))
xx_ = [v for v in range(0, 200) if dac_trung([0, 2, 4, 6, 8], 2, [3, 8, v, 12, 4])[0] == Fr(26, 5)]
chk('GN bài 2: x', xx_, [33]); chk('GN bài 2: Me', round(float(dac_trung([0, 2, 4, 6, 8], 2, [3, 8, 33, 12, 4])[2]), 2), 5.15)
ab_ = [(a, 26 - a) for a in range(0, 27) if dac_trung([0, 5, 10, 15, 20], 5, [4, a, 15, 26 - a, 5])[2] == 14]
chk('GN bài 3: (a, b)', ab_, [(9, 17)]); chk('GN bài 3: tb', dac_trung([0, 5, 10, 15, 20], 5, [4, 9, 15, 17, 5])[0], Fr(27, 2))
chk('GN VD2: Q3 doanh số', round(float(dac_trung([20, 40, 60, 80, 100], 20, [6, 14, 20, 15, 5])[3]), 1), 86.7)
chk('GN bài 4: Q1 chạy', float(dac_trung([12, 13, 14, 15, 16], 1, [4, 10, 18, 11, 5])[1]), 13.8)
D = dac_trung([150, 160, 170, 180, 190, 200], 10, [8, 17, 32, 23, 12, 8]); chk('GN bài 5: Mo, Me', (float(D[4]), round(float(D[2]), 2)), (176.25, 177.81))
D = dac_trung([3, 6, 9, 12, 15], 3, [20, 55, 45, 30, 10]); chk('GN bài 6: tb, Q3, Mo', (round(float(D[0]), 2), float(D[3]), round(float(D[4]), 2)), (9.66, 12.0, 8.33))


# ---------- Luyện đề Bài 1 (data/vao-10/luyen-de/ld01-ham-so-parabol.js): giải lại câu b bằng sympy ----------
x0_ = sp.symbols('x0', real=True); Q_ = sp.Rational
def _pts(a, cond, keepO=False):  # mọi điểm (x0; a·x0²) của (P) thỏa cond(x0, y0) = 0, sắp theo x0
    y = a * x0_ ** 2; r = sorted(set(sp.solve(sp.Eq(cond(x0_, y), 0), x0_)))
    return [(v, a * v ** 2) for v in r if keepO or v != 0]
chk('LĐ1 đề 1', _pts(Q_(1, 2), lambda x, y: y - 8), [(-4, 8), (4, 8)])
chk('LĐ1 đề 2', (-6, Q_(-1, 4) * 36), (-6, -9))
chk('LĐ1 đề 3', _pts(Q_(-1, 3), lambda x, y: y - x), [(-3, -3)])
chk('LĐ1 đề 4', _pts(-2, lambda x, y: y - 2 * x), [(-1, -2)])
chk('LĐ1 đề 5', _pts(Q_(1, 4), lambda x, y: x - 2 * y), [(2, 1)])
chk('LĐ1 đề 6', _pts(-1, lambda x, y: sp.Abs(y) - sp.Abs(x)), [(-1, -1), (1, -1)])
chk('LĐ1 đề 7', _pts(Q_(1, 2), lambda x, y: y + x), [(-2, 2)])
chk('LĐ1 đề 8', _pts(2, lambda x, y: y - (-3 * x + 2), True), [(-2, 8), (Q_(1, 2), Q_(1, 2))])
chk('LĐ1 đề 9', _pts(Q_(-1, 2), lambda x, y: x + y + 4, True), [(-2, -2), (4, -8)])
chk('LĐ1 đề 10', _pts(1, lambda x, y: x * y + 27, True), [(-3, 9)])
chk('LĐ1 đề 11', [(v, Q_(1, 3) * v ** 2) for v in sorted(sp.solve(x0_ ** 2 - x0_ - 6, x0_))], [(-2, Q_(4, 3)), (3, 3)])
chk('LĐ1 đề 12', _pts(Q_(-1, 4), lambda x, y: y - (x - 3), True), [(-6, -9), (2, -1)])
chk('LĐ1 đề 13', _pts(3, lambda x, y: y - (5 * x - 2), True), [(Q_(2, 3), Q_(4, 3)), (1, 3)])
chk('LĐ1 đề 14', _pts(Q_(1, 2), lambda x, y: x ** 2 + y ** 2 - 8, True), [(-2, 2), (2, 2)])
chk('LĐ1 đề 15', _pts(Q_(-1, 2), lambda x, y: sp.Abs(y) - 2 * sp.Abs(x)), [(-4, -8), (4, -8)])
chk('LĐ1 đề 16', _pts(2, lambda x, y: y - 18, True), [(-3, 18), (3, 18)])
chk('LĐ1 đề 17', _pts(Q_(-3, 4), lambda x, y: y - 3 * x), [(-4, -12)])
chk('LĐ1 đề 18', _pts(Q_(-1, 3), lambda x, y: y - (2 * x - 9), True), [(-9, -27), (3, -3)])
chk('LĐ1 đề 19', _pts(Q_(1, 4), lambda x, y: y - x, True), [(0, 0), (4, 4)])
chk('LĐ1 đề 20', (_pts(3, lambda x, y: y - 12, True), _pts(3, lambda x, y: y + 3, True)), ([(-2, 12), (2, 12)], []))

# ---------- Luyện đề Bài 2 (data/vao-10/luyen-de/ld02-pt-bac-hai-viete.js): tính bằng nghiệm thật (sympy), không qua Viète ----------
def _r2(a, b, c):  # hai nghiệm thật, x1 > x2
    r = sp.solve(a * xx_ ** 2 + b * xx_ + c, xx_); assert len(r) == 2 and all(v.is_real for v in r); return sorted(r, key=lambda v: -float(v))
xx_ = sp.symbols('xx_'); Q_ = sp.Rational
def _v(e, a, b, c, sym=True):  # giá trị biểu thức e(x1, x2); sym: kiểm cả khi đổi chỗ hai nghiệm
    x1, x2 = _r2(a, b, c); v = sp.nsimplify(sp.simplify(e(x1, x2)))
    if sym: assert sp.simplify(e(x2, x1) - v) == 0
    return v
chk('LĐ2 đề 1', _v(lambda u, v: u**2 + v**2 - u / 2 - v / 2, 2, 5, -4), Q_(23, 2))
chk('LĐ2 đề 2', _v(lambda u, v: u / v + v / u, 1, -6, 2), 16)
chk('LĐ2 đề 3', _v(lambda u, v: u**2 / v + v**2 / u, 1, -3, -5), Q_(-72, 5))
chk('LĐ2 đề 4', _v(lambda u, v: u * (u - 2) + v * (v - 2), 3, -4, -2), Q_(4, 9))
chk('LĐ2 đề 5', _v(lambda u, v: (u - v)**2 - u - v, 1, -5, 2), 12)
chk('LĐ2 đề 6', _v(lambda u, v: 1 / u + 1 / v - u * v, 2, -7, 2), Q_(5, 2))
chk('LĐ2 đề 7', _v(lambda u, v: u**3 + v**3, 2, -3, -1), Q_(45, 8))
chk('LĐ2 đề 8', _v(lambda u, v: 3 * u**2 * v + 3 * u * v**2 - u - v, 2, 4, -1), 5)
chk('LĐ2 đề 9', _v(lambda u, v: (u + 1) / v + (v + 1) / u, 1, -3, -2), -8)
chk('LĐ2 đề 10 (x1, x2 bất kì)', [_v(lambda u, v: u**2 + 5 * v - 3, 1, -5, 3, False), _v(lambda u, v: v**2 + 5 * u - 3, 1, -5, 3, False)], [19, 19])
chk('LĐ2 đề 11', (2 * -7 < 0, _v(lambda u, v: sp.Abs(u) + sp.Abs(v), 2, -3, -7)), (True, sp.sqrt(65) / 2))
m_ = sp.symbols('m', real=True); _x1, _x2 = sp.symbols('x1 x2')
_s12 = sp.solve(_x1**2 - 2 * m_ * _x1 + 2 * m_ - 3, _x1)
chk('LĐ2 đề 12a: Δ\' − (m − 1)² − 2', sp.expand(m_**2 - (2 * m_ - 3) - (m_ - 1)**2 - 2), 0)
chk('LĐ2 đề 12b: A(m) − (4m² − 4m + 6)', sp.expand(sp.simplify(_s12[0]**2 + _s12[1]**2 - (4 * m_**2 - 4 * m_ + 6))), 0)
chk('LĐ2 đề 12b: A = 14', sorted(sp.solve(4 * m_**2 - 4 * m_ + 6 - 14, m_)), [-1, 2])
chk('LĐ2 đề 13', _v(lambda u, v: u**2 + v**2 - 1 / u - 1 / v, 1, -4, 1), 10)
chk('LĐ2 đề 14', _v(lambda u, v: (2 * u - v) * (2 * v - u), 3, -8, 2), Q_(-74, 9))
chk('LĐ2 đề 15', _v(lambda u, v: u / (v + 2) + v / (u + 2), 1, 3, -1), Q_(-5, 3))
chk('LĐ2 đề 16 (x1 > x2)', _v(lambda u, v: u - v, 5, 2, -4, False), 2 * sp.sqrt(21) / 5)
chk('LĐ2 đề 17 (x1, x2 bất kì)', [_v(lambda u, v: u**2 + v + 2021, 1, -1, -5, False), _v(lambda u, v: v**2 + u + 2021, 1, -1, -5, False)], [2027, 2027])
chk('LĐ2 đề 18', _v(lambda u, v: (u - 1) * (v - 1) + u**2 + v**2, 2, -9, 5), Q_(57, 4))
chk('LĐ2 đề 19', _v(lambda u, v: u**2 + v**2 - 3 * u * v, 3, -5, -1), Q_(40, 9))
chk('LĐ2 đề 20 (x1, x2 bất kì)', [_v(lambda u, v: (u**2 + 2 * u - 2024) * (v**2 + 2 * v + 1), 1, 2, -2025, False), _v(lambda u, v: (v**2 + 2 * v - 2024) * (u**2 + 2 * u + 1), 1, 2, -2025, False)], [2026, 2026])
chk('LĐ2: Δ\' ghi trong đề', [(b // 2)**2 - a * c for a, b, c in [(1, -6, 2), (3, -4, -2), (2, 4, -1), (1, -4, 1), (3, -8, 2), (5, 2, -4)]], [7, 10, 6, 3, 10, 21])
chk('LĐ2: Δ ghi trong đề', [b * b - 4 * a * c for a, b, c in [(2, 5, -4), (1, -3, -5), (2, -7, 2), (2, -3, -1), (1, -3, -2), (1, 3, -1), (1, -1, -5), (2, -9, 5), (3, -5, -1)]], [57, 29, 33, 17, 17, 13, 21, 41, 37])

# ---------- Luyện đề Bài 6 (data/vao-10/luyen-de/ld06-he-phuong-trinh-thuc-te.js): giải lại bằng sympy ----------
a_, b_, T_ = sp.symbols('a b T', positive=True)
sol = sp.solve([sp.Eq(a_ / 3 + 2 * b_ / 3, T_ + 9), sp.Eq(b_ / 3 + 2 * a_ / 3, T_ + 6), sp.Eq(T_ * (a_ + b_), a_ * b_)], [a_, b_, T_], dict=True)
chk('LĐ6 đề 1: (a, b, T)', [(s_[a_], s_[b_], s_[T_]) for s_ in sol], [(9, 18, 6)])
u_, v_ = sp.symbols('u v'); X_, Y_ = sp.symbols('X Y')
def hpt(e1, e2, X=u_, Y=v_): r = sp.solve([e1, e2], [X, Y], dict=True); return [(r_[X], r_[Y]) for r_ in r]
V_, t_ = sp.symbols('V t', positive=True)
chk('LĐ6 đề 2: đi bộ (phút)', sp.solve(sp.Eq(sp.Rational(3, 2) * V_ * 20 + V_ / 3 * (t_ - 20), V_ * t_), t_), [35])
chk('LĐ6 đề 3: giảm tốc (phút)', sp.solve(sp.Eq(sp.Rational(5, 4) * V_ * 40 + V_ / 2 * (t_ - 40), V_ * t_), t_), [60])
chk('LĐ6 đề 4: nhiên liệu', hpt(sp.Eq(X_ / 5 + Y_ / 3, 200), sp.Eq(4 * X_ / 5 + 2 * Y_ / 3, 600), X_, Y_), [(500, 300)])
chk('LĐ6 đề 5: áo, quần', hpt(sp.Eq(2 * X_ + 3 * Y_, 1550), sp.Eq(sp.Rational(16, 10) * X_ + sp.Rational(27, 10) * Y_, 1330), X_, Y_), [(325, 300)])
A6 = sp.symbols('A6', positive=True); a6 = [r_ for r_ in sp.solve(sp.Eq(A6 ** 2 + (A6 - sp.Rational(3, 10)) ** 2, sp.Rational(9, 4)), A6)]
chk('LĐ6 đề 6: cạnh a', a6, [sp.Rational(6, 5)]); a6 = a6[0]; DE6 = a6 - sp.Rational(3, 10)
chk('LĐ6 đề 6: x/y', (2 * a6 + (a6 - DE6)) / (a6 + DE6), sp.Rational(9, 7))
# mô phỏng: lần gặp thứ hai của hai bạn đúng tại F (AF = 0,6) – toạ độ theo chu vi tính từ A, Hòa đi chiều dương
t2 = 8 * a6 / (9 + 7); chk('LĐ6 đề 6: vị trí gặp lần 2 (AF)', (9 * t2) % (4 * a6), sp.Rational(3, 5))
chk('LĐ6 đề 7: vượt mức', hpt(sp.Eq(X_ + Y_, 720), sp.Eq(sp.Rational(115, 100) * X_ + sp.Rational(112, 100) * Y_, 819), X_, Y_), [(420, 300)])
chk('LĐ6 đề 8: bóng đèn', hpt(sp.Eq(X_ + Y_, 15), sp.Eq((12 * X_ + 20 * Y_) * 6 * 30, 39600), X_, Y_), [(10, 5)])
chk('LĐ6 đề 9: hạc giấy', hpt(sp.Eq(X_ + Y_, 16), sp.Eq(3 * X_ + 7 * Y_, 24 * 4), X_, Y_), [(4, 12)])
chk('LĐ6 đề 10: vận tốc', hpt(sp.Eq(2 * X_ + 2 * Y_, 180), sp.Eq(sp.Rational(24, 10) * X_ + sp.Rational(15, 10) * Y_, 180), X_, Y_), [(50, 40)])

R_ = sp.Rational
chk('LĐ6 đề 11: căn hộ', hpt(sp.Eq(X_ + Y_, 100), sp.Eq(R_(15, 10) * R_(11, 10) * X_ + R_(24, 10) * R_(95, 100) * Y_, R_(1902, 10)), X_, Y_), [(60, 40)])
chk('LĐ6 đề 12: giấy thi', hpt(sp.Eq(X_ + Y_, 26), sp.Eq(4 + 2 * X_ + 3 * Y_, 70), X_, Y_), [(12, 14)])
chk('LĐ6 đề 13: trúng tuyển', hpt(sp.Eq(X_ + Y_, 450), sp.Eq(R_(75, 100) * X_ + R_(9, 10) * Y_, 360), X_, Y_), [(300, 150)]); chk('LĐ6 đề 13: số đậu', (R_(3, 4) * 300, R_(9, 10) * 150), (225, 135))
chk('LĐ6 đề 14: táo, mận (kg)', hpt(sp.Eq(X_ + Y_, 15), sp.Eq(X_ / 12 + Y_ / 18, 1), X_, Y_), [(6, 9)]); chk('LĐ6 đề 14: giá/kg', (270000 / 6, 270000 / 9), (45000, 30000))
chk('LĐ6 đề 15: can', hpt(sp.Eq(2 * X_, 5 * Y_ + 1), sp.Eq(6 * Y_, 2 * X_ + 2), X_, Y_), [(8, 3)])
chk('LĐ6 đề 16: tờ rơi', hpt(sp.Eq(8 * X_ + 6 * Y_, 1200), sp.Eq(10 * X_ + 4 * Y_, 1220), X_, Y_), [(90, 80)])
chk('LĐ6 đề 17: chuyến bay', hpt(sp.Eq(4 * X_ + 10 * Y_, 56), sp.Eq(3 * X_ + 2 * Y_, 20), X_, Y_), [(4, 4)])
chk('LĐ6 đề 18: t gặp', sp.solve(sp.Eq(36 * t_, 90 - 54 * (t_ - R_(1, 2))), t_), [R_(13, 10)]); chk('LĐ6 đề 18: cách A', 36 * R_(13, 10), R_(468, 10))
chk('LĐ6 đề 19: x', sp.solve(sp.Eq(X_ / 4 - (X_ + 3) / 5, 2), X_), [52]); chk('LĐ6 đề 19: chia hết', (52 % 4, 55 % 5), (0, 0))
chk('LĐ6 đề 20: (y, N)', hpt(sp.Eq(X_, 60 + 6 * Y_ + 8), sp.Eq(X_, 48 + 12 * Y_ - 16), Y_, X_), [(6, 104)])

# ---------- Luyện đề Bài 4 (data/vao-10/luyen-de/ld04-thuc-te-dai-so-hinh-hoc.js) ----------
xx = sp.symbols('xx', positive=True)
chk('LĐ4 đề 1: biểu thức còn lại', sp.expand(xx * (xx + 10) - 12 * (xx - 10) - (xx ** 2 - 2 * xx + 120)), 0)
chk('LĐ4 đề 1: x', [r_ for r_ in sp.solve(sp.Eq((xx ** 2 - 2 * xx + 120) - (12 * xx - 120), 360), xx) if r_ > 10], [20])
chk('LĐ4 đề 2: biểu thức', sp.expand((3 * xx - 3) * (xx - 3) - (3 * xx ** 2 - 12 * xx + 9)), 0)
chk('LĐ4 đề 2: x', [r_ for r_ in sp.solve(sp.Eq(3 * xx ** 2 - 12 * xx + 9, 969), xx) if r_ > 3], [20])
chk('LĐ4 đề 3: x', [r_ for r_ in sp.solve(sp.Eq(sp.Rational(5, 2) * xx ** 2 - sp.Rational(314, 400) * xx ** 2, sp.Rational(10976, 100)), xx)], [8])
Rr = sp.symbols('Rr', positive=True)
chk('LĐ4 đề 4: R', sp.solve(sp.Eq(sp.Rational(314, 100) * ((Rr + sp.Rational(3, 2)) ** 2 - Rr ** 2), sp.Rational(6594, 100)), Rr), [sp.Rational(25, 4)])
chk('LĐ4 đề 5: S', sp.Rational(16 * 12, 2), 96); chk('LĐ4 đề 5: n (độ)', round(180 * 16 / (3.14 * 12), 1), 76.4)
chk('LĐ4 đề 6: x', (400 - 3.14 * 50) / 2, 121.5); chk('LĐ4 đề 6: S', 121.5 * 50 + 3.14 * 50 ** 2 / 4, 8037.5, 1e-6)
chk('LĐ4 đề 7: x', sp.solve(sp.Eq((1 - sp.Rational(314, 400)) * xx ** 2, 774), xx), [60]); chk('LĐ4 đề 7: nắp', 0.785 * 3600, 2826, 1e-6)
chk('LĐ4 đề 8: L(60)', 16 * 60 - 1200, -240); chk('LĐ4 đề 8: số ly', next(n for n in range(1000) if 16 * n - 1200 >= 1000), 138)
chk('LĐ4 đề 9: giá', sp.solve(sp.Eq(sp.Rational(235, 100) * xx, 1410000), xx), [600000]); chk('LĐ4 đề 9: chương trình 20% đắt hơn', 3 * 0.8 * 600000 - 1410000, 30000, 1e-6)
chk('LĐ4 đề 10: biểu thức', sp.expand((24 - xx) * (16 - xx) - (xx ** 2 - 40 * xx + 384)), 0)
chk('LĐ4 đề 10: x', [r_ for r_ in sp.solve(sp.Eq(xx ** 2 - 40 * xx + 384, 273), xx) if r_ < 16], [3])

# Bài 4 – đề 11–20
R11 = 30 / math.sin(math.radians(60)); chk('LĐ4 đề 11: R = 20√3', R11, 20 * math.sqrt(3), 1e-9)
l11 = 2 * 3.14 * round(R11, 2) / 3; chk('LĐ4 đề 11: chu vi', round(200 + 2 * round(l11, 2), 1), 345.0)
chk('LĐ4 đề 12: S(120)', 3.14 * (900 - 144) * 120 / 360, 791.28, 1e-6); chk('LĐ4 đề 12: n', 989.1 / (3.14 * (900 - 144) / 360), 150, 1e-9)
chk('LĐ4 đề 13: R', math.sqrt(28.5 * 4 / (3.14 - 2)), 10, 1e-9); chk('LĐ4 đề 13: AB', round(10 * math.sqrt(2), 2), 14.14)
chk('LĐ4 đề 14: x', (1.1304 / 3.14 - 0.09) / 0.6, 0.45, 1e-9)
chk('LĐ4 đề 15: a', [r_ for r_ in sp.solve(sp.Eq((xx + 2) ** 2 - xx ** 2, 3 * xx ** 2), xx)], [2])
chk('LĐ4 đề 16: x', round(math.sqrt(800 / 3.14), 2), 15.96)
chk('LĐ4 đề 17: R', math.sqrt(256.5 / (3.14 - 2)), 15, 1e-9); chk('LĐ4 đề 17: cạnh', round(15 * math.sqrt(2), 2), 21.21)
chk('LĐ4 đề 18: x', sp.solve(sp.Eq((2 * xx + 2) * (xx + 2) - 2 * xx ** 2, 64), xx), [10])
chk('LĐ4 đề 19: x', sp.solve(sp.Eq(2 * ((xx + 30) / 2 + 3 * xx), 2 * (2 * xx + 30)), xx), [10]); chk('LĐ4 đề 19: diện tích', 10 * 40, 400)
T19 = lambda k: 12 + 15 * min(k - 1, 29) + 11 * max(k - 30, 0)
chk('LĐ4 đề 20: công thức (x ≤ 30, x > 30)', all(T19(k) == (15 * k - 3 if k <= 30 else 11 * k + 117) for k in range(2, 80)), True)
chk('LĐ4 đề 20: số km', next(k for k in range(1, 200) if T19(k) == 535), 38)

# ---------- Luyện đề Bài 7a, 7b, 7c (data/vao-10/luyen-de/ld07-hinh-7.js): dựng toạ độ thật, kiểm mọi kết luận số ----------
from math import sqrt as _sq, hypot as _hy, acos as _ac, degrees as _dg
def _cut(P, Q, c, rad):  # giao điểm thứ hai (khác P) của đường thẳng PQ với đường tròn tâm c
    dx, dy = Q[0] - P[0], Q[1] - P[1]; fx, fy = P[0] - c[0], P[1] - c[1]
    a = dx * dx + dy * dy; b = 2 * (fx * dx + fy * dy); cc = fx * fx + fy * fy - rad * rad; dd = _sq(b * b - 4 * a * cc)
    ts = [(-b - dd) / (2 * a), (-b + dd) / (2 * a)]; return [(P[0] + t * dx, P[1] + t * dy) for t in ts]
def _ft(P, Q, S):
    dx, dy = S[0] - Q[0], S[1] - Q[1]; t = ((P[0] - Q[0]) * dx + (P[1] - Q[1]) * dy) / (dx * dx + dy * dy); return (Q[0] + t * dx, Q[1] + t * dy)
def _ar(*P): return abs(sum(P[i][0] * P[(i + 1) % len(P)][1] - P[(i + 1) % len(P)][0] * P[i][1] for i in range(len(P)))) / 2
_d = math.dist; Rr_ = 1.0; O_ = (0, 0)
# Cấu hình 1 (OA = 2R)
A1, B1, C1 = (2, 0), (0.5, _sq(3) / 2), (0.5, -_sq(3) / 2); D1 = (-B1[0], -B1[1]); H1 = (0.5, 0)
E1 = [p_ for p_ in _cut(A1, D1, O_, 1) if _d(p_, D1) > 1e-6][0]
chk('B7 cấu hình 1: AE·AD = AH·AO', _d(A1, E1) * _d(A1, D1), _d(A1, H1) * _d(A1, O_), 1e-9)
chk('B7 cấu hình 1c: AE = 3√7R/7', _d(A1, E1), 3 * _sq(7) / 7, 1e-9); chk('B7 cấu hình 1c: S(ABE) = 3√3R²/7', _ar(A1, B1, E1), 3 * _sq(3) / 7, 1e-9)
# Cấu hình 2 (góc A = 60°)
P_ = lambda t: (math.cos(math.radians(t)), math.sin(math.radians(t)))
A2, B2, C2 = P_(105), P_(215), P_(335); E2, F2, D2 = _ft(B2, A2, C2), _ft(C2, A2, B2), _ft(A2, B2, C2); K2 = (-A2[0], -A2[1])
M2 = ((B2[0] + C2[0]) / 2, (B2[1] + C2[1]) / 2)
chk('B7 cấu hình 2a: ME = MF = MB', (round(_d(M2, E2), 9), round(_d(M2, F2), 9)), (round(_d(M2, B2), 9),) * 2)
chk('B7 cấu hình 2b: AB·AC = 2R·AD', _d(A2, B2) * _d(A2, C2), 2 * _d(A2, D2), 1e-9)
chk('B7 cấu hình 2c: BC = R√3', _d(B2, C2), _sq(3), 1e-9); chk('B7 cấu hình 2c: EF = R√3/2', _d(E2, F2), _sq(3) / 2, 1e-9)
# Cấu hình 3 (AC = R/2)
th = 2 * math.atan(0.5); M3 = (-math.cos(th), math.sin(th)); C3, D3 = (-1, 0.5), (1, 2)
chk('B7 cấu hình 3: C, M, D thẳng hàng và CM = CA', (round(_ar(C3, M3, D3), 9), round(_d(C3, M3), 9)), (0.0, 0.5))
chk('B7 cấu hình 3b: AC·BD = R²', 0.5 * _d((1, 0), D3), 1, 1e-9); chk('B7 cấu hình 3c: CD = 5R/2', _d(C3, D3), 2.5, 1e-9)
chk('B7 cấu hình 3c: S(ABDC) = 5R²/2', _ar((-1, 0), (1, 0), D3, C3), 2.5, 1e-9)
# Cấu hình 4 (R = 5, OM = 13, BC = 8): dựng cát tuyến cách O đúng 3
Mx = 13; th4 = math.asin(3 / 13); u4 = (-math.cos(th4), -math.sin(th4)); I4 = (Mx + 12.649110640673518 * u4[0], 12.649110640673518 * u4[1])
chk('B7 cấu hình 4: OI = 3', _hy(*I4), 3, 1e-9); B4 = (I4[0] - 4 * u4[0], I4[1] - 4 * u4[1]); C4 = (I4[0] + 4 * u4[0], I4[1] + 4 * u4[1])
chk('B7 cấu hình 4: B, C trên đường tròn', (round(_hy(*B4), 9), round(_hy(*C4), 9)), (5.0, 5.0))
chk('B7 cấu hình 4c: MB, MC', (round(_d((13, 0), B4), 6), round(_d((13, 0), C4), 6)), (round(4 * _sq(10) - 4, 6), round(4 * _sq(10) + 4, 6)))
chk('B7 cấu hình 4: MB·MC = MA² = 144', _d((13, 0), B4) * _d((13, 0), C4), 144, 1e-9)
# Cấu hình 5 (AB = 6, AC = 8)
A5, B5, C5 = (0, 4.8), (-3.6, 0), (6.4, 0); H5 = _ft(A5, B5, C5); I5 = ((A5[0] + H5[0]) / 2, (A5[1] + H5[1]) / 2)
E5 = _ft(H5, A5, B5); F5 = _ft(H5, A5, C5)
chk('B7 cấu hình 5: E, F trên đường tròn đường kính AH', (round(_d(I5, E5), 9), round(_d(I5, F5), 9)), (2.4, 2.4))
chk('B7 cấu hình 5c: AE, AF', (round(_d(A5, E5), 6), round(_d(A5, F5), 6)), (3.84, 2.88)); chk('B7 cấu hình 5c: S(AEHF)', _ar(A5, E5, H5, F5), 11.0592, 1e-9)
# Cấu hình 6 (R = 3, OA = 5)
A6 = (5, 0); B6 = (9 / 5, 12 / 5); C6 = (9 / 5, -12 / 5); D6 = (-C6[0], -C6[1])
chk('B7 cấu hình 6: OB ⊥ AB', (B6[0] - 0) * (A6[0] - B6[0]) + B6[1] * (A6[1] - B6[1]), 0, 1e-9)
chk('B7 cấu hình 6b: BD // OA', B6[1] - D6[1], 0, 1e-9); chk('B7 cấu hình 6c: BC, BD', (round(_d(B6, C6), 9), round(_d(B6, D6), 9)), (4.8, 3.6))
chk('B7 cấu hình 6c: S(ABDO)', _ar(A6, B6, D6, O_), 10.32, 1e-9)
# Cấu hình 7 (AC = 2R)
A7, B7, C7 = (-1, 0), (1, 0), (-1, 2); D7 = [p_ for p_ in _cut(B7, C7, O_, 1) if _d(p_, B7) > 1e-6][0]; E7 = (-1, 1)
chk('B7 cấu hình 7b: ED ⊥ OD', (D7[0] - E7[0]) * D7[0] + (D7[1] - E7[1]) * D7[1], 0, 1e-9)
chk('B7 cấu hình 7c: CD = AD = √2R', (round(_d(C7, D7), 9), round(_d(A7, D7), 9)), (round(_sq(2), 9),) * 2); chk('B7 cấu hình 7c: S(ACD) = R²', _ar(A7, C7, D7), 1, 1e-9)
# Cấu hình 8 (R = 5, BC = 8)
A8, B8, C8, D8, H8 = (0, 5), (-4, -3), (4, -3), (0, -5), (0, -3)
chk('B7 cấu hình 8: B trên đường tròn', _hy(*B8), 5, 1e-9); chk('B7 cấu hình 8b: AB² = AH·AD', _d(A8, B8) ** 2, _d(A8, H8) * _d(A8, D8), 1e-9)
chk('B7 cấu hình 8b: BH² = AH·HD', _d(B8, H8) ** 2, _d(A8, H8) * _d(H8, D8), 1e-9); chk('B7 cấu hình 8c: S(ABC)', _ar(A8, B8, C8), 32, 1e-9)
# Cấu hình 9 (OA = 2R): mọi vị trí M trên cung nhỏ BC cho cùng chu vi và cùng góc DOE
def _tg(M_, T_):
    a, b, c, d = M_[0], M_[1], T_[0], T_[1]; det = a * d - b * c; return ((d - b) / det, (a - c) / det)
okc = True
for deg in (-40, -10, 20, 45):
    M9 = P_(deg); D9, E9 = _tg(M9, B1), _tg(M9, C1)
    per = _d(A1, D9) + _d(D9, E9) + _d(E9, A1); ang = _dg(_ac((D9[0] * E9[0] + D9[1] * E9[1]) / (_hy(*D9) * _hy(*E9))))
    okc &= abs(per - 2 * _sq(3)) < 1e-9 and abs(ang - 60) < 1e-9
chk('B7 cấu hình 9: chu vi ADE = 2√3R, góc DOE = 60° (4 vị trí M)', okc, True)
# Cấu hình 10 (R = 5, OH = 3)
C10, D10 = (3, 4), (3, -4)
chk('B7 cấu hình 10: CD, AC', (_d(C10, D10), round(_d((-5, 0), C10), 9)), (8.0, round(4 * _sq(5), 9))); chk('B7 cấu hình 10c: S(ACBD)', _ar((-5, 0), C10, (5, 0), D10), 40, 1e-9)

# ---- Cấu hình 11–20: dựng lại từ giả thiết (R = 1 khi đáp số theo R) ----
def _oth(P, Q, c, rad, not_): return [p_ for p_ in _cut(P, Q, c, rad) if _d(p_, not_) > 1e-7][0]
def _x(A, B, C, D):  # giao hai đường thẳng AB, CD
    (x1, y1), (x2, y2), (x3, y3), (x4, y4) = A, B, C, D; dn = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / dn; return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))
def _tt(T1, T2, rad=1):  # giao hai tiếp tuyến tại T1, T2 của đường tròn tâm O
    a, b, c, d = T1[0], T1[1], T2[0], T2[1]; det = a * d - b * c; return ((d - b) * rad * rad / det, (a - c) * rad * rad / det)
def _tp(S, rad=1, up=1):  # tiếp điểm kẻ từ S trên trục hoành
    c = rad / S[0]; return (rad * c, up * rad * _sq(1 - c * c))
_pp = lambda U, V, W: (U[0] - V[0]) * (W[0] - V[0]) + (U[1] - V[1]) * (W[1] - V[1])  # tích vô hướng tại V
M11 = (3, 0); A11 = _tp(M11); B11 = (A11[0], -A11[1]); C11 = (-A11[0], -A11[1]); H11 = _x(A11, B11, M11, O_); D11 = _oth(M11, C11, O_, 1, C11)
chk('B7 cấu hình 11b: MD·MC = MH·MO', _d(M11, D11) * _d(M11, C11), _d(M11, H11) * 3, 1e-9)
chk('B7 cấu hình 11b: góc MHD = góc MCO', _dg(_ac(_pp(M11, H11, D11) / (_d(M11, H11) * _d(D11, H11)))), _dg(_ac(_pp(M11, C11, O_) / (_d(M11, C11) * 1))), 1e-7)
chk('B7 cấu hình 11c: MA, MD, DH', (round(_d(M11, A11), 9), round(_d(M11, D11), 9), round(_d(D11, H11), 9)), (round(2 * _sq(2), 9), round(4 * _sq(3) / 3, 9), round(4 * _sq(3) / 9, 9)))
# 12: R chưa biết – dựng với OB = 15, AB = 20, kiểm lại AH = 16, OH = 9
B12, C12, A12 = (0, -15), (0, 15), (20, -15); D12 = _oth(A12, C12, O_, 15, C12); H12 = _ft(B12, A12, O_)
chk('B7 cấu hình 12c: AH, OH', (round(_d(A12, H12), 9), round(_d(O_, H12), 9)), (16.0, 9.0)); chk('B7 cấu hình 12a: BD ⊥ AC', _pp(B12, D12, A12), 0, 1e-9)
chk('B7 cấu hình 12b: AH·AO = AD·AC', _d(A12, H12) * 25, _d(A12, D12) * _d(A12, C12), 1e-9); chk('B7 cấu hình 12c: BD ≈ 16,64', round(_d(B12, D12), 2), 16.64)
B13, C13 = (0, 0), (6, 0); xA = 6 / (1 + 1 / _sq(3)); A13 = (xA, xA); M13 = (xA, 0); E13 = _ft(B13, A13, C13); D13 = _ft(C13, A13, B13); H13 = _x(A13, M13, B13, E13)
I13 = ((A13[0] + H13[0]) / 2, (A13[1] + H13[1]) / 2); O13 = (3, 0)
chk('B7 cấu hình 13: góc C = 60°, AC < AB', (round(_dg(_ac(_pp(A13, C13, B13) / (_d(A13, C13) * 6))), 9), _d(A13, C13) < _d(A13, B13)), (60.0, True))
chk('B7 cấu hình 13a: ID = IE = IA', (round(_d(I13, D13), 9), round(_d(I13, E13), 9)), (round(_d(I13, A13), 9),) * 2); chk('B7 cấu hình 13b: ID ⊥ OD', _pp(I13, D13, O13), 0, 1e-9)
chk('B7 cấu hình 13c: AM, S', (round(_d(A13, M13), 9), round(_ar(A13, B13, C13), 9)), (round(9 - 3 * _sq(3), 9), round(27 - 9 * _sq(3), 9)))
S14 = (_sq(5), 0); A14 = _tp(S14); B14 = (A14[0], -A14[1]); F14 = (-B14[0], -B14[1]); ph = math.asin((1 / _sq(2)) / _sq(5))
M14, N14 = _cut(S14, (S14[0] - 10 * math.cos(ph), -10 * math.sin(ph)), O_, 1); E14 = ((M14[0] + N14[0]) / 2, (M14[1] + N14[1]) / 2)
chk('B7 cấu hình 14: MN = R√2, M giữa S và N', (round(_d(M14, N14), 9), _d(S14, M14) < _d(S14, N14)), (round(_sq(2), 9), True)); chk('B7 cấu hình 14a: AF // SO', F14[1] - A14[1], 0, 1e-9)
chk('B7 cấu hình 14b: OE ⊥ MN', _pp(O_, E14, S14), 0, 1e-9); chk('B7 cấu hình 14c: SA, SM, S(SOM)', (round(_d(S14, A14), 9), round(_d(S14, M14), 9), round(_ar(S14, O_, M14), 9)), (2.0, round(_sq(2), 9), 0.5))
A15, B15 = (0, 0), (10, 0); C15 = _x(A15, (1, _sq(3)), B15, (9, 1)); P15 = _ft(B15, A15, C15); Q15 = _ft(A15, B15, C15); K15 = _x(A15, Q15, B15, P15); H15 = _x(C15, K15, A15, B15)
chk('B7 cấu hình 15: P, Q trên (O; 5), AC < BC', (round(_d(P15, (5, 0)), 9), round(_d(Q15, (5, 0)), 9), _d(A15, C15) < _d(B15, C15)), (5.0, 5.0, True))
chk('B7 cấu hình 15b: CH ⊥ AB, AK·AQ = AH·AB', (round(C15[0] - H15[0], 9), round(_d(A15, K15) * _d(A15, Q15) - _d(A15, H15) * 10, 9)), (0.0, 0.0))
chk('B7 cấu hình 15c: AP, BQ, S(APB)', (round(_d(A15, P15), 9), round(_d(B15, Q15), 9), round(_ar(A15, P15, B15), 9)), (5.0, round(5 * _sq(2), 9), round(25 * _sq(3) / 2, 9)))
A16, B16 = (-1, 0), (1, 0); C16 = (-0.5, _sq(3) / 2); D16 = _tt(A16, C16); E16 = _tt(B16, C16)
chk('B7 cấu hình 16: AC = R, CB = R√3', (round(_d(A16, C16), 9), round(_d(C16, B16), 9)), (1.0, round(_sq(3), 9))); chk('B7 cấu hình 16b: góc DOE = 90°, AD·BE = R²', (round(_pp(D16, O_, E16), 9), round(_d(A16, D16) * _d(B16, E16), 9)), (0.0, 1.0))
chk('B7 cấu hình 16c: AD, BE, S(ABED)', (round(_d(A16, D16), 9), round(_d(B16, E16), 9), round(_ar(A16, B16, E16, D16), 9)), (round(_sq(3) / 3, 9), round(_sq(3), 9), round(4 * _sq(3) / 3, 9)))
A17, B17 = (-2, 0), (2, 0); M17 = (-2 + 2 * 0.5, 2 * _sq(3) / 2); P17 = (M17[0], 0); E17 = _tt(A17, M17, 2)
chk('B7 cấu hình 17: M trên (O), MA < MB', (round(_hy(*M17), 9), _d(M17, A17) < _d(M17, B17)), (2.0, True)); chk('B7 cấu hình 17a,b: OE ⊥ AM, OE // BM', (round(_pp(E17, O_, M17) - _pp(E17, O_, A17), 9), round(E17[0] * (M17[1] - B17[1]) - E17[1] * (M17[0] - B17[0]), 9)), (0.0, 0.0))
chk('B7 cấu hình 17c: AM, S(APMQ), EA', (round(_d(A17, M17), 9), round(_d(A17, P17) * _d(M17, P17), 9), round(_d(E17, A17), 9)), (2.0, round(_sq(3), 9), round(2 * _sq(3) / 3, 9)))
S18 = (_sq(5), 0); M18 = _tp(S18); N18 = (M18[0], -M18[1]); H18 = (M18[0], 0); K18 = (1, 0)
chk('B7 cấu hình 18b: MH·KS = KH·MS', _d(M18, H18) * _d(K18, S18), _d(K18, H18) * _d(M18, S18), 1e-9)
_p18 = (_d(M18, N18) + 2 * _d(S18, M18)) / 2; chk('B7 cấu hình 18c: SM, MN, r', (round(_d(S18, M18), 9), round(_d(M18, N18), 9), round(_ar(S18, M18, N18) / _p18, 9)), (2.0, round(4 * _sq(5) / 5, 9), round((5 - _sq(5)) / 5, 9)))
E19 = (-3, 0); A19, B19 = (-1, 0), (1, 0); M19 = (-_tp((3, 0))[0], _tp((3, 0))[1]); C19 = _tt(A19, M19); D19 = _tt(B19, M19)
chk('B7 cấu hình 19: E, C, M, D thẳng hàng', (round(_ar(E19, C19, M19), 9), round(_ar(E19, M19, D19), 9)), (0.0, 0.0)); chk('B7 cấu hình 19b: góc COD = 90°', _pp(C19, O_, D19), 0, 1e-9)
chk('B7 cấu hình 19c: EM, AC, BD, S(ABDC)', tuple(round(v_, 9) for v_ in (_d(E19, M19), _d(A19, C19), _d(B19, D19), _ar(A19, B19, D19, C19))), tuple(round(v_, 9) for v_ in (2 * _sq(2), _sq(2) / 2, _sq(2), 3 * _sq(2) / 2)))
A20, B20 = (-5, 0), (5, 0); C20 = [p_ for p_ in _cut(A20, (A20[0] + 8 * 0.8, 8 * 0.6), O_, 5) if _d(p_, A20) > 1e-7][0]; D20 = _tt(A20, C20, 5); E20 = _x(O_, D20, A20, C20); F20 = (C20[0], 0)
chk('B7 cấu hình 20: AC = 8', _d(A20, C20), 8, 1e-9); chk('B7 cấu hình 20b: OD // BC', D20[0] * (C20[1] - B20[1]) - D20[1] * (C20[0] - B20[0]), 0, 1e-9)
chk('B7 cấu hình 20c: BC, CF, OD, S(OADC)', tuple(round(v_, 9) for v_ in (_d(B20, C20), _d(C20, F20), _hy(*D20), _ar(O_, A20, D20, C20))), tuple(round(v_, 9) for v_ in (6, 4.8, 25 / 3, 100 / 3)))

print('\nKẾT QUẢ:', 'ĐẠT ✓ – mọi đáp số khớp phép tính độc lập' if ok_all else 'CHƯA ĐẠT ✗')
raise SystemExit(0 if ok_all else 1)
