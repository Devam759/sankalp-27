'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { load } from '@cashfreepayments/cashfree-js';
import { REGISTRATION_CATEGORIES, RegistrationCategory } from '@/constants/fees';

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease } } };
const stagger = (delay = 0): Variants => ({ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: delay } } });

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

export default function RegistrationClient() {
  const heroRef = useRef(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'presenters' | 'global'>('all');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    affiliation: '',
    designation: 'Student',
    category: '',
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

  const getDesignationForCategory = (catId: string) => {
    switch (catId) {
      case 'student_presenter':
        return 'Student';
      case 'academic_presenter':
        return 'Academician / Faculty';
      case 'industry_presenter':
        return 'Industry Professional';
      case 'attendee':
        return 'Conference Attendee / Observer';
      default:
        return 'Student';
    }
  };

  const selectedCategoryObj = REGISTRATION_CATEGORIES.find((c) => c.id === formData.category);
  const baseAmount = selectedCategoryObj ? selectedCategoryObj.amount : 0;
  const currentPrice = finalAmount !== null ? finalAmount : baseAmount;

  const handleCategorySelect = (catId: string) => {
    setFormData((prev) => ({
      ...prev,
      category: catId,
      designation: getDesignationForCategory(catId),
    }));
    setCouponValid(null);
    setCouponMessage('');
    setFinalAmount(null);
    setIsFormOpen(true);
    setStep(1);
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email address.';
    if (!formData.phone.trim()) return 'Please enter your contact number.';
    if (!formData.affiliation.trim()) return 'Please enter your organization / institution.';
    if (!formData.category) return 'Please select a registration category.';
    return null;
  };

  const handleNextStep = () => {
    const err = validateStep1();
    if (err) {
      alert(err);
      return;
    }
    setStep(2);
  };

  const applyCoupon = async () => {
    if (!formData.coupon.trim()) return;
    setCouponLoading(true);
    setCouponMessage('');
    try {
      const res = await fetch('/api/verify-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formData.coupon,
          categoryId: formData.category,
          amount: baseAmount,
        }),
      });
      const data = await res.json();
      if (data.valid) {
        setCouponValid(true);
        setFinalAmount(data.discountedAmount);
        setCouponMessage(data.message || `Coupon applied! New Total: ₹${data.discountedAmount}`);
      } else {
        setCouponValid(false);
        setFinalAmount(null);
        setCouponMessage(data.message || 'Invalid or expired promo code.');
      }
    } catch {
      setCouponValid(false);
      setCouponMessage('Error validating coupon. Try again.');
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...formData, baseAmount, amount: currentPrice };
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed.');
      }

      if (data.isFree) {
        setSuccessData({
          orderId: data.orderId,
          name: formData.name,
          email: formData.email,
          category: selectedCategoryObj?.name,
          amount: 0,
        });
        setStep(3);
        setLoading(false);
        return;
      }

      const cashfree = await load({ mode: 'production' });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_self',
      });
    } catch (err: any) {
      alert(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const filteredCategories = REGISTRATION_CATEGORIES.filter((cat) => {
    if (activeTab === 'presenters') return cat.id.includes('presenter');
    if (activeTab === 'global') return cat.id === 'foreign_delegate';
    return true;
  });

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="pt-28 sm:pt-36 pb-20 sm:pb-24 bg-brand-blue text-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 relative z-10">
          <motion.div variants={stagger()} initial="hidden" animate="visible" className="max-w-4xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-6 bg-brand-orange rounded-sm shrink-0" />
              <span className="text-xs font-black tracking-[0.25em] uppercase text-brand-orange">SANKALP '27 &middot; JKLU</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Conference Registration
            </motion.h1>
            <motion.p variants={fadeUp} className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              Join international researchers, academic leaders, and industry experts at JK Lakshmipat University, Jaipur. Complete your registration to attend and present your accepted paper.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* REGISTRATION TIERS */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-2.5 h-6 bg-brand-orange rounded-sm shrink-0" />
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-brand-blue uppercase">Select Your Category</h2>
              </div>
              <p className="text-slate-600 text-sm font-medium">Choose your category to initiate your online registration.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1.5 rounded-sm border border-slate-200 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'all' ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                All Tiers
              </button>
              <button
                onClick={() => setActiveTab('presenters')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'presenters' ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Authors &amp; Presenters
              </button>
              <button
                onClick={() => setActiveTab('global')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'global' ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                International (USD)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border p-6 flex flex-col justify-between transition-all duration-300 rounded-sm border-slate-200 bg-white hover:border-brand-blue"
              >
                <div>
                  <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">{cat.name}</h3>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">{cat.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-brand-blue font-sans">₹{cat.amount.toLocaleString()}</span>
                    <span className="text-slate-400 text-xs font-semibold ml-1">/ person</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCategorySelect(cat.id)}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors rounded-sm bg-brand-blue text-white hover:bg-blue-900"
                >
                  Register Now &rarr;
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION TIMELINE & INCLUSIONS */}
      <section className="py-20 sm:py-24 bg-[#f7f4ef]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7">
            <h3 className="font-serif font-bold text-2xl text-brand-blue uppercase mb-8">Registration Workflow</h3>
            <div className="space-y-6">
              {timelineSteps.map((stepItem, i) => (
                <div key={i} className="flex gap-6 bg-white p-6 border border-slate-200 rounded-sm shadow-sm">
                  <span className="font-mono font-black text-2xl text-brand-orange">{stepItem.num}</span>
                  <div>
                    <h4 className="font-serif font-bold text-brand-blue text-base mb-1">{stepItem.title}</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">{stepItem.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-brand-blue text-white p-8 rounded-sm shadow-lg">
              <h3 className="font-serif font-bold text-xl mb-6">Delegate Inclusions</h3>
              <ul className="space-y-3">
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-medium text-slate-200">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 border border-slate-200 rounded-sm">
              <h3 className="font-serif font-bold text-xl text-brand-blue mb-4">Registration Guidelines</h3>
              <ul className="space-y-3">
                {policies.map((pol, i) => (
                  <li key={i} className="text-xs text-slate-600 font-medium leading-relaxed flex items-start gap-2">
                    <span className="text-brand-orange font-bold">&bull;</span>
                    <span>{pol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* REGISTRATION MODAL FORM */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-blue/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-slate-200 overflow-hidden my-8"
            >
              <div className="bg-brand-blue text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-xl">SANKALP '27 Registration Form</h3>
                  <p className="text-xs text-brand-orange font-bold uppercase tracking-wider mt-1">{selectedCategoryObj?.name}</p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {step === 1 && (
                <div className="p-6 space-y-4">
                  <FormField label="Full Name">
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="Dr. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Email Address">
                      <input
                        type="email"
                        className={inputCls}
                        placeholder="john.doe@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </FormField>
                    <FormField label="Phone Number">
                      <input
                        type="tel"
                        className={inputCls}
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </FormField>
                  </div>

                  <FormField label="Organization / University">
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="JK Lakshmipat University, Jaipur"
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    />
                  </FormField>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleNextStep}
                      className="bg-brand-orange text-white px-8 py-3 font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors cursor-pointer rounded-sm"
                    >
                      Proceed to Checkout &rarr;
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="p-6 space-y-6">
                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-sm">
                    <div className="flex justify-between items-center text-sm font-semibold mb-2">
                      <span className="text-slate-600">Registration Category:</span>
                      <span className="text-brand-blue font-bold">{selectedCategoryObj?.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-600">Base Registration Fee:</span>
                      <span className="text-brand-blue font-black">₹{baseAmount}</span>
                    </div>
                  </div>

                  {/* Promo Code Section */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-2">
                      Promo / Author Discount Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="ENTER CODE"
                        value={formData.coupon}
                        onChange={(e) => setFormData({ ...formData, coupon: e.target.value.toUpperCase() })}
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        disabled={couponLoading || !formData.coupon.trim()}
                        className="bg-brand-blue text-white px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-blue-900 transition-colors disabled:opacity-50 cursor-pointer rounded-sm"
                      >
                        {couponLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`text-xs mt-2 font-semibold ${couponValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {couponMessage}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Total Payable:</span>
                      <span className="text-2xl font-black text-brand-orange">₹{currentPrice}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 border border-slate-300 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 cursor-pointer rounded-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="bg-brand-orange text-white px-8 py-3 font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors disabled:opacity-50 cursor-pointer rounded-sm"
                      >
                        {loading ? 'Processing...' : 'Pay & Confirm'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                    &check;
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-brand-blue">Registration Confirmed!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you, <strong>{successData?.name}</strong>. Your registration for <strong>{successData?.category}</strong> has been processed successfully.
                  </p>
                  <p className="text-xs text-slate-400 font-medium">Order ID: {successData?.orderId}</p>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="bg-brand-blue text-white px-8 py-3 font-bold text-xs uppercase tracking-wider hover:bg-blue-900 transition-colors cursor-pointer rounded-sm mt-4"
                  >
                    Done
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
