import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { 
  Command, 
  Search, 
  X, 
  Sparkles, 
  Car, 
  Home, 
  Briefcase, 
  Smartphone, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { MainCategory } from '../../types';

interface RaycastCommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RaycastCommandPaletteModal: React.FC<RaycastCommandPaletteModalProps> = ({ isOpen, onClose }) => {
  const { setFilters, listings, setSelectedListing, setIsCreateListingOpen, setIsComparisonModalOpen } = useMarketplace();
  const { sendMessage } = useAI();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectQuery = (q: string) => {
    setFilters(prev => ({ ...prev, searchQuery: q }));
    sendMessage(q);
    onClose();
  };

  const handleSelectCategory = (cat: MainCategory) => {
    setFilters(prev => ({ ...prev, category: cat, searchQuery: '' }));
    onClose();
  };

  const filteredMatches = query.trim()
    ? listings.filter(l => l.title.toLowerCase().includes(query.toLowerCase()) || l.subcategory.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl shadow-2xl overflow-hidden animate-quiet-fade">
        
        {/* WARM INPUT HEADER */}
        <div className="p-4 border-b border-[#E6E2D8] flex items-center gap-3 bg-white shadow-sm">
          <Search className="w-5 h-5 text-[#B8860B] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search (e.g. 'Find SUV', 'Compare laptops', 'Post listing')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[#1F1F1F] placeholder-[#A09E97] focus:outline-none text-sm font-medium"
          />
          <kbd className="px-2 py-0.5 rounded-lg bg-[#F6F4F0] border border-[#E6E2D8] text-[10px] font-mono text-[#706F6C]">ESC</kbd>
          <button onClick={onClose} className="p-1 rounded-lg text-[#706F6C] hover:text-[#1F1F1F] hover:bg-[#F6F4F0]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* COMMANDS BODY */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          
          {/* SEARCH RESULTS IF TYPING */}
          {query.trim() !== '' && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold text-[#706F6C] uppercase tracking-wider">Matching Marketplace Listings</div>
              {filteredMatches.length === 0 ? (
                <div className="p-3 text-center text-[#706F6C] italic">No direct listing matches found. Press Enter to submit AI search...</div>
              ) : (
                filteredMatches.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedListing(item);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] hover:bg-[#FFF9EE] flex items-center justify-between cursor-pointer transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.images[0]} alt={item.title} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-[#1F1F1F] text-xs">{item.title}</div>
                        <div className="text-[10px] text-emerald-700 font-bold">${item.price.toLocaleString()}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B8860B]" />
                  </div>
                ))
              )}
            </div>
          )}

          {/* QUICK ACTIONS */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold text-[#706F6C] uppercase tracking-wider">Quick Actions</div>
            
            <div 
              onClick={() => { setIsCreateListingOpen(true); onClose(); }}
              className="p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] hover:bg-[#FFF9EE] flex items-center justify-between cursor-pointer transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-xl bg-[#FFF9EE] text-[#B8860B]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-[#1F1F1F]">Create 1-Click AI Vision Listing</span>
              </div>
              <span className="text-[10px] text-[#706F6C] font-mono">⌘ + N</span>
            </div>

            <div 
              onClick={() => { setIsComparisonModalOpen(true); onClose(); }}
              className="p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] hover:bg-[#FFF9EE] flex items-center justify-between cursor-pointer transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-xl bg-[#FFF9EE] text-[#B8860B]">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-bold text-[#1F1F1F]">Run Side-by-Side Spec Comparison Matrix</span>
              </div>
              <span className="text-[10px] text-[#706F6C] font-mono">⌘ + C</span>
            </div>
          </div>

          {/* CATEGORY SEARCH PRESETS */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold text-[#706F6C] uppercase tracking-wider">Browse Domains</div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleSelectCategory('vehicles')} className="p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] hover:bg-[#FFF9EE] flex items-center gap-2.5 text-left font-bold text-[#1F1F1F] shadow-sm cursor-pointer">
                <Car className="w-4 h-4 text-[#B8860B]" /> <span>Vehicles</span>
              </button>
              <button onClick={() => handleSelectCategory('real-estate')} className="p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] hover:bg-[#FFF9EE] flex items-center gap-2.5 text-left font-bold text-[#1F1F1F] shadow-sm cursor-pointer">
                <Home className="w-4 h-4 text-[#B8860B]" /> <span>Real Estate</span>
              </button>
              <button onClick={() => handleSelectCategory('jobs')} className="p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] hover:bg-[#FFF9EE] flex items-center gap-2.5 text-left font-bold text-[#1F1F1F] shadow-sm cursor-pointer">
                <Briefcase className="w-4 h-4 text-[#B8860B]" /> <span>Jobs</span>
              </button>
              <button onClick={() => handleSelectCategory('electronics')} className="p-3 rounded-2xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] hover:bg-[#FFF9EE] flex items-center gap-2.5 text-left font-bold text-[#1F1F1F] shadow-sm cursor-pointer">
                <Smartphone className="w-4 h-4 text-[#B8860B]" /> <span>Electronics</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
