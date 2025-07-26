// ggf-core/test-validators.js (for testing)
import { validateSense, senseExample } from './index.js';

const isValid = validateSense(senseExample);
console.log('Sense validation works:', isValid);
