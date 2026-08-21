import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Briefcase, X, Mic, CheckCircle2, Sparkles, Upload } from 'lucide-react';

export const AIResumeInterviewModal: React.FC = () => {
  const { isResumeInterviewOpen, setIsResumeInterviewOpen, notify } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'resume' | 'interview'>('resume');
  const [atsScore, setAtsScore] = useState<number | null>(null);

  if (!isResumeInterviewOpen) return null;

  const handleAnalyzeResume = () => {
    setAtsScore(94);
    notify('🎯 Resume analyzed! ATS match score: 94%', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#F6F4F0] border border-[#E6E2D8] rounded-3xl p-6 shadow-2xl space-y-6">
        
        <button
          onClick={() => setIsResumeInterviewOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white hover:bg-[#EFECE6] text-[#706F6C] hover:text-[#1F1F1F]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#F2E4C9] text-[#B8860B] text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>AI Career & Interview Coach</span>
          </div>
          <h2 className="font-display font-bold text-xl text-[#1F1F1F]">ATS Resume Matcher & Voice Interview Practice</h2>
        </div>

        {/* TABS */}
        <div className="flex border-b border-[#E6E2D8] text-xs font-bold">
          <button
            onClick={() => setActiveTab('resume')}
            className={`py-2 px-4 border-b-2 transition-all ${
              activeTab === 'resume' ? 'border-[#B8860B] text-[#966F1E]' : 'border-transparent text-[#706F6C]'
            }`}
          >
            ATS Resume Matcher
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`py-2 px-4 border-b-2 transition-all ${
              activeTab === 'interview' ? 'border-[#B8860B] text-[#966F1E]' : 'border-transparent text-[#706F6C]'
            }`}
          >
            Voice Interview Coach
          </button>
        </div>

        {activeTab === 'resume' ? (
          <div className="space-y-4">
            <div 
              onClick={handleAnalyzeResume}
              className="p-8 border-2 border-dashed border-[#E6E2D8] hover:border-[#B8860B] rounded-2xl bg-white flex flex-col items-center justify-center gap-2 cursor-pointer text-center shadow-sm"
            >
              <Upload className="w-8 h-8 text-[#B8860B]" />
              <div className="text-xs font-bold text-[#1F1F1F]">Upload your Resume (PDF/DOCX)</div>
              <div className="text-[10px] text-[#706F6C]">Click to analyze against Staff AI Engineer role</div>
            </div>

            {atsScore && (
              <div className="p-4 rounded-2xl bg-white border border-[#E6E2D8] space-y-2 text-xs shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1F1F1F]">ATS Skill Match Score</span>
                  <span className="font-extrabold text-emerald-700 text-sm">{atsScore}%</span>
                </div>
                <div className="w-full bg-[#F6F4F0] rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${atsScore}%` }} />
                </div>
                <p className="text-[11px] text-[#706F6C] pt-1">
                  Strong alignment in TypeScript, React, Next.js, and Agent Architecture.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="p-6 rounded-2xl bg-white border border-[#E6E2D8] space-y-3 shadow-sm">
              <Mic className="w-8 h-8 text-[#B8860B] mx-auto animate-pulse" />
              <div className="font-bold text-xs text-[#1F1F1F]">"Describe a time you built an autonomous agent system using vector search."</div>
              <p className="text-[10px] text-[#706F6C]">AI Coach is listening to evaluate technical depth & communication clarity.</p>
            </div>

            <button
              onClick={() => {
                notify('🎙️ Mock interview practice response recorded!', 'success');
                setIsResumeInterviewOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4A373] to-[#B8860B] text-white font-bold text-xs shadow-md"
            >
              Finish Interview Practice
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
