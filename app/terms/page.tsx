import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | ICATS-2026',
  description: 'Official terms and conditions of participation for the International Conference on Advanced Technology & Science (ICATS-2026).',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | ICATS-2026',
    description: 'Official terms and conditions of participation for the International Conference on Advanced Technology & Science (ICATS-2026).',
    type: 'website',
  }
};

export default function TermsPage() {
  return (
    <div className="py-28 px-6 max-w-4xl mx-auto min-h-screen relative text-slate-900 bg-slate-50">
      <header className="text-center mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-3">
          Official Agreement
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 mb-4">
          Terms & Conditions
        </h1>
        <div className="w-16 h-1 bg-amber-600 mx-auto" />
      </header>

      <div className="space-y-8 relative z-10 text-sm leading-relaxed text-slate-700">
        {/* Last Updated */}
        <div className="bg-white border border-slate-200 p-8 rounded shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">
            Last Updated: July 2026
          </div>
          <p>
            Welcome to the International Conference on Advanced Technology & Science (ICATS-2026). By registering and completing the payment checkout, you agree to comply with the terms of participation, university campus codes, and conference presenter protocols detailed below.
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white border border-slate-200 p-8 rounded shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              1. Registration & Entry Requirements
            </h2>
            <p className="text-xs text-slate-500">
              Participation in ICATS-2026 requires the completion of the registration form, payment of the registration fee (determined by category), and matching identification documents. Entry to presentation halls will be granted upon scanning the valid QR code pass issued after payment confirmation.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              2. Strict Code of Conduct
            </h2>
            <p className="text-xs text-slate-500">
              All attendees, presenters, and reviewers must adhere to professional research conduct and standard academic integrity. Any form of harassment, disruption of presentations, or unauthorized recording is strictly prohibited and will result in expulsion from the conference.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              3. Payments & Gateway Fees
            </h2>
            <p className="text-xs text-slate-500">
              Registration fees are completely non-refundable and non-transferable, as detailed in our Refund Policy. Standard transaction processing gateway charges are applicable during checkout. In the event of a duplicate transaction due to connection latency, our accounts desk will reconcile and refund the duplicate payment manually upon validation.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              4. Media Consent
            </h2>
            <p className="text-xs text-slate-500">
              By attending ICATS-2026, you consent to being photographed, videoed, or recorded during the panels, presentation tracks, or valedictory ceremonies. These materials may be used by JK Lakshmipat University for academic publication and promotional marketing on official websites.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              5. Limitation of Liability
            </h2>
            <p className="text-xs text-slate-500">
              The organizing committee, volunteers, and JK Lakshmipat University shall not be held liable for any loss, theft of personal belongings, presentation hardware failures, or injury sustained by participants during the conference program.
            </p>
          </div>
        </div>

        {/* Contact info footer box */}
        <div className="bg-white border border-slate-200 p-8 rounded shadow-sm text-center">
          <h3 className="text-lg font-bold text-slate-950 uppercase mb-2">
            Questions Regarding Terms?
          </h3>
          <p className="text-xs text-slate-500 mb-6 max-w-xl mx-auto">
            Please reach out to the university conference secretary for any questions or formal concerns regarding these guidelines.
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
