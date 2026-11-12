/** @type {import('next').NextConfig} */
const path = require("path")

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow optimized placeholder/source images for the gallery.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname)
    return config
  },
}

module.exports = nextConfig
