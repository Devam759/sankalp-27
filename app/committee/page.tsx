'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { committeeMembers, advisoryBoard, technicalProgramCommittee, trackChairs, organizingSubCommittees } from '@/constants/conferenceData';

/* ─── Animation presets ─────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease } } };
const stagger = (delay = 0): Variants => ({ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: delay } } });

/* ─── Static data ─────────────────────────────────────────────── */
const institutions = [
  'Georgia Institute of Technology', 'Toronto Metropolitan University', 'Curtin University',
  'IIT Madras', 'IIT Delhi', 'IIT Roorkee', 'IIT Ropar', 'IIT (ISM) Dhanbad',
  'IIIT Delhi', 'IIITM Gwalior', 'IISc Bengaluru', 'IIM Visakhapatnam',
  'University of Cambridge', 'University of Tokyo', 'NUS Singapore', 'Monash University',
  'Villanova University', 'Goldsmiths, University of London', 'Asia University Taiwan',
  'Copenhagen Business School', 'University of Thessaly', 'Amity University',
  'TCS Research', 'NVIDIA', 'Google', 'IBM Research', 'Microsoft Corporation',
];

/* ─── Initials avatar ─────────────────────────────────────────── */
const AVATAR_COLORS = [
  'bg-brand-blue text-white', 'bg-brand-orange text-white',
  'bg-slate-700 text-white', 'bg-teal-700 text-white',
  'bg-rose-800 text-white', 'bg-indigo-700 text-white',
];
function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name.split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase();
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

/* ─── Main Page Component ─────────────────────────────────────── */
export default function MindsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* SECTION 1 — FORMAL OPENING & HERO */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-12 md:pb-16 w-full text-center flex flex-col items-center">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.12 }}
          className="font-serif font-bold text-brand-blue text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-5"
        >
          Conference Committees
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={heroInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="w-16 h-[2px] bg-brand-orange mb-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, ease, delay: 0.35 }}
          className="text-slate-600 font-medium text-base sm:text-lg md:text-xl max-w-2xl text-center leading-relaxed"
        >
          The distinguished researchers, academic leaders, advisory boards, and organizing committees guiding the scientific excellence of SANKALP 2027.
        </motion.p>
      </div>
      </section>

      {/* SECTION 2 — LEADERSHIP COMMITTEE */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">

          {/* Section Header */}
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20 text-center">
            <motion.div variants={fadeUp} className="w-12 h-[3px] bg-brand-orange mx-auto mb-6 rounded-full" />
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-brand-blue text-3xl sm:text-4xl md:text-5xl leading-tight mb-5">
              Leadership Committee
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              The distinguished academics and institutional leaders who steer the governance, academic standards, and overarching vision of SANKALP 2027.
            </motion.p>
          </motion.div>

          {/* ── Tier 1: Patrons ── */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-slate-500">Patrons</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {[
                { role: 'Chief Patron', name: committeeMembers.chiefPatron.name, institution: committeeMembers.chiefPatron.title, image: committeeMembers.chiefPatron.image },
                { role: 'Chief Co-Patron', name: committeeMembers.chiefCoPatrons[0].name, institution: committeeMembers.chiefCoPatrons[0].title, image: committeeMembers.chiefCoPatrons[0].image },
                { role: 'Chief Co-Patron', name: committeeMembers.chiefCoPatrons[1].name, institution: committeeMembers.chiefCoPatrons[1].title, image: committeeMembers.chiefCoPatrons[1].image },
                { role: 'Patron', name: committeeMembers.patron.name, institution: committeeMembers.patron.title, image: committeeMembers.patron.image },
              ].map((member, i) => (
                <motion.div
                  key={`patron-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group bg-white rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center shadow-lg shadow-slate-100/80 border border-slate-200/80 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Portrait Container */}
                  <div className="relative mb-8">
                    {/* Ring decoration */}
                    <div className="absolute -inset-[12px] rounded-full border border-slate-200 group-hover:border-brand-orange/50 transition-colors duration-500" />
                    <div className="absolute -inset-[6px] rounded-full border border-brand-orange/30 group-hover:border-brand-orange transition-colors duration-500" />
                    
                    {/* Image frame */}
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-105 bg-slate-100 flex items-center justify-center">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={224}
                          height={224}
                          unoptimized
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-blue flex items-center justify-center">
                          <span className="text-white font-serif font-black text-4xl md:text-5xl">
                            {member.name.split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col items-center">
                    <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-2.5 block">{member.role}</span>
                    <h3 className="font-serif font-bold text-brand-blue text-xl md:text-2xl leading-tight mb-3 group-hover:text-brand-orange transition-colors duration-300 min-h-[56px] flex items-center justify-center text-center">
                      {member.name}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed">
                      {member.institution}
                    </p>
                  </div>

                  {/* Bottom elegant bar decoration */}
                  <div className="mt-8 w-16 h-[3px] bg-slate-200 rounded-full group-hover:w-28 group-hover:bg-brand-orange transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200/80 mb-20" />

          {/* ── Tier 2: Conference Chairs ── */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-slate-500">Conference Chairs</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto w-full">
              {[
                { role: committeeMembers.chairs[0].role, name: committeeMembers.chairs[0].name, institution: committeeMembers.chairs[0].title, image: committeeMembers.chairs[0].image },
                { role: committeeMembers.chairs[1].role, name: committeeMembers.chairs[1].name, institution: committeeMembers.chairs[1].title, image: committeeMembers.chairs[1].image },
              ].map((member, i) => (
                <motion.div
                  key={`chair-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group bg-white rounded-[32px] p-8 md:p-12 flex flex-col sm:flex-row items-center gap-8 shadow-lg shadow-slate-100/80 border border-slate-200/80 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Portrait */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-[10px] rounded-full border-2 border-brand-orange/20 group-hover:border-brand-orange/60 transition-colors duration-500" />
                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={176}
                        height={176}
                        unoptimized
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center sm:text-left flex-1">
                    <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.25em] block mb-2">{member.role}</span>
                    <h3 className="font-serif font-bold text-brand-blue text-2xl md:text-3xl leading-tight mb-3 group-hover:text-brand-orange transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed font-sans">
                      {member.institution}
                    </p>
                    <div className="mt-6 w-12 h-[3px] bg-slate-200 rounded-full group-hover:w-24 group-hover:bg-brand-orange transition-all duration-500 mx-auto sm:mx-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200/80 mb-20" />

          {/* ── Tier 3: Program Chairs ── */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-slate-500">Program Chairs</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {[
                { name: 'Prof. Amit Kumar Sinhal', track: 'Institute of Engineering and Technology', image: '/Images/committee/amit_sinhal_real.png' },
                { name: 'Prof. Devika Kataria', track: 'Institute of Engineering and Technology', image: '/Images/committee/devika_kataria_real.png' },
                { name: 'Prof. Taruna Sunil', track: 'Institute of Engineering and Technology', image: '/Images/committee/taruna_sunil_real.png' },
                { name: 'Prof. Umesh Gupta', track: 'Institute of Engineering and Technology', image: '/Images/committee/umesh_gupta_real.png' },
              ].map((member, i) => (
                <motion.div
                  key={`prog-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease }}
                  className="group bg-white border border-slate-200/80 rounded-[28px] p-8 md:p-10 flex flex-col items-center text-center shadow-lg shadow-slate-100/60 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-[8px] rounded-full border-2 border-dashed border-slate-300 group-hover:border-brand-orange/60 transition-colors duration-500" />
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-brand-orange/60 transition-colors duration-500">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={144}
                        height={144}
                        unoptimized
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-brand-blue text-lg md:text-xl leading-snug mb-2 group-hover:text-brand-orange transition-colors duration-300">{member.name}</h3>
                  <span className="text-brand-orange text-xs font-bold uppercase tracking-[0.2em] block mb-2">Program Chair</span>
                  <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">{member.track}</p>
                  <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-wider">IET &middot; JKLU</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2.5 — ADVISORY BOARDS & COMMITTEES */}
      <section className="py-24 md:py-32 border-t border-slate-200/80 bg-[#f4f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20 text-center">
            <motion.div variants={fadeUp} className="w-12 h-[3px] bg-brand-orange mx-auto mb-6 rounded-full" />
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-brand-blue text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">Advisory Boards &amp; Scientific Committees</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Eminent researchers and experts from premier global universities and industry research labs providing academic oversight.
            </motion.p>
          </motion.div>

          {/* International Advisory Board */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[2px] bg-brand-orange" />
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-brand-blue tracking-tight">International Advisory Board</h3>
              <div className="flex-1 h-px bg-slate-300/80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...advisoryBoard.international].sort((a, b) => {
                const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                return nameA.localeCompare(nameB);
              }).map((member, i) => {
                const initials = member.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase();
                return (
                  <motion.div 
                    key={`intl-${i}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                    className="bg-white p-7 md:p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-orange/50 transition-all duration-300 group flex items-start gap-5"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-blue text-white font-serif font-bold text-xl md:text-2xl flex items-center justify-center shrink-0 shadow-md group-hover:bg-brand-orange transition-colors duration-300">
                      {initials}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-brand-blue text-lg md:text-xl mb-1.5 group-hover:text-brand-orange transition-colors leading-snug">{member.name}</h4>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-semibold">{member.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* National Advisory Board */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[2px] bg-brand-orange" />
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-brand-blue tracking-tight">National Advisory Board</h3>
              <div className="flex-1 h-px bg-slate-300/80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...advisoryBoard.national].sort((a, b) => {
                const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                return nameA.localeCompare(nameB);
              }).map((member, i) => {
                const initials = member.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase();
                return (
                  <motion.div 
                    key={`natl-${i}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                    className="bg-white p-7 md:p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-orange/50 transition-all duration-300 group flex items-start gap-5"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-orange text-white font-serif font-bold text-xl md:text-2xl flex items-center justify-center shrink-0 shadow-md group-hover:bg-brand-blue transition-colors duration-300">
                      {initials}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-brand-blue text-lg md:text-xl mb-1.5 group-hover:text-brand-orange transition-colors leading-snug">{member.name}</h4>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-semibold">{member.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Technical Program Committee */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[2px] bg-brand-orange" />
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-brand-blue tracking-tight">Technical Program Committee</h3>
              <div className="flex-1 h-px bg-slate-300/80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {technicalProgramCommittee.map((member, i) => {
                const initials = member.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase();
                return (
                  <motion.div 
                    key={`tpc-${i}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                    className="bg-white p-7 md:p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-orange/50 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-brand-blue font-serif font-bold text-lg flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-brand-orange transition-colors">
                        {initials}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-brand-blue text-lg md:text-xl mb-1 group-hover:text-brand-orange transition-colors leading-snug">{member.name}</h4>
                        <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed">{member.institution}, {member.country}</p>
                      </div>
                    </div>
                    <span className="inline-block text-xs font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3 py-1.5 rounded-full uppercase tracking-wider self-start">
                      {member.area}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Organizing Sub-Committees */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[2px] bg-brand-orange" />
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-brand-blue tracking-tight">Organizing Sub-Committees</h3>
              <div className="flex-1 h-px bg-slate-300/80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {organizingSubCommittees.map((committee, i) => (
                <motion.div 
                  key={`osc-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                  className="bg-white p-7 md:p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-orange/50 transition-all duration-300 group"
                >
                  <h4 className="font-serif font-bold text-brand-blue text-xl mb-4 group-hover:text-brand-orange transition-colors border-b border-slate-100 pb-3">
                    {committee.name}
                  </h4>
                  <ul className="space-y-2.5">
                    {committee.members.map((member, mIdx) => (
                      <li key={mIdx} className="text-slate-700 text-sm md:text-base font-medium flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — INSTITUTION WALL */}
      <section className="py-32 md:py-40 bg-brand-blue text-white overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
            <motion.div variants={fadeUp} className="w-12 h-[3px] bg-brand-orange mb-8 rounded-full" />
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight max-w-4xl">
              SANKALP draws from an ecosystem of over 30 globally recognized institutions.
            </motion.h2>
          </motion.div>
          <div className="border-t border-white/15 pt-16">
            <motion.div variants={stagger(0.04)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-x-12 gap-y-7">
              {institutions.map((inst, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                  className={`font-serif font-bold text-white/80 hover:text-white transition-colors duration-300 cursor-default select-none ${i % 5 === 0 ? 'text-2xl sm:text-3xl md:text-4xl' : i % 3 === 0 ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl md:text-2xl'}`}>
                  {inst}
                </motion.span>
              ))}
            </motion.div>
            <div className="mt-20 pt-10 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <span className="text-white/60 text-sm font-mono tracking-widest uppercase font-semibold">International &middot; National &middot; Industry Partners</span>
              <span className="text-brand-orange font-bold text-sm md:text-base tracking-widest uppercase">15+ Countries &middot; 30+ Universities &amp; Research Labs</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
