'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function TermsAndConditions() {
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
            Terms & Conditions
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
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm md:text-base">
              Welcome to the official website of SANKALP 2027 (International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction), hosted by the Institute of Engineering & Technology (IET), JK Lakshmipat University, Jaipur. By accessing our website (<a href="https://sankalp.jklu.edu.in" className="text-brand-orange hover:underline font-semibold">sankalp.jklu.edu.in</a>), registering for the conference, or using any related services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use this site or services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">2. Scope of Services</h2>
            <p className="text-sm md:text-base">
              SANKALP 2027 is an academic and professional conference focusing on advancements in Sustainable AI, Data Science, Generative AI, High Performance Computing, and related technologies. Services provided include registration processing, paper submission evaluation, keynote session access, and related event management.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">3. Registration and Fees</h2>
            <p className="text-sm md:text-base mb-3">
              To participate in SANKALP 2027, users must complete the registration form and pay the relevant registration fees.
            </p>
            <ul className="list-disc pl-6 text-sm md:text-base space-y-2">
              <li><strong>Fee Structure:</strong> Registration fees are defined according to participant categories (e.g., student, academician, industry presenter, delegate). The current fees are detailed on our registration page.</li>
              <li><strong>Payment Processing:</strong> All payments are processed securely through our third-party payment gateway partner, <strong>Cashfree Payments</strong>. Registration is only confirmed once the transaction status is reported as successful by the gateway and verified by our system.</li>
              <li><strong>Accurate Details:</strong> You agree to provide accurate, complete, and current information during the registration and billing process.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">4. Paper Submission & Academic Conduct</h2>
            <p className="text-sm md:text-base mb-3">
              Authors submitting papers to SANKALP 2027 must adhere to professional academic standards:
            </p>
            <ul className="list-disc pl-6 text-sm md:text-base space-y-2">
              <li><strong>Originality & Plagiarism:</strong> All submissions must consist of original research and must not be under review elsewhere. Plagiarism of any form is strictly prohibited. Submissions found violating these rules will be rejected immediately without refund.</li>
              <li><strong>Review Process:</strong> All submitted papers undergo a double-blind peer-review process. The decisions of the Program Committee regarding acceptance or rejection are final.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">5. Intellectual Property Rights</h2>
            <p className="text-sm md:text-base">
              All website content, design, trademarks, and logos are the property of SANKALP 2027 / JK Lakshmipat University. Authors of accepted papers retain the copyright of their work but grant the conference organizers the license to publish their papers in the conference proceedings and submit them to indexing databases.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">6. Code of Conduct</h2>
            <p className="text-sm md:text-base">
              All attendees, presenters, and partners of SANKALP 2027 are expected to maintain professional behavior, scientific integrity, and respect for all other participants. Any form of harassment, disruption of sessions, or inappropriate conduct will lead to removal from the event without refund.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">7. Disclaimers and Limitation of Liability</h2>
            <p className="text-sm md:text-base">
              SANKALP 2027 and JK Lakshmipat University make no warranties regarding the uninterrupted availability of the registration portal or third-party payment services. In no event shall we be liable for any direct, indirect, incidental, or consequential damages resulting from transaction failures, network issues, or website downtime. Our maximum liability is limited to the registration fee paid by you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">8. Governing Law and Jurisdiction</h2>
            <p className="text-sm md:text-base">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with the conference or registrations shall be subject to the exclusive jurisdiction of the courts of Jaipur, Rajasthan, India.
            </p>
          </div>

          <div className="border-t border-slate-300 pt-8 mt-8">
            <h2 className="text-xl font-serif font-bold text-brand-blue mb-3">9. Contact Information</h2>
            <p className="text-sm md:text-base">
              For queries or clarifications regarding these Terms & Conditions, please contact us:
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
