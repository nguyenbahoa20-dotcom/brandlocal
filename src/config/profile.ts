/**
 * ==============================================================================
 * PROFILE CONFIGURATION - HỒ SƠ & THƯƠNG HIỆU CÁ NHÂN
 * ==============================================================================
 * Bạn có thể dễ dàng thay đổi TOÀN BỘ thông tin cá nhân, logo, dịch vụ, dự án,
 * số điện thoại, mạng xã hội và màu sắc giao diện trực tiếp tại file này!
 * ==============================================================================
 */

export interface ProjectItem {
  id: string;                      // Mã định danh duy nhất (VD: "prj-viettien-hanoi")
  title: string;                   // Tên công trình / dự án
  category: string;                // Phân loại danh mục (Doanh Nghiệp & Văn Phòng, Nhà Xưởng, ...)
  description: string;             // Mô tả ngắn giải pháp & quá trình thi công
  completionDate: string;          // Ngày hoàn thành (VD: "03/2024", "Tháng 03/2024")
  location: string;                // Địa điểm công trình (VD: "97 Đức Giang, Long Biên, Hà Nội")
  technologies: string[];          // Công nghệ & Thiết bị sử dụng
  images: string[];                // Danh sách hình ảnh album thực tế (mảng nhiều ảnh)
  image?: string;                  // Ảnh đại diện chính (tùy chọn, mặc định lấy images[0])
  client?: string;                 // Khách hàng / Chủ đầu tư
  scale?: string;                  // Quy mô công trình
  highlights?: string[];           // Điểm nổi bật kỹ thuật
  isFeatured?: boolean;            // Dự án nổi bật (hiện badge Nổi Bật)
  year?: string;                   // Năm thực hiện (hỗ trợ tương thích ngược)
}

export interface ProfileConfig {
  // 1. THÔNG TIN CƠ BẢN
  name: string;
  brandName: string;
  brandShortName: string;
  title: string;
  badge: string;
  slogan: string;
  description: string;

  // 2. LIÊN HỆ & MẠNG XÃ HỘI
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
    area: string;
    workingHours: string;
    zalo: string;
    zaloNumber: string;
    googleMapsUrl: string;
  };

  social: {
    facebook: string;
    tiktok: string;
    youtube: string;
    github?: string;
    linkedin?: string;
    telegram?: string;
  };

  // 3. HÌNH ẢNH & LOGO
  media: {
    // Thay đổi đường dẫn ảnh tại đây (đặt ảnh vào thư mục /public/assets/)
    logo: string;
    logoAlt: string;
    avatar: string;
    cover: string;
  };

  // 4. MÀU SẮC THƯƠNG HIỆU (Hệ thống tự động áp dụng lên toàn bộ giao diện)
  theme: {
    primary: string;        // Màu chủ đạo (Cyan công nghệ)
    primaryHover: string;   // Màu khi hover
    accent: string;         // Màu điểm nhấn (Sky Blue)
    background: string;     // Màu nền tối sang trọng
    surface: string;        // Màu các khối giao diện
    surfaceCard: string;    // Màu các thẻ card
    border: string;         // Màu viền mỏng
    text: string;           // Màu chữ chính
    textMuted: string;      // Màu chữ phụ
  };

  // 5. GIỚI THIỆU & CHỈ SỐ KINH NGHIỆM
  about: {
    storyHeading: string;
    storyParagraphs: string[];
    philosophyTitle: string;
    philosophyQuote: string;
    stats: Array<{
      value: string;
      label: string;
      description: string;
    }>;
    commitments: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };

  // 6. DỊCH VỤ CHUYÊN NGHIỆP
  services: Array<{
    id: string;
    icon: string;
    title: string;
    tagline: string;
    description: string;
    deliverables: string[];
    targetAudience: string;
    featured?: boolean;
  }>;

  // 7. KỸ NĂNG & THƯƠNG HIỆU THIẾT BỊ
  skills: {
    categories: Array<{
      name: string;
      icon: string;
      description: string;
      skillsList: Array<{
        name: string;
        level: string; // e.g. "Chuyên gia", "Nâng cao"
        highlight?: boolean;
      }>;
    }>;
    supportedBrands: Array<{
      name: string;
      category: string;
      description: string;
    }>;
  };

  // 8. DỰ ÁN TIÊU BIỂU
  projectCategories: string[];
  projects: ProjectItem[];

  // 9. QUÁ TRÌNH LÀM VIỆC & KINH NGHIỆM
  experiences: Array<{
    period: string;
    role: string;
    company: string;
    location: string;
    summary: string;
    achievements: string[];
  }>;

  // 10. CHỨNG CHỈ & ĐÀO TẠO
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
    credentialId?: string;
  }>;

  // 11. ĐÁNH GIÁ TỪ KHÁCH HÀNG & ĐỐI TÁC
  testimonials: Array<{
    name: string;
    role: string;
    organization: string;
    content: string;
    rating: number;
    projectRef: string;
  }>;

  // 12. CẤU HÌNH SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}

/**
 * ==============================================================================
 * DANH SÁCH DANH MỤC & DỰ ÁN CÔNG TRÌNH THỰC TẾ (ALBUM GALLERY)
 * ==============================================================================
 * Bạn có thể dễ dàng THÊM MỚI hoặc CHỈNH SỬA các dự án/album công trình tại đây.
 * Mỗi khi thêm một object dự án vào mảng `projects`, giao diện website sẽ tự động
 * render thêm một thẻ dự án và tạo album ảnh tương ứng!
 * ==============================================================================
 */
export const projectCategories: string[] = [
  "Tất Cả",
  "Doanh Nghiệp & Văn Phòng",
  "Nhà Xưởng & Kho Bãi",
  "Biệt Thự & Nhà Phố",
  "Chuỗi Bán Lẻ & F&B",
];

export const projects: ProjectItem[] = [
  {
    id: "prj-viettien-hanoi",
    title: "Hạ Tầng Mạng & Camera Tòa Nhà Văn Phòng Việt Tiến 97 Đức Giang",
    category: "Doanh Nghiệp & Văn Phòng",
    image: "/assets/projects/project-viettien-office.svg",
    images: [
      "/assets/projects/project-viettien-office.svg",
      "/assets/projects/project-server-rack.svg",
      "/assets/projects/project-enterprise-network.svg",
    ],
    scale: "Tòa Nhà Văn Phòng Hiện Đại · 32 Camera IP 4K · Hệ Thống WiFi Doanh Nghiệp Chịu Tải Cao",
    completionDate: "Tháng 03/2024",
    year: "2024",
    location: "97 Đức Giang, Long Biên, Hà Nội",
    client: "Tổng Công Ty CP May Việt Tiến (Chi Nhánh Văn Phòng Hà Nội)",
    description:
      "Tư vấn giải pháp, thiết kế sơ đồ kỹ thuật và thi công trọn gói hệ thống hạ tầng mạng LAN/WiFi văn phòng cùng hệ thống camera an ninh giám sát IP độ phân giải cao tại tòa nhà văn phòng Việt Tiến (97 Đức Giang, Long Biên, Hà Nội). Quy hoạch tủ mạng trung tâm chuẩn Rack, đi dây âm thẩm mỹ và cấu hình bảo mật đa tầng.",
    technologies: [
      "Hikvision IP ColorVu 4K",
      "MikroTik CCR Gigabit",
      "Switch Cisco PoE 48 Port",
      "Ruijie WiFi 6 Enterprise",
      "Tủ Rack 27U & Thanh PDU",
    ],
    highlights: [
      "Phủ sóng WiFi 6 toàn diện các tầng văn phòng, đảm bảo đường truyền họp trực tuyến & hội nghị video mượt mà",
      "Hệ thống 32 camera IP sắc nét bao quát sảnh lễ tân, khu vực văn phòng mở, hành lang, phòng máy chủ và bãi đỗ xe",
      "Quy hoạch tủ Rack mạng tiêu chuẩn với patch panel và đánh số port chi tiết, thuận tiện cho việc vận hành và nâng cấp",
    ],
    isFeatured: true,
  },
  {
    id: "prj-tech-corp",
    title: "Hạ Tầng Mạng 10Gbps & Camera AI Trụ Sở TechCorp",
    category: "Doanh Nghiệp & Văn Phòng",
    image: "/assets/projects/project-enterprise-network.svg",
    images: [
      "/assets/projects/project-enterprise-network.svg",
      "/assets/projects/project-server-rack.svg",
      "/assets/projects/project-viettien-office.svg",
    ],
    scale: "5 Tầng lầu · 350 Nhân sự · 40 Camera AI · 18 Access Point WiFi 6",
    completionDate: "Tháng 01/2024",
    year: "2024",
    location: "Khu Công Nghệ Cao, TP. Thủ Đức, TP.HCM",
    client: "Tập Đoàn Công Nghệ TechCorp",
    description:
      "Thiết kế trọn gói từ bản vẽ đến thi công hạ tầng mạng trục cáp quang 10Gbps, hệ thống camera AI nhận diện khuôn mặt điểm danh nhân sự và phủ sóng WiFi 6 roaming không góc chết cho 350 kỹ sư phần mềm làm việc liên tục.",
    technologies: [
      "MikroTik CCR2004",
      "Cisco Catalyst 48P",
      "Aruba AP22",
      "Hikvision 4K AcuSense",
      "Cáp quang OM3",
    ],
    highlights: [
      "Băng thông 10Gbps giữa các tầng lầu không bao giờ xảy ra nghẽn cổ chai",
      "Cân bằng tải 3 đường cáp quang VNPT, Viettel, FPT tự động chuyển tuyến khi đứt cáp quang biển",
      "Tách biệt hoàn toàn VLAN Kỹ thuật, Hành chính, Khách và Camera an ninh",
    ],
    isFeatured: true,
  },
  {
    id: "prj-factory-cctv",
    title: "Hệ Thống 64 Camera 4K AI Cho Cụm Nhà Xưởng Sản Xuất 20.000m²",
    category: "Nhà Xưởng & Kho Bãi",
    image: "/assets/projects/project-cctv-factory.svg",
    images: [
      "/assets/projects/project-cctv-factory.svg",
      "/assets/projects/project-server-rack.svg",
    ],
    scale: "Diện tích 20.000m² · 64 Camera Full-color · 4 Đầu ghi NVR RAID 5",
    completionDate: "Tháng 11/2023",
    year: "2023",
    location: "Khu Công Nghiệp VSIP II, Tỉnh Bình Dương",
    client: "Công Ty TNHH Sản Xuất Bao Bì Đại Á",
    description:
      "Triển khai mạng lưới camera giám sát chuyên dụng môi trường công nghiệp bụi bặm và nhiệt độ cao. Tích hợp AI phát hiện người không đội mũ bảo hộ lao động và cảnh báo xâm nhập khu vực máy dập nguy hiểm.",
    technologies: [
      "Hikvision ColorVu 4K",
      "PTZ Zoom Quang 32X",
      "Switch Công Nghiệp PoE+",
      "Hệ Thống Lưu Trữ RAID 5",
    ],
    highlights: [
      "Quan sát có màu sắc nét ban đêm như ban ngày tại toàn bộ các phân xưởng",
      "Camera PTZ tự động bám theo đối tượng (Smart Tracking) khi phát hiện người đi vào khu vực cấm",
      "Hệ thống lưu trữ 45 ngày liên tục với cơ chế bảo vệ dữ liệu RAID 5 an toàn",
    ],
    isFeatured: true,
  },
  {
    id: "prj-luxury-villa",
    title: "Hạ Tầng Mạng Ẩn Tường & Camera Tàng Hình Biệt Thự Chateau",
    category: "Biệt Thự & Nhà Phố",
    image: "/assets/projects/project-smart-villa.svg",
    images: [
      "/assets/projects/project-smart-villa.svg",
      "/assets/projects/project-enterprise-network.svg",
    ],
    scale: "Biệt thự 3 tầng + Sân vườn 600m² · 16 Camera Dome Âm Trần · 6 WiFi 6 Mesh",
    completionDate: "Tháng 08/2023",
    year: "2023",
    location: "Khu Đô Thị Phú Mỹ Hưng, Quận 7, TP.HCM",
    client: "Gia đình Doanh nhân Trần Anh Tuấn",
    description:
      "Yêu cầu tuyệt đối về mặt thẩm mỹ: không để lộ bất kỳ dây dẫn nào ra ngoài, mắt camera dạng vòm nhỏ gọn sơn trùng màu sơn trần thạch cao. Hệ thống WiFi chuyển vùng siêu mượt khi gia chủ đi từ phòng ngủ xuống sân vườn hay hồ bơi.",
    technologies: [
      "UniFi Dream Machine Pro",
      "UniFi U6 Pro",
      "Dahua Full-Color Dome",
      "Cáp Mạng Cat6A LS Vina",
    ],
    highlights: [
      "Độ trễ Roaming < 30ms, gọi video call Messenger/Zalo khi di chuyển khắp biệt thự không bị ngắt",
      "Bảo mật riêng tư tuyệt đối, vô hiệu hóa hoàn toàn cổng xem camera từ các bên trung gian",
      "Tích hợp kết nối thông suốt với hệ sinh thái nhà thông minh Lumi/Aqara",
    ],
    isFeatured: true,
  },
  {
    id: "prj-coffee-chain",
    title: "Mạng WiFi Marketing & VPN 18 Chi Nhánh Chuỗi The Urban Coffee",
    category: "Chuỗi Bán Lẻ & F&B",
    image: "/assets/projects/project-retail-chain.svg",
    images: [
      "/assets/projects/project-retail-chain.svg",
      "/assets/projects/project-server-rack.svg",
    ],
    scale: "18 Cửa hàng · Quản lý tập trung trên Cloud · 2.500 lượt khách/ngày",
    completionDate: "Tháng 05/2023",
    year: "2023",
    location: "TP. Hồ Chí Minh, Biên Hòa & Vũng Tàu",
    client: "Chuỗi F&B The Urban Coffee",
    description:
      "Thiết lập mạng nội bộ liên kết qua VPN WireGuard giúp các máy POS thanh toán gửi dữ liệu về kho trung tâm tức thì. Trang đăng nhập WiFi Marketing nhận diện thương hiệu giúp tăng 40% lượng người theo dõi Fanpage.",
    technologies: [
      "Ruijie Reyee Cloud",
      "MikroTik RB750Gr3",
      "VPN WireGuard",
      "Hệ thống WiFi Marketing Cloud",
    ],
    highlights: [
      "Khách hàng đông nghẹt giờ cao điểm (150 khách/quán) vẫn xem YouTube Full HD mượt mà",
      "Dữ liệu đơn hàng POS và doanh thu được mã hóa đồng bộ an toàn theo thời gian thực",
      "Quản lý từ xa toàn bộ 18 chi nhánh chỉ với 1 ứng dụng duy nhất trên điện thoại",
    ],
    isFeatured: true,
  },
  {
    id: "prj-datacenter-rehab",
    title: "Chuẩn Hóa & Cải Tạo Tủ Rack Server Trung Tâm Logistics TransLog",
    category: "Doanh Nghiệp & Văn Phòng",
    image: "/assets/projects/project-server-rack.svg",
    images: [
      "/assets/projects/project-server-rack.svg",
      "/assets/projects/project-enterprise-network.svg",
    ],
    scale: "Tủ Rack 42U · Hơn 240 Nốt Mạng Cat6 · Nguồn Dự Phòng UPS 3000VA Online",
    completionDate: "Tháng 02/2023",
    year: "2023",
    location: "Khu Chế Xuất Tân Thuận, Quận 7, TP.HCM",
    client: "Công Ty Cổ Phần Logistics TransLog",
    description:
      "Cải tạo toàn diện tủ mạng đang trong tình trạng 'bụi bặm và mạng nhện dây nối'. Tiến hành đo kiểm, đánh mã nhãn màu chuẩn quốc tế, thay mới Patch Panel và cấu hình lại toàn bộ hệ thống nguồn dự phòng hoạt động tự động khi cúp điện.",
    technologies: [
      "Máy đo Fluke Networks",
      "Patch Panel Cat6A CommScope",
      "APC Smart-UPS 3000VA",
      "Router MikroTik CCR",
    ],
    highlights: [
      "Hoàn tất toàn bộ việc đi lại 240 nốt mạng trong 36 giờ cuối tuần, không làm gián đoạn ngày làm việc",
      "Hệ thống nguồn UPS online chuyển mạch 0ms, máy chủ chạy liên tục khi điện lưới bị sự cố",
      "Cung cấp bản đồ cổng mạng chi tiết, kỹ thuật viên mới của công ty nhìn vào là hiểu ngay",
    ],
    isFeatured: false,
  },
  {
    id: "prj-bida-ung-dai-phi-168",
    title: "Hệ Thống 24 Camera IP 6MP & WiFi Câu Lạc Bộ Bida Ưng Đại Phi 168",
    category: "Chuỗi Bán Lẻ & F&B",
    images: [
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-01.jpg",
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-02.jpg",
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-03.jpg",
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-04.jpg",
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-05.jpg",
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-06.jpg",
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-07.jpg",
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-08.jpg",
      "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-09.jpg",
    ],
    image: "https://raw.githubusercontent.com/nguyenbahoa20-dotcom/brandlocal/main/public/assets/projects/bida-ung-dai-phi-168-01.jpg",
    scale: "24 Camera IP 6MP · NVR 8 kênh + NVR 16 kênh · WiFi khách hàng",
    completionDate: "Tháng 04/2024",
    location: "Khu vực VSIP, Bình Dương",
    client: "Câu Lạc Bộ Bida Ưng Đại Phi 168",
    description: "Lắp đặt hệ thống 24 camera IP độ phân giải 6MP cho Câu Lạc Bộ Bida Ưng Đại Phi 168 tại khu vực VSIP, Bình Dương. Hệ thống ghi hình sử dụng một đầu ghi NVR 8 kênh và một đầu ghi NVR 16 kênh; camera được kết nối qua ba switch PoE 8 cổng Mercusys. Một switch Gigabit Ruijie đảm nhiệm kết nối mạng chính. Công trình đồng thời có hệ thống WiFi phục vụ khách hàng tại câu lạc bộ. Giải pháp được lựa chọn theo nhu cầu sử dụng thực tế, hướng đến khả năng quan sát rõ nét, kết nối WiFi mượt mà cho khách và tối ưu chi phí đầu tư cho chủ đầu tư.",
    technologies: [
      "24 Camera IP 6MP",
      "Đầu ghi NVR 8 kênh",
      "Đầu ghi NVR 16 kênh",
      "3 Switch PoE 8 cổng Mercusys",
      "Switch Gigabit Ruijie",
      "Hệ thống WiFi phục vụ khách hàng",
    ],
    highlights: [
      "24 camera IP 6MP kết hợp một đầu ghi NVR 8 kênh và một đầu ghi NVR 16 kênh",
      "Ba switch PoE 8 cổng Mercusys kết nối hệ thống camera",
      "Một switch Gigabit Ruijie kết nối mạng chính",
      "Hệ thống WiFi phục vụ khách hàng, hướng đến trải nghiệm mượt mà",
      "Tối ưu thiết bị để cân bằng hiệu quả và chi phí đầu tư",
    ],
    isFeatured: false,
  },
];

export const profile: ProfileConfig = {
  // 1. THÔNG TIN CƠ BẢN
  name: "Nguyễn Bá Hòa",
  brandName: "HÒA NETWORK & CCTV",
  brandShortName: "HOANET",
  title: "KỸ THUẬT VIÊN CAO CẤP CCTV & HẠ TẦNG MẠNG",
  badge: "8+ Năm Kinh Nghiệm Thực Chiến",
  slogan: "Giải pháp an ninh thông minh & Hạ tầng mạng doanh nghiệp chịu tải cao",
  description:
    "Chuyên sâu tư vấn, thiết kế, triển khai và bảo trì hệ thống camera giám sát IP/AI công nghệ cao (Hikvision, Dahua, Uniview) và hạ tầng mạng viễn thông doanh nghiệp chịu tải nặng (MikroTik, Cisco, Aruba, Ruijie, UniFi). Cam kết thi công chuẩn kỹ thuật, bảo mật tối đa và thẩm mỹ cao.",

  // 2. LIÊN HỆ & MẠNG XÃ HỘI
  contact: {
    phone: "0969377524",
    phoneDisplay: "0969 377 524",
    email: "nguyenbahoa20@gmail.com",
    address: "TP. Hồ Chí Minh và các khu vực lân cận",
    area: "Chuyên phục vụ TP. Hồ Chí Minh và các khu vực lân cận",
    workingHours: "08:00 - 18:30 (Trực kỹ thuật khẩn cấp 24/7)",
    zalo: "https://zalo.me/0969377524",
    zaloNumber: "0969377524",
    googleMapsUrl: "https://maps.google.com/?q=Ho+Chi+Minh+City",
  },

  social: {
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me",
  },

  // 3. HÌNH ẢNH & LOGO
  media: {
    logo: "/assets/logo.svg",
    logoAlt: "Logo Hòa Network & CCTV",
    avatar: "/assets/avatar.svg",
    cover: "/assets/cover.svg",
  },

  // 4. MÀU SẮC THƯƠNG HIỆU
  theme: {
    primary: "#06b6d4",       // Cyan neon hiện đại, công nghệ cao
    primaryHover: "#0891b2",  // Cyan đậm hơn khi tương tác
    accent: "#38bdf8",        // Sky Blue sáng
    background: "#080d1a",    // Đen xanh viễn thông sâu thẳm
    surface: "#0f172a",       // Khối màu xanh đen sang trọng
    surfaceCard: "#131d33",   // Thẻ card nâng độ sáng nhẹ
    border: "#1e293b",        // Viền hairline tinh tế
    text: "#f8fafc",          // Màu chữ sáng rõ
    textMuted: "#94a3b8",     // Màu chú thích
  },

  // 5. GIỚI THIỆU & CHỈ SỐ KINH NGHIỆM
  about: {
    storyHeading: "Đồng hành cùng an ninh và sự thông suốt kỹ thuật số của bạn",
    storyParagraphs: [
      "Với hơn 8 năm lăn lộn trên các công trình từ văn phòng doanh nghiệp, nhà xưởng sản xuất, chuỗi bán lẻ đến các căn biệt thự sang trọng, tôi hiểu rằng một hệ thống mạng chập chờn hay một mắt camera mất tín hiệu có thể gây thiệt hại lớn cho hoạt động kinh doanh và an toàn tài sản.",
      "Tôi không chỉ bán thiết bị, tôi mang đến một giải pháp kỹ thuật tổng thể: khảo sát hiện trạng tỉ mỉ, tối ưu sơ đồ đi dây chuẩn công nghiệp, cấu hình định tuyến thông minh phân tách VLAN an toàn và thiết lập cơ chế dự phòng failover liền mạch.",
      "Mỗi công trình tôi nhận đều được thực hiện với tinh thần kỷ luật cao nhất: dây bấm chuẩn Cat6A chống nhiễu, đánh nhãn cáp hai đầu rõ ràng, tủ rack gọn gàng như tác phẩm công nghệ và hỗ trợ kỹ thuật tận tâm sau bàn giao.",
    ],
    philosophyTitle: "Triết lý làm nghề",
    philosophyQuote:
      "Một hệ thống tốt là hệ thống vận hành bền bỉ và ổn định đến mức bạn quên mất sự hiện diện của nó, nhưng luôn an tâm tuyệt đối khi cần dữ liệu.",
    stats: [
      {
        value: "8+",
        label: "Năm Kinh Nghiệm",
        description: "Thực chiến thiết kế & triển khai hạ tầng",
      },
      {
        value: "350+",
        label: "Dự Án Hoàn Thành",
        description: "Doanh nghiệp, kho xưởng, biệt thự, chuỗi F&B",
      },
      {
        value: "99.8%",
        label: "Hài Lòng Tuyệt Đối",
        description: "Khách hàng quay lại và giới thiệu đối tác",
      },
      {
        value: "< 30p",
        label: "Ứng Cứu Kỹ Thuật",
        description: "Hỗ trợ online từ xa và có mặt xử lý nhanh",
      },
    ],
    commitments: [
      {
        title: "Thiết Bị Chính Hãng 100%",
        description: "Đầy đủ CO/CQ, bảo hành chính hãng từ 24 đến 36 tháng đổi mới.",
        icon: "ShieldCheck",
      },
      {
        title: "Thẩm Mỹ & Chuẩn Kỹ Thuật",
        description: "Dây đi ống bảo vệ chuyên dụng, tủ rack phân tầng ngăn nắp, đánh nhãn số hóa.",
        icon: "CheckCircle2",
      },
      {
        title: "Bảo Mật Đa Tầng",
        description: "Chống xem lén camera, cô lập mạng khách & nội bộ, chống tấn công brute-force.",
        icon: "Lock",
      },
      {
        title: "Đồng Hành 24/7",
        description: "Hỗ trợ từ xa qua AnyDesk/UltraViewer ngay khi phát sinh thắc mắc hoặc sự cố.",
        icon: "Headphones",
      },
    ],
  },

  // 6. DỊCH VỤ CHUYÊN NGHIỆP
  services: [
    {
      id: "cctv-enterprise",
      icon: "Camera",
      title: "Hệ Thống Camera Giám Sát IP / AI Thông Minh",
      tagline: "Giám sát 24/7 có màu ban đêm, nhận diện biển số & cảnh báo người xâm nhập",
      description:
        "Tư vấn giải pháp camera an ninh chất lượng cao độ phân giải từ 2K đến 4K Ultra HD. Ứng dụng trí tuệ nhân tạo (AI) phân biệt người và phương tiện, cảnh báo còi hú và đèn chớp xua đuổi kẻ gian ngay thời gian thực.",
      deliverables: [
        "Camera ColorVu / Full-color quan sát có màu 24/7 kể cả trong bóng tối tuyệt đối",
        "Công nghệ AI AcuSense / WizSense loại bỏ 98% báo động giả do lá cây hay động vật",
        "Đầu ghi NVR chuẩn nén H.265+ tiết kiệm 80% dung lượng ổ cứng",
        "Phân quyền xem camera theo cấp bậc quản trị, mã hóa luồng dữ liệu an toàn",
        "Xem mượt mà không trễ trên điện thoại, máy tính bảng và máy tính văn phòng",
      ],
      targetAudience: "Nhà xưởng, kho bãi, tòa nhà văn phòng, biệt thự gia đình, chuỗi cửa hàng",
      featured: true,
    },
    {
      id: "network-infrastructure",
      icon: "Network",
      title: "Hạ Tầng Mạng Doanh Nghiệp & WiFi Chịu Tải Cao",
      tagline: "Không nghẽn mạng, roaming liền mạch mượt mà cho 100 - 1000+ người dùng",
      description:
        "Quy hoạch và lắp đặt hệ thống mạng LAN/WAN/WLAN tiêu chuẩn doanh nghiệp. Sử dụng các thiết bị định tuyến chuyên nghiệp (MikroTik, Cisco, Aruba, UniFi) đảm bảo kết nối internet thông suốt cho các buổi hội nghị, livestream và làm việc liên tục.",
      deliverables: [
        "Hệ thống WiFi 6 / WiFi 7 Mesh chuẩn công nghiệp, chuyển vùng Roaming 802.11k/v/r",
        "Gộp băng thông đa đường truyền Internet (Multi-WAN Load Balancing & Auto Failover)",
        "Giới hạn tốc độ theo phòng ban, ưu tiên băng thông (QoS) cho VoIP và phần mềm kế toán",
        "Trang chào Portal Marketing chuyên nghiệp thu thập thông tin khách hàng",
        "Hạ tầng cáp quang nội bộ OM3/OM4 tốc độ 10Gbps kết nối liên tầng/liên xưởng",
      ],
      targetAudience: "Văn phòng công ty, quán café lớn, nhà hàng, khách sạn, trường học, bệnh viện",
      featured: true,
    },
    {
      id: "firewall-vpn",
      icon: "ShieldAlert",
      title: "Tường Lửa Bảo Mật & Kết Nối VPN Chi Nhánh (Site-to-Site)",
      tagline: "Liên kết dữ liệu an toàn tuyệt đối giữa trụ sở chính và các chi nhánh",
      description:
        "Xây dựng đường truyền riêng ảo (VPN WireGuard / IPsec / OpenVPN) tốc độ cao và bảo mật cấp ngân hàng. Cho phép nhân viên làm việc từ xa an toàn truy cập máy chủ nội bộ mà không lo bị lộ lọt dữ liệu.",
      deliverables: [
        "Kết nối đồng bộ phần mềm bán hàng POS, ERP, CRM từ các chi nhánh về server tổng",
        "Cấu hình tường lửa MikroTik / pfSense / Fortinet chống tấn công từ chối dịch vụ DoS/DDoS",
        "Chặn truy cập các trang web độc hại, mạng xã hội hoặc cờ bạc trong giờ làm việc",
        "Tạo tài khoản VPN Client riêng biệt cho từng nhân sự đi công tác hoặc WFH",
        "Cảnh báo tự động về Telegram khi có kết nối lạ hoặc rớt mạng đường truyền",
      ],
      targetAudience: "Doanh nghiệp có chuỗi chi nhánh, công ty sản xuất, đội ngũ làm việc từ xa",
      featured: false,
    },
    {
      id: "server-rack-cleanup",
      icon: "Server",
      title: "Chuẩn Hóa & Dọn Dẹp Tủ Rack Server Chuyên Nghiệp",
      tagline: "Biến mớ dây mạng rối như tơ vò thành tủ rack tiêu chuẩn quốc tế thẩm mỹ cao",
      description:
        "Khảo sát, đo kiểm thông mạch cáp mạng bằng máy Fluke, đi lại dây patch cord theo màu quy chuẩn, lắp đặt thanh quản lý cáp, hệ thống nguồn dự phòng UPS và quạt tản nhiệt làm mát tủ mạng.",
      deliverables: [
        "Đánh số nhãn cáp hai đầu và lập sơ đồ hoàn công chi tiết vị trí từng cổng mạng",
        "Thay thế đầu cáp oxy hóa, bấm hạt mạng Cat6A mạ vàng truyền tín hiệu ổn định 1Gbps - 10Gbps",
        "Tái cấu trúc thiết bị trong tủ mạng: Patch Panel, Switch PoE, Router, NVR, UPS",
        "Tối ưu luồng khí đối lưu làm mát, kéo dài tuổi thọ thiết bị lên gấp 3 lần",
        "Bàn giao tài liệu hướng dẫn vận hành đơn giản cho bộ phận hành chính IT",
      ],
      targetAudience: "Doanh nghiệp có phòng máy chủ lâu năm chưa bảo trì, cần nâng cấp chuẩn ISO",
      featured: false,
    },
    {
      id: "maintenance-support",
      icon: "Wrench",
      title: "Bảo Trì Định Kỳ & Ứng Cứu Sự Cố Hạ Tầng 24/7",
      tagline: "Bác sĩ riêng cho toàn bộ hệ thống mạng và an ninh của doanh nghiệp",
      description:
        "Dịch vụ kiểm tra, vệ sinh thiết bị, cập nhật Firmware vá lỗ hổng bảo mật định kỳ hàng tháng/hàng quý. Sẵn sàng có mặt tận nơi xử lý sự cố đứt cáp, treo mạng, lỗi đầu ghi trong thời gian nhanh nhất.",
      deliverables: [
        "Báo cáo tình trạng sức khỏe ổ cứng lưu trữ camera và tải xử lý của router",
        "Cập nhật bản vá bảo mật mới nhất từ hãng để chống hacker chiếm quyền điều khiển",
        "Cho mượn thiết bị thay thế tương đương ngay lập tức trong thời gian chờ bảo hành",
        "Hotline kỹ thuật ưu tiên 24/7, cam kết thời gian phản hồi không quá 15 phút",
      ],
      targetAudience: "Tất cả cơ quan, văn phòng, nhà xưởng cần duy trì vận hành liên tục không gián đoạn",
      featured: false,
    },
  ],

  // 7. KỸ NĂNG & THƯƠNG HIỆU THIẾT BỊ
  skills: {
    categories: [
      {
        name: "Hệ Thống Camera An Ninh (CCTV)",
        icon: "Camera",
        description: "Thiết kế & cài đặt hệ thống giám sát phân tán",
        skillsList: [
          { name: "Camera IP / PTZ / Fisheye", level: "Chuyên Gia", highlight: true },
          { name: "AI Trí Tuệ Nhân Tạo (Phát hiện người/xe)", level: "Chuyên Gia", highlight: true },
          { name: "Nhận Diện Biển Số Xe (ANPR / LPR)", level: "Thực Chiến", highlight: true },
          { name: "Cấu hình NVR / VMS Tập Trung", level: "Chuyên Gia" },
          { name: "Mã hóa & Lưu trữ RAID / NAS", level: "Nâng Cao" },
          { name: "Phần mềm Hik-Central, Smart PSS", level: "Thực Chiến" },
        ],
      },
      {
        name: "Hạ Tầng Mạng & Viễn Thông (Network)",
        icon: "Network",
        description: "Định tuyến, chuyển mạch và phân tải chuyên sâu",
        skillsList: [
          { name: "RouterOS MikroTik (CCR, RB series)", level: "Chuyên Gia", highlight: true },
          { name: "Cân Bằng Tải Multi-WAN & Failover", level: "Chuyên Gia", highlight: true },
          { name: "Phân chia VLAN & Định Tuyến Inter-VLAN", level: "Chuyên Gia" },
          { name: "Switch Cisco Catalyst / Aruba CX", level: "Nâng Cao" },
          { name: "Mạng Không Dây WiFi Mesh / Roaming", level: "Chuyên Gia", highlight: true },
          { name: "Hạ Tầng Cáp Quang & Hàn Nối Quang", level: "Thực Chiến" },
        ],
      },
      {
        name: "Bảo Mật Mạng & Truy Cập Từ Xa",
        icon: "ShieldCheck",
        description: "Bảo vệ tài nguyên nội bộ và kết nối đa điểm",
        skillsList: [
          { name: "VPN WireGuard / IPsec / OpenVPN", level: "Chuyên Gia", highlight: true },
          { name: "Tường Lửa Firewall / NAT / Mangle", level: "Chuyên Gia" },
          { name: "Chống Tấn Công DoS / Port Scan", level: "Nâng Cao" },
          { name: "Quản lý Băng Thông QoS", level: "Chuyên Gia" },
          { name: "Radius Server & WPA3 Enterprise", level: "Nâng Cao" },
          { name: "Cảnh báo Bot Telegram tự động", level: "Thực Chiến" },
        ],
      },
      {
        name: "Phòng Máy Chủ & Dụng Cụ Đo Kiểm",
        icon: "Cpu",
        description: "Tiêu chuẩn thi công công nghiệp chính xác",
        skillsList: [
          { name: "Bấm Cáp Chuẩn T568A/T568B Cat6A", level: "Chuyên Gia" },
          { name: "Đo Kiểm Fluke Cable Tester", level: "Chuyên Gia" },
          { name: "Quy Chuẩn Tủ Rack 19 inch (TIA/EIA)", level: "Chuyên Gia" },
          { name: "Hệ Thống Nguồn Dự Phòng UPS APC", level: "Thực Chiến" },
          { name: "Synology NAS Backup & Sync", level: "Thực Chiến" },
          { name: "Lập Bản Vẽ & Sơ Đồ Mạng Visio", level: "Thực Chiến" },
        ],
      },
    ],
    supportedBrands: [
      { name: "MikroTik", category: "Routing & Switching", description: "Bộ định tuyến hiệu năng cao hàng đầu thế giới" },
      { name: "Hikvision", category: "CCTV & AI Surveillance", description: "Thương hiệu camera số 1 thế giới về công nghệ ColorVu & AcuSense" },
      { name: "Aruba (HPE)", category: "Enterprise WiFi", description: "Hệ thống WiFi doanh nghiệp ổn định và roaming mượt mà" },
      { name: "Cisco", category: "Network Core", description: "Hạ tầng mạng tiêu chuẩn vàng toàn cầu" },
      { name: "Dahua", category: "CCTV & Security", description: "Giải pháp giám sát WizSense nhận diện khuôn mặt và biển số" },
      { name: "Ruijie / Reyee", category: "Cloud Managed Network", description: "Quản lý đám mây tiện lợi, tối ưu chi phí doanh nghiệp" },
      { name: "UniFi (Ubiquiti)", category: "SDN Network", description: "Hệ sinh thái mạng quản trị đồ họa trực quan đẳng cấp" },
      { name: "APC by Schneider", category: "Power & UPS", description: "Nguồn lưu điện dự phòng an toàn tuyệt đối" },
    ],
  },

  // 8. DỰ ÁN TIÊU BIỂU & ALBUM CÔNG TRÌNH THỰC TẾ
  projectCategories,
  projects,

  // 9. QUÁ TRÌNH LÀM VIỆC & KINH NGHIỆM
  experiences: [
    {
      period: "2021 - HIỆN TẠI",
      role: "Chuyên Gia Độc Lập / Trưởng Nhóm Triển Khai Hệ Thống",
      company: "Hòa Network & CCTV Solutions",
      location: "TP. Hồ Chí Minh & Khu vực Đông Nam Bộ",
      summary:
        "Trực tiếp tiếp nhận yêu cầu, tư vấn kiến trúc giải pháp, thiết kế sơ đồ kỹ thuật và phụ trách thi công các công trình mạng viễn thông & an ninh giám sát quy mô vừa và lớn.",
      achievements: [
        "Đã hoàn thành hơn 200 hợp đồng lắp đặt với tỷ lệ đánh giá 5 sao đạt 99.8%",
        "Tiết kiệm trung bình 25% chi phí đầu tư thiết bị cho khách hàng nhờ giải pháp đúng tải trọng",
        "Xây dựng quy trình thi công 'Dây chuẩn - Tủ sạch - Bảo mật cao' được nhiều đối tác tin cậy",
      ],
    },
    {
      period: "2018 - 2021",
      role: "Kỹ Sư Triển Khai Hạ Tầng Mạng & An Ninh Cấp Cao",
      company: "Công Ty Cổ Phần Công Nghệ & Tích Hợp Hệ Thống Viễn Thông",
      location: "TP. Hồ Chí Minh",
      summary:
        "Phụ trách cấu hình thiết bị định tuyến Cisco, MikroTik, Fortinet và giám sát kỹ thuật các dự án mạng tòa nhà văn phòng, khu công nghiệp.",
      achievements: [
        "Chỉ đạo đội ngũ thi công hơn 50 dự án camera quy mô > 50 mắt cho các nhà máy vốn FDI",
        "Tối ưu hóa hệ thống tường lửa giảm thiểu 90% các đợt quét tấn công mạng tự động",
      ],
    },
    {
      period: "2016 - 2018",
      role: "Kỹ Thuật Viên Hệ Thống Mạng & Thiết Bị Giám Sát",
      company: "Trung Tâm Dịch Vụ Kỹ Thuật Viễn Thông Miền Nam",
      location: "TP. Hồ Chí Minh",
      summary:
        "Bấm mạng, đi dây âm tường, lắp đặt camera analog/IP, bảo trì máy trạm và hỗ trợ kỹ thuật tận nơi cho khách hàng doanh nghiệp.",
      achievements: [
        "Rèn luyện kỹ năng thi công sắc sảo, tính kiên nhẫn và khả năng xử lý sự cố nhanh dưới áp lực cao",
        "Được bình chọn là Kỹ thuật viên xuất sắc nhất quý 4 năm 2017",
      ],
    },
  ],

  // 10. CHỨNG CHỈ & ĐÀO TẠO
  certifications: [
    {
      name: "MTCNA (MikroTik Certified Network Associate)",
      issuer: "MikroTik SIA (Latvia)",
      year: "2020",
      credentialId: "MTCNA-2020-VN-8849",
    },
    {
      name: "HCSA (Hikvision Certified Security Associate)",
      issuer: "Hikvision Academy",
      year: "2019",
      credentialId: "HCSA-SEC-49201",
    },
    {
      name: "CCNA (Cisco Certified Network Associate)",
      issuer: "Cisco Systems",
      year: "2018",
      credentialId: "CSCO-12948201",
    },
    {
      name: "Aruba Instant On Specialist",
      issuer: "Hewlett Packard Enterprise (HPE)",
      year: "2021",
      credentialId: "HPE-AIO-2021",
    },
  ],

  // 11. ĐÁNH GIÁ TỪ KHÁCH HÀNG & ĐỐI TÁC
  testimonials: [
    {
      name: "Anh Hoàng Minh",
      role: "Giám Đốc Vận Hành",
      organization: "TechCorp Vietnam",
      content:
        "Hòa làm việc rất chỉn chu và có trách nhiệm. Từ khâu tư vấn thiết bị đến khi bấm dây tủ mạng đều rất ngăn nắp. Sau khi triển khai hệ thống router MikroTik của Hòa, văn phòng 300 người của chúng tôi không còn tình trạng rớt mạng lúc họp online nữa.",
      rating: 5,
      projectRef: "Hạ tầng mạng TechCorp",
    },
    {
      name: "Chị Thảo Nguyên",
      role: "Quản Lý Chuỗi Cửa Hàng",
      organization: "The Urban Coffee",
      content:
        "Hệ thống camera AI của Hòa giúp mình phát hiện được ngay khi có khách vào quán, quản lý được 18 chi nhánh trên điện thoại mà không hề bị giật lag. Rất ưng ý cách làm việc nhiệt tình, gọi là có mặt hỗ trợ ngay!",
      rating: 5,
      projectRef: "Hệ thống WiFi & Camera chuỗi 18 quán",
    },
    {
      name: "Bác Tuấn Anh",
      role: "Chủ Biệt Thự",
      organization: "Phú Mỹ Hưng, Q.7",
      content:
        "Nhà tôi mới xây xong nội thất rất đắt tiền nên tôi rất sợ thợ khoan đục lung tung. Nhưng Hòa làm cực kỳ cẩn thận, đi dây tàng hình hoàn toàn và hướng dẫn cả nhà tôi dùng app camera rất chu đáo. Rất đáng đồng tiền bát gạo.",
      rating: 5,
      projectRef: "Hệ thống an ninh biệt thự Chateau",
    },
  ],

  // 12. CẤU HÌNH SEO
  seo: {
    title: "Nguyễn Bá Hòa | Chuyên Gia Kỹ Thuật CCTV & Hạ Tầng Mạng Doanh Nghiệp",
    description:
      "Website thương hiệu cá nhân & Portfolio chuyên gia giải pháp an ninh CCTV, hệ thống camera AI, WiFi chịu tải cao và hạ tầng mạng chuyên nghiệp.",
    keywords: [
      "Nguyễn Bá Hòa",
      "Kỹ thuật viên CCTV",
      "Lắp đặt camera an ninh",
      "Hạ tầng mạng doanh nghiệp",
      "Cấu hình MikroTik",
      "Camera AI Hikvision",
      "WiFi văn phòng",
      "VPN chi nhánh",
      "Dọn dẹp tủ rack",
    ],
    ogImage: "/assets/cover.svg",
  },
};
