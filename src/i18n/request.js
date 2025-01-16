import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = routing.locales.includes(requestLocale)
    ? requestLocale
    : routing.defaultLocale;

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch (error) {
    console.error(`Failed to load messages for ${locale}`);
    throw new Error(`No messages found for locale: ${locale}`);
  }
});
