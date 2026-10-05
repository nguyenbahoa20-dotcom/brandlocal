# HƯỚNG DẪN QUẢN TRỊ WEBSITE THƯƠNG HIỆU CÁ NHÂN "HOANET"
## HỆ THỐNG DANH MỤC & ALBUM DỰ ÁN CÔNG TRÌNH TỰ ĐỘNG

Website thương hiệu cá nhân **HOANET** (Chuyên gia Kỹ thuật CCTV & Hạ tầng mạng) hiện đã được trang bị **Bảng Quản Trị Trực Tiếp Ngay Trên Giao Diện Web (Admin Dashboard Modal)** cùng hệ thống lưu trữ tự động.

Bạn **hoàn toàn không cần sửa code**, chỉ cần mở form trên web, điền thông tin và bấm "Lưu dự án", công trình sẽ hiển thị trực tiếp ngay lập tức!

---

## ⚡ CÁCH 1: THÊM DỰ ÁN TRỰC TIẾP TRÊN WEB BẰNG MODAL QUẢN TRỊ (KHUYÊN DÙNG)

Bạn có thể mở Form Quản Trị bằng 3 vị trí trên website:
1. Nút **`[+ Thêm Công Trình Mới / Quản Trị]`** nằm ngay tại khu vực dự án.
2. Nút **`[Quản Trị]`** ở thanh Menu trên cùng (Header).
3. Nút **`[+ Quản Trị / Thêm Công Trình]`** ở chân trang (Footer).

### Các tính năng có trong Form Quản Trị:
* **Tên dự án**: Nhập tên công trình vừa thi công.
* **Chọn danh mục**: Chọn danh mục có sẵn hoặc chọn `+ Danh mục tùy chỉnh...` để tạo nhóm mới.
* **Tải / chọn ảnh album**:
  * Bấm nút **"Tải Ảnh Từ Thiết Bị (Nhiều ảnh)"** để chọn trực tiếp ảnh từ điện thoại/máy tính của bạn (tự động chuyển đổi hiển thị ngay không cần server).
  * Hoặc dán đường dẫn ảnh: `/assets/projects/ten-anh.jpg`.
  * Có khung xem trước (Preview) tất cả các ảnh trong album, có thể xóa ảnh hoặc bấm "Đặt làm bìa" cho ảnh đẹp nhất.
* **Địa điểm & Khách hàng**: Nhập địa chỉ công trình và tên chủ đầu tư.
* **Quy mô**: Ví dụ `Tòa nhà 6 tầng · 32 Camera IP · 18 Access Point`.
* **Năm hoàn thành**: Ví dụ `Tháng 05/2024` hoặc `2024`.
* **Mô tả công trình**: Nhập chi tiết giải pháp kỹ thuật, yêu cầu thi công.
* **Công nghệ & Thiết bị**: Bấm các nút gợi ý có sẵn (`+ Hikvision ColorVu`, `+ MikroTik CCR`, `+ Cisco Switch`...) hoặc gõ thêm thiết bị mới.
* **Điểm nổi bật**: Thêm các kết quả nghiệm thu bằng gạch đầu dòng.
* **Dự án nổi bật**: Bật công tắc để hiện huy hiệu `⭐ Nổi Bật`.

👉 Bấm nút **"Lưu Dự Án Vào Website"**: Công trình sẽ ngay lập tức được thêm vào đầu danh sách, hiển thị trên giao diện và tự động lưu vào trình duyệt (LocalStorage). Khi bạn F5/reload trang dữ liệu vẫn còn nguyên vẹn!

### Tab Quản Lý & Xuất Code:
* **Tab Danh Sách**: Cho phép bạn xem lại toàn bộ dự án, bấm nút **Sửa** hoặc **Xóa** bất kỳ công trình nào.
* **Tab Xuất Code**: Cung cấp sẵn mã nguồn TypeScript đã được format chuẩn. Bạn chỉ cần bấm "Sao Chép Mã Nguồn" rồi dán vào `src/config/profile.ts` nếu muốn lưu vĩnh viễn vào source code Git.

---

## 📞 1. THÔNG TIN LIÊN HỆ ĐÃ CẬP NHẬT

Số điện thoại hotline và Zalo kỹ thuật đã được đồng bộ toàn diện sang số mới:
* **Số hotline**: `0969 377 524` (Định dạng hiển thị: `0969 377 524`)
* **Link gọi điện thoại trực tiếp**: `tel:0969377524` (tự động kích hoạt ứng dụng quay số trên iPhone & Android)
* **Link Zalo**: `https://zalo.me/0969377524` (mở ngay khung chat Zalo khi khách hàng bấm vào)

Tất cả các nút hành động (Call-To-Action) trên **Header bar**, **Hero section**, **Footer bar**, **Thanh gọi nhanh dưới chân trang di động (Mobile Bar)** và **Form yêu cầu khảo sát (Modal)** đều tự động trỏ về số điện thoại này.

---

## 📸 2. HƯỚNG DẪN THÊM ALBUM / DỰ ÁN CÔNG TRÌNH MỚI

Mỗi khi bạn vừa thi công xong một công trình (văn phòng, nhà xưởng, biệt thự, quán cà phê...), hãy thực hiện theo đúng 3 bước đơn giản sau:

### BƯỚC 1: LƯU HÌNH ẢNH CỦA CÔNG TRÌNH VÀO THƯ MỤC DỰ ÁN
1. Chọn từ 1 đến 5 bức ảnh chụp đẹp nhất tại công trình (ví dụ: ảnh mặt tiền tòa nhà, ảnh tủ rack máy chủ, ảnh góc nhìn camera quan sát, ảnh bố trí access point WiFi).
2. Đổi tên ảnh ngắn gọn, viết liền không dấu (ví dụ: `cong-trinh-moi-1.jpg`, `cong-trinh-moi-2.jpg`).
3. Chép các file ảnh này vào thư mục:
   ```text
   public/assets/projects/
   ```
   *(Ví dụ: file ảnh của bạn sẽ nằm tại `public/assets/projects/cong-trinh-moi-1.jpg`)*

---

### BƯỚC 2: SAO CHÉP (COPY) ĐOẠN MÃ MẪU DỰ ÁN DƯỚI ĐÂY

Dưới đây là đoạn mã mẫu chuẩn hóa (Template Object) đã được thiết kế sẵn:

```typescript
  {
    id: "prj-ten-cong-trinh-moi",
    title: "Thi Công Hạ Tầng Mạng & Camera Tòa Nhà Văn Phòng ABC",
    category: "Doanh Nghiệp & Văn Phòng",
    image: "/assets/projects/cong-trinh-moi-1.jpg",
    images: [
      "/assets/projects/cong-trinh-moi-1.jpg",
      "/assets/projects/cong-trinh-moi-2.jpg",
      "/assets/projects/cong-trinh-moi-3.jpg",
    ],
    scale: "Tòa nhà 5 tầng · 24 Camera AI · Phủ sóng WiFi 6 toàn diện",
    completionDate: "Tháng 04/2024",
    year: "2024",
    location: "Số 123 Đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội",
    client: "Công Ty Cổ Phần Đầu Tư ABC",
    description:
      "Tư vấn thiết kế và trực tiếp thi công hệ thống mạng LAN nội bộ tốc độ cao, kéo cáp Cat6A chống nhiễu, lắp đặt 24 camera IP AI nhận diện chuyển động và cấu hình bộ cân bằng tải Router MikroTik chịu tải 200 nhân viên.",
    technologies: [
      "Camera Hikvision ColorVu 4MP",
      "Router MikroTik RB5009",
      "Switch PoE Cisco 24 Port",
      "WiFi 6 Ruijie Reyee",
      "Tủ Rack 19 inch 15U",
    ],
    highlights: [
      "Hệ thống vận hành ổn định 100%, không bị rớt mạng giờ cao điểm",
      "Hình ảnh camera màu ban đêm sắc nét 24/7, lưu trữ 30 ngày liên tục",
      "Toàn bộ dây cáp được đi âm tường và đánh số port chuyên nghiệp",
    ],
    isFeatured: true,
  },
```

---

### BƯỚC 3: DÁN (PASTE) VÀO FILE `src/config/profile.ts`

1. Mở file `src/config/profile.ts`.
2. Tìm đến vị trí danh sách:
   ```typescript
   export const projects: ProjectItem[] = [
     // 👉 DÁN ĐOẠN CODE MẪU VÀO ĐẦU DANH SÁCH TẠI ĐÂY (NGAY SAU DẤU [ )
     {
       id: "prj-viettien-hanoi",
       ...
     },
   ```
3. Chỉnh sửa lại các thông tin bên trong dấu ngoặc kép `""` cho đúng với công trình thực tế của bạn:
   * **`title`**: Tên công trình / dự án.
   * **`category`**: Danh mục của dự án (chọn 1 trong các nhóm: `"Doanh Nghiệp & Văn Phòng"`, `"Nhà Xưởng & Kho Bãi"`, `"Biệt Thự & Nhà Phố"`, `"Chuỗi Bán Lẻ & F&B"`).
   * **`image`**: Ảnh đại diện chính hiển thị trên thẻ card (hoặc để trống, hệ thống sẽ tự lấy ảnh đầu tiên trong mảng `images`).
   * **`images`**: Mảng chứa danh sách tất cả các ảnh trong album công trình. Bạn có thể thêm 2, 3, 5 hoặc 10 ảnh tùy thích!
   * **`scale`**: Quy mô công trình tóm tắt (ví dụ: `Tòa nhà 6 tầng · 32 mắt camera IP`).
   * **`completionDate`**: Ngày hoặc tháng/năm bàn giao (ví dụ: `Tháng 04/2024` hoặc `15/04/2024`).
   * **`location`**: Địa chỉ thực hiện công trình.
   * **`client`**: Tên khách hàng hoặc tên công ty chủ đầu tư.
   * **`description`**: Mô tả chi tiết giải pháp kỹ thuật và những gì bạn đã làm.
   * **`technologies`**: Danh sách thiết bị và hãng sản xuất bạn đã sử dụng.
   * **`highlights`**: Các cam kết và kết quả đạt được sau khi nghiệm thu.
   * **`isFeatured`**: Đặt `true` nếu bạn muốn hiện nhãn **"⭐ Nổi Bật"** màu xanh ngọc trên thẻ dự án; đặt `false` nếu là dự án thông thường.
4. **Lưu file lại (`Ctrl + S`)**.

Ngay lập tức, Component `ProjectGallery.tsx` sẽ tự động phát hiện dự án mới và:
* Sinh ra một thẻ dự án mới trên giao diện dạng lưới (Cards Grid).
* Hiển thị số lượng ảnh thực tế trong album (ví dụ: `📷 3 ảnh`).
* Khi khách hàng bấm vào nút **"Xem Album & Chi Tiết Công Trình"**, cửa sổ Modal Carousel sẽ mở ra cho phép khách hàng lướt xem từng tấm ảnh trong album bằng nút bấm mũi tên hoặc phím mũi tên trên bàn phím!

---

## 🗑️ 3. CÁCH XÓA HOẶC SỬA MỘT DỰ ÁN

* **Để sửa**: Mở file `src/config/profile.ts`, tìm đến mã `id` của dự án đó và sửa trực tiếp các thông tin bạn muốn.
* **Để xóa**: Chọn trọn vẹn khối ngoặc nhọn `{ ... },` của dự án đó trong mảng `projects` và bấm Delete.

---

## 🏷️ 4. CÁCH THÊM DANH MỤC PHÂN LOẠI MỚI

Nếu bạn muốn có thêm danh mục khác (ví dụ: `"Trường Học & Bệnh Viện"`):
Mở file `src/config/profile.ts`, tìm mục:
```typescript
export const projectCategories: string[] = [
  "Tất Cả",
  "Doanh Nghiệp & Văn Phòng",
  "Nhà Xưởng & Kho Bãi",
  "Biệt Thự & Nhà Phố",
  "Chuỗi Bán Lẻ & F&B",
  "Trường Học & Bệnh Viện", // 👉 Thêm danh mục mới vào đây
];
```
Hệ thống tabs lọc trên website sẽ tự động có thêm nút bấm lọc mới.

---

## 🎨 5. TỔNG HỢP CÁC TỆP TIN TRỌNG TÂM TRONG HỆ THỐNG

| Tệp tin | Vai trò chính |
| :--- | :--- |
| `src/config/profile.ts` | **Trung tâm dữ liệu toàn bộ website**: chứa số điện thoại, Zalo, thông tin cá nhân, màu sắc và mảng `export const projects`. |
| `src/components/ProjectGallery.tsx` | Component hiển thị danh sách thẻ dự án dạng lưới và các tab phân loại. |
| `src/components/ProjectModal.tsx` | Cửa sổ xem chi tiết dự án và duyệt Album ảnh thực tế (Lightbox Carousel). |
| `src/components/Header.tsx` | Menu đầu trang, hiển thị hotline và nút liên hệ nhanh. |
| `src/components/Footer.tsx` | Chân trang và thanh gọi nhanh nổi ở cạnh dưới trên điện thoại di động (Floating Call Bar). |
| `public/assets/projects/` | Thư mục lưu trữ hình ảnh các công trình thực tế của bạn. |
