'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Call for Papers', href: '/call-for-papers' },
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
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logos/white_jklu_logo.png"
              alt="JKLU Logo"
              width={180}
              height={56}
              priority
              className="h-12 w-auto object-contain"
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
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/registration"
                className="h-9 px-5 border border-white/70 text-white rounded-sm font-bold text-sm flex items-center justify-center hover:bg-white hover:text-brand-blue transition-colors"
              >
                Register
              </Link>
              <Link
                href="/call-for-papers"
                className="h-9 px-5 bg-brand-orange text-white rounded-sm font-bold text-sm flex items-center justify-center hover:bg-orange-500 transition-colors shadow-sm"
              >
                Submit Paper
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white border border-white/30 rounded px-3 py-1.5 text-xs font-bold tracking-wider hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>

        {/* Bottom border when scrolled */}
        {solidBg && <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />}
      </motion.nav>

      {/* Mobile fullscreen menu — rendered outside <nav> to avoid z-index conflicts */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[199] bg-[#184176] flex flex-col pt-24 px-6 overflow-y-auto lg:hidden">
          <nav className="flex flex-col gap-5 text-base">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`border-b pb-4 font-semibold transition-colors ${
                    isActive
                      ? 'text-brand-orange border-brand-orange/40'
                      : 'text-white border-white/10 hover:text-brand-orange'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
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
                href="/call-for-papers"
                className="bg-brand-orange text-white px-6 py-3 rounded-sm font-bold text-center hover:bg-orange-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Submit Paper
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
