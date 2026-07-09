'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-24 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* Header Section */}
      <section className="py-12 md:py-16 px-6 bg-brand-cloud border-b border-slate-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-brand-orange"></div>
            <span className="text-brand-blue font-bold tracking-[0.2em] uppercase text-xs">
              Get In Touch
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-4">
            Contact Us
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Have questions about registrations, paper submissions, or the venue? Reach out to us.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 flex-grow bg-brand-cloud">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left: Contact Info Categories */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-blue mb-2">General & Convener Queries</h3>
                <div className="text-slate-700 space-y-1 text-sm md:text-base font-medium">
                  <p className="font-bold">Prof. Sonali Vyas</p>
                  <p className="text-xs text-slate-500 font-mono uppercase">Conference Convener</p>
                  <p>Head – Centre for Global Learning, JKLU</p>
                  <p><strong>Email:</strong> <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange hover:underline font-semibold">sankalp@jklu.edu.in</a></p>
                  <p><strong>Phone:</strong> +91 141 7107500</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-brand-blue mb-2">Registration & Payment Support</h3>
                <div className="text-slate-700 space-y-1 text-sm md:text-base font-medium">
                  <p>For transaction issues, duplicate charges, billing invoices, or category upgrades:</p>
                  <p><strong>Email:</strong> <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange hover:underline font-semibold">sankalp@jklu.edu.in</a></p>
                  <p><strong>Phone:</strong> +91 141 7107500</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-brand-blue mb-2">Paper Submissions & Program Committee</h3>
                <div className="text-slate-700 space-y-1 text-sm md:text-base font-medium">
                  <p>For questions regarding reviewers, acceptance letters, camera-ready papers, and journal proceedings:</p>
                  <p><strong>Email:</strong> <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange hover:underline font-semibold">sankalp@jklu.edu.in</a></p>
                </div>
              </div>
            </div>

            {/* Right: Institutional Details & Physical Address */}
            <div className="bg-white/50 border-2 border-brand-ink/10 p-6 md:p-8 rounded-sm space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-blue mb-3">Institutional Address</h3>
                <div className="text-slate-700 text-sm md:text-base font-mono space-y-1 leading-relaxed">
                  <p className="font-sans font-bold text-brand-ink">Institute of Engineering & Technology (IET)</p>
                  <p className="font-sans text-brand-ink">JK Lakshmipat University</p>
                  <p>Near Mahindra SEZ, Ajmer Road,</p>
                  <p>Jaipur, Rajasthan – 302026, India</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-serif font-bold text-brand-blue uppercase tracking-widest mb-2">Office Hours</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-mono">
                  Monday to Friday: 09:00 AM – 05:00 PM (IST)<br />
                  Saturday & Sunday: Closed
                </p>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-serif font-bold text-brand-blue uppercase tracking-widest mb-2">Website</h3>
                <p className="text-sm font-mono text-slate-700">
                  <a href="https://sankalp.jklu.edu.in" className="text-brand-orange hover:underline font-semibold">sankalp.jklu.edu.in</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
