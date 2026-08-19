'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import { REGISTRATION_CATEGORIES } from '@/constants/fees';

const timelineSteps = [
  { num: '01', title: 'Paper Acceptance', body: 'Receive your formal acceptance notification from the Technical Programme Committee via email.' },
  { num: '02', title: 'Select Category', body: 'Choose your registration tier - student, academician, industry, or delegate. Each is priced transparently.' },
  { num: '03', title: 'Online Checkout', body: 'Complete payment instantly via Cashfree PG (UPI, Credit/Debit Card, Net Banking, Wallets).' },
  { num: '04', title: 'QR Pass Dispatch', body: 'Receive your official PDF receipt with an embedded QR check-in pass directly to your registered inbox.' },
  { num: '05', title: 'Conference Day', body: 'Present your research, attend keynotes, and engage with an international academic community in Jaipur.' },
];

const inclusions = [
  'Official Conference Kit & Delegate Badge',
  'Access to All Technical & Oral Sessions',
  'Keynote, Plenary & Industry Keynotes',
  'Indexed Conference Proceedings Publication',
  'Networking & Industry Roundtables',
  'Best Paper & Presentation Award Eligibility',
  'Official Certificate of Participation / Presentation',
  'Complimentary Conference Lunch & Refreshments',
];

const policies = [
  'All accepted paper authors are required to register for proceedings inclusion.',
  'At least one co-author must hold a valid paid registration per accepted paper.',
  'Registration is activated immediately after online payment confirmation.',
  'All registrations are non-refundable once processed.',
  'Delegates must present their QR check-in pass at the venue entrance desk.',
  'Prices are subject to 18% GST. A 2% Cashfree transaction fee will also be added at payment processing.',
];

// Clean inline SVG Icons
function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ShieldCheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function InfoIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function SparklesIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  );
}

export default function RegistrationClient() {
  const heroRef = useRef(null);
  const [activeTab, setActiveTab] = useState<'all' | 'presenters' | 'global'>('all');

  const filteredCategories = REGISTRATION_CATEGORIES.filter((cat) => {
    if (activeTab === 'presenters') return cat.id.includes('speaker') || cat.id.includes('presenter');
    if (activeTab === 'global') return cat.id.includes('delegate') || cat.id === 'foreign_delegate';
    return true;
  });

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-brand-ink font-sans flex flex-col antialiased selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* HERO BANNER SECTION */}
      <section ref={heroRef} className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block mb-6">
            <WordReveal text="Registration &amp; Fees" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
          </h1>

          <Reveal variant="in" delay={0.25}>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-center leading-relaxed font-normal mt-6">
              Join distinguished researchers, academicians, and industry leaders at JK Lakshmipat University, Jaipur. Select your tier below to initiate instant registration and ticket pass dispatch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* REGISTRATION TIERS SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue tracking-tight">
                Registration Tiers
              </h2>
              <p className="text-slate-600 text-sm font-medium mt-1">
                Choose your registration tier to navigate to the online checkout.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-slate-100 border border-slate-200/90 rounded-md self-start md:self-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer ${
                  activeTab === 'all' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                All Tiers
              </button>
              <button
                onClick={() => setActiveTab('presenters')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer ${
                  activeTab === 'presenters' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Authors &amp; Presenters
              </button>
              <button
                onClick={() => setActiveTab('global')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer ${
                  activeTab === 'global' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Delegates
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((cat, i) => (
              <Reveal
                key={cat.id}
                delay={i * 0.05}
                className="relative border border-slate-200 bg-white p-7 flex flex-col justify-between rounded-lg shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-sans font-bold text-lg text-brand-blue mb-2.5 leading-snug">
                    {cat.name}
                  </h3>

                  <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Price Header */}
                  <div className="mb-6 p-4 rounded-md bg-slate-50 border border-slate-100">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-3xl font-extrabold text-brand-blue font-sans tracking-tight">
                        ₹{cat.amount.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                        + 18% GST
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/register?category=${cat.id}`}
                  className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all rounded-md bg-brand-blue text-white hover:bg-blue-900 flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Register Now</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Fee Notice Banner */}
          <div className="mt-10 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-xs text-slate-700">
            <div className="p-2 bg-amber-100 text-brand-orange rounded-md shrink-0">
              <InfoIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-brand-blue uppercase tracking-wider block sm:inline mr-2">Tax &amp; Fee Policy:</span>
              <span>All listed base registration fees are subject to 18% GST. A 2% Cashfree payment gateway transaction fee will also be added at checkout.</span>
            </div>
          </div>

        </div>
      </section>

      {/* REGISTRATION TIMELINE & INCLUSIONS SECTION */}
      <section className="py-16 sm:py-24 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Workflow Timeline */}
          <div className="lg:col-span-7">
            <Reveal variant="in">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                  <WordReveal text="Registration Workflow" className="text-brand-blue" />
                </h2>
                <p className="text-slate-600 text-sm font-medium mt-1">
                  Follow these five simple steps to complete your conference registration.
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {timelineSteps.map((stepItem, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="flex gap-5 bg-white p-5 sm:p-6 border border-slate-200/90 rounded-lg shadow-xs">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-brand-orange/10 text-brand-orange font-mono font-bold text-base shrink-0">
                      {stepItem.num}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-brand-blue text-base mb-1">{stepItem.title}</h3>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed">{stepItem.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Inclusions & Guidelines Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            {/* Inclusions Card */}
            <Reveal variant="right" className="bg-gradient-to-br from-brand-blue to-[#0D2447] text-white p-7 sm:p-8 rounded-lg shadow-md border border-white/10">
              <div className="flex items-center gap-2.5 mb-6">
                <SparklesIcon className="w-5 h-5 text-brand-orange" />
                <h2 className="font-sans font-extrabold text-xl tracking-tight">
                  <WordReveal text="Delegate Inclusions" className="text-white" />
                </h2>
              </div>
              <ul className="space-y-3">
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs font-medium text-slate-200">
                    <CheckIcon className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Guidelines Card */}
            <Reveal variant="right" delay={0.15} className="bg-white p-7 sm:p-8 border border-slate-200/90 rounded-lg shadow-xs">
              <div className="flex items-center gap-2.5 mb-5">
                <ShieldCheckIcon className="w-5 h-5 text-brand-blue" />
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-brand-blue uppercase tracking-wide">
                  <WordReveal text="Registration Guidelines" className="text-brand-blue" />
                </h2>
              </div>
              <ul className="space-y-3">
                {policies.map((pol, i) => (
                  <li key={i} className="text-xs text-slate-600 font-medium leading-relaxed flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0 mt-1.5" />
                    <span>{pol}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
