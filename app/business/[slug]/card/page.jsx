// app/business/[slug]/page.jsx

import BusinessCard from "@components/BusinessCard";
import loadBusiness from "@lib/loadBusinesses";

export const revalidate = 60;

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ FIXED

  const businesses = await loadBusiness();
  const business = businesses.find((b) => b.slug === slug);

  if (!business) {
    return {
      title: "Business not found | BizWebOpt",
      description:
        "This business could not be found in the BizWebOpt directory.",
    };
  }

  const title = `${business.name} | ${business.category} in Ottawa`;
  const description =
    business.description ||
    `Learn more about ${business.name}, a ${business.category} serving Ottawa and surrounding areas.`;

  const url = `https://bizwebopt.ca/business/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_CA",
    },
  };
}

export default async function BusinessPage({ params }) {
  const { slug } = await params; // ✅ FIXED

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
    <section className="container">
      <BusinessCard business={business} embed={false} />
    </section>
  );
}
