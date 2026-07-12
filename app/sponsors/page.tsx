'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Mail, 
  Globe, 
  MapPin, 
  Check, 
  Award, 
  Users, 
  Target, 
  Layers, 
  Briefcase, 
  FileText, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function SponsorsPage() {
  const whySponsor = [
    {
      icon: Globe,
      title: "Global Brand Visibility",
      desc: "Gain exposure to an international audience of researchers, industry leaders, and key policymakers shaping the technology landscape."
    },
    {
      icon: Target,
      title: "Thought Leadership",
      desc: "Associate your brand with cutting-edge discourse and key advancements in Sustainable AI and emerging technologies."
    },
    {
      icon: Users,
      title: "Strategic Networking",
      desc: "Secure direct access to key decision-makers, potential research partners, and global technology experts."
    },
    {
      icon: Briefcase,
      title: "Talent Pipeline Access",
      desc: "Connect directly with top-tier student talent across JKLU's interdisciplinary engineering, AI, data science, and design programs."
    },
    {
      icon: Layers,
      title: "Innovation Ecosystem",
      desc: "Position your organization at the center of India's growing AI and technological innovation landscape."
    },
    {
      icon: Award,
      title: "CSR & Research Support",
      desc: "Demonstrate your organization's commitment to higher education, impactful research, and sustainable technological development."
    }
  ];

  const categories = [
    {
      name: "Platinum Sponsor",
      badge: "Title Partner",
      desc: "Our premium tier offering exclusive title recognition, primary branding, and speaking privileges across the entire conference timeline.",
      bullets: [
        "Exclusive 'Platinum Sponsor' acknowledgment in all communications",
        "Logo prominently displayed on homepage, banners, delegate kits, and lanyards",
        "30-minute keynote speaking opportunity in the inaugural/plenary session",
        "Premium exhibition space (3m × 3m) & virtual booth",
        "10 complimentary delegate registrations",
        "Option to name a technical session track",
        "Full-page color advertisement in the conference proceedings"
      ]
    },
    {
      name: "Gold Sponsor",
      badge: "Premium Partner",
      desc: "A high-visibility tier featuring plenary speaking opportunities, track chair options, and prominent venue positioning.",
      bullets: [
        "Acknowledgment as 'Gold Sponsor' in all promotional materials",
        "Logo on website sponsor page, backdrops, and virtual platform",
        "20-minute invited talk during a plenary session",
        "Exhibition space (2m × 2m) & virtual booth",
        "6 complimentary delegate registrations",
        "Opportunity to nominate a technical session track chair",
        "Half-page color advertisement in the conference proceedings"
      ]
    },
    {
      name: "Silver Sponsor",
      badge: "Featured Partner",
      desc: "A solid tier supporting essential conference components with standard branding and delegate access packages.",
      bullets: [
        "Acknowledgment as 'Silver Sponsor' in conference materials",
        "Logo on website sponsor page, event banners, and virtual platform",
        "Exhibition space (2m × 2m) at the physical venue",
        "4 complimentary delegate registrations",
        "Quarter-page color advertisement in the conference proceedings",
        "Company brochures/inserts in delegate kits"
      ]
    },
    {
      name: "Bronze / Associate Sponsor",
      badge: "Supporting Partner",
      desc: "A key tier designed for organizations seeking supporting alignment, program representation, and delegate passes.",
      bullets: [
        "Acknowledgment as 'Associate Sponsor' in conference materials",
        "Logo on website sponsor page and event banners/signage",
        "2 complimentary delegate registrations",
        "Logo acknowledgment in the conference proceedings",
        "Company brochures/inserts in delegate kits"
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
    { benefit: "Logo on Website Sponsor Page", plat: true, gold: true, silv: true, platOnly: false, all: true },
    { benefit: "Logo on Venue Backdrops & Banners", plat: true, gold: true, silv: true, all: true },
    { benefit: "Logo on Virtual Platform", plat: true, gold: true, silv: true, bronz: false },
    { benefit: "Logo on Conference Program", plat: true, gold: true, silv: true, all: true },
    { benefit: "Full-Page Ad in Proceedings", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Half-Page Ad in Proceedings", plat: false, gold: true, silv: false, bronz: false },
    { benefit: "Quarter-Page Ad in Proceedings", plat: false, gold: false, silv: true, bronz: false },
    { benefit: "Logo Acknowledgment in Proceedings", plat: false, gold: false, silv: false, bronz: true },
    { benefit: "Company Inserts in Delegate Kits", plat: true, gold: true, silv: true, all: true },
    { benefit: "Dedicated Social Media Posts", plat: true, gold: false, silv: false, bronz: false },
    { benefit: "Social Media Mentions", plat: true, gold: true, silv: true, bronz: false },
    { benefit: "Pre-Event Email Feature", plat: true, gold: true, silv: false, bronz: false },
    { benefit: "Post-Event Delegate List Access", plat: true, gold: false, silv: false, bronz: false }
  ];

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-24 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden min-h-[60vh] flex items-center border-b border-slate-200">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#184176_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full z-10 relative">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-brand-orange" />
              <span className="text-brand-blue font-bold tracking-[0.25em] uppercase text-xs">
                Partnerships
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-blue leading-[1.15]">
              Sponsors &amp; Partnerships
            </h1>
            
            <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium border-l-2 border-brand-orange/30 pl-6">
              SANKALP 2027 is a premier international multidisciplinary conference organized by the Institute of Engineering &amp; Technology (IET), JK Lakshmipat University (JKLU), Jaipur. Partner with us to engage with global technology leaders and support the discourse on Sustainable AI.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="/temp_sponsors/SPONSORSHIP PROPOSAL.docx"
                download="SANKALP_2027_Sponsorship_Proposal.docx"
                className="bg-brand-orange text-white font-bold py-3 px-6 hover:bg-orange-600 active:translate-y-[1px] transition-all rounded-[10px] flex items-center gap-2 cursor-pointer text-xs shadow-sm"
              >
                <Download size={14} /> Download Proposal
              </a>
              <a 
                href="#contact"
                className="bg-white text-brand-blue font-bold py-3 px-6 border border-[#E6E8EC] hover:bg-[#FFFBF7] hover:border-brand-orange active:translate-y-[1px] transition-all rounded-[10px] flex items-center gap-2 cursor-pointer text-xs shadow-sm"
              >
                Become a Sponsor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY SPONSOR SANKALP'27 */}
      <section className="py-24 bg-white border-b border-slate-100 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              Why Sponsor SANKALP 2027?
            </h2>
            <div className="w-16 h-[2px] bg-brand-orange" />
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Establish a powerful presence at a leading academic and industry crossroads. Our platform offers strategic avenues to demonstrate leadership and engage directly with global communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whySponsor.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-2xl p-8 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="inline-block text-brand-orange mb-2">
                      <IconComponent size={24} />
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#1F4E8C] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5F6B7A] font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SPONSORSHIP CATEGORIES */}
      <section className="py-24 bg-brand-cloud border-b border-slate-100 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              Sponsorship Categories
            </h2>
            <div className="w-16 h-[2px] bg-brand-orange" />
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Choose from our structured alignment levels, designed to address diverse organizational outreach and communication objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#E6E8EC] rounded-[18px] p-8 sm:p-10 flex flex-col justify-between gap-8 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-blue leading-tight">
                        {cat.name}
                      </h3>
                      <span className="inline-block bg-[#E6E8EC]/60 text-[#1F4E8C] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {cat.badge}
                      </span>
                    </div>

                    {/* Logo Placeholder */}
                    <div className="w-24 h-12 border border-dashed border-[#E6E8EC] rounded-lg flex items-center justify-center bg-[#FCFCFC] text-[8px] text-[#8A99AD] font-bold uppercase tracking-wider text-center shrink-0">
                      Your Logo Here
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                    {cat.desc}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-[#E6E8EC]/60">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A99AD] block">Included Privileges:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-500 font-medium leading-relaxed font-sans">
                      {cat.bullets.slice(0, 6).map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <Check size={12} className="text-brand-orange shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E8EC]/60">
                  <a 
                    href="#contact"
                    className="w-full text-center border border-[#E6E8EC] text-brand-ink hover:text-brand-orange hover:border-brand-orange font-bold py-2.5 transition-all duration-300 rounded-[10px] flex items-center justify-center gap-2 cursor-pointer text-xs bg-[#FCFCFC] shadow-sm"
                  >
                    Inquire Category &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SPONSORSHIP BENEFITS TABLE */}
      <section className="py-24 bg-white border-b border-slate-100 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              Sponsorship Benefits at a Glance
            </h2>
            <div className="w-16 h-[2px] bg-brand-orange" />
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A comprehensive matrix detail outlining promotional allocations and administrative privileges across all alignment options.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E6E8EC] rounded-[18px] shadow-sm bg-[#FCFCFC]">
            <table className="w-full border-collapse text-left text-xs sm:text-sm font-sans">
              <thead>
                <tr className="border-b border-[#E6E8EC] bg-[#F4F5F7] text-brand-blue font-bold">
                  <th className="p-4 sm:p-5 font-serif font-bold min-w-[200px]">Promotional Privileges</th>
                  <th className="p-4 sm:p-5 text-center font-serif font-bold">Platinum</th>
                  <th className="p-4 sm:p-5 text-center font-serif font-bold">Gold</th>
                  <th className="p-4 sm:p-5 text-center font-serif font-bold">Silver</th>
                  <th className="p-4 sm:p-5 text-center font-serif font-bold">Bronze</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E8EC]/80 bg-white">
                {benefitsTable.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#FFFBF9]/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-brand-ink">{row.benefit}</td>
                    
                    {/* Platinum Column */}
                    <td className="p-4 sm:p-5 text-center font-medium">
                      {typeof row.plat === 'string' ? row.plat : (row.plat ? <Check size={16} className="text-brand-orange mx-auto" /> : <span className="text-[#8A99AD]">—</span>)}
                    </td>
                    
                    {/* Gold Column */}
                    <td className="p-4 sm:p-5 text-center font-medium">
                      {typeof row.gold === 'string' ? row.gold : (row.gold ? <Check size={16} className="text-[#1F4E8C] mx-auto" /> : <span className="text-[#8A99AD]">—</span>)}
                    </td>
                    
                    {/* Silver Column */}
                    <td className="p-4 sm:p-5 text-center font-medium">
                      {typeof row.silv === 'string' ? row.silv : (row.silv ? <Check size={16} className="text-[#1F4E8C] mx-auto" /> : <span className="text-[#8A99AD]">—</span>)}
                    </td>
                    
                    {/* Bronze Column */}
                    <td className="p-4 sm:p-5 text-center font-medium">
                      {typeof row.bronz === 'string' ? row.bronz : (row.bronz ? <Check size={16} className="text-[#1F4E8C] mx-auto" /> : <span className="text-[#8A99AD]">—</span>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. SPONSORS / PARTNERS LOGOS */}
      <section className="py-24 bg-brand-cloud border-b border-slate-100 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4 text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              Sponsors &amp; Partners
            </h2>
            <div className="w-16 h-[2px] bg-brand-orange mx-auto" />
            <p className="text-slate-600 leading-relaxed text-sm max-w-xl mx-auto">
              Our partners supporting SANKALP 2027 in advancing sustainable technology development.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div 
                key={item}
                className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl aspect-[16/9] flex items-center justify-center text-xs text-[#8A99AD] font-bold uppercase tracking-wider shadow-sm select-none"
              >
                Your Logo Here
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BECOME A SPONSOR CTA */}
      <section className="py-24 bg-brand-blue text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:16px_16px]" />
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold uppercase tracking-tight">
              Become a Sponsor
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full" />
          </div>

          <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto leading-relaxed font-medium">
            We offer multiple sponsorship categories with attractive branding, exhibition, speaking, networking, and recruitment opportunities. We would be delighted to customize a sponsorship package that aligns with your organization's objectives.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="mailto:amit.sinhal@jklu.edu.in?subject=SANKALP 2027 Sponsorship Kit Request"
              className="w-full sm:w-auto text-center bg-brand-orange text-white font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-orange-600 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md cursor-pointer text-sm"
            >
              Request Sponsorship Kit
            </a>
            <a 
              href="#contact"
              className="w-full sm:w-auto text-center bg-white text-brand-ink font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-slate-100 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md cursor-pointer text-sm"
            >
              Contact Committee
            </a>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4 text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              Sponsorship Contact
            </h2>
            <div className="w-16 h-[2px] bg-brand-orange mx-auto" />
            <p className="text-slate-600 leading-relaxed text-sm max-w-xl mx-auto">
              For sponsorship inquiries, customized packages, or further details, please reach out to the committee lead.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-[18px] p-8 sm:p-10 shadow-sm flex flex-col gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest block">Sponsorship Team Chair</span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-blue leading-tight">Dr. Amit Sinhal</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                  Institute of Engineering &amp; Technology, JK Lakshmipat University
                </p>
              </div>

              <div className="w-full h-[1px] bg-[#E6E8EC]/80" />

              <div className="space-y-4 text-sm text-slate-700 font-sans font-medium">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-brand-orange shrink-0" />
                  <a href="mailto:amit.sinhal@jklu.edu.in" className="hover:text-brand-orange transition-colors">
                    amit.sinhal@jklu.edu.in
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Globe size={16} className="text-[#8A99AD] shrink-0" />
                  <a 
                    href="https://www.jklu.edu.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-[#8A99AD] hover:text-brand-orange transition-colors flex items-center gap-1"
                  >
                    www.jklu.edu.in <ExternalLink size={12} />
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
