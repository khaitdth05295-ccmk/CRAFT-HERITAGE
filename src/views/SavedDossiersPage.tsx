import React, { useState, useMemo } from 'react';
import { CraftDossier, CraftCategory, VerificationStatus } from '../types/craft';
import { 
  FolderClock, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  FileText, 
  Printer, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';

interface SavedDossiersPageProps {
  dossiers: CraftDossier[];
  onEditDossier: (dossier: CraftDossier) => void;
  onDeleteDossier: (id: string) => Promise<void>;
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

export const SavedDossiersPage: React.FC<SavedDossiersPageProps> = ({
  dossiers,
  onEditDossier,
  onDeleteDossier,
  onOpenAssistant,
  onOpenVerifier,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Tất cả' | CraftCategory>('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState<'Tất cả' | VerificationStatus>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDossier, setActiveDossier] = useState<CraftDossier | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const filteredDossiers = useMemo(() => {
    return dossiers.filter((d) => {
      const matchCat = selectedCategory === 'Tất cả' || d.category === selectedCategory;
      const matchStatus = selectedStatus === 'Tất cả' || d.verificationStatus === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.villageOrRegion.toLowerCase().includes(q) ||
        d.primaryMaterial.toLowerCase().includes(q) ||
        (d.artisanOrWorkshop && d.artisanOrWorkshop.toLowerCase().includes(q));

      return matchCat && matchStatus && matchSearch;
    });
  }, [dossiers, selectedCategory, selectedStatus, searchQuery]);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa hồ sơ "${name}" khỏi cơ sở dữ liệu lưu trữ? Thao tác này không thể hoàn tác.`)) {
      try {
        await onDeleteDossier(id);
        setNotification({
          type: 'success',
          message: `Đã xóa hồ sơ "${name}" thành công!`,
        });
        setTimeout(() => setNotification(null), 3000);
      } catch (err: any) {
        setNotification({
          type: 'error',
          message: err?.message || 'Không thể xóa hồ sơ.',
        });
      }
    }
  };

  const handleExportBatchWord = (dossier: CraftDossier) => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${dossier.name} - Hồ sơ F05</title>
        <style>
          body { font-family: 'Times New Roman', serif; line-height: 1.6; color: #000; padding: 25px; }
          h1 { color: #8b2500; font-size: 20pt; text-align: center; }
          .header-info { text-align: center; font-size: 10pt; color: #555; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
          .meta-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .meta-table td { border: 1px solid #999; padding: 6px; font-size: 11pt; }
          .meta-table td.label { font-weight: bold; width: 30%; background: #f2f2f2; }
          .section-title { font-weight: bold; font-size: 12pt; color: #543118; margin-top: 20px; border-bottom: 1px solid #8b2500; }
        </style>
      </head>
      <body>
        <h1>HỒ SƠ TƯ LIỆU SẢN PHẨM THỦ CÔNG TRUYỀN THỐNG VIỆT NAM</h1>
        <div class="header-info">
          CRAFT HERITAGE • ĐỀ TÀI F05 (FPT POLYTECHNIC × IMTA TECH)<br>
          Mã định danh: ${dossier.id} • Ngày lưu trữ: ${new Date(dossier.createdAt).toLocaleDateString('vi-VN')}
        </div>

        <table class="meta-table">
          <tr><td class="label">Tên sản phẩm:</td><td><strong>${dossier.name}</strong></td></tr>
          <tr><td class="label">Nhóm nghề:</td><td>${dossier.category}</td></tr>
          <tr><td class="label">Làng nghề / Địa phương:</td><td>${dossier.villageOrRegion}</td></tr>
          <tr><td class="label">Nghệ nhân / Cơ sở:</td><td>${dossier.artisanOrWorkshop || 'Chưa có thông tin'}</td></tr>
          <tr><td class="label">Chất liệu chính:</td><td>${dossier.primaryMaterial}</td></tr>
          <tr><td class="label">Kích thước:</td><td>${dossier.dimensions || 'Chưa đo đạc'}</td></tr>
          <tr><td class="label">Trạng thái xác minh:</td><td><strong>${dossier.verificationStatus}</strong></td></tr>
        </table>

        <div class="section-title">1. QUY TRÌNH CHẾ TÁC</div>
        <p>${dossier.craftingProcess || 'Chưa có nguồn xác minh'}</p>

        <div class="section-title">2. ĐẶC ĐIỂM NỔI BẬT & CÔNG DỤNG</div>
        <p><strong>Đặc điểm:</strong> ${dossier.distinctiveFeatures || 'Chưa ghi nhận'}</p>
        <p><strong>Công dụng:</strong> ${dossier.usagePurpose || 'Chưa ghi nhận'}</p>

        <div class="section-title">3. GIÁ TRỊ VĂN HÓA & NGUỒN CHỨNG MINH</div>
        <p>${dossier.culturalValue || dossier.productStory || 'Chưa có nguồn xác minh'}</p>
        <p><strong>Nguồn tham khảo:</strong> ${dossier.referenceSources || 'Chưa có nguồn'}</p>

        ${
          dossier.generatedArticle
            ? `
          <div class="section-title">4. BÀI GIỚI THIỆU DO GEMINI SOẠN THẢO</div>
          <p><strong>${dossier.generatedArticle.title}</strong></p>
          <p>${dossier.generatedArticle.overview}</p>
          <p><strong>Kỹ thuật:</strong> ${dossier.generatedArticle.techniques}</p>
          <p><strong>Giá trị văn hóa:</strong> ${dossier.generatedArticle.culturalValue}</p>
        `
            : ''
        }
      </body>
      </html>
    `;
    const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ho_So_${dossier.id}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="retro-frame p-4 sm:p-5 bg-[#fcf9f2]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-[#543118] pb-3 mb-3">
          <div>
            <div className="font-sans-ui text-xs font-bold text-[#8b2500] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FolderClock className="w-4 h-4" />
              <span>KHO DỮ LIỆU LƯU TRỮ LÂU DÀI • ĐỀ TÀI F05</span>
            </div>
            <h1 className="font-serif-doc text-2xl font-bold text-[#3e220f]">
              DANH SÁCH HỒ SƠ ĐÃ LƯU TRỮ
            </h1>
            <p className="font-serif-doc text-xs sm:text-sm text-[#5c3818] italic mt-0.5">
              Quản lý toàn bộ hồ sơ sản phẩm thủ công, theo dõi tình trạng xác minh, chỉnh sửa và xuất bản tài liệu.
            </p>
          </div>
          <div className="font-sans-ui text-xs bg-[#f5ede0] border border-[#6b4423] px-3 py-1.5 text-[#3e220f] shrink-0 font-bold">
            Tổng số hồ sơ: <span className="font-mono text-[#8b2500] text-sm">{dossiers.length}</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-3 font-sans-ui text-xs">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm hồ sơ theo tên sản phẩm, làng nghề, chất liệu..."
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

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
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

          <div className="flex items-center gap-2 pt-1 border-t border-[#e5dac6]">
            <span className="font-bold text-[#543118] uppercase text-[11px]">Trạng thái:</span>
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

      {notification && (
        <div
          className={`p-3 text-xs font-sans-ui border flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-[#eaf5ea] border-[#2e5927] text-[#1b4d16]'
              : 'bg-[#fdeeee] border-[#cc0000] text-[#990000]'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Dossiers Table Layout */}
      <div className="retro-frame bg-[#ffffff] overflow-x-auto">
        <table className="retro-table">
          <thead>
            <tr>
              <th className="w-20">MÃ HỒ SƠ</th>
              <th className="w-44">TÊN SẢN PHẨM</th>
              <th className="w-32">NHÓM NGHỀ</th>
              <th>ĐỊA PHƯƠNG / LÀNG NGHỀ</th>
              <th className="w-36">TRẠNG THÁI</th>
              <th className="w-28">NGÀY LƯU</th>
              <th className="w-44 text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5dac6] font-sans-ui text-xs">
            {filteredDossiers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 font-serif-doc text-[#5c3818]">
                  Không tìm thấy hồ sơ lưu trữ nào khớp với điều kiện lọc.
                </td>
              </tr>
            ) : (
              filteredDossiers.map((d) => (
                <tr key={d.id}>
                  <td className="font-mono text-xs font-bold text-[#8b2500]">
                    {d.id}
                  </td>
                  <td>
                    <div className="font-serif-doc font-bold text-sm text-[#3e220f]">
                      {d.name}
                    </div>
                    {d.alternateNames && (
                      <div className="text-[11px] text-[#70451f] italic font-serif-doc">
                        {d.alternateNames}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="bg-[#f5ede0] border border-[#cdbfa8] px-2 py-0.5 text-[11px] font-semibold text-[#543118]">
                      {d.category}
                    </span>
                  </td>
                  <td className="font-serif-doc text-xs text-[#2b1f17]">
                    {d.villageOrRegion}
                  </td>
                  <td>
                    <span
                      className={`stamp-badge ${
                        d.verificationStatus === 'Đã xác minh'
                          ? 'stamp-verified'
                          : d.verificationStatus === 'Chờ bổ sung nguồn'
                          ? 'stamp-pending'
                          : 'stamp-user'
                      }`}
                    >
                      {d.verificationStatus}
                    </span>
                  </td>
                  <td className="text-[11px] text-[#5c3818]">
                    {new Date(d.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setActiveDossier(d)}
                        title="Xem toàn bộ hồ sơ"
                        className="retro-btn p-1 text-[#3e220f]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onEditDossier(d)}
                        title="Chỉnh sửa hồ sơ"
                        className="retro-btn p-1 text-[#543118]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleExportBatchWord(d)}
                        title="Xuất file Word (.doc)"
                        className="retro-btn p-1 text-[#2e5927]"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(d.id, d.name)}
                        title="Xóa hồ sơ khỏi cơ sở dữ liệu"
                        className="retro-btn p-1 text-[#8b2500]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal View */}
      <ProductDetailModal
        dossier={activeDossier}
        onClose={() => setActiveDossier(null)}
        onOpenAssistant={onOpenAssistant}
        onOpenVerifier={onOpenVerifier}
      />
    </div>
  );
};
