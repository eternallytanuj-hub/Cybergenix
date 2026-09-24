/**
 * Test Reporter for Cybergenix Automated E2E Testing Suite
 * Formats tier execution output and writes test-results.json
 */

import fs from 'node:fs';
import path from 'node:path';

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

export class TestReporter {
  constructor(options = {}) {
    this.options = options;
    this.reportPath = options.reportPath || path.resolve(process.cwd(), 'tests/test-results.json');
    this.startTime = Date.now();
    this.results = [];
    this.currentTier = null;
    this.tierSummaries = {
      tier1_feature_coverage: { total: 0, passed: 0, failed: 0, skipped: 0 },
      tier2_boundary_viewports: { total: 0, passed: 0, failed: 0, skipped: 0 },
      tier3_cross_feature_interactions: { total: 0, passed: 0, failed: 0, skipped: 0 },
      tier4_real_world_workload: { total: 0, passed: 0, failed: 0, skipped: 0 },
    };
    this.consoleErrors = [];
  }

  logHeader(title) {
    console.log(`\n${COLORS.bold}${COLORS.cyan}======================================================================${COLORS.reset}`);
    console.log(`${COLORS.bold}${COLORS.cyan}  ${title}${COLORS.reset}`);
    console.log(`${COLORS.bold}${COLORS.cyan}======================================================================${COLORS.reset}\n`);
  }

  startTier(tierKey, tierTitle) {
    this.currentTier = tierKey;
    console.log(`\n${COLORS.bold}${COLORS.yellow}▶ [${tierKey.toUpperCase()}] ${tierTitle}${COLORS.reset}`);
    console.log(`${COLORS.dim}----------------------------------------------------------------------${COLORS.reset}`);
  }

  recordResult({ id, tier, title, status, durationMs, details = '', error = null }) {
    const isPass = status === 'PASS';
    const isSkip = status === 'SKIP';

    const tierMap = {
      1: 'tier1_feature_coverage',
      2: 'tier2_boundary_viewports',
      3: 'tier3_cross_feature_interactions',
      4: 'tier4_real_world_workload',
    };
    const key = tierMap[tier] || this.currentTier;

    if (this.tierSummaries[key]) {
      this.tierSummaries[key].total += 1;
      if (isPass) this.tierSummaries[key].passed += 1;
      else if (isSkip) this.tierSummaries[key].skipped += 1;
      else this.tierSummaries[key].failed += 1;
    }

    this.results.push({
      id,
      tier,
      title,
      status,
      durationMs: Math.round(durationMs),
      details,
      error: error ? (error.message || String(error)) : null,
    });

    const statusBadge = isPass
      ? `${COLORS.green}✔ PASS${COLORS.reset}`
      : isSkip
      ? `${COLORS.yellow}⚠ SKIP${COLORS.reset}`
      : `${COLORS.red}✖ FAIL${COLORS.reset}`;

    const timing = `${COLORS.dim}(${Math.round(durationMs)}ms)${COLORS.reset}`;
    console.log(`  ${statusBadge} ${COLORS.bold}${id}${COLORS.reset} - ${title} ${timing}`);
    if (details && !isPass) {
      console.log(`     ${COLORS.dim}${details}${COLORS.reset}`);
    }
    if (error) {
      console.log(`     ${COLORS.red}Error: ${error.message || error}${COLORS.reset}`);
    }
  }

  recordConsoleErrors(errors) {
    if (Array.isArray(errors)) {
      this.consoleErrors.push(...errors);
    }
  }

  finish() {
    const totalDuration = Date.now() - this.startTime;
    let total = 0;
    let passed = 0;
    let failed = 0;
    let skipped = 0;

    for (const summary of Object.values(this.tierSummaries)) {
      total += summary.total;
      passed += summary.passed;
      failed += summary.failed;
      skipped += summary.skipped;
    }

    console.log(`\n${COLORS.bold}${COLORS.cyan}======================================================================${COLORS.reset}`);
    console.log(`${COLORS.bold}  TEST SUITE SUMMARY${COLORS.reset}`);
    console.log(`${COLORS.dim}----------------------------------------------------------------------${COLORS.reset}`);
    console.log(`  Total Tests:    ${COLORS.bold}${total}${COLORS.reset}`);
    console.log(`  Passed:         ${COLORS.green}${COLORS.bold}${passed}${COLORS.reset}`);
    console.log(`  Failed:         ${failed > 0 ? COLORS.red : COLORS.reset}${COLORS.bold}${failed}${COLORS.reset}`);
    console.log(`  Skipped:        ${skipped > 0 ? COLORS.yellow : COLORS.reset}${COLORS.bold}${skipped}${COLORS.reset}`);
    console.log(`  Total Duration: ${Math.round(totalDuration)}ms`);
    console.log(`  Console Errors: ${this.consoleErrors.length === 0 ? COLORS.green + '0' : COLORS.red + this.consoleErrors.length}${COLORS.reset}`);
    console.log(`${COLORS.bold}${COLORS.cyan}======================================================================${COLORS.reset}\n`);

    const reportData = {
      timestamp: new Date().toISOString(),
      project: 'Cybergenix Security Website',
      targetUrl: this.options.targetUrl || 'http://localhost:5173',
      summary: {
        total,
        passed,
        failed,
        skipped,
        durationMs: totalDuration,
      },
      tiers: this.tierSummaries,
      consoleErrors: this.consoleErrors,
      results: this.results,
    };

    try {
      const dir = path.dirname(this.reportPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.reportPath, JSON.stringify(reportData, null, 2), 'utf-8');
      console.log(`  ${COLORS.dim}Structured test results saved to: ${this.reportPath}${COLORS.reset}\n`);
    } catch (err) {
      console.error(`Failed to write test report: ${err.message}`);
    }

    const hasFailed = failed > 0 || this.consoleErrors.length > 0;
    return hasFailed ? 1 : 0;
  }
}
