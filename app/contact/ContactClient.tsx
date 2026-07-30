'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { EnvelopeIcon, CopyIcon } from '@/components/ui/Icons';

export default function ContactClient() {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('sankalp@jklu.edu.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const organizingHeads = [
    { name: "Dr. Tapas Kumar", title: "Conference Chair" },
    { name: "Dr. Sonali Vyas", title: "Conference Convener" },
  ];

  const subCommittees = [
    { department: "Registration", name: "Dr. Priti Sharma" },
    { department: "Publication", name: "Dr. Ankur Verma" },
    { department: "Sponsorship", name: "Mr. Sanjay Kedia" },
    { department: "Hospitality", name: "Dr. Mamta Bhatia" },
    { department: "Media & Comms", name: "Ms. Shilpa Sharma" }
  ];

  const trackChairs = [
    { track: "Sustainable AI", name: "Dr. Amit Kumar Sinhal" },
    { track: "Data Science", name: "Dr. Taruna Sunil" },
    { track: "HPC & Edge", name: "Dr. Umesh Gupta" },
    { track: "Smart Healthcare", name: "Dr. Devika Kataria" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f7f4ef] text-[#184176] font-sans selection:bg-[#f5821e] selection:text-white">
      <Navbar />

      <div className="pt-32 pb-28 px-6 md:px-12 max-w-4xl mx-auto relative z-10 flex-grow space-y-12">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-blue uppercase tracking-tight">
            Contact Us
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto">
            SANKALP 2027 International Conference &middot; Institute of Engineering &amp; Technology, JKLU
          </p>
          <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-[#E6E8EC] p-8 sm:p-12 shadow-sm rounded-[18px] space-y-10"
        >
          {/* Email Section */}
          <div className="space-y-4 text-center border-b border-[#E6E8EC]/80 pb-8">
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
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
