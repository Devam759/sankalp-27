'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function ContactPage() {
  const organizingHeads = [
    { name: "Prof. Tapas Kumar", title: "Conference Chair" },
    { name: "Prof. Sonali Vyas", title: "Conference Convener" },
  ];

  const subCommittees = [
    { department: "Registration", name: "Dr. Priti Sharma" },
    { department: "Publication", name: "Dr. Ankur Verma" },
    { department: "Sponsorship", name: "Mr. Sanjay Kedia" },
    { department: "Hospitality", name: "Dr. Mamta Bhatia" },
    { department: "Media & Comms", name: "Ms. Shilpa Sharma" }
  ];

  const trackChairs = [
    { track: "Sustainable AI", name: "Dr. Amit Kumar" },
    { track: "Data Science", name: "Prof. Taruna Gautam" },
    { track: "HPC & Edge", name: "Dr. Umesh Gupta" },
    { track: "Smart Healthcare", name: "Prof. Devika Bhatnagar" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f7f4ef] text-[#184176] font-sans selection:bg-[#f5821e] selection:text-white">
      <Navbar />

      <div className="pt-32 pb-28 px-6 max-w-5xl mx-auto relative z-10">
        
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#184176] tracking-tight mb-4">
            Contact Us
          </h1>
          <div className="w-16 h-[2px] bg-[#f5821e] mx-auto" />
        </header>

        {/* Main Grid Layout */}
        <div className="space-y-16">
          
          {/* Campus Address Card */}
          <div className="bg-white border border-[#184176]/10 p-8 md:p-10 shadow-sm rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-serif text-[#184176] tracking-tight">
                SANKALP 2027
              </h3>
              <p className="text-[#184176]/70 leading-relaxed max-w-xl text-sm md:text-base">
                Welcome to the official contact directory of the SANKALP 2027 International Conference. For any queries regarding papers, registration, or sponsorships, reach out to our team heads below.
              </p>
            </div>
            
            <div className="w-full md:w-auto p-6 bg-[#f7f4ef]/50 border border-[#184176]/5 rounded-sm flex items-start gap-4 text-sm">
              <div>
                <h4 className="text-[#184176] font-semibold tracking-wide mb-1 uppercase text-xs">Campus Address</h4>
                <p className="text-[#184176]/80 leading-relaxed max-w-xs md:max-w-sm">
                  JK Lakshmipat University, Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026
                </p>
              </div>
            </div>
          </div>

          {/* Organizing Heads */}
          <div>
            <div className="text-center mb-10 pt-4">
              <h2 className="text-2xl font-serif text-[#184176] tracking-tight mb-3">
                Organizing Heads
              </h2>
              <div className="w-12 h-[1px] bg-[#184176]/30 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {organizingHeads.map((head, index) => (
                <div key={index} className="bg-white border border-[#184176]/10 rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                  <div className="p-6 group-hover:border-[#f5821e]/30 transition-colors">
                    <span className="text-[10px] uppercase font-semibold text-[#f5821e] tracking-wider block mb-1">{head.title}</span>
                    <h3 className="font-serif text-lg text-[#184176]">
                      {head.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Committees */}
          <div>
            <div className="text-center mb-10 pt-6">
              <h2 className="text-2xl font-serif text-[#184176] tracking-tight mb-3">
                Sub-Committees
              </h2>
              <div className="w-12 h-[1px] bg-[#184176]/30 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCommittees.map((contact, index) => (
                <div key={index} className="bg-white border border-[#184176]/10 rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                  <div className="p-6 group-hover:border-[#f5821e]/30 transition-colors">
                    <span className="text-[10px] uppercase font-semibold text-[#f5821e] tracking-wider block mb-1">{contact.department}</span>
                    <h3 className="font-serif text-lg text-[#184176]">
                      {contact.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track Chairs */}
          <div>
            <div className="text-center mb-10 pt-6">
              <h2 className="text-2xl font-serif text-[#184176] tracking-tight mb-3">
                Track Chairs
              </h2>
              <div className="w-12 h-[1px] bg-[#184176]/30 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trackChairs.map((chair, index) => (
                <div key={index} className="bg-white border border-[#184176]/10 rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                  <div className="p-6 group-hover:border-[#f5821e]/30 transition-colors">
                    <span className="text-[10px] uppercase font-semibold text-[#f5821e] tracking-wider block mb-1">Track Chair</span>
                    <h3 className="font-serif text-lg text-[#184176] mb-3">
                      {chair.track}
                    </h3>
                    <div>
                      <span className="text-[10px] text-[#184176]/50 uppercase tracking-wide block leading-none mb-1">Chairperson</span>
                      <span className="text-sm font-medium text-[#184176]">{chair.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
