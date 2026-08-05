'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, getDb } from '../../../lib/firebase';

import { useScannerSession } from '../../../components/scanner/ScannerSessionProvider';

export default function ScanRecordsView() {
  const { scannerAccount } = useScannerSession();
  const [logs, setLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Real-time Subscription to Scan Logs for active operator
  useEffect(() => {
    if (!db || !scannerAccount?.scannerId) return;

    const q = query(
      collection(getDb(), 'scanLogs'),
      where('scannerId', '==', scannerAccount.scannerId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const parsedLogs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      // Sort in-memory to avoid needing firestore index files
      parsedLogs.sort((a: any, b: any) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });
      setLogs(parsedLogs);
    }, (err) => {
      console.warn("Scanner records snapshot listener error:", err);
    });

    return () => unsubscribe();
  }, [scannerAccount?.scannerId]);

  // 2. Compute Stats
  const stats = useMemo(() => {
    const scopedLogs = logs.filter(l => l.scannerId === scannerAccount?.scannerId);
    const total = scopedLogs.length;
    const approved = scopedLogs.filter(l => l.result === 'accepted').length;
    const declined = scopedLogs.filter(l => l.result === 'declined').length;
    return { total, approved, declined };
  }, [logs, scannerAccount?.scannerId]);

  // 3. Filter Logs based on Search Query
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Scoping security check: only show logs matching the active scanner's ID
      if (log.scannerId !== scannerAccount?.scannerId) {
        return false;
      }
      const nameMatch = log.attendeeName?.toLowerCase().includes(searchQuery.toLowerCase());
      const idMatch = log.registrationID?.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || idMatch;
    });
  }, [logs, searchQuery, scannerAccount?.scannerId]);

  // Format timestamp helper
  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Just now';
    const date = new Date(ts.seconds * 1000);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Scans Card */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total Tickets Scanned</h3>
          <p className="font-serif text-3xl font-black text-brand-blue">{stats.total}</p>
        </div>

        {/* Total Approved Card */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Approved Check-ins</h3>
          <p className="font-serif text-3xl font-black text-emerald-600">{stats.approved}</p>
        </div>

        {/* Total Declined Card */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-1">Declined Entries</h3>
          <p className="font-serif text-3xl font-black text-brand-orange">{stats.declined}</p>
        </div>
      </div>

      {/* Filter and Records Panel */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="font-serif text-lg font-black uppercase text-brand-blue">
            Processed Ticket Records
          </h2>

          {/* Search Box */}
          <div className="relative w-full sm:max-w-xs">
            <input 
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-orange transition-all"
            />
          </div>
        </div>

        {/* Records Log Table/List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs font-medium">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4 font-bold">Attendee Info</th>
                <th className="pb-3 px-4 font-bold">Registration ID</th>
                <th className="pb-3 px-4 font-bold">Result</th>
                <th className="pb-3 px-4 font-bold">Verified At</th>
                <th className="pb-3 pl-4 font-bold text-right">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const isAccepted = log.result === 'accepted';
                
                return (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-brand-blue text-sm">{log.attendeeName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{log.registrationID}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase border px-2.5 py-0.5 rounded-lg ${
                        isAccepted 
                          ? 'text-emerald-700 border-emerald-200 bg-emerald-50' 
                          : 'text-brand-orange border-brand-orange/30 bg-brand-orange/5'
                      }`}>
                        {isAccepted ? 'Approved' : 'Declined'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{formatTimestamp(log.timestamp)}</td>
                    <td className="py-3.5 pl-4 text-right text-slate-700 font-mono text-[10px]">
                      {log.volunteerName || 'Operator'}
                      <span className="block text-[9px] text-slate-400 font-normal mt-0.5">ID: {log.scannerId}</span>
                    </td>
                  </tr>
                );
              })}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <span className="text-xs font-bold block text-slate-600">No verification records found</span>
                    <span className="text-[11px] block text-slate-400 mt-1">
                      {searchQuery ? 'Try refining your search keyword' : 'Check-in scanning logs will show up here'}
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
