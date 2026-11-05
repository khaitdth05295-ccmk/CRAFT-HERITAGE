import React, { useState, useEffect } from 'react';
import { CraftDossier, CraftCategory } from '../types/craft';
import { 
  Save, 
  Sparkles, 
  ShieldCheck, 
  Trash2, 
  FileEdit, 
  CheckCircle, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';

interface CreateDossierPageProps {
  onSaveDossier: (dossier: Partial<CraftDossier>) => Promise<CraftDossier>;
  onProceedToAssistant: (dossierData: Partial<CraftDossier>) => void;
  onProceedToVerifier: (dossierData: Partial<CraftDossier>) => void;
  initialData?: Partial<CraftDossier> | null;
}

const CATEGORIES: CraftCategory[] = [
  'Gốm sứ',
  'Tranh dân gian',
  'Mây tre đan',
  'Dệt và lụa',
  'Sơn mài',
  'Chạm khắc gỗ',
  'Sản phẩm thủ công khác',
];

const STORAGE_DRAFT_KEY = 'craft_heritage_dossier_draft_v1';

export const CreateDossierPage: React.FC<CreateDossierPageProps> = ({
  onSaveDossier,
  onProceedToAssistant,
  onProceedToVerifier,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<CraftDossier>>({
    name: '',
    alternateNames: '',
    category: 'Gốm sứ',
    villageOrRegion: '',
    artisanOrWorkshop: '',
    primaryMaterial: '',
    secondaryMaterials: '',
    dimensions: '',
    colors: '',
    patterns: '',
    usagePurpose: '',
    craftingProcess: '',
    distinctiveFeatures: '',
    productStory: '',
    culturalValue: '',
    imageUrl: '',
    referenceSources: '',
    notes: '',
    verificationStatus: 'Chờ bổ sung nguồn',
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load from draft or initialData
  useEffect(() => {
    if (initialData && initialData.name) {
      setFormData(initialData);
      return;
    }
    const savedDraft = localStorage.getItem(STORAGE_DRAFT_KEY);
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch (e) {
        console.error('Error loading draft', e);
      }
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(formData));
    setNotification({
      type: 'info',
      message: 'Bản nháp đã được lưu vào bộ nhớ trình duyệt thành công.',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClearForm = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ nội dung trong biểu mẫu này?')) {
      const emptyState: Partial<CraftDossier> = {
        name: '',
        alternateNames: '',
        category: 'Gốm sứ',
        villageOrRegion: '',
        artisanOrWorkshop: '',
        primaryMaterial: '',
        secondaryMaterials: '',
        dimensions: '',
        colors: '',
        patterns: '',
        usagePurpose: '',
        craftingProcess: '',
        distinctiveFeatures: '',
        productStory: '',
        culturalValue: '',
        imageUrl: '',
        referenceSources: '',
        notes: '',
        verificationStatus: 'Chờ bổ sung nguồn',
      };
      setFormData(emptyState);
      localStorage.removeItem(STORAGE_DRAFT_KEY);
      setNotification({ type: 'info', message: 'Đã xóa nội dung biểu mẫu.' });
      setTimeout(() => setNotification(null), 2500);
    }
  };

  const handleSaveToRepository = async () => {
    if (!formData.name?.trim()) {
      alert('Vui lòng nhập Tên sản phẩm.');
      return;
    }
    if (!formData.villageOrRegion?.trim()) {
      alert('Vui lòng nhập Làng nghề hoặc Địa phương sản xuất.');
      return;
    }
    if (!formData.primaryMaterial?.trim()) {
      alert('Vui lòng nhập Chất liệu chính.');
      return;
    }

    try {
      setIsSaving(true);
      const saved = await onSaveDossier(formData);
      setNotification({
        type: 'success',
        message: `Đã lưu hồ sơ "${saved.name}" (Mã: ${saved.id}) vào cơ sở dữ liệu lưu trữ thành công!`,
      });
      localStorage.removeItem(STORAGE_DRAFT_KEY);
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err?.message || 'Có lỗi khi lưu hồ sơ.',
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleFillSample = () => {
    const sampleProduct: Partial<CraftDossier> = {
      name: 'Nón lá làng Chuông',
      alternateNames: 'Nón lá cọ Chuông, Nón ba tầm truyền thống',
      category: 'Sản phẩm thủ công khác',
      villageOrRegion: 'Làng Chuông, xã Phương Trung, huyện Thanh Oai, Hà Nội',
      artisanOrWorkshop: 'Hợp tác xã nón lá truyền thống làng Chuông',
      primaryMaterial: 'Lá lụi / lá cọ non tươi lấy từ vùng đồi Quảng Bình, Hà Tĩnh',
      secondaryMaterials: 'Vành tre nứa chẻ vuốt tròn, cước chỉ trắng, sợi len hoa buộc chóp',
      dimensions: 'Đường kính vành đáy 40cm, chiều cao chóp nón 25cm, 16 vòng vành',
      colors: 'Trắng xanh tự nhiên của lá cọ phơi sấy khô, bóng mịn',
      patterns: 'Khâu lồng hình hoa sen hoặc câu thơ Thăng Long kẹp giữa 2 lớp lá',
      usagePurpose: 'Che nắng mưa thường nhật, phụ kiện trang phục áo dài truyền thống, múa dân gian',
      craftingProcess: 'Phơi lá non râm mát -> Là phẳng lá bằng lưỡi cày nóng đè giẻ ẩm -> Chuốt 16 vành nứa đều đặn -> Xếp lá lên khuôn nón -> Khâu lá tỉ mỉ bằng kim chỉ cước từng mũi đều tăm tắp -> Quét dầu bóng thông giữ ẩm.',
      distinctiveFeatures: 'Nón có đúng 16 vành nứa tượng trưng cho tuổi trăng tròn, đường khâu mũi cước kín khít không lọt một giọt nước mưa.',
      productStory: 'Làng Chuông nổi tiếng từ thế kỷ 8 với nghề làm nón cung tiến quan lại và Hoàng triều, được người dân giữ nghề qua bao thế hệ.',
      culturalValue: 'Nằm trong danh mục sản phẩm thủ công tiêu biểu của Thủ đô Hà Nội theo bài viết của Báo Chính phủ về sản phẩm làng nghề gắn với du lịch.',
      imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      referenceSources: 'Báo Chính phủ – Sản phẩm làng nghề truyền thống: Góp phần phát triển du lịch Thủ đô (https://thanglong.chinhphu.vn/san-pham-lang-nghe-truyen-thong-gop-phan-phat-trien-du-lich-thu-do-10328728.htm).',
      notes: 'Sản phẩm thử nghiệm điền mẫu đối chiếu kiểm định F05.',
      verificationStatus: 'Đã xác minh',
    };
    setFormData(sampleProduct);
    setNotification({
      type: 'info',
      message: 'Đã nạp mẫu thử nghiệm: Nón lá làng Chuông (có trích dẫn nguồn Báo Chính phủ).',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="retro-frame p-4 sm:p-5 bg-[#fcf9f2]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b-2 border-[#543118] pb-3 mb-3">
          <div>
            <div className="font-sans-ui text-xs font-bold text-[#8b2500] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileEdit className="w-4 h-4" />
              <span>CHỨC NĂNG CỐT LÕI F05 – NHẬP LIỆU HỒ SƠ</span>
            </div>
            <h1 className="font-serif-doc text-2xl font-bold text-[#3e220f]">
              LẬP HỒ SƠ TƯ LIỆU SẢN PHẨM THỦ CÔNG
            </h1>
            <p className="font-serif-doc text-xs sm:text-sm text-[#5c3818] italic mt-0.5">
              Nhập các trường thông tin kỹ thuật và lịch sử. Có thể bỏ trống các mục chưa rõ nguồn xác minh.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={handleFillSample}
              className="retro-btn px-3 py-1.5 text-xs text-[#543118] flex items-center gap-1"
              title="Điền nhanh một sản phẩm mẫu có nguồn Báo Chính phủ để thử nghiệm"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Nạp mẫu thử (Nón làng Chuông)</span>
            </button>
          </div>
        </div>

        {/* Notice alert */}
        <div className="bg-[#fff9ea] border border-[#d4af37] p-2.5 text-xs font-sans-ui text-[#543118] flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
          <span>
            <strong>Nguyên tắc nhập liệu F05:</strong> Không tự bịa thông tin lịch sử, niên đại hay danh hiệu nghệ nhân nếu chưa có căn cứ. Mục nào chưa có dữ liệu có thể để trống; hệ thống và Trợ lý sẽ tự động gắn nhãn <em>"[Chưa có nguồn xác minh]"</em> minh bạch.
          </span>
        </div>
      </div>

      {notification && (
        <div
          className={`p-3 text-xs font-sans-ui border flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-[#eaf5ea] border-[#2e5927] text-[#1b4d16]'
              : notification.type === 'error'
              ? 'bg-[#fdeeee] border-[#cc0000] text-[#990000]'
              : 'bg-[#f5ede0] border-[#6b4423] text-[#3e220f]'
          }`}
        >
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Form Fields Layout */}
      <div className="retro-frame bg-[#ffffff] p-4 sm:p-6 space-y-6">
        {/* Section 1: Thông tin định danh */}
        <div>
          <div className="retro-sub-bar px-3 py-1.5 font-sans-ui font-bold text-xs uppercase mb-4 flex items-center justify-between">
            <span>I. THÔNG TIN ĐỊNH DANH SẢN PHẨM</span>
            <span className="text-[11px] text-[#8b2500] font-normal">* Mục bắt buộc</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans-ui text-xs">
            <div className="md:col-span-2">
              <label className="block font-bold text-[#3e220f] mb-1">
                Tên sản phẩm <span className="text-[#8b2500]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Bình hoa gốm men lam Bát Tràng, Lồng bàn đan mây Phú Vinh..."
                className="retro-input w-full text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Tên gọi khác / Tên cổ truyền
              </label>
              <input
                type="text"
                name="alternateNames"
                value={formData.alternateNames || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Lọ hoa lam Thăng Long..."
                className="retro-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Nhóm sản phẩm thủ công <span className="text-[#8b2500]">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="retro-input w-full text-xs bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Làng nghề hoặc Địa phương <span className="text-[#8b2500]">*</span>
              </label>
              <input
                type="text"
                name="villageOrRegion"
                value={formData.villageOrRegion || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Làng gốm Bát Tràng, Gia Lâm, Hà Nội"
                className="retro-input w-full text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Tên nghệ nhân / Cơ sở sản xuất
              </label>
              <input
                type="text"
                name="artisanOrWorkshop"
                value={formData.artisanOrWorkshop || ''}
                onChange={handleChange}
                placeholder="Để trống nếu chưa có xác thực danh hiệu"
                className="retro-input w-full text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Chất liệu & Kỹ thuật */}
        <div>
          <div className="retro-sub-bar px-3 py-1.5 font-sans-ui font-bold text-xs uppercase mb-4">
            II. CHẤT LIỆU & THÔNG SỐ KỸ THUẬT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans-ui text-xs">
            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Chất liệu chính <span className="text-[#8b2500]">*</span>
              </label>
              <input
                type="text"
                name="primaryMaterial"
                value={formData.primaryMaterial || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Đất sét cao lanh, Song mây tự nhiên, Tơ tằm 100%..."
                className="retro-input w-full text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Nguyên liệu phụ trợ
              </label>
              <input
                type="text"
                name="secondaryMaterials"
                value={formData.secondaryMaterials || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Men tro trấu, oxit coban, vỏ ốc xà cừ..."
                className="retro-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Kích thước / Trọng lượng quy chuẩn
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Cao 35cm, đường kính miệng 12cm..."
                className="retro-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Màu sắc & Nước men / Bề mặt
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Men lam trên nền trắng ngà, màu nâu cánh gián..."
                className="retro-input w-full text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-[#3e220f] mb-1">
                Hoa văn & Biểu tượng trang trí
              </label>
              <input
                type="text"
                name="patterns"
                value={formData.patterns || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Hoa sen liên hoa, mây cuộn thời Lê, sọc ca-rô rằn ri..."
                className="retro-input w-full text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Quy trình chế tác & Công năng */}
        <div>
          <div className="retro-sub-bar px-3 py-1.5 font-sans-ui font-bold text-xs uppercase mb-4">
            III. QUY TRÌNH CHẾ TÁC & CÔNG DỤNG
          </div>

          <div className="space-y-4 font-sans-ui text-xs">
            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Quy trình chế tác thủ công (Từng công đoạn)
              </label>
              <textarea
                name="craftingProcess"
                rows={3}
                value={formData.craftingProcess || ''}
                onChange={handleChange}
                placeholder="Mô tả các bước chính: Luyện đất -> Chuốt tạo hình -> Vẽ men -> Nung lò..."
                className="retro-input w-full text-xs font-serif-doc"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#3e220f] mb-1">
                  Công dụng thực tế
                </label>
                <textarea
                  name="usagePurpose"
                  rows={2}
                  value={formData.usagePurpose || ''}
                  onChange={handleChange}
                  placeholder="Ví dụ: Cắm hoa bài trí, đậy thức ăn bàn cơm, trang phục truyền thống..."
                  className="retro-input w-full text-xs font-serif-doc"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3e220f] mb-1">
                  Đặc điểm nổi bật & Cách nhận diện
                </label>
                <textarea
                  name="distinctiveFeatures"
                  rows={2}
                  value={formData.distinctiveFeatures || ''}
                  onChange={handleChange}
                  placeholder="Ví dụ: Cốt gốm dày dặn âm thanh vang chuông; nan mây đan khít không lọt muỗi..."
                  className="retro-input w-full text-xs font-serif-doc"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Tư liệu, Giá trị văn hóa & Nguồn chứng minh */}
        <div>
          <div className="retro-sub-bar px-3 py-1.5 font-sans-ui font-bold text-xs uppercase mb-4 flex items-center justify-between">
            <span>IV. GIÁ TRỊ VĂN HÓA & NGUỒN CHỨNG MINH</span>
            <span className="text-[11px] text-[#2e5927] font-semibold">Trọng tâm kiểm định F05</span>
          </div>

          <div className="space-y-4 font-sans-ui text-xs">
            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Câu chuyện sản phẩm / Lịch sử lưu truyền
              </label>
              <textarea
                name="productStory"
                rows={2}
                value={formData.productStory || ''}
                onChange={handleChange}
                placeholder="Ghi nhận tích truyện dân gian hoặc bối cảnh ra đời của dòng sản phẩm..."
                className="retro-input w-full text-xs font-serif-doc"
              />
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Giá trị văn hóa (Chỉ điền khi có tư liệu chứng minh)
              </label>
              <textarea
                name="culturalValue"
                rows={2}
                value={formData.culturalValue || ''}
                onChange={handleChange}
                placeholder="Nếu chưa có tài liệu chứng minh, ghi rõ '[Chưa có nguồn xác minh]' để tránh vi phạm nguyên tắc F05."
                className="retro-input w-full text-xs font-serif-doc"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#8b2500] mb-1">
                  Nguồn tư liệu tham khảo đối chiếu
                </label>
                <textarea
                  name="referenceSources"
                  rows={2}
                  value={formData.referenceSources || ''}
                  onChange={handleChange}
                  placeholder="Ví dụ: UNESCO – Art of pottery-making; Báo Chính phủ số 10315641; UBND xã Phú Nghĩa..."
                  className="retro-input w-full text-xs font-serif-doc"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3e220f] mb-1">
                  Đường dẫn ảnh sản phẩm thực địa (URL)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="retro-input w-full text-xs"
                />
                <div className="text-[10px] text-[#70451f] italic mt-1">
                  Nếu không nhập ảnh, hệ thống tự động gắn hình ảnh tư liệu di sản mặc định.
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#3e220f] mb-1">
                Ghi chú bổ sung
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                placeholder="Ví dụ: Đạt chứng nhận OCOP 4 sao năm 2023..."
                className="retro-input w-full text-xs"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="pt-4 border-t-2 border-[#543118] flex flex-wrap items-center justify-between gap-3 font-sans-ui text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="retro-btn px-3 py-2 flex items-center gap-1.5 text-[#3e220f]"
            >
              <Save className="w-4 h-4 text-[#7a4b27]" />
              <span>Lưu bản nháp</span>
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="retro-btn px-3 py-2 flex items-center gap-1.5 text-[#8b2500]"
            >
              <Trash2 className="w-4 h-4" />
              <span>Xóa nội dung</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onProceedToAssistant(formData)}
              className="retro-btn-wood px-4 py-2 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span>Soạn bài với Trợ lý</span>
            </button>
            <button
              type="button"
              onClick={() => onProceedToVerifier(formData)}
              className="retro-btn px-4 py-2 flex items-center gap-1.5 text-[#2e5927] border-[#2e5927] font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-[#2e5927]" />
              <span>Kiểm tra thông tin</span>
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveToRepository}
              className="retro-btn-primary px-5 py-2 flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSaving ? 'Đang lưu...' : 'Lưu vào kho hồ sơ'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
