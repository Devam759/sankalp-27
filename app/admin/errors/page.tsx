'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db, getDb } from '../../../lib/firebase';
import { SkeletonTable } from '../../../components/admin/SkeletonLoader';

// ============================================================================
// BESPOKE CUSTOM GEOMETRIC SVG ICONS (Gradient-free, Sharp, Heavy-mitre)
// ============================================================================

const CustomFilterIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const CustomClockIcon = ({ className = '', size = 14 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ============================================================================
// AUDIT LOGS VIEW COMPONENT
// ============================================================================

export default function SystemErrors() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    // Fetch last 1000 logs for client side filtering
    const unsub = onSnapshot(query(collection(getDb(), 'auditLogs'), orderBy('timestamp', 'desc'), limit(1000)), (snap) => {
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter((log: any) => log.action === 'SYSTEM_ERROR'));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const logDateMillis = log.timestamp?.toMillis() || 0;
      if (filterDateFrom) {
        if (logDateMillis < new Date(filterDateFrom).getTime()) return false;
      }
      if (filterDateTo) {
        const toDate = new Date(filterDateTo);
        toDate.setHours(23, 59, 59, 999);
        if (logDateMillis > toDate.getTime()) return false;
      }
      return true;
    });
  }, [logs, filterDateFrom, filterDateTo]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterDateFrom, filterDateTo]);

  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  return (
    <div className="space-y-8 select-none font-sans">
      {/* Title Header */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-wide text-brand-blue mb-1">
          System Errors
        </h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">
          Chronological record of system failures
        </p>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mt-4">
        <button 
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between text-slate-800 transition-all cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <CustomFilterIcon size={16} />
            <span className="font-bold text-xs uppercase tracking-wider">Search & Filters</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            {isMobileFiltersOpen ? 'Hide' : 'Show'}
          </span>
        </button>
      </div>

      {/* Structured Filter Card */}
      <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 md:mt-4 ${isMobileFiltersOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
        <div className="overflow-hidden">
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm flex flex-wrap gap-4 items-end">
            {/* Date From */}
            <div className="flex-grow min-w-[130px]">
              <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">From Date</label>
              <input 
                type="date" 
                value={filterDateFrom} 
                onChange={e => setFilterDateFrom(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-700 font-semibold focus:outline-none focus:bg-white transition-colors"
              />
            </div>

            {/* Date To */}
            <div className="flex-grow min-w-[130px]">
              <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">To Date</label>
              <input 
                type="date" 
                value={filterDateTo} 
                onChange={e => setFilterDateTo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-700 font-semibold focus:outline-none focus:bg-white transition-colors"
              />
            </div>

            {/* Clear buttons */}
            <button 
              onClick={() => { setFilterDateFrom(''); setFilterDateTo(''); }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl transition-colors cursor-pointer focus:outline-none"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Grid */}
      {loading ? (
        <SkeletonTable rows={10} />
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Performed By</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Target Node</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors text-xs text-slate-800">
                    <td className="p-4 text-slate-500">
                      {log.timestamp ? log.timestamp.toDate().toLocaleString() : ''}
                    </td>
                    <td className="p-4 font-bold text-brand-blue">{log.performedBy}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 border border-red-200 rounded-lg text-[10px] font-bold uppercase bg-red-50 text-red-700">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-[11px]">{log.targetEntity}</td>
                    <td className="p-4 whitespace-normal min-w-[240px] max-w-sm text-slate-700 text-xs">
                      {log.details}
                    </td>
                  </tr>
                ))}
                {paginatedLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-medium text-xs">
                      No matching system error logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
              <span className="text-xs font-bold text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => {
                    setCurrentPage(p => p - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Prev
                </button>
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => {
                    setCurrentPage(p => p + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
