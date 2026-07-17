'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

interface Fragment {
  id: string;
  row: number;
  col: number;
  initialX: number;
  initialY: number;
  initialRotateZ: number;
  initialRotateY: number;
  initialScale: number;
  delay: number;
}

const COLS = 10;
const ROWS = 8;
const ASSEMBLE_DURATION = 2.2;
const MAX_DELAY = 2.8;

// Seeded pseudo-random to avoid hydration mismatch — deterministic per fragment
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

function buildFragments(): Fragment[] {
  const arr: Fragment[] = [];
  const centerCol = (COLS - 1) / 2;
  const centerRow = (ROWS - 1) / 2;
  const maxDist = Math.sqrt(centerCol ** 2 + centerRow ** 2);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const seed = r * COLS + c;
      const angle = seededRand(seed * 3) * Math.PI * 2;
      const dist = 900 + seededRand(seed * 7) * 700;
      const distFromCenter = Math.sqrt((c - centerCol) ** 2 + (r - centerRow) ** 2);
      const distRatio = distFromCenter / maxDist;

      arr.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        initialX: Math.cos(angle) * dist,
        initialY: Math.sin(angle) * dist,
        initialRotateZ: (seededRand(seed * 11) - 0.5) * 540,
        initialRotateY: (seededRand(seed * 13) - 0.5) * 180,
        initialScale: 0.3 + seededRand(seed * 17) * 1.2,
        // Inner pieces fly in first; outer edge pieces arrive last
        delay: distRatio * MAX_DELAY * 0.6 + seededRand(seed * 19) * MAX_DELAY * 0.4,
      });
    }
  }
  return arr;
}

// Built once at module level (not inside render) — truly static, no hydration mismatch
const FRAGMENTS: Fragment[] = buildFragments();

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'idle' | 'assembling' | 'sweep' | 'glow' | 'fadeout'>('idle');
  const [visible, setVisible] = useState(true);
  // Prevents server/client hydration mismatch — server renders a plain div,
  // client hydrates that same plain div, THEN switches to the full animation.
  const [mounted, setMounted] = useState(false);

  const advance = useCallback(() => {
    // Phase 1: Start flying fragments
    setPhase('assembling');

    // Phase 2: All fragments landed → orange sweep
    const sweepTimer = setTimeout(() => setPhase('sweep'), 5600);

    // Phase 3: Glow pulse
    const glowTimer = setTimeout(() => setPhase('glow'), 6800);

    // Phase 4: Fade out → reveal page
    const fadeTimer = setTimeout(() => {
      setPhase('fadeout');
      setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 900);
    }, 7800);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(glowTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    setMounted(true);
    const cleanup = advance();
    return cleanup;
  }, [advance]);

  if (!visible) return null;

  // Server-side & pre-hydration: render a static plain div.
  // This is EXACTLY what the server sends, so hydration always matches.
  if (!mounted) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#f8f6f2',
        }}
      />
    );
  }

  const assembled = phase !== 'idle';
  const sweeping = phase === 'sweep' || phase === 'glow' || phase === 'fadeout';
  const glowing = phase === 'glow' || phase === 'fadeout';
  const fadingOut = phase === 'fadeout';

  return (
    <div
      aria-label="Loading Sankalp '27"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 120% 20%, rgba(245,130,30,0.07) 0%, transparent 50%), radial-gradient(ellipse at 0% 80%, rgba(24,65,118,0.05) 0%, transparent 50%), #f8f6f2',
        transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: fadingOut ? 0 : 1,
        pointerEvents: fadingOut ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* ── PREMIUM GRID BACKGROUND ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(24,65,118,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(24,65,118,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── AMBIENT RADIAL GLOW  ── */}
      <motion.div
        animate={{
          opacity: glowing ? [0.5, 1, 0.5] : assembled ? 0.3 : 0,
          scale: glowing ? [1, 1.15, 1] : 1,
        }}
        transition={{ duration: glowing ? 1.2 : 1.4, repeat: glowing ? Infinity : 0, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,130,30,0.14) 0%, rgba(245,130,30,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── CORNER DECORATIONS ── */}
      {[
        { top: 32, left: 32 },
        { top: 32, right: 32 },
        { bottom: 32, left: 32 },
        { bottom: 32, right: 32 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: assembled ? 0.6 : 0, scale: assembled ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 2 + i * 0.1 }}
          style={{
            position: 'absolute',
            width: 24,
            height: 24,
            borderTop: i < 2 ? '1.5px solid rgba(24,65,118,0.25)' : 'none',
            borderBottom: i >= 2 ? '1.5px solid rgba(24,65,118,0.25)' : 'none',
            borderLeft: i % 2 === 0 ? '1.5px solid rgba(24,65,118,0.25)' : 'none',
            borderRight: i % 2 === 1 ? '1.5px solid rgba(24,65,118,0.25)' : 'none',
            ...pos,
          }}
        />
      ))}

      {/* ── TOP STATUS LINE ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: assembled ? 0.7 : 0, y: assembled ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#f5821e' }}
        />
        <span style={{
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          color: 'rgba(24,65,118,0.55)',
          textTransform: 'uppercase',
        }}>
          SANKALP · 2027 · INITIALIZING
        </span>
      </motion.div>

      {/* ── MAIN LOGO ASSEMBLY ── */}
      <motion.div
        animate={{
          filter: glowing
            ? 'drop-shadow(0 0 60px rgba(245,130,30,0.6)) drop-shadow(0 0 120px rgba(245,130,30,0.2))'
            : sweeping
            ? 'drop-shadow(0 0 24px rgba(245,130,30,0.3)) drop-shadow(0 10px 40px rgba(245,130,30,0.1))'
            : 'drop-shadow(0 0 0px transparent)',
          scale: glowing ? 1.03 : 1,
        }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        style={{
          width: 'clamp(280px, 36vw, 400px)',
          aspectRatio: '760 / 600',
          position: 'relative',
        }}
      >
        {/* Solid image that fades in on sweep to seal fragment gaps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: sweeping ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/logos/sankalp logo.jpeg')",
            backgroundSize: '100% 100%',
            zIndex: 0,
            borderRadius: '4px',
          }}
        />

        {/* Fragment grid */}
        {FRAGMENTS.map((frag) => (
          <motion.div
            key={frag.id}
            initial={{
              x: frag.initialX,
              y: frag.initialY,
              rotateZ: frag.initialRotateZ,
              rotateY: frag.initialRotateY,
              scale: frag.initialScale,
              opacity: 0,
            }}
            animate={{
              x: assembled ? 0 : frag.initialX,
              y: assembled ? 0 : frag.initialY,
              rotateZ: assembled ? 0 : frag.initialRotateZ,
              rotateY: assembled ? 0 : frag.initialRotateY,
              scale: assembled ? 1 : frag.initialScale,
              opacity: assembled ? 1 : 0,
            }}
            transition={{
              duration: ASSEMBLE_DURATION,
              // Smooth spring: slightly overshoots and settles
              ease: [0.12, 0.9, 0.25, 1.02],
              delay: frag.delay,
            }}
            style={{
              position: 'absolute',
              left: `${(frag.col / COLS) * 100}%`,
              top: `${(frag.row / ROWS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              backgroundImage: "url('/logos/sankalp logo.jpeg')",
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${(frag.col / (COLS - 1)) * 100}% ${(frag.row / (ROWS - 1)) * 100}%`,
              willChange: 'transform, opacity',
              zIndex: 1,
            }}
          />
        ))}

        {/* Orange Sweep Light */}
        <AnimatePresence>
          {sweeping && (
            <motion.div
              key="sweep"
              initial={{ x: '-150%', skewX: -15 }}
              animate={{ x: '280%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '70%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(245,130,30,0.15) 30%, rgba(255,255,255,0.7) 50%, rgba(245,130,30,0.15) 70%, transparent 100%)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── BOTTOM STATUS BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: assembled ? 1 : 0, y: assembled ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        style={{
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          width: 'clamp(280px, 36vw, 400px)',
        }}
      >
        {/* Progress Track */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(24,65,118,0.10)', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: assembled ? 1 : 0 }}
            transition={{ duration: MAX_DELAY + ASSEMBLE_DURATION, ease: 'linear', delay: 0 }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '100%',
              background: 'linear-gradient(90deg, #f5821e, #d16e18)',
              transformOrigin: 'left center',
              boxShadow: '0 0 12px rgba(245,130,30,0.8)',
            }}
          />
        </div>

        {/* Label Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            color: 'rgba(24,65,118,0.35)',
            textTransform: 'uppercase',
          }}>
            JK Lakshmipat University
          </span>
          <motion.span
            animate={{ opacity: glowing ? [1, 0.4, 1] : 0.5 }}
            transition={{ duration: 1, repeat: glowing ? Infinity : 0 }}
            style={{
              fontFamily: 'monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.18em',
              color: '#f5821e',
              textTransform: 'uppercase',
            }}
          >
            {glowing ? 'READY' : 'LOADING'}
          </motion.span>
        </div>
      </motion.div>

      {/* Keyframes for scan line */}
      <style>{`
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Subtle Scanline */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: 0.06,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(245,130,30,0.35), transparent)',
            animation: 'scanline 3.5s linear infinite',
          }}
        />
      </div>
    </div>
  );
}
