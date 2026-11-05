import React from 'react';
import { NavTab } from './Navigation';
import { CraftHeritageLogo } from './CraftHeritageLogo';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-12 bg-[#3e220f] text-[#efe4d0] border-t-4 border-[#b8860b] font-sans-ui text-xs">
      {/* Top Banner Stripe */}
      <div className="bg-[#2a1508] py-2 border-b border-[#5c3518] px-4 text-center text-[#d8c39e] text-xs font-serif-doc italic">
        "Tôn vinh bàn tay tài hoa của nghệ nhân Việt Nam qua hồ sơ tư liệu được kiểm chứng độc lập"
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: About Platform */}
        <div className="space-y-3">
          <div className="bg-[#fcf9f2] p-2 inline-block border border-[#b8860b]">
            <CraftHeritageLogo size="sm" showSubtitle={false} />
          </div>
          <p className="text-[#d8c39e] leading-relaxed text-xs">
            Hệ thống trực tuyến hỗ trợ nghệ nhân, hộ sản xuất và cơ sở làng nghề lập hồ sơ sản phẩm thủ công, tạo bài giới thiệu chuẩn mực và kiểm chứng tính xác thực tư liệu.
          </p>
          <div className="text-[11px] text-[#bca279] border-t border-[#5c3518] pt-2">
            Phục vụ công tác bảo tồn, lưu trữ di sản văn hóa phi vật thể và sản phẩm thủ công mỹ nghệ.
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-bold text-[#ffd782] uppercase tracking-wider border-b border-[#6d4220] pb-1.5 mb-3 text-xs">
            DANH MỤC HỆ THỐNG
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#ffffff] hover:underline text-[#e2d0b6] text-left"
              >
                » Trang chủ
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('catalog')}
                className="hover:text-[#ffffff] hover:underline text-[#e2d0b6] text-left"
              >
                » Kho sản phẩm (16 hồ sơ có thật)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('create')}
                className="hover:text-[#ffffff] hover:underline text-[#e2d0b6] text-left"
              >
                » Tạo hồ sơ sản phẩm mới
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('assistant')}
                className="hover:text-[#ffffff] hover:underline text-[#e2d0b6] text-left"
              >
                » Trợ lý (Cấu trúc 8 phần)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('verifier')}
                className="hover:text-[#ffffff] hover:underline text-[#e2d0b6] text-left"
              >
                » Kiểm tra & cảnh báo thông tin
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('saved')}
                className="hover:text-[#ffffff] hover:underline text-[#e2d0b6] text-left"
              >
                » Hồ sơ đã lưu trữ
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('sources')}
                className="hover:text-[#ffffff] hover:underline text-[#e2d0b6] text-left"
              >
                » Thư viện 16 nguồn tư liệu
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#ffffff] hover:underline text-[#e2d0b6] text-left"
              >
                » Giới thiệu đề tài F05
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Project Information */}
        <div>
          <h4 className="font-bold text-[#ffd782] uppercase tracking-wider border-b border-[#6d4220] pb-1.5 mb-3 text-xs">
            THÔNG TIN ĐỀ TÀI F05
          </h4>
          <div className="space-y-1.5 text-xs text-[#d8c39e]">
            <div><strong>Tên đề tài:</strong> Trợ lý viết hồ sơ giới thiệu sản phẩm thủ công</div>
            <div><strong>Sinh viên thực hiện:</strong> Trần Đức Khải</div>
            <div><strong>Mã sinh viên:</strong> TH05295</div>
            <div><strong>Nhóm nghiên cứu:</strong> Nhóm 2</div>
            <div><strong>Đơn vị đào tạo:</strong> FPT Polytechnic</div>
            <div><strong>Đơn vị phối hợp:</strong> IMTA TECH</div>
            <div><strong>Đợt đào tạo:</strong> Chương trình TTS Đợt 15</div>
          </div>
        </div>

        {/* Col 4: Reference Source Summary */}
        <div>
          <h4 className="font-bold text-[#ffd782] uppercase tracking-wider border-b border-[#6d4220] pb-1.5 mb-3 text-xs">
            CƠ SỞ TƯ LIỆU CHÍNH THỨC
          </h4>
          <p className="text-xs text-[#d8c39e] mb-2">
            Hệ thống đối chiếu trực tiếp với 16 nguồn tư liệu đã được xác lập pháp lý:
          </p>
          <ul className="text-[11px] space-y-1 text-[#bca279]">
            <li>• 03 Hồ sơ Di sản văn hóa UNESCO</li>
            <li>• 03 Văn bản & Chuyên đề Bộ Công Thương</li>
            <li>• 08 Bài báo chuyên đề Báo Chính phủ</li>
            <li>• 02 Hồ sơ công nhận UBND xã Phú Nghĩa</li>
          </ul>
          <div className="mt-3 p-2 bg-[#2d1708] border border-[#6d4220] text-[11px] text-[#e8cda2]">
            Nguyên tắc F05: AI không tự bịa đặt lịch sử, niên đại hay danh hiệu nghệ nhân.
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#1e0f05] py-3 px-4 border-t border-[#44240e] text-center text-[#9f8566] text-xs">
        © 2024–2026 CRAFT HERITAGE • Đề tài F05 • Trần Đức Khải (TH05295) • FPT Polytechnic & IMTA TECH. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
};
