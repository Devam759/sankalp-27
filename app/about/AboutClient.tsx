'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WordReveal from '@/components/ui/WordReveal';

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-20 md:pt-24 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* SECTION 1: CONFERENCE OVERVIEW */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-brand-cloud border-b border-brand-blue/10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.03, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 -left-10 text-[18vw] font-serif font-black text-brand-blue leading-none select-none pointer-events-none whitespace-nowrap z-0"
        >
          SANKALP 2027
        </motion.div>

        <div className="max-w-[1440px] w-full mx-auto relative z-10 px-6 md:px-12">
          
          <div className="mb-14 text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
              <WordReveal text="About JKLU SANKALP" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
            </h1>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-center leading-relaxed font-normal mt-8">
              International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning &amp; Prediction at JK Lakshmipat University, Jaipur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
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
                  ANKALP 2027 - International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction is a premier international multidisciplinary conference organized by the Institute of Engineering & Technology (IET), JK Lakshmipat University, Jaipur.
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

            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-brand-blue text-white p-12 relative overflow-hidden h-full min-h-[400px] flex flex-col justify-between shadow-2xl"
              >
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
                      { title: "Global Collaboration", icon: "fi-rr-globe" },
                      { title: "Emerging Technologies", icon: "fi-rr-sparkles" },
                      { title: "Industry Integration", icon: "fi-rr-briefcase" },
                      { title: "Future-Ready Systems", icon: "fi-rr-cpu" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group cursor-default border-b border-white/10 pb-4 last:border-0 last:pb-0">
                        <i className={`fi ${item.icon} text-brand-orange text-base shrink-0`} />
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

      {/* SECTION 3: ABOUT JKLU */}
      <section className="relative py-32 bg-brand-cloud overflow-hidden border-t border-brand-blue/10">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] pointer-events-none"></div>
        
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                   <WordReveal text="Host Institute" />
                   <div className="absolute -bottom-4 left-0 w-12 h-[2px] bg-brand-orange"></div>
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
                  className="bg-brand-orange p-10 lg:p-12 shadow-2xl text-white relative mb-8"
                >
                   <h3 className="text-2xl font-serif font-bold mb-6">Institute of Engineering &amp; Technology (IET)</h3>
                   <div className="w-16 h-1 bg-brand-blue mb-6"></div>
                   <p className="text-white/90 leading-relaxed mb-6">
                     The Institute of Engineering &amp; Technology at JKLU promotes interdisciplinary research and innovation across artificial intelligence, computing, engineering systems, and emerging technologies.
                   </p>
                </motion.div>

                {/* Sub-Centres under IET */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-brand-cloud border-l-4 border-brand-orange p-6 shadow-lg border border-slate-200/80"
                  >
                     <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">Centre of Excellence</span>
                     <h4 className="font-serif font-bold text-brand-blue text-base mb-2">Centre for Communication &amp; Critical Thinking (CCCT)</h4>
                     <p className="text-slate-600 text-xs leading-relaxed">
                       Dedicated to supporting students' personal and professional growth through liberal arts, critical inquiry, group dynamics, and interpersonal communication skills.
                     </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-brand-cloud border-l-4 border-brand-blue p-6 shadow-lg border border-slate-200/80"
                  >
                     <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider block mb-1">Centre of Excellence</span>
                     <h4 className="font-serif font-bold text-brand-blue text-base mb-2">Centre for Global Learning, JKLU (CGL)</h4>
                     <p className="text-slate-600 text-xs leading-relaxed">
                       Drives global engagement, international student exchange programs, study abroad pathways, and collaborative research alliances with global institutions.
                     </p>
                  </motion.div>
                </div>
             </div>

             <div className="lg:col-span-6 relative flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  className="relative aspect-[4/3] w-full max-w-lg bg-brand-cloud p-4 pb-10 md:pb-14 shadow-2xl mx-auto lg:mx-0 border border-slate-200/80 rounded-sm"
                >
                  <div className="w-full h-full relative border border-slate-300 overflow-hidden bg-slate-200 rounded-sm">
                     <Image src="/Images/campus/jklu_campus.webp" alt="JKLU Campus" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px" className="object-cover transition-all duration-700 hover:scale-105" />
                  </div>
                  <div className="absolute bottom-2.5 md:bottom-4 left-1/2 -translate-x-1/2 font-serif text-brand-blue font-bold text-sm sm:text-base md:text-lg tracking-wider text-center w-full px-2 leading-tight md:leading-normal">
                     JK Lakshmipat University Campus
                  </div>
                </motion.div>
             </div>

           </div>
         </div>
       </section>


      {/* SECTION 4: ATAL INCUBATION CENTRE (AIC-JKLU) */}
      <section className="relative py-32 bg-white overflow-hidden border-t border-brand-blue/10">
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1 relative flex justify-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative aspect-[4/3] w-full max-w-lg bg-brand-cloud p-4 pb-10 md:pb-14 shadow-2xl mx-auto lg:mx-0 border border-slate-200/80 rounded-sm"
              >
                <div className="w-full h-full relative border border-slate-300 overflow-hidden bg-slate-200 rounded-sm">
                  <Image 
                    src="/Images/campus/aic_jklu.jpg" 
                    alt="Atal Incubation Centre - JKLU" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px" 
                    className="object-cover transition-all duration-700 hover:scale-105" 
                  />
                </div>
                <div className="absolute bottom-2.5 md:bottom-4 left-1/2 -translate-x-1/2 font-serif text-brand-blue font-bold text-sm sm:text-base md:text-lg tracking-wider text-center w-full px-2 leading-tight md:leading-normal">
                  Atal Incubation Centre - JKLU
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                  <WordReveal text="Atal Incubation Centre" />
                  <div className="absolute -bottom-4 left-0 w-12 h-[2px] bg-brand-orange"></div>
                </h2>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-brand-cloud p-10 lg:p-12 relative shadow-2xl border-l-4 border-brand-orange mb-8"
              >
                <span className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">AIC-JKLU</span>
                <p className="text-slate-700 leading-relaxed font-medium text-lg mt-4 mb-6">
                  Established in 2019 under the Atal Innovation Mission (AIM), NITI Aayog, AIC-JKLU is a premier startup incubator fostering purposeful innovation and entrepreneurship.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Located within the JKLU campus, AIC-JKLU offers state-of-the-art infrastructure, access to 33+ specialized labs, mentorship from industry experts, and a global network of partners to help startups scale. Over the years, the center has nurtured more than 70 startups in areas ranging from Fintech and Agritech to Electric Vehicles and Longevity Economy.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-brand-cloud border-l-4 border-brand-orange p-6 shadow-lg border border-slate-200/80"
                >
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1">Impact & Reach</span>
                  <h4 className="font-serif font-bold text-brand-blue text-base mb-2">70+ Startups Incubated</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Supporting early-stage startups across diverse sectors like EV, Clean Energy, Fintech, and Agritech with dedicated programs and resources.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-brand-cloud border-l-4 border-brand-blue p-6 shadow-lg border border-slate-200/80"
                >
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider block mb-1">Resources</span>
                  <h4 className="font-serif font-bold text-brand-blue text-base mb-2">Mentorship & Lab Access</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Providing access to 45+ expert mentors, corporate tie-ups, capital networks, and 33+ engineering, design, and computing labs.
                  </p>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
