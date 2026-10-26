import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { getAllListings } from '../services/listingImport.js';

const router = express.Router();

const MODEL = 'claude-opus-5-5';
const MAX_TOOL_ROUNDS = 6;
const MAX_HISTORY_MESSAGES = 20;

const SYSTEM_PROMPT = `You are the TradeVerse AI Copilot, a shopping assistant for a classifieds marketplace.
Help people find, compare and understand listings. Use the search_listings and get_listing tools to look things up; never invent listings, prices or seller details.
When you recommend specific listings, call show_listings with their ids so they appear as cards under your reply.
If nothing matches, say so and suggest how to broaden the search.
Listings whose source is "demo" are sample data, not real offers; mention that if someone asks whether a listing is real or how to buy it.
Keep replies short and conversational (a few sentences or a brief list). Prices are in USD.`;

const TOOLS = [
  {
    name: 'search_listings',
    description: 'Search marketplace listings by keywords, category and price range. Returns up to `limit` matches, best first.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keywords, e.g. "family SUV" or "2 bedroom condo". Empty to list by filters only.' },
        category: {
          type: 'string',
          enum: ['vehicles', 'real-estate', 'jobs', 'electronics', 'services', 'pets', 'business', 'community'],
          description: 'Optional category filter.'
        },
        min_price: { type: 'number', description: 'Optional minimum price.' },
        max_price: { type: 'number', description: 'Optional maximum price.' },
        limit: { type: 'integer', description: 'Max results, 1-10. Default 5.' }
      },
      additionalProperties: false
    }
  },
  {
    name: 'get_listing',
    description: 'Get full details for one listing by id, including description, specs and seller.',
    input_schema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
      additionalProperties: false
    }
  },
  {
    name: 'show_listings',
    description: 'Display listings to the user as clickable cards under your reply. Call once with the ids you recommend (max 6).',
    input_schema: {
      type: 'object',
      properties: { ids: { type: 'array', items: { type: 'string' } } },
      required: ['ids'],
      additionalProperties: false
    }
  }
];

function summarize(l) {
  return {
    id: l.id,
    title: l.title,
    price: l.price,
    priceType: l.priceType,
    category: l.category,
    subcategory: l.subcategory,
    location: l.location,
    description: l.description.slice(0, 300),
    source: l.source
  };
}

function searchListings(listings, { query = '', category, min_price, max_price, limit = 5 }) {
  const terms = query.toLowerCase().split(/\W+/).filter(t => t.length > 1);
  const max = Math.min(Math.max(Number(limit) || 5, 1), 10);

  return listings
    .filter(l => !category || l.category === category)
    .filter(l => min_price == null || l.price >= min_price)
    .filter(l => max_price == null || l.price <= max_price)
    .map(l => {
      const haystack = `${l.title} ${l.subcategory} ${l.category} ${l.location} ${l.description}`.toLowerCase();
      const score = terms.reduce((s, t) => s + (l.title.toLowerCase().includes(t) ? 3 : 0) + (haystack.includes(t) ? 1 : 0), 0);
      return { l, score };
    })
    .filter(({ score }) => terms.length === 0 || score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(({ l }) => summarize(l));
}

function runTool(name, input, listings, shownIds) {
  switch (name) {
    case 'search_listings':
      return JSON.stringify(searchListings(listings, input));
    case 'get_listing': {
      const listing = listings.find(l => l.id === input.id);
      return listing ? JSON.stringify(listing) : `No listing with id ${input.id}`;
    }
    case 'show_listings': {
      const ids = (input.ids || []).filter(id => listings.some(l => l.id === id)).slice(0, 6);
      shownIds.splice(0, shownIds.length, ...ids);
      return `Showing ${ids.length} listing card(s) to the user.`;
    }
    default:
      throw new Error(`Unknown tool ${name}`);
  }
}

let client;
function getClient() {
  client ??= new Anthropic();
  return client;
}

// POST /api/chat — { messages: [{ role: 'user' | 'assistant', content: string }] }
router.post('/', async (req, res) => {
  const history = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = history
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim() !== '')
    .slice(-MAX_HISTORY_MESSAGES)
    .map(m => ({ role: m.role, content: m.content }));

  // The API requires the conversation to start with a user turn
  while (messages.length > 0 && messages[0].role !== 'user') messages.shift();
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Send at least one user message, ending with a user message.' });
  }

  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    return res.status(503).json({ error: 'AI chat is not configured. Set ANTHROPIC_API_KEY for the server.' });
  }

  const listings = getAllListings();
  const shownIds = [];

  try {
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await getClient().beta.messages.create({
        model: MODEL,
        max_tokens: 16000,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages,
        output_config: { effort: 'low' },
        // Re-run requests a safety classifier declines on Anthropic's recommended fallback model
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default'
      });

      if (response.stop_reason === 'refusal') {
        return res.json({ text: "Sorry, I can't help with that request.", listings: [] });
      }

      const toolUses = response.content.filter(b => b.type === 'tool_use');
      if (response.stop_reason !== 'tool_use' || toolUses.length === 0) {
        const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
        const shown = shownIds.map(id => listings.find(l => l.id === id)).filter(Boolean);
        return res.json({ text: text || 'Done.', listings: shown });
      }

      messages.push({ role: 'assistant', content: response.content });
      messages.push({
        role: 'user',
        content: toolUses.map(tool => {
          try {
            return { type: 'tool_result', tool_use_id: tool.id, content: runTool(tool.name, tool.input, listings, shownIds) };
          } catch (err) {
            return { type: 'tool_result', tool_use_id: tool.id, content: err.message, is_error: true };
          }
        })
      });
    }
    return res.json({ text: 'That took too many steps. Could you narrow down the question?', listings: [] });

  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'The AI is busy right now. Please try again in a moment.' });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('Chat auth error:', error.message);
      return res.status(503).json({ error: 'AI chat is not configured correctly (invalid API key).' });
    }
    console.error('Chat error:', error);
    return res.status(502).json({ error: 'The AI assistant failed to respond.' });
  }
});

export default router;
