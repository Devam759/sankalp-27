'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    // Check if the error is a ChunkLoadError
    const errorStr = (error.message || '') + (error.stack || '') + (error.name || '');
    const isChunkLoadError = 
      error.name === 'ChunkLoadError' ||
      errorStr.includes('ChunkLoadError') ||
      errorStr.includes('Loading chunk') ||
      errorStr.includes('failed');

    if (isChunkLoadError && typeof window !== 'undefined') {
      const hasReloaded = sessionStorage.getItem('chunk_load_error_reload');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk_load_error_reload', 'true');
        console.warn("ChunkLoadError detected. Reloading page to fetch fresh assets...");
        window.location.reload();
        return;
      }
    }

    if (logged) return;
    
    console.error("Global Error Boundary Caught Exception:", error);
    
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message || 'Unknown Error',
        stack: error.stack || '',
        path: typeof window !== 'undefined' ? window.location.pathname : 'Server Render',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
        type: 'React Error Boundary Crash'
      })
    }).catch((err) => {
      console.warn("Failed to send error log to server:", err);
    });

    setLogged(true);
  }, [error, logged]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white font-sans">
      <div className="bg-slate-900 p-8 md:p-12 rounded-lg border border-slate-800 max-w-lg w-full flex flex-col items-center shadow-2xl">
        <div className="w-16 h-16 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-4">
          System Error
        </h1>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          A critical error was encountered. The technical team has been automatically notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded transition-all active:scale-95"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="flex-1 px-6 py-3 border border-slate-700 hover:border-slate-500 text-white font-semibold rounded hover:bg-slate-800 transition-all active:scale-95"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
