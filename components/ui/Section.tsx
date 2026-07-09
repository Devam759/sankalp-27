'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  bgWhite?: boolean;
}

export default function Section({ id, title, subtitle, children, className = '', bgWhite = false }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`py-20 md:py-28 ${bgWhite ? 'bg-white' : className.includes('bg-') ? '' : 'bg-transparent'} ${className}`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1440px] w-full mx-auto px-6 md:px-12"
      >
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-4 relative inline-block ${className.includes('bg-brand-blue') ? 'text-white' : 'text-brand-blue'}`}>
                {title}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
              </h2>
            )}
            {subtitle && (
              <p className="mt-8 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {children}
      </motion.div>
    </section>
  );
}
