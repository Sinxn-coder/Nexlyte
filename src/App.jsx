import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Menu, X, MapPin, Mail, Phone, ArrowUpRight, User, Calendar, Users, Briefcase } from 'lucide-react';

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: "0px 0px -50px 0px"
    });

    revealRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleBooking = () => setIsBookingOpen(!isBookingOpen);

  return (
    <>
      {/* Navigation */}
      <nav>
        <div className="container nav-container">
          <div className="logo">
            <span>SYVEN</span>
            <span className="logo-sub">Events</span>
          </div>
          
          <div className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#services">Services</a>
            <a href="#venues">Venues</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <button className="btn-primary" onClick={toggleBooking}>Book Now</button>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-sidebar-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>
      <div className={`mobile-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span>SYVEN</span>
            <span className="logo-sub">Events</span>
          </div>
          <button className="close-btn" onClick={closeMobileMenu}>
            <X size={28} />
          </button>
        </div>
        <div className="sidebar-links">
          <a href="#" onClick={closeMobileMenu}>Home</a>
          <a href="#services" onClick={closeMobileMenu}>Services</a>
          <a href="#venues" onClick={closeMobileMenu}>Venues</a>
          <a href="#gallery" onClick={closeMobileMenu}>Gallery</a>
          <a href="#contact" onClick={closeMobileMenu}>Contact Us</a>
        </div>
        <div style={{marginTop: 'auto', paddingTop: '2rem'}}>
          <button className="btn-primary" style={{width: '100%'}} onClick={() => { closeMobileMenu(); toggleBooking(); }}>Book Now</button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <img 
          src="/images/hero_wedding.png" 
          alt="Grand Wedding Reception" 
          className="hero-bg" 
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.4}px)` }}
        />
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Making Every Celebration Memorable</h1>
          <p>Turning your special days into cherished memories, with our expert touch.</p>
          <div className="hero-actions">
            <button className="btn-primary">View Service</button>
            <button className="btn-outline" onClick={toggleBooking}>Book Now</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section container reveal" ref={addToRefs}>
        <img src="/images/floral_accent.png" alt="" className="floral-decor floral-left" />
        <img src="/images/floral_accent.png" alt="" className="floral-decor floral-right" />
        
        <div className="stats-grid">
          <div className="stats-title">
            <h3>We Specialize in Weddings, Events, and Parties</h3>
          </div>
          <div className="stat-item reveal delay-100" ref={addToRefs}>
            <div className="stat-number">100+</div>
            <div className="stat-label">Wedding</div>
          </div>
          <div className="stat-item reveal delay-200" ref={addToRefs}>
            <div className="stat-number">100+</div>
            <div className="stat-label">Happy Customer</div>
          </div>
          <div className="stat-item reveal delay-300" ref={addToRefs}>
            <div className="stat-number">130+</div>
            <div className="stat-label">Event Planning</div>
          </div>
          <div className="stat-item reveal delay-300" ref={addToRefs}>
            <div className="stat-number">10+</div>
            <div className="stat-label">Years of Service</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services container">
        <div className="services-header reveal" ref={addToRefs}>
          <div className="section-title-wrap">
            <h2 className="section-title">Our Service</h2>
            <p className="section-subtitle" style={{margin: 0}}>Your one-stop solution for weddings, birthdays, corporate events, and everything in between.</p>
          </div>
        </div>

        <div className="services-grid">
          {[
            { title: 'Corporate', img: '/images/corporate_event.png', desc: 'Professional setups with state-of-the-art AV equipment, perfect for conferences, galas, and company retreats.' },
            { title: 'Parties', img: '/images/party_event.png', desc: 'From vibrant birthdays to elegant anniversaries, we create the perfect atmosphere with custom decor and catering.' },
            { title: 'Wedding', img: '/images/hero_wedding.png', desc: 'Turn your dream day into reality. We handle everything from gorgeous floral arrangements to flawless day-of coordination.' },
            { title: 'Planning', img: '/images/venue_grand_hall.png', desc: 'Full-service event coordination, timeline management, and vendor negotiations to ensure a stress-free experience.' }
          ].map((service, idx) => {
            const isExpanded = expandedCard === idx;
            return (
              <div 
                className={`reveal delay-${(idx % 4) * 100}`} 
                style={{ height: '100%' }}
                ref={addToRefs} 
                key={idx}
              >
                <div 
                  className={`service-card ${isExpanded ? 'expanded' : ''}`} 
                  style={{ height: '100%' }}
                  onClick={() => setExpandedCard(isExpanded ? null : idx)}
                >
                  <img src={service.img} alt={service.title} />
                  <div className="service-card-content">
                    <div className="service-card-header">
                      <h4>{service.title}</h4>
                      <div className={`service-btn ${isExpanded ? 'active' : ''}`}>
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <div className="service-details">
                      <p>{service.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Venues Section */}
      <section id="venues" className="venues">
        <div className="container venues-layout">
          <div className="venue-info reveal" ref={addToRefs}>
            <h2 className="section-title" style={{marginBottom: '2rem'}}>Stunning Events in Our Destination Spot</h2>
            <div className="venue-features">
              <div className="v-feature">
                <h4>Spacious Venues</h4>
                <p>Host events of any scale with our Grand Room and Silver Room.</p>
              </div>
              <div className="v-feature">
                <h4>Elegant Décor & Setup</h4>
                <p>Choose from premium seating, linens, and lighting options to match your theme.</p>
              </div>
              <div className="v-feature">
                <h4>Flexible Floor Plans</h4>
                <p>Flexible layouts to accommodate different event styles and guest arrangements.</p>
              </div>
            </div>
          </div>
          <div className="venue-gallery reveal" ref={addToRefs}>
            <div className="venue-img-wrap"><img src="/images/venue_grand_hall.png" alt="Venue 1" /></div>
            <div className="venue-img-wrap"><img src="/images/party_event.png" alt="Venue 2" /></div>
            <div className="venue-img-wrap"><img src="/images/hero_wedding.png" alt="Venue 3" /></div>
          </div>
        </div>
      </section>

      {/* Contact Integration */}
      <section id="contact" className="contact-section container">
        <div className="contact-grid">
          <div className="contact-images reveal" ref={addToRefs}>
            <img src="/images/couple_wedding.png" className="main-c-img" alt="Wedding Couple" />
            <img src="/images/venue_grand_hall.png" className="sub-c-img" alt="Venue Setup" />
          </div>
          
          <div className="reveal delay-200" ref={addToRefs}>
            <h2 className="section-title">Let's Create Something Amazing Together!</h2>
            <p className="section-subtitle" style={{marginBottom: '2rem'}}>Your perfect event starts with a conversation - reach out now!</p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <User className="form-icon" size={20} />
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <Mail className="form-icon" size={20} />
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <Users className="form-icon" size={20} />
                  <input type="number" placeholder="Guests" min="1" required />
                </div>
                <div className="form-group">
                  <Calendar className="form-icon" size={20} />
                  <input type="date" required />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <Briefcase className="form-icon" size={20} />
                <select required defaultValue="">
                  <option value="" disabled>Select Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="party">Birthday/Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{width: '100%', borderRadius: '8px', padding: '15px'}}>
                {formSubmitted ? 'Message Sent successfully!' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="container reveal" ref={addToRefs}>
        <div className="cta-section">
          <div className="cta-content">
            <h2>Get in Touch to Arrange a Wedding</h2>
            <p style={{marginBottom: '2rem', color: 'var(--color-text-muted)'}}>Every wedding is unique, and we strive to provide personalized service to each of our couples.</p>
            <button className="btn-primary" onClick={toggleBooking}>Book Now</button>
          </div>
          <div className="cta-image">
            <img 
              src="/images/couple_wedding.png" 
              alt="Happy Couple" 
              style={{ transform: `scale(1.2) translateY(${(scrollY - 2000) * 0.15}px)` }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="reveal" ref={addToRefs}>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <div>SYVEN</div>
                <div style={{fontSize: '0.8rem', letterSpacing: '4px', fontFamily: 'var(--font-sans)', fontWeight: 400}}>EVENTS</div>
              </div>
              <p style={{color: '#a0a4b8', fontSize: '0.9rem', marginTop: '1.5rem', lineHeight: 1.6}}>
                Looking for an event venue to host your special day? Syven Events has the perfect spaces for you! Because you want your event to be perfect, choose Syven Events and we can make that happen.
              </p>
            </div>
            
            <div className="footer-col">
              <h5>Navigation</h5>
              <div className="footer-links">
                <a href="#about">About Us</a>
                <a href="#services">Service</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#testimonials">Testimonials</a>
              </div>
            </div>

            <div className="footer-col">
              <h5>Quick Links</h5>
              <div className="footer-links">
                <a href="#terms">Terms & Condition</a>
                <a href="#privacy">Privacy Policy</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>

            <div className="footer-col">
              <h5>Contact us</h5>
              <div className="contact-item">
                <Mail size={20} />
                <span>booking@syvenevents.com</span>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <span>(559) 931-3333</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>1600 Willow Ave, Clovis, CA 93612</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div>&copy; 2026 Syven Events. All Rights Reserved.</div>
            <div className="social-links">
              <a href="#" style={{fontWeight: 600}}>Fb</a>
              <a href="#" style={{fontWeight: 600}}>Tw</a>
              <a href="#" style={{fontWeight: 600}}>Ig</a>
              <a href="#" style={{fontWeight: 600}}>Yt</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Popup Modal */}
      {isBookingOpen && (
        <div className="modal-overlay" onClick={toggleBooking}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={toggleBooking}><X size={24} /></button>
            <div className="modal-header">
              <h3>Inquire About Your Event</h3>
              <p>Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>
            <form className="contact-form modal-form" onSubmit={(e) => { handleSubmit(e); setTimeout(toggleBooking, 2000); }}>
              <div className="form-group">
                <User className="form-icon" size={20} />
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <Mail className="form-icon" size={20} />
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <Users className="form-icon" size={20} />
                  <input type="number" placeholder="Guests" min="1" required />
                </div>
                <div className="form-group">
                  <Calendar className="form-icon" size={20} />
                  <input type="date" required />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <Briefcase className="form-icon" size={20} />
                <select required defaultValue="">
                  <option value="" disabled>Select Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="party">Birthday/Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{width: '100%', borderRadius: '8px', padding: '15px'}}>
                {formSubmitted ? 'Booking Sent!' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
