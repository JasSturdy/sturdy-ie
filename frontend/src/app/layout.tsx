import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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
      <body className={`${poppins.className} antialiased bg-black text-zinc-100`}>
        <div className="flex min-h-screen min-w-0 justify-center overflow-visible">
          {children}
        </div>
      </body>
    </html>
  );
}
