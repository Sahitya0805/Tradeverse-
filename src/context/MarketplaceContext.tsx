import React, { createContext, useContext, useState, useMemo } from 'react';
import { Listing, FilterState, UserRole } from '../types';
import { MOCK_LISTINGS } from '../data/mockListings';

interface MarketplaceContextType {
  listings: Listing[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  isWorkspaceOpen: boolean;
  setIsWorkspaceOpen: (open: boolean) => void;
  isVoiceSearchOpen: boolean;
  setIsVoiceSearchOpen: (open: boolean) => void;
  isImageSearchOpen: boolean;
  setIsImageSearchOpen: (open: boolean) => void;
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (open: boolean) => void;
  isNegotiatorModalOpen: boolean;
  setIsNegotiatorModalOpen: (open: boolean) => void;
  isContractModalOpen: boolean;
  setIsContractModalOpen: (open: boolean) => void;
  isCreateListingOpen: boolean;
  setIsCreateListingOpen: (open: boolean) => void;
  isResumeInterviewOpen: boolean;
  setIsResumeInterviewOpen: (open: boolean) => void;
  negotiationTarget: Listing | null;
  setNegotiationTarget: (listing: Listing | null) => void;
  contractTarget: Listing | null;
  setContractTarget: (listing: Listing | null) => void;
  openNegotiation: (listing: Listing) => void;
  openContractGenerator: (listing: Listing) => void;
  addNewListing: (listing: Listing) => void;
  notifyMessage: { text: string; type: 'success' | 'info' | 'error' } | null;
  toastMessage: { text: string; type: 'success' | 'info' | 'error' } | null;
  notify: (text: string, type?: 'success' | 'info' | 'error') => void;
  useMarketplace?: any;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    subcategory: 'all',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 2000000,
    priceType: 'all',
    verifiedOnly: false,
    sortBy: 'recommended'
  });
  
  const [userRole, setUserRole] = useState<UserRole>('buyer');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['veh-1', 're-1']);
  const [compareIds, setCompareIds] = useState<string[]>(['veh-1', 'veh-2']);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Modals state
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isNegotiatorModalOpen, setIsNegotiatorModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isResumeInterviewOpen, setIsResumeInterviewOpen] = useState(false);

  const [negotiationTarget, setNegotiationTarget] = useState<Listing | null>(null);
  const [contractTarget, setContractTarget] = useState<Listing | null>(null);

  // Toast Notification
  const [notifyMessage, setNotifyMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const notify = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotifyMessage({ text, type });
    setTimeout(() => setNotifyMessage(null), 3000);
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      notify(exists ? 'Removed from Wishlist' : 'Saved to Wishlist ❤️', exists ? 'info' : 'success');
      return updated;
    });
  };

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      const exists = prev.includes(id);
      if (!exists && prev.length >= 3) {
        notify('Maximum 3 items allowed in Spec Comparison Matrix', 'error');
        return prev;
      }
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      notify(exists ? 'Removed from Spec Matrix' : 'Added to Spec Comparison Matrix 📊', 'info');
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  const openNegotiation = (listing: Listing) => {
    setNegotiationTarget(listing);
    setIsNegotiatorModalOpen(true);
  };

  const openContractGenerator = (listing: Listing) => {
    setContractTarget(listing);
    setIsContractModalOpen(true);
  };

  const addNewListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    notify('🎉 New AI Listing created and published live!', 'success');
  };

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (filters.category !== 'all' && item.category !== filters.category) return false;
      if (filters.subcategory !== 'all' && item.subcategory !== filters.subcategory) return false;
      
      const minP = filters.minPrice ?? 0;
      const maxP = filters.maxPrice ?? 2000000;
      if (item.price < minP || item.price > maxP) return false;
      
      if (filters.priceType !== 'all' && item.priceType !== filters.priceType) return false;
      if (filters.verifiedOnly && !item.seller.verified) return false;
      
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchSubcat = item.subcategory.toLowerCase().includes(q);
        const matchSeller = item.seller.name.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCategory && !matchSubcat && !matchSeller) return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_low' || filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price_high' || filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'trust' || filters.sortBy === 'trust-score') return Number(b.aiMetrics.trustScore) - Number(a.aiMetrics.trustScore);
      if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [listings, filters]);

  return (
    <MarketplaceContext.Provider value={{
      listings: filteredListings,
      filters,
      setFilters,
      userRole,
      setUserRole,
      wishlistIds,
      toggleWishlist,
      compareIds,
      toggleCompare,
      clearCompare,
      selectedListing,
      setSelectedListing,
      isWorkspaceOpen,
      setIsWorkspaceOpen,
      isVoiceSearchOpen,
      setIsVoiceSearchOpen,
      isImageSearchOpen,
      setIsImageSearchOpen,
      isComparisonModalOpen,
      setIsComparisonModalOpen,
      isNegotiatorModalOpen,
      setIsNegotiatorModalOpen,
      isContractModalOpen,
      setIsContractModalOpen,
      isCreateListingOpen,
      setIsCreateListingOpen,
      isResumeInterviewOpen,
      setIsResumeInterviewOpen,
      negotiationTarget,
      setNegotiationTarget,
      contractTarget,
      setContractTarget,
      openNegotiation,
      openContractGenerator,
      addNewListing,
      notifyMessage,
      toastMessage: notifyMessage,
      notify
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error('useMarketplace must be used within MarketplaceProvider');
  return context;
};
