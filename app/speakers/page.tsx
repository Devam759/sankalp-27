'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

const Linkedin = ({ size = 24, ...props }: React.ComponentProps<'svg'> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SPEAKERS_DATA = [
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Professor of Computer Science',
    org: 'MIT, USA',
    bio: 'Dr. Sarah Jenkins is a renowned professor and researcher in the field of Artificial Intelligence. She has spent over two decades researching ethical AI deployment and governance, publishing several award-winning papers on human-AI collaboration. At ICATS-2026, she will share insights on aligning machine intelligence with human values.',
    topic: 'The Future of Ethical Artificial Intelligence',
    expertise: ['Ethical AI', 'Deep Learning', 'Human-Computer Interaction'],
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Prof. Rajesh Kumar',
    role: 'Lead Research Scientist',
    org: 'IISc Bangalore, India',
    bio: 'Prof. Rajesh Kumar leads the smart networks laboratory at IISc. His pioneering work in resource-efficient internet of things architecture has been implemented in smart grid systems across several cities. He is a recipient of numerous national science awards and guides tech initiatives worldwide.',
    topic: 'Next-Generation Wireless Sensor Networks',
    expertise: ['Internet of Things', 'Sensor Networks', 'Edge Systems'],
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Director of Cryptography Research',
    org: 'Tech University Munich, Germany',
    bio: 'Dr. Elena Rostova is an authority on post-quantum secure communication protocols. Her research covers the intersection of blockchain security, distributed ledgers, and privacy-enhancing technologies. She serves as an advisor to European security agencies on data privacy standards.',
    topic: 'Post-Quantum Cryptographic Protocols',
    expertise: ['Cryptography', 'Blockchain', 'Information Security'],
    linkedin: 'https://linkedin.com'
  }
];

export default function SpeakersPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const tl = gsap.timeline();
    tl.fromTo('.speaker-back', 
      { opacity: 0, x: -15 }, 
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
    .fromTo('.speaker-header', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
      '-=0.2'
    )
    .fromTo('.speaker-card', 
      { opacity: 0, y: 40, rotation: -3, skewY: -3, scale: 0.95 }, 
      { opacity: 1, y: 0, rotation: 0, skewY: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.5)' }, 
      '-=0.3'
    );
  }, [isMounted]);

  // Interactive 3D tilt handlers for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="speaker-back opacity-0 inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-semibold mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Heading */}
        <div className="speaker-header opacity-0 border-b border-slate-200 pb-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
            Keynote Speakers & Mentors
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Meet the distinguished scholars and industry pioneers presenting at ICATS-2026.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPEAKERS_DATA.map((speaker, index) => (
            <div 
              key={index} 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out' }}
              className="speaker-card opacity-0 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-200 cursor-default"
            >
              <div className="p-6 space-y-4">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4" style={{ transform: 'translateZ(20px)' }}>
                  {speaker.name.split(' ').pop()?.[0]}
                </div>
                <div style={{ transform: 'translateZ(30px)' }}>
                  <h3 className="text-lg font-bold text-slate-900">{speaker.name}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{speaker.role}</p>
                  <p className="text-xs text-amber-700 font-bold">{speaker.org}</p>
                </div>
                
                <p className="text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-4" style={{ transform: 'translateZ(10px)' }}>
                  {speaker.bio}
                </p>

                <div className="border-t border-slate-100 pt-4" style={{ transform: 'translateZ(15px)' }}>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Keynote Address
                  </span>
                  <span className="text-sm font-bold text-slate-800 italic">
                    &ldquo;{speaker.topic}&rdquo;
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {speaker.expertise.slice(0, 2).map((exp, idx) => (
                    <span key={idx} className="bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded">
                      {exp}
                    </span>
                  ))}
                </div>
                <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
