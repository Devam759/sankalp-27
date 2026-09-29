'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import { FaqItem } from './page';

interface FaqClientProps {
  faqs?: FaqItem[];
}

export default function FaqClient({ faqs = [] }: FaqClientProps) {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'registration' | 'paper' | 'venue'>('all');

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'registration', label: 'Registration & Fees' },
    { id: 'paper', label: 'Paper & Submissions' },
    { id: 'venue', label: 'Venue & Logistics' },
  ] as const;

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      return selectedCategory === 'all' || faq.category === selectedCategory;
    });
  }, [faqs, selectedCategory]);

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-0">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block mb-6">
            <WordReveal text="Frequently Asked Questions" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange"></div>
          </h1>
          <Reveal variant="in" delay={0.25}>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed font-normal mt-6">
              Find quick answers to common questions about JKLU SANKALP 2027 registrations, payment guidelines, paper presentations, venue facilities, and logistics.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-16 sm:py-24 px-6 max-w-4xl mx-auto">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const count = cat.id === 'all' ? faqs.length : faqs.filter((f) => f.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveFAQ(null);
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-blue text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-blue'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl p-8">
            <p className="text-slate-600 font-medium text-sm">No questions found in this category.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Show All Questions
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = activeFAQ === index;
              return (
                <Reveal
                  key={index}
                  delay={(index % 6) * 0.05}
                  className={`bg-white border transition-all duration-300 rounded-[16px] overflow-hidden ${
                    isOpen
                      ? 'border-[#E6E8EC] border-l-[4px] border-l-brand-orange shadow-md'
                      : 'border-[#E6E8EC] hover:border-brand-orange hover:bg-[#FFFDF8] hover:shadow-[0_0_15px_rgba(245,130,30,0.14)]'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-6 text-left cursor-pointer select-none gap-4 group"
                  >
                    <span className="font-sans font-semibold text-brand-ink text-sm sm:text-base leading-snug">
                      {faq.q}
                    </span>
                    <span className={`font-medium text-lg select-none shrink-0 transition-colors ${
                      isOpen ? 'text-slate-400' : 'text-slate-400 group-hover:text-brand-orange'
                    }`}>
                      {isOpen ? '−' : '+'}
                    </span>
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
                        <div className="px-6 pb-6 pt-1 text-slate-600 leading-relaxed font-sans text-xs sm:text-sm font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* Support & Contact Section */}
      <section className="py-16 bg-[#FAFAFB] border-t border-[#E6E8EC]/60 px-6">
        <Reveal className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue tracking-tight">
              Still Have Questions?
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              If you couldn't find the answer to your query, feel free to reach out to our conference organizing team.
            </p>
          </div>

          <div className="max-w-md mx-auto pt-4">
            <div className="p-6 bg-white border border-[#E6E8EC] rounded-2xl flex flex-col items-center text-center space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-brand-blue text-sm sm:text-base">Email Queries</h3>
              <p className="text-xs text-slate-500 max-w-[240px]">For paper submissions, registration assistance, and official letters.</p>
              <a href="mailto:sankalp@jklu.edu.in" className="text-sm font-bold text-brand-orange hover:underline">
                sankalp@jklu.edu.in
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}


