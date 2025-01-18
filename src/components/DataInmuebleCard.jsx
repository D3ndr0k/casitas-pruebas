"use client";

import { useSearchParams } from "next/navigation"; // Para acceder a los parámetros de la URL
import FilterBar from "./FilterBar";
import styles from "./dataInmuebleCard.module.css";
import { GiHighGrass, GiBarbecue } from "react-icons/gi";
import { PiThermometerHotFill } from "react-icons/pi";
import { BiSolidCarGarage } from "react-icons/bi";
import { FaSwimmingPool, FaCouch } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import Image from "next/image";
import { casas } from "@/utils/casas";

// Función para limpiar el precio (quitar el simbolo de '$' y las comas)
const cleanPrice = (price) => {
  return parseInt(price.replace(/[^0-9.-]+/g, ""), 10);
};

function DataInmueble() {
  const searchParams = useSearchParams();

  // Obtener los parámetros de la URL
  const minPriceFromUrl = cleanPrice(searchParams.get("minPrice") || "0");
  const maxPriceFromUrl = cleanPrice(
    searchParams.get("maxPrice") || "999999999"
  );
  const ciudadFromUrl = searchParams.get("ciudad") || "";
  const bedroomsFromUrl = searchParams.get("bedrooms")
    ? searchParams.get("bedrooms").split(",")
    : [];

  // Obtener los filtros de extras desde la URL
  const patioFromUrl = searchParams.get("patio") === "true";
  const parilleroFromUrl = searchParams.get("parillero") === "true";
  const piscinaFromUrl = searchParams.get("piscina") === "true";
  const paraMascotasFromUrl = searchParams.get("paraMascotas") === "true";
  const amuebladoFromUrl = searchParams.get("amueblado") === "true";
  const calefaccionFromUrl = searchParams.get("calefaccion") === "true";

  // Filtrar las casas según los parámetros minPrice, maxPrice, ciudad, dormitorios y extras
  const casasFiltradas = casas.filter((casa) => {
    // Filtro por precio
    const price = cleanPrice(casa.precio);
    const withinPriceRange =
      price >= minPriceFromUrl && price <= maxPriceFromUrl;

    // Filtro por ciudad (insensible a mayúsculas y minúsculas)
    const matchesCiudad = ciudadFromUrl
      ? casa.ubicacion.toLowerCase().includes(ciudadFromUrl.toLowerCase())
      : true;

    // Filtro por dormitorios
    const matchesBedrooms =
      bedroomsFromUrl.length === 0 ||
      bedroomsFromUrl.includes(casa.dormitorios.toString());

    // Filtros de extras
    const matchesExtras =
      (!patioFromUrl || casa.extras.patio) &&
      (!parilleroFromUrl || casa.extras.parillero) &&
      (!piscinaFromUrl || casa.extras.piscina) &&
      (!paraMascotasFromUrl || casa.extras.paraMascotas) &&
      (!amuebladoFromUrl || casa.extras.amueblado) &&
      (!calefaccionFromUrl || casa.extras.calefaccion);

    return (
      withinPriceRange && matchesCiudad && matchesBedrooms && matchesExtras
    );
  });

  return (
    <>
      <FilterBar />

      <section className={styles.contenDataCard}>
        {casasFiltradas.length === 0 ? (
          <p>No se encontraron resultados</p>
        ) : (
          casasFiltradas.map((casa, index) => (
            <article key={index} className={styles.dataCard}>
              {/* Logo de la inmobiliaria */}
              <picture className={styles.logoInmobiliaria}>
                <Image
                  src="https://cq0rr64ynnzymqt9.public.blob.vercel-storage.com/assets/logoInmobiliaria-sqPfve4cfKCj1QJOXbgpZC6UMGF5rF.jpg"
                  alt="Logo inmobiliaria"
                  width={50}
                  height={50}
                />
              </picture>

              {/* Imagen del inmueble */}
              <picture className={styles.fotoInmueble}>
                <Image
                  src={casa.image || "/placeholder.jpg"}
                  alt={`Foto de ${casa.tipoDePropiedad}`}
                  width={200}
                  height={200}
                />
              </picture>

              {/* Información de la tarjeta */}
              <div className={styles.infoCard}>
                <h3>{casa.precio}</h3>
                <h6>{casa.ubicacion}</h6>
                <div>
                  <p>
                    {casa.dormitorios} Dorm. - {casa.baños} Baño -{" "}
                    {casa.superficieTotal} m²
                  </p>
                </div>
                <div>
                  {/* Iconos de características */}
                  <span>
                    {casa.extras.patio && <GiHighGrass />}
                    {casa.extras.parillero && <GiBarbecue />}
                    {casa.extras.calefaccion && <PiThermometerHotFill />}
                    {casa.extras.garage && <BiSolidCarGarage />}
                    {casa.extras.piscina && <FaSwimmingPool />}
                    {casa.extras.paraMascotas && <MdPets />}
                    {casa.extras.amueblado && <FaCouch />}
                  </span>
                  {/* Botón de consulta */}
                  <span className={styles.consult}>
                    <p>Consultar</p>
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </>
  );
}

export default DataInmueble;
