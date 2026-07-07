'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import { FileText } from 'lucide-react';
import { submissionSteps } from '@/constants/conferenceData';

export default function Submission() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-24 flex flex-col">
      <Navbar />

      <Section id="submission" title="Submission & Publication" className="flex-grow">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Submission Process */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-blue mb-4">Submission Process</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">Follow these steps to successfully submit your paper and register for the SANKALP 2027 conference.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {submissionSteps.map((step) => (
                <div key={step.step} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-brand-orange transition-colors"></div>
                  <div className="w-14 h-14 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-2xl shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-blue text-xl mb-3">{step.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Publication Details */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-blue mb-4">Publication Details</h3>
            </div>
            
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-glass-gradient pointer-events-none"></div>
              
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-blue mx-auto mb-8 shadow-inner">
                <FileText size={40} />
              </div>
              
              <p className="text-slate-700 text-lg leading-relaxed mb-8">
                Selected high-quality papers presented at SANKALP 2027 will be considered for publication in:
              </p>
              
              <div className="inline-block bg-slate-50 border border-slate-200 px-8 py-5 rounded-xl mb-8">
                <span className="font-bold text-brand-ink text-xl block mb-1">Springer Lecture Notes Series</span>
                <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">(Tentative)</span>
              </div>
              
              <p className="text-slate-600">
                Extended versions of selected papers may also be recommended for Scopus/SCI-indexed journals (tentative).
              </p>
            </div>
          </div>

        </div>
      </Section>

      <Footer />
    </main>
  );
}
