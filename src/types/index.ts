export type MainCategory = 
  | 'vehicles' 
  | 'real-estate' 
  | 'jobs' 
  | 'electronics' 
  | 'services' 
  | 'pets' 
  | 'business' 
  | 'community' 
  | 'all';

export type UserRole = 'buyer' | 'seller' | 'business' | 'admin';

export interface CategoryInfo {
  id: MainCategory;
  name: string;
  icon: string;
  liveCount: number;
  trendingPct: string;
  subcategories: string[];
  description?: string;
  aiRecommendation?: string;
}

export interface SellerInfo {
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  responseRate: string;
  type: 'individual' | 'dealer' | 'agency' | 'employer' | 'agent' | 'business' | string;
}

export interface AIMetrics {
  dealScore: 'Great Deal' | 'Fair Price' | 'Hot Find' | 'Overpriced' | string;
  trustScore: any;
  demandScore: any;
  priceHistoryTrend: 'up' | 'down' | 'stable' | string;
  pros: string[];
  cons: string[];
  aiSummary: string;
}

export interface ListingSpec {
  label: string;
  value: string | number;
}

export interface Listing {
  id: string;
  title: string;
  category: MainCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  priceType: 'fixed' | 'negotiable' | 'starting' | 'hourly' | 'monthly' | 'contact' | string;
  location: string;
  images: string[];
  description: string;
  seller: SellerInfo;
  aiMetrics: AIMetrics;
  specs: ListingSpec[];
  createdDate: string;
  views: number;
  likes: number;
  featured?: boolean;
  vehicleDetails?: any;
  jobDetails?: any;
  propertyDetails?: any;
}

export type ListingItem = Listing;

export interface FilterState {
  category: MainCategory;
  subcategory: string;
  priceRange?: [number, number];
  searchQuery: string;
  priceType: string;
  sortBy: 'recommended' | 'price_low' | 'price_high' | 'newest' | 'trust' | 'price-low' | 'price-high' | 'trust-score' | string;
  minPrice?: number;
  maxPrice?: number;
  verifiedOnly?: boolean;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  agentName?: string;
  actionPayload?: {
    type: 'listing_grid' | 'comparison' | 'contract' | 'negotiation' | 'valuation' | 'resume_analysis' | 'architecture_demo';
    data?: any;
  };
}

export interface LegalContract {
  id: string;
  title: string;
  buyerName: string;
  sellerName: string;
  price: number;
  date: string;
  status: 'draft' | 'signed' | 'escrowed';
}
