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
    { name: 'Hawa Mahal', src: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=600&q=80' },
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
        yPercent: 16,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to(heroContentRef.current, {
        opacity: 0,
        yPercent: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '70% top',
          scrub: true,
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
          scrollTrigger: {
            trigger: venueImageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
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
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
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
        <div ref={heroBgRef} className="absolute inset-0 z-0 bg-brand-blue">
          {heroImages.map((img, index) => {
            const isActive = index === currentHeroIndex;
            return (
              <motion.div
                key={img}
                initial={false}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1.03 : 1.0
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={img}
                  alt="JK Lakshmipat University Campus"
                  fill
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  quality={75}
                  className="object-cover object-center"
                />
              </motion.div>
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/55 via-brand-blue/45 to-brand-blue/75 z-10 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] z-10 pointer-events-none" />
        </div>

        {/* Ambient Glowing Blobs for Hero Visual Depth */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none z-10 animate-pulse duration-[7000ms]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-blue/30 rounded-full blur-[100px] pointer-events-none z-10" />

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
                className="h-14 sm:h-18 md:h-22 lg:h-24 w-auto object-contain drop-shadow-md"
                priority
              />
              {/* Translucent-Whitish Vertical Separating Line between Logos */}
              <div className="h-10 sm:h-14 md:h-18 lg:h-20 w-px bg-white/40 shrink-0" />
              <Image
                src="/logos/Asia_University_Logo.webp"
                alt="Asia University"
                width={400}
                height={120}
                className="h-14 sm:h-18 md:h-22 lg:h-24 w-auto object-contain drop-shadow-md"
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
              className="text-[clamp(3rem,8vw,6rem)] font-sans font-extrabold sm:font-black tracking-[-0.02em] text-white leading-none uppercase drop-shadow-sm"
            >
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block">JKLU&nbsp;</span>
              </span>
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block">SANKALP&nbsp;</span>
              </span>
              <span className="inline-block overflow-hidden align-bottom">
                <span className="hero-word inline-block text-brand-orange">2027</span>
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
                  <div className="flex flex-col items-center justify-center w-[56px] sm:w-[68px] py-2.5 sm:py-3 rounded-sm bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
                    <span className="text-brand-orange font-black font-sans leading-none tracking-tight tabular-nums text-xl sm:text-2xl" suppressHydrationWarning>{unit.value}</span>
                    <span className="text-white/80 text-[8px] sm:text-[9px] font-bold tracking-[0.14em] uppercase mt-1">{unit.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-white/40 text-base sm:text-lg font-black leading-none -mt-3 select-none animate-pulse">:</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sessions"
              className="bg-white/10 backdrop-blur-md border border-white/40 text-white px-8 py-3.5 rounded-sm font-bold text-sm hover:bg-white hover:text-brand-blue transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 tracking-wide flex items-center justify-center cursor-pointer"
            >
              Explore Sessions &amp; Tracks
            </Link>
            <Link
              href="/registration"
              className="bg-white/10 backdrop-blur-md border border-white/40 text-white px-8 py-3.5 rounded-sm font-bold text-sm hover:bg-white hover:text-brand-blue transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 tracking-wide flex items-center justify-center btn-shimmer"
            >
              Register Now
            </Link>
          </motion.div>
        </motion.div>
        </div>
      </section>



      {/* THREE COLUMN INFO SECTION */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-slate-200">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-brand-blue p-8 sm:p-10 text-white flex flex-col justify-start relative overflow-hidden group"
          >
            <div className="mb-6 -mt-2 flex items-center justify-between gap-4 w-full">
              <Image
                src="/logos/Sankalp logo.webp"
                alt="SANKALP 2027 Logo"
                width={400}
                height={160}
                className="h-28 sm:h-32 w-auto max-w-[220px] object-contain drop-shadow-lg shrink-0"
              />
              <h2 className="text-right font-serif font-bold text-2xl text-white leading-tight">
                <span className="block">JKLU</span>
                <span className="block">SANKALP</span>
                <span className="block">2027</span>
              </h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              A premier JKLU International Conference uniting researchers, academics, industry leaders and students across six frontier domains: Sustainable AI, Next-Gen Knowledge, Automation, Learning, Prediction and emerging technologies.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Driving the resolve, the <em>sankalp</em>, to shape a future of intelligent, ethical, and impactful innovation.
            </p>
          </motion.div>

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
                'Call for Papers opens on 15 August 2026',
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
                  <span className="mt-[5px] w-1.5 h-1.5 rounded-sm bg-brand-blue shrink-0" />
                  <span className="text-white text-sm leading-relaxed font-semibold">{info}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

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
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-2xl bg-white border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm text-center md:text-left w-full relative"
              >
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
                  <div className="relative pr-12">
                    <h3 className="text-2xl font-serif font-bold text-brand-blue mb-1.5">{speaker.name}</h3>
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

          <div>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                <WordReveal text="Keynote Speakers" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...speakers.keynote].sort((a, b) => {
                const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                return nameA.localeCompare(nameB);
              }).map((speaker, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 p-6 pt-8 flex flex-col items-center text-center shadow-sm relative h-full justify-start"
                >
                  <div className="relative w-24 h-24 rounded-full border border-slate-200 overflow-hidden shrink-0 bg-white shadow-sm mb-4">
                    <Image
                      src={speaker.image}
                      alt={`${speaker.name} - ${speaker.role} (${speaker.university}) SANKALP 2027 JKLU`}
                      title={`${speaker.name} - ${speaker.role} (${speaker.university}) SANKALP 2027 JKLU`}
                      fill
                      sizes="96px"
                      priority={i === 0}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="object-cover object-top transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full relative">
                    <h3 className="text-lg font-serif font-bold text-brand-blue mb-1.5">{speaker.name}</h3>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[committeeMembers.chiefPatron, ...committeeMembers.chiefCoPatrons, committeeMembers.patron].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className={`p-6 border flex items-start gap-4 ${
                  i === 3
                    ? 'bg-brand-orange/10 border-brand-orange/20'
                    : 'bg-brand-blue/5 border-brand-blue/20'
                }`}
              >
                <div className="relative w-16 h-16 rounded-xl border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src={('image' in member && (member as any).image) || '/Images/footer_image.webp'}
                    alt={`${member.name} - ${member.role} SANKALP 2027 JKLU`}
                    title={`${member.name} - ${member.role} SANKALP 2027 JKLU`}
                    fill
                    sizes="64px"
                    className="object-cover object-top transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-orange uppercase mb-1 tracking-widest">{member.role}</p>
                  <h3 className="text-base font-serif font-bold text-brand-blue">{member.name}</h3>
                  {'title' in member && <p className="text-brand-blue/70 text-xs font-medium mt-1">{(member as typeof committeeMembers.patron).title}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {committeeMembers.chairs.map((chair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="bg-brand-blue text-white p-6 border border-brand-blue flex items-center gap-4 text-left"
              >
                <div className="relative w-16 h-16 rounded-xl border-2 border-brand-orange/20 overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image
                    src={chair.image || "/Images/footer_image.webp"}
                    alt={`${chair.name} - ${chair.role} SANKALP 2027 JKLU`}
                    title={`${chair.name} - ${chair.role} SANKALP 2027 JKLU`}
                    fill
                    sizes="64px"
                    className="object-cover object-top transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-orange uppercase mb-1 tracking-widest">{chair.role}</p>
                  <h3 className="text-lg font-serif font-bold text-white mb-1">{chair.name}</h3>
                  {chair.title && <p className="text-slate-300 text-xs font-medium">{chair.title}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Prof. Amit Kumar Sinhal', alt: 'Prof. Amit Kumar Sinhal - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/amit_sinhal.webp' },
              { name: 'Prof. Devika Kataria', alt: 'Prof. Devika Kataria - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/devika_kataria.webp' },
              { name: 'Prof. S. Taruna', alt: 'Prof. S. Taruna - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/taruna_sunil.webp' },
              { name: 'Prof. Umesh Gupta', alt: 'Prof. Umesh Gupta - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/umesh_gupta.webp' },
            ].map((chair, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="bg-brand-orange/10 border border-brand-orange/20 p-6 flex flex-col items-center text-center rounded-sm shadow-sm"
              >
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
          </div>

          <div className="mt-12 border-t border-brand-blue/10 pt-10 -mx-8 px-8 sm:mx-0 sm:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
              <div>
                <h3 className="font-serif font-bold text-3xl text-brand-blue mb-2">Advisory Boards</h3>
                <p className="text-slate-500 font-medium text-sm">A premium showcase of our global and national academic advisors.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
               {[
                { id: 'international', title: 'International Advisory Board', subtitle: 'Global research leaders' },
                { id: 'national', title: 'National Advisory Board', subtitle: 'Eminent professors across India' }
              ].map((board, i) => (
                <motion.div
                  key={board.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
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
            </div>
          </div>
        </div>
      </Section>

      {/* VENUE */}
      <Section id="venue" title="Conference Venue">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <motion.div
            ref={venueImageRef}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
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
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-white font-serif font-bold text-2xl md:text-4xl leading-tight"
              >
                JK Lakshmipat University
                <span className="block text-white/70 text-xl md:text-3xl font-normal mt-1">Jaipur, India</span>
              </motion.h3>
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
                    key={i}
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
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
                    <div key={idx} className="bg-white p-5 border border-slate-100">
                      <h5 className="font-bold text-brand-blue text-sm mb-1">{member.name}</h5>
                      <p className="text-slate-500 text-xs leading-relaxed font-medium">{member.title}</p>
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
