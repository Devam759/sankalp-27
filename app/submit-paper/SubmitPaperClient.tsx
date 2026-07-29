'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function SubmitPaperClient() {
  // Demo submission portal link (placeholder to be updated with actual link)
  const SUBMISSION_PORTAL_URL = "https://example.com/sankalp2027-submission-portal";

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      <section className="flex-grow pt-32 pb-24 px-4 md:px-6 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto space-y-8">
          
          {/* Main Title & Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-blue tracking-tight">
              Submit Research Paper
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
              Paper submissions for SANKALP 2027 are managed through our external online submission portal.
            </p>
          </motion.div>

          {/* Submission Portal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white border border-slate-200/80 rounded-2xl p-8 md:p-12 shadow-sm space-y-8 text-center"
          >
            <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center mx-auto border border-brand-orange/20">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-blue">
                Online Submission Portal
              </h2>
              <p className="text-slate-600 text-sm max-w-lg mx-auto font-medium leading-relaxed">
                Click the link below to access the paper submission system. Make sure your paper adheres to the conference formatting guidelines before submitting.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SUBMISSION_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider cursor-pointer"
              >
                Go to Submission Portal ↗
              </a>
              <Link
                href="/call-for-papers"
                className="w-full sm:w-auto bg-slate-100 hover:bg-brand-blue hover:text-white border border-slate-200 text-brand-blue font-bold px-6 py-4 rounded-xl transition-all flex items-center justify-center text-sm uppercase tracking-wider cursor-pointer"
              >
                Submission Guidelines
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs font-medium text-slate-500">
              <div className="flex items-start gap-2.5">
                <span className="text-brand-orange font-bold text-sm">✓</span>
                <span>Peer-reviewed evaluation by Technical Program Committee.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-brand-orange font-bold text-sm">✓</span>
                <span>Publication opportunity in Springer LNCS Series (Scopus Indexed).</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
