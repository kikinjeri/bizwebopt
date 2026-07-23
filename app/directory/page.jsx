import DirectoryClient from "./DirectoryClient";
import loadBusiness from "../../lib/loadBusinesses";

export default async function DirectoryPage() {
  const businesses = await loadBusiness(); // server-side
  const categories = [...new Set(businesses.map((b) => b.category))].sort();
  const neighborhoods = [
    ...new Set(businesses.map((b) => b.neighborhood || "Ottawa")),
  ].sort();

  return (
    <DirectoryClient
      businesses={businesses}
      categories={categories}
      neighborhoods={neighborhoods}
    />
  );
}
