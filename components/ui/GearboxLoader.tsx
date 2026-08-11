'use client';

import React from 'react';

export default function GearboxLoader() {
  return (
    <div className="gearbox-wrapper flex items-center justify-center my-6">
      <style jsx>{`
        @keyframes gear-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes gear-counter-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        .gearbox {
          background: #184176;
          height: 150px;
          width: 200px;
          position: relative;
          border: none;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0px 4px 20px rgba(24, 65, 118, 0.25), 0px 0px 0px 1px rgba(24, 65, 118, 0.4);
        }

        .gearbox .overlay {
          border-radius: 12px;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          box-shadow: inset 0px 0px 24px #0b1f3a;
          transition: background 0.2s;
          background: transparent;
        }

        .gear {
          position: absolute;
          height: 60px;
          width: 60px;
          box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.4), 0px 1px 0px 0px #0b1f3a;
          border-radius: 30px;
        }

        .gear.large {
          height: 120px;
          width: 120px;
          border-radius: 60px;
        }

        .gear.large:after {
          height: 96px;
          width: 96px;
          border-radius: 48px;
          margin-left: -48px;
          margin-top: -48px;
        }

        .gear.one {
          top: 12px;
          left: 10px;
        }

        .gear.two {
          top: 61px;
          left: 60px;
        }

        .gear.three {
          top: 110px;
          left: 10px;
        }

        .gear.four {
          top: 13px;
          left: 128px;
        }

        .gear:after {
          content: "";
          position: absolute;
          height: 36px;
          width: 36px;
          border-radius: 36px;
          background: #184176;
          top: 50%;
          left: 50%;
          margin-left: -18px;
          margin-top: -18px;
          z-index: 3;
          box-shadow: 0px 0px 10px rgba(245, 130, 30, 0.3), inset 0px 0px 8px rgba(0, 0, 0, 0.4), inset 0px 1.5px 0px 0px #0b1f3a, inset 0px -1px 0px 0px #f5821e;
        }

        .gear-inner {
          position: relative;
          height: 100%;
          width: 100%;
          background: #255899;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          will-change: transform;
          backface-visibility: hidden;
        }

        .large .gear-inner {
          border-radius: 60px;
        }

        .gear.one .gear-inner {
          animation: gear-counter-clockwise 3s infinite linear;
        }

        .gear.two .gear-inner {
          animation: gear-clockwise 3s infinite linear;
        }

        .gear.three .gear-inner {
          animation: gear-counter-clockwise 3s infinite linear;
        }

        .gear.four .gear-inner {
          animation: gear-counter-clockwise 6s infinite linear;
        }

        .gear-inner .bar {
          background: #316db7;
          height: 16px;
          width: 76px;
          position: absolute;
          left: 50%;
          margin-left: -38px;
          top: 50%;
          margin-top: -8px;
          border-radius: 2px;
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          border-right: 1px solid rgba(255, 255, 255, 0.3);
        }

        .large .gear-inner .bar {
          margin-left: -68px;
          width: 136px;
        }

        .gear-inner .bar:nth-child(2) {
          transform: rotate(60deg);
        }

        .gear-inner .bar:nth-child(3) {
          transform: rotate(120deg);
        }

        .gear-inner .bar:nth-child(4) {
          transform: rotate(90deg);
        }

        .gear-inner .bar:nth-child(5) {
          transform: rotate(30deg);
        }

        .gear-inner .bar:nth-child(6) {
          transform: rotate(150deg);
        }
      `}</style>
      <div className="gearbox shadow-md">
        <div className="overlay" />
        <div className="gear one">
          <div className="gear-inner">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
        <div className="gear two">
          <div className="gear-inner">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
        <div className="gear three">
          <div className="gear-inner">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
        <div className="gear four large">
          <div className="gear-inner">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
