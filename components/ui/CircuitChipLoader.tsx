'use client';

import React from 'react';

export default function CircuitChipLoader() {
  return (
    <div className="w-full max-w-5xl mx-auto my-2 flex flex-col items-center justify-center">
      <style jsx>{`
        .trace-bg {
          stroke: #cbd5e1;
          stroke-width: 2.2;
          fill: none;
          stroke-opacity: 0.65;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .trace-flow {
          stroke-width: 2.6;
          fill: none;
          stroke-dasharray: 70 500;
          stroke-dashoffset: 570;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 6px currentColor);
          animation: circuitFlow 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .pulse-orange {
          stroke: #f5821e;
          color: #f5821e;
        }

        .pulse-navy {
          stroke: #184176;
          color: #184176;
        }

        .node-glow {
          animation: breathingGlow 3s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes circuitFlow {
          0% {
            stroke-dashoffset: 570;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes breathingGlow {
          0%, 100% {
            opacity: 0.85;
            filter: drop-shadow(0 0 2px currentColor);
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 8px currentColor);
          }
        }
      `}</style>

      <div className="w-full relative">
        <svg viewBox="0 0 1200 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            {/* Subtle background PCB pattern */}
            <pattern id="pcbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#173F73" strokeWidth="0.8" opacity="0.12" />
              <circle cx="40" cy="40" r="1" fill="#173F73" opacity="0.2" />
            </pattern>

            {/* Chip Gradient */}
            <linearGradient id="chipGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#173F73" />
              <stop offset="100%" stopColor="#102B4E" />
            </linearGradient>

            {/* Glossy Top Highlight */}
            <linearGradient id="glossHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Pin Gradient */}
            <linearGradient id="pinGradient" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#f5821e" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            {/* Chip Filter with Outer Glow and Soft Shadow */}
            <filter id="chipShadowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="11" floodColor="#102B4E" floodOpacity="0.32" />
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f5821e" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Background PCB Grid Pattern */}
          <rect width="100%" height="100%" fill="url(#pcbGrid)" opacity="0.5" />

          {/* Circuit Traces */}
          <g id="traces">
            {/* Left Side Traces */}
            <path d="M40 50 H260 V125 H486" className="trace-bg" />
            <path d="M40 50 H260 V125 H486" className="trace-flow pulse-orange" />

            <path d="M60 100 H230 V151 H486" className="trace-bg" />
            <path d="M60 100 H230 V151 H486" className="trace-flow pulse-orange" />

            <path d="M20 180 H200 V179 H486" className="trace-bg" />
            <path d="M20 180 H200 V179 H486" className="trace-flow pulse-navy" />

            <path d="M80 270 H250 V205 H486" className="trace-bg" />
            <path d="M80 270 H250 V205 H486" className="trace-flow pulse-orange" />

            {/* Right Side Traces */}
            <path d="M1160 50 H940 V125 H714" className="trace-bg" />
            <path d="M1160 50 H940 V125 H714" className="trace-flow pulse-orange" />

            <path d="M1140 100 H970 V151 H714" className="trace-bg" />
            <path d="M1140 100 H970 V151 H714" className="trace-flow pulse-navy" />

            <path d="M1180 180 H1000 V179 H714" className="trace-bg" />
            <path d="M1180 180 H1000 V179 H714" className="trace-flow pulse-orange" />

            <path d="M1120 270 H950 V205 H714" className="trace-bg" />
            <path d="M1120 270 H950 V205 H714" className="trace-flow pulse-navy" />
          </g>

          {/* PCB Connector Bend Nodes */}
          <g id="bend-nodes" opacity="0.9">
            <circle cx={260} cy={50} r={3} fill="#cbd5e1" />
            <circle cx={260} cy={125} r={3} fill="#cbd5e1" />

            <circle cx={230} cy={100} r={3} fill="#cbd5e1" />
            <circle cx={230} cy={151} r={3} fill="#cbd5e1" />

            <circle cx={200} cy={180} r={3} fill="#cbd5e1" />

            <circle cx={250} cy={270} r={3} fill="#cbd5e1" />
            <circle cx={250} cy={205} r={3} fill="#cbd5e1" />

            <circle cx={940} cy={50} r={3} fill="#cbd5e1" />
            <circle cx={940} cy={125} r={3} fill="#cbd5e1" />

            <circle cx={970} cy={100} r={3} fill="#cbd5e1" />
            <circle cx={970} cy={151} r={3} fill="#cbd5e1" />

            <circle cx={1000} cy={180} r={3} fill="#cbd5e1" />

            <circle cx={950} cy={270} r={3} fill="#cbd5e1" />
            <circle cx={950} cy={205} r={3} fill="#cbd5e1" />
          </g>

          {/* Microchip Processor Main Body */}
          <rect
            x={490}
            y={110}
            width={220}
            height={110}
            rx={16}
            ry={16}
            fill="url(#chipGradient)"
            stroke="#f5821e"
            strokeWidth={1.5}
            filter="url(#chipShadowGlow)"
          />

          {/* Inner Accent Inset Border */}
          <rect
            x={494}
            y={114}
            width={212}
            height={102}
            rx={14}
            ry={14}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={1}
          />

          {/* Glossy Top Highlight Arc */}
          <rect
            x={491}
            y={111}
            width={218}
            height={40}
            rx={15}
            ry={15}
            fill="url(#glossHighlight)"
          />

          {/* Left Pins */}
          <g id="left-pins">
            <rect x={482} y={119} width={8} height={12} fill="url(#pinGradient)" rx={2} />
            <rect x={482} y={145} width={8} height={12} fill="url(#pinGradient)" rx={2} />
            <rect x={482} y={173} width={8} height={12} fill="url(#pinGradient)" rx={2} />
            <rect x={482} y={199} width={8} height={12} fill="url(#pinGradient)" rx={2} />
          </g>

          {/* Right Pins */}
          <g id="right-pins">
            <rect x={710} y={119} width={8} height={12} fill="url(#pinGradient)" rx={2} />
            <rect x={710} y={145} width={8} height={12} fill="url(#pinGradient)" rx={2} />
            <rect x={710} y={173} width={8} height={12} fill="url(#pinGradient)" rx={2} />
            <rect x={710} y={199} width={8} height={12} fill="url(#pinGradient)" rx={2} />
          </g>

          {/* Processor Microchip Typography */}
          <text
            x={600}
            y={152}
            fontFamily="sans-serif"
            fontSize={15}
            fontWeight="bold"
            fill="#ffffff"
            textAnchor="middle"
            alignmentBaseline="middle"
            letterSpacing={3}
          >
            REVEALING
          </text>

          <text
            x={600}
            y={178}
            fontFamily="sans-serif"
            fontSize={15}
            fontWeight="bold"
            fill="#f5821e"
            textAnchor="middle"
            alignmentBaseline="middle"
            letterSpacing={3.5}
          >
            SOON
          </text>

          {/* Endpoint Indicators with Breathing Glow */}
          <g id="endpoints">
            <circle cx={40} cy={50} r={5} fill="#f5821e" className="node-glow pulse-orange" />
            <circle cx={60} cy={100} r={5} fill="#f5821e" className="node-glow pulse-orange" />
            <circle cx={20} cy={180} r={5} fill="#184176" className="node-glow pulse-navy" />
            <circle cx={80} cy={270} r={5} fill="#cbd5e1" className="node-glow" />

            <circle cx={1160} cy={50} r={5} fill="#f5821e" className="node-glow pulse-orange" />
            <circle cx={1140} cy={100} r={5} fill="#184176" className="node-glow pulse-navy" />
            <circle cx={1180} cy={180} r={5} fill="#f5821e" className="node-glow pulse-orange" />
            <circle cx={1120} cy={270} r={5} fill="#cbd5e1" className="node-glow" />
          </g>
        </svg>
      </div>
    </div>
  );
}
