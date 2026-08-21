import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Sparkles, ShieldCheck, Lock, Globe, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const { notify } = useMarketplace();

  return (
    <footer className="w-full bg-[#EFECE6] border-t border-[#E6E2D8] mt-12 py-10 text-[#1F1F1F]">
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* VALUE PROPOSITION BADGES STRIP (RESPONSIVE 4-GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-[#E6E2D8] shadow-sm">
          
          <div className="flex items-center gap-3.5 p-2">
            <div className="p-3 rounded-2xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1F1F1F]">Conversational First</div>
              <div className="text-[11px] text-[#706F6C]">Ask & negotiate naturally with AI</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="p-3 rounded-2xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1F1F1F]">AI Fraud Shield</div>
              <div className="text-[11px] text-[#706F6C]">Deepfake & scam protection</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="p-3 rounded-2xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1F1F1F]">Smart Escrow</div>
              <div className="text-[11px] text-[#706F6C]">Automated legal agreements</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="p-3 rounded-2xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9] shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1F1F1F]">Global & Local</div>
              <div className="text-[11px] text-[#706F6C]">Instant multi-lingual translation</div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL LINKS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#706F6C] pt-4 border-t border-[#E6E2D8]">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-[#B8860B] text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[#1F1F1F]">TradeVerse AI</span>
            <span>© 2026 TradeVerse AI Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold">
            <button onClick={() => notify('Privacy Policy opened', 'info')} className="hover:text-[#1F1F1F]">Privacy Policy</button>
            <button onClick={() => notify('Terms of Service opened', 'info')} className="hover:text-[#1F1F1F]">Terms of Service</button>
            <button onClick={() => notify('AI Ethics Guidelines opened', 'info')} className="hover:text-[#1F1F1F]">AI Ethics & Transparency</button>
            <button onClick={() => notify('Security & SOC2 Compliance', 'info')} className="hover:text-[#1F1F1F]">Security & SOC2</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
