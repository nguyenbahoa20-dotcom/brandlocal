# HƯỚNG DẪN QUẢN TRỊ WEBSITE THƯƠNG HIỆU CÁ NHÂN "HOANET"
## HỆ THỐNG QUẢN TRỊ NỘI DUNG GIT-BACKED DECAP CMS (TURBO GITHUB BETA)

Website thương hiệu cá nhân **HOANET** (Chuyên gia Kỹ thuật CCTV & Hạ tầng mạng) đã được nâng cấp toàn diện sang mô hình **Git-backed CMS** chuyên nghiệp:
* Toàn bộ thao tác thêm, sửa, xóa dự án và tải ảnh album sẽ được **commit trực tiếp vào repository GitHub `nguyenbahoa20-dotcom/brandlocal` nhánh `main`**.
* Website phía người dùng (frontend) đọc dữ liệu trực tiếp từ tệp `public/content/projects.json` và ảnh từ `raw.githubusercontent.com`.
* **Nội dung mới và ảnh mới sẽ hiển thị ngay sau khi commit mà KHÔNG cần AI Studio phải build lại mã nguồn.**
* **Không lưu trữ dữ liệu bằng LocalStorage**, không lưu ảnh dạng data URL tạm bợ, và **tuyệt đối không nhúng token/PAT/secret vào mã nguồn frontend**.

---

## 🛠️ 1. HƯỚNG DẪN CẤU HÌNH DECAP TURBO (BẮT BUỘC TRƯỚC KHI ĐĂNG NHẬP)

> ⚠️ **LƯU Ý QUAN TRỌNG:** Hệ thống xác thực **CHƯA THỂ HOẠT ĐỘNG NGAY** nếu bạn chưa thay thế `Site ID` thật. Trong tệp cấu hình `public/admin/config.yml` và `admin/config.yml`, giá trị `site_id` hiện đang được để dưới dạng placeholder: `YOUR_DECAP_TURBO_SITE_ID_HERE`.

Để kích hoạt đăng nhập quản trị CMS, bạn thực hiện theo các bước chính thức sau:

### Bước 1: Đăng ký / Đăng nhập Decap Turbo
1. Truy cập cổng dịch vụ Decap Turbo: [https://decapcms.org/turbo](https://decapcms.org/turbo) hoặc cổng quản lý Decap Turbo Portal.
2. Đăng nhập bằng tài khoản GitHub sở hữu repository `nguyenbahoa20-dotcom/brandlocal`.

### Bước 2: Tạo Site mới và Cài đặt GitHub App (Phạm vi tối thiểu - Least Privilege)
1. Trong dashboard của Decap Turbo, bấm **Add New Site** (Tạo trang mới).
2. Khi được yêu cầu cài đặt GitHub App, hãy chọn phạm vi cấp quyền **chỉ cho duy nhất một repository (Only select repositories)**:
   * **Repository**: `nguyenbahoa20-dotcom/brandlocal`
   * *Không chọn "All repositories" để đảm bảo nguyên tắc bảo mật an toàn nhất cho tài khoản GitHub của bạn.*
3. Điền thông tin cấu hình:
   * **Repository**: `nguyenbahoa20-dotcom/brandlocal`
   * **Production Branch**: `main`

### Bước 3: Lấy Site ID và cập nhật vào mã nguồn
1. Sau khi tạo site thành công, Decap Turbo sẽ cung cấp cho bạn một chuỗi **Site ID** (dạng mã UUID, ví dụ: `dcb8a3f1-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
2. Mở tệp `public/admin/config.yml` (và `admin/config.yml` trong mã nguồn):
   ```yaml
   backend:
     name: turbo-github
     repo: nguyenbahoa20-dotcom/brandlocal
     branch: main
     site_id: dcb8a3f1-xxxx-xxxx-xxxx-xxxxxxxxxxxx # 👉 Dán Site ID của bạn vào đây
   ```
3. Lưu tệp và commit lên GitHub nhánh `main`.

---

## 🚀 2. CÁCH TRUY CẬP VÀ SỬ DỤNG DECAP CMS

1. Truy cập đường dẫn: **`https://tên-miền-của-bạn/admin/`** (hoặc bấm nút **CMS** ở góc phải Header / chân trang Footer).
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
