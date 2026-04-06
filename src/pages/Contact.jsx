import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageCircle, ArrowRight, Globe, Smartphone, Zap, CheckCircle, Send } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';
import MobileContact from './MobileContact';

/* ─── contact channels ──────────────────────────────── */
const channels = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'nexlytestudio@gmail.com',
    sub: 'Drop us a message — we reply within 24 hours.',
    href: 'mailto:nexlytestudio@gmail.com',
    color: '#00f0ff',
    cta: 'Send Email'
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+91 98461 70136',
    sub: 'Mon–Sat, 10 AM to 7 PM IST.',
    href: 'tel:+919846170136',
    color: '#9d00ff',
    cta: 'Call Now'
  },
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 98461 70136',
    sub: 'Fastest response — message us anytime.',
    href: 'https://wa.me/919846170136',
    color: '#25D366',
    cta: 'Chat on WhatsApp'
  }
];

/* ─── services ──────────────────────────────────────── */
const serviceItems = [
  { Icon: Globe,      label: 'Websites',   desc: 'Brand sites, e-commerce, and landing pages.' },
  { Icon: Smartphone, label: 'Mobile Apps', desc: 'iOS, Android, and cross-platform app builds.' },
  { Icon: Zap,        label: 'Dashboards',  desc: 'Admin panels, internal tools, and SaaS systems.' }
];

/* ─── brief checklist ───────────────────────────────── */
const checklist = [
  'What type of project — website, app, or dashboard?',
  'Your current digital situation and what needs fixing.',
  'The main goal — brand, usability, conversion, or launch.',
  'Any deadline or release window we should know about.'
];

/* ─── animation ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
});

/* ══════════════════ COMPONENT ══════════════════════ */
export default function Contact() {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });

  if (isMobile) return <MobileContact />;

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ════ HERO ════ */}
      <section style={{ position: 'relative', paddingTop: '10rem', paddingBottom: '6rem', overflow: 'hidden' }}>
        {/* nebula blobs */}
        <div style={{ position: 'absolute', top: '8%', left: '12%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(0,240,255,.13) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(157,0,255,.10) 0%, transparent 70%)', filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="mesh-grid" style={{ opacity: 0.08 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp(0)} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>

            {/* badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', marginBottom: '2rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,.55)' }}>
                Let's Talk
              </span>
            </div>

            <motion.h1 {...fadeUp(0.08)} style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.06em', marginBottom: '1.8rem' }}>
              Start your next<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,.25)' }}>digital </span>
              <span style={{ color: 'var(--accent)' }}>project.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.15)} style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 3rem' }}>
              Whether it's a brand website, a mobile app, or a complex internal system — we'd love to hear what you're building.
            </motion.p>

            <motion.div {...fadeUp(0.22)} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <a href="mailto:nexlytestudio@gmail.com" className="btn-premium" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Send a message
              </a>
              <Link to="/projects" className="btn-outline" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                View our work
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════ CONTACT CHANNELS ════ */}
      <section style={{ padding: '5rem 0 7rem' }}>
        <div className="container">
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.8rem' }}>
              Reach us directly
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Pick your preferred channel — we're available across all three.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {channels.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                {...fadeUp(i * 0.1)}
                onHoverStart={() => setHovered(ch.label)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -8 }}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '1.4rem',
                  padding: '2.5rem 2rem', borderRadius: '24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${hovered === ch.label ? ch.color + '66' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                  transition: 'border-color 0.3s ease',
                  textDecoration: 'none', color: 'inherit'
                }}
              >
                {/* icon circle */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px',
                  background: `${ch.color}18`, border: `1px solid ${ch.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: ch.color
                }}>
                  <ch.Icon size={24} strokeWidth={1.8} />
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.18em', color: ch.color, marginBottom: '0.5rem' }}>
                    {ch.label}
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{ch.value}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{ch.sub}</div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: ch.color, fontSize: '0.85rem', fontWeight: 700 }}>
                  {ch.cta}
                  <motion.span animate={{ x: hovered === ch.label ? 4 : 0 }} transition={{ duration: 0.2 }}>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </motion.span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FORM + BRIEF GUIDE ════ */}
      <section style={{ padding: '5rem 0 8rem', background: 'rgba(255,255,255,.01)', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '3rem', alignItems: 'start' }} className="contact-two-col">

            {/* LEFT — form */}
            <motion.div {...fadeUp(0)}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.18em', color: 'var(--accent)', marginBottom: '1rem' }}>
                Quick Message
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.8rem' }}>
                Tell us about your project.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Fill in the form below and we'll get back to you within 24 hours with a tailored response.
              </p>

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    style={{ display: 'grid', gap: '1.2rem' }}
                  >
                    {/* Name + Email row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                      {[
                        { id: 'name',  label: 'Your Name',     type: 'text',  placeholder: 'John Doe' },
                        { id: 'email', label: 'Email Address',  type: 'email', placeholder: 'john@company.com' }
                      ].map(f => (
                        <div key={f.id}>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,.45)', marginBottom: '0.5rem' }}>{f.label}</label>
                          <input
                            type={f.type}
                            required
                            placeholder={f.placeholder}
                            value={form[f.id]}
                            onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                            style={{
                              width: '100%', padding: '0.85rem 1.1rem', borderRadius: '12px',
                              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
                              color: '#fff', fontSize: '0.95rem', outline: 'none',
                              transition: 'border-color 0.2s', fontFamily: 'inherit'
                            }}
                            onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,.5)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Project type */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,.45)', marginBottom: '0.5rem' }}>Project Type</label>
                      <select
                        required
                        value={form.project}
                        onChange={e => setForm(p => ({ ...p, project: e.target.value }))}
                        style={{
                          width: '100%', padding: '0.85rem 1.1rem', borderRadius: '12px',
                          background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
                          color: form.project ? '#fff' : 'rgba(255,255,255,.35)',
                          fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit',
                          transition: 'border-color 0.2s', appearance: 'none'
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                      >
                        <option value="" style={{ background: '#111' }}>Select a service…</option>
                        <option value="website" style={{ background: '#111' }}>Website / Landing Page</option>
                        <option value="ecommerce" style={{ background: '#111' }}>E-commerce Store</option>
                        <option value="app" style={{ background: '#111' }}>Mobile / Web Application</option>
                        <option value="dashboard" style={{ background: '#111' }}>Dashboard / Internal Tool</option>
                        <option value="redesign" style={{ background: '#111' }}>Redesign / Refresh</option>
                        <option value="other" style={{ background: '#111' }}>Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,.45)', marginBottom: '0.5rem' }}>Your Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Briefly describe your project, goals, and timeline..."
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        style={{
                          width: '100%', padding: '0.85rem 1.1rem', borderRadius: '12px',
                          background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
                          color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'vertical',
                          fontFamily: 'inherit', lineHeight: 1.6, transition: 'border-color 0.2s'
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                        padding: '1rem 2.5rem', borderRadius: '999px',
                        background: 'var(--accent)', color: '#000', border: 'none',
                        fontSize: '13px', fontWeight: 900, textTransform: 'uppercase',
                        letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'inherit'
                      }}
                    >
                      <Send size={16} strokeWidth={2.5} />
                      Send Message
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      padding: '3.5rem 2.5rem', borderRadius: '24px', textAlign: 'center',
                      background: 'rgba(0,240,255,.05)', border: '1px solid rgba(0,240,255,.2)'
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      style={{ color: 'var(--accent)', marginBottom: '1.2rem' }}
                    >
                      <CheckCircle size={52} strokeWidth={1.5} />
                    </motion.div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.7rem' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                      Thanks for reaching out. We'll review your brief and get back to you within 24 hours.
                    </p>
                    <button onClick={() => { setSent(false); setForm({ name:'', email:'', project:'', message:'' }); }}
                      style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.6)', borderRadius: '999px', padding: '0.6rem 1.5rem', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700 }}>
                      Send another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT — what to include + services */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>

              {/* Brief guide */}
              <motion.div {...fadeUp(0.1)}
                style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.18em', color: 'var(--accent-purple)', marginBottom: '1.2rem' }}>
                  What to include
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                  A brief note is all we need to get started.
                </h3>
                <div style={{ display: 'grid', gap: '0.9rem' }}>
                  {checklist.map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>
                        <CheckCircle size={16} strokeWidth={2} />
                      </div>
                      <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.6 }}>{item}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Services we handle */}
              <motion.div {...fadeUp(0.18)}
                style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.18em', color: 'rgba(255,255,255,.35)', marginBottom: '1.2rem' }}>
                  What we build
                </div>
                <div style={{ display: 'grid', gap: '0.85rem' }}>
                  {serviceItems.map((s, i) => (
                    <div key={s.label} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 1.2rem', borderRadius: '14px', background: 'rgba(255,255,255,.025)' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.6)', flexShrink: 0 }}>
                        <s.Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.1rem' }}>{s.label}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Availability badge */}
              <motion.div {...fadeUp(0.25)} style={{ padding: '1.5rem 2rem', borderRadius: '20px', background: 'rgba(0,240,255,.05)', border: '1px solid rgba(0,240,255,.15)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff', display: 'inline-block', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.15rem' }}>Currently Accepting Projects</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Mon–Sat · 10 AM – 7 PM IST · Response within 24 hrs</div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer style={{ padding: '3.5rem 0', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Nexlyte Studio · <a href="mailto:nexlytestudio@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>nexlytestudio@gmail.com</a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-two-col { grid-template-columns: 1fr 1fr; }
        .form-row { grid-template-columns: 1fr 1fr; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,.25); }
        select option { background: #111; color: #fff; }
        @media (max-width: 1024px) {
          .contact-two-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      ` }} />

    </div>
  );
}
