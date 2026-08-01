'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';

import TrackAccordion from '@/components/ui/TrackAccordion';
import { conferenceTracks, PAPER_SUBMISSION_LINK } from '@/constants/conferenceData';

export default function CallForPapersClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-24 flex flex-col">
      <Navbar />

      <Section id="call-for-papers" title="Call for Papers" className="flex-grow">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Guidelines */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 bg-white p-8 md:p-12 border border-slate-200 shadow-sm"
          >
            <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">
              Researchers, academicians, industry professionals, and scholars are invited to submit original and unpublished research papers aligned with the conference themes. All submissions will undergo a rigorous peer-review process by the Technical Program Committee.
            </p>
            
            <div className="border-l-4 border-brand-orange bg-slate-50 p-6 md:p-8 mb-10">
              <h4 className="text-xl font-serif font-bold text-brand-blue mb-4">
                Submission Guidelines
              </h4>
              <ul className="space-y-4 text-slate-700 font-medium text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <i className="fi fi-rr-check-circle text-brand-orange text-sm shrink-0 mt-1" />
                  <span>Papers must be original and not under review elsewhere.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fi fi-rr-check-circle text-brand-orange text-sm shrink-0 mt-1" />
                  <span>Submissions should follow the official SANKALP conference template formatting.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fi fi-rr-check-circle text-brand-orange text-sm shrink-0 mt-1" />
                  <span>Accepted papers must be presented during the conference by at least one author.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fi fi-rr-check-circle text-brand-orange text-sm shrink-0 mt-1" />
                  <span>At least one author of each accepted paper must register for the conference for the paper to be included in the proceedings.</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-blue text-white border border-brand-blue px-6 py-3 font-bold hover:bg-blue-900 transition-colors shadow-sm text-xs uppercase tracking-wide cursor-pointer rounded-sm"
              >
                Download Template
              </a>
              <a 
                href={PAPER_SUBMISSION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-3 font-bold hover:bg-orange-600 transition-colors shadow-sm text-xs uppercase tracking-wide cursor-pointer rounded-sm"
              >
                Submit Paper
              </a>
              <Link 
                href="/sessions"
                className="flex items-center justify-center gap-2 bg-slate-100 text-brand-blue border border-slate-300 px-6 py-3 font-bold hover:bg-brand-blue hover:text-white transition-colors shadow-sm text-xs uppercase tracking-wide cursor-pointer rounded-sm"
              >
                View Tracks &amp; Sessions →
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="relative aspect-[4/3] border border-slate-200 rounded-lg overflow-hidden shadow-sm group bg-white">
              <Image 
                src="/Images/campus/DJI_0124.webp" 
                alt="Research Session"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-blue/5 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            <div className="bg-brand-blue/5 border border-brand-blue/15 p-6 rounded-lg text-slate-700 text-sm leading-relaxed font-medium">
              <span className="font-bold text-brand-blue block mb-1">Publications</span>
              Publication Opportunity in Springer Lecture Notes in Computer Science (LNCS) Series (Scopus Indexed – Approval Awaited). Extended versions of selected papers may also be recommended for publication in Scopus/SCI-indexed journals.
            </div>
          </motion.div>

        </div>
      </Section>

      <Footer />
    </main>
  );
}
