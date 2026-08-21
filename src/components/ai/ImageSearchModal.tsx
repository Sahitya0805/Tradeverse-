import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { Camera, Upload, X, Sparkles, ArrowRight } from 'lucide-react';

export const ImageSearchModal: React.FC = () => {
  const { isImageSearchOpen, setIsImageSearchOpen, setSelectedListing, listings } = useMarketplace();
  const { sendMessage } = useAI();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [visionResult, setVisionResult] = useState<any>(null);

  if (!isImageSearchOpen) return null;

  const SAMPLE_PREVIEWS = [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'
  ];

  const handleSelectSample = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setVisionResult({
        objectDetected: 'Luxury Electric Vehicle (Tesla Model Y / SUV Class)',
        confidence: '99.4%',
        estimatedMarketPrice: '$38,500 - $44,000',
        matchedListings: listings.filter(l => l.category === 'vehicles' || l.category === 'electronics')
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl p-6 shadow-2xl space-y-6">
        
        <button
          onClick={() => {
            setIsImageSearchOpen(false);
            setSelectedImg(null);
            setVisionResult(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
            <Camera className="w-3.5 h-3.5" />
            <span>AI Vision Image Search</span>
          </div>
          <h2 className="font-display font-bold text-xl text-[#1F1F1F]">Upload or Select Image</h2>
          <p className="text-xs text-[#706F6C]">TradeVerse Vision AI will detect item specs and find exact market matches.</p>
        </div>

        {/* SAMPLE PREVIEWS */}
        {!selectedImg && (
          <div className="space-y-3">
            <div className="p-8 border-2 border-dashed border-[#E6E2D8] hover:border-[#D4A373] rounded-2xl bg-white flex flex-col items-center justify-center gap-3 cursor-pointer text-center shadow-sm">
              <Upload className="w-8 h-8 text-[#B8860B] animate-bounce" />
              <div className="text-xs text-[#1F1F1F] font-bold">Drag and drop any product photo here</div>
              <div className="text-[10px] text-[#706F6C]">Supports JPG, PNG, WEBP up to 20MB</div>
            </div>

            <div>
              <div className="text-xs text-[#1F1F1F] font-bold mb-2">Or test with a sample image:</div>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_PREVIEWS.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="sample"
                    onClick={() => handleSelectSample(img)}
                    className="aspect-square rounded-xl object-cover border border-[#E6E2D8] hover:border-[#B8860B] cursor-pointer transition-all hover:scale-105"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ANALYZING STATE */}
        {isAnalyzing && (
          <div className="p-8 rounded-2xl bg-white border border-[#E6E2D8] text-center space-y-3 shadow-sm">
            <Sparkles className="w-8 h-8 text-[#B8860B] animate-spin mx-auto" />
            <div className="text-xs font-bold text-[#1F1F1F]">Vision AI analyzing image features...</div>
            <div className="w-full bg-[#F6F4F0] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#B8860B] h-full w-2/3 animate-pulse" />
            </div>
          </div>
        )}

        {/* RESULTS DISPLAY */}
        {visionResult && !isAnalyzing && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E6E2D8] space-y-2 text-xs shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#B8860B]">Object Identified</span>
                <span className="text-emerald-700 font-bold">{visionResult.confidence} Match</span>
              </div>
              <div className="font-display font-extrabold text-sm text-[#1F1F1F]">{visionResult.objectDetected}</div>
              <div className="text-[#706F6C]">Est. Market Value: <span className="text-[#1F1F1F] font-bold">{visionResult.estimatedMarketPrice}</span></div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#1F1F1F] mb-2">Top Similar Live Listings:</div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {visionResult.matchedListings.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedListing(item);
                      setIsImageSearchOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-white border border-[#E6E2D8] hover:border-[#D4A373] flex items-center justify-between cursor-pointer transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-[#1F1F1F] text-xs truncate max-w-[200px]">{item.title}</div>
                        <div className="text-[10px] text-emerald-700 font-bold">${item.price.toLocaleString()}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B8860B]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
