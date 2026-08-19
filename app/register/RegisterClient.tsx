'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { load } from '@cashfreepayments/cashfree-js';
import { REGISTRATION_CATEGORIES } from '@/constants/fees';
import { COUNTRY_CODES } from '@/constants/countries';
import { executeRecaptcha } from '@/lib/recaptcha';

const inputCls = "w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors";

function SearchableCountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (dialCode: string, countryName: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

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
        className="w-32 px-3 py-2.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-medium flex items-center justify-between hover:border-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue cursor-pointer"
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
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    affiliation: '',
    designation: 'Academician / Faculty',
    category: initialCategory,
    country: 'India',
    paperId: '',
    paperTitle: '',
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

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl && REGISTRATION_CATEGORIES.some(c => c.id === catFromUrl)) {
      setFormData(prev => ({
        ...prev,
        category: catFromUrl,
        designation: getDesignationForCategory(catFromUrl)
      }));
    }
  }, [searchParams]);

  const getDesignationForCategory = (catId: string) => {
    switch (catId) {
      case 'speaker_student':
      case 'student_presenter':
        return 'Student';
      case 'speaker_academic':
      case 'academic_presenter':
        return 'Academician / Faculty';
      case 'speaker_industry':
      case 'industry_presenter':
        return 'Industry Professional';
      case 'delegate_offline':
      case 'delegate_online':
      case 'attendee':
        return 'Conference Delegate';
      default:
        return 'Participant';
    }
  };

  const selectedCategoryObj = REGISTRATION_CATEGORIES.find((c) => c.id === formData.category) || REGISTRATION_CATEGORIES[0];
  const baseAmount = selectedCategoryObj ? selectedCategoryObj.amount : 0;
  const currentPrice = finalAmount !== null ? finalAmount : baseAmount;
  const isPresenter = formData.category.includes('speaker') || formData.category.includes('presenter') || formData.category === 'foreign_delegate';

  const handleCategoryChange = (catId: string) => {
    setFormData((prev) => ({
      ...prev,
      category: catId,
      designation: getDesignationForCategory(catId),
    }));
    setCouponValid(null);
    setCouponMessage('');
    setFinalAmount(null);
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email address.';
    if (!formData.phone.trim()) return 'Please enter your contact number.';
    if (!formData.affiliation.trim()) return 'Please enter your organization / institution.';
    if (!formData.category) return 'Please select a registration category.';
    if (isPresenter && !formData.paperId.trim()) return 'Please enter your Accepted Paper ID.';
    return null;
  };

  const handleNextStep = () => {
    const err = validateStep1();
    if (err) {
      alert(err);
      return;
    }
    setStep(2);
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
        setCouponMessage(`Coupon applied. Base fee reduced to ₹${data.amount.toLocaleString()}`);
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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha('REGISTER');
      const fullPhone = formData.phone.trim().startsWith('+')
        ? formData.phone.trim()
        : `${formData.countryCode} ${formData.phone.trim()}`;

      const payload = { 
        ...formData, 
        phone: fullPhone,
        mobile: fullPhone,
        baseAmount, 
        amount: currentPrice, 
        action: 'CREATE_ORDER',
        recaptchaToken 
      };
      const response = await fetch('/api/register', {
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

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans flex flex-col antialiased selection:bg-brand-blue selection:text-white">
      <Navbar />

      {/* Main Container */}
      <div className="pt-28 sm:pt-36 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="text-xs text-slate-500 font-medium mb-1.5 flex items-center gap-1.5">
            <Link href="/registration" className="hover:text-brand-blue transition-colors">
              Registration &amp; Tiers
            </Link>
            <span>/</span>
            <span className="text-slate-800">Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue tracking-tight">
            Conference Registration
          </h1>
        </div>

        {step === 3 ? (
          /* Step 3: Success Confirmation */
          <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-lg p-8 sm:p-10 shadow-xs text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold border border-emerald-200">
              ✓
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Registration Confirmed</h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Thank you, <strong>{successData?.name}</strong>. Your registration for <strong>{successData?.category}</strong> has been received. An official receipt and check-in pass have been sent to <strong>{successData?.email}</strong>.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded text-xs font-mono text-slate-700">
              Order ID: {successData?.orderId}
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-2.5 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-blue-900 transition-colors"
              >
                Return to Home
              </Link>
              <Link
                href="/registration"
                className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded hover:bg-slate-50 transition-colors"
              >
                View Tiers
              </Link>
            </div>
          </div>
        ) : (
          /* Two Column Layout: Form & Order Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
              
              {/* Step Tabs */}
              <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100 text-xs font-semibold">
                <span className={step === 1 ? "text-brand-blue font-bold" : "text-slate-400"}>
                  1. Participant Details
                </span>
                <span className="text-slate-300">/</span>
                <span className={step === 2 ? "text-brand-blue font-bold" : "text-slate-400"}>
                  2. Review &amp; Payment
                </span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Registration Tier <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className={`${inputCls} font-medium text-slate-900 cursor-pointer`}
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

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        suppressHydrationWarning
                        className={inputCls}
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <SearchableCountrySelect
                          value={formData.countryCode}
                          onChange={(dialCode, countryName) => {
                            setFormData({
                              ...formData,
                              countryCode: dialCode,
                              country: countryName,
                            });
                          }}
                        />
                        <input
                          type="tel"
                          suppressHydrationWarning
                          className={inputCls}
                          placeholder="Enter contact number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Affiliation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Institution / University / Organization <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="Enter university or organization"
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    />
                  </div>

                  {/* Author / Presenter Details */}
                  {isPresenter && (
                    <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3 mt-2">
                      <div className="text-xs font-bold text-slate-800">
                        Accepted Paper Details
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Paper ID <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Enter accepted paper ID"
                            value={formData.paperId}
                            onChange={(e) => setFormData({ ...formData, paperId: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Paper Title <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Enter paper title"
                            value={formData.paperTitle}
                            onChange={(e) => setFormData({ ...formData, paperTitle: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                    <Link
                      href="/registration"
                      className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      ← Back to Tiers
                    </Link>

                    <button
                      onClick={handleNextStep}
                      className="px-6 py-2.5 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-blue-900 transition-colors cursor-pointer"
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  {/* Summary Review List */}
                  <div className="border border-slate-200 rounded divide-y divide-slate-100 text-xs">
                    <div className="flex justify-between py-2 px-3 bg-slate-50/50">
                      <span className="text-slate-500">Participant:</span>
                      <span className="font-semibold text-slate-900">{formData.name}</span>
                    </div>
                    <div className="flex justify-between py-2 px-3">
                      <span className="text-slate-500">Email:</span>
                      <span className="text-slate-800">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-2 px-3 bg-slate-50/50">
                      <span className="text-slate-500">Phone:</span>
                      <span className="text-slate-800">{formData.countryCode} {formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-2 px-3">
                      <span className="text-slate-500">Affiliation:</span>
                      <span className="text-slate-800">{formData.affiliation}</span>
                    </div>
                    {isPresenter && formData.paperId && (
                      <div className="flex justify-between py-2 px-3 bg-slate-50/50">
                        <span className="text-slate-500">Paper ID:</span>
                        <span className="font-semibold text-brand-blue">{formData.paperId}</span>
                      </div>
                    )}
                  </div>

                  {/* Promo Code Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Promo / Discount Code
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
                        className="px-5 py-2 bg-slate-800 text-white text-xs font-semibold rounded hover:bg-slate-900 disabled:opacity-50 transition-colors cursor-pointer shrink-0"
                      >
                        {couponLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`text-xs mt-1.5 font-medium ${couponValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {couponMessage}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      ← Edit Details
                    </button>

                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="px-6 py-2.5 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-orange-600 disabled:opacity-50 transition-colors cursor-pointer shadow-xs"
                    >
                      {loading ? 'Opening Gateway...' : 'Pay & Confirm'}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Selected Tier:</span>
                  <span className="font-semibold text-slate-900 text-right">{selectedCategoryObj?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Base Registration:</span>
                  <span className="text-slate-900">₹{baseAmount.toLocaleString()}</span>
                </div>

                {couponValid && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount:</span>
                    <span>- ₹{(baseAmount - currentPrice).toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span className="text-slate-900">₹{Math.round(currentPrice * 0.18).toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 uppercase tracking-wider">Total Amount:</span>
                  <span className="text-xl font-bold text-brand-blue">
                    ₹{Math.round(currentPrice * 1.18).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5 leading-relaxed">
                <p>• Official tax receipt and QR check-in pass are dispatched immediately to your email upon payment.</p>
                <p>• Standard 2% gateway processing fee is applied at checkout by Cashfree.</p>
                <p>• Supported payment modes: UPI, Debit/Credit Cards, Net Banking, and Wallets.</p>
              </div>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
