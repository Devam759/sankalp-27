'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FileText, Calendar, MapPin, ChevronRight, Check } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import { 
  conferenceDates, 
  keyFeatures, 
  committeeMembers, 
  registrationFees 
} from '@/constants/conferenceData';

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const points = [
    'Outcome-based and experiential learning',
    'Global academic collaborations and exchange opportunities',
    'Research-driven innovation and entrepreneurship',
    'Industry engagement and real-world problem solving',
    'Holistic development and leadership cultivation'
  ];

  return (
    <main className="min-h-screen text-brand-cloud font-sans selection:bg-brand-orange selection:text-white pt-24">
      <Navbar />

      {/* HERO SECTION - Left/Right Split */}
      <section id="home" className="relative flex items-center justify-center py-16 md:py-24 px-6 overflow-hidden min-h-[75vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 bg-brand-blue/10"></div>

        <div className="z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-start text-left"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block border border-brand-orange/30 text-brand-orange bg-brand-orange/5 px-4 py-1 text-xs font-bold tracking-widest uppercase mb-4">
                JK Lakshmipat University
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white mb-4">
                SANKALP '27
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-brand-cloud/90 text-lg md:text-xl font-medium tracking-wide mb-8 leading-relaxed max-w-lg">
                International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-brand-cloud/80 font-medium mb-12 text-sm md:text-base border-l-2 border-brand-orange pl-4">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-brand-orange" />
                <span>5–6 March 2027</span>
              </div>
              <div className="hidden sm:block text-slate-300">|</div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-brand-orange" />
                <span>Hybrid Mode</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/submission" className="bg-brand-orange text-white font-bold py-3 px-8 rounded-sm hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-lg shadow-brand-orange/20">
                Submit Paper <ChevronRight size={18} />
              </Link>
              <Link href="/call-for-papers" className="bg-transparent text-brand-orange border border-brand-orange font-bold py-3 px-8 rounded-sm hover:bg-brand-orange hover:text-white transition-colors">
                Explore Conference
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex justify-end relative"
          >
            {/* Professional Abstract Geometric Graphic */}
            <div className="relative w-[450px] h-[450px]">
              <div className="absolute inset-0 border-[1px] border-brand-blue/10 rounded-full" />
              <div className="absolute inset-4 border-[1px] border-brand-blue/10 rounded-full" />
              <div className="absolute inset-8 border-[1px] border-brand-blue/10 rounded-full" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 rotate-45 border border-brand-blue/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white border border-brand-orange/30 shadow-sm flex items-center justify-center p-8">
                <Image
                  src="/logos/jklu_logo.svg"
                  alt="JKLU Logo"
                  width={150}
                  height={50}
                  className="opacity-80 grayscale contrast-125"
                />
              </div>

              {/* Decorative nodes */}
              <div className="absolute top-10 right-20 w-3 h-3 bg-brand-orange rounded-none" />
              <div className="absolute bottom-20 left-10 w-2 h-2 bg-brand-blue rounded-none" />
              <div className="absolute top-1/2 right-10 w-4 h-4 border border-brand-blue rounded-none" />
            </div>
          </motion.div>

        </div>
      </section>



      {/* EDITORIAL THREE COLUMN INFO SECTION */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-slate-200">
          
          {/* Left: Welcome */}
          <div className="bg-brand-blue p-10 text-white flex flex-col justify-center relative overflow-hidden group">
            <h3 className="text-2xl font-serif font-bold mb-4">Welcome to SANKALP 2027</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              SANKALP 2027 is a premier international multidisciplinary conference hosted by JK Lakshmipat University, designed to bring together researchers, academicians, industry experts, policymakers, innovators, and students from across the globe.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              The conference aims to foster collaboration and knowledge exchange at the intersection of emerging technologies, sustainability, innovation, and future-ready systems.
            </p>
          </div>

          {/* Center: Latest Information */}
          <div className="bg-brand-orange p-10 flex flex-col border-r border-b lg:border-b-0 border-brand-orange/80 group">
            <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-blue"></span>
              Latest Updates
            </h3>
            <ul className="space-y-5 flex-grow">
              {[
                'Call for Papers opens on 15 July 2026',
                'Full paper submission deadline: 31 October 2026',
                'Conference mode: Hybrid',
                'Registration details announced'
              ].map((info, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brand-blue mt-1"><Check size={16} /></span>
                  <span className="text-white text-sm leading-relaxed font-semibold">{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Important Dates (Timeline) */}
          <div id="important-dates" className="bg-brand-blue/95 p-10 flex flex-col">
            <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-orange"></span>
              Key Dates
            </h3>
            <div className="relative border-l border-brand-orange/40 ml-2 space-y-6 flex-grow">
              {conferenceDates.map((dateItem, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-brand-orange rounded-none"></div>
                  <span className="block text-xs font-bold text-brand-orange/90 uppercase tracking-wider mb-1">{dateItem.label}</span>
                  <span className="block text-white font-semibold text-sm">{dateItem.date}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </Section>

      {/* CONFERENCE HIGHLIGHTS - DARK SECTION FOR VISUAL RELIEF */}
      <Section title="Conference Highlights" className="bg-brand-blue text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-blue border border-brand-orange/20 p-8 hover:bg-blue-950 transition-colors group cursor-default shadow-sm"
            >
              <div className="w-10 h-10 border border-brand-orange/40 text-brand-orange flex items-center justify-center mb-6 font-serif font-bold text-lg group-hover:bg-brand-orange group-hover:text-white transition-colors">
                0{i + 1}
              </div>
              <h4 className="text-lg font-bold text-slate-100 leading-snug">{feature.title}</h4>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* COMMITTEE */}
      <Section id="committee" title="Conference Committee">
        <div className="max-w-[1200px] mx-auto space-y-12">
          
          {/* Patrons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-blue/5 p-6 border border-brand-blue/20 hover:bg-brand-blue hover:text-white transition-colors group">
              <p className="text-xs font-bold text-brand-orange uppercase mb-3 tracking-widest">{committeeMembers.chiefPatron.role}</p>
              <h4 className="text-lg font-serif font-bold text-brand-blue group-hover:text-white">{committeeMembers.chiefPatron.name}</h4>
            </div>
            <div className="bg-brand-blue/5 p-6 border border-brand-blue/20 hover:bg-brand-blue hover:text-white transition-colors group">
              <p className="text-xs font-bold text-brand-orange uppercase mb-3 tracking-widest">{committeeMembers.chiefCoPatron.role}</p>
              <h4 className="text-lg font-serif font-bold text-brand-blue group-hover:text-white">{committeeMembers.chiefCoPatron.name}</h4>
            </div>
            <div className="bg-brand-orange/10 p-6 border border-brand-orange/20 hover:bg-brand-orange hover:text-white transition-colors group">
              <p className="text-xs font-bold text-brand-orange uppercase mb-3 tracking-widest group-hover:text-brand-blue">{committeeMembers.patron.role}</p>
              <h4 className="text-lg font-serif font-bold text-brand-blue group-hover:text-white mb-1">{committeeMembers.patron.name}</h4>
              <p className="text-brand-blue/70 group-hover:text-white/80 text-xs font-medium">{committeeMembers.patron.title}</p>
            </div>
          </div>

          {/* Chairs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {committeeMembers.chairs.map((chair, i) => (
              <div key={i} className="bg-brand-blue text-white p-6 border border-brand-blue hover:bg-brand-blue/90 transition-shadow flex flex-col justify-center text-center">
                <p className="text-xs font-bold text-brand-orange uppercase mb-3 tracking-widest">{chair.role}</p>
                <h4 className="text-xl font-serif font-bold text-white mb-1">{chair.name}</h4>
                <p className="text-slate-300 text-xs font-medium">{chair.title}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-orange text-white p-6 border border-brand-orange text-center hover:bg-brand-orange/90 transition-shadow">
            <p className="text-xs font-bold text-brand-blue uppercase mb-3 tracking-widest">Program Chairs</p>
            <h4 className="text-lg font-serif font-bold text-white">{committeeMembers.programChairs}</h4>
          </div>

          {/* Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
            <div className="border-2 border-brand-blue/30 bg-brand-blue/5 p-6 text-center text-brand-blue text-sm font-bold uppercase tracking-wider">International Advisory Board</div>
            <div className="border-2 border-brand-orange/30 bg-brand-orange/5 p-6 text-center text-brand-orange text-sm font-bold uppercase tracking-wider">National Advisory Board</div>
            <div className="border-2 border-brand-blue/30 bg-brand-blue/5 p-6 text-center text-brand-blue text-sm font-bold uppercase tracking-wider">Internal Committees</div>
          </div>

        </div>
      </Section>

      {/* REGISTRATION & VENUE */}
      <Section id="registration" title="Registration & Venue">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Registration */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-brand-blue mb-6">Registration Fees</h3>
            <div className="overflow-hidden border border-brand-blue/20 bg-brand-blue/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-blue text-white">
                    <th className="p-4 font-semibold text-sm border-b border-brand-blue/50">Category</th>
                    <th className="p-4 font-semibold text-sm border-b border-brand-blue/50">National</th>
                    <th className="p-4 font-semibold text-sm border-b border-brand-blue/50">International</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-blue/10">
                  {registrationFees.map((fee, i) => (
                    <tr key={i} className="hover:bg-brand-blue/10 transition-colors">
                      <td className="p-4 text-sm font-bold text-brand-blue">{fee.category}</td>
                      <td className="p-4 text-sm text-brand-orange font-bold">{fee.national}</td>
                      <td className="p-4 text-sm text-brand-orange font-bold">{fee.international}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-brand-orange text-xs text-white border-t border-brand-orange/20 font-semibold">
                * Registration fees are tentative and subject to final confirmation.
              </div>
            </div>
          </div>

          {/* Venue & Contact */}
          <div className="space-y-8 flex flex-col justify-between" id="venue">
            <div className="bg-brand-orange p-8 border border-brand-orange text-white">
              <h3 className="text-xl font-serif font-bold text-white mb-1">JK Lakshmipat University</h3>
              <p className="text-brand-blue text-sm font-black uppercase tracking-wider mb-6">Jaipur, India</p>
              <p className="text-white/90 text-sm leading-relaxed mb-8">
                Located in the vibrant city of Jaipur, JKLU offers a modern academic environment with state-of-the-art infrastructure, research facilities, innovation labs, and collaborative learning spaces.
              </p>
            </div>

            <div id="contact" className="bg-brand-blue p-8 text-white">
              <h3 className="text-xl font-serif font-bold mb-6">Contact Information</h3>
              <div className="space-y-3 text-slate-300 text-sm font-medium">
                <p><strong className="text-white">SANKALP 2027 Conference</strong></p>
                <p>JK Lakshmipat University, Jaipur, India</p>
                <p><strong>Email:</strong> conference@jklu.edu.in</p>
                <p><strong>Website:</strong> sankalp.jklu.edu.in</p>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <Footer />
    </main>
  );
}
