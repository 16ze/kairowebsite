/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  // Configuration des origines de développement autorisées
  // Cette configuration sera prise en compte dans les futures versions de Next.js
  experimental: {
    allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.149"],
  },
  // Configuration des headers de sécurité pour les requêtes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
