import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Sparkles, X, Upload, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { MainCategory } from '../../types';

export const AIListingGeneratorModal: React.FC = () => {
  const { isCreateListingOpen, setIsCreateListingOpen, addNewListing } = useMarketplace();
  const [photoSelected, setPhotoSelected] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const [formData, setFormData] = useState({
    title: '2024 Apple MacBook Air M3 (15-inch Midnight)',
    category: 'electronics' as MainCategory,
    subcategory: 'Laptops',
    price: 1190,
    location: 'Austin, TX',
    description: 'Mint condition Apple MacBook Air M3 15" in Midnight finish. 16GB RAM, 512GB SSD. Includes original MagSafe charger and leather sleeve.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  });

  if (!isCreateListingOpen) return null;

  const handleSimulateVisionAi = () => {
    setPhotoSelected(true);
    setIsAiGenerating(true);

    setTimeout(() => {
      setIsAiGenerating(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newListingItem = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      subcategory: formData.subcategory,
      price: Number(formData.price),
      originalPrice: Number(formData.price) * 1.15,
      priceType: 'negotiable' as const,
      location: formData.location,
      images: [formData.image],
      description: formData.description,
      seller: {
        name: 'Sahitya Singh',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        verified: true,
        rating: 5.0,
        responseRate: '< 5 mins',
        type: 'individual' as const
      },
      aiMetrics: {
        dealScore: 'Great Deal' as const,
        trustScore: 99,
        demandScore: 95,
        priceHistoryTrend: 'stable' as const,
        pros: ['Vision AI auto-verified title & specs', 'Under AppleCare warranty'],
        cons: ['Minor cosmetic box wear'],
        aiSummary: 'Auto-generated AI listing from photo analysis.'
      },
      specs: [
        { label: 'Condition', value: 'Like New' },
        { label: 'Storage', value: '512 GB' },
        { label: 'RAM', value: '16 GB' }
      ],
      createdDate: 'Just now',
      views: 1,
      likes: 0,
      featured: true
    };

    addNewListing(newListingItem);
    setIsCreateListingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl p-6 shadow-2xl space-y-6 my-8">
        
        <button
          onClick={() => setIsCreateListingOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click AI Vision Generator</span>
          </div>
          <h2 className="font-display font-bold text-xl text-[#1F1F1F]">Post New Listing with AI</h2>
          <p className="text-xs text-[#706F6C]">Upload a photo and let TradeVerse Vision AI auto-fill title, specs, description & pricing.</p>
        </div>

        {/* UPLOAD & VISION TRIGGER */}
        {!photoSelected ? (
          <div 
            onClick={handleSimulateVisionAi}
            className="p-10 border-2 border-dashed border-[#E6E2D8] hover:border-[#B8860B] rounded-2xl bg-white flex flex-col items-center justify-center gap-3 cursor-pointer text-center shadow-sm"
          >
            <Upload className="w-10 h-10 text-[#B8860B] animate-bounce" />
            <div className="text-xs font-bold text-[#1F1F1F]">Click or Drag Photo to Auto-Generate Listing</div>
            <div className="text-[10px] text-[#706F6C]">Vision AI will identify item model, suggest price range & write description</div>
          </div>
        ) : isAiGenerating ? (
          <div className="p-8 rounded-2xl bg-white border border-[#E6E2D8] text-center space-y-3 shadow-sm">
            <Sparkles className="w-8 h-8 text-[#B8860B] animate-spin mx-auto" />
            <div className="text-xs font-bold text-[#1F1F1F]">Vision AI auto-generating title, tags & pricing...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-2xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vision AI Auto-Fill Complete</span>
              <span className="text-[10px] text-[#B8860B]">100% Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-[#1F1F1F]">Listing Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E6E2D8] text-[#1F1F1F]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1F1F1F]">Suggested AI Price ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E6E2D8] text-[#1F1F1F] font-bold text-emerald-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#1F1F1F]">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E6E2D8] text-[#1F1F1F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish AI Listing Live</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
