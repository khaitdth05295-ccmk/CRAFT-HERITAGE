import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Layers, 
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { CraftHeritageLogo } from '../components/CraftHeritageLogo';

export const AboutProjectPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Main Section: GIỚI THIỆU ĐỀ TÀI F05 */}
      <div className="retro-frame p-6 bg-[#fcf9f2] border-2 border-[#543118]">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b-2 border-[#543118] pb-4 mb-5">
          <div className="space-y-1">
            <h1 className="font-serif-doc text-2xl sm:text-3xl font-bold text-[#3e220f] tracking-wide">
              GIỚI THIỆU ĐỀ TÀI F05
            </h1>
            <h2 className="font-serif-doc text-lg sm:text-xl font-bold text-[#8b2500]">
              Trợ lý viết hồ sơ giới thiệu sản phẩm thủ công
            </h2>
          </div>
          <div className="p-2.5 bg-[#ffffff] border-2 border-[#b8860b] shadow-sm shrink-0">
            <CraftHeritageLogo size="md" showSubtitle={false} />
          </div>
        </div>

        {/* Narrative Content in Times New Roman */}
        <div className="font-serif-doc text-sm sm:text-base text-[#2b1f17] leading-relaxed space-y-4">
          <p className="font-semibold text-[#44240e] bg-[#f5ede0] p-3 border-l-4 border-[#8b2500]">
            CRAFT HERITAGE được xây dựng từ đề tài F05 – Trợ lý viết hồ sơ giới thiệu sản phẩm thủ công, thuộc Chương trình Thực tập sinh Đợt 15.
          </p>

          <p>
            Sản phẩm thủ công truyền thống Việt Nam không chỉ mang giá trị sử dụng mà còn thể hiện kỹ thuật chế tác, kinh nghiệm lao động, đặc trưng văn hóa và dấu ấn của từng làng nghề. Tuy nhiên, thông tin về nhiều sản phẩm vẫn còn phân tán, chưa được trình bày thống nhất hoặc chưa có hồ sơ giới thiệu đầy đủ.
          </p>

          <p>
            Việc biên soạn nội dung giới thiệu sản phẩm đòi hỏi người thực hiện phải thu thập thông tin về tên gọi, chất liệu, nguyên liệu, kỹ thuật chế tác, đặc điểm, công dụng và địa phương sản xuất. Những thông tin liên quan đến lịch sử, nguồn gốc và giá trị văn hóa cũng cần được đối chiếu với tài liệu đáng tin cậy.
          </p>

          <p>
            Đề tài F05 hướng đến việc ứng dụng công nghệ AI để hỗ trợ quá trình này. Thông qua CRAFT HERITAGE, người dùng có thể nhập thông tin sản phẩm, xây dựng hồ sơ giới thiệu có cấu trúc, sử dụng trợ lý AI để biên soạn nội dung và kiểm tra những thông tin chưa có nguồn chứng minh.
          </p>

          <p>
            Hệ thống hướng đến việc hỗ trợ nghệ nhân, hộ sản xuất, cơ sở làng nghề và những người quan tâm đến sản phẩm thủ công truyền thống trong quá trình thu thập, tổ chức và giới thiệu thông tin sản phẩm.
          </p>
        </div>
      </div>

      {/* 2-Column Grid: NỘI DUNG NGHIÊN CỨU & ĐỐI TƯỢNG SỬ DỤNG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 2: NỘI DUNG NGHIÊN CỨU */}
        <div className="retro-frame bg-[#ffffff] overflow-hidden border-2 border-[#543118]">
          <div className="retro-header-bar px-4 py-2.5 font-sans-ui font-bold text-xs sm:text-sm uppercase flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#ffd782]" />
            <span>NỘI DUNG NGHIÊN CỨU</span>
          </div>
          <div className="p-5 font-serif-doc text-xs sm:text-sm text-[#2b1f17] bg-[#fdfbf7]">
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="font-sans-ui text-xs font-bold text-[#8b2500] shrink-0 mt-0.5">•</span>
                <span>Sản phẩm thủ công truyền thống và đặc trưng của các nhóm nghề.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-sans-ui text-xs font-bold text-[#8b2500] shrink-0 mt-0.5">•</span>
                <span>Chất liệu, nguyên liệu và kỹ thuật chế tác sản phẩm.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-sans-ui text-xs font-bold text-[#8b2500] shrink-0 mt-0.5">•</span>
                <span>Thông tin về làng nghề, địa phương và cơ sở sản xuất.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-sans-ui text-xs font-bold text-[#8b2500] shrink-0 mt-0.5">•</span>
                <span>Phương pháp xây dựng hồ sơ giới thiệu sản phẩm.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-sans-ui text-xs font-bold text-[#8b2500] shrink-0 mt-0.5">•</span>
                <span>Ứng dụng AI trong hỗ trợ biên soạn nội dung.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-sans-ui text-xs font-bold text-[#8b2500] shrink-0 mt-0.5">•</span>
                <span>Đối chiếu thông tin với tài liệu và nguồn tham khảo.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-sans-ui text-xs font-bold text-[#8b2500] shrink-0 mt-0.5">•</span>
                <span>Lưu trữ và tổ chức tư liệu sản phẩm thủ công.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3: ĐỐI TƯỢNG SỬ DỤNG */}
        <div className="retro-frame bg-[#ffffff] overflow-hidden border-2 border-[#543118]">
          <div className="retro-header-bar px-4 py-2.5 font-sans-ui font-bold text-xs sm:text-sm uppercase flex items-center gap-2">
            <Users className="w-4 h-4 text-[#ffd782]" />
            <span>ĐỐI TƯỢNG SỬ DỤNG</span>
          </div>
          <div className="p-5 font-serif-doc text-xs sm:text-sm text-[#2b1f17] bg-[#fdfbf7] flex flex-col justify-between h-[calc(100%-42px)]">
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 p-2.5 bg-[#fcf9f2] border border-[#e5dac6]">
                <CheckCircle2 className="w-4 h-4 text-[#2e5927] shrink-0 mt-0.5" />
                <span>Nghệ nhân và người làm nghề thủ công.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 bg-[#fcf9f2] border border-[#e5dac6]">
                <CheckCircle2 className="w-4 h-4 text-[#2e5927] shrink-0 mt-0.5" />
                <span>Hộ gia đình và cơ sở sản xuất làng nghề.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 bg-[#fcf9f2] border border-[#e5dac6]">
                <CheckCircle2 className="w-4 h-4 text-[#2e5927] shrink-0 mt-0.5" />
                <span>Người nghiên cứu, tìm hiểu văn hóa và nghề truyền thống.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 bg-[#fcf9f2] border border-[#e5dac6]">
                <CheckCircle2 className="w-4 h-4 text-[#2e5927] shrink-0 mt-0.5" />
                <span>Người cần xây dựng nội dung giới thiệu sản phẩm thủ công.</span>
              </li>
            </ul>
            <div className="text-xs font-sans-ui text-[#70451f] italic pt-3 border-t border-[#e5dac6] mt-4">
              * Hệ thống được thiết kế giao diện đơn giản, trực quan, phù hợp với nhiều nhóm đối tượng tiếp cận tư liệu.
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: THÔNG TIN THỰC HIỆN ĐỀ TÀI */}
      <div className="retro-frame bg-[#ffffff] overflow-hidden border-2 border-[#543118]">
        <div className="retro-sub-bar px-4 py-2 font-sans-ui font-bold text-xs sm:text-sm uppercase flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#8b2500]" />
            <span>THÔNG TIN THỰC HIỆN ĐỀ TÀI</span>
          </div>
          <span className="font-mono text-xs text-[#8b2500] font-bold">MÃ SỐ: F05</span>
        </div>

        <div className="p-5 bg-[#fffdfa]">
          <table className="retro-table font-sans-ui text-xs sm:text-sm">
            <tbody>
              <tr>
                <td className="w-1/3 font-bold bg-[#f5ede0] text-[#3e220f]">Tên đề tài:</td>
                <td className="font-serif-doc text-sm sm:text-base font-semibold text-[#1a0f08]">
                  Trợ lý viết hồ sơ giới thiệu sản phẩm thủ công
                </td>
              </tr>
              <tr>
                <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Mã đề tài:</td>
                <td className="font-mono font-bold text-[#8b2500]">F05</td>
              </tr>
              <tr>
                <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Tên website:</td>
                <td className="font-serif-doc font-bold text-[#3e220f]">CRAFT HERITAGE</td>
              </tr>
              <tr>
                <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Sinh viên thực hiện:</td>
                <td className="font-serif-doc font-bold text-base text-[#1a0f08]">Trần Đức Khải</td>
              </tr>
              <tr>
                <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Mã sinh viên:</td>
                <td className="font-mono font-bold text-[#8b2500]">TH05295</td>
              </tr>
              <tr>
                <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Nhóm:</td>
                <td>2</td>
              </tr>
              <tr>
                <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Đơn vị đào tạo:</td>
                <td className="font-semibold text-[#1a0f08]">FPT Polytechnic</td>
              </tr>
              <tr>
                <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Đơn vị phối hợp:</td>
                <td className="font-semibold text-[#1a0f08]">IMTA TECH</td>
              </tr>
              <tr>
                <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Chương trình:</td>
                <td>Thực tập sinh Đợt 15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
