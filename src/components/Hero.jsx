import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-40 overflow-hidden">
      {/* Static Mesh Grid */}
      <div className="mesh-grid" />
      
      {/* Static Glow Orbs */}
      <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-[#00f0ff] opacity-[0.02] blur-[120px] rounded-full" />
      <div className="absolute bottom-[20%] right-[30%] w-[500px] h-[500px] bg-[#00f0ff] opacity-[0.01] blur-[150px] rounded-full" />

      <div className="container relative z-10 text-center">
        <div>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] mb-10 overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#888888]">Dimension 01 Activated</span>
          </div>

          <h1 className="section-title mb-8">
            <span className="gradient-text">Architecting the</span><br />
            <span className="accent-text">Nexlyte</span> <span className="gradient-text">Protocol</span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#888888] text-lg md:text-xl font-medium leading-relaxed mb-14 px-4">
            The fundamental infrastructure for the next generation of digital existence. Synchronized, secure, and infinitely scalable technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="btn-premium">
              Initialize Protocol
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <Link to="/projects" className="btn-outline">
              System Architecture
            </Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .gap-3 { gap: 0.75rem; }
        .gap-6 { gap: 1.5rem; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .z-10 { z-index: 10; }
        .rounded-full { border-radius: 9999px; }
        .pt-32 { padding-top: 8rem; }
        .pb-40 { padding-bottom: 10rem; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-14 { margin-bottom: 3.5rem; }
        .text-lg { font-size: 1.125rem; }
        .md\\:text-xl { @media (min-width: 768px) { font-size: 1.25rem; } }
        .leading-relaxed { line-height: 1.625; }
        @media (min-width: 640px) { .sm\\:flex-row { flex-direction: row; } }
      `}} />
    </section>
  );
};

export default Hero;
