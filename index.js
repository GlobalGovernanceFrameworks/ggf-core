// ggf-core/index.js
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export * from './packages/validators/index.js';

// Load and export schemas
export const senseSchema = JSON.parse(readFileSync(join(__dirname, 'schemas/egp/sense.json'), 'utf-8'));
export const proposeSchema = JSON.parse(readFileSync(join(__dirname, 'schemas/egp/propose.json'), 'utf-8'));
export const adoptSchema = JSON.parse(readFileSync(join(__dirname, 'schemas/egp/adopt.json'), 'utf-8'));
export const unifiedSchema = JSON.parse(readFileSync(join(__dirname, 'schemas/unified/egp-love-ledger.json'), 'utf-8'));

// Export examples
export const senseExample = JSON.parse(readFileSync(join(__dirname, 'examples/sense-plus-care-log.json'), 'utf-8'));
export const proposeExample = JSON.parse(readFileSync(join(__dirname, 'examples/propose-plus-hearts-reward.json'), 'utf-8'));
export const adoptExample = JSON.parse(readFileSync(join(__dirname, 'examples/adopt-plus-leaves-nft.json'), 'utf-8'));
