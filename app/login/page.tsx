'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '@/lib/firebase';
import { logAdminAction } from '@/lib/audit';

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
          if (auth) await auth.signOut();
        }
      } else {
        setError('Access denied: Account has no assigned role.');
        if (auth) await auth.signOut();
      }
    } catch (err) {
      console.error('Role validation error:', err);
      setError('Could not verify account permissions.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(false);

    if (!isFirebaseConfigured() || !auth || !db) {
      setError(FIREBASE_SETUP_MESSAGE);
      return;
    }

    setLoading(true);
    const inputClean = email.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, inputClean, password);
      const uid = userCredential.user.uid;

      // Log successful login action in Firestore auditLogs
      try {
        await logAdminAction('LOGIN', 'sessions', `User ${inputClean} signed in successfully`);
      } catch (logErr) {
        console.warn("Could not log login audit action:", logErr);
      }

      await checkRoleAndRedirect(uid);
    } catch (authErr: any) {
      console.error('Authentication error:', authErr);
      setError('Invalid email address or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white border border-slate-200 p-8 rounded-lg shadow-md">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="flex flex-col select-none items-center mb-6">
            <span className="font-extrabold text-2xl tracking-widest uppercase text-amber-600 font-sans leading-none">
              ICATS 2026
            </span>
            <span className="font-semibold text-xs tracking-widest uppercase text-slate-500 font-sans leading-none mt-2">
              Management Portal
            </span>
          </div>
          <div className="w-12 h-1 bg-amber-600 mx-auto rounded" />
        </div>

        {/* Configuration Warning */}
        {!isFirebaseConfigured() && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs leading-relaxed flex gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold uppercase mb-0.5">Firebase Required</strong>
              {FIREBASE_SETUP_MESSAGE}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs font-semibold flex gap-2 items-center">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="e.g. admin@jklu.edu.in"
                className="w-full border border-slate-300 rounded py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-slate-300 rounded py-2.5 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3 rounded text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
