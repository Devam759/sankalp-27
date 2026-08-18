'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AtomIcon } from '@/components/ui/Icons';
import { 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '@/lib/firebase';
import { logAdminAction } from '@/lib/audit';
import { executeRecaptcha } from '@/lib/recaptcha';

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isFirebaseConfigured() && auth && auth.currentUser) {
      checkRoleAndRedirect(auth.currentUser.uid);
    }
  }, []);

  const checkRoleAndRedirect = async (uid: string) => {
    if (!db) return;
    try {
      const roleDoc = await getDoc(doc(db, 'roles', uid));
      if (roleDoc.exists()) {
        const role = roleDoc.data().role;
        if (role === 'admin') {
          router.push('/admin');
        } else if (role === 'scanner') {
          router.push('/scanner');
        } else {
          setError('Access denied: Unauthorized role.');
          if (auth) await signOut(auth);
        }
      } else {
        setError('Access denied: Account has no assigned role.');
        if (auth) await signOut(auth);
      }
    } catch (err) {
      console.error('Role validation error:', err);
      setError('Could not verify account permissions.');
      if (auth) await signOut(auth);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isFirebaseConfigured() || !auth || !db) {
      setError(FIREBASE_SETUP_MESSAGE);
      setLoading(false);
      return;
    }

    const inputClean = email.trim();

    try {
      // 1. Execute reCAPTCHA for LOGIN action
      const recaptchaToken = await executeRecaptcha('LOGIN');
      if (recaptchaToken) {
        const recaptchaRes = await fetch('/api/recaptcha/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: recaptchaToken, action: 'LOGIN' }),
        });
        const recaptchaResult = await recaptchaRes.json();
        if (!recaptchaRes.ok || !recaptchaResult.success) {
          setError(recaptchaResult.error || 'reCAPTCHA verification failed. Please try again.');
          setLoading(false);
          return;
        }
      }

      const userCredential = await signInWithEmailAndPassword(auth, inputClean, password);
      
      // Log successful login action
      try {
        await logAdminAction('LOGIN', 'sessions', `User ${inputClean} signed in successfully`);
      } catch (logErr) {
        console.warn("Could not log login audit action:", logErr);
      }

      await checkRoleAndRedirect(userCredential.user.uid);
    } catch (authErr: any) {
      console.error('Authentication error:', authErr);
      setError('Invalid email address or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-brand-ink font-sans flex flex-col items-center justify-center p-6 select-none relative">
      <div className="w-full max-w-lg bg-white border border-slate-200/90 p-8 sm:p-10 rounded-2xl shadow-xl relative z-10">
        
        {/* Header Logos & Branding */}
        <div className="text-center mb-8">
          {/* Logo Row: JKLU | SANKALP Emblem | ASIA UNIVERSITY */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            {/* JKLU Logo */}
            <a href="https://jklu.edu.in" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity flex items-center">
              <img
                src="/logos/jklu_logo.webp"
                alt="JKLU Logo"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </a>

            <div className="h-10 w-px bg-slate-200" />

            {/* SANKALP Logo */}
            <div className="flex items-center">
              <img
                src="/logos/sankalp_logo.webp"
                alt="SANKALP 2027 Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            <div className="h-10 w-px bg-slate-200" />

            {/* Asia University Logo */}
            <div className="hover:opacity-90 transition-opacity flex items-center">
              <img
                src="/logos/Asia_University_Logo.webp"
                alt="Asia University Logo"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col select-none items-center mb-3">
            <h1 className="font-serif font-black text-2xl sm:text-3xl tracking-wide uppercase text-brand-blue leading-none">
              JKLU SANKALP 2027
            </h1>
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-brand-orange leading-none mt-2.5">
              Management Platform
            </span>
          </div>
          <div className="w-14 h-1 bg-brand-orange mx-auto rounded-full mt-3" />
        </div>

        {/* Configuration Warning */}
        {!isFirebaseConfigured() && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs leading-relaxed">
            <div>
              <strong className="block font-bold uppercase mb-1 tracking-wider">Firebase Setup Required</strong>
              {FIREBASE_SETUP_MESSAGE}
            </div>
          </div>
        )}

        {/* Error Messaging Display */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
            <span>{error}</span>
          </div>
        )}

        {/* ─── LOGIN FORM ─── */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@sankalp.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange text-sm text-brand-blue placeholder-slate-400 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-16 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange text-sm text-brand-blue placeholder-slate-400 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 focus:outline-none cursor-pointer uppercase tracking-wider"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue hover:bg-[#060b14] text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

      </div>
    </main>
  );
}
