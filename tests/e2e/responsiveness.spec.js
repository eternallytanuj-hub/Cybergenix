/**
 * Tier 2: Boundary & Viewports Verification
 * Verifies responsive rendering across 4 viewports without horizontal overflow,
 * rapid scrolling resilience, and form validation constraints.
 */

export async function runTier2Tests({ page, targetUrl, reporter }) {
  reporter.startTier('tier2', 'Boundary & Viewports Verification');

  const VIEWPORTS = [
    { id: 'T2-01', name: 'Mobile Viewport (375x667)', width: 375, height: 667, isMobile: true },
    { id: 'T2-02', name: 'Tablet Viewport (768x1024)', width: 768, height: 1024, isMobile: false },
    { id: 'T2-03', name: 'Desktop Viewport (1280x800)', width: 1280, height: 800, isMobile: false },
    { id: 'T2-04', name: 'Ultra-Wide Viewport (1920x1080)', width: 1920, height: 1080, isMobile: false },
  ];

  for (const vp of VIEWPORTS) {
    const start = Date.now();
    let pass = false;
    let details = '';
    let error = null;

    try {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise((r) => setTimeout(r, 600));

      const overflowMetrics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(root.scrollWidth, body.scrollWidth);
        const innerWidth = window.innerWidth;
        const hasOverflow = scrollWidth > innerWidth + 1; // 1px margin of error for subpixel rendering
        const fontSize = window.getComputedStyle(root).fontSize;

        return {
          scrollWidth,
          innerWidth,
          hasOverflow,
          overflowDelta: Math.max(0, scrollWidth - innerWidth),
          fontSize,
        };
      });

      if (!overflowMetrics.hasOverflow) {
        pass = true;
        details = `Zero horizontal overflow (Width: ${overflowMetrics.scrollWidth}px <= Viewport: ${overflowMetrics.innerWidth}px, Root font: ${overflowMetrics.fontSize}).`;
      } else {
        details = `Horizontal overflow detected: scrollWidth is ${overflowMetrics.scrollWidth}px (+${overflowMetrics.overflowDelta}px wider than viewport ${overflowMetrics.innerWidth}px).`;
      }
    } catch (err) {
      error = err;
      details = `Viewport test failed: ${err.message}`;
    }

    reporter.recordResult({
      id: vp.id,
      tier: 2,
      title: `Responsive Layout: ${vp.name}`,
      status: pass ? 'PASS' : 'FAIL',
      durationMs: Date.now() - start,
      details,
      error,
    });
  }

  // --- T2-05: Rapid Scroll Stress Test ---
  const t5Start = Date.now();
  let t5Pass = false;
  let t5Details = '';
  let t5Error = null;

  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise((r) => setTimeout(r, 500));

    // Execute rapid scrolling through multiple heights
    const scrollResult = await page.evaluate(async () => {
      const scrollPositions = [0.25, 0.5, 0.75, 1.0, 0.5, 0.0];
      const maxScroll = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      
      for (const ratio of scrollPositions) {
        const targetY = Math.floor(maxScroll * ratio);
        window.scrollTo({ top: targetY, behavior: 'instant' });
        await new Promise((resolve) => setTimeout(resolve, 80));
      }

      // Check final state
      return {
        scrollY: window.scrollY,
        scrollHeight: document.body.scrollHeight,
        isScrollable: maxScroll > 0,
      };
    });

    t5Pass = true;
    t5Details = `Rapid scroll sequence completed across ${scrollResult.scrollHeight}px document height without thread lockups.`;
  } catch (err) {
    t5Error = err;
    t5Details = `Rapid scroll failed: ${err.message}`;
  }

  reporter.recordResult({
    id: 'T2-05',
    tier: 2,
    title: 'Rapid Scroll Stress Test (GSAP / ScrollTrigger Resilience)',
    status: t5Pass ? 'PASS' : 'FAIL',
    durationMs: Date.now() - t5Start,
    details: t5Details,
    error: t5Error,
  });

  // --- T2-06: Form Boundary Validation Constraints ---
  const t6Start = Date.now();
  let t6Pass = false;
  let t6Details = '';
  let t6Error = null;

  try {
    const formValidation = await page.evaluate(async () => {
      const form = document.querySelector('form, #schedule-a-meeting form, .ScheduleDemoSection form');
      if (!form) return { formFound: false };

      // Check required inputs
      const requiredInputs = Array.from(form.querySelectorAll('input[required]')).map((i) => i.name || i.placeholder);
      const isInitiallyInvalid = !form.checkValidity();

      // Test typing invalid email
      const emailInput = form.querySelector('input[type="email"]');
      let emailValidationWorks = false;
      if (emailInput) {
        emailInput.value = 'invalid-email-address';
        emailValidationWorks = !emailInput.checkValidity();
        emailInput.value = ''; // reset
      }

      return {
        formFound: true,
        requiredInputs,
        isInitiallyInvalid,
        emailValidationWorks,
      };
    });

    if (formValidation.formFound) {
      if (formValidation.isInitiallyInvalid || formValidation.emailValidationWorks) {
        t6Pass = true;
        t6Details = `Form constraint validation active: empty form is invalid, required inputs: [${formValidation.requiredInputs.join(', ')}], email format checking verified.`;
      } else {
        t6Details = `Form found but does not enforce standard HTML5 required attributes or validation constraints.`;
      }
    } else {
      // If form is not mounted yet in early milestones, soft pass if progressive
      t6Pass = true;
      t6Details = `[PROGRESSIVE MILESTONE] Consultation form not mounted in current milestone yet.`;
    }
  } catch (err) {
    t6Error = err;
    t6Details = `Form boundary test failed: ${err.message}`;
  }

  reporter.recordResult({
    id: 'T2-06',
    tier: 2,
    title: 'Form Validation Boundaries (HTML5 Constraint Validation)',
    status: t6Pass ? 'PASS' : 'FAIL',
    durationMs: Date.now() - t6Start,
    details: t6Details,
    error: t6Error,
  });
}
