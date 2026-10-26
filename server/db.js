import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'tradeverse.db');
const db = new Database(dbPath);

// Enable WAL mode for high performance
db.pragma('journal_mode = WAL');

// Initialize database schema
export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      avatar TEXT,
      pro_member INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      subcategory TEXT,
      price REAL NOT NULL,
      price_type TEXT DEFAULT 'fixed',
      location TEXT,
      images TEXT, -- JSON string array
      description TEXT,
      seller TEXT, -- JSON object
      ai_metrics TEXT, -- JSON object
      specs TEXT, -- JSON array
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      featured INTEGER DEFAULT 0,
      source TEXT DEFAULT 'demo', -- where the listing came from, e.g. 'demo', 'user', or an import name
      source_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contracts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      buyer_name TEXT NOT NULL,
      seller_name TEXT NOT NULL,
      price REAL NOT NULL,
      date TEXT NOT NULL,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrate databases created before listings tracked their source
  const listingColumns = db.prepare('PRAGMA table_info(listings)').all().map(c => c.name);
  if (!listingColumns.includes('source')) db.exec("ALTER TABLE listings ADD COLUMN source TEXT DEFAULT 'demo'");
  if (!listingColumns.includes('source_url')) db.exec('ALTER TABLE listings ADD COLUMN source_url TEXT');

  // Remove the invented listings the old EcayTrade seeder presented as real
  db.prepare("DELETE FROM listings WHERE id LIKE 'ecay-%'").run();

  // Seed default demo user if not exists
  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get('sahitya@tradeverse.ai');
  if (!existingUser) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('password123', salt);
    db.prepare(`
      INSERT INTO users (id, name, email, password_hash, avatar, pro_member)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      'usr-sahitya-1',
      'Sahitya Singh',
      'sahitya@tradeverse.ai',
      hash,
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      1
    );
  }
}

export default db;
