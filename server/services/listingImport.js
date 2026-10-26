import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO_LISTINGS_PATH = path.join(__dirname, '..', 'data', 'demoListings.json');

const CATEGORIES = ['vehicles', 'real-estate', 'jobs', 'electronics', 'services', 'pets', 'business', 'community'];

// Imported listings are not scored, so they get neutral AI metrics instead of invented ones
const UNRATED_METRICS = {
  dealScore: 'Unrated',
  trustScore: '—',
  demandScore: '—',
  priceHistoryTrend: 'stable',
  pros: [],
  cons: [],
  aiSummary: ''
};

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string' && value.trim() !== '') return value.split(/[;|]/).map(s => s.trim()).filter(Boolean);
  return [];
}

function toPrice(value) {
  if (typeof value === 'number') return value;
  const n = parseFloat(String(value ?? '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

// Accepts the app's own Listing shape or a flat record (e.g. a CSV row)
export function normalizeListing(raw, source) {
  if (!raw.title || String(raw.title).trim() === '') {
    throw new Error('Listing is missing a title');
  }
  const category = CATEGORIES.includes(raw.category) ? raw.category : 'community';
  const seller = typeof raw.seller === 'object' && raw.seller !== null
    ? raw.seller
    : { name: raw.seller || raw.sellerName || 'Private seller', avatar: '', verified: false, rating: 0, responseRate: '—', type: 'individual' };

  return {
    id: String(raw.id || `${source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
    title: String(raw.title).trim(),
    category,
    subcategory: raw.subcategory || 'General',
    price: toPrice(raw.price),
    priceType: raw.priceType || raw.price_type || 'fixed',
    location: raw.location || 'Unknown',
    images: toList(raw.images ?? raw.image),
    description: raw.description || '',
    seller,
    aiMetrics: typeof raw.aiMetrics === 'object' && raw.aiMetrics !== null ? raw.aiMetrics : UNRATED_METRICS,
    specs: Array.isArray(raw.specs) ? raw.specs : [],
    views: Number(raw.views) || 0,
    likes: Number(raw.likes) || 0,
    featured: Boolean(raw.featured),
    source,
    sourceUrl: raw.sourceUrl || raw.url || null
  };
}

export function upsertListings(items) {
  const stmt = db.prepare(`
    INSERT INTO listings (id, title, category, subcategory, price, price_type, location, images, description, seller, ai_metrics, specs, views, likes, featured, source, source_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title=excluded.title, category=excluded.category, subcategory=excluded.subcategory,
      price=excluded.price, price_type=excluded.price_type, location=excluded.location,
      images=excluded.images, description=excluded.description, seller=excluded.seller,
      ai_metrics=excluded.ai_metrics, specs=excluded.specs, source=excluded.source, source_url=excluded.source_url
  `);

  db.transaction((rows) => {
    for (const item of rows) {
      stmt.run(
        item.id, item.title, item.category, item.subcategory, item.price, item.priceType, item.location,
        JSON.stringify(item.images), item.description, JSON.stringify(item.seller),
        JSON.stringify(item.aiMetrics), JSON.stringify(item.specs),
        item.views, item.likes, item.featured ? 1 : 0, item.source, item.sourceUrl
      );
    }
  })(items);
  return items.length;
}

export function rowToListing(r) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    subcategory: r.subcategory || 'General',
    price: r.price,
    priceType: r.price_type || 'fixed',
    location: r.location || '',
    images: JSON.parse(r.images || '[]'),
    description: r.description || '',
    seller: JSON.parse(r.seller || '{}'),
    aiMetrics: JSON.parse(r.ai_metrics || '{}'),
    specs: JSON.parse(r.specs || '[]'),
    createdDate: r.created_at,
    views: r.views || 0,
    likes: r.likes || 0,
    featured: Boolean(r.featured),
    source: r.source || 'demo',
    sourceUrl: r.source_url || null
  };
}

export function getAllListings() {
  return db.prepare('SELECT * FROM listings ORDER BY created_at DESC').all().map(rowToListing);
}

// Seeds the clearly labeled demo dataset when the database has no listings
export function seedDemoListingsIfEmpty() {
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM listings').get();
  if (count > 0) return 0;
  const demo = JSON.parse(fs.readFileSync(DEMO_LISTINGS_PATH, 'utf8'));
  return upsertListings(demo.map(item => normalizeListing(item, 'demo')));
}

// Minimal RFC 4180 CSV parser: quoted fields, escaped quotes, embedded newlines
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some(v => v !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some(v => v !== '')) rows.push(row);

  const [header, ...body] = rows;
  return body.map(values => Object.fromEntries(header.map((h, idx) => [h.trim(), values[idx] ?? ''])));
}

export function readListingsFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  if (filePath.toLowerCase().endsWith('.csv')) return parseCsv(text);
  const data = JSON.parse(text);
  return Array.isArray(data) ? data : data.listings;
}
