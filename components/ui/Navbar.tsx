'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AtomIcon } from '@/components/ui/Icons';
import { PAPER_SUBMISSION_LINK } from '@/constants/conferenceData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Call for Papers', href: '/call-for-papers' },
    { name: 'Sessions', href: '/sessions' },
    { name: 'Committee', href: '/committee' },
    { name: 'Venue', href: '/venue' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // set initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On homepage: transparent at top, solid when scrolled
  // On other pages: always solid
  const solidBg = scrolled || !isHomepage;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ backgroundColor: solidBg ? '#184176' : 'transparent' }}
        className="fixed top-0 left-0 right-0 w-full z-[200] transition-colors duration-300"
      >
        <div
          className="max-w-[1440px] w-full mx-auto px-6 md:px-10 flex items-center justify-between gap-6"
          style={{ height: '72px' }}
        >
          {/* Left: SANKALP Emblem + Desktop Nav Links (Aside Logo) */}
          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            <Link href="/" className="flex items-center shrink-0" aria-label="SANKALP 2027 Home">
              <div className="h-9 w-9 sm:h-10 sm:w-10 border border-white/30 rounded flex items-center justify-center shrink-0 bg-white/10 text-brand-orange hover:bg-white/20 transition-colors">
                <AtomIcon size={20} />
              </div>
            </Link>

            {/* Mobile JKLU Logo */}
            <a
              href="https://jklu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer transition-opacity hover:opacity-90 active:scale-95 lg:hidden"
              aria-label="JK Lakshmipat University Website"
            >
              <Image
                src="/logos/white_jklu_logo.webp"
                alt="JKLU Logo"
                width={220}
                height={66}
                priority
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation Links — Positioned Aside SANKALP Logo */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative group py-2 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-brand-orange'
                        : 'text-white hover:text-brand-orange'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-brand-orange transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: CTA buttons + Desktop JKLU Logo + Mobile toggle */}
          <div className="flex items-center gap-3 relative z-30 pointer-events-auto">
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/registration"
                className="h-9 px-4 border border-white/70 text-white rounded-sm font-bold text-xs uppercase tracking-wider flex items-center justify-center hover:bg-white hover:text-brand-blue transition-colors cursor-pointer relative z-30 pointer-events-auto whitespace-nowrap"
              >
                Register
              </Link>
              <a
                href={PAPER_SUBMISSION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-4 bg-brand-orange text-white rounded-sm font-bold text-xs uppercase tracking-wider flex items-center justify-center hover:bg-orange-500 transition-colors shadow-sm cursor-pointer relative z-30 pointer-events-auto whitespace-nowrap"
              >
                Submit Paper
              </a>

              {/* Desktop Right JKLU Logo */}
              <a
                href="https://jklu.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer transition-opacity hover:opacity-90 active:scale-95 ml-1"
                aria-label="JK Lakshmipat University Website"
              >
                <Image
                  src="/logos/white_jklu_logo.webp"
                  alt="JKLU Logo"
                  width={240}
                  height={72}
                  priority
                  className="h-12 md:h-[52px] lg:h-[56px] w-auto object-contain"
                />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 transition-colors rounded"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                {mobileOpen ? (
                  <>
                    <line x1="4" y1="4" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                    <line x1="18" y1="4" x2="4" y2="18" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="5" x2="19" y2="5" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                    <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                    <line x1="3" y1="17" x2="19" y2="17" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom border when scrolled */}
        {solidBg && <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />}
      </motion.nav>

      {/* Mobile fullscreen menu — rendered outside <nav> to avoid z-index conflicts */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[199] bg-[#184176] flex flex-col pt-24 px-6 overflow-y-auto lg:hidden"
          >
            {/* Subtle decorative top line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="absolute top-[72px] left-0 right-0 h-px bg-white/10 origin-left"
            />

            <nav className="flex flex-col gap-0 text-base">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1], delay: 0.08 + i * 0.055 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between border-b py-4 font-semibold tracking-wide transition-colors ${
                        isActive
                          ? 'text-brand-orange border-brand-orange/30'
                          : 'text-white border-white/10 hover:text-brand-orange'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.name}
                      <span className={`text-xs ${isActive ? 'text-brand-orange' : 'text-white/20'}`}>›</span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="flex flex-col gap-3 pt-4 pb-8">
                <Link
                  href="/registration"
                  className="border border-white/30 text-white px-6 py-3 rounded-sm font-bold text-center hover:bg-white hover:text-brand-blue transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
                <a
                  href={PAPER_SUBMISSION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-orange text-white px-6 py-3 rounded-sm font-bold text-center hover:bg-orange-500 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Submit Paper
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
