/**
 * Server Helper for Cybergenix Automated E2E Testing Suite
 * Detects if the web application is running, or provides a static/dev server helper
 */

import http from 'node:http';
import { URL } from 'node:url';

/**
 * Checks whether a target URL is actively responding to HTTP requests
 */
export function isServerRunning(targetUrl, timeoutMs = 2000) {
  return new Promise((resolve) => {
    try {
      const url = new URL(targetUrl);
      const req = http.request(
        {
          hostname: url.hostname,
          port: url.port || 80,
          path: url.pathname || '/',
          method: 'GET',
          timeout: timeoutMs,
        },
        (res) => {
          resolve(res.statusCode >= 200 && res.statusCode < 500);
        }
      );

      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    } catch {
      resolve(false);
    }
  });
}

/**
 * Waits for a server to become available at target URL
 */
export async function waitForServer(targetUrl, maxWaitMs = 15000, intervalMs = 500) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    if (await isServerRunning(targetUrl)) {
      return true;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}
