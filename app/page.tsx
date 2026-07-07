'use client';

import React from 'react';
import Image from 'next/image';
import { Download, FileText, ExternalLink, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import TrackAccordion from '@/components/ui/TrackAccordion';
import { 
  conferenceDates, 
  keyFeatures, 
  conferenceTracks, 
  submissionSteps, 
  committeeMembers, 
  registrationFees 
} from '@/constants/conferenceData';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-24">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden min-h-[80vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl -top-64 -left-64" />
          <div className="absolute w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl -bottom-64 -right-64" />
        </div>

        <div className="z-10 flex flex-col items-center text-center max-w-4xl w-full">
          <div className="mb-8 animate-fade-in">
            <Image
              src="/logos/jklu_logo.svg"
              alt="JKLU Logo"
              width={180}
              height={60}
              priority
              className="h-12 w-auto object-contain"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-orange to-brand-blue">
            SANKALP &apos;27
          </h1>

          <p className="text-brand-blue text-xl md:text-3xl font-bold tracking-wide mb-4">
            International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-slate-600 font-medium mb-12 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <Calendar size={18} className="text-brand-orange" />
              <span>5–6 March 2027</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <MapPin size={18} className="text-brand-orange" />
              <span>Hybrid Mode | JKLU, Jaipur</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <FileText size={20} />
              Submit Paper
            </button>
            <button className="bg-brand-blue hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
              Register Now
            </button>
            <a href="#call-for-papers" className="bg-white hover:bg-slate-50 text-brand-blue border border-brand-blue font-bold py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all">
              Call for Papers
            </a>
          </div>
        </div>
      </section>

      {/* THREE COLUMN INFO SECTION */}
      <Section bgWhite>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Latest Information */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
            <h3 className="text-xl font-bold text-brand-blue mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-brand-orange rounded-sm"></span>
              Latest Information
            </h3>
            <ul className="space-y-4 flex-grow">
              {[
                'Call for Papers opens on 15 July 2026',
                'Full paper submission deadline: 31 October 2026',
                'Conference mode: Hybrid',
                'Registration details will be announced soon',
                'Publication opportunity in Springer Lecture Notes Series (tentative)'
              ].map((info, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded mt-1 shrink-0">NEW</span>
                  <span className="text-slate-600 text-sm leading-relaxed">{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center: Welcome */}
          <div className="bg-brand-blue p-8 rounded-2xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden h-full">
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-brand-orange/20 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Welcome to SANKALP 2027</h3>
            <p className="text-brand-cloud/90 text-sm leading-relaxed mb-4 relative z-10">
              SANKALP 2027 is a premier international multidisciplinary conference hosted by JK Lakshmipat University, designed to bring together researchers, academicians, industry experts, policymakers, innovators, and students from across the globe.
            </p>
            <p className="text-brand-cloud/90 text-sm leading-relaxed relative z-10">
              The conference aims to foster collaboration and knowledge exchange at the intersection of emerging technologies, sustainability, innovation, and future-ready systems.
            </p>
          </div>

          {/* Right: Important Dates */}
          <div id="important-dates" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
            <h3 className="text-xl font-bold text-brand-blue mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-brand-orange rounded-sm"></span>
              Important Dates
            </h3>
            <div className="space-y-5 flex-grow">
              {conferenceDates.map((dateItem, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider mb-1">{dateItem.label}</span>
                  <span className="text-brand-ink font-medium">{dateItem.date}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </Section>

      {/* ABOUT JKLU */}
      <Section id="about" title="JK Lakshmipat University, Jaipur" subtitle="JK Lakshmipat University is a leading multidisciplinary university committed to nurturing innovation, academic excellence, research, and global engagement. Established by the prestigious JK Organization, JKLU focuses on creating future-ready professionals through experiential learning, interdisciplinary education, and industry-integrated academic practices.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            'Outcome-based and experiential learning',
            'Global academic collaborations and exchange opportunities',
            'Research-driven innovation and entrepreneurship',
            'Industry engagement and real-world problem solving',
            'Holistic development and leadership cultivation'
          ].map((point, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <CheckCircle2 className="text-brand-orange shrink-0 mt-1" size={20} />
              <p className="text-slate-700 font-medium">{point}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* KEY FEATURES */}
      <Section bgWhite title="Conference Highlights">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feature, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all group">
              <div className="w-16 h-16 mx-auto bg-brand-blue/5 text-brand-blue rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <span className="text-2xl font-bold">{i + 1}</span>
              </div>
              <h4 className="text-lg font-bold text-brand-ink">{feature.title}</h4>
            </div>
          ))}
        </div>
      </Section>

      {/* TRACKS */}
      <Section id="tracks" title="Conference Tracks" subtitle="SANKALP 2027 invites original research contributions across the following major tracks.">
        <div className="max-w-4xl mx-auto mt-8">
          {conferenceTracks.map((track, i) => (
            <TrackAccordion key={track.id} track={track} index={i} />
          ))}
        </div>
      </Section>

      {/* COMMITTEE */}
      <Section id="committee" bgWhite title="Conference Committee">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Patrons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
              <p className="text-sm font-bold text-brand-orange uppercase mb-2">{committeeMembers.chiefPatron.role}</p>
              <h4 className="text-xl font-bold text-brand-blue">{committeeMembers.chiefPatron.name}</h4>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
              <p className="text-sm font-bold text-brand-orange uppercase mb-2">{committeeMembers.chiefCoPatron.role}</p>
              <h4 className="text-xl font-bold text-brand-blue">{committeeMembers.chiefCoPatron.name}</h4>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center border-b-4 border-b-brand-blue">
              <p className="text-sm font-bold text-brand-orange uppercase mb-2">{committeeMembers.patron.role}</p>
              <h4 className="text-xl font-bold text-brand-blue">{committeeMembers.patron.name}</h4>
              <p className="text-slate-500 text-sm mt-1">{committeeMembers.patron.title}</p>
            </div>
          </div>

          {/* Chairs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {committeeMembers.chairs.map((chair, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                <p className="text-sm font-bold text-brand-orange uppercase mb-2">{chair.role}</p>
                <h4 className="text-xl font-bold text-brand-blue">{chair.name}</h4>
                <p className="text-slate-500 text-sm mt-1">{chair.title}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <p className="text-sm font-bold text-brand-orange uppercase mb-2">Program Chairs</p>
            <h4 className="text-xl font-bold text-brand-blue">{committeeMembers.programChairs}</h4>
          </div>

          {/* Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
            <div className="border border-dashed border-slate-300 p-6 rounded-xl text-center text-slate-500 font-medium">International Advisory Board</div>
            <div className="border border-dashed border-slate-300 p-6 rounded-xl text-center text-slate-500 font-medium">National Advisory Board</div>
            <div className="border border-dashed border-slate-300 p-6 rounded-xl text-center text-slate-500 font-medium">Internal Committees</div>
          </div>

        </div>
      </Section>

      {/* CALL FOR PAPERS & SUBMISSION */}
      <Section id="call-for-papers" title="Call for Papers & Submission">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 mb-12">
            <p className="text-slate-700 leading-relaxed mb-6">
              Researchers, academicians, industry professionals, and scholars are invited to submit original and unpublished research papers aligned with the conference themes. All submissions will undergo a rigorous peer-review process by the Technical Program Committee.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl mb-8">
              <h4 className="font-bold text-brand-blue mb-4">Submission Guidelines</h4>
              <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
                <li>Papers must be original and not under review elsewhere</li>
                <li>Submissions should follow the conference template</li>
                <li>Accepted papers must be presented during the conference</li>
                <li>At least one author of each accepted paper must register</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors">
                <Download size={18} />
                Download Template
              </button>
              <button className="flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                <ExternalLink size={18} />
                Paper Submission Portal
              </button>
            </div>
          </div>

          <h3 id="submission" className="text-2xl font-bold text-center text-brand-blue mb-8">Submission Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submissionSteps.map((step) => (
              <div key={step.step} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xl shrink-0">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue text-lg mb-2">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PUBLICATION & REGISTRATION */}
      <Section id="publication" bgWhite title="Publication & Registration">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Publication */}
          <div>
            <h3 className="text-2xl font-bold text-brand-blue mb-6">Publication Details</h3>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 h-full">
              <p className="text-slate-700 leading-relaxed mb-6">
                Selected high-quality papers presented at SANKALP 2027 will be considered for publication in:
              </p>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue shrink-0">
                  <FileText size={24} />
                </div>
                <span className="font-bold text-brand-ink">Springer Lecture Notes Series <span className="text-brand-orange font-normal text-sm ml-2">(Tentative)</span></span>
              </div>
              <p className="text-slate-600 text-sm">
                Extended versions of selected papers may also be recommended for Scopus/SCI-indexed journals (tentative).
              </p>
            </div>
          </div>

          {/* Registration */}
          <div id="registration">
            <h3 className="text-2xl font-bold text-brand-blue mb-6">Registration Fees</h3>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-blue text-white">
                    <th className="p-4 font-semibold text-sm">Category</th>
                    <th className="p-4 font-semibold text-sm">National</th>
                    <th className="p-4 font-semibold text-sm">International</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registrationFees.map((fee, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-4 text-sm font-medium text-slate-700">{fee.category}</td>
                      <td className="p-4 text-sm text-slate-600 font-semibold">{fee.national}</td>
                      <td className="p-4 text-sm text-slate-600 font-semibold">{fee.international}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-slate-50 text-xs text-slate-500 border-t border-slate-200 text-center">
                * Registration fees are tentative and subject to final confirmation.
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* VENUE & CONTACT */}
      <Section id="venue" title="About Venue & Contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Venue */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-brand-blue mb-2">JK Lakshmipat University</h3>
            <p className="text-slate-500 font-medium mb-6">Jaipur, India</p>
            <p className="text-slate-700 leading-relaxed mb-8">
              Located in the vibrant city of Jaipur, JKLU offers a modern academic environment with state-of-the-art infrastructure, research facilities, innovation labs, and collaborative learning spaces.
            </p>
            <div className="w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center border border-dashed border-slate-300">
              <span className="text-slate-400 font-medium">[ Map Placeholder ]</span>
            </div>
          </div>

          {/* Contact & Sponsors */}
          <div className="space-y-8">
            <div id="contact" className="bg-brand-blue text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-orange/20 rounded-full blur-xl"></div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4 text-brand-cloud/90 text-sm">
                <p><strong className="text-white">SANKALP 2027 Conference</strong></p>
                <p>JK Lakshmipat University, Jaipur, India</p>
                <p><strong>Email:</strong> [conference email]</p>
                <p><strong>Website:</strong> [conference website URL]</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-brand-blue mb-4">Sponsors & Partners</h4>
              <div className="grid grid-cols-2 gap-4">
                {['Academic Partners', 'Industry Partners', 'Research Collaborators', 'Knowledge Partners'].map((partner, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 text-center text-xs font-bold text-slate-500 shadow-sm flex items-center justify-center min-h-16">
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Section>

      <Footer />
    </main>
  );
}
