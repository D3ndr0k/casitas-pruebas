import { NextIntlClientProvider } from "next-intl";
import { redirect } from "next/navigation";

import "./globals.css";
import { Outfit } from "next/font/google";

const outfitFont = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Casitas",
  description:
    "Venta y alquiler de inmuebles la región | Abre la puerta a tu próximo hogar.",
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
    messages = {};
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
