# Dịch vụ tải nhiều ảnh HOANET

Trang `https://<worker>.workers.dev/gallery-upload.html` chọn nhiều ảnh, xem trước, chọn công trình và gửi một lần. Trang chạy cùng domain Worker nên phiên đăng nhập không phải gửi qua domain thứ ba. Worker chỉ cho tài khoản GitHub được cấu hình đăng nhập; nó ghi ảnh mới và cập nhật mảng `photos.images` của đúng hồ sơ trong một commit trên `main`. Mã nguồn trình duyệt không chứa PAT hay khóa GitHub App.

## Cấu hình một lần

1. Tạo GitHub App chỉ cài trên `nguyenbahoa20-dotcom/brandlocal`, quyền repository **Contents: Read and write**. Ghi lại App ID, Installation ID và tải private key. Chỉ cấp quyền repo `brandlocal`.
2. Điền App ID, Installation ID và đúng username GitHub được phép trong `wrangler.toml`. Cài Cloudflare Wrangler, đăng nhập Cloudflare, rồi trong thư mục `cloudflare` chạy lệnh triển khai lần đầu để lấy địa chỉ Worker:

   ```powershell
   npx wrangler deploy
   ```

3. Tạo GitHub OAuth App dùng xác minh tên tài khoản. Đặt callback URL là `https://<worker>.workers.dev/auth/callback`, lấy Client ID và Client secret, rồi điền Client ID vào `wrangler.toml`.
4. Thêm ba secrets cho Worker bằng lệnh dưới đây. Khi được hỏi, dán private key PEM; với `SESSION_SECRET`, dùng chuỗi ngẫu nhiên dài ít nhất 32 ký tự.

   ```powershell
   npx wrangler secret put GITHUB_APP_PRIVATE_KEY
   npx wrangler secret put GITHUB_OAUTH_CLIENT_SECRET
   npx wrangler secret put SESSION_SECRET
   ```
5. Deploy lại sau khi cập nhật Client ID: `npx wrangler deploy`.
6. Mở `https://<worker>.workers.dev/gallery-upload.html` trên máy tính hoặc điện thoại và đăng nhập GitHub.

Điền đúng tên tài khoản GitHub (username, không phải email) vào `ALLOWED_GITHUB_USERNAME`. Không đưa private key, OAuth secret hoặc session secret vào tệp biến công khai.

Giới hạn mỗi lần gửi: tối đa 20 ảnh, tổng dung lượng 50 MB; loại ảnh JPG/JPEG, PNG, WebP và GIF. Worker từ chối người dùng không nằm trong `ALLOWED_GITHUB_USERNAME` và xác thực OAuth state trước khi tạo phiên đăng nhập.

