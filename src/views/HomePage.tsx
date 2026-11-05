import React from 'react';
import { NavTab } from '../components/Navigation';
import { 
  FileEdit, 
  Sparkles, 
  ShieldCheck, 
  FolderClock, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Building2,
  Users,
  ScrollText,
  Search
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: NavTab) => void;
  totalProducts: number;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, totalProducts }) => {
  return (
    <div className="space-y-6">
      {/* Archival Banner / Notice */}
      <div className="retro-frame p-4 sm:p-6 bg-[#fcf9f2] border-2 border-[#543118]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-[#b8860b] pb-4 mb-4">
          <div>
            <div className="font-sans-ui text-xs uppercase font-bold text-[#8b2500] tracking-wider mb-1">
              CỔNG THÔNG TIN VĂN HÓA & LƯU TRỮ TƯ LIỆU THỦ CÔNG VIỆT NAM
            </div>
            <h1 className="font-serif-doc text-2xl sm:text-3xl font-bold text-[#3e220f] leading-tight">
              CRAFT HERITAGE – ĐỀ TÀI F05
            </h1>
            <p className="font-serif-doc text-sm sm:text-base text-[#5c3818] italic mt-1">
              Hệ thống trực tuyến hỗ trợ nghệ nhân, hộ sản xuất và cơ sở làng nghề lập hồ sơ sản phẩm, biên soạn bài giới thiệu và kiểm chứng độ xác thực tư liệu.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-2 font-sans-ui text-xs">
            <button
              onClick={() => onNavigate('create')}
              className="retro-btn-primary px-4 py-2 flex items-center gap-1.5"
            >
              <FileEdit className="w-4 h-4" />
              <span>Tạo hồ sơ mới</span>
            </button>
            <button
              onClick={() => onNavigate('assistant')}
              className="retro-btn-wood px-4 py-2 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span>Trợ lý</span>
            </button>
          </div>
        </div>

        {/* Quick Principles Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans-ui text-xs">
          <div className="bg-[#f5ede0] border border-[#cdbfa8] p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#2e5927] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#3e220f] block mb-0.5">Không bịa đặt lịch sử</strong>
              <span className="text-[#68462b]">AI chỉ biên soạn dựa trên thông tin người dùng và nguồn lưu trữ có thật.</span>
            </div>
          </div>
          <div className="bg-[#f5ede0] border border-[#cdbfa8] p-3 flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-[#8b2500] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#3e220f] block mb-0.5">Cảnh báo "Chưa có nguồn xác minh"</strong>
              <span className="text-[#68462b]">Mọi thông tin thiếu chứng cứ niên đại, danh hiệu đều được gắn nhãn minh bạch.</span>
            </div>
          </div>
          <div className="bg-[#f5ede0] border border-[#cdbfa8] p-3 flex items-start gap-2.5">
            <ScrollText className="w-5 h-5 text-[#b8860b] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#3e220f] block mb-0.5">Cơ sở 16 nguồn chính thức</strong>
              <span className="text-[#68462b]">Tham chiếu trực tiếp UNESCO, Bộ Công Thương, Báo Chính phủ và UBND địa phương.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core 4-step workflow and F05 Scope */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Quy trình 4 bước */}
          <div className="retro-frame overflow-hidden">
            <div className="retro-header-bar px-4 py-2.5 font-sans-ui font-bold text-sm uppercase flex items-center justify-between">
              <span>QUY TRÌNH BIÊN SOẠN & KIỂM CHỨNG HỒ SƠ (4 BƯỚC)</span>
              <span className="text-xs text-[#ebd6b0]">CHUẨN MỰC F05</span>
            </div>
            <div className="p-4 sm:p-5 bg-[#fffdfa] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Step 1 */}
                <div className="border border-[#d3c4ad] bg-[#faf5eb] p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans-ui font-bold text-xs bg-[#543118] text-[#fff9eb] px-2 py-0.5">
                        BƯỚC 1
                      </span>
                      <FileEdit className="w-4 h-4 text-[#543118]" />
                    </div>
                    <h3 className="font-serif-doc font-bold text-base text-[#3e220f] mb-1">
                      Nhập thông tin sản phẩm
                    </h3>
                    <p className="font-serif-doc text-xs text-[#5c3818] leading-relaxed">
                      Khai báo tên sản phẩm, nhóm nghề, làng nghề, chất liệu, kích thước, hoa văn, công dụng, quy trình chế tác và tài liệu tham khảo đã có.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('create')}
                    className="mt-3 text-xs font-sans-ui text-[#8b2500] font-bold hover:underline flex items-center gap-1 self-start"
                  >
                    <span>Mở biểu mẫu nhập liệu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Step 2 */}
                <div className="border border-[#d3c4ad] bg-[#faf5eb] p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans-ui font-bold text-xs bg-[#8b2500] text-[#fff9eb] px-2 py-0.5">
                        BƯỚC 2
                      </span>
                      <Sparkles className="w-4 h-4 text-[#8b2500]" />
                    </div>
                    <h3 className="font-serif-doc font-bold text-base text-[#3e220f] mb-1">
                      AI hỗ trợ biên soạn
                    </h3>
                    <p className="font-serif-doc text-xs text-[#5c3818] leading-relaxed">
                      Sử dụng Trợ lý tổng hợp thành bài giới thiệu 8 phần chuẩn mực. Tuân thủ nghiêm ngặt nguyên tắc không tự sinh dữ liệu giả mạo.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('assistant')}
                    className="mt-3 text-xs font-sans-ui text-[#8b2500] font-bold hover:underline flex items-center gap-1 self-start"
                  >
                    <span>Xem trợ lý</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Step 3 */}
                <div className="border border-[#d3c4ad] bg-[#faf5eb] p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans-ui font-bold text-xs bg-[#2e5927] text-[#fff9eb] px-2 py-0.5">
                        BƯỚC 3
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#2e5927]" />
                    </div>
                    <h3 className="font-serif-doc font-bold text-base text-[#3e220f] mb-1">
                      Kiểm tra thông tin & nguồn
                    </h3>
                    <p className="font-serif-doc text-xs text-[#5c3818] leading-relaxed">
                      Quét từng câu văn trong bài viết, phân loại chính xác: đã có nguồn, tự cung cấp, thiếu căn cứ hoặc có dấu hiệu phóng đại thương mại.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('verifier')}
                    className="mt-3 text-xs font-sans-ui text-[#8b2500] font-bold hover:underline flex items-center gap-1 self-start"
                  >
                    <span>Khởi chạy bộ kiểm tra</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Step 4 */}
                <div className="border border-[#d3c4ad] bg-[#faf5eb] p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans-ui font-bold text-xs bg-[#b8860b] text-[#fff9eb] px-2 py-0.5">
                        BƯỚC 4
                      </span>
                      <FolderClock className="w-4 h-4 text-[#b8860b]" />
                    </div>
                    <h3 className="font-serif-doc font-bold text-base text-[#3e220f] mb-1">
                      Lưu hồ sơ hoàn chỉnh
                    </h3>
                    <p className="font-serif-doc text-xs text-[#5c3818] leading-relaxed">
                      Lưu trữ hồ sơ lâu dài trên máy chủ, tra cứu phân loại theo nhóm nghề, theo dõi tình trạng xác minh và xuất bản hồ sơ dạng PDF / Word.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('saved')}
                    className="mt-3 text-xs font-sans-ui text-[#8b2500] font-bold hover:underline flex items-center gap-1 self-start"
                  >
                    <span>Quản lý hồ sơ đã lưu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Mục tiêu và Vấn đề giải quyết */}
          <div className="retro-frame overflow-hidden">
            <div className="retro-header-bar px-4 py-2 font-sans-ui font-bold text-sm uppercase">
              VẤN ĐỀ ĐỀ TÀI F05 GIẢI QUYẾT & BẢN CHẤT HỆ THỐNG
            </div>
            <div className="p-4 sm:p-5 bg-[#fdfbf7] font-serif-doc text-sm text-[#381f0d] space-y-3 leading-relaxed">
              <p>
                Hiện nay, nhiều sản phẩm thủ công mỹ nghệ và làng nghề truyền thống khi được đưa lên không gian số thường gặp phải tình trạng thiếu hụt hồ sơ tư liệu hoặc tự gán các tuyên bố phóng đại như <em>"lịch sử hàng nghìn năm", "hàng chính gốc độc nhất vô nhị", "được công nhận nghệ nhân nhân dân"</em> mà không có bất kỳ nguồn tư liệu nào đối chiếu.
              </p>
              <div className="p-3 bg-[#f5ede0] border-l-4 border-[#8b2500] my-2 text-xs font-sans-ui text-[#44240e]">
                <strong>Định vị F05:</strong> Đây là hệ thống trực tuyến phục vụ biên soạn, quản lý và kiểm chứng hồ sơ sản phẩm thủ công. 
                <span className="text-[#8b2500] font-bold"> Tuyệt đối không phải là website thương mại điện tử mua bán hàng hóa.</span>
              </div>
              <p>
                Hệ thống <strong>CRAFT HERITAGE</strong> giải quyết bài toán cốt lõi: kết hợp năng lực trích xuất, tổ chức cấu trúc của mô hình ngôn ngữ lớn (Gemini) với cơ chế rà soát kiểm chứng nghiêm ngặt, gắn liền với 16 nguồn tư liệu chính thức được thừa nhận của UNESCO, Bộ Công Thương, Báo Chính phủ và chính quyền các địa phương làng nghề.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Statistics & Target Audiences */}
        <div className="space-y-6">
          {/* Target Audiences */}
          <div className="retro-frame overflow-hidden">
            <div className="retro-header-bar px-4 py-2 font-sans-ui font-bold text-xs uppercase flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#ffd782]" />
              <span>ĐỐI TƯỢNG SỬ DỤNG HỆ THỐNG</span>
            </div>
            <div className="p-3.5 bg-[#ffffff] divide-y divide-[#e5dac6] text-xs font-sans-ui">
              <div className="py-2.5">
                <strong className="text-[#8b2500] block mb-0.5">1. Nghệ nhân & Thợ giỏi làng nghề</strong>
                <p className="text-[#5c3818] font-serif-doc">
                  Số hóa tri thức bản địa, ghi chép tường minh các bước kỹ nghệ chế tác gia truyền mà không lo bị thất truyền.
                </p>
              </div>
              <div className="py-2.5">
                <strong className="text-[#8b2500] block mb-0.5">2. Hộ sản xuất & Hợp tác xã tiểu thủ công</strong>
                <p className="text-[#5c3818] font-serif-doc">
                  Xây dựng hồ sơ sản phẩm chuẩn phục vụ đánh giá phân hạng OCOP, xúc tiến thương mại và làm việc với đối tác quốc tế.
                </p>
              </div>
              <div className="py-2.5">
                <strong className="text-[#8b2500] block mb-0.5">3. Cán bộ văn hóa, xúc tiến & Du lịch</strong>
                <p className="text-[#5c3818] font-serif-doc">
                  Tra cứu nguồn gốc, phân biệt sản phẩm đã kiểm chứng độc lập với các thông tin quảng bá chưa có căn cứ khoa học.
                </p>
              </div>
              <div className="py-2.5">
                <strong className="text-[#8b2500] block mb-0.5">4. Nhà nghiên cứu & Công chúng yêu di sản</strong>
                <p className="text-[#5c3818] font-serif-doc">
                  Tiếp cận kho tư liệu chuẩn mực với 16 nguồn tham khảo chính thức và hồ sơ chi tiết của các sản phẩm có thật.
                </p>
              </div>
            </div>
          </div>

          {/* Repository Summary Widget */}
          <div className="retro-frame overflow-hidden">
            <div className="retro-header-bar px-4 py-2 font-sans-ui font-bold text-xs uppercase flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#ffd782]" />
              <span>DỮ LIỆU TƯ LIỆU HIỆN CÓ</span>
            </div>
            <div className="p-3.5 bg-[#fdfbf7] font-sans-ui text-xs space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-[#e5dac6]">
                <span className="text-[#5c3818]">Tổng số hồ sơ trong kho:</span>
                <span className="font-bold font-mono text-sm text-[#8b2500]">{totalProducts} sản phẩm</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#e5dac6]">
                <span className="text-[#5c3818]">Nguồn tài liệu chuẩn hóa:</span>
                <span className="font-bold font-mono text-sm text-[#2e5927]">16 nguồn chính thức</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#e5dac6]">
                <span className="text-[#5c3818]">Nhóm ngành nghề phủ sóng:</span>
                <span className="font-bold text-[#3e220f]">7 nhóm thủ công</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#5c3818]">Trạng thái kiểm chứng:</span>
                <span className="stamp-badge stamp-verified text-[10px]">ĐÃ ĐỐI CHIẾU NGUỒN</span>
              </div>

              <div className="pt-2 border-t border-[#e5dac6]">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="w-full retro-btn py-1.5 text-xs flex items-center justify-center gap-1 text-[#3e220f]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Khám phá toàn bộ kho sản phẩm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
