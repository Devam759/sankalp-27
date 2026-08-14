'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import { EnvelopeIcon, CopyIcon } from '@/components/ui/Icons';

export default function ContactClient() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('sankalp@jklu.edu.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f4ef] text-[#184176] font-sans selection:bg-[#f5821e] selection:text-white">
      <Navbar />

      <div className="pt-32 pb-28 px-6 md:px-12 max-w-4xl mx-auto relative z-10 flex-grow space-y-12">
        <header className="text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block mb-6">
            <WordReveal text="Contact Us" className="text-brand-blue" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
          </h1>

        </header>

        <Reveal delay={0.1} className="bg-white border border-[#E6E8EC] p-8 sm:p-12 shadow-sm rounded-[18px] space-y-10">
          {/* Email Section */}
          <div className="space-y-4 text-center">
            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-widest block font-sans">
              Official Conference Email
            </span>
            <div className="inline-flex items-center justify-center gap-3 bg-[#FCFCFC] border border-[#E6E8EC] px-6 py-3.5 rounded-xl shadow-xs flex-wrap sm:flex-nowrap">
              <EnvelopeIcon size={22} className="text-brand-orange shrink-0" />
              <a 
                href="mailto:sankalp@jklu.edu.in"
                className="text-xl sm:text-2xl font-serif font-bold text-brand-blue hover:text-brand-orange transition-colors tracking-tight"
              >
                sankalp@jklu.edu.in
              </a>
              <button
                onClick={copyEmail}
                title="Copy Email Address"
                aria-label="Copy Email Address"
                className="p-2 rounded-lg bg-white border border-[#E6E8EC] hover:border-brand-orange text-slate-500 hover:text-brand-orange transition-all cursor-pointer flex items-center justify-center shadow-2xs ml-1"
              >
                {copied ? (
                  <span className="text-xs font-bold text-emerald-600 px-1">✓ Copied!</span>
                ) : (
                  <CopyIcon size={16} className="text-slate-500 hover:text-brand-orange" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 font-sans max-w-md mx-auto">
              For paper submissions, registration guidelines, sponsorships, or general conference queries.
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left font-sans">
            <div className="space-y-2 p-6 bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A99AD] block">
                Host Institution
              </span>
              <h3 className="font-serif font-bold text-base text-brand-blue">
                Institute of Engineering &amp; Technology
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                JK Lakshmipat University (JKLU), Jaipur
              </p>
            </div>

            <div className="space-y-2 p-6 bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A99AD] block">
                Conference Venue &amp; Address
              </span>
              <h3 className="font-serif font-bold text-base text-brand-blue">
                JK Lakshmipat University
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/venue#map-section"
              className="bg-white text-brand-ink font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-slate-100 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md cursor-pointer text-xs uppercase tracking-wider"
            >
              View Venue &amp; Map
            </a>
          </div>
        </Reveal>
      </div>

      <Footer />
    </div>
  );
}

