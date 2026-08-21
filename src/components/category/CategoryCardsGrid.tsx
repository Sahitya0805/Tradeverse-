import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MOCK_CATEGORIES } from '../../data/mockCategories';
import { 
  Car, 
  Home, 
  Briefcase, 
  Smartphone, 
  Wrench, 
  Dog, 
  Users, 
  Building2, 
  ArrowUpRight, 
  Sparkles,
  Grid2X2
} from 'lucide-react';
import { MainCategory } from '../../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Car,
  Home,
  Briefcase,
  Smartphone,
  Wrench,
  Dog,
  Users,
  Building2
};

export const CategoryCardsGrid: React.FC = () => {
  const { filters, setFilters, listings } = useMarketplace();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-display font-extrabold text-lg text-white">
          <Grid2X2 className="w-5 h-5 text-blue-400" />
          <span>Marketplace Categories</span>
        </div>

        {filters.category !== 'all' && (
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'all', subcategory: 'all' }))}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            Reset Category Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_CATEGORIES.map(cat => {
          const IconComponent = ICON_MAP[cat.icon] || Grid2X2;
          const isActive = filters.category === cat.id;

          // Dynamically compute count from live listings
          const liveCatListings = listings.filter(l => l.category === cat.id);
          const computedCount = liveCatListings.length > 0 ? liveCatListings.length : cat.liveCount;
          const avgCatPrice = liveCatListings.length > 0
            ? Math.round(liveCatListings.reduce((sum, l) => sum + l.price, 0) / liveCatListings.length)
            : null;

          return (
            <div
              key={cat.id}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.id as MainCategory, subcategory: 'all' }))}
              className={`p-4 rounded-2xl linear-card linear-card-hover cursor-pointer space-y-3 relative overflow-hidden ${
                isActive ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-[#2A3245]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-[#0A0E17] border border-[#2A3245] text-blue-400">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{cat.trendingPct}</span>
                </div>
              </div>

              <div>
                <div className="font-display font-bold text-base text-white">{cat.name}</div>
                <div className="text-xs text-gray-400 mt-0.5 font-medium flex items-center justify-between">
                  <span>{computedCount} Active Listings</span>
                  {avgCatPrice && <span className="text-emerald-400 font-bold">Avg ${avgCatPrice.toLocaleString()}</span>}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0A0E17] border border-[#2A3245] flex items-start gap-2 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 line-clamp-2 leading-tight">
                  "{cat.aiRecommendation}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
