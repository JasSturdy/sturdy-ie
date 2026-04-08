import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Data Governance, Regulatory & Infrastructure Advisor",
    template: "%s | Jason Sturdy",
  },
  description:
    "Portfolio of Jason Sturdy, focused on designing governance-led data infrastructure and secure, interoperable systems for regulated environments across healthcare, research, the public sector, and defence.",

  metadataBase: new URL("https://sturdy.ie"),

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "Jbnxwgs2BHeo_XhppZ98XCGBAumJNGFm624ZDpfjN0w",
  },

  openGraph: {
    title: "Data Governance, Regulatory & Infrastructure Advisor",
    description:
      "Portfolio of Jason Sturdy, focused on designing governance-led data infrastructure and secure, interoperable systems for regulated environments across healthcare, research, the public sector, and defence.",
    url: "https://sturdy.ie",
    siteName: "Jason Sturdy",
    images: [
      {
        url: "/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Jason Sturdy – Data Governance, Regulatory & Infrastructure Advisor",
      },
    ],
    locale: "en_IE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Data Governance, Regulatory & Infrastructure Advisor",
    description:
      "Portfolio of Jason Sturdy, focused on designing governance-led data infrastructure and secure, interoperable systems for regulated environments across healthcare, research, the public sector, and defence.",
    images: ["/preview-image.png"],
  },

  keywords: [
    "data governance",
    "regulatory advisor",
    "data infrastructure",
    "healthcare data",
    "defence data",
    "interoperable systems",
    "public sector",
    "Jason Sturdy",
  ],

  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jason Sturdy",
  url: "https://sturdy.ie",
  jobTitle: "Data Governance, Regulatory & Infrastructure Advisor",
  description:
    "Designing governance-led data infrastructure and secure, interoperable systems for regulated environments across healthcare, research, the public sector, and defence.",
  sameAs: [
    "https://linkedin.com/in/jasonsturdy", 
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/34b654d4ee9b7f955ddedf3c38fd9063/script.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${poppins.className} antialiased bg-black text-zinc-100`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex min-h-screen min-w-0 justify-center overflow-visible">
          {children}
        </div>
      </body>
    </html>
  );
}