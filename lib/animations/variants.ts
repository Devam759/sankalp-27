import type { Variants } from 'framer-motion';

// Shared easing + viewport config so every page animates with the same feel.
// Typed as a mutable cubic-bezier tuple (framer-motion expects this shape).
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VIEWPORT = { once: true, margin: '-50px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export const clipUp: Variants = {
  hidden: { 
    opacity: 0,
    clipPath: 'inset(100% 0% 0% 0%)',
    y: 16
  },
  visible: { 
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    transition: { duration: 0.65, ease: EASE } 
  },
};

export const blurFadeIn: Variants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(6px)', 
    y: 8 
  },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    y: 0, 
    transition: { duration: 0.45, ease: EASE } 
  },
};

/** Parent variant that staggers its children into view. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

