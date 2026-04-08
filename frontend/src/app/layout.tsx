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
  title: "Data Governance, Regulatory & Infrastructure Advisor",
  description:
    "Portfolio of Jason Sturdy, focused on designing governance-led data infrastructure and secure, interoperable systems for regulated environments across healthcare, research, the public sector, and defence.",
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
        id="Cookiebot" 
        src="https://consent.cookiebot.com/uc.js" 
        data-cbid="ee0102fd-4311-48f9-aac3-468b2db99826" 
        data-blockingmode="auto" 
        type="text/javascript">
        </Script>
      </head>
      <body className={`${poppins.className} antialiased bg-black text-zinc-100`}>
        <div className="flex min-h-screen min-w-0 justify-center overflow-visible">
          {children}
        </div>
      </body>
    </html>
  );
}