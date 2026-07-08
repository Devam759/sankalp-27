'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
  ChevronRight, 
  User, 
  GraduationCap, 
  BookOpen, 
  Building2, 
  Users, 
  Check,
  FileCheck,
  PenTool,
  CreditCard,
  Mail,
  CalendarCheck,
  Download,
  Upload,
  Phone,
  Clock
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function Registration() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const categories = [
    {
      title: "Author Registration",
      desc: "For authors with accepted papers.",
      eligibility: "Must have an accepted full paper.",
      icon: <PenTool size={24} className="text-brand-orange" />
    },
    {
      title: "Research Scholar / Student",
      desc: "For UG, PG, and PhD scholars.",
      eligibility: "Requires valid student ID.",
      icon: <GraduationCap size={24} className="text-brand-orange" />
    },
    {
      title: "Academician",
      desc: "Faculty members and researchers.",
      eligibility: "Institutional affiliation required.",
      icon: <BookOpen size={24} className="text-brand-orange" />
    },
    {
      title: "Industry Participant",
      desc: "Professionals from industry and R&D.",
      eligibility: "Corporate ID required.",
      icon: <Building2 size={24} className="text-brand-orange" />
    },
    {
      title: "Delegate",
      desc: "Participants attending without paper.",
      eligibility: "Open to all attendees.",
      icon: <Users size={24} className="text-brand-orange" />
    }
  ];

  const processSteps = [
    { title: "Paper Acceptance", desc: "Receive formal notification of paper acceptance from the review committee." },
    { title: "Complete Registration Form", desc: "Fill out the official online registration form with author and paper details." },
    { title: "Fee Payment", desc: "Complete the fee payment using the provided banking details or UPI." },
    { title: "Confirmation Email", desc: "Receive the official registration confirmation and receipt via email." },
    { title: "Conference Participation", desc: "Present your research and attend the SANKALP 2027 sessions." }
  ];

  const feeTable = [
    { category: "UG / PG Student & Research Scholar", national: "₹7,500", international: "USD 110" },
    { category: "Academician", national: "₹9,500", international: "USD 250" },
    { category: "Industry Participant", national: "₹12,500", international: "USD 350" },
    { category: "Offline Delegate", national: "₹6,500", international: "USD 150" },
    { category: "Online Delegate", national: "₹3,500", international: "USD 100" }
  ];

  const inclusions = [
    "Conference Kit",
    "Technical Sessions",
    "Keynote Lectures",
    "Conference Proceedings",
    "Networking Sessions",
    "Certificate of Participation",
    "Tea & Lunch (Offline)",
    "Digital Access (Online)"
  ];

  const guidelines = [
    "Registration is mandatory for all accepted papers.",
    "At least one author must register for each accepted paper.",
    "Registration becomes valid only after successful payment verification.",
    "Registration fees are non-transferable.",
    "Participants must carry valid identification during conference check-in."
  ];

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-24 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden min-h-[50vh] flex items-center bg-brand-cloud border-b border-brand-blue/10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 border-l border-brand-blue/10"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(brand-blue 1px, transparent 1px), linear-gradient(90deg, brand-blue 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
          
          <motion.div 
            initial="hidden" 
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUpVariant} className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[2px] bg-brand-orange"></div>
              <span className="text-brand-blue font-bold tracking-[0.2em] uppercase text-xs">
                Registration
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-blue leading-[1.2] mb-6">
              Conference Registration
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-base md:text-lg text-slate-700 leading-relaxed max-w-xl font-medium mb-10">
              Join SANKALP 2027 by registering as an Author, Delegate, Academician, Research Scholar, or Industry Professional.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="border-l-2 border-brand-orange pl-4">
                <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Conference Dates</p>
                <p className="text-brand-blue font-bold">5–6 March 2027</p>
              </div>
              <div className="border-l-2 border-brand-orange pl-4">
                <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Mode</p>
                <p className="text-brand-blue font-bold">Hybrid Conference</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <Link href="#register" className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold py-3.5 px-8 rounded-none hover:bg-orange-600 transition-colors shadow-sm">
                Register Now <ChevronRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:flex justify-end relative h-[400px]"
          >
            {/* Abstract Premium Visual */}
            <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border border-brand-blue/20 rotate-3 bg-white shadow-sm"></div>
              <div className="absolute inset-0 border border-brand-orange/30 -rotate-2"></div>
              <div className="relative z-10 w-full h-full bg-brand-blue p-8 flex flex-col items-center justify-center border border-brand-blue shadow-xl">
                 <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                 {/* Geometric network abstraction */}
                 <div className="w-48 h-48 relative">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-orange rounded-none"></div>
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-2 border-white rounded-none"></div>
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-none"></div>
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-40 bg-white/20 origin-top -rotate-[35deg]"></div>
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-40 bg-white/20 origin-top rotate-[35deg]"></div>
                   <div className="absolute bottom-2 left-2 w-44 h-px bg-white/20"></div>
                 </div>
                 <span className="mt-8 text-white/50 tracking-[0.3em] font-mono text-xs uppercase">Sankalp 2027 Portal</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* REGISTRATION INTRODUCTION */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif font-bold text-brand-blue mb-8">Who Can Register?</h2>
            <div className="w-16 h-[1px] bg-brand-orange mx-auto mb-10"></div>
            <p className="text-lg text-slate-700 leading-relaxed font-medium mb-6">
              SANKALP 2027 welcomes researchers, academicians, students, industry professionals, innovators, and delegates from around the world to participate in this international conference.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed font-medium">
              Participants may register to present accepted research papers or attend technical sessions, keynote talks, workshops, and networking opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* REGISTRATION CATEGORIES */}
      <section id="register" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12">
          
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-blue uppercase tracking-wide">
              Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-slate-200 border-t-4 border-t-slate-200 p-8 hover:border-brand-orange hover:border-t-brand-orange transition-colors group flex flex-col h-full shadow-sm"
              >
                <div className="mb-6">{cat.icon}</div>
                <h3 className="text-xl font-bold text-brand-blue mb-3">{cat.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{cat.desc}</p>
                
                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Eligibility</p>
                  <p className="text-sm text-slate-700 font-medium mb-8">{cat.eligibility}</p>
                  <button className="w-full border border-brand-blue text-brand-blue font-bold py-3 px-6 uppercase text-xs tracking-widest hover:bg-brand-blue hover:text-white transition-colors">
                    Register
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* REGISTRATION PROCESS & FEES */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Timeline - Left Column */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-serif font-bold text-brand-blue uppercase tracking-wide mb-12">
              Registration Process
            </h2>
            
            <div className="relative border-l border-brand-orange/30 ml-4 space-y-12">
              {processSteps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-10"
                >
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-brand-orange rounded-none"></div>
                  <span className="block text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">Step 0{i+1}</span>
                  <h4 className="text-lg font-bold text-brand-blue mb-2">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fee Table - Right Column */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-serif font-bold text-brand-blue uppercase tracking-wide mb-12">
              Registration Fees
            </h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="overflow-hidden border border-slate-300">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      <th className="p-5 font-bold text-sm tracking-wider uppercase border-b border-brand-blue/50">Category</th>
                      <th className="p-5 font-bold text-sm tracking-wider uppercase border-b border-brand-blue/50">National</th>
                      <th className="p-5 font-bold text-sm tracking-wider uppercase border-b border-brand-blue/50">International</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {feeTable.map((fee, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors group">
                        <td className="p-5 text-sm font-semibold text-slate-800 border-r border-slate-200">{fee.category}</td>
                        <td className="p-5 text-sm font-bold text-brand-orange border-r border-slate-200">{fee.national}</td>
                        <td className="p-5 text-sm font-bold text-brand-orange">{fee.international}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs font-bold text-slate-400 italic">
                * Registration fees are tentative and subject to revision.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* WHAT IS INCLUDED & GUIDELINES */}
      <section className="py-24 bg-brand-cloud border-b border-slate-300">
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* What is Included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 border border-slate-200 shadow-sm"
          >
            <h3 className="text-2xl font-serif font-bold text-brand-blue mb-8">Registration Includes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {inclusions.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={18} className="text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Important Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 border border-slate-200 shadow-sm"
          >
            <h3 className="text-2xl font-serif font-bold text-brand-blue mb-8">Important Guidelines</h3>
            <ul className="space-y-5">
              {guidelines.map((guide, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 bg-brand-orange shrink-0 mt-2 rounded-none"></span>
                  <span className="text-slate-700 text-sm leading-relaxed">{guide}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* PAYMENT & CONTACT */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Payment Information */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10">
               <h2 className="text-3xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                 Payment Information
               </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-slate-200 p-8 bg-slate-50"
              >
                <h4 className="font-bold text-brand-blue mb-6 border-b border-slate-200 pb-3">Bank Transfer</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex flex-col"><span className="text-slate-400 text-xs font-bold uppercase mb-1">Account Name</span><span className="font-semibold text-slate-800">[Account Name]</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs font-bold uppercase mb-1">Bank Name</span><span className="font-semibold text-slate-800">[Bank Name]</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs font-bold uppercase mb-1">Account Number</span><span className="font-semibold text-slate-800 font-mono">[0000 0000 0000]</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs font-bold uppercase mb-1">IFSC Code</span><span className="font-semibold text-slate-800 font-mono">[IFSC0000000]</span></div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="border border-slate-200 p-8 flex flex-col items-center justify-center text-center bg-slate-50"
              >
                <div className="w-32 h-32 border-2 border-dashed border-slate-300 mb-6 flex items-center justify-center bg-white">
                   <span className="text-xs text-slate-400 font-bold uppercase text-center px-4">UPI QR<br/>Placeholder</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-2">Scan to Pay via UPI</p>
                <p className="text-xs text-slate-500">Supported by all major UPI apps</p>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 border border-brand-blue text-brand-blue font-bold py-3 px-6 uppercase text-xs tracking-widest hover:bg-brand-blue hover:text-white transition-colors">
                <Download size={16} /> Download Payment Details
              </button>
              <button className="flex items-center gap-2 bg-brand-orange text-white font-bold py-3 px-6 uppercase text-xs tracking-widest hover:bg-orange-600 transition-colors">
                <Upload size={16} /> Upload Payment Receipt
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-brand-blue text-white p-10 h-full flex flex-col"
            >
              <h3 className="text-2xl font-serif font-bold mb-8">Need Assistance?</h3>
              
              <div className="space-y-8 flex-grow">
                <div>
                  <p className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-2">Committee</p>
                  <p className="font-semibold text-lg">Registration Committee</p>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="text-brand-orange mt-1 shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Email</p>
                    <p className="font-medium">registration@sankalp.jklu.edu.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-brand-orange mt-1 shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Phone</p>
                    <p className="font-medium">+91 [Number Placeholder]</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-brand-orange mt-1 shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Response Time</p>
                    <p className="font-medium">Within 2 Working Days</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10"></div>
        
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
              Ready to Participate in SANKALP 2027?
            </h2>
            <p className="text-lg text-brand-cloud/80 leading-relaxed font-medium mb-12">
              Become part of an international platform dedicated to advancing research, collaboration, and innovation in Artificial Intelligence and emerging technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-brand-orange text-white font-bold py-4 px-10 uppercase text-sm tracking-widest hover:bg-orange-600 transition-colors shadow-lg">
                Register Now
              </button>
              <button className="border border-white/30 text-white font-bold py-4 px-10 uppercase text-sm tracking-widest hover:bg-white hover:text-brand-blue transition-colors">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
