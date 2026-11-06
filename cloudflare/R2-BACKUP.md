# Bản sao ảnh dự án: Decap/GitHub + Cloudflare R2

## Mô hình lưu trữ

- Decap tiếp tục lưu hồ sơ và ảnh chính trên GitHub: ảnh tại `public/assets/projects/`, hồ sơ tại `public/content/project-records/`.
- GitHub Actions chép ảnh đã commit trên `main` sang bucket riêng tư Cloudflare R2.
- Website tiếp tục đọc ảnh từ GitHub như hiện tại; địa chỉ ảnh và cấu hình Decap không đổi.
- Workflow không xóa các đối tượng trong R2 khi ảnh bị xóa khỏi GitHub. Điều này giúp tránh xóa nhầm bản sao lưu.

## Bật sao lưu tự động

1. Trong Cloudflare R2, tạo một bucket riêng, ví dụ `brandlocal-project-image-backup`.
2. Tạo R2 API token chỉ có quyền **Object Read & Write** trên bucket đó. Không dùng token tài khoản tổng và không ghi khóa vào mã nguồn.
3. Trong GitHub repository `nguyenbahoa20-dotcom/brandlocal`, mở **Settings → Secrets and variables → Actions**:
   - Repository secret `R2_ACCESS_KEY_ID`: Access Key ID của R2 token.
   - Repository secret `R2_SECRET_ACCESS_KEY`: Secret Access Key của R2 token.
   - Repository variable `R2_ACCOUNT_ID`: Cloudflare Account ID.
   - Repository variable `R2_BUCKET`: đúng tên bucket.
4. Đưa `.github/workflows/backup-project-images-r2.yml` lên nhánh `main`.
5. Vào **Actions → Back up project images to Cloudflare R2 → Run workflow** để chạy bản sao lần đầu cho toàn bộ ảnh hiện có.
6. Sau đó, mỗi khi Decap commit ảnh lên `main`, workflow tự so sánh và sao chép ảnh mới/thay đổi. Không cần mở bucket công khai hay gắn tên miền.

Nếu thiếu một trong bốn giá trị trên, workflow sẽ dừng và báo thiếu cấu hình. Sau khi tạo secrets/variables, chạy lại workflow thủ công.

## Khôi phục ảnh

Dùng AWS CLI tương thích S3 với endpoint `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` để tải `s3://<BUCKET>/projects` về máy. Ví dụ:

```powershell
$env:AWS_ACCESS_KEY_ID = "<R2_ACCESS_KEY_ID>"
$env:AWS_SECRET_ACCESS_KEY = "<R2_SECRET_ACCESS_KEY>"
aws s3 sync "s3://<BUCKET>/projects" ".\project-images-recovered" `
  --endpoint-url "https://<ACCOUNT_ID>.r2.cloudflarestorage.com" `
  --region auto
```

Thay các giá trị giữ chỗ bằng thông tin tài khoản của bạn. Không chia sẻ lệnh hoặc ảnh chụp có chứa khóa bí mật. Sau đó đưa ảnh cần dùng lại vào `public/assets/projects/` bằng Decap hoặc GitHub để website tiếp tục hiển thị.

## Hiện trạng

Workflow và hướng dẫn đã được thêm vào nhánh triển khai. Tác vụ sao lưu chỉ chạy khi workflow được đưa lên `main` và bốn giá trị R2 được cấu hình trong GitHub Actions. R2 không thay thế bản chính trên GitHub và không tự động sao lưu hồ sơ JSON.
