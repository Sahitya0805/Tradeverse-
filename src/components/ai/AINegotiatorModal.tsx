import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Handshake, X, Send } from 'lucide-react';

export const AINegotiatorModal: React.FC = () => {
  const { isNegotiatorModalOpen, setIsNegotiatorModalOpen, negotiationTarget, notify } = useMarketplace();
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [strategy, setStrategy] = useState<'polite' | 'market-data' | 'quick-cash'>('market-data');
  const [draftedMessage, setDraftedMessage] = useState<string>('');

  if (!isNegotiatorModalOpen || !negotiationTarget) return null;

  const handleGenerateDraft = (strat: 'polite' | 'market-data' | 'quick-cash') => {
    setStrategy(strat);
    const targetPrice = Math.round(negotiationTarget.price * (strat === 'quick-cash' ? 0.88 : strat === 'market-data' ? 0.92 : 0.95));
    setOfferPrice(targetPrice);

    if (strat === 'polite') {
      setDraftedMessage(`Hi ${negotiationTarget.seller.name}! I love your listing for "${negotiationTarget.title}". Would you consider an offer of $${targetPrice.toLocaleString()}? I can finalize the purchase today.`);
    } else if (strat === 'market-data') {
      setDraftedMessage(`Hello ${negotiationTarget.seller.name}. Based on TradeVerse AI market trends, similar items in ${negotiationTarget.location} average $${targetPrice.toLocaleString()}. I would like to offer $${targetPrice.toLocaleString()} backed by instant escrow payment.`);
    } else {
      setDraftedMessage(`Greetings! I am ready to purchase "${negotiationTarget.title}" right now for $${targetPrice.toLocaleString()} with immediate non-contingent cash transfer.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl p-6 shadow-2xl space-y-6">
        
        <button
          onClick={() => setIsNegotiatorModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
            <Handshake className="w-3.5 h-3.5" />
            <span>AI Negotiation Copilot</span>
          </div>
          <h2 className="font-display font-bold text-xl text-[#1F1F1F]">Smart Counter-Offer Assistant</h2>
          <p className="text-xs text-[#706F6C]">Targeting: <span className="text-[#1F1F1F] font-semibold">{negotiationTarget.title}</span> (${negotiationTarget.price.toLocaleString()})</p>
        </div>

        {/* STRATEGY SELECTOR */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-[#1F1F1F]">Choose AI Negotiation Strategy:</div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleGenerateDraft('polite')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                strategy === 'polite' ? 'bg-[#FFF9EE] border-[#B8860B] text-[#966F1E] font-bold shadow-sm' : 'bg-white border-[#E6E2D8] text-[#706F6C]'
              }`}
            >
              <div className="font-bold text-[#1F1F1F]">Friendly 5% Off</div>
              <div className="text-[10px] text-[#706F6C] mt-1">Polite soft open</div>
            </button>

            <button
              onClick={() => handleGenerateDraft('market-data')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                strategy === 'market-data' ? 'bg-[#FFF9EE] border-[#B8860B] text-[#966F1E] font-bold shadow-sm' : 'bg-white border-[#E6E2D8] text-[#706F6C]'
              }`}
            >
              <div className="font-bold text-[#1F1F1F]">Data-Backed (8% Off)</div>
              <div className="text-[10px] text-[#706F6C] mt-1">AI market comp data</div>
            </button>

            <button
              onClick={() => handleGenerateDraft('quick-cash')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                strategy === 'quick-cash' ? 'bg-[#FFF9EE] border-[#B8860B] text-[#966F1E] font-bold shadow-sm' : 'bg-white border-[#E6E2D8] text-[#706F6C]'
              }`}
            >
              <div className="font-bold text-[#1F1F1F]">Firm Cash (12% Off)</div>
              <div className="text-[10px] text-[#706F6C] mt-1">Instant buy commitment</div>
            </button>
          </div>
        </div>

        {/* DRAFTED MESSAGE PREVIEW */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1F1F1F]">AI Generated Offer Message:</span>
            <span className="text-emerald-700 font-bold text-sm">${offerPrice.toLocaleString()}</span>
          </div>

          <textarea
            rows={4}
            value={draftedMessage || `Click a strategy above to generate your customized negotiation message...`}
            onChange={(e) => setDraftedMessage(e.target.value)}
            className="w-full p-3 rounded-2xl bg-white border border-[#E6E2D8] text-[#1F1F1F] placeholder-[#A09E97] focus:outline-none focus:border-[#D4A373] text-xs shadow-sm"
          />
        </div>

        <button
          onClick={() => {
            notify(`🤝 Offer of $${offerPrice.toLocaleString()} sent to seller ${negotiationTarget.seller.name}!`, 'success');
            setIsNegotiatorModalOpen(false);
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
        >
          <Send className="w-4 h-4" />
          <span>Send Counter-Offer to Seller</span>
        </button>

      </div>
    </div>
  );
};
