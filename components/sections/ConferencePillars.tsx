'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Research',
    description:
      'Rigorous peer review, technical evaluation, and academic integrity ensure that every accepted contribution meets international research standards.',
    accent: 'Peer Review · Evaluation · Integrity',
    svg: (
      /* Abstract research / waveform SVG */
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="10" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M40 60 L60 20 L80 100 L100 40 L120 80 L140 50 L160 60 L190 60"
          stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="60" cy="20" r="3" fill="currentColor" fillOpacity="0.3" />
        <circle cx="100" cy="40" r="3" fill="currentColor" fillOpacity="0.3" />
        <circle cx="140" cy="50" r="3" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Innovation',
    description:
      'Encouraging transformative ideas across artificial intelligence, sustainable technologies, intelligent systems, and emerging digital ecosystems.',
    accent: 'AI · Sustainability · Digital Systems',
    svg: (
      /* Geometric hexagonal innovation pattern */
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon points="100,10 130,28 130,64 100,82 70,64 70,28" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
        <polygon points="100,25 120,37 120,61 100,73 80,61 80,37" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" fill="none" />
        <circle cx="100" cy="46" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
        <line x1="100" y1="82" x2="100" y2="110" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="130" y1="64" x2="158" y2="80" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="70" y1="64" x2="42" y2="80" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Collaboration',
    description:
      'Bringing together academia, industry leaders, researchers, policymakers, and innovators to exchange ideas and create meaningful partnerships.',
    accent: 'Academia · Industry · Policy',
    svg: (
      /* Connected nodes network SVG */
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="100" y1="60" x2="40" y2="25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="100" y1="60" x2="160" y2="25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="100" y1="60" x2="40" y2="95" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="100" y1="60" x2="160" y2="95" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="100" y1="60" x2="100" y2="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="40" y1="25" x2="160" y2="25" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" />
        <line x1="40" y1="95" x2="160" y2="95" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" />
        <circle cx="100" cy="60" r="8" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" fill="none" />
        <circle cx="40" cy="25" r="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
        <circle cx="160" cy="25" r="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
        <circle cx="40" cy="95" r="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
        <circle cx="160" cy="95" r="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
        <circle cx="100" cy="10" r="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" fill="none" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Impact',
    description:
      'Focusing on real-world applications, societal advancement, and sustainable technological development that creates lasting value.',
    accent: 'Society · Sustainability · Value',
    svg: (
      /* Impact / rising chart metrics SVG */
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="30" y1="100" x2="30" y2="20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="30" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        <polyline points="30,90 70,75 110,55 140,35 170,20"
          stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="70" cy="75" r="3.5" fill="currentColor" fillOpacity="0.35" />
        <circle cx="110" cy="55" r="3.5" fill="currentColor" fillOpacity="0.35" />
        <circle cx="140" cy="35" r="3.5" fill="currentColor" fillOpacity="0.35" />
        <circle cx="170" cy="20" r="5" fill="currentColor" fillOpacity="0.5" />
        <line x1="70" y1="100" x2="70" y2="75" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="3" />
        <line x1="110" y1="100" x2="110" y2="55" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="3" />
        <line x1="140" y1="100" x2="140" y2="35" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="3" />
        <line x1="170" y1="100" x2="170" y2="20" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="3" />
      </svg>
    ),
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const pillarVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.18 },
  }),
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function ConferencePillars() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-brand-cloud py-32 px-6 border-b border-brand-blue/10 overflow-hidden"
    >
      {/* Faint background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dna-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0f265c" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dna-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">

        {/* ── Section Header ── */}
        <div className="mb-20 max-w-3xl">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={headingVariants}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-[2px] bg-brand-orange" />
            <span className="text-brand-orange font-bold tracking-[0.22em] uppercase text-[10px]">
              The Foundation of SANKALP
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={headingVariants}
            className="text-5xl md:text-7xl font-serif font-bold text-brand-blue leading-[1.05] mb-8"
          >
            Conference DNA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-600 text-lg leading-relaxed font-medium max-w-2xl"
          >
            Every world-class conference is built on a set of principles. SANKALP 2027 is driven by
            research excellence, innovation, collaboration, and global impact.
          </motion.p>
        </div>

        {/* ── Four Pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-brand-blue/10">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={pillarVariants}
              className="group relative flex flex-col px-0 md:px-10 py-12 first:pl-0 last:pr-0 cursor-default select-none"
            >
              {/* Animated orange left accent line (visible on hover) */}
              <motion.div
                variants={lineVariants}
                className="hidden md:block absolute left-0 top-12 w-[2px] bg-brand-orange origin-top"
                style={{ height: 'calc(100% - 6rem)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />

              {/* Large section number */}
              <span className="block font-mono text-[72px] md:text-[88px] lg:text-[100px] font-black leading-none text-brand-blue/8 group-hover:text-brand-orange/15 transition-colors duration-700 mb-4 tracking-tight select-none">
                {pillar.number}
              </span>

              {/* SVG visual */}
              <div className="w-full h-20 text-brand-blue mb-8 group-hover:text-brand-orange transition-colors duration-700">
                {pillar.svg}
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-3xl md:text-4xl text-brand-blue group-hover:text-brand-blue transition-colors mb-1 tracking-tight leading-none">
                {pillar.title}
              </h3>

              {/* Animated orange divider line */}
              <div className="relative h-[2px] w-12 bg-brand-blue/10 my-5 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-brand-orange origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-[1.8] font-medium mb-6 flex-grow">
                {pillar.description}
              </p>

              {/* Accent tags */}
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-orange/70 group-hover:text-brand-orange transition-colors duration-500">
                {pillar.accent}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom divider with conference name stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 pt-8 border-t border-brand-blue/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">
            SANKALP 2027 - JK Lakshmipat University, Jaipur
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-300">
            International Conference on Sustainable Technologies &amp; AI
          </span>
        </motion.div>

      </div>
    </section>
  );
}
