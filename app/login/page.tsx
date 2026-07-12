'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  sendEmailVerification, 
  signOut,
  User 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '@/lib/firebase';
import { logAdminAction } from '@/lib/audit';

type AuthMode = 'login' | 'reset' | 'unverified';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);

  // Redirect if already authenticated and verified
  useEffect(() => {
    if (isFirebaseConfigured() && auth && auth.currentUser) {
      if (auth.currentUser.emailVerified) {
        checkRoleAndRedirect(auth.currentUser.uid);
      } else {
        // Enforce strict sign-out if a lingering unverified session exists
        auth.signOut();
      }
    }
  }, []);

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    clearMessages();
    setPassword('');
  };

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
    clearMessages();
    setLoading(true);

    if (!isFirebaseConfigured() || !auth || !db) {
      setError(FIREBASE_SETUP_MESSAGE);
      setLoading(false);
      return;
    }

    const inputClean = email.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, inputClean, password);
      
      // SECURITY ENFORCEMENT: Email Verification Required
      if (!userCredential.user.emailVerified) {
        setUnverifiedUser(userCredential.user);
        await signOut(auth); // Immediately terminate the unverified session
        switchMode('unverified');
        setLoading(false);
        return;
      }

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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    
    if (!auth) {
      setError('Authentication service unavailable.');
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccess('If an account with that email exists, a reset link has been sent.');
      setTimeout(() => switchMode('login'), 5000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      // Avoid leaking whether an email exists for security reasons
      setSuccess('If an account with that email exists, a reset link has been sent.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedUser) return;
    clearMessages();
    setLoading(true);
    try {
      await sendEmailVerification(unverifiedUser);
      setSuccess('Verification email sent! Please check your inbox and spam folder.');
    } catch (err: any) {
      console.error('Verification resend error:', err);
      // Firebase applies rate limits natively to this call.
      if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a few minutes before trying again.');
      } else {
        setError('Failed to send verification email. Please try again later.');
      }
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
              Management Platform
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

        {/* Messaging Display */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs font-semibold flex gap-2 items-center">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-xs font-semibold flex gap-2 items-center">
            <AlertCircle size={14} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* ─── LOGIN MODE ─── */}
        {mode === 'login' && (
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
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={() => switchMode('reset')}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
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
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Secure Sign In</span>
              )}
            </button>
          </form>
        )}

        {/* ─── RESET PASSWORD MODE ─── */}
        {mode === 'reset' && (
          <form onSubmit={handlePasswordReset} className="space-y-5">
            <div className="text-sm text-slate-600 mb-2">
              Enter your registered email address and we'll send you a secure link to reset your password.
            </div>
            
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

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3 rounded text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              <span>Send Reset Link</span>
            </button>

            <button 
              type="button" 
              onClick={() => switchMode('login')}
              className="w-full text-slate-500 hover:text-slate-800 text-sm font-semibold flex items-center justify-center gap-2 mt-4"
            >
              <ArrowLeft size={16} /> Back to Sign In
            </button>
          </form>
        )}

        {/* ─── UNVERIFIED EMAIL MODE ─── */}
        {mode === 'unverified' && (
          <div className="space-y-5">
            <div className="text-sm text-slate-600 mb-2 text-center bg-amber-50 p-4 border border-amber-100 rounded">
              <strong className="block text-amber-900 font-bold mb-2 uppercase text-xs tracking-wider">Email Verification Required</strong>
              For security reasons, you must verify your email address before accessing the platform.
            </div>
            
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              <span>Resend Verification Email</span>
            </button>

            <button 
              type="button" 
              onClick={() => switchMode('login')}
              className="w-full text-slate-500 hover:text-slate-800 text-sm font-semibold flex items-center justify-center gap-2 mt-4"
            >
              <ArrowLeft size={16} /> Return to Sign In
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
