import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = {
  locales: ["es", "pt"], // Idiomas disponibles
  defaultLocale: "es", // Idioma predeterminado
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
