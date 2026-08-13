'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import WordReveal from '@/components/ui/WordReveal';
import { gsap, ScrollTrigger, usePrefersReducedMotion } from '@/lib/animations/gsap';
import ConferenceHighlights from '@/components/sections/ConferenceHighlights';
import {
  conferenceDates,
  conferenceTracks,
  committeeMembers,
  speakers,
  advisoryBoard,
  keyFeatures,
  PAPER_SUBMISSION_LINK
} from '@/constants/conferenceData';
import {
  AtomIcon,
  UsersGroupIcon,
  PresentationIcon,
  RocketIcon,
  CpuIcon,
  BadgeIcon,
} from '@/components/ui/Icons';

// Editorial copy for each conference highlight, keyed by keyFeatures order.
const featureDescriptions = [
  'World-renowned researchers and practitioners delivering visionary talks on AI, sustainability, and emerging technologies.',
  'Deep-dive panel sessions bridging academia and industry on the most pressing technology challenges.',
  'Present your original research to a global audience of peers, reviewers, and industry professionals.',
  'Pitch your startup ideas, demos and innovations to investors, mentors and a global innovation community.',
  'Build lasting academic and industry connections through curated networking sessions and collaboration opportunities.',
  'Outstanding research recognized with awards across all tracks, celebrating excellence and impact.',
];

// Maps the icon name on each keyFeatures entry to a shared icon component.
const FEATURE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe: AtomIcon,
  Users: UsersGroupIcon,
  FileText: PresentationIcon,
  Lightbulb: RocketIcon,
  Network: CpuIcon,
  Award: BadgeIcon,
};

// Splits "[ATAL INCUBATION]"-style bracket annotations off a feature title.
function splitFeatureTag(title: string): { label: string; tag: string | null } {
  const match = title.match(/^(.*?)\s*\[(.*?)\]$/);
  return match ? { label: match[1].trim(), tag: match[2].trim() } : { label: title, tag: null };
}

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

function getTimeLeft() {
  const targetDate = new Date("March 5, 2027 09:00:00").getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    isExpired: false
  };
}

export default function HomeClient() {
  const [activeAdvisory, setActiveAdvisory] = React.useState<string | null>(null);

  const jaipurAttractions = [
    { name: 'Hawa Mahal', src: '/Images/jaipur_sightseeing/hawa_mahal.webp' },
    { name: 'Amer Fort', src: '/Images/jaipur_sightseeing/amer_fort.webp' },
    { name: 'Jal Mahal', src: '/Images/jaipur_sightseeing/jal_mahal.webp' },
    { name: 'City Palace', src: '/Images/jaipur_sightseeing/city_palace.webp' },
    { name: 'Albert Hall Museum', src: '/Images/jaipur_sightseeing/albert_hall.webp' },
    { name: 'Nahargarh Fort', src: '/Images/jaipur_sightseeing/nahargarh_fort.webp' }
  ];

  const heroImages = [
    '/Images/hero/DJI_0063.webp',
    '/Images/hero/DJI_0075.webp',
    '/Images/hero/DJI_0078.webp',
    '/Images/hero/DJI_0119.webp',
    '/Images/hero/DJI_0124.webp'
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = React.useState(0);

  // ─── GSAP scroll-story state ───────────────────────────────────────────
  const reduced = usePrefersReducedMotion();

  const heroSectionRef = React.useRef<HTMLElement>(null);
  const heroBgRef = React.useRef<HTMLDivElement>(null);
  const heroContentRef = React.useRef<HTMLDivElement>(null);
  const heroTitleRef = React.useRef<HTMLHeadingElement>(null);
  const venueImageRef = React.useRef<HTMLDivElement>(null);
  const highlightsRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // Recalculate ScrollTrigger positions after layout settles (lazy images, fonts).
  React.useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  // Hero title: masked word-by-word rise (GSAP).
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const words = heroTitleRef.current?.querySelectorAll('.hero-word');
      if (!words || words.length === 0) return;
      if (reduced) {
        gsap.set(words, { yPercent: 0 });
        return;
      }
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.35,
      });
    }, heroTitleRef);
    return () => ctx.revert();
  }, [reduced]);

  // Hero background parallax + content fade as the user scrolls away.
  React.useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(heroBgRef.current, {
        yPercent: 12,
        scale: 1.03,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });
      gsap.to(heroContentRef.current, {
        opacity: 0,
        yPercent: -16,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '70% top',
          scrub: 0.5,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });
    }, heroSectionRef);
    return () => ctx.revert();
  }, [reduced]);

  // Venue campus image: Ken Burns parallax scrubbed to scroll.
  React.useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const img = venueImageRef.current?.querySelector('img');
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.0,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: venueImageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    }, venueImageRef);
    return () => ctx.revert();
  }, [reduced]);



  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const [timeLeft, setTimeLeft] = React.useState(getTimeLeft);

  React.useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeLeft());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };


  return (
    <>
      <Navbar />
      <main
        className="w-full min-h-screen text-brand-ink font-sans selection:bg-brand-orange selection:text-white overflow-x-hidden"
      >

      {/* HERO */}
      <section
        id="home"
        ref={heroSectionRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <div ref={heroBgRef} className="absolute inset-0 z-0 bg-brand-blue will-change-transform transform-gpu">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroImages[currentHeroIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentHeroIndex]}
                alt="JK Lakshmipat University Campus"
                fill
                priority={currentHeroIndex === 0}
                loading={currentHeroIndex === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
                quality={75}
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/55 via-brand-blue/45 to-brand-blue/75 z-10 pointer-events-none" />
        </div>

        {/* Ambient Glowing Radial Overlays for Hero Visual Depth */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-70 transition-opacity duration-1000"
          style={{ 
            background: 'radial-gradient(circle, rgba(245,130,30,0.2) 0%, rgba(245,130,30,0.05) 45%, transparent 70%)',
            willChange: 'opacity'
          }} 
        />
        <div 
          className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full pointer-events-none z-10 opacity-60"
          style={{ 
            background: 'radial-gradient(circle, rgba(24,65,118,0.4) 0%, transparent 70%)'
          }} 
        />

        <div ref={heroContentRef} className="relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full pt-20 sm:pt-24 pb-12 sm:pb-16"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-4 w-full">
            <div className="flex items-center justify-center gap-5 sm:gap-8 md:gap-10 mb-2 w-full">
              <Image
                src="/logos/white_jklu_logo.webp"
                alt="JK Lakshmipat University"
                width={400}
                height={120}
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-md"
                priority
              />
              {/* Translucent-Whitish Vertical Separating Line between Logos */}
              <div className="h-7 sm:h-9 md:h-10 lg:h-12 w-px bg-white/40 shrink-0" />
              <Image
                src="/logos/Asia_University_Logo.webp"
                alt="Asia University"
                width={400}
                height={120}
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-md"
                priority
              />
            </div>
            <span className="text-white/80 text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
              Presents
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-3">
            <h1
              ref={heroTitleRef}
              className="text-[clamp(2.5rem,6.5vw,5rem)] font-sans font-extrabold sm:font-black tracking-[-0.02em] text-white leading-none uppercase drop-shadow-sm"
            >
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block">JKLU&nbsp;</span>
              </span>
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block">SANKALP&nbsp;</span>
              </span>
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block text-white">2027</span>
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-white/85 text-xs md:text-sm font-semibold tracking-[0.14em] uppercase max-w-2xl leading-loose">
              <span className="text-brand-orange font-bold">S</span>ustainable <span className="text-brand-orange font-bold">A</span>I · <span className="text-brand-orange font-bold">N</span>ext Gen <span className="text-brand-orange font-bold">K</span>nowledge<br className="hidden md:block" />
              <span className="text-brand-orange font-bold">A</span>utomation · <span className="text-brand-orange font-bold">L</span>earning and <span className="text-brand-orange font-bold">P</span>rediction
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {[
                { value: timeLeft.isExpired ? "00" : String(timeLeft.days).padStart(2, '0'), label: "Days" },
                { value: timeLeft.isExpired ? "00" : String(timeLeft.hours).padStart(2, '0'), label: "Hours" },
                { value: timeLeft.isExpired ? "00" : String(timeLeft.minutes).padStart(2, '0'), label: "Mins" },
                { value: timeLeft.isExpired ? "00" : String(timeLeft.seconds).padStart(2, '0'), label: "Secs" },
              ].map((unit, i, arr) => (
                <React.Fragment key={unit.label}>
                  <div className="flex flex-col items-center justify-center w-[56px] sm:w-[68px] py-2.5 sm:py-3 rounded-sm bg-slate-900/40 border border-slate-300/20 backdrop-blur-md shadow-md">
                    <span className="text-slate-100 font-extrabold font-sans leading-none tracking-tight tabular-nums text-xl sm:text-2xl" suppressHydrationWarning>{unit.value}</span>
                    <span className="text-slate-300/80 text-[8px] sm:text-[9px] font-bold tracking-[0.14em] uppercase mt-1">{unit.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-slate-400/40 text-base sm:text-lg font-black leading-none -mt-3 select-none animate-pulse">:</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sessions"
              className="relative group overflow-hidden bg-brand-orange hover:bg-orange-500 text-white px-8 py-3.5 rounded-sm font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 tracking-wide flex items-center justify-center cursor-pointer border border-orange-400/40 btn-shimmer"
            >
              Explore Sessions &amp; Tracks
            </Link>
            <Link
              href="/registration"
              className="relative group overflow-hidden bg-brand-blue/85 hover:bg-brand-blue border border-sky-300/40 hover:border-sky-300/80 text-white px-8 py-3.5 rounded-sm font-bold text-sm transition-all duration-300 shadow-md hover:shadow-brand-blue/50 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 tracking-wide flex items-center justify-center backdrop-blur-md"
            >
              Register Now
            </Link>
          </motion.div>
        </motion.div>
        </div>
      </section>



      {/* THREE COLUMN INFO SECTION */}
      {/* THREE COLUMN INFO SECTION */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-slate-200">
          
          {/* Card 1: About */}
          <div className="bg-brand-blue p-8 sm:p-10 text-white flex flex-col justify-start relative overflow-hidden group">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="flex flex-col h-full justify-start"
            >
              <motion.div variants={itemVariants} className="mb-6 -mt-2 flex items-center justify-between gap-4 w-full">
                <Image
                  src="/logos/Sankalp logo.webp"
                  alt="SANKALP 2027 Logo"
                  width={400}
                  height={160}
                  priority
                  className="h-28 sm:h-32 w-auto max-w-[220px] object-contain drop-shadow-lg shrink-0"
                />
                <h2 className="text-right font-serif font-bold text-2xl text-white leading-tight">
                  <span className="block">JKLU</span>
                  <span className="block">SANKALP</span>
                  <span className="block">2027</span>
                </h2>
              </motion.div>
              <motion.p variants={itemVariants} className="text-slate-300 text-sm leading-relaxed mb-4">
                A premier JKLU International Conference uniting researchers, academics, industry leaders and students across six frontier domains: Sustainable AI, Next-Gen Knowledge, Automation, Learning, Prediction and emerging technologies.
              </motion.p>
              <motion.p variants={itemVariants} className="text-slate-300 text-sm leading-relaxed">
                Driving the resolve, the <em>sankalp</em>, to shape a future of intelligent, ethical, and impactful innovation.
              </motion.p>
            </motion.div>
          </div>

          {/* Card 2: Latest Updates */}
          <div className="bg-brand-orange p-10 flex flex-col border-r border-b lg:border-b-0 border-brand-orange/80 group">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06 }
                }
              }}
              className="flex flex-col h-full justify-start"
            >
              <motion.h3 variants={itemVariants} className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-blue"></span>
                Latest Updates
              </motion.h3>
              <ul className="space-y-5 flex-grow">
                {[
                  'Call for Papers opens on 15 August 2026',
                  'Scopus-Indexed Proceedings Publication',
                  'Full paper submission deadline: 30 November 2026',
                  'Conference mode: Hybrid',
                  'Registration details announced'
                ].map((info, i) => (
                  <motion.li
                    key={`info-${i}-${info.slice(0, 12)}`}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-sm bg-brand-blue shrink-0" />
                    <span className="text-white text-sm leading-relaxed font-semibold">{info}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Card 3: Key Dates */}
          <div id="important-dates" className="bg-brand-blue/95 p-10 flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06 }
                }
              }}
              className="flex flex-col h-full justify-start"
            >
              <motion.h3 variants={itemVariants} className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-orange"></span>
                Key Dates
              </motion.h3>
              <div className="relative ml-2 space-y-6 flex-grow">
                {conferenceDates.map((dateItem, i) => {
                  const isLast = i === conferenceDates.length - 1;
                  return (
                    <motion.div
                      key={`key-date-${dateItem.label}-${i}`}
                      variants={itemVariants}
                      className="relative pl-6"
                    >
                      {/* Node Dot */}
                      <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-brand-orange rounded-none z-10" />

                      {/* Connecting Line Segment to Next Node (all items except last) */}
                      {!isLast && (
                        <div className="absolute left-0 top-1 h-[calc(100%+24px)] w-px bg-brand-orange/40 pointer-events-none" />
                      )}

                      <span className="block text-xs font-bold text-brand-orange/90 uppercase tracking-wider mb-1">{dateItem.label}</span>
                      <span className="block text-white font-semibold text-sm">{dateItem.date}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </Section>





      {/* HIGHLIGHTS */}
      <ConferenceHighlights />

      {/* SPEAKERS */}
      <Section id="speakers">
        <div className="max-w-[1200px] mx-auto space-y-16">
          <div className="flex flex-col items-center">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                <WordReveal text="Plenary Speaker" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
              </h2>
            </div>
            {[...speakers.plenary].sort((a, b) => {
              const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
              const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
              return nameA.localeCompare(nameB);
            }).map((speaker, i) => (
              <motion.div
                key={`plenary-${speaker.name}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="max-w-2xl bg-white border border-slate-200 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm text-center md:text-left w-full relative"
              >

                {speaker.linkedin && (
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 group/tooltip z-10">
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

                <div className="relative w-36 h-36 rounded-full border border-slate-200 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="144px"
                    priority
                    loading="eager"
                    className="object-cover object-top transition-transform duration-500"
                  />
                </div>
                <div className="flex-grow w-full">
                  <h3 className="text-2xl font-serif font-bold text-brand-blue mb-1.5">{speaker.name}</h3>
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">{speaker.role}</p>
                  <p className="text-slate-600 text-sm font-semibold leading-relaxed">{speaker.university}</p>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mt-1">{speaker.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full h-px bg-slate-200"></div>

          <div>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                <WordReveal text="Keynote Speakers" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
              </h2>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[...speakers.keynote].sort((a, b) => {
                const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                return nameA.localeCompare(nameB);
              }).map((speaker, i) => (
                <motion.div
                  key={`keynote-${speaker.name}`}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  style={{ willChange: 'transform, opacity' }}
                  className="bg-white border border-slate-200 p-6 pt-8 flex flex-col items-center text-center shadow-sm relative h-full justify-start"
                >

                  {speaker.linkedin && (
                    <div className="absolute top-4 right-4 sm:top-5 sm:right-5 group/tooltip z-10">
                      <a 
                        href={speaker.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-[#0a66c2] shadow-xs transition-all duration-300 hover:bg-[#0a66c2] hover:text-white hover:-translate-y-0.5 hover:shadow-sm cursor-pointer"
                        aria-label={`View ${speaker.name}'s LinkedIn Profile`}
                      >
                        <LinkedInIcon size={14} />
                      </a>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-95 opacity-0 pointer-events-none group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 bg-[#0b0f19] text-white text-[10px] font-sans font-bold tracking-wider uppercase py-1 px-2.5 rounded-sm shadow-md z-30 whitespace-nowrap">
                        LinkedIn
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0b0f19]" />
                      </div>
                    </div>
                  )}

                  <div className="relative w-28 h-28 rounded-full border border-slate-200 overflow-hidden shrink-0 bg-slate-50 shadow-sm mb-5">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="112px"
                      loading="lazy"
                      className="object-cover object-top transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-grow items-center">
                    <h3 className="text-xl font-serif font-bold text-brand-blue mb-1">{speaker.name}</h3>
                    <p className="text-brand-orange text-[10px] font-bold uppercase tracking-wider mb-3">{speaker.role}</p>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed mt-auto">{speaker.university}</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed mt-0.5">{speaker.location}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* COMMITTEE */}
      <Section id="committee" title="Conference Committee">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[committeeMembers.chiefPatron, ...committeeMembers.chiefCoPatrons, committeeMembers.patron].map((member, i) => (
              <motion.div
                key={`patron-${member.name}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ willChange: 'transform, opacity' }}
                className="p-6 border flex items-start gap-4 relative group bg-brand-blue/5 border-brand-blue/20"
              >
                {'linkedin' in member && (member as any).linkedin && (
                  <a
                    href={(member as any).linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${member.name} LinkedIn Profile`}
                    aria-label={`${member.name} LinkedIn Profile`}
                    className="absolute top-4 right-4 text-[#0a66c2] hover:text-[#004182] transition-colors p-1"
                  >
                    <LinkedInIcon size={16} />
                  </a>
                )}
                <div className="relative w-16 h-16 rounded-xl border border-brand-blue/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    title={`${member.name} - ${member.role}`}
                    fill
                    sizes="64px"
                    className="object-cover object-top transition-all duration-500"
                  />
                </div>
                <div className="pr-4">
                  <p className="text-[10px] font-bold text-brand-orange uppercase mb-1 tracking-widest">{member.role}</p>
                  <h3 className="text-base font-serif font-bold text-brand-blue">{member.name}</h3>
                  {'title' in member && <p className="text-brand-blue/70 text-xs font-medium mt-1">{(member as typeof committeeMembers.patron).title}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>


          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {committeeMembers.chairs.map((chair, i) => (
              <motion.div
                key={`chair-${chair.name}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ willChange: 'transform, opacity' }}
                className="bg-brand-blue text-white p-6 border border-brand-blue flex items-center gap-4 text-left relative group"
              >
                {chair.linkedin && (
                  <a
                    href={chair.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${chair.name} LinkedIn Profile`}
                    aria-label={`${chair.name} LinkedIn Profile`}
                    className="absolute top-4 right-4 text-brand-orange hover:text-white transition-colors p-1"
                  >
                    <LinkedInIcon size={16} />
                  </a>
                )}
                <div className="relative w-16 h-16 rounded-xl border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src={chair.image || "/Images/campus/jklu_campus.webp"}
                    alt={`${chair.name} - ${chair.role} SANKALP 2027 JKLU`}
                    title={`${chair.name} - ${chair.role} SANKALP 2027 JKLU`}
                    fill
                    sizes="64px"
                    className="object-cover object-top transition-all duration-500"
                  />
                </div>
                <div className="pr-4">
                  <p className="text-xs font-bold text-brand-orange uppercase mb-1 tracking-widest">{chair.role}</p>
                  <h3 className="text-lg font-serif font-bold text-white mb-1">{chair.name}</h3>
                  {chair.title && <p className="text-slate-300 text-xs font-medium">{chair.title}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {committeeMembers.programChairs.map((chair, i) => (
              <motion.div
                key={`prog-chair-${chair.name}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ willChange: 'transform, opacity' }}
                className="bg-brand-orange/10 border border-brand-orange/20 p-6 flex flex-col items-center text-center rounded-sm shadow-sm relative group"
              >
                {chair.linkedin && (
                  <a
                    href={chair.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${chair.name} LinkedIn Profile`}
                    aria-label={`${chair.name} LinkedIn Profile`}
                    className="absolute top-3 right-3 text-[#0a66c2] hover:text-[#004182] transition-colors p-1"
                  >
                    <LinkedInIcon size={15} />
                  </a>
                )}
                <div className="relative w-16 h-16 rounded-xl border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm mb-4">
                  <Image
                    src={chair.image}
                    alt={chair.alt || chair.name}
                    title={chair.alt || chair.name}
                    fill
                    sizes="64px"
                    unoptimized
                    className="object-cover object-top transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-orange uppercase mb-1 tracking-widest">Program Chair</p>
                  <h4 className="text-base font-serif font-bold text-brand-blue">{chair.name}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>


          <div className="mt-12 border-t border-brand-blue/10 pt-10 -mx-8 px-8 sm:mx-0 sm:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
              <div>
                <h3 className="font-serif font-bold text-3xl text-brand-blue mb-2">Advisory Boards</h3>
                <p className="text-slate-500 font-medium text-sm">A premium showcase of our global and national academic advisors.</p>
              </div>
            </div>

             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-60px" }}
               variants={{
                 hidden: {},
                 visible: {
                   transition: { staggerChildren: 0.1 }
                 }
               }}
               className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
             >
               {[
                { id: 'international', title: 'International Advisory Board', subtitle: 'Global research leaders' },
                { id: 'national', title: 'National Advisory Board', subtitle: 'Eminent professors across India' }
              ].map((board, i) => (
                <motion.div
                  key={`advisory-board-${board.id}`}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  style={{ willChange: 'transform, opacity' }}
                  onClick={() => setActiveAdvisory(activeAdvisory === board.id ? null : board.id)}
                  className={`w-full min-h-[190px] sm:min-h-[210px] relative group/card rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                    activeAdvisory === board.id 
                      ? 'border-brand-orange bg-[#181d28] shadow-lg' 
                      : 'border-slate-700/60 bg-[#141824] hover:border-slate-600 hover:bg-[#181d28] shadow-sm'
                  }`}
                >
                  {/* MATTE DARK SOLID SURFACE */}
                  <div className="absolute inset-0 bg-[#161b26] transition-colors duration-300" />
                  
                  {/* ALWAYS VISIBLE SUBTLE MATTE DOTTED PATTERN */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300 group-hover/card:opacity-30" 
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '20px 20px' }} 
                  />

                  <div className="relative z-10 p-7 sm:p-8 flex flex-col justify-between h-full min-h-[190px] sm:min-h-[210px]">
                    <div className="flex items-center justify-end">
                      <span className={`text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                        activeAdvisory === board.id ? 'text-brand-orange' : 'text-slate-400 group-hover/card:text-slate-200'
                      }`}>
                        {activeAdvisory === board.id ? 'Click to close ▲' : 'Click to view members →'}
                      </span>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-100 leading-tight mb-2 uppercase tracking-wide">
                        {board.title}
                      </h3>
                      <div className={`h-[2px] transition-all duration-300 mb-3 ${
                        activeAdvisory === board.id ? 'bg-brand-orange w-16' : 'bg-slate-600 w-10 group-hover/card:bg-brand-orange group-hover/card:w-16'
                      }`} />
                      <p className="text-slate-400 text-xs sm:text-sm font-medium tracking-wide uppercase">
                        {board.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
             </motion.div>
          </div>
        </div>
      </Section>

      {/* VENUE */}
      <Section id="venue" title="Conference Venue">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <motion.div
            ref={venueImageRef}
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="relative h-[340px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl group"
          >
            <Image
              src="/Images/hero/DJI_0063.webp"
              alt="JK Lakshmipat University Campus, Jaipur"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/85 via-[#0b1220]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/40 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 z-10">
              <h3 className="text-white font-serif font-bold text-2xl md:text-4xl leading-tight">
                JK Lakshmipat University
                <span className="block text-white/70 text-xl md:text-3xl font-normal mt-1">Jaipur, India</span>
              </h3>
            </div>
          </motion.div>


          {/* AUTOMATIC INFINITE SIGHTSEEING SLIDER */}
          <div className="pt-6 space-y-6 overflow-hidden">
            <div className="text-center sm:text-left">
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-brand-blue">
                Discover Jaipur &amp; Sightseeing
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                Iconic heritage landmarks and cultural attractions around the Pink City.
              </p>
            </div>

            <div className="relative w-full overflow-hidden py-2">
              <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 25,
                    ease: 'linear'
                  }
                }}
              >
                {[...jaipurAttractions, ...jaipurAttractions].map((att, i) => (
                  <div
                    key={`attraction-${att.name}-${i}`}
                    className="relative shrink-0 w-[240px] sm:w-[280px] md:w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-white"
                  >
                    <Image
                      src={att.src}
                      alt={att.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/90 via-[#0b1220]/25 to-transparent flex items-end p-5">
                      <h4 className="font-serif font-bold text-white text-lg sm:text-xl leading-snug drop-shadow-sm">
                        {att.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* INTERNAL NAVIGATION HUB — Boosts internal link count for SEO */}
      <Section>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-blue">
              Explore the Conference
            </h2>
            <div className="mx-auto mt-3 w-12 h-[2px] bg-brand-orange" />
            <p className="text-slate-500 text-sm font-medium mt-3">
              Everything you need to know about JKLU SANKALP 2027 — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { href: '/', label: 'Home', desc: 'Conference overview' },
              { href: '/about', label: 'About', desc: 'About SANKALP 2027' },
              { href: '/call-for-papers', label: 'Call for Papers', desc: 'Submit your research' },
              { href: '/sessions', label: 'Sessions & Tracks', desc: 'Conference program' },
              { href: '/registration', label: 'Registration', desc: 'Register now' },
              { href: '/committee', label: 'Committee', desc: 'Meet the team' },
              { href: '/venue', label: 'Venue', desc: 'JKLU Jaipur campus' },
              { href: '/sponsors', label: 'Sponsors', desc: 'Our supporters' },
              { href: '/faq', label: 'FAQ', desc: 'Common questions' },
              { href: '/contact', label: 'Contact', desc: 'Get in touch' },
              { href: '/tech-team', label: 'Tech Team', desc: 'Meet the developers' },
              { href: '/privacy-policy', label: 'Privacy Policy', desc: 'Data protection' },
              { href: '/terms-and-conditions', label: 'Terms & Conditions', desc: 'Event terms' },
              { href: '/refund-policy', label: 'Refund Policy', desc: 'Cancellation info' },
              { href: '/shipping-policy', label: 'Shipping Policy', desc: 'Certificate delivery' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col p-4 border border-slate-200 bg-white hover:border-brand-orange hover:bg-brand-orange/5 transition-all duration-200 rounded-sm text-left"
              >
                <span className="text-sm font-bold text-brand-blue group-hover:text-brand-orange transition-colors leading-snug">
                  {item.label}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1 leading-snug">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Footer />

    </main>

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
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#f7f4ef] w-full max-w-5xl max-h-[85vh] rounded shadow-2xl flex flex-col overflow-hidden relative"
          >
            <div className="bg-[#0b101e] p-6 md:p-8 flex justify-between items-center shrink-0 border-b border-brand-orange/20">
              <div>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-white uppercase tracking-wider">
                  {activeAdvisory === 'international' && 'International Advisory Board'}
                  {activeAdvisory === 'national' && 'National Advisory Board'}
                  {activeAdvisory === 'internal' && 'Organising Committee'}
                </h4>
                <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mt-2">JKLU SANKALP 2027</p>
              </div>
              <button onClick={() => setActiveAdvisory(null)} className="text-white/50 hover:text-brand-orange transition-colors p-2 bg-white/5 rounded-md font-bold text-xs tracking-wider uppercase">
                Close
              </button>
            </div>

            <div className="p-6 md:p-10 overflow-y-auto bg-[#f7f4ef]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...(activeAdvisory === 'international' ? advisoryBoard.international : advisoryBoard.national)]
                  .sort((a, b) => {
                    const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                    const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                    return nameA.localeCompare(nameB);
                  })
                  .map((member, idx) => (
                    <div key={idx} className="bg-white p-5 border border-slate-100 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-brand-blue text-sm mb-1">{member.name}</h5>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">{member.title}</p>
                      </div>
                      {('linkedin' in member) && (member as any).linkedin && (
                        <a
                          href={(member as any).linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`${member.name} LinkedIn Profile`}
                          aria-label={`${member.name} LinkedIn Profile`}
                          className="shrink-0 text-[#0a66c2] hover:text-[#004182] transition-colors p-1"
                        >
                          <LinkedInIcon size={15} />
                        </a>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
