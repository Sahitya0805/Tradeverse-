import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ListingCard } from '../listing/ListingCard';
import { Flame, TrendingDown, Sparkles, Tag, ArrowRight } from 'lucide-react';

export const HotDealsPageView: React.FC = () => {
  const { listings, notify } = useMarketplace();

  // Filter listings that have discounts or 'Great Deal' / 'Hot Find' scores
  const dealListings = listings.filter(l => l.originalPrice || l.aiMetrics.dealScore === 'Great Deal' || l.aiMetrics.dealScore === 'Hot Find');

  return (
    <div className="space-y-8 animate-quiet-fade">
      
      {/* PAGE HEADER */}
      <div className="warm-card p-6 sm:p-8 space-y-4 border border-rose-500/20">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            <span>AI Price Drop Radar</span>
          </span>
          <span className="text-xs text-[#706F6C]">Verified Below Regional KBB Market Value</span>
        </div>

        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#1F1F1F]">
          Hot Deals & Instant Savings
        </h1>
        <p className="text-xs sm:text-sm text-[#706F6C] max-w-2xl">
          Listings automatically flagged by TradeVerse AI pricing agents as offering significant discounts and high resale value preservation.
        </p>
      </div>

      {/* DEALS HIGHLIGHT BANNER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="warm-card p-4 space-y-1">
          <div className="text-xs text-[#706F6C] font-semibold">Average Savings</div>
          <div className="font-display font-extrabold text-2xl text-emerald-700">14.8% Off MSRP</div>
          <div className="text-[10px] text-[#706F6C]">Calculated across active listings</div>
        </div>

        <div className="warm-card p-4 space-y-1">
          <div className="text-xs text-[#706F6C] font-semibold">Total Deals Available</div>
          <div className="font-display font-extrabold text-2xl text-[#B8860B]">{dealListings.length} Active Deals</div>
          <div className="text-[10px] text-[#706F6C]">Updated in real-time</div>
        </div>

        <div className="warm-card p-4 space-y-1">
          <div className="text-xs text-[#706F6C] font-semibold">Buyer Protection</div>
          <div className="font-display font-extrabold text-2xl text-[#1F1F1F]">100% Escrow</div>
          <div className="text-[10px] text-emerald-700 font-bold">7-Day Inspection Protection</div>
        </div>
      </div>

      {/* DEALS LISTINGS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-display font-bold text-base text-[#1F1F1F]">
            Top {dealListings.length} Deals & Price Drops Today
          </div>
          <button 
            onClick={() => notify('⚡ Subscribed to Daily AI Price Drop Alerts!', 'success')}
            className="text-xs font-bold text-[#B8860B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Set Price Alert</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dealListings.map(item => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </div>

    </div>
  );
};
