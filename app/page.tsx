'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Award, FileText, Users, ArrowRight } from 'lucide-react';
import { EventSchema } from '@/components/StructuredData';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Subtle floating animation for backdrop mesh circles
    gsap.to('.mesh-node-1', {
      x: 35,
      y: 25,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to('.mesh-node-2', {
      x: -25,
      y: -35,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Premium entrance timeline for Hero elements
    const tl = gsap.timeline();
    
    // Make the title container visible immediately (words are clipped inside)
    gsap.set('.hero-title', { opacity: 1 });

    tl.fromTo('.hero-badge', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('.hero-title-word',
      { y: '105%' },
      { y: '0%', duration: 0.8, stagger: 0.04, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo('.hero-desc', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
      '-=0.5'
    )
    .fromTo('.hero-meta', 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 
      '-=0.4'
    )
    .fromTo('.hero-btn', 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, 
      '-=0.3'
    );
  }, [isMounted]);

  // Interactive 3D tilt handlers for card components
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angles based on mouse position relative to card center
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 6; // max 6 degrees
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.boxShadow = '0 20px 30px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = '';
  };

  if (!isMounted) {
    return <div className="fixed inset-0 bg-slate-50" />;
  }

  const tracks = [
    {
      id: 1,
      title: 'Artificial Intelligence & Machine Learning',
      topics: ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'AI Ethics']
    },
    {
      id: 2,
      title: 'Internet of Things & Embedded Systems',
      topics: ['Smart Cities', 'Sensor Networks', 'Edge Computing', 'Industrial IoT']
    },
    {
      id: 3,
      title: 'Cyber Security & Privacy',
      topics: ['Blockchain Technology', 'Cryptography', 'Network Security', 'Threat Intelligence']
    },
    {
      id: 4,
      title: 'Software Engineering & Cloud Computing',
      topics: ['DevOps', 'Microservices', 'Distributed Systems', 'Agile Methodologies']
    }
  ];

  const speakers = [
    {
      name: 'Dr. Sarah Jenkins',
      title: 'Professor of Computer Science',
      org: 'MIT, USA',
      topic: 'The Future of Ethical Artificial Intelligence'
    },
    {
      name: 'Prof. Rajesh Kumar',
      title: 'Lead Research Scientist',
      org: 'IISc Bangalore, India',
      topic: 'Next-Generation Wireless Sensor Networks'
    },
    {
      name: 'Dr. Elena Rostova',
      title: 'Director of Cryptography Research',
      org: 'Tech University Munich, Germany',
      topic: 'Post-Quantum Cryptographic Protocols'
    }
  ];

  // Animation variants for card staggers
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: 'easeOut' as const
      } 
    }
  };

  const titleText = "International Conference on Advanced Technology & Science (ICATS-2026)";
  const titleWords = titleText.split(" ");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      <EventSchema />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 px-6 border-b border-slate-800 relative overflow-hidden">
        {/* Floating Ambient Mesh Backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="mesh-node-1 absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -top-20 -left-20" />
          <div className="mesh-node-2 absolute w-80 h-80 bg-blue-500/10 rounded-full blur-3xl bottom-10 right-10" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <span className="hero-badge opacity-0 text-amber-500 font-bold uppercase tracking-wider text-sm block mb-4">
            International Conference 2026
          </span>
          
          {/* Word-by-word Reveal Container */}
          <h1 className="hero-title opacity-0 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
            {titleWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-3 pb-1 md:pb-2">
                <span className="hero-title-word inline-block translate-y-[105%]">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          
          <p className="hero-desc opacity-0 text-slate-400 text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
            Bringing together leading researchers, academicians, and industry experts from around the globe to share breakthroughs and discuss the future of intelligence, networks, and systems.
          </p>

          <div className="hero-meta opacity-0 flex flex-wrap items-center gap-6 text-sm text-slate-300 mb-10">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-amber-500" />
              <span>July 14–21, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-amber-500" />
              <span>JK Lakshmipat University campus, Jaipur, India</span>
            </div>
          </div>

          <div className="hero-btn opacity-0 flex flex-wrap items-center gap-4">
            <Link 
              href="/register" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-8 rounded transition-all duration-150 inline-flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Register for Conference</span>
              <ArrowRight size={16} />
            </Link>
            <Link 
              href="/schedule" 
              className="border border-slate-700 hover:border-slate-500 text-white font-semibold py-3.5 px-8 rounded transition-all duration-150 inline-flex items-center gap-2 hover:bg-slate-800"
            >
              <span>View Agenda</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Conference Highlights & About */}
      <motion.section 
        className="py-20 px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 border-b-2 border-slate-200 pb-3 uppercase">
              About the Conference
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              The International Conference on Advanced Technology & Science (ICATS-2026) provides a premier interdisciplinary platform for researchers, practitioners, and educators to present and discuss the most recent innovations, trends, and concerns as well as practical challenges encountered and solutions adopted in the fields of engineering, technology, and applied sciences.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Accepted and presented papers will be compiled into the conference proceedings. Authors are invited to submit original research contributions through our paper tracks.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm self-start">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 uppercase tracking-wide">
              Important Dates
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex justify-between border-b border-dashed border-slate-100 pb-2">
                <span className="text-slate-500">Paper Submission:</span>
                <span className="font-bold text-slate-800">April 15, 2026</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-slate-100 pb-2">
                <span className="text-slate-500">Acceptance Notification:</span>
                <span className="font-bold text-slate-800">May 20, 2026</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-slate-100 pb-2">
                <span className="text-slate-500">Camera-Ready Copy:</span>
                <span className="font-bold text-slate-800">June 10, 2026</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Registration Closes:</span>
                <span className="font-bold text-slate-800">July 01, 2026</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Conference Tracks */}
      <section className="bg-slate-100 py-20 px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              Call for Papers & Tracks
            </h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto mt-3" />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {tracks.map((track) => (
              <motion.div 
                key={track.id} 
                variants={cardVariants}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out' }}
                className="bg-white border border-slate-200 p-6 rounded shadow-sm hover:shadow-md cursor-default"
              >
                <div className="flex items-center gap-3 mb-4" style={{ transform: 'translateZ(20px)' }}>
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded">
                    Track {track.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3" style={{ transform: 'translateZ(30px)' }}>{track.title}</h3>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-semibold list-disc pl-4" style={{ transform: 'translateZ(10px)' }}>
                  {track.topics.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            Keynote Speakers
          </h2>
          <div className="w-16 h-1 bg-amber-600 mx-auto mt-3" />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {speakers.map((s, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out' }}
              className="bg-white border border-slate-200 p-6 rounded shadow-sm flex flex-col justify-between hover:shadow-md cursor-default"
            >
              <div>
                <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4" style={{ transform: 'translateZ(20px)' }}>
                  {s.name.split(' ').pop()?.[0]}
                </div>
                <h3 className="text-base font-bold text-slate-900" style={{ transform: 'translateZ(30px)' }}>{s.name}</h3>
                <p className="text-xs text-slate-500 font-medium mb-3" style={{ transform: 'translateZ(10px)' }}>{s.title} — {s.org}</p>
                <div className="border-t border-slate-100 pt-3" style={{ transform: 'translateZ(15px)' }}>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Keynote Topic</p>
                  <p className="text-sm font-semibold text-slate-700 italic">&ldquo;{s.topic}&rdquo;</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Committee Overview */}
      <motion.section 
        className="bg-slate-900 text-white py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-extrabold tracking-tight uppercase mb-4"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Organizing Committee
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-sm max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Led by the distinguished faculty members of JK Lakshmipat University, supported by advisory members from global institutions.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left text-sm"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={cardVariants} className="border border-slate-800 p-5 rounded hover:bg-slate-850 transition-colors duration-200">
              <h4 className="font-bold text-amber-500 uppercase text-xs tracking-wider mb-1">General Chair</h4>
              <p className="font-bold text-white text-base">Prof. D. K. Banwet</p>
              <p className="text-slate-400 text-xs">Vice Chancellor, JKLU</p>
            </motion.div>
            <motion.div variants={cardVariants} className="border border-slate-800 p-5 rounded hover:bg-slate-850 transition-colors duration-200">
              <h4 className="font-bold text-amber-500 uppercase text-xs tracking-wider mb-1">Organizing Chair</h4>
              <p className="font-bold text-white text-base">Dr. Sanjay Goel</p>
              <p className="text-slate-400 text-xs">Director, Institute of Engineering & Technology</p>
            </motion.div>
            <motion.div variants={cardVariants} className="border border-slate-800 p-5 rounded hover:bg-slate-850 transition-colors duration-200">
              <h4 className="font-bold text-amber-500 uppercase text-xs tracking-wider mb-1">Technical Chair</h4>
              <p className="font-bold text-white text-base">Dr. Anupam Kumar</p>
              <p className="text-slate-400 text-xs">Professor, Computer Science Department</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}


