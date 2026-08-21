import React, { createContext, useContext, useState } from 'react';
import { AIMessage } from '../types';
import { generateAIResponse } from '../data/mockAIResponses';
import { useMarketplace } from './MarketplaceContext';

interface AIContextType {
  messages: AIMessage[];
  isThinking: boolean;
  activeAgent: string;
  sendMessage: (text: string) => void;
  clearHistory: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { listings, setIsWorkspaceOpen } = useMarketplace();
  
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `👋 **Good morning, Sahitya! I am your TradeVerse AI Copilot.**

I can search 100,000+ vector listings, evaluate KBB price comps, negotiate counter-offers, and generate binding smart escrow contracts.

Try asking:
• *"Show me how TradeVerse AI works"*
• *"Find family SUV under $40k"*
• *"Compare laptops side-by-side"*`,
      timestamp: 'Just now',
      agentName: '✨ Copilot Master Orchestrator'
    }
  ]);

  const [isThinking, setIsThinking] = useState(false);
  const [activeAgent, setActiveAgent] = useState('Master Orchestrator Agent');

  const sendMessage = (userText: string) => {
    if (!userText.trim()) return;

    // Automatically open AI workspace drawer when user sends a message
    setIsWorkspaceOpen(true);

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    setTimeout(() => {
      const response = generateAIResponse(userText, listings);
      setActiveAgent(response.agentName || 'AI Copilot');

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        agentName: response.agentName,
        actionPayload: response.actionPayload,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 600);
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
