'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { load } from '@cashfreepayments/cashfree-js';
import { REGISTRATION_CATEGORIES } from '@/constants/fees';

/* ─── Animation presets ─────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease } } };
const stagger = (delay = 0): Variants => ({ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: delay } } });

/* ─── Static data ────────────────────────────────────────────── */
const feeMatrix = [
  { label: 'IEEE Member', national: true, sub: 'IEEE Member' },
  { label: 'General', national: true, sub: 'General (Non-IEEE)' },
];

const timelineSteps = [
  { num: '01', title: 'Paper Acceptance', body: 'Receive your formal acceptance notification from the Technical Programme Committee via email.' },
  { num: '02', title: 'Select Category', body: 'Choose your registration tier — student, academician, industry, or delegate. Each is priced transparently.' },
  { num: '03', title: 'Online Checkout', body: 'Complete payment instantly via Cashfree PG (UPI, Card, Net Banking, Wallets).' },
  { num: '04', title: 'QR Pass Dispatch', body: 'Receive your official PDF receipt with an embedded QR check-in pass directly to your inbox.' },
  { num: '05', title: 'Conference Day', body: 'Present your research, attend keynotes, and engage with an international academic community in Jaipur.' },
];

const inclusions = [
  'Official Conference Kit',
  'All Technical Sessions',
  'Keynote & Plenary Addresses',
  'Indexed Conference Proceedings',
  'Networking & Industry Roundtables',
  'Best Paper Award Ceremony',
  'Participation Certificate',
  'Complimentary Lunch & Refreshments',
];

const policies = [
  'All accepted paper authors are required to register for proceedings inclusion.',
  'At least one co-author must hold a valid paid registration per paper.',
  'Registration is activated immediately after payment confirmation.',
  'All registrations are non-refundable once processed.',
  'Delegates must present their QR check-in pass at the venue.',
];

/* ─── Input component ──────────────────────────────────────── */
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all rounded-xl";

/* ─── Main Page ───────────────────────────────────────────────── */
export default function Registration() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    affiliation: '',
    designation: 'Student',
    category: '',
    paperId: '',
    paperTitle: '',
    country: 'India',
    pincode: '',
    city: '',
    region: '',
    needAccommodation: 'No',
    coupon: '',
  });

  const [couponValid, setCouponValid] = useState<boolean | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [finalAmount, setFinalAmount] = useState<number | null>(null);
  const [successData, setSuccessData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handlePincode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pin = e.target.value.trim();
    setFormData(p => ({ ...p, pincode: pin }));
    if (pin.length === 6 && /^\d+$/.test(pin) && formData.country.toLowerCase() === 'india') {
      setLoading(true);
      try {
        const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'VERIFY_PINCODE', pincode: pin }) });
        const data = await res.json();
        if (res.ok && data[0]?.Status === 'Success') {
          const o = data[0].PostOffice[0];
          setFormData(p => ({ ...p, city: o.District, region: o.State }));
        }
      } finally { setLoading(false); }
    }
  };

  const verifyCoupon = async () => {
    if (!formData.coupon.trim()) return;
    setCouponLoading(true); setCouponMessage('');
    try {
      const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'VERIFY_COUPON', coupon: formData.coupon, category: formData.category }) });
      const data = await res.json();
      if (res.ok && data.valid) {
        setCouponValid(true); setFinalAmount(data.amount);
        setCouponMessage(`Coupon applied — discounted fee: ₹${data.amount.toLocaleString()} + 18% GST`);
      } else {
        setCouponValid(false); setFinalAmount(null);
        setCouponMessage('Invalid or expired coupon code.');
      }
    } finally { setCouponLoading(false); }
  };

  const getAmount = () => REGISTRATION_CATEGORIES.find(c => c.id === formData.category)?.amount ?? 0;

  const startCheckout = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'CREATE_ORDER', ...formData }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create payment order');
      const { order_id, payment_session_id, is_mock } = data;
      if (is_mock) { await verifyPayment(order_id); } else { await doCheckout(payment_session_id, order_id); }
    } catch (err: any) {
      alert(err.message || 'Registration failed. Please check inputs and try again.');
    } finally { setLoading(false); }
  };

  const doCheckout = async (paymentSessionId: string, orderId: string) => {
    try {
      const cashfree = await load({ mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox' });
      await cashfree.checkout({ paymentSessionId, redirectTarget: '_self' });
    } catch { alert('Error initializing payment gateway.'); }
  };

  const verifyPayment = async (orderId: string) => {
    const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'VERIFY_PAYMENT', order_id: orderId }) });
    const data = await res.json();
    if (res.ok && data.success) { setSuccessData(data.registration); setStep(5); }
    else alert(data.error || 'Payment verification failed.');
  };

  const isPresenter = formData.category.includes('presenter') || formData.category === 'foreign_delegate';

  const openForm = (categoryId = 'student_presenter') => {
    setFormData(p => ({ ...p, category: categoryId }));
    setStep(1); setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsFormOpen(false); setStep(1);
    setFormData({ name: '', email: '', phone: '', affiliation: '', designation: 'Student', category: '', paperId: '', paperTitle: '', country: 'India', pincode: '', city: '', region: '', needAccommodation: 'No', coupon: '' });
    setCouponValid(null); setFinalAmount(null); setSuccessData(null);
  };

  /* ── Step labels ─────────────────────────────── */
  const steps = [
    { s: 1, name: 'Profile' },
    { s: 2, name: 'Category' },
    { s: 3, name: 'Location' },
    { s: 4, name: 'Checkout' },
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {isFormOpen ? (
        /* ══════════════════════════════
           CHECKOUT FORM
        ══════════════════════════════ */
        <section className="flex-grow pt-32 pb-24 px-4 md:px-6">
          <div className="max-w-2xl mx-auto">

            {/* Breadcrumb back */}
            <button
              onClick={resetForm}
              className="flex items-center gap-2 text-slate-500 hover:text-brand-blue text-xs font-bold uppercase tracking-[0.18em] mb-8 transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back to Registration
            </button>

            {/* Step indicator */}
            {step < 5 && (
              <div className="flex items-center gap-0 mb-10">
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
                      <span className={`text-[9px] font-bold uppercase tracking-[0.15em] ${step >= item.s ? 'text-brand-blue' : 'text-slate-300'}`}>{item.name}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`flex-1 h-[2px] mb-5 mx-1 transition-all ${step > item.s ? 'bg-brand-orange' : 'bg-slate-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Form card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="p-8 md:p-10 space-y-7">
                    <div className="border-b border-slate-100 pb-6">
                      <p className="text-[10px] font-bold tracking-[0.18em] text-brand-orange uppercase mb-1.5">Step 1 of 4</p>
                      <h2 className="font-serif font-bold text-brand-blue text-2xl md:text-3xl">Participant Profile</h2>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Your contact and institutional credentials.</p>
                    </div>

                    <FormField label="Full Name *">
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. Jane Doe" className={inputCls} />
                    </FormField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField label="Email Address *">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane.doe@university.edu" className={inputCls} />
                      </FormField>
                      <FormField label="Mobile Number *">
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" className={inputCls} />
                      </FormField>
                    </div>

                    <FormField label="Institution / Organisation *">
                      <input type="text" name="affiliation" value={formData.affiliation} onChange={handleChange} placeholder="JK Lakshmipat University, Jaipur" className={inputCls} />
                    </FormField>

                    <FormField label="Designation *">
                      <select name="designation" value={formData.designation} onChange={handleChange} className={inputCls}>
                        <option>Student</option>
                        <option value="Research Scholar">Research Scholar (PhD)</option>
                        <option value="Academician / Faculty">Academician / Faculty</option>
                        <option value="Industry Professional">Industry Professional</option>
                        <option>Other</option>
                      </select>
                    </FormField>

                    <div className="pt-2 flex justify-end">
                      <button onClick={() => {
                        if (!formData.name || !formData.email || !formData.phone || !formData.affiliation) return alert('Please fill in all required fields.');
                        if (!/^[A-Za-z\s.]+$/.test(formData.name)) return alert('Name must contain letters only.');
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return alert('Please enter a valid email.');
                        if (!/^\d{10,15}$/.test(formData.phone.replace(/[\s\-\+]/g, ''))) return alert('Please enter a valid phone number.');
                        setStep(2);
                      }} className="bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-[0.18em] px-8 py-3.5 rounded-xl transition-all shadow-md shadow-brand-orange/20 flex items-center gap-2 cursor-pointer">
                        Continue
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="p-8 md:p-10 space-y-7">
                    <div className="border-b border-slate-100 pb-6">
                      <p className="text-[10px] font-bold tracking-[0.18em] text-brand-orange uppercase mb-1.5">Step 2 of 4</p>
                      <h2 className="font-serif font-bold text-brand-blue text-2xl md:text-3xl">Category &amp; Paper Details</h2>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Select your participation tier and provide paper references if presenting.</p>
                    </div>

                    <FormField label="Registration Tier *">
                      <select name="category" value={formData.category} onChange={handleChange} className={inputCls}>
                        <option value="">— Select a category —</option>
                        {REGISTRATION_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name} — ₹{cat.amount.toLocaleString()} + GST</option>
                        ))}
                      </select>
                    </FormField>

                    {formData.category && !isPresenter && (
                      <div className="flex items-start gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-sm text-slate-600 font-medium">
                        <span className="text-brand-orange font-bold mt-0.5">ℹ</span>
                        <span>Delegate / attendee categories do not require a paper ID.</span>
                      </div>
                    )}

                    {isPresenter && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 pl-5 border-l-2 border-brand-orange">
                        <FormField label="Paper ID *">
                          <input type="text" name="paperId" value={formData.paperId} onChange={handleChange} placeholder="e.g. 104" className={`${inputCls} font-mono font-bold`} />
                        </FormField>
                        <FormField label="Paper Title *">
                          <input type="text" name="paperTitle" value={formData.paperTitle} onChange={handleChange} placeholder="e.g. Sustainable AI Architectures for Climate Resilience" className={inputCls} />
                        </FormField>
                      </motion.div>
                    )}

                    <div className="pt-2 flex justify-between items-center">
                      <button onClick={() => setStep(1)} className="text-slate-400 hover:text-brand-blue text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-1.5 transition-colors cursor-pointer">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back
                      </button>
                      <button onClick={() => {
                        if (!formData.category) return alert('Please select a registration category.');
                        if (isPresenter && (!formData.paperId || !formData.paperTitle)) return alert('Paper ID and Title are required.');
                        setStep(3);
                      }} className="bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-[0.18em] px-8 py-3.5 rounded-xl transition-all shadow-md shadow-brand-orange/20 flex items-center gap-2 cursor-pointer">
                        Continue
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="p-8 md:p-10 space-y-7">
                    <div className="border-b border-slate-100 pb-6">
                      <p className="text-[10px] font-bold tracking-[0.18em] text-brand-orange uppercase mb-1.5">Step 3 of 4</p>
                      <h2 className="font-serif font-bold text-brand-blue text-2xl md:text-3xl">Location &amp; Accommodation</h2>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Your correspondence address and lodging preferences.</p>
                    </div>

                    <FormField label="Country *">
                      <select name="country" value={formData.country} onChange={handleChange} className={inputCls}>
                        {['India','United States','United Kingdom','Germany','Japan','Singapore','Canada','Australia','Other'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </FormField>

                    {formData.country.toLowerCase() === 'india' && (
                      <FormField label="Pincode (auto-fill enabled) *">
                        <div className="relative">
                          <input type="text" name="pincode" maxLength={6} value={formData.pincode} onChange={handlePincode} placeholder="302026" className={`${inputCls} font-mono`} />
                          {loading && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-brand-orange tracking-widest uppercase animate-pulse">Resolving…</span>}
                        </div>
                      </FormField>
                    )}

                    <div className="grid grid-cols-2 gap-5">
                      <FormField label="City *">
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Jaipur" className={inputCls} />
                      </FormField>
                      <FormField label="State / Region *">
                        <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Rajasthan" className={inputCls} />
                      </FormField>
                    </div>

                    <FormField label="Do you require accommodation? *">
                      <div className="flex gap-6 mt-1">
                        {['Yes','No'].map(v => (
                          <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.needAccommodation === v ? 'border-brand-orange' : 'border-slate-300'}`}>
                              {formData.needAccommodation === v && <div className="w-2 h-2 rounded-full bg-brand-orange" />}
                            </div>
                            <input type="radio" name="needAccommodation" value={v} checked={formData.needAccommodation === v} onChange={handleChange} className="sr-only" />
                            <span className={`text-sm font-semibold ${formData.needAccommodation === v ? 'text-brand-blue' : 'text-slate-500'}`}>{v === 'Yes' ? 'Yes — charge separately' : 'No'}</span>
                          </label>
                        ))}
                      </div>
                    </FormField>

                    <div className="pt-2 flex justify-between items-center">
                      <button onClick={() => setStep(2)} className="text-slate-400 hover:text-brand-blue text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-1.5 transition-colors cursor-pointer">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back
                      </button>
                      <button onClick={() => {
                        if (!formData.city || !formData.region) return alert('Please fill in city and region.');
                        setStep(4);
                      }} className="bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-[0.18em] px-8 py-3.5 rounded-xl transition-all shadow-md shadow-brand-orange/20 flex items-center gap-2 cursor-pointer">
                        Continue
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="p-8 md:p-10 space-y-7">
                    <div className="border-b border-slate-100 pb-6">
                      <p className="text-[10px] font-bold tracking-[0.18em] text-brand-orange uppercase mb-1.5">Step 4 of 4</p>
                      <h2 className="font-serif font-bold text-brand-blue text-2xl md:text-3xl">Review &amp; Payment</h2>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Confirm your details before completing the secure checkout.</p>
                    </div>

                    {/* Summary table */}
                    <div className="rounded-xl border border-slate-200/80 overflow-hidden">
                      {[
                        ['Participant', formData.name],
                        ['Email', formData.email],
                        ['Institution', formData.affiliation],
                        ['Category', REGISTRATION_CATEGORIES.find(c => c.id === formData.category)?.name ?? '—'],
                        ...(isPresenter ? [['Paper ID', formData.paperId]] : []),
                      ].map(([k, v], i) => (
                        <div key={k} className={`flex items-start justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}`}>
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 w-28 shrink-0 pt-0.5">{k}</span>
                          <span className="font-semibold text-slate-800 text-right">{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Coupon */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">Promo / Coupon Code</label>
                      <div className="flex gap-2">
                        <input
                          type="text" name="coupon" value={formData.coupon}
                          onChange={e => setFormData(p => ({ ...p, coupon: e.target.value.toUpperCase() }))}
                          placeholder="SANKALP10"
                          className={`${inputCls} font-mono font-bold flex-1`}
                        />
                        <button type="button" onClick={verifyCoupon} disabled={couponLoading}
                          className="bg-brand-blue hover:bg-blue-950 text-white text-xs font-bold uppercase tracking-widest px-5 rounded-xl transition-all disabled:opacity-40 cursor-pointer shrink-0">
                          {couponLoading ? '…' : 'Apply'}
                        </button>
                      </div>
                      {couponMessage && (
                        <p className={`text-xs font-semibold ${couponValid ? 'text-emerald-600' : 'text-red-500'}`}>{couponMessage}</p>
                      )}
                    </div>

                    {/* Pricing block */}
                    <div className="rounded-xl border border-slate-200/80 overflow-hidden">
                      <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50/60 text-sm">
                        <span className="text-slate-500 font-medium">Base Registration Fee</span>
                        <span className="font-bold text-slate-800">₹{getAmount().toLocaleString()} + 18% GST</span>
                      </div>
                      {couponValid && finalAmount !== null && (
                        <div className="flex justify-between items-center px-5 py-3.5 bg-white text-sm text-emerald-700">
                          <span className="font-medium">Coupon Discount</span>
                          <span className="font-bold">− ₹{(getAmount() - finalAmount).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center px-5 py-4 bg-brand-blue text-white">
                        <span className="font-serif font-bold text-base">Total Payable</span>
                        <div className="text-right">
                          <span className="font-mono font-black text-xl text-brand-orange">₹{(finalAmount ?? getAmount()).toLocaleString()}</span>
                          <span className="text-white/60 text-xs block font-medium">+ 18% GST applied at gateway</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <button onClick={() => setStep(3)} disabled={loading} className="text-slate-400 hover:text-brand-blue text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Back
                      </button>
                      <button onClick={startCheckout} disabled={loading}
                        className="bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-[0.18em] px-9 py-4 rounded-xl transition-all shadow-lg shadow-brand-orange/25 flex items-center gap-3 cursor-pointer disabled:opacity-50 min-w-[220px] justify-center">
                        {loading ? (
                          <span className="flex items-center gap-2"><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>Processing…</span>
                        ) : 'Complete Registration →'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && successData && (
                  <motion.div key="s5" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="p-10 md:p-14 text-center space-y-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-md">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-brand-blue text-3xl mb-2">Registration Confirmed</h2>
                      <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto">Your payment has been verified. Welcome to SANKALP 2027.</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 overflow-hidden max-w-sm mx-auto text-left text-sm">
                      {[['Registration ID', `CONF-${successData.id.slice(-6).toUpperCase()}`], ['Status', 'Active / Verified'], ['Email', successData.email]].map(([k, v], i) => (
                        <div key={k} className={`flex justify-between px-5 py-3.5 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 pt-0.5">{k}</span>
                          <span className={`font-bold ${k === 'Registration ID' ? 'font-mono text-brand-orange' : k === 'Status' ? 'text-emerald-600' : 'text-slate-800'}`}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto leading-relaxed font-medium">An official receipt with your QR check-in pass has been dispatched to your registered email address.</p>
                    <button onClick={resetForm} className="bg-brand-blue hover:bg-blue-950 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md cursor-pointer">Return to Registration Portal</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      ) : (
        /* ══════════════════════════════
           LANDING PAGE
        ══════════════════════════════ */
        <>
          {/* ── HERO ─────────────────────────────── */}
          <section ref={heroRef} className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="font-serif font-bold text-brand-blue text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-6"
            >
              Conference<br className="hidden sm:block" /> Registration
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={heroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.22 }}
              className="w-14 h-[2px] bg-brand-orange mb-7 origin-center"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.0, ease, delay: 0.32 }}
              className="text-slate-600 font-medium text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
            >
              All accepted authors must complete registration to be included in the proceedings. Select your tier and complete checkout in under four steps.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.42 }}
              onClick={() => openForm()}
              className="group flex items-center gap-3 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-[0.2em] px-9 py-4 rounded-full shadow-xl shadow-brand-orange/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Register Now
              <svg className="group-hover:translate-x-0.5 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </motion.button>
          </section>

          {/* Horizontal rule */}
          <div className="max-w-[1536px] mx-auto px-6 md:px-12 w-full">
            <div className="h-px bg-slate-200/80" />
          </div>

          {/* ── REGISTRATION TIERS ─────────────────── */}
          <section className="py-20 md:py-28 bg-[#f7f4ef]">
            <div className="max-w-6xl mx-auto px-6 md:px-12">

              {/* Header */}
              <motion.div
                variants={stagger()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-14 text-center max-w-2xl mx-auto"
              >
                <motion.div variants={fadeUp} className="w-10 h-[2px] bg-brand-orange mb-6 mx-auto rounded-full" />
                <motion.h2 variants={fadeUp} className="font-serif font-bold text-brand-blue text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                  Registration Tiers
                </motion.h2>
                <motion.p variants={fadeUp} className="text-slate-600 text-base md:text-lg font-medium">
                  Select your participation category. All registration fees exclude 18% GST.
                </motion.p>
              </motion.div>

              {/* Main Presenters Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-8">

                {/* 1. Student / Scholar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between p-7 lg:p-8 hover:border-brand-blue hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black tracking-[0.18em] uppercase text-brand-orange bg-brand-orange/8 px-2.5 py-1 rounded-full border border-brand-orange/20">
                        Presenter
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">01</span>
                    </div>

                    <h3 className="font-serif font-bold text-brand-blue text-xl leading-snug mb-2">
                      Student / Research Scholar
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
                      For students and full-time scholars presenting an accepted paper.
                    </p>

                    <div className="border-t border-b border-slate-100 py-5 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-slate-400 text-sm font-semibold">₹</span>
                        <span className="font-mono font-black text-4xl text-brand-blue leading-none">1,500</span>
                      </div>
                      <span className="text-slate-400 text-[11px] font-medium block mt-1.5">+ 18% GST applied at checkout</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {[
                        'Presentation Certificate',
                        'IEEE / Scopus Proceedings Inclusion',
                        'Conference Kit & Swag',
                        'Technical & Keynote Sessions Access',
                        'Complimentary Lunch & Refreshments'
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <span className="w-4 h-4 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openForm('student_presenter')}
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-[0.18em] py-4 rounded-xl transition-all shadow-md shadow-brand-orange/25 cursor-pointer text-center"
                  >
                    Register Now →
                  </button>
                </motion.div>

                {/* 2. Academician */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease, delay: 0.08 }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between p-7 lg:p-8 hover:border-brand-blue hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black tracking-[0.18em] uppercase text-brand-orange bg-brand-orange/8 px-2.5 py-1 rounded-full border border-brand-orange/20">
                        Presenter
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">02</span>
                    </div>

                    <h3 className="font-serif font-bold text-brand-blue text-xl leading-snug mb-2">
                      Academician
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
                      For faculty members and professors presenting research at the conference.
                    </p>

                    <div className="border-t border-b border-slate-100 py-5 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-slate-400 text-sm font-semibold">₹</span>
                        <span className="font-mono font-black text-4xl text-brand-blue leading-none">3,000</span>
                      </div>
                      <span className="text-slate-400 text-[11px] font-medium block mt-1.5">+ 18% GST applied at checkout</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {[
                        'Presentation Certificate',
                        'IEEE / Scopus Proceedings Inclusion',
                        'Conference Kit & Swag',
                        'Technical & Keynote Sessions Access',
                        'Complimentary Lunch & Refreshments'
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <span className="w-4 h-4 rounded-full bg-slate-100 text-brand-blue flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openForm('academic_presenter')}
                    className="w-full bg-brand-blue hover:bg-brand-orange text-white font-bold text-xs uppercase tracking-[0.18em] py-4 rounded-xl transition-all shadow-sm cursor-pointer text-center"
                  >
                    Register Now →
                  </button>
                </motion.div>

                {/* 3. Industry Professional */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease, delay: 0.16 }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between p-7 lg:p-8 hover:border-brand-blue hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black tracking-[0.18em] uppercase text-brand-orange bg-brand-orange/8 px-2.5 py-1 rounded-full border border-brand-orange/20">
                        Presenter
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">03</span>
                    </div>

                    <h3 className="font-serif font-bold text-brand-blue text-xl leading-snug mb-2">
                      Industry Professional
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
                      For corporate professionals and practitioners presenting research work.
                    </p>

                    <div className="border-t border-b border-slate-100 py-5 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-slate-400 text-sm font-semibold">₹</span>
                        <span className="font-mono font-black text-4xl text-brand-blue leading-none">5,000</span>
                      </div>
                      <span className="text-slate-400 text-[11px] font-medium block mt-1.5">+ 18% GST applied at checkout</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {[
                        'Presentation Certificate',
                        'IEEE / Scopus Proceedings Inclusion',
                        'Conference Kit & Swag',
                        'Industry Networking & Roundtable',
                        'Complimentary Lunch & Refreshments'
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <span className="w-4 h-4 rounded-full bg-slate-100 text-brand-blue flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openForm('industry_presenter')}
                    className="w-full bg-brand-blue hover:bg-brand-orange text-white font-bold text-xs uppercase tracking-[0.18em] py-4 rounded-xl transition-all shadow-sm cursor-pointer text-center"
                  >
                    Register Now →
                  </button>
                </motion.div>

              </div>

              {/* Secondary Grid (2 Columns: Attendee & Foreign Delegate) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">

                {/* 4. Attendee / Non-Presenter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease, delay: 0.22 }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 lg:p-8 flex flex-col justify-between hover:border-brand-blue transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black tracking-[0.18em] uppercase text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                        Delegate
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">04</span>
                    </div>

                    <h3 className="font-serif font-bold text-brand-blue text-xl leading-snug mb-2">
                      Attendee / Non-Presenter
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
                      For delegates attending technical sessions and keynotes without presenting a paper.
                    </p>

                    <div className="flex items-baseline justify-between border-t border-b border-slate-100 py-4 mb-6">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-slate-400 text-sm font-semibold">₹</span>
                          <span className="font-mono font-black text-3xl text-brand-blue leading-none">1,000</span>
                        </div>
                        <span className="text-slate-400 text-[11px] font-medium block mt-1">+ 18% GST</span>
                      </div>
                      <span className="text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
                        Offline Participation
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openForm('attendee')}
                    className="w-full bg-brand-blue hover:bg-brand-orange text-white font-bold text-xs uppercase tracking-[0.18em] py-3.5 rounded-xl transition-all shadow-sm cursor-pointer text-center"
                  >
                    Register as Attendee →
                  </button>
                </motion.div>

                {/* 5. Foreign Delegate */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease, delay: 0.28 }}
                  className="bg-brand-blue text-white rounded-2xl shadow-xl p-7 lg:p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black tracking-[0.18em] uppercase text-brand-orange bg-brand-orange/15 px-2.5 py-1 rounded-full border border-brand-orange/30">
                        International
                      </span>
                      <span className="font-mono text-xs font-bold text-white/40">05</span>
                    </div>

                    <h3 className="font-serif font-bold text-white text-xl leading-snug mb-2">
                      Foreign Delegate
                    </h3>
                    <p className="text-white/60 text-xs font-medium leading-relaxed mb-6">
                      For international authors and delegates participating from outside India.
                    </p>

                    <div className="flex items-baseline justify-between border-t border-b border-white/10 py-4 mb-6">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-white/50 text-sm font-semibold">₹</span>
                          <span className="font-mono font-black text-3xl text-white leading-none">8,000</span>
                        </div>
                        <span className="text-white/40 text-[11px] font-medium block mt-1">+ 18% GST (Approx. $96 USD)</span>
                      </div>
                      <span className="text-xs text-brand-orange font-semibold bg-brand-orange/10 px-3 py-1.5 rounded-lg border border-brand-orange/30">
                        Global Access
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openForm('foreign_delegate')}
                    className="w-full bg-brand-orange hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-[0.18em] py-3.5 rounded-xl transition-all shadow-md cursor-pointer text-center"
                  >
                    Register International →
                  </button>
                </motion.div>

              </div>

              {/* Subtitle Footer */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.35 }}
                className="mt-10 text-slate-400 text-xs font-medium text-center"
              >
                Need assistance with institutional bulk registrations or GST invoices? Contact <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange font-semibold underline underline-offset-2">sankalp@jklu.edu.in</a>
              </motion.p>

            </div>
          </section>


          {/* ── PROCESS + INCLUSIONS + POLICIES ───── */}
          <section className="py-24 md:py-32 border-t border-slate-200/80">
            <div className="max-w-[1536px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 xl:gap-28">

                {/* Timeline */}
                <div>
                  <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <motion.div variants={fadeUp} className="w-10 h-[2px] bg-brand-orange mb-7 rounded-full" />
                    <motion.h2 variants={fadeUp} className="font-serif font-bold text-brand-blue text-3xl md:text-4xl mb-3">Registration Process</motion.h2>
                    <motion.p variants={fadeUp} className="text-slate-600 text-sm md:text-base font-medium mb-12">Five sequential steps from acceptance to conference day.</motion.p>

                    <motion.div variants={stagger(0.08)} className="space-y-0">
                      {timelineSteps.map((item, idx) => (
                        <motion.div key={idx} variants={fadeUp} className="flex gap-6 group">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 group-hover:border-brand-orange group-hover:bg-brand-orange text-brand-blue group-hover:text-white font-mono font-black text-xs flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                              {item.num}
                            </div>
                            {idx < timelineSteps.length - 1 && <div className="w-[2px] h-full min-h-[2.5rem] bg-slate-100 my-1" />}
                          </div>
                          <div className="pb-8">
                            <h4 className="font-serif font-bold text-brand-blue text-base mb-1 group-hover:text-brand-orange transition-colors">{item.title}</h4>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.body}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Inclusions & Policies */}
                <div className="space-y-8">
                  {/* Inclusions */}
                  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-sm">
                    <h3 className="font-serif font-bold text-brand-blue text-xl mb-1">What's Included</h3>
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-6">In your registration fee</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {inclusions.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Policies */}
                  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.1 }} className="bg-brand-blue text-white rounded-2xl p-8 shadow-xl">
                    <h3 className="font-serif font-bold text-xl mb-1">Registration Policy</h3>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-6">Terms & conditions</p>
                    <ul className="space-y-3.5">
                      {policies.map((p, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/80 font-medium">
                          <span className="text-brand-orange font-bold mt-0.5 shrink-0">—</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

              </div>
            </div>
          </section>

          {/* ── PAYMENT BANK TRANSFER ──────────────── */}
          <section className="py-24 bg-white border-t border-slate-200/80">
            <div className="max-w-[1536px] mx-auto px-6 md:px-12">

              <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
                <motion.div variants={fadeUp} className="w-10 h-[2px] bg-brand-orange mb-7 rounded-full" />
                <motion.h2 variants={fadeUp} className="font-serif font-bold text-brand-blue text-3xl sm:text-4xl leading-tight mb-4">Payment Options</motion.h2>
                <motion.p variants={fadeUp} className="text-slate-600 text-base md:text-lg max-w-2xl font-medium">
                  Instant online checkout or traditional NEFT / RTGS bank transfer are both accepted.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {/* Online */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="border border-slate-200/90 rounded-2xl p-7 md:p-8 bg-[#f7f4ef] flex flex-col">
                  <p className="text-[9px] font-black tracking-[0.22em] text-brand-orange uppercase mb-4">Option A &middot; Recommended</p>
                  <h3 className="font-serif font-bold text-brand-blue text-xl mb-3">Cashfree Online Gateway</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed flex-1">
                    Pay instantly via UPI, Credit / Debit Cards, Net Banking, or Mobile Wallets. Confirmation and QR pass are dispatched within seconds.
                  </p>
                  <button onClick={() => openForm()} className="mt-8 inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-[0.18em] px-7 py-3.5 rounded-xl transition-all shadow-md cursor-pointer self-start">
                    Pay Online Now →
                  </button>
                </motion.div>

                {/* Bank */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.1 }} className="border border-slate-200/90 rounded-2xl p-7 md:p-8 bg-white">
                  <p className="text-[9px] font-black tracking-[0.22em] text-brand-blue uppercase mb-4">Option B &middot; Bank Transfer</p>
                  <h3 className="font-serif font-bold text-brand-blue text-xl mb-5">NEFT / RTGS Details</h3>
                  <dl className="space-y-3 text-sm font-mono">
                    {[
                      ['Beneficiary', 'JK LAKSHMIPAT UNIVERSITY'],
                      ['Account Type', 'GST / Institutional'],
                      ['Bank', 'HDFC Bank Ltd.'],
                      ['IFSC', 'HDFC0003953'],
                      ['Branch', 'Mahindra SEZ, Jaipur'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-baseline border-b border-slate-100 pb-2 last:border-0">
                        <dt className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-sans font-bold">{k}</dt>
                        <dd className="font-bold text-brand-blue text-xs">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </div>

            </div>
          </section>

          <Footer />
        </>
      )}
    </main>
  );
}
