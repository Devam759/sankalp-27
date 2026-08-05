'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScannerSession } from './ScannerSessionProvider';

// ============================================================================
// BESPOKE CUSTOM GEOMETRIC SVG ICONS FOR SIDEBAR (Gradient-free, Sharp, Heavy-mitre)
// ============================================================================

const CustomConsoleIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="3" y="3" width="18" height="18" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);

const CustomRecordsIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CustomLogoutIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <path d="M10 22H3V2H10" />
    <path d="M21 12H9" />
    <path d="M16 7L21 12L16 17" />
  </svg>
);

const CustomMenuIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
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
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CustomCloseIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
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
    <line x1="4" y1="4" x2="20" y2="20" />
    <line x1="20" y1="4" x2="4" y2="20" />
  </svg>
);

export default function ScannerSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { scannerAccount, logout } = useScannerSession();

  const navItems = [
    { name: 'Scanner Console', href: '/scanner' },
    { name: 'Live Registrations', href: '/scanner/registrations' },
    { name: 'Scan Records', href: '/scanner/records' }
  ];

  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0b1220] border-b border-white/10 flex items-center justify-between px-4 z-50">
        <Link href="/scanner" className="flex items-center gap-2">
          <img src="/logos/jklu_logo.png" alt="JKLU Logo" className="h-10 w-auto object-contain brightness-0 invert" />
          <span className="font-serif font-black text-sm text-white">Scanner Desk</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white p-2 cursor-pointer focus:outline-none hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <CustomCloseIcon size={24} /> : <CustomMenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Contents */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0b1220] border-r border-white/10 flex flex-col transition-transform duration-300 z-50 text-white select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Desktop Sidebar Header */}
        <div className="p-4 border-b border-white/10 bg-[#0b1220] hidden md:flex items-center justify-between gap-3 opacity-95">
          <a href="https://jklu.edu.in" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img src="/logos/white_jklu_logo.webp" alt="JKLU Logo" className="h-11 w-auto object-contain" />
          </a>
          <div className="h-7 w-px bg-white/20" />
          <div className="hover:opacity-80 transition-opacity">
            <img src="/logos/Asia_University_Logo.webp" alt="Asia University Logo" className="h-11 w-auto object-contain brightness-0 invert opacity-90" />
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 bg-[#0b1220]">
          <div className="px-3 pt-1 pb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">
              Scanner Desk
            </span>
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-orange text-white font-bold shadow-md' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white font-medium'
                }`}
              >
                <span className="text-sm font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-3 border-t border-white/10 bg-[#0b1220]">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 text-center truncate">
            Operator: <span className="text-white font-bold">{scannerAccount?.volunteerName || 'Operator'}</span>
          </div>
          <button 
            onClick={logout}
            className="flex items-center justify-center px-3.5 py-2.5 w-full rounded-xl text-slate-400 hover:bg-red-500/15 hover:text-red-400 font-semibold text-sm transition-all duration-200 cursor-pointer"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
