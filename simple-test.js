#!/usr/bin/env node
// ggf-core/simple-test.js - Quick compatibility test

import { 
  validateSense, 
  validatePropose, 
  validateAdopt, 
  validateUnified
} from './index.js';

console.log('🧪 Testing GGF Core Validators (Simple)...\n');

// Test 1: Check validators exist
console.log('📋 Test 1: Validator Functions');
console.log('validateSense exists:', typeof validateSense === 'function' ? '✅' : '❌');
console.log('validatePropose exists:', typeof validatePropose === 'function' ? '✅' : '❌');
console.log('validateAdopt exists:', typeof validateAdopt === 'function' ? '✅' : '❌');
console.log('validateUnified exists:', typeof validateUnified === 'function' ? '✅' : '❌');
console.log('');

// Test 2: Basic sense validation
console.log('🏛️ Test 2: Basic Sense Validation');
const basicSense = {
  issue: "test_issue",
  scope: "test:community"
};

const senseValid = validateSense(basicSense);
console.log('Basic sense valid:', senseValid ? '✅' : '❌');
if (!senseValid) {
  console.log('Errors:', validateSense.errors);
}
console.log('');

// Test 3: Invalid data (should fail)
console.log('🚫 Test 3: Invalid Data (Should Fail)');
const invalidSense = {
  issue: "test"
  // Missing required 'scope'
};

const invalidResult = validateSense(invalidSense);
console.log('Invalid data rejected:', !invalidResult ? '✅' : '❌');
if (!invalidResult) {
  console.log('Expected error for missing scope:', validateSense.errors?.[0]?.message);
}
console.log('');

// Test 4: Unified schema with Love Ledger extensions
console.log('💚 Test 4: Love Ledger Extensions');
const loveExtended = {
  operation: "sense",
  timestamp: new Date().toISOString(),
  agent: "did:example:test",
  care_metrics: {
    act_type: "elders",
    hours: 2,
    impact_score: 4
  },
  currency_alloc: {
    hearts: 80
  }
};

const unifiedValid = validateUnified(loveExtended);
console.log('Love Ledger unified valid:', unifiedValid ? '✅' : '❌');
if (!unifiedValid) {
  console.log('Unified errors:', validateUnified.errors);
}
console.log('');

// Summary
const allBasicPassed = (typeof validateSense === 'function') && senseValid && !invalidResult;
console.log('🎉 Basic Validation Testing Complete!');
console.log('');
console.log('Summary:');
console.log(`- Validators loaded: ${typeof validateSense === 'function' ? '✅' : '❌'}`);
console.log(`- Basic validation: ${senseValid ? '✅' : '❌'}`);
console.log(`- Invalid rejection: ${!invalidResult ? '✅' : '❌'}`);
console.log(`- Unified schema: ${unifiedValid ? '✅' : '❌'}`);
console.log('');
console.log(allBasicPassed ? '🎉 Core functionality works!' : '⚠️  Issues detected - check errors above');
console.log('');
console.log('💡 To publish updates: npm version patch && npm publish');
