const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cq0rr64ynnzymqt9.public.blob.vercel-storage.com"],
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
