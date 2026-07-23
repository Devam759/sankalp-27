'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { committeeMembers, advisoryBoard, technicalProgramCommittee, trackChairs, organizingSubCommittees } from '@/constants/conferenceData';

/* ─── Animation presets ─────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease } } };
const fadeLeft: Variants = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease } } };
const fadeRight: Variants = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease } } };
const stagger = (delay = 0): Variants => ({ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: delay } } });

/* ─── Types ──────────────────────────────────────────────────── */
type Expert = {
  name: string;
  role: string;
  institution: string;
  country: string;
  interests: string[];
};
type Domain = {
  id: string;
  short: string;
  number: string;
  full: string;
  description: string;
  experts: Expert[];
};

/* ─── Domain data with full expert profiles ──────────────────── */
const domains: Domain[] = [
  {
    id: 'ai',
    number: '01',
    short: 'Sustainable AI',
    full: 'Sustainable AI, Intelligent Systems & Responsible Digital Transformation',
    description: 'Research at the intersection of artificial intelligence, ecological responsibility, and ethical deployment of autonomous systems.',
    experts: [
      { name: 'Dr. Amit Kumar Sinhal', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['Green AI', 'Responsible AI', 'Intelligent Systems'] },
      { name: 'Dr. Sneha Sharma', role: 'Co-Chair', institution: 'JKLU', country: 'India', interests: ['Digital Transformation', 'AI Ethics'] },
      { name: 'Dr. Sarah Mitchell', role: 'TPC Member', institution: 'University of Cambridge', country: 'United Kingdom', interests: ['Sustainable AI', 'Explainability', 'Green Computing'] },
      { name: 'Prof. Wassim Haddad', role: 'International Advisor', institution: 'Georgia Institute of Technology', country: 'United States', interests: ['Nonlinear Control', 'Intelligent Systems', 'Thermodynamics'] },
      { name: 'Prof. Celestine Iwendi', role: 'International Advisor', institution: 'University of Greater Manchester', country: 'United Kingdom', interests: ['AI Security', 'IoT', 'Responsible AI'] },
      { name: 'Prof. Fernando Ortiz-Rodriguez', role: 'International Advisor', institution: 'UAT Mexico', country: 'Mexico', interests: ['Knowledge Engineering', 'Semantic Web', 'AI Applications'] },
    ],
  },
  {
    id: 'data',
    number: '02',
    short: 'Data & GenAI',
    full: 'Data Science, Generative AI & Knowledge Engineering',
    description: 'Cutting-edge research on generative models, foundation models, large language models, and next-generation data intelligence.',
    experts: [
      { name: 'Prof. Taruna Sunil', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['Data Science', 'Machine Learning', 'Generative AI'] },
      { name: 'Dr. Vikram Singh', role: 'Co-Chair', institution: 'JKLU', country: 'India', interests: ['Knowledge Engineering', 'NLP', 'Cognitive Computing'] },
      { name: 'Dr. Hiroshi Tanaka', role: 'TPC Member', institution: 'University of Tokyo', country: 'Japan', interests: ['Generative AI', 'Foundation Models', 'LLMs'] },
      { name: 'Dr. James Chen', role: 'TPC Member', institution: 'National University of Singapore', country: 'Singapore', interests: ['Data Science', 'Predictive Modelling', 'Business Intelligence'] },
      { name: 'Prof. Ankit Garg', role: 'TPC Member', institution: 'IIT Delhi', country: 'India', interests: ['Machine Learning', 'Optimization', 'Decision Intelligence'] },
      { name: 'Prof. Ravi Vatrapu', role: 'National Advisor', institution: 'Toronto Metropolitan University', country: 'Canada', interests: ['Computational Social Science', 'Digital Analytics', 'Big Data'] },
      { name: 'Prof. Shiv Shanker Singh Patel', role: 'National Advisor', institution: 'IIM Visakhapatnam', country: 'India', interests: ['Decision Sciences', 'Analytics', 'Data-Driven Management'] },
      { name: 'Mr. Himanshu Gupta', role: 'Industry Advisor', institution: 'IBM India Research Lab', country: 'India', interests: ['Applied AI', 'Research Engineering', 'Enterprise AI'] },
    ],
  },
  {
    id: 'hpc',
    number: '03',
    short: 'High Performance Computing',
    full: 'HPC, Intelligent Networks & Emerging Technologies',
    description: 'Research advancing supercomputing, quantum architectures, distributed intelligence, and next-generation network technologies.',
    experts: [
      { name: 'Dr. Umesh Gupta', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['Parallel Computing', 'Cloud Systems', 'Distributed Intelligence'] },
      { name: 'Dr. Anjali Mehta', role: 'Co-Chair', institution: 'JKLU', country: 'India', interests: ['IoT', 'Edge Computing', 'Network Systems'] },
      { name: 'Prof. Priyadarsan Patra', role: 'International Advisor', institution: 'University of Massachusetts', country: 'United States', interests: ['Computing Architecture', 'VLSI', 'System Design'] },
      { name: 'Prof. K. K. Biswas', role: 'National Advisor', institution: 'IIT Delhi', country: 'India', interests: ['Computer Architecture', 'Embedded Systems', 'High Performance Computing'] },
      { name: 'Sergey Nersesov', role: 'International Advisor', institution: 'Villanova University', country: 'United States', interests: ['Control Systems', 'Network Theory', 'Dynamical Systems'] },
      { name: 'Vassilis Gerogiannis', role: 'International Advisor', institution: 'University of Thessaly', country: 'Greece', interests: ['Software Engineering', 'Digital Systems', 'Project Management'] },
    ],
  },
  {
    id: 'health',
    number: '04',
    short: 'Smart Healthcare',
    full: 'Smart Healthcare, Bioinformatics & Human-Centric AI',
    description: 'Applying artificial intelligence to precision medicine, wearable diagnostics, bioinformatics, and human-centred healthcare systems.',
    experts: [
      { name: 'Prof. Devika Kataria', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['Healthcare AI', 'Clinical Decision Support', 'Medical Imaging'] },
      { name: 'Dr. Suresh Reddy', role: 'Co-Chair', institution: 'JKLU', country: 'India', interests: ['Bioinformatics', 'Genomics', 'Precision Medicine'] },
      { name: 'Prof. Elena Rodriguez', role: 'TPC Member', institution: 'Technical University of Madrid', country: 'Spain', interests: ['Smart Health', 'AI Diagnostics', 'Wearables'] },
      { name: 'Prof. Rajesh Kumar', role: 'TPC Member', institution: 'IIT Ropar', country: 'India', interests: ['Biomedical Engineering', 'Signal Processing', 'Neural Engineering'] },
      { name: 'Prof. Naveen Sivadasan', role: 'Industry Advisor', institution: 'TCS Research', country: 'India', interests: ['Applied AI', 'Research Engineering', 'Health Informatics'] },
      { name: 'Dr. Easwar Subramanian', role: 'Industry Advisor', institution: 'TCS Research', country: 'India', interests: ['Computational Biology', 'Health AI', 'Data Systems'] },
    ],
  },
  {
    id: 'edu',
    number: '05',
    short: 'AI in Education',
    full: 'AI in Education, K-12 Learning & Future Workforce Development',
    description: 'Transforming learning ecosystems through intelligent tutoring, adaptive assessment, and AI-augmented pedagogy at all education levels.',
    experts: [
      { name: 'Dr. Ramesh Chandra', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['EdTech', 'Intelligent Tutoring', 'Personalized Learning'] },
      { name: 'Dr. Kavita Jain', role: 'Co-Chair', institution: 'JKLU', country: 'India', interests: ['Learning Analytics', 'Educational Data Mining', 'AI Assessment'] },
      { name: 'Prof. Arun Patil', role: 'International Advisor', institution: 'Curtin University', country: 'Singapore', interests: ['Engineering Education', 'STEM Learning', 'Future Skills'] },
      { name: 'Prof. Viraj Kumar', role: 'National Advisor', institution: 'IISc Bengaluru', country: 'India', interests: ['CS Education', 'Climate & Technology', 'Pedagogy'] },
      { name: 'Dr. Vinnie Jauhari', role: 'Industry Advisor', institution: 'Microsoft Corporation India', country: 'India', interests: ['EdTech Industry', 'Digital Pedagogy', 'AI Tools in Education'] },
      { name: 'Dr. Brijesh Kohli', role: 'Industry Advisor', institution: 'Xebia India', country: 'India', interests: ['Strategic Partnerships', 'Education Business', 'Digital Transformation'] },
    ],
  },
  {
    id: 'society',
    number: '06',
    short: 'Smart Society',
    full: 'Smart Society, Governance & Sustainable Innovation',
    description: 'Leveraging technology for smart governance, inclusive public services, environmental resilience, and equitable societal advancement.',
    experts: [
      { name: 'Prof. Anil Sharma', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['Smart Cities', 'E-Governance', 'Digital Policy'] },
      { name: 'Dr. Meera Patel', role: 'Co-Chair', institution: 'JKLU', country: 'India', interests: ['Social Innovation', 'Public Services AI', 'Rural Technology'] },
      { name: 'Abid Hussain', role: 'International Advisor', institution: 'Copenhagen Business School', country: 'Denmark', interests: ['Digitalization', 'Public Sector AI', 'Nordic Innovation'] },
      { name: 'Prof. Nishtha Keshwani', role: 'National Advisor', institution: 'Central University of Rajasthan', country: 'India', interests: ['Technology Policy', 'Governance', 'Digital Inclusion'] },
      { name: 'Prof. V.S. Rathore', role: 'National Advisor', institution: 'Apex University', country: 'India', interests: ['CSE Research', 'International Academic Collaboration', 'Applied Computing'] },
      { name: 'Prof. Brij Gupta', role: 'International Advisor', institution: 'Asia University', country: 'Taiwan', interests: ['Cyber Security', 'AI Safety', 'Digital Governance'] },
    ],
  },
  {
    id: 'vlsi',
    number: '07',
    short: 'VLSI & Engineering',
    full: 'VLSI, Semiconductor Technologies & Intelligent Engineering',
    description: 'Deep tech research in chip design, semiconductor fabrication, embedded intelligence, and the future of hardware-software co-design.',
    experts: [
      { name: 'Dr. Rajesh Verma', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['VLSI Design', 'Digital Circuits', 'SoC Architecture'] },
      { name: 'Dr. Prakash Iyer', role: 'Co-Chair', institution: 'JKLU', country: 'India', interests: ['Embedded Systems', 'FPGA', 'Hardware Acceleration'] },
      { name: 'Prof. Gadadhar Sahoo', role: 'National Advisor', institution: 'IIT (ISM) Dhanbad', country: 'India', interests: ['Computer Science', 'Algorithms', 'Engineering Research'] },
      { name: 'Prof. K. V. Arya', role: 'National Advisor', institution: 'IIITM Gwalior', country: 'India', interests: ['VLSI', 'Computer Engineering', 'Intelligent Systems'] },
      { name: 'Prof. Kusum Deep', role: 'National Advisor', institution: 'IIT Roorkee', country: 'India', interests: ['Optimization', 'Metaheuristics', 'Engineering Mathematics'] },
      { name: 'Babu Turumella', role: 'Industry Advisor', institution: 'NVIDIA', country: 'United States', interests: ['GPU Architecture', 'Semiconductor R&D', 'AI Hardware'] },
    ],
  },
];

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

const qualitySteps = [
  { id: '01', title: 'Double-Blind Peer Review', body: 'Every submission is evaluated anonymously by at minimum two independent domain experts. Neither the author nor the reviewer knows the other identity, a standard upheld by Nature, IEEE, and Springer.', who: 'Technical Program Committee' },
  { id: '02', title: 'Technical Evaluation', body: 'Beyond correctness, papers are assessed on novelty, impact, reproducibility, and academic rigour. This ensures SANKALP upholds the standards of its indexing partners.', who: 'Track Chairs & Program Chairs' },
  { id: '03', title: 'Track-Level Curation', body: 'Subject-matter experts curate sessions within each of the 7 research domains, ensuring thematic depth, topical relevance, and a meaningful discourse for specialists.', who: 'Track Leadership' },
  { id: '04', title: 'Publication Standards', body: 'Accepted manuscripts undergo formatting compliance review against international publication guidelines before final proceedings submission to indexing and publishing partners.', who: 'Publication Committee' },
  { id: '05', title: 'Academic Integrity', body: 'All submissions are screened for originality. Plagiarism detection and ethical review are embedded into the editorial pipeline from the first submission gate.', who: 'Editorial Board' },
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

/* ─── Domain Modal ────────────────────────────────────────────── */
function DomainModal({ domain, onClose }: { domain: Domain; onClose: () => void }) {

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-brand-blue/60 backdrop-blur-sm"
      />

      {/* Modal panel */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.35, ease }}
        className="fixed z-50 inset-4 md:inset-[5%] lg:inset-[7%] bg-[#f7f4ef] shadow-[0_24px_80px_rgba(15,38,92,0.25)] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header - slim */}
        <div className="flex items-center justify-between px-8 md:px-12 py-4 border-b border-brand-blue/10 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px] bg-brand-orange" />
            <span className="font-serif font-bold text-brand-blue text-lg">{domain.short}</span>
            <span className="text-slate-400 text-xs font-mono tracking-widest">&middot; {domain.experts.length} experts</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border border-slate-200 text-slate-400 hover:border-brand-orange hover:text-brand-orange transition-colors text-lg" aria-label="Close">
            &#x2715;
          </button>
        </div>

        {/* Expert Grid — scrollable */}
        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...domain.experts]
              .sort((a, b) => {
                const nameA = a.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                const nameB = b.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
                return nameA.localeCompare(nameB);
              })
              .map((expert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5, ease }}
                className="bg-white border border-slate-200 p-6 flex flex-col items-center text-center hover:border-brand-orange/50 hover:shadow-sm transition-all duration-300 group"
              >
                {/* Photo / Avatar */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl mb-4 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                  {expert.name.split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase()}
                </div>
                <h3 className="font-serif font-bold text-brand-blue text-base leading-tight group-hover:text-brand-orange transition-colors mb-1">{expert.name}</h3>
                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange block mb-2">{expert.role}</span>
                <p className="text-slate-500 text-xs leading-snug">{expert.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 md:px-12 py-4 border-t border-brand-blue/10 shrink-0 bg-white flex items-center justify-between gap-4">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">ESC or click outside to close</span>
          <span className="text-[10px] font-bold tracking-widest text-brand-orange uppercase">{domain.short} · SANKALP 2027</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Page Component ─────────────────────────────────────── */
export default function MindsPage() {
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* Modal Portal */}
      <AnimatePresence>
        {activeDomain && (
          <DomainModal domain={activeDomain} onClose={() => setActiveDomain(null)} />
        )}
      </AnimatePresence>

      {/* SECTION 1 — FORMAL OPENING & HERO */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 max-w-4xl mx-auto w-full text-center flex flex-col items-center">

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
      </section>

      {/* SECTION 2 — LEADERSHIP COMMITTEE */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-[1536px] mx-auto px-6 md:px-12">

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
        <div className="max-w-[1536px] mx-auto px-6 md:px-12">
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
        <div className="max-w-[1536px] mx-auto px-6 md:px-12">
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

      {/* SECTION 4 — THE EXPERTISE BEHIND SANKALP */}
      <section className="py-24 md:py-28 bg-[#101010] text-white border-b border-brand-blue/10 overflow-hidden">
        <div className="max-w-[1536px] mx-auto px-6 md:px-12 mb-14">
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="w-10 h-[2px] bg-brand-orange mb-6 rounded-full" />
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl">
              Research Domains &amp; Track Expertise
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-base md:text-lg mt-3 max-w-2xl font-medium">
              Click on any domain card below to view the full expert research panel.
            </motion.p>
          </motion.div>
        </div>

        {/* Horizontal Editorial Gallery */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-12 w-full group/gallery" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {domains.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease }}
              onClick={() => setActiveDomain(domain)}
              className="shrink-0 w-[85vw] sm:w-[380px] aspect-[3/4] relative group/card snap-center cursor-pointer overflow-hidden border border-white/15 bg-[#161616] rounded-2xl transition-all duration-500 group-hover/gallery:opacity-40 hover:!opacity-100 hover:border-brand-orange/60"
            >
              {/* Background styling / texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-transparent to-black/60 opacity-60 group-hover/card:opacity-100 transition-opacity duration-700" />
              
              {/* CSS Pattern to act as subtle research imagery */}
              <div className="absolute inset-0 opacity-15 group-hover/card:opacity-35 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-10">
                <div className="flex justify-between items-start">
                  <span className="font-mono font-black text-6xl md:text-7xl text-white/20 group-hover/card:text-brand-orange/80 transition-colors duration-500">{domain.number}</span>
                </div>
                
                <div className="group-hover/card:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-serif font-bold text-2xl md:text-3xl text-white leading-tight mb-4">{domain.short.toUpperCase()}</h3>
                  <div className="w-12 h-[2px] bg-white/20 group-hover/card:bg-brand-orange group-hover/card:w-20 transition-all duration-500 mb-4 rounded-full" />
                  <div className="flex flex-col gap-2">
                    {domain.experts.map(e => e.interests).flat().filter((v,idx,a) => a.indexOf(v)===idx).slice(0,3).map((tag, idx) => (
                      <span key={idx} className="text-white/70 text-xs font-semibold tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .group\\/gallery::-webkit-scrollbar { display: none; }
        `}} />
      </section>



      <Footer />
    </main>
  );
}
