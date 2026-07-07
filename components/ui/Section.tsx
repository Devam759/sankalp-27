import React from 'react';

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
      className={`py-20 md:py-28 ${bgWhite ? 'bg-white' : 'bg-transparent'} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue mb-4 relative inline-block">
                {title}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-orange rounded-full"></div>
              </h2>
            )}
            {subtitle && (
              <p className="mt-8 text-slate-600 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
}
