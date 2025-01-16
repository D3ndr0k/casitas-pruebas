"use client";
import { useState, useEffect } from "react";
import { casas } from "../utils/casas";
import styles from "./buscadorCasas.module.css";

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
  const debouncedSearch = useDebounce(search, 500);
  const [sugerencias, setSugerencias] = useState([]);

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      const results = casas.filter(
        (casa) =>
          (casa.ubicacion &&
            casa.ubicacion
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase())) ||
          (casa.ciudad &&
            casa.ciudad.toLowerCase().includes(debouncedSearch.toLowerCase()))
      );

      const ubicacionesYCiudades = [
        ...new Set(casas.flatMap((casa) => [casa.ubicacion, casa.ciudad])),
      ].filter(
        (item) =>
          item && item.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

      setSugerencias(ubicacionesYCiudades);
    } else {
      setSugerencias([]);
    }
  }, [debouncedSearch]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    router.push(`/resultados?search=${suggestion}`);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={
          locale === "es"
            ? "Buscar por ubicación o ciudad"
            : locale === "pt"
            ? "Buscar por localização ou cidade"
            : "Search by location or city"
        }
        value={search}
        onChange={handleSearchChange}
        className={styles.input}
      />

      {sugerencias.length > 0 && (
        <div className={styles.suggestions}>
          {sugerencias.slice(0, 5).map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuscadorCasas;
