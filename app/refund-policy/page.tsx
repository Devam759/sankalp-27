'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans pt-24 flex flex-col selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* Header Section */}
      <section className="py-12 md:py-16 px-6 bg-brand-cloud border-b border-slate-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-brand-orange"></div>
            <span className="text-brand-blue font-bold tracking-[0.2em] uppercase text-xs">
              Legal & Policies
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Last Updated: July 9, 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 flex-grow bg-brand-cloud">
        <div className="max-w-4xl mx-auto text-slate-700 font-sans leading-relaxed space-y-8">
          
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">1. General Registration Policy</h2>
            <p className="text-sm md:text-base">
              SANKALP 2027 is a professional scientific and academic event. Due to administrative arrangements, publication commitments, and scheduling setup associated with conference registrations, <strong>all registration fees paid are non-refundable and non-cancellable</strong> under standard conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">2. Exception: Duplicate Transactions</h2>
            <p className="text-sm md:text-base mb-3">
              We understand that technical glitches or gateway issues may occasionally result in duplicate payments. We will issue refunds only in the following scenario:
            </p>
            <ul className="list-disc pl-6 text-sm md:text-base space-y-2">
              <li><strong>Duplicate Charges:</strong> If a participant is charged twice for the same registration due to a network error or checkout glitch, the extra amount will be refunded.</li>
              <li><strong>Claim Window:</strong> The refund claim must be submitted to the organizing committee within <strong>7 days</strong> of the transaction.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">3. Refund Request Procedure</h2>
            <p className="text-sm md:text-base mb-3">
              To request a refund for a duplicate transaction, please follow these steps:
            </p>
            <ol className="list-decimal pl-6 text-sm md:text-base space-y-2">
              <li>Send an email to <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange hover:underline font-semibold">sankalp@jklu.edu.in</a> with the subject line <strong>"Refund Request - [Your Name] - [Transaction ID]"</strong>.</li>
              <li>Attach clear evidence of the duplicate charge, such as payment gateway receipts, transaction screenshots, or bank/card statements showing both debits.</li>
              <li>Provide the registration category, paper ID (if applicable), and contact details.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">4. Processing and Timelines</h2>
            <p className="text-sm md:text-base">
              Once we receive your refund request, the details will be verified by our administrative and accounts team. If approved, the refund will be initiated through our payment gateway, <strong>Cashfree Payments</strong>, back to the original source of payment (bank account, credit/debit card, or UPI id). Verified refunds typically take <strong>10 to 15 working days</strong> to reflect in your account, depending on your bank's policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">5. Registration Re-categorization</h2>
            <p className="text-sm md:text-base">
              If you have registered under an incorrect participant category, refunds will not be provided for the difference in price. If you need to upgrade your registration (e.g., from delegate to presenter), please contact the organizing committee at <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange hover:underline">sankalp@jklu.edu.in</a> to pay the additional differential fee.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">6. Cancellation or Rescheduling of the Conference</h2>
            <p className="text-sm md:text-base">
              In the highly unlikely event that SANKALP 2027 is completely cancelled or postponed due to force majeure (acts of God, government regulations, disasters, civil unrest, or similar unavoidable circumstances), the organizing committee will communicate the alternative arrangements. Any refund decisions under such extreme circumstances will be made at the sole discretion of JK Lakshmipat University.
            </p>
          </div>

          <div className="border-t border-slate-300 pt-8 mt-8">
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">7. Contact Information</h2>
            <p className="text-sm md:text-base">
              For any refund or cancellation queries, please contact the organizing committee:
            </p>
            <div className="mt-4 p-4 border-2 border-brand-ink/10 bg-white/50 text-sm font-mono space-y-1">
              <p className="font-sans font-bold text-brand-ink">SANKALP 2027 Organizing Committee</p>
              <p>Institute of Engineering & Technology (IET)</p>
              <p>JK Lakshmipat University</p>
              <p>Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India</p>
              <p><strong>Email:</strong> <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange hover:underline">sankalp@jklu.edu.in</a></p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
