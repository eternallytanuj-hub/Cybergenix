import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Global default easing matching kzero's curve
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  });
}

export { gsap, ScrollTrigger };
