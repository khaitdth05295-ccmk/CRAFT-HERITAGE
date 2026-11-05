import React, { useState } from 'react';
import { CraftDossier } from '../types/craft';
import { 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Save, 
  AlertCircle, 
  Edit3, 
  RotateCcw,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface GeminiAssistantPageProps {
  initialProduct?: Partial<CraftDossier> | null;
  savedProducts: CraftDossier[];
  onSaveArticleToDossier: (productId: string, article: NonNullable<CraftDossier['generatedArticle']>) => Promise<void>;
  onProceedToVerifier: (textToCheck: string, productContext: Partial<CraftDossier>) => void;
}

export const GeminiAssistantPage: React.FC<GeminiAssistantPageProps> = ({
  initialProduct,
  savedProducts,
  onSaveArticleToDossier,
  onProceedToVerifier,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Partial<CraftDossier>>(
    initialProduct && initialProduct.name ? initialProduct : savedProducts[0] || {}
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 8 structured sections of the generated article
  const [article, setArticle] = useState<{
    title: string;
    overview: string;
    materials: string;
    characteristics: string;
    techniques: string;
    usage: string;
    culturalValue: string;
    artisanInfo: string;
    generatedAt: string;
  } | null>(initialProduct?.generatedArticle || null);

  const [isEditing, setIsEditing] = useState(false);

  // Handle switching product context
  const handleSelectProduct = (productId: string) => {
    const found = savedProducts.find((p) => p.id === productId);
    if (found) {
      setSelectedProduct(found);
      setArticle(found.generatedArticle || null);
      setIsEditing(false);
      setError(null);
    }
  };

  const handleGenerateDossier = async () => {
    if (!selectedProduct.name?.trim()) {
      setError('Vui lòng chọn hoặc nhập tên sản phẩm trước khi yêu cầu Trợ lý soạn thảo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      const res = await fetch('/api/gemini/generate-dossier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productData: selectedProduct }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Lỗi máy chủ (${res.status})`);
      }

      const data = await res.json();
      setArticle({
        title: data.title || `${selectedProduct.name} - Hồ sơ tư liệu`,
        overview: data.overview || '',
        materials: data.materials || '',
        characteristics: data.characteristics || '',
        techniques: data.techniques || '',
        usage: data.usage || '',
        culturalValue: data.culturalValue || '[Chưa có nguồn xác minh]',
        artisanInfo: data.artisanInfo || '[Chưa có thông tin nghệ nhân/cơ sở]',
        generatedAt: data.generatedAt || new Date().toISOString(),
      });
      setIsEditing(true);
    } catch (err: any) {
      setError(err?.message || 'Không thể kết nối đến Trợ lý. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleArticleFieldChange = (field: string, value: string) => {
    if (!article) return;
    setArticle((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const getFullArticleText = () => {
    if (!article) return '';
    return [
      `TIÊU ĐỀ: ${article.title}`,
      `1. TỔNG QUAN: ${article.overview}`,
      `2. CHẤT LIỆU VÀ NGUYÊN LIỆU: ${article.materials}`,
      `3. ĐẶC ĐIỂM SẢN PHẨM: ${article.characteristics}`,
      `4. KỸ THUẬT CHẾ TÁC: ${article.techniques}`,
      `5. CÔNG DỤNG: ${article.usage}`,
      `6. GIÁ TRỊ VĂN HÓA: ${article.culturalValue}`,
      `7. NGHỆ NHÂN HOẶC CƠ SỞ: ${article.artisanInfo}`,
    ].join('\n\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullArticleText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToCurrentDossier = async () => {
    if (!article || !selectedProduct.id) {
      alert('Chưa có hồ sơ được liên kết trong kho để lưu. Vui lòng lưu hồ sơ tại trang "Tạo hồ sơ" trước.');
      return;
    }
    try {
      await onSaveArticleToDossier(selectedProduct.id, {
        ...article,
        isEditedByUser: true,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      alert('Lỗi lưu bài viết: ' + err.message);
    }
  };

  const handleSendToVerifier = () => {
    if (!article) return;
    onProceedToVerifier(getFullArticleText(), selectedProduct);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="retro-frame p-4 sm:p-5 bg-[#fcf9f2]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b-2 border-[#543118] pb-3 mb-3">
          <div>
            <div className="font-sans-ui text-xs font-bold text-[#8b2500] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span>TRỢ LÝ BIÊN SOẠN HỒ SƠ • ĐỀ TÀI F05</span>
            </div>
            <h1 className="font-serif-doc text-2xl font-bold text-[#3e220f]">
              TRỢ LÝ SOẠN THẢO BÀI GIỚI THIỆU SẢN PHẨM THỦ CÔNG
            </h1>
            <p className="font-serif-doc text-xs sm:text-sm text-[#5c3818] italic mt-0.5">
              Tạo bài viết có cấu trúc 8 phần chuẩn mực. Nghiêm cấm bịa đặt lịch sử, niên đại và danh hiệu nghệ nhân.
            </p>
          </div>
          <div className="shrink-0">
            <span className="font-sans-ui text-xs bg-[#543118] text-[#fffaf0] px-3 py-1.5 border border-[#2b1608] font-bold">
              Cơ chế bảo vệ: ANTI-FABRICATION
            </span>
          </div>
        </div>

        {/* 6 Rules Callout */}
        <div className="bg-[#fdfaf3] border border-[#d3c4ad] p-3 text-xs font-sans-ui text-[#44240e] space-y-1">
          <strong className="text-[#8b2500] block uppercase tracking-wide">
            Bộ quy tắc biên soạn bắt buộc của Trợ lý F05:
          </strong>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-[#5c3818]">
            <div>• Chỉ sử dụng dữ liệu người dùng cung cấp và nguồn đã lưu.</div>
            <div>• Không tự tạo nguồn tham khảo giả mạo.</div>
            <div>• Không tự gán sản phẩm cho làng nghề chưa được kiểm chứng.</div>
            <div>• Không tự nhận danh hiệu nghệ nhân hay chuẩn OCOP chưa có bằng chứng.</div>
            <div>• Thiếu dữ liệu lịch sử phải ghi: <em>"[Chưa có nguồn xác minh]"</em>.</div>
            <div>• Cho phép người dùng chỉnh sửa từng trường trước khi lưu.</div>
          </div>
        </div>
      </div>

      {/* Main 2-column interface: Context Selector & Article Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Context Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-4 font-sans-ui text-xs">
          <div className="retro-frame p-3.5 bg-[#ffffff]">
            <label className="block font-bold text-[#3e220f] uppercase mb-1.5">
              1. Chọn sản phẩm cần soạn thảo:
            </label>
            <select
              value={selectedProduct.id || ''}
              onChange={(e) => handleSelectProduct(e.target.value)}
              className="retro-input w-full text-xs bg-white mb-3"
            >
              {savedProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  [{p.category}] {p.name}
                </option>
              ))}
            </select>

            <div className="border border-[#e5dac6] bg-[#faf6ee] p-3 space-y-2 text-[#4a2b13]">
              <div className="font-bold border-b border-[#cdbfa8] pb-1 text-[#8b2500]">
                TÓM TẮT DỮ LIỆU ĐẦU VÀO
              </div>
              <div>
                <strong>Tên:</strong> {selectedProduct.name || '(Chưa nhập)'}
              </div>
              <div>
                <strong>Làng nghề:</strong> {selectedProduct.villageOrRegion || '(Chưa có)'}
              </div>
              <div>
                <strong>Chất liệu:</strong> {selectedProduct.primaryMaterial || '(Chưa có)'}
              </div>
              <div>
                <strong>Nguồn:</strong>{' '}
                <span className="italic">{selectedProduct.referenceSources || '[Chưa có nguồn xác minh]'}</span>
              </div>
              <div>
                <strong>Trạng thái:</strong>{' '}
                <span className="stamp-badge stamp-verified text-[10px]">
                  {selectedProduct.verificationStatus || 'Chờ bổ sung nguồn'}
                </span>
              </div>
            </div>

            <button
              onClick={handleGenerateDossier}
              disabled={isLoading}
              className="mt-4 w-full retro-btn-primary py-2.5 text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span>{isLoading ? 'Đang biên soạn...' : 'Yêu cầu Trợ lý soạn bài'}</span>
            </button>
          </div>

          {error && (
            <div className="p-3 bg-[#fdeeee] border border-[#cc0000] text-[#990000] text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right: Structured 8-section Output (8 cols) */}
        <div className="lg:col-span-8">
          <div className="retro-frame bg-[#ffffff] overflow-hidden">
            <div className="retro-header-bar px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
              <span className="font-sans-ui font-bold text-xs uppercase flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#ffd782]" />
                BÀI GIỚI THIỆU CẤU TRÚC 8 MỤC CHUẨN MỰC
              </span>

              {article && (
                <div className="flex items-center gap-2 font-sans-ui text-xs">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="retro-btn px-2.5 py-1 text-xs flex items-center gap-1 text-[#3e220f]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Xem chế độ đọc' : 'Chỉnh sửa'}</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="retro-btn px-2.5 py-1 text-xs flex items-center gap-1 text-[#3e220f]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Content area */}
            <div className="p-4 sm:p-6 bg-[#fffdfa] min-h-[420px]">
              {isLoading ? (
                <div className="py-20 text-center space-y-3 font-sans-ui text-xs text-[#5c3818]">
                  <RotateCcw className="w-8 h-8 animate-spin mx-auto text-[#8b2500]" />
                  <div className="font-bold text-sm text-[#3e220f]">
                    Đang phân tích dữ liệu và biên soạn bài viết...
                  </div>
                  <p className="font-serif-doc text-xs italic max-w-md mx-auto text-[#70451f]">
                    Đang đối chiếu dữ liệu với 16 nguồn tư liệu chính thức. Áp dụng quy tắc kiểm chứng nghiêm ngặt, gắn nhãn "[Chưa có nguồn xác minh]" cho thông tin chưa có căn cứ.
                  </p>
                </div>
              ) : !article ? (
                <div className="py-20 text-center space-y-3">
                  <Sparkles className="w-12 h-12 text-[#b8860b] mx-auto opacity-60" />
                  <h3 className="font-serif-doc text-lg font-bold text-[#3e220f]">
                    Chưa có bài viết nào được khởi tạo
                  </h3>
                  <p className="font-serif-doc text-xs text-[#5c3818] max-w-md mx-auto">
                    Chọn sản phẩm từ danh sách bên trái và nhấn nút <strong>"Yêu cầu Trợ lý soạn bài"</strong> để khởi tạo bài viết chuẩn mực theo cấu trúc 8 mục.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Article Title */}
                  <div className="border-b-2 border-[#543118] pb-3">
                    <label className="block font-sans-ui font-bold text-xs text-[#8b2500] uppercase mb-1">
                      1. Tiêu đề sản phẩm:
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={article.title}
                        onChange={(e) => handleArticleFieldChange('title', e.target.value)}
                        className="retro-input w-full font-serif-doc text-lg font-bold text-[#3e220f]"
                      />
                    ) : (
                      <h2 className="font-serif-doc text-xl font-bold text-[#3e220f]">
                        {article.title}
                      </h2>
                    )}
                  </div>

                  {/* Section 2: Overview */}
                  <div className="border border-[#e5dac6] bg-[#faf6ee] p-3">
                    <label className="block font-sans-ui font-bold text-xs text-[#543118] uppercase mb-1">
                      2. Giới thiệu tổng quan:
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={article.overview}
                        onChange={(e) => handleArticleFieldChange('overview', e.target.value)}
                        className="retro-input w-full font-serif-doc text-xs sm:text-sm text-[#2b1f17]"
                      />
                    ) : (
                      <p className="font-serif-doc text-xs sm:text-sm text-[#2b1f17] leading-relaxed">
                        {article.overview}
                      </p>
                    )}
                  </div>

                  {/* Section 3: Materials */}
                  <div className="border border-[#e5dac6] bg-[#faf6ee] p-3">
                    <label className="block font-sans-ui font-bold text-xs text-[#543118] uppercase mb-1">
                      3. Chất liệu và nguyên liệu:
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={2}
                        value={article.materials}
                        onChange={(e) => handleArticleFieldChange('materials', e.target.value)}
                        className="retro-input w-full font-serif-doc text-xs sm:text-sm text-[#2b1f17]"
                      />
                    ) : (
                      <p className="font-serif-doc text-xs sm:text-sm text-[#2b1f17] leading-relaxed">
                        {article.materials}
                      </p>
                    )}
                  </div>

                  {/* Section 4: Characteristics */}
                  <div className="border border-[#e5dac6] bg-[#faf6ee] p-3">
                    <label className="block font-sans-ui font-bold text-xs text-[#543118] uppercase mb-1">
                      4. Đặc điểm sản phẩm:
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={2}
                        value={article.characteristics}
                        onChange={(e) => handleArticleFieldChange('characteristics', e.target.value)}
                        className="retro-input w-full font-serif-doc text-xs sm:text-sm text-[#2b1f17]"
                      />
                    ) : (
                      <p className="font-serif-doc text-xs sm:text-sm text-[#2b1f17] leading-relaxed">
                        {article.characteristics}
                      </p>
                    )}
                  </div>

                  {/* Section 5: Techniques */}
                  <div className="border border-[#e5dac6] bg-[#faf6ee] p-3">
                    <label className="block font-sans-ui font-bold text-xs text-[#543118] uppercase mb-1">
                      5. Kỹ thuật chế tác:
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={article.techniques}
                        onChange={(e) => handleArticleFieldChange('techniques', e.target.value)}
                        className="retro-input w-full font-serif-doc text-xs sm:text-sm text-[#2b1f17]"
                      />
                    ) : (
                      <p className="font-serif-doc text-xs sm:text-sm text-[#2b1f17] leading-relaxed">
                        {article.techniques}
                      </p>
                    )}
                  </div>

                  {/* Section 6: Usage */}
                  <div className="border border-[#e5dac6] bg-[#faf6ee] p-3">
                    <label className="block font-sans-ui font-bold text-xs text-[#543118] uppercase mb-1">
                      6. Công dụng:
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={2}
                        value={article.usage}
                        onChange={(e) => handleArticleFieldChange('usage', e.target.value)}
                        className="retro-input w-full font-serif-doc text-xs sm:text-sm text-[#2b1f17]"
                      />
                    ) : (
                      <p className="font-serif-doc text-xs sm:text-sm text-[#2b1f17] leading-relaxed">
                        {article.usage}
                      </p>
                    )}
                  </div>

                  {/* Section 7: Cultural Value */}
                  <div className="border border-[#e5dac6] bg-[#faf6ee] p-3">
                    <label className="block font-sans-ui font-bold text-xs text-[#8b2500] uppercase mb-1">
                      7. Giá trị văn hóa (Chỉ nêu khi có căn cứ):
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={2}
                        value={article.culturalValue}
                        onChange={(e) => handleArticleFieldChange('culturalValue', e.target.value)}
                        className="retro-input w-full font-serif-doc text-xs sm:text-sm text-[#2b1f17]"
                      />
                    ) : (
                      <p className="font-serif-doc text-xs sm:text-sm text-[#2b1f17] leading-relaxed">
                        {article.culturalValue}
                      </p>
                    )}
                  </div>

                  {/* Section 8: Artisan */}
                  <div className="border border-[#e5dac6] bg-[#faf6ee] p-3">
                    <label className="block font-sans-ui font-bold text-xs text-[#543118] uppercase mb-1">
                      8. Thông tin về nghệ nhân hoặc cơ sở sản xuất:
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={2}
                        value={article.artisanInfo}
                        onChange={(e) => handleArticleFieldChange('artisanInfo', e.target.value)}
                        className="retro-input w-full font-serif-doc text-xs sm:text-sm text-[#2b1f17]"
                      />
                    ) : (
                      <p className="font-serif-doc text-xs sm:text-sm text-[#2b1f17] leading-relaxed">
                        {article.artisanInfo}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            {article && (
              <div className="p-3 bg-[#f5ede0] border-t-2 border-[#543118] flex flex-wrap items-center justify-between gap-3 font-sans-ui text-xs">
                <div className="text-[#6e4625]">
                  {isSaved ? (
                    <span className="text-green-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Đã lưu bài viết vào hồ sơ thành công!
                    </span>
                  ) : (
                    <span>Bạn có thể chỉnh sửa các mục trước khi lưu hoặc chuyển sang bước kiểm chứng.</span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedProduct.id && (
                    <button
                      onClick={handleSaveToCurrentDossier}
                      className="retro-btn px-3 py-1.5 flex items-center gap-1 text-[#3e220f]"
                    >
                      <Save className="w-3.5 h-3.5 text-[#7a4b27]" />
                      <span>Lưu bài viết vào hồ sơ</span>
                    </button>
                  )}
                  <button
                    onClick={handleSendToVerifier}
                    className="retro-btn-primary px-4 py-1.5 flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Chuyển sang Kiểm tra thông tin</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
