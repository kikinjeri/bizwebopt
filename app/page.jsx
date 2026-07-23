import "./homepage.css";

export default function HomePage() {
  return (
    <main>
      {/* HERO WITH PRODUCT PREVIEW */}
      <section className="hero">
        <div className="hero-grid">
          {/* LEFT: COPY + CTAS */}
          <div>
            <h1 className="hero-title">Boosting Ottawa’s Local Businesses</h1>
            <p className="hero-subtitle">
              Give your business a modern, searchable digital card that helps
              local customers find you.
            </p>

            <div className="cta-group">
              <a className="btn btn-primary" href="#">
                Get Started
              </a>
              <a className="btn btn-secondary" href="#">
                Learn More
              </a>
            </div>
          </div>

          {/* RIGHT: DEMO CARD */}
          <article className="demo-card">
            <div className="demo-card-border">
              <div className="demo-card-inner">
                <h3 className="demo-card-title">Ottawa Home Pros</h3>
                <p className="demo-card-tagline">
                  Reliable home services for Ottawa neighborhoods.
                </p>
                <p className="demo-card-status">Open Now</p>

                <dl className="demo-card-details">
                  <div className="detail-row">
                    <dt>Location</dt>
                    <dd>123 Mapleview Drive, Ottawa, ON</dd>
                  </div>

                  <div className="detail-row">
                    <dt>Phone</dt>
                    <dd>
                      <a href="tel:6135550199" className="contact-link">
                        (613) 555‑0199
                      </a>
                    </dd>
                  </div>

                  <div className="detail-row">
                    <dt>Website</dt>
                    <dd>
                      <a href="#" className="contact-link">
                        ottawahomepros.example
                      </a>
                    </dd>
                  </div>

                  <div className="detail-row">
                    <dt>Service Area</dt>
                    <dd>Ottawa & Nearby Neighborhoods</dd>
                  </div>
                </dl>

                <div className="demo-card-ctas">
                  <a href="tel:6135550199" className="demo-cta">
                    Call Now
                  </a>
                  <a href="#" className="demo-cta secondary">
                    Get a Quote
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* VALUE CHIPS */}
      <section className="features container">
        <div className="value-chips-row">
          <div className="value-chip">
            <div className="value-chip-inner">
              <div className="value-chip-label">SEO‑Optimized</div>
              <div className="value-chip-text">
                Rank higher in Ottawa local searches.
              </div>
            </div>
          </div>

          <div className="value-chip">
            <div className="value-chip-inner">
              <div className="value-chip-label">WCAG Accessible</div>
              <div className="value-chip-text">
                Structured, clean, readable design.
              </div>
            </div>
          </div>

          <div className="value-chip">
            <div className="value-chip-inner">
              <div className="value-chip-label">Mobile‑First</div>
              <div className="value-chip-text">
                Website access from any device and browser.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
