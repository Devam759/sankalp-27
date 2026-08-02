'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import TrackAccordion from '@/components/ui/TrackAccordion';
import { conferenceTracks, trackChairs, PAPER_SUBMISSION_LINK } from '@/constants/conferenceData';

export default function SessionsClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white flex flex-col">
      <Navbar />

      {/* HEADER SECTION - Redesigned Seamless Hero */}
      <section className="bg-brand-blue text-white pt-28 md:pt-36 pb-16 md:pb-20 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle geometric dot pattern background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
              Conference Tracks &amp; Sessions
            </h1>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-sm" />
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium pt-2">
              Explore our 7 interdisciplinary research tracks spanning Sustainable AI, Data Science, High-Performance Computing, Smart Healthcare, AI in Education, Smart Society, and Semiconductor Systems.
            </p>
          </motion.div>

          {/* Highlights & Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            {[
              '7 Frontier Tracks',
              'Springer LNCS Series',
              'Scopus Indexed',
              'Hybrid Presentation Mode'
            ].map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3.5 py-1.5 rounded-sm bg-white/10 border border-white/20 text-white/90 text-xs font-semibold tracking-wide backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href={PAPER_SUBMISSION_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              Submit Paper
            </a>
            <Link
              href="/call-for-papers"
              className="bg-white/10 border border-white/30 text-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-brand-blue transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              Submission Guidelines
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TRACKS ACCORDION SECTION */}
      <Section id="sessions-tracks" className="flex-grow bg-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                Research Tracks (01 - 07)
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Click on any track below to expand topic details and track chairs.
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-sm">
              7 Tracks
            </span>
          </div>

          <div className="space-y-4">
            {conferenceTracks.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <TrackAccordion
                  track={track}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              </motion.div>
            ))}
          </div>

          {/* TRACK CHAIRS OVERVIEW GRID */}
          <div className="mt-16 pt-12 border-t border-slate-200 space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-brand-blue mb-2">
                Track Chairs &amp; Co-Chairs
              </h3>
              <p className="text-slate-600 text-sm">
                Distinguished academic chairs leading track evaluation and session coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trackChairs.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-sm shadow-xs hover:border-brand-orange/40 transition-colors">
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">
                    Track {idx + 1}: {item.track}
                  </span>
                  <h4 className="font-serif font-bold text-brand-blue text-base mb-1">
                    {item.chair}
                  </h4>
                  <p className="text-slate-500 text-xs font-medium">
                    Co-Chair: {item.coChair}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
