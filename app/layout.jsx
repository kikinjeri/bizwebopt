import "./globals.css";
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
      <body>
        <main>{children}</main>
        <footer aria-label="Site footer">
          <p>&copy; 2026 BizWebOpt. Built for Ottawa’s Trade Professionals.</p>
        </footer>
      </body>
    </html>
  );
}
