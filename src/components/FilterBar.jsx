// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import styles from "./filterBar.module.css";

// function FilterBar() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Obtener los valores iniciales de la URL
//   const initialMinPrice = parseInt(searchParams.get("minPrice"), 10) || 0;
//   const initialMaxPrice = parseInt(searchParams.get("maxPrice"), 10) || 0;
//   const initialBedrooms = searchParams.get("bedrooms")?.split(",") || [];
//   const initialCiudad = searchParams.get("ciudad") || "";

//   const [minPrice, setMinPrice] = useState(initialMinPrice);
//   const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
//   const [bedrooms, setBedrooms] = useState(initialBedrooms);
//   const [ciudad, setCiudad] = useState(initialCiudad);
//   const [loading, setLoading] = useState(false); // Estado para manejar el mensaje de "Aplicando filtros"

//   // Maneja los cambios en los inputs
//   const handlePriceChange = (setter) => (e) => {
//     const value = parseInt(e.target.value, 10);
//     setter(isNaN(value) ? 0 : value);
//   };

//   const handleBedroomsChange = (e) => {
//     const { value, checked } = e.target;
//     setBedrooms((prev) =>
//       checked ? [...prev, value] : prev.filter((bedroom) => bedroom !== value)
//     );
//   };

//   const handleCiudadChange = (e) => {
//     setCiudad(e.target.value);
//   };

//   // Actualiza la URL con los filtros aplicados
//   const applyFilters = () => {
//     setLoading(true); // Activar el estado de carga

//     // Validación de precio (si el mínimo es mayor al máximo, intercambiarlos)
//     if (minPrice > maxPrice) {
//       setMaxPrice(minPrice);
//     }

//     const query = new URLSearchParams();

//     if (minPrice > 0) query.set("minPrice", minPrice);
//     if (maxPrice > 0) query.set("maxPrice", maxPrice);
//     if (bedrooms.length > 0) query.set("bedrooms", bedrooms.join(","));
//     if (ciudad) query.set("ciudad", ciudad.trim());

//     router.push(`?${query.toString()}`);

//     setLoading(false); // Desactivar el estado de carga una vez aplicados los filtros
//   };

//   return (
//     <div className={styles.filterBar}>
//       {/* Filtro por precio */}
//       <div className={styles.filterSection}>
//         <label>Precio (USD):</label>
//         <input
//           type="number"
//           placeholder="Mínimo"
//           value={minPrice || ""}
//           onChange={handlePriceChange(setMinPrice)}
//           className={styles.inputField}
//         />
//         <span>-</span>
//         <input
//           type="number"
//           placeholder="Máximo"
//           value={maxPrice || ""}
//           onChange={handlePriceChange(setMaxPrice)}
//           className={styles.inputField}
//         />
//       </div>

//       {/* Filtro por dormitorios */}
//       <div className={styles.filterSection}>
//         <label>Dormitorios:</label>
//         <div className={styles.checkboxGroup}>
//           {["1", "2", "3", "4", "5+"].map((option) => (
//             <label key={option}>
//               <input
//                 type="checkbox"
//                 value={option}
//                 checked={bedrooms.includes(option)}
//                 onChange={handleBedroomsChange}
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Filtro por ciudad */}
//       <div className={styles.filterSection}>
//         <label>Ubicación:</label>
//         <input
//           type="text"
//           placeholder="Escribe la ciudad"
//           value={ciudad}
//           onChange={handleCiudadChange}
//           className={styles.inputField}
//         />
//       </div>

//       {/* Mensaje de carga */}
//       {loading && <p>Aplicando filtros...</p>}

//       {/* Botón para aplicar filtros */}
//       <button onClick={applyFilters} className={styles.applyButton}>
//         Aplicar Filtros
//       </button>
//     </div>
//   );
// }

// export default FilterBar;
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./filterBar.module.css";

function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtener los valores iniciales de la URL
  const initialMinPrice = parseInt(searchParams.get("minPrice"), 10) || 0;
  const initialMaxPrice = parseInt(searchParams.get("maxPrice"), 10) || 0;
  const initialBedrooms = searchParams.get("bedrooms")?.split(",") || [];
  const initialCiudad = searchParams.get("ciudad") || "";

  // Extra filtros
  const initialExtras = {
    patio: searchParams.get("patio") === "true",
    parillero: searchParams.get("parillero") === "true",
    piscina: searchParams.get("piscina") === "true",
    paraMascotas: searchParams.get("paraMascotas") === "true",
    amueblado: searchParams.get("amueblado") === "true",
    calefaccion: searchParams.get("calefaccion") === "true",
  };

  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [bedrooms, setBedrooms] = useState(initialBedrooms);
  const [ciudad, setCiudad] = useState(initialCiudad);
  const [extras, setExtras] = useState(initialExtras);
  const [loading, setLoading] = useState(false); // Estado para manejar el mensaje de "Aplicando filtros"

  // Maneja los cambios en los inputs
  const handlePriceChange = (setter) => (e) => {
    const value = parseInt(e.target.value, 10);
    setter(isNaN(value) ? 0 : value);
  };

  const handleBedroomsChange = (e) => {
    const { value, checked } = e.target;
    setBedrooms((prev) =>
      checked ? [...prev, value] : prev.filter((bedroom) => bedroom !== value)
    );
  };

  const handleCiudadChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleExtrasChange = (e) => {
    const { name, checked } = e.target;
    setExtras((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Actualiza la URL con los filtros aplicados
  const applyFilters = () => {
    setLoading(true); // Activar el estado de carga

    // Validación de precio (si el mínimo es mayor al máximo, intercambiarlos)
    if (minPrice > maxPrice) {
      setMaxPrice(minPrice);
    }

    const query = new URLSearchParams();

    if (minPrice > 0) query.set("minPrice", minPrice);
    if (maxPrice > 0) query.set("maxPrice", maxPrice);
    if (bedrooms.length > 0) query.set("bedrooms", bedrooms.join(","));
    if (ciudad) query.set("ciudad", ciudad.trim());

    // Añadir los extras a la URL si están seleccionados
    Object.keys(extras).forEach((key) => {
      if (extras[key]) query.set(key, "true");
    });

    router.push(`?${query.toString()}`);

    setLoading(false); // Desactivar el estado de carga una vez aplicados los filtros
  };

  return (
    <div className={styles.filterBar}>
      {/* Filtro por precio */}
      <div className={styles.filterSection}>
        <label>Precio (USD):</label>
        <input
          type="number"
          placeholder="Mínimo"
          value={minPrice || ""}
          onChange={handlePriceChange(setMinPrice)}
          className={styles.inputField}
        />
        <span>-</span>
        <input
          type="number"
          placeholder="Máximo"
          value={maxPrice || ""}
          onChange={handlePriceChange(setMaxPrice)}
          className={styles.inputField}
        />
      </div>

      {/* Filtro por dormitorios */}
      <div className={styles.filterSection}>
        <label>Dormitorios:</label>
        <div className={styles.checkboxGroup}>
          {["1", "2", "3", "4", "5+"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={bedrooms.includes(option)}
                onChange={handleBedroomsChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Filtro por ciudad */}
      <div className={styles.filterSection}>
        <label>Ubicación:</label>
        <input
          type="text"
          placeholder="Escribe la ciudad"
          value={ciudad}
          onChange={handleCiudadChange}
          className={styles.inputField}
        />
      </div>

      {/* Filtros de Extras */}
      <div className={styles.filterSection}>
        <label>Extras:</label>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="patio"
              checked={extras.patio}
              onChange={handleExtrasChange}
            />
            Patio
          </label>
          <label>
            <input
              type="checkbox"
              name="parillero"
              checked={extras.parillero}
              onChange={handleExtrasChange}
            />
            Parrillero
          </label>
          <label>
            <input
              type="checkbox"
              name="piscina"
              checked={extras.piscina}
              onChange={handleExtrasChange}
            />
            Piscina
          </label>
          <label>
            <input
              type="checkbox"
              name="paraMascotas"
              checked={extras.paraMascotas}
              onChange={handleExtrasChange}
            />
            Para Mascotas
          </label>
          <label>
            <input
              type="checkbox"
              name="amueblado"
              checked={extras.amueblado}
              onChange={handleExtrasChange}
            />
            Amueblado
          </label>
          <label>
            <input
              type="checkbox"
              name="calefaccion"
              checked={extras.calefaccion}
              onChange={handleExtrasChange}
            />
            Calefacción
          </label>
        </div>
      </div>

      {/* Mensaje de carga */}
      {loading && <p>Aplicando filtros...</p>}

      {/* Botón para aplicar filtros */}
      <button onClick={applyFilters} className={styles.applyButton}>
        Aplicar Filtros
      </button>
    </div>
  );
}

export default FilterBar;
