import React from 'react';

interface CraftHeritageLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const CraftHeritageLogo: React.FC<CraftHeritageLogoProps> = ({
  size = 'md',
  showSubtitle = true,
}) => {
  const iconDimensions = {
    sm: { width: 44, height: 44 },
    md: { width: 58, height: 58 },
    lg: { width: 80, height: 80 },
  }[size];

  const titleSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Archival Seal Emblem */}
      <svg
        width={iconDimensions.width}
        height={iconDimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        {/* Outer Square & Octagon border - Ancient Seal */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="6"
          fill="#44240e"
          stroke="#b8860b"
          strokeWidth="2.5"
        />
        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="4"
          fill="#543118"
          stroke="#8b2500"
          strokeWidth="1.5"
        />

        {/* Circular Bronze Drum & Craft Ring */}
        <circle cx="50" cy="50" r="38" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 1.5" />
        <circle cx="50" cy="50" r="34" fill="#381b08" stroke="#b8860b" strokeWidth="1" />

        {/* Center Craft Elements: Ancient Ceramic Vase + Artisan Hand + Weave Motifs */}
        {/* Dong Son starburst rays */}
        <path
          d="M50 19 L52 26 L59 26 L53 30 L55 37 L50 33 L45 37 L47 30 L41 26 L48 26 Z"
          fill="#d4af37"
        />
        {/* Vase silhouette */}
        <path
          d="M44 42 C44 40, 46 38, 50 38 C54 38, 56 40, 56 42 C56 45, 59 47, 61 52 C63 57, 61 66, 58 70 C55 72, 45 72, 42 70 C39 66, 37 57, 39 52 C41 47, 44 45, 44 42 Z"
          fill="#8b2500"
          stroke="#e5dac6"
          strokeWidth="1"
        />
        {/* Vase neck and base details */}
        <path d="M43 40 L57 40" stroke="#d4af37" strokeWidth="1.5" />
        <path d="M43 69 L57 69" stroke="#d4af37" strokeWidth="1.5" />
        <circle cx="50" cy="54" r="3" fill="#d4af37" />

        {/* Artisan Hand gesture contour (nét bàn tay chế tác) */}
        <path
          d="M34 62 C34 56, 38 52, 42 54 C45 56, 44 60, 42 63"
          stroke="#ffd782"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Wood chisel / bamboo weave line */}
        <path
          d="M60 48 L68 40 M63 54 L71 46"
          stroke="#d4af37"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Corner archival seal studs */}
        <circle cx="12" cy="12" r="2" fill="#d4af37" />
        <circle cx="88" cy="12" r="2" fill="#d4af37" />
        <circle cx="12" cy="88" r="2" fill="#d4af37" />
        <circle cx="88" cy="88" r="2" fill="#d4af37" />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-serif-doc font-bold tracking-wider text-[#3e220f] ${titleSize} leading-none block`}
          style={{ textShadow: '1px 1px 0px #fff' }}
        >
          CRAFT HERITAGE
        </span>
        {showSubtitle && (
          <span className="font-serif-doc text-[11px] sm:text-xs text-[#6e4625] italic tracking-tight font-medium mt-1">
            Hồ sơ và tư liệu sản phẩm thủ công truyền thống Việt Nam
          </span>
        )}
      </div>
    </div>
  );
};
