// components/PriceFilter.js

"use client";

import { useSearchParams, useRouter } from "next/navigation"; // Para acceder y modificar los parámetros de la URL
import { useState } from "react";
import styles from "./dataInmuebleCard.module.css";

function PriceFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Obtener los parámetros de la URL
  const minPriceFromUrl = parseInt(searchParams.get("minPrice"), 10) || 0;
  const maxPriceFromUrl =
    parseInt(searchParams.get("maxPrice"), 10) || Infinity;

  // Estado para almacenar los precios actuales
  const [minPrice, setMinPrice] = useState(minPriceFromUrl);
  const [maxPrice, setMaxPrice] = useState(maxPriceFromUrl);

  // Función para actualizar la URL cuando cambian los precios
  const actualizarFiltrosEnUrl = (min, max) => {
    router.push(`?minPrice=${min}&maxPrice=${max}`);
  };

  // Función para manejar el cambio de los valores de precio al hacer clic en "Aplicar"
  const handlePriceChange = () => {
    actualizarFiltrosEnUrl(minPrice, maxPrice);
  };

  return (
    <div className={styles.filterInfo}>
      <p>
        Filtrado por precio:
        <input
          type="number"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(Math.max(0, parseInt(e.target.value, 10)))
          }
          className={styles.inputPrice}
        />{" "}
        -{" "}
        <input
          type="number"
          value={maxPrice === Infinity ? "" : maxPrice} // Si es infinito, mostrar vacío
          onChange={(e) =>
            setMaxPrice(Math.max(minPrice, parseInt(e.target.value, 10)))
          }
          className={styles.inputPrice}
        />
        <button onClick={handlePriceChange} className={styles.applyButton}>
          Aplicar
        </button>
      </p>
    </div>
  );
}

export default PriceFilter;
