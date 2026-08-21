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

export const CategoryNav: React.FC = () => {
  const { filters, setFilters } = useMarketplace();

  const activeCatInfo = MOCK_CATEGORIES.find(c => c.id === filters.category);

  return (
    <div className="w-full space-y-4">
      
      {/* MAIN CATEGORIES BAR */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        
        {/* ALL CATEGORIES BUTTON */}
        <button
          onClick={() => setFilters(prev => ({ ...prev, category: 'all', subcategory: 'all' }))}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
            filters.category === 'all'
              ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg shadow-brand-600/25 scale-[1.02]'
              : 'glass-card text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800'
          }`}
        >
          <Grid2X2 className="w-4 h-4" />
          <span>All Categories</span>
        </button>

        {/* CATEGORY TILES */}
        {MOCK_CATEGORIES.map(cat => {
          const IconComponent = ICON_MAP[cat.icon] || Grid2X2;
          const isActive = filters.category === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.id as MainCategory, subcategory: 'all' }))}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-slate-800 border-2 border-brand-500 text-white shadow-lg shadow-brand-500/20 scale-[1.02]'
                  : 'glass-card text-slate-300 hover:text-white hover:bg-slate-800/60 border-slate-800'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* SUBCATEGORY PILLS */}
      {activeCatInfo && (
        <div className="flex items-center gap-2 overflow-x-auto py-1.5 scrollbar-none text-xs">
          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] shrink-0 mr-1">
            Subcategories:
          </span>
          <button
            onClick={() => setFilters(prev => ({ ...prev, subcategory: 'all' }))}
            className={`px-3 py-1.5 rounded-full font-medium transition-all ${
              filters.subcategory === 'all'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All {activeCatInfo.name}
          </button>

          {activeCatInfo.subcategories.map(sub => {
            const isSubActive = filters.subcategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setFilters(prev => ({ ...prev, subcategory: sub }))}
                className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
                  isSubActive
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/50'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
