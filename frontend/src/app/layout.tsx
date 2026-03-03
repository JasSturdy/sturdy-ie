import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jason Sturdy | Data Governance & Regulatory Compliance Advisor",
  description:
    "Portfolio of Jason Sturdy, specialising in data governance, regulatory compliance, and secure data collaboration environments across highly regulated industries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-black text-zinc-100"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="flex min-h-screen min-w-0 justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
