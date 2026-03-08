import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/writing", destination: "/insight" },
      { source: "/writing/:path*", destination: "/insight/:path*" },
    ];
  },
};

export default nextConfig;
