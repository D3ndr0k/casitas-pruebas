// import "./globals.css";
// import { Outfit } from "next/font/google"; // Asegúrate de usar una mayúscula aquí
// import { NextIntlClientProvider } from "next-intl";
// import { getMessages } from "next-intl/server";
// import { redirect } from "next/navigation";
// import { routing } from "@/i18n/routing";

// export default async function LocaleLayout({ children, params }) {
//   const { locale } = params;

//   // Si no hay un 'locale' válido, redirige a la página '/es'
//   if (!locale || !routing.locales.includes(locale)) {
//     redirect("/es");
//     return null;
//   }

//   try {
//     const messages = await getMessages(locale);

//     return (
//       <html lang={locale}>
//         <body className={outfitFont.className}>
//           <NextIntlClientProvider messages={messages}>
//             {children}
//           </NextIntlClientProvider>
//         </body>
//       </html>
//     );
//   } catch (error) {
//     // Si hay un error al cargar los mensajes, redirige a la página '/es'
//     console.error("Error al cargar los mensajes:", error);
//     redirect("/es");
//     return null;
//   }
// }

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Outfit } from "next/font/google";

const outfitFont = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Casitas",
  description: "Venta y alquiler de inmuebles en Uruguay",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Si no hay un 'locale' válido, redirige a la página '/es'
  if (!locale || !routing.locales.includes(locale)) {
    redirect("/es");
    return null;
  }

  try {
    const messages = await getMessages(locale);

    return (
      <html lang={locale}>
        <body className={outfitFont.className}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    );
  } catch (error) {
    // Si hay un error al cargar los mensajes, redirige a la página '/es'
    console.error("Error al cargar los mensajes:", error);
    redirect("/es");
    return null;
  }
}
