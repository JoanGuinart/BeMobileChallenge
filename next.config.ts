import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.annihil.us", pathname: "/**" },
      { protocol: "http", hostname: "i.annihil.us", pathname: "/**" },
      { protocol: "https", hostname: "gateway.marvel.com", pathname: "/**" },
      { protocol: "http", hostname: "gateway.marvel.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
