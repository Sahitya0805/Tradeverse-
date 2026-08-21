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
  ArrowDownRight,
  ArrowRight
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

export const ExploreCategoriesSection: React.FC = () => {
  const { filters, setFilters, listings } = useMarketplace();

  return (
    <div id="explore-categories" className="space-y-4 scroll-mt-24">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-extrabold text-base text-[#1F1F1F]">
          Explore Top Categories
        </h2>

        <button
          onClick={() => setFilters(prev => ({ ...prev, category: 'all', subcategory: 'all' }))}
          className="text-xs font-bold text-[#B8860B] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View all categories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {MOCK_CATEGORIES.map(cat => {
          const IconComponent = ICON_MAP[cat.icon] || Car;
          const isActive = filters.category === cat.id;

          const isDown = cat.trendingPct.includes('-');

          return (
            <div
              key={cat.id}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.id as MainCategory, subcategory: 'all' }))}
              className={`warm-card warm-card-hover p-3.5 text-center flex flex-col items-center justify-between cursor-pointer space-y-2 relative ${
                isActive ? 'border-[#B8860B] ring-2 ring-[#B8860B]/20 bg-[#FFF9EE]' : ''
              }`}
            >
              <div className="p-2.5 rounded-2xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9] shadow-sm">
                <IconComponent className="w-5 h-5" />
              </div>

              <div>
                <div className="font-bold text-xs text-[#1F1F1F] truncate max-w-[90px] mx-auto">{cat.name}</div>
                <div className="text-[10px] text-[#706F6C] font-medium truncate max-w-[90px] mx-auto">{cat.liveCount.toLocaleString()} Listings</div>
              </div>

              <div className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                isDown ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'
              }`}>
                {isDown ? <ArrowDownRight className="w-2.5 h-2.5" /> : <ArrowUpRight className="w-2.5 h-2.5" />}
                <span>{cat.trendingPct}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
