/**
 * RealityForge AI - Test Report Viewer and Download Endpoint
 * Validates that report_viewer.js starts cleanly on loopback,
 * serves the dashboard, serves PDF download with correct headers,
 * and resists path traversal attempts.
 */

const http = require('http');
const assert = require('assert');
const path = require('path');
const { createReportServer, DEFAULT_PORT } = require('../reporting/report_viewer');

async function runViewerTest() {
  console.log('🧪 Testing RealityForge Report Viewer & Download Server...');

  const viewer = createReportServer(0); // dynamic port
  const port = await viewer.start();
  console.log(`  ✅ Server successfully started on port ${port}`);

  function fetchUrl(pathname) {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}${pathname}`, (res) => {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks)
          });
        });
      }).on('error', reject);
    });
  }

  try {
    // 1. Dashboard Test
    const dash = await fetchUrl('/');
    assert.strictEqual(dash.statusCode, 200, 'Dashboard should return 200');
    assert.ok(dash.body.toString('utf8').includes('RealityForge AI'), 'Dashboard should include RealityForge title');
    assert.ok(dash.body.toString('utf8').includes('VIEW PDF'), 'Dashboard should include VIEW PDF button');
    assert.ok(dash.body.toString('utf8').includes('DOWNLOAD PDF'), 'Dashboard should include DOWNLOAD PDF button');
    console.log('  ✅ PASS: Dashboard UI rendered with VIEW and DOWNLOAD buttons');

    // 2. API Reports Test
    const api = await fetchUrl('/api/reports');
    assert.strictEqual(api.statusCode, 200, 'API reports should return 200');
    const reports = JSON.parse(api.body.toString('utf8'));
    assert.ok(Array.isArray(reports), 'API should return array of reports');
    assert.ok(reports.length > 0, 'Should have at least 1 registered report');
    console.log(`  ✅ PASS: API reports endpoint returned ${reports.length} report records`);

    const sampleReport = reports[0];
    const sampleFilename = path.basename(sampleReport.file_path);

    // 3. Download PDF Endpoint Test
    const dl = await fetchUrl(`/download?file=${encodeURIComponent(sampleFilename)}`);
    assert.strictEqual(dl.statusCode, 200, 'Download endpoint should return 200');
    assert.strictEqual(dl.headers['content-type'], 'application/pdf', 'Content-Type should be application/pdf');
    assert.ok(dl.headers['content-disposition'].includes('attachment'), 'Content-Disposition should be attachment');
    assert.ok(dl.body.slice(0, 5).toString('utf8').startsWith('%PDF-'), 'File content should begin with %PDF-');
    console.log(`  ✅ PASS: Download endpoint served valid application/pdf (${dl.body.length} bytes) with attachment disposition`);

    // 4. View PDF Endpoint Test
    const view = await fetchUrl(`/view?file=${encodeURIComponent(sampleFilename)}`);
    assert.strictEqual(view.statusCode, 200, 'View endpoint should return 200');
    assert.strictEqual(view.headers['content-type'], 'application/pdf', 'Content-Type should be application/pdf');
    assert.ok(view.headers['content-disposition'].includes('inline'), 'Content-Disposition should be inline');
    console.log('  ✅ PASS: View endpoint served valid inline application/pdf');

    // 5. Path Traversal Security Test
    const traversal = await fetchUrl('/download?file=../../package.json');
    assert.strictEqual(traversal.statusCode, 404, 'Path traversal should be blocked with 404');
    console.log('  ✅ PASS: Path traversal blocked successfully (404 Not Found)');

  } finally {
    await viewer.stop();
    console.log('  ✅ Server stopped cleanly');
  }

  console.log('\n🎉 ALL REPORT VIEWER TESTS PASSED!\n');
}

runViewerTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
