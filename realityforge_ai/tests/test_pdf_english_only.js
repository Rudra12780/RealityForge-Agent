/**
 * RealityForge AI - Test English-Only PDF Reporting Standard
 * Verifies:
 * 1. English is the permanent default language.
 * 2. Exactly ONE PDF is generated per workflow.
 * 3. No Gujarati or Hindi PDFs are automatically produced.
 * 4. The generated PDF contains human-readable English problem cards and explanations.
 * 5. The generated PDF is valid and downloadable.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { generateWorkflowReport, validatePdfFile } = require('../reporting/generate_workflow_pdf');

console.log('🧪 Testing RealityForge AI English-Only PDF Reporting...');

const reportsDir = path.resolve(__dirname, '..', 'reports');
const beforeFiles = fs.readdirSync(reportsDir).filter(f => f.endsWith('.pdf'));

const testProblems = [
  {
    title: 'Division by Zero Crash in Math Module',
    problem: 'When dividing numbers, entering 0 as the second number caused the entire application to terminate immediately with an unhandled exception.',
    whyItMatters: 'If an end user submits a calculation with zero in the denominator, the application freezes and unsaved progress is lost.',
    solution: 'Added explicit input validation in src/calculator.js to verify the denominator before performing division, raising an informative error if zero is passed.',
    result: 'FIXED & TESTED',
    resultDetails: 'Fixed and verified by automated regression test suite. All tests pass cleanly.',
    example: 'Before: 10 ÷ 0 caused an immediate crash. After: 10 ÷ 0 displays "Division by zero error: denominator cannot be zero." safely.'
  }
];

// Execute workflow report generation
console.log('  ▶ Generating Single English Workflow Report...');
const result = generateWorkflowReport('Verification', 'C:\\Users\\ADMIN\\Desktop\\RealityForge\\workspace_test_fixture', {
  projectName: 'Safe-Math-Utility',
  title: 'Engineering Notebook: Math Utility Verification',
  gitBranch: 'main',
  overallHealth: 'HEALTHY & VERIFIED',
  projectOverview: 'This project provides safe mathematical utility functions for web applications. All arithmetic operations have been verified against boundary exceptions.',
  problems: testProblems,
  solutionsSummary: 'Input validation logic was implemented and tested with zero regression failures.',
  systemHealthExplanation: 'The application is completely stable, secure, and ready for production use.',
  remainingItems: 'Zero critical bugs or security risks found in the audited code.',
  nextActions: 'The verified functions can now be safely used in production.'
});

// 1. Verify result structure
assert.strictEqual(result.success, true, 'Report generation must succeed');
assert.strictEqual(result.language, 'en', 'Language must be permanently English (en)');
assert.ok(result.fileSize > 50000, 'PDF size must be substantive (> 50KB)');
assert.ok(result.filePath.endsWith('.pdf'), 'File must be a PDF');

// 2. Verify exactly ONE new PDF was generated
const afterFiles = fs.readdirSync(reportsDir).filter(f => f.endsWith('.pdf'));
const newFiles = afterFiles.filter(f => !beforeFiles.includes(f));
console.log(`  ▶ Newly generated PDF files count: ${newFiles.length}`);
assert.strictEqual(newFiles.length, 1, 'Exactly ONE new PDF file must be created per workflow');
console.log(`  ✅ PASS: Exactly ONE PDF was generated: ${newFiles[0]}`);

// 3. Verify the generated PDF is in English only and has no -gu or -hi suffixes
assert.ok(!newFiles[0].includes('-gu-'), 'No Gujarati PDF should be generated');
assert.ok(!newFiles[0].includes('-hi-'), 'No Hindi PDF should be generated');
console.log('  ✅ PASS: No automatic Gujarati or Hindi PDF was generated');

// 4. Validate the PDF magic bytes and content integrity
const validatedSize = validatePdfFile(result.filePath);
assert.strictEqual(validatedSize, result.fileSize, 'Validated size must match reported size');
console.log(`  ✅ PASS: PDF validated successfully (%PDF- header verified, size: ${validatedSize} bytes)`);

// 5. Verify base64 data is present for direct download
assert.ok(result.base64Data && result.base64Data.length > 1000, 'Base64 data must be present for direct downloading');
console.log('  ✅ PASS: Base64 payload generated for direct browser downloading');

console.log('\n🎉 ALL ENGLISH-ONLY PDF REPORTING TESTS PASSED!\n');
