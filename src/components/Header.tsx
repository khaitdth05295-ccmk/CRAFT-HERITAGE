import React from 'react';
import { CraftHeritageLogo } from './CraftHeritageLogo';

export const Header: React.FC = () => {
  return (
    <header className="border-b-2 border-[#543118] bg-[#fbf7ee] shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-[#44240e] text-[#f7eedf] px-3 sm:px-6 py-1 text-xs font-sans-ui flex justify-between items-center border-b border-[#b8860b]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#d4af37]"></span>
          <span>CHƯƠNG TRÌNH THỰC TẬP SINH ĐỢT 15 • FPT POLYTECHNIC × IMTA TECH</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[#ebd6b0]">
          <span>Mã số đề tài: <strong>F05</strong></span>
          <span>•</span>
          <span>Thời gian: Khóa 2024–2026</span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <CraftHeritageLogo size="md" showSubtitle={true} />

        {/* Project F05 Card */}
        <div className="w-full md:w-auto bg-[#f5ede0] border-2 border-[#663b1d] p-2.5 sm:px-4 sm:py-2 text-xs font-sans-ui shadow-[2px_2px_0px_#44240e]">
          <div className="font-bold text-[#8b2500] uppercase tracking-wide flex items-center justify-between border-b border-[#cdbfa8] pb-1 mb-1">
            <span>ĐỀ TÀI F05 – HỒ SƠ THỦ CÔNG</span>
            <span className="bg-[#663b1d] text-[#fff8ea] px-1 py-0.2 text-[10px]">NHÓM 2</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[#3e220f]">
            <div>Sinh viên: <strong>Trần Đức Khải</strong></div>
            <div>Mã SV: <span className="font-mono font-bold text-[#8b2500]">TH05295</span></div>
            <div>Đào tạo: <strong>FPT Polytechnic</strong></div>
            <div>Phối hợp: <strong>IMTA TECH</strong></div>
          </div>
        </div>
      </div>
    </header>
  );
};
