'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { committeeMembers, advisoryBoard, technicalProgramCommittee, trackChairs } from '@/constants/conferenceData';

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
      { name: 'Dr. Amit Kumar', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['Green AI', 'Responsible AI', 'Intelligent Systems'] },
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
      { name: 'Prof. Taruna Gautam', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['Data Science', 'Machine Learning', 'Generative AI'] },
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
      { name: 'Prof. Devika Bhatnagar', role: 'Track Chair', institution: 'JKLU', country: 'India', interests: ['Healthcare AI', 'Clinical Decision Support', 'Medical Imaging'] },
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
  { id: '01', title: 'Double-Blind Peer Review', body: 'Every submission is evaluated anonymously by at minimum two independent domain experts. Neither the author nor the reviewer knows the other identity — a standard upheld by Nature, IEEE, and Springer.', who: 'Technical Program Committee' },
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
    <div className={`w-16 h-16 rounded-none flex items-center justify-center font-bold text-xl shrink-0 ${color}`}>
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
            {domain.experts.map((expert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5, ease }}
                className="bg-white border border-slate-200 p-6 flex flex-col items-center text-center hover:border-brand-orange/50 hover:shadow-sm transition-all duration-300 group"
              >
                {/* Photo / Avatar */}
                <div className={`w-20 h-20 flex items-center justify-center font-bold text-2xl mb-4 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
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

      {/* SECTION 1 — TYPOGRAPHIC OPENING */}
      <section ref={heroRef} className="pt-44 pb-32 px-8 max-w-[1440px] mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease }} className="flex items-center gap-4 mb-16">
          <div className="w-10 h-[2px] bg-brand-orange" />
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange">The Minds Behind SANKALP</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.1, ease, delay: 0.1 }} className="font-serif font-bold text-brand-blue text-[clamp(3rem,8vw,7rem)] leading-[1.05] tracking-tight mb-4 max-w-5xl">
          A Conference Built<br />
          <span className="text-brand-orange italic">by Expertise.</span>
        </motion.h1>
      </section>

      {/* SECTION 2 — EDITORIAL LEADERSHIP PORTRAITS */}
      <section className="py-0 border-t border-brand-blue/10 bg-[#f7f4ef]">
        <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-0">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[10px] font-bold tracking-[0.28em] uppercase text-slate-400 mb-4">The People Shaping the Conversation</motion.p>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif font-bold text-brand-blue text-4xl md:text-5xl mb-0 max-w-2xl leading-tight">Guiding SANKALP 2027</motion.h2>
        </div>

        {/* 1. Chief Patron */}
        <div className="border-b border-brand-blue/10 mt-16">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 bg-slate-200 border border-slate-300 aspect-[4/5] relative flex items-center justify-center overflow-hidden">
                <span className="text-slate-400 font-mono text-xs tracking-widest">PORTRAIT</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange" />
              </motion.div>
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 flex flex-col justify-end pl-0 lg:pl-16 pt-10 lg:pt-0 pb-12">
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-6">Chief Patron</span>
                <h3 className="font-serif font-bold text-brand-blue text-[clamp(2rem,4vw,4rem)] leading-none mb-4">{committeeMembers.chiefPatron.name}</h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-lg italic border-l-2 border-brand-orange/30 pl-6">"Providing foundational leadership and institutional vision for SANKALP 2027."</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 2. Chief Co-Patron */}
        <div className="border-b border-brand-blue/10 bg-white">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 flex flex-col justify-end pr-0 lg:pr-16 pt-10 lg:pt-0 pb-12 order-2 lg:order-1">
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-6">Chief Co-Patron</span>
                <h3 className="font-serif font-bold text-brand-blue text-[clamp(2rem,4vw,4rem)] leading-none mb-4">{committeeMembers.chiefCoPatron.name}</h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-lg italic border-l-2 border-brand-orange/30 pl-6">"Guiding strategic initiatives and academic excellence for the conference."</p>
              </motion.div>
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 bg-slate-200 border border-slate-300 aspect-[4/5] relative flex items-center justify-center overflow-hidden order-1 lg:order-2">
                <span className="text-slate-400 font-mono text-xs tracking-widest">PORTRAIT</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3. Patron */}
        <div className="border-b border-brand-blue/10">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 bg-slate-200 border border-slate-300 aspect-[4/5] relative flex items-center justify-center overflow-hidden">
                <span className="text-slate-400 font-mono text-xs tracking-widest">PORTRAIT</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange" />
              </motion.div>
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 flex flex-col justify-end pl-0 lg:pl-16 pt-10 lg:pt-0 pb-12">
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-6">Patron</span>
                <h3 className="font-serif font-bold text-brand-blue text-[clamp(2rem,4vw,4rem)] leading-none mb-4">{committeeMembers.patron.name}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">{committeeMembers.patron.title}</p>
                <p className="text-slate-600 text-lg leading-relaxed max-w-lg italic border-l-2 border-brand-orange/30 pl-6">"Driving JK Lakshmipat University's commitment to research, innovation, and global collaboration."</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 4. Conference Chair */}
        <div className="border-b border-brand-blue/10 bg-white">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 flex flex-col justify-end pr-0 lg:pr-16 pt-10 lg:pt-0 pb-12 order-2 lg:order-1">
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-6">Conference Chair</span>
                <h3 className="font-serif font-bold text-brand-blue text-[clamp(2rem,4vw,4rem)] leading-none mb-4">{committeeMembers.chairs[0].name}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">{committeeMembers.chairs[0].title}</p>
                <p className="text-slate-600 text-lg leading-relaxed max-w-lg italic border-l-2 border-brand-orange/30 pl-6">"Leading the academic vision and interdisciplinary research direction of SANKALP 2027."</p>
              </motion.div>
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 bg-slate-200 border border-slate-300 aspect-[4/5] relative flex items-center justify-center overflow-hidden order-1 lg:order-2">
                <span className="text-slate-400 font-mono text-xs tracking-widest">PORTRAIT</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* 5. Conference Convener */}
        <div className="border-b border-brand-blue/10">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 bg-slate-200 border border-slate-300 aspect-[4/5] relative flex items-center justify-center overflow-hidden">
                <span className="text-slate-400 font-mono text-xs tracking-widest">PORTRAIT</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange" />
              </motion.div>
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 flex flex-col justify-end pl-0 lg:pl-16 pt-10 lg:pt-0 pb-12">
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-6">Conference Convener</span>
                <h3 className="font-serif font-bold text-brand-blue text-[clamp(2rem,4vw,4rem)] leading-none mb-4">{committeeMembers.chairs[1].name}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">{committeeMembers.chairs[1].title}</p>
                <p className="text-slate-600 text-lg leading-relaxed max-w-lg italic border-l-2 border-brand-orange/30 pl-6">"Orchestrating SANKALP's global outreach and operational excellence."</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 6. Program Chairs */}
        <div className="border-b border-brand-blue/10 bg-white">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 flex flex-col justify-end pr-0 lg:pr-16 pt-10 lg:pt-0 pb-12 order-2 lg:order-1">
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-6">Program Chairs</span>
                <h3 className="font-serif font-bold text-brand-blue text-[clamp(2rem,4vw,4rem)] leading-none mb-4">Professors of IET</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">Prof. Amit, Prof. Taruna, Prof. Umesh, Prof. Devika</p>
                <p className="text-slate-600 text-lg leading-relaxed max-w-lg italic border-l-2 border-brand-orange/30 pl-6">"Ensuring rigorous academic evaluation and program curation."</p>
              </motion.div>
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 bg-slate-200 border border-slate-300 aspect-[4/5] relative flex items-center justify-center overflow-hidden order-1 lg:order-2">
                <span className="text-slate-400 font-mono text-xs tracking-widest">PORTRAIT</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — INSTITUTION WALL */}
      <section className="py-32 bg-brand-blue text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8">
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
            <motion.p variants={fadeUp} className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-4">Where Our Expertise Comes From</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-4xl md:text-5xl text-white leading-tight max-w-3xl">SANKALP draws from an ecosystem of over 30 globally recognised institutions.</motion.h2>
          </motion.div>
          <div className="border-t border-white/10 pt-12">
            <motion.div variants={stagger(0.04)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-x-10 gap-y-5">
              {institutions.map((inst, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                  className={`font-serif font-bold text-white/70 hover:text-white transition-colors duration-300 cursor-default select-none ${i % 5 === 0 ? 'text-2xl md:text-3xl' : i % 3 === 0 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
                  {inst}
                </motion.span>
              ))}
            </motion.div>
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <span className="text-white/40 text-xs font-mono tracking-widest uppercase">International · National · Industry</span>
              <span className="text-brand-orange font-bold text-xs tracking-widest uppercase">15+ Countries · 30+ Universities & Labs</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — THE EXPERTISE BEHIND SANKALP */}
      <section className="py-32 bg-[#101010] text-white border-b border-brand-blue/10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 mb-16">
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-4">The Expertise Behind SANKALP</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-4xl md:text-5xl leading-tight max-w-2xl">A Premium Showcase of Research Leadership.</motion.h2>
          </motion.div>
        </div>

        {/* Horizontal Editorial Gallery */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-8 pb-12 w-full group/gallery" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {domains.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease }}
              onClick={() => setActiveDomain(domain)}
              className="shrink-0 w-[85vw] sm:w-[400px] aspect-[3/4] relative group/card snap-center cursor-pointer overflow-hidden border border-white/10 bg-[#151515] transition-all duration-500 group-hover/gallery:opacity-40 hover:!opacity-100"
            >
              {/* Background styling / texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
              
              {/* CSS Pattern to act as subtle research imagery */}
              <div className="absolute inset-0 opacity-10 group-hover/card:opacity-30 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
                <div className="flex justify-between items-start">
                  <span className="font-mono font-black text-6xl text-white/20 group-hover/card:text-brand-orange/80 transition-colors duration-500">{domain.number}</span>
                </div>
                
                <div className="group-hover/card:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-serif font-bold text-3xl text-white leading-tight mb-6">{domain.short.toUpperCase()}</h3>
                  <div className="w-12 h-[2px] bg-white/20 group-hover/card:bg-brand-orange group-hover/card:w-20 transition-all duration-500 mb-6" />
                  <div className="flex flex-col gap-2">
                    {domain.experts.map(e => e.interests).flat().filter((v,idx,a) => a.indexOf(v)===idx).slice(0,3).map((tag, idx) => (
                      <span key={idx} className="text-white/60 text-xs font-medium tracking-wide">{tag}</span>
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

      {/* SECTION 5 — HOW QUALITY IS MAINTAINED */}
      <section className="py-32 bg-white border-b border-brand-blue/10">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:sticky lg:top-32">
                <motion.p variants={fadeUp} className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-4">The Research Standards</motion.p>
                <motion.h2 variants={fadeUp} className="font-serif font-bold text-4xl text-brand-blue leading-tight mb-8">How Quality Is<br />Maintained</motion.h2>
                <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed font-medium">SANKALP 2027 maintains the editorial standards of the world's leading academic publishing houses. Every paper accepted here has passed through a rigorous, multi-stage evaluation.</motion.p>
              </motion.div>
            </div>
            <div className="lg:col-span-8 flex flex-col divide-y divide-slate-100">
              {qualitySteps.map((step, i) => (
                <motion.div key={step.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.9, ease }} className="py-10 group">
                  <div className="flex items-start gap-8">
                    <span className="font-mono font-black text-[56px] leading-none text-brand-blue/8 group-hover:text-brand-orange/20 transition-colors duration-700 shrink-0 pt-1">{step.id}</span>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-brand-blue mb-3">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed font-medium mb-4">{step.body}</p>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-[1.5px] bg-brand-orange" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange">{step.who}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>




      {/* SECTION 8 — FULL DIRECTORY */}
      <section className="py-32 bg-white border-t border-brand-blue/10">
        <div className="max-w-[1440px] mx-auto px-8">
          <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
            <motion.p variants={fadeUp} className="text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange mb-4">Complete Membership</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif font-bold text-4xl md:text-5xl text-brand-blue leading-tight">Academic Leadership Directory</motion.h2>
          </motion.div>

          {/* International Advisory Board */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="mb-20">
            <div className="flex items-center gap-4 mb-8 border-b border-brand-blue/10 pb-4">
              <div className="w-6 h-[2px] bg-brand-orange" />
              <h3 className="font-bold text-xs tracking-[0.22em] uppercase text-brand-blue">International Advisory Board</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
              {advisoryBoard.international.map((m, i) => (
                <div key={i} className="flex flex-col py-3 border-b border-slate-100 group hover:border-brand-orange transition-colors">
                  <span className="font-serif font-bold text-brand-blue text-lg leading-tight group-hover:text-brand-orange transition-colors">{m.name}</span>
                  <span className="text-slate-500 text-xs mt-1 leading-snug">{m.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* National Advisory Board */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="mb-20">
            <div className="flex items-center gap-4 mb-8 border-b border-brand-blue/10 pb-4">
              <div className="w-6 h-[2px] bg-brand-orange" />
              <h3 className="font-bold text-xs tracking-[0.22em] uppercase text-brand-blue">National Advisory Board</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
              {advisoryBoard.national.map((m, i) => (
                <div key={i} className="flex flex-col py-3 border-b border-slate-100 group hover:border-brand-orange transition-colors">
                  <span className="font-serif font-bold text-brand-blue text-lg leading-tight group-hover:text-brand-orange transition-colors">{m.name}</span>
                  <span className="text-slate-500 text-xs mt-1 leading-snug">{m.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* TPC */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="mb-20">
            <div className="flex items-center gap-4 mb-8 border-b border-brand-blue/10 pb-4">
              <div className="w-6 h-[2px] bg-brand-orange" />
              <h3 className="font-bold text-xs tracking-[0.22em] uppercase text-brand-blue">Technical Program Committee</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">Name</th>
                    <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">Institution</th>
                    <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">Country</th>
                    <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">Domain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {technicalProgramCommittee.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-serif font-bold text-brand-blue">{m.name}</td>
                      <td className="py-4 px-4 text-slate-600 text-sm">{m.institution}</td>
                      <td className="py-4 px-4 text-slate-500 text-sm">{m.country}</td>
                      <td className="py-4 px-4"><span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange">{m.area}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Track Chairs */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <div className="flex items-center gap-4 mb-8 border-b border-brand-blue/10 pb-4">
              <div className="w-6 h-[2px] bg-brand-orange" />
              <h3 className="font-bold text-xs tracking-[0.22em] uppercase text-brand-blue">Track Chairs</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-brand-blue/10">
              {trackChairs.map((t, i) => (
                <div key={i} className="border-r border-b border-brand-blue/10 p-6">
                  <span className="text-[10px] font-mono text-slate-400 block mb-2">Track {String(i + 1).padStart(2, '0')}</span>
                  <h4 className="font-serif font-bold text-brand-blue text-base mb-4 leading-tight">{t.track}</h4>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-3 items-baseline"><span className="text-[9px] font-bold tracking-widest uppercase text-brand-orange w-14 shrink-0">Chair</span><span className="text-slate-700 font-semibold text-sm">{t.chair}</span></div>
                    <div className="flex gap-3 items-baseline"><span className="text-[9px] font-bold tracking-widest uppercase text-slate-400 w-14 shrink-0">Co-Chair</span><span className="text-slate-500 text-sm">{t.coChair}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
