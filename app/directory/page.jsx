// app/directory/page.jsx

import loadBusiness from "../../lib/loadBusinesses";
import Link from "next/link";

export default async function DirectoryPage() {
  const businesses = await loadBusiness();

  return (
    <section className="directory container">
      <h2 className="directory-title">Local Businesses</h2>

      <div className="directory-table">
        <div className="directory-header">
          <span>Name</span>
          <span>Type</span>
          <span>Address</span>
          <span>Neighborhood</span>
          <span></span>
        </div>

        {businesses.map((biz) => (
          <div key={biz.id} className="directory-row">
            <span className="directory-name">{biz.name}</span>
            <span className="directory-type">{biz.category}</span>
            <span className="directory-address">{biz.address}</span>
            <span className="directory-neighborhood">{biz.neighborhood}</span>

            {/* Updated to use slug instead of ID */}
            <Link className="directory-link" href={`/business/${biz.slug}`}>
              View →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
