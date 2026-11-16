/**
 * RealityForge AI - Complete Beginner-Friendly User Guide PDF Generator
 * Compiles a comprehensive, professional English user guide in notebook style
 * using native headless Chromium without external npm dependencies.
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

function generateUserGuideHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RealityForge AI - Complete Beginner User Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4 portrait;
      margin: 12mm 14mm 12mm 14mm;
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
      line-height: 1.45;
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
      padding: 12px 16px;
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
      padding: 5px 12px;
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      border-radius: 4px;
      white-space: nowrap;
      transform: rotate(-1deg);
      background: #F0F9FF;
    }
    .notebook-title {
      font-family: 'Caveat', cursive, sans-serif;
      font-size: 22pt;
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
      gap: 6px;
      font-size: 7.5pt;
      border-top: 1px dashed #CBD5E1;
      padding-top: 6px;
      margin-top: 6px;
    }
    .meta-item strong { color: #0F172A; }

    /* Section Styling */
    h2 {
      font-family: 'Caveat', cursive, sans-serif;
      font-size: 14pt;
      color: #0F172A;
      margin: 12px 0 4px 0;
      padding-bottom: 2px;
      border-bottom: 1.5px solid #E2E8F0;
      page-break-after: avoid;
      break-after: avoid;
    }
    h3 {
      font-size: 9pt;
      font-weight: 700;
      color: #0F172A;
      margin: 8px 0 2px 0;
    }
    p { margin: 0 0 5px 0; }
    ul, ol { margin: 0 0 6px 0; padding-left: 18px; }
    li { margin-bottom: 3px; }

    /* Guide Cards */
    .step-card {
      border: 1px solid #CBD5E1;
      border-radius: 5px;
      background: #FFFFFF;
      padding: 8px 12px;
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 1px 1px 2px rgba(0,0,0,0.02);
    }
    .step-badge {
      display: inline-block;
      background: #0F172A;
      color: #FFFFFF;
      font-size: 7pt;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      margin-right: 6px;
      text-transform: uppercase;
    }

    /* Prompt Box */
    .prompt-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-left: 3.5px solid #0284C7;
      padding: 6px 10px;
      border-radius: 0 4px 4px 0;
      margin: 5px 0 6px 0;
      font-size: 8pt;
    }
    .prompt-box strong {
      color: #0369A1;
      display: block;
      margin-bottom: 2px;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .prompt-text {
      font-family: 'JetBrains Mono', Consolas, monospace;
      color: #0F172A;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      padding: 4px 8px;
      border-radius: 3px;
      display: block;
      margin-top: 3px;
      user-select: all;
    }

    /* Callouts */
    .callout {
      padding: 6px 10px;
      border-radius: 4px;
      margin: 6px 0;
      font-size: 8pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .callout.tip { background: #F0FDF4; border-left: 3.5px solid #16A34A; color: #14532D; }
    .callout.warning { background: #FEF2F2; border-left: 3.5px solid #EF4444; color: #7F1D1D; }
    .callout.info { background: #F0F9FF; border-left: 3.5px solid #0284C7; color: #0C4A6E; }

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

    .page-break {
      page-break-before: always;
      break-before: page;
    }
  </style>
</head>
<body>

  <!-- Page 1: Header & Getting Started -->
  <div class="notebook-header">
    <div class="notebook-header-top">
      <div class="title-container">
        <div class="notebook-title">RealityForge AI: Complete Beginner's User Guide</div>
        <div class="notebook-subtitle">Step-by-Step Manual for Multi-Agent Software Intelligence & Gated Engineering</div>
      </div>
      <div class="notebook-stamp">Official User Guide</div>
    </div>
    <div class="meta-grid">
      <div class="meta-item"><strong>Platform:</strong> Google Antigravity</div>
      <div class="meta-item"><strong>System Version:</strong> RealityForge v2.0</div>
      <div class="meta-item"><strong>Language:</strong> English (Permanent Default)</div>
      <div class="meta-item"><strong>Safety Model:</strong> Human-Gated Engineering</div>
    </div>
  </div>

  <div class="callout tip">
    <strong>👋 Welcome to RealityForge AI!</strong><br>
    RealityForge AI is your collaborative software engineering assistant. It organizes specialized AI agents (like Project Analysts, Security Reviewers, System Architects, and Decision Coordinators) to analyze your code, find defects, propose safe solutions, and report every verified result in clean, human-readable documents.
  </div>

  <!-- Step 1 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 1</span> How to Start RealityForge AI in Google Antigravity</h3>
    <p>Starting RealityForge AI is completely automatic. You do not need to install complex software or configure terminals:</p>
    <ol>
      <li>Open your Google Antigravity application or active project workspace.</li>
      <li>Start a conversation turn by simply asking Antigravity to use the RealityForge AI skill.</li>
      <li>Because RealityForge AI is registered in your global configuration, it activates instantly in any workspace.</li>
    </ol>
    <div class="prompt-box">
      <strong>Ready-to-Copy Prompt:</strong>
      <span class="prompt-text">"Use RealityForge AI to inspect and analyze my current project."</span>
    </div>
  </div>

  <!-- Step 2 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 2</span> How to Open a Project and Choose an Operating Mode</h3>
    <p>RealityForge AI operates under two clear, non-confusing modes depending on your goal:</p>
    <ul>
      <li><strong>1. Analysis Mode (Read-Only):</strong> The AI only inspects, audits, and reads your files. It never edits, creates, or deletes your source code. Perfect for audits, architecture reviews, and discovering bugs.</li>
      <li><strong>2. Engineering Mode (Approval-Gated):</strong> Used when you want the AI to fix a bug or add a feature. The AI creates a safety baseline and stops to ask for your explicit permission before touching any code.</li>
    </ul>
    <div class="prompt-box">
      <strong>Ready-to-Copy Prompt (Read-Only Analysis):</strong>
      <span class="prompt-text">"Run RealityForge AI in Analysis Mode only. Scan my codebase and explain what it does."</span>
    </div>
  </div>

  <!-- Step 3 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 3</span> How to Verify the Globally Registered Skill is Loaded</h3>
    <p>RealityForge AI is permanently registered in your global Antigravity manifest located at <code>C:\\Users\\ADMIN\\.gemini\\config\\skills.json</code>. You can easily confirm that it is active:</p>
    <div class="prompt-box">
      <strong>Ready-to-Copy Verification Prompt:</strong>
      <span class="prompt-text">"Check if the RealityForge AI skill is registered and display its 14 specialized agents."</span>
    </div>
    <p>The agent will confirm that <code>realityforge-ai</code> is discovered and show available workflows (Discovery, Simulation, Decision, Implementation, and Learn).</p>
  </div>

  <!-- Page Break to Page 2 -->
  <div class="page-break"></div>

  <!-- Page 2: Workflows, Analysis & Multi-Agent Collaboration -->
  <h2>Multi-Agent Discovery & Defect Analysis</h2>

  <!-- Step 4 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 4</span> How to Run Project Analysis (Discovery)</h3>
    <p>When you start a project analysis, the <strong>Project Analyst</strong> agent scans your project structure without modifying files:</p>
    <ul>
      <li>Maps your technologies (Node.js, Python, TypeScript, React, Express, etc.).</li>
      <li>Identifies main entry points (such as <code>index.js</code>, <code>server.js</code>, or <code>main.py</code>).</li>
      <li>Lists discovered components and services.</li>
    </ul>
    <div class="prompt-box">
      <strong>Ready-to-Copy Prompt:</strong>
      <span class="prompt-text">"Run the RealityForge Discovery Workflow on my repository and provide a beginner-friendly overview."</span>
    </div>
  </div>

  <!-- Step 5 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 5</span> How Independent Multi-Agent Workflows Work</h3>
    <p>RealityForge AI does not simulate different roles sequentially—it launches genuinely independent subagents that collaborate in parallel:</p>
    <table>
      <thead>
        <tr><th>Agent Role</th><th>Execution Model</th><th>What It Does For You</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Project Analyst</strong></td><td>Subagent (Parallel)</td><td>Discovers folders, packages, and code architecture.</td></tr>
        <tr><td><strong>Security Analyst</strong></td><td>Subagent (Parallel)</td><td>Checks for exposed passwords, secrets, and insecure dependencies.</td></tr>
        <tr><td><strong>System Architect</strong></td><td>Subagent (Handoff)</td><td>Receives findings from Analyst and assesses code stability.</td></tr>
        <tr><td><strong>Decision Coordinator</strong></td><td>Coordinator Agent</td><td>Resolves conflicts using security veto rules and establishes consensus.</td></tr>
      </tbody>
    </table>
    <div class="prompt-box">
      <strong>Ready-to-Copy Prompt:</strong>
      <span class="prompt-text">"Execute the RealityForge Independent Multi-Agent Workflow to audit my project concurrently."</span>
    </div>
  </div>

  <!-- Step 6 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 6</span> How Bugs and Security Risks are Reported</h3>
    <p>Instead of overwhelming you with long stack traces or confusing error logs, RealityForge AI reports every problem using a 5-point beginner format:</p>
    <ul>
      <li>🔴 <strong>PROBLEM:</strong> A clear, plain-language explanation of what broke.</li>
      <li>⚠️ <strong>WHY IT MATTERS:</strong> How this defect hurts users, freezes screens, or crashes the app.</li>
      <li>🛠️ <strong>SOLUTION:</strong> What code logic needs to be changed.</li>
      <li>📊 <strong>RESULT:</strong> Verification outcome (whether tested, fixed, or proposed).</li>
      <li>💡 <strong>EXAMPLE:</strong> A simple before-and-after story explaining the fix in everyday language.</li>
    </ul>
  </div>

  <!-- Page Break to Page 3 -->
  <div class="page-break"></div>

  <!-- Page 3: Safe Code Changes, Testing & Reports -->
  <h2>Safe Code Modifications, Testing & PDF Delivery</h2>

  <!-- Step 7 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 7</span> How to Request Solutions and Approve Changes Safely</h3>
    <p>RealityForge AI protects your codebase using non-bypassable <strong>Human Approval Gates</strong>:</p>
    <ol>
      <li><strong>Proposal:</strong> The AI writes an Implementation Plan showing the exact files and lines to change.</li>
      <li><strong>Gate 1 (Your Approval):</strong> The AI stops completely. No files are edited until you explicitly state your approval.</li>
      <li><strong>Safety Baseline:</strong> Before writing any code, the system verifies a recoverable Git baseline or creates a safe feature branch (e.g. <code>realityforge/fix-bug-name</code>).</li>
      <li><strong>Deterministic Rollback:</strong> If any test fails, changes can be instantly reverted back to the clean baseline.</li>
    </ol>
    <div class="prompt-box">
      <strong>Example Approval Prompt:</strong>
      <span class="prompt-text">"I approve Gate 1. Apply the proposed division-by-zero error handling change to src/calculator.js only."</span>
    </div>
  </div>

  <!-- Step 8 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 8</span> How to Run Automated Testing (The Truthfulness Standard)</h3>
    <p>RealityForge AI follows a strict <strong>Truthfulness Standard</strong>: a defect is <em>never</em> reported as fixed unless automated tests were genuinely executed in the system and returned exit code <code>0</code>.</p>
    <div class="callout info">
      <strong>Gate 2 Consent:</strong> Before running any test suite (like <code>npm test</code> or <code>pytest</code>), the AI will ask for your consent so you always stay in full control of terminal execution.
    </div>
  </div>

  <!-- Step 9 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 9</span> How to Generate and Download PDF Reports</h3>
    <p>After any workflow or verification completes, the system automatically builds a single professional PDF notebook:</p>
    <ul>
      <li><strong>REPORT READY Card:</strong> Displays project name, report title, and verification badge.</li>
      <li><strong>👁️ [VIEW PDF] Button:</strong> Opens the PDF in a new browser tab or launches your default Windows PDF viewer.</li>
      <li><strong>📥 [DOWNLOAD PDF] Button:</strong> Delivers the exact <code>application/pdf</code> binary to your computer's Downloads folder.</li>
    </ul>
  </div>

  <!-- Step 10 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 10</span> How to Access Previous PDF Reports</h3>
    <p>Every report is permanently archived and never deleted:</p>
    <ul>
      <li><strong>Reports Directory:</strong> Open <code>C:\\Users\\ADMIN\\Desktop\\RealityForge\\realityforge_ai\\reports\\</code>.</li>
      <li><strong>History Manifest:</strong> Check <code>report_history.json</code> to view dates, file sizes, and IDs of past audits.</li>
      <li><strong>Local Secure Portal:</strong> Open <code>http://127.0.0.1:4567/</code> in any browser to view and download all past reports.</li>
    </ul>
  </div>

  <!-- Page Break to Page 4 -->
  <div class="page-break"></div>

  <!-- Page 4: Troubleshooting & Ready-to-Copy Cheat Sheet -->
  <h2>Troubleshooting & Ready-to-Copy Prompts</h2>

  <!-- Step 11 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 11</span> How to Troubleshoot Common Situations</h3>
    <table>
      <thead>
        <tr><th>Situation / Error</th><th>Why It Happens</th><th>How to Resolve</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Access Denied Outside Project</strong></td>
          <td>Antigravity sandboxes protect external folders from unauthorized reading.</td>
          <td>Run workflows on your active workspace or test fixtures. Use <code>run_workflow</code> with explicit workspace directory.</td>
        </tr>
        <tr>
          <td><strong>Tests Not Configured</strong></td>
          <td>The target project lacks a <code>test</code> script in <code>package.json</code>.</td>
          <td>RealityForge truthfully reports: <code>Unit Tests: NOT CONFIGURED</code>. Add a test script or approve adding tests.</td>
        </tr>
        <tr>
          <td><strong>Port 4567 Busy</strong></td>
          <td>Another local service is using port 4567.</td>
          <td>The report viewer automatically detects busy ports and binds safely to an available dynamic port.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Step 12 -->
  <div class="step-card">
    <h3><span class="step-badge">Step 12</span> Ready-to-Copy Prompts Cheat Sheet</h3>
    <p>Use these prompts anytime during your Antigravity chat sessions:</p>

    <div class="prompt-box">
      <strong>1. Start Codebase Discovery (Read-Only):</strong>
      <span class="prompt-text">"RealityForge AI, analyze my current project in Analysis Mode only and show findings in chat."</span>
    </div>

    <div class="prompt-box">
      <strong>2. Run Security & Vulnerability Scan:</strong>
      <span class="prompt-text">"Run the RealityForge Security Analyst to audit secret leaks, dangerous dependencies, and inputs."</span>
    </div>

    <div class="prompt-box">
      <strong>3. Run Concurrent Multi-Agent Team:</strong>
      <span class="prompt-text">"Execute the RealityForge Multi-Agent workflow with parallel Project and Security analysts."</span>
    </div>

    <div class="prompt-box">
      <strong>4. Propose Safe Code Improvement:</strong>
      <span class="prompt-text">"Propose a fix for [describe problem]. Present an Implementation Plan and stop for Gate 1 approval."</span>
    </div>

    <div class="prompt-box">
      <strong>5. Approve Implementation & Run Tests:</strong>
      <span class="prompt-text">"I approve Gate 1 and Gate 2. Create a safe Git branch, apply the fix, and run automated tests."</span>
    </div>

    <div class="prompt-box">
      <strong>6. Generate & Deliver PDF Report:</strong>
      <span class="prompt-text">"Generate the final human-readable English PDF report and provide View and Download buttons."</span>
    </div>
  </div>

  <div class="callout tip">
    <strong>💡 Pro Tip:</strong> You can keep this User Guide PDF saved on your computer for quick reference whenever you start working on a new software project with RealityForge AI!
  </div>

</body>
</html>`;
}

function compileUserGuidePdf() {
  const browserBin = getBrowserBinary();
  const reportsDir = path.resolve(__dirname, '..', 'reports');

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const outputPdfPath = path.join(reportsDir, 'RF-Report-RealityForge-User-Guide.pdf');
  const tempHtmlPath = path.join(reportsDir, 'temp-user-guide.html');

  const html = generateUserGuideHtml();
  fs.writeFileSync(tempHtmlPath, html, 'utf8');

  console.log('[User Guide Generator] Rendering PDF via headless Chromium...');
  const cmd = `"${browserBin}" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "${tempHtmlPath}"`;
  execSync(cmd, { stdio: 'ignore' });

  // Wait for file creation
  let waited = 0;
  while (!fs.existsSync(outputPdfPath) && waited < 5000) {
    const start = Date.now();
    while (Date.now() - start < 200) {}
    waited += 200;
  }

  if (!fs.existsSync(outputPdfPath)) {
    throw new Error(`Failed to generate User Guide PDF at: ${outputPdfPath}`);
  }

  // Cleanup temp HTML
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  const stats = fs.statSync(outputPdfPath);
  console.log(`[User Guide Generator] ✅ Generated User Guide PDF: ${outputPdfPath} (${stats.size} bytes)`);

  // Register in report history
  const historyPath = path.join(reportsDir, 'report_history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (_) {
      history = [];
    }
  }

  const record = {
    report_id: `RF-USER-GUIDE-${Date.now()}`,
    title: "RealityForge AI: Complete Beginner's User Guide",
    project: "RealityForge AI Core",
    workflow: "User Documentation",
    language: "en",
    file_path: outputPdfPath,
    file_uri: `file:///${outputPdfPath.replace(/\\/g, '/')}`,
    generated_at: new Date().toISOString(),
    size_bytes: stats.size
  };

  history.unshift(record);
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf8');

  return {
    filePath: outputPdfPath,
    fileUri: record.file_uri,
    fileSize: stats.size,
    record
  };
}

if (require.main === module) {
  const result = compileUserGuidePdf();
  console.log('RESULT:' + JSON.stringify(result));
}

module.exports = {
  compileUserGuidePdf
};
