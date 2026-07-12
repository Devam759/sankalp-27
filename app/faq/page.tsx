'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { ChevronDown, HelpCircle, Mail, Phone } from 'lucide-react';

export default function FAQPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    { 
      q: 'Where is the conference venue located?', 
      a: "SANKALP'27 is hosted at JK Lakshmipat University (JKLU), near Mahindra SEZ on Ajmer Road, Jaipur, Rajasthan 302026, India. The campus is well-connected and easily accessible via pre-paid airport taxis and ride-sharing services." 
    },
    { 
      q: 'Is parking available on campus?', 
      a: 'Yes, secure and spacious parking zones are available on campus free of charge for all registered delegates, speakers, and attendees throughout the conference.' 
    },
    { 
      q: 'Is campus-wide Wi-Fi available?', 
      a: 'Complimentary high-speed Wi-Fi access will be provided to all registered attendees across all academic halls, seminar rooms, and dining areas on campus.' 
    },
    { 
      q: 'Is the venue wheelchair accessible?', 
      a: 'Yes, the JKLU campus features fully wheelchair-accessible pathways, entry ramps, elevators in all multi-story academic blocks, and dedicated assistance layout.' 
    },
    { 
      q: 'How can I reach the venue from Jaipur Airport?', 
      a: 'Jaipur International Airport (JAI) is approximately 25 km (around 45 minutes) from the venue. Pre-paid airport taxis, Uber, and Ola cabs are readily available at the terminal exit.' 
    },
    { 
      q: 'Will food and refreshments be available during the conference?', 
      a: 'Yes, complimentary catered lunches, coffee/tea, and evening refreshments will be served during designated networking breaks to all registered delegates.' 
    },
    { 
      q: 'Who should I contact for travel-related assistance?', 
      a: "For travel, transit, or accommodation support, please contact our logistics helpdesk at sankalp@jklu.edu.in or visit the assistance counter in the main academic lobby." 
    }
  ];

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-brand-blue text-white py-24 px-6 overflow-hidden">
        {/* Subtle background graphics */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block border-2 border-brand-orange text-brand-orange bg-brand-orange/15 px-4 py-1 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-sm"
          >
            Help Desk & Information
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-black tracking-tight uppercase"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg opacity-85 max-w-xl mx-auto"
          >
            Find quick answers to common questions about SANKALP'27 registrations, venue facilities, travel, and accommodation.
          </motion.p>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFAQ === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-white border transition-all duration-300 rounded-[16px] overflow-hidden shadow-sm ${
                  isOpen 
                    ? 'border-[#E6E8EC] border-l-4 border-l-brand-orange shadow-md' 
                    : 'border-[#E6E8EC] hover:border-brand-orange hover:bg-[#FFFDF8]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left font-semibold text-brand-ink cursor-pointer select-none text-sm sm:text-base gap-4 group"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-brand-orange shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400 group-hover:text-brand-orange'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 pl-[42px] text-slate-600 leading-relaxed font-sans text-xs sm:text-sm">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Support & Contact Section */}
      <section className="py-16 bg-[#FAFAFB] border-t border-[#E6E8EC]/60 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              Still Have Questions?
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              If you couldn't find the answer to your query, feel free to reach out to our logistics and queries team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-white border border-[#E6E8EC] rounded-2xl flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-brand-orange/10 rounded-full text-brand-orange">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-brand-ink text-sm sm:text-base">Email Queries</h3>
              <p className="text-xs text-slate-500 max-w-[200px]">For registrations, paper submissions, and official letters.</p>
              <a href="mailto:sankalp@jklu.edu.in" className="text-sm font-bold text-brand-orange hover:underline">
                sankalp@jklu.edu.in
              </a>
            </div>

            <div className="p-6 bg-white border border-[#E6E8EC] rounded-2xl flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-brand-orange/10 rounded-full text-brand-orange">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-brand-ink text-sm sm:text-base">Logistics Support</h3>
              <p className="text-xs text-slate-500 max-w-[200px]">For accommodation, route, and transit support.</p>
              <a href="tel:+911417107500" className="text-sm font-bold text-brand-orange hover:underline">
                +91 141 7107500
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
