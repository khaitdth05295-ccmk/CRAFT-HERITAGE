import React from 'react';
import { 
  Home, 
  Archive, 
  FileEdit, 
  Sparkles, 
  ShieldCheck, 
  FolderClock, 
  BookOpen, 
  Info 
} from 'lucide-react';

export type NavTab = 
  | 'home' 
  | 'catalog' 
  | 'create' 
  | 'assistant' 
  | 'verifier' 
  | 'saved' 
  | 'sources' 
  | 'about';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  savedCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  savedCount = 0,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-4 h-4" /> },
    { id: 'catalog', label: 'Kho sản phẩm', icon: <Archive className="w-4 h-4" /> },
    { id: 'create', label: 'Tạo hồ sơ', icon: <FileEdit className="w-4 h-4" /> },
    { id: 'assistant', label: 'Trợ lý', icon: <Sparkles className="w-4 h-4 text-[#ffd700]" /> },
    { id: 'verifier', label: 'Kiểm tra thông tin', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'saved', label: 'Hồ sơ đã lưu', icon: <FolderClock className="w-4 h-4" />, badge: savedCount },
    { id: 'sources', label: 'Thư viện nguồn', icon: <BookOpen className="w-4 h-4" />, badge: 16 },
    { id: 'about', label: 'Giới thiệu đề tài', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-[#4a2810] border-b-2 border-[#2b1608] sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex overflow-x-auto no-scrollbar py-1 gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-sans-ui font-semibold whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-[#fcf9f2] text-[#3e220f] border-t-2 border-t-[#8b2500] border-x-[#2b1608] border-b-0 shadow-inner'
                    : 'bg-[#5c3518] text-[#f7ecd8] border-[#734320] hover:bg-[#6c401f] hover:text-[#ffffff]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-none font-bold border ${
                      isActive
                        ? 'bg-[#8b2500] text-white border-[#501300]'
                        : 'bg-[#3b1e0a] text-[#f1ddba] border-[#221004]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
