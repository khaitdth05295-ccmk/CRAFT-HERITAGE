export type CraftCategory = 
  | 'Gốm sứ'
  | 'Tranh dân gian'
  | 'Mây tre đan'
  | 'Dệt và lụa'
  | 'Sơn mài'
  | 'Chạm khắc gỗ'
  | 'Sản phẩm thủ công khác';

export type VerificationStatus = 
  | 'Đã xác minh'
  | 'Chờ bổ sung nguồn'
  | 'Người dùng đóng góp';

export interface CraftDossier {
  id: string;
  name: string;
  alternateNames?: string;
  category: CraftCategory;
  villageOrRegion: string;
  artisanOrWorkshop?: string;
  primaryMaterial: string;
  secondaryMaterials?: string;
  dimensions?: string;
  colors?: string;
  patterns?: string;
  usagePurpose: string;
  craftingProcess: string;
  distinctiveFeatures: string;
  productStory?: string;
  culturalValue?: string;
  imageUrl: string;
  referenceSources: string;
  notes?: string;
  verificationStatus: VerificationStatus;
  verificationDetails?: {
    verifiedBy?: string;
    verifiedDate?: string;
    matchedSourceIds?: number[];
    isOfficialSourceMatched: boolean;
    missingFields?: string[];
  };
  generatedArticle?: {
    title: string;
    overview: string;
    materials: string;
    characteristics: string;
    techniques: string;
    usage: string;
    culturalValue: string;
    artisanInfo: string;
    generatedAt: string;
    isEditedByUser?: boolean;
  };
  claimCheckResult?: ClaimCheckReport;
  createdAt: string;
  updatedAt: string;
}

export type ClaimCategory = 
  | 'verified'          // Đã có nguồn chứng minh
  | 'user_provided'      // Người dùng tự cung cấp, chưa xác minh độc lập
  | 'missing_source'     // Thiếu nguồn
  | 'exaggerated'        // Có dấu hiệu phóng đại
  | 'conflicted'         // Mâu thuẫn với nguồn tham khảo
  | 'needs_info';        // Cần bổ sung thông tin

export interface ClaimItem {
  id: string;
  sentence: string;
  category: ClaimCategory;
  reason: string;
  suggestion?: string;
  citationSource?: string;
}

export interface ClaimCheckReport {
  totalClaims: number;
  verifiedCount: number;
  userProvidedCount: number;
  missingSourceCount: number;
  exaggeratedCount: number;
  conflictedCount: number;
  needsInfoCount: number;
  credibilityScore: number; // 0 - 100
  summary: string;
  claims: ClaimItem[];
  checkedAt: string;
}
