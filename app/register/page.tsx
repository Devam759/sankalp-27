'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CreditCard, ArrowLeft, ArrowRight, ShieldCheck, Check, XCircle } from 'lucide-react';
import { getCategoryById, REGISTRATION_CATEGORIES } from '@/constants/fees';

export default function RegisterPage() {
  const router = useRouter();
  
  // Registration States
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    category: 'attendee', // default
    affiliation: '',
    country: 'India',
    paperId: '',
    paperTitle: '',
    needAccommodation: 'No',
    pincode: '',
    city: '',
    state: '',
    coupon: ''
  });

  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState('');
  
  // Pricing Preview States
  const [basePrice, setBasePrice] = useState(1000);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(1000);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');

  // Update base fee when category changes
  useEffect(() => {
    const cat = getCategoryById(formData.category);
    if (cat) {
      setBasePrice(cat.amount);
    }
  }, [formData.category]);

  // Recalculate price when base price or coupon changes
  useEffect(() => {
    // Basic local calculation, server recalculates securely on checkout
    setFinalPrice(Math.max(0, basePrice - discount));
  }, [basePrice, discount]);

  // Verify pincode details in background when 6 digits entered
  useEffect(() => {
    const pin = formData.pincode.trim();
    if (pin.length === 6 && /^\d+$/.test(pin)) {
      const fetchAddress = async () => {
        setIsFetchingPincode(true);
        setPincodeStatus('');
        try {
          const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'VERIFY_PINCODE', pincode: pin })
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice[0]) {
              const po = data[0].PostOffice[0];
              const resolvedState = po.State || '';
              const resolvedCity = po.District || po.Division || po.Region || '';
              
              setFormData(prev => ({
                ...prev,
                city: resolvedCity,
                state: resolvedState
              }));
              setPincodeStatus(`Detected: ${resolvedCity}, ${resolvedState}`);
            } else {
              setPincodeStatus('Pincode details not found. Please input manually.');
            }
          } else {
            setPincodeStatus('Unable to verify pincode automatically.');
          }
        } catch (err) {
          console.error("Error auto-fetching pincode:", err);
          setPincodeStatus('Unable to verify pincode.');
        } finally {
          setIsFetchingPincode(false);
        }
      };
      fetchAddress();
    } else {
      setPincodeStatus('');
    }
  }, [formData.pincode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = async () => {
    const code = formData.coupon.trim();
    if (!code) {
      setCouponMessage('Please enter a coupon code.');
      return;
    }
    setCouponLoading(true);
    setCouponMessage('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'VALIDATE_COUPON',
          couponCode: code,
          category: formData.category
        })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setDiscount(data.discountAmount);
        setCouponMessage(`Coupon applied successfully! Discount: ₹${data.discountAmount}`);
      } else {
        setDiscount(0);
        setCouponMessage(data.error || 'Invalid or expired coupon code.');
      }
    } catch (err) {
      console.error('Coupon error:', err);
      setCouponMessage('Failed to validate coupon.');
    } finally {
      setCouponLoading(false);
    }
  };

  const verifyPayment = async (orderId: string) => {
    try {
      const checkRes = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'VERIFY_PAYMENT', orderId })
      });
      const checkData = await checkRes.json();
      if (checkRes.ok && checkData.success) {
        setRegId(checkData.registrationId || orderId);
        setIsSuccess(true);
      } else {
        throw new Error(checkData.error || 'Payment verification pending.');
      }
    } catch (err: any) {
      console.error('Payment verification failed:', err);
      setErrorMessage(err.message || 'Payment verification failed. If your payment was deducted, please contact support.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    // Basic Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      setErrorMessage('Please fill in all core contact details.');
      setIsProcessing(false);
      return;
    }

    const isPresenter = formData.category !== 'attendee';
    if (isPresenter && (!formData.paperId.trim() || !formData.paperTitle.trim())) {
      setErrorMessage('Presenters must specify both Paper ID and Paper Title.');
      setIsProcessing(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE_ORDER',
          ...formData
        })
      });

      const order = await res.json();
      if (!res.ok) {
        throw new Error(order.error || `Server error (${res.status})`);
      }

      if (order.is_mock) {
        console.log("Mock Mode: Direct verification");
        await verifyPayment(order.order_id);
        return;
      }

      if (!order.payment_session_id) {
        throw new Error('Could not initialize payment session.');
      }

      // Store local pending ID
      localStorage.setItem('pending_registration_id', order.order_id);

      // Load Cashfree JS SDK
      const { load } = await import('@cashfreepayments/cashfree-js');
      const cashfree = await load({
        mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox'
      });

      cashfree.checkout({
        paymentSessionId: order.payment_session_id,
        redirectTarget: '_self'
      }).then((result: any) => {
        if (result.error) {
          console.error("Payment failed or closed:", result.error);
          setErrorMessage(result.error.message || 'Payment window closed before completion.');
        } else if (!result.redirect) {
          verifyPayment(order.order_id);
        }
      });
    } catch (err: any) {
      console.error('Registration error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isPresenter = formData.category !== 'attendee';

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-24">
        <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={36} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful</h1>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Thank you for registering. Your payment has been successfully processed, and a confirmation receipt has been sent to <strong className="text-slate-800 font-bold">{formData.email}</strong>.
          </p>
          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded font-mono text-sm text-slate-700 font-bold mb-6">
            ID: {regId}
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded transition-colors text-sm"
          >
            Go to Homepage
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-6 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white border border-slate-200 p-8 sm:p-10 rounded-lg shadow-sm">
        
        {/* Header Title */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            Conference Registration
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Fill in the details below to secure your seat at ICATS-2026.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-start gap-3">
            <XCircle size={18} className="shrink-0 mt-0.5" />
            <div>{errorMessage}</div>
          </div>
        )}

        {isProcessing ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <Loader2 size={36} className="text-amber-600 animate-spin" />
            <p className="text-slate-500 text-sm font-semibold animate-pulse uppercase tracking-wider">
              Processing checkout session...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Participant Information */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-slate-950 uppercase tracking-wide border-l-4 border-amber-600 pl-3">
                1. Participant Contact Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. John Doe"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john.doe@university.edu"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Academic Affiliation & Category */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-slate-950 uppercase tracking-wide border-l-4 border-amber-600 pl-3">
                2. Registration Category & Institution
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Registration Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    {REGISTRATION_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} (₹{cat.amount})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g. India"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Institution / Affiliation *
                  </label>
                  <input
                    type="text"
                    name="affiliation"
                    required
                    value={formData.affiliation}
                    onChange={handleInputChange}
                    placeholder="e.g. Indian Institute of Science"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Presenter Paper Metadata (Conditional) */}
            {isPresenter && (
              <div className="space-y-5 p-5 bg-slate-50 border border-slate-200 rounded">
                <h3 className="text-md font-bold text-slate-900 uppercase tracking-wide">
                  Presenter Paper Metadata
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Please provide details of the accepted paper you will be presenting.
                </p>

                <div className="grid grid-cols-1 gap-4 mt-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Paper ID *
                    </label>
                    <input
                      type="text"
                      name="paperId"
                      required={isPresenter}
                      value={formData.paperId}
                      onChange={handleInputChange}
                      placeholder="e.g. ICATS-2026-104"
                      className="w-full border border-slate-300 rounded bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Paper Title *
                    </label>
                    <input
                      type="text"
                      name="paperTitle"
                      required={isPresenter}
                      value={formData.paperTitle}
                      onChange={handleInputChange}
                      placeholder="Title as written in submission"
                      className="w-full border border-slate-300 rounded bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Venue Location & Accommodation */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-slate-950 uppercase tracking-wide border-l-4 border-amber-600 pl-3">
                3. Address & Accommodation Options
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Pincode / Postal Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit PIN"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                  {isFetchingPincode && <span className="text-[10px] text-slate-500">Checking...</span>}
                  {pincodeStatus && <span className="text-[10px] text-amber-700 block mt-1 font-semibold">{pincodeStatus}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Require Campus Accommodation? (Subject to availability)
                  </label>
                  <select
                    name="needAccommodation"
                    value={formData.needAccommodation}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="No">No, I will manage my own accommodation</option>
                    <option value="Yes">Yes, require guest house accommodation</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 5: Pricing details & Coupon */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleInputChange}
                    placeholder="e.g. WELCOME10"
                    className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 uppercase flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded text-xs uppercase transition-colors shrink-0 disabled:opacity-50"
                  >
                    {couponLoading ? 'Verifying...' : 'Apply'}
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] text-amber-700 font-semibold mt-1.5">{couponMessage}</p>
                )}
              </div>

              {/* Price Table */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Registration Fee:</span>
                  <span className="font-bold text-slate-800">₹{basePrice}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Coupon Discount:</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
                  <span>Amount to Pay:</span>
                  <span className="text-amber-600">₹{finalPrice}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-4 px-6 rounded uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer"
            >
              <CreditCard size={18} />
              <span>Proceed to Checkout</span>
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
