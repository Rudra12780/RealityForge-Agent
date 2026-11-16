const assert = require('assert');
console.log('Running controlled failure simulation...');
assert.strictEqual(1 + 1, 3, 'Controlled simulation: intentional test failure detected');
