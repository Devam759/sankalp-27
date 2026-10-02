'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getDb } from '../../../lib/firebase';
import { useScannerSession } from '../../../components/scanner/ScannerSessionProvider';

export default function ScannerOverviewView() {
  const { scannerAccount } = useScannerSession();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [scanLogs, setScanLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDb();
    
    // Subscribe to Registrations
    const unsubRegs = onSnapshot(collection(db, 'registrations'), (snap) => {
      setRegistrations(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    // Subscribe to Scan Logs
    const unsubLogs = onSnapshot(collection(db, 'scanLogs'), (snap) => {
      const logs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      logs.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setScanLogs(logs);
    });

    return () => {
      unsubRegs();
      unsubLogs();
    };
  }, []);

  const stats = useMemo(() => {
    const totalRegistrations = registrations.length;
    const checkedIn = registrations.filter(r => r.hasEntered).length;
    const remaining = Math.max(0, totalRegistrations - checkedIn);
    
    const myLogs = scanLogs.filter(l => l.scannerId === scannerAccount?.scannerId);
    const myApproved = myLogs.filter(l => l.result === 'accepted').length;

    return {
      totalRegistrations,
      checkedIn,
      remaining,
      myApproved
    };
  }, [registrations, scanLogs, scannerAccount?.scannerId]);

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* Overview Welcome Banner */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl font-black text-brand-blue uppercase tracking-tight">
            Scanner Overview
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Gate Check-in Operations & Attendance Analytics
          </p>
        </div>
        <div className="px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 rounded-xl">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">Active Operator</span>
          <span className="text-sm font-black text-brand-blue block">{scannerAccount?.volunteerName || 'Gate Operator'} ({scannerAccount?.scannerId || 'SCAN-0000'})</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Attendees */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Total Registrations</span>
          <span className="font-serif text-3xl font-black text-brand-blue">{loading ? '...' : stats.totalRegistrations}</span>
        </div>

        {/* Checked In */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">Total Checked In</span>
          <span className="font-serif text-3xl font-black text-emerald-600">{loading ? '...' : stats.checkedIn}</span>
        </div>

        {/* Remaining */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">Pending Entry</span>
          <span className="font-serif text-3xl font-black text-amber-600">{loading ? '...' : stats.remaining}</span>
        </div>

        {/* My Gate Approvals */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-1">Your Gate Scans</span>
          <span className="font-serif text-3xl font-black text-brand-orange">{loading ? '...' : stats.myApproved}</span>
        </div>
      </div>

      {/* Recent Live Activity Stream */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm space-y-4">
        <h2 className="font-serif text-lg font-black uppercase text-brand-blue border-b border-slate-100 pb-3">
          Live Gate Check-in Stream
        </h2>

        <div className="space-y-3">
          {scanLogs.slice(0, 8).map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${log.result === 'accepted' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <div>
                  <span className="font-bold text-brand-blue block text-sm">{log.attendeeName || 'Attendee'}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{log.registrationID}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  log.result === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {log.result === 'accepted' ? 'Approved' : 'Declined'}
                </span>
                <span className="block text-[9px] text-slate-400 mt-0.5">By {log.volunteerName || 'Operator'}</span>
              </div>
            </div>
          ))}

          {scanLogs.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs font-medium">
              No recent gate check-ins logged yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
