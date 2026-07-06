import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Refund & Cancellation Policy | ICATS-2026',
  description: 'Official refund and cancellation policy for the International Conference on Advanced Technology & Science (ICATS-2026).',
  alternates: {
    canonical: '/refund',
  },
  openGraph: {
    title: 'Refund & Cancellation Policy | ICATS-2026',
    description: 'Official refund and cancellation policy for the International Conference on Advanced Technology & Science (ICATS-2026).',
    type: 'website',
  }
};

export default function RefundPage() {
  return (
    <div className="py-28 px-6 max-w-4xl mx-auto min-h-screen relative text-slate-900 bg-slate-50">
      <header className="text-center mb-16 relative z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 mb-4">
          Refund & Cancellation Policy
        </h1>
        <div className="w-16 h-1 bg-amber-600 mx-auto" />
      </header>

      <div className="space-y-8 relative z-10 text-sm leading-relaxed text-slate-700">
        {/* Core Notice Box */}
        <div className="bg-white border border-slate-200 p-8 rounded shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            Important Notice
          </span>
          <h2 className="text-lg font-bold text-slate-950 uppercase mb-3">
            Strict Non-Refundable Fee Policy
          </h2>
          <p>
            To facilitate the early reservation of keynote sessions, proceeding publication schedules, venue management, and catering logistics, a strict financial policy is enforced for all registrations for the International Conference on Advanced Technology & Science (ICATS-2026).
          </p>
        </div>

        {/* Detailed Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm">
            <h3 className="text-base font-bold text-slate-950 uppercase mb-2">
              1. Registration Fees
            </h3>
            <p className="text-xs text-slate-500">
              Registration fees vary according to the selected participant category (Student, Scholar, Academician, Industry, or Foreign Delegate). All prices are in Indian Rupees (INR) and are paid securely through our checkout system. Transaction processing fees are non-refundable.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm">
            <h3 className="text-base font-bold text-slate-950 uppercase mb-2">
              2. Non-Refundable Policy
            </h3>
            <p className="text-xs text-slate-500">
              Once registration and payment are completed, the fees are 100% non-refundable. Under no circumstances—including paper withdrawal, travel complications, visa rejection, schedule conflicts, or non-attendance—will a refund request be approved.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm">
            <h3 className="text-base font-bold text-slate-950 uppercase mb-2">
              3. Cancellation Terms
            </h3>
            <p className="text-xs text-slate-500">
              Registrants who wish to cancel their presentation or attendance must notify the organizing committee in writing. However, cancellation of registration will not entitle the registrant to any refund or credit for future conferences.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm">
            <h3 className="text-base font-bold text-slate-950 uppercase mb-2">
              4. Registration Transfer
            </h3>
            <p className="text-xs text-slate-500">
              Registrations are tied strictly to the specified paper author or attendee. Under exceptional circumstances, author substitution may be requested in writing before the camera-ready deadline, subject to the approval of the General Chair.
            </p>
          </div>
        </div>

        {/* Technical Support Box */}
        <div className="bg-white border border-slate-200 p-8 rounded shadow-sm text-center">
          <h3 className="text-lg font-bold text-slate-950 uppercase mb-2">
            Questions Regarding Registration?
          </h3>
          <p className="text-xs text-slate-500 mb-6 max-w-xl mx-auto">
            If you experienced an accidental duplicate billing transaction during checkout or encountered a payment gateway error, please reach out to the finance team for immediate reconciliation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase px-6 py-3 rounded transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
