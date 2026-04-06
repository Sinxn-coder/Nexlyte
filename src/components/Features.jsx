import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Cpu, Cloud, Globe, Lock } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-8 hover:border-[var(--accent)] transition-all group"
  >
    <div className="w-12 h-12 rounded-lg bg-[rgba(103,236,255,0.1)] flex items-center justify-center mb-6 text-[var(--accent)] group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-[#9aa3b2] text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    { icon: Zap, title: "Hypersonic Speed", description: "Edge-computed nodes ensure sub-10ms latency for users globally, regardless of their location.", delay: 0.1 },
    { icon: Shield, title: "Quantum Shield", description: "Advanced DDoS protection and encryption patterns that adapt to emerging threats in real-time.", delay: 0.2 },
    { icon: Cpu, title: "Neural Logic", description: "Automated scaling and load balancing powered by proprietary AI that predicts traffic surges.", delay: 0.3 },
    { icon: Cloud, title: "Cloud Native", description: "Seamlessly integrate with any major cloud provider or deploy directly to our bare-metal edge.", delay: 0.4 },
    { icon: Globe, title: "Global Mesh", description: "A redundant global network of over 150 points of presence connected by fiber optics.", delay: 0.5 },
    { icon: Lock, title: "Zero Trust", description: "Identity-aware access control built into the core, ensuring total security for your data.", delay: 0.6 }
  ];

  return (
    <section id="features" className="py-32 bg-[rgba(5,6,14,0.5)]">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for <span className="gradient-text">Performance</span></h2>
          <p className="max-w-xl mx-auto text-[#9aa3b2]">
            Our infrastructure is built from the ground up to handle the most demanding workloads with absolute precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .py-32 { padding-top: 8rem; padding-bottom: 8rem; }
        .mb-20 { margin-bottom: 5rem; }
        .text-3xl { font-size: 1.875rem; }
        .md\\:text-5xl { @media (min-width: 768px) { font-size: 3rem; } }
        .lg\\:grid-cols-3 { @media (min-width: 1024px) { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .w-12 { width: 3rem; }
        .h-12 { height: 3rem; }
        .p-8 { padding: 2rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .rounded-lg { border-radius: 0.5rem; }
      `}} />
    </section>
  );
};

export default Features;
