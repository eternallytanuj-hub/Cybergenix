import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsapConfig';

declare global {
  interface Window {
    __TESTING__?: boolean;
    __lenis?: Lenis | null;
  }
}

let lenisInstance: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

/**
 * Initializes Lenis smooth scrolling integrated with GSAP ticker.
 * Automatically bypassed during automated headless testing (__TESTING__ or webdriver)
 * or when touch/prefers-reduced-motion is detected.
 */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Safeguards: testing bypass, touch devices, and prefers-reduced-motion
  const isTesting = Boolean(
    window.__TESTING__ ||
    (navigator as unknown as { webdriver?: boolean }).webdriver
  );
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTesting || isTouch || prefersReduced) {
    document.documentElement.classList.remove('lenis');
    return null;
  }

  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  // Sync with GSAP ScrollTrigger
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Sync with GSAP Ticker
  tickerFn = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  document.documentElement.classList.add('lenis');
  window.__lenis = lenisInstance;

  return lenisInstance;
}

export function destroySmoothScroll(): void {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  if (typeof window !== 'undefined') {
    window.__lenis = null;
    document.documentElement.classList.remove('lenis');
  }
}
