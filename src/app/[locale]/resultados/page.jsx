"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Para obtener los parámetros de búsqueda
import { casas } from "../../../utils/casas";

const ResultadosBusqueda = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search"); // Obtener el parámetro de búsqueda

  const [filteredCasas, setFilteredCasas] = useState([]);

  useEffect(() => {
    if (search) {
      const results = casas.filter(
        (casa) =>
          casa.ubicacion.toLowerCase().includes(search.toLowerCase()) ||
          casa.ciudad.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCasas(results);
    }
  }, [search]);

  return (
    <div>
      <h2>Resultados de búsqueda para: {search}</h2>
      {filteredCasas.length > 0 ? (
        filteredCasas.map((casa, index) => (
          <div key={index}>
            <h3>{casa.precio}</h3>
            <p>Ubicación: {casa.ubicacion}</p>
            <p>Ciudad: {casa.ciudad}</p>
          </div>
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default ResultadosBusqueda;
