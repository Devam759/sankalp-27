'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Important Dates', href: '#important-dates' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Committee', href: '#committee' },
    { name: 'Call for Papers', href: '#call-for-papers' },
    { name: 'Submission', href: '#submission' },
    { name: 'Publication', href: '#publication' },
    { name: 'Registration', href: '#registration' },
    { name: 'Venue', href: '#venue' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2 z-50 relative group">
          <Image 
            src="/logos/jklu_logo.svg" 
            alt="JKLU Logo" 
            width={120} 
            height={40} 
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="w-px h-8 bg-slate-300 mx-2 hidden sm:block"></div>
          <span className="font-extrabold text-brand-blue tracking-tight hidden sm:block">SANKALP '27</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-brand-orange transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-brand-blue z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 pb-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl font-semibold text-brand-blue border-b border-slate-100 pb-4 hover:text-brand-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
