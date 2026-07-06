import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | ICATS-2026',
  description: 'Official contact directory for the International Conference on Advanced Technology & Science (ICATS-2026) at JK Lakshmipat University.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | ICATS-2026',
    description: 'Official contact directory for the International Conference on Advanced Technology & Science (ICATS-2026) at JK Lakshmipat University.',
    type: 'website',
  }
};

export default function ContactPage() {
  const contactDirectory = [
    {
      name: "Dr. Sanjay Goel",
      role: "Organizing Chair",
      department: "Director, Institute of Engineering & Technology",
      phone: "+91 141 7107500",
      email: "sanjay.goel@jklu.edu.in"
    },
    {
      name: "Mr. Deepak Sogani",
      role: "Administrative & Logistics Liaison",
      department: "Head - Student & Administrative Affairs",
      phone: "+91 141 7107500",
      email: "deepak.sogani@jklu.edu.in"
    },
    {
      name: "Conference Secretariat",
      role: "General Queries & Support",
      department: "Office of Research & Development",
      phone: "+91 141 7107500",
      email: "info@jklu.edu.in"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            Contact Directory
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            For inquiries regarding paper submissions, venue logistics, or registration support, please get in touch with our team.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Campus Address Card */}
          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm md:col-span-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-950 uppercase">
                Venue Location
              </h3>
              <p className="text-slate-500 text-xs max-w-xl leading-relaxed">
                ICATS-2026 is hosted at the modern, fully equipped campus of JK Lakshmipat University in the historic city of Jaipur, Rajasthan, India.
              </p>
            </div>
            
            <div className="flex items-start gap-3 text-xs">
              <MapPin size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1">Campus Address</h4>
                <p className="text-slate-500 leading-relaxed max-w-xs">
                  JK Lakshmipat University, Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Committee & Admin Contacts */}
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">
              Conference Contacts
            </h2>
            <div className="w-12 h-1 bg-amber-600 mt-2 rounded" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {contactDirectory.map((contact, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-5 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {contact.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-amber-700 block mt-0.5">
                    {contact.role}
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-0.5 leading-tight">
                    {contact.department}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} className="text-slate-400" />
                    <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-amber-700 transition-colors font-medium">
                      {contact.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail size={14} className="text-slate-400" />
                    <a href={`mailto:${contact.email}`} className="hover:text-amber-700 transition-colors font-medium break-all">
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
