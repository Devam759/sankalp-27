'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import { 
  conferenceDates, 
  keyFeatures, 
  committeeMembers, 
  registrationFees,
  speakers,
  advisoryBoard
} from '@/constants/conferenceData';

const LinkedInIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  const [activeAdvisory, setActiveAdvisory] = React.useState<string | null>(null);
  const [loadingDone, setLoadingDone] = React.useState(true); // Animation skipped, default to true

  const heroImages = [
    '/Images/hero/DJI_0063.JPG.webp',
    '/Images/hero/DJI_0075.JPG.webp',
    '/Images/hero/DJI_0078.JPG.webp',
    '/Images/hero/DJI_0119.JPG.webp',
    '/Images/hero/DJI_0124.JPG.webp'
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  React.useEffect(() => {
    const targetDate = new Date("March 5, 2027 09:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);


  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const points = [
    'Outcome-based and experiential learning',
    'Global academic collaborations and exchange opportunities',
    'Research-driven innovation and entrepreneurship',
    'Industry engagement and real-world problem solving',
    'Holistic development and leadership cultivation'
  ];

  return (
    <>
      <Navbar />
      <motion.main
        className="min-h-screen text-brand-ink font-sans selection:bg-brand-orange selection:text-white"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      >

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-bleed cinematic backdrop, editorial centre layout
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* ── Background: full-bleed campus image slideshow with smooth Ken Burns cross-fade ── */}
        <div className="absolute inset-0 z-0 bg-brand-blue">
          {heroImages.map((img, index) => {
            const isActive = index === currentHeroIndex;
            return (
              <motion.div
                key={img}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1.03 : 1.0
                }}
                transition={{ duration: 2.0, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={img}
                  alt="JK Lakshmipat University Campus"
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            );
          })}
          {/* Dark gradient overlay — heavier at bottom to anchor the stat bar */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/70 via-brand-blue/55 to-brand-blue/85 z-10 pointer-events-none" />
          {/* Subtle noise / grain texture for depth */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] z-10 pointer-events-none" />
        </div>



        {/* ── Main centred content ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full pt-16 md:pt-20 pb-36"
        >
          {/* ── SANKALP LOGO SLOT ────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="-mt-3 mb-2">
            <Image
              src="/logos/sankalp_logo_white.png"
              alt="SANKALP 2027 Conference Logo"
              width={420}
              height={420}
              priority
              unoptimized
              className="w-72 sm:w-96 md:w-[420px] h-auto object-contain filter drop-shadow-[0_6px_28px_rgba(255,255,255,0.22)] transition-transform duration-300 hover:scale-105"
            />
          </motion.div>

          {/* Conference name */}
          <motion.div variants={itemVariants} className="mb-3">
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-sans font-black tracking-[-0.02em] text-white leading-none uppercase">
              SANKALP
              <span className="text-brand-orange"> '27</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-white/65 text-xs md:text-sm font-semibold tracking-[0.14em] uppercase max-w-2xl leading-loose">
              <span className="text-brand-orange font-bold">S</span>ustainable <span className="text-brand-orange font-bold">A</span>I · <span className="text-brand-orange font-bold">N</span>ext Gen <span className="text-brand-orange font-bold">K</span>nowledge<br className="hidden md:block" />
              <span className="text-brand-orange font-bold">A</span>utomation · <span className="text-brand-orange font-bold">L</span>earning and <span className="text-brand-orange font-bold">P</span>rediction
            </p>
          </motion.div>

          {/* Countdown timer */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-10">
            {[
              { value: timeLeft.isExpired ? "00" : String(timeLeft.days).padStart(2, '0'), label: "Days" },
              { value: timeLeft.isExpired ? "00" : String(timeLeft.hours).padStart(2, '0'), label: "Hours" },
              { value: timeLeft.isExpired ? "00" : String(timeLeft.minutes).padStart(2, '0'), label: "Minutes" },
              { value: timeLeft.isExpired ? "00" : String(timeLeft.seconds).padStart(2, '0'), label: "Seconds" },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center justify-center bg-brand-blue border border-white/10 w-18 h-18 rounded-md shadow-lg">
                <span className="text-brand-orange text-2xl font-black font-sans leading-none mb-1 tracking-wider">{unit.value}</span>
                <span className="text-white/60 text-[8px] font-semibold tracking-widest uppercase">{unit.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Centralized Hero CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/call-for-papers"
              className="bg-brand-orange text-white px-8 py-3.5 rounded-sm font-bold text-sm hover:bg-orange-500 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 tracking-wide flex items-center justify-center"
            >
              Submit Paper
            </Link>
            <Link
              href="/registration"
              className="bg-white/10 backdrop-blur-md border border-white/40 text-white px-8 py-3.5 rounded-sm font-bold text-sm hover:bg-white hover:text-brand-blue transition-all shadow-lg hover:-translate-y-0.5 tracking-wide flex items-center justify-center"
            >
              Register Now
            </Link>
          </motion.div>

        </motion.div>

      </section>


      {/* EDITORIAL THREE COLUMN INFO SECTION */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-slate-200">
          
          {/* Left: Welcome */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-brand-blue p-10 text-white flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="w-16 h-16 mb-5 rounded-sm border border-white/15 bg-white/10 flex items-center justify-center" aria-label="SANKALP Logo (placeholder)">
              <span className="text-white/30 text-[8px] font-bold uppercase tracking-wider text-center leading-tight">LOGO</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-1">SANKALP '27</h3>
            <p className="text-brand-orange text-xs font-semibold tracking-[0.14em] uppercase mb-4">सङ्कल्प · Resolution · Intent · Commitment</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              A premier JKLU International Conference uniting researchers, academics, industry leaders and students across six frontier domains: Sustainable AI, Next-Gen Knowledge, Automation, Learning, Prediction and emerging technologies.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Driving the resolve, the <em>sankalp</em>, to shape a future of intelligent, ethical, and impactful innovation.
            </p>
          </motion.div>

          {/* Center: Latest Information */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-brand-orange p-10 flex flex-col border-r border-b lg:border-b-0 border-brand-orange/80 group"
          >
            <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-blue"></span>
              Latest Updates
            </h3>
            <ul className="space-y-5 flex-grow">
              {[
                'Call for Papers opens on 1 August 2026',
                'Full paper submission deadline: 31 October 2026',
                'Conference mode: Hybrid',
                'Registration details announced'
              ].map((info, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <span className="text-brand-blue mt-1 font-bold select-none">✓</span>
                  <span className="text-white text-sm leading-relaxed font-semibold">{info}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Important Dates (Timeline) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            id="important-dates"
            className="bg-brand-blue/95 p-10 flex flex-col"
          >
            <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-orange"></span>
              Key Dates
            </h3>
            <div className="relative border-l border-brand-orange/40 ml-2 space-y-6 flex-grow">
              {conferenceDates.map((dateItem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  className="relative pl-6"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-brand-orange rounded-none"></div>
                  <span className="block text-xs font-bold text-brand-orange/90 uppercase tracking-wider mb-1">{dateItem.label}</span>
                  <span className="block text-white font-semibold text-sm">{dateItem.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </Section>

      {/* CONFERENCE HIGHLIGHTS — STRICT 3-COLOR PALETTE */}
      <section className="relative overflow-hidden bg-brand-blue">
        
        {/* Diagonal grid texture (White on Blue) */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        
        {/* Top bar (Orange) */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-orange" />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32 z-10">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight">
                Conference<br />
                <span className="text-brand-orange">Highlights</span>
              </h2>
              <p className="text-white max-w-md text-sm leading-relaxed font-medium md:text-right">
                A world-class platform uniting researchers, academics, industry leaders and innovators to shape the future of technology.
              </p>
            </div>
          </motion.div>

          {/* STRICT PALETTE BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* Feature 1: Keynote — wide card (White) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.0 }}
              className="md:col-span-2 xl:col-span-1 relative group bg-white border-2 border-white hover:border-brand-orange rounded-none p-8 overflow-hidden transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative z-10">

                <h3 className="text-2xl font-bold text-brand-blue mb-3 leading-snug">Distinguished International Keynote Speakers</h3>
                <p className="text-brand-blue text-sm leading-relaxed">World-renowned researchers and practitioners delivering visionary talks on AI, sustainability, and emerging technologies.</p>
              </div>
            </motion.div>

            {/* Feature 2: Industry panels (White) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative group bg-white border-2 border-white hover:border-brand-orange rounded-none p-8 overflow-hidden transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative z-10">

                <h3 className="text-xl font-bold text-brand-blue mb-3 leading-snug">Industry Panels & Expert Roundtables</h3>
                <p className="text-brand-blue text-sm leading-relaxed">Deep-dive panel sessions bridging academia and industry on the most pressing technology challenges.</p>
              </div>
            </motion.div>

            {/* Feature 3: Research papers (White) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="relative group bg-white border-2 border-white hover:border-brand-orange rounded-none p-8 overflow-hidden transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative z-10">

                <h3 className="text-xl font-bold text-brand-blue mb-3 leading-snug">Research Paper Presentations</h3>
                <p className="text-brand-blue text-sm leading-relaxed">Present your original research to a global audience of peers, reviewers, and industry professionals.</p>
              </div>
            </motion.div>

            {/* Feature 4: Startup — HIGHLIGHTED orange card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.20 }}
              className="relative group bg-brand-orange border-2 border-brand-orange hover:border-white rounded-none p-8 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="flex justify-end mb-6">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-white/15 px-3.5 py-1.5 rounded-sm">Atal Incubation</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">Startup & Innovation Showcase</h3>
                <p className="text-white text-sm leading-relaxed">Pitch your startup ideas, demos and innovations to investors, mentors and a global innovation community.</p>
              </div>
            </motion.div>

            {/* Feature 5: Networking (White) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="relative group bg-white border-2 border-white hover:border-brand-orange rounded-none p-8 overflow-hidden transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="flex justify-end mb-6">
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3.5 py-1.5 rounded-sm">CGLP</span>
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-3 leading-snug">Networking & Collaboration</h3>
                <p className="text-brand-blue text-sm leading-relaxed">Build lasting academic and industry connections through curated networking sessions and collaboration opportunities.</p>
              </div>
            </motion.div>

            {/* Feature 6: Best Paper + publication — tall card (White) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="relative group bg-white border-2 border-white hover:border-brand-orange rounded-none p-8 overflow-hidden transition-all duration-300 cursor-default flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative z-10">

                <h3 className="text-xl font-bold text-brand-blue mb-3 leading-snug">Best Paper Awards</h3>
                <p className="text-brand-blue text-sm leading-relaxed">Outstanding research recognized with awards across all tracks, celebrating excellence and impact.</p>
              </div>
              {/* Publication badge inside */}
              <div className="mt-8 border-t border-brand-blue/10 pt-6 flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-brand-orange flex items-center justify-center font-mono text-sm font-bold text-white rounded-none">
                  P
                </div>
                <div>
                  <span className="text-brand-blue text-xs font-bold block mb-0.5">Springer LNCS Series</span>
                  <span className="text-brand-orange text-[9px] font-bold uppercase tracking-widest">Scopus Indexed</span>
                </div>
              </div>
            </motion.div>

          </div>



        </div>
      </section>


      {/* SPEAKERS SECTION */}
      <Section id="speakers" title="Plenary & Keynote Speakers">
        <div className="max-w-[1200px] mx-auto space-y-16">
          {/* Plenary Speaker */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.25em] mb-6">Plenary Speaker</span>
            {[...speakers.plenary].sort((a, b) => {
              const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
              const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
              return nameA.localeCompare(nameB);
            }).map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl bg-white border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center md:text-left w-full group relative"
              >
                <div className="relative w-36 h-36 rounded-full border border-slate-200 overflow-hidden shrink-0 bg-white shadow-sm transition-transform duration-500 group-hover:scale-[1.03]">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="144px"
                    className="object-cover object-top transition-transform duration-500"
                  />
                </div>
                <div className="flex-grow w-full">
                  <div className="relative pr-12">
                    <h4 className="text-2xl font-serif font-bold text-brand-blue transition-colors duration-300 group-hover:text-brand-orange mb-1.5">{speaker.name}</h4>
                    {speaker.linkedin && (
                      <div className="absolute top-1/2 -translate-y-1/2 right-0 group/tooltip">
                        <a 
                          href={speaker.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-[#0a66c2] shadow-sm transition-all duration-300 hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                          aria-label={`View ${speaker.name}'s LinkedIn Profile`}
                        >
                          <LinkedInIcon size={16} />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-95 opacity-0 pointer-events-none group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 bg-[#0b0f19] text-white text-[10px] font-sans font-bold tracking-wider uppercase py-1.5 px-3 rounded-sm shadow-md z-30 whitespace-nowrap">
                          View LinkedIn Profile
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0b0f19]" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">{speaker.role}</p>
                  <p className="text-slate-600 text-sm font-semibold leading-relaxed">{speaker.university}</p>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mt-1">{speaker.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full h-px bg-slate-200"></div>

          {/* Keynote Speakers */}
          <div>
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.25em] block">Keynote Speakers</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...speakers.keynote].sort((a, b) => {
                const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                return nameA.localeCompare(nameB);
              }).map((speaker, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 p-6 pt-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative group h-full justify-start"
                >
                  <div className="relative w-24 h-24 rounded-full border border-slate-200 overflow-hidden shrink-0 bg-white shadow-sm mb-4 transition-transform duration-500 group-hover:scale-[1.03]">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full relative">
                    <h4 className="text-lg font-serif font-bold text-brand-blue mb-1.5 transition-colors duration-300 group-hover:text-brand-orange">{speaker.name}</h4>
                    <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">{speaker.role}</p>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">{speaker.university}</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed mt-1">{speaker.location}</p>
                  </div>

                  {speaker.linkedin && (
                    <div className="absolute top-6 right-6 group/tooltip">
                      <a 
                        href={speaker.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-[#0a66c2] shadow-sm transition-all duration-300 hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                        aria-label={`View ${speaker.name}'s LinkedIn Profile`}
                      >
                        <LinkedInIcon size={16} />
                      </a>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-95 opacity-0 pointer-events-none group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 bg-[#0b0f19] text-white text-[10px] font-sans font-bold tracking-wider uppercase py-1.5 px-3 rounded-sm shadow-md z-30 whitespace-nowrap">
                        View LinkedIn Profile
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0b0f19]" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* COMMITTEE */}
      <Section id="committee" title="Conference Committee">
        <div className="max-w-[1200px] mx-auto space-y-12">
          
          {/* Patrons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[committeeMembers.chiefPatron, ...committeeMembers.chiefCoPatrons, committeeMembers.patron].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className={`p-6 border flex items-start gap-4 group transition-colors ${
                  i === 3
                    ? 'bg-brand-orange/10 border-brand-orange/20 hover:bg-brand-orange hover:text-white'
                    : 'bg-brand-blue/5 border-brand-blue/20 hover:bg-brand-blue hover:text-white'
                }`}
              >
                <div className="relative w-16 h-16 rounded-xl border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src={('image' in member && (member as any).image) || '/Images/footer_image.webp'}
                    alt={member.name}
                    fill
                    sizes="64px"
                    className="object-cover transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-orange uppercase mb-1 tracking-widest group-hover:text-brand-blue">{member.role}</p>
                  <h4 className="text-base font-serif font-bold text-brand-blue group-hover:text-white">{member.name}</h4>
                  {'title' in member && <p className="text-brand-blue/70 group-hover:text-white/80 text-xs font-medium mt-1">{(member as typeof committeeMembers.patron).title}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chairs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {committeeMembers.chairs.map((chair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="bg-brand-blue text-white p-6 border border-brand-blue hover:bg-brand-blue/90 transition-shadow flex items-center gap-4 text-left group"
              >
                <div className="relative w-16 h-16 rounded-xl border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src={chair.image || "/Images/footer_image.webp"}
                    alt={chair.name}
                    fill
                    sizes="64px"
                    className="object-cover transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-orange uppercase mb-1 tracking-widest">{chair.role}</p>
                  <h4 className="text-lg font-serif font-bold text-white mb-1">{chair.name}</h4>
                  <p className="text-slate-300 text-xs font-medium">{chair.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Program Chairs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Prof. Amit Kumar Sinhal', track: 'Institute of Engineering and Technology', image: '/Images/committee/amit_sinhal_real.png' },
              { name: 'Prof. Devika Kataria', track: 'Institute of Engineering and Technology', image: '/Images/committee/devika_kataria_real.png' },
              { name: 'Prof. Taruna Sunil', track: 'Institute of Engineering and Technology', image: '/Images/committee/taruna_sunil_real.png' },
              { name: 'Prof. Umesh Gupta', track: 'Institute of Engineering and Technology', image: '/Images/committee/umesh_gupta_real.png' },
            ].map((chair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="bg-brand-orange/10 border border-brand-orange/20 p-6 flex flex-col items-center text-center group rounded-sm shadow-sm hover:bg-brand-orange hover:text-white transition-all duration-300"
              >
                <div className="relative w-16 h-16 rounded-xl border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm mb-4">
                  <Image
                    src={chair.image}
                    alt={chair.name}
                    fill
                    sizes="64px"
                    unoptimized
                    className="object-cover transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-orange group-hover:text-white uppercase mb-1 tracking-widest">Program Chair</p>
                  <h4 className="text-base font-serif font-bold text-brand-blue group-hover:text-white mb-1">{chair.name}</h4>
                  <p className="text-slate-500 group-hover:text-white/80 text-xs font-semibold">{chair.track}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Advisory Boards - Premium Gallery */}
          <div className="mt-20 border-t border-brand-blue/10 pt-16 -mx-8 px-8 sm:mx-0 sm:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
              <div>
                <h3 className="font-serif font-bold text-3xl text-brand-blue mb-2">Organising Committee & Advisory Boards</h3>
                <p className="text-slate-500 font-medium text-sm">A premium showcase of our conference leadership and advisors.</p>
              </div>
            </div>

            {/* The 3 Cards Gallery */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 w-full group/gallery" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
               {[
                { id: 'international', title: 'International Advisory Board', subtitle: 'Global research leaders', number: '01' },
                { id: 'national', title: 'National Advisory Board', subtitle: 'Eminent professors across India', number: '02' },
                { id: 'internal', title: 'Organising Committee', subtitle: 'Organizing pillars at JKLU', number: '03' }
              ].map((board, i) => (
                <motion.div
                  key={board.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.1, 1), duration: 0.8, ease: "easeOut" }}
                  onClick={() => setActiveAdvisory(activeAdvisory === board.id ? null : board.id)}
                  className={`shrink-0 w-[85vw] sm:w-[360px] aspect-[4/5] relative group/card snap-center overflow-hidden border cursor-pointer transition-all duration-500 hover:shadow-2xl ${
                    activeAdvisory === board.id 
                      ? 'border-brand-orange bg-[#0a0a0a]' 
                      : 'border-brand-blue/10 bg-[#101010]'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 ${
                    activeAdvisory === board.id
                      ? 'from-brand-orange/20 to-[#0a0a0a] opacity-100'
                      : 'from-brand-blue/60 to-[#0a0a0a] opacity-90 group-hover/card:opacity-100'
                  }`} />
                  
                  <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    activeAdvisory === board.id ? 'opacity-10' : 'opacity-[0.03] group-hover/card:opacity-10'
                  }`} style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                  <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                    <div className="flex justify-between items-start">
                      <span className={`font-mono font-black text-5xl transition-colors duration-500 ${
                        activeAdvisory === board.id ? 'text-brand-orange' : 'text-white/20 group-hover/card:text-brand-orange/80'
                      }`}>{board.number}</span>
                    </div>
                    
                    <div className={`${activeAdvisory === board.id ? '-translate-y-2' : 'group-hover/card:-translate-y-2'} transition-transform duration-500`}>
                      <h3 className="font-serif font-bold text-2xl text-white leading-tight mb-4 uppercase">{board.title}</h3>
                      <div className={`h-[2px] transition-all duration-500 mb-4 ${
                        activeAdvisory === board.id ? 'bg-brand-orange w-16' : 'bg-white/20 w-8 group-hover/card:bg-brand-orange group-hover/card:w-16'
                      }`} />
                      <p className="text-white/60 text-xs font-medium tracking-wide uppercase leading-relaxed">{board.subtitle}</p>
                      
                      <div className={`text-[10px] lowercase font-normal opacity-70 mt-6 text-brand-orange transition-opacity ${
                        activeAdvisory === board.id ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'
                      }`}>
                        {activeAdvisory === board.id ? 'Click to close' : 'Click to view members'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              .group\\/gallery::-webkit-scrollbar { display: none; }
            `}} />

          </div>

        </div>
      </Section>

      {/* CONFERENCE VENUE */}
      <Section id="venue" title="Conference Venue">
        <div className="max-w-[1200px] mx-auto space-y-10">

          {/* ── Hero Campus Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative h-[340px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl group"
          >
            <Image
              src="/Images/hero/DJI_0063.JPG.webp"
              alt="JK Lakshmipat University Campus, Jaipur"
              fill
              sizes="100vw"
              className="object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-[2000ms] ease-out"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/85 via-[#0b1220]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/40 to-transparent" />

            {/* Bottom caption */}
            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 z-10">
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-white font-serif font-bold text-2xl md:text-4xl leading-tight"
              >
                JK Lakshmipat University<br className="hidden md:block" />
                <span className="text-white/70 text-xl md:text-3xl font-normal">Jaipur, India</span>
              </motion.h3>
            </div>
          </motion.div>

          {/* ── Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* About University */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-1 bg-gradient-to-br from-brand-blue to-[#0d1f3c] text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl shadow-brand-blue/20"
            >
              <div>
                <h3 className="text-xl font-serif font-bold leading-snug mb-4 mt-2">JK Lakshmipat University</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  A leading institution dedicated to innovation, interdisciplinary learning, and industry engagement — offering world-class conference facilities and a collaborative environment for international gatherings.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="https://www.jklu.edu.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-brand-orange hover:text-white transition-colors group"
                >
                  Visit JKLU Website →
                </a>
              </div>
            </motion.div>

            {/* About Jaipur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-500"
            >
              <h3 className="text-xl font-serif font-bold text-brand-blue leading-snug mb-4 mt-2">About Jaipur</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                Known as the <strong className="text-brand-blue">Pink City of India</strong>, Jaipur is a distinguished center of culture, heritage, and innovation. As host city of SANKALP 2027, it offers delegates iconic landmarks, world-class hospitality, and excellent connectivity.
              </p>

              {/* Highlight chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { label: 'UNESCO Heritage' },
                  { label: 'Great Connectivity' },
                  { label: 'Rich Culture' },
                  { label: 'Premium Stays' },
                ].map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-brand-blue uppercase tracking-wider hover:bg-brand-orange/5 hover:border-brand-orange/30 transition-colors cursor-default"
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </Section>

      <Footer />
    </motion.main>
            {/* Modal Overlay for Expanded List Panel */}
            <AnimatePresence>
              {activeAdvisory && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0b101e]/95"
                  onClick={() => setActiveAdvisory(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#f7f4ef] w-full max-w-5xl max-h-[85vh] rounded shadow-2xl flex flex-col overflow-hidden relative"
                  >
                    {/* Modal Header */}
                    <div className="bg-[#0b101e] p-6 md:p-8 flex justify-between items-center shrink-0 border-b border-brand-orange/20">
                      <div>
                        <h4 className="text-xl md:text-2xl font-serif font-bold text-white uppercase tracking-wider">
                          {activeAdvisory === 'international' && 'International Advisory Board'}
                          {activeAdvisory === 'national' && 'National Advisory Board'}
                          {activeAdvisory === 'internal' && 'Organising Committee'}
                        </h4>
                        <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mt-2">SANKALP 2027</p>
                      </div>
                      <button onClick={() => setActiveAdvisory(null)} className="text-white/50 hover:text-brand-orange transition-colors p-2 bg-white/5 rounded-md font-bold text-xs tracking-wider uppercase">
                        Close
                      </button>
                    </div>

                    {/* Modal Content - Scrollable */}
                    <div className="p-6 md:p-10 overflow-y-auto bg-[#f7f4ef]">
                      {activeAdvisory === 'internal' ? (
                        <div className="space-y-6 max-w-4xl mx-auto">
                          <div className="bg-white p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                            <div>
                              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">Conference Chair</span>
                              <span className="font-serif font-bold text-brand-blue text-lg block">Prof. Tapas Kumar</span>
                              <span className="text-slate-500 text-xs block font-medium">Dean IET, JKLU</span>
                            </div>
                            <hr className="border-slate-100" />
                            <div>
                              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">Conference Convener</span>
                              <span className="font-serif font-bold text-brand-blue text-lg block">Prof. Sonali Vyas</span>
                              <span className="text-slate-500 text-xs block font-medium">Head – Centre for Global Learning, JKLU</span>
                            </div>
                            <hr className="border-slate-100" />
                            <div>
                              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">Program Chairs</span>
                              <span className="font-serif font-bold text-brand-blue text-lg block">Prof. Amit / Prof. Devika / Prof. Taruna, and Prof. Umesh</span>
                              <span className="text-slate-500 text-xs block font-medium">Professors of Institute of Engineering & Technology (IET), JKLU</span>
                            </div>
                          </div>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium italic">
                            Note: The Organising Committee comprises faculty members, research teams, and administrative support staff from the Institute of Engineering & Technology (IET) and Centre for Global Learning (CGLP) at JK Lakshmipat University.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[...(activeAdvisory === 'international' ? advisoryBoard.international : advisoryBoard.national)]
                            .sort((a, b) => {
                              const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                              const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                              return nameA.localeCompare(nameB);
                            })
                            .map((member, idx) => (
                              <div key={idx} className="bg-white p-5 border border-slate-100 hover:border-brand-orange/30 hover:shadow-md transition-all">
                                <h5 className="font-bold text-brand-blue text-sm mb-1">{member.name}</h5>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">{member.title}</p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
    </>
  );
}
