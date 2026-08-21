import React, { useState, useRef, useEffect } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  Camera, 
  Sparkles, 
  Layers, 
  Briefcase, 
  RotateCcw,
  ChevronRight
} from 'lucide-react';

export const AICopilotDrawer: React.FC = () => {
  const { 
    isWorkspaceOpen, 
    setIsWorkspaceOpen, 
    setIsVoiceSearchOpen, 
    setIsImageSearchOpen,
    setIsComparisonModalOpen,
    setIsResumeInterviewOpen,
    setSelectedListing
  } = useMarketplace();

  const { messages, isThinking, activeAgent, sendMessage, clearHistory } = useAI();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isWorkspaceOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const PROMPT_CHIPS = [
    '🚗 Family SUV under $40k',
    '🏠 Waterfront villa in San Diego',
    '📊 Compare Tesla Model Y vs Porsche',
    '💼 Remote Staff AI Engineer jobs',
    '🤝 Negotiate MacBook Pro price',
    '📜 Draft residential lease contract'
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 w-full sm:w-[440px] h-[620px] bg-[#121826] border border-blue-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-quiet-fade">
      
      {/* DRAWER HEADER */}
      <div className="p-4 bg-[#0A0E17] border-b border-[#2A3245] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-display font-bold text-sm text-white">
              <span>TradeVerse AI Copilot</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{activeAgent}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearHistory}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2A3245] transition-colors"
            title="Clear Chat History"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsWorkspaceOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2A3245] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MESSAGES BODY */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.agentName && (
              <div className="flex items-center gap-1 text-[10px] text-blue-400 font-bold mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{msg.agentName}</span>
              </div>
            )}

            <div
              className={`max-w-[90%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-blue-600/30 border border-blue-500/50 text-white rounded-br-none'
                  : 'bg-[#0A0E17] border border-[#2A3245] text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.text}

              {/* ACTION PAYLOAD INLINE ATTACHMENTS */}
              {msg.actionPayload?.type === 'listing_grid' && msg.actionPayload.data && (
                <div className="mt-3 space-y-2 pt-2 border-t border-[#2A3245]">
                  {msg.actionPayload.data.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedListing(item)}
                      className="p-2 rounded-xl bg-[#121826] border border-[#2A3245] hover:border-blue-500/50 flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.images[0]} alt={item.title} className="w-9 h-9 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-white text-xs truncate max-w-[170px]">{item.title}</div>
                          <div className="text-[10px] text-emerald-400 font-bold">${item.price.toLocaleString()}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  ))}
                </div>
              )}

              {msg.actionPayload?.type === 'comparison' && (
                <button
                  onClick={() => setIsComparisonModalOpen(true)}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-purple-600/30 transition-all"
                >
                  <Layers className="w-4 h-4" />
                  <span>Open Side-by-Side Comparison</span>
                </button>
              )}

              {msg.actionPayload?.type === 'resume_analysis' && (
                <button
                  onClick={() => setIsResumeInterviewOpen(true)}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-600/30 transition-all"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Launch AI Resume Matcher & Interview Coach</span>
                </button>
              )}
            </div>

            <span className="text-[9px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-gray-400 p-3 rounded-2xl bg-[#0A0E17] border border-[#2A3245] w-fit text-xs">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
            <span>AI Agent thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* PROMPT QUICK CHIPS */}
      <div className="px-4 py-2 bg-[#0A0E17] border-t border-[#2A3245] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {PROMPT_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(chip)}
            className="px-2.5 py-1 rounded-full bg-[#121826] border border-[#2A3245] text-[10px] text-gray-300 hover:text-white hover:border-blue-500/40 whitespace-nowrap transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* INPUT FORM WITH MIC & VISION CAMERA BUTTONS */}
      <form onSubmit={handleSend} className="p-3 bg-[#0A0E17] border-t border-[#2A3245] flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsVoiceSearchOpen(true)}
          className="p-2 rounded-xl bg-[#121826] hover:bg-[#2A3245] text-gray-400 hover:text-cyan-400 transition-colors"
          title="Voice Command"
        >
          <Mic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setIsImageSearchOpen(true)}
          className="p-2 rounded-xl bg-[#121826] hover:bg-[#2A3245] text-gray-400 hover:text-purple-400 transition-colors"
          title="AI Visual Search"
        >
          <Camera className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder="Ask AI anything..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-[#121826] border border-[#2A3245] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-xl accent-gradient-bg hover:opacity-90 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-blue-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
