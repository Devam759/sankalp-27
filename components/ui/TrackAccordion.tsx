'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrackProps {
  track: {
    id: string;
    title: string;
    topics: string[];
  };
  index: number;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function TrackAccordion({ track, index, isOpen: controlledIsOpen, onToggle }: TrackProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const trackNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="mb-3 sm:mb-4 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
      <button
        onClick={handleToggle}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
            {trackNumber}
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-blue leading-snug">
            {track.title}
          </h3>
        </div>
        <div className="text-slate-400 shrink-0 font-bold text-lg sm:text-xl select-none pl-2">
          {isOpen ? '−' : '+'}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-5 pt-2 sm:pl-20 sm:pt-2 border-t border-slate-50">
              <ul className="space-y-2.5">
                {track.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
