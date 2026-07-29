'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { conferenceTracks } from '@/constants/conferenceData';

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5 font-sans">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all rounded-xl";

export default function SubmitPaperClient() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    countryCode: '+91',
    authorPhone: '',
    affiliation: '',
    country: 'India',
    paperTitle: '',
    abstract: '',
    trackId: '',
    keywords: '',
    coAuthors: '',
    documentUrl: '',
    honeypot: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const steps = [
    { s: 1, name: 'Author Info' },
    { s: 2, name: 'Paper Metadata' },
    { s: 3, name: 'Manuscript' },
    { s: 4, name: 'Confirmation' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedTrack = conferenceTracks.find(t => t.id === formData.trackId);
      const fullPhone = `${formData.countryCode} ${formData.authorPhone.trim()}`;
      const payload = {
        ...formData,
        authorPhone: fullPhone,
        trackTitle: selectedTrack ? selectedTrack.title : 'General',
      };

      const res = await fetch('/api/submit-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Paper submission failed.');

      setSubmissionResult(data.submission);
      setStep(4);
    } catch (err: any) {
      alert(err.message || 'Error submitting paper. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      <section className="flex-grow pt-32 pb-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-blue mb-3 tracking-tight">
              Submit Research Paper
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto font-medium">
              Submit your original, unpublished research work for peer review and publication in indexed proceedings.
            </p>
          </div>

          <div className="flex items-center gap-0 mb-10 max-w-2xl mx-auto">
            {steps.map((item, idx) => (
              <React.Fragment key={item.s}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    step > item.s
                      ? 'bg-brand-orange border-brand-orange text-white'
                      : step === item.s
                      ? 'bg-white border-brand-orange text-brand-orange'
                      : 'bg-white border-slate-200 text-slate-300'
                  }`}>
                    {step > item.s ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : item.s}
                  </div>
                  <span className={`text-[10px] font-semibold ${step >= item.s ? 'text-brand-blue' : 'text-slate-300'}`}>{item.name}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mb-5 mx-1 transition-all ${step > item.s ? 'bg-brand-orange' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">

              {step === 1 && (
                <motion.div 
                  key="step1" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.35, ease: 'easeOut' }} 
                  className="p-8 md:p-10 space-y-7"
                >
                  <div className="border-b border-slate-100 pb-6">
                    <p className="text-xs font-semibold text-brand-orange mb-1">Step 1 of 3</p>
                    <h2 className="font-serif font-bold text-brand-blue text-2xl md:text-3xl">Corresponding Author Profile</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Primary author contact details for editorial correspondence.</p>
                  </div>

                  <FormField label="Full Name (Primary Author) *">
                    <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Dr. Jane Doe" className={inputCls} />
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField label="Email Address *">
                      <input type="email" name="authorEmail" value={formData.authorEmail} onChange={handleChange} placeholder="jane.doe@university.edu" className={inputCls} />
                    </FormField>
                    <FormField label="Mobile / WhatsApp Number *">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          name="countryCode" 
                          value={formData.countryCode} 
                          onChange={handleChange} 
                          placeholder="+91" 
                          className="w-24 border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 font-mono font-semibold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 rounded-xl shrink-0" 
                        />
                        <input type="tel" name="authorPhone" value={formData.authorPhone} onChange={handleChange} placeholder="9876543210" className={inputCls} />
                      </div>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField label="Institution / Organisation *">
                      <input type="text" name="affiliation" value={formData.affiliation} onChange={handleChange} placeholder="JK Lakshmipat University, Jaipur" className={inputCls} />
                    </FormField>
                    <FormField label="Country *">
                      <select name="country" value={formData.country} onChange={handleChange} className={inputCls}>
                        {['India','United States','United Kingdom','Germany','Japan','Singapore','Canada','Australia','Taiwan','Other'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </FormField>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button 
                      onClick={() => {
                        if (!formData.authorName || !formData.authorEmail || !formData.authorPhone || !formData.affiliation) {
                          return alert('Please fill in all required author fields.');
                        }
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.authorEmail)) {
                          return alert('Please enter a valid email address.');
                        }
                        setStep(2);
                      }} 
                      className="bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold px-7 py-3 rounded-xl transition-all shadow-md shadow-brand-orange/20 flex items-center gap-2 cursor-pointer"
                    >
                      Continue to Paper Details
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.35, ease: 'easeOut' }} 
                  className="p-8 md:p-10 space-y-7"
                >
                  <div className="border-b border-slate-100 pb-6">
                    <p className="text-xs font-semibold text-brand-orange mb-1">Step 2 of 3</p>
                    <h2 className="font-serif font-bold text-brand-blue text-2xl md:text-3xl">Paper Details &amp; Track</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Select conference track, enter paper title, abstract, and keywords.</p>
                  </div>

                  <FormField label="Conference Track *">
                    <select name="trackId" value={formData.trackId} onChange={handleChange} className={inputCls}>
                      <option value="">— Select Conference Track —</option>
                      {conferenceTracks.map(t => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Paper Title *">
                    <input type="text" name="paperTitle" value={formData.paperTitle} onChange={handleChange} placeholder="e.g. Energy-Efficient Transformer Models for Edge Computing" className={inputCls} />
                  </FormField>

                  <FormField label="Abstract (Max 300 words) *">
                    <textarea 
                      name="abstract" 
                      rows={5} 
                      value={formData.abstract} 
                      onChange={handleChange} 
                      placeholder="Provide a concise summary of research objectives, methodology, key findings, and contributions..." 
                      className={`${inputCls} resize-y`}
                    />
                  </FormField>

                  <FormField label="Keywords (Comma separated)">
                    <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="e.g. Sustainable AI, Edge Computing, Transformers, Energy Efficiency" className={inputCls} />
                  </FormField>

                  <div className="pt-2 flex justify-between items-center">
                    <button onClick={() => setStep(1)} className="text-slate-500 hover:text-brand-blue text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back
                    </button>
                    <button 
                      onClick={() => {
                        if (!formData.trackId) return alert('Please select a conference track.');
                        if (!formData.paperTitle.trim()) return alert('Please enter paper title.');
                        if (!formData.abstract.trim()) return alert('Please enter paper abstract.');
                        setStep(3);
                      }} 
                      className="bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold px-7 py-3 rounded-xl transition-all shadow-md shadow-brand-orange/20 flex items-center gap-2 cursor-pointer"
                    >
                      Continue to Manuscript Upload
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.35, ease: 'easeOut' }} 
                  className="p-8 md:p-10 space-y-7"
                >
                  <div className="border-b border-slate-100 pb-6">
                    <p className="text-xs font-semibold text-brand-orange mb-1">Step 3 of 3</p>
                    <h2 className="font-serif font-bold text-brand-blue text-2xl md:text-3xl">Co-Authors &amp; Manuscript Link</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Add co-authors and provide paper manuscript file URL or cloud drive link.</p>
                  </div>

                  <FormField label="Co-Authors (Names & Affiliations, if any)">
                    <input type="text" name="coAuthors" value={formData.coAuthors} onChange={handleChange} placeholder="e.g. Dr. John Smith (MIT), Prof. Alice Wang (IIT Delhi)" className={inputCls} />
                  </FormField>

                  <FormField label="Manuscript Document Link (PDF / Word Google Drive or Cloud Link)">
                    <input type="url" name="documentUrl" value={formData.documentUrl} onChange={handleChange} placeholder="https://drive.google.com/file/d/..." className={inputCls} />
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">Ensure link permission is set to 'Anyone with link can view'.</p>
                  </FormField>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 text-xs text-slate-600 space-y-2 font-medium">
                    <span className="font-bold text-brand-blue block text-sm">Submission Guidelines Checklist:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Paper adheres to standard IEEE / Springer double-column format.</li>
                      <li>Manuscript does not violate plagiarism guidelines (&lt;15% similarity index).</li>
                      <li>Submission is original and not currently under review elsewhere.</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button onClick={() => setStep(2)} className="text-slate-500 hover:text-brand-blue text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back
                    </button>
                    
                    <button 
                      onClick={handleSubmit} 
                      disabled={loading}
                      className="bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold px-7 py-3 rounded-xl transition-all shadow-md shadow-brand-orange/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? 'Submitting Paper…' : 'Submit Paper Now ↗'}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && submissionResult && (
                <motion.div 
                  key="step4" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.4, ease: 'easeOut' }} 
                  className="p-8 md:p-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                      Submission Received
                    </span>
                    <h2 className="font-serif font-bold text-brand-blue text-3xl mt-3">Paper Submitted Successfully</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Your paper has been registered in the SANKALP 2027 peer-review portal.</p>
                  </div>

                  <div className="bg-[#FCFCFC] border border-slate-200/90 rounded-xl p-6 text-left max-w-lg mx-auto space-y-3 font-medium text-xs text-slate-700">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-semibold">Paper ID</span>
                      <span className="font-mono font-bold text-brand-blue text-sm">{submissionResult.paperId}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-semibold">Corresponding Author</span>
                      <span>{submissionResult.authorName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-semibold">Track</span>
                      <span>{submissionResult.trackTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block mb-1">Paper Title</span>
                      <span className="font-semibold text-brand-blue">{submissionResult.paperTitle}</span>
                    </div>
                  </div>

                  <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-xl p-4 max-w-lg mx-auto text-xs text-slate-600 font-medium">
                    📧 An email acknowledgement with your Paper ID has been sent to <strong>{submissionResult.authorEmail}</strong>. Peer-review notifications will be sent by 30 November 2026.
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={() => window.print()} 
                      className="bg-white border border-slate-200 text-slate-700 hover:border-brand-orange text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
                    >
                      Print Receipt
                    </button>
                    <a 
                      href="/call-for-papers" 
                      className="bg-brand-blue text-white hover:bg-blue-900 text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
                    >
                      Back to Call for Papers
                    </a>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
