export default function BusinessCard({ business }) {
  return (
    <div className="business-card">
      <div className="business-card-border">
        <div className="business-card-inner">
          <h3 className="business-card-title">{business.name}</h3>

          {business.tagline_en && (
            <p className="business-card-tagline">{business.tagline_en}</p>
          )}

          {business.category && (
            <p className="business-card-category">{business.category}</p>
          )}

          <div className="business-card-details">
            {business.address && (
              <p className="business-card-detail">
                <strong>Address:</strong> {business.address}
              </p>
            )}

            {business.phone && (
              <p className="business-card-detail">
                <strong>Phone:</strong> {business.phone}
              </p>
            )}

            {business.website_url && (
              <p className="business-card-detail">
                <strong>Website:</strong>{" "}
                <a href={business.website_url} target="_blank">
                  Visit site
                </a>
              </p>
            )}
          </div>

          <div className="business-card-ctas">
            {business.phone && (
              <a className="business-cta" href={`tel:${business.phone}`}>
                Call
              </a>
            )}

            {business.website_url && (
              <a
                className="business-cta secondary"
                href={business.website_url}
                target="_blank"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
