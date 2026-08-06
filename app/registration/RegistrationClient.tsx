'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import { load } from '@cashfreepayments/cashfree-js';
import { REGISTRATION_CATEGORIES, RegistrationCategory } from '@/constants/fees';

const timelineSteps = [
  { num: '01', title: 'Paper Acceptance', body: 'Receive your formal acceptance notification from the Technical Programme Committee via email.' },
  { num: '02', title: 'Select Category', body: 'Choose your registration tier - student, academician, industry, or delegate. Each is priced transparently.' },
  { num: '03', title: 'Online Checkout', body: 'Complete payment instantly via Cashfree PG (UPI, Credit/Debit Card, Net Banking, Wallets).' },
  { num: '04', title: 'QR Pass Dispatch', body: 'Receive your official PDF receipt with an embedded QR check-in pass directly to your registered inbox.' },
  { num: '05', title: 'Conference Day', body: 'Present your research, attend keynotes, and engage with an international academic community in Jaipur.' },
];

const inclusions = [
  'Official Conference Kit & Delegate Badge',
  'Access to All Technical & Oral Sessions',
  'Keynote, Plenary & Industry Keynotes',
  'Indexed Conference Proceedings Publication',
  'Networking & Industry Roundtables',
  'Best Paper & Presentation Award Eligibility',
  'Official Certificate of Participation / Presentation',
  'Complimentary Conference Lunch & Refreshments',
];

const policies = [
  'All accepted paper authors are required to register for proceedings inclusion.',
  'At least one co-author must hold a valid paid registration per accepted paper.',
  'Registration is activated immediately after online payment confirmation.',
  'All registrations are non-refundable once processed.',
  'Delegates must present their QR check-in pass at the venue entrance desk.',
  'Prices are subject to 18% GST. A 2% Cashfree transaction fee will also be added at payment processing.',
];

// Clean inline SVG Icons
function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ShieldCheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function CloseIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function UserIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function MailIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.826-1.47-5.114-3.758-6.584-6.584l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function BuildingIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" />
    </svg>
  );
}

function TagIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}

function InfoIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function SparklesIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  );
}

function FormField({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
        {icon && <span className="text-brand-orange">{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition-all rounded-md shadow-xs";

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
        setCouponMessage(data.message || `Coupon applied! New Total Base Amount: ₹${data.discountedAmount}`);
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
    <main className="min-h-screen bg-[#F9FAFB] text-brand-ink font-sans flex flex-col antialiased selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* HERO BANNER SECTION */}
      <section ref={heroRef} className="pt-28 sm:pt-36 pb-20 sm:pb-28 bg-gradient-to-b from-[#0B1B3D] via-[#184176] to-[#0D2447] text-white relative overflow-hidden">
        {/* Subtle mesh background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/20 via-transparent to-transparent pointer-events-none opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.15] mb-6">
              <WordReveal text="Conference Registration" className="text-white" />
            </h1>

            <Reveal variant="in" delay={0.25}>
              <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl">
                Join distinguished researchers, academicians, and industry leaders at JK Lakshmipat University, Jaipur. Select your tier below to initiate instant registration and ticket pass dispatch.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REGISTRATION TIERS SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <Reveal variant="in">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                  <WordReveal text="Select Your Category" className="text-brand-blue" />
                </h2>
                <p className="text-slate-600 text-sm font-medium mt-1">
                  Choose your registration tier to initiate your online registration.
                </p>
              </div>
            </Reveal>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100/90 p-1.5 rounded-md border border-slate-200 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer ${
                  activeTab === 'all' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                All Tiers
              </button>
              <button
                onClick={() => setActiveTab('presenters')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer ${
                  activeTab === 'presenters' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Authors &amp; Presenters
              </button>
              <button
                onClick={() => setActiveTab('global')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer ${
                  activeTab === 'global' ? 'bg-brand-blue text-white shadow-xs' : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                International (USD)
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((cat, i) => (
              <Reveal
                key={cat.id}
                delay={i * 0.05}
                className="relative border border-slate-200 bg-white p-7 flex flex-col justify-between rounded-lg"
              >
                  <div>
                    <h3 className="font-sans font-bold text-lg text-brand-blue mb-2.5 leading-snug">
                      {cat.name}
                    </h3>

                    <p className="text-slate-600 text-xs font-medium leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    {/* Price Header */}
                    <div className="mb-6 p-4 rounded-md bg-slate-50 border border-slate-100">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-3xl font-extrabold text-brand-blue font-sans tracking-tight">
                          ₹{cat.amount.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                          + 18% GST
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCategorySelect(cat.id)}
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all rounded-md bg-brand-blue text-white hover:bg-blue-900 flex items-center justify-center gap-2"
                  >
                    <span>Register Now</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
              </Reveal>
            ))}
          </div>

          {/* Fee Notice Banner */}
          <div className="mt-10 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-xs text-slate-700">
            <div className="p-2 bg-amber-100 text-brand-orange rounded-md shrink-0">
              <InfoIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-brand-blue uppercase tracking-wider block sm:inline mr-2">Tax &amp; Fee Policy:</span>
              <span>All listed base registration fees are subject to 18% GST. A 2% Cashfree payment gateway transaction fee will also be added at checkout.</span>
            </div>
          </div>

        </div>
      </section>

      {/* REGISTRATION TIMELINE & INCLUSIONS SECTION */}
      <section className="py-16 sm:py-24 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Workflow Timeline */}
          <div className="lg:col-span-7">
            <Reveal variant="in">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                  <WordReveal text="Registration Workflow" className="text-brand-blue" />
                </h2>
                <p className="text-slate-600 text-sm font-medium mt-1">
                  Follow these five simple steps to complete your conference registration.
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {timelineSteps.map((stepItem, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="flex gap-5 bg-white p-5 sm:p-6 border border-slate-200/90 rounded-lg shadow-xs">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-brand-orange/10 text-brand-orange font-mono font-bold text-base shrink-0">
                      {stepItem.num}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-brand-blue text-base mb-1">{stepItem.title}</h3>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed">{stepItem.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Inclusions & Guidelines Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            {/* Inclusions Card */}
            <Reveal variant="right" className="bg-gradient-to-br from-brand-blue to-[#0D2447] text-white p-7 sm:p-8 rounded-lg shadow-md border border-white/10">
              <div className="flex items-center gap-2.5 mb-6">
                <SparklesIcon className="w-5 h-5 text-brand-orange" />
                <h2 className="font-sans font-extrabold text-xl tracking-tight">
                  <WordReveal text="Delegate Inclusions" className="text-white" />
                </h2>
              </div>
              <ul className="space-y-3">
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs font-medium text-slate-200">
                    <CheckIcon className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Guidelines Card */}
            <Reveal variant="right" delay={0.15} className="bg-white p-7 sm:p-8 border border-slate-200/90 rounded-lg shadow-xs">
              <div className="flex items-center gap-2.5 mb-5">
                <ShieldCheckIcon className="w-5 h-5 text-brand-blue" />
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-brand-blue uppercase tracking-wide">
                  <WordReveal text="Registration Guidelines" className="text-brand-blue" />
                </h2>
              </div>
              <ul className="space-y-3">
                {policies.map((pol, i) => (
                  <li key={i} className="text-xs text-slate-600 font-medium leading-relaxed flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0 mt-1.5" />
                    <span>{pol}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

        </div>
      </section>

      {/* REGISTRATION MODAL DIALOG */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white w-full max-w-2xl rounded-lg shadow-2xl border border-slate-200 overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-brand-blue to-[#0B1B3D] text-white p-6 flex justify-between items-center border-b border-white/10">
                <div>
                  <h2 className="font-sans font-extrabold text-xl tracking-tight">JKLU SANKALP 2027 Checkout</h2>
                  <p className="text-xs text-brand-orange font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                    <TagIcon className="w-3.5 h-3.5" />
                    {selectedCategoryObj?.name}
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span className={step === 1 ? 'text-brand-blue font-bold' : ''}>1. Participant Details</span>
                <span>&rarr;</span>
                <span className={step === 2 ? 'text-brand-blue font-bold' : ''}>2. Review &amp; Payment</span>
                <span>&rarr;</span>
                <span className={step === 3 ? 'text-brand-blue font-bold' : ''}>3. Confirmation</span>
              </div>

              {/* Step 1 Form */}
              {step === 1 && (
                <div className="p-6 sm:p-8 space-y-4">
                  <FormField label="Full Name" icon={<UserIcon />}>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="Dr. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Email Address" icon={<MailIcon />}>
                      <input
                        type="email"
                        className={inputCls}
                        placeholder="john.doe@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </FormField>

                    <FormField label="Phone Number" icon={<PhoneIcon />}>
                      <input
                        type="tel"
                        className={inputCls}
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </FormField>
                  </div>

                  <FormField label="Organization / University" icon={<BuildingIcon />}>
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
                      className="bg-brand-orange text-white px-8 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors cursor-pointer rounded-md shadow-xs flex items-center gap-2"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 Form */}
              {step === 2 && (
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Category Summary Box */}
                  <div className="bg-slate-50 p-5 border border-slate-200 rounded-md space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-600">Selected Tier:</span>
                      <span className="text-brand-blue font-bold">{selectedCategoryObj?.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-600">Base Registration Fee:</span>
                      <span className="text-brand-blue font-extrabold text-sm">₹{baseAmount.toLocaleString()} <span className="text-brand-orange text-xs font-bold">+ 18% GST</span></span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
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
                        className="bg-brand-blue text-white px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-blue-900 transition-colors disabled:opacity-50 cursor-pointer rounded-md shrink-0"
                      >
                        {couponLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`text-xs mt-2 font-semibold flex items-center gap-1 ${couponValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {couponValid ? <CheckIcon className="w-3.5 h-3.5" /> : <InfoIcon className="w-3.5 h-3.5" />}
                        {couponMessage}
                      </p>
                    )}
                  </div>

                  {/* Payment Total Breakdown & Action */}
                  <div className="border-t border-slate-200 pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Total Base Amount:</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-brand-orange font-sans">
                          ₹{currentPrice.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">+ 18% GST</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">
                        * A 2% Cashfree payment gateway transaction fee will also be added at checkout.
                      </p>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-3 border border-slate-300 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 cursor-pointer rounded-md flex-1 sm:flex-none text-center"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="bg-brand-orange text-white px-7 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors disabled:opacity-50 cursor-pointer rounded-md flex-1 sm:flex-none shadow-xs text-center"
                      >
                        {loading ? 'Processing...' : 'Pay & Confirm'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 Success */}
              {step === 3 && (
                <div className="p-8 sm:p-10 text-center space-y-5">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckIcon className="w-8 h-8" />
                  </div>
                  <h2 className="font-sans font-extrabold text-2xl text-brand-blue tracking-tight">Registration Confirmed!</h2>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{successData?.name}</strong>. Your registration for <strong>{successData?.category}</strong> has been processed successfully. An official PDF receipt and QR ticket pass have been dispatched to your email.
                  </p>
                  <div className="inline-block bg-slate-100 px-4 py-2 rounded-md text-xs font-mono text-slate-600">
                    Order ID: {successData?.orderId}
                  </div>
                  <div>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="bg-brand-blue text-white px-8 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-blue-900 transition-colors cursor-pointer rounded-md shadow-xs mt-2"
                    >
                      Done
                    </button>
                  </div>
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
