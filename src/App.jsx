import React, { useEffect, useRef } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const serviceCards = [
  {
    kicker: "Storefront logic",
    title: "High-converting websites",
    body: "Landing pages, company sites, and conversion-focused web experiences built with commercial clarity.",
    cta: "Book website build",
  },
  {
    kicker: "Digital systems",
    title: "Web apps and client portals",
    body: "Dashboards, member areas, and custom interfaces that make brands operate more professionally.",
    cta: "Discuss your platform",
    accent: true,
  },
  {
    kicker: "Launch velocity",
    title: "Premium digital execution",
    body: "Design systems, front-end implementation, and strategic structure aligned to business growth.",
    cta: "Get a custom roadmap",
  },
];

const processSteps = [
  ["01", "Discover", "We map business goals, audience, and the exact digital outcome the site needs to produce."],
  ["02", "Design", "We build the visual language, page architecture, and CTA flow before development starts."],
  ["03", "Develop", "We turn the concept into a polished React build with responsive behavior and motion."],
  ["04", "Scale", "We refine launch details, improve weak points, and prepare the brand for future expansion."],
];

const testimonials = [
  '"Nexlyte made our brand look sharper, more credible, and much more expensive online."',
  '"The section variety made the site feel custom instead of another agency template."',
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function useHeaderState() {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) {
        return;
      }

      headerRef.current.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return headerRef;
}

function App() {
  useReveal();
  const headerRef = useHeaderState();

  return (
    <div className="app-shell">
      <header className="site-header" ref={headerRef}>
        <div className="header-inner">
          <a className="brand" href="#hero" aria-label="Nexlyte home">
            <span className="brand-mark"></span>
            <span className="brand-text">Nexlyte</span>
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="text-link" href="#work">
              View Work
            </a>
            <a className="button button-primary" href="#contact">
              Start Project
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="panel hero-panel" id="hero">
          <div className="hero-grid shell">
            <div className="hero-copy" data-reveal="hero-copy">
              <p className="eyebrow">Future-ready digital agency</p>
              <h1>We build what's next.</h1>
              <p className="lead">
                Nexlyte creates premium websites, apps, and digital systems for businesses, startups,
                and creators who want modern execution with real brand presence.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Start a Project
                </a>
                <a className="button button-secondary" href="#services">
                  Explore Capabilities
                </a>
              </div>
              <div className="pill-row">
                <span>Websites</span>
                <span>Apps</span>
                <span>Brand Systems</span>
                <span>Growth UX</span>
              </div>
            </div>

            <div className="hero-visual" data-reveal="hero-orbit">
              <div className="orbit-ring orbit-ring-outer"></div>
              <div className="orbit-ring orbit-ring-inner"></div>
              <article className="glass-panel">
                <p className="eyebrow">Launch stack</p>
                <h2>Built for brands that need motion, clarity, and premium digital gravity.</h2>
                <div className="signal-row">
                  <span>UI/UX</span>
                  <span>Development</span>
                  <span>Creative direction</span>
                </div>
              </article>
              <div className="chip chip-top">Future-proof</div>
              <div className="chip chip-right">Fast launch</div>
              <div className="chip chip-bottom">High-end UI</div>
            </div>
          </div>
        </section>

        <section className="panel commerce-panel" id="services">
          <div className="shell">
            <div className="section-heading" data-reveal="section-up">
              <p className="eyebrow">Section 01</p>
              <h2>E-commerce-inspired service framing with strong product-style hierarchy.</h2>
              <p>
                This section uses storefront logic so the services feel tangible, premium, and easy to buy
                into at a glance.
              </p>
            </div>

            <div className="commerce-grid">
              {serviceCards.map((card, index) => (
                <article
                  className={`service-card ${card.accent ? "accent-card" : ""}`}
                  data-reveal="card-rise"
                  style={{ transitionDelay: `${index * 120}ms` }}
                  key={card.title}
                >
                  <p className="eyebrow">{card.kicker}</p>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <a href="#contact">{card.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel editorial-panel" id="work">
          <div className="shell editorial-shell">
            <div className="section-heading" data-reveal="section-left">
              <p className="eyebrow">Section 02</p>
              <h2>Food-led storytelling with a richer, more immersive hospitality-style layout.</h2>
              <p>
                This section now behaves like a premium restaurant campaign site: image-first, atmospheric,
                and more expressive than the clean commerce blocks before it.
              </p>
            </div>

            <div className="food-grid">
              <article className="feature-case food-feature" data-reveal="food-pan">
                <div className="case-photo-wrap">
                  <img
                    className="case-photo"
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                    alt="Warm restaurant interior with plated food"
                  />
                </div>
                <div className="case-copy">
                  <p className="eyebrow">Featured build</p>
                  <h3>Restaurant-style depth for brands that need a memorable digital atmosphere.</h3>
                  <p>
                    Editorial pacing, warm food photography, and dramatic contrast make the section feel like
                    a premium dining brand launch instead of a standard agency showcase.
                  </p>
                </div>
              </article>

              <article className="feature-case food-card" data-reveal="food-slide-left">
                <div className="case-photo-wrap compact">
                  <img
                    className="case-photo"
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
                    alt="Plated gourmet dish"
                  />
                </div>
                <div className="case-copy">
                  <h3>Signature dish presentation</h3>
                  <p>Close-up visuals, elevated typography, and strong contrast for an appetizing first read.</p>
                </div>
              </article>

              <article className="feature-case food-card food-dark" data-reveal="food-slide-up">
                <div className="case-photo-wrap compact">
                  <img
                    className="case-photo"
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80"
                    alt="Dessert and coffee table setting"
                  />
                </div>
                <div className="case-copy">
                  <h3>Menu mood and atmosphere</h3>
                  <p>Layered images, quieter text blocks, and slower motion create a more premium hospitality tone.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="panel process-panel" id="process">
          <div className="shell">
            <div className="section-heading" data-reveal="section-up">
              <p className="eyebrow">Section 03</p>
              <h2>SaaS-style process communication to make the build feel disciplined and reliable.</h2>
              <p>
                The visual language changes here to a cleaner, interface-led rhythm so the agency feels structured,
                not just visually creative.
              </p>
            </div>

            <div className="process-grid">
              {processSteps.map(([index, title, body], position) => (
                <article
                  className="process-card"
                  data-reveal="step-lift"
                  style={{ transitionDelay: `${position * 100}ms` }}
                  key={title}
                >
                  <span className="step-index">{index}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel mobile-panel" id="capability">
          <div className="shell mobile-grid">
            <div className="device-stage" data-reveal="device-float">
              <div className="device phone-primary"></div>
              <div className="device phone-secondary"></div>
              <div className="device-note">
                <span>Launch-ready</span>
                <strong>Apps, dashboards, and modern digital products.</strong>
              </div>
            </div>

            <div className="mobile-copy" data-reveal="section-right">
              <p className="eyebrow">Section 04</p>
              <h2>Startup and mobile-product energy without losing the brand-site polish.</h2>
              <p>
                This section borrows from app launch websites to show Nexlyte can build for founders, platforms,
                and product-first businesses.
              </p>
              <ul className="feature-list">
                <li>App landing pages</li>
                <li>MVP UI systems</li>
                <li>Dashboards and portals</li>
                <li>Product-led storytelling</li>
              </ul>
              <a className="button button-primary" href="#contact">
                Book a Discovery Call
              </a>
            </div>
          </div>
        </section>

        <section className="panel proof-panel" id="proof">
          <div className="shell">
            <div className="section-heading" data-reveal="section-up">
              <p className="eyebrow">Section 05</p>
              <h2>Luxury-style proof with calmer spacing and cleaner motion before the close.</h2>
              <p>
                The motion slows down here so the trust layer feels expensive, controlled, and intentionally minimal.
              </p>
            </div>

            <div className="proof-grid">
              {testimonials.map((quote, index) => (
                <article
                  className="quote-card"
                  data-reveal="quote-fade"
                  style={{ transitionDelay: `${index * 140}ms` }}
                  key={quote}
                >
                  <p>{quote}</p>
                  <span>{index === 0 ? "Founder, consumer startup" : "Creative lead, personal brand"}</span>
                </article>
              ))}

              <article className="metrics-card" data-reveal="metric-scale">
                <div>
                  <strong>Fast</strong>
                  <span>Designed for efficient launch cycles</span>
                </div>
                <div>
                  <strong>Modern</strong>
                  <span>Built to feel current beyond trend windows</span>
                </div>
                <div>
                  <strong>Strategic</strong>
                  <span>Every section tied to a client conversion goal</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="panel contact-panel" id="contact">
          <div className="shell contact-grid">
            <div className="contact-copy" data-reveal="section-left">
              <p className="eyebrow">Final Section</p>
              <h2>Let&apos;s build a brand presence that feels ahead of your market.</h2>
              <p>
                If you are launching, rebuilding, or scaling, Nexlyte can shape the site into a premium digital
                system with stronger visual authority and better conversion structure.
              </p>
              <div className="contact-actions">
                <a className="button button-primary" href="mailto:hello@nexlyte.com">
                  hello@nexlyte.com
                </a>
                <a className="button button-secondary" href="#hero">
                  Back to top
                </a>
              </div>
            </div>

            <form
              className="contact-card"
              data-reveal="form-rise"
              onSubmit={(event) => event.preventDefault()}
            >
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="Your email" />
              </label>
              <label>
                <span>Project type</span>
                <select name="projectType" defaultValue="Website">
                  <option>Website</option>
                  <option>App UI/UX</option>
                  <option>Web app</option>
                  <option>Brand refresh</option>
                </select>
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows="5" placeholder="What are you trying to build?" />
              </label>
              <button className="button button-primary" type="submit">
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
