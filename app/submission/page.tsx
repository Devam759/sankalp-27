'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import { BookOpen } from 'lucide-react';
import { submissionSteps } from '@/constants/conferenceData';

export default function Submission() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-24 flex flex-col">
      <Navbar />

      <Section id="submission" title="Submission & Publication" className="flex-grow">
        <div className="max-w-5xl mx-auto space-y-20">
          
          {/* Submission Process */}
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold text-brand-blue mb-2">Submission Process</h3>
              <div className="w-12 h-[2px] bg-brand-orange mb-6"></div>
              <p className="text-slate-600 max-w-2xl text-lg">Follow these steps to successfully submit your paper and register for the SANKALP 2027 conference.</p>
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

          {/* Publication Details */}
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold text-brand-blue mb-2">Publication Details</h3>
              <div className="w-12 h-[2px] bg-brand-orange"></div>
            </div>
            
            <div className="bg-white p-10 md:p-14 border border-slate-200 flex flex-col md:flex-row gap-12 items-center">
              <div className="shrink-0 w-32 h-40 bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-blue"></div>
                <BookOpen size={32} className="text-brand-blue" />
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Journal</span>
              </div>
              
              <div>
                <p className="text-slate-700 text-lg font-medium leading-relaxed mb-6">
                  Selected high-quality papers presented at SANKALP 2027 will be considered for publication in:
                </p>
                
                <div className="inline-block border-l-4 border-brand-orange bg-slate-50 px-6 py-4 mb-6">
                  <span className="font-serif font-bold text-brand-blue text-xl block mb-1">Springer Lecture Notes Series</span>
                  <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">Tentative</span>
                </div>
                
                <p className="text-slate-600 text-sm font-medium">
                  Extended versions of selected papers may also be recommended for Scopus/SCI-indexed journals (tentative).
                </p>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <Footer />
    </main>
  );
}
