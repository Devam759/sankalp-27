'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import { fadeUp, staggerContainer } from '@/lib/animations/variants';
import { committeeMembers, advisoryBoard, technicalProgramCommittee, organizingSubCommittees } from '@/constants/conferenceData';

const institutions = [
  'Georgia Institute of Technology', 'Toronto Metropolitan University', 'Curtin University',
  'IIT Madras', 'IIT Delhi', 'IIT Roorkee', 'IIT Ropar', 'IIT (ISM) Dhanbad',
  'IIIT Delhi', 'IIITM Gwalior', 'IISc Bengaluru', 'IIM Visakhapatnam',
  'University of Cambridge', 'University of Tokyo', 'NUS Singapore', 'Monash University',
  'Villanova University', 'Goldsmiths, University of London', 'Asia University Taiwan',
  'Copenhagen Business School', 'University of Thessaly', 'Amity University',
  'TCS Research', 'NVIDIA', 'Google', 'IBM Research', 'Microsoft Corporation',
];

export default function CommitteeClient() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* LEADERSHIP COMMITTEE */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16">

          <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 sm:mb-16 text-center flex flex-col items-center">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2.5 mb-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                <WordReveal text="Leadership Committee" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed font-normal mt-6">
              The distinguished academics and institutional leaders steering governance, academic standards, and overarching vision.
            </motion.p>
          </motion.div>

          {/* Tier 1: Patrons */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-brand-orange rounded-sm shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-brand-blue">Patrons</span>
              <div className="flex-1 h-px bg-slate-300" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { role: 'Chief Patron', name: committeeMembers.chiefPatron.name, institution: committeeMembers.chiefPatron.title, image: committeeMembers.chiefPatron.image },
                { role: 'Chief Co-Patron', name: committeeMembers.chiefCoPatrons[0].name, institution: committeeMembers.chiefCoPatrons[0].title, image: committeeMembers.chiefCoPatrons[0].image },
                { role: 'Chief Co-Patron', name: committeeMembers.chiefCoPatrons[1].name, institution: committeeMembers.chiefCoPatrons[1].title, image: committeeMembers.chiefCoPatrons[1].image },
                { role: 'Patron', name: committeeMembers.patron.name, institution: committeeMembers.patron.title, image: committeeMembers.patron.image },
              ].map((member, i) => (
                <Reveal
                  key={`patron-${i}`}
                  delay={i * 0.08}
                  className="bg-white rounded-sm p-6 sm:p-7 flex flex-col items-center text-center shadow-sm border border-slate-200"
                >
                  <div className="relative mb-5">
                    <div className="absolute -inset-[6px] rounded-full border border-slate-200" />
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white shadow-sm relative z-10 bg-slate-100 flex items-center justify-center">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={`${member.name} - ${member.role} SANKALP 2027 JKLU`}
                          title={`${member.name} - ${member.role} SANKALP 2027 JKLU`}
                          width={144}
                          height={144}
                          priority={i === 0}
                          loading={i === 0 ? 'eager' : 'lazy'}
                          unoptimized
                          className="object-cover object-top w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-blue flex items-center justify-center">
                          <span className="text-white font-serif font-black text-3xl">
                            {member.name.split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center w-full">
                    <span className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-sm mb-3 block">
                      {member.role}
                    </span>
                    <h3 className="font-serif font-bold text-brand-blue text-base sm:text-lg md:text-xl leading-tight mb-2 text-center min-h-[48px] flex items-center justify-center">
                      {member.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
                      {member.institution}
                    </p>
                  </div>

                  <div className="mt-5 w-10 h-[2px] bg-slate-200" />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200/80 mb-16 sm:mb-20" />

          {/* Tier 2: Conference Chairs */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-brand-orange rounded-sm shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-brand-blue">Conference Chairs</span>
              <div className="flex-1 h-px bg-slate-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
              {[
                { role: committeeMembers.chairs[0].role, name: committeeMembers.chairs[0].name, institution: committeeMembers.chairs[0].title, image: committeeMembers.chairs[0].image },
                { role: committeeMembers.chairs[1].role, name: committeeMembers.chairs[1].name, institution: committeeMembers.chairs[1].title, image: committeeMembers.chairs[1].image },
              ].map((member, i) => (
                <Reveal
                  key={`chair-${i}`}
                  delay={i * 0.08}
                  className="bg-white rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-slate-200"
                >
                  <div className="relative shrink-0">
                    <div className="absolute -inset-[6px] rounded-full border border-brand-orange/30" />
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white shadow-sm relative z-10">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role} SANKALP 2027 JKLU`}
                        title={`${member.name} - ${member.role} SANKALP 2027 JKLU`}
                        width={128}
                        height={128}
                        unoptimized
                        className="object-cover object-top w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <span className="text-brand-orange text-xs font-bold uppercase tracking-wider block mb-1.5">{member.role}</span>
                    <h3 className="font-serif font-bold text-brand-blue text-lg sm:text-xl md:text-2xl leading-tight mb-2">
                      {member.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
                      {member.institution}
                    </p>
                    <div className="mt-5 w-10 h-[2px] bg-slate-200 mx-auto sm:mx-0" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200/80 mb-16 sm:mb-20" />

          {/* Tier 3: Program Chairs */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-brand-orange rounded-sm shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-brand-blue">Program Chairs</span>
              <div className="flex-1 h-px bg-slate-300" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {[
                { name: 'Dr. Amit Kumar Sinhal', alt: 'Dr. Amit Kumar Sinhal - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/amit_sinhal.webp' },
                { name: 'Dr. Devika Kataria', alt: 'Dr. Devika Kataria - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/devika_kataria.webp' },
                { name: 'Dr. S. Taruna', alt: 'Dr. S. Taruna - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/taruna_sunil.webp' },
                { name: 'Dr. Umesh Gupta', alt: 'Dr. Umesh Gupta - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/umesh_gupta.webp' },
              ].map((member, i) => (
                <Reveal
                  key={`prog-${i}`}
                  delay={i * 0.08}
                  className="bg-white border border-slate-200 rounded-sm p-6 flex flex-col items-center text-center shadow-sm"
                >
                  <div className="relative mb-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <Image
                        src={member.image}
                        alt={member.alt || member.name}
                        title={member.alt || member.name}
                        width={112}
                        height={112}
                        unoptimized
                        className="object-cover object-top w-full h-full"
                      />
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-brand-blue text-base sm:text-lg leading-snug mb-1">{member.name}</h3>
                  <span className="text-brand-orange text-xs font-bold uppercase tracking-wider block">Program Chair</span>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ADVISORY BOARDS & COMMITTEES */}
      <section className="py-20 sm:py-24 border-t border-slate-200/80 bg-[#f4f0e8]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 text-center flex flex-col items-center">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                <WordReveal text="Advisory Boards & Scientific Committees" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-700 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-normal mt-6">
              Eminent researchers and experts from premier global universities and industry research labs providing academic oversight.
            </motion.p>
          </motion.div>

          <div className="mb-14">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2.5 h-2.5 bg-brand-orange rounded-sm shrink-0" />
              <h3 className="font-sans font-black text-base sm:text-lg md:text-xl text-brand-blue tracking-tight uppercase">International Advisory Board</h3>
              <div className="flex-1 h-px bg-slate-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[...advisoryBoard.international].sort((a, b) => {
                const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                return nameA.localeCompare(nameB);
              }).map((member, i) => {
                const initials = member.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase();
                return (
                  <Reveal
                    key={`intl-${member.name}-${i}`}
                    delay={(i % 3) * 0.06}
                    className="bg-white p-4 sm:p-5 rounded-sm border border-slate-200 shadow-sm flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-brand-blue text-sm sm:text-base mb-1 leading-snug truncate">{member.name}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-semibold">{member.title}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="mb-14">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2.5 h-2.5 bg-brand-orange rounded-sm shrink-0" />
              <h3 className="font-sans font-black text-base sm:text-lg md:text-xl text-brand-blue tracking-tight uppercase">National Advisory Board</h3>
              <div className="flex-1 h-px bg-slate-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[...advisoryBoard.national].sort((a, b) => {
                const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                return nameA.localeCompare(nameB);
              }).map((member, i) => {
                const initials = member.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase();
                return (
                  <Reveal
                    key={`natl-${member.name}-${i}`}
                    delay={(i % 3) * 0.06}
                    className="bg-white p-4 sm:p-5 rounded-sm border border-slate-200 shadow-sm flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-orange text-white font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-brand-blue text-sm sm:text-base mb-1 leading-snug truncate">{member.name}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-semibold">{member.title}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="mb-14">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2.5 h-2.5 bg-brand-orange rounded-sm shrink-0" />
              <h3 className="font-sans font-black text-base sm:text-lg md:text-xl text-brand-blue tracking-tight uppercase">Technical Program Committee</h3>
              <div className="flex-1 h-px bg-slate-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {technicalProgramCommittee.map((member, i) => {
                const initials = member.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase();
                return (
                  <Reveal
                    key={`tpc-${member.name}-${i}`}
                    delay={(i % 3) * 0.06}
                    className="bg-white p-4 sm:p-5 rounded-sm border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-brand-blue font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200 mt-0.5">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-brand-blue text-sm sm:text-base mb-0.5 leading-snug truncate">{member.name}</h4>
                        <p className="text-slate-600 text-xs font-medium leading-relaxed">{member.institution}, {member.country}</p>
                      </div>
                    </div>
                    <span className="inline-block text-[10px] font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-sm uppercase tracking-wider self-start">
                      {member.area}
                    </span>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2.5 h-2.5 bg-brand-orange rounded-sm shrink-0" />
              <h3 className="font-sans font-black text-base sm:text-lg md:text-xl text-brand-blue tracking-tight uppercase">Organizing Sub-Committees</h3>
              <div className="flex-1 h-px bg-slate-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {organizingSubCommittees.map((committee, i) => (
                <Reveal
                  key={`subcomm-${committee.name}-${i}`}
                  delay={(i % 3) * 0.06}
                  className="bg-white p-4 sm:p-5 rounded-sm border border-slate-200 shadow-sm"
                >
                  <h4 className="font-serif font-bold text-brand-blue text-base sm:text-lg mb-3 border-b border-slate-100 pb-2">
                    {committee.name}
                  </h4>
                  <ul className="space-y-2">
                    {committee.members.map((member, mIdx) => (
                      <li key={mIdx} className="text-slate-700 text-xs sm:text-sm font-medium flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* INSTITUTION WALL */}
      <section className="py-16 sm:py-24 bg-brand-blue text-white overflow-hidden relative">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <motion.div variants={fadeUp} className="w-10 h-[3px] bg-brand-orange mb-5 rounded-sm" />
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white leading-tight max-w-3xl">
              SANKALP draws from an ecosystem of over 30 globally recognized institutions.
            </motion.h2>
          </motion.div>
          <div className="border-t border-white/15 pt-10">
            <motion.div variants={staggerContainer(0.03)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-x-8 gap-y-4">
              {institutions.map((inst, i) => (
                <motion.span key={i} variants={fadeUp}
                  className={`font-serif font-bold text-white/80 select-none ${i % 5 === 0 ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base'}`}>
                  {inst}
                </motion.span>
              ))}
            </motion.div>
            <div className="mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-white/60 text-xs font-mono tracking-widest uppercase font-semibold">International &middot; National &middot; Industry Partners</span>
              <span className="text-brand-orange font-bold text-xs sm:text-sm tracking-wider uppercase">15+ Countries &middot; 30+ Universities &amp; Labs</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
