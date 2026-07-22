import { createServerClient } from "@/lib/supabase/server";
import Head from "next/head";

export default async function HomePage() {
  const supabase = createServerClient();
  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .limit(3);
  const demo = businesses?.[0] || null;

  const businessSchema = demo && {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: demo.name,
    telephone: demo.phone,
    url: `https://${demo.website}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ottawa",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: demo.areas,
    priceRange: "$$",
    description: `${demo.name} offers ${demo.services?.join(", ")} in ${demo.areas?.join(", ")}.`,
  };

  return (
    <>
      <Head>
        {demo && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
          />
        )}
      </Head>

      {/* --- HERO SECTION --- */}
      <section className="hero" role="banner">
        <div className="container">
          <h1 className="hero-title">
            Modern Business Cards for{" "}
            <span className="highlight">Ottawa&apos;s</span> Trade Professionals
          </h1>
          <p className="hero-subtitle">
            Accessible, SEO‑optimized digital presence that ranks on Google and
            works on every screen.
          </p>

          <div className="cta-group">
            <a href="/directory" className="btn btn-primary">
              Browse Directory
            </a>
            <a href="#business-info" className="btn btn-secondary">
              For Business Owners
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Built to Rank. Built to Convert.</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>SEO Optimized</h3>
              <p>
                JSON‑LD structured data and neighborhood tags ensure you appear
                for searches like “Pest Control in Kanata”.
              </p>
            </div>

            <div className="feature-card">
              <h3>WCAG Accessible</h3>
              <p>
                Semantic HTML, proper contrast, and screen‑reader friendly
                navigation ensure every customer can reach you.
              </p>
            </div>

            <div className="feature-card">
              <h3>Mobile First</h3>
              <p>
                Looks sleek on any device. One tap to call, one click to map.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEMO SECTION --- */}
      <section className="demo-section">
        <div className="container demo-layout">
          <div className="demo-text">
            <h2>See It In Action</h2>
            <p>
              Here is a live example of a <strong>Pest Control Ottawa</strong>{" "}
              card.
            </p>
            <ul>
              <li>One‑tap calling & mapping</li>
              <li>Structured data for Google ranking</li>
              <li>Clean, modern design that builds trust</li>
            </ul>
          </div>

          <div className="demo-card-wrapper">
            {demo ? (
              <div className="business-card">
                <h3>{demo.name}</h3>
                <p>Serving Ottawa & Area</p>

                <a href={`tel:${demo.phone}`} className="contact-link">
                  📞 {demo.phone}
                </a>

                <a
                  href={`https://${demo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  🌐 {demo.website}
                </a>

                <div className="card-section">
                  <h4>Services</h4>
                  <div className="tags">
                    {demo.services?.map((s, i) => (
                      <span key={i} className="badge">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-section">
                  <h4>Service Areas</h4>
                  <p>{demo.areas?.join(", ")}</p>
                </div>
              </div>
            ) : (
              <p>No featured businesses yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* --- BUSINESS INFO SECTION --- */}
      <section id="business-info" className="business-info">
        <div className="container">
          <h2>Cards that Direct Traffic to Your Business Website</h2>
          <p>
            BizWebOpt creates digital business cards that drive qualified
            traffic from Google directly to your services.
          </p>

          <div className="benefits-list">
            <div className="benefit-item">
              <strong>Local SEO Dominance:</strong> Neighborhood‑tagged
              services.
            </div>
            <div className="benefit-item">
              <strong>Zero‑Friction Contact:</strong> Clickable phone numbers
              and addresses.
            </div>
            <div className="benefit-item">
              <strong>Trust & Professionalism:</strong> Modern, accessible
              design.
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2026 BizWebOpt. Built for Ottawa&apos;s Trade Professionals.
          </p>
        </div>
      </footer>
    </>
  );
}
