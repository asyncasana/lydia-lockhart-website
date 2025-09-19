import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  typescript: {
    // Ignore TypeScript errors in Sanity Studio folder during build
    ignoreBuildErrors: false,
  },
  typedRoutes: false,
};

export default nextConfig;
