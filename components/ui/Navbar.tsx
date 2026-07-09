'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Call for Papers', href: '/call-for-papers' },
    { name: 'Submission', href: '/submission' },
    { name: 'Registration', href: '/registration' },
    { name: 'Committee', href: '/#committee' },
    { name: 'Venue', href: '/venue' },
    { name: 'Contact', href: '/#contact' },
  ];

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Mobile smart-navigation: hide on scroll down, show on scroll up
      if (window.innerWidth < 1024) {
        if (currentScrollY > 80) {
          const isScrollingUp = lastScrollY > currentScrollY;
          setVisible(isScrollingUp);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomepage = pathname === '/';
  const shouldHaveBg = isScrolled || !isHomepage;
  const isNavbarVisible = visible || mobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 transform ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top Orange Banner Strip: Call for Sponsors */}
      <div className="bg-brand-orange text-white py-2 px-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-2">
        <span>Call for Sponsors: Partner with SANKALP 2027</span>
        <a 
          href="mailto:sankalp@jklu.edu.in?subject=SANKALP 2027 Sponsorship Inquiry"
          className="underline hover:text-brand-blue transition-colors normal-case ml-1"
        >
          Inquire Now &rarr;
        </a>
      </div>

      {/* Main Navigation Container */}
      <div
        className={`transition-all duration-300 ${
          shouldHaveBg
            ? 'bg-brand-blue shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 flex lg:grid lg:grid-cols-3 justify-between items-center h-12">

          {/* Left: Logo */}
          <Link href="/" className="flex items-center shrink-0 z-50">
            <Image
              src="/logos/jklu_logo.svg"
              alt="JKLU Logo"
              width={140}
              height={45}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>

          {/* Centre: Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative group text-sm font-semibold tracking-wide transition-colors whitespace-nowrap text-white hover:text-brand-orange`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-brand-orange transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right: CTA Buttons */}
          <div className="hidden lg:flex shrink-0 justify-end items-center gap-4">
            <Link
              href="/registration"
              className="bg-transparent border border-white text-white px-5 py-2 rounded-sm font-bold text-sm hover:bg-white hover:text-brand-blue transition-colors shadow-sm"
            >
              Register
            </Link>
            <Link
              href="/submission"
              className="bg-brand-orange text-white px-5 py-2.5 rounded-sm font-bold text-sm hover:bg-orange-500 transition-colors shadow-sm"
            >
              Submit Paper
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 z-50 hover:text-brand-orange transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div 
        className={`fixed inset-0 bg-brand-blue z-40 transition-transform duration-300 ease-in-out lg:hidden pt-28 px-6 flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 text-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-white font-semibold border-b border-brand-orange/20 pb-4 hover:text-brand-orange transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <Link 
              href="/registration" 
              className="border border-white/30 text-white px-6 py-3 rounded-sm font-bold text-center shadow-md hover:bg-white hover:text-brand-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
            <Link 
              href="/submission" 
              className="bg-brand-orange text-white px-6 py-3 rounded-sm font-bold text-center shadow-lg hover:bg-orange-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Submit Paper
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
