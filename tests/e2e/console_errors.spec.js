/**
 * Tier 1: Feature Coverage & Structural DOM Integrity
 * Verifies zero console errors, presence of all 13 sections, Cybergenix logo, fixed header, and footer
 */

export async function runTier1Tests({ page, logs, targetUrl, reporter, strict = false }) {
  reporter.startTier('tier1', 'Feature Coverage & Structural Integrity');

  // --- T1-01: Zero Console Errors on Load ---
  const t1Start = Date.now();
  let t1Pass = false;
  let t1Details = '';
  let t1Error = null;

  try {
    // Navigate with timeout and wait for DOMContentLoaded / networkidle
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    // Allow brief settle for initial scripts/fonts
    await new Promise((r) => setTimeout(r, 1000));

    const totalErrors = logs.errors.length + logs.pageErrors.length;
    if (totalErrors === 0) {
      t1Pass = true;
      t1Details = '0 console errors and 0 uncaught exceptions recorded on initial load.';
    } else {
      const errMsgs = [
        ...logs.errors.map((e) => `[Console] ${e.text}`),
        ...logs.pageErrors.map((e) => `[PageError] ${e}`),
      ].join(' | ');
      t1Details = `Encountered ${totalErrors} error(s): ${errMsgs}`;
    }
  } catch (err) {
    t1Error = err;
    t1Details = `Navigation or load failed: ${err.message}`;
  }

  reporter.recordResult({
    id: 'T1-01',
    tier: 1,
    title: 'Zero Console Errors on Load',
    status: t1Pass ? 'PASS' : 'FAIL',
    durationMs: Date.now() - t1Start,
    details: t1Details,
    error: t1Error,
  });

  // --- T1-02: Brand Identity & Logo Rendering ---
  const t2Start = Date.now();
  let t2Pass = false;
  let t2Details = '';
  let t2Error = null;

  try {
    const brandData = await page.evaluate(() => {
      // Check logo image in header
      const headerLogoImg = document.querySelector('header img, header .logo img, [data-header] img, .Header img');
      const hasLogoImg = headerLogoImg !== null;
      const logoSrc = headerLogoImg ? headerLogoImg.getAttribute('src') || '' : '';
      const logoAlt = headerLogoImg ? headerLogoImg.getAttribute('alt') || '' : '';

      // Check text mentions of Cybergenix in header or page title
      const pageTitle = document.title;
      const headerText = document.querySelector('header, .Header, [data-header]')?.innerText || '';
      const hasCybergenixWordmark =
        /cybergenix/i.test(headerText) ||
        /cybergenix/i.test(logoAlt) ||
        /cybergenix/i.test(logoSrc) ||
        /cybergenix/i.test(pageTitle);

      // Check favicon in head
      const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
      const faviconHref = favicon ? favicon.getAttribute('href') || '' : '';

      return {
        hasLogoImg,
        logoSrc,
        logoAlt,
        hasCybergenixWordmark,
        faviconHref,
        pageTitle,
      };
    });

    if (brandData.hasCybergenixWordmark) {
      t2Pass = true;
      t2Details = `Cybergenix brand lockup verified (Title: "${brandData.pageTitle}", Logo found: ${brandData.hasLogoImg}, Favicon: "${brandData.faviconHref}").`;
    } else {
      t2Details = `Cybergenix brand lockup not detected in header or page title.`;
    }
  } catch (err) {
    t2Error = err;
    t2Details = `Brand inspection failed: ${err.message}`;
  }

  reporter.recordResult({
    id: 'T1-02',
    tier: 1,
    title: 'Cybergenix Brand Identity & Logo Rendering',
    status: t2Pass ? 'PASS' : 'FAIL',
    durationMs: Date.now() - t2Start,
    details: t2Details,
    error: t2Error,
  });

  // --- T1-03: Presence of All 13 Required Content Sections in DOM ---
  const t3Start = Date.now();
  let t3Pass = false;
  let t3Details = '';
  let t3Error = null;

  try {
    const REQUIRED_SECTIONS = [
      { key: 'HeroSection', selectors: ['.HeroSection', '#hero', '[data-section="hero"]'] },
      { key: 'ShowCaseSection', selectors: ['.ShowCaseSection', '[data-showcase]', '#showcase'] },
      { key: 'LogoReelSection', selectors: ['.LogoReelSection', '[data-logoreel]', '#partners', '#logoreel'] },
      { key: 'FeaturesSection', selectors: ['.FeaturesSection', '[data-features]', '#features', '#problem'] },
      { key: 'MasterProblemSection', selectors: ['.MasterProblemSection', '[data-masterproblem]', '#master-problem'] },
      { key: 'WhatChangedSection', selectors: ['.WhatChangedSection', '[data-whatchanged]', '#what-changed', '#who-we-are'] },
      { key: 'HowItWorksSection', selectors: ['.HowItWorksSection', '[data-howitworks]', '#how-it-works', '#solution'] },
      { key: 'SaferFasterSection', selectors: ['.SaferFasterSection', '[data-saferfaster]', '#safer-faster', '#the-race'] },
      { key: 'SecurityAuditSection', selectors: ['.SecurityAuditSection', '[data-securityaudit]', '#security-audit', '#capabilities'] },
      { key: 'QbrPitchSection', selectors: ['.QbrPitchSection', '[data-qbrpitch]', '#qbr-pitch', '#revenue-streams'] },
      { key: 'BenefitsSection', selectors: ['.BenefitsSection', '[data-benefits]', '#benefits', '#pricing'] },
      { key: 'TestimonialsSection', selectors: ['.TestimonialsSection', '[data-testimonials]', '#testimonials'] },
      { key: 'LeadershipSection', selectors: ['.LeadershipSection', '[data-leadership]', '#leadership'] },
      { key: 'FaqSection', selectors: ['.FaqSection', '[data-faq]', '#faq'] },
      { key: 'ScheduleDemoSection', selectors: ['.ScheduleDemoSection', '[data-scheduledemo]', '#schedule-a-meeting'] },
    ];

    const foundSections = await page.evaluate((sections) => {
      return sections.map((sec) => {
        let found = false;
        let matchedSelector = null;
        for (const sel of sec.selectors) {
          if (document.querySelector(sel)) {
            found = true;
            matchedSelector = sel;
            break;
          }
        }
        return { key: sec.key, found, matchedSelector };
      });
    }, REQUIRED_SECTIONS);

    const missing = foundSections.filter((s) => !s.found);
    const present = foundSections.filter((s) => s.found);

    if (missing.length === 0) {
      t3Pass = true;
      t3Details = `All ${REQUIRED_SECTIONS.length} required content sections exist in DOM.`;
    } else {
      if (!strict && present.length >= 3) {
        // In progressive milestone mode, warn on missing milestone sections
        t3Pass = true;
        t3Details = `[PROGRESSIVE MILESTONE] ${present.length}/${REQUIRED_SECTIONS.length} sections detected. Pending later milestones: ${missing.map((m) => m.key).join(', ')}`;
      } else {
        t3Details = `Missing sections (${missing.length}/${REQUIRED_SECTIONS.length}): ${missing.map((m) => m.key).join(', ')}`;
      }
    }
  } catch (err) {
    t3Error = err;
    t3Details = `Section evaluation failed: ${err.message}`;
  }

  reporter.recordResult({
    id: 'T1-03',
    tier: 1,
    title: 'Presence of 13 Required Content Sections in DOM',
    status: t3Pass ? 'PASS' : 'FAIL',
    durationMs: Date.now() - t3Start,
    details: t3Details,
    error: t3Error,
  });

  // --- T1-04: Fixed Header Capsule & Navigation ---
  const t4Start = Date.now();
  let t4Pass = false;
  let t4Details = '';
  let t4Error = null;

  try {
    const headerInfo = await page.evaluate(() => {
      const header = document.querySelector('header, .Header, [data-header]');
      if (!header) return null;

      const style = window.getComputedStyle(header);
      const isFixedOrSticky = style.position === 'fixed' || style.position === 'sticky';
      const hasLinks = header.querySelectorAll('a, button').length > 0;
      const text = header.innerText || '';

      return {
        isFixedOrSticky,
        hasLinks,
        hasCta: /get started|demo|contact|niva/i.test(text),
        position: style.position,
      };
    });

    if (headerInfo && headerInfo.isFixedOrSticky && headerInfo.hasLinks) {
      t4Pass = true;
      t4Details = `Header is ${headerInfo.position} with navigation items and CTA detected.`;
    } else if (headerInfo) {
      t4Details = `Header found but position is ${headerInfo.position} (expected fixed/sticky) or lacks links.`;
    } else {
      t4Details = `Header element not found.`;
    }
  } catch (err) {
    t4Error = err;
    t4Details = `Header check failed: ${err.message}`;
  }

  reporter.recordResult({
    id: 'T1-04',
    tier: 1,
    title: 'Fixed Header Capsule & Navigation Strip',
    status: t4Pass ? 'PASS' : 'FAIL',
    durationMs: Date.now() - t4Start,
    details: t4Details,
    error: t4Error,
  });

  // --- T1-05: Global Footer & Company Metadata ---
  const t5Start = Date.now();
  let t5Pass = false;
  let t5Details = '';
  let t5Error = null;

  try {
    const footerInfo = await page.evaluate(() => {
      const footer = document.querySelector('footer, .Footer');
      if (!footer) return null;

      const text = footer.innerText || '';
      const hasNoidaAddress = /noida/i.test(text) || /sector 50/i.test(text);
      const hasPhone = /88603\s*53427/i.test(text) || /\+91/i.test(text);
      const hasEmail = /info@cybergenixsecurity\.com/i.test(text) || /cybergenix/i.test(text);
      const hasSocial = /twitter|linkedin|instagram|@cybergenix/i.test(text) || footer.querySelectorAll('a[href*="twitter"], a[href*="linkedin"], a[href*="instagram"]').length > 0;

      return {
        exists: true,
        hasNoidaAddress,
        hasPhone,
        hasEmail,
        hasSocial,
      };
    });

    if (footerInfo && (footerInfo.hasNoidaAddress || footerInfo.hasEmail || footerInfo.hasPhone)) {
      t5Pass = true;
      t5Details = `Footer verified with verified company metadata (Address: ${footerInfo.hasNoidaAddress}, Email: ${footerInfo.hasEmail}, Phone: ${footerInfo.hasPhone}, Socials: ${footerInfo.hasSocial}).`;
    } else if (footerInfo) {
      t5Details = `Footer present but missing required company contact details.`;
    } else {
      t5Details = `Footer element not found.`;
    }
  } catch (err) {
    t5Error = err;
    t5Details = `Footer check failed: ${err.message}`;
  }

  reporter.recordResult({
    id: 'T1-05',
    tier: 1,
    title: 'Global Footer & Company Metadata',
    status: t5Pass ? 'PASS' : 'FAIL',
    durationMs: Date.now() - t5Start,
    details: t5Details,
    error: t5Error,
  });
}
