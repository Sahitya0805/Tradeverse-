import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { TrendingUp, Sparkles, Sliders, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const AIPricePredictorWidget: React.FC = () => {
  const { listings, setSelectedListing, notify } = useMarketplace();
  const [selectedAsset, setSelectedAsset] = useState<string>(listings[0]?.id || 'veh-1');
  const [targetYear, setTargetYear] = useState<number>(2027);

  const activeListing = listings.find(l => l.id === selectedAsset) || listings[0];
  const yearDiff = targetYear - 2026;
  const predictedValue = Math.round(activeListing.price * Math.pow(0.92, yearDiff));
  const valuePreservation = Math.round((predictedValue / activeListing.price) * 100);

  return (
    <div className="warm-card p-6 space-y-5 shadow-sm border border-[#E6E2D8]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6E2D8] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-base text-[#1F1F1F]">
                AI 3-Year Resale & Depreciation Predictor
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#B8860B] text-white text-[9px] font-bold">
                PRO TOOL
              </span>
            </div>
            <p className="text-xs text-[#706F6C]">Slide target year to simulate AI future asset value preservation.</p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedListing(activeListing);
            notify(`Resale forecast loaded for ${activeListing.title}`, 'info');
          }}
          className="text-xs font-bold text-[#B8860B] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View Listing Specs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CONTROLS & CALCULATOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* LEFT CONTROLS */}
        <div className="space-y-4 text-xs font-semibold">
          
          <div className="space-y-1.5">
            <label className="text-[#1F1F1F] font-bold flex justify-between">
              <span>Select Asset to Forecast:</span>
              <span className="text-[#B8860B]">{activeListing.category.toUpperCase()}</span>
            </label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8] text-[#1F1F1F] font-bold focus:outline-none focus:border-[#D4A373]"
            >
              {listings.slice(0, 6).map(item => (
                <option key={item.id} value={item.id}>
                  {item.title} (${item.price.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1F1F1F]">
              <span>Forecast Target Year:</span>
              <span className="text-[#B8860B] text-sm">{targetYear} (+{yearDiff} {yearDiff === 1 ? 'Year' : 'Years'})</span>
            </div>
            <input
              type="range"
              min={2026}
              max={2029}
              step={1}
              value={targetYear}
              onChange={(e) => setTargetYear(Number(e.target.value))}
              className="w-full accent-[#B8860B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#706F6C] font-mono">
              <span>2026 (Today)</span>
              <span>2027</span>
              <span>2028</span>
              <span>2029 (+3Y)</span>
            </div>
          </div>

        </div>

        {/* RIGHT PREDICTION CARD */}
        <div className="p-5 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] space-y-3 shadow-sm text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#966F1E] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B8860B]" /> Forecast Result ({targetYear})
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-extrabold text-[10px] border border-emerald-500/20">
              {valuePreservation}% Value Held
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="text-[10px] text-[#706F6C] font-semibold">Today's Price</div>
              <div className="font-display font-extrabold text-lg text-[#1F1F1F]">${activeListing.price.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#706F6C] font-semibold">Predicted {targetYear} Resale</div>
              <div className="font-display font-extrabold text-lg text-emerald-700">${predictedValue.toLocaleString()}</div>
            </div>
          </div>

          <p className="text-[11px] text-[#706F6C] leading-snug pt-2 border-t border-[#F2E4C9]">
            🤖 <strong>AI Verdict:</strong> Strong resale retention due to high demand rating ({activeListing.aiMetrics.demandScore}/100) and verified warranty status.
          </p>
        </div>

      </div>

    </div>
  );
};
