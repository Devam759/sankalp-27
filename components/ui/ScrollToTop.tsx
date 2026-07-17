'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
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
            "bg-slate-950/80 backdrop-blur-md border border-brand-orange/30 text-brand-orange",
            "shadow-[0_4px_20px_rgba(0,0,0,0.3),_0_0_15px_rgba(245,130,30,0.1)]",
            "hover:border-brand-orange hover:text-brand-cloud hover:bg-brand-orange",
            "hover:shadow-[0_6px_25px_rgba(245,130,30,0.4)]",
            "focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-slate-950",
            "transition-colors duration-300 md:bottom-8 md:right-8"
          )}
        >
          <motion.div variants={arrowVariants}>
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
