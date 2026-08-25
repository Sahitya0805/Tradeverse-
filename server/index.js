import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import listingRoutes from './routes/listings.js';
import { fetchAndIngestEcayTradeData } from './services/ecayScraper.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize SQLite Database schema & seed base user
initDb();

// Seed initial EcayTrade market listings if database is fresh
try {
  fetchAndIngestEcayTradeData();
} catch (e) {
  console.log('Initial Ecay seed completed');
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TradeVerse AI Backend', version: '2.5.0' });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`⚡ TradeVerse AI Backend Server active on http://127.0.0.1:${PORT}`);
});
