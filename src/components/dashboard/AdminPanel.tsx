import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ShieldCheck, AlertTriangle, CheckCircle2, Lock, Cpu, Activity, Download } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { notify } = useMarketplace();

  return (
    <div className="space-y-6 pt-2 animate-quiet-fade">
      
      {/* ADMIN HEADER BANNER */}
      <div className="warm-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-[#B8860B]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
              Platform Master Admin
            </span>
            <span className="text-[10px] text-[#706F6C] font-semibold">SOC2 Compliant</span>
          </div>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[#1F1F1F]">
            TradeVerse AI System Control Center
          </h1>
        </div>

        <button
          onClick={() => notify('📋 Admin SOC2 System Audit Logs downloaded', 'success')}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-transform cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Logs</span>
        </button>
      </div>

      {/* MULTI-AGENT NETWORK MONITOR */}
      <div className="warm-card p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#B8860B]" />
            <h2 className="font-display font-extrabold text-base text-[#1F1F1F]">
              Multi-Agent AI Network Status (11 Active Agents)
            </h2>
          </div>

          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
            <Activity className="w-4 h-4" />
            <span>99.99% Uptime</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] space-y-1">
            <div className="font-bold text-[#1F1F1F]">Search Agent</div>
            <div className="text-emerald-700 font-bold text-[11px]">Operational (14ms)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] space-y-1">
            <div className="font-bold text-[#1F1F1F]">Pricing Agent</div>
            <div className="text-emerald-700 font-bold text-[11px]">Operational (18ms)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] space-y-1">
            <div className="font-bold text-[#1F1F1F]">Fraud Agent</div>
            <div className="text-emerald-700 font-bold text-[11px]">Operational (22ms)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] space-y-1">
            <div className="font-bold text-[#1F1F1F]">Contract Agent</div>
            <div className="text-emerald-700 font-bold text-[11px]">Operational (12ms)</div>
          </div>
        </div>
      </div>

      {/* AUTOMATED MODERATION & FRAUD REVIEW */}
      <div className="warm-card p-6 space-y-4 shadow-sm">
        <h2 className="font-display font-extrabold text-base text-[#1F1F1F]">
          Automated AI Moderation & Fraud Review
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <div className="font-bold text-[#1F1F1F]">Flagged Image Duplication Attempt</div>
                <div className="text-[11px] text-[#706F6C]">Listing #FL-992 matched stock photo database (96.4% confidence).</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => notify('Listing removed by Admin', 'info')} className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-[11px]">Remove</button>
              <button onClick={() => notify('Listing approved by Admin', 'success')} className="px-3 py-1.5 rounded-xl bg-[#1F1F1F] text-white font-bold text-[11px]">Approve</button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F6F4F0] border border-[#E6E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-[#1F1F1F]">Seller Identity Verification (KYC)</div>
                <div className="text-[11px] text-[#706F6C]">Apex EV Dealership submitted passport & state license.</div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-[11px] border border-emerald-500/20">
              Verified
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
