import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { Sparkles, Bot, ChevronRight, Layers, FileText, Search } from 'lucide-react';

export const RightAISidebar: React.FC = () => {
  const { 
    setIsWorkspaceOpen, 
    setIsComparisonModalOpen, 
    setIsContractModalOpen 
  } = useMarketplace();

  const { sendMessage } = useAI();

  const handlePromptClick = (promptText: string) => {
    setIsWorkspaceOpen(true);
    if (promptText.includes('Compare')) {
      setIsComparisonModalOpen(true);
    } else if (promptText.includes('contract')) {
      setIsContractModalOpen(true);
    } else {
      sendMessage(promptText);
    }
  };

  return (
    <aside className="w-72 shrink-0 hidden lg:flex flex-col py-6 space-y-6">
      
      {/* GLOWING AI ASSISTANT ORB CARD */}
      <div className="warm-card p-5 space-y-4 text-center border-[#F2E4C9] bg-gradient-to-b from-white to-[#FFF9EE] shadow-sm">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#706F6C]">
          <span className="flex items-center gap-1.5 text-[#B8860B]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            AI ASSISTANT
          </span>
          <span className="text-[10px] text-[#A09E97]">v2.5 Pro</span>
        </div>

        {/* GLOWING ORB */}
        <div 
          onClick={() => setIsWorkspaceOpen(true)}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#D4A373] via-[#C59B27] to-[#B8860B] p-1 shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center group"
        >
          <div className="w-full h-full rounded-full bg-[#FFF9EE] flex flex-col items-center justify-center p-2 text-center border border-[#F2E4C9]">
            <Bot className="w-8 h-8 text-[#B8860B] group-hover:rotate-12 transition-transform" />
            <span className="text-[9px] font-extrabold text-[#966F1E] mt-1">Tap Copilot</span>
          </div>
        </div>

        <p className="text-[11px] text-[#706F6C] leading-snug">
          Ask me to find deals, negotiate prices, compare specs, or draft legal contracts.
        </p>
      </div>

      {/* QUICK COPILOT PROMPTS (STREAMLINED TO 3 ESSENTIALS) */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold text-[#706F6C] uppercase tracking-wider px-1">
          Quick AI Prompts
        </div>

        <div className="space-y-1.5 text-xs font-semibold">
          <button
            onClick={() => handlePromptClick('Find best below-market deals in Austin')}
            className="w-full p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] text-[#1F1F1F] flex items-center justify-between cursor-pointer transition-all hover:bg-[#FFF9EE]"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#B8860B]" />
              <span>Find best deals</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A09E97]" />
          </button>

          <button
            onClick={() => handlePromptClick('Compare products side by side')}
            className="w-full p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] text-[#1F1F1F] flex items-center justify-between cursor-pointer transition-all hover:bg-[#FFF9EE]"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#B8860B]" />
              <span>Compare products</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A09E97]" />
          </button>

          <button
            onClick={() => handlePromptClick('Generate contract for vehicle lease')}
            className="w-full p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] text-[#1F1F1F] flex items-center justify-between cursor-pointer transition-all hover:bg-[#FFF9EE]"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#B8860B]" />
              <span>Generate contract</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A09E97]" />
          </button>
        </div>
      </div>

    </aside>
  );
};
