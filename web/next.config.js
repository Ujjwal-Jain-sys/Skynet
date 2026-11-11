/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_ENGINE_URL || "http://localhost:3001"}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig