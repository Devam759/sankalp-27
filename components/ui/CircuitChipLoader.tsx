'use client';

import React from 'react';

export default function CircuitChipLoader() {
  return (
    <div className="w-full max-w-6xl mx-auto my-2 flex items-center justify-center">
      <style jsx>{`
        .trace-bg {
          stroke: #cbd5e1;
          stroke-width: 2.2;
          fill: none;
        }

        .trace-flow {
          stroke-width: 2.5;
          fill: none;
          stroke-dasharray: 70 500;
          stroke-dashoffset: 570;
          filter: drop-shadow(0 0 8px currentColor);
          animation: circuitFlow 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .brand-orange {
          stroke: #f5821e;
          color: #f5821e;
        }
        .brand-blue {
          stroke: #0284c7;
          color: #0284c7;
        }
        .brand-teal {
          stroke: #0d9488;
          color: #0d9488;
        }
        .brand-indigo {
          stroke: #4338ca;
          color: #4338ca;
        }

        @keyframes circuitFlow {
          0% {
            stroke-dashoffset: 570;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      <div className="w-full">
        <svg viewBox="0 0 1200 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="chipGradient" x1={0} y1={0} x2={0} y2={1}>
              <stop offset="0%" stopColor="#184176" />
              <stop offset="100%" stopColor="#0b172a" />
            </linearGradient>
            <linearGradient id="textGradient" x1={0} y1={0} x2={0} y2={1}>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="pinGradient" x1={1} y1={0} x2={0} y2={0}>
              <stop offset="0%" stopColor="#f5821e" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>
          </defs>

          {/* Extended Wide Circuit Traces */}
          <g id="traces">
            {/* Left Side Traces */}
            <path d="M40 60 H340 V130 H526" className="trace-bg" />
            <path d="M40 60 H340 V130 H526" className="trace-flow brand-orange" />
            
            <path d="M60 120 H300 V155 H526" className="trace-bg" />
            <path d="M60 120 H300 V155 H526" className="trace-flow brand-blue" />
            
            <path d="M20 180 H280 V180 H526" className="trace-bg" />
            <path d="M20 180 H280 V180 H526" className="trace-flow brand-teal" />
            
            <path d="M80 270 H320 V205 H526" className="trace-bg" />
            <path d="M80 270 H320 V205 H526" className="trace-flow brand-indigo" />

            {/* Right Side Traces */}
            <path d="M1160 60 H860 V130 H674" className="trace-bg" />
            <path d="M1160 60 H860 V130 H674" className="trace-flow brand-blue" />
            
            <path d="M1140 120 H900 V155 H674" className="trace-bg" />
            <path d="M1140 120 H900 V155 H674" className="trace-flow brand-teal" />
            
            <path d="M1180 180 H920 V180 H674" className="trace-bg" />
            <path d="M1180 180 H920 V180 H674" className="trace-flow brand-orange" />
            
            <path d="M1120 270 H880 V205 H674" className="trace-bg" />
            <path d="M1120 270 H880 V205 H674" className="trace-flow brand-indigo" />
          </g>

          {/* Microchip Body */}
          <rect 
            x={530} 
            y={120} 
            width={144} 
            height={100} 
            rx={18} 
            ry={18} 
            fill="url(#chipGradient)" 
            stroke="#f5821e" 
            strokeWidth={2.5} 
            filter="drop-shadow(0 6px 24px rgba(24, 65, 118, 0.45))" 
          />

          {/* Left Pins */}
          <g>
            <rect x={522} y={132} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={522} y={154} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={522} y={176} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={522} y={198} width={8} height={10} fill="url(#pinGradient)" rx={2} />
          </g>

          {/* Right Pins */}
          <g>
            <rect x={670} y={132} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={670} y={154} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={670} y={176} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={670} y={198} width={8} height={10} fill="url(#pinGradient)" rx={2} />
          </g>

          {/* Microchip Text */}
          <text 
            x={602} 
            y={162} 
            fontFamily="sans-serif" 
            fontSize={14} 
            fontWeight="bold"
            fill="url(#textGradient)" 
            textAnchor="middle" 
            alignmentBaseline="middle"
            letterSpacing={2}
          >
            REVEALING
          </text>
          <text 
            x={602} 
            y={184} 
            fontFamily="sans-serif" 
            fontSize={13} 
            fontWeight="bold"
            fill="#f5821e" 
            textAnchor="middle" 
            alignmentBaseline="middle"
            letterSpacing={2.5}
          >
            SOON
          </text>

          {/* Connection Nodes */}
          <circle cx={40} cy={60} r={5} fill="#f5821e" />
          <circle cx={60} cy={120} r={5} fill="#0284c7" />
          <circle cx={20} cy={180} r={5} fill="#0d9488" />
          <circle cx={80} cy={270} r={5} fill="#4338ca" />
          <circle cx={1160} cy={60} r={5} fill="#0284c7" />
          <circle cx={1140} cy={120} r={5} fill="#0d9488" />
          <circle cx={1180} cy={180} r={5} fill="#f5821e" />
          <circle cx={1120} cy={270} r={5} fill="#4338ca" />
        </svg>
      </div>
    </div>
  );
}
