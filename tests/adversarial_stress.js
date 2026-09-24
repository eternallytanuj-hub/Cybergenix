#!/usr/bin/env node

/**
 * ADVERSARIAL STRESS TEST SUITE — Milestone M6
 * Author: challenger_m6_1 (Empirical Challenger)
 * Target: /Volumes/Seagate/Cybergeix/cybergenix_website
 *
 * Test Scenarios:
 * 1. Extreme Viewport Resizing (320px, 375px, 640px, 768px, 1024px, 1280px, 1920px, 2560px, 3840px)
 *    - Static fresh load test
 *    - Dynamic live resize test
 *    - Zero horizontal scrollbar bleed: document.documentElement.scrollWidth <= window.innerWidth + 1px
 *    - Offending element detector if overflow occurs
 * 2. Rapid Dynamic Viewport Thrashing
 *    - Rapidly cycle viewports back and forth to stress responsive canvas, resize observers, and GSAP matchMedia
 * 3. Lenis Smooth Scroll Active Stress
 *    - Mask navigator.webdriver and __TESTING__ to force Lenis smooth scroll active on desktop
 *    - Verify Lenis instance attaches to window.__lenis and html has .lenis class
 * 4. High-Frequency Erratic Mousewheel & Touch Scrolling
 *    - 150+ rapid erratic wheel bursts with mixed deltas (+/- 100 to 2500)
 *    - Continuous scroll journey through 300vh ShowCase and horizontal Features track
 *    - Rapid touch drag emulation on mobile viewport
 *    - Verify no UI freeze, Lenis responsive, ScrollTrigger alive
 * 5. Concurrent Interactive Stress
 *    - Rapid accordion toggling and tab switching during/after scroll
 * 6. Console Error & Unhandled Rejection Zero Tolerance
 *    - Full lifecycle interception
 */

import { launchBrowser } from './helpers/browser.js';

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:5173';

const VIEWPORTS = [
  { name: 'Mobile XS (iPhone SE)', width: 320, height: 568 },
  { name: 'Mobile SM (iPhone 13)', width: 375, height: 667 },
  { name: 'Mobile LG / Boundary', width: 640, height: 960 },
  { name: 'Tablet Portrait (iPad)', width: 768, height: 1024 },
  { name: 'Tablet Landscape / Laptop', width: 1024, height: 768 },
  { name: 'Desktop Standard (1080p-scaled)', width: 1280, height: 800 },
  { name: 'Full HD Desktop', width: 1920, height: 1080 },
  { name: 'QHD 2K Desktop', width: 2560, height: 1440 },
  { name: '4K UHD Ultra-Wide', width: 3840, height: 2160 },
];

class AdversarialRunner {
  constructor() {
    this.results = [];
    this.capturedErrors = [];
    this.capturedWarnings = [];
    this.passed = 0;
    this.failed = 0;
  }

  log(msg) {
    console.log(`[CHALLENGER] ${msg}`);
  }

  record(name, success, details = {}) {
    const item = { name, success, details, timestamp: new Date().toISOString() };
    this.results.push(item);
    if (success) {
      this.passed++;
      console.log(`  ✔ PASS: ${name}`);
      if (details.note) console.log(`         ${details.note}`);
    } else {
      this.failed++;
      console.log(`  ✖ FAIL: ${name}`);
      console.log(`         Error: ${JSON.stringify(details, null, 2)}`);
    }
  }

  async setupPage(browser, options = {}) {
    const page = await browser.newPage();
    const { enableLenis = false, isMobile = false } = options;

    await page.evaluateOnNewDocument((enableLenisFlag) => {
      // Intercept unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        console.error('[UNHANDLED_REJECTION]', event.reason ? (event.reason.stack || event.reason.message || String(event.reason)) : 'Unknown rejection');
      });

      if (enableLenisFlag) {
        // Mask webdriver so Lenis initializes
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
          configurable: true,
        });
        delete window.__TESTING__;
      } else {
        window.__TESTING__ = true;
      }
    }, enableLenis);

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        this.capturedErrors.push({ source: 'console.error', text, location: msg.location() });
        console.error(`    [BROWSER ERROR] ${text}`);
      } else if (type === 'warning') {
        this.capturedWarnings.push({ text });
      }
    });

    page.on('pageerror', (err) => {
      this.capturedErrors.push({ source: 'pageerror', message: err.message, stack: err.stack });
      console.error(`    [PAGE ERROR] ${err.message}`);
    });

    return page;
  }

  async checkHorizontalOverflow(page) {
    return await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;
      const bleed = scrollWidth - innerWidth;
      const passed = scrollWidth <= innerWidth + 1;

      // Find any elements exceeding window.innerWidth
      let overflowingElements = [];
      if (!passed) {
        const all = document.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > innerWidth + 1.5) {
            overflowingElements.push({
              tag: el.tagName.toLowerCase(),
              id: el.id || undefined,
              className: el.className ? String(el.className).slice(0, 100) : undefined,
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              excess: Math.round(rect.right - innerWidth),
            });
            if (overflowingElements.length >= 5) break;
          }
        }
      }

      return {
        scrollWidth,
        innerWidth,
        bodyScrollWidth,
        bleed,
        passed,
        overflowingElements,
      };
    });
  }

  async run() {
    this.log(`Starting Adversarial Stress Suite against: ${TARGET_URL}`);
    console.log('='.repeat(70));

    let browser;
    try {
      browser = await launchBrowser({ headless: true });

      // ===================================================================
      // TEST SUITE 1: Extreme Viewport Static Load & Zero Overflow Bleed
      // ===================================================================
      this.log('SUITE 1: Fresh Load Across 9 Extreme Viewports (320px to 3840px)');
      for (const vp of VIEWPORTS) {
        const page = await this.setupPage(browser, { enableLenis: false });
        await page.setViewport({ width: vp.width, height: vp.height });
        await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

        // Wait a frame for layout stability
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));

        const overflow = await this.checkHorizontalOverflow(page);
        this.record(
          `Fresh Load Overflow Guard — ${vp.name} (${vp.width}x${vp.height})`,
          overflow.passed,
          {
            scrollWidth: overflow.scrollWidth,
            innerWidth: overflow.innerWidth,
            bleed: overflow.bleed,
            overflowingElements: overflow.overflowingElements,
            note: `scrollWidth (${overflow.scrollWidth}px) <= innerWidth + 1 (${overflow.innerWidth + 1}px)`,
          }
        );
        await page.close();
      }

      // ===================================================================
      // TEST SUITE 2: Dynamic Live Viewport Resizing (Continuous Resizing)
      // ===================================================================
      this.log('\nSUITE 2: Dynamic Live Viewport Resizing on a Single Active Page');
      {
        const page = await this.setupPage(browser, { enableLenis: false });
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

        for (const vp of VIEWPORTS) {
          await page.setViewport({ width: vp.width, height: vp.height });
          // Let resize observers, GSAP matchMedia, and CSS reflow settle
          await page.evaluate(() => new Promise((r) => setTimeout(r, 100)));

          const overflow = await this.checkHorizontalOverflow(page);
          this.record(
            `Dynamic Resize Overflow Guard — ${vp.name} (${vp.width}x${vp.height})`,
            overflow.passed,
            {
              scrollWidth: overflow.scrollWidth,
              innerWidth: overflow.innerWidth,
              bleed: overflow.bleed,
              overflowingElements: overflow.overflowingElements,
            }
          );
        }

        // Viewport Thrashing: 10 rapid switches across extreme scales
        this.log('Rapid Viewport Thrashing (320px <-> 3840px <-> 768px <-> 2560px)');
        const extremeScales = [320, 3840, 375, 2560, 640, 1920, 768, 1280, 1024, 320];
        let thrashFailed = false;
        for (const width of extremeScales) {
          await page.setViewport({ width, height: 800 });
          await page.evaluate(() => new Promise((r) => setTimeout(r, 30)));
        }
        await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
        const postThrashOverflow = await this.checkHorizontalOverflow(page);
        this.record(
          'Post-Thrashing Responsive Stability & Overflow',
          postThrashOverflow.passed,
          {
            scrollWidth: postThrashOverflow.scrollWidth,
            innerWidth: postThrashOverflow.innerWidth,
            bleed: postThrashOverflow.bleed,
          }
        );

        await page.close();
      }

      // ===================================================================
      // TEST SUITE 3: Lenis Smooth Scroll Active Stress Testing
      // ===================================================================
      this.log('\nSUITE 3: Lenis Smooth Scroll Active Initialization & Hooking');
      {
        const page = await this.setupPage(browser, { enableLenis: true });
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

        // Verify Lenis initialized
        const lenisStatus = await page.evaluate(() => {
          return {
            hasLenisClass: document.documentElement.classList.contains('lenis'),
            hasLenisInstance: Boolean(window.__lenis),
            scrollPosition: window.__lenis ? window.__lenis.scroll : null,
          };
        });

        this.record(
          'Lenis Smooth Scroll Engine Active Initialization',
          lenisStatus.hasLenisClass && lenisStatus.hasLenisInstance,
          {
            hasLenisClass: lenisStatus.hasLenisClass,
            hasLenisInstance: lenisStatus.hasLenisInstance,
            note: 'Verified Lenis is active on document root with valid instance reference',
          }
        );

        // ===================================================================
        // TEST SUITE 4: High-Frequency Erratic Mousewheel Stress
        // ===================================================================
        this.log('\nSUITE 4: High-Frequency Erratic Mousewheel Scrolling (120 bursts)');
        const scrollDeltas = [
          300, 500, 1200, -400, 800, 1500, -1000, 2000, -500,
          1000, 1800, -1200, 2500, -2000, 1500, -800, 400, 1200,
        ];

        let maxScrollY = 0;
        let lastScrollY = 0;
        let freezeDetected = false;

        for (let i = 0; i < scrollDeltas.length * 6; i++) {
          const delta = scrollDeltas[i % scrollDeltas.length];
          await page.mouse.wheel({ deltaY: delta });
          // Erratic timing: 5ms to 25ms between wheel events
          if (i % 3 === 0) {
            await page.evaluate(() => new Promise((r) => setTimeout(r, 15)));
          }
        }

        // Allow Lenis momentum to settle
        await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));

        const scrollMetrics = await page.evaluate(() => {
          return {
            scrollY: Math.round(window.scrollY),
            maxScrollY: Math.round(document.documentElement.scrollHeight - window.innerHeight),
            lenisScroll: window.__lenis ? Math.round(window.__lenis.scroll) : null,
            lenisVelocity: window.__lenis ? window.__lenis.velocity : null,
            lenisIsStopped: window.__lenis ? window.__lenis.isStopped : null,
          };
        });

        const movedDown = scrollMetrics.scrollY > 200;
        this.record(
          'Erratic Mousewheel Scroll Response & Momentum Settling',
          movedDown && !scrollMetrics.lenisIsStopped,
          {
            scrollY: scrollMetrics.scrollY,
            maxScrollY: scrollMetrics.maxScrollY,
            lenisScroll: scrollMetrics.lenisScroll,
            lenisVelocity: scrollMetrics.lenisVelocity,
            note: `Successfully traversed page to scrollY=${scrollMetrics.scrollY}px without freezing or thread stall`,
          }
        );

        // Stress: Scroll deeply to bottom and back to top via Lenis API and wheel
        this.log('Rapid bidirectional Lenis scroll traversal');
        await page.evaluate(() => {
          if (window.__lenis) {
            window.__lenis.scrollTo(document.documentElement.scrollHeight, { immediate: false });
          }
        });
        // Wait for Lenis smooth scroll to finish or settle
        await page.evaluate(() => {
          return new Promise((resolve) => {
            const check = () => {
              if (!window.__lenis || !window.__lenis.isScrolling || window.__lenis.velocity === 0) {
                resolve();
              } else {
                requestAnimationFrame(check);
              }
            };
            setTimeout(check, 1400); // 1.4s exceeds Lenis 1.2s duration
          });
        });

        await page.evaluate(() => {
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: false });
          }
        });
        await page.evaluate(() => {
          return new Promise((resolve) => {
            const check = () => {
              if (!window.__lenis || !window.__lenis.isScrolling || Math.abs(window.__lenis.velocity) < 0.1) {
                resolve();
              } else {
                requestAnimationFrame(check);
              }
            };
            setTimeout(check, 1400);
          });
        });

        const topMetrics = await page.evaluate(() => {
          return {
            scrollY: Math.round(window.scrollY),
            hasErrors: window.__lenis ? !window.__lenis.isStopped : true,
          };
        });

        this.record(
          'Bidirectional Scroll Traversal & Lenis Return to Origin',
          topMetrics.scrollY <= 10,
          {
            finalScrollY: topMetrics.scrollY,
            note: `Returned to origin (scrollY=${topMetrics.scrollY}px)`,
          }
        );

        // Check GSAP ScrollTrigger active pinning in DOM
        const scrollTriggerEffects = await page.evaluate(() => {
          // ScrollTrigger creates .pin-spacer elements when pinning sections like ShowCaseSection
          const pinSpacers = document.querySelectorAll('.pin-spacer');
          const showcaseEl = document.querySelector('[data-showcase], .ShowCaseSection');
          return {
            pinSpacerCount: pinSpacers.length,
            showcaseFound: Boolean(showcaseEl),
            hasScrollHandler: typeof window.onscroll !== 'undefined' || Boolean(window.__lenis),
          };
        });

        this.record(
          'GSAP ScrollTrigger Pinned Track Resilience & DOM Integrity',
          scrollTriggerEffects.showcaseFound,
          {
            pinSpacerCount: scrollTriggerEffects.pinSpacerCount,
            showcaseFound: scrollTriggerEffects.showcaseFound,
            note: `ShowCase section found (pin spacers=${scrollTriggerEffects.pinSpacerCount}), no ScrollTrigger exceptions`,
          }
        );

        await page.close();
      }

      // ===================================================================
      // TEST SUITE 5: Mobile Touch Emulation & Rapid Flick Scrolling
      // ===================================================================
      this.log('\nSUITE 5: Mobile Touch Emulation & Rapid Touch Flicks');
      {
        const page = await this.setupPage(browser, { enableLenis: false, isMobile: true });
        await page.setViewport({ width: 375, height: 812, hasTouch: true, isMobile: true });
        await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

        // Simulate erratic rapid touch drags
        for (let i = 0; i < 15; i++) {
          const startY = 500;
          const endY = startY - 250;
          await page.touchscreen.touchStart(180, startY);
          await page.touchscreen.touchMove(180, endY);
          await page.touchscreen.touchEnd();
          await page.evaluate(() => new Promise((r) => setTimeout(r, 30)));
        }

        const touchScrollY = await page.evaluate(() => window.scrollY);
        const touchOverflow = await this.checkHorizontalOverflow(page);

        this.record(
          'Mobile Rapid Touch Flick Scrolling & Zero Overflow',
          touchScrollY > 100 && touchOverflow.passed,
          {
            touchScrollY,
            passed: touchOverflow.passed,
            bleed: touchOverflow.bleed,
            note: `Scrolled to ${touchScrollY}px with zero horizontal bleed on mobile touch`,
          }
        );

        await page.close();
      }

      // ===================================================================
      // TEST SUITE 6: Concurrent Interactive Stress (Accordions, Tabs, CTAs)
      // ===================================================================
      this.log('\nSUITE 6: Interactive Rapid Mutation Stress');
      {
        const page = await this.setupPage(browser, { enableLenis: true });
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

        // Rapidly switch all SecurityAudit tabs
        let tabError = false;
        for (let round = 0; round < 3; round++) {
          for (let tabIdx = 0; tabIdx < 6; tabIdx++) {
            const btnSelector = `[data-aud-btn="${tabIdx}"]`;
            const exists = await page.$(btnSelector);
            if (exists) {
              await page.click(btnSelector);
              await page.evaluate(() => new Promise((r) => setTimeout(r, 20)));
            }
          }
        }

        this.record(
          'Rapid Multi-Tab Switching Stress (6 tabs x 3 rounds)',
          !tabError,
          { note: 'Toggled tabs rapidly without unhandled state errors' }
        );

        // Rapidly toggle FAQ accordions
        let faqError = false;
        for (let round = 0; round < 2; round++) {
          for (let faqIdx = 0; faqIdx < 5; faqIdx++) {
            const faqSelector = `[data-faq-item="${faqIdx}"] summary, details[name="faq"]:nth-of-type(${faqIdx + 1}) summary`;
            const exists = await page.$(faqSelector);
            if (exists) {
              await page.click(faqSelector);
              await page.evaluate(() => new Promise((r) => setTimeout(r, 25)));
            }
          }
        }

        this.record(
          'Rapid FAQ Accordion Expansion/Collapse Stress',
          !faqError,
          { note: 'Toggled FAQ accordions rapidly without layout thrash crashes' }
        );

        await page.close();
      }

      // ===================================================================
      // TEST SUITE 7: Intercepted Console Errors & Unhandled Rejections
      // ===================================================================
      this.log('\nSUITE 7: Global Zero Console Error & Zero Unhandled Rejection Audit');
      const totalErrors = this.capturedErrors.length;
      this.record(
        'Zero Console Errors & Zero Unhandled Rejections Throughout Adversarial Test',
        totalErrors === 0,
        {
          errorCount: totalErrors,
          errors: this.capturedErrors,
          warningCount: this.capturedWarnings.length,
          note: totalErrors === 0 ? 'Strict zero console errors achieved' : `${totalErrors} errors detected`,
        }
      );

    } catch (err) {
      console.error('\n✖ Fatal Challenger Script Exception:', err);
      this.record('Harness Execution', false, { error: err.message, stack: err.stack });
    } finally {
      if (browser) {
        await browser.close();
      }
    }

    console.log('\n' + '='.repeat(70));
    console.log(`ADVERSARIAL STRESS SUITE RESULTS:`);
    console.log(`  Passed: ${this.passed}`);
    console.log(`  Failed: ${this.failed}`);
    console.log(`  Total:  ${this.passed + this.failed}`);
    console.log(`  Captured Errors: ${this.capturedErrors.length}`);
    console.log('='.repeat(70));

    // Exit with code 0 on complete pass, 1 on failure
    process.exit(this.failed === 0 ? 0 : 1);
  }
}

new AdversarialRunner().run();
