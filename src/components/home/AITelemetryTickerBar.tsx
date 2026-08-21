import React, { useState, useEffect } from 'react';
import { Cpu, Zap, ShieldCheck, TrendingDown, FileCheck, Sparkles } from 'lucide-react';

const TELEMETRY_EVENTS = [
  { icon: Cpu, text: '🤖 Pricing Agent evaluated 1,420 Tesla Model Y regional comps in Austin', tag: 'Valuation' },
  { icon: ShieldCheck, text: '🛡️ Fraud Shield verified 99.8% KYC identity for Apex EV Dealership', tag: 'Security' },
  { icon: FileCheck, text: '📜 Smart Escrow executed Residential Lease Agreement #TV-9918 ($1.25M)', tag: 'Contract' },
  { icon: TrendingDown, text: '⚡ Counter-Offer Agent negotiated $2,950 discount for MacBook Pro M3', tag: 'Savings' },
  { icon: Zap, text: '🔮 Predictor Agent forecast 14% electronics demand surge this week', tag: 'Forecast' }
];

export const AITelemetryTickerBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % TELEMETRY_EVENTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const current = TELEMETRY_EVENTS[index];
  const Icon = current.icon;

  return (
    <div className="w-full bg-[#FFF9EE] border border-[#F2E4C9] rounded-2xl p-2.5 px-4 flex items-center justify-between shadow-sm animate-quiet-fade">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8860B] text-white text-[10px] font-bold shrink-0">
          <Sparkles className="w-3 h-3 animate-spin-slow" />
          <span>LIVE TELEMETRY</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1F1F] truncate">
          <Icon className="w-4 h-4 text-[#B8860B] shrink-0" />
          <span className="truncate">{current.text}</span>
        </div>
      </div>

      <span className="hidden sm:inline-block text-[10px] font-bold text-[#B8860B] bg-white px-2.5 py-0.5 rounded-full border border-[#F2E4C9]">
        {current.tag}
      </span>
    </div>
  );
};
