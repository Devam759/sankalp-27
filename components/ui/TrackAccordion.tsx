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
}

export default function TrackAccordion({ track, index }: TrackProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold shrink-0">
            {index + 1}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-brand-blue pr-4">
            {track.title}
          </h3>
        </div>
        <div className="text-slate-400 shrink-0 font-bold text-xl select-none">
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
            <div className="px-6 pb-6 pt-2 pl-20 border-t border-slate-50">
              <ul className="space-y-2">
                {track.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <span className="text-brand-orange mt-1.5">•</span>
                    <span className="leading-relaxed">{topic}</span>
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
