export interface ReferenceSource {
  id: number;
  title: string;
  publisher: string;
  topic: string;
  summary: string;
  url: string;
  publishedDate?: string;
  category: 'UNESCO' | 'BỘ CÔNG THƯƠNG' | 'BÁO CHÍNH PHỦ' | 'ĐỊA PHƯƠNG HÀ NỘI';
  officialStatus: 'Chính thức' | 'Cơ quan Nhà nước' | 'Tổ chức Quốc tế';
}

export const OFFICIAL_16_SOURCES: ReferenceSource[] = [
  {
    id: 1,
    title: "Craft of making Đông Hồ Folk woodblock printings",
    publisher: "UNESCO Intangible Cultural Heritage",
    topic: "Nghề làm tranh khắc gỗ dân gian Đông Hồ",
    summary: "Hồ sơ đệ trình của Việt Nam lên UNESCO ghi danh nghề làm tranh khắc gỗ dân gian Đông Hồ (xã Song Hồ, huyện Thuận Thành, tỉnh Bắc Ninh) vào danh mục Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp.",
    url: "https://ich.unesco.org/en/USL/craft-of-making-ong-h-folk-woodblock-printings-01737",
    publishedDate: "2019-12-09",
    category: "UNESCO",
    officialStatus: "Tổ chức Quốc tế"
  },
  {
    id: 2,
    title: "Art of pottery-making of Chăm people",
    publisher: "UNESCO Intangible Cultural Heritage",
    topic: "Nghệ thuật làm gốm của người Chăm",
    summary: "Quyết định ghi danh Nghệ thuật làm gốm truyền thống của người Chăm tại làng Bàu Trúc (Ninh Thuận) và Bình Đức (Bình Thuận) vào Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp của UNESCO năm 2022.",
    url: "https://ich.unesco.org/en/USL/art-of-pottery-making-of-chm-people-01574",
    publishedDate: "2022-11-29",
    category: "UNESCO",
    officialStatus: "Tổ chức Quốc tế"
  },
  {
    id: 3,
    title: "Viet Nam Intangible Cultural Heritage",
    publisher: "UNESCO Intangible Cultural Heritage",
    topic: "Tổng quan các di sản văn hóa phi vật thể của Việt Nam",
    summary: "Trang tổng quan chính thức của UNESCO về các di sản phi vật thể tại Việt Nam được đại diện và bảo vệ theo Công ước 2003, bao gồm nghề thủ công truyền thống và nghệ thuật dân gian.",
    url: "https://ich.unesco.org/en/state/viet-nam-VN",
    publishedDate: "Liên tục cập nhật",
    category: "UNESCO",
    officialStatus: "Tổ chức Quốc tế"
  },
  {
    id: 4,
    title: "Tái hiện làng nghề Việt Nam ngay giữa Thủ đô",
    publisher: "Bộ Công Thương (Cổng thông tin điện tử)",
    topic: "Không gian trưng bày tinh hoa làng nghề truyền thống",
    summary: "Bài viết phản ánh các hoạt động quảng bá, xúc tiến thương mại và trưng bày sản phẩm thủ công mỹ nghệ tiêu biểu tại phố đi bộ hồ Hoàn Kiếm và các trung tâm văn hóa Hà Nội.",
    url: "https://moit.gov.vn/tin-tuc/xuc-tien-thuong-mai/tai-hien-lang-nghe-viet-nam-ngay-giua-thu-do.html",
    publishedDate: "2023-04-12",
    category: "BỘ CÔNG THƯƠNG",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 5,
    title: "Gắn thương hiệu sản phẩm thủ công mỹ nghệ với thương hiệu làng nghề",
    publisher: "Bộ Công Thương (Cổng thông tin điện tử)",
    topic: "Xây dựng thương hiệu và chỉ dẫn địa lý làng nghề",
    summary: "Định hướng chiến lược của ngành Công Thương trong việc bảo hộ nhãn hiệu tập thể, truy xuất nguồn gốc và phát triển chuỗi giá trị bền vững cho sản phẩm thủ công mỹ nghệ Việt Nam.",
    url: "https://moit.gov.vn/tin-tuc/xuc-tien-thuong-mai/gan-thuong-hieu-san-pham-thu-cong-my-nghe-voi-thuong-hieu-lang-nghe.html",
    publishedDate: "2023-08-18",
    category: "BỘ CÔNG THƯƠNG",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 6,
    title: "Làng nghề xanh, làng nghề số trong thời công nghệ 4.0",
    publisher: "Báo Chính phủ (Chuyên trang Thăng Long - Hà Nội)",
    topic: "Chuyển đổi xanh và số hóa quy trình sản xuất làng nghề",
    summary: "Phân tích giải pháp xử lý môi trường kết hợp ứng dụng công nghệ số trong quản lý sản xuất tại các làng nghề tiêu biểu của Hà Nội như Bát Tràng, Vạn Phúc, Duyên Thái.",
    url: "https://thanglong.chinhphu.vn/lang-nghe-xanh-lang-nghe-so-trong-thoi-cong-nghe-40-103221221131418566.htm",
    publishedDate: "2022-12-21",
    category: "BÁO CHÍNH PHỦ",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 7,
    title: "Làng nghề thủ công chuyển mình trong thời đại công nghệ số",
    publisher: "Báo Chính phủ (Chuyên trang Thăng Long - Hà Nội)",
    topic: "Ứng dụng công nghệ tiếp thị và giới thiệu sản phẩm thủ công",
    summary: "Thực tiễn các cơ sở sản xuất thủ công áp dụng nền tảng số, giới thiệu câu chuyện văn hóa sản phẩm và truy xuất dữ liệu sản phẩm phục vụ người tiêu dùng.",
    url: "https://thanglong.chinhphu.vn/lang-nghe-thu-cong-chuyen-minh-trong-thoi-dai-cong-nghe-so-103250221112901713.htm",
    publishedDate: "2025-02-21",
    category: "BÁO CHÍNH PHỦ",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 8,
    title: "Đánh thức làng nghề truyền thống bằng du lịch và sản phẩm OCOP",
    publisher: "Báo Chính phủ (Chuyên trang Thăng Long - Hà Nội)",
    topic: "Chương trình OCOP và phát triển du lịch làng nghề",
    summary: "Đánh giá hiệu quả của việc chuẩn hóa tiêu chuẩn sản phẩm thủ công theo Bộ tiêu chí OCOP 4 sao, 5 sao gắn với trải nghiệm du lịch di sản.",
    url: "https://thanglong.chinhphu.vn/danh-thuc-lang-nghe-truyen-thong-bang-du-lich-va-san-pham-ocop-10325060216035208.htm",
    publishedDate: "2025-06-02",
    category: "BÁO CHÍNH PHỦ",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 9,
    title: "Sản phẩm làng nghề truyền thống: Góp phần phát triển du lịch Thủ đô",
    publisher: "Báo Chính phủ (Chuyên trang Thăng Long - Hà Nội)",
    topic: "Sản phẩm lưu niệm và quảng bá văn hóa du lịch",
    summary: "Vai trò của các dòng sản phẩm thủ công như lụa Vạn Phúc, gốm Bát Tràng, nón Chuông trong việc định vị bản sắc văn hóa du lịch Thủ đô đối với bạn bè quốc tế.",
    url: "https://thanglong.chinhphu.vn/san-pham-lang-nghe-truyen-thong-gop-phan-phat-trien-du-lich-thu-do-10328728.htm",
    publishedDate: "2024-03-15",
    category: "BÁO CHÍNH PHỦ",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 10,
    title: "Thí điểm mô hình bảo tồn, phát triển làng nghề tại Vạn Phúc, Bát Tràng",
    publisher: "Báo Chính phủ (Chuyên trang Thăng Long - Hà Nội)",
    topic: "Bảo tồn không gian di sản làng nghề dệt lụa và gốm sứ",
    summary: "Quyết định triển khai dự án thí điểm bảo tồn kiến trúc cổ, không gian trình diễn kỹ thuật truyền thống và hỗ trợ nghệ nhân bảo lưu bí quyết nghề tại hai làng nghề điểm.",
    url: "https://thanglong.chinhphu.vn/thi-diem-mo-hinh-bao-ton-phat-trien-lang-nghe-tai-lang-nghe-van-phuc-bat-trang-10315641.htm",
    publishedDate: "2021-10-18",
    category: "BÁO CHÍNH PHỦ",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 11,
    title: "Làng nghề Hà Nội ứng dụng số hóa, tự động hóa",
    publisher: "Báo Chính phủ (Chuyên trang Thăng Long - Hà Nội)",
    topic: "Hiện đại hóa công đoạn phụ trợ tại làng nghề gỗ, gốm",
    summary: "Khảo sát thực tế việc ứng dụng máy tiện, máy khắc CNC song song với giữ vững các công đoạn chạm trổ thủ công tinh xảo của nghệ nhân làng chạm khắc gỗ Thiết Úng, Chàng Sơn.",
    url: "https://thanglong.chinhphu.vn/lang-nghe-ha-noi-ung-dung-so-hoa-tu-dong-hoa-103240709104113534.htm",
    publishedDate: "2024-07-09",
    category: "BÁO CHÍNH PHỦ",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 12,
    title: "Thương mại điện tử: Tạo đà cho sản phẩm làng nghề Thủ đô vươn xa",
    publisher: "Báo Chính phủ (Chuyên trang Thăng Long - Hà Nội)",
    topic: "Thương mại điện tử và xúc tiến thị trường quốc tế",
    summary: "Giải pháp hỗ trợ các hộ sản xuất thủ công đưa sản phẩm lên sàn thương mại điện tử, số hóa hồ sơ nguồn gốc để đáp ứng yêu cầu khắt khe của thị trường xuất khẩu.",
    url: "https://thanglong.chinhphu.vn/thuong-mai-dien-tu-tao-da-cho-san-pham-lang-nghe-thu-do-vuon-xa-103240408143937474.htm",
    publishedDate: "2024-04-08",
    category: "BÁO CHÍNH PHỦ",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 13,
    title: "Gìn giữ nghề truyền thống tại làng nghề mây tre đan Phú Vinh",
    publisher: "UBND xã Phú Nghĩa (Cổng thông tin UBND)",
    topic: "Lịch sử và thực trạng làng nghề mây tre đan Phú Vinh",
    summary: "Tài liệu lưu trữ chính thức của chính quyền địa phương giới thiệu lịch sử phát triển hơn 300 năm của làng mây tre đan Phú Vinh, quy trình xử lý nan mây và chính sách bảo tồn của địa phương.",
    url: "https://phunghia.hanoi.gov.vn/van-hoa-xa-hoi/gin-giu-nghe-truyen-thong-tai-lang-nghe-may-tre-dan-phu-vinh-2713251203221646067.htm",
    publishedDate: "2023-12-03",
    category: "ĐỊA PHƯƠNG HÀ NỘI",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 14,
    title: "Lồng bàn đan mây, sản phẩm tiêu biểu của Phú Vinh",
    publisher: "UBND xã Phú Nghĩa (Cổng thông tin UBND)",
    topic: "Hồ sơ kỹ thuật sản phẩm lồng bàn đan mây",
    summary: "Hồ sơ công nhận sản phẩm công nghiệp nông thôn tiêu biểu đối với dòng lồng bàn đan mây tinh xảo của các nghệ nhân Phú Vinh, ghi nhận kích thước, kỹ thuật tạo hoa văn nan đôi và độ bền nguyên liệu.",
    url: "https://phunghia.hanoi.gov.vn/tin-kinh-te/long-ban-dan-may-san-pham-cong-nghiep-nong-thon-tieu-bieu-ket-tinh-tinh-hoa-lang-nghe-may-tre-dan-phu-vinh-2713260318113930207.htm",
    publishedDate: "2024-03-18",
    category: "ĐỊA PHƯƠNG HÀ NỘI",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 15,
    title: "Phát động cuộc thi thiết kế mẫu sản phẩm thủ công mỹ nghệ Hà Nội 2022",
    publisher: "Bộ Công Thương (Trung tâm Khuyến công & Tư vấn phát triển công nghiệp)",
    topic: "Sáng tạo mẫu mã và tiêu chuẩn thẩm mỹ sản phẩm thủ công",
    summary: "Thông báo thể lệ và tiêu chí đánh giá các mẫu thiết kế thủ công mỹ nghệ đổi mới sáng tạo nhưng vẫn giữ trọn hồn cốt văn hóa truyền thống của các nghệ nhân Thủ đô.",
    url: "https://idtc.moit.gov.vn/phat-dong-cuoc-thi-thiet-ke-mau-san-pham-thu-cong-my-nghe-ha-noi-2022/",
    publishedDate: "2022-05-15",
    category: "BỘ CÔNG THƯƠNG",
    officialStatus: "Cơ quan Nhà nước"
  },
  {
    id: 16,
    title: "Xây dựng không gian văn hóa làng nghề Hà Nội",
    publisher: "Báo Chính phủ (Chuyên trang Thăng Long - Hà Nội)",
    topic: "Bảo tồn không gian văn hóa và di sản sống làng nghề",
    summary: "Chiến lược từ di sản truyền thống đến động lực sáng tạo, quy hoạch không gian trưng bày tư liệu, truyền nghề và số hóa tư liệu di sản các làng nghề Thăng Long - Hà Nội.",
    url: "https://thanglong.chinhphu.vn/xay-dung-khong-gian-van-hoa-lang-nghe-ha-noi-tu-di-san-truyen-thong-den-dong-luc-sang-tao-103260115144436577.htm",
    publishedDate: "2026-01-15",
    category: "BÁO CHÍNH PHỦ",
    officialStatus: "Cơ quan Nhà nước"
  }
];
