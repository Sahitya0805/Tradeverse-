import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { 
  TrendingDown, 
  TrendingUp, 
  Sparkles, 
  Heart, 
  ChevronRight, 
  MessageSquareText, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export const MarketPulseSection: React.FC = () => {
  const { listings, setSelectedListing, toggleWishlist, wishlistIds, setIsWorkspaceOpen } = useMarketplace();
  const { sendMessage } = useAI();

  const recommendedItems = listings.slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
      
      {/* COLUMN 1: MARKET PULSE (4 COLS) */}
      <div className="lg:col-span-4 warm-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-[#1F1F1F]">Market Pulse</h3>
          <button className="text-xs text-[#706F6C] hover:text-[#1F1F1F] font-semibold flex items-center gap-1 bg-[#F6F4F0] px-2.5 py-1 rounded-xl border border-[#E6E2D8]">
            <span>Today</span>
            <ChevronDown className="w-3 h-3 text-[#A09E97]" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600">
                <TrendingDown className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#1F1F1F]">Car prices</div>
                <div className="text-[10px] text-[#706F6C]">decreased by 8%</div>
              </div>
            </div>
            {/* SVG RED SPARKLINE */}
            <svg className="w-16 h-6" viewBox="0 0 60 20">
              <path d="M 0 5 Q 15 15, 30 8 T 60 18" fill="none" stroke="#EF4444" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#1F1F1F]">Rental demand</div>
                <div className="text-[10px] text-[#706F6C]">increased by 14%</div>
              </div>
            </div>
            {/* SVG GREEN SPARKLINE */}
            <svg className="w-16 h-6" viewBox="0 0 60 20">
              <path d="M 0 18 Q 15 5, 30 12 T 60 2" fill="none" stroke="#10B981" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#1F1F1F]">Electronics trend</div>
                <div className="text-[10px] text-[#706F6C]">high search volume</div>
              </div>
            </div>
            {/* SVG BLUE SPARKLINE */}
            <svg className="w-16 h-6" viewBox="0 0 60 20">
              <path d="M 0 15 Q 15 2, 30 18 T 60 5" fill="none" stroke="#3B82F6" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#1F1F1F]">Job openings</div>
                <div className="text-[10px] text-[#706F6C]">grew by 22%</div>
              </div>
            </div>
            {/* SVG AMBER SPARKLINE */}
            <svg className="w-16 h-6" viewBox="0 0 60 20">
              <path d="M 0 16 Q 15 10, 30 14 T 60 3" fill="none" stroke="#F59E0B" strokeWidth="2" />
            </svg>
          </div>

        </div>
      </div>

      {/* COLUMN 2: AI RECOMMENDS FOR YOU (4 COLS) */}
      <div className="lg:col-span-4 warm-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-[#1F1F1F]">AI Recommends For You</h3>
          <button className="text-xs text-[#706F6C] font-semibold flex items-center gap-1 bg-[#F6F4F0] px-2.5 py-1 rounded-xl border border-[#E6E2D8]">
            <span>Personalized</span>
            <ChevronDown className="w-3 h-3 text-[#A09E97]" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {recommendedItems.map(item => {
            const isLiked = wishlistIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedListing(item)}
                className="warm-card p-2 cursor-pointer border border-[#E6E2D8] hover:border-[#D4A373] space-y-2 relative group"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F6F4F0]">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
                    className="absolute top-1 right-1 p-1 rounded-full bg-white/80 text-[#706F6C] hover:text-rose-500"
                  >
                    <Heart className={`w-3 h-3 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                  </button>
                </div>

                <div>
                  <div className="font-bold text-xs text-[#1F1F1F] truncate">{item.title}</div>
                  <div className="text-emerald-600 font-extrabold text-xs">${item.price.toLocaleString()}</div>
                  <div className="text-[9px] text-[#706F6C] truncate">{item.location}</div>
                </div>

                <div className="flex items-center justify-between text-[9px] pt-1 border-t border-[#F6F4F0]">
                  <span className="text-[#706F6C]">AI Score</span>
                  <span className="font-bold text-[#B8860B]">{item.aiMetrics.trustScore}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COLUMN 3: CONTINUE CONVERSATIONS (4 COLS) */}
      <div className="lg:col-span-4 warm-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-[#1F1F1F]">Continue Conversations</h3>
          <button onClick={() => setIsWorkspaceOpen(true)} className="text-xs font-bold text-[#B8860B] hover:underline flex items-center gap-1">
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          
          <div 
            onClick={() => {
              sendMessage('Find family SUV under $40k');
              setIsWorkspaceOpen(true);
            }}
            className="p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8] hover:border-[#D4A373] flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquareText className="w-4 h-4 text-[#B8860B]" />
              <div>
                <div className="font-bold text-[#1F1F1F]">Find family SUV under $40k</div>
                <div className="text-[10px] text-[#706F6C]">2 mins ago</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A09E97]" />
          </div>

          <div 
            onClick={() => {
              sendMessage('Compare iPhone 16 vs Pixel 9');
              setIsWorkspaceOpen(true);
            }}
            className="p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8] hover:border-[#D4A373] flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquareText className="w-4 h-4 text-[#B8860B]" />
              <div>
                <div className="font-bold text-[#1F1F1F]">Compare iPhone 16 vs Pixel 9</div>
                <div className="text-[10px] text-[#706F6C]">1 hour ago</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A09E97]" />
          </div>

          <div 
            onClick={() => {
              sendMessage('Best remote jobs for React dev');
              setIsWorkspaceOpen(true);
            }}
            className="p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8] hover:border-[#D4A373] flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquareText className="w-4 h-4 text-[#B8860B]" />
              <div>
                <div className="font-bold text-[#1F1F1F]">Best remote jobs for React dev</div>
                <div className="text-[10px] text-[#706F6C]">3 hours ago</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A09E97]" />
          </div>

          <div 
            onClick={() => {
              sendMessage('2-bed condo in West Bay');
              setIsWorkspaceOpen(true);
            }}
            className="p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8] hover:border-[#D4A373] flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquareText className="w-4 h-4 text-[#B8860B]" />
              <div>
                <div className="font-bold text-[#1F1F1F]">2-bed condo in West Bay</div>
                <div className="text-[10px] text-[#706F6C]">Yesterday</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A09E97]" />
          </div>

        </div>
      </div>

    </div>
  );
};
