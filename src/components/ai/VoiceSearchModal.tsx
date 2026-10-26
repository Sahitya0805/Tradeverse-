import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAI } from '../../context/AIContext';
import { Mic, X, Sparkles, Volume2 } from 'lucide-react';

export const VoiceSearchModal: React.FC = () => {
  const { isVoiceSearchOpen, setIsVoiceSearchOpen } = useMarketplace();
  const { sendMessage } = useAI();
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('Listening... Speak naturally (e.g. "Find me a family SUV under $40,000")');

  useEffect(() => {
    if (isVoiceSearchOpen) {
      setIsListening(true);
      const timer = setTimeout(() => {
        setTranscript('Find apartments under $2800 near Camana Bay with pet friendly policy');
        setIsListening(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVoiceSearchOpen]);

  if (!isVoiceSearchOpen) return null;

  const handleExecuteVoiceQuery = () => {
    if (transcript && transcript !== 'Listening...') {
      sendMessage(transcript);
      setIsVoiceSearchOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl p-6 shadow-2xl space-y-6 text-center">
        
        <button
          onClick={() => setIsVoiceSearchOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
            <Volume2 className="w-3.5 h-3.5" />
            <span>AI Voice Assistant</span>
          </div>
          <h2 className="font-display font-bold text-xl text-[#1F1F1F]">Talk Naturally to TradeVerse</h2>
        </div>

        {/* VOICE WAVEFORM VISUALIZER */}
        <div className="py-6 flex items-center justify-center gap-2 h-20">
          {isListening ? (
            <>
              <div className="w-2 rounded-full bg-[#D4A373] voice-bar" />
              <div className="w-2 rounded-full bg-[#B8860B] voice-bar" />
              <div className="w-2 rounded-full bg-[#966F1E] voice-bar" />
              <div className="w-2 rounded-full bg-[#C59B27] voice-bar" />
              <div className="w-2 rounded-full bg-[#D4A373] voice-bar" />
            </>
          ) : (
            <div className="p-4 rounded-full bg-[#FFF9EE] text-[#B8860B] border border-[#F2E4C9]">
              <Mic className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* TRANSCRIPT DISPLAY */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6E2D8] text-xs text-[#1F1F1F] italic min-h-[70px] flex items-center justify-center font-medium shadow-sm">
          "{transcript}"
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsListening(true);
              setTranscript('Listening... Speak naturally');
            }}
            className="flex-1 py-3 rounded-2xl bg-white hover:bg-[#EFECE6] text-[#1F1F1F] border border-[#E6E2D8] text-xs font-bold shadow-sm"
          >
            {isListening ? 'Stop' : 'Re-record'}
          </button>

          <button
            onClick={handleExecuteVoiceQuery}
            disabled={isListening}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Submit Voice Query</span>
          </button>
        </div>

      </div>
    </div>
  );
};
