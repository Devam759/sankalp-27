'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, getDb, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '../../lib/firebase';
import AdminSidebar from './AdminSidebar';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState(false);
  const router = useRouter();
  const firebaseReady = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseReady || !auth || !db) {
      setConfigError(true);
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const roleDoc = await getDoc(doc(getDb(), 'roles', user.uid));
        if (roleDoc.exists() && roleDoc.data().role === 'admin') {
          setLoading(false);
        } else {
          router.push('/scanner');
        }
      } catch {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router, firebaseReady]);

  if (configError) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-serif font-black text-brand-orange mb-3 uppercase tracking-tight">Firebase Unconfigured</h2>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">
            {FIREBASE_SETUP_MESSAGE}
          </p>
          <div className="text-xs bg-slate-50 border border-slate-200 p-4 rounded-xl text-left font-mono overflow-x-auto text-slate-800 font-medium">
            1. Copy .env.example to .env.local<br/>
            2. Fill in your Firebase configuration keys
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f4ef] text-slate-900 font-sans selection:bg-brand-orange selection:text-white">
      <AdminSidebar />
      <main className="flex-1 w-full md:w-[calc(100%-16rem)] pt-16 md:pt-0 overflow-y-auto relative">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
