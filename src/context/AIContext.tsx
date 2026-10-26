import React, { createContext, useContext, useState } from 'react';
import { AIMessage, Listing } from '../types';
import { generateAIResponse } from '../data/mockAIResponses';
import { API_BASE, useMarketplace } from './MarketplaceContext';

interface AIContextType {
  messages: AIMessage[];
  isThinking: boolean;
  activeAgent: string;
  sendMessage: (text: string) => void;
  clearHistory: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

const CLAUDE_AGENT = '✨ TradeVerse Copilot (Claude)';
const OFFLINE_AGENT = 'Offline demo mode';

const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { listings, setIsWorkspaceOpen } = useMarketplace();

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `👋 **Hi! I am your TradeVerse AI Copilot.**

I can search the marketplace, compare listings and explain what you're looking at.

Try asking:
• *"Find a family SUV under $40k"*
• *"What laptops do you have?"*
• *"Compare the cheapest two apartments"*`,
      timestamp: 'Just now',
      agentName: CLAUDE_AGENT
    }
  ]);

  const [isThinking, setIsThinking] = useState(false);
  const [activeAgent, setActiveAgent] = useState(CLAUDE_AGENT);

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    // Automatically open AI workspace drawer when user sends a message
    setIsWorkspaceOpen(true);

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: timestamp()
    };

    const history = [...messages.filter(m => m.id !== 'welcome-1'), userMsg].map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    let aiMsg: AIMessage;
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await res.json();

      if (res.status === 503) {
        // No API key configured on the server: fall back to the scripted demo replies
        throw new Error(data.error);
      }

      const shown: Listing[] = data.listings || [];
      aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.ok ? data.text : `⚠️ ${data.error || 'Something went wrong.'}`,
        agentName: CLAUDE_AGENT,
        actionPayload: shown.length > 0 ? { type: 'listing_grid', data: shown } : undefined,
        timestamp: timestamp()
      };
      setActiveAgent(CLAUDE_AGENT);
    } catch (e) {
      const response = generateAIResponse(userText, listings);
      aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        agentName: `${response.agentName || 'AI Copilot'} · ${OFFLINE_AGENT}`,
        actionPayload: response.actionPayload,
        timestamp: timestamp()
      };
      setActiveAgent(OFFLINE_AGENT);
    }

    setMessages(prev => [...prev, aiMsg]);
    setIsThinking(false);
  };

  const clearHistory = () => {
    setMessages([]);
  };

  return (
    <AIContext.Provider value={{ messages, isThinking, activeAgent, sendMessage, clearHistory }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within AIProvider');
  return context;
};
