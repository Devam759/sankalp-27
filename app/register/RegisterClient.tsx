'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { load } from '@cashfreepayments/cashfree-js';
import { REGISTRATION_CATEGORIES } from '@/constants/fees';
import { COUNTRY_CODES } from '@/constants/countries';
import { executeRecaptcha } from '@/lib/recaptcha';

const inputCls = "w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors";
const labelCls = "block text-xs font-semibold text-slate-700 mb-1.5";

function SearchableCountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (dialCode: string, countryName: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = COUNTRY_CODES.find((c) => c.dialCode === value) || COUNTRY_CODES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredCountries = COUNTRY_CODES.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.dialCode.includes(q)
    );
  });

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch('');
        }}
        className="w-32 px-3 py-2.5 bg-white border border-slate-300 rounded-md text-xs text-slate-900 font-medium flex items-center justify-between hover:border-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue cursor-pointer"
      >
        <span className="truncate">{selectedCountry.dialCode} ({selectedCountry.code})</span>
        <span className="text-[10px] text-slate-400 ml-1">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-slate-100 bg-slate-50">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code..."
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="max-h-56 overflow-y-auto divide-y divide-slate-50">
            {filteredCountries.length === 0 ? (
              <div className="p-3 text-xs text-slate-400 text-center">No countries found</div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={`${country.code}-${country.dialCode}`}
                  type="button"
                  onClick={() => {
                    onChange(country.dialCode, country.name);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                    country.dialCode === value && country.name === selectedCountry.name
                      ? 'bg-blue-50 text-brand-blue font-semibold'
                      : 'text-slate-700'
                  }`}
                >
                  <span className="truncate pr-2">{country.name}</span>
                  <span className="text-slate-400 font-mono text-[11px] shrink-0">
                    {country.dialCode}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegisterClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'speaker_academic';

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State matching SANKALP_Registration_Form_Updated.docx
  const [formData, setFormData] = useState({
    // Section 1: Participant Details
    title: 'Dr.',
    titleOther: '',
    name: '',
    affiliation: '',
    city: '',
    state: '',
    country: 'India',
    nationality: 'Indian',
    email: '',
    countryCode: '+91',
    phone: '',

    // Section 2: Category & Participation
    participantType: 'National participant', // National participant | International participant
    category: initialCategory,
    modeOfParticipation: 'In person', // In person | Online
    isPresentingPaper: 'Yes', // Yes | No

    // Section 3: Paper / Presentation Details (Conditional)
    paperId: '',
    paperTitle: '',
    paperTrack: '',
    correspondingAuthorName: '',
    correspondingAuthorEmail: '',

    // Payment Method
    paymentMethod: 'online', // 'online' | 'manual_receipt'
    receiptFileName: '',
    receiptFileData: '',
    transactionId: '',

    // Consent and Declaration
    consentPhotography: false,
    declarationAccuracy: false,
    consentRefundPolicy: false,

    coupon: '',
  });

  const [couponValid, setCouponValid] = useState<boolean | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [finalAmount, setFinalAmount] = useState<number | null>(null);
  const [successData, setSuccessData] = useState<any>(null);

  // Auto-fetch paper details state
  const [paperFetchLoading, setPaperFetchLoading] = useState(false);
  const [paperFetchMessage, setPaperFetchMessage] = useState<string | null>(null);

  const fetchPaperDetails = async (id: string) => {
    if (!id || !id.trim()) return;
    setPaperFetchLoading(true);
    setPaperFetchMessage(null);
    try {
      const res = await fetch(`/api/paper?id=${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (data.success && data.paper) {
        setFormData(prev => ({
          ...prev,
          paperTitle: data.paper.title || prev.paperTitle,
          paperTrack: data.paper.track || prev.paperTrack,
          correspondingAuthorName: data.paper.authorName || prev.correspondingAuthorName,
          correspondingAuthorEmail: data.paper.authorEmail || prev.correspondingAuthorEmail,
        }));
        setPaperFetchMessage(`✓ Paper title auto-fetched: "${data.paper.title}"`);
      } else {
        setPaperFetchMessage(data.message || 'Paper ID entered. Type paper title below if not pre-populated.');
      }
    } catch {
      setPaperFetchMessage('Auto-fetch offline. You may type the title manually below.');
    } finally {
      setPaperFetchLoading(false);
    }
  };

  useEffect(() => {
    if (formData.isPresentingPaper === 'Yes' && formData.paperId.trim()) {
      const timer = setTimeout(() => {
        fetchPaperDetails(formData.paperId);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData.paperId, formData.isPresentingPaper]);

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl && REGISTRATION_CATEGORIES.some(c => c.id === catFromUrl)) {
      setFormData(prev => ({
        ...prev,
        category: catFromUrl,
      }));
    }
  }, [searchParams]);

  const selectedCategoryObj = REGISTRATION_CATEGORIES.find((c) => c.id === formData.category) || REGISTRATION_CATEGORIES[0];
  const baseAmount = selectedCategoryObj ? selectedCategoryObj.amount : 0;
  const currentPrice = finalAmount !== null ? finalAmount : baseAmount;

  const isPaperYes = formData.isPresentingPaper === 'Yes';
  const totalSteps = isPaperYes ? 4 : 3;
  const isFinalStep = isPaperYes ? step === 4 : step === 3;
  const isAllConsentsChecked = Boolean(formData.consentPhotography && formData.declarationAccuracy && formData.consentRefundPolicy);

  const validateStep1 = () => {
    if (formData.title === 'Other' && !formData.titleOther.trim()) return 'Please specify your title.';
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.affiliation.trim()) return 'Please enter your Institution / Organization.';
    if (!formData.city.trim()) return 'Please enter your City.';
    if (!formData.state.trim()) return 'Please enter your State / Province.';
    if (!formData.country.trim()) return 'Please enter your Country.';
    if (!formData.nationality.trim()) return 'Please enter your Nationality.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid (Organisation) Email Address.';
    if (!formData.phone.trim()) return 'Please enter your Mobile Number.';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.participantType) return 'Please select Participant Type.';
    if (!formData.modeOfParticipation) return 'Please select Mode of Participation.';
    if (!formData.category) return 'Please select Registration Category.';
    if (!formData.isPresentingPaper) return 'Please select if you are Presenting a Paper.';
    return null;
  };

  const validateStep3 = () => {
    if (isPaperYes) {
      if (!formData.paperId.trim()) return 'Please enter your Paper ID.';
      if (!formData.paperTitle.trim()) return 'Please enter the Title of Paper / Presentation.';
      if (!formData.correspondingAuthorName.trim()) return 'Please enter the Corresponding Author Name.';
      if (!formData.correspondingAuthorEmail.trim() || !/\S+@\S+\.\S+/.test(formData.correspondingAuthorEmail)) {
        return 'Please enter a valid Corresponding Author Email Address.';
      }
    }
    return null;
  };

  const validateStepFinal = () => {
    if (!formData.consentPhotography) return 'Please agree to the Photography and Recording Consent.';
    if (!formData.declarationAccuracy) return 'Please agree to the Accuracy Declaration.';
    if (!formData.consentRefundPolicy) return 'Please agree to the Cancellation and Refund Policy.';
    return null;
  };

  const validateFullForm = () => {
    const err1 = validateStep1();
    if (err1) return err1;

    const err2 = validateStep2();
    if (err2) return err2;

    if (isPaperYes) {
      const err3 = validateStep3();
      if (err3) return err3;
    }

    const errFinal = validateStepFinal();
    if (errFinal) return errFinal;

    return null;
  };

  const handleNextStep1 = () => {
    const err = validateStep1();
    if (err) {
      alert(err);
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep2 = () => {
    const err = validateStep2();
    if (err) {
      alert(err);
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep3 = () => {
    const err = validateStep3();
    if (err) {
      alert(err);
      return;
    }
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyCoupon = async () => {
    if (!formData.coupon.trim()) return;
    setCouponLoading(true);
    setCouponMessage('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'VERIFY_COUPON',
          coupon: formData.coupon.trim().toUpperCase(),
          category: formData.category,
        }),
      });
      const data = await res.json();
      if (data.valid) {
        setCouponValid(true);
        setFinalAmount(data.amount);
        setCouponMessage(`Coupon applied. Fee reduced to ₹${data.amount.toLocaleString()}`);
      } else {
        setCouponValid(false);
        setFinalAmount(null);
        setCouponMessage(data.message || 'Invalid or expired promo code.');
      }
    } catch {
      setCouponValid(false);
      setCouponMessage('Error validating coupon. Please try again.');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFinalStep) {
      if (step === 1) handleNextStep1();
      else if (step === 2) handleNextStep2();
      else if (step === 3 && isPaperYes) handleNextStep3();
      return;
    }

    const err = validateFullForm();
    if (err) {
      alert(err);
      return;
    }

    setLoading(true);
    try {
      const recaptchaToken = await executeRecaptcha('REGISTER');
      const fullPhone = formData.phone.trim().startsWith('+')
        ? formData.phone.trim()
        : `${formData.countryCode} ${formData.phone.trim()}`;

      const fullTitle = formData.title === 'Other' ? (formData.titleOther || 'Other') : formData.title;

      const payload = {
        ...formData,
        title: fullTitle,
        phone: fullPhone,
        mobile: fullPhone,
        baseAmount,
        amount: currentPrice,
        recaptchaToken,
      };

      if (formData.paymentMethod === 'manual_receipt') {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            action: 'SUBMIT_MANUAL_REGISTRATION',
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to submit registration.');

        setSuccessData({
          orderId: data.id || `REG-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          category: selectedCategoryObj?.name,
          message: data.message || "Thank you for completing the registration process. Your registration will be confirmed via email within 48 hours.\nNote: Please take a printout of the registration confirmation message and present it at the conference venue.",
          isManual: true,
        });
        setIsSubmitted(true);
        setLoading(false);
        return;
      }

      // Online Cashfree Payment Gateway Flow
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          action: 'CREATE_ORDER',
        }),
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
        setIsSubmitted(true);
        setLoading(false);
        return;
      }

      const isCashfreeProd = (process.env.NEXT_PUBLIC_CASHFREE_ENV || '').trim().toUpperCase() === 'PRODUCTION';
      const cashfree = await load({ mode: isCashfreeProd ? 'production' : 'sandbox' });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_blank',
      });
      setLoading(false);
    } catch (err: any) {
      alert(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const stepItems = isPaperYes
    ? [
        { stepNumber: 1, label: 'Participant Details' },
        { stepNumber: 2, label: 'Category & Participation' },
        { stepNumber: 3, label: 'Paper Details' },
        { stepNumber: 4, label: 'Consent & Declaration' },
      ]
    : [
        { stepNumber: 1, label: 'Participant Details' },
        { stepNumber: 2, label: 'Category & Participation' },
        { stepNumber: 3, label: 'Consent & Declaration' },
      ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col antialiased selection:bg-brand-blue selection:text-white">
      <Navbar />

      {/* Main Container */}
      <div className="pt-28 sm:pt-36 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {isSubmitted ? (
          /* Submission Received / Registration Confirmation */
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold border border-emerald-200">
              ✓
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-serif font-bold text-slate-900">Registration Submission Received</h2>
              <p className="text-slate-700 text-sm leading-relaxed max-w-lg mx-auto font-medium">
                Thank you for completing the registration process. Your registration will be confirmed via email within 48 hours.
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed text-left font-medium">
                📍 <strong>Note:</strong> Please take a printout of the registration confirmation message and present it at the conference venue desk.
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-xs font-mono text-slate-700">
              Registration ID: {successData?.orderId}
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-2.5 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-blue-900 transition-colors"
              >
                Return to Home
              </Link>
              <Link
                href="/faq"
                className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-md hover:bg-slate-50 transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </div>
        ) : (
          /* Main Registration Form with Wizard Navigation */
          <div className="space-y-6">
            {/* Step Progress Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                {stepItems.map((item, idx) => {
                  const isCurrent = step === item.stepNumber;
                  const isCompleted = step > item.stepNumber;
                  return (
                    <React.Fragment key={item.stepNumber}>
                      {idx > 0 && (
                        <div className={`flex-1 h-0.5 mx-2 sm:mx-4 ${isCompleted ? 'bg-brand-blue' : 'bg-slate-200'}`} />
                      )}
                      <button
                        type="button"
                        disabled={item.stepNumber > step}
                        onClick={() => setStep(item.stepNumber)}
                        className={`flex items-center gap-2 text-xs font-semibold transition-colors ${
                          isCurrent
                            ? 'text-brand-blue'
                            : isCompleted
                            ? 'text-slate-900 hover:text-brand-blue cursor-pointer'
                            : 'text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border transition-colors ${
                            isCurrent
                              ? 'bg-brand-blue text-white border-brand-blue'
                              : isCompleted
                              ? 'bg-blue-50 text-brand-blue border-brand-blue'
                              : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}
                        >
                          {isCompleted ? '✓' : item.stepNumber}
                        </span>
                        <span className="hidden md:inline">{item.label}</span>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Active Step Card */}
              <div className="lg:col-span-8">
                
                {/* STEP 1: Participant Details (2nd Screenshot) */}
                {step === 1 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <span className="w-7 h-7 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xs">
                        1
                      </span>
                      <h2 className="text-lg font-serif font-bold text-brand-blue">
                        Participant Details
                      </h2>
                    </div>

                    {/* Title & Full Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <div className="sm:col-span-4">
                        <label className={labelCls}>
                          Title <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className={`${inputCls} font-medium`}
                        >
                          <option value="Prof.">Prof.</option>
                          <option value="Dr.">Dr.</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {formData.title === 'Other' && (
                        <div className="sm:col-span-8">
                          <label className={labelCls}>
                            Specify Title <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Specify title"
                            value={formData.titleOther}
                            onChange={(e) => setFormData({ ...formData, titleOther: e.target.value })}
                          />
                        </div>
                      )}

                      <div className={formData.title === 'Other' ? 'sm:col-span-12' : 'sm:col-span-8'}>
                        <label className={labelCls}>
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={inputCls}
                          placeholder="Enter name exactly as it should appear on certificate"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Institution */}
                    <div>
                      <label className={labelCls}>
                        Institution / Organization <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="Enter your university or organization name"
                        value={formData.affiliation}
                        onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                      />
                    </div>

                    {/* City, State, Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>
                          City <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={inputCls}
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className={labelCls}>
                          State / Province <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={inputCls}
                          placeholder="Enter state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className={labelCls}>
                          Country <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={inputCls}
                          placeholder="Enter country"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Nationality, Email, Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>
                          Nationality <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={inputCls}
                          placeholder="e.g. Indian"
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className={labelCls}>
                          (Organisation) Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          className={inputCls}
                          placeholder="name@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className={labelCls}>
                          Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <SearchableCountrySelect
                            value={formData.countryCode}
                            onChange={(dialCode, countryName) => {
                              setFormData({
                                ...formData,
                                countryCode: dialCode,
                                country: formData.country || countryName,
                              });
                            }}
                          />
                          <input
                            type="tel"
                            className={inputCls}
                            placeholder="Contact number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 1 Control Buttons */}
                    <div className="flex justify-end pt-6 border-t border-slate-100 mt-6">
                      <button
                        type="button"
                        onClick={handleNextStep1}
                        className="px-6 py-3 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-orange-600 transition-colors cursor-pointer flex items-center gap-2 shadow-xs font-semibold"
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Registration & Participation Category (3rd Screenshot) */}
                {step === 2 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <span className="w-7 h-7 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xs">
                        2
                      </span>
                      <h2 className="text-lg font-serif font-bold text-brand-blue">
                        Registration &amp; Participation Category
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Participant Type */}
                      <div>
                        <label className={labelCls}>
                          Participant Type <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center gap-4 pt-1">
                          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="participantType"
                              value="National participant"
                              checked={formData.participantType === 'National participant'}
                              onChange={(e) => setFormData({ ...formData, participantType: e.target.value })}
                              className="accent-brand-blue"
                            />
                            National participant
                          </label>
                          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="participantType"
                              value="International participant"
                              checked={formData.participantType === 'International participant'}
                              onChange={(e) => setFormData({ ...formData, participantType: e.target.value })}
                              className="accent-brand-blue"
                            />
                            International participant
                          </label>
                        </div>
                      </div>

                      {/* Mode of Participation */}
                      <div>
                        <label className={labelCls}>
                          Mode of Participation <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center gap-4 pt-1">
                          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="modeOfParticipation"
                              value="In person"
                              checked={formData.modeOfParticipation === 'In person'}
                              onChange={(e) => setFormData({ ...formData, modeOfParticipation: e.target.value })}
                              className="accent-brand-blue"
                            />
                            In person
                          </label>
                          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="modeOfParticipation"
                              value="Online"
                              checked={formData.modeOfParticipation === 'Online'}
                              onChange={(e) => setFormData({ ...formData, modeOfParticipation: e.target.value })}
                              className="accent-brand-blue"
                            />
                            Online
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Registration Category Select */}
                    <div>
                      <label className={labelCls}>
                        Registration Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          setFormData({ ...formData, category: e.target.value });
                          setCouponValid(null);
                          setFinalAmount(null);
                        }}
                        className={`${inputCls} font-medium`}
                      >
                        {REGISTRATION_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} (₹{cat.amount.toLocaleString()} + 18% GST)
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {selectedCategoryObj?.description}
                      </p>
                    </div>

                    {/* Presenting a Paper? */}
                    <div>
                      <label className={labelCls}>
                        Presenting a Paper? <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center gap-6 pt-1">
                        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="isPresentingPaper"
                            value="Yes"
                            checked={formData.isPresentingPaper === 'Yes'}
                            onChange={(e) => setFormData({ ...formData, isPresentingPaper: e.target.value })}
                            className="accent-brand-blue"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="isPresentingPaper"
                            value="No"
                            checked={formData.isPresentingPaper === 'No'}
                            onChange={(e) => setFormData({ ...formData, isPresentingPaper: e.target.value })}
                            className="accent-brand-blue"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {/* Step 2 Control Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep2}
                        className="px-6 py-3 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-orange-600 transition-colors cursor-pointer flex items-center gap-2 shadow-xs font-semibold"
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Paper / Presentation Details (4th Screenshot - only if Presenting Paper is Yes) */}
                {step === 3 && isPaperYes && (
                  <div className="bg-white border border-brand-blue/30 rounded-xl p-6 sm:p-8 shadow-xs space-y-5 relative">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <span className="w-7 h-7 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xs">
                        3
                      </span>
                      <h2 className="text-lg font-serif font-bold text-brand-blue">
                        Paper / Presentation Details
                      </h2>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-blue-50/60 p-3 rounded border border-blue-100">
                      Note: Complete this section only if you are presenting a paper, poster, invited talk or keynote address.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>
                          Paper ID <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Enter your accepted paper ID (e.g. 101, 102)"
                            value={formData.paperId}
                            onChange={(e) => setFormData({ ...formData, paperId: e.target.value })}
                          />
                          {paperFetchLoading && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-orange animate-pulse">
                              Fetching...
                            </span>
                          )}
                        </div>
                        {paperFetchMessage && (
                          <p className={`text-[11px] mt-1.5 font-medium leading-tight ${
                            paperFetchMessage.startsWith('✓') ? 'text-emerald-600' : 'text-slate-500'
                          }`}>
                            {paperFetchMessage}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={labelCls}>
                          Conference Track / Theme
                        </label>
                        <input
                          type="text"
                          className={inputCls}
                          placeholder="e.g. Sustainable AI / Automation"
                          value={formData.paperTrack}
                          onChange={(e) => setFormData({ ...formData, paperTrack: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Title of Paper / Presentation <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-normal">Auto-fetched or enter manually</span>
                      </div>
                      <textarea
                        rows={2}
                        className={inputCls}
                        placeholder="Title of paper or presentation (auto-fetched via Paper ID or type here)"
                        value={formData.paperTitle}
                        onChange={(e) => setFormData({ ...formData, paperTitle: e.target.value })}
                      />
                    </div>

                    {/* Corresponding Author Details */}
                    <div className="pt-2 space-y-4 border-t border-slate-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Corresponding Author Details <span className="text-rose-500">*</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>
                            Corresponding Author Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Author full name"
                            value={formData.correspondingAuthorName}
                            onChange={(e) => setFormData({ ...formData, correspondingAuthorName: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className={labelCls}>
                            Corresponding Author Email <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            className={inputCls}
                            placeholder="author@domain.com"
                            value={formData.correspondingAuthorEmail}
                            onChange={(e) => setFormData({ ...formData, correspondingAuthorEmail: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 3 Control Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(2);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep3}
                        className="px-6 py-3 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-orange-600 transition-colors cursor-pointer flex items-center gap-2 shadow-xs font-semibold"
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}

                {/* FINAL STEP: Consent and Declaration (5th Screenshot - Step 4 if Yes, Step 3 if No) */}
                {isFinalStep && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <span className="w-7 h-7 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {isPaperYes ? '4' : '3'}
                      </span>
                      <h2 className="text-lg font-serif font-bold text-brand-blue">
                        Consent and Declaration
                      </h2>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.consentPhotography}
                          onChange={(e) => setFormData({ ...formData, consentPhotography: e.target.checked })}
                          className="mt-0.5 accent-brand-blue shrink-0"
                        />
                        <span>
                          <strong>Photography and Recording Consent:</strong> I consent to photographs and recordings taken during the conference being used for academic, documentation and promotional purposes. <span className="text-rose-500 font-bold">*</span>
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.declarationAccuracy}
                          onChange={(e) => setFormData({ ...formData, declarationAccuracy: e.target.checked })}
                          className="mt-0.5 accent-brand-blue shrink-0"
                        />
                        <span>
                          <strong>Declaration:</strong> I declare that the information provided is accurate. I understand that registration is subject to verification of the submitted information and payment, and I agree to follow the conference rules and policies. <span className="text-rose-500 font-bold">*</span>
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.consentRefundPolicy}
                          onChange={(e) => setFormData({ ...formData, consentRefundPolicy: e.target.checked })}
                          className="mt-0.5 accent-brand-blue shrink-0"
                        />
                        <span>
                          <strong>Cancellation and Refund Policy:</strong> I have read and agree to the cancellation and refund policy published by the conference organizers. <span className="text-rose-500 font-bold">*</span>
                        </span>
                      </label>
                    </div>

                    {/* Final Step Control Buttons */}
                    <div className="flex items-center justify-start pt-6 border-t border-slate-100 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(isPaperYes ? 3 : 2);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        ← Back
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Order Summary & Action */}
              <div className="lg:col-span-4 space-y-6 sticky top-32">
                
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
                    Registration Summary
                  </h2>

                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-semibold text-slate-900 text-right max-w-[160px] truncate">
                        {selectedCategoryObj?.name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Base Registration:</span>
                      <span className="text-slate-900 font-medium">₹{baseAmount.toLocaleString()}</span>
                    </div>

                    {couponValid && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount Code:</span>
                        <span>- ₹{(baseAmount - currentPrice).toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>GST (18%):</span>
                      <span className="text-slate-900 font-medium">₹{Math.round(currentPrice * 0.18).toLocaleString()}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 uppercase tracking-wider">Total Payable:</span>
                      <span className="text-xl font-bold text-brand-blue">
                        ₹{Math.round(currentPrice * 1.18).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code & Final Action Button - Only shown on final step */}
                  {isFinalStep && (
                    <>
                      <div className="pt-2 border-t border-slate-100">
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Promo / Discount Code</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="PROMO CODE"
                            value={formData.coupon}
                            onChange={(e) => setFormData({ ...formData, coupon: e.target.value.toUpperCase() })}
                          />
                          <button
                            type="button"
                            onClick={applyCoupon}
                            disabled={couponLoading || !formData.coupon.trim()}
                            className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-md hover:bg-slate-900 disabled:opacity-50 transition-colors cursor-pointer shrink-0"
                          >
                            {couponLoading ? '...' : 'Apply'}
                          </button>
                        </div>
                        {couponMessage && (
                          <p className={`text-xs mt-1.5 font-medium ${couponValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {couponMessage}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 pt-2">
                        <button
                          type="submit"
                          disabled={loading || !isAllConsentsChecked}
                          className={`w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${
                            isAllConsentsChecked
                              ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-md shadow-orange-500/30 ring-2 ring-brand-orange/40 cursor-pointer'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-slate-300'
                          }`}
                        >
                          {loading ? 'Processing...' : formData.paymentMethod === 'online' ? 'Proceed to Online Payment' : 'Submit Registration'}
                        </button>
                        {!isAllConsentsChecked && (
                          <p className="text-[11px] text-amber-600 text-center font-medium leading-tight">
                            Please check all consent declarations to proceed
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

              </div>

            </form>
          </div>
        )}

      </div>

      {/* Registration Guidelines Section matching docx */}
      <section className="bg-white border-t border-slate-200/80 py-16 px-6 sm:px-10 md:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Registration Guidelines &amp; Policies
            </h2>
            <div className="w-12 h-1 bg-brand-orange mt-2.5 rounded-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">For Authors</h3>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>At least one author of every accepted paper must register under the author category and present the paper.</li>
                <li>One author may register a maximum of two papers (full registration fee applies to both papers).</li>
                <li>Registration and camera-ready paper must be submitted by the due date for proceedings inclusion.</li>
                <li>Fees are non-refundable. Missed registration deadlines will result in paper withdrawal.</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">For Attendees</h3>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>Includes conference kit, admission to tutorials and technical sessions, lunch, and refreshments.</li>
                <li>Taxes, levies, and payment-gateway charges are extra and borne by the registrant.</li>
                <li>Students must present a valid student ID card.</li>
                <li>Keep a copy of the transaction ID generated by the payment gateway and bank.</li>
                <li>Download payment receipt and bring a copy to the conference venue.</li>
              </ul>
            </div>
          </div>

          {/* Important Policies Card */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Important Policies</h3>
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>
                <strong>Payment Security:</strong> SANKALP 2027, JK Lakshmipat University, and the Organizing Committee will not be responsible for any financial or other loss caused by an improper online transaction. Registrants are responsible for protecting their user IDs, passwords, Paper IDs, and other credentials.
              </p>
              <p>
                <strong>No-Show Policy:</strong> Every accepted paper listed in the final programme must be presented by at least one registered author. A paper that is not presented will not be submitted for inclusion in the conference proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
