import React, { useState, useRef, useEffect } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { ChatMarkdown } from './ChatMarkdown';
import { 
  Bot, 
  X, 
  Sparkles, 
  FileText, 
  History, 
  ChevronRight, 
  Send, 
  RotateCcw,
  Clock,
  Layers,
  Briefcase,
  Handshake,
  CheckCircle2
} from 'lucide-react';

export const AIWorkspacePanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { setSelectedListing, setIsComparisonModalOpen, setIsResumeInterviewOpen, setIsContractModalOpen, setIsNegotiatorModalOpen } = useMarketplace();
  const { messages, isThinking, activeAgent, sendMessage, clearHistory } = useAI();
  const [activeTab, setActiveTab] = useState<'conversations' | 'tasks' | 'contracts'>('conversations');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="fixed top-20 right-0 bottom-0 z-40 w-full sm:w-[450px] bg-[#F6F4F0] border-l border-[#E6E2D8] flex flex-col shadow-2xl animate-quiet-fade">
      
      {/* WARM PANEL HEADER */}
      <div className="p-4 bg-white border-b border-[#E6E2D8] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-[#1F1F1F] flex items-center gap-2">
              <span>AI Copilot Workspace</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[10px] text-[#706F6C] font-medium">{activeAgent}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl bg-[#F6F4F0] hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F] transition-colors cursor-pointer"
          title="Close AI Workspace (ESC)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* WARM TAB STRIP */}
      <div className="flex border-b border-[#E6E2D8] bg-white/70 text-xs">
        <button
          onClick={() => setActiveTab('conversations')}
          className={`flex-1 py-2.5 font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'conversations' ? 'border-[#B8860B] text-[#966F1E]' : 'border-transparent text-[#706F6C]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Chat Log</span>
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-2.5 font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'tasks' ? 'border-[#B8860B] text-[#966F1E]' : 'border-transparent text-[#706F6C]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Tasks (3)</span>
        </button>

        <button
          onClick={() => setActiveTab('contracts')}
          className={`flex-1 py-2.5 font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'contracts' ? 'border-[#B8860B] text-[#966F1E]' : 'border-transparent text-[#706F6C]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Contracts</span>
        </button>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        
        {activeTab === 'conversations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] text-[#706F6C] font-bold uppercase">
              <span>Live Multi-Agent Conversation</span>
              <button onClick={clearHistory} className="text-[#A09E97] hover:text-[#1F1F1F] flex items-center gap-1 cursor-pointer">
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>

            {messages.map(msg => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-[#FFF9EE] border-[#F2E4C9] text-[#966F1E] font-medium ml-6 shadow-sm'
                    : 'bg-white border-[#E6E2D8] text-[#1F1F1F] mr-2 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-[#706F6C] font-bold">
                  <span className="flex items-center gap-1 text-[#B8860B]">
                    <Sparkles className="w-3 h-3 text-[#B8860B]" /> {msg.sender === 'user' ? 'You' : msg.agentName || 'AI Copilot'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                {msg.sender === 'user' ? <div className="whitespace-pre-wrap">{msg.text}</div> : <ChatMarkdown text={msg.text} />}

                {/* ARCHITECTURE DEMO ACTION PAYLOAD */}
                {msg.actionPayload?.type === 'architecture_demo' && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-[#E6E2D8]">
                    <div className="text-[10px] font-bold text-[#706F6C] uppercase">Interactive Copilot Demos:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setIsComparisonModalOpen(true)} className="p-2 rounded-xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-[#FFF2D7]">
                        <Layers className="w-3.5 h-3.5" /> <span>Spec Comparison</span>
                      </button>
                      <button onClick={() => setIsContractModalOpen(true)} className="p-2 rounded-xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-[#FFF2D7]">
                        <FileText className="w-3.5 h-3.5" /> <span>Smart Contract</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ACTION ATTACHMENT INLINE PREVIEWS */}
                {msg.actionPayload?.type === 'listing_grid' && msg.actionPayload.data && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-[#E6E2D8]">
                    <div className="text-[10px] font-bold text-[#706F6C] uppercase">Matched Options ({msg.actionPayload.data.length}):</div>
                    
                    {msg.actionPayload.data.map((item: any) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedListing(item)}
                        className="p-2.5 rounded-xl bg-[#F6F4F0] border border-[#E6E2D8] hover:border-[#D4A373] flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01]"
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold text-[#1F1F1F] text-xs truncate max-w-[200px]">{item.title}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-emerald-700 font-bold text-xs">${item.price.toLocaleString()}</span>
                              <span className="text-[10px] text-[#706F6C]">{item.location}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#A09E97]" />
                      </div>
                    ))}
                  </div>
                )}

                {msg.actionPayload?.type === 'comparison' && (
                  <button
                    onClick={() => setIsComparisonModalOpen(true)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFF2D7] transition-all cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Open Side-by-Side Spec Comparison</span>
                  </button>
                )}

                {msg.actionPayload?.type === 'resume_analysis' && (
                  <button
                    onClick={() => setIsResumeInterviewOpen(true)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FFF9EE] border border-[#F2E4C9] text-[#966F1E] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFF2D7] transition-all cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Launch AI Resume Matcher & Interview Coach</span>
                  </button>
                )}

              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-[#706F6C] p-3 rounded-2xl bg-white border border-[#E6E2D8] w-fit text-xs">
                <Sparkles className="w-4 h-4 text-[#B8860B] animate-spin" />
                <span>AI Agent thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-3">
            <div className="text-[11px] text-[#706F6C] font-bold uppercase">Active AI Tasks</div>
            
            <div className="p-3 rounded-2xl bg-white border border-[#E6E2D8] space-y-1 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1F1F1F]">Tesla Model Y KBB Comps</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-bold border border-emerald-500/20">Completed</span>
              </div>
              <p className="text-[#706F6C] text-[11px]">Fair market range $38,500 - $44,000 computed.</p>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#E6E2D8] space-y-1 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1F1F1F]">Waterfront Villa Lease Draft</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-bold border border-amber-500/20">In Progress</span>
              </div>
              <p className="text-[#706F6C] text-[11px]">Awaiting buyer digital signature.</p>
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="space-y-3">
            <div className="text-[11px] text-[#706F6C] font-bold uppercase">Saved Smart Agreements</div>
            
            <div className="p-3 rounded-2xl bg-white border border-[#E6E2D8] flex items-center justify-between cursor-pointer hover:border-[#D4A373] shadow-sm">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#B8860B]" />
                <div>
                  <div className="font-bold text-[#1F1F1F] text-xs">Residential Lease #TV-9918</div>
                  <div className="text-[10px] text-[#706F6C]">San Diego Villa ($1.25M)</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#A09E97]" />
            </div>
          </div>
        )}

      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E6E2D8] flex items-center gap-2 shadow-sm">
        <input
          type="text"
          placeholder="Ask AI Copilot follow-up question..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-[#F6F4F0] border border-[#E6E2D8] rounded-xl px-3 py-2 text-xs text-[#1F1F1F] placeholder-[#A09E97] focus:outline-none focus:border-[#D4A373]"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] hover:opacity-90 disabled:opacity-40 text-white font-bold transition-all shadow-sm cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
