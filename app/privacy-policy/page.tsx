'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function PrivacyPolicy() {
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
            Privacy Policy
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
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">1. Introduction</h2>
            <p className="text-sm md:text-base">
              At SANKALP 2027 (International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction), hosted by the Institute of Engineering & Technology (IET), JK Lakshmipat University, Jaipur, we are committed to protecting the privacy and security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (<a href="https://sankalp.jklu.edu.in" className="text-brand-orange hover:underline font-semibold">sankalp.jklu.edu.in</a>), register for the conference, or submit academic papers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">2. Information We Collect</h2>
            <p className="text-sm md:text-base mb-3">
              We collect information that you voluntarily provide to us when registering for the conference, submitting papers, or contacting us. This includes:
            </p>
            <ul className="list-disc pl-6 text-sm md:text-base space-y-2">
              <li><strong>Personal Identification Details:</strong> Full name, email address, contact phone number, designation, and institutional/organization affiliation.</li>
              <li><strong>Academic & Submission Information:</strong> Paper ID, paper title, co-author details, and submission files.</li>
              <li><strong>Transaction Data:</strong> Registration category, billing address, transaction amount, payment reference ID, and payment status.</li>
            </ul>
            <p className="text-sm md:text-base mt-3 border-l-2 border-brand-orange/30 pl-4 bg-slate-100/50 py-2">
              <strong>Note on Payment Information:</strong> We do not store or process sensitive payment credentials (such as credit/debit card numbers, CVV, or net banking passwords) on our servers. All financial transactions are processed securely through our verified payment gateway partner, <strong>Cashfree Payments</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">3. How We Use Your Information</h2>
            <p className="text-sm md:text-base mb-3">
              We use the collected information for the following professional and administrative purposes:
            </p>
            <ul className="list-disc pl-6 text-sm md:text-base space-y-2">
              <li>To process and manage your conference registration and payment verification.</li>
              <li>To evaluate, review, and coordinate paper submissions with the program committee.</li>
              <li>To send essential conference communication, schedule updates, and notifications.</li>
              <li>To issue invitation letters, registration passes, participation certificates, and payment invoices.</li>
              <li>To comply with regulatory obligations and prevent fraudulent activity.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">4. Cookies and Tracking Technologies</h2>
            <p className="text-sm md:text-base">
              Our website uses cookies and similar tracking tools to optimize site functionality, maintain login session states, and monitor traffic patterns. You can choose to disable cookies through your browser settings, though some features of the site may not function properly as a result.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">5. Sharing and Disclosure of Information</h2>
            <p className="text-sm md:text-base mb-3">
              We do not sell, rent, or trade your personal data. We may share data with trusted third parties under the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-sm md:text-base space-y-2">
              <li><strong>Service Providers:</strong> Secure cloud hosting (Firebase), email delivery services, and payment gateway providers (Cashfree Payments) solely to perform services on our behalf.</li>
              <li><strong>Academic Publishers:</strong> Review and publication partners (such as designated journals or proceedings publishers) for papers accepted for presentation.</li>
              <li><strong>Legal Compliance:</strong> When required by law or to protect the safety, rights, or security of JK Lakshmipat University, participants, or the public.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">6. Data Security</h2>
            <p className="text-sm md:text-base">
              We implement industry-standard administrative, technical, and physical security measures to safeguard your personal data from unauthorized access, loss, misuse, or alteration. However, please note that no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">7. Data Retention</h2>
            <p className="text-sm md:text-base">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, including conference coordination, academic archiving, auditing, and legal requirements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">8. Your Rights</h2>
            <p className="text-sm md:text-base">
              You have the right to request access to, correction of, or deletion of your personal information collected by the conference. To exercise these rights, please contact the organizing committee using the contact details provided below.
            </p>
          </div>

          <div className="border-t border-slate-300 pt-8 mt-8">
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">9. Contact Us</h2>
            <p className="text-sm md:text-base">
              For any questions, concerns, or requests regarding this Privacy Policy, please contact the organizing committee:
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
