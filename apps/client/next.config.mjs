import { i18n } from "./i18n.config.mjs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const json = require("./package.json");

/**
 * @template {import("next").NextConfig} T
 * @typedef {T}
 */
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
  // prettier-ignore
  images: { // start images
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**"
      },
    ]
  }, // end images
}; // end config

export default nextConfig;
