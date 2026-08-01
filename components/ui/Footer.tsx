'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PAPER_SUBMISSION_LINK } from '@/constants/conferenceData';

// ============================================================================
// BESPOKE CUSTOM GEOMETRIC SVG ICONS (Gradient-free, Sharp, Clean)
// ============================================================================

const LocationIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const HeartIcon = ({ size = 12, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const EmailIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const FacebookIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const InstagramIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GoogleMapsIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const AppleMapsIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

import { AppleIcon } from '@/components/ui/Icons';

export default function Footer() {
  return (
    <footer className="relative bg-[#0b0f19] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 overflow-hidden select-none">
      
      {/* 3-Column Main Grid */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* COLUMN 1: SANKALP '27 ABOUT */}
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-serif font-bold text-xl uppercase tracking-wider">
              SANKALP '27
            </h4>
            <div className="w-12 h-0.5 bg-brand-orange mt-2 rounded-sm" />
          </div>
          
          <div className="space-y-3 text-sm font-sans text-slate-400 leading-relaxed font-medium">
            <p>
              International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction.
            </p>
            <p className="text-slate-400">
              Hosted by the Institute of Engineering & Technology (IET), JK Lakshmipat University, Jaipur.
            </p>
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-serif font-bold text-base uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="w-12 h-0.5 bg-brand-orange mt-2 rounded-sm" />
          </div>
          
          <ul className="grid grid-cols-2 gap-2 text-sm font-sans text-slate-400 font-medium">
            <li>
              <Link href="/" className="hover:text-brand-orange transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-orange transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/call-for-papers" className="hover:text-brand-orange transition-colors">
                Call for Papers
              </Link>
            </li>
            <li>
              <Link href="/sessions" className="hover:text-brand-orange transition-colors">
                Sessions
              </Link>
            </li>
            <li>
              <a href={PAPER_SUBMISSION_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors text-brand-orange font-semibold">
                Submit Paper
              </a>
            </li>
            <li>
              <Link href="/registration" className="hover:text-brand-orange transition-colors font-semibold">
                Registration
              </Link>
            </li>
            <li>
              <Link href="/committee" className="hover:text-brand-orange transition-colors">
                Committee
              </Link>
            </li>
            <li>
              <Link href="/sponsors" className="hover:text-brand-orange transition-colors">
                Sponsors
              </Link>
            </li>
            <li>
              <Link href="/venue" className="hover:text-brand-orange transition-colors">
                Venue
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-brand-orange transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-orange transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 3: CONTACT & LOCATION */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-white font-serif font-bold text-base uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="w-12 h-0.5 bg-brand-orange mt-2 rounded-sm" />
            <ul className="space-y-4 text-sm font-sans text-slate-400 leading-relaxed font-medium pt-2">
              <li className="flex items-start gap-3">
                <LocationIcon className="text-brand-orange shrink-0 mt-0.5" size={18} />
                <span>
                  JK Lakshmipat University, Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <EmailIcon className="text-brand-orange shrink-0" size={16} />
                <a href="mailto:sankalp@jklu.edu.in" className="hover:text-brand-orange transition-colors">
                  sankalp@jklu.edu.in
                </a>
              </li>
            </ul>

            {/* Navigation & Maps Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=JK+Lakshmipat+University,+Jaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#F8F9FA] text-[#3C4043] hover:text-[#1A73E8] border border-[#DADCE0] hover:border-[#BDC1C6] transition-all duration-200 rounded-lg px-3.5 py-2 text-xs font-semibold flex items-center gap-2.5 shadow-xs hover:shadow-md group"
              >
                <Image
                  src="/logos/gmaps logo.webp"
                  alt="Google Maps Logo"
                  width={16}
                  height={16}
                  className="w-4 h-4 shrink-0 object-contain"
                />
                <span>Google Maps</span>
              </a>

              <a 
                href="https://maps.apple.com/?q=JK+Lakshmipat+University+Jaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-[#1C1C1E] text-white border border-white/20 transition-all duration-200 rounded-lg px-3.5 py-2 text-xs font-semibold flex items-center gap-2.5 shadow-xs hover:shadow-md group"
              >
                <AppleIcon size={16} className="shrink-0 text-white" />
                <span>Apple Maps</span>
              </a>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-white font-serif font-bold text-xs uppercase tracking-widest text-slate-400">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/share/1Hsdb57Jcf/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/5 border border-white/10 text-slate-300 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-md transition-all rounded-md flex justify-center items-center cursor-pointer"
              >
                <FacebookIcon size={16} />
              </a>
              <a 
                href="https://x.com/jklujaipur" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 bg-white/5 border border-white/10 text-slate-300 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-md transition-all rounded-md flex justify-center items-center cursor-pointer"
              >
                <XIcon size={15} />
              </a>
              <a 
                href="https://www.instagram.com/jklu_jaipur/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/5 border border-white/10 text-slate-300 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-md transition-all rounded-md flex justify-center items-center cursor-pointer"
              >
                <InstagramIcon size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/school/jklujaipur/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-white/5 border border-white/10 text-slate-300 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-md transition-all rounded-md flex justify-center items-center cursor-pointer"
              >
                <LinkedInIcon size={16} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* THE MINDS BEHIND THE SITE BUTTON (Above Separating Line) */}
      <div className="max-w-7xl mx-auto relative z-10 flex justify-center items-center pb-6">
        <Link 
          href="/tech-team" 
          className="group flex items-center justify-center gap-2.5 px-6 py-3 rounded-sm bg-white/10 text-white hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer"
        >
          <span>THE MINDS BEHIND THE SITE</span>
          <span className="text-base sm:text-lg leading-none group-hover:scale-110 transition-transform">🧠</span>
        </Link>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-sans text-slate-400 border-t border-white/10 pt-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="font-medium text-xs sm:text-sm">
            © 2027 JKLU – SANKALP Conference | JK Lakshmipat University. All Rights Reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-3 gap-y-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <Link href="/privacy-policy" className="hover:text-brand-orange transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-brand-orange transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-brand-orange transition-colors">
              Refund Policy
            </Link>
            <span>•</span>
            <Link href="/shipping-policy" className="hover:text-brand-orange transition-colors">
              Shipping Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-brand-orange transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://jklu.edu.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cursor-pointer transition-transform hover:scale-[1.03] active:scale-95 flex"
          >
            <Image
              src="/logos/white_jklu_logo.webp"
              alt="JK Lakshmipat University Logo"
              width={240}
              height={72}
              className="h-14 md:h-[58px] w-auto object-contain"
              style={{ width: 'auto', height: '58px' }}
            />
          </a>
        </div>
      </div>

    </footer>
  );
}
