import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { SlidersHorizontal, ShieldCheck, ArrowUpDown, X } from 'lucide-react';

export const CategoryFilters: React.FC = () => {
  const { filters, setFilters } = useMarketplace();

  const resetFilters = () => {
    setFilters({
      category: 'all',
      subcategory: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 2000000,
      priceType: 'all',
      verifiedOnly: false,
      sortBy: 'recommended'
    });
  };

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.subcategory !== 'all' || 
    filters.searchQuery !== '' || 
    filters.verifiedOnly || 
    filters.sortBy !== 'recommended';

  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <SlidersHorizontal className="w-4 h-4 text-brand-400" />
          <span>Filters & Sort</span>
        </div>

        {/* Verified Sellers Toggle */}
        <button
          onClick={() => setFilters(prev => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            filters.verifiedOnly
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Sellers Only</span>
        </button>
      </div>

      {/* Sort selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Sort By:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="recommended">✨ AI Recommended</option>
            <option value="trust-score">🛡️ Highest Trust Score</option>
            <option value="price-low">💵 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

    </div>
  );
};
