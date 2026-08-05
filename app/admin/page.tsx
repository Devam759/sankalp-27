'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, getDb } from '../../lib/firebase';
import { SkeletonCard } from '../../components/admin/SkeletonLoader';

// ============================================================================
// ADMIN OVERVIEW PAGE COMPONENT
// ============================================================================

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    todayRegistrations: 0,
    totalEntriesToday: 0,
    totalEntries: 0,
    loading: true
  });

  useEffect(() => {
    const unsubRegs = onSnapshot(collection(getDb(), 'registrations'), (snap) => {
      const allRegs = snap.docs.map(d => d.data());
      const validRegs = allRegs.filter((reg: any) => reg.name && reg.name.trim() !== '');
      setStats(s => ({ ...s, totalRegistrations: validRegs.length, loading: false }));
    }, (err) => {
      console.warn("Overview regs snapshot listener error:", err);
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch new registrations created today
    const unsubTodayRegs = onSnapshot(query(collection(getDb(), 'registrations'), where('registeredAt', '>=', today)), (snap) => {
      const allRegs = snap.docs.map(d => d.data());
      const validRegs = allRegs.filter((reg: any) => reg.name && reg.name.trim() !== '');
      setStats(s => ({ ...s, todayRegistrations: validRegs.length }));
    }, (err) => {
      console.warn("Overview todayRegs snapshot listener error:", err);
    });

    // Fetch entries today
    const unsubScans = onSnapshot(query(collection(getDb(), 'scanLogs'), where('timestamp', '>=', today), where('result', '==', 'accepted')), (snap) => {
      setStats(s => ({ ...s, totalEntriesToday: snap.size }));
    }, (err) => {
      console.warn("Overview scans snapshot listener error:", err);
    });

    // Fetch total entries of all time
    const unsubTotalEntries = onSnapshot(query(collection(getDb(), 'registrations'), where('hasEntered', '==', true)), (snap) => {
      setStats(s => ({ ...s, totalEntries: snap.size }));
    }, (err) => {
      console.warn("Overview totalEntries snapshot listener error:", err);
    });

    return () => {
      unsubRegs();
      unsubTodayRegs();
      unsubScans();
      unsubTotalEntries();
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-wide text-brand-blue mb-1">
          Overview
        </h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">
          Live snapshot of JKLU SANKALP 2027 Conference
        </p>
      </div>

      {/* Quick Statistics Grid */}
      {stats.loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Registrations */}
          <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Registrations</h3>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-black text-brand-blue">{stats.totalRegistrations}</p>
          </div>
          
          {/* Card 2: Today's Registrations */}
          <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Today&apos;s Registrations</h3>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-black text-brand-orange">{stats.todayRegistrations}</p>
          </div>

          {/* Card 3: Entries Today */}
          <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Entries Today</h3>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-black text-brand-orange">{stats.totalEntriesToday}</p>
          </div>

          {/* Card 4: Total Entries */}
          <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Entries</h3>
            </div>
            <p className="font-serif text-3xl md:text-4xl font-black text-brand-blue">{stats.totalEntries}</p>
          </div>
        </div>
      )}
    </div>
  );
}
