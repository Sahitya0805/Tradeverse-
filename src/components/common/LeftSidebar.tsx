import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { 
  Home, 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  Package, 
  Settings, 
  ChevronDown,
  X
} from 'lucide-react';

interface LeftSidebarProps {
  onNavigateToAuth?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ onNavigateToAuth }) => {
  const { 
    setFilters, 
    setUserRole, 
    setIsWorkspaceOpen, 
    notify, 
    wishlistIds 
  } = useMarketplace();

  const { sendMessage } = useAI();
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleMenuClick = (itemId: string, itemLabel: string) => {
    setActiveMenu(itemId);

    switch (itemId) {
      case 'home':
        setUserRole('buyer');
        setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        notify('Switched to Home Dashboard', 'info');
        break;

      case 'marketplace':
        setUserRole('buyer');
        setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
        const el = document.getElementById('explore-categories');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        notify('Opened Marketplace Categories', 'info');
        break;

      case 'ai-assistant':
        setIsWorkspaceOpen(true);
        sendMessage('Hello AI Copilot! Show me top market opportunities today.');
        break;

      case 'watchlist':
        setUserRole('buyer');
        const wishlistEl = document.getElementById('buyer-wishlist-section');
        if (wishlistEl) wishlistEl.scrollIntoView({ behavior: 'smooth' });
        notify(`Showing ${wishlistIds.length} Saved Wishlist items`, 'info');
        break;

      case 'my-listings':
        setUserRole('seller');
        notify('Switched to Seller Inventory Management', 'success');
        break;

      case 'settings':
        setIsSettingsOpen(true);
        break;

      default:
        notify(`Opened ${itemLabel}`, 'info');
    }
  };

  // STREAMLINED TO 6 ESSENTIAL ITEMS
  const ESSENTIAL_MENU_ITEMS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles },
    { id: 'watchlist', label: 'Watchlist', icon: Heart, badge: wishlistIds.length > 0 ? String(wishlistIds.length) : undefined },
    { id: 'my-listings', label: 'My Listings', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-56 shrink-0 hidden xl:flex flex-col justify-between py-6 pr-4 space-y-6">
      
      {/* ESSENTIAL MENU LIST */}
      <div className="space-y-1.5 text-xs font-semibold text-[#706F6C]">
        {ESSENTIAL_MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id, item.label)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] font-extrabold shadow-xs'
                  : 'hover:bg-white/80 hover:text-[#1F1F1F]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8860B]' : 'text-[#A09E97]'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-[#B8860B] text-white text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* CLEAN PROFILE FOOTER */}
      <div className="pt-4 border-t border-[#E8E4DC]">
        <div 
          onClick={() => {
            if (onNavigateToAuth) onNavigateToAuth();
            else notify('Opened Account Profile Settings', 'info');
          }}
          className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-[#E6E2D8] shadow-sm cursor-pointer hover:border-[#D4A373] transition-all"
        >
          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Sahitya"
              className="w-8 h-8 rounded-full object-cover border border-[#D4A373]"
            />
            <div>
              <div className="font-extrabold text-xs text-[#1F1F1F]">Sahitya</div>
              <div className="text-[10px] text-[#706F6C]">View account</div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#A09E97]" />
        </div>
      </div>

      {/* SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <button onClick={() => setIsSettingsOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl bg-white text-[#706F6C]">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 font-bold text-sm text-[#1F1F1F]">
              <Settings className="w-4 h-4 text-[#B8860B]" />
              <span>Account & AI Copilot Settings</span>
            </div>
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E6E2D8]">
              <div className="flex justify-between items-center">
                <span>Auto AI Price Alerts</span>
                <span className="text-emerald-700 font-bold">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Escrow Smart Contracts</span>
                <span className="text-emerald-700 font-bold">Verified SOC2</span>
              </div>
            </div>
            <button 
              onClick={() => { notify('Settings saved cleanly', 'success'); setIsSettingsOpen(false); }} 
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

    </aside>
  );
};
