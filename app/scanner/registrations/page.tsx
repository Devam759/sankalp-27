'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, getDb } from '../../../lib/firebase';
import { useScannerSession } from '../../../components/scanner/ScannerSessionProvider';

export default function ScannerLiveRegistrationsView() {
  const { scannerAccount } = useScannerSession();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Real-time subscription to all live registrations
  useEffect(() => {
    if (!db) return;

    const unsubscribe = onSnapshot(collection(getDb(), 'registrations'), (snapshot) => {
      const parsed = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      // Filter out invalid/empty registrations
      const valid = parsed.filter((r: any) => r.name && r.name.trim() !== '');
      setRegistrations(valid);
    }, (err) => {
      console.warn("Scanner registrations snapshot listener error:", err);
    });

    return () => unsubscribe();
  }, []);

  // Compute live check-in statistics
  const stats = useMemo(() => {
    const total = registrations.length;
    const entered = registrations.filter(r => r.hasEntered).length;
    const remaining = total - entered;
    return { total, entered, remaining };
  }, [registrations]);

  // Extract unique categories for filtering
  const categories = useMemo(() => {
    const set = new Set<string>();
    registrations.forEach(r => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set);
  }, [registrations]);

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      const q = searchQuery.toLowerCase();
      const nameMatch = reg.name?.toLowerCase().includes(q);
      const idMatch = reg.registrationID?.toLowerCase().includes(q);
      const emailMatch = reg.email?.toLowerCase().includes(q);
      const categoryMatch = filterCategory === 'all' || reg.category === filterCategory;

      return (nameMatch || idMatch || emailMatch) && categoryMatch;
    });
  }, [registrations, searchQuery, filterCategory]);

  // Manual Check-in Handler
  const handleManualCheckIn = async (regDocId: string, regID: string, attendeeName: string) => {
    if (!db || processingId) return;
    setProcessingId(regDocId);

    try {
      // 1. Update registration entry status
      await updateDoc(doc(getDb(), 'registrations', regDocId), {
        hasEntered: true,
        enteredAt: serverTimestamp(),
        entryMethod: 'manual_scanner_desk',
        checkedInBy: scannerAccount?.scannerId || 'Scanner'
      });

      // 2. Log entry to scanLogs
      const { addDoc } = await import('firebase/firestore');
      await addDoc(collection(getDb(), 'scanLogs'), {
        registrationID: regID,
        attendeeName: attendeeName || 'Attendee',
        scannerId: scannerAccount?.scannerId || 'Scanner',
        volunteerName: scannerAccount?.volunteerName || 'Operator',
        gateName: scannerAccount?.gateName || 'Main Gate',
        result: 'accepted',
        reason: 'Manual Check-in via Scanner Live Registrations Desk',
        timestamp: serverTimestamp()
      });

    } catch (err) {
      console.error("Manual check-in error:", err);
      alert("Could not process check-in. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* Live Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total Registrations</h3>
          <p className="font-serif text-3xl font-black text-brand-blue">{stats.total}</p>
        </div>

        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Total Checked-In</h3>
          <p className="font-serif text-3xl font-black text-emerald-600">{stats.entered}</p>
        </div>

        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">Remaining Desk Entries</h3>
          <p className="font-serif text-3xl font-black text-brand-orange">{stats.remaining}</p>
        </div>
      </div>

      {/* Main Records Container */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-serif text-xl font-black uppercase text-brand-blue">
              Live Registrations
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Real-time attendee database for desk lookup and manual check-ins
            </p>
          </div>

          {/* Controls: Search + Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {categories.length > 0 && (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-orange"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}

            <div className="relative w-full sm:w-64">
              <input 
                type="text"
                placeholder="Search name, ID or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-orange transition-all"
              />
            </div>
          </div>
        </div>

        {/* Live Registrations Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4 font-bold">Attendee Info</th>
                <th className="pb-3 px-4 font-bold">Registration ID</th>
                <th className="pb-3 px-4 font-bold">Category</th>
                <th className="pb-3 px-4 font-bold">Entry Status</th>
                <th className="pb-3 pl-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRegistrations.map((reg) => {
                const isEntered = reg.hasEntered;

                return (
                  <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-brand-blue text-sm">{reg.name}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{reg.email || '—'}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{reg.registrationID}</td>
                    <td className="py-3.5 px-4 text-slate-600">{reg.category || 'Standard'}</td>
                    <td className="py-3.5 px-4">
                      {isEntered ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                          ✓ Checked In
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      {isEntered ? (
                        <span className="text-[11px] font-bold text-slate-400">Completed</span>
                      ) : (
                        <button
                          onClick={() => handleManualCheckIn(reg.id, reg.registrationID, reg.name)}
                          disabled={processingId === reg.id}
                          className="bg-brand-orange hover:bg-[#d94e05] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                        >
                          {processingId === reg.id ? 'Processing...' : 'Manual Check-in'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredRegistrations.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <span className="text-xs font-bold block text-slate-600">No registration records found</span>
                    <span className="text-[11px] block text-slate-400 mt-1">
                      {searchQuery ? 'Try refining your search keyword' : 'Live attendee registrations will display here'}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
