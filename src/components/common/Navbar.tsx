import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Compass, 
  Search, 
  Mic, 
  Camera, 
  Command, 
  Bell, 
  Plus, 
  ChevronDown,
  Sparkles,
  Flame
} from 'lucide-react';
import { MainCategory } from '../../types';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  activePage: 'marketplace' | 'categories' | 'deals' | 'how-it-works' | 'auth';
  setActivePage: (page: 'marketplace' | 'categories' | 'deals' | 'how-it-works' | 'auth') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, activePage, setActivePage }) => {
  const { 
    filters, 
    setFilters, 
    setIsCreateListingOpen, 
    setIsVoiceSearchOpen, 
    setIsImageSearchOpen, 
    setSelectedListing,
    listings,
    setIsContractModalOpen,
    notify 
  } = useMarketplace();

  const [showNotifications, setShowNotifications] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(3);

  const handleSelectCategory = (catId: MainCategory) => {
    setFilters(prev => ({ ...prev, category: catId }));
    setActivePage('categories');
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F4F0]/95 backdrop-blur-xl border-b border-[#E6E2D8] text-[#1F1F1F]">
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 relative">
        
        {/* LEFT: BRAND LOGO */}
        <div 
          onClick={() => {
            setActivePage('marketplace');
            setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4A373] via-[#C59B27] to-[#B8860B] p-[1px] shadow-sm">
            <div className="w-full h-full rounded-[15px] bg-[#F6F4F0] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#B8860B] animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="font-display font-extrabold text-xl text-[#1F1F1F] tracking-tight leading-none">
              TradeVerse AI
            </div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#B8860B] mt-0.5">
              AI-Native Marketplace
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS WITH STANDARDIZED WARM LUXURY STYLING */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#706F6C] relative">
          
          <button 
            onClick={() => {
              setActivePage('marketplace');
              setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
            }}
            className={`cursor-pointer py-1.5 transition-all ${
              activePage === 'marketplace' ? 'text-[#1F1F1F] font-extrabold border-b-2 border-[#B8860B]' : 'hover:text-[#1F1F1F]'
            }`}
          >
            Marketplace
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
              className={`flex items-center gap-1 cursor-pointer py-1.5 transition-all ${
                activePage === 'categories' ? 'text-[#1F1F1F] font-extrabold border-b-2 border-[#B8860B]' : 'hover:text-[#1F1F1F]'
              }`}
            >
              <span>Categories</span> <ChevronDown className="w-3.5 h-3.5 text-[#B8860B]" />
            </button>

            {activeDropdown === 'categories' && (
              <div className="absolute top-9 left-0 w-60 bg-white border border-[#E6E2D8] rounded-2xl shadow-xl p-2 space-y-1 text-xs z-50 animate-quiet-fade text-[#1F1F1F]">
                <div onClick={() => handleSelectCategory('vehicles')} className="p-2.5 rounded-xl cursor-pointer flex items-center justify-between font-bold text-[#1F1F1F] hover:bg-[#FFF9EE] hover:text-[#B8860B]">
                  <span>🚗 Vehicles</span> <span className="text-[10px] text-[#706F6C]">14.2K</span>
                </div>
                <div onClick={() => handleSelectCategory('real-estate')} className="p-2.5 rounded-xl cursor-pointer flex items-center justify-between font-bold text-[#1F1F1F] hover:bg-[#FFF9EE] hover:text-[#B8860B]">
                  <span>🏠 Real Estate</span> <span className="text-[10px] text-[#706F6C]">8.9K</span>
                </div>
                <div onClick={() => handleSelectCategory('jobs')} className="p-2.5 rounded-xl cursor-pointer flex items-center justify-between font-bold text-[#1F1F1F] hover:bg-[#FFF9EE] hover:text-[#B8860B]">
                  <span>💼 Jobs & Careers</span> <span className="text-[10px] text-[#706F6C]">5.6K</span>
                </div>
                <div onClick={() => handleSelectCategory('electronics')} className="p-2.5 rounded-xl cursor-pointer flex items-center justify-between font-bold text-[#1F1F1F] hover:bg-[#FFF9EE] hover:text-[#B8860B]">
                  <span>📱 Electronics</span> <span className="text-[10px] text-[#706F6C]">22.1K</span>
                </div>
                <div onClick={() => handleSelectCategory('services')} className="p-2.5 rounded-xl cursor-pointer flex items-center justify-between font-bold text-[#1F1F1F] hover:bg-[#FFF9EE] hover:text-[#B8860B]">
                  <span>🛠️ Services</span> <span className="text-[10px] text-[#706F6C]">4.3K</span>
                </div>
              </div>
            )}
          </div>

          {/* Hot Deals Page */}
          <button 
            onClick={() => setActivePage('deals')}
            className={`flex items-center gap-1.5 cursor-pointer py-1.5 transition-all ${
              activePage === 'deals' ? 'text-[#1F1F1F] font-extrabold border-b-2 border-[#B8860B]' : 'hover:text-[#1F1F1F]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Hot Deals</span>
          </button>

          {/* How AI Works Page */}
          <button 
            onClick={() => setActivePage('how-it-works')}
            className={`flex items-center gap-1.5 cursor-pointer py-1.5 transition-all ${
              activePage === 'how-it-works' ? 'text-[#1F1F1F] font-extrabold border-b-2 border-[#B8860B]' : 'hover:text-[#1F1F1F]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>How AI Works</span>
          </button>

        </nav>

        {/* CENTER FLOATING SEARCH INPUT */}
        <div className="flex-1 max-w-md hidden md:block">
          <div 
            onClick={onOpenCommandPalette}
            className="flex items-center justify-between px-4 py-2.5 rounded-2xl border border-[#E6E2D8] bg-white text-[#706F6C] hover:border-[#D4A373] shadow-sm cursor-pointer transition-all text-xs"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="w-4 h-4 text-[#A09E97]" />
              <span className="truncate">{filters.searchQuery || "Ask anything... Find cars, homes, jobs, services..."}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Mic onClick={(e) => { e.stopPropagation(); setIsVoiceSearchOpen(true); }} className="w-3.5 h-3.5 text-[#A09E97] hover:text-[#B8860B]" />
              <Camera onClick={(e) => { e.stopPropagation(); setIsImageSearchOpen(true); }} className="w-3.5 h-3.5 text-[#A09E97] hover:text-[#B8860B]" />
              <kbd className="flex items-center gap-0.5 px-2 py-0.5 rounded-md border border-[#E6E2D8] bg-[#F6F4F0] text-[10px] font-mono text-[#706F6C]">
                <Command className="w-3 h-3" /> K
              </kbd>
            </div>
          </div>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-3 shrink-0 relative">
          
          {/* BELL NOTIFICATIONS ICON WITH POPOVER */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-2xl border border-[#E6E2D8] bg-white text-[#706F6C] hover:text-[#1F1F1F] hover:border-[#D4A373] shadow-sm cursor-pointer transition-transform hover:scale-105"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B8860B] text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* NOTIFICATIONS POPOVER */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 border border-[#E6E2D8] bg-white text-[#1F1F1F] rounded-2xl shadow-2xl p-3 space-y-2 text-xs z-50 animate-quiet-fade">
                <div className="font-bold border-b pb-2 flex items-center justify-between border-[#E6E2D8]">
                  <span className="flex items-center gap-1.5 font-display font-extrabold text-sm">
                    <Bell className="w-4 h-4 text-[#B8860B]" /> Notifications
                  </span>
                  <button 
                    onClick={() => { setUnreadCount(0); notify('Marked all notifications as read', 'info'); }}
                    className="text-[10px] text-[#B8860B] hover:underline font-semibold"
                  >
                    Clear all ({unreadCount})
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <div 
                    onClick={() => {
                      const tesla = listings.find(l => l.id === 'veh-1');
                      if (tesla) setSelectedListing(tesla);
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-xl border border-[#F2E4C9] bg-[#FFF9EE] hover:border-[#D4A373] cursor-pointer transition-all"
                  >
                    <div className="font-bold text-[#B8860B] text-[11px] flex justify-between">
                      <span>🚗 Price Drop Alert</span>
                      <span className="text-[9px] text-[#706F6C]">2m ago</span>
                    </div>
                    <p className="text-[11px] mt-0.5 leading-snug">Tesla Model Y Performance dropped 5% in Austin ($39,500)!</p>
                  </div>

                  <div 
                    onClick={() => {
                      const villa = listings.find(l => l.id === 're-1');
                      if (villa) setSelectedListing(villa);
                      setIsContractModalOpen(true);
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-xl border border-[#E6E2D8] bg-[#F6F4F0] hover:border-[#D4A373] cursor-pointer transition-all"
                  >
                    <div className="font-bold text-emerald-600 text-[11px] flex justify-between">
                      <span>📜 Smart Contract Signed</span>
                      <span className="text-[9px] text-[#706F6C]">1h ago</span>
                    </div>
                    <p className="text-[11px] mt-0.5 leading-snug">Lease Agreement #TV-9918 executed by seller.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* USER PROFILE AVATAR — DIRECTLY NAVIGATES TO AUTH PAGE */}
          <div 
            onClick={() => {
              setActivePage('auth');
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 cursor-pointer p-0.5 rounded-full border-2 border-[#D4A373] hover:scale-110 transition-transform shadow-sm"
            title="Open Sign In & Account Center"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Sahitya"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>

          {/* GOLD GRADIENT POST LISTING BUTTON */}
          <button
            onClick={() => setIsCreateListingOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] hover:opacity-90 text-white font-bold text-xs shadow-md shadow-[#B8860B]/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post Listing</span>
          </button>

        </div>

      </div>
    </header>
  );
};
