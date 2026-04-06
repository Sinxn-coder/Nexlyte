import React from 'react';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-[var(--line)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#67ecff] to-[#a5ff78]" />
              <span className="text-lg font-bold tracking-tight">Nexlyte</span>
            </div>
            <p className="text-sm text-[#9aa3b2] max-w-xs">
              Next-generation cloud infrastructure and technology solutions for the modern dimension.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-[#9aa3b2]">
              <li><a href="#" className="hover:text-white">Cloud Connect</a></li>
              <li><a href="#" className="hover:text-white">Edge Compute</a></li>
              <li><a href="#" className="hover:text-white">Neural Net</a></li>
              <li><a href="#" className="hover:text-white">Shield OS</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-[#9aa3b2]">
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">API Reference</a></li>
              <li><a href="#" className="hover:text-white">Release Notes</a></li>
              <li><a href="#" className="hover:text-white">Support Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-[#9aa3b2]">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--line)] text-xs text-[#9aa3b2]">
          <p>© 2026 Nexlyte Technologies. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .col-span-1 { grid-column: span 1 / span 1; }
        .md\\:col-span-1 { @media (min-width: 768px) { grid-column: span 1 / span 1; } }
        .mb-16 { margin-bottom: 4rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .pt-8 { padding-top: 2rem; }
        .mt-4 { margin-top: 1rem; }
        .md\\:mt-0 { @media (min-width: 768px) { margin-top: 0; } }
      `}} />
    </footer>
  );
};

export default Footer;
