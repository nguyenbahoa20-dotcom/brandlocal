# HƯỚNG DẪN QUẢN TRỊ WEBSITE THƯƠNG HIỆU CÁ NHÂN "HOANET"
## HỆ THỐNG QUẢN TRỊ NỘI DUNG GIT-BACKED DECAP CMS (TURBO GITHUB BETA)

Website thương hiệu cá nhân **HOANET** (Chuyên gia Kỹ thuật CCTV & Hạ tầng mạng) đã được nâng cấp toàn diện sang mô hình **Git-backed CMS** chuyên nghiệp:
* Toàn bộ thao tác thêm, sửa, xóa dự án và tải ảnh album sẽ được **commit trực tiếp vào repository GitHub `nguyenbahoa20-dotcom/brandlocal` nhánh `main`**.
* Website phía người dùng (frontend) đọc dữ liệu trực tiếp từ tệp `public/content/projects.json` và ảnh từ `raw.githubusercontent.com`.
* **Nội dung mới và ảnh mới sẽ hiển thị ngay sau khi commit mà KHÔNG cần AI Studio phải build lại mã nguồn.**
* **Không lưu trữ dữ liệu bằng LocalStorage**, không lưu ảnh dạng data URL tạm bợ, và **tuyệt đối không nhúng token/PAT/secret vào mã nguồn frontend**.

---

## 🛠️ 1. CẤU HÌNH DECAP TURBO (ĐÃ HOÀN TẤT VỚI SITE ID CHÍNH THỨC)

Hệ thống quản trị Decap CMS đã được cấu hình với **Site ID chính thức**: `117f45be-465e-4bc8-bff6-907bbef559dd` trong cả hai tệp `public/admin/config.yml` và `admin/config.yml`:

```yaml
backend:
  name: turbo-github
  repo: nguyenbahoa20-dotcom/brandlocal
  branch: main
  turbo_site_id: 117f45be-465e-4bc8-bff6-907bbef559dd
```

> 💡 **Phân phối Decap CMS Beta (`decap-cms@beta`):** Tệp `public/admin/index.html` được cấu hình sử dụng gói `decap-cms@beta` chính thức từ unpkg để kích hoạt backend `turbo-github`. Backend này hiện được Decap CMS cung cấp trong kênh beta.

### Các bước thiết lập Decap Turbo phía GitHub:
1. Đăng nhập Decap Turbo Portal: [https://decapcms.org/turbo](https://decapcms.org/turbo).
2. Khi cài đặt GitHub App, chọn phạm vi cấp quyền **chỉ cho duy nhất một repository (Only select repositories)**:
   * **Repository**: `nguyenbahoa20-dotcom/brandlocal`
   * *Không chọn "All repositories" để đảm bảo nguyên tắc bảo mật an toàn nhất cho tài khoản GitHub của bạn.*
3. Thông tin kết nối:
   * **Repository**: `nguyenbahoa20-dotcom/brandlocal`
   * **Production Branch**: `main`
   * **Site ID**: `117f45be-465e-4bc8-bff6-907bbef559dd`

---

## 🚀 2. CÁCH TRUY CẬP VÀ SỬ DỤNG DECAP CMS

1. Truy cập đường dẫn điểm vào CMS: **`https://tên-miền-của-bạn/admin/index.html`** (hoặc bấm nút **CMS** ở góc phải Header / chân trang Footer).
   * *Lưu ý: Luôn truy cập qua `/admin/index.html` để nạp trực tiếp giao diện Decap CMS, tránh bị SPA router của website chuyển hướng.*
2. Bấm nút **Login with GitHub** để đăng nhập qua tài khoản GitHub đã được phân quyền quản trị repo.
3. Trong giao diện CMS:
   * Chọn mục **Dự Án Công Trình** -> **Danh Sách Dự Án Công Trình**.
   * Bạn sẽ thấy danh sách 6 dự án hiện có được đọc từ `public/content/projects.json`.
   * **Thêm dự án mới**: Bấm **Add projects**, điền đầy đủ các trường:
     * *ID*: Mã định danh viết liền không dấu (VD: `prj-cong-trinh-moi`).
     * *Tên công trình*: VD: *Hạ Tầng Mạng & Camera Tòa Nhà Văn Phòng ABC*.
     * *Danh mục*: Chọn danh mục phù hợp.
     * *Ảnh đại diện chính*: Tải ảnh từ máy tính lên. Ảnh sẽ tự động được lưu vào thư mục `public/assets/projects/`.
     * *Album hình ảnh*: Thêm nhiều ảnh chụp thực tế tại công trình.
     * *Quy mô, Thời gian hoàn thành, Địa điểm, Khách hàng, Mô tả, Công nghệ sử dụng, Điểm nổi bật, Nổi bật (isFeatured)*.
   * **Chỉnh sửa / Xóa**: Bấm vào bất kỳ dự án nào để chỉnh sửa thông tin hoặc bấm xóa.
4. Bấm **Publish** (Xuất bản) ở góc trên. Decap CMS sẽ tự động tạo một commit mới lên nhánh `main` của repository GitHub `nguyenbahoa20-dotcom/brandlocal`.

---

## 🔄 3. CƠ CHẾ HIỂN THỊ DỮ LIỆU & ẢNH TRÊN WEBSITE

* **Dữ liệu JSON**: Giao diện website tự động gọi tệp `public/content/projects.json` trực tiếp từ địa chỉ:
  ```text
  https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/content/projects.json?t=<timestamp>
  ```
  *(Tham số timestamp tự động thay đổi để tránh việc CDN GitHub lưu bộ nhớ đệm cache quá lâu).*
* **Hình ảnh công trình**: Mọi ảnh tải lên thông qua Decap CMS được lưu tại `public/assets/projects/ten-anh.jpg`. Website tự động chuyển đổi đường dẫn thành URL Raw GitHub:
  ```text
  https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/ten-anh.jpg
  ```
  Nhờ đó, ngay khi ảnh được commit vào repository GitHub, người dùng vào website sẽ nhìn thấy ảnh ngay mà không phụ thuộc vào việc web server có build lại hay không.
* **Nút "Làm mới dữ liệu"**: Phía trên danh sách công trình có nút **"Làm mới dữ liệu"** (biểu tượng xoay tròn). Sau khi vừa bấm Publish từ CMS, bạn có thể bấm nút này để website lập tức kéo dữ liệu mới nhất từ GitHub.
* **Cơ chế dự phòng (Fallback)**: Nếu kết nối mạng tới `raw.githubusercontent.com` bị gián đoạn, website sẽ tự động đọc tệp nội bộ `/content/projects.json` và cấu hình gốc trong `profile.ts`, cam kết giao diện luôn hiển thị đầy đủ, không bao giờ bị lỗi vỡ trang.

---

## 🔒 4. LƯU Ý QUAN TRỌNG VỀ BẢO MẬT & REPOSITORY CÔNG KHAI

1. **Repository là công khai (Public Repo)**:
   * Repository `nguyenbahoa20-dotcom/brandlocal` hiện ở chế độ công khai, do đó các tệp trong `public/content/` và hình ảnh trong `public/assets/projects/` sẽ có thể được xem bởi bất kỳ ai trên internet.
   * **Tuyệt đối không đưa thông tin nhạy cảm vào nội dung**: Không điền mật khẩu quản trị camera/switch/router, không điền địa chỉ IP WAN tĩnh nhạy cảm, không đưa tài liệu bảo mật nội bộ mật của khách hàng lên website.
2. **Không lưu trữ Secret trong mã nguồn**:
   * Hệ thống Decap Turbo sử dụng luồng xác thực GitHub App do Decap Turbo trung gian xử lý an toàn.
   * Mã nguồn frontend không chứa bất kỳ GitHub Personal Access Token (PAT) hay Client Secret nào.
3. **Môi trường AI Studio Preview**:
   * AI Studio là môi trường xem trước (sandbox). Mọi thay đổi mã nguồn trong lượt làm việc này đã được tối ưu để hoạt động độc lập và sẵn sàng đồng bộ trực tiếp lên GitHub thông qua kết nối AI Studio.
