import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once for the whole application. All consumers import
// from this module so ScrollTrigger is never double-registered.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Reactive `prefers-reduced-motion` flag.
 *
 * Every animation primitive in this codebase reads this value so users who
 * request reduced motion get a fully visible, unanimated experience.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}
