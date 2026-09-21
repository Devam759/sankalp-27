'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WordReveal from '@/components/ui/WordReveal';
import CircuitChipLoader from '@/components/ui/CircuitChipLoader';
import { EnvelopeIcon } from '@/components/ui/Icons';

export default function SponsorsClient() {
  const partnerBenefits = [
    {
      title: "GLOBAL REACH",
      desc: "Connect with an international audience of researchers, faculty, and industry leaders."
    },
    {
      title: "BRAND VISIBILITY",
      desc: "Prominently position your organization across conference publications, banners, and digital platforms."
    },
    {
      title: "THOUGHT LEADERSHIP",
      desc: "Engage in keynote and plenary dialogues shaping the trajectory of Sustainable AI and next-gen tech."
    },
    {
      title: "STRATEGIC NETWORKING",
      desc: "Build direct relationships with academic institutions, research labs, and prospective partners."
    },
    {
      title: "TALENT ACCESS",
      desc: "Interface with top-tier student researchers, innovators, and emerging engineering talent."
    },
    {
      title: "INNOVATION & IMPACT",
      desc: "Demonstrate corporate commitment to high-impact research, sustainable technology, and academic excellence."
    }
  ];

  const tiers = [
    {
      name: "Platinum Sponsor",
      investment: "INR 300,000 + GST",
      badge: "Title Partner",
      headerBg: "bg-[#184176] text-white",
      desc: "Exclusive top-tier recognition with primary branding across all physical, digital, and print assets, plus a 30-minute keynote slot.",
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
      headerBg: "bg-white text-brand-blue border-b border-slate-200",
      desc: "High-impact alignment tier featuring plenary speaking opportunities, session chair nomination, and dedicated exhibition booth.",
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
    { benefit: "Premium Exhibition Space (3m × 3m)", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Exhibition Space (2m × 2m)", plat: false, gold: true, silv: true, bronz: false },
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
      title: "RESEARCH & INDUSTRY",
      desc: "Meet researchers, faculty and technology professionals across AI and related computational fields."
    },
    {
      title: "BRAND PRESENCE",
      desc: "Present your organisation to a premier audience engaged with research, technology and emerging ideas."
    },
    {
      title: "TALENT & IDEAS",
      desc: "Connect directly with students, researchers and emerging engineers working on cutting-edge AI."
    },
    {
      title: "COLLABORATION",
      desc: "Create opportunities for meaningful academic, industry and joint research partnerships."
    }
  ];

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-20 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-16 pb-14 sm:pb-16 bg-white border-b border-slate-200/80 overflow-hidden relative">
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(#184176 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}
        />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
            <WordReveal text="Sponsors &amp; Partnerships" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
          </h1>

          <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal mt-6">
            Partner with JKLU SANKALP 2027 to engage with global technology leaders, researchers, and academic pioneers shaping the future of Sustainable AI.
          </p>

          {/* 4 Sponsorship Benefit Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 text-left">
            {sponsorshipBenefits.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#FAFAFC] border border-slate-200/90 rounded-[10px] p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(15,23,42,0.03)] hover:border-slate-300 hover:shadow-md transition-all duration-200 ease-out h-full"
              >
                <div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-blue mb-2 leading-snug font-sans">
                    {item.title}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Proposal Download Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9">
            <a
              href="/docs/sponsorship-proposal.pdf"
              download="SANKALP_2027_Sponsorship_Proposal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-brand-orange text-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Sponsorship Proposal</span>
            </a>

            <a
              href="/docs/conference-brochure.pdf"
              download="SANKALP_2027_Conference_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-brand-blue text-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-brand-lightBlue transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
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

      {/* 2. OFFICIAL PARTNER ANNOUNCEMENT STATUS */}
      <section className="py-12 px-6 md:px-12 flex items-center justify-center text-center relative overflow-hidden bg-brand-cloud border-b border-slate-200/80">
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(#173F73 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}
        />

        <div className="max-w-3xl w-full flex flex-col items-center justify-center space-y-6 relative z-10">
          <CircuitChipLoader />
          <div className="max-w-xl mx-auto space-y-1">
            <h2 className="font-serif font-bold text-lg text-brand-blue">
              Official Partners &amp; Patrons
            </h2>
            <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
              Confirmed corporate partners, academic affiliates, and patrons for SANKALP'27 will be announced here shortly.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY PARTNER SECTION (EDITORIAL ROW LAYOUT) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80 px-6 sm:px-10 md:px-12">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-blue tracking-tight relative inline-block">
              Why Partner with SANKALP 2027?
              <div className="w-12 h-[2px] bg-brand-orange mt-3 mx-auto rounded-full"></div>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal pt-1">
              Build meaningful connections across research, industry and innovation.
            </p>
          </div>

          <div className="border-t border-b border-slate-200/80 divide-y divide-slate-200/80">
            {partnerBenefits.map((item, idx) => (
              <div
                key={idx}
                className="py-5 sm:py-6 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 hover:bg-[#FAFAFC] transition-colors duration-200 ease-out group"
              >
                <h3 className="font-serif font-bold text-base sm:text-lg text-brand-blue uppercase tracking-wider shrink-0 min-w-[240px] sm:min-w-[280px]">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal text-left sm:text-right">
                  {item.desc}
                </p>
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

          {/* Benefits Comparison Matrix */}
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
                          <span className="text-slate-300 font-bold">-</span>
                        )}
                      </td>
                      <td className="p-3.5 sm:p-4 text-center font-semibold">
                        {typeof row.gold === 'string' ? (
                          <span className="text-brand-blue font-bold">{row.gold}</span>
                        ) : row.gold ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-brand-blue text-xs font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300 font-bold">-</span>
                        )}
                      </td>
                      <td className="p-3.5 sm:p-4 text-center font-semibold">
                        {typeof row.silv === 'string' ? (
                          <span className="text-brand-blue font-bold">{row.silv}</span>
                        ) : row.silv ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-brand-blue text-xs font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300 font-bold">-</span>
                        )}
                      </td>
                      <td className="p-3.5 sm:p-4 text-center font-semibold">
                        {typeof row.bronz === 'string' ? (
                          <span className="text-brand-blue font-bold">{row.bronz}</span>
                        ) : row.bronz ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-brand-blue text-xs font-bold">✓</span>
                        ) : (
                          <span className="text-slate-300 font-bold">-</span>
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

      {/* 5. CALL-TO-ACTION SECTION */}
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
              href="/docs/conference-brochure.pdf"
              download="SANKALP_2027_Conference_Brochure.pdf"
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

      {/* 6. ENQUIRIES CONTACT */}
      <section className="py-16 sm:py-20 bg-white px-6 sm:px-10 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FAFAFC] border border-slate-200/90 rounded-xl p-6 sm:p-8 md:p-10 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-full md:w-[65%] space-y-2.5 text-left">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue leading-tight relative inline-block">
                Sponsorship Enquiries
                <div className="w-10 h-[2px] bg-brand-orange mt-2.5"></div>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Have questions about sponsorship packages, customized agreements, exhibition booths, or institutional partnerships? Connect directly with the SANKALP 2027 organizing committee.
              </p>
            </div>

            <div className="hidden md:block w-px self-stretch bg-slate-200/80 my-1" />
            <div className="block md:hidden w-full h-px bg-slate-200/80 my-1" />

            <div className="w-full md:w-[35%] flex items-center justify-start md:justify-center shrink-0">
              <div className="flex items-center gap-3.5 text-sm font-medium">
                <div className="w-11 h-11 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                  <EnvelopeIcon size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">EMAIL</span>
                  <a href="mailto:sankalp@jklu.edu.in" className="text-brand-blue font-semibold hover:text-brand-orange transition-colors text-sm sm:text-base">
                    sankalp@jklu.edu.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
