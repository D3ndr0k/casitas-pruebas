import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cq0rr64ynnzymqt9.public.blob.vercel-storage.com", // Agregar el dominio aquí
    ],
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
