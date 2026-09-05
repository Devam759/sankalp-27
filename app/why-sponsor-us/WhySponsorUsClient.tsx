'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WordReveal from '@/components/ui/WordReveal';
import { 
  BuildingIcon, 
  UsersGroupIcon, 
  GraduationCapIcon, 
  RocketIcon, 
  BadgeIcon, 
  EnvelopeIcon
} from '@/components/ui/Icons';

export default function WhySponsorUsClient() {
  const attendeeDemographics = [
    {
      title: "Global Researchers & Academicians",
      desc: "Researchers and faculty working across AI, technology and related disciplines.",
      icon: GraduationCapIcon
    },
    {
      title: "Industry Leaders & Executives",
      desc: "Technology leaders and professionals sharing industry experience, challenges and perspectives.",
      icon: BuildingIcon
    },
    {
      title: "Policymakers & Government Representatives",
      desc: "Voices from public institutions involved in technology, policy and responsible innovation.",
      icon: BadgeIcon
    },
    {
      title: "University Leadership",
      desc: "Academic leaders contributing to research, education and institutional collaboration.",
      icon: UsersGroupIcon
    },
    {
      title: "Emerging Talent & Future Leaders",
      desc: "Students and young researchers bringing fresh ideas to the conference.",
      icon: RocketIcon
    }
  ];

  const strategicAdvantages = [
    {
      title: "GLOBAL BRAND VISIBILITY",
      desc: "Exposure to an international audience of researchers, industry leaders and policymakers.",
      badge: "VISIBILITY",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      title: "THOUGHT LEADERSHIP POSITIONING",
      desc: "Associate your organisation with discussions on Sustainable AI and emerging technologies.",
      badge: "LEADERSHIP",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M9 9h6" />
          <path d="M9 13h4" />
        </svg>
      )
    },
    {
      title: "STRATEGIC NETWORKING",
      desc: "Connect with decision-makers, potential partners and experts from different sectors.",
      badge: "NETWORKING",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: "TALENT PIPELINE ACCESS",
      desc: "Engage with talent across engineering, AI, data science and design disciplines.",
      badge: "RECRUITMENT",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    },
    {
      title: "INNOVATION ECOSYSTEM ENGAGEMENT",
      desc: "Engage with organisations and institutions working across AI and technology.",
      badge: "INNOVATION",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      title: "CSR & COMMUNITY ENGAGEMENT",
      desc: "Support education, research and sustainable technological development.",
      badge: "IMPACT",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    }
  ];

  const tiers = [
    {
      name: "Platinum Sponsor",
      investment: "INR 300,000 + GST",
      badge: "Title Partner",
      accentColor: "border-brand-orange text-brand-orange bg-orange-50/50",
      headerBg: "bg-[#184176] text-white",
      desc: "Exclusive top-tier recognition with primary branding across all physical, digital, and print assets, plus 30-minute keynote slot.",
      features: [
        "Title Recognition in all official media",
        "Keynote Speaking Slot (30 min)",
        "Session Naming Rights",
        "Premium Exhibition Space (3m × 3m)",
        "10 Complimentary Delegate Passes",
        "Full-Page Ad in Proceedings",
        "Dedicated Social Media Posts & Email Feature"
      ]
    },
    {
      name: "Gold Sponsor",
      investment: "INR 200,000 + GST",
      badge: "Plenary Partner",
      accentColor: "border-amber-500 text-amber-600 bg-amber-50/50",
      headerBg: "bg-white text-brand-blue border-b border-slate-200",
      desc: "High-impact alignment tier featuring plenary speaking opportunities, session chair nomination, and venue booth.",
      features: [
        "Plenary Speaking Slot (20 min)",
        "Session Chair Nomination",
        "Exhibition Space (2m × 2m)",
        "Virtual Exhibition Booth",
        "6 Complimentary Delegate Passes",
        "Half-Page Ad in Proceedings",
        "Pre-Event Email Feature"
      ]
    },
    {
      name: "Silver Sponsor",
      investment: "INR 100,000 + GST",
      badge: "Featured Partner",
      accentColor: "border-slate-400 text-slate-600 bg-slate-50/50",
      headerBg: "bg-white text-brand-blue border-b border-slate-200",
      desc: "Essential sponsorship package providing standard exhibition space, conference pass allocation, and proceedings ads.",
      features: [
        "Exhibition Space (2m × 2m)",
        "4 Complimentary Delegate Passes",
        "Logo on Website Sponsor Page & Banners",
        "Logo on Virtual Platform & Program",
        "Quarter-Page Ad in Proceedings",
        "Company Inserts in Delegate Kits",
        "Social Media Mentions"
      ]
    },
    {
      name: "Bronze / Associate Sponsor",
      investment: "INR 50,000 + GST",
      badge: "Supporting Partner",
      accentColor: "border-amber-700 text-amber-800 bg-amber-50/30",
      headerBg: "bg-white text-brand-blue border-b border-slate-200",
      desc: "Supporting partnership tier designed for entry-level brand presence, proceedings logo acknowledgment, and delegate access.",
      features: [
        "2 Complimentary Delegate Passes",
        "Logo on Website Sponsor Page",
        "Logo on Backdrops & Banners",
        "Logo on Conference Program",
        "Logo Acknowledgment in Proceedings",
        "Company Inserts in Delegate Kits"
      ]
    }
  ];

  const benefitsTable = [
    { benefit: "Title Recognition", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Keynote Speaking Slot (30 min)", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Plenary Speaking Slot (20 min)", plat: false, gold: true, silv: false, bronz: false },
    { benefit: "Session Naming Rights", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Session Chair Nomination", plat: false, gold: true, silv: false, bronz: false },
    { benefit: "Premium Exhibition Space (3m×3m)", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Exhibition Space (2m×2m)", plat: false, gold: true, silv: true, bronz: false },
    { benefit: "Virtual Exhibition Booth", plat: true, gold: true, silv: false, bronz: false },
    { benefit: "Complimentary Delegate Passes", plat: "10 Passes", gold: "6 Passes", silv: "4 Passes", bronz: "2 Passes" },
    { benefit: "Logo on Website Homepage", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Logo on Website Sponsor Page", plat: true, gold: true, silv: true, bronz: true },
    { benefit: "Logo on Backdrops & Banners", plat: true, gold: true, silv: true, bronz: true },
    { benefit: "Logo on Virtual Platform", plat: true, gold: true, silv: true, bronz: false },
    { benefit: "Logo on Conference Program", plat: true, gold: true, silv: true, bronz: true },
    { benefit: "Full-Page Ad in Proceedings", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Half-Page Ad in Proceedings", plat: false, gold: true, silv: false, bronz: false },
    { benefit: "Quarter-Page Ad in Proceedings", plat: false, gold: false, silv: true, bronz: false },
    { benefit: "Logo Acknowledgment in Proceedings", plat: false, gold: false, silv: false, bronz: true },
    { benefit: "Company Inserts in Delegate Kits", plat: true, gold: true, silv: true, bronz: true },
    { benefit: "Dedicated Social Media Posts", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Social Media Mentions", plat: true, gold: true, silv: true, bronz: false },
    { benefit: "Pre-Event Email Feature", plat: true, gold: true, silv: false, bronz: false },
    { benefit: "Post-Event Delegate List Access", plat: true, gold: false, silv: false, bronz: false }
  ];

  const sponsorshipBenefits = [
    {
      title: "01 — RESEARCH & INDUSTRY",
      desc: "Meet researchers, faculty and technology professionals working across AI, engineering, management and related disciplines."
    },
    {
      title: "02 — BRAND PRESENCE",
      desc: "Present your organisation to an audience engaged with research, technology and emerging ideas."
    },
    {
      title: "03 — TALENT & IDEAS",
      desc: "Interact with students, researchers and early-career professionals working across AI and related fields."
    },
    {
      title: "04 — COLLABORATION",
      desc: "Create opportunities for discussion with academic institutions, industry participants and research communities."
    }
  ];

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-20 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* 1. INTRODUCTORY SECTION */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 bg-white border-b border-slate-200/80 overflow-hidden relative">
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(#184176 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}
        />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center relative z-10">
          {/* Eyebrow */}
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-brand-orange block mb-2.5">
            PARTNERSHIP OPPORTUNITIES
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue tracking-tight leading-tight">
            Why Sponsor SANKALP’27?
          </h1>

          {/* Short Orange Accent Line */}
          <div className="w-12 h-[2.5px] bg-brand-orange mx-auto mt-3.5 mb-4 rounded-full" />

          {/* Introductory Sentence */}
          <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Engage with researchers, academics, industry professionals, policymakers and students working across sustainable AI and related fields.
          </p>

          {/* Sponsorship Benefits (4-Column) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 text-left">
            {sponsorshipBenefits.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#FAFAFC] border border-slate-200/90 rounded-[10px] p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(15,23,42,0.03)] hover:border-slate-300 hover:shadow-md transition-all duration-200 ease-out h-full"
              >
                <div>
                  <h2 className="font-serif font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-blue mb-2 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9">
            <a
              href="/docs/sponsorship-proposal.pdf"
              download="SANKALP_2027_Sponsorship_Proposal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-brand-orange text-white font-medium py-3 px-6 rounded shadow-sm hover:bg-orange-600 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Sponsorship Proposal</span>
            </a>

            <a
              href="/JKLU%20Sankalp%20Brochure.pdf"
              download="JKLU_Sankalp_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center border border-brand-blue text-brand-blue font-medium py-3 px-6 rounded hover:bg-brand-blue/5 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Conference Brochure</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHY SPONSOR SECTION */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/60 px-6 sm:px-10 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-3.5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-blue tracking-tight relative inline-block">
              An International Multi-Disciplinary Platform
              <div className="w-12 h-[2px] bg-brand-orange mt-3.5 mx-auto rounded-full"></div>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed font-normal pt-1">
              JKLU SANKALP 2027 brings together researchers, academics, industry professionals, policymakers and students to exchange ideas and discuss practical directions for sustainable AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {attendeeDemographics.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAFAFC] border border-slate-200/90 rounded-[14px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-md transition-all duration-200 ease-out h-full"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/5 text-brand-blue flex items-center justify-center">
                      <IconComp size={20} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-brand-blue leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC ADVANTAGES FOR SPONSORS */}
      <section className="py-14 sm:py-16 bg-[#F8FAFC] border-b border-slate-200/80 px-6 sm:px-10 md:px-12">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-blue tracking-tight relative inline-block">
              Strategic Advantages for Sponsors
              <div className="w-12 h-[2px] bg-brand-orange mt-3 mx-auto rounded-full"></div>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal pt-1">
              Sponsorship provides opportunities for visibility, professional engagement, talent interaction and collaboration across the conference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {strategicAdvantages.map((adv, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-[14px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(15,23,42,0.03)] hover:-translate-y-[3px] hover:border-slate-300 hover:shadow-md transition-all duration-200 ease-out group h-full"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-brand-blue/5 text-brand-blue flex items-center justify-center group-hover:bg-orange-50/80 group-hover:text-brand-orange transition-colors duration-200">
                      {adv.icon}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600 bg-slate-100/90 border border-slate-200/60 px-2.5 py-1 rounded-[6px]">
                      {adv.badge}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-blue leading-snug">
                      {adv.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SPONSORSHIP CATEGORIES & COMPARISON */}
      <section className="py-20 bg-white border-b border-slate-200/60 px-6 sm:px-10 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue relative inline-block">
              Sponsorship Categories
              <div className="w-12 h-[2px] bg-brand-orange mt-3 mx-auto"></div>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We offer four structured sponsorship packages tailored to your organization's visibility and engagement goals.
            </p>
          </div>

          {/* Tier Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-xl overflow-hidden flex flex-col justify-between shadow-[0_1px_3px_rgba(15,23,42,0.03)] hover:border-slate-300 hover:shadow-md transition-all duration-200 ease-out h-full"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className={`p-6 ${tier.headerBg} min-h-[160px] flex flex-col justify-between`}>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-1">
                        {tier.badge}
                      </span>
                      <h3 className="font-serif font-bold text-xl leading-tight">
                        {tier.name}
                      </h3>
                    </div>
                    <div className="pt-3 border-t border-current/15">
                      <span className="text-[10px] font-semibold uppercase tracking-wider block opacity-75">INVESTMENT</span>
                      <span className="text-lg font-bold tracking-tight block mt-0.5">
                        {tier.investment}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {tier.desc}
                    </p>
                    <div className="space-y-2 pt-3 border-t border-slate-100 mt-auto">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Key Highlights:</span>
                      <ul className="space-y-2 text-xs text-slate-700 font-normal">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="text-brand-orange font-bold text-sm leading-none mt-0.5">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Benefits Comparison Matrix */}
          <div className="space-y-6 pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-serif font-bold text-2xl text-brand-blue">
                Comprehensive Benefits Comparison
              </h3>
              <p className="text-sm text-slate-600">
                Detailed feature matrix across all four sponsorship packages
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200/90 rounded-xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] bg-white">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#184176] text-white font-serif">
                    <th className="p-4 font-bold min-w-[240px]">Sponsorship Benefit</th>
                    <th className="p-4 text-center font-bold min-w-[110px]">Platinum</th>
                    <th className="p-4 text-center font-bold min-w-[110px]">Gold</th>
                    <th className="p-4 text-center font-bold min-w-[110px]">Silver</th>
                    <th className="p-4 text-center font-bold min-w-[110px]">Bronze</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {benefitsTable.map((row, rIdx) => (
                    <tr 
                      key={rIdx} 
                      className={`hover:bg-slate-50/80 transition-colors ${rIdx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFC]'}`}
                    >
                      <td className="p-3.5 sm:p-4 font-medium text-brand-blue">
                        {row.benefit}
                      </td>
                      <td className="p-3.5 sm:p-4 text-center font-semibold">
                        {typeof row.plat === 'string' ? (
                          <span className="text-brand-orange font-bold">{row.plat}</span>
                        ) : row.plat ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-brand-blue text-xs font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300 font-bold">—</span>
                        )}
                      </td>
                      <td className="p-3.5 sm:p-4 text-center font-semibold">
                        {typeof row.gold === 'string' ? (
                          <span className="text-brand-blue font-bold">{row.gold}</span>
                        ) : row.gold ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-brand-blue text-xs font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300 font-bold">—</span>
                        )}
                      </td>
                      <td className="p-3.5 sm:p-4 text-center font-semibold">
                        {typeof row.silv === 'string' ? (
                          <span className="text-brand-blue font-bold">{row.silv}</span>
                        ) : row.silv ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-brand-blue text-xs font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300 font-bold">—</span>
                        )}
                      </td>
                      <td className="p-3.5 sm:p-4 text-center font-semibold">
                        {typeof row.bronz === 'string' ? (
                          <span className="text-brand-blue font-bold">{row.bronz}</span>
                        ) : row.bronz ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-brand-blue text-xs font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300 font-bold">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STRONG CALL-TO-ACTION SECTION */}
      <section className="py-20 bg-[#184176] text-white text-center px-6 sm:px-10 md:px-12 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }}
        />
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Become a Sponsor
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full" />
          </div>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Join JKLU SANKALP 2027 as a valued partner and connect your organization with global research, innovation and the future of Sustainable AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/docs/sponsorship-proposal.pdf"
              download="SANKALP_2027_Sponsorship_Proposal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-brand-orange text-white font-semibold py-3.5 px-8 rounded-md shadow-md hover:bg-orange-600 transition-colors text-sm flex items-center justify-center gap-2.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Sponsorship Proposal</span>
            </a>

            <a
              href="/JKLU%20Sankalp%20Brochure.pdf"
              download="JKLU_Sankalp_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-white text-brand-blue font-semibold py-3.5 px-8 rounded-md border border-white/20 shadow-md hover:bg-slate-100 transition-colors text-sm flex items-center justify-center gap-2.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Conference Brochure</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section className="py-20 bg-white px-6 sm:px-10 md:px-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue relative inline-block">
              Sankalp Organizing Committee
              <div className="w-12 h-[2px] bg-brand-orange mt-3 mx-auto"></div>
            </h2>
            <p className="text-slate-600 text-base">
              Get in touch with us for sponsorship opportunities, customized packages, and partnerships.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-[#FAFAFC] border border-slate-200/90 rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.03)] space-y-5">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              JK Lakshmipat University, Near Mahindra SEZ, Jaipur, Rajasthan
            </p>

            <div className="w-full h-px bg-slate-200/80" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-medium">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                  <EnvelopeIcon size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Email</span>
                  <a href="mailto:sankalp@jklu.edu.in" className="text-brand-blue font-semibold hover:text-brand-orange transition-colors">
                    sankalp@jklu.edu.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Website</span>
                  <a href="https://sankalp.jklu.edu.in" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-semibold hover:text-brand-orange transition-colors">
                    sankalp.jklu.edu.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <Footer />
    </main>
  );
}
