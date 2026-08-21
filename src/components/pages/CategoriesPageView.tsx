import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MOCK_CATEGORIES } from '../../data/mockCategories';
import { ListingCard } from '../listing/ListingCard';
import { MainCategory } from '../../types';
import { 
  Car, 
  Home, 
  Briefcase, 
  Smartphone, 
  Wrench, 
  Dog, 
  Users, 
  Building2, 
  Grid2X2, 
  Sparkles, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

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

export const CategoriesPageView: React.FC = () => {
  const { listings, filters, setFilters } = useMarketplace();
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');

  const activeCategoryInfo = MOCK_CATEGORIES.find(c => c.id === filters.category) || MOCK_CATEGORIES[0];

  const categoryListings = listings.filter(l => {
    if (filters.category !== 'all' && l.category !== filters.category) return false;
    if (selectedSubcat !== 'all' && l.subcategory !== selectedSubcat) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-quiet-fade">
      
      {/* PAGE HEADER */}
      <div className="warm-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
            Full Category Index
          </span>
          <span className="text-xs text-[#706F6C]">Explore all 8 Marketplace Domains</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#1F1F1F]">
          Browse Marketplace Categories
        </h1>
        <p className="text-xs sm:text-sm text-[#706F6C] max-w-2xl">
          Discover verified listings, market valuations, and AI recommendations tailored for every category.
        </p>
      </div>

      {/* CATEGORY SELECTOR STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {MOCK_CATEGORIES.map(cat => {
          const Icon = ICON_MAP[cat.icon] || Grid2X2;
          const isActive = filters.category === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setFilters(prev => ({ ...prev, category: cat.id as MainCategory }));
                setSelectedSubcat('all');
              }}
              className={`warm-card p-3 text-center flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all ${
                isActive ? 'border-[#B8860B] bg-[#FFF9EE] ring-2 ring-[#B8860B]/20 font-bold' : 'hover:border-[#D4A373]'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#FFF9EE] text-[#B8860B]">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-xs text-[#1F1F1F] truncate w-full">{cat.name}</div>
              <div className="text-[10px] text-emerald-600 font-bold">{cat.trendingPct}</div>
            </button>
          );
        })}
      </div>

      {/* SUBCATEGORY PILLS */}
      {filters.category !== 'all' && (
        <div className="warm-card p-4 space-y-2">
          <div className="text-xs font-bold text-[#1F1F1F] flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Filter {activeCategoryInfo.name} Subcategories:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setSelectedSubcat('all')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedSubcat === 'all' ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] font-bold' : 'bg-white text-[#706F6C] border-[#E6E2D8]'
              }`}
            >
              All {activeCategoryInfo.name} ({listings.filter(l => l.category === filters.category).length})
            </button>
            {activeCategoryInfo.subcategories.map((sub, i) => (
              <button
                key={i}
                onClick={() => setSelectedSubcat(sub)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedSubcat === sub ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] font-bold' : 'bg-white text-[#706F6C] border-[#E6E2D8]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LISTINGS GRID */}
      <div className="space-y-4">
        <div className="font-display font-bold text-base text-[#1F1F1F]">
          {categoryListings.length} Active Listings Match Selected Filters
        </div>

        {categoryListings.length === 0 ? (
          <div className="p-12 text-center text-[#706F6C] warm-card text-xs">
            No listings match the selected subcategory. Try resetting filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryListings.map(item => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
