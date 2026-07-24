// lib/generateBlueskyPost.js

export function generateBlueskyPost(business) {
  const category = (business.category || "").toLowerCase();

  const emojiMap = {
    "pest-control": "🪳",
    plumber: "🔧",
    electrician: "⚡",
    hvac: "🌡",
    windows: "🪟",
    cleaning: "🧼",
    moving: "🚚",
    painting: "🎨",
  };

  const emoji = emojiMap[category] || "🏷";

  const nameLine = `${emoji} ${business.name}`;
  const handleLine = business.bsky_handle
    ? `@${business.bsky_handle}`
    : "@bizwebopt.bsky.social";

  const tagline = business.tagline_en || "";
  const phone = business.phone || "";
  const address = business.address || "";
  const website = business.website_url || "";
  const slug = business.slug || "";

  // Bluesky-safe URLs (no previews, but clickable)
  const directionsUrl = address
    ? `https://www.google.com/maps?q=${encodeURIComponent(address)}`
    : "";

  const detailUrl = slug
    ? `https://bizwebopt.ca/business/${slug}`
    : "";

  // Bluesky-friendly formatting
  const lines = [
    `${nameLine}`,
    `${handleLine}`,
    "",
    tagline,
    "",
    phone ? `📞 ${phone}` : "",
    address ? `📍 ${address}` : "",
    website ? `🌐 ${website}` : "",
    directionsUrl ? `➡️ ${directionsUrl}` : "",
    detailUrl ? `${detailUrl}` : "",
  ];

  return lines.filter(Boolean).join("\n");
}
