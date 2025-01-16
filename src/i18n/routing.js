import { createNavigation } from "next-intl/navigation";

export const routing = {
  locales: ["es", "pt"],
  defaultLocale: "es",
  async redirects() {
    return [
      {
        source: "/:path*", // Captura todas las rutas
        destination: "/es/:path*", // Redirige todas las rutas a "/es"
        permanent: false, // Redirección temporal (302)
      },
    ];
  },
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
