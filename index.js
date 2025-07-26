// ggf-core/index.js
export * from './packages/validators/index.js';

// Re-export schemas for easy access
export { default as senseSchema } from './schemas/egp/sense.json' assert { type: 'json' };
export { default as proposeSchema } from './schemas/egp/propose.json' assert { type: 'json' };
export { default as adoptSchema } from './schemas/egp/adopt.json' assert { type: 'json' };
export { default as unifiedSchema } from './schemas/unified/egp-love-ledger.json' assert { type: 'json' };
