import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageCircle, ArrowRight, CheckCircle, Send, Globe, Smartphone, Zap } from 'lucide-react';

const channels = [
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 98461 70136',
    sub: 'Fastest response — tap to open chat',
    href: 'https://wa.me/919846170136',
    color: '#25D366',
    bg: 'rgba(37,211,102,.1)',
    border: 'rgba(37,211,102,.25)',
    cta: 'Open WhatsApp'
  },
  {
    Icon: Phone,
    label: 'Call Us',
    value: '+91 98461 70136',
    sub: 'Mon–Sat · 10 AM – 7 PM IST',
    href: 'tel:+919846170136',
    color: '#9d00ff',
    bg: 'rgba(157,0,255,.08)',
    border: 'rgba(157,0,255,.25)',
    cta: 'Call Now'
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'nexlytestudio@gmail.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:nexlytestudio@gmail.com',
    color: '#00f0ff',
    bg: 'rgba(0,240,255,.06)',
    border: 'rgba(0,240,255,.2)',
    cta: 'Send Email'
  }
];

const services = [
  { Icon: Globe,      label: 'Websites & E-commerce' },
  { Icon: Smartphone, label: 'Mobile & Web Apps' },
  { Icon: Zap,        label: 'Dashboards & Internal Tools' }
];

export default function MobileContact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.1rem', borderRadius: '14px',
    background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)',
    color: '#fff', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'inherit', transition: 'border-color 0.2s'
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100dvh', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{ padding: '8rem 1.5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-8%', right: '-25%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,240,255,.15) 0%, transparent 70%)', filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '-25%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(157,0,255,.12) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', marginBottom: '1.6rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#25D366', boxShadow: '0 0 8px #25D366' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,.55)' }}>Available Now</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.6rem, 12vw, 4rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.06em', marginBottom: '1.4rem' }}>
            Let&apos;s build your<br />
            <span style={{ color: 'var(--accent)' }}>next project.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '0.98rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '0' }}>
            Reach us through your preferred channel. We respond fast.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT CHANNELS ── */}
      <section style={{ padding: '1rem 1.5rem 3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {channels.map((ch, i) => (
            <motion.a
              key={ch.label}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.3rem 1.4rem', borderRadius: '22px',
                background: ch.bg, border: `1px solid ${ch.border}`,
                textDecoration: 'none', color: 'inherit'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '15px', background: `${ch.color}20`, border: `1px solid ${ch.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ch.color, flexShrink: 0 }}>
                <ch.Icon size={22} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.16em', color: ch.color, marginBottom: '2px' }}>{ch.label}</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ch.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,.4)' }}>{ch.sub}</div>
              </div>
              <ArrowRight size={18} color={ch.color} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section style={{ padding: '0 1.5rem 3rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '1.8rem' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '0.6rem' }}>Quick Message</div>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            Tell us about your project.
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,.4)', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" required placeholder="Your name" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,.4)', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" required placeholder="your@email.com" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,.4)', marginBottom: '0.5rem' }}>Project type</label>
                <select required value={form.project}
                  onChange={e => setForm(p => ({ ...p, project: e.target.value }))}
                  style={{ ...inputStyle, appearance: 'none', color: form.project ? '#fff' : 'rgba(255,255,255,.3)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                >
                  <option value="" style={{ background: '#111' }}>Select a service…</option>
                  <option value="website" style={{ background: '#111' }}>Website / Landing Page</option>
                  <option value="ecommerce" style={{ background: '#111' }}>E-commerce Store</option>
                  <option value="app" style={{ background: '#111' }}>Mobile / Web App</option>
                  <option value="dashboard" style={{ background: '#111' }}>Dashboard / Internal Tool</option>
                  <option value="redesign" style={{ background: '#111' }}>Redesign</option>
                  <option value="other" style={{ background: '#111' }}>Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,.4)', marginBottom: '0.5rem' }}>Message</label>
                <textarea required rows={4} placeholder="Describe your project briefly..." value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                />
              </div>

              <motion.button type="submit" whileTap={{ scale: 0.97 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '1.1rem', borderRadius: '999px', background: 'var(--accent)', color: '#000', border: 'none', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'inherit', cursor: 'pointer', marginTop: '0.5rem' }}>
                <Send size={16} strokeWidth={2.5} />
                Send Message
              </motion.button>
            </motion.form>
          ) : (
            <motion.div key="success"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '3rem 2rem', borderRadius: '24px', textAlign: 'center', background: 'rgba(0,240,255,.05)', border: '1px solid rgba(0,240,255,.2)' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                style={{ color: 'var(--accent)', marginBottom: '1.2rem' }}>
                <CheckCircle size={48} strokeWidth={1.5} />
              </motion.div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.6rem' }}>Message Sent!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.8rem' }}>
                We'll get back to you within 24 hours.
              </p>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', project: '', message: '' }); }}
                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.6)', borderRadius: '999px', padding: '0.55rem 1.4rem', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700 }}>
                Send another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section style={{ padding: '0 1.5rem 3rem' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ padding: '2rem 1.5rem', borderRadius: '24px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.2em', color: 'rgba(255,255,255,.3)', marginBottom: '1.2rem' }}>What We Build</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {services.map(s => (
              <div key={s.label} style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', padding: '0.85rem 1rem', borderRadius: '12px', background: 'rgba(255,255,255,.025)' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.55)', flexShrink: 0 }}>
                  <s.Icon size={17} strokeWidth={1.8} />
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'rgba(255,255,255,.75)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* availability */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.5rem', borderRadius: '18px', background: 'rgba(0,240,255,.05)', border: '1px solid rgba(0,240,255,.15)' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent)' }}>Currently Accepting Projects</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mon–Sat · 10 AM – 7 PM IST</div>
          </div>
        </motion.div>
      </section>

      {/* footer */}
      <footer style={{ padding: '2.5rem 1.5rem', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Nexlyte Studio · <a href="mailto:nexlytestudio@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>nexlytestudio@gmail.com</a>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,.25); }
        select option { background: #111; color: #fff; }
      ` }} />
    </div>
  );
}
