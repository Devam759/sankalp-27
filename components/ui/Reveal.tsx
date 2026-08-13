'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { fadeUp, fadeIn, fadeLeft, fadeRight, scaleIn, clipUp, blurFadeIn, VIEWPORT } from '@/lib/animations/variants';
import { usePrefersReducedMotion } from '@/lib/animations/gsap';

const VARIANT_MAP: Record<NonNullable<RevealProps['variant']>, Variants> = {
  up: fadeUp,
  in: fadeIn,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
  clip: clipUp,
  blur: blurFadeIn,
};

interface RevealProps {
  children: React.ReactNode;
  /** Direction/style of the entrance reveal. */
  variant?: 'up' | 'in' | 'left' | 'right' | 'scale' | 'clip' | 'blur';
  /** Seconds to wait before animating. */
  delay?: number;
  /** Override the default 0.6s duration. */
  duration?: number;
  className?: string;
  once?: boolean;
}


/**
 * Scroll-reveal wrapper around the shared variants. Under `prefers-reduced-motion`
 * it renders children directly (fully visible, no animation) — no flash of hidden
 * content and no layout shift.
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration,
  className,
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const base = VARIANT_MAP[variant];

  const variants: Variants = {
    hidden: base.hidden,
    visible: {
      ...base.visible,
      transition: {
        ...((base.visible as { transition?: object }).transition ?? {}),
        ...(duration != null ? { duration } : {}),
        ...(delay ? { delay } : {}),
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, once }}
      variants={variants}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
