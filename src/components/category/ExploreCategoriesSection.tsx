import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MOCK_CATEGORIES } from '../../data/mockCategories';
import { MainCategory } from '../../types';
import { ArrowRight, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export const ExploreCategoriesSection: React.FC = () => {
  const { setFilters, syncEcayData, isSyncingEcay, listings } = useMarketplace();

  const handleCategoryClick = (catId: MainCategory) => {
    setFilters(prev => ({
      ...prev,
      category: catId,
      subcategory: 'all'
    }));
    const el = document.getElementById('explore-categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="explore-categories" className="space-y-4 pt-2">
      
      {/* SECTION HEADER WITH ECAYTRADE SYNC BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-extrabold text-lg text-[#1F1F1F]">
              Explore Top Categories
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-bold border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{listings.length} Live Items</span>
            </span>
          </div>
          <p className="text-xs text-[#706F6C]">Discover verified vehicles, real estate, jobs, and tech electronics.</p>
        </div>

        {/* 1-CLICK ECAYTRADE DATA SYNC TRIGGER */}
        <button
          onClick={syncEcayData}
          disabled={isSyncingEcay}
          className="px-3.5 py-2 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] hover:bg-[#FFF2D7] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
          title="Ingest live real-time listings from EcayTrade"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#B8860B] ${isSyncingEcay ? 'animate-spin' : ''}`} />
          <span>{isSyncingEcay ? 'Syncing EcayTrade Data...' : '⚡ Sync Live EcayTrade Data'}</span>
        </button>
      </div>

      {/* CATEGORY TILES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="warm-card p-3 flex flex-col items-center justify-center text-center space-y-2 hover:border-[#D4A373] hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="text-2xl p-2 rounded-2xl bg-[#F6F4F0] group-hover:bg-[#FFF9EE] transition-colors">
              {cat.icon}
            </div>
            <div>
              <div className="font-extrabold text-xs text-[#1F1F1F] group-hover:text-[#B8860B] transition-colors truncate max-w-[90px]">
                {cat.name}
              </div>
              <div className="text-[9px] font-bold text-emerald-700 bg-emerald-500/10 px-1.5 py-0.5 rounded-full mt-1">
                {cat.trendingPct}
              </div>
            </div>
          </button>
        ))}
      </div>

    </section>
  );
};
