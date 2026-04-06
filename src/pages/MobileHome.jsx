import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Zap, ChevronDown, ArrowRight } from 'lucide-react';

const services = [
  {
    id: '01', Icon: Globe,      color: '#00f0ff',
    title: 'Digital Architecture',
    tag: 'Websites & E-commerce',
    steps: ['Strategic brand mapping', 'High-end UI design', 'Speed & SEO engineering', 'Launch & scale support']
  },
  {
    id: '02', Icon: Smartphone, color: '#9d00ff',
    title: 'Experience Design',
    tag: 'Mobile & Web Apps',
    steps: ['User research & analysis', 'Interactive prototypes', 'App engineering', 'QA & polished delivery']
  },
  {
    id: '03', Icon: Zap,        color: '#e0e0e0',
    title: 'System Intelligence',
    tag: 'Dashboards & Tools',
    steps: ['Data architecture', 'API integration', 'Security & access', 'Team enablement']
  }
];

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '100%', label: 'Custom' },
  { value: '24h', label: 'Response' }
];

export default function MobileHome() {
  const [openService, setOpenService] = useState(null);

  return (
    <div style={{
      background: 'var(--bg)', color: 'var(--text)',
      minHeight: '100dvh', overflowX: 'hidden',
      fontFamily: 'inherit'
    }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100dvh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '7rem 1.5rem 3rem',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* blobs */}
        <div style={{ position: 'absolute', top: '-5%', right: '-20%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(0,240,255,.2) 0%, transparent 70%)', filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-20%', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(157,0,255,.15) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', marginBottom: '1.8rem' }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,.55)' }}>Nexlyte Studio</span>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(3rem, 14vw, 4.5rem)', fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.06em', marginBottom: '1.6rem' }}
          >
            We Build<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,.25)' }}>What&apos;s</span><br />
            <span style={{ color: 'var(--accent)' }}>Next.</span>
          </motion.h1>

          {/* sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '320px' }}
          >
            Elite websites, mobile apps, and digital systems for forward-thinking brands.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
          >
            <Link to="/contact" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '1.1rem 2rem', borderRadius: '999px',
              background: 'var(--accent)', color: '#000',
              fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
              Start a project <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link to="/projects" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.1rem 2rem', borderRadius: '999px',
              background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)',
              color: '#fff', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
              View Work
            </Link>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', marginTop: '3.5rem', background: 'rgba(255,255,255,.06)', borderRadius: '20px', overflow: 'hidden', position: 'relative', zIndex: 1 }}
        >
          {stats.map((s) => (
            <div key={s.value} style={{ padding: '1.2rem 0.5rem', textAlign: 'center', background: 'rgba(255,255,255,.03)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em' }}>{s.value}</div>
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,.4)', marginTop: '3px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '4rem 1.5rem 3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '0.6rem' }}>What We Do</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            Specialized services for your brand.
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {services.map((s, i) => {
            const isOpen = openService === s.id;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              >
                {/* card header */}
                <button
                  onClick={() => setOpenService(isOpen ? null : s.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.3rem 1.4rem', borderRadius: isOpen ? '20px 20px 0 0' : '20px',
                    background: isOpen ? `${s.color}12` : 'rgba(255,255,255,.04)',
                    border: `1px solid ${isOpen ? s.color + '44' : 'rgba(255,255,255,.08)'}`,
                    borderBottom: isOpen ? 'none' : undefined,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${s.color}18`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                    <s.Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: s.color, marginBottom: '2px' }}>{s.id}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{s.title}</div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} color="rgba(255,255,255,.4)" strokeWidth={2} />
                  </motion.div>
                </button>

                {/* expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '1.4rem', background: `${s.color}08`, border: `1px solid ${s.color}33`, borderTop: 'none', borderRadius: '0 0 20px 20px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,.35)', marginBottom: '1rem' }}>The Roadmap</div>
                        <div style={{ display: 'grid', gap: '0.7rem' }}>
                          {s.steps.map((step, idx) => (
                            <div key={step} style={{ display: 'flex', gap: '0.9rem', alignItems: 'center' }}>
                              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: `${s.color}20`, border: `1px solid ${s.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, color: s.color, flexShrink: 0 }}>
                                {String(idx + 1).padStart(2, '0')}
                              </div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,.75)' }}>{step}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: s.color, padding: '5px 10px', background: `${s.color}18`, borderRadius: '6px' }}>
                            {s.tag}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '3rem 1.5rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(0,240,255,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1, padding: '2.5rem 1.8rem', borderRadius: '28px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', textAlign: 'center' }}
        >
          <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '1rem' }}>Ready?</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1rem' }}>
            Let&apos;s build something <span style={{ color: 'var(--accent-purple)' }}>great.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '2rem' }}>
            Website, app or internal tool — we're ready when you are.
          </p>
          <Link to="/contact" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '1.1rem 2rem', borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
            color: '#000', fontSize: '13px', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.1em'
          }}>
            Contact Us <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </section>

      {/* footer */}
      <footer style={{ padding: '2.5rem 1.5rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Nexlyte Studio
        </div>
      </footer>
    </div>
  );
}
