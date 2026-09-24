#!/usr/bin/env node

/**
 * Cybergenix Security Website — Automated E2E Test Runner
 * Executes 4-Tier test architecture validating zero console errors,
 * 4 responsive viewports, interactive elements, and end-to-end user flows.
 *
 * Usage:
 *   node tests/test_runner.js [--url <URL>] [--tier <1|2|3|4|all>] [--strict]
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launchBrowser, createInstrumentedPage } from './helpers/browser.js';
import { TestReporter } from './helpers/reporter.js';
import { isServerRunning, waitForServer } from './helpers/server.js';
import { runTier1Tests } from './e2e/console_errors.spec.js';
import { runTier2Tests } from './e2e/responsiveness.spec.js';
import { runTier3Tests } from './e2e/interactions.spec.js';
import { runTier4Tests } from './e2e/full_flow.spec.js';

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    targetUrl: 'http://localhost:5173',
    tier: 'all',
    strict: false,
    headless: true,
    reportPath: path.resolve(process.cwd(), 'tests/test-results.json'),
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--url' && args[i + 1]) {
      options.targetUrl = args[++i];
    } else if (arg.startsWith('--url=')) {
      options.targetUrl = arg.split('=')[1];
    } else if (arg === '--tier' && args[i + 1]) {
      options.tier = args[++i];
    } else if (arg.startsWith('--tier=')) {
      options.tier = arg.split('=')[1];
    } else if (arg === '--strict') {
      options.strict = true;
    } else if (arg === '--headless=false' || arg === '--no-headless') {
      options.headless = false;
    } else if (arg === '--report' && args[i + 1]) {
      options.reportPath = path.resolve(process.cwd(), args[++i]);
    }
  }

  return options;
}

async function main() {
  const options = parseArgs();
  const reporter = new TestReporter({
    reportPath: options.reportPath,
    targetUrl: options.targetUrl,
  });

  reporter.logHeader('CYBERGENIX SECURITY — E2E TEST RUNNER');
  console.log(`  Target URL:   ${options.targetUrl}`);
  console.log(`  Selected Tier: ${options.tier.toUpperCase()}`);
  console.log(`  Strict Mode:  ${options.strict ? 'ENABLED' : 'DISABLED (Progressive)'}`);
  console.log(`  Headless:     ${options.headless}`);

  // Check if target server is reachable
  const serverUp = await isServerRunning(options.targetUrl);
  if (!serverUp) {
    console.log(`\n  Notice: Server at ${options.targetUrl} is not currently responding.`);
    console.log(`  Attempting wait for 3000ms in case server is warming up...`);
    const ready = await waitForServer(options.targetUrl, 3000);
    if (!ready) {
      console.error(`\n  ✖ Error: Could not connect to web server at ${options.targetUrl}.`);
      console.error(`  Please make sure your development or preview server is running:`);
      console.error(`    npm run dev   (or npm run preview)\n`);
      process.exit(1);
    }
  }

  let browser;
  let exitCode = 1;

  try {
    console.log(`\n  Launching headless browser harness...`);
    browser = await launchBrowser({ headless: options.headless });
    const { page, logs } = await createInstrumentedPage(browser, { width: 1280, height: 800 });

    const runAll = options.tier === 'all';

    // Tier 1: Feature Coverage & Structural DOM Integrity
    if (runAll || options.tier === '1') {
      await runTier1Tests({
        page,
        logs,
        targetUrl: options.targetUrl,
        reporter,
        strict: options.strict,
      });
    }

    // Tier 2: Boundary & Viewports
    if (runAll || options.tier === '2') {
      await runTier2Tests({
        page,
        targetUrl: options.targetUrl,
        reporter,
      });
    }

    // Tier 3: Cross-Feature Interactions
    if (runAll || options.tier === '3') {
      await runTier3Tests({
        page,
        targetUrl: options.targetUrl,
        reporter,
      });
    }

    // Tier 4: Real-World Workload & End-to-End User Session
    if (runAll || options.tier === '4') {
      await runTier4Tests({
        page,
        logs,
        targetUrl: options.targetUrl,
        reporter,
      });
    }

    exitCode = reporter.finish();
  } catch (err) {
    console.error(`\n  ✖ Fatal Test Execution Error:`, err);
    exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  process.exit(exitCode);
}

main();
