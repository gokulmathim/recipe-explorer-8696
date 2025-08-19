import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Using export for static output; image tags use <img> for simplicity.
  output: "export",
  images: {
    // Not used because we rely on standard <img>, but kept for future.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
