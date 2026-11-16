/**
 * Safe Math Utility - Workspace Test Fixture
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero error: denominator cannot be zero.");
  }
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  divide,
  multiply
};
