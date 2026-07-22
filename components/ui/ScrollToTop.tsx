'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const buttonVariants: Variants = {
    initial: { opacity: 0, y: 15, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 15, scale: 0.9 },
    hover: { scale: 1.05 }
  };

  const arrowVariants: Variants = {
    initial: { y: 0 },
    hover: { 
      y: -4,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={cn(
            "fixed bottom-6 right-6 z-50 p-3.5 rounded-full cursor-pointer",
            "bg-brand-blue text-white border border-white/20",
            "shadow-xl shadow-brand-blue/25",
            "hover:bg-brand-orange hover:border-brand-orange hover:shadow-2xl hover:shadow-brand-orange/30",
            "focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2",
            "transition-all duration-300 md:bottom-8 md:right-8"
          )}
        >
          <motion.div variants={arrowVariants} className="flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
