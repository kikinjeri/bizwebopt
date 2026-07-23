// components/BusinessCard.jsx

import Link from "next/link";

export default function BusinessCard({ business, embed = false }) {
  const neighborhood = business.neighborhood || "Ottawa";
  const categoryLabel = business.category || "Trade Professional";
  const tagline = business.tagline_en || "";
  const phone = business.phone || "";
  const website = business.website_url || "";
  const address = business.address || "";
  const slug = business.slug;

  const directionsUrl = address
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        address,
      )}`
    : "";

  const detailUrl = slug ? `/business/${slug}` : "#";

  return (
    <div className="business-card business-card-large">
      <div className="business-card-border">
        <div className="business-card-inner">
          {/* Header */}
          <div className="business-card-header">
            {/* Name → Website */}
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="business-card-title directory-link"
              >
                {business.name}
              </a>
            ) : (
              <h3 className="business-card-title">{business.name}</h3>
            )}

            {/* ⭐ Bold tagline */}
            <p className="business-card-tagline font-bold">{tagline}</p>

            <p className="business-card-category">
              {categoryLabel} · {neighborhood}
            </p>
          </div>

          {/* Details */}
          <div className="business-card-details">
            {address && (
              <p className="business-card-detail">
                <strong>Address:</strong>{" "}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directory-link"
                >
                  {address}
                </a>
              </p>
            )}

            {phone && (
              <p className="business-card-detail">
                <strong>Phone:</strong>{" "}
                <a href={`tel:${phone}`} className="directory-link">
                  {phone}
                </a>
              </p>
            )}

            {website && (
              <p className="business-card-detail">
                <strong>Website:</strong>{" "}
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directory-link"
                >
                  {website}
                </a>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="business-card-ctas">
            {detailUrl !== "#" && (
              <Link href={detailUrl} className="business-cta">
                View details
              </Link>
            )}

            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="business-cta secondary"
              >
                Directions
              </a>
            )}
          </div>

          {/* ⭐ New bottom-right credit */}
          {!embed && (
            <div className="business-card-credit text-right text-xs text-gray-500 mt-4">
              brought to you by BizWebOpt
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
