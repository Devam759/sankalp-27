'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';


import TrackAccordion from '@/components/ui/TrackAccordion';
import { conferenceTracks } from '@/constants/conferenceData';

export default function CallForPapers() {
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
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-slate-200">
            <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">
              Researchers, academicians, industry professionals, and scholars are invited to submit original and unpublished research research papers aligned with the conference themes. All submissions will undergo a rigorous peer-review process by the Technical Program Committee.
            </p>
            
            <div className="border-l-4 border-brand-orange bg-slate-50 p-6 md:p-8 mb-10">
              <h4 className="text-xl font-serif font-bold text-brand-blue mb-4">
                Submission Guidelines
              </h4>
              <ul className="space-y-4 text-slate-700 list-disc pl-5 font-medium text-sm md:text-base">
                <li className="pl-2">Papers must be original and not under review elsewhere.</li>
                <li className="pl-2">Submissions should follow the official SANKALP conference template formatting.</li>
                <li className="pl-2">Accepted papers must be presented during the conference by at least one author.</li>
                <li className="pl-2">At least one author of each accepted paper must register for the conference for the paper to be included in the proceedings.</li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-blue text-white border border-brand-blue px-6 py-3 font-bold hover:bg-blue-900 transition-colors shadow-sm text-xs uppercase tracking-wide cursor-pointer"
              >
                Download Template
              </a>
              <a 
                href="mailto:sankalp@jklu.edu.in?subject=SANKALP 2027 Paper Submission"
                className="flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-3 font-bold hover:bg-orange-600 transition-colors shadow-sm text-xs uppercase tracking-wide cursor-pointer"
              >
                Submit Paper ↗
              </a>
            </div>
          </div>

          {/* Right Column: Image Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] border border-slate-200 rounded-lg overflow-hidden shadow-sm group bg-white">
              <Image 
                src="/Images/footer_image.webp" 
                alt="Research Session"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-blue/5 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            <div className="bg-brand-blue/5 border border-brand-blue/15 p-6 rounded-lg text-slate-700 text-sm leading-relaxed font-medium">
              <span className="font-bold text-brand-blue block mb-1">Publications</span>
              Publication Opportunity in Springer Lecture Notes in Computer Science (LNCS) Series (Scopus Indexed – Approval Awaited). Extended versions of selected papers may also be recommended for publication in Scopus/SCI-indexed journals.
            </div>
          </div>

        </div>
      </Section>

      {/* NEW: Tracks Accordion Section */}
      <Section id="tracks" title="Conference Tracks & Themes" className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              The conference invites contributions on research articles, case studies, and papers in the following major tracks:
            </p>
          </div>
          <div className="space-y-4">
            {conferenceTracks.map((track, i) => (
              <TrackAccordion 
                key={track.id} 
                track={track} 
                index={i} 
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
