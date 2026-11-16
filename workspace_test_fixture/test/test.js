const assert = require('assert');
const { divide, multiply } = require('../src/calculator');

console.log("Running workspace test fixture test suite...");

// Test multiplication
assert.strictEqual(multiply(6, 7), 42, "6 * 7 should be 42");

// Test division
assert.strictEqual(divide(10, 2), 5, "10 / 2 should be 5");

// Test division by zero exception
assert.throws(() => {
  divide(10, 0);
}, /Division by zero error/, "Should throw on divide by zero");

console.log("All workspace test fixture tests PASSED cleanly.");
