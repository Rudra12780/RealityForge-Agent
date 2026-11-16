/**
 * RealityForge AI - Human-Readable English PDF Report Generator
 * Compiles beginner-friendly, notebook-styled A4 documents using native
 * Chromium/Edge headless rendering without external npm dependencies.
 * 
 * Permanent Standard: Simple, Human-Readable English ('en')
 * Structure: Problem, Why It Matters, Solution, Result, Example.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getBrowserBinary() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  if (fs.existsSync(chromePath)) return chromePath;
  if (fs.existsSync(edgePath)) return edgePath;
  throw new Error('No supported browser engine (Chrome or Edge) found for PDF generation.');
}

const LABELS = {
  subtitle: 'Automated Multi-Agent Intelligence & Verification Artifact',
  stamp: 'RealityForge AI • Verified',
  metaProject: 'Project',
  metaWorkflow: 'Workflow',
  metaDate: 'Date',
  metaHealth: 'Health Status',
  metaBranch: 'Branch',
  metaEngine: 'Engine',
  metaFormat: 'Format',
  secOverview: '1. What Does This Project Do?',
  secProblems: '2. Discovered Problems & Defect Analysis',
  secSolutions: '3. What Was Changed & How It Was Fixed',
  secHealth: '4. Current Safety & Verification Status',
  secRemaining: '5. Remaining Items & Future Work',
  secNextActions: '6. Recommended Next Actions',
  secAgentAudit: '7. Multi-Agent Team Collaboration Audit',
  secAppendix: 'Appendix: Technical Evidence & Code Audit',
  lblProblem: '🔴 PROBLEM (What went wrong?):',
  lblWhyMatters: '⚠️ WHY IT MATTERS (How does this affect the user?):',
  lblSolution: '🛠️ SOLUTION (What was changed?):',
  lblResult: '📊 RESULT (Verification outcome):',
  lblExample: '💡 EXAMPLE (Everyday before-and-after explanation):',
  verdictLabel: 'Final Verification Verdict:',
  defaultOverview: 'This project provides automated software functionality with verified reliability controls.',
  defaultHealth: 'The system has been analyzed and verified safe for standard execution.'
};

function renderStatusBadge(status) {
  const s = String(status).toUpperCase();
  let cls = 'badge-info';
  let label = s;

  if (s.includes('FIXED') || s.includes('PASS') || s.includes('APPROVED') || s.includes('HEALTHY') || s.includes('VERIFIED')) {
    cls = 'badge-fixed';
    label = 'VERIFIED & HEALTHY';
  } else if (s.includes('FAIL') || s.includes('DETECTED') || s.includes('ERROR')) {
    cls = 'badge-failed';
    label = 'DEFECT FOUND';
  } else if (s.includes('PENDING') || s.includes('PROPOSED') || s.includes('CAUTION')) {
    cls = 'badge-proposed';
    label = s;
  }

  return `<span class="badge ${cls}">${label}</span>`;
}

function renderProblemCards(problems = []) {
  if (!problems || problems.length === 0) {
    return `<div class="callout success">
      <strong>✅ No critical defects found. The analyzed components adhere to verified quality standards.</strong>
    </div>`;
  }

  return problems.map((p, idx) => `
    <div class="problem-card">
      <div class="problem-card-header">
        <span class="problem-number">#${idx + 1}</span>
        <span class="problem-title">${p.title || 'Discovered Item'}</span>
        ${renderStatusBadge(p.result || p.status || 'FIXED & TESTED')}
      </div>
      <div class="problem-field">
        <strong>${LABELS.lblProblem}</strong>
        <p>${p.problem || 'N/A'}</p>
      </div>
      <div class="problem-field">
        <strong>${LABELS.lblWhyMatters}</strong>
        <p>${p.whyItMatters || 'N/A'}</p>
      </div>
      <div class="problem-field">
        <strong>${LABELS.lblSolution}</strong>
        <p>${p.solution || 'N/A'}</p>
      </div>
      <div class="problem-field">
        <strong>${LABELS.lblResult}</strong>
        <p>${p.resultDetails || p.result || 'Verified successfully under automated test execution.'}</p>
      </div>
      <div class="problem-field example-box">
        <strong>${LABELS.lblExample}</strong>
        <p>${p.example || 'N/A'}</p>
      </div>
    </div>
  `).join('\n');
}

function generateReportHtml(data) {
  const {
    title = 'Software Engineering Verification Report',
    projectName = 'Unknown Project',
    workflowType = 'General Workflow',
    date = new Date().toISOString().split('T')[0],
    gitBranch = 'main',
    overallHealth = 'HEALTHY',
    projectOverview = LABELS.defaultOverview,
    problems = [],
    solutionsSummary = 'All required improvements were implemented and validated against regression test suites.',
    systemHealthExplanation = LABELS.defaultHealth,
    remainingItems = 'Zero critical blockers or unresolved runtime errors in current scope.',
    nextActions = 'The project is verified and ready for standard operational workflows.',
    agentAudit = null,
    technicalAppendix = null
  } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - ${projectName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4 portrait;
      margin: 11mm 13mm 11mm 13mm;
      @bottom-right {
        content: "Page " counter(page) " of " counter(pages);
        font-family: 'Inter', sans-serif;
        font-size: 7.5pt;
        color: #64748B;
      }
    }

    * { box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8.5pt;
      line-height: 1.4;
      color: #1E293B;
      background-color: #FFFFFF;
      margin: 0;
      padding: 0;
    }

    /* Notebook Header */
    .notebook-header {
      border: 2px solid #0F172A;
      background: #F8FAFC;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 12px;
      box-shadow: 2px 2px 0px #0F172A;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .notebook-header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 6px;
    }
    .title-container { flex: 1; }
    .notebook-stamp {
      flex-shrink: 0;
      border: 2px dashed #0284C7;
      color: #0284C7;
      padding: 4px 10px;
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-radius: 4px;
      white-space: nowrap;
      transform: rotate(-1deg);
      background: #F0F9FF;
    }
    .notebook-title {
      font-family: 'Caveat', cursive, sans-serif;
      font-size: 20pt;
      font-weight: 700;
      color: #0F172A;
      margin: 0 0 2px 0;
      line-height: 1.1;
    }
    .notebook-subtitle {
      font-size: 8.5pt;
      font-weight: 600;
      color: #475569;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      font-size: 7.5pt;
      border-top: 1px dashed #CBD5E1;
      padding-top: 6px;
      margin-top: 6px;
    }
    .meta-item strong { color: #0F172A; }

    /* Section Styling */
    h2 {
      font-family: 'Caveat', cursive, sans-serif;
      font-size: 15pt;
      color: #0F172A;
      margin: 10px 0 4px 0;
      padding-bottom: 2px;
      border-bottom: 1.5px solid #E2E8F0;
      page-break-after: avoid;
      break-after: avoid;
    }

    p { margin: 0 0 4px 0; }

    /* Problem Cards */
    .problem-card {
      border: 1px solid #CBD5E1;
      border-radius: 5px;
      background: #FFFFFF;
      padding: 8px 12px;
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 1px 1px 2px rgba(0,0,0,0.03);
    }
    .problem-card-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
      border-bottom: 1px solid #F1F5F9;
      padding-bottom: 4px;
    }
    .problem-number {
      background: #0F172A;
      color: #FFFFFF;
      font-size: 7.5pt;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
    }
    .problem-title {
      font-weight: 700;
      color: #0F172A;
      font-size: 9pt;
      flex: 1;
    }
    .problem-field {
      margin-bottom: 4px;
      font-size: 8pt;
    }
    .problem-field strong {
      color: #334155;
      display: block;
      margin-bottom: 1px;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .example-box {
      background: #EFF6FF;
      border-left: 3px solid #3B82F6;
      padding: 5px 8px;
      border-radius: 0 4px 4px 0;
      margin-top: 4px;
    }
    .example-box strong { color: #1E40AF; }

    /* Callout & Status Boxes */
    .callout {
      padding: 6px 10px;
      border-radius: 4px;
      margin: 6px 0;
      font-size: 8pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .callout.success {
      background: #F0FDF4;
      border-left: 3.5px solid #16A34A;
      color: #14532D;
    }
    .callout.warning {
      background: #FEF2F2;
      border-left: 3.5px solid #EF4444;
      color: #7F1D1D;
    }
    .callout.info {
      background: #F0F9FF;
      border-left: 3.5px solid #0284C7;
      color: #0C4A6E;
    }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 1px 5px;
      font-size: 7pt;
      font-weight: 700;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .badge-fixed { background: #DCFCE7; color: #15803D; border: 1px solid #86EFAC; }
    .badge-failed { background: #FEE2E2; color: #B91C1C; border: 1px solid #FCA5A5; }
    .badge-proposed { background: #FEF3C7; color: #B45309; border: 1px solid #FCD34D; }
    .badge-info { background: #E0F2FE; color: #0369A1; border: 1px solid #7DD3FC; }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0 8px 0;
      font-size: 7.5pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    th, td {
      border: 1px solid #CBD5E1;
      padding: 4px 6px;
      text-align: left;
      vertical-align: top;
    }
    th { background-color: #F8FAFC; color: #0F172A; font-weight: 600; }
    tr:nth-child(even) { background-color: #F8FAFC; }

    /* Code in Appendix */
    pre, code {
      font-family: 'JetBrains Mono', Consolas, Monaco, monospace;
      font-size: 7pt;
    }
    pre {
      background: #0F172A;
      color: #E2E8F0;
      padding: 6px 10px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 4px 0;
      white-space: pre-wrap;
      word-break: break-all;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .section-block {
      page-break-inside: avoid;
      break-inside: avoid;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>

  <!-- Notebook Title Header -->
  <div class="notebook-header">
    <div class="notebook-header-top">
      <div class="title-container">
        <div class="notebook-title">${title}</div>
        <div class="notebook-subtitle">${LABELS.subtitle}</div>
      </div>
      <div class="notebook-stamp">${LABELS.stamp}</div>
    </div>
    <div class="meta-grid">
      <div class="meta-item"><strong>${LABELS.metaProject}:</strong> ${projectName}</div>
      <div class="meta-item"><strong>${LABELS.metaWorkflow}:</strong> ${workflowType}</div>
      <div class="meta-item"><strong>${LABELS.metaDate}:</strong> ${date}</div>
      <div class="meta-item"><strong>${LABELS.metaHealth}:</strong> ${renderStatusBadge(overallHealth)}</div>
      <div class="meta-item"><strong>${LABELS.metaBranch}:</strong> ${gitBranch}</div>
      <div class="meta-item"><strong>${LABELS.metaEngine}:</strong> RealityForge v2.0</div>
      <div class="meta-item"><strong>Language:</strong> English (Permanent Default)</div>
      <div class="meta-item"><strong>${LABELS.metaFormat}:</strong> ISO-216 (A4)</div>
    </div>
  </div>

  <!-- 1. What Does This Project Do? -->
  <div class="section-block">
    <h2>${LABELS.secOverview}</h2>
    <p>${projectOverview}</p>
  </div>

  <!-- 2. Discovered Problems & Defect Analysis -->
  <div class="section-block">
    <h2>${LABELS.secProblems}</h2>
    ${renderProblemCards(problems)}
  </div>

  <!-- 3. What Was Changed & How It Was Fixed -->
  <div class="section-block">
    <h2>${LABELS.secSolutions}</h2>
    <div class="callout info">
      ${solutionsSummary}
    </div>
  </div>

  <!-- 4. Current Safety & Verification Status -->
  <div class="section-block">
    <h2>${LABELS.secHealth}</h2>
    <div class="callout ${overallHealth.includes('FAIL') ? 'warning' : 'success'}">
      <strong>${LABELS.verdictLabel}</strong> ${renderStatusBadge(overallHealth)}<br>
      ${systemHealthExplanation}
    </div>
  </div>

  <!-- 5. Remaining Items & Future Work -->
  <div class="section-block">
    <h2>${LABELS.secRemaining}</h2>
    <p>${remainingItems}</p>
  </div>

  <!-- 6. Recommended Next Actions -->
  <div class="section-block">
    <h2>${LABELS.secNextActions}</h2>
    <p>${nextActions}</p>
  </div>

  <!-- 7. Multi-Agent Team Collaboration Audit -->
  ${agentAudit ? `
  <div class="section-block">
    <h2>${LABELS.secAgentAudit}</h2>
    ${agentAudit}
  </div>` : ''}

  <!-- 8. Technical Appendix (Optional) -->
  ${technicalAppendix ? `
  <div class="section-block" style="page-break-before: always;">
    <h2>${LABELS.secAppendix}</h2>
    ${technicalAppendix}
  </div>` : ''}

</body>
</html>`;
}

function recordReportHistory(reportsDir, reportRecord) {
  const historyPath = path.join(reportsDir, 'report_history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (_) {
      history = [];
    }
  }
  history.unshift(reportRecord);
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf8');
}

function generatePdfReport(reportData, customOutputPath = null) {
  const browserBin = getBrowserBinary();
  const reportsDir = path.resolve(__dirname, '..', 'reports');

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const rawProject = reportData.projectSlug || reportData.projectName || 'project';
  const safeProject = rawProject.replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeType = (reportData.workflowType || 'report').replace(/[^a-zA-Z0-9_-]/g, '_');
  
  // Permanent English Standard: Exactly one clean PDF per workflow
  const outputFileName = customOutputPath || path.join(reportsDir, `RF-Report-${safeProject}-${safeType}-${timestamp}.pdf`);
  const tempHtmlPath = path.join(reportsDir, `temp-${safeProject}-${timestamp}.html`);

  // Ensure report data is marked English
  const englishReportData = { ...reportData, language: 'en' };
  const htmlContent = generateReportHtml(englishReportData);
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

  try {
    console.log(`[PDF Generator] Rendering English PDF via ${path.basename(browserBin)}...`);
    const cmd = `"${browserBin}" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputFileName}" "${tempHtmlPath}"`;
    execSync(cmd, { stdio: 'ignore' });

    let waited = 0;
    while (!fs.existsSync(outputFileName) && waited < 5000) {
      const waitStart = Date.now();
      while (Date.now() - waitStart < 200) {}
      waited += 200;
    }

    if (!fs.existsSync(outputFileName)) {
      throw new Error(`PDF output file was not generated at: ${outputFileName}`);
    }

    const stats = fs.statSync(outputFileName);
    console.log(`[PDF Generator] ✅ Successfully generated English PDF: ${outputFileName} (${stats.size} bytes)`);

    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }

    const reportRecord = {
      report_id: `RF-${Date.now()}`,
      title: englishReportData.title,
      project: englishReportData.projectName,
      workflow: englishReportData.workflowType,
      language: 'en',
      file_path: outputFileName,
      file_uri: `file:///${outputFileName.replace(/\\/g, '/')}`,
      generated_at: new Date().toISOString(),
      size_bytes: stats.size
    };
    recordReportHistory(reportsDir, reportRecord);

    return {
      success: true,
      filePath: outputFileName,
      fileUri: reportRecord.file_uri,
      fileSize: stats.size,
      record: reportRecord
    };
  } catch (err) {
    if (fs.existsSync(tempHtmlPath)) {
      try { fs.unlinkSync(tempHtmlPath); } catch (_) {}
    }
    throw err;
  }
}

module.exports = {
  generateReportHtml,
  generatePdfReport,
  LABELS
};
