import { createNavigation } from "next-intl/navigation";

export const routing = {
  locales: ["es", "pt"],
  defaultLocale: "es",
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "/es/:path*",
        permanent: false,
      },
    ];
  },
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
