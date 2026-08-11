'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, usePrefersReducedMotion } from '@/lib/animations/gsap';

interface WordRevealProps {
  text: string;
  className?: string;
}

/**
 * Scroll-triggered word-by-word masked reveal for section headings.
 * Each word is wrapped in an overflow-hidden clip; GSAP slides it up into view
 * once when the heading enters the viewport. `aria-label` keeps the full text
 * readable to screen readers regardless of the visual span split.
 */
export default function WordReveal({ text, className = '' }: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      const words = el.querySelectorAll<HTMLElement>('.word-reveal-word');
      words.forEach((w) => (w.style.transform = 'none'));
      return;
    }

    let ctx: gsap.Context | null = null;

    ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>('.word-reveal-word');
      if (!words.length) return;

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

      if (inView) {
        gsap.fromTo(
          words,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.05,
            force3D: true,
            clearProps: 'transform',
          }
        );
      } else {
        gsap.fromTo(
          words,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.05,
            force3D: true,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => {
      if (ctx) ctx.revert();
    };
  }, [reduced]);

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            className="word-reveal-word inline-block"
            style={{ willChange: 'transform' }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}

