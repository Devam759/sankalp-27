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
          <div className="bg-white p-8 md:p-14 border border-slate-200 mb-12">
            
            <p className="text-slate-700 text-lg leading-relaxed mb-10 font-medium">
              Researchers, academicians, industry professionals, and scholars are invited to submit original and unpublished research papers aligned with the conference themes. All submissions will undergo a rigorous peer-review process by the Technical Program Committee.
            </p>
            
            <div className="border-l-4 border-brand-orange bg-slate-50 p-8 mb-12">
              <h4 className="text-xl font-serif font-bold text-brand-blue mb-4">
                Submission Guidelines
              </h4>
              <ul className="space-y-4 text-slate-700 list-disc pl-5 font-medium">
                <li className="pl-2">Papers must be original and not under review elsewhere.</li>
                <li className="pl-2">Submissions should follow the official SANKALP conference template formatting.</li>
                <li className="pl-2">Accepted papers must be presented during the conference by at least one author.</li>
                <li className="pl-2">At least one author of each accepted paper must register for the conference for the paper to be included in the proceedings.</li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center justify-center gap-2 bg-brand-blue text-white border border-brand-blue px-8 py-3 font-bold hover:bg-blue-900 transition-colors shadow-sm text-sm uppercase tracking-wide">
                <Download size={18} />
                Download Template
              </button>
              <button className="flex items-center justify-center gap-2 bg-brand-orange text-white px-8 py-3 font-bold hover:bg-orange-600 transition-colors shadow-sm text-sm uppercase tracking-wide">
                <ExternalLink size={18} />
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
