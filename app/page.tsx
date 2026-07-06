'use client';

import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white font-sans p-6 selection:bg-amber-600 selection:text-white relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl -top-64 -left-64" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -bottom-64 -right-64" />
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-xl">
        {/* JKLU Logo */}
        <div className="mb-12 animate-fade-in">
          <Image
            src="/logos/jklu_logo_light.svg"
            alt="JKLU Logo"
            width={180}
            height={60}
            priority
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
          SANKALP &apos;27
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg md:text-xl font-medium tracking-wide mb-8 uppercase">
          New Student Welcome & Orientation Portal
        </p>

        <div className="w-16 h-1 bg-amber-500 mb-8 rounded-full" />

        {/* Status / Message */}
        <p className="text-slate-300 text-base md:text-lg max-w-md leading-relaxed mb-12">
          We are currently setting up the official digital experience for the incoming Batch of 2027. Stay tuned for updates.
        </p>

        {/* Contact info or Footer */}
        <div className="text-slate-500 text-xs border-t border-slate-900 pt-6 w-full">
          &copy; {new Date().getFullYear()} JK Lakshmipat University, Jaipur. All rights reserved.
        </div>
      </div>
    </main>
  );
}
