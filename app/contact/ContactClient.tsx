'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import { EnvelopeIcon, CopyIcon } from '@/components/ui/Icons';
import { executeRecaptcha } from '@/lib/recaptcha';

export default function ContactClient() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('sankalp@jklu.edu.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      // Execute reCAPTCHA for CONTACT_SUBMIT action
      const recaptchaToken = await executeRecaptcha('CONTACT_SUBMIT');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.error('Contact Form Submit Error:', err);
      setStatus({ type: 'error', message: err.message || 'An error occurred while sending your message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f4ef] text-[#184176] font-sans selection:bg-[#f5821e] selection:text-white">
      <Navbar />

      <div className="pt-32 pb-28 px-6 md:px-12 max-w-4xl mx-auto relative z-10 flex-grow space-y-12">
        <header className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-blue uppercase tracking-tight">
            <WordReveal text="Contact Us" className="text-brand-blue" />
          </h1>
          <Reveal variant="in" delay={0.25}>
            <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto">
              SANKALP 2027 International Conference &middot; Institute of Engineering &amp; Technology, JKLU
            </p>
          </Reveal>
          <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
        </header>

        <Reveal delay={0.1} className="bg-white border border-[#E6E8EC] p-8 sm:p-12 shadow-sm rounded-[18px] space-y-10">
          {/* Email Section */}
          <div className="space-y-4 text-center border-b border-[#E6E8EC]/80 pb-8">
            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-widest block font-sans">
              Official Conference Email
            </span>
            <div className="inline-flex items-center justify-center gap-3 bg-[#FCFCFC] border border-[#E6E8EC] px-6 py-3.5 rounded-xl shadow-xs flex-wrap sm:flex-nowrap">
              <EnvelopeIcon size={22} className="text-brand-orange shrink-0" />
              <a 
                href="mailto:sankalp@jklu.edu.in"
                className="text-xl sm:text-2xl font-serif font-bold text-brand-blue hover:text-brand-orange transition-colors tracking-tight"
              >
                sankalp@jklu.edu.in
              </a>
              <button
                onClick={copyEmail}
                title="Copy Email Address"
                aria-label="Copy Email Address"
                className="p-2 rounded-lg bg-white border border-[#E6E8EC] hover:border-brand-orange text-slate-500 hover:text-brand-orange transition-all cursor-pointer flex items-center justify-center shadow-2xs ml-1"
              >
                {copied ? (
                  <span className="text-xs font-bold text-emerald-600 px-1">✓ Copied!</span>
                ) : (
                  <CopyIcon size={16} className="text-slate-500 hover:text-brand-orange" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 font-sans max-w-md mx-auto">
              For paper submissions, registration guidelines, sponsorships, or general conference queries.
            </p>
          </div>

          {/* Interactive Contact Form */}
          <div className="space-y-6 border-b border-[#E6E8EC]/80 pb-10">
            <h2 className="text-xl font-serif font-bold text-brand-blue text-center">
              Send Us a Message
            </h2>

            {status && (
              <div
                className={`p-4 rounded-xl text-xs font-semibold ${
                  status.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot Field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Alex Morgan"
                    className="w-full bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl py-3 px-4 text-sm text-brand-blue placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex.morgan@university.edu"
                    className="w-full bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl py-3 px-4 text-sm text-brand-blue placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Paper Submission Inquiry / Registration Question"
                  className="w-full bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl py-3 px-4 text-sm text-brand-blue placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message or detailed query here..."
                  className="w-full bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl py-3 px-4 text-sm text-brand-blue placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange font-medium transition-all"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-400">
                  Protected by Google reCAPTCHA
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-brand-orange hover:bg-[#e07316] text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left font-sans">
            <div className="space-y-2 p-6 bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A99AD] block">
                Host Institution
              </span>
              <h3 className="font-serif font-bold text-base text-brand-blue">
                Institute of Engineering &amp; Technology
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                JK Lakshmipat University (JKLU), Jaipur
              </p>
            </div>

            <div className="space-y-2 p-6 bg-[#FCFCFC] border border-[#E6E8EC] rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A99AD] block">
                Conference Venue &amp; Address
              </span>
              <h3 className="font-serif font-bold text-base text-brand-blue">
                JK Lakshmipat University
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/venue#map-section"
              className="bg-white text-brand-ink font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-slate-100 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md cursor-pointer text-xs uppercase tracking-wider"
            >
              View Venue &amp; Map
            </a>
          </div>
        </Reveal>
      </div>

      <Footer />
    </div>
  );
}

