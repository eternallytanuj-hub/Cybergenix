import http from 'node:http';

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en" style="font-size: 10px;">
  <head>
    <title>Cybergenix Security</title>
    <link rel="icon" href="/favicon.svg">
  </head>
  <body style="margin: 0; background: #000; color: #fff; font-family: sans-serif;">
    <header class="Header" style="position: fixed; top: 0; width: 100%; padding: 10px; background: rgba(0,0,0,0.8);">
      <div class="logo">
        <img src="/Cybergenix_logo.png" alt="Cybergenix Security Logo" width="32" height="32">
        <span>CYBERGENIX</span>
      </div>
      <button class="toggle" data-menu-toggle="true">Menu</button>
      <a href="#solutions">Solutions</a>
      <a href="#company">Company</a>
      <a href="#schedule-a-meeting">Get Started Free</a>
    </header>

    <main style="padding-top: 80px;">
      <section class="HeroSection" id="hero">
        <h1>Human-first AI, engineered secure.</h1>
      </section>
      <section class="ShowCaseSection" data-showcase="true">
        <h2>Identity Pillars</h2>
      </section>
      <section class="LogoReelSection" data-logoreel="true">
        <h2>Recognized by 18 Leading Institutions</h2>
      </section>
      <section class="FeaturesSection" data-features="true">
        <h2>The Problem: Current AI is Broken</h2>
      </section>
      <section class="MasterProblemSection" data-masterproblem="true">
        <h2>The Core Vulnerability</h2>
        <div id="mp-captured">Alert: Vulnerability Detected</div>
      </section>
      <section class="WhatChangedSection" data-whatchanged="true">
        <h2>Who We Are: Redefining AI</h2>
      </section>
      <section class="HowItWorksSection" data-howitworks="true">
        <h2>The Solution — NIVA Neural Ecosystem</h2>
      </section>
      <section class="SaferFasterSection" data-saferfaster="true">
        <h2>The Experience: Smarter, Safer</h2>
        <div>Legacy Chatbots: 14s friction</div>
        <div>Cybergenix NIVA: Instant execution</div>
      </section>
      <section class="SecurityAuditSection" data-securityaudit="true">
        <h2>Enterprise Capabilities Dashboard</h2>
        <button data-aud-btn="0" aria-pressed="true">System Intelligence</button>
        <button data-aud-btn="1" aria-pressed="false">Security & Cryptography</button>
        <div data-aud-panel="0">System Intelligence Overview Panel</div>
        <div data-aud-panel="1" hidden>Security & Cryptography Overview Panel</div>
      </section>
      <section class="QbrPitchSection" data-qbrpitch="true">
        <h2>Enterprise Revenue Models</h2>
      </section>
      <section class="BenefitsSection" data-benefits="true">
        <h2>Predictable, Transparent Pricing Plans</h2>
      </section>
      <section class="TestimonialsSection" data-testimonials="true">
        <h2>Client Impact & Testimonials</h2>
      </section>
      <section class="LeadershipSection" data-leadership="true">
        <h2>Executive Leadership Team</h2>
      </section>
      <section class="FaqSection" data-faq="true">
        <h2>Frequently Asked Questions</h2>
        <details name="faq"><summary>How does NIVA maintain zero-knowledge privacy?</summary><p>End to end encryption.</p></details>
        <details name="faq"><summary>What makes NIVA different?</summary><p>Deep OS integration.</p></details>
      </section>
      <section class="ScheduleDemoSection" id="schedule-a-meeting" data-navbar-inverse="true" style="background: #f0ece9; color: #000; padding: 40px 20px;">
        <h2>Schedule an AI Consultation</h2>
        <form>
          <input name="first_name" required placeholder="First name">
          <input name="company" required placeholder="Company name">
          <input name="email" type="email" required placeholder="Business email">
          <input name="phone" type="tel" required placeholder="Phone number">
          <button type="button" class="pill">Enterprise SaaS</button>
          <button type="submit">Request AI Consultation</button>
        </form>
      </section>
    </main>

    <footer class="Footer" style="padding: 40px 20px; border-top: 1px solid #333;">
      <p>Lower Ground Floor, A-56/1, near G.D. Goenka School, Sector 50, Noida, UP 201303, India</p>
      <p>Phone: +91 88603 53427 | info@cybergenixsecurity.com</p>
      <p>Twitter: @Cybergenix | LinkedIn | Instagram</p>
      <p>© 2026 Cybergenix Security. All rights reserved.</p>
    </footer>
  </body>
</html>`;

export function startMockServer(port = 5199) {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(HTML_CONTENT);
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve(server);
    });
  });
}

if (process.argv[1] && process.argv[1].endsWith('mock_server.js')) {
  startMockServer(5199).then(() => {
    console.log('Mock Cybergenix server listening on http://localhost:5199');
  });
}
