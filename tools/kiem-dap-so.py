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

print('\nKẾT QUẢ:', 'ĐẠT ✓ – mọi đáp số khớp phép tính độc lập' if ok_all else 'CHƯA ĐẠT ✗')
raise SystemExit(0 if ok_all else 1)
