import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, Lock, Eye, FileCheck } from 'lucide-react';

interface AIFraudBadgeProps {
  trustScore: number;
  sellerVerified: boolean;
}

export const AIFraudBadge: React.FC<AIFraudBadgeProps> = ({ trustScore, sellerVerified }) => {
  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AI Fraud & Trust Verification</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
          trustScore >= 95 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
        }`}>
          {trustScore}% Trust Score
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">Images Authenticated</span>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">Escrow Protected</span>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <FileCheck className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-slate-300">{sellerVerified ? 'ID & Phone Verified' : 'Standard Seller'}</span>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <Eye className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-300">Zero Fraud Flagged</span>
        </div>
      </div>
    </div>
  );
};
