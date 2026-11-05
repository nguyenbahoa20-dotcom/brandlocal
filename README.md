# HƯỚNG DẪN QUẢN TRỊ WEBSITE THƯƠNG HIỆU CÁ NHÂN "HOANET"
## HỆ THỐNG QUẢN TRỊ NỘI DUNG GIT-BACKED DECAP CMS (TURBO GITHUB BETA)

Website thương hiệu cá nhân **HOANET** (Chuyên gia Kỹ thuật CCTV & Hạ tầng mạng) đã được nâng cấp toàn diện sang mô hình **Git-backed CMS** chuyên nghiệp:
* Toàn bộ thao tác thêm, sửa, xóa dự án và tải ảnh album sẽ được **commit trực tiếp vào repository GitHub `nguyenbahoa20-dotcom/brandlocal` nhánh `main`**.
* Mỗi công trình được CMS lưu thành một hồ sơ JSON riêng trong `public/content/project-records/`; GitHub Actions tự tổng hợp thành `public/content/projects.json` để website đọc.
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
2. Bấm nút **Login with Turbo** để đăng nhập qua tài khoản GitHub đã được phân quyền quản trị repo.
3. Mở mục **Công trình & dự án**. Mỗi công trình hiện là một hồ sơ riêng, vì vậy bạn có thể tìm và mở riêng dự án cần sửa.
4. Bấm **Thêm công trình** để tạo dự án mới, hoặc mở một hồ sơ hiện có để chỉnh sửa. Biểu mẫu được chia thành bốn phần:
   * **Thông tin cơ bản**: tên, danh mục, địa điểm, thời gian, khách hàng, thứ tự hiển thị và trạng thái nổi bật. Có thể để trống mã công trình để hệ thống tự tạo.
   * **Hình ảnh công trình**: chọn một ảnh bìa và thêm ảnh vào album. Có thể thêm nhiều ảnh, mỗi lần chọn một ảnh.
   * **Giới thiệu giải pháp**: quy mô hệ thống và nội dung giới thiệu.
   * **Thiết bị & điểm nổi bật**: thêm hoặc sửa danh sách thiết bị và các điểm nổi bật.
5. Bấm **Publish** (Xuất bản). Decap lưu hồ sơ và ảnh lên nhánh `main`; GitHub Actions sẽ tự cập nhật tệp tổng hợp cho website.

---

## 🔄 3. CƠ CHẾ HIỂN THỊ DỮ LIỆU & ẢNH TRÊN WEBSITE

* **Dữ liệu hồ sơ**: CMS chỉnh từng hồ sơ trong `public/content/project-records/`. GitHub Actions chạy `scripts/build-project-index.mjs` để cập nhật tệp tổng hợp `public/content/projects.json`, giao diện website đọc tệp này từ địa chỉ:
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
