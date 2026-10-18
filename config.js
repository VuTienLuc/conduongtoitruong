/* =====================================================================
   CẤU HÌNH CHUNG – sửa tên web, người soạn, năm thi, đường link AI tại đây.
   ===================================================================== */
window.CONFIG = {
  brand: ['Con đường', 'tới trường'],       // tên web: chữ thường + chữ màu
  sub: 'Tự học Toán · Ôn thi vào 10 · Lớp 10 – 11 – 12',
  author: 'Người soạn: thầy Vũ Tiến Lực',
  year: '2026 – 2027',
  examLine: 'Kỳ thi tuyển sinh vào lớp 10 TP.HCM, tháng 6/2027 · 120 phút · 7 bài · 10 điểm',
  // Các trợ lý AI học sinh dùng để nhận xét bài (mở tab mới).
  ai: [
    { name: 'ChatGPT', url: 'https://chatgpt.com/' },
    { name: 'Gemini', url: 'https://gemini.google.com/app' },
    { name: 'Claude', url: 'https://claude.ai/new' },
  ],
  // Địa chỉ web sau khi đưa lên mạng (vd 'https://conduongtoitruong.vercel.app/'). Mã QR trên phiếu in trỏ về đây
  // khi phiếu được in từ máy (mở tệp trực tiếp). In từ trang web thật thì tự dùng địa chỉ trang đó.
  siteUrl: '',
  storeKey: 'vao10',                         // tiền tố khoá localStorage
};
