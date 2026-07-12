'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import { Download, ExternalLink, BookOpen, FileText } from 'lucide-react';

import TrackAccordion from '@/components/ui/TrackAccordion';
import { conferenceTracks, submissionSteps } from '@/constants/conferenceData';

export default function CallForPapers() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-24 flex flex-col">
      <Navbar />

      {/* Hero Section / Main Guidelines */}
      <Section id="call-for-papers" title="Call for Papers" className="flex-grow">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Guidelines */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-slate-200">
            <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">
              Researchers, academicians, industry professionals, and scholars are invited to submit original and unpublished research papers aligned with the conference themes. All submissions will undergo a rigorous peer-review process by the Technical Program Committee.
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
                <Download size={16} />
                Download Template
              </a>
              <a 
                href="mailto:sankalp@jklu.edu.in?subject=SANKALP 2027 Paper Submission"
                className="flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-3 font-bold hover:bg-orange-600 transition-colors shadow-sm text-xs uppercase tracking-wide cursor-pointer"
              >
                <ExternalLink size={16} />
                Submit Paper
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

      {/* Submission Process Section */}
      <Section id="submission" title="Submission Process" className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              Follow these steps to successfully submit your paper and register for the SANKALP 2027 conference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 bg-white">
            {submissionSteps.map((step, index) => (
              <div key={step.step} className={`p-8 md:p-10 flex gap-6 group hover:bg-slate-50 transition-colors ${
                index === 0 ? 'border-b md:border-r border-slate-200' :
                index === 1 ? 'border-b border-slate-200' :
                index === 2 ? 'border-b md:border-b-0 md:border-r border-slate-200' :
                ''
              }`}>
                <div className="w-12 h-12 border border-brand-orange/30 text-brand-orange flex items-center justify-center font-serif font-bold text-xl shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  0{step.step}
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue text-lg mb-3 leading-snug">{step.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Publication Details Section */}
      <Section id="publication" title="Publication Details" className="bg-brand-cloud border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-10 md:p-14 border border-slate-200 flex flex-col md:flex-row gap-12 items-center">
            {/* Tilted book image cover */}
            <div className="shrink-0 w-32 h-44 border border-slate-200 shadow-md relative overflow-hidden rounded-sm group bg-white">
              <Image 
                src="/Images/footer_image.webp" 
                alt="Springer Book Cover"
                fill
                sizes="128px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-blue/10 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange" />
            </div>
            
            <div>
              <p className="text-slate-700 text-lg font-medium leading-relaxed mb-6">
                Selected high-quality papers presented at SANKALP 2027 will be considered for publication in:
              </p>
              
              <div className="inline-block border-l-4 border-brand-orange bg-slate-50 px-6 py-4 mb-6 text-left">
                <span className="font-serif font-bold text-brand-blue text-lg block mb-1">Springer Lecture Notes in Computer Science (LNCS) Series</span>
                <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">Scopus Indexed – Approval Awaited</span>
              </div>
              
              <p className="text-slate-600 text-sm font-medium">
                Extended versions of selected papers may also be recommended for publication in Scopus/SCI-indexed journals.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Tracks Accordion Section */}
      <Section id="tracks" title="Conference Tracks & Themes" className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              The conference invites contributions on research articles, case studies, and papers in the following major tracks:
            </p>
          </div>
          <div className="space-y-4">
            {conferenceTracks.map((track, i) => (
              <TrackAccordion key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
