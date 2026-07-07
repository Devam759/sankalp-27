import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Call for Papers', href: '#call-for-papers' },
    { name: 'Committee', href: '#committee' },
    { name: 'Registration', href: '#registration' },
    { name: 'Publication', href: '#publication' },
    { name: 'Venue', href: '#venue' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8 border-t-4 border-brand-orange">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-extrabold text-white mb-4">SANKALP '27</h2>
            <p className="text-brand-cloud/80 max-w-md leading-relaxed mb-6 text-sm">
              International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction.
              Hosted by Institute of Engineering & Technology (IET), JK Lakshmipat University, Jaipur.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-brand-orange font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-brand-cloud/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="text-brand-orange font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors" aria-label="LinkedIn">
                <span className="font-bold">in</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors" aria-label="Instagram">
                <span className="font-bold">ig</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors" aria-label="X (Twitter)">
                <span className="font-bold">x</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors" aria-label="Facebook">
                <span className="font-bold">fb</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-sm text-brand-cloud/50 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} JKLU-SANKALP Conference | JK Lakshmipat University. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Academic Excellence</p>
        </div>
      </div>
    </footer>
  );
}
