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

      {/* HEADER SECTION - Standard Clean Page Header */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.15, 0.05)}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                <WordReveal text="Conference Tracks & Sessions" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
              </h1>
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-center leading-relaxed font-normal mt-6">
              Explore our 7 interdisciplinary research tracks spanning Sustainable AI, Data Science, High-Performance Computing, Smart Healthcare, AI in Education, Smart Society, and Semiconductor Systems.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
            >
              <a
                href={PAPER_SUBMISSION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-brand-orange text-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                Submit Paper
              </a>
              <Link
                href="/call-for-papers"
                className="w-full sm:w-auto text-center bg-brand-blue text-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-brand-lightBlue transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                View Call for Papers
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRACKS ACCORDION SECTION */}
      <Section id="sessions-tracks" className="flex-grow bg-white">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">

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
