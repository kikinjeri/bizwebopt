import BusinessCard from "@components/BusinessCard";
import loadBusiness from "@lib/loadBusinesses";

export const revalidate = 60;

export default async function BusinessPage({ params }) {
  const { slug } = await params;

  const businesses = await loadBusiness();

  // Debug logs (optional now)
  console.log("Businesses returned:", businesses.length);
  console.log(
    "Slugs:",
    businesses.map((b) => JSON.stringify(b.slug)),
  );
  console.log(
    "Statuses:",
    businesses.map((b) => JSON.stringify(b.status)),
  );

  const business = businesses.find((b) => b.slug === slug);

  if (!business) {
    return (
      <section className="page-wrapper">
        <div className="not-found">Business not found.</div>
      </section>
    );
  }

  return (
    <section className="container">
      <BusinessCard business={business} embed={false} />
    </section>
  );
}
