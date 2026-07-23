"use client";

import { useState } from "react";
import Link from "next/link";
import "./directory.css"; // make sure this is imported

export default function DirectoryClient({ businesses }) {
  const [query, setQuery] = useState("");

  const filtered = businesses.filter((b) => {
    const q = query.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      (b.neighborhood || "").toLowerCase().includes(q) ||
      (b.address || "").toLowerCase().includes(q)
    );
  });

  const grouped = Object.entries(
    filtered.reduce((acc, b) => {
      const category = b.category.charAt(0).toUpperCase() + b.category.slice(1);
      acc[category] = acc[category] || [];
      acc[category].push(b);
      return acc;
    }, {}),
  ).sort(([a], [b]) => a.localeCompare(b));

  return (
    <section className="directory-container">
      <div className="directory-search">
        <input
          type="text"
          placeholder="Search by name, category, neighborhood, or address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {grouped.map(([category, items]) => (
        <section key={category} className="directory-category">
          <h2>{category}</h2>

          <ul>
            {items.map((b) => (
              <li key={b.slug} className="directory-item">
                <Link href={`/business/${b.slug}`} className="directory-name">
                  {b.name}
                </Link>

                <div className="directory-details">
                  {b.address && <span>{b.address}</span>}
                  {b.neighborhood && <span>{b.neighborhood}</span>}
                  {b.phone && (
                    <span>
                      <a href={`tel:${b.phone}`}>{b.phone}</a>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
