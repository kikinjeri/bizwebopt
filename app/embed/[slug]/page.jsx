// app/embed/[slug]/page.jsx

import BusinessCard from "@/components/BusinessCard";
import loadBusiness from "@/lib/loadBusinesses";

export const revalidate = 60;

export default async function EmbedBusinessPage({ params }) {
  const { slug } = params;

  const businesses = await loadBusiness();
  const business = businesses.find((b) => b.slug === slug);

  if (!business) {
    return (
      <div
        style={{
          padding: "1rem",
          fontFamily: "system-ui, sans-serif",
          fontSize: "0.9rem",
        }}
      >
        Business not found.
      </div>
    );
  }

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        background: "transparent",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BusinessCard business={business} embed={true} />
    </div>
  );
}
