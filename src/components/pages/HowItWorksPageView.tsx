import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { Sparkles, Bot, Search, Handshake, FileText, ShieldCheck, ArrowRight } from 'lucide-react';

export const HowItWorksPageView: React.FC = () => {
  const { setIsWorkspaceOpen, setIsComparisonModalOpen, setIsContractModalOpen } = useMarketplace();
  const { sendMessage } = useAI();

  return (
    <div className="space-y-8 animate-quiet-fade">
      
      {/* HEADER */}
      <div className="warm-card p-6 sm:p-10 text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Multi-Agent AI Architecture</span>
        </div>

        <h1 className="font-serif-hero text-3xl sm:text-5xl font-bold text-[#1F1F1F]">
          How TradeVerse AI Works
        </h1>
        <p className="text-xs sm:text-sm text-[#706F6C] max-w-xl mx-auto leading-relaxed">
          Instead of scrolling through complex menus, you converse naturally with specialized AI agent networks that parse intent, price comps, negotiate offers, and execute smart legal contracts.
        </p>

        <button
          onClick={() => {
            setIsWorkspaceOpen(true);
            sendMessage('Demonstrate TradeVerse AI Multi-Agent Workflow');
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs shadow-md hover:scale-105 transition-transform cursor-pointer"
        >
          Try Live Interactive Demo ➔
        </button>
      </div>

      {/* 4-STEP WORKFLOW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="warm-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] font-extrabold text-sm flex items-center justify-center">
            01
          </div>
          <h3 className="font-bold text-base text-[#1F1F1F]">1. Ask Naturally</h3>
          <p className="text-xs text-[#706F6C] leading-relaxed">
            Speak or type your request in plain English (e.g. "Family SUV under $40k"). Voice & Vision AI auto-detect features.
          </p>
        </div>

        <div className="warm-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] font-extrabold text-sm flex items-center justify-center">
            02
          </div>
          <h3 className="font-bold text-base text-[#1F1F1F]">2. Agent Analysis</h3>
          <p className="text-xs text-[#706F6C] leading-relaxed">
            The AI assistant searches the marketplace database, pulls up full listing details, and compares prices across similar items.
          </p>
        </div>

        <div className="warm-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] font-extrabold text-sm flex items-center justify-center">
            03
          </div>
          <h3 className="font-bold text-base text-[#1F1F1F]">3. AI Negotiation</h3>
          <p className="text-xs text-[#706F6C] leading-relaxed">
            The Counter-Offer Assistant formulates data-backed counter offers (5%, 8%, or 12% off) and sends them to sellers.
          </p>
        </div>

        <div className="warm-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] font-extrabold text-sm flex items-center justify-center">
            04
          </div>
          <h3 className="font-bold text-base text-[#1F1F1F]">4. Smart Escrow</h3>
          <p className="text-xs text-[#706F6C] leading-relaxed">
            Automated legal contracts are generated with cryptographic signatures and 7-day buyer inspection protection.
          </p>
        </div>

      </div>

    </div>
  );
};
