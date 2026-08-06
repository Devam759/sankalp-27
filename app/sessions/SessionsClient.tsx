'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import { fadeUp, staggerContainer } from '@/lib/animations/variants';
import TrackAccordion from '@/components/ui/TrackAccordion';
import { conferenceTracks, trackChairs, PAPER_SUBMISSION_LINK } from '@/constants/conferenceData';

export default function SessionsClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.15, 0.05)}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
                <WordReveal text="Conference Tracks & Sessions" className="text-white" />
              </h1>
              <div className="w-16 h-1 bg-brand-orange mx-auto rounded-sm" />
              <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium pt-2">
                Explore our 7 interdisciplinary research tracks spanning Sustainable AI, Data Science, High-Performance Computing, Smart Healthcare, AI in Education, Smart Society, and Semiconductor Systems.
              </p>
            </motion.div>

            {/* Highlights & Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2"
            >
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <span className="inline-flex items-center px-2.5 sm:px-3.5 py-1.5 rounded-sm bg-white/10 border border-white/20 text-white/90 text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-sm whitespace-nowrap">
                  7 Frontier Tracks
                </span>
                <span className="inline-flex items-center px-2.5 sm:px-3.5 py-1.5 rounded-sm bg-white/10 border border-white/20 text-white/90 text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-sm whitespace-nowrap">
                  Springer LNCS Series
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="inline-flex items-center px-2.5 sm:px-3.5 py-1.5 rounded-sm bg-white/10 border border-white/20 text-white/90 text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-sm whitespace-nowrap">
                  Scopus Indexed
                </span>
                <span className="inline-flex items-center px-2.5 sm:px-3.5 py-1.5 rounded-sm bg-white/10 border border-white/20 text-white/90 text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-sm whitespace-nowrap">
                  Hybrid Presentation Mode
                </span>
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              variants={fadeUp}
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
          </motion.div>
        </div>
      </section>

      {/* TRACKS ACCORDION SECTION */}
      <Section id="sessions-tracks" className="flex-grow bg-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <Reveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue uppercase tracking-wide whitespace-nowrap">
                Research Tracks (01 - 07)
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Click on any track below to expand topic details.
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-sm">
              7 Tracks
            </span>
          </Reveal>

          <div className="space-y-4">
            {conferenceTracks.map((track, i) => (
              <Reveal key={track.id} delay={i * 0.06}>
                <TrackAccordion
                  track={track}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              </Reveal>
            ))}
          </div>

          {/* TRACK CHAIRS ANNOUNCEMENT */}
          <Reveal className="mt-16 pt-12 border-t border-slate-200 space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-brand-blue mb-4">
                Track Chairs &amp; Co-Chairs
              </h3>
              <div className="bg-brand-orange/10 border-l-4 border-brand-orange p-6 rounded-sm max-w-2xl shadow-sm">
                <p className="text-brand-blue font-bold text-base sm:text-lg">
                  Track Chairs to be announced soon.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed font-medium">
                  The panel of distinguished academic track chairs and co-chairs evaluating session submissions will be announced shortly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
