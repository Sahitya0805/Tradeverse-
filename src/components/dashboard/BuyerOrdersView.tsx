import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Heart, PackageCheck, ArrowRight, ShieldCheck } from 'lucide-react';

export const BuyerOrdersView: React.FC = () => {
  const { listings, wishlistIds, setSelectedListing, notify } = useMarketplace();

  const wishlistItems = listings.filter(l => wishlistIds.includes(l.id));

  return (
    <div id="buyer-wishlist-section" className="space-y-6 pt-4 animate-quiet-fade scroll-mt-24">
      
      {/* SAVED WISHLIST SECTION */}
      <div className="warm-card p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h2 className="font-display font-extrabold text-base sm:text-lg text-[#1F1F1F]">
              Saved Wishlist ({wishlistItems.length} items)
            </h2>
          </div>

          <button 
            onClick={() => notify(`Wishlist management view opened`, 'info')}
            className="text-xs font-bold text-[#B8860B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Manage all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="p-8 text-center text-[#706F6C] text-xs bg-[#F6F4F0] rounded-2xl border border-[#E6E2D8]">
            Your wishlist is empty. Tap the heart icon on any listing to save it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedListing(item)}
                className="p-3 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] hover:border-[#D4A373] flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#1F1F1F] truncate">{item.title}</div>
                    <div className="text-emerald-700 font-extrabold text-xs mt-0.5">${item.price.toLocaleString()}</div>
                    <div className="text-[10px] text-[#706F6C] truncate">{item.location}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B8860B] shrink-0 ml-2" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT ESCROW PURCHASES & ORDERS SECTION */}
      <div className="warm-card p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#B8860B]" />
            <h2 className="font-display font-extrabold text-base sm:text-lg text-[#1F1F1F]">
              Recent Escrow Purchases & Orders
            </h2>
          </div>

          <span className="text-xs text-[#706F6C] font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Escrow</span>
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 shrink-0">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#1F1F1F]">Apple MacBook Pro 16" M3 Max</div>
                <div className="text-[11px] text-[#706F6C] font-medium">Order #ORD-88192 • Delivered via FedEx Express</div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E6E2D8]">
              <div className="font-display font-extrabold text-base text-[#1F1F1F]">$2,950.00</div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-[10px] border border-emerald-500/20">
                Escrow Released
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
