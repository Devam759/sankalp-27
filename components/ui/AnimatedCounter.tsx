'use client';

import React, { useEffect, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/animations/gsap';
import { EASE } from '@/lib/animations/variants';

interface AnimatedCounterProps {
  /** Target value to count up to when scrolled into view. */
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  format?: (value: number) => string;
}

/**
 * Count-up number that animates from 0 when scrolled into view.
 * Uses framer-motion's standalone `animate()` (no state churn per frame).
 * Values must be computed from real data — no fabricated figures.
 */
export default function AnimatedCounter({
  to,
  duration = 1.4,
  className,
  suffix = '',
  format,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  const text = format ? format(display) : String(display);

  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  );
}
