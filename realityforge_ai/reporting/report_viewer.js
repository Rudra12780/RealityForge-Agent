/**
 * RealityForge AI - Local Report Viewer & Secure Download Service
 * Pure Node.js HTTP server (zero npm dependencies) providing a genuine,
 * verified local dashboard with [VIEW PDF] and [DOWNLOAD PDF] actions.
 * 
 * Security:
 * - Listens ONLY on 127.0.0.1 (local loopback)
 * - Strict directory traversal sandboxing: requests outside `reports/` return 403 Forbidden
 * - Strictly serves application/pdf with proper Content-Disposition headers
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const REPORTS_DIR = path.resolve(__dirname, '..', 'reports');
const DEFAULT_PORT = 4567;

function getSafeReportPath(filename) {
  if (!filename) return null;
  // Prevent directory traversal
  const sanitized = path.basename(filename);
  const resolved = path.join(REPORTS_DIR, sanitized);
  if (!resolved.startsWith(REPORTS_DIR)) return null;
  if (!fs.existsSync(resolved)) return null;
  return resolved;
}

function getReportHistory() {
  const historyPath = path.join(REPORTS_DIR, 'report_history.json');
  if (!fs.existsSync(historyPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  } catch (_) {
    return [];
  }
}

function createReportServer(port = DEFAULT_PORT) {
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // 1. Dashboard UI (/)
    if (pathname === '/' || pathname === '/index.html') {
      const reports = getReportHistory();
      const reportRows = reports.map((r, i) => {
        const basename = path.basename(r.file_path);
        const sizeKb = Math.round((r.size_bytes || 0) / 1024);
        return `
        <tr style="border-bottom: 1px solid #E2E8F0;">
          <td style="padding: 12px 16px; font-weight: 600; color: #0F172A;">${r.title || 'RealityForge Report'}</td>
          <td style="padding: 12px 16px; color: #475569;">${r.project || 'General'}</td>
          <td style="padding: 12px 16px; color: #475569;">${r.workflow || 'Verification'}</td>
          <td style="padding: 12px 16px; color: #64748B; font-size: 13px;">${sizeKb} KB</td>
          <td style="padding: 12px 16px; text-align: right; white-space: nowrap;">
            <a href="/view?file=${encodeURIComponent(basename)}" target="_blank" 
               style="display: inline-block; padding: 7px 14px; background: #0284C7; color: #FFF; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px; margin-right: 8px;">
               👁️ VIEW PDF
            </a>
            <a href="/download?file=${encodeURIComponent(basename)}" 
               style="display: inline-block; padding: 7px 14px; background: #16A34A; color: #FFF; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px;">
               📥 DOWNLOAD PDF
            </a>
          </td>
        </tr>
        `;
      }).join('');

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RealityForge AI - Report Delivery Portal</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #F8FAFC; color: #0F172A; margin: 0; padding: 40px 20px; }
    .container { max-width: 960px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #E2E8F0; overflow: hidden; }
    .header { background: #0F172A; color: #FFFFFF; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
    .badge { background: #0284C7; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
    .table-container { padding: 16px; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { padding: 12px 16px; background: #F1F5F9; color: #475569; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>RealityForge AI &bull; Verified Report Delivery Portal</h1>
        <p style="margin: 4px 0 0 0; color: #94A3B8; font-size: 13px;">Local Secure Report Server (127.0.0.1)</p>
      </div>
      <span class="badge">SECURE LOOPBACK</span>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Report Title</th>
            <th>Project</th>
            <th>Workflow</th>
            <th>Size</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${reportRows || '<tr><td colspan="5" style="padding: 24px; text-align: center; color: #94A3B8;">No reports generated yet.</td></tr>'}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    // 2. View PDF (/view?file=...)
    if (pathname === '/view') {
      const filename = query.file;
      const safePath = getSafeReportPath(filename);
      if (!safePath) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Report file not found or invalid access.');
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${path.basename(safePath)}"`,
        'Content-Length': fs.statSync(safePath).size
      });
      fs.createReadStream(safePath).pipe(res);
      return;
    }

    // 3. Download PDF (/download?file=...)
    if (pathname === '/download') {
      const filename = query.file;
      const safePath = getSafeReportPath(filename);
      if (!safePath) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Report file not found or invalid access.');
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${path.basename(safePath)}"`,
        'Content-Length': fs.statSync(safePath).size
      });
      fs.createReadStream(safePath).pipe(res);
      return;
    }

    // 4. API Endpoint: list reports in JSON (/api/reports)
    if (pathname === '/api/reports') {
      const reports = getReportHistory();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(reports));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  });

  return {
    server,
    start: () => new Promise((resolve, reject) => {
      server.listen(port, '127.0.0.1', () => {
        const actualPort = server.address().port;
        console.log(`[Report Viewer] Server running at http://127.0.0.1:${actualPort}/`);
        resolve(actualPort);
      }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          // Port in use, retry with ephemeral port 0
          server.listen(0, '127.0.0.1', () => {
            const actualPort = server.address().port;
            console.log(`[Report Viewer] Server running on dynamic port http://127.0.0.1:${actualPort}/`);
            resolve(actualPort);
          });
        } else {
          reject(err);
        }
      });
    }),
    stop: () => new Promise((resolve) => server.close(resolve))
  };
}

if (require.main === module) {
  const viewer = createReportServer(DEFAULT_PORT);
  viewer.start().catch(console.error);
}

module.exports = {
  createReportServer,
  getSafeReportPath,
  getReportHistory,
  DEFAULT_PORT
};
