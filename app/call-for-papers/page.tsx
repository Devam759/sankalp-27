'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import { Download, ExternalLink } from 'lucide-react';

export default function CallForPapers() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-24 flex flex-col">
      <Navbar />

      <Section id="call-for-papers" title="Call for Papers" className="flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-bl-full pointer-events-none"></div>
            
            <p className="text-slate-700 text-lg leading-relaxed mb-8 relative z-10">
              Researchers, academicians, industry professionals, and scholars are invited to submit original and unpublished research papers aligned with the conference themes. All submissions will undergo a rigorous peer-review process by the Technical Program Committee.
            </p>
            
            <div className="bg-slate-50 p-8 rounded-xl mb-10 relative z-10">
              <h4 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-orange rounded-sm"></span>
                Submission Guidelines
              </h4>
              <ul className="space-y-4 text-slate-600 list-disc pl-5">
                <li className="pl-2">Papers must be original and not under review elsewhere.</li>
                <li className="pl-2">Submissions should follow the official SANKALP conference template formatting.</li>
                <li className="pl-2">Accepted papers must be presented during the conference by at least one author.</li>
                <li className="pl-2">At least one author of each accepted paper must register for the conference for the paper to be included in the proceedings.</li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-6 relative z-10">
              <button className="flex items-center justify-center gap-2 bg-white text-brand-blue border-2 border-brand-blue px-8 py-4 rounded-xl font-bold hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:shadow-md">
                <Download size={20} />
                Download Template
              </button>
              <button className="flex items-center justify-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg">
                <ExternalLink size={20} />
                Paper Submission Portal
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
