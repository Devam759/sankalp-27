'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function About() {
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

  const focusAreas = [
    { title: "Sustainable AI", desc: "Intelligent Systems & Responsible Digital Transformation." },
    { title: "Data Science", desc: "Generative AI & Knowledge Engineering." },
    { title: "HPC & Emerging Tech", desc: "High Performance Computing, Networks & Emerging Tech." },
    { title: "Smart Healthcare", desc: "Bioinformatics & Human-Centric AI." },
    { title: "AI in Education", desc: "K–12 Learning & Future Workforce Development." },
    { title: "Smart Society", desc: "Governance & Sustainable Innovation." },
    { title: "VLSI & Embedded", desc: "Semiconductor Technologies & Intelligent Engineering." }
  ];



  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-24 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* HERO SECTION - Premium Editorial */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden min-h-[60vh] flex items-center border-b border-slate-300">
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
          
          <div className="flex flex-col justify-center relative">

            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-blue leading-[1.2] mb-8">
              Advancing Sustainable AI,<br/>
              <span className="text-brand-orange">Innovation</span><br/>
              & Future-Ready Tech
            </h1>
            
            <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-xl font-medium border-l-2 border-brand-orange/30 pl-6">
              SANKALP 2027 brings together global researchers, academicians, industry experts, innovators, and policymakers to explore the future of intelligent technologies and sustainable digital transformation.
            </p>
          </div>

          <div className="hidden lg:flex justify-end relative h-[500px]">
            <div className="relative w-full h-full max-h-[500px] w-4/5 ml-auto">
              {/* Solid navy background block */}
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-blue z-0 border border-brand-orange/20">
                <div className="absolute inset-4 border border-white/10"></div>
              </div>
              
              {/* The Image */}
              <div className="relative z-10 w-full h-[90%] border border-slate-200 shadow-sm overflow-hidden bg-slate-100 flex items-center justify-center">
                <Image 
                  src="/Images/sankalp.webp" 
                  alt="SANKALP 2027 Committee" 
                  fill 
                  className="object-cover relative z-0"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: CONFERENCE OVERVIEW */}
      <section className="relative py-32 overflow-hidden bg-brand-cloud border-b border-brand-blue/10">
        
        {/* Giant Faded Typography */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.03, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 -left-10 text-[18vw] font-serif font-black text-brand-blue leading-none select-none pointer-events-none whitespace-nowrap z-0"
        >
          SANKALP 2027
        </motion.div>

        <div className="max-w-[1440px] w-full mx-auto relative z-10 px-6 lg:px-12">
          
          {/* Section Identifier */}
          <div className="flex justify-between items-end border-b border-brand-blue/10 pb-8 mb-16">
             <div className="flex gap-4 items-end">
               <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                 Overview
               </h2>
             </div>
             <span className="hidden md:block text-xs font-bold tracking-[0.3em] uppercase text-slate-400">
                Research / Collaboration / Innovation
             </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="prose prose-lg text-slate-700 max-w-none">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="leading-relaxed font-medium mb-12 relative text-justify text-xl"
                >
                  <span className="float-left text-[120px] font-serif text-brand-blue leading-[0.7] mr-6 mt-2">S</span>
                  ANKALP 2027 – International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction is a premier international multidisciplinary conference organized by the Institute of Engineering & Technology (IET), JK Lakshmipat University, Jaipur.
                </motion.p>
                
                <div className="w-full h-px bg-gradient-to-r from-brand-orange/50 to-transparent mb-12"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <p className="leading-relaxed text-base font-semibold text-brand-blue mb-2">Objective</p>
                    <p className="leading-relaxed text-base">
                      The conference aims to bring together distinguished academicians, researchers, industry leaders, innovators, policymakers, and students from across the world to discuss advancements in emerging technologies, sustainable innovation, and intelligent future-ready systems.
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                    <p className="leading-relaxed text-base font-semibold text-brand-blue mb-2">Impact</p>
                    <p className="leading-relaxed text-base">
                      Serving as a global platform for intellectual exchange, SANKALP 2027 encourages research collaboration, knowledge sharing, and exploration of technology-driven solutions addressing contemporary global challenges.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Narrow Column (Navy Abstract Block) */}
            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-brand-blue text-white p-12 relative overflow-hidden h-full min-h-[400px] flex flex-col justify-between shadow-2xl"
              >
                {/* Thin tech lines background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white"></div>
                  <div className="absolute right-1/4 top-0 bottom-0 w-px bg-white"></div>
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-white"></div>
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-white"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-bold leading-snug mb-8">
                    "A catalyst for global academic exchange and technological innovation."
                  </h3>
                  <div className="w-12 h-1 bg-brand-orange mb-8"></div>
                </div>

                <div className="relative z-10 mt-auto">
                  <h4 className="font-bold tracking-widest uppercase text-xs mb-6 text-brand-orange">
                    Key Pillars
                  </h4>
                  <div className="flex flex-col gap-4">
                    {[
                      { title: "Global Collaboration", icon: "01" },
                      { title: "Emerging Technologies", icon: "02" },
                      { title: "Industry Integration", icon: "03" },
                      { title: "Future-Ready Systems", icon: "04" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group cursor-default border-b border-white/10 pb-4 last:border-0 last:pb-0">
                        <span className="text-sm font-mono text-brand-orange">
                          {item.icon}
                        </span>
                        <span className="font-medium text-brand-cloud text-base group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: RESEARCH ECOSYSTEM (The Orbit) */}
      <section className="relative py-0 bg-brand-cloud overflow-hidden flex flex-col lg:flex-row min-h-[800px]">
        
        {/* Left Cream Content Area */}
        <div className="w-full lg:w-[45%] p-12 lg:p-24 flex flex-col justify-center relative z-10 border-r border-brand-blue/10">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <div className="flex items-center gap-4 mb-8">
               <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                 Ecosystem
               </h2>
             </div>
             
             <p className="text-lg text-slate-700 leading-relaxed mb-10 font-medium">
               Our multidisciplinary focus areas intersect to form a comprehensive research ecosystem driving the next generation of intelligent technologies.
             </p>

             <div className="space-y-6">
                {focusAreas.slice(0, 4).map((area, i) => (
                  <div key={i} className="flex flex-col border-l-2 border-brand-orange/30 pl-6 hover:border-brand-orange transition-colors">
                    <h4 className="text-brand-blue font-bold text-lg mb-1">{area.title}</h4>
                    <p className="text-slate-600 text-sm">{area.desc}</p>
                  </div>
                ))}
             </div>
           </motion.div>
        </div>

        {/* Right Navy Orbit Area */}
        <div className="w-full lg:w-[55%] bg-brand-blue relative flex items-center justify-center p-12 overflow-hidden shadow-inner">
           {/* Decorative layered circles */}
           <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
             <div className="w-[800px] h-[800px] rounded-full border-[1px] border-white/20 absolute"></div>
             <div className="w-[600px] h-[600px] rounded-full border-[1px] border-brand-orange/40 absolute"></div>
             <div className="w-[400px] h-[400px] rounded-full border-[1px] border-white/20 absolute bg-white/5"></div>
           </div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="relative z-10 w-full max-w-2xl aspect-square flex items-center justify-center"
           >
              {/* Central Core */}
              <div className="w-32 h-32 rounded-3xl bg-brand-orange flex items-center justify-center z-20 shadow-[0_0_40px_rgba(245,130,30,0.5)] border-4 border-brand-blue">
                <span className="text-brand-blue font-bold text-center text-sm leading-tight tracking-widest uppercase">Research<br/>Core</span>
              </div>

              {/* Orbiting Nodes mapping */}
              {focusAreas.map((area, i) => {
                const angle = (i * 360) / focusAreas.length;
                const radius = 220; // distance from center
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                    className="absolute flex items-center gap-3 group"
                    style={{
                      transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                    }}
                  >
                    {/* Node Dot */}
                    <div className="w-4 h-4 rounded-sm bg-white border-2 border-brand-orange relative z-10 group-hover:scale-150 transition-transform cursor-pointer">
                      {/* Connecting line to center */}
                      <div className="absolute top-1/2 right-full w-24 h-px bg-brand-orange/30 -translate-y-1/2 pointer-events-none" style={{ transform: `translateY(-50%) rotate(${angle}deg)` }}></div>
                    </div>
                    {/* Label */}
                    <div className="bg-brand-blue border border-white/10 px-4 py-2 opacity-80 group-hover:opacity-100 group-hover:border-brand-orange transition-all whitespace-nowrap shadow-xl">
                      <span className="text-white text-xs font-bold tracking-wider uppercase">{area.title}</span>
                    </div>
                  </motion.div>
                );
              })}
           </motion.div>
        </div>

      </section>

      {/* SECTION 3: ABOUT JKLU */}
      <section className="relative py-32 bg-brand-cloud overflow-hidden border-t border-brand-blue/10">
        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] pointer-events-none"></div>
        
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Image Block */}
            <div className="lg:col-span-6 relative">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
                 className="relative aspect-[4/5] w-full max-w-lg bg-brand-cloud p-4 pb-16 shadow-2xl rotate-[-2deg] group hover:rotate-0 transition-transform duration-700 mx-auto lg:mx-0 border border-brand-orange/20"
               >
                 <div className="w-full h-full relative border border-slate-300 overflow-hidden bg-slate-200">
                    {/* JKLU Campus Image */}
                    <Image src="/Images/jklu.jpg" alt="JKLU Campus" fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                 </div>
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-brand-blue font-bold text-xl tracking-wider text-center w-full">
                    JK Lakshmipat University
                 </div>
                 
                 {/* Decorative Tape */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/45 rotate-3 shadow-sm border border-white/40"></div>
               </motion.div>
            </div>

            {/* Right: Content Cards */}
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                   Host Institute
                 </h2>
               </div>
               
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="bg-brand-cloud p-10 lg:p-12 relative shadow-2xl border-l-4 border-brand-orange mb-8"
               >
                 <span className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">About JKLU</span>
                 <p className="text-slate-700 leading-relaxed font-medium text-lg mt-4 mb-6">
                   JK Lakshmipat University is a leading multidisciplinary university established by the prestigious JK Organisation, committed to academic excellence, innovation, research, and global engagement.
                 </p>
                 <p className="text-slate-600 leading-relaxed">
                   Located in Jaipur, Rajasthan, JKLU provides a dynamic learning ecosystem that combines experiential education, interdisciplinary research, industry collaboration, and technological advancement.
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="bg-brand-orange p-10 lg:p-12 shadow-2xl text-white relative"
               >
                  <h3 className="text-2xl font-serif font-bold mb-6">Institute of Engineering & Technology (IET)</h3>
                  <div className="w-16 h-1 bg-brand-blue mb-6"></div>
                  <p className="text-white/90 leading-relaxed">
                    The Institute of Engineering & Technology at JKLU promotes interdisciplinary research and innovation across artificial intelligence, computing, engineering systems, and emerging technologies.
                  </p>
               </motion.div>

            </div>

          </div>
        </div>
      </section>



      <Footer />
    </main>
  );
}
