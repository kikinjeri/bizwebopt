// lib/generateBlueskyPost.js

export function generateBlueskyPost(business) {
  const category = business.category || "";
  const emoji =
    category === "pest-control"
      ? "🪳"
      : category === "plumber"
      ? "🔧"
      : category === "electrician"
      ? "⚡"
      : category === "hvac"
      ? "🌡"
      : category === "windows"
      ? "🪟"
      : category === "cleaning"
      ? "🧼"
      : category === "moving"
      ? "🚚"
      : category === "painting"
      ? "🎨"
      : "🏷";

  const nameLine = `${emoji} ${business.name}`;
  const handleLine = business.bsky_handle
    ? `@${business.bsky_handle}`
    : "@bizwebopt.bsky.social";

  const tagline = business.tagline_en || "";
  const phone = business.phone || "N/A";
  const address = business.address || "";
  const website = business.website_url || "";
  const slug = business.slug || "";
  const directionsUrl = address
    ? `https://www.google.com/maps?q=${encodeURIComponent(address)}`
    : "";
  const detailUrl = slug ? `https://bizwebopt.ca/business/${slug}` : "";

  return [
    nameLine,
    handleLine,
    "",
    tagline,
    "",
    `📞 Call: ${phone}`,
    address ? `📍 ${address}` : "",
    website ? `🌐 Visit: ${website}` : "",
    directionsUrl ? `➡️ Directions: ${directionsUrl}` : "",
    detailUrl ? `More info: ${detailUrl}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
