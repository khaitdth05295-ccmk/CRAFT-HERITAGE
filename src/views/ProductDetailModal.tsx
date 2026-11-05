import React from 'react';
import { CraftDossier } from '../types/craft';
import { 
  X, 
  Printer, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  MapPin,
  Layers,
  Wrench,
  Award,
  BookOpen
} from 'lucide-react';

interface ProductDetailModalProps {
  dossier: CraftDossier | null;
  onClose: () => void;
  onOpenAssistant?: (dossier: CraftDossier) => void;
  onOpenVerifier?: (dossier: CraftDossier) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  dossier,
  onClose,
  onOpenAssistant,
  onOpenVerifier,
}) => {
  if (!dossier) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${dossier.name} - Hồ sơ F05</title>
        <style>
          body { font-family: 'Times New Roman', serif; line-height: 1.5; color: #000; padding: 20px; }
          h1 { color: #8b2500; font-size: 22pt; text-align: center; margin-bottom: 5px; }
          .header-info { text-align: center; font-size: 10pt; color: #555; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
          .section-title { font-weight: bold; font-size: 12pt; color: #543118; margin-top: 15px; border-bottom: 1px solid #8b2500; }
          .meta-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .meta-table td { border: 1px solid #999; padding: 6px; font-size: 11pt; }
          .meta-table td.label { font-weight: bold; width: 30%; background: #f2f2f2; }
          .status { font-weight: bold; color: green; }
          .notice { font-style: italic; font-size: 9pt; color: #666; margin-top: 25px; border-top: 1px solid #ccc; padding-top: 5px; }
        </style>
      </head>
      <body>
        <h1>HỒ SƠ TƯ LIỆU SẢN PHẨM THỦ CÔNG TRUYỀN THỐNG</h1>
        <div class="header-info">
          CRAFT HERITAGE • ĐỀ TÀI F05 (FPT POLYTECHNIC × IMTA TECH)<br>
          Sinh viên: Trần Đức Khải - TH05295 - Nhóm 2 • Mã hồ sơ: ${dossier.id}
        </div>

        <table class="meta-table">
          <tr><td class="label">Tên sản phẩm:</td><td><strong>${dossier.name}</strong></td></tr>
          <tr><td class="label">Tên gọi khác:</td><td>${dossier.alternateNames || 'Không có'}</td></tr>
          <tr><td class="label">Nhóm sản phẩm:</td><td>${dossier.category}</td></tr>
          <tr><td class="label">Làng nghề / Địa phương:</td><td>${dossier.villageOrRegion}</td></tr>
          <tr><td class="label">Nghệ nhân / Cơ sở:</td><td>${dossier.artisanOrWorkshop || 'Chưa có thông tin xác minh'}</td></tr>
          <tr><td class="label">Chất liệu chính:</td><td>${dossier.primaryMaterial}</td></tr>
          <tr><td class="label">Nguyên liệu phụ:</td><td>${dossier.secondaryMaterials || 'Không có'}</td></tr>
          <tr><td class="label">Kích thước:</td><td>${dossier.dimensions || 'Chưa đo đạc'}</td></tr>
          <tr><td class="label">Màu sắc & Hoa văn:</td><td>${dossier.colors || 'Màu tự nhiên'} - ${dossier.patterns || 'Hoa văn cổ truyền'}</td></tr>
          <tr><td class="label">Trạng thái kiểm chứng:</td><td class="status">${dossier.verificationStatus}</td></tr>
        </table>

        <div class="section-title">1. CÔNG DỤNG & TÍNH NĂNG</div>
        <p>${dossier.usagePurpose || 'Chưa ghi nhận'}</p>

        <div class="section-title">2. QUY TRÌNH CHẾ TÁC THỦ CÔNG</div>
        <p>${dossier.craftingProcess || 'Chưa có nguồn xác minh'}</p>

        <div class="section-title">3. ĐẶC ĐIỂM NỔI BẬT</div>
        <p>${dossier.distinctiveFeatures || 'Chưa ghi nhận'}</p>

        <div class="section-title">4. CÂU CHUYỆN SẢN PHẨM & GIÁ TRỊ VĂN HÓA</div>
        <p>${dossier.culturalValue || dossier.productStory || 'Chưa có nguồn xác minh'}</p>

        <div class="section-title">5. TÀI LIỆU & NGUỒN THAM KHẢO CHỨNG MINH</div>
        <p>${dossier.referenceSources || 'Chưa có nguồn'}</p>

        ${
          dossier.generatedArticle
            ? `
          <div class="section-title">6. BÀI GIỚI THIỆU CHUẨN CẤU TRÚC DO TRỢ LÝ BIÊN SOẠN</div>
          <h3>${dossier.generatedArticle.title}</h3>
          <p><strong>Tổng quan:</strong> ${dossier.generatedArticle.overview}</p>
          <p><strong>Chất liệu:</strong> ${dossier.generatedArticle.materials}</p>
          <p><strong>Kỹ thuật:</strong> ${dossier.generatedArticle.techniques}</p>
          <p><strong>Công dụng:</strong> ${dossier.generatedArticle.usage}</p>
          <p><strong>Giá trị văn hóa:</strong> ${dossier.generatedArticle.culturalValue}</p>
          <p><strong>Nghệ nhân:</strong> ${dossier.generatedArticle.artisanInfo}</p>
        `
            : ''
        }

        <div class="notice">
          Tài liệu được xuất bản từ hệ thống CRAFT HERITAGE (F05). Dữ liệu tuân thủ nguyên tắc không phóng đại, phân định rõ nội dung đã chứng minh và nội dung tự khai báo.
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ho_So_${dossier.id}_${dossier.name.replace(/\s+/g, '_')}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-none flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="retro-frame bg-[#fdfbf7] max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-[#543118]">
        {/* Header Bar */}
        <div className="retro-header-bar px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-[#8b2500] text-[#fff9ed] px-2 py-0.5 border border-[#3e220f]">
              {dossier.id}
            </span>
            <span className="font-sans-ui font-bold text-sm tracking-wide">
              CHI TIẾT HỒ SƠ TƯ LIỆU SẢN PHẨM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="In hoặc lưu dạng PDF"
              className="retro-btn px-2.5 py-1 text-xs flex items-center gap-1 text-[#3e220f]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">In / Xuất PDF</span>
            </button>
            <button
              onClick={handleExportWord}
              title="Tải văn bản Word (.doc)"
              className="retro-btn px-2.5 py-1 text-xs flex items-center gap-1 text-[#3e220f]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xuất Word</span>
            </button>
            <button
              onClick={onClose}
              className="bg-[#8b2500] hover:bg-[#a62c00] text-white p-1 border border-[#3e220f]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-[#2b1f17]">
          {/* Top Info: Photo + Core Meta */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b-2 border-[#d3c4ad]">
            {/* Image Box */}
            <div className="md:col-span-5 space-y-2">
              <div className="border-2 border-[#543118] bg-[#f5ede0] p-1.5 shadow-inner">
                <img
                  src={dossier.imageUrl}
                  alt={dossier.name}
                  className="w-full h-56 object-cover border border-[#cdbfa8]"
                  onError={(e) => {
                    // Fallback image placeholder
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
              <div className="text-[11px] font-sans-ui text-[#6e4625] italic text-center">
                Hình ảnh lưu trữ mẫu sản phẩm thực địa
              </div>
            </div>

            {/* Core Identification */}
            <div className="md:col-span-7 space-y-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="font-sans-ui text-xs font-bold bg-[#e8dfce] text-[#543118] px-2 py-0.5 border border-[#6b4423]">
                    {dossier.category}
                  </span>
                  <span
                    className={`stamp-badge ${
                      dossier.verificationStatus === 'Đã xác minh'
                        ? 'stamp-verified'
                        : dossier.verificationStatus === 'Chờ bổ sung nguồn'
                        ? 'stamp-pending'
                        : 'stamp-user'
                    }`}
                  >
                    {dossier.verificationStatus}
                  </span>
                </div>
                <h2 className="font-serif-doc text-2xl font-bold text-[#3e220f]">
                  {dossier.name}
                </h2>
                {dossier.alternateNames && (
                  <div className="font-serif-doc text-xs text-[#70451f] italic">
                    Tên gọi khác: {dossier.alternateNames}
                  </div>
                )}
              </div>

              {/* Data Table of Attributes */}
              <table className="retro-table text-xs font-sans-ui">
                <tbody>
                  <tr>
                    <td className="w-1/3 font-bold bg-[#f5ede0] text-[#3e220f]">Địa phương / Làng nghề:</td>
                    <td className="text-[#1a0f08] flex items-center gap-1 font-serif-doc text-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#8b2500] shrink-0" />
                      <span>{dossier.villageOrRegion}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Nghệ nhân / Cơ sở:</td>
                    <td className="font-serif-doc text-sm">
                      {dossier.artisanOrWorkshop ? (
                        <span>{dossier.artisanOrWorkshop}</span>
                      ) : (
                        <span className="text-[#855305] italic">[Chưa có nguồn xác minh danh hiệu/cơ sở]</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Chất liệu chính:</td>
                    <td className="font-serif-doc text-sm">{dossier.primaryMaterial}</td>
                  </tr>
                  {dossier.secondaryMaterials && (
                    <tr>
                      <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Nguyên liệu phụ trợ:</td>
                      <td className="font-serif-doc text-sm">{dossier.secondaryMaterials}</td>
                    </tr>
                  )}
                  {dossier.dimensions && (
                    <tr>
                      <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Kích thước quy chuẩn:</td>
                      <td className="font-serif-doc text-sm">{dossier.dimensions}</td>
                    </tr>
                  )}
                  {dossier.colors && (
                    <tr>
                      <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Màu sắc & Men:</td>
                      <td className="font-serif-doc text-sm">{dossier.colors}</td>
                    </tr>
                  )}
                  {dossier.patterns && (
                    <tr>
                      <td className="font-bold bg-[#f5ede0] text-[#3e220f]">Hoa văn biểu tượng:</td>
                      <td className="font-serif-doc text-sm">{dossier.patterns}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Quy trình chế tác & Đặc điểm */}
          <div className="space-y-4">
            <div className="border border-[#cdbfa8] bg-[#ffffff] p-4">
              <div className="font-sans-ui text-xs font-bold text-[#8b2500] uppercase tracking-wide flex items-center gap-1.5 mb-2 border-b border-[#e5dac6] pb-1">
                <Wrench className="w-4 h-4" />
                <span>QUY TRÌNH CHẾ TÁC & KỸ THUẬT THỦ CÔNG</span>
              </div>
              <p className="font-serif-doc text-sm leading-relaxed text-[#381f0d]">
                {dossier.craftingProcess}
              </p>
            </div>

            <div className="border border-[#cdbfa8] bg-[#ffffff] p-4">
              <div className="font-sans-ui text-xs font-bold text-[#543118] uppercase tracking-wide flex items-center gap-1.5 mb-2 border-b border-[#e5dac6] pb-1">
                <Layers className="w-4 h-4" />
                <span>ĐẶC ĐIỂM NỔI BẬT & CÔNG DỤNG</span>
              </div>
              <div className="space-y-2 font-serif-doc text-sm leading-relaxed text-[#381f0d]">
                <p>
                  <strong>Đặc điểm nhận diện:</strong> {dossier.distinctiveFeatures}
                </p>
                <p>
                  <strong>Công dụng thực tế:</strong> {dossier.usagePurpose}
                </p>
              </div>
            </div>

            <div className="border border-[#cdbfa8] bg-[#ffffff] p-4">
              <div className="font-sans-ui text-xs font-bold text-[#b8860b] uppercase tracking-wide flex items-center gap-1.5 mb-2 border-b border-[#e5dac6] pb-1">
                <Award className="w-4 h-4" />
                <span>GIÁ TRỊ VĂN HÓA & CÂU CHUYỆN SẢN PHẨM</span>
              </div>
              <div className="space-y-2 font-serif-doc text-sm leading-relaxed text-[#381f0d]">
                <p>{dossier.culturalValue || dossier.productStory}</p>
                {!dossier.culturalValue && (
                  <p className="text-xs text-[#855305] italic font-sans-ui bg-[#fff8eb] p-2 border border-[#f0dfbe]">
                    * Thông tin giá trị lịch sử đang ở trạng thái chờ đối chiếu văn bản lưu trữ địa phương.
                  </p>
                )}
              </div>
            </div>

            {/* Reference Source Box */}
            <div className="archival-seal">
              <div className="font-sans-ui text-xs font-bold text-[#8b2500] uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>CƠ SỞ TƯ LIỆU & NGUỒN XÁC MINH</span>
              </div>
              <p className="font-serif-doc text-xs text-[#3e220f] leading-relaxed break-words">
                {dossier.referenceSources}
              </p>
              {dossier.verificationDetails && (
                <div className="mt-2 text-[11px] font-sans-ui text-[#2e5927] border-t border-[#d3c4ad] pt-1.5 flex flex-wrap gap-x-4">
                  <span>
                    Xác nhận bởi: <strong>{dossier.verificationDetails.verifiedBy || 'Hội đồng thẩm định F05'}</strong>
                  </span>
                  {dossier.verificationDetails.verifiedDate && (
                    <span>Ngày xác minh: {dossier.verificationDetails.verifiedDate}</span>
                  )}
                </div>
              )}
            </div>

            {/* If AI Generated Article is Present */}
            {dossier.generatedArticle && (
              <div className="retro-frame p-4 bg-[#fcf8f0] border-2 border-[#663b1d]">
                <div className="flex items-center justify-between border-b border-[#cdbfa8] pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8b2500]" />
                    <span className="font-sans-ui text-xs font-bold text-[#8b2500] uppercase">
                      BÀI GIỚI THIỆU CHUẨN 8 PHẦN DO TRỢ LÝ BIÊN SOẠN
                    </span>
                  </div>
                  <span className="text-[10px] font-sans-ui text-[#70451f]">
                    Khởi tạo: {new Date(dossier.generatedArticle.generatedAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <div className="space-y-3 font-serif-doc text-xs sm:text-sm text-[#2b1f17] leading-relaxed">
                  <h4 className="text-base font-bold text-[#3e220f]">
                    {dossier.generatedArticle.title}
                  </h4>
                  <p><strong>1. Tổng quan:</strong> {dossier.generatedArticle.overview}</p>
                  <p><strong>2. Chất liệu & nguyên liệu:</strong> {dossier.generatedArticle.materials}</p>
                  <p><strong>3. Đặc điểm sản phẩm:</strong> {dossier.generatedArticle.characteristics}</p>
                  <p><strong>4. Kỹ thuật chế tác:</strong> {dossier.generatedArticle.techniques}</p>
                  <p><strong>5. Công dụng:</strong> {dossier.generatedArticle.usage}</p>
                  <p><strong>6. Giá trị văn hóa:</strong> {dossier.generatedArticle.culturalValue}</p>
                  <p><strong>7. Nghệ nhân / Cơ sở:</strong> {dossier.generatedArticle.artisanInfo}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#f5ede0] border-t-2 border-[#543118] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="text-xs font-sans-ui text-[#6e4625]">
            Mã định danh tư liệu: <span className="font-mono font-bold text-[#3e220f]">{dossier.id}</span>
          </div>
          <div className="flex items-center gap-2 font-sans-ui text-xs">
            {onOpenAssistant && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAssistant(dossier);
                }}
                className="retro-btn-wood px-3 py-1.5 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Mở trong Trợ lý</span>
              </button>
            )}
            {onOpenVerifier && (
              <button
                onClick={() => {
                  onClose();
                  onOpenVerifier(dossier);
                }}
                className="retro-btn-primary px-3 py-1.5 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Kiểm tra độ xác thực</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="retro-btn px-4 py-1.5 text-[#3e220f]"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
