import React from 'react';

const BentoCard = ({ title, subtitle, content, size = "small" }) => (
  <div
    className={`bento-card ${size === "large" ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
  >
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="text-[10px] uppercase font-black tracking-[0.3em] text-[#00f0ff] mb-4">{subtitle}</div>
        <h3 className="text-2xl font-bold mb-4 leading-none">{title}</h3>
      </div>
      <div className="text-sm text-[#888888] leading-relaxed font-medium">
        {content}
      </div>
    </div>
  </div>
);

const BentoShowcase = () => {
  return (
    <section className="py-40 bg-[#030303] border-t border-[rgba(255,255,255,0.03)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          <BentoCard 
            size="large"
            subtitle="Core Architecture"
            title="Symmetric Synchronization"
            content="Our proprietary protocol ensures absolute data integrity across all nodes in the mesh network. Real-time consensus with zero overhead."
          />
          <BentoCard 
            subtitle="Performance"
            title="Sub-Zero Latency"
            content="Built for high-frequency interactions where every nanosecond defines the outcome."
          />
          <BentoCard 
            subtitle="Security"
            title="Quantum Encrypted"
            content="Elliptic-curve cryptography shielding your vision from emerging threats."
          />
          <BentoCard 
            subtitle="Scale"
            title="Universal Mesh"
            content="Deploy once, scale everywhere. A global fabric of connectivity."
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .md\\:grid-cols-3 { @media (min-width: 768px) { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .gap-6 { gap: 1.5rem; }
        .auto-rows-\\[280px\\] { grid-auto-rows: 280px; }
        .col-span-1 { grid-column: span 1 / span 1; }
        .col-span-2 { @media (min-width: 768px) { grid-column: span 2 / span 2; } }
        .row-span-1 { grid-row: span 1 / span 1; }
        .row-span-2 { @media (min-width: 768px) { grid-row: span 2 / span 2; } }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .h-full { height: 100%; }
        .justify-between { justify-content: space-between; }
        .py-40 { padding-top: 10rem; padding-bottom: 10rem; }
        .mb-4 { margin-bottom: 1rem; }
        .leading-none { line-height: 1; }
        .leading-relaxed { line-height: 1.625; }
      `}} />
    </section>
  );
};

export default BentoShowcase;
