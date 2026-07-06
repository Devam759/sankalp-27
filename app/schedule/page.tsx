'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, User, ArrowLeft } from 'lucide-react';
import { SCHEDULE_DATA } from '@/constants/events';
import { motion, AnimatePresence } from 'framer-motion';

export default function SchedulePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="fixed inset-0 bg-slate-50" />;
  }

  const activeDay = SCHEDULE_DATA[activeDayIdx];

  // Animation variants for tab transitions
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.35, 
        ease: 'easeOut' as const
      } 
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.div 
          className="border-b border-slate-200 pb-6 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase font-sans">
            Conference Schedule
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Detailed agenda and session timeline for ICATS-2026.
          </p>
        </motion.div>

        {/* Day Selector Tabs */}
        <motion.div 
          className="flex gap-4 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {SCHEDULE_DATA.map((day, idx) => {
            const isActive = activeDayIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveDayIdx(idx)}
                className={`relative flex-1 py-4 px-6 rounded border text-center cursor-pointer overflow-hidden transition-colors duration-300 ${
                  isActive
                    ? 'border-amber-600 text-white font-bold'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 font-semibold'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeScheduleTab"
                    className="absolute inset-0 bg-amber-600"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <div className="relative z-10">
                  <div className="text-xs uppercase tracking-wider opacity-90">{day.day}</div>
                  <div className="text-base mt-0.5">{day.date}, 2026</div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Theme Banner */}
        <AnimatePresence mode="wait">
          {activeDay.theme && (
            <motion.div 
              key={`theme-${activeDayIdx}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900 text-white p-5 rounded mb-8 border border-slate-800"
            >
              <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold block mb-1">
                Focus Theme of the Day
              </span>
              <h2 className="text-lg font-bold uppercase tracking-wide">
                {activeDay.theme}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Schedule List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDayIdx}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="space-y-6"
          >
            {activeDay.events.map((event, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-white border border-slate-200 p-6 rounded shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                    <Calendar size={12} />
                    <span>{event.time}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {event.title}
                  </h3>

                  {event.speaker && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <User size={13} className="text-slate-400" />
                      <span>Presenter/Speaker: <strong className="text-slate-800">{event.speaker}</strong></span>
                    </div>
                  )}
                </div>

                {event.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0 font-medium sm:mt-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{event.location}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
