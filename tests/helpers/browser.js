/**
 * Browser Helper for Cybergenix Automated E2E Testing Suite
 * Detects system Chrome / Chromium and launches headless session with CDP logging
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Known Google Chrome binary paths on macOS and Linux
const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
];

// Search paths for puppeteer
const PUPPETEER_PATHS = [
  'puppeteer',
  'puppeteer-core',
  '/Users/tanujpathak/.npm/_npx/ab5cd9f6d13a2312/node_modules/puppeteer',
  '/Users/tanujpathak/.npm/_npx/ab5cd9f6d13a2312/node_modules/puppeteer-core',
];

/**
 * Resolves puppeteer library from local or global cache
 */
export async function getPuppeteer() {
  for (const p of PUPPETEER_PATHS) {
    try {
      const mod = require(p);
      return mod.default || mod;
    } catch {
      // try next
    }
  }
  throw new Error('Puppeteer module could not be loaded. Please ensure puppeteer is available in the environment.');
}

/**
 * Locates executable Chrome binary
 */
export function getExecutablePath() {
  for (const candidate of CHROME_PATHS) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return undefined; // Let puppeteer use bundled if available
}

/**
 * Launches a headless browser instance with standard security/sandbox flags
 */
export async function launchBrowser(options = {}) {
  const puppeteer = await getPuppeteer();
  const executablePath = getExecutablePath();

  const launchArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--no-first-run',
    '--no-zygote',
    '--mute-audio',
    ...(options.args || []),
  ];

  const browser = await puppeteer.launch({
    headless: options.headless !== undefined ? options.headless : true,
    executablePath: executablePath,
    args: launchArgs,
    defaultViewport: null,
  });

  return browser;
}

/**
 * Creates a new page configured with console error interception and viewport
 */
export async function createInstrumentedPage(browser, viewport = { width: 1280, height: 800 }) {
  const page = await browser.newPage();
  
  if (viewport) {
    await page.setViewport(viewport);
  }

  const logs = {
    errors: [],
    warnings: [],
    pageErrors: [],
  };

  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      logs.errors.push({ type, text, location: msg.location() });
    } else if (type === 'warning') {
      logs.warnings.push({ type, text });
    }
  });

  page.on('pageerror', (err) => {
    logs.pageErrors.push(err.message || String(err));
  });

  // Inject testing flags to disable smooth scroll hijackers during tests if needed
  await page.evaluateOnNewDocument(() => {
    window.__TESTING__ = true;
  });

  return { page, logs };
}
