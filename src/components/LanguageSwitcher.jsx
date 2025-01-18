"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { SiGoogletranslate } from "react-icons/si";
import styles from "./languageSwitcher.module.css";
import { usePathname } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const handleChange = (newLocale) => {
    setIsOpen(false);
    router.push(`/${newLocale}/${pathname}?${searchParams}`);
  };

  return (
    <div className={styles.language_switcher}>
      {/* Botón con ícono */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.translate_button}
      >
        <SiGoogletranslate />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className={styles.langDropdown}>
          <ul>
            <li onClick={() => handleChange("pt")}>Português</li>
            <li onClick={() => handleChange("es")}>Español</li>
          </ul>
        </div>
      )}
    </div>
  );
}
