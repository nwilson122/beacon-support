import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Strict mode for better development experience
  reactStrictMode: true,

  // Production optimizations
  compress: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Allow Turbopack configuration (Next.js 16 default bundler)
  turbopack: {},

  // Suppress annoying development warnings from third-party libs
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
}

export default nextConfig
