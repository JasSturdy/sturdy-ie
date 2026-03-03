import Link from "next/link";

const FOOTER_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Ventures", href: "/ventures" },
  { label: "Writings & Insights", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export function FooterSection() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(74, 110, 8, 0.95) 0%, rgba(45, 68, 5, 0.85) 30%, rgba(20, 30, 3, 0.9) 60%, #0a0a0a 100%)",
      }}
    >
      {/* Decorative gradient arcs — left */}
      <div className="pointer-events-none absolute -left-28 top-1/4 -translate-y-1/2">
        <svg
          width="280"
          height="320"
          viewBox="0 0 260 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="arcGradL1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D0F347" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c5f018" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="40" r="170" stroke="url(#arcGradL1)" strokeWidth="32" />
          <circle cx="60" cy="40" r="125" stroke="url(#arcGradL2)" strokeWidth="30" />
        </svg>
      </div>

      {/* Decorative gradient arcs — right */}
      <div className="pointer-events-none absolute -right-28 top-1/2 -translate-y-1/2">
        <svg
          width="340"
          height="350"
          viewBox="0 0 300 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="arcGradR1" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c5f018" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#739F21" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <circle cx="210" cy="160" r="120" stroke="url(#arcGradR1)" strokeWidth="32" />
          <circle cx="210" cy="160" r="85" stroke="url(#arcGradR2)" strokeWidth="20" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
        {/* Tagline */}
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-white md:text-base">
          Designing trusted environments for secure data collaboration,
          regulated innovation, and research partnerships
        </p>

        {/* Social icons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/60 text-zinc-300 transition hover:border-[#c5f018]/50 hover:text-[#c5f018]"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Nav links */}
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {FOOTER_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg bg-[#2a2d26] px-8 py-4 text-sm font-medium text-white transition hover:border-[#c5f018]/40 hover:text-[#c5f018]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Divider + copyright */}
        <div className="mt-12 border-t border-[rgba(219,255,73,0.9)]  pt-6">
          <p className="text-center text-sm text-white">
            Copyright &copy; Jason Sturdy
          </p>
        </div>
      </div>
    </footer>
  );
}
