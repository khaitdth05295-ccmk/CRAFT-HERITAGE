import React, { useState, useMemo } from 'react';
import { CraftDossier, CraftCategory, VerificationStatus } from '../types/craft';
import { 
  Search, 
  Filter, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Eye,
  RefreshCw
} from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';

interface CatalogPageProps {
  products: CraftDossier[];
  onOpenAssistant: (dossier: CraftDossier) => void;
  onOpenVerifier: (dossier: CraftDossier) => void;
}

const CATEGORIES: ('Tất cả' | CraftCategory)[] = [
  'Tất cả',
  'Gốm sứ',
  'Tranh dân gian',
  'Mây tre đan',
  'Dệt và lụa',
  'Sơn mài',
  'Chạm khắc gỗ',
  'Sản phẩm thủ công khác',
];

const STATUS_FILTERS: ('Tất cả' | VerificationStatus)[] = [
  'Tất cả',
  'Đã xác minh',
  'Chờ bổ sung nguồn',
  'Người dùng đóng góp',
];

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  onOpenAssistant,
  onOpenVerifier,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Tất cả' | CraftCategory>('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState<'Tất cả' | VerificationStatus>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<CraftDossier | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'Tất cả' || p.category === selectedCategory;
      const matchStatus = selectedStatus === 'Tất cả' || p.verificationStatus === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.alternateNames && p.alternateNames.toLowerCase().includes(q)) ||
        p.villageOrRegion.toLowerCase().includes(q) ||
        p.primaryMaterial.toLowerCase().includes(q) ||
        p.referenceSources.toLowerCase().includes(q);

      return matchCat && matchStatus && matchSearch;
    });
  }, [products, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page Title & Archive Banner */}
      <div className="retro-frame p-4 bg-[#fcf9f2]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-[#543118] pb-3 mb-3">
          <div>
            <h1 className="font-serif-doc text-2xl font-bold text-[#3e220f]">
              KHO SẢN PHẨM THỦ CÔNG TRUYỀN THỐNG VIỆT NAM
            </h1>
            <p className="font-serif-doc text-xs sm:text-sm text-[#5c3818] italic mt-0.5">
              Hệ thống lưu trữ 16 hồ sơ sản phẩm có thật, gắn liền với các nguồn tư liệu văn hóa chính thức
            </p>
          </div>
          <div className="font-sans-ui text-xs bg-[#f5ede0] border border-[#6b4423] px-3 py-1.5 text-[#3e220f] shrink-0 font-bold">
            Tổng cộng: <span className="font-mono text-[#8b2500] text-sm">{products.length}</span> sản phẩm
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-3 font-sans-ui text-xs">
          {/* Keyword Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên sản phẩm, làng nghề, chất liệu, nguồn tư liệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="retro-input w-full pl-8 pr-3 text-xs"
              />
              <Search className="w-4 h-4 text-[#7a4b27] absolute left-2.5 top-2.5" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="retro-btn px-3 py-1.5 text-xs text-[#8b2500]"
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="font-bold text-[#543118] uppercase shrink-0 text-[11px] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Nhóm nghề:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-[#543118] text-[#fffaf0] font-bold border-[#2b1608]'
                    : 'bg-[#faf4e6] text-[#4a2b13] border-[#cdbfa8] hover:bg-[#efe4cc]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Verification Status Filter */}
          <div className="flex items-center gap-2 pt-1 border-t border-[#e5dac6]">
            <span className="font-bold text-[#543118] uppercase text-[11px]">Trạng thái kiểm chứng:</span>
            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2 py-0.5 text-[11px] border ${
                    selectedStatus === st
                      ? 'bg-[#8b2500] text-white font-bold border-[#501300]'
                      : 'bg-[#ffffff] text-[#5c3818] border-[#cdbfa8] hover:bg-[#f9f5ec]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="retro-frame p-8 text-center bg-[#ffffff] space-y-3">
          <BookOpen className="w-10 h-10 text-[#7a4b27] mx-auto opacity-70" />
          <h3 className="font-serif-doc text-lg font-bold text-[#3e220f]">
            Không tìm thấy hồ sơ phù hợp
          </h3>
          <p className="font-serif-doc text-xs text-[#5c3818]">
            Vui lòng thử từ khóa khác hoặc bỏ chọn bộ lọc phân loại.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tất cả');
              setSelectedStatus('Tất cả');
            }}
            className="retro-btn px-4 py-1.5 text-xs inline-flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="retro-frame flex flex-col justify-between bg-[#fffdfa] hover:shadow-md transition-shadow"
            >
              {/* Card Header & Image */}
              <div>
                <div className="relative border-b-2 border-[#543118] bg-[#f5ede0]">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                    <span className="font-sans-ui text-[10px] font-bold bg-[#3e220f]/90 text-white px-2 py-0.5 border border-[#fff]">
                      {p.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span
                      className={`stamp-badge shadow-sm ${
                        p.verificationStatus === 'Đã xác minh'
                          ? 'stamp-verified'
                          : p.verificationStatus === 'Chờ bổ sung nguồn'
                          ? 'stamp-pending'
                          : 'stamp-user'
                      }`}
                    >
                      {p.verificationStatus}
                    </span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-3.5 space-y-2.5">
                  <h3 className="font-serif-doc font-bold text-base text-[#3e220f] line-clamp-1">
                    {p.name}
                  </h3>

                  <div className="flex items-start gap-1 text-xs font-sans-ui text-[#68462b]">
                    <MapPin className="w-3.5 h-3.5 text-[#8b2500] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{p.villageOrRegion}</span>
                  </div>

                  <div className="text-xs font-serif-doc text-[#44240e] space-y-1">
                    <div>
                      <span className="font-sans-ui font-semibold text-[11px] text-[#70451f]">
                        Chất liệu:
                      </span>{' '}
                      {p.primaryMaterial}
                    </div>
                    <div className="line-clamp-2 text-[#5c3818] italic">
                      {p.distinctiveFeatures || p.productStory}
                    </div>
                  </div>

                  {/* Reference Citation Badge */}
                  <div className="pt-2 border-t border-[#e5dac6] text-[11px] font-sans-ui text-[#2b1f17]">
                    <span className="font-bold text-[#8b2500]">Nguồn xác minh:</span>{' '}
                    <span className="line-clamp-1 text-[#4a2b13]">{p.referenceSources}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-2.5 bg-[#f7f0e4] border-t border-[#d3c4ad] grid grid-cols-3 gap-1 font-sans-ui text-xs">
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="retro-btn py-1 px-1 flex items-center justify-center gap-1 text-[#3e220f]"
                  title="Xem toàn văn hồ sơ"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Chi tiết</span>
                </button>
                <button
                  onClick={() => onOpenAssistant(p)}
                  className="retro-btn-wood py-1 px-1 flex items-center justify-center gap-1 text-[11px]"
                  title="Biên soạn bằng Trợ lý"
                >
                  <Sparkles className="w-3 h-3 text-[#ffd700]" />
                  <span>Trợ lý</span>
                </button>
                <button
                  onClick={() => onOpenVerifier(p)}
                  className="retro-btn-primary py-1 px-1 flex items-center justify-center gap-1 text-[11px]"
                  title="Kiểm chứng từng câu"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Kiểm tra</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        dossier={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenAssistant={onOpenAssistant}
        onOpenVerifier={onOpenVerifier}
      />
    </div>
  );
};
