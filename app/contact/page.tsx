'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function ContactPage() {
  const organizingHeads = [
    { name: "Prof. Tapas Kumar", title: "Conference Chair", phone: "+91 141 7107500", email: "tapaskumar@jklu.edu.in" },
    { name: "Prof. Sonali Vyas", title: "Conference Convener", phone: "+91 141 7107501", email: "sonalivyas@jklu.edu.in" },
  ];

  const subCommittees = [
    { department: "Registration", name: "Dr. Priti Sharma", email: "sankalp@jklu.edu.in", phone: "+91 98765 43210" },
    { department: "Publication", name: "Dr. Ankur Verma", email: "sankalp@jklu.edu.in", phone: "+91 98765 43211" },
    { department: "Sponsorship", name: "Mr. Sanjay Kedia", email: "sankalp@jklu.edu.in", phone: "+91 98765 43214" },
    { department: "Hospitality", name: "Dr. Mamta Bhatia", email: "sankalp@jklu.edu.in", phone: "+91 98765 43213" },
    { department: "Media & Comms", name: "Ms. Shilpa Sharma", email: "sankalp@jklu.edu.in", phone: "+91 141 7107525" }
  ];

  const trackChairs = [
    { track: "Sustainable AI", name: "Dr. Amit Kumar", email: "amitkumar@jklu.edu.in" },
    { track: "Data Science", name: "Prof. Taruna Gautam", email: "tarunagautam@jklu.edu.in" },
    { track: "HPC & Edge", name: "Dr. Umesh Gupta", email: "umeshgupta@jklu.edu.in" },
    { track: "Smart Healthcare", name: "Prof. Devika Bhatnagar", email: "devikabhatnagar@jklu.edu.in" },
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
              <MapPin size={24} className="text-[#f5821e] shrink-0" />
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
                  <div className="p-6 border-b border-[#184176]/5 group-hover:border-[#f5821e]/30 transition-colors">
                    <span className="text-[10px] uppercase font-semibold text-[#f5821e] tracking-wider block mb-1">{head.title}</span>
                    <h3 className="font-serif text-lg text-[#184176]">
                      {head.name}
                    </h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-[#184176]/40" />
                      <div>
                        <span className="text-[10px] text-[#184176]/50 uppercase tracking-wide block leading-none mb-1">Phone</span>
                        <a href={`tel:${head.phone.replace(/\s+/g, '')}`} className="text-sm font-medium text-[#184176] hover:text-[#f5821e] transition-colors">
                          {head.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-[#184176]/40" />
                      <div>
                        <span className="text-[10px] text-[#184176]/50 uppercase tracking-wide block leading-none mb-1">Email</span>
                        <a href={`mailto:${head.email}`} className="text-sm font-medium text-[#184176] hover:text-[#f5821e] transition-colors break-all">
                          {head.email}
                        </a>
                      </div>
                    </div>
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
                  <div className="p-6 border-b border-[#184176]/5 group-hover:border-[#f5821e]/30 transition-colors">
                    <span className="text-[10px] uppercase font-semibold text-[#f5821e] tracking-wider block mb-1">{contact.department}</span>
                    <h3 className="font-serif text-lg text-[#184176]">
                      {contact.name}
                    </h3>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-center space-y-4">
                    {contact.phone && (
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-[#184176]/40" />
                        <div>
                          <span className="text-[10px] text-[#184176]/50 uppercase tracking-wide block leading-none mb-1">Phone</span>
                          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-sm font-medium text-[#184176] hover:text-[#f5821e] transition-colors">
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-[#184176]/40" />
                      <div>
                        <span className="text-[10px] text-[#184176]/50 uppercase tracking-wide block leading-none mb-1">Email</span>
                        <a href={`mailto:${contact.email}`} className="text-sm font-medium text-[#184176] hover:text-[#f5821e] transition-colors break-all">
                          {contact.email}
                        </a>
                      </div>
                    </div>
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
                  <div className="p-6 border-b border-[#184176]/5 group-hover:border-[#f5821e]/30 transition-colors">
                    <span className="text-[10px] uppercase font-semibold text-[#f5821e] tracking-wider block mb-1">Track Chair</span>
                    <h3 className="font-serif text-lg text-[#184176]">
                      {chair.track}
                    </h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center space-y-4">
                    <div className="mb-1">
                      <span className="text-[10px] text-[#184176]/50 uppercase tracking-wide block leading-none mb-1">Chairperson</span>
                      <span className="text-sm font-medium text-[#184176]">{chair.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-[#184176]/40" />
                      <div>
                        <span className="text-[10px] text-[#184176]/50 uppercase tracking-wide block leading-none mb-1">Email</span>
                        <a href={`mailto:${chair.email}`} className="text-sm font-medium text-[#184176] hover:text-[#f5821e] transition-colors break-all">
                          {chair.email}
                        </a>
                      </div>
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
