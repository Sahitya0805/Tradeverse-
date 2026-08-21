import React from 'react';
import { Listing } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { 
  Heart, 
  Layers, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  TrendingDown, 
  Eye
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { 
    wishlistIds, 
    compareIds, 
    toggleWishlist, 
    toggleCompare, 
    setSelectedListing
  } = useMarketplace();

  const { sendMessage } = useAI();

  const isLiked = wishlistIds.includes(listing.id);
  const isCompared = compareIds.includes(listing.id);

  return (
    <div className="warm-card warm-card-hover overflow-hidden flex flex-col group relative border border-[#E6E2D8]">
      
      {/* THUMBNAIL CONTAINER */}
      <div 
        onClick={() => setSelectedListing(listing)}
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#F6F4F0] cursor-pointer"
      >
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* AI Deal Score Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
          <span className="px-2.5 py-1 rounded-full bg-white/90 border border-[#E6E2D8] backdrop-blur-md text-[10px] font-bold text-emerald-700 flex items-center gap-1 shadow-sm">
            <TrendingDown className="w-3 h-3 text-emerald-600" />
            <span>{listing.aiMetrics.dealScore}</span>
          </span>
        </div>

        {/* Quick Actions (Wishlist & Compare) */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); toggleCompare(listing.id); }}
            className={`p-1.5 rounded-xl backdrop-blur-md transition-all shadow-sm ${
              isCompared 
                ? 'bg-[#B8860B] text-white border border-[#B8860B]' 
                : 'bg-white/90 text-[#706F6C] hover:text-[#1F1F1F] border border-[#E6E2D8]'
            }`}
            title="Compare Listing"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(listing.id); }}
            className={`p-1.5 rounded-xl backdrop-blur-md transition-all shadow-sm ${
              isLiked 
                ? 'bg-rose-600 text-white border border-rose-500' 
                : 'bg-white/90 text-[#706F6C] hover:text-rose-500 border border-[#E6E2D8]'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location & Trust Badge */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-medium">
            <MapPin className="w-3 h-3 text-[#D4A373]" />
            <span className="truncate max-w-[120px]">{listing.location}</span>
          </div>

          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span>{listing.aiMetrics.trustScore}% Score</span>
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">
              {listing.subcategory}
            </span>
            <span className="text-[10px] text-[#706F6C] font-medium">
              {listing.createdDate}
            </span>
          </div>

          <h3 
            onClick={() => setSelectedListing(listing)}
            className="font-display font-bold text-sm text-[#1F1F1F] hover:text-[#B8860B] transition-colors line-clamp-1 cursor-pointer"
          >
            {listing.title}
          </h3>
        </div>

        {/* PRICE & FOOTER BUTTON */}
        <div className="pt-2 border-t border-[#F6F4F0] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-base text-[#1F1F1F]">
                ${listing.price.toLocaleString()}
              </span>
              {listing.originalPrice && (
                <span className="text-[10px] text-[#706F6C] line-through">
                  ${listing.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => sendMessage(`Tell me about "${listing.title}"`)}
              className="p-1.5 rounded-xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9] text-xs font-semibold hover:bg-[#FFF2D7] transition-colors"
              title="Ask AI"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setSelectedListing(listing)}
              className="px-2.5 py-1.5 rounded-xl bg-[#1F1F1F] hover:bg-black text-white text-xs font-bold transition-all"
            >
              View
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
