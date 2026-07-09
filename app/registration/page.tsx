'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  Building2, 
  Users, 
  Check,
  PenTool,
  Mail,
  Download,
  Phone,
  Clock,
  ArrowLeft,
  Loader2,
  Lock,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { load } from '@cashfreepayments/cashfree-js';
import { REGISTRATION_CATEGORIES } from '@/constants/fees';

export default function Registration() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Personal Info, 2: Category & Paper, 3: Location, 4: Coupon & Pay, 5: Success
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    affiliation: '',
    designation: 'Student', // Student, Faculty, Industry Professional, Other
    category: '', // student_presenter, etc.
    paperId: '',
    paperTitle: '',
    country: 'India',
    pincode: '',
    city: '',
    region: '', // state
    needAccommodation: 'No',
    coupon: ''
  });

  const [couponValid, setCouponValid] = useState<boolean | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [finalAmount, setFinalAmount] = useState<number | null>(null);
  const [registrationSuccessData, setRegistrationSuccessData] = useState<any>(null);

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const categories = [
    {
      id: "student_presenter",
      title: "Student Presenter",
      desc: "For UG, PG, and PhD scholars presenting an accepted paper.",
      eligibility: "Requires valid student ID.",
      icon: <GraduationCap size={24} className="text-brand-orange" />
    },
    {
      id: "academic_presenter",
      title: "Academic Presenter",
      desc: "For faculty members and academicians presenting an accepted paper.",
      eligibility: "Institutional affiliation required.",
      icon: <BookOpen size={24} className="text-brand-orange" />
    },
    {
      id: "industry_presenter",
      title: "Industry Presenter",
      desc: "For corporate and industry professionals presenting an accepted paper.",
      eligibility: "Corporate ID required.",
      icon: <Building2 size={24} className="text-brand-orange" />
    },
    {
      id: "attendee",
      title: "Attendee / Delegate",
      desc: "For individuals attending the conference sessions without a paper.",
      eligibility: "Open to all delegates.",
      icon: <Users size={24} className="text-brand-orange" />
    },
    {
      id: "foreign_delegate",
      title: "Foreign Delegate",
      desc: "For international participants (presenters and attendees).",
      eligibility: "International passport / ID required.",
      icon: <PenTool size={24} className="text-brand-orange" />
    }
  ];

  const processSteps = [
    { title: "Paper Acceptance", desc: "Receive formal notification of paper acceptance from the review committee." },
    { title: "Open Registration Form", desc: "Select your category and fill out the secure checkout form." },
    { title: "Instant Fee Payment", desc: "Pay securely via Cashfree PG using UPI, Cards, Net Banking, or Wallets." },
    { title: "Confirmation Receipt", desc: "Receive an automated confirmation email containing your receipt and verification QR code." },
    { title: "Conference Participation", desc: "Present your research and attend the SANKALP 2027 sessions in Jaipur." }
  ];

  const inclusions = [
    "Conference Kit",
    "Technical Sessions",
    "Keynote Lectures",
    "Conference Proceedings",
    "Networking Sessions",
    "Certificate of Participation",
    "Tea & Lunch (Offline)",
    "Digital Access (Online)"
  ];

  const guidelines = [
    "Registration is mandatory for all accepted papers.",
    "At least one author must register for each accepted paper.",
    "Registration becomes valid immediately after successful online payment.",
    "All registrations are final and non-refundable.",
    "Participants must present their QR-code ticket during check-in."
  ];

  const openRegisterForm = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
    setStep(1);
    setIsFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pin = e.target.value.trim();
    setFormData(prev => ({ ...prev, pincode: pin }));

    if (pin.length === 6 && /^\d+$/.test(pin) && formData.country.toLowerCase() === 'india') {
      setLoading(true);
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'VERIFY_PINCODE', pincode: pin })
        });
        const data = await res.json();
        if (res.ok && data[0]?.Status === 'Success') {
          const office = data[0].PostOffice[0];
          setFormData(prev => ({
            ...prev,
            city: office.District,
            region: office.State
          }));
        }
      } catch (err) {
        console.error("Pincode lookup error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const verifyCoupon = async () => {
    if (!formData.coupon.trim()) return;
    setCouponLoading(true);
    setCouponMessage('');
    try {
      const baseAmount = getSelectedCategoryAmount();
      
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'VERIFY_COUPON',
          coupon: formData.coupon,
          category: formData.category
        })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setCouponValid(true);
        setFinalAmount(data.amount);
        setCouponMessage(`Coupon applied successfully! Discounted amount: ₹${data.amount}`);
      } else {
        setCouponValid(false);
        setFinalAmount(null);
        setCouponMessage('Invalid or expired coupon code.');
      }
    } catch (err) {
      console.error(err);
      setCouponMessage('Failed to verify coupon.');
    } finally {
      setCouponLoading(false);
    }
  };

  const getSelectedCategoryAmount = () => {
    const categoryObj = REGISTRATION_CATEGORIES.find(c => c.id === formData.category);
    return categoryObj ? categoryObj.amount : 0;
  };

  const startCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE_ORDER',
          ...formData
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create payment order');
      }

      const { order_id, payment_session_id, is_mock } = data;

      if (is_mock) {
        await verifyPaymentOnBackend(order_id);
      } else {
        await handleCheckout(payment_session_id, order_id);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Registration failed. Please check inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (paymentSessionId: string, orderId: string) => {
    try {
      const cashfree = await load({
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox'
      });
      
      const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_modal"
      };

      cashfree.checkout(checkoutOptions).then(async (result: any) => {
        if (result.error) {
          console.warn("Cashfree checkout error:", result.error);
          alert(`Payment closed or failed: ${result.error.message}`);
        } else if (result.redirect) {
          console.log("Cashfree redirecting...");
        } else {
          await verifyPaymentOnBackend(orderId);
        }
      });
    } catch (err: any) {
      console.error("Cashfree SDK load error:", err);
      alert("Failed to load Cashfree Payment SDK. Please verify if your connection is secure.");
    }
  };

  const verifyPaymentOnBackend = async (orderId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'VERIFY_PAYMENT',
          orderId
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrationSuccessData(data);
        setStep(5); // Show success screen
      } else {
        alert(data.error || 'Payment verification failed. Please contact the organizers.');
      }
    } catch (err) {
      console.error("Verify payment error:", err);
      alert('Verification error. Please contact the conference desk.');
    } finally {
      setLoading(false);
    }
  };

  const isPresenter = formData.category.includes('presenter') || formData.category === 'foreign_delegate';

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-24 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {isFormOpen ? (
        /* STEP-BY-STEP CHECKOUT FORM */
        <section className="flex-grow py-16 px-6 max-w-3xl mx-auto w-full">
          <div className="bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-none">
            
            {/* Step indicators */}
            {step < 5 && (
              <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-10">
                {[
                  { s: 1, name: "Profile" },
                  { s: 2, name: "Category" },
                  { s: 3, name: "Location" },
                  { s: 4, name: "Checkout" }
                ].map((item) => (
                  <div key={item.s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 flex items-center justify-center font-mono font-bold text-xs ${
                      step >= item.s 
                        ? 'bg-brand-orange text-white border border-brand-orange' 
                        : 'border border-slate-300 text-slate-400 bg-white'
                    }`}>
                      {item.s}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider hidden sm:inline ${
                      step >= item.s ? 'text-brand-blue' : 'text-slate-400'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              /* STEP 1: Personal Info */
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-brand-blue mb-2">Participant Information</h2>
                  <p className="text-slate-500 text-sm">Please fill in your primary details below.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Jane Doe"
                      className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. jane.doe@university.edu"
                      className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mobile Number *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Institution / Organization *</label>
                    <input
                      required
                      type="text"
                      name="affiliation"
                      value={formData.affiliation}
                      onChange={handleInputChange}
                      placeholder="e.g. JK Lakshmipat University"
                      className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Designation *</label>
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                    >
                      <option value="Student">Student (UG/PG)</option>
                      <option value="Research Scholar">Research Scholar (PhD)</option>
                      <option value="Academician / Faculty">Academician / Faculty</option>
                      <option value="Industry Professional">Industry Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-wider cursor-pointer"
                  >
                    <ArrowLeft size={16} /> Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!formData.name || !formData.email || !formData.phone || !formData.affiliation) {
                        alert("Please fill in all required fields.");
                        return;
                      }
                      setStep(2);
                    }}
                    className="flex items-center gap-2 bg-brand-orange text-white font-bold py-3 px-6 uppercase text-xs tracking-widest hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
                  >
                    Next Step <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              /* STEP 2: Category & Paper */
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-brand-blue mb-2">Category & Paper Details</h2>
                  <p className="text-slate-500 text-sm">Select your participation type and input paper IDs if applicable.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Registration Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50 font-semibold"
                    >
                      <option value="">-- Select Category --</option>
                      {REGISTRATION_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} (₹{cat.amount.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  {isPresenter && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 border-l-2 border-brand-orange pl-4"
                    >
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Paper ID *</label>
                        <input
                          required
                          type="text"
                          name="paperId"
                          value={formData.paperId}
                          onChange={handleInputChange}
                          placeholder="e.g. 104"
                          className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Paper Title *</label>
                        <input
                          required
                          type="text"
                          name="paperTitle"
                          value={formData.paperTitle}
                          onChange={handleInputChange}
                          placeholder="e.g. Machine Learning for Sustainable Agriculture"
                          className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-wider cursor-pointer"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => {
                      if (!formData.category) {
                        alert("Please select a registration category.");
                        return;
                      }
                      if (isPresenter && (!formData.paperId || !formData.paperTitle)) {
                        alert("Paper ID and Title are required for presenters.");
                        return;
                      }
                      setStep(3);
                    }}
                    className="flex items-center gap-2 bg-brand-orange text-white font-bold py-3 px-6 uppercase text-xs tracking-widest hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
                  >
                    Next Step <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              /* STEP 3: Location & Accommodation */
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-brand-blue mb-2">Location & Accommodation</h2>
                  <p className="text-slate-500 text-sm">Fill in your address and log any accommodation requirements.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {formData.country.toLowerCase() === 'india' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Pincode (Autofill)*</label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          name="pincode"
                          maxLength={6}
                          value={formData.pincode}
                          onChange={handlePincodeChange}
                          placeholder="e.g. 302026"
                          className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50 font-mono"
                        />
                        {loading && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 size={16} className="animate-spin text-brand-orange" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">City *</label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Jaipur"
                        className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">State / Region *</label>
                      <input
                        required
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        placeholder="e.g. Rajasthan"
                        className="w-full border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Do you need Accommodation? *</label>
                    <div className="flex items-center gap-6 mt-3">
                      <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                        <input
                          type="radio"
                          name="needAccommodation"
                          value="Yes"
                          checked={formData.needAccommodation === 'Yes'}
                          onChange={handleInputChange}
                          className="accent-brand-orange"
                        />
                        Yes (Charged extra)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                        <input
                          type="radio"
                          name="needAccommodation"
                          value="No"
                          checked={formData.needAccommodation === 'No'}
                          onChange={handleInputChange}
                          className="accent-brand-orange"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-wider cursor-pointer"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => {
                      if (!formData.city || !formData.region) {
                        alert("Please fill in all required location fields.");
                        return;
                      }
                      setStep(4);
                    }}
                    className="flex items-center gap-2 bg-brand-orange text-white font-bold py-3 px-6 uppercase text-xs tracking-widest hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
                  >
                    Next Step <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              /* STEP 4: Review & Payment */
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-brand-blue mb-2">Review & Payment</h2>
                  <p className="text-slate-500 text-sm">Verify registration details and checkout securely via Cashfree PG.</p>
                </div>

                {/* Info Review Panel */}
                <div className="bg-slate-50 p-6 border border-slate-100 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400 font-bold uppercase text-xs">Name</span>
                    <span className="font-semibold text-slate-800">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400 font-bold uppercase text-xs">Email</span>
                    <span className="font-semibold text-slate-800">{formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400 font-bold uppercase text-xs">Category</span>
                    <span className="font-semibold text-slate-800">{REGISTRATION_CATEGORIES.find(c => c.id === formData.category)?.name}</span>
                  </div>
                  {isPresenter && (
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-slate-400 font-bold uppercase text-xs">Paper ID</span>
                      <span className="font-mono font-bold text-brand-orange">{formData.paperId}</span>
                    </div>
                  )}
                </div>

                {/* Coupon verification block */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Coupon / Promo Code</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      name="coupon"
                      value={formData.coupon}
                      onChange={(e) => setFormData(prev => ({ ...prev, coupon: e.target.value.toUpperCase() }))}
                      placeholder="e.g. SANKALP10"
                      className="border border-slate-200 p-3 text-sm focus:outline-none focus:border-brand-orange bg-slate-50 font-mono uppercase tracking-widest grow"
                    />
                    <button
                      type="button"
                      onClick={verifyCoupon}
                      disabled={couponLoading}
                      className="bg-brand-blue text-white px-6 font-bold text-xs uppercase tracking-widest hover:bg-blue-900 transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-[100px]"
                    >
                      {couponLoading ? <Loader2 size={16} className="animate-spin" /> : 'Apply'}
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-xs font-semibold ${couponValid ? 'text-green-600' : 'text-red-500'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                {/* Price block */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-slate-500">Base Registration Fee:</span>
                    <span className="font-semibold">₹{getSelectedCategoryAmount().toLocaleString()}</span>
                  </div>
                  {couponValid && finalAmount !== null && (
                    <div className="flex justify-between items-baseline text-sm text-green-600 font-semibold">
                      <span>Coupon Discount:</span>
                      <span>-₹{(getSelectedCategoryAmount() - finalAmount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline border-t border-slate-200 pt-4">
                    <span className="text-brand-blue font-bold text-lg font-serif">Final Amount (INR):</span>
                    <span className="text-2xl font-mono font-bold text-brand-orange">
                      ₹{(finalAmount !== null ? finalAmount : getSelectedCategoryAmount()).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => setStep(3)}
                    disabled={loading}
                    className="flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-wider cursor-pointer disabled:opacity-50"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={startCheckout}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-brand-orange text-white font-bold py-3.5 px-8 uppercase text-xs tracking-widest hover:bg-orange-600 transition-colors shadow-md cursor-pointer disabled:opacity-50 min-w-[180px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={14} /> Pay & Confirm
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 5 && registrationSuccessData && (
              /* STEP 5: Success screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-8"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-none flex items-center justify-center mx-auto border-2 border-green-200">
                  <Check size={40} className="stroke-[3]" />
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-3xl font-serif font-bold text-brand-blue">Registration Confirmed!</h2>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Your payment was verified successfully. Welcome to SANKALP 2027.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-6 max-w-md mx-auto rounded-none text-left space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-mono text-xs uppercase">Reg ID</span>
                    <span className="font-bold font-mono text-brand-orange">CONF-{registrationSuccessData.id.slice(-6).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-mono text-xs uppercase">Ticket Status</span>
                    <span className="font-semibold text-green-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 inline-block rounded-none"></span> Active / Paid
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/50 pt-2">
                    <span className="text-slate-400 font-mono text-xs uppercase">Registered Email</span>
                    <span className="font-semibold text-slate-800">{registrationSuccessData.email}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed font-medium">
                  A system-generated PDF invoice receipt containing your entry check-in **QR Code pass** has been sent to your email. Please check your inbox (and spam folder) and carry it to the venue.
                </p>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setIsFormOpen(false);
                      setStep(1);
                      setFormData({
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
                        coupon: ''
                      });
                      setCouponValid(null);
                      setFinalAmount(null);
                    }}
                    className="bg-brand-blue text-white font-bold py-3.5 px-10 uppercase text-xs tracking-widest hover:bg-blue-900 transition-colors shadow-md cursor-pointer"
                  >
                    Return to Page
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </section>
      ) : (
        /* NORMAL LANDING PAGE */
        <>
          {/* HERO SECTION */}
          <section className="relative py-20 md:py-28 px-6 overflow-hidden min-h-[50vh] flex items-center bg-brand-cloud border-b border-brand-blue/10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 border-l border-brand-blue/10"></div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(brand-blue 1px, transparent 1px), linear-gradient(90deg, brand-blue 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
              
              <motion.div 
                initial="hidden" 
                animate="visible"
                variants={staggerContainer}
                className="flex flex-col justify-center"
              >
                <motion.div variants={fadeUpVariant} className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-[2px] bg-brand-orange"></div>
                  <span className="text-brand-blue font-bold tracking-[0.2em] uppercase text-xs">
                    Registration
                  </span>
                </motion.div>
                
                <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-blue leading-[1.2] mb-6">
                  Conference Registration
                </motion.h1>
                
                <motion.p variants={fadeUpVariant} className="text-base md:text-lg text-slate-700 leading-relaxed max-w-xl font-medium mb-10">
                  Join SANKALP 2027 by registering as an Author, Delegate, Academician, Research Scholar, or Industry Professional.
                </motion.p>

                <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-6 mb-12">
                  <div className="border-l-2 border-brand-orange pl-4">
                    <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Conference Dates</p>
                    <p className="text-brand-blue font-bold">5–6 March 2027</p>
                  </div>
                  <div className="border-l-2 border-brand-orange pl-4">
                    <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Mode</p>
                    <p className="text-brand-blue font-bold">Hybrid Conference</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUpVariant}>
                  <button onClick={() => openRegisterForm('student_presenter')} className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold py-3.5 px-8 rounded-none hover:bg-orange-600 transition-colors shadow-sm cursor-pointer">
                    Register Now <ChevronRight size={18} />
                  </button>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="hidden lg:flex justify-end relative h-[400px]"
              >
                {/* Abstract Premium Visual */}
                <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border border-brand-blue/20 rotate-3 bg-white shadow-sm"></div>
                  <div className="absolute inset-0 border border-brand-orange/30 -rotate-2"></div>
                  <div className="relative z-10 w-full h-full bg-brand-blue p-8 flex flex-col items-center justify-center border border-brand-blue shadow-xl">
                     <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                     <div className="w-48 h-48 relative">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-orange rounded-none"></div>
                       <div className="absolute bottom-0 left-0 w-4 h-4 border-2 border-white rounded-none"></div>
                       <div className="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-none"></div>
                       <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-40 bg-white/20 origin-top -rotate-[35deg]"></div>
                       <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-40 bg-white/20 origin-top rotate-[35deg]"></div>
                       <div className="absolute bottom-2 left-2 w-44 h-px bg-white/20"></div>
                     </div>
                     <span className="mt-8 text-white/50 tracking-[0.3em] font-mono text-xs uppercase">Sankalp 2027 Portal</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* REGISTRATION INTRODUCTION */}
          <section className="py-24 bg-white border-b border-slate-200">
            <div className="max-w-[1000px] mx-auto px-6 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-serif font-bold text-brand-blue mb-8">Who Can Register?</h2>
                <div className="w-16 h-[1px] bg-brand-orange mx-auto mb-10"></div>
                <p className="text-lg text-slate-700 leading-relaxed font-medium mb-6">
                  SANKALP 2027 welcomes researchers, academicians, students, industry professionals, innovators, and delegates from around the world to participate in this international conference.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  Participants may register to present accepted research papers or attend technical sessions, keynote talks, workshops, and networking opportunities.
                </p>
              </motion.div>
            </div>
          </section>

          {/* REGISTRATION CATEGORIES */}
          <section id="register" className="py-24 bg-slate-50 border-b border-slate-200">
            <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12">
              
              <div className="mb-16">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                  Categories
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-white border border-slate-200 border-t-4 border-t-slate-200 p-8 hover:border-brand-orange hover:border-t-brand-orange transition-colors group flex flex-col h-full shadow-sm"
                  >
                    <div className="mb-6">{cat.icon}</div>
                    <h3 className="text-xl font-bold text-brand-blue mb-3">{cat.title}</h3>
                    <p className="text-slate-600 mb-6 flex-grow">{cat.desc}</p>
                    
                    <div className="pt-6 border-t border-slate-100 mt-auto">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Eligibility</p>
                      <p className="text-sm text-slate-700 font-medium mb-8">{cat.eligibility}</p>
                      <button 
                        onClick={() => openRegisterForm(cat.id)}
                        className="w-full border border-brand-blue text-brand-blue font-bold py-3 px-6 uppercase text-xs tracking-widest hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
                      >
                        Register
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </section>

          {/* REGISTRATION PROCESS & FEES */}
          <section className="py-24 bg-white border-b border-slate-200">
            <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Left Column: Steps */}
              <div className="lg:col-span-6 space-y-12">
                <div>
                   <h2 className="text-3xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                     Registration Process
                   </h2>
                   <div className="w-16 h-1 bg-brand-orange mt-4 rounded-full" />
                </div>
                
                <div className="space-y-6">
                  {processSteps.map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex gap-6 group"
                    >
                      <div className="w-10 h-10 border border-brand-orange/30 text-brand-orange flex items-center justify-center font-serif font-bold text-sm shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-all rounded-none">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-blue text-base mb-1.5 leading-snug">{step.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Fees Table */}
              <div className="lg:col-span-6 space-y-12">
                <div>
                   <h2 className="text-3xl font-serif font-bold text-brand-blue uppercase tracking-wide">
                     Fee Structure
                   </h2>
                   <div className="w-16 h-1 bg-brand-orange mt-4 rounded-full" />
                </div>

                <div className="border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-blue text-white text-xs uppercase tracking-wider font-bold">
                        <th className="py-4 px-6">Participant Category</th>
                        <th className="py-4 px-6 text-right">Fee (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-sans divide-y divide-slate-100 text-slate-700 bg-white font-medium">
                      {REGISTRATION_CATEGORIES.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4.5 px-6 font-semibold">{row.name}</td>
                          <td className="py-4.5 px-6 text-right font-mono font-bold text-brand-orange">₹{row.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Inclusions Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-slate-50 p-8 border border-slate-200 rounded-none"
                >
                  <h3 className="font-serif font-bold text-lg text-brand-blue mb-6">Inclusions</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <Check size={16} className="text-brand-orange shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>
          </section>

          {/* GUIDELINES */}
          <section className="py-24 bg-slate-50 border-b border-slate-200">
            <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Guidelines list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-10 border border-slate-200 shadow-sm"
              >
                <h3 className="text-2xl font-serif font-bold text-brand-blue mb-8">Important Guidelines</h3>
                <ul className="space-y-5">
                  {guidelines.map((guide, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 bg-brand-orange shrink-0 mt-2 rounded-none"></span>
                      <span className="text-slate-700 text-sm leading-relaxed">{guide}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Help Information */}
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-brand-blue text-white p-10 flex flex-col"
                >
                  <h3 className="text-2xl font-serif font-bold mb-8">Need Assistance?</h3>
                  
                  <div className="space-y-8 flex-grow">
                    <div>
                      <p className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-2">Committee</p>
                      <p className="font-semibold text-lg">Registration Committee</p>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Mail className="text-brand-orange mt-1 shrink-0" size={20} />
                      <div>
                        <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Email</p>
                        <p className="font-medium">registration@sankalp.jklu.edu.in</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="text-brand-orange mt-1 shrink-0" size={20} />
                      <div>
                        <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Phone</p>
                        <p className="font-medium">+91-141-7107500</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="text-brand-orange mt-1 shrink-0" size={20} />
                      <div>
                        <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Response Time</p>
                        <p className="font-medium">Within 2 Working Days</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-32 bg-brand-blue relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-white/10"></div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10"></div>
            
            <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                  Ready to Participate in SANKALP 2027?
                </h2>
                <p className="text-lg text-brand-cloud/80 leading-relaxed font-medium mb-12">
                  Become part of an international platform dedicated to advancing research, collaboration, and innovation in Artificial Intelligence and emerging technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button onClick={() => openRegisterForm('student_presenter')} className="bg-brand-orange text-white font-bold py-4 px-10 uppercase text-sm tracking-widest hover:bg-orange-600 transition-colors shadow-lg cursor-pointer">
                    Register Now
                  </button>
                  <a 
                    href="https://google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 text-white font-bold py-4 px-10 uppercase text-sm tracking-widest hover:bg-white hover:text-brand-blue transition-colors cursor-pointer text-center block"
                  >
                    Download Brochure
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </main>
  );
}
