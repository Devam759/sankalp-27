'use client';

import React from 'react';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  bgWhite?: boolean;
}

/**
 * Shared section shell. `title` renders through `WordReveal` (GSAP word-rise) so
 * every page that passes a title gets the same animated heading for free; the
 * body content is left for each page to animate with `Reveal`/`staggerContainer`.
 */
export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  bgWhite = false,
}: SectionProps) {
  const isDark = className.includes('bg-brand-blue');
  return (
    <section
      id={id}
      className={`py-12 md:py-16 ${bgWhite ? 'bg-white' : className.includes('bg-') ? '' : 'bg-transparent'} ${className}`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12">
        {(title || subtitle) && (
          <div className="text-center mb-10 md:mb-12">
            {title && (
              <h2
                className={`text-4xl md:text-5xl font-serif font-bold mb-4 relative inline-block ${isDark ? 'text-white' : 'text-brand-blue'}`}
              >
                <WordReveal text={title} className={isDark ? 'text-white' : 'text-brand-blue'} />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
              </h2>
            )}
            {subtitle && (
              <Reveal variant="in" delay={0.15}>
                <p className={`mt-8 text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                  {subtitle}
                </p>
              </Reveal>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
