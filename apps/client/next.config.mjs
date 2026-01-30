import { i18n } from "./i18n.config.mjs";

const nextConfig = {
  i18n,
  cleanDistDir: true,
  experimental: {
    webpackBuildWorker: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com", pathname: "**" },
      { protocol: "https", hostname: "cdn.discordapp.com", pathname: "**" },
      { protocol: "http", hostname: "localhost", pathname: "**" },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: process.env.API_URL + '/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
