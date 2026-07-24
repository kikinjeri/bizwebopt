"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/client";
import "./homepage.css";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cardFade, setCardFade] = useState(false);

  // REAL-TIME SEARCH
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .or(
          [
            `name.ilike.%${trimmed}%`,
            `category.ilike.%${trimmed}%`,
            `website_url.ilike.%${trimmed}%`,
          ].join(","),
        )
        .order("name", { ascending: true });

      if (!error) setResults(data);
    };

    fetchResults();
  }, [query]);

  // CARD ANIMATION WHEN SELECTING A BUSINESS
  const handleSelect = (biz) => {
    setCardFade(true);
    setTimeout(() => {
      setSelected(biz);
      setCardFade(false);
    }, 180);
  };

  return (
    <main className="homepage">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-brand">BizWebOpt</div>
          <p className="navbar-subtitle">
            Ottawa’s Directory for Plumbers, Electricians & Home Repair
            Professionals
          </p>
        </div>

        <div className="navbar-links">
          <a className="nav-link" href="#">
            Home
          </a>
          <a className="nav-link" href="#">
            About
          </a>
          <a className="nav-link" href="#">
            Contact
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          {/* LEFT */}
          <div className="hero-copy">
            <h1 className="hero-title">Boosting Ottawa’s Local Businesses</h1>
            <p className="hero-subtitle">
              Give your business a modern, searchable digital card that helps
              local customers find you.
            </p>

            {/* REAL-TIME SEARCH BAR */}
            <div className="search-form">
              <input
                type="search"
                className="search-input"
                placeholder="Search for a service or business…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* LIVE RESULTS */}
              {results.length > 0 && (
                <ul className="search-results">
                  {results.map((biz) => (
                    <li
                      key={biz.id}
                      className="search-result-item"
                      onClick={() => handleSelect(biz)}
                    >
                      {biz.name} — {biz.category}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="cta-group">
              <a className="btn btn-primary" href="#">
                Get Started
              </a>
              <a className="btn btn-secondary" href="#">
                Learn More
              </a>
            </div>
          </div>

          {/* RIGHT: DYNAMIC CARD */}
          <article
            className={`demo-card ${cardFade ? "fade-out" : "fade-in"} ${selected?.card_theme || "dark"}`}
            style={{
              "--accent": selected?.card_accent_color || "#38bdf8",
            }}
          >
            <div className="demo-card-border">
              <div className="demo-card-inner">
                {/* NAME */}
                <h3 className="demo-card-title">
                  {selected?.name || "Ottawa Home Pros"}
                </h3>

                {/* TAGLINE */}
                <p className="demo-card-tagline">
                  {selected?.tagline_en ||
                    "Reliable home services for Ottawa neighborhoods."}
                </p>

                {/* STATUS */}
                <p className="demo-card-status">
                  {selected?.operating_status === "active"
                    ? "Open Now"
                    : "Closed"}
                </p>

                <dl className="demo-card-details">
                  {/* CATEGORY */}
                  <div className="detail-row">
                    <dt>Category</dt>
                    <dd>{selected?.category || "Home Services"}</dd>
                  </div>

                  {/* NEIGHBORHOOD */}
                  <div className="detail-row">
                    <dt>Neighborhood</dt>
                    <dd>{selected?.neighborhood || "Ottawa"}</dd>
                  </div>

                  {/* ADDRESS */}
                  <div className="detail-row">
                    <dt>Address</dt>
                    <dd>
                      {selected?.address || "123 Mapleview Drive, Ottawa, ON"}
                    </dd>
                  </div>

                  {/* PHONE */}
                  <div className="detail-row">
                    <dt>Phone</dt>
                    <dd>
                      <a
                        href={`tel:${selected?.phone || ""}`}
                        className="contact-link"
                      >
                        {selected?.phone || "(613) 555‑0199"}
                      </a>
                    </dd>
                  </div>

                  {/* WEBSITE */}
                  <div className="detail-row">
                    <dt>Website</dt>
                    <dd>
                      <a
                        href={selected?.website_url || "#"}
                        className="contact-link"
                      >
                        {selected?.website_url || "ottawahomepros.example"}
                      </a>
                    </dd>
                  </div>
                </dl>

                {/* CTAS */}
                <div className="demo-card-ctas">
                  <a href={`tel:${selected?.phone || ""}`} className="demo-cta">
                    Call Now
                  </a>

                  <a
                    href={selected?.website_url || "#"}
                    className="demo-cta secondary"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* VALUE CHIPS */}
      <section className="features">
        <div className="container value-chips-row">
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
