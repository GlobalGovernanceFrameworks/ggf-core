// packages/validators/index.js
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load schemas
const senseSchema = JSON.parse(readFileSync(join(__dirname, '../../schemas/egp/sense.json'), 'utf-8'));
const proposeSchema = JSON.parse(readFileSync(join(__dirname, '../../schemas/egp/propose.json'), 'utf-8'));
const adoptSchema = JSON.parse(readFileSync(join(__dirname, '../../schemas/egp/adopt.json'), 'utf-8'));
const unifiedSchema = JSON.parse(readFileSync(join(__dirname, '../../schemas/unified/egp-love-ledger.json'), 'utf-8'));
const careActSchema = JSON.parse(readFileSync(join(__dirname, '../../schemas/love-ledger/care-act.json'), 'utf-8'));
const heartsAllocationsSchema = JSON.parse(readFileSync(join(__dirname, '../../schemas/love-ledger/hearts-allocation.json'), 'utf-8'));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validateSense = ajv.compile(senseSchema);
export const validatePropose = ajv.compile(proposeSchema);
export const validateAdopt = ajv.compile(adoptSchema);
export const validateUnified = ajv.compile(unifiedSchema);
export const validateCareAct = ajv.compile(careActSchema);
export const validateHeartsAllocation = ajv.compile(heartsAllocationSchema);

export { senseSchema, proposeSchema, adoptSchema, unifiedSchema, careActSchema, heartsAllocationSchema };
