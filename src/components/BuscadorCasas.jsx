"use client";
import { useState, useEffect } from "react";
import { casas } from "../utils/casas";
import styles from "./buscadorCasas.module.css";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useTranslations } from "next-intl";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const BuscadorCasas = ({ locale }) => {
  const [search, setSearch] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para la pantalla de carga
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();
  const t = useTranslations("Navbar");

  const placeholderText = {
    es: "Buscar por ubicación o ciudad",
    pt: "Buscar por localização ou cidade",
    default: "Search by location or city",
  };

  useEffect(() => {
    if (debouncedSearch.length < 2) {
      setSugerencias([]);
      return;
    }

    const searchLower = debouncedSearch.toLowerCase();
    const resultados = Array.from(
      new Set(
        casas
          .flatMap(({ ubicacion, ciudad }) => [ubicacion, ciudad])
          .filter((item) => item && item.toLowerCase().includes(searchLower))
      )
    );

    setSugerencias(resultados);
  }, [debouncedSearch]);

  const handleSearch = (value) => {
    if (value.trim()) {
      setIsLoading(true); // Activa el estado de carga
      router.push(`${locale}/resultados?ciudad=${value}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{t("slogan")}</h2>
      <p>{t("subSlogan")}</p>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder={placeholderText[locale] || placeholderText.default}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={() => handleSearch(search)}
          className={styles.searchButton}
        >
          <FaSearch />
        </button>
      </div>
      {sugerencias.length > 0 && (
        <div className={styles.suggestions}>
          {sugerencias.slice(0, 5).map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestionItem}
              onClick={() => handleSearch(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <span className={styles.spinner}></span>
        </div>
      )}
    </div>
  );
};

export default BuscadorCasas;
