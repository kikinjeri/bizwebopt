import "./globals.css";
import "./homepage.css";
import Link from "next/link";

export const metadata = {
  title: "BizWebOpt | Ottawa Trade Professionals",
  description:
    "SEO-optimized digital business cards for Ottawa’s trade professionals.",
  keywords: [
    "Ottawa plumbers",
    "electricians",
    "roofers",
    "Kanata",
    "Nepean",
    "Stittsville",
    "Barrhaven",
    "Orleans",
    "HVAC Ottawa",
    "handyman Ottawa",
  ],
  openGraph: {
    title: "BizWebOpt | Ottawa Trade Professionals",
    description: "Accessible, mobile-first business cards for local trades.",
    url: "https://bizwebopt.ca",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD for the website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BizWebOpt",
              url: "https://bizwebopt.ca",
              description:
                "SEO-optimized digital business cards for Ottawa’s trade professionals.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://bizwebopt.ca/directory?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body>
        <nav className="navbar">
          <div>
            <div className="navbar-brand">BizWebOpt</div>
            <div className="navbar-subtitle">
              Ottawa’s Directory for Plumbers, Electricians & Home Repair
              Professionals
            </div>
          </div>

          <div className="navbar-links">
            <Link className="nav-link" href="/">
              Home
            </Link>
            <Link className="nav-link" href="/directory">
              Directory
            </Link>
            <Link className="nav-link" href="#">
              About
            </Link>
            <Link className="nav-link" href="#">
              Contact
            </Link>
          </div>
        </nav>

        <main>{children}</main>

        <footer aria-label="Site footer">
          <p>&copy; 2026 BizWebOpt. Built for Ottawa’s Trade Professionals.</p>
        </footer>
      </body>
    </html>
  );
}
