/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Resolve @/ aliases to ./src in all environments (including VERCEL=1
    // production builds where tsconfig path aliases are not picked up by
    // Next.js's built-in aliasing).
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes.
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // Restrictive but functional:
            // - scripts: self + inline (theme init via next-themes)
            // - styles: self + inline
            // - images: self + data: (inline placeholders/avatars)
            // - frame-ancestors: none (clickjacking defense, complements X-Frame-Options)
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
