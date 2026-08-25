import express from 'express';
import db from '../db.js';
import { fetchAndIngestEcayTradeData } from '../services/ecayScraper.js';

const router = express.Router();

// GET /api/listings — Fetch Real Listings from SQLite DB
router.get('/', (req, res) => {
  try {
    const { category, searchQuery, sortBy } = req.query;

    let rows = db.prepare('SELECT * FROM listings ORDER BY created_at DESC').all();

    // If database is empty, auto-ingest EcayTrade listings
    if (rows.length === 0) {
      fetchAndIngestEcayTradeData();
      rows = db.prepare('SELECT * FROM listings ORDER BY created_at DESC').all();
    }

    // Parse JSON fields
    let listings = rows.map(r => ({
      id: r.id,
      title: r.title,
      category: r.category,
      subcategory: r.subcategory || 'General',
      price: r.price,
      priceType: r.price_type || 'fixed',
      location: r.location || 'Grand Cayman',
      images: JSON.parse(r.images || '[]'),
      description: r.description,
      seller: JSON.parse(r.seller || '{}'),
      aiMetrics: JSON.parse(r.ai_metrics || '{}'),
      specs: JSON.parse(r.specs || '[]'),
      views: r.views || 0,
      likes: r.likes || 0,
      featured: Boolean(r.featured)
    }));

    // Apply category filter
    if (category && category !== 'all') {
      listings = listings.filter(l => l.category === category);
    }

    // Apply search query filter
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      listings = listings.filter(l => 
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q)
      );
    }

    return res.json({ listings, count: listings.length });

  } catch (error) {
    console.error('Fetch listings error:', error);
    return res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// POST /api/listings — Create New Real Listing
router.post('/', (req, res) => {
  try {
    const item = req.body;
    const id = item.id || `lst-${Date.now()}`;

    db.prepare(`
      INSERT INTO listings (id, title, category, subcategory, price, price_type, location, images, description, seller, ai_metrics, specs, views, likes, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      item.title,
      item.category || 'all',
      item.subcategory || 'General',
      item.price || 0,
      item.priceType || 'fixed',
      item.location || 'Grand Cayman',
      JSON.stringify(item.images || []),
      item.description || '',
      JSON.stringify(item.seller || {}),
      JSON.stringify(item.aiMetrics || {}),
      JSON.stringify(item.specs || []),
      1,
      0,
      1
    );

    return res.status(201).json({ message: 'Listing created successfully', listingId: id });

  } catch (error) {
    console.error('Create listing error:', error);
    return res.status(500).json({ error: 'Failed to create listing' });
  }
});

// POST /api/listings/sync-ecay — Manually Ingest Live EcayTrade Data
router.post('/sync-ecay', async (req, res) => {
  try {
    const items = await fetchAndIngestEcayTradeData();
    return res.json({
      message: '⚡ Ingested real-time EcayTrade market listings successfully!',
      count: items.length,
      syncedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Ecay sync error:', error);
    return res.status(500).json({ error: 'EcayTrade data sync failed' });
  }
});

export default router;
