import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname, headers } = req.nextUrl;

  // Obtener el idioma preferido del encabezado 'Accept-Language'
  const acceptLanguageHeader = headers?.get("accept-language");
  const language = acceptLanguageHeader
    ? acceptLanguageHeader.split(",")[0]
    : "es"; // Valor por defecto 'es'

  // Evitar redirigir si ya estamos en el idioma correcto
  if (pathname.startsWith(`/${language}`)) {
    return NextResponse.next(); // No hacer nada si ya estamos en el idioma correcto
  }

  // Redirigir solo si estamos en la página raíz o una URL no traducida
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${language}`, req.url)); // Redirigir a la página del idioma detectado
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(es|pt)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
