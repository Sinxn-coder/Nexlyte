import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkStyle = (active) => ({
    fontSize: '12px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: active ? '#1a212b' : 'rgba(26,33,43,0.56)'
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: scrolled ? '1rem' : '0',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: scrolled ? '0 1rem' : '1.1rem 1rem 0',
        transition: 'all 300ms ease'
      }}
    >
      <div
        className="home-navbar-shell"
        style={{
          width: 'min(1240px, calc(100% - 32px))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.2rem',
          padding: scrolled ? '0.7rem 1.4rem' : '0.9rem 1.6rem',
          borderRadius: scrolled ? '999px' : '28px',
          background: 'rgba(10, 10, 10, 0.72)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' : 'none',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          position: 'relative',
          zIndex: 102,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.9rem' }} onClick={() => setIsMenuOpen(false)}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontSize: '16px',
              fontWeight: 900,
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)'
            }}
          >
            N
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>Nexlyte</div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>
              Design Studio
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="home-navbar-links" style={{ display: 'flex', alignItems: 'center', gap: '2.4rem' }}>
          <Link to="/" style={{ ...navLinkStyle(location.pathname === '/'), color: location.pathname === '/' ? 'var(--accent)' : 'rgba(255,255,255,0.5)' }}>Home</Link>
          <a href="/#services" style={{ ...navLinkStyle(false), color: 'rgba(255,255,255,0.5)' }}>Services</a>
          <Link to="/projects" style={{ ...navLinkStyle(location.pathname === '/projects'), color: location.pathname === '/projects' ? 'var(--accent)' : 'rgba(255,255,255,0.5)' }}>Projects</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Link
            to="/contact"
            className="home-nav-contact-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.9rem 1.5rem',
              borderRadius: '999px',
              background: 'white',
              color: 'black',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              transition: 'transform 0.2s ease'
            }}
          >
            Contact Us
          </Link>

          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMenu}
            style={{
              display: 'none',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: isMenuOpen ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
              border: 'none',
              cursor: 'pointer',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              transition: 'all 0.3s ease',
              padding: '0'
            }}
            className="mobile-menu-toggle"
          >
            <span style={{
              width: '20px',
              height: '1.8px',
              background: isMenuOpen ? '#000' : '#fff',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'translateY(3.4px) rotate(45deg)' : 'none'
            }} />
            <span style={{
              width: '14px',
              height: '1.8px',
              background: isMenuOpen ? '#000' : '#fff',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? 0 : 1
            }} />
            <span style={{
              width: '20px',
              height: '1.8px',
              background: isMenuOpen ? '#000' : '#fff',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'translateY(-3.4px) rotate(-45deg)' : 'none'
            }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(3, 3, 3, 0.96)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          zIndex: 101,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'all' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isMenuOpen ? 'scale(1)' : 'scale(1.1)'
        }}
      >
        <Link to="/" style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em' }} onClick={() => setIsMenuOpen(false)}>Home</Link>
        <a href="/#services" style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em' }} onClick={() => setIsMenuOpen(false)}>Services</a>
        <Link to="/projects" style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em' }} onClick={() => setIsMenuOpen(false)}>Projects</Link>
        <Link to="/contact" style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em' }} onClick={() => setIsMenuOpen(false)}>Contact</Link>
        
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.24em', color: 'var(--accent)', fontWeight: 800, marginBottom: '0.6rem' }}>
            Nexlyte Studio
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            Crafting Digital Wonders
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 760px) {
          .home-navbar-links, .home-nav-contact-btn {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .home-navbar-shell {
            width: calc(100% - 20px) !important;
          }
        }
      ` }} />
    </header>
  );
};

export default Navbar;
