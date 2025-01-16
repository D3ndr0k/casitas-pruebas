import { createNavigation } from "next-intl/navigation";

export const routing = {
  locales: ["es", "pt"], // Idiomas disponibles
  defaultLocale: "es", // Idioma por defecto
  routes: {
    "/": { es: "/", pt: "/pt" },
  },
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
