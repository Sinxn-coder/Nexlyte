import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Smartphone, Zap, X, ExternalLink, ShoppingCart } from 'lucide-react';
import ShoeStoreMobile from './ShoeStoreMobile';
import FitnessAppMobile from './FitnessAppMobile';

/* ─── Project Data ─────────────────────────────────── */
const projects = [
  {
    id: 1,
    number: '01',
    category: 'E-Commerce App',
    Icon: ShoppingCart,
    color: '#fbcb15',
    gradient: 'linear-gradient(135deg, rgba(251,203,21,.15) 0%, rgba(251,203,21,.03) 100%)',
    border: 'rgba(251,203,21,.25)',
    title: 'Sneakr Store',
    subtitle: 'Mobile App Prototype',
    description:
      'A high-performance interactive e-commerce prototype for a footwear brand with a custom bright/dark UI, specialized for mobile layouts.',
    tags: ['React', 'Prototype', 'Shoe Store'],
    year: '2026',
    action: 'prototype'
  },
  {
    id: 2,
    number: '02',
    category: 'Mobile App',
    Icon: Smartphone,
    color: '#927cf5',
    gradient: 'linear-gradient(135deg, rgba(146,124,245,.15) 0%, rgba(146,124,245,.03) 100%)',
    border: 'rgba(146,124,245,.25)',
    title: 'Pilates Pro',
    subtitle: 'Fitness Mobile App Prototype',
    description:
      'A premium mobile fitness application prototype with interactive workout timers, animated course details, and a high-conversion, airy user interface.',
    tags: ['React', 'Health Tech', 'Framer Motion'],
    year: '2026',
    action: 'prototype'
  },
  {
    id: 3,
    number: '03',
    category: 'Dashboard',
    Icon: Zap,
    color: '#e0e0e0',
    gradient: 'linear-gradient(135deg, rgba(224,224,224,.1) 0%, rgba(224,224,224,.02) 100%)',
    border: 'rgba(224,224,224,.2)',
    title: 'StoreCommand',
    subtitle: 'E-commerce Admin System',
    description:
      'A full-featured internal dashboard for an e-commerce brand. Live order queue, inventory monitoring, customer analytics, campaign tracking — all in one control layer.',
    tags: ['Admin Panel', 'Data Viz', 'SaaS'],
    year: '2025',
    live: '#'
  }
];

/* ─── Card ─────────────────────────────────────────── */
function ProjectCard({ p, onOpen, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(p)}
      style={{
        position: 'relative',
        padding: '1.8rem',
        borderRadius: '24px',
        background: p.gradient,
        border: `1px solid ${p.border}`,
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      {/* top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: p.color, marginBottom: '4px' }}>
            {p.number} · {p.category}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,.35)' }}>{p.year}</div>
        </div>
        <div style={{
          width: '44px', height: '44px', borderRadius: '14px',
          background: `${p.color}15`, border: `1px solid ${p.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: p.color
        }}>
          <p.Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      {/* title */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.4rem', color: '#fff' }}>
        {p.title}
      </h3>
      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,.45)', fontWeight: 600, marginBottom: '1.1rem' }}>
        {p.subtitle}
      </div>

      {/* tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.4rem' }}>
        {p.tags.map(t => (
          <span key={t} style={{
            fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em',
            color: p.color, padding: '4px 9px', background: `${p.color}12`, borderRadius: '6px'
          }}>{t}</span>
        ))}
      </div>

      {/* footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: p.color }}>View project</span>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: `${p.color}18`, border: `1px solid ${p.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: p.color
        }}>
          <ArrowRight size={15} strokeWidth={2.5} />
        </div>
      </div>

      {/* subtle glow corner */}
      <div style={{
        position: 'absolute', bottom: '-30px', right: '-30px',
        width: '100px', height: '100px', borderRadius: '50%',
        background: `radial-gradient(circle, ${p.color}20 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
}

/* ─── Detail Modal ──────────────────────────────────── */
function ProjectModal({ p, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'flex-end', padding: '1rem'
      }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', borderRadius: '28px',
          background: 'rgba(12,12,15,.98)',
          border: `1px solid ${p.border}`,
          overflowY: 'auto',
          maxHeight: '90vh'
        }}
      >
        {/* colored accent top */}
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

        <div style={{ padding: '2rem' }}>
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${p.color}15`, border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>
                <p.Icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.18em', color: p.color }}>{p.number} · {p.category}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{p.title}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,.06)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.5)', cursor: 'pointer' }}>
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* description */}
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,.62)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            {p.description}
          </p>

          {/* tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {p.tags.map(t => (
              <span key={t} style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: p.color, padding: '5px 10px', background: `${p.color}12`, borderRadius: '6px' }}>{t}</span>
            ))}
          </div>

          {/* actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Link to="/contact" onClick={onClose} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '0.95rem', borderRadius: '999px',
              background: p.color === '#e0e0e0' ? '#fff' : p.color,
              color: '#000', fontSize: '12px', fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
              Build Similar
            </Link>
            <button onClick={onClose} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.95rem', borderRadius: '999px',
              background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)',
              color: 'rgba(255,255,255,.6)', fontSize: '12px', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit'
            }}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────── */
export default function MobileProjects() {
  const [openProject, setOpenProject] = useState(null);
  const [activePrototype, setActivePrototype] = useState(null);

  const handleOpen = (p) => {
    if (p.action === 'prototype') {
      setActivePrototype(p.id);
    } else {
      setOpenProject(p);
    }
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100dvh', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{ padding: '8rem 1.5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        {/* blobs */}
        <div style={{ position: 'absolute', top: '-5%', right: '-25%', width: '260px', height: '260px', background: 'radial-gradient(circle, rgba(0,240,255,.13) 0%, transparent 70%)', filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '-20%', width: '240px', height: '240px', background: 'radial-gradient(circle, rgba(157,0,255,.11) 0%, transparent 70%)', filter: 'blur(55px)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            style={{ marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,.4)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none' }}>
              <ArrowLeft size={14} strokeWidth={2.5} /> Home
            </Link>
          </motion.div>

          {/* badge */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', marginBottom: '1.4rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,.55)' }}>Selected Works</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 12vw, 3.8rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.06em', marginBottom: '1rem' }}>
            Projects<br />
            <span style={{ color: 'var(--accent)' }}>we built.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '300px' }}>
            A curated look at websites, apps, and systems we've delivered for our clients.
          </motion.p>
        </div>
      </section>

      {/* ── PROJECT CARDS ── */}
      <section style={{ padding: '0 1.5rem 3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} onOpen={handleOpen} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '1rem 1.5rem 6rem' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ padding: '2rem 1.5rem', borderRadius: '24px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '0.8rem' }}>Next?</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.7rem' }}>
            Ready to be our next project?
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            Let's build something you'll be proud to show.
          </p>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '1rem 2rem', borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
            color: '#000', fontSize: '12px', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '0.1em'
          }}>
            Start a project <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </section>

      {/* footer */}
      <footer style={{ padding: '2.5rem 1.5rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Nexlyte Studio
        </div>
      </footer>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {openProject && <ProjectModal p={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {activePrototype === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <ShoeStoreMobile onExit={() => setActivePrototype(null)} />
          </motion.div>
        )}
        {activePrototype === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <FitnessAppMobile onExit={() => setActivePrototype(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
