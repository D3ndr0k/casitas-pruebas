"use client";
import { useRouter } from "next/router";
import { casas } from "../utils/casas"; // Asegúrate de que `casas` sea un array
import styles from "./resultadosBusqueda.module.css";

const ResultadosBusqueda = () => {
  const router = useRouter();
  const { search } = router.query; // Obtener el término de búsqueda desde la query

  // Filtrar casas en base al término de búsqueda
  const filteredCasas = casas.filter(
    (casa) =>
      casa.ubicacion.toLowerCase().includes(search?.toLowerCase()) ||
      casa.ciudad.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>Resultados para: "{search}"</h2>
      <div>
        {filteredCasas.length > 0 ? (
          filteredCasas.map((casa, index) => (
            <div key={index} className={styles.casaCard}>
              <h3 className={styles.casaTitle}>{casa.precio}</h3>
              <p className={styles.casaInfo}>Ubicación: {casa.ubicacion}</p>
              <p className={styles.casaInfo}>Ciudad: {casa.ciudad}</p>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default ResultadosBusqueda;
