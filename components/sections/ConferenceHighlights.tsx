'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Highlight Data ───────────────────────────────────────────────────────────

interface HighlightItem {
  id: string;
  category: string;
  badge?: string;
  title: string;
  headline: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  accentTag: string;
}

const highlightItems: HighlightItem[] = [
  {
    id: 'keynote',
    category: 'Keynote',
    badge: 'Featured',
    title: 'International Keynote Speakers',
    headline: 'Global Visionaries & Research Pioneers',
    description:
      'Visionary talks by world-renowned researchers on AI, sustainability, and intelligent systems.',
    highlights: [
      'Plenary sessions by global leaders',
      'Hybrid format for worldwide participation',
      'Interactive Q&A discussions',
    ],
    metrics: [
      { label: 'Format', value: 'Hybrid / Plenary' },
      { label: 'Domains', value: 'AI, Sustainability, Quantum' },
      { label: 'Scope', value: 'International' },
    ],
    accentTag: 'Plenary Session',
  },
  {
    id: 'panels',
    category: 'Panels',
    title: 'Industry Panels & Roundtables',
    headline: 'Academia & Industry Convergence',
    description:
      'Executive panels uniting top researchers and corporate leaders on technology governance.',
    highlights: [
      'Cross-sector governance debates',
      'Research commercialization insights',
      'Direct interaction with decision-makers',
    ],
    metrics: [
      { label: 'Focus', value: 'Academia × Industry' },
      { label: 'Mode', value: 'Interactive Q&A' },
      { label: 'Impact', value: 'Policy & Innovation' },
    ],
    accentTag: 'Roundtable Series',
  },
  {
    id: 'research',
    category: 'Research',
    title: 'Research Paper Presentations',
    headline: 'Peer-Reviewed Scientific Discoveries',
    description:
      'Rigorous double-blind evaluated paper presentations across six core domain tracks.',
    highlights: [
      'Springer LNCS & Scopus publication',
      'Oral and interactive poster tracks',
      'Expert reviewer feedback',
    ],
    metrics: [
      { label: 'Review', value: 'Double-Blind Peer Review' },
      { label: 'Indexing', value: 'Scopus & Springer' },
      { label: 'Tracks', value: '6 Domain Tracks' },
    ],
    accentTag: 'Peer Reviewed',
  },
  {
    id: 'startup',
    category: 'Innovation',
    badge: 'Atal Incubation',
    title: 'Startup & Innovation Showcase',
    headline: 'Launching Breakthrough Tech Ventures',
    description:
      'Pitching platform for tech entrepreneurs and student innovators with investor access.',
    highlights: [
      'Partnered with Atal Incubation Center',
      'Pitch sessions with VCs & investors',
      'Prototype demo & mentorship',
    ],
    metrics: [
      { label: 'Partner', value: 'Atal Incubation' },
      { label: 'Audience', value: 'Investors & Mentors' },
      { label: 'Format', value: 'Pitch & Demo' },
    ],
    accentTag: 'Venture Showcase',
  },
  {
    id: 'networking',
    category: 'Networking',
    badge: 'CGLP Partner',
    title: 'Networking & Collaboration',
    headline: 'Building Global Academic Alliances',
    description:
      'Curated sessions for international research proposals and faculty exchange.',
    highlights: [
      'Structured academic networking hours',
      'Global joint research initiatives',
      'Delegates from top universities',
    ],
    metrics: [
      { label: 'Partner', value: 'CGLP Network' },
      { label: 'Participants', value: 'Global Scholars' },
      { label: 'Outcome', value: 'Joint Research & Grants' },
    ],
    accentTag: 'Global Exchange',
  },
  {
    id: 'awards',
    category: 'Awards',
    badge: 'Springer LNCS',
    title: 'Best Paper Awards',
    headline: 'Honoring Exceptional Scientific Impact',
    description:
      'Recognition across technical tracks celebrating research rigor and real-world impact.',
    highlights: [
      'Evaluated by an international jury',
      'Best Paper & Student Paper honors',
      'Springer LNCS publication inclusion',
    ],
    metrics: [
      { label: 'Recognition', value: 'Best Paper & Student Awards' },
      { label: 'Jury', value: 'International Committee' },
      { label: 'Publication', value: 'Springer LNCS' },
    ],
    accentTag: 'Honors & Medals',
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ConferenceHighlights() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = highlightItems[activeIdx];

  return (
    <section
      id="highlights"
      className="relative overflow-hidden bg-brand-blue"
      aria-label="Conference Highlights"
    >
      {/* Top orange accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-brand-orange" />

      {/* Dot grid */}
      <div
        className="ch-dot-grid absolute inset-0 pointer-events-none opacity-[0.16]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,130,30,0.1) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* ── Section Header ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white relative inline-block">
            Conference Highlights
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-brand-orange rounded-none" />
          </h2>
        </motion.div>

        {/* ── Interactive Split Stage ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* ── Left Column: Track Selector List (5 cols) ───────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
            {highlightItems.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`w-full text-left p-4 md:p-5 transition-all duration-300 relative border cursor-pointer rounded-lg overflow-hidden ${
                    isActive
                      ? 'bg-white text-brand-blue border-white shadow-2xl scale-[1.01] z-10'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40'
                  }`}
                >
                  {/* Left Orange Accent Bar when Active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTrackBar"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-brand-orange rounded-l-md"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <h3
                    className={`text-base md:text-lg font-serif font-bold transition-colors ${
                      isActive ? 'text-brand-blue' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* ── Right Column: High-Contrast Dynamic Spotlight Stage (7 cols) ──────────── */}
          <div className="lg:col-span-7 bg-white text-brand-blue border-2 border-white p-6 md:p-10 relative flex flex-col justify-between min-h-[400px] shadow-2xl rounded-xl overflow-hidden">
            {/* Top Solid Orange Bar */}
            <div className="absolute top-0 left-0 right-0 h-[5px] bg-brand-orange" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-5 flex-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-blue leading-snug mb-2">
                    {activeItem.headline}
                  </h3>

                  <div className="h-[3px] w-12 bg-brand-orange rounded-none mb-3" />

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-2 py-3 border-y border-slate-100">
                  {activeItem.highlights.map((point, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-none shrink-0" />
                      <span className="text-slate-800 text-xs md:text-sm font-semibold">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Metrics Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {activeItem.metrics.map((m) => (
                    <div key={m.label} className="bg-slate-50 border border-slate-200 p-3 rounded-md">
                      <span className="text-[9px] text-brand-orange uppercase tracking-widest font-black block mb-0.5">
                        {m.label}
                      </span>
                      <span className="text-brand-blue text-xs md:text-sm font-bold block truncate">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
