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
  const [mobileHidden, setMobileHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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
    let lastScrollY = window.scrollY;
    const threshold = 10;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrolled = currentScrollY > 60;

          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          if (window.innerWidth < 768) {
            if (currentScrollY > lastScrollY + threshold && currentScrollY > 72) {
              setMobileHidden((prev) => (prev !== true ? true : prev));
            } else if (currentScrollY < lastScrollY - threshold) {
              setMobileHidden((prev) => (prev !== false ? false : prev));
            }
          } else {
            setMobileHidden((prev) => (prev !== false ? false : prev));
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileHidden(false);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open to prevent background page scrolling
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // On homepage: transparent at top, solid when scrolled
  // On other pages: always solid
  const solidBg = scrolled || !isHomepage;
  const showRightItems = scrolled || !isHomepage;

  // Keep visible if mobile menu is open
  const isMobileHidden = mobileHidden && !mobileOpen;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isMobileHidden ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ backgroundColor: solidBg ? '#184176' : 'transparent' }}
        className="fixed top-0 left-0 right-0 w-full z-[200] transition-colors duration-300"
      >
        <div
          className="max-w-[1440px] w-full mx-auto px-6 md:px-10 flex items-center justify-between gap-6"
          style={{ height: '72px' }}
        >
          {/* Left: SANKALP Emblem + Desktop Nav Links (Aside Logo) */}
          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            <Link href="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity" aria-label="JKLU SANKALP 2027 Home">
              <Image
                src="https://res.cloudinary.com/flufexsc/image/upload/v1787147490/sankalp/logos/sankalp_logo.webp"
                alt="SANKALP 2027 Logo"
                width={220}
                height={70}
                priority
                loading="eager"
                className="h-14 sm:h-16 max-h-[58px] w-auto object-contain py-1"
              />
            </Link>

            {/* Mobile JKLU & Asia University Logos */}
            <div
              className={`flex items-center gap-2.5 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                showRightItems
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
            >
              <a
                href="https://jklu.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer transition-opacity hover:opacity-90 active:scale-95"
                aria-label="JK Lakshmipat University Website"
              >
                <Image
                  src="https://res.cloudinary.com/flufexsc/image/upload/v1787147491/sankalp/logos/white_jklu_logo.webp"
                  alt="JKLU Logo"
                  width={160}
                  height={50}
                  priority
                  loading="eager"
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </a>
              <div className="h-6 w-px bg-white/30" />
              <a
                href="https://www.asia.edu.tw/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer transition-opacity hover:opacity-90 active:scale-95"
                aria-label="Asia University Website"
              >
                <Image
                  src="https://res.cloudinary.com/flufexsc/image/upload/v1787147485/sankalp/logos/Asia_University_Logo.webp"
                  alt="Asia University Logo"
                  width={50}
                  height={50}
                  priority
                  loading="eager"
                  className="h-8 sm:h-10 w-auto object-contain rounded-full"
                />
              </a>
            </div>

            {/* Desktop Navigation Links - Positioned Aside SANKALP Logo */}
            <div 
              className="hidden lg:flex items-center gap-4 xl:gap-5"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));
                const isHovered = hoveredLink === link.name;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    className={`relative py-2 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap z-10 ${
                      isActive
                        ? 'text-brand-orange'
                        : 'text-white hover:text-brand-orange'
                    }`}
                  >
                    {link.name}
                    {(isHovered || (isActive && hoveredLink === null)) && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-orange rounded-full"
                        style={{ originY: '0.5' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

          </div>

          {/* Right: CTA buttons + Desktop JKLU & Asia University Logos + Mobile toggle */}
          <div className="flex items-center gap-3 relative z-30 pointer-events-auto">
            <div className="hidden lg:flex items-center gap-3">
              <div
                className={`flex items-center gap-3.5 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  showRightItems
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
              >
                <Link
                  href="/registration"
                  className="h-9 px-4 border border-white/70 text-white rounded-sm font-bold text-xs uppercase tracking-wider flex items-center justify-center hover:bg-white hover:text-brand-blue hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer relative z-30 pointer-events-auto whitespace-nowrap"
                >
                  Register
                </Link>
                <a
                  href={PAPER_SUBMISSION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-4 bg-brand-orange text-white rounded-sm font-bold text-xs uppercase tracking-wider flex items-center justify-center hover:bg-orange-500 hover:scale-105 hover:shadow-md hover:shadow-orange-500/30 transition-all duration-300 shadow-sm cursor-pointer relative z-30 pointer-events-auto whitespace-nowrap"
                >
                  Submit Paper
                </a>

                {/* Desktop Right Logos: JKLU + Asia University */}
                <div className="flex items-center gap-3.5 ml-1 shrink-0">
                  <a
                    href="https://jklu.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center cursor-pointer transition-opacity hover:opacity-90 active:scale-95"
                    aria-label="JK Lakshmipat University Website"
                  >
                    <Image
                      src="https://res.cloudinary.com/flufexsc/image/upload/v1787147491/sankalp/logos/white_jklu_logo.webp"
                      alt="JKLU Logo"
                      width={180}
                      height={60}
                      priority
                      loading="eager"
                      className="h-11 md:h-[48px] lg:h-[52px] w-auto object-contain"
                    />
                  </a>
                  <div className="h-8 w-px bg-white/30" />
                  <a
                    href="https://www.asia.edu.tw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center cursor-pointer transition-opacity hover:opacity-90 active:scale-95"
                    aria-label="Asia University Website"
                  >
                    <Image
                      src="https://res.cloudinary.com/flufexsc/image/upload/v1787147485/sankalp/logos/Asia_University_Logo.webp"
                      alt="Asia University Logo"
                      width={60}
                      height={60}
                      priority
                      loading="eager"
                      className="h-10 md:h-[42px] lg:h-[46px] w-auto object-contain rounded-full"
                    />
                  </a>
                </div>
              </div>
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

      {/* Mobile fullscreen menu - rendered outside <nav> to avoid z-index conflicts */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.9 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.9 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[199] bg-[#184176] flex flex-col pt-24 px-6 overflow-y-auto overscroll-contain lg:hidden"
          >
            {/* Subtle decorative top line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.06 + i * 0.045 }}
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
