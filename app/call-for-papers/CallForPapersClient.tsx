'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import WordReveal from '@/components/ui/WordReveal';
import { EnvelopeIcon } from '@/components/ui/Icons';
import { PAPER_SUBMISSION_LINK } from '@/constants/conferenceData';
import { fadeUp, staggerContainer } from '@/lib/animations/variants';

export default function CallForPapersClient() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white flex flex-col">
      <Navbar />

      {/* PAGE HEADER — standard pattern: pt-28 sm:pt-36, white bg, border-b */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.15, 0.05)}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
                <WordReveal text="Call for Papers" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-slate-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-center leading-relaxed font-normal mt-6"
            >
              Researchers, academicians, industry professionals, and scholars are invited to submit
              original and unpublished research papers aligned with the conference themes. All
              submissions undergo a rigorous peer-review process by the Technical Program Committee.
            </motion.p>

            {/* Action CTAs — standard header button pattern */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
            >
              <a
                href={PAPER_SUBMISSION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-brand-orange text-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Submit Paper via CMT
              </a>

              <a
                href="/docs/conference-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="JKLU_SANKALP_2027_Brochure.pdf"
                className="w-full sm:w-auto text-center bg-brand-blue text-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-brand-lightBlue transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Brochure
              </a>

              <Link
                href="/sessions"
                className="w-full sm:w-auto text-center border border-slate-300 text-brand-blue bg-white px-7 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-slate-50 hover:border-brand-blue transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                View Tracks &amp; Sessions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <Section id="call-for-papers" className="flex-grow">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Core 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Guidelines & Peer Review */}
            <div className="lg:col-span-7 space-y-6">

              {/* Submission Guidelines Card */}
              <Reveal variant="left" className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg shadow-2xs space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-brand-blue mb-2">
                    Submission Guidelines
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">
                    Key formatting and ethical prerequisites for manuscript acceptance:
                  </p>
                </div>

                <ul className="space-y-4 text-slate-700 font-medium text-sm border-t border-slate-100 pt-5">
                  <li className="flex items-start gap-3">
                    <i className="fi fi-rr-check-circle text-brand-orange text-sm shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Manuscript Scope &amp; Size:</strong> Submissions must be original, unpublished work (min. 3,500 words or 10–16 pages, single column, 10–12 pt font) aligned with one of the conference tracks.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <i className="fi fi-rr-check-circle text-brand-orange text-sm shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Structure &amp; Referencing:</strong> Include an unreferenced abstract (&le; 250 words), 4–6 keywords, alphabetical author-year citations (e.g., <em>Sharma et al., 2021</em>), and up to 50 references.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <i className="fi fi-rr-check-circle text-brand-orange text-sm shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Integrity &amp; Plagiarism Policy:</strong> Blind peer review on technical merit. Simultaneous submissions, self-plagiarism, and duplicate publishing are strictly prohibited.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <i className="fi fi-rr-check-circle text-brand-orange text-sm shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Registration &amp; Presentation:</strong> At least one author of each accepted paper must register and present the paper for publication in proceedings. Preprints are welcomed.
                    </span>
                  </li>
                </ul>

                {/* Integrated Download Guidelines Action Row */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/80 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 rounded-b-lg">
                  <div>
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
                      Full Author Guidelines Document
                    </span>
                    <p className="text-xs text-slate-500 font-medium">
                      Detailed section components, referencing models, equations, and ethics policies.
                    </p>
                  </div>
                  <a
                    href="/docs/author-guidelines.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="JKLU_SANKALP_2027_Author_Guidelines.pdf"
                    className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white px-5 py-2.5 font-bold hover:bg-blue-900 transition-colors text-xs uppercase tracking-wide cursor-pointer rounded-sm shrink-0"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download Guidelines (PDF)</span>
                  </a>
                </div>
              </Reveal>

              {/* Microsoft CMT Acknowledgment Card */}
              <Reveal variant="left" delay={0.1} className="bg-white border border-slate-200 p-6 rounded-lg shadow-2xs space-y-2 text-slate-700 text-sm leading-relaxed font-medium">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Peer Review Infrastructure
                </div>
                <p>
                  The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
                </p>
              </Reveal>
            </div>

            {/* Right Column: Visual Showcase & Publications */}
            <div className="lg:col-span-5 space-y-6">

              {/* Visual Showcase Card */}
              <Reveal variant="right" className="relative aspect-[16/10] border border-slate-200 rounded-lg overflow-hidden shadow-2xs bg-white">
                <Image
                  src="https://res.cloudinary.com/flufexsc/image/upload/v1787147492/sankalp/Images/call_for_papers.jpg"
                  alt="JKLU SANKALP 2027 Call for Papers - Academic Research Presentation & Springer LNCS Session"
                  title="JKLU SANKALP 2027 Call for Papers - Academic Research Presentation & Springer LNCS Session"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </Reveal>

              {/* Publication Opportunities Card */}
              <Reveal variant="right" delay={0.1} className="bg-white border border-slate-200 p-6 rounded-lg shadow-2xs space-y-3">
                <h4 className="font-serif font-bold text-brand-blue text-base">
                  Publication Opportunities
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Publication Opportunity in <strong>Springer Lecture Notes in Computer Science (LNCS) Series</strong> (Scopus Indexed - Approval Awaited). Extended versions of selected high-impact papers will also be recommended for fast-track publication in Scopus/SCI-indexed journals.
                </p>
              </Reveal>

            </div>

          </div>

          {/* For Further Queries Section */}
          <div className="w-full border-t border-slate-200 pt-12">
            <Reveal variant="up" className="max-w-3xl mx-auto text-center space-y-5">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-blue tracking-tight">
                For Further Queries
              </h3>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
                For any questions regarding paper submission, formatting, review process, or publication, please contact the CFP Coordination Team.
              </p>

              <div className="pt-2">
                <div className="inline-flex items-center justify-center gap-3.5 bg-white border border-slate-200 px-6 py-4 sm:px-8 sm:py-5 shadow-2xs rounded-xl text-center">
                  <EnvelopeIcon size={22} className="text-brand-orange shrink-0" />
                  <div className="text-center sm:text-left">
                    <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider font-sans">
                      CFP Coordination
                    </span>
                    <a
                      href="mailto:cfp_sankalp@jklu.edu.in"
                      className="text-base sm:text-lg font-serif font-bold text-brand-blue hover:text-brand-orange transition-colors tracking-tight"
                    >
                      cfp_sankalp@jklu.edu.in
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </Section>

      <Footer />
    </main>
  );
}
