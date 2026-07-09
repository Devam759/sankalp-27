'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FileText, Calendar, MapPin, ChevronRight, Check } from 'lucide-react';
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

export default function Home() {
  const [activeAdvisory, setActiveAdvisory] = React.useState<string | null>(null);

  const heroImages = [
    '/Images/hero/DJI_0060.JPG.webp',
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
    <main className="min-h-screen text-brand-ink font-sans selection:bg-brand-orange selection:text-white">
      <Navbar />

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

        {/* ── Orange top-rule (matches navbar accent) ── */}
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange z-20" />

        {/* ── Main centred content ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full pt-28 pb-40"
        >
          {/* ── SANKALP LOGO SLOT ──────────────────────────────────────────
               Replace the placeholder below with:
               <Image src="/logos/sankalp logo.jpeg" alt="SANKALP Logo" width={100} height={100} className="object-contain" />
               when ready. The w-24 h-24 block reserves the exact space.
          ─────────────────────────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mb-6">
            {/* Logo placeholder — swap <div> for <Image> once file is added */}
            <div className="w-24 h-24 rounded-sm border border-white/15 bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto" aria-label="SANKALP Conference Logo (placeholder)">
              <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest text-center leading-tight px-2">SANKALP<br/>LOGO</span>
            </div>
          </motion.div>

          {/* Conference name */}
          <motion.div variants={itemVariants} className="mb-3">
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-sans font-black tracking-[-0.02em] text-white leading-none uppercase">
              SANKALP
              <span className="text-brand-orange"> '27</span>
            </h1>
          </motion.div>

          {/* Sanskrit name + meaning — from logo */}
          <motion.div variants={itemVariants} className="mb-5">
            <p className="text-brand-orange/80 text-sm font-semibold tracking-[0.12em] italic">
              सङ्कल्प &nbsp;·&nbsp; <span className="not-italic text-white/50 text-xs tracking-widest uppercase">Resolution · Intent · Commitment</span>
            </p>
          </motion.div>

          {/* Official tagline — exactly as on the logo */}
          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-white/65 text-xs md:text-sm font-semibold tracking-[0.14em] uppercase max-w-2xl leading-loose">
              Sustainable AI · Next Gen Knowledge<br className="hidden md:block" />
              Automation · Learning and Prediction
            </p>
          </motion.div>

          {/* Date / Venue pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-2.5 text-white text-xs font-semibold tracking-widest uppercase rounded-sm">
              <Calendar size={13} className="text-brand-orange" />
              5 – 6 March 2027
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-2.5 text-white text-xs font-semibold tracking-widest uppercase rounded-sm">
              <MapPin size={13} className="text-brand-orange" />
              Jaipur, India · Hybrid Mode
            </div>
          </motion.div>

        </motion.div>

        {/* ── Bottom stat bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-brand-blue/60 backdrop-blur-md"
        >
          <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { value: "5+",      label: "Keynote Speakers" },
              { value: "20+",     label: "Technical Sessions" },
              { value: "Mar '27", label: "Conference Date" },
              { value: "Hybrid",  label: "Presentation Mode" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center px-4 py-2 text-center">
                <span className="text-brand-orange text-xl font-black font-sans leading-none mb-1">{stat.value}</span>
                <span className="text-white/55 text-[10px] font-semibold tracking-widest uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
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
              Driving the resolve — the <em>sankalp</em> — to shape a future of intelligent, ethical, and impactful innovation.
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
                'Call for Papers opens on 15 July 2026',
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
                  <span className="text-brand-blue mt-1"><Check size={16} /></span>
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

      {/* CONFERENCE HIGHLIGHTS — BENTO REDESIGN */}
      <section className="relative overflow-hidden bg-brand-blue">
        {/* Diagonal grid texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(245,130,30,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        {/* Glowing top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-orange shadow-[0_0_20px_rgba(245,130,30,0.6)]" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-[2px] bg-brand-orange" />
              <span className="text-brand-orange text-[10px] font-bold tracking-[0.3em] uppercase">What to Expect</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white leading-[1.05]">
                Conference<br />
                <span className="text-brand-orange">Highlights</span>
              </h2>
              <p className="text-slate-400 max-w-md text-sm leading-relaxed font-medium md:text-right">
                A world-class platform uniting researchers, academics, industry leaders and innovators to shape the future of technology.
              </p>
            </div>
          </motion.div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* Feature 1: Keynote — wide card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.0 }}
              className="md:col-span-2 xl:col-span-1 relative group bg-white/[0.03] border border-white/10 p-8 overflow-hidden hover:bg-white/[0.07] transition-all duration-400 cursor-default"
            >
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="text-xs font-mono font-bold text-brand-orange mb-6 tracking-widest block uppercase group-hover:text-white transition-colors duration-300">
                [ 01 ] keynote
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">Distinguished International Keynote Speakers</h3>
              <p className="text-slate-400 text-sm leading-relaxed">World-renowned researchers and practitioners delivering visionary talks on AI, sustainability, and emerging technologies.</p>
            </motion.div>

            {/* Feature 2: Industry panels */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative group bg-white/[0.03] border border-white/10 p-8 overflow-hidden hover:bg-white/[0.07] transition-all duration-400 cursor-default"
            >
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="text-xs font-mono font-bold text-brand-orange mb-6 tracking-widest block uppercase group-hover:text-white transition-colors duration-300">
                [ 02 ] panel
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">Industry Panels & Expert Roundtables</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Deep-dive panel sessions bridging academia and industry on the most pressing technology challenges.</p>
            </motion.div>

            {/* Feature 3: Research papers */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="relative group bg-white/[0.03] border border-white/10 p-8 overflow-hidden hover:bg-white/[0.07] transition-all duration-400 cursor-default"
            >
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="text-xs font-mono font-bold text-brand-orange mb-6 tracking-widest block uppercase group-hover:text-white transition-colors duration-300">
                [ 03 ] research
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">Research Paper Presentations</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Present your original research to a global audience of peers, reviewers, and industry professionals.</p>
            </motion.div>

            {/* Feature 4: Startup — HIGHLIGHTED orange card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.20 }}
              className="relative group bg-brand-orange border border-brand-orange p-8 overflow-hidden cursor-default"
            >
              <div className="absolute top-4 right-4 text-[10px] font-bold text-white/60 uppercase tracking-widest">Atal Incubation</div>
              <div className="text-xs font-mono font-bold text-white/80 mb-6 tracking-widest block uppercase">
                [ 04 ] showcase
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">Startup & Innovation Showcase</h3>
              <p className="text-white/75 text-sm leading-relaxed">Pitch your startup ideas, demos and innovations to investors, mentors and a global innovation community.</p>
            </motion.div>

            {/* Feature 5: Networking */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="relative group bg-white/[0.03] border border-white/10 p-8 overflow-hidden hover:bg-white/[0.07] transition-all duration-400 cursor-default"
            >
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute top-4 right-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">CGLP</div>
              <div className="text-xs font-mono font-bold text-brand-orange mb-6 tracking-widest block uppercase group-hover:text-white transition-colors duration-300">
                [ 05 ] exchange
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">Networking & Collaboration</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Build lasting academic and industry connections through curated networking sessions and collaboration opportunities.</p>
            </motion.div>

            {/* Feature 6: Best Paper + publication — tall card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="relative group bg-white/[0.03] border border-white/10 p-8 overflow-hidden hover:bg-white/[0.07] transition-all duration-400 cursor-default flex flex-col justify-between"
            >
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div>
                <div className="text-xs font-mono font-bold text-brand-orange mb-6 tracking-widest block uppercase group-hover:text-white transition-colors duration-300">
                  [ 06 ] award
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">Best Paper Awards</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Outstanding research recognized with awards across all tracks, celebrating excellence and impact.</p>
              </div>
              {/* Publication badge inside */}
              <div className="mt-8 border-t border-white/10 pt-6 flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-orange/20 flex items-center justify-center font-mono text-xs font-bold text-brand-orange">
                  P
                </div>
                <div>
                  <span className="text-white text-xs font-bold block">Springer LNCS Series</span>
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider">Scopus Indexed · Approval Awaited</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '7', label: 'Research Tracks', sub: 'Multidisciplinary themes' },
              { value: '4+', label: 'Speakers', sub: 'International keynotes & plenary' },
              { value: '5–6', label: 'March 2027', sub: 'Hybrid — Jaipur & Online' },
              { value: 'LNCS', label: 'Publication', sub: 'Springer · Scopus Indexed' },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-3xl font-serif font-bold text-brand-orange mb-1">{stat.value}</div>
                <div className="text-white text-sm font-bold mb-0.5">{stat.label}</div>
                <div className="text-slate-500 text-[11px] uppercase tracking-wider">{stat.sub}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* SPEAKERS SECTION */}
      <Section id="speakers" title="Plenary & Keynote Speakers">
        <div className="max-w-[1200px] mx-auto space-y-16">
          {/* Plenary Speaker */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.25em] mb-6">Plenary Speaker</span>
            {speakers.plenary.map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl bg-white border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-shadow text-center md:text-left w-full"
              >
                <div className="relative w-32 h-32 rounded-full border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-brand-blue mb-1">{speaker.name}</h4>
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">{speaker.role}</p>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{speaker.affiliation}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full h-px bg-slate-200"></div>

          {/* Keynote Speakers */}
          <div>
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.25em]">Keynote Speakers</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {speakers.keynote.map((speaker, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-24 h-24 rounded-full border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm mb-6">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-brand-blue mb-1">{speaker.name}</h4>
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">{speaker.role}</p>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">{speaker.affiliation}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[committeeMembers.chiefPatron, committeeMembers.chiefCoPatron, committeeMembers.patron].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className={`p-6 border flex items-start gap-4 group transition-colors ${
                  i === 2
                    ? 'bg-brand-orange/10 border-brand-orange/20 hover:bg-brand-orange hover:text-white'
                    : 'bg-brand-blue/5 border-brand-blue/20 hover:bg-brand-blue hover:text-white'
                }`}
              >
                <div className="relative w-16 h-16 rounded-full border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src="/Images/footer_image.webp"
                    alt={member.name}
                    fill
                    sizes="64px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
                <div className="relative w-16 h-16 rounded-full border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src="/Images/footer_image.webp"
                    alt={chair.name}
                    fill
                    sizes="64px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-brand-orange text-white p-6 border border-brand-orange flex items-center justify-center gap-4 hover:bg-brand-orange/90 transition-shadow group"
          >
            <div className="relative w-12 h-12 rounded-full border border-brand-blue/20 overflow-hidden shrink-0 bg-white shadow-sm">
              <Image
                src="/Images/footer_image.webp"
                alt="Program Chairs"
                fill
                sizes="48px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-brand-blue uppercase tracking-widest">Program Chairs</p>
              <h4 className="text-lg font-serif font-bold text-white">{committeeMembers.programChairs}</h4>
            </div>
          </motion.div>

          {/* Interactive Advisory Boards */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'international', label: 'International Advisory Board' },
                { id: 'national', label: 'National Advisory Board' },
                { id: 'internal', label: 'Internal Committees' }
              ].map((board, i) => {
                const isOpen = activeAdvisory === board.id;
                return (
                  <motion.button
                    key={board.id}
                    onClick={() => setActiveAdvisory(isOpen ? null : board.id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                    className={`p-6 text-center text-sm font-bold uppercase tracking-wider border-2 transition-all flex flex-col items-center justify-center gap-2 w-full ${
                      isOpen
                        ? 'border-brand-orange bg-brand-orange text-white shadow-md'
                        : board.id === 'national'
                          ? 'border-brand-orange/30 bg-brand-orange/5 text-brand-orange hover:bg-brand-orange/10'
                          : 'border-brand-blue/30 bg-brand-blue/5 text-brand-blue hover:bg-brand-blue/10'
                    }`}
                  >
                    <span>{board.label}</span>
                    <span className="text-[10px] lowercase font-normal opacity-70">
                      {isOpen ? 'click to collapse' : 'click to expand'}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Expanded List Panel */}
            {activeAdvisory && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-slate-200 bg-slate-50/50 p-8 md:p-10 shadow-inner text-left"
              >
                <h4 className="text-lg font-serif font-bold text-brand-blue mb-6 uppercase tracking-wider border-b border-slate-200 pb-3">
                  {activeAdvisory === 'international' && 'International Advisory Board'}
                  {activeAdvisory === 'national' && 'National Advisory Board'}
                  {activeAdvisory === 'internal' && 'Internal Conference Committees'}
                </h4>

                {activeAdvisory === 'international' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advisoryBoard.international.map((member, idx) => (
                      <div key={idx} className="bg-white p-5 border border-slate-100 hover:border-brand-orange/30 transition-colors shadow-sm">
                        <h5 className="font-bold text-brand-blue text-sm mb-1">{member.name}</h5>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">{member.title}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeAdvisory === 'national' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advisoryBoard.national.map((member, idx) => (
                      <div key={idx} className="bg-white p-5 border border-slate-100 hover:border-brand-orange/30 transition-colors shadow-sm">
                        <h5 className="font-bold text-brand-blue text-sm mb-1">{member.name}</h5>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">{member.title}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeAdvisory === 'internal' && (
                  <div className="space-y-6 max-w-3xl">
                    <div className="bg-white p-6 border border-slate-100 shadow-sm space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">Conference Chair</span>
                        <span className="font-serif font-bold text-brand-blue text-base">Prof. Tapas Kumar</span>
                        <span className="text-slate-500 text-xs block font-medium">Dean IET, JKLU</span>
                      </div>
                      <hr className="border-slate-100" />
                      <div>
                        <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">Conference Convener</span>
                        <span className="font-serif font-bold text-brand-blue text-base">Prof. Sonali Vyas</span>
                        <span className="text-slate-500 text-xs block font-medium">Head – Centre for Global Learning, JKLU</span>
                      </div>
                      <hr className="border-slate-100" />
                      <div>
                        <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">Program Chairs</span>
                        <span className="font-serif font-bold text-brand-blue text-base">Prof. Amit / Prof. Taruna / Prof. Umesh, and Prof. Devika</span>
                        <span className="text-slate-500 text-xs block font-medium">Professors of Institute of Engineering & Technology (IET), JKLU</span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium italic">
                      Note: The Internal Organizing Committees comprise faculty members, research teams, and administrative support staff from the Institute of Engineering & Technology (IET) and Centre for Global Learning (CGLP) at JK Lakshmipat University.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

        </div>
      </Section>

      {/* REGISTRATION & VENUE */}
      <Section id="registration" title="Registration & Venue">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Registration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-serif font-bold text-brand-blue mb-6">Registration Fees</h3>
            <div className="overflow-hidden border border-brand-blue/20 bg-brand-blue/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-blue text-white">
                    <th className="p-4 font-semibold text-sm border-b border-brand-blue/50">Category</th>
                    <th className="p-4 font-semibold text-sm border-b border-brand-blue/50">National</th>
                    <th className="p-4 font-semibold text-sm border-b border-brand-blue/50">International</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-blue/10">
                  {registrationFees.map((fee, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
                      className="hover:bg-brand-blue/10 transition-colors"
                    >
                      <td className="p-4 text-sm font-bold text-brand-blue">{fee.category}</td>
                      <td className="p-4 text-sm text-brand-orange font-bold">{fee.national}</td>
                      <td className="p-4 text-sm text-brand-orange font-bold">{fee.international}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-brand-orange text-xs text-white border-t border-brand-orange/20 font-semibold">
                * Registration fees are tentative and subject to final confirmation.
              </div>
            </div>
          </motion.div>

          {/* Venue & Contact */}
          <div className="space-y-6 flex flex-col justify-between" id="venue">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-brand-orange p-8 border border-brand-orange text-white"
            >
              <h3 className="text-xl font-serif font-bold text-white mb-1">JK Lakshmipat University</h3>
              <p className="text-brand-blue text-sm font-black uppercase tracking-wider mb-6">Jaipur, India</p>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Located in the vibrant city of Jaipur, JKLU offers a modern academic environment with state-of-the-art infrastructure, research facilities, innovation labs, and collaborative learning spaces.
              </p>
            </motion.div>

            {/* Campus Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="relative h-44 border border-slate-200 shadow-sm rounded-lg overflow-hidden group"
            >
              <Image
                src="/Images/footer_image.webp"
                alt="JKLU Campus"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent flex items-end p-4">
                <span className="text-white font-sans font-bold text-xs tracking-wider uppercase">JKLU Campus, Jaipur</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              id="contact"
              className="bg-brand-blue p-8 text-white"
            >
              <h3 className="text-xl font-serif font-bold mb-6">Contact Information</h3>
              <div className="space-y-3 text-slate-300 text-sm font-medium">
                <p><strong className="text-white">SANKALP 2027 Conference</strong></p>
                <p>JK Lakshmipat University, Jaipur, India</p>
                <p><strong>Email:</strong> sankalp@jklu.edu.in</p>
                <p><strong>Website:</strong> sankalp.jklu.edu.in</p>
              </div>
            </motion.div>
          </div>

        </div>
      </Section>

      <Footer />
    </main>
  );
}
