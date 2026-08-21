import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Home, Search, Sparkles, Heart, User } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenCommandPalette: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenCommandPalette }) => {
  const { isWorkspaceOpen, setIsWorkspaceOpen, wishlistIds, setFilters, notify } = useMarketplace();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#E6E2D8] px-4 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }))}
        className="flex flex-col items-center gap-1 text-[10px] font-bold text-[#1F1F1F] cursor-pointer"
      >
        <Home className="w-5 h-5 text-[#B8860B]" />
        <span>Home</span>
      </button>

      <button
        onClick={onOpenCommandPalette}
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-[#706F6C] hover:text-[#1F1F1F] cursor-pointer"
      >
        <Search className="w-5 h-5 text-[#A09E97]" />
        <span>Search</span>
      </button>

      <button
        onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
        className="flex flex-col items-center gap-1 text-[10px] font-bold text-[#966F1E] cursor-pointer relative"
      >
        <div className="p-1.5 rounded-xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] -mt-4 shadow-md">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <span>AI Copilot</span>
      </button>

      <button
        onClick={() => notify(`Wishlist contains ${wishlistIds.length} items`, 'info')}
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-[#706F6C] hover:text-[#1F1F1F] cursor-pointer relative"
      >
        <Heart className="w-5 h-5 text-[#A09E97]" />
        {wishlistIds.length > 0 && (
          <span className="absolute top-0 right-3 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
            {wishlistIds.length}
          </span>
        )}
        <span>Wishlist</span>
      </button>

      <button
        onClick={() => notify('Sahitya Singh — Account Settings', 'info')}
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-[#706F6C] hover:text-[#1F1F1F] cursor-pointer"
      >
        <User className="w-5 h-5 text-[#A09E97]" />
        <span>Profile</span>
      </button>
    </div>
  );
};
