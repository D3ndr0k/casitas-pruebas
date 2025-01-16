import { NextIntlClientProvider } from "next-intl";
import { redirect } from "next/navigation";

import "./globals.css";
import { Outfit } from "next/font/google";

const outfitFont = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Mi Aplicación Next.js",
  description: "Generado por create next app",
};

export default async function RootLayout({ children, params }) {
  let { locale } = await params;

  if (locale != "es" && locale != "pt") {
    redirect("/es/locationError");
  }

  console.log(locale);

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error cargando los mensajes para ${locale}:`, error);
    messages = {}; // Maneja el error de carga de los mensajes
  }

  return (
    <html lang={locale}>
      <body className={outfitFont.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
