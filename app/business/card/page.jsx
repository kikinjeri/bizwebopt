// app/business/[slug]/card/page.jsx

import BusinessCard from "@components/BusinessCard";
import loadBusiness from "@lib/loadBusinesses";

export const revalidate = 60;

export default async function BusinessCardPreviewPage({ params }) {
  const { slug } = params;

  // Load all businesses
  const businesses = await loadBusiness();
  const business = businesses.find((b) => b.slug === slug);

  if (!business) {
    return (
      <section className="page-wrapper">
        <div className="not-found">Business not found.</div>
      </section>
    );
  }

  return (
    <section className="card-preview-wrapper">
      <div className="card-preview-container">
        <BusinessCard business={business} embed={true} />
      </div>
    </section>
  );
}
