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
    <article
      className="business-card business-card-large"
      aria-labelledby={`business-name-${slug}`}
    >
      <div className="business-card-border">
        <div className="business-card-inner">
          {/* Header */}
          <header className="business-card-header">
            {website ? (
              <a
                id={`business-name-${slug}`}
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="business-card-title directory-link"
              >
                {business.name}
              </a>
            ) : (
              <h2 id={`business-name-${slug}`} className="business-card-title">
                {business.name}
              </h2>
            )}

            {tagline && (
              <p className="business-card-tagline font-bold">{tagline}</p>
            )}

            <p className="business-card-category">
              {categoryLabel} · {neighborhood}
            </p>
          </header>

          {/* Details */}
          <section className="business-card-details">
            {address && (
              <p className="business-card-detail">
                <strong>Address:</strong>{" "}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directory-link"
                  aria-label={`Get directions to ${business.name}`}
                >
                  {address}
                </a>
              </p>
            )}

            {phone && (
              <p className="business-card-detail">
                <strong>Phone:</strong>{" "}
                <a
                  href={`tel:${phone}`}
                  className="directory-link"
                  aria-label={`Call ${business.name} at ${phone}`}
                >
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
                  aria-label={`Visit ${business.name} website`}
                >
                  {website}
                </a>
              </p>
            )}
          </section>

          {/* Buttons */}
          <nav className="business-card-ctas" aria-label="Business actions">
            {detailUrl !== "#" && (
              <Link
                href={detailUrl}
                className="business-cta"
                aria-label={`View full details for ${business.name}`}
              >
                View details
              </Link>
            )}

            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="business-cta secondary"
                aria-label={`Get directions to ${business.name}`}
              >
                Directions
              </a>
            )}
          </nav>

          {!embed && (
            <footer className="business-card-credit text-right text-xs text-gray-500 mt-4">
              brought to you by BizWebOpt
            </footer>
          )}
        </div>
      </div>
    </article>
  );
}
