export type Language = 'en' | 'hi' | 'gu';

export type ProductCategory = 'all' | 'moong' | 'udad' | 'speciality' | 'khichiya';

export type SpiceLevel = 'mild' | 'medium' | 'spicy';

export type PrepMethod = 'roast' | 'deep_fry' | 'air_fry' | 'microwave';

export interface PackOption {
  size: string;
  weightGrams: number;
  isPopular?: boolean;
  isWholesale?: boolean;
}

export interface ProductItem {
  id: string;
  slug: string;
  category: 'moong' | 'udad' | 'speciality' | 'khichiya';
  visualType: 'moong_mari' | 'udad_jeera' | 'garlic_lasaniya' | 'sindhi_masala' | 'rice_khichiya' | 'coin_papad';
  name: Record<Language, string>;
  categoryLabel: Record<Language, string>;
  description: Record<Language, string>;
  ingredients: Record<Language, string[]>;
  packOptions: PackOption[];
  spiceLevel: SpiceLevel;
  prepMethods: PrepMethod[];
  shelfLifeMonths: number;
  isBestSeller?: boolean;
}

export interface EnquiryItem {
  productId: string;
  packSize: string;
  quantity: number;
}

export interface CityDelivery {
  id: string;
  city: Record<Language, string>;
  state: Record<Language, string>;
  estimatedDays: string;
  tier: 'local' | 'gujarat' | 'pan_india';
  isSameDay?: boolean;
  wholesaleAvailable: boolean;
}

export interface StoreConfig {
  brandName: string;
  phoneWhatsApp: string;
  phoneDisplay: string;
  email: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  fssaiLicence: string;
  gstin?: string;
  workingHours: string;
}
