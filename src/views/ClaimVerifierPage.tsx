import React, { useState } from 'react';
import { CraftDossier, ClaimCheckReport, ClaimCategory } from '../types/craft';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Flame, 
  RotateCcw,
  Sparkles,
  FileCheck,
  Save,
  Search,
  BookOpen
} from 'lucide-react';

interface ClaimVerifierPageProps {
  initialText?: string;
  initialProduct?: Partial<CraftDossier> | null;
  savedProducts: CraftDossier[];
  onSaveReportToDossier?: (productId: string, report: ClaimCheckReport) => Promise<void>;
}

export const ClaimVerifierPage: React.FC<ClaimVerifierPageProps> = ({
  initialText = '',
  initialProduct,
  savedProducts,
  onSaveReportToDossier,
}) => {
  const [inputText, setInputText] = useState(
    initialText ||
      `Bình hoa gốm men lam Bát Tràng là sản phẩm mỹ nghệ kết tinh từ đất sét phù sa và kỹ nghệ nung khử của làng nghề Bát Tràng, Hà Nội.
Nghề làm gốm này có lịch sử hơn 1.000 năm cổ truyền và là sản phẩm độc nhất vô nhị trên thế giới không nơi nào sánh bằng.
Chất liệu sử dụng là đất sét cao lanh tinh tuyển phối trộn tro trấu, kết hợp sắc tố oxit coban tự nhiên.
Quy trình chế tác bao gồm chuốt dáng bàn xoay và nung lò ở 1250°C theo quyết định thí điểm bảo tồn làng nghề Vạn Phúc, Bát Tràng của Báo Chính phủ.
Nghệ nhân cơ sở đã đạt giải thưởng vàng quốc tế danh giá.`
  );

  const [selectedProduct, setSelectedProduct] = useState<Partial<CraftDossier>>(
    initialProduct && initialProduct.name ? initialProduct : savedProducts[0] || {}
  );

  const [report, setReport] = useState<ClaimCheckReport | null>(
    initialProduct?.claimCheckResult || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | ClaimCategory>('all');
  const [isSaved, setIsSaved] = useState(false);

  const handleRunVerification = async () => {
    if (!inputText.trim()) {
      setError('Vui lòng nhập hoặc dán nội dung văn bản cần kiểm chứng.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      const res = await fetch('/api/gemini/verify-claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          productData: selectedProduct,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Lỗi máy chủ (${res.status})`);
      }

      const data: ClaimCheckReport = await res.json();
      setReport(data);
    } catch (err: any) {
      setError(err?.message || 'Không thể thực hiện kiểm chứng thông tin. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveReport = async () => {
    if (!report || !selectedProduct.id || !onSaveReportToDossier) {
      alert('Vui lòng chọn một hồ sơ cụ thể trong kho để lưu kết quả kiểm chứng.');
      return;
    }
    try {
      await onSaveReportToDossier(selectedProduct.id, report);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e: any) {
      alert('Lỗi lưu báo cáo: ' + e.message);
    }
  };

  const handleLoadSampleExaggerated = () => {
    setInputText(
      `Sản phẩm này có niên đại lịch sử hơn 1.000 năm từ thời vua Đinh Tiên Hoàng.
Đây là sản phẩm thủ công tinh xảo độc nhất vô nhị trên thế giới và đạt chuẩn OCOP 5 sao quốc gia.
Quy trình chế tác hoàn toàn bí truyền gia tộc không tiết lộ.
Chất liệu gỗ quý ngàn năm không một vết xước.`
    );
    setReport(null);
  };

  const handleLoadSampleVerified = () => {
    setInputText(
      `Nồi gốm đất nung Bàu Trúc là sản phẩm truyền thống của người Chăm tại làng Bàu Trúc, tỉnh Ninh Thuận.
Nghệ thuật làm gốm của người Chăm đã được UNESCO chính thức ghi danh vào Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp năm 2022.
Sản phẩm được tạo hình thủ công bởi phụ nữ Chăm đi giật lùi quanh khối đất sét sông Quao không dùng bàn xoay.
Nồi được nung lộ thiên bằng củi khô và rơm rạ theo tri thức bản địa.`
    );
    setReport(null);
  };

  const getCategoryBadge = (category: ClaimCategory) => {
    switch (category) {
      case 'verified':
        return <span className="stamp-badge stamp-verified">Đã có nguồn chứng minh</span>;
      case 'user_provided':
        return <span className="stamp-badge stamp-user">Người dùng tự cung cấp</span>;
      case 'missing_source':
        return <span className="stamp-badge stamp-missing">Thiếu nguồn chứng minh</span>;
      case 'exaggerated':
        return <span className="stamp-badge stamp-exaggerated">Dấu hiệu phóng đại</span>;
      case 'conflicted':
        return <span className="stamp-badge stamp-missing">Mâu thuẫn với nguồn</span>;
      case 'needs_info':
        return <span className="stamp-badge stamp-pending">Cần bổ sung thông tin</span>;
      default:
        return null;
    }
  };

  const filteredClaims = report?.claims.filter((c) => {
    if (filterCategory === 'all') return true;
    return c.category === filterCategory;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="retro-frame p-4 sm:p-5 bg-[#fcf9f2]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b-2 border-[#543118] pb-3 mb-3">
          <div>
            <div className="font-sans-ui text-xs font-bold text-[#8b2500] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8b2500]" />
              <span>CHỨC NĂNG THẨM ĐỊNH F05 – KIỂM TRA & CẢNH BÁO THÔNG TIN</span>
            </div>
            <h1 className="font-serif-doc text-2xl font-bold text-[#3e220f]">
              KIỂM CHỨNG TÍNH XÁC THỰC TỪNG CÂU KHẲNG ĐỊNH
            </h1>
            <p className="font-serif-doc text-xs sm:text-sm text-[#5c3818] italic mt-0.5">
              Rà soát từng câu văn trong bài giới thiệu. Phát hiện các tuyên bố thiếu căn cứ, phóng đại hoặc chưa có nguồn tài liệu đối chiếu.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 font-sans-ui text-xs">
            <button
              onClick={handleLoadSampleExaggerated}
              className="retro-btn px-2.5 py-1 text-[#8b2500]"
              title="Thử nghiệm văn bản có câu văn phóng đại để kiểm tra bộ lọc F05"
            >
              Mẫu thử phóng đại
            </button>
            <button
              onClick={handleLoadSampleVerified}
              className="retro-btn px-2.5 py-1 text-[#2e5927]"
              title="Thử nghiệm văn bản có nguồn UNESCO chuẩn"
            >
              Mẫu thử có nguồn
            </button>
          </div>
        </div>

        {/* Example Rule Notice */}
        <div className="bg-[#fffdf9] border-l-4 border-[#8b2500] p-3 text-xs font-sans-ui text-[#3e220f] space-y-1">
          <div className="font-bold text-[#8b2500]">
            VÍ DỤ TIÊU CHUẨN ĐỀ TÀI F05:
          </div>
          <p className="font-serif-doc text-xs">
            Nếu gặp câu: <em>"Nghề này có lịch sử hơn 1.000 năm."</em> mà người dùng không cung cấp tài liệu chứng minh, hệ thống sẽ cảnh báo:
            <strong className="text-[#8b2500]"> "Chưa tìm thấy nguồn phù hợp để xác minh niên đại. Vui lòng bổ sung tài liệu."</strong>
          </p>
          <div className="text-[11px] text-[#6e4625]">
            * Không được tự đánh dấu xác minh thành công chỉ vì câu văn nghe hợp lý.
          </div>
        </div>
      </div>

      {/* Main 2-column layout: Input Area + Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Text Input & Context (5 cols) */}
        <div className="lg:col-span-5 space-y-4 font-sans-ui text-xs">
          <div className="retro-frame p-4 bg-[#ffffff] space-y-3">
            <div>
              <label className="block font-bold text-[#3e220f] uppercase mb-1">
                Hồ sơ đối chiếu nguồn:
              </label>
              <select
                value={selectedProduct.id || ''}
                onChange={(e) => {
                  const found = savedProducts.find((p) => p.id === e.target.value);
                  if (found) setSelectedProduct(found);
                }}
                className="retro-input w-full text-xs bg-white mb-2"
              >
                {savedProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.villageOrRegion})
                  </option>
                ))}
              </select>

              <div className="text-[11px] text-[#5c3818] bg-[#fbf7ee] p-2 border border-[#d3c4ad]">
                <strong>Nguồn lưu trữ đối chiếu:</strong>{' '}
                <span className="italic">{selectedProduct.referenceSources || '[Chưa có nguồn xác minh]'}</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] uppercase mb-1">
                Văn bản cần kiểm tra độ xác thực:
              </label>
              <textarea
                rows={12}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Dán hoặc nhập toàn bộ bài viết, các đoạn giới thiệu sản phẩm thủ công cần kiểm định..."
                className="retro-input w-full font-serif-doc text-xs leading-relaxed"
              />
            </div>

            <button
              onClick={handleRunVerification}
              disabled={isLoading}
              className="w-full retro-btn-primary py-2.5 text-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoading ? 'Đang thẩm định từng câu...' : 'Khởi chạy kiểm tra thông tin'}</span>
            </button>

            {error && (
              <div className="p-2.5 bg-[#fdeeee] border border-[#cc0000] text-[#990000] text-xs">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Verification Report (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {isLoading ? (
            <div className="retro-frame p-12 text-center bg-[#ffffff] space-y-3 font-sans-ui text-xs">
              <RotateCcw className="w-8 h-8 animate-spin mx-auto text-[#8b2500]" />
              <div className="font-bold text-sm text-[#3e220f]">
                Hệ thống đang thẩm định cấu trúc câu và đối chiếu thư viện 16 nguồn...
              </div>
              <p className="font-serif-doc text-xs text-[#5c3818] italic max-w-md mx-auto">
                Tách từng câu đơn, nhận diện các từ ngữ tuyệt đối hóa phóng đại, kiểm tra niên đại lịch sử và xác thực danh hiệu nghệ nhân.
              </p>
            </div>
          ) : !report ? (
            <div className="retro-frame p-12 text-center bg-[#ffffff] space-y-3">
              <ShieldCheck className="w-12 h-12 text-[#b8860b] mx-auto opacity-60" />
              <h3 className="font-serif-doc text-lg font-bold text-[#3e220f]">
                Chưa có kết quả kiểm chứng
              </h3>
              <p className="font-serif-doc text-xs text-[#5c3818] max-w-md mx-auto">
                Nhấn <strong>"Khởi chạy kiểm tra thông tin"</strong> để hệ thống tiến hành bóc tách từng câu văn và xếp loại theo 6 tiêu chuẩn thẩm định F05.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary Scorecard */}
              <div className="retro-frame p-4 bg-[#fdfbf7] space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#cdbfa8] pb-3">
                  <div>
                    <h3 className="font-serif-doc text-lg font-bold text-[#3e220f]">
                      KẾT QUẢ KIỂM CHỨNG TỔNG QUAN
                    </h3>
                    <p className="font-sans-ui text-xs text-[#6e4625]">
                      Thời gian thẩm định: {new Date(report.checkedAt).toLocaleTimeString('vi-VN')} ngày {new Date(report.checkedAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-sans-ui text-[11px] uppercase font-bold text-[#5c3818] block">
                      Độ tin cậy hồ sơ:
                    </span>
                    <span
                      className={`font-mono text-2xl font-bold ${
                        report.credibilityScore >= 75
                          ? 'text-[#2e5927]'
                          : report.credibilityScore >= 50
                          ? 'text-[#b8860b]'
                          : 'text-[#8b2500]'
                      }`}
                    >
                      {report.credibilityScore}/100
                    </span>
                  </div>
                </div>

                {/* 6 Category Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-sans-ui text-xs">
                  <div
                    onClick={() => setFilterCategory('verified')}
                    className={`cursor-pointer p-2 border ${
                      filterCategory === 'verified' ? 'bg-[#eaf5ea] border-[#2e5927]' : 'bg-[#ffffff] border-[#cdbfa8]'
                    }`}
                  >
                    <span className="text-[#2e5927] font-bold block">Đã có nguồn:</span>
                    <span className="font-mono text-lg font-bold text-[#1b4d16]">{report.verifiedCount}</span>
                  </div>

                  <div
                    onClick={() => setFilterCategory('user_provided')}
                    className={`cursor-pointer p-2 border ${
                      filterCategory === 'user_provided' ? 'bg-[#f5eef8] border-[#7b4397]' : 'bg-[#ffffff] border-[#cdbfa8]'
                    }`}
                  >
                    <span className="text-[#551a8b] font-bold block">Tự cung cấp:</span>
                    <span className="font-mono text-lg font-bold text-[#551a8b]">{report.userProvidedCount}</span>
                  </div>

                  <div
                    onClick={() => setFilterCategory('missing_source')}
                    className={`cursor-pointer p-2 border ${
                      filterCategory === 'missing_source' ? 'bg-[#fdeeee] border-[#cc0000]' : 'bg-[#ffffff] border-[#cdbfa8]'
                    }`}
                  >
                    <span className="text-[#990000] font-bold block">Thiếu nguồn:</span>
                    <span className="font-mono text-lg font-bold text-[#cc0000]">{report.missingSourceCount}</span>
                  </div>

                  <div
                    onClick={() => setFilterCategory('exaggerated')}
                    className={`cursor-pointer p-2 border ${
                      filterCategory === 'exaggerated' ? 'bg-[#fff2e0] border-[#e67300]' : 'bg-[#ffffff] border-[#cdbfa8]'
                    }`}
                  >
                    <span className="text-[#b35900] font-bold block">Có phóng đại:</span>
                    <span className="font-mono text-lg font-bold text-[#b35900]">{report.exaggeratedCount}</span>
                  </div>

                  <div
                    onClick={() => setFilterCategory('conflicted')}
                    className={`cursor-pointer p-2 border ${
                      filterCategory === 'conflicted' ? 'bg-[#fdeeee] border-[#990000]' : 'bg-[#ffffff] border-[#cdbfa8]'
                    }`}
                  >
                    <span className="text-[#990000] font-bold block">Mâu thuẫn nguồn:</span>
                    <span className="font-mono text-lg font-bold text-[#990000]">{report.conflictedCount}</span>
                  </div>

                  <div
                    onClick={() => setFilterCategory('needs_info')}
                    className={`cursor-pointer p-2 border ${
                      filterCategory === 'needs_info' ? 'bg-[#fbf5e6] border-[#b8860b]' : 'bg-[#ffffff] border-[#cdbfa8]'
                    }`}
                  >
                    <span className="text-[#855305] font-bold block">Cần bổ sung:</span>
                    <span className="font-mono text-lg font-bold text-[#855305]">{report.needsInfoCount}</span>
                  </div>
                </div>

                {/* Summary narrative */}
                <div className="font-serif-doc text-xs text-[#3e220f] bg-[#f5ede0] p-3 border border-[#cdbfa8]">
                  <strong>Đánh giá của hệ thống:</strong> {report.summary}
                </div>
              </div>

              {/* Claims Breakdown List */}
              <div className="retro-frame bg-[#ffffff] overflow-hidden">
                <div className="retro-header-bar px-4 py-2 font-sans-ui text-xs font-bold uppercase flex justify-between items-center">
                  <span>DANH SÁCH CHI TIẾT TỪNG CÂU ({filteredClaims.length}/{report.claims.length})</span>
                  {filterCategory !== 'all' && (
                    <button
                      onClick={() => setFilterCategory('all')}
                      className="text-[11px] text-[#ffd782] hover:underline"
                    >
                      [Hiển thị tất cả các câu]
                    </button>
                  )}
                </div>

                <div className="divide-y divide-[#e5dac6] p-2 sm:p-4 max-h-[500px] overflow-y-auto">
                  {filteredClaims.map((claim, idx) => (
                    <div key={claim.id} className="py-3 px-2 space-y-1.5 hover:bg-[#faf6ee]">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono font-bold text-xs text-[#6e4625]">
                          #{idx + 1}
                        </span>
                        <div>{getCategoryBadge(claim.category)}</div>
                      </div>

                      {/* Sentence text */}
                      <p className="font-serif-doc text-sm text-[#2b1f17] font-medium leading-relaxed pl-4 border-l-2 border-[#543118]">
                        "{claim.sentence}"
                      </p>

                      {/* Reason & suggestion */}
                      <div className="pl-4 font-sans-ui text-xs space-y-1 text-[#4a2b13]">
                        <div>
                          <strong>Lý giải:</strong> {claim.reason}
                        </div>
                        {claim.suggestion && (
                          <div className="text-[#8b2500] italic">
                            <strong>Gợi ý điều chỉnh:</strong> {claim.suggestion}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save Report to Dossier Footer */}
                {selectedProduct.id && (
                  <div className="p-3 bg-[#f5ede0] border-t border-[#d3c4ad] flex items-center justify-between font-sans-ui text-xs">
                    <span className="text-[#6e4625]">
                      Lưu báo cáo kiểm chứng này vào hồ sơ "{selectedProduct.name}"
                    </span>
                    <button
                      onClick={handleSaveReport}
                      className="retro-btn-wood px-3 py-1.5 flex items-center gap-1.5 text-xs"
                    >
                      <Save className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>{isSaved ? 'Đã lưu báo cáo' : 'Lưu kết quả kiểm tra'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
