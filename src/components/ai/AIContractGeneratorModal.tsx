import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { FileText, X, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export const AIContractGeneratorModal: React.FC = () => {
  const { isContractModalOpen, setIsContractModalOpen, contractTarget, notify } = useMarketplace();
  const [signed, setSigned] = useState(false);

  if (!isContractModalOpen || !contractTarget) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl p-6 shadow-2xl space-y-6 my-8">
        
        <button
          onClick={() => setIsContractModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>AI Automated Legal Contract</span>
          </div>
          <h2 className="font-display font-bold text-xl text-[#1F1F1F]">Smart Escrow & Purchase Agreement</h2>
          <p className="text-xs text-[#706F6C]">Legally binding contract for <span className="text-[#1F1F1F] font-semibold">{contractTarget.title}</span></p>
        </div>

        {/* CONTRACT PREVIEW */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6E2D8] space-y-4 text-xs font-mono text-[#1F1F1F] max-h-72 overflow-y-auto shadow-sm">
          <div className="border-b border-[#E6E2D8] pb-2 font-bold flex justify-between">
            <span>AGREEMENT #TV-{Math.floor(1000 + Math.random() * 9000)}</span>
            <span>EFFECTIVE: {new Date().toLocaleDateString()}</span>
          </div>

          <div>
            <strong>PARTIES:</strong>
            <br />
            Buyer: Sahitya Singh (Verified ID #8912)
            <br />
            Seller: {contractTarget.seller.name} ({contractTarget.seller.type.toUpperCase()})
          </div>

          <div>
            <strong>CONSIDERATION:</strong> $${contractTarget.price.toLocaleString()} USD via TradeVerse Escrow.
          </div>

          <div className="space-y-1 text-[11px] leading-relaxed text-[#706F6C]">
            <strong>TERMS & CONDITIONS:</strong>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Ownership transfers immediately upon escrow verification.</li>
              <li>Seller warrants title is free of liens and encumbrances.</li>
              <li>7-day inspection window protected by TradeVerse Buyer Insurance.</li>
              <li>Digital signatures verified under ESIGN Act & eIDAS Regulation.</li>
            </ol>
          </div>
        </div>

        {/* DIGITAL SIGNATURE AREA */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6E2D8] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="font-bold text-xs text-[#1F1F1F]">Digital Cryptographic Signature</div>
              <div className="text-[10px] text-[#706F6C]">Sahitya Singh • IP 192.168.1.1</div>
            </div>
          </div>

          <button
            onClick={() => setSigned(!signed)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              signed ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30' : 'bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]'
            }`}
          >
            {signed ? '✓ Signed Digitally' : 'Sign Agreement'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              notify('📜 Contract PDF downloaded to local device!', 'info');
            }}
            className="flex-1 py-3 rounded-2xl bg-white hover:bg-[#EFECE6] border border-[#E6E2D8] text-[#1F1F1F] font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4 text-[#B8860B]" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => {
              notify('🎉 Contract executed and Escrow initialized!', 'success');
              setIsContractModalOpen(false);
            }}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Execute & Escrow</span>
          </button>
        </div>

      </div>
    </div>
  );
};
