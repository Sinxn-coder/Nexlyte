import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Zap } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';
import MobileHome from './MobileHome';

/* ─── Data ─────────────────────────────────────────── */
const services = [
  {
    id: '01',
    title: 'Digital Architecture',
    text: 'We design and build robust web infrastructures that scale with your business goals.',
    color: '#00f0ff',
    tag: 'Websites & E-commerce',
    Icon: Globe,
    focus: 'E-commerce, Portfolios, & Business Websites',
    steps: [
      { t: 'Strategic Mapping',  d: 'Audit of business goals and user flow architecture to define the right path forward.' },
      { t: 'High-End UI Design', d: 'Pixel-perfect visual design that establishes brand authority and earns trust instantly.' },
      { t: 'Speed Engineering',  d: 'Lightning-fast loading times, SEO-optimised structure, and mobile-first builds.' },
      { t: 'Launch & Scale',     d: 'Full deployment pipeline with ongoing technical support for continuous growth.' }
    ]
  },
  {
    id: '02',
    title: 'Experience Design',
    text: 'Crafting intuitive interfaces that turn casual visitors into loyal brand advocates.',
    color: '#9d00ff',
    tag: 'Mobile & Web Apps',
    Icon: Smartphone,
    focus: 'iOS, Android & Web Applications',
    steps: [
      { t: 'User Research',          d: 'Identifying friction points and opportunities through structured audience analysis.' },
      { t: 'Interactive Prototypes', d: 'Clickable wireframes tested with real users before a single line of code is written.' },
      { t: 'Core Engineering',       d: 'High-performance app interactions built with React Native and modern frameworks.' },
      { t: 'Polished Delivery',      d: 'Frictionless UX with rigorous QA — shipped with zero compromises on quality.' }
    ]
  },
  {
    id: '03',
    title: 'System Intelligence',
    text: 'Building smart internal tools and dashboards that power your daily operations.',
    color: '#e0e0e0',
    tag: 'Dashboards & Internal Tools',
    Icon: Zap,
    focus: 'Admin Panels, SaaS Dashboards & CRM Systems',
    steps: [
      { t: 'Data Architecture', d: 'Mapping complex workflows into clean, actionable visual indicators.' },
      { t: 'API Integration',   d: 'Seamlessly connecting your existing APIs, databases, and third-party services.' },
      { t: 'Security & Access', d: 'Role-based access control, end-to-end encryption, and enterprise-grade protection.' },
      { t: 'Team Enablement',   d: 'Custom training and documentation so your team can hit the ground running.' }
    ]
  }
];

const processSteps = [
  { title: 'Discovery',  text: 'We audit your current state and define the roadmap to your digital future.' },
  { title: 'Synthesis',  text: 'Translating complex requirements into clean, functional design systems.' },
  { title: 'Execution',  text: 'High-performance engineering with a focus on speed and reliability.' },
  { title: 'Evolution',  text: 'Continuous refinement and support to ensure long-term product success.' }
];

/* ─── Home ──────────────────────────────────────────── */
export default function Home() {
  const [mousePos,    setMousePos]    = useState({ x: 0, y: 0 });
  const [selectedId,  setSelectedId]  = useState(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const selected = services.find(s => s.id === selectedId) ?? null;

  /* mouse tracker */
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  function openCard(id) {
    setSelectedId(id);
    setTimeout(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  function closeCard() {
    setSelectedId(null);
  }

  /* ── render ── */
  if (isMobile) return <MobileHome />;
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>

      {/* progress bar */}
      <motion.div style={{
        scaleX,
        position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg,var(--accent),var(--accent-purple))',
        transformOrigin: '0%', zIndex: 1000
      }} />

      {/* ════════════════════ HERO ════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '8rem', overflow: 'hidden' }}>

        {/* nebula blobs */}
        <motion.div animate={{ x:(mousePos.x-window.innerWidth/2)*0.05, y:(mousePos.y-window.innerHeight/2)*0.05 }}
          style={{ position:'absolute', top:'10%', left:'15%', width:'500px', height:'500px',
            background:'radial-gradient(circle,rgba(0,240,255,.15) 0%,transparent 70%)',
            filter:'blur(60px)', borderRadius:'50%', pointerEvents:'none' }} />
        <motion.div animate={{ x:(mousePos.x-window.innerWidth/2)*-0.03, y:(mousePos.y-window.innerHeight/2)*-0.03 }}
          style={{ position:'absolute', bottom:'10%', right:'5%', width:'600px', height:'600px',
            background:'radial-gradient(circle,rgba(157,0,255,.12) 0%,transparent 70%)',
            filter:'blur(80px)', borderRadius:'50%', pointerEvents:'none' }} />
        <div className="mesh-grid" style={{ opacity:0.1 }} />

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <motion.div
            initial="h" animate="v"
            variants={{ h:{}, v:{ transition:{ staggerChildren:0.12 } } }}
            style={{ maxWidth:'900px' }}
          >
            {/* badge */}
            <motion.div variants={{ h:{ opacity:0,y:30 }, v:{ opacity:1,y:0,transition:{ duration:0.8 } } }}
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 14px',
                borderRadius:'999px', background:'rgba(255,255,255,.05)',
                border:'1px solid rgba(255,255,255,.1)', marginBottom:'2rem' }}>
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 10px var(--accent)' }} />
              <span style={{ fontSize:'11px', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(255,255,255,.6)' }}>
                Nexlyte Studio v2.0
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1 variants={{ h:{ opacity:0,y:30 }, v:{ opacity:1,y:0,transition:{ duration:0.8, delay:0.1 } } }}
              style={{ fontSize:'clamp(3.5rem,10vw,7.5rem)', fontWeight:800, lineHeight:0.88, letterSpacing:'-0.06em', marginBottom:'2rem' }}>
              We Build <br />
              <span style={{ color:'transparent', WebkitTextStroke:'1px rgba(255,255,255,.3)' }}>What&apos;s </span>Next.
            </motion.h1>

            {/* sub */}
            <motion.p variants={{ h:{ opacity:0,y:30 }, v:{ opacity:1,y:0,transition:{ duration:0.8, delay:0.2 } } }}
              style={{ fontSize:'clamp(1.1rem,2vw,1.3rem)', lineHeight:1.6, color:'var(--text-muted)', maxWidth:'600px', marginBottom:'3rem' }}>
              Nexlyte is an elite digital laboratory crafting high-performance websites, mobile apps,
              scalable systems, and immersive web experiences for forward-thinking brands.
            </motion.p>

            {/* ctas */}
            <motion.div variants={{ h:{ opacity:0,y:30 }, v:{ opacity:1,y:0,transition:{ duration:0.8, delay:0.3 } } }}
              style={{ display:'flex', flexWrap:'wrap', gap:'1rem' }}>
              <Link to="/projects" className="btn-premium" style={{ fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.1em' }}>Explore Works</Link>
              <Link to="/contact"  className="btn-outline"  style={{ fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.1em' }}>Start a project</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ SERVICES ════════════════════ */}
      <section id="services" style={{ padding:'8rem 0', position:'relative' }}>
        <div className="container">

          {/* section heading */}
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.7 }} style={{ textAlign:'center', marginBottom:'5rem' }}>
            <h2 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:800, letterSpacing:'-0.05em', marginBottom:'1rem' }}>
              Specialized Services
            </h2>
            <p style={{ color:'var(--text-muted)', fontSize:'1.1rem', maxWidth:'540px', margin:'0 auto' }}>
              Click any service to see what we build and exactly how we do it.
            </p>
          </motion.div>

          {/* ── single AnimatePresence: grid OR expanded, never both ── */}
          <AnimatePresence mode="wait">

            {/* ── GRID ── */}
            {!selectedId && (
              <motion.div
                key="grid"
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-16, transition:{ duration:0.28 } }}
                transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
                style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2rem' }}
              >
                {services.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity:0, y:28 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:i*0.08, duration:0.52, ease:[0.16,1,0.3,1] }}
                    whileHover={{ y:-10, borderColor:s.color }}
                    onClick={() => openCard(s.id)}
                    style={{
                      display:'flex', flexDirection:'column', gap:'1.4rem',
                      padding:'3rem 2.5rem', borderRadius:'24px',
                      background:'rgba(255,255,255,0.03)',
                      border:'1px solid rgba(255,255,255,0.08)',
                      cursor:'pointer',
                      backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
                      transition:'border-color 0.3s ease, transform 0.3s ease'
                    }}
                  >
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ fontSize:'0.75rem', fontWeight:900, color:s.color, letterSpacing:'0.25em' }}>{s.id}</div>
                      <div style={{ width:'28px', height:'28px', color:s.color, opacity:0.8 }}>
                        <s.Icon size={28} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize:'2rem', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'0.9rem' }}>{s.title}</h3>
                      <p style={{ color:'rgba(255,255,255,0.5)', lineHeight:1.7, fontSize:'0.98rem' }}>{s.text}</p>
                    </div>
                    <div style={{ marginTop:'auto' }}>
                      <div style={{
                        display:'inline-flex', alignItems:'center', gap:'6px', marginBottom:'1rem',
                        fontSize:'10px', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.16em',
                        color:s.color, padding:'5px 10px', background:`${s.color}18`, borderRadius:'6px'
                      }}>
                        {s.tag}
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', color:s.color, fontSize:'0.82rem', fontWeight:700 }}>
                        Explore service
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ── EXPANDED ── */}
            {selectedId && selected && (
              <motion.div
                key={`expanded-${selectedId}`}
                initial={{ opacity:0, scale:0.97, y:24 }}
                animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:0.97, y:24, transition:{ duration:0.28 } }}
                transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
                style={{
                  borderRadius:'28px',
                  background:'rgba(255,255,255,0.04)',
                  border:`1px solid ${selected.color}44`,
                  backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
                  boxShadow:`0 0 80px ${selected.color}12`,
                  overflow:'hidden'
                }}
              >
                {/* accent strip */}
                <div style={{ height:'3px', background:`linear-gradient(90deg,${selected.color},transparent)` }} />

                <div className="expanded-inner" style={{
                  padding:'3.5rem 4rem',
                  display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:'4rem', alignItems:'start'
                }}>

                  {/* LEFT */}
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
                      <div style={{ width:'36px', height:'36px', color:selected.color, opacity:0.9 }}>
                        <selected.Icon size={36} strokeWidth={1.5} />
                      </div>
                      <div style={{ fontSize:'0.72rem', fontWeight:900, color:selected.color, letterSpacing:'0.25em' }}>{selected.id}</div>
                    </div>

                    <h3 style={{ fontSize:'clamp(2.4rem,4vw,4rem)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:1, marginBottom:'1.4rem' }}>
                      {selected.title}
                    </h3>

                    <p style={{ color:'rgba(255,255,255,.65)', fontSize:'1.1rem', lineHeight:1.75, marginBottom:'2rem' }}>
                      {selected.text}
                    </p>

                    {/* "we build" badge */}
                    <div style={{ padding:'1.2rem 1.5rem', borderRadius:'16px', background:`${selected.color}0e`, border:`1px solid ${selected.color}22`, marginBottom:'2.5rem' }}>
                      <div style={{ fontSize:'10px', textTransform:'uppercase', fontWeight:900, letterSpacing:'0.2em', color:selected.color, marginBottom:'0.4rem' }}>
                        We build
                      </div>
                      <div style={{ fontSize:'1.2rem', fontWeight:700, color:'#fff' }}>{selected.focus}</div>
                    </div>

                    {/* switch to other service */}
                    <div style={{ marginBottom:'2.5rem' }}>
                      <div style={{ fontSize:'10px', textTransform:'uppercase', fontWeight:800, letterSpacing:'0.18em', color:'rgba(255,255,255,.3)', marginBottom:'0.8rem' }}>
                        Other services
                      </div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem' }}>
                        {services.filter(s => s.id !== selected.id).map(s => (
                          <button key={s.id} onClick={() => openCard(s.id)} style={{
                            cursor:'pointer', background:'rgba(255,255,255,.04)',
                            border:'1px solid rgba(255,255,255,.1)', color:'rgba(255,255,255,.6)',
                            borderRadius:'999px', padding:'0.45rem 1.1rem',
                            fontSize:'12px', fontWeight:700, transition:'all 0.2s',
                            display:'inline-flex', alignItems:'center', gap:'6px'
                          }}>
                            <s.Icon size={13} strokeWidth={2} />
                            {s.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* back button */}
                    <button onClick={closeCard} style={{
                      cursor:'pointer', background:'transparent', border:'none',
                      color:'rgba(255,255,255,.35)', fontSize:'0.82rem', fontWeight:800,
                      textTransform:'uppercase', letterSpacing:'0.14em',
                      display:'flex', alignItems:'center', gap:'0.6rem', padding:0
                    }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      Back to all services
                    </button>
                  </div>

                  {/* RIGHT — roadmap */}
                  <div>
                    <div style={{ fontSize:'11px', textTransform:'uppercase', fontWeight:900, letterSpacing:'0.2em', color:'rgba(255,255,255,.28)', marginBottom:'1.8rem' }}>
                      The Roadmap
                    </div>
                    <div style={{ display:'grid', gap:'1.1rem' }}>
                      {selected.steps.map((step, i) => (
                        <motion.div
                          key={step.t}
                          initial={{ opacity:0, x:20 }}
                          animate={{ opacity:1, x:0 }}
                          transition={{ delay:i*0.08+0.2, duration:0.45, ease:[0.16,1,0.3,1] }}
                          style={{
                            display:'flex', gap:'1.2rem', padding:'1.4rem 1.6rem',
                            borderRadius:'20px', background:'rgba(255,255,255,.025)',
                            border:'1px solid rgba(255,255,255,.06)', alignItems:'flex-start'
                          }}
                        >
                          <div style={{
                            minWidth:'34px', height:'34px', borderRadius:'50%',
                            background:`${selected.color}1e`, border:`1px solid ${selected.color}44`,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:'0.75rem', fontWeight:900, color:selected.color, flexShrink:0
                          }}>
                            {String(i+1).padStart(2,'0')}
                          </div>
                          <div>
                            <div style={{ fontWeight:800, fontSize:'1rem', marginBottom:'0.3rem', color:'#fff' }}>{step.t}</div>
                            <div style={{ fontSize:'0.88rem', color:'rgba(255,255,255,.48)', lineHeight:1.6 }}>{step.d}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA inside expanded */}
                    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}
                      style={{ marginTop:'2rem', textAlign:'center' }}>
                      <Link to="/contact" style={{
                        display:'inline-flex', alignItems:'center', gap:'0.5rem',
                        padding:'0.9rem 2.2rem', borderRadius:'999px',
                        background:selected.color === '#e0e0e0' ? '#fff' : selected.color,
                        color:'#000', fontSize:'13px', fontWeight:900,
                        textTransform:'uppercase', letterSpacing:'0.1em'
                      }}>
                        Start this project →
                      </Link>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════ PROCESS ════════════════════ */}
      <section style={{ padding:'8rem 0', background:'rgba(255,255,255,.01)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(400px,1fr))', gap:'4rem', alignItems:'center' }}>
            <motion.div initial={{ opacity:0,x:-50 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
              <h2 className="section-title" style={{ marginBottom:'1.5rem' }}>Our Process</h2>
              <p style={{ color:'var(--text-muted)', fontSize:'1.1rem', lineHeight:1.8, marginBottom:'2.5rem' }}>
                We've refined a workflow that balances creative exploration with rigorous engineering.
                Transparent, collaborative, and always results-driven.
              </p>
              <Link to="/projects" className="btn-outline">View Our Portfolio</Link>
            </motion.div>
            <div style={{ display:'grid', gap:'1.5rem' }}>
              {processSteps.map((step, idx) => (
                <motion.div key={step.title}
                  initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
                  viewport={{ once:true }} transition={{ delay:idx*0.1 }}
                  whileHover={{ borderLeftColor:'var(--accent)', background:'rgba(255,255,255,.02)' }}
                  style={{ padding:'1.5rem 2rem', borderLeft:'2px solid var(--line)', transition:'all 0.3s ease' }}>
                  <h4 style={{ fontSize:'1.2rem', fontWeight:800, marginBottom:'0.5rem' }}>{step.title}</h4>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.95rem' }}>{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section style={{ padding:'10rem 0', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at center,rgba(0,240,255,.05) 0%,transparent 70%)', zIndex:0 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0,scale:0.9 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <h2 style={{ fontSize:'clamp(2.5rem,6vw,5rem)', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'2rem' }}>
              Ready to build <br />
              <span style={{ color:'var(--accent-purple)' }}>the future?</span>
            </h2>
            <p style={{ color:'var(--text-muted)', fontSize:'1.2rem', maxWidth:'600px', margin:'0 auto 3.5rem' }}>
              Whether it&apos;s a website, an app, or a full internal system — let&apos;s build it together.
            </p>
            <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
              <Link to="/contact" className="btn-premium" style={{ padding:'1.2rem 3rem', fontSize:'15px' }}>
                Kickoff your project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* footer */}
      <footer style={{ padding:'4rem 0', borderTop:'1px solid var(--line)', textAlign:'center' }}>
        <div className="container">
          <div style={{ fontSize:'0.9rem', color:'var(--text-muted)' }}>
            © {new Date().getFullYear()} Nexlyte Studio. All rights reserved.
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1100px) {
          .expanded-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 2.5rem 2rem !important; }
        }
        @media (max-width: 768px) {
          h1 { text-align: center; }
          section { padding: 5rem 0 !important; }
          #services > div > div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </div>
  );
}
