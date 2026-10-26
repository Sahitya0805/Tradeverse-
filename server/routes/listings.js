import express from 'express';
import db from '../db.js';
import { getAllListings } from '../services/listingImport.js';

const router = express.Router();

// GET /api/listings — Fetch listings from SQLite DB
router.get('/', (req, res) => {
  try {
    const { category, searchQuery } = req.query;
    let listings = getAllListings();

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

// POST /api/listings — Create New Listing
router.post('/', (req, res) => {
  try {
    const item = req.body;
    const id = item.id || `lst-${Date.now()}`;

    db.prepare(`
      INSERT INTO listings (id, title, category, subcategory, price, price_type, location, images, description, seller, ai_metrics, specs, views, likes, featured, source)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      1,
      'user'
    );

    return res.status(201).json({ message: 'Listing created successfully', listingId: id });

  } catch (error) {
    console.error('Create listing error:', error);
    return res.status(500).json({ error: 'Failed to create listing' });
  }
});

export default router;
