'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AtomIcon } from '@/components/ui/Icons';

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
          className="max-w-[1440px] w-full mx-auto px-6 md:px-12 flex lg:grid lg:grid-cols-[auto_1fr_auto] items-center justify-between gap-4"
          style={{ height: '72px' }}
        >
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-10 border border-white/30 rounded flex items-center justify-center shrink-0 bg-white/10 text-brand-orange" aria-label="SANKALP 2027 Emblem">
              <AtomIcon size={22} />
            </div>
            <div className="w-px h-7 bg-white/25 hidden sm:block" />
            <Image
              src="/logos/white_jklu_logo.png"
              alt="JKLU Logo"
              width={200}
              height={60}
              priority
              loading="eager"
              className="h-12 md:h-[50px] w-auto object-contain hidden sm:block"
            />
          </Link>

          {/* Centre: Navigation Links (desktop) */}
          <div className="hidden lg:flex items-center justify-center w-full gap-5 xl:gap-7 text-center">
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

          {/* Right: CTA buttons + Mobile toggle */}
          <div className="flex items-center gap-3 relative z-30 pointer-events-auto">
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/registration"
                className="h-9 px-5 border border-white/70 text-white rounded-sm font-bold text-sm flex items-center justify-center hover:bg-white hover:text-brand-blue transition-colors cursor-pointer relative z-30 pointer-events-auto"
              >
                Register
              </Link>
              <Link
                href="/submit-paper"
                className="h-9 px-5 bg-brand-orange text-white rounded-sm font-bold text-sm flex items-center justify-center hover:bg-orange-500 transition-colors shadow-sm cursor-pointer relative z-30 pointer-events-auto"
              >
                Submit Paper
              </Link>
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
                <Link
                  href="/submit-paper"
                  className="bg-brand-orange text-white px-6 py-3 rounded-sm font-bold text-center hover:bg-orange-500 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Submit Paper
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
