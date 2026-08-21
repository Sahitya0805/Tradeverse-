import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { 
  Sparkles, 
  Search, 
  Mic, 
  Camera, 
  Send, 
  Award
} from 'lucide-react';

export const WarmHeroWorkspace: React.FC = () => {
  const { 
    currentUser,
    setFilters, 
    setIsVoiceSearchOpen, 
    setIsImageSearchOpen
  } = useMarketplace();

  const { sendMessage } = useAI();
  const [queryInput, setQueryInput] = useState('');

  // Extract first name for a friendly greeting
  const firstName = currentUser.name.trim().split(' ')[0] || 'Sahitya';

  const PROMPT_CHIPS = [
    '🚗 Family SUV under $40k',
    '🏠 2BHK San Diego apartment',
    '💼 Staff AI Engineer remote',
    '📱 MacBook Air M3 deal'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    setFilters(prev => ({ ...prev, searchQuery: queryInput }));
    sendMessage(queryInput);
    setQueryInput('');
  };

  const handleChipClick = (chipText: string) => {
    const cleanText = chipText.replace(/^[^\w]+/, '').trim();
    setFilters(prev => ({ ...prev, searchQuery: cleanText }));
    sendMessage(cleanText);
  };

  return (
    <div className="space-y-6 animate-quiet-fade pt-2">
      
      {/* MINIMAL SLEEK HERO WORKSPACE — FULLY RESPONSIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT HERO TEXT & METRICS (7 COLUMNS) */}
        <div className="lg:col-span-7 warm-card p-5 sm:p-8 flex flex-col justify-between space-y-6 bg-white border-[#E6E2D8] shadow-sm">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>AI-Native Commerce Protocol</span>
            </div>

            <h1 className="font-serif-hero text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1F1F] tracking-tight leading-tight">
              Good morning, <span className="gold-gradient-text">{firstName} 👋</span>
              <br />
              Commerce is now conversational.
            </h1>

            <p className="text-xs sm:text-sm text-[#706F6C] leading-relaxed max-w-xl">
              Ask TradeVerse AI to search 100,000+ vector listings, compute KBB price comps, negotiate counter-offers, and draft binding smart contracts.
            </p>
          </div>

          {/* 3 CLEAN METRIC BADGES — RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            
            <div className="p-3 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] space-y-1">
              <div className="text-[10px] text-[#706F6C] font-semibold">Active Buyers</div>
              <div className="font-display font-extrabold text-base text-[#1F1F1F]">10K+ Users</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] space-y-1">
              <div className="text-[10px] text-[#706F6C] font-semibold">AI Fit Accuracy</div>
              <div className="font-display font-extrabold text-base text-emerald-700">98% Fit</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] space-y-1">
              <div className="text-[10px] text-[#706F6C] font-semibold">Smart Escrow</div>
              <div className="font-display font-extrabold text-base text-[#B8860B]">24/7 Verified</div>
            </div>

          </div>

        </div>

        {/* RIGHT AI COPILOT WORKSPACE (5 COLUMNS) */}
        <div className="lg:col-span-5 warm-card p-5 sm:p-6 flex flex-col justify-between space-y-5 bg-gradient-to-br from-white to-[#FFF9EE] border-[#F2E4C9] shadow-sm relative">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B8860B]" />
                <span className="font-display font-extrabold text-sm text-[#1F1F1F]">
                  What can I help you find?
                </span>
              </div>
              <span className="text-[10px] text-[#B8860B] font-bold bg-white px-2 py-0.5 rounded-full border border-[#F2E4C9]">
                Live Agent
              </span>
            </div>

            {/* AI QUERY FORM */}
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="relative">
                <textarea
                  rows={3}
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Ask anything... e.g. 'Find a 2024 SUV under $40k with low mileage in Austin'"
                  className="w-full p-3.5 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] text-xs text-[#1F1F1F] placeholder-[#A09E97] focus:outline-none focus:border-[#D4A373] resize-none font-medium"
                />

                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <Mic onClick={() => setIsVoiceSearchOpen(true)} className="w-4 h-4 text-[#A09E97] hover:text-[#B8860B] cursor-pointer" />
                  <Camera onClick={() => setIsImageSearchOpen(true)} className="w-4 h-4 text-[#A09E97] hover:text-[#B8860B] cursor-pointer" />
                  
                  <button
                    type="submit"
                    disabled={!queryInput.trim()}
                    className="p-2 rounded-xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold disabled:opacity-40 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* SUGGESTED PROMPT CHIPS */}
          <div className="space-y-2 pt-2 border-t border-[#F2E4C9]">
            <div className="text-[10px] font-bold text-[#706F6C] uppercase">Try Suggested AI Searches:</div>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {PROMPT_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleChipClick(chip)}
                  className="px-2.5 py-1 rounded-xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] hover:bg-[#FFF9EE] text-[#1F1F1F] font-medium cursor-pointer transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
