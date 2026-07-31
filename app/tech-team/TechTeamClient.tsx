'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

interface TeamMember {
  name: string;
  role: string;
  isHead?: boolean;
  description: string;
  highlights: string[];
}

export default function TechTeamClient() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Devam Gupta',
      role: 'Team Head & Lead Architect',
      isHead: true,
      description: 'Led the end-to-end architecture, payment system integration, backend infrastructure, and core performance optimization for the SANKALP 2027 Web Portal.',
      highlights: [
        'Full-Stack Architecture & Next.js 16 App Router Engine',
        'Cashfree PG & Server-Side Webhook Reconciliation',
        'Automated PDF Ticket & QR Code Generation Pipeline',
        'Office 365 SMTP Nodemailer Dispatch Engine',
      ],
    },
    {
      name: 'Manant',
      role: 'Technical Developer',
      isHead: false,
      description: 'Contributed to frontend component development, responsive interface styling, and user experience enhancements across public conference routes.',
      highlights: [
        'Responsive Layout Implementation',
        'UI Component Optimization & Accessibility Testing',
        'Cross-Browser Rendering & Mobile Compatibility',
      ],
    },
    {
      name: 'Pratham',
      role: 'Technical Developer',
      isHead: false,
      description: 'Assisted in technical data integration, static page structure verification, and content deployment for conference tracks and information modules.',
      highlights: [
        'Technical Content Structuring & Track Integration',
        'Static Data Management & Schema Validation',
        'Page Testing & Frontend Verification',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 bg-brand-blue text-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <h1 className="font-serif font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]">
              Technical Team Credits
            </h1>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-sm" />
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal pt-2">
              Recognizing the engineering team responsible for designing, building, and deploying the official SANKALP 2027 International Conference portal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TEAM CARDS SECTION */}
      <section className="py-16 sm:py-24 bg-white flex-grow border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue tracking-tight uppercase">
              Web Engineering &amp; Development Team
            </h2>
            <p className="text-slate-600 text-sm mt-2 font-medium">
              Institute of Engineering &amp; Technology (IET), JK Lakshmipat University, Jaipur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`flex flex-col justify-between p-8 border rounded-sm transition-all duration-300 ${
                  member.isHead
                    ? 'bg-brand-blue/5 border-brand-orange shadow-md relative'
                    : 'bg-slate-50/70 border-slate-200 hover:border-brand-blue/40 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm ${
                        member.isHead
                          ? 'bg-brand-orange text-white'
                          : 'bg-brand-blue/10 text-brand-blue'
                      }`}
                    >
                      {member.isHead ? 'Team Head' : 'Developer'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-brand-blue mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
                    {member.role}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                    {member.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                    Key Contributions
                  </span>
                  <ul className="space-y-2">
                    {member.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                        <span className="text-brand-orange font-bold text-sm leading-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
