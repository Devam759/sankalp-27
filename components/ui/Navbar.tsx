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
    { name: 'Committee', href: '/#committee' },
    { name: 'Venue', href: '/venue' },
    { name: 'Contact', href: '/#contact' },
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
          ? 'bg-brand-blue shadow-lg py-3' 
          : 'bg-brand-blue/95 backdrop-blur-md py-5 border-b border-brand-orange/20'
      }`}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange"></div>

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 flex justify-between items-center h-12">
        
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

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className="relative group text-white text-sm font-semibold tracking-wide hover:text-brand-orange transition-colors"
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

        {/* Right: CTA Button */}
        <div className="hidden lg:flex shrink-0">
          <Link 
            href="/submission" 
            className="bg-brand-orange text-white px-6 py-2.5 rounded-sm font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm"
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

      {/* Mobile Slide Menu */}
      <div 
        className={`fixed inset-0 bg-brand-blue z-40 transition-transform duration-300 ease-in-out lg:hidden pt-24 px-6 flex flex-col ${
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
          <Link 
            href="/submission" 
            className="bg-brand-orange text-white px-6 py-3 rounded-sm font-bold text-center mt-4 shadow-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Submit Paper
          </Link>
        </div>
      </div>
    </nav>
  );
}
