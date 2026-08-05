'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

interface TeamMember {
  name: string;
  role: string;
  badge: string;
  isHead?: boolean;
  image?: string;
  description: string;
  skillsHeader?: string;
  skills: string[];
  oversight?: string[];
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    email?: string;
  };
}

export default function TechTeamClient() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Devam Gupta',
      role: 'Team Lead & Lead Architect',
      badge: 'ENGINEERING LEAD',
      isHead: true,
      image: '/Images/team/devam-gupta.webp',
      description: 'Led the end-to-end architecture, engineering, and deployment of the official JKLU SANKALP 2027 conference platform, directing backend development, cloud infrastructure, payment integration, security, and system performance while ensuring a scalable, secure, and reliable digital experience.',
      skillsHeader: 'TECHNICAL LEADERSHIP',
      skills: [
        'System Architecture',
        'Backend Development',
        'Cloud Infrastructure',
        'Payment Integration',
        'DevOps & Deployment',
        'Security Engineering',
        'Performance Optimization',
        'Technical Leadership',
        'Next.js',
      ],
      oversight: [
        'System Architecture',
        'Engineering Leadership',
        'Production Deployment',
      ],
      socials: {
        linkedin: 'https://www.linkedin.com/in/devam-gupta/',
        github: 'https://github.com/Devam759',
        instagram: 'https://www.instagram.com/who.is.devam/',
        email: 'mailto:devamgupta@jklu.edu.in',
      },
    },
    {
      name: 'Manant Srivastava',
      role: 'Web Engineer',
      badge: 'Developer',
      isHead: false,
      image: '/Images/team/manant-srivastava.webp',
      description: 'Contributed to frontend development, backend integration, reusable component architecture, and responsive UI implementation, delivering an accessible, performant, and reliable digital experience across the official JKLU SANKALP 2027 conference platform.',
      skills: [
        'Frontend Development',
        'Backend Integration',
        'UI Engineering',
        'Component Design',
        'Responsive Design',
        'Accessibility',
        'Client-Side Development',
      ],
      socials: {
        linkedin: 'https://www.linkedin.com/in/manant-srivastava-64140b365/',
        github: 'https://github.com/ManantSrivastava',
        instagram: 'https://www.instagram.com/manantsrivastava/',
        email: 'mailto:manantsrivastava@jklu.edu.in',
      },
    },
    {
      name: 'Pratham Lalwani',
      role: 'Web Engineer',
      badge: 'Developer',
      isHead: false,
      image: '/Images/team/pratham-lalwani.webp',
      description: 'Contributed to conference content management, backend integration, structured data handling, UI implementation, schema validation, and quality assurance, ensuring accurate information delivery and a seamless user experience across the JKLU SANKALP 2027 conference platform.',
      skills: [
        'Content Management',
        'Data Integration',
        'Schema Validation',
        'Quality Assurance',
        'Backend Development',
        'UX Design',
        'Conference Operations',
      ],
      socials: {
        linkedin: 'https://www.linkedin.com/in/pratham2k07/',
        github: 'https://github.com/Pratham2k07',
        instagram: 'https://www.instagram.com/pratham_lalwani05/',
        email: 'mailto:prathamlalwani@jklu.edu.in',
      },
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white pt-20">
      <Navbar />

      {/* TEAM CARDS SECTION */}
      <section className="py-16 sm:py-24 bg-white flex-grow border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-brand-blue tracking-tight uppercase">
              Website Development Team
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-1 bg-brand-orange mx-auto rounded-full mt-4 mb-3 origin-center"
            />
            <p className="text-slate-600 text-sm md:text-base font-medium">
              {/* Institute of Engineering &amp; Technology (IET), JK Lakshmipat University, Jaipur */}
            </p>
          </motion.div>

          {/* 3-COLUMN ARCH HIERARCHY LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            {/* LEFT COLUMN: MANANT SRIVASTAVA (Shifted slightly downwards) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1 lg:mt-16 w-full flex flex-col group"
            >
              <div className="flex flex-col justify-between p-7 sm:p-8 bg-[#FCFCFD] border border-slate-200/90 rounded-2xl shadow-xs group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-brand-orange/40 transition-all duration-500 ease-out h-full">
                <div>

                  {/* PROFILE IMAGE SECTION */}
                  <div className="mb-6 w-full h-64 sm:h-72 bg-slate-100/80 border border-slate-200/80 rounded-[20px] shadow-sm overflow-hidden flex flex-col items-center justify-center text-slate-400 relative">
                    {teamMembers[1].image ? (
                      <img
                        src={teamMembers[1].image}
                        alt={teamMembers[1].name}
                        onError={(e) => {
                          if (teamMembers[1].socials?.github) {
                            e.currentTarget.src = `${teamMembers[1].socials.github}.png`;
                          }
                        }}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-1.5 p-4 text-center">
                        <svg
                          className="w-9 h-9 text-slate-300 stroke-[1.5]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                        <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                          Photo Placeholder
                        </span>
                      </div>
                    )}
                  </div>

                  {/* NAME & ROLE */}
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-brand-blue tracking-tight mb-1 whitespace-nowrap">
                    {teamMembers[1].name}
                  </h3>
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
                    {teamMembers[1].role}
                  </p>

                  {/* SOCIAL ICONS */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <a
                      href={teamMembers[1].socials?.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      aria-label={`${teamMembers[1].name} LinkedIn`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[1].socials?.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      aria-label={`${teamMembers[1].name} GitHub`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[1].socials?.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      aria-label={`${teamMembers[1].name} Instagram`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[1].socials?.email || '#'}
                      title="Email"
                      aria-label={`Email ${teamMembers[1].name}`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>

                  {/* DESCRIPTION CONTAINER */}
                  <div className="mb-4">
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {teamMembers[1].description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CENTER COLUMN: DEVAM GUPTA (Team Lead, Top Center) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 mt-0 w-full flex flex-col group"
            >
              <div className="flex flex-col justify-between p-7 sm:p-8 bg-[#FCFCFD] border-2 border-brand-orange/40 rounded-2xl shadow-md group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-brand-orange transition-all duration-500 ease-out h-full">
                <div>

                  {/* PROFILE IMAGE SECTION */}
                  <div className="mb-6 w-full h-64 sm:h-72 bg-slate-100/80 border border-slate-200/80 rounded-[20px] shadow-sm overflow-hidden flex flex-col items-center justify-center text-slate-400 relative">
                    {teamMembers[0].image ? (
                      <img
                        src={teamMembers[0].image}
                        alt={teamMembers[0].name}
                        onError={(e) => {
                          if (teamMembers[0].socials?.github) {
                            e.currentTarget.src = `${teamMembers[0].socials.github}.png`;
                          }
                        }}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-1.5 p-4 text-center">
                        <svg
                          className="w-9 h-9 text-slate-300 stroke-[1.5]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                        <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                          Photo Placeholder
                        </span>
                      </div>
                    )}
                  </div>

                  {/* NAME & ROLE */}
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-brand-blue tracking-tight mb-1 whitespace-nowrap">
                    {teamMembers[0].name}
                  </h3>
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
                    {teamMembers[0].role}
                  </p>

                  {/* SOCIAL ICONS */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <a
                      href={teamMembers[0].socials?.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      aria-label={`${teamMembers[0].name} LinkedIn`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[0].socials?.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      aria-label={`${teamMembers[0].name} GitHub`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[0].socials?.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      aria-label={`${teamMembers[0].name} Instagram`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[0].socials?.email || '#'}
                      title="Email"
                      aria-label={`Email ${teamMembers[0].name}`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>

                  {/* DESCRIPTION CONTAINER */}
                  <div className="mb-4">
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {teamMembers[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: PRATHAM LALWANI (Shifted slightly downwards) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="order-3 lg:order-3 lg:mt-16 w-full flex flex-col group"
            >
              <div className="flex flex-col justify-between p-7 sm:p-8 bg-[#FCFCFD] border border-slate-200/90 rounded-2xl shadow-xs group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-brand-orange/40 transition-all duration-500 ease-out h-full">
                <div>

                  {/* PROFILE IMAGE SECTION */}
                  <div className="mb-6 w-full h-64 sm:h-72 bg-slate-100/80 border border-slate-200/80 rounded-[20px] shadow-sm overflow-hidden flex flex-col items-center justify-center text-slate-400 relative">
                    {teamMembers[2].image ? (
                      <img
                        src={teamMembers[2].image}
                        alt={teamMembers[2].name}
                        onError={(e) => {
                          if (teamMembers[2].socials?.github) {
                            e.currentTarget.src = `${teamMembers[2].socials.github}.png`;
                          }
                        }}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-1.5 p-4 text-center">
                        <svg
                          className="w-9 h-9 text-slate-300 stroke-[1.5]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                        <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                          Photo Placeholder
                        </span>
                      </div>
                    )}
                  </div>

                  {/* NAME & ROLE */}
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-brand-blue tracking-tight mb-1 whitespace-nowrap">
                    {teamMembers[2].name}
                  </h3>
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
                    {teamMembers[2].role}
                  </p>

                  {/* SOCIAL ICONS */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <a
                      href={teamMembers[2].socials?.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      aria-label={`${teamMembers[2].name} LinkedIn`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[2].socials?.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      aria-label={`${teamMembers[2].name} GitHub`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[2].socials?.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      aria-label={`${teamMembers[2].name} Instagram`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    <a
                      href={teamMembers[2].socials?.email || '#'}
                      title="Email"
                      aria-label={`Email ${teamMembers[2].name}`}
                      className="w-8 h-8 rounded-full border border-brand-blue/30 bg-white text-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>

                  {/* DESCRIPTION CONTAINER */}
                  <div className="mb-4">
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {teamMembers[2].description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
