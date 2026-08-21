import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { 
  Command, 
  Search, 
  Mic, 
  Camera, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  History,
  Bookmark
} from 'lucide-react';

interface RaycastCommandHeroProps {
  onOpenCommandPalette: () => void;
}

export const RaycastCommandHero: React.FC<RaycastCommandHeroProps> = ({ onOpenCommandPalette }) => {
  const { filters, setFilters, setIsVoiceSearchOpen, setIsImageSearchOpen, setIsCreateListingOpen, setIsWorkspaceOpen } = useMarketplace();
  const { sendMessage } = useAI();

  // Rotating placeholder prompts
  const PROMPT_EXAMPLES = [
    'I need a family SUV under $40k',
    'Find a 2-bedroom apartment near downtown',
    'Compare iPhone 16 vs Pixel 9 Pro',
    'Find remote Staff React Engineer jobs',
    'Sell my MacBook Pro M3 Max'
  ];

  const [exampleIdx, setExampleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setExampleIdx(prev => (prev + 1) % PROMPT_EXAMPLES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // AI Thinking Timeline state
  const [isTyping, setIsTyping] = useState(false);
  const [timelineStep, setTimelineStep] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFilters(prev => ({ ...prev, searchQuery: val }));

    if (val.trim().length > 1) {
      setIsTyping(true);
      setTimelineStep(1);
      setTimeout(() => setTimelineStep(2), 200);
      setTimeout(() => setTimelineStep(3), 400);
      setTimeout(() => setTimelineStep(4), 600);
    } else {
      setIsTyping(false);
      setTimelineStep(0);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = filters.searchQuery.trim() || PROMPT_EXAMPLES[exampleIdx];
    setFilters(prev => ({ ...prev, searchQuery: q }));
    sendMessage(q);
    setIsWorkspaceOpen(true);
  };

  const handlePromptClick = (p: string) => {
    setFilters(prev => ({ ...prev, searchQuery: p }));
    sendMessage(p);
    setIsWorkspaceOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* HERO GREETING CONTAINER */}
      <div className="relative rounded-3xl linear-card p-8 sm:p-12 text-center space-y-6 bg-gradient-to-b from-[#121826] via-[#0A0E17] to-[#0A0E17] border border-[#2A3245]">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121826] border border-[#2A3245] text-xs font-semibold text-gray-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>AI-Native Commerce Platform</span>
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Good Evening 👋
          </h1>
          <p className="text-lg text-gray-400 font-medium">
            Welcome back. What would you like to accomplish today?
          </p>
        </div>

        {/* RAYCAST LARGE COMMAND BAR INPUT */}
        <div className="max-w-3xl mx-auto space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Try: "${PROMPT_EXAMPLES[exampleIdx]}"...`}
              value={filters.searchQuery}
              onChange={handleInputChange}
              className="w-full pl-14 pr-44 py-4 rounded-2xl bg-[#0A0E17] border-2 border-[#2A3245] focus:border-blue-500 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-base font-medium shadow-2xl transition-all"
            />

            <div className="absolute right-3 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsVoiceSearchOpen(true)}
                className="p-2 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-[#121826] transition-colors"
                title="Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsImageSearchOpen(true)}
                className="p-2 rounded-xl text-gray-400 hover:text-indigo-400 hover:bg-[#121826] transition-colors"
                title="Upload Photo / Vision AI"
              >
                <Camera className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsCreateListingOpen(true)}
                className="p-2 rounded-xl text-gray-400 hover:text-emerald-400 hover:bg-[#121826] transition-colors"
                title="Upload Document / Create Listing"
              >
                <FileText className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl accent-gradient-bg text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-blue-500/20 hover:scale-105 transition-transform"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* PROGRESSIVE AI REASONING TIMELINE */}
          {isTyping && (
            <div className="p-4 rounded-2xl bg-[#121826] border border-[#2A3245] text-xs space-y-2 text-left animate-quiet-fade">
              <div className="text-gray-400 font-bold text-[11px] uppercase tracking-wider">AI Reasoning Progress:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className={`flex items-center gap-1.5 ${timelineStep >= 1 ? 'text-blue-400' : 'text-gray-600'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1. Intent Parsed
                </div>
                <div className={`flex items-center gap-1.5 ${timelineStep >= 2 ? 'text-indigo-400' : 'text-gray-600'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2. Searching Vector DB
                </div>
                <div className={`flex items-center gap-1.5 ${timelineStep >= 3 ? 'text-purple-400' : 'text-gray-600'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 3. Pricing KBB Comps
                </div>
                <div className={`flex items-center gap-1.5 ${timelineStep >= 4 ? 'text-emerald-400' : 'text-gray-600'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4. Results Streamed
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QUICK SUGGESTIONS & RECENT SEARCHES */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs pt-2">
          <span className="text-gray-500 font-semibold text-[11px]">Quick Prompts:</span>
          {PROMPT_EXAMPLES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handlePromptClick(p)}
              className="px-3 py-1.5 rounded-xl bg-[#121826] border border-[#2A3245] text-gray-300 hover:text-white hover:border-gray-600 hover:scale-105 transition-all font-medium cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
