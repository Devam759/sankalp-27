'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function ShippingPolicy() {
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
            Shipping & Delivery Policy
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
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">1. Nature of Services</h2>
            <p className="text-sm md:text-base">
              SANKALP 2027 is an international academic conference hosted by JK Lakshmipat University, Jaipur. All registrations, paper submissions, conference passes, and presentation slots are <strong>digital services and event entry permissions</strong>. 
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">2. Physical Shipping Not Applicable</h2>
            <p className="text-sm md:text-base border-l-2 border-brand-orange/30 pl-4 bg-slate-100/50 py-2">
              <strong>No physical products, goods, or merchandise will be shipped</strong> to your address in connection with registration or ticket purchases. Consequently, shipping charges, shipping agents, and physical delivery timelines do not apply.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">3. Digital Delivery of Passes & Receipts</h2>
            <p className="text-sm md:text-base mb-3">
              All credentials and documents related to your registration are delivered electronically:
            </p>
            <ul className="list-disc pl-6 text-sm md:text-base space-y-2">
              <li><strong>Payment Receipt & Invoice:</strong> Generated and sent immediately to your registered email address upon successful transaction authorization by our payment gateway, <strong>Cashfree Payments</strong>.</li>
              <li><strong>Registration Confirmation:</strong> A formal registration confirmation letter or ticket pass with your registration details will be sent via email shortly after payment verification.</li>
              <li><strong>Event Schedule & Joining Details:</strong> Detailed schedules, session links (for online participants), and venue details (for offline participants) will be sent via email in the weeks leading up to the conference.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">4. Delivery of Certificates & Publications</h2>
            <p className="text-sm md:text-base mb-3">
              Academic materials and certificates are delivered as follows:
            </p>
            <ul className="list-disc pl-6 text-sm md:text-base space-y-2">
              <li><strong>Participation & Presentation Certificates:</strong> Certificates will be distributed physically at the conference registration desk in Jaipur for offline participants, or sent digitally as secure PDFs to the registered email within 10-15 working days after the conclusion of the event for online participants.</li>
              <li><strong>Conference Proceedings & Publications:</strong> Digital proceedings or access links to publisher platforms will be emailed to authors once they are published.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">5. Delays or Non-receipt of Emails</h2>
            <p className="text-sm md:text-base">
              If you do not receive your payment receipt or confirmation email within 24 hours of a successful transaction, please verify your spam/junk folder. If it is still missing, please contact the organizing committee at <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange hover:underline">sankalp@jklu.edu.in</a> with your transaction details (amount, date, email, phone) so we can manually verify and re-issue your credentials.
            </p>
          </div>

          <div className="border-t border-slate-300 pt-8 mt-8">
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">6. Contact Information</h2>
            <p className="text-sm md:text-base">
              For any queries regarding digital delivery or credentials, please contact the organizing committee:
            </p>
            <div className="mt-4 p-4 border-2 border-brand-ink/10 bg-white/50 text-sm font-mono space-y-1">
              <p className="font-sans font-bold text-brand-ink">SANKALP 2027 Organizing Committee</p>
              <p>Institute of Engineering & Technology (IET)</p>
              <p>JK Lakshmipat University</p>
              <p>Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India</p>
              <p><strong>Email:</strong> <a href="mailto:sankalp@jklu.edu.in" className="text-brand-orange hover:underline">sankalp@jklu.edu.in</a></p>
              <p><strong>Phone:</strong> +91 141 7107500</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
