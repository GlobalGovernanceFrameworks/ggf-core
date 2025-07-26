import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Import schemas
import senseSchema from '../../schemas/egp/sense.json' assert { type: 'json' };
import proposeSchema from '../../schemas/egp/propose.json' assert { type: 'json' };
import adoptSchema from '../../schemas/egp/adopt.json' assert { type: 'json' };
import unifiedSchema from '../../schemas/unified/egp-love-ledger.json' assert { type: 'json' };

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validateSense = ajv.compile(senseSchema);
export const validatePropose = ajv.compile(proposeSchema);
export const validateAdopt = ajv.compile(adoptSchema);
export const validateUnified = ajv.compile(unifiedSchema);

export { senseSchema, proposeSchema, adoptSchema, unifiedSchema };
