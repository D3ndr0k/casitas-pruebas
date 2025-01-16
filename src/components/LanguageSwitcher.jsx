"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { SiGoogletranslate } from "react-icons/si";
import styles from "./languageSwitcher.module.css";

export default function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newLocale) => {
    setIsOpen(false);
    router.push(`/${newLocale}`);
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
