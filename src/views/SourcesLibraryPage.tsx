import React, { useState } from 'react';
import { OFFICIAL_16_SOURCES, ReferenceSource } from '../data/sourcesData';
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  Filter, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Copy, 
  Check,
  ShieldAlert
} from 'lucide-react';

export const SourcesLibraryPage: React.FC = () => {
  const [sources] = useState<ReferenceSource[]>(OFFICIAL_16_SOURCES);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories = ['Tất cả', 'UNESCO', 'BỘ CÔNG THƯƠNG', 'BÁO CHÍNH PHỦ', 'ĐỊA PHƯƠNG HÀ NỘI'];

  const filteredSources = sources.filter((s) => {
    const matchCat = selectedCategory === 'Tất cả' || s.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.publisher.toLowerCase().includes(q) ||
      s.topic.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q);

    return matchCat && matchSearch;
  });

  const handleCopyCitation = (source: ReferenceSource) => {
    const citation = `${source.publisher}. "${source.title}". ${source.url}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(source.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="retro-frame p-4 sm:p-5 bg-[#fcf9f2]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b-2 border-[#543118] pb-3 mb-3">
          <div>
            <div className="font-sans-ui text-xs font-bold text-[#8b2500] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>THƯ VIỆN NGUỒN TƯ LIỆU PHÁP LÝ • ĐỀ TÀI F05</span>
            </div>
            <h1 className="font-serif-doc text-2xl font-bold text-[#3e220f]">
              THƯ VIỆN 16 NGUỒN TƯ LIỆU THAM KHẢO CHÍNH THỨC
            </h1>
            <p className="font-serif-doc text-xs sm:text-sm text-[#5c3818] italic mt-0.5">
              Hệ thống lưu trữ đúng 16 nguồn tài liệu căn cứ được công bố bởi UNESCO, Bộ Công Thương, Báo Chính phủ và UBND địa phương.
            </p>
          </div>
          <div className="shrink-0 font-sans-ui text-xs bg-[#543118] text-[#fff9eb] px-3 py-1.5 border border-[#2b1608] font-bold">
            Số lượng chuẩn mực: <span className="text-[#ffd782] font-mono text-sm">16/16</span> nguồn
          </div>
        </div>

        {/* Rule Notice */}
        <div className="bg-[#fdfaf3] border border-[#d3c4ad] p-3 text-xs font-sans-ui text-[#44240e] flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-[#8b2500] shrink-0 mt-0.5" />
          <div>
            <strong>Quy chuẩn nghiêm ngặt F05:</strong> Tuyệt đối không tạo nguồn giả để thay thế các đường dẫn chuẩn dưới đây. 
            Mọi bài giới thiệu và khâu thẩm định của Trợ lý đều lấy danh mục 16 nguồn này làm căn cứ xác minh tính xác thực lịch sử và danh hiệu làng nghề.
          </div>
        </div>

        {/* Controls: Search + Categories */}
        <div className="mt-4 space-y-3 font-sans-ui text-xs">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu theo tiêu đề, cơ quan ban hành, chủ đề di sản..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="retro-input w-full pl-8 pr-3 text-xs"
            />
            <Search className="w-4 h-4 text-[#7a4b27] absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="font-bold text-[#543118] uppercase shrink-0 text-[11px] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Cơ quan phát hành:
            </span>
            {categories.map((cat) => (
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
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="retro-frame bg-[#ffffff] flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            {/* Header of Item */}
            <div>
              <div className="retro-sub-bar px-3 py-2 flex items-center justify-between">
                <span className="font-mono font-bold text-xs bg-[#543118] text-[#fffaf0] px-2 py-0.5">
                  NGUỒN #{source.id < 10 ? `0${source.id}` : source.id}
                </span>
                <span className="stamp-badge stamp-verified text-[10px]">
                  {source.officialStatus}
                </span>
              </div>

              <div className="p-4 space-y-2.5">
                <h3 className="font-serif-doc font-bold text-base text-[#3e220f] leading-snug">
                  {source.title}
                </h3>

                <div className="flex items-center gap-1.5 font-sans-ui text-xs text-[#8b2500] font-semibold">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{source.publisher}</span>
                </div>

                <div className="font-sans-ui text-xs bg-[#f7f0e4] p-2 border border-[#e5dac6] text-[#4a2b13]">
                  <strong>Chủ đề:</strong> {source.topic}
                </div>

                <p className="font-serif-doc text-xs text-[#381f0d] leading-relaxed">
                  {source.summary}
                </p>

                {source.publishedDate && (
                  <div className="flex items-center gap-1 font-sans-ui text-[11px] text-[#70451f]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Thời gian công bố / cập nhật: <strong>{source.publishedDate}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom URL & Action buttons */}
            <div className="p-3 bg-[#faf6ee] border-t border-[#d3c4ad] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans-ui text-xs">
              <div className="text-[11px] font-mono text-[#5c3818] truncate max-w-xs" title={source.url}>
                {source.url}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopyCitation(source)}
                  className="retro-btn px-2.5 py-1 text-xs flex items-center gap-1 text-[#3e220f]"
                  title="Sao chép trích dẫn chuẩn"
                >
                  {copiedId === source.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-700" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Trích dẫn</span>
                    </>
                  )}
                </button>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn-wood px-3 py-1 text-xs flex items-center gap-1 text-[#fff9eb]"
                >
                  <span>Mở nguồn gốc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
