// Usage: npm run import -- <file.json|file.csv> [--source=name]
// Only import data you own or have written permission to republish.
import { initDb } from '../db.js';
import { normalizeListing, readListingsFile, upsertListings } from '../services/listingImport.js';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--'));
const source = (args.find(a => a.startsWith('--source=')) || '--source=import').split('=')[1];

if (!file) {
  console.error('Usage: npm run import -- <file.json|file.csv> [--source=name]');
  process.exit(1);
}

initDb();
const raw = readListingsFile(file);
const items = [];
raw.forEach((record, idx) => {
  try {
    items.push(normalizeListing(record, source));
  } catch (err) {
    console.warn(`Skipping record ${idx + 1}: ${err.message}`);
  }
});

const count = upsertListings(items);
console.log(`Imported ${count} listing(s) from ${file} (source: ${source})`);
