import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Building2, TrendingUp, Sparkles, Plus, Eye, DollarSign, Package } from 'lucide-react';

export const BusinessDashboard: React.FC = () => {
  const { listings, setIsCreateListingOpen, setSelectedListing, notify } = useMarketplace();

  return (
    <div className="space-y-6 pt-2 animate-quiet-fade">
      
      {/* BUSINESS HERO HEADER */}
      <div className="warm-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-[#B8860B]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
              Business Intelligence Suite
            </span>
            <span className="text-[10px] text-[#706F6C] font-semibold">Enterprise AI Enabled</span>
          </div>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[#1F1F1F]">
            Apex ReCommerce & Dealership HQ
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreateListingOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inventory</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="warm-card p-4 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#706F6C]">
            <span>Gross Inventory Value (GMV)</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display font-extrabold text-2xl text-[#1F1F1F]">
            ${listings.reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Computed from {listings.length} live units</span>
          </div>
        </div>

        <div className="warm-card p-4 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#706F6C]">
            <span>Active Listings Index</span>
            <Package className="w-4 h-4 text-[#B8860B]" />
          </div>
          <div className="font-display font-extrabold text-2xl text-[#1F1F1F]">
            {listings.length} Listings
          </div>
          <div className="text-[10px] text-[#706F6C]">100% AI Auto-Vectorized</div>
        </div>

        <div className="warm-card p-4 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#706F6C]">
            <span>Average Trust Score</span>
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
          </div>
          <div className="font-display font-extrabold text-2xl text-[#1F1F1F]">
            98.6% Rating
          </div>
          <div className="text-[10px] text-emerald-700 font-bold">Verified Escrow Protection</div>
        </div>

        <div className="warm-card p-4 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#706F6C]">
            <span>Total Buyer Views</span>
            <Eye className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="font-display font-extrabold text-2xl text-[#1F1F1F]">
            24.8K Views
          </div>
          <div className="text-[10px] text-[#706F6C]">Real-time impression tracking</div>
        </div>

      </div>

      {/* LIVE INVENTORY MANAGEMENT TABLE */}
      <div className="warm-card p-6 space-y-4 shadow-sm">
        <h2 className="font-display font-extrabold text-base text-[#1F1F1F]">
          Live Inventory & AI Pricing Comps
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E2D8] text-[#706F6C] uppercase text-[10px] font-bold">
                <th className="py-3 px-2">Title</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Live Price</th>
                <th className="py-3 px-2">Trust Score</th>
                <th className="py-3 px-2">Views</th>
                <th className="py-3 px-2 text-right">AI Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E2D8]">
              {listings.slice(0, 5).map(item => (
                <tr key={item.id} className="hover:bg-[#F6F4F0] transition-colors cursor-pointer" onClick={() => setSelectedListing(item)}>
                  <td className="py-3 px-2 font-bold text-[#1F1F1F] flex items-center gap-2">
                    <img src={item.images[0]} alt={item.title} className="w-8 h-8 rounded-lg object-cover" />
                    <span className="truncate max-w-[180px]">{item.title}</span>
                  </td>
                  <td className="py-3 px-2 capitalize text-[#706F6C] font-semibold">{item.category}</td>
                  <td className="py-3 px-2 font-extrabold text-emerald-700">${item.price.toLocaleString()}</td>
                  <td className="py-3 px-2 font-bold text-[#B8860B]">{item.aiMetrics.trustScore}%</td>
                  <td className="py-3 px-2 text-[#706F6C]">{item.views.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); notify(`AI Repricer optimized price for ${item.title}`, 'success'); }}
                      className="px-2.5 py-1 rounded-lg bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] font-bold text-[10px] hover:bg-[#FFF2D7]"
                    >
                      AI Reprice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
