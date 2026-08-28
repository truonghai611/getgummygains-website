# GummyGains — website nháp cho ngách Creatine Gummies

Site tĩnh (HTML/CSS thuần) gồm 7 trang, theo khuyến nghị trong file research: ngách
whey/creatine truyền thống KHÔNG khả thi với Google Search Ads + ngân sách <$300, nhưng
creatine gummies (SEO/content, không chạy ads) là cửa duy nhất còn hợp lý.

## Domain

`gummygains.com` đã bị đăng ký từ 2016 (không mua được). Đã mua **`getgummygains.com`**
(01/08/2026, qua Namecheap) — toàn bộ code (canonical tag, disclosure) đã cập nhật theo domain
này.

## Cấu trúc file
```
website/
├── Dockerfile                              (để Railway build & chạy site)
├── nginx.conf.template                     (nginx lắng nghe đúng cổng Railway cấp)
├── .gitignore
├── index.html                              (trang chủ)
├── best-creatine-gummies-2026.html         (pillar/money page)
├── creatine-gummies-vs-powder.html
├── do-creatine-gummies-work.html
├── best-creatine-gummies-for-women.html
├── disclosure.html                         (affiliate disclosure - bắt buộc theo FTC)
├── about.html
├── css/style.css
└── reviews/                                (thư mục trống, để dành review từng brand sau)
```

Đã có sẵn `git init` + 1 commit đầu tiên trong thư mục này (`git log` sẽ thấy commit
"Initial GummyGains site..."). Bạn chỉ cần tạo repo trên GitHub và push.

## Đẩy code lên GitHub

1. Tạo repo mới (trống, KHÔNG tick "Add README") tại https://github.com/new — đặt tên ví dụ
   `gummygains-website`.
2. Mở terminal, `cd` vào đúng thư mục `website` này (đường dẫn trong folder bạn đã chọn khi
   làm việc với Claude), rồi chạy:
   ```
   git remote add origin https://github.com/<username-cua-ban>/gummygains-website.git
   git branch -M main
   git push -u origin main
   ```
   (Thay `<username-cua-ban>` bằng username GitHub thật. Lệnh này sẽ hỏi đăng nhập GitHub —
   dùng Personal Access Token thay mật khẩu nếu GitHub yêu cầu.)

## Deploy lên Railway

1. Vào https://railway.app → New Project → **Deploy from GitHub repo** → chọn repo
   `gummygains-website` vừa push.
2. Railway tự nhận diện `Dockerfile` trong repo và build bằng nginx — không cần cấu hình gì
   thêm. Build xong Railway tự cấp 1 domain dạng `gummygains-website-production.up.railway.app`,
   chạy công khai ngay.
3. **Gắn domain riêng**: Railway → project → Settings → Networking → Custom Domain → nhập
   `getgummygains.com` (hoặc domain bạn chọn) → Railway trả về 1 bản ghi CNAME → vào trang quản
   lý DNS của nơi bạn mua domain, thêm bản ghi CNAME đó → đợi DNS lan truyền (thường 10 phút -
   vài giờ).
4. Railway có gói miễn phí giới hạn giờ chạy/tháng (Trial/Hobby) — với site tĩnh nhỏ này mức
   tiêu thụ tài nguyên rất thấp, gần như không đáng lo trong giai đoạn mới bắt đầu.

## Việc cần làm TRƯỚC khi public site

1. **Affiliate — Create Wellness: XONG (01/08/2026).** Link thật đã gắn sẵn trong
   `best-creatine-gummies-2026.html`: `https://trycreate.co/15-9KD`. Theo dõi ở
   https://trycreate.superfiliate.com/portal/home (tab Insights).
2. **Affiliate — SWOLY: không ưu tiên.** Site không còn CTA mua SWOLY hoặc link ngoài tới
   `getswoly.com`. Trang review được giữ như nội dung thông tin và chuyển người đọc về Create.
3. **Đọc kỹ điều khoản PPC** của từng chương trình trước khi định chạy quảng cáo trả phí — theo
   file research, phần lớn cấm bid brand keyword.
4. **Không tự nhận đã "test" sản phẩm** nếu bạn chưa thực sự mua và dùng. Nội dung hiện tại cố
   tình viết ở dạng "research-based", không claim đã dùng thử — giữ nguyên tinh thần đó nếu bạn
   viết thêm bài, tránh rủi ro FTC.

## Việc cần làm SAU khi site lên mạng

1. Submit sitemap lên Google Search Console (miễn phí) — dùng đúng domain
   `getgummygains.com` bạn vừa gắn.
2. Viết tiếp các bài trong file `Content Calendar - Creatine Gummies.xlsx` — 18 bài, đã đăng 4,
   còn 14 bài "Cần viết".
3. Theo đúng kế hoạch trong sheet "Khuyến Nghị" của file Excel research: KHÔNG chạy Google Ads
   cho tới khi có ít nhất 1 trang tự nhiên có conversion. Chạy ads sớm với ngách này gần như
   chắc lỗ.

## Giới hạn cần biết

- Tôi không có quyền đăng nhập GitHub/Railway thay bạn — các bước push code và deploy ở trên
  bạn cần tự chạy trên máy mình (hoặc tôi có thể hướng dẫn từng bước trực tiếp nếu bạn muốn làm
  cùng lúc chat).
- Nội dung do tôi viết dựa trên nghiên cứu công khai, KHÔNG phải trải nghiệm thực tế dùng sản
  phẩm. Trước khi công bố rộng, tự đọc lại và điều chỉnh giọng văn cho đúng thương hiệu cá nhân.
- Site chưa có hình ảnh sản phẩm thật. Nên tự chụp hoặc mua ảnh stock hợp lệ trước khi public.
