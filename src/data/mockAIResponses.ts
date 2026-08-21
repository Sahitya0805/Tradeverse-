import { ListingItem } from '../types';

export interface AIResponseMessage {
  text: string;
  agentName: string;
  actionPayload?: {
    type: 'listing_grid' | 'comparison' | 'contract' | 'negotiation' | 'valuation' | 'resume_analysis' | 'architecture_demo';
    data?: any;
  };
}

export function generateAIResponse(userQuery: string, listings: ListingItem[]): AIResponseMessage {
  const queryLower = userQuery.toLowerCase().trim();

  // 1. INTENT: PLATFORM EXPLANATION & "HOW IT WORKS"
  if (
    queryLower.includes('how tradeverse ai works') ||
    queryLower.includes('how tradeverse works') ||
    queryLower.includes('how it works') ||
    queryLower.includes('how does it work') ||
    queryLower.includes('what is tradeverse') ||
    queryLower.includes('explain tradeverse') ||
    queryLower.includes('architecture') ||
    queryLower.includes('overview')
  ) {
    return {
      agentName: '✨ TradeVerse Architecture Copilot',
      text: `🤖 **Here is how TradeVerse AI revolutionizes commerce:**

TradeVerse AI is an **AI-native marketplace** where specialized autonomous agents handle search, pricing, negotiation, and smart legal contracts:

1. 🔍 **Multi-Agent Search Network**:
   Converse naturally in plain English, voice, or vision. Our Search Agent scans vector embeddings across Vehicles, Real Estate, Jobs, Electronics, and Services.

2. 💰 **Dynamic Valuation & Price Comps**:
   Our Pricing Agent evaluates regional market comps, KBB resale trends, and historical depreciation to identify verified below-market bargains.

3. 🤝 **Counter-Offer AI Negotiator**:
   Our Negotiator Agent formulates data-backed counter offers (5%, 8%, or 12% off) and coordinates directly with verified sellers.

4. 📜 **Automated Smart Escrow Contracts**:
   Our Legal Agent generates binding purchase agreements & lease contracts with cryptographic signatures and 7-day buyer inspection protection.`,
      actionPayload: {
        type: 'architecture_demo',
        data: {
          capabilities: [
            'Conversational Commerce Search',
            'Side-by-Side Spec Comparison Matrix',
            'AI Counter-Offer Negotiator',
            'Smart Escrow Legal Contracts'
          ]
        }
      }
    };
  }

  // 2. INTENT: ESCROW & SMART CONTRACTS FAQ
  if (
    queryLower.includes('escrow') ||
    queryLower.includes('contract') ||
    queryLower.includes('agreement') ||
    queryLower.includes('legal') ||
    queryLower.includes('is it safe') ||
    queryLower.includes('buyer protection')
  ) {
    const targetItem = listings[0];
    return {
      agentName: '📜 Smart Escrow Legal Agent',
      text: `🛡️ **TradeVerse Smart Escrow & Legal Contracts:**

Every high-value transaction on TradeVerse AI is protected by **Smart Escrow & Automated Legal Contracts**:

• **7-Day Inspection Protection**: Funds are held securely in TradeVerse Escrow until you inspect and approve the item.
• **Cryptographic E-Signatures**: Agreements are legally binding under the US ESIGN Act and EU eIDAS regulations.
• **PDF Generation**: Instantly download signed contracts as official PDFs.
• **Zero Scams**: Seller receives payment only after buyer confirmation.

Would you like me to generate a sample agreement for **${targetItem.title}**?`,
      actionPayload: {
        type: 'contract',
        data: targetItem
      }
    };
  }

  // 3. INTENT: NEGOTIATION & COUNTER OFFERS FAQ
  if (
    queryLower.includes('negotiat') ||
    queryLower.includes('counter offer') ||
    queryLower.includes('discount') ||
    queryLower.includes('lower price') ||
    queryLower.includes('bargain') ||
    queryLower.includes('haggling')
  ) {
    const targetItem = listings[0];
    return {
      agentName: '🤝 Counter-Offer Negotiator Agent',
      text: `🤝 **AI Autonomous Price Negotiation:**

TradeVerse AI features an integrated **Counter-Offer Negotiator** that acts as your private buying agent:

• **Data-Backed Discounting**: The AI analyzes active comps and regional sales data to calculate realistic discount targets (5%, 8%, or 12% below asking).
• **Automated Seller Dispatch**: Once approved, your counter-offer is dispatched directly to verified sellers with full rationale.
• **Instant Settlement**: Accept, counter, or settle negotiations in 1-click.

Example: For **${targetItem.title}** ($${targetItem.price.toLocaleString()}), I recommend a counter-offer of **$${Math.round(targetItem.price * 0.93).toLocaleString()}** (7% savings).`,
      actionPayload: {
        type: 'negotiation',
        data: targetItem
      }
    };
  }

  // 4. INTENT: VALUATION & PRICE COMPS FAQ
  if (
    queryLower.includes('valuation') ||
    queryLower.includes('price comp') ||
    queryLower.includes('kbb') ||
    queryLower.includes('depreciation') ||
    queryLower.includes('deal score') ||
    queryLower.includes('worth')
  ) {
    return {
      agentName: '💰 Price Valuation & Comps Agent',
      text: `💰 **AI Price Valuation & Market Intelligence:**

TradeVerse AI evaluates every listing against real-time market data to calculate:

• **Deal Score**: Classified as *Great Deal*, *Fair Price*, or *Hot Find* based on regional sales averages.
• **Trust Score**: Evaluated from 0-100% using seller KYC verification, historical delivery records, and image fraud checks.
• **3-Year Depreciation Index**: Forecasts resale value preservation for vehicles, real estate, and tech.

Want to check valuation comps for a specific item? Ask me e.g. "Estimate resale for Tesla Model Y" or "MacBook Air valuation".`,
      actionPayload: {
        type: 'listing_grid',
        data: listings.slice(0, 3)
      }
    };
  }

  // 5. INTENT: POSTING LISTINGS & VISION AI
  if (
    queryLower.includes('post listing') ||
    queryLower.includes('how to sell') ||
    queryLower.includes('create listing') ||
    queryLower.includes('vision ai') ||
    queryLower.includes('upload photo') ||
    queryLower.includes('seller fees')
  ) {
    return {
      agentName: '✨ 1-Click Vision AI Listing Agent',
      text: `📸 **Posting Listings on TradeVerse AI:**

Selling on TradeVerse is effortless thanks to **1-Click Vision AI**:

1. **Upload Photo**: Drag or capture a photo of your item (car, laptop, home, or equipment).
2. **Auto-Fill Details**: Vision AI instantly identifies item model, condition, suggested pricing range, and writes a professional description.
3. **0% Commission**: Post listings for free with instant buyer exposure.

Click the **+ Post Listing** button in the top navbar or try our Vision AI dropzone to get started!`,
      actionPayload: {
        type: 'architecture_demo'
      }
    };
  }

  // 6. INTENT: USER ROLES & PRO MEMBERSHIP
  if (
    queryLower.includes('pro') ||
    queryLower.includes('membership') ||
    queryLower.includes('role') ||
    queryLower.includes('seller mode') ||
    queryLower.includes('business mode') ||
    queryLower.includes('admin')
  ) {
    return {
      agentName: '👑 Account & Tier Copilot',
      text: `👤 **TradeVerse User Modes & Pro Membership:**

TradeVerse AI supports 4 integrated operational modes:

• 👤 **Buyer Mode**: Search listings, compare specs, run AI negotiations, and sign smart contracts.
• 🏷️ **Seller Mode**: Manage item inventory, auto-reprice listings, and respond to buyer offers.
• 🏢 **Business CRM Mode**: Enterprise GMV analytics, buyer lead tracking, and API integration.
• 🛡️ **Admin Control Center**: SOC2 security logs, AI network status, and automated fraud review.

⭐ **TradeVerse Pro**: Unlocks priority AI agent execution, 0% seller escrow fees, and daily PDF market reports.`,
      actionPayload: {
        type: 'architecture_demo'
      }
    };
  }

  // 7. INTENT: GREETING & GENERAL CAPABILITIES
  if (
    queryLower === 'hi' ||
    queryLower === 'hello' ||
    queryLower.includes('help') ||
    queryLower.includes('what can you do') ||
    queryLower.includes('capabilities') ||
    queryLower.includes('features')
  ) {
    return {
      agentName: '✨ TradeVerse Copilot',
      text: `👋 Hello Sahitya! I am your **TradeVerse AI Copilot**. I can answer ANY question about the platform and help you navigate:

• 🚗 **Vehicles**: "Find Tesla Model Y under $40k"
• 🏠 **Real Estate**: "2BHK apartment in San Diego"
• 💼 **Careers**: "Staff AI Engineer remote jobs"
• 📱 **Electronics**: "MacBook Air M3 deals"
• 📊 **Comparisons**: "Compare laptops side by side"
• 📜 **Escrow & Legal**: "How does smart escrow work?"
• 🤝 **Negotiation**: "How does AI counter-offer work?"

What would you like assistance with today?`,
      actionPayload: {
        type: 'listing_grid',
        data: listings.slice(0, 3)
      }
    };
  }

  // 8. INTENT: SPEC COMPARISON
  if (queryLower.includes('compare') || queryLower.includes('comparison') || queryLower.includes('versus') || queryLower.includes('vs')) {
    const compareMatches = listings.slice(0, 2);
    return {
      agentName: '📊 SPEC COMPARISON AGENT',
      text: `I have compiled a side-by-side specification comparison matrix for your review:

• **Item A**: ${compareMatches[0]?.title || 'Tesla Model Y'} ($${compareMatches[0]?.price.toLocaleString() || '39,500'})
• **Item B**: ${compareMatches[1]?.title || 'Modern Waterfront Villa'} ($${compareMatches[1]?.price.toLocaleString() || '1,250,000'})

Click the button below to view full spec metrics, pros/cons, and trust scores.`,
      actionPayload: {
        type: 'comparison',
        data: compareMatches
      }
    };
  }

  // 9. INTENT: CAREERS & RESUME MATCHING
  if (queryLower.includes('resume') || queryLower.includes('interview') || queryLower.includes('ats')) {
    return {
      agentName: '💼 CAREER & ATS MATCH AGENT',
      text: `I am ready to evaluate your resume against top tech listings on TradeVerse Careers. 

Upload your PDF/DOCX resume to run instant ATS skill matching and practice voice technical interviews.`,
      actionPayload: {
        type: 'resume_analysis'
      }
    };
  }

  // 10. DYNAMIC CATEGORY & BUDGET LISTING SEARCH
  let categoryFilter: string | null = null;
  if (queryLower.includes('car') || queryLower.includes('suv') || queryLower.includes('tesla') || queryLower.includes('vehicle') || queryLower.includes('auto') || queryLower.includes('truck')) {
    categoryFilter = 'vehicles';
  } else if (queryLower.includes('house') || queryLower.includes('home') || queryLower.includes('apartment') || queryLower.includes('villa') || queryLower.includes('estate') || queryLower.includes('bhk') || queryLower.includes('rent')) {
    categoryFilter = 'real-estate';
  } else if (queryLower.includes('job') || queryLower.includes('engineer') || queryLower.includes('developer') || queryLower.includes('career') || queryLower.includes('role') || queryLower.includes('architect')) {
    categoryFilter = 'jobs';
  } else if (queryLower.includes('laptop') || queryLower.includes('macbook') || queryLower.includes('phone') || queryLower.includes('tv') || queryLower.includes('electronic') || queryLower.includes('apple')) {
    categoryFilter = 'electronics';
  } else if (queryLower.includes('service') || queryLower.includes('repair') || queryLower.includes('plumb') || queryLower.includes('design')) {
    categoryFilter = 'services';
  } else if (queryLower.includes('pet') || queryLower.includes('dog') || queryLower.includes('cat') || queryLower.includes('puppy')) {
    categoryFilter = 'pets';
  } else if (queryLower.includes('business') || queryLower.includes('franchise') || queryLower.includes('commercial')) {
    categoryFilter = 'business';
  }

  // Extract budget limit e.g. "$40k", "$40000", "under 40000"
  let maxPrice: number | null = null;
  const priceMatch = queryLower.match(/(\$?(\d+)\s*k)|(\$?(\d+[\d,]*))/);
  if (priceMatch) {
    if (priceMatch[1] && priceMatch[2]) {
      maxPrice = parseInt(priceMatch[2], 10) * 1000;
    } else if (priceMatch[3]) {
      const numStr = priceMatch[3].replace(/[$,]/g, '');
      const parsed = parseInt(numStr, 10);
      if (parsed > 100) maxPrice = parsed;
    }
  }

  // Filter listings
  let matches = listings.filter(l => {
    if (categoryFilter && l.category !== categoryFilter) return false;
    if (maxPrice && l.price > maxPrice) return false;
    return true;
  });

  // Fallback if no exact match
  if (matches.length === 0) {
    matches = listings.slice(0, 3);
  }

  const categoryName = categoryFilter ? categoryFilter.toUpperCase() : 'MARKETPLACE CATALOG';
  const agentName = categoryFilter ? `${categoryFilter.toUpperCase()} Search Agent` : '✨ SEARCH & DISCOVERY AGENT';
  
  const avgPrice = Math.round(matches.reduce((acc, curr) => acc + curr.price, 0) / (matches.length || 1));
  const minItem = [...matches].sort((a, b) => a.price - b.price)[0];
  const maxTrustItem = [...matches].sort((a, b) => Number(b.aiMetrics.trustScore) - Number(a.aiMetrics.trustScore))[0];

  return {
    agentName: `✨ ${agentName}`,
    text: `🔍 **Dynamic Search Results for "${userQuery}"**:

I evaluated **${listings.length} live listings** in category **${categoryName}** and computed **${matches.length} matching options**:

• **Average Category Price**: $${avgPrice.toLocaleString()}
• **Top Value Find**: ${minItem?.title || 'Bargain Item'} ($${minItem?.price.toLocaleString() || '0'})
• **Highest Trust Score**: ${maxTrustItem?.title || 'Verified Item'} (${maxTrustItem?.aiMetrics.trustScore || 99}% Verified)

Here are the top options matching your query:`,
    actionPayload: {
      type: 'listing_grid',
      data: matches
    }
  };
}
