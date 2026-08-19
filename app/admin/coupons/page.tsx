'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, getDb } from '../../../lib/firebase';
import { SkeletonTable } from '../../../components/admin/SkeletonLoader';
import { Modal } from '../../../components/admin/Modal';
import { logAdminAction } from '../../../lib/audit';

// Custom SVG Icons
const CustomTagIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const CustomPlusIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

interface Coupon {
  id: string; // The coupon code
  code: string;
  amount: number;
  active: boolean;
  createdAt: any;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newAmount, setNewAmount] = useState<number | ''>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(getDb(), 'coupons'), (snap) => {
      const fetched: Coupon[] = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Coupon[];
      
      // Sort by creation date (newest first)
      fetched.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });

      setCoupons(fetched);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching coupons:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = newCode.trim().toUpperCase();
    
    if (!cleanCode) return alert('Please enter a coupon code');
    if (newAmount === '') return alert('Please enter an amount');
    
    setIsSubmitting(true);
    try {
      await setDoc(doc(getDb(), 'coupons', cleanCode), {
        code: cleanCode,
        amount: Number(newAmount),
        active: true,
        createdAt: serverTimestamp()
      });
      
      await logAdminAction('CREATE_COUPON', 'coupons', `Created new coupon: ${cleanCode} with fixed price Rs. ${newAmount}`);
      
      setNewCode('');
      setNewAmount(1);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding coupon:", error);
      alert('Failed to add coupon.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'disable' : 'enable'} this coupon?`)) return;
    
    try {
      await updateDoc(doc(getDb(), 'coupons', id), {
        active: !currentStatus
      });
      await logAdminAction('UPDATE_COUPON', 'coupons', `${!currentStatus ? 'Enabled' : 'Disabled'} coupon: ${id}`);
    } catch (error) {
      console.error("Error toggling coupon:", error);
      alert('Failed to update coupon status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this coupon?')) return;
    
    try {
      await deleteDoc(doc(getDb(), 'coupons', id));
      await logAdminAction('DELETE_COUPON', 'coupons', `Deleted coupon: ${id}`);
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert('Failed to delete coupon.');
    }
  };

  return (
    <div className="space-y-8 select-none font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-wide text-brand-blue mb-1">
            Coupons
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">
            Manage dynamic discount codes
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-orange hover:bg-[#d94e05] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <CustomPlusIcon size={16} /> Add Coupon
        </button>
      </div>

      {/* Main Table Grid */}
      {loading ? (
        <SkeletonTable rows={5} />
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="p-4">Coupon Code</th>
                  <th className="p-4">Fixed Amount (Rs.)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-slate-50/80 transition-colors text-xs text-slate-800">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <CustomTagIcon size={14} className="text-brand-orange" />
                        <span className="font-bold text-sm text-brand-blue uppercase">{coupon.code}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-700">
                      Rs. {Number(coupon.amount).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 border rounded-lg text-[10px] font-bold uppercase ${
                        coupon.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {coupon.active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleToggleActive(coupon.id, coupon.active)}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Toggle
                      </button>
                      <button 
                        onClick={() => handleDelete(coupon.id)}
                        className="px-3 py-1.5 border border-red-200 rounded-lg text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {coupons.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400 font-medium text-xs">
                      No coupons found. Click "Add Coupon" above to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Coupon">
        <form onSubmit={handleAddCoupon} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">Coupon Code</label>
            <input 
              type="text" 
              required
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              placeholder="e.g. VIP2026"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-orange transition-colors uppercase tracking-wider"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">Fixed Payment Amount (Rs.)</label>
            <input 
              type="number" 
              required
              min="0"
              step="any"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 1 (For testing) or 2000 (For discount)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-orange transition-colors"
            />
            <p className="text-[11px] text-slate-400 font-medium mt-1.5">
              Note: This is the exact amount the user will pay. The standard price is Rs. 2500. Set to 1 for test coupons.
            </p>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-brand-orange hover:bg-[#d94e05] text-white font-bold text-xs uppercase py-3 rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Creating...' : 'Create Coupon'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
