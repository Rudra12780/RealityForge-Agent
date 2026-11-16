/**
 * RealityForge AI Skill Validator
 * Programmatically validates structural integrity, agent contracts,
 * workflow consistency, templates, approval gates, and safety rules.
 */

const fs = require('fs');
const path = require('path');

const skillRoot = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, testName, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedChecks++;
    console.error(`  ❌ FAIL: ${testName} - ${details}`);
  }
}

console.log('====================================================');
console.log('🧪 Starting RealityForge AI Automated Skill Validation');
console.log('====================================================\n');

// --------------------------------------------------------------------------
// 1. Agent Inventory & Frontmatter Verification
// --------------------------------------------------------------------------
console.log('▶ Check 1: Agent Inventory and Frontmatter');
const expectedAgents = [
  'project_analyst.md',
  'dependency_analyst.md',
  'code_intelligence.md',
  'system_architect.md',
  'scenario_simulator.md',
  'future_impact.md',
  'failure_prediction.md',
  'performance_simulator.md',
  'performance_engineer.md',
  'security.md',
  'decision_intelligence.md',
  'developer.md',
  'testing.md',
  'code_reviewer.md'
];

expectedAgents.forEach(agentFile => {
  const agentPath = path.join(skillRoot, 'agents', agentFile);
  const exists = fs.existsSync(agentPath);
  assert(exists, `Agent file exists: ${agentFile}`);
  if (exists) {
    const content = fs.readFileSync(agentPath, 'utf8');
    assert(content.startsWith('---'), `Frontmatter begins properly: ${agentFile}`);
    assert(content.includes('name:'), `Agent specifies 'name': ${agentFile}`);
    assert(content.includes('description:'), `Agent specifies 'description': ${agentFile}`);
  }
});

// --------------------------------------------------------------------------
// 2. Workflow Consistency & Valid References
// --------------------------------------------------------------------------
console.log('\n▶ Check 2: Workflow Files and Agent References');
const expectedWorkflows = [
  'discovery_workflow.md',
  'simulation_workflow.md',
  'decision_workflow.md',
  'implementation_workflow.md',
  'learn_workflow.md'
];

expectedWorkflows.forEach(wfFile => {
  const wfPath = path.join(skillRoot, 'workflows', wfFile);
  const exists = fs.existsSync(wfPath);
  assert(exists, `Workflow file exists: ${wfFile}`);
  if (exists) {
    const content = fs.readFileSync(wfPath, 'utf8');
    assert(content.includes('---'), `Workflow has frontmatter: ${wfFile}`);
    assert(!content.includes('agy run-workflow'), `No unsupported 'agy run-workflow' command: ${wfFile}`);
  }
});

// --------------------------------------------------------------------------
// 3. Template Existence & Placeholders
// --------------------------------------------------------------------------
console.log('\n▶ Check 3: Report and Artifact Templates');
const expectedTemplates = [
  'architecture_report.md',
  'dependency_report.md',
  'simulation_comparison.md',
  'risk_assessment.md',
  'performance_report.md',
  'security_review.md',
  'implementation_plan.md',
  'verification_report.md'
];

expectedTemplates.forEach(tplFile => {
  const tplPath = path.join(skillRoot, 'templates', tplFile);
  const exists = fs.existsSync(tplPath);
  assert(exists, `Template file exists: ${tplFile}`);
  if (exists) {
    const content = fs.readFileSync(tplPath, 'utf8');
    assert(content.length > 50, `Template has substantive content: ${tplFile}`);
  }
});

// --------------------------------------------------------------------------
// 4. Agent Handoffs & Contracts
// --------------------------------------------------------------------------
console.log('\n▶ Check 4: Agent Contracts & Handoff Protocols');
const contractsPath = path.join(skillRoot, 'orchestration', 'contracts.md');
assert(fs.existsSync(contractsPath), 'Orchestration contracts file exists');
if (fs.existsSync(contractsPath)) {
  const content = fs.readFileSync(contractsPath, 'utf8');
  assert(content.includes('Conflict Resolution Protocol'), 'Defines Conflict Resolution Protocol');
  assert(content.includes('Precedence'), 'Specifies conflict resolution precedence rules');
  assert(content.includes('Security & Safety Overrides All'), 'Enforces Security veto rule');
}

// --------------------------------------------------------------------------
// 5. Approval Gates Cannot Be Bypassed
// --------------------------------------------------------------------------
console.log('\n▶ Check 5: Non-Bypassable Approval Gates');
const safetyPath = path.join(skillRoot, 'orchestration', 'safety_and_rollback.md');
assert(fs.existsSync(safetyPath), 'Safety and rollback documentation exists');
if (fs.existsSync(safetyPath)) {
  const content = fs.readFileSync(safetyPath, 'utf8');
  assert(content.includes('Gate 1'), 'Gate 1 (Plan Approval) codified');
  assert(content.includes('Gate 2'), 'Gate 2 (Test Execution Consent) codified');
  assert(content.includes('Gate 3'), 'Gate 3 (Verification Verdict Approval) codified');
  assert(content.includes('Gate 4'), 'Gate 4 (Memory Persistence Approval) codified');
}

// --------------------------------------------------------------------------
// 6. Analysis Mode Read-Only Guarantee
// --------------------------------------------------------------------------
console.log('\n▶ Check 6: Analysis Mode Read-Only Guarantee');
const discoveryWf = fs.readFileSync(path.join(skillRoot, 'workflows', 'discovery_workflow.md'), 'utf8');
assert(discoveryWf.includes('Read-Only'), 'Discovery workflow explicitly marked Read-Only');
assert(discoveryWf.includes('No File Writes'), 'Discovery workflow mandates No File Writes');

// --------------------------------------------------------------------------
// 7. Engineering Mode Safe Implementation & Rollback
// --------------------------------------------------------------------------
console.log('\n▶ Check 7: Engineering Mode Safety & Rollback');
const implWf = fs.readFileSync(path.join(skillRoot, 'workflows', 'implementation_workflow.md'), 'utf8');
assert(implWf.includes('Scope Lock') || implWf.includes('File Whitelist'), 'Engineering mode enforces scope lock/whitelist');
assert(implWf.includes('Rollback') || implWf.includes('rollback'), 'Engineering mode includes rollback mechanism');
assert(implWf.includes('Halt') || implWf.includes('halt') || implWf.includes('Stop'), 'Engineering mode halts on test failure');

// --------------------------------------------------------------------------
// 8. Unsupported Commands Disclaimed
// --------------------------------------------------------------------------
console.log('\n▶ Check 8: Protection Against Unsupported Commands');
const skillMain = fs.readFileSync(path.join(skillRoot, 'SKILL.md'), 'utf8');
assert(!skillMain.includes('agy test realityforge_ai'), 'Removed fake agy test command from SKILL.md');
assert(skillMain.includes('Truthfulness Standard'), 'Truthfulness Standard documented in SKILL.md');

// --------------------------------------------------------------------------
// 9. Memory Schema Integrity
// --------------------------------------------------------------------------
console.log('\n▶ Check 9: Project Memory Schema Integrity');
const schemaPath = path.join(skillRoot, 'memory', 'schema.json');
const memoryPath = path.join(skillRoot, 'memory', 'project_memory.json');
assert(fs.existsSync(schemaPath), 'Memory schema.json exists');
assert(fs.existsSync(memoryPath), 'project_memory.json exists');
if (fs.existsSync(schemaPath) && fs.existsSync(memoryPath)) {
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const memory = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
  assert(schema.required.every(field => field in memory), 'project_memory.json satisfies required schema fields');
}

// --------------------------------------------------------------------------
// 10. Permanent PDF Reporting Engine
// --------------------------------------------------------------------------
console.log('\n▶ Check 10: Permanent PDF Reporting Engine');
const pdfGenPath = path.join(skillRoot, 'reporting', 'pdf_generator.js');
const wfPdfPath = path.join(skillRoot, 'reporting', 'generate_workflow_pdf.js');
const reportsDir = path.join(skillRoot, 'reports');
assert(fs.existsSync(pdfGenPath), 'pdf_generator.js exists');
assert(fs.existsSync(wfPdfPath), 'generate_workflow_pdf.js exists');
assert(fs.existsSync(reportsDir), 'reports/ directory exists');
if (fs.existsSync(reportsDir)) {
  const pdfs = fs.readdirSync(reportsDir).filter(f => f.endsWith('.pdf'));
  assert(pdfs.length > 0, `Generated PDF reports exist (${pdfs.length} found)`);
  if (pdfs.length > 0) {
    const stat = fs.statSync(path.join(reportsDir, pdfs[0]));
    assert(stat.size > 10000, `PDF report has valid substantive size (${stat.size} bytes)`);
  }
}

console.log('\n====================================================');
console.log(`📊 Validation Complete: ${passedChecks}/${totalChecks} checks passed (${failedChecks} failures)`);
console.log('====================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
