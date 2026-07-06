import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | ICATS-2026',
  description: 'Official privacy policy for the International Conference on Advanced Technology & Science (ICATS-2026).',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | ICATS-2026',
    description: 'Official privacy policy for the International Conference on Advanced Technology & Science (ICATS-2026).',
    type: 'website',
  }
};

export default function PrivacyPage() {
  return (
    <div className="py-28 px-6 max-w-4xl mx-auto min-h-screen relative text-slate-900 bg-slate-50">
      <header className="text-center mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-3">
          Security & Privacy
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 mb-4">
          Privacy Policy
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
            At ICATS-2026 and JK Lakshmipat University, we value your privacy and are committed to protecting your personal information. This Privacy Policy details how we collect, store, process, and safeguard your data during the registration and participation process.
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white border border-slate-200 p-8 rounded shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              1. Information We Collect
            </h2>
            <p className="text-xs text-slate-500">
              During registration, we collect participant details including your name, email address, mobile number, academic or industry affiliation (institution name), country, paper details (Paper ID and Paper Title, if presenting), pincode, city, state, and payment transaction logs.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              2. How We Use Your Data
            </h2>
            <p className="text-xs text-slate-500">
              We process this data solely to manage your conference registration, verify payment status, generate QR-code check-in passes, issue registration receipts, send schedule updates, compile the conference directory, and maintain campus entry security records.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              3. Payment Security
            </h2>
            <p className="text-xs text-slate-500">
              Financial transactions are processed securely through our integrated payment gateway (Cashfree Payments). We do not record or retain card credentials, bank login details, or UPI pins on our servers. Transaction reference IDs are kept for audit reconciliation.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              4. Data Sharing & Third-Parties
            </h2>
            <p className="text-xs text-slate-500">
              We do not sell, rent, or distribute participant data to advertising platforms or third-party marketing entities. Access is strictly limited to authorized administrative staff and organizing committee members for operational purposes.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950 uppercase mb-2">
              5. Participant Rights
            </h2>
            <p className="text-xs text-slate-500">
              Participants have the right to request access to their registered records or rectify any submission errors by contacting the organizing team with valid identity credentials before the registration closing deadline.
            </p>
          </div>
        </div>

        {/* Contact info footer box */}
        <div className="bg-white border border-slate-200 p-8 rounded shadow-sm text-center">
          <h3 className="text-lg font-bold text-slate-950 uppercase mb-2">
            Need Privacy Clarification?
          </h3>
          <p className="text-xs text-slate-500 mb-6 max-w-xl mx-auto">
            For data inquiries, request reviews, or policy clarifications, please reach out to the university tech support desk.
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
