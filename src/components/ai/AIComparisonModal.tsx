import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Layers, X, Sparkles, Trophy, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AIComparisonModal: React.FC = () => {
  const { 
    isComparisonModalOpen, 
    setIsComparisonModalOpen, 
    compareIds, 
    clearCompare,
    listings,
    openNegotiation,
    openContractGenerator
  } = useMarketplace();

  if (!isComparisonModalOpen) return null;

  const compareItems = listings.filter(l => compareIds.includes(l.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl p-6 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-[#1F1F1F]">AI Side-by-Side Comparison Matrix</h2>
              <p className="text-xs text-[#706F6C]">Comparing {compareItems.length} selected marketplace listings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="px-3 py-1.5 rounded-xl bg-white text-[#706F6C] hover:text-[#1F1F1F] border border-[#E6E2D8] text-xs font-semibold shadow-sm"
            >
              Clear Matrix
            </button>
            
            <button
              onClick={() => setIsComparisonModalOpen(false)}
              className="p-2 rounded-xl bg-white hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {compareItems.length === 0 ? (
          <div className="p-12 text-center text-[#706F6C] text-xs">
            No items selected for comparison yet. Click the layer icon on any listing card to add it to this matrix.
          </div>
        ) : (
          <div className="space-y-6">

            {/* AI WINNER RECOMMENDATION BANNER */}
            <div className="p-4 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] flex items-start gap-3 shadow-sm">
              <Trophy className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-[#1F1F1F] text-sm">
                  AI Recommendation Winner: <span className="text-[#B8860B] font-extrabold">{compareItems[0]?.title}</span>
                </div>
                <p className="text-[#706F6C]">
                  Offers superior resale equity preservation, lower market price index, and higher seller trust rating ({compareItems[0]?.aiMetrics.trustScore}%).
                </p>
              </div>
            </div>

            {/* COMPARISON GRID */}
            <div className={`grid grid-cols-1 md:grid-cols-${compareItems.length} gap-4`}>
              {compareItems.map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-white border border-[#E6E2D8] space-y-4 flex flex-col justify-between shadow-sm">
                  
                  <div className="space-y-3">
                    <img src={item.images[0]} alt={item.title} className="aspect-[16/10] w-full rounded-xl object-cover" />
                    
                    <div>
                      <div className="text-[10px] text-[#B8860B] font-bold uppercase">{item.subcategory}</div>
                      <h3 className="font-display font-bold text-sm text-[#1F1F1F] line-clamp-1">{item.title}</h3>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8] flex items-center justify-between">
                      <span className="font-display font-extrabold text-base text-[#1F1F1F]">${item.price.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        {item.aiMetrics.dealScore}
                      </span>
                    </div>

                    {/* SPECS LIST */}
                    <div className="space-y-1.5 text-xs">
                      <div className="text-[#706F6C] font-bold text-[10px] uppercase">Specifications</div>
                      {item.specs.map((sp, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-[#F6F4F0] text-[11px]">
                          <span className="text-[#706F6C]">{sp.label}</span>
                          <span className="text-[#1F1F1F] font-semibold">{sp.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* PROS & CONS */}
                    <div className="space-y-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 space-y-1">
                        <div className="font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Pros</div>
                        {item.aiMetrics.pros.map((p, i) => <div key={i}>• {p}</div>)}
                      </div>

                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 space-y-1">
                        <div className="font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Cons</div>
                        {item.aiMetrics.cons.map((c, i) => <div key={i}>• {c}</div>)}
                      </div>
                    </div>

                  </div>

                  {/* BOTTOM ACTIONS */}
                  <div className="pt-3 border-t border-[#E6E2D8] space-y-2">
                    <button
                      onClick={() => {
                        setIsComparisonModalOpen(false);
                        openNegotiation(item);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs shadow-sm"
                    >
                      Make Offer
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsComparisonModalOpen(false);
                        openContractGenerator(item);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#F6F4F0] border border-[#E6E2D8] text-[#1F1F1F] font-bold text-xs shadow-sm"
                    >
                      Draft Contract
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
