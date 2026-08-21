import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { AIFraudBadge } from '../ai/AIFraudBadge';
import { 
  X, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Layers, 
  Handshake, 
  FileText, 
  Check, 
  TrendingUp, 
  MessageSquare
} from 'lucide-react';

export const ListingDetailModal: React.FC = () => {
  const { 
    selectedListing, 
    setSelectedListing, 
    wishlistIds, 
    compareIds, 
    toggleWishlist, 
    toggleCompare,
    openNegotiation,
    openContractGenerator,
    notify
  } = useMarketplace();

  const { sendMessage } = useAI();
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!selectedListing) return null;

  const isLiked = wishlistIds.includes(selectedListing.id);
  const isCompared = compareIds.includes(selectedListing.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* HEADER BAR */}
        <div className="p-4 border-b border-[#E8E4DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
              {selectedListing.category} • {selectedListing.subcategory}
            </span>
            <span className="text-xs text-[#706F6C] font-medium">Listed {selectedListing.createdDate}</span>
          </div>

          <button
            onClick={() => setSelectedListing(null)}
            className="p-2 rounded-xl bg-[#F6F4F0] hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 text-xs">
          
          {/* LEFT: GALLERY & SELLER (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#E6E2D8]">
              <img
                src={selectedListing.images[activeImgIndex] || selectedListing.images[0]}
                alt={selectedListing.title}
                className="w-full h-full object-cover"
              />
            </div>

            {selectedListing.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto">
                {selectedListing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImgIndex === idx ? 'border-[#B8860B] scale-105' : 'border-[#E6E2D8] opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="warm-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedListing.seller.avatar}
                    alt={selectedListing.seller.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4A373]"
                  />
                  <div>
                    <div className="flex items-center gap-1 font-bold text-[#1F1F1F] text-xs">
                      <span>{selectedListing.seller.name}</span>
                      {selectedListing.seller.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className="text-[10px] text-[#706F6C]">★ {selectedListing.seller.rating} rating</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => notify(`Chat initialized with ${selectedListing.seller.name}`, 'info')}
                className="w-full py-2 rounded-xl bg-[#1F1F1F] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Contact Seller</span>
              </button>
            </div>

          </div>

          {/* RIGHT: DETAILS, SPECS & AI ACTIONS (7 COLS) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h1 className="font-display font-bold text-xl text-[#1F1F1F]">{selectedListing.title}</h1>
                
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleCompare(selectedListing.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isCompared ? 'bg-[#B8860B] text-white border-[#B8860B]' : 'bg-white text-[#706F6C] border-[#E6E2D8]'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedListing.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isLiked ? 'bg-rose-600 text-white border-rose-500' : 'bg-white text-[#706F6C] border-[#E6E2D8]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#706F6C] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{selectedListing.location}</span>
              </div>
            </div>

            {/* PRICE */}
            <div className="warm-card p-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#706F6C] font-bold uppercase">Listing Price</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-2xl text-[#1F1F1F]">
                    ${selectedListing.price.toLocaleString()}
                  </span>
                  {selectedListing.originalPrice && (
                    <span className="text-xs text-[#706F6C] line-through">
                      ${selectedListing.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
                {selectedListing.priceType}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1">
              <div className="font-bold text-[#1F1F1F] text-xs">Overview</div>
              <p className="text-[#706F6C] leading-relaxed text-xs">{selectedListing.description}</p>
            </div>

            {/* SPECS */}
            <div className="space-y-2">
              <div className="font-bold text-[#1F1F1F] text-xs">Specifications</div>
              <div className="grid grid-cols-2 gap-2">
                {selectedListing.specs.map((sp, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#E6E2D8] flex justify-between">
                    <span className="text-[#706F6C]">{sp.label}:</span>
                    <span className="font-semibold text-[#1F1F1F]">{sp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => openNegotiation(selectedListing)}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#B8860B]/20"
              >
                <Handshake className="w-4 h-4" />
                <span>AI Negotiate Offer</span>
              </button>

              <button
                onClick={() => openContractGenerator(selectedListing)}
                className="py-3 px-4 rounded-2xl bg-white hover:bg-[#F6F4F0] text-[#1F1F1F] font-bold text-xs border border-[#E6E2D8] flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#B8860B]" />
                <span>Draft Smart Contract</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
