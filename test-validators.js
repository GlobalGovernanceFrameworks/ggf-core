#!/usr/bin/env node
// ggf-core/test-validators.js

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { 
  validateSense, 
  validatePropose, 
  validateAdopt, 
  validateUnified,
  senseSchema,
  unifiedSchema
} from './index.js';

// Get current directory for file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load example data
const senseExample = JSON.parse(readFileSync(join(__dirname, 'examples/sense-plus-care-log.json'), 'utf-8'));
const proposeExample = JSON.parse(readFileSync(join(__dirname, 'examples/propose-plus-hearts-reward.json'), 'utf-8'));
const adoptExample = JSON.parse(readFileSync(join(__dirname, 'examples/adopt-plus-leaves-nft.json'), 'utf-8'));

console.log('🧪 Testing GGF Core Validators...\n');

// Test 1: Basic schema loading
console.log('📋 Test 1: Schema Loading');
console.log('✅ Sense schema loaded:', senseSchema.title);
console.log('✅ Unified schema loaded:', unifiedSchema.title);
console.log('');

// Test 2: EGP Schema Validation (using core EGP data)
console.log('🏛️ Test 2: EGP Schema Validation');

// Create pure EGP test data
const pureEgpSense = {
  issue: "community_garden_water_shortage",
  title: "Garden well running dry",
  scope: "village:san_pedro_de_atacama",
  urgency: "4/5",
  tags: ["water", "food_security"]
};

const pureEgpPropose = {
  title: "Moonlight Water Sharing",
  in_response_to: "/sense/123",
  solution: {
    description: "Night irrigation to reduce evaporation",
    format: "text/markdown"
  },
  test: "Conflict drops 20% in 2 months",
  sunset: "P6M"
};

const pureEgpAdopt = {
  proposal_uri: "/propose/456",
  decision_process: {
    type: "consent",
    record: "QmXyZ..."
  }
};

// Test sense validation
const senseValid = validateSense(pureEgpSense);
console.log('Pure EGP sense valid:', senseValid ? '✅' : '❌');
if (!senseValid) {
  console.log('Sense errors:', validateSense.errors);
}

// Test propose validation  
const proposeValid = validatePropose(pureEgpPropose);
console.log('Pure EGP propose valid:', proposeValid ? '✅' : '❌');
if (!proposeValid) {
  console.log('Propose errors:', validatePropose.errors);
}

// Test adopt validation
const adoptValid = validateAdopt(pureEgpAdopt);
console.log('Pure EGP adopt valid:', adoptValid ? '✅' : '❌');
if (!adoptValid) {
  console.log('Adopt errors:', validateAdopt.errors);
}

console.log('');

// Test 3: Validate unified schema (EGP + Love Ledger)
console.log('💚 Test 3: Unified Schema Validation (EGP + Love Ledger)');

const unifiedValid = validateUnified(senseExample);
console.log('Unified sense example valid:', unifiedValid ? '✅' : '❌');
if (!unifiedValid) {
  console.log('Unified errors:', validateUnified.errors);
}

console.log('');

// Test 4: Test invalid data (should fail validation)
console.log('🚫 Test 4: Invalid Data (Should Fail)');

const invalidSense = {
  // Missing required 'scope' field
  issue: "test_issue"
};

const invalidResult = validateSense(invalidSense);
console.log('Invalid data correctly rejected:', !invalidResult ? '✅' : '❌');
if (!invalidResult) {
  console.log('Expected validation errors:', validateSense.errors?.map(e => e.message));
}

console.log('');

// Test 5: Test custom valid data
console.log('🧩 Test 5: Custom Valid Data');

const customSense = {
  issue: "custom_test_issue",
  title: "My Custom Test",
  scope: "test:community",
  urgency: "2/5",
  tags: ["test", "validation"]
};

const customValid = validateSense(customSense);
console.log('Custom sense data valid:', customValid ? '✅' : '❌');
if (!customValid) {
  console.log('Custom errors:', validateSense.errors);
}

console.log('');

// Test 6: Test Love Ledger extensions
console.log('💖 Test 6: Love Ledger Extensions');

const loveExtendedData = {
  ...senseExample,
  care_metrics: {
    act_type: "elders",
    hours: 2,
    impact_score: 4
  },
  currency_alloc: {
    hearts: 80
  }
};

const loveExtendedValid = validateUnified(loveExtendedData);
console.log('Love Ledger extended data valid:', loveExtendedValid ? '✅' : '❌');
if (!loveExtendedValid) {
  console.log('Love Ledger errors:', validateUnified.errors);
}

console.log('');

// Summary
console.log('🎉 Validation Testing Complete!');
console.log('');
console.log('Summary:');
console.log(`- EGP Sense: ${senseValid ? '✅' : '❌'}`);
console.log(`- EGP Propose: ${proposeValid ? '✅' : '❌'}`);
console.log(`- EGP Adopt: ${adoptValid ? '✅' : '❌'}`);
console.log(`- Unified Schema: ${unifiedValid ? '✅' : '❌'}`);
console.log(`- Invalid Data Rejected: ${!invalidResult ? '✅' : '❌'}`);
console.log(`- Custom Data: ${customValid ? '✅' : '❌'}`);
console.log(`- Love Ledger Extensions: ${loveExtendedValid ? '✅' : '❌'}`);

// Test if all passed
const allPassed = senseValid && proposeValid && adoptValid && unifiedValid && !invalidResult && customValid && loveExtendedValid;
console.log('');
console.log(allPassed ? '🎉 All tests passed!' : '⚠️  Some tests failed - check errors above');
