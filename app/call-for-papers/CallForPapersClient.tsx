'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';

import { EnvelopeIcon } from '@/components/ui/Icons';
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
          <Reveal variant="left" className="lg:col-span-7 bg-white p-8 md:p-12 border border-slate-200 shadow-sm">
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

            {/* Microsoft CMT Acknowledgment */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-10 text-slate-700 text-sm leading-relaxed font-medium">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Peer Review Acknowledgment
              </h4>
              <p>
                The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
              </p>
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
          </Reveal>

          {/* Right Column: Image Showcase */}
          <Reveal variant="right" delay={0.15} className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white">
              <Image
                src="https://res.cloudinary.com/flufexsc/image/upload/v1787147492/sankalp/Images/call_for_papers.jpg"
                alt="SANKALP 2027 Academic Research & Presentation Session"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>

            <div className="bg-brand-blue/5 border border-brand-blue/15 p-6 rounded-lg text-slate-700 text-sm leading-relaxed font-medium">
              <span className="font-bold text-brand-blue block mb-1">Publications</span>
              Publication Opportunity in Springer Lecture Notes in Computer Science (LNCS) Series (Scopus Indexed - Approval Awaited). Extended versions of selected papers may also be recommended for publication in Scopus/SCI-indexed journals.
            </div>
          </Reveal>

        </div>

        {/* Thin Divider & For Further Queries Section */}
        <div className="w-full max-w-6xl mx-auto border-t border-slate-200 mt-16 pt-12">
          <Reveal variant="up" className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-blue uppercase tracking-wider">
              For Further Queries
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
              For any questions regarding paper submission, formatting, review process, or publication, please contact the CFP Coordination Team.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center justify-center gap-3.5 bg-white border border-slate-200 px-6 py-4 sm:px-8 sm:py-5 shadow-xs rounded-xl text-center">
                <EnvelopeIcon size={22} className="text-brand-orange shrink-0" />
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider font-sans">
                    CFP Coordination
                  </span>
                  <a 
                    href="mailto:cfp_sankalp@jklu.edu.in" 
                    className="text-base sm:text-lg font-serif font-bold text-brand-blue hover:text-brand-orange transition-colors tracking-tight"
                  >
                    cfp_sankalp@jklu.edu.in
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
