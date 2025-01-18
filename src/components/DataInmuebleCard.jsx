// components/DataInmueble.js

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

// Supón que casasFiltradas es un array con todos los inmuebles
const casasFiltradas = [
  {
    precio: 150000,
    ubicacion: "Zona A",
    dormitorios: 3,
    baños: 2,
    superficieTotal: 120,
    patio: true,
    parillero: false,
    calefaccion: true,
    garage: true,
    piscina: true,
    paraMascotas: true,
    amueblado: false,
    image: "/casa1.jpg",
  },
  {
    precio: 200000,
    ubicacion: "Zona B",
    dormitorios: 4,
    baños: 3,
    superficieTotal: 200,
    patio: true,
    parillero: true,
    calefaccion: false,
    garage: true,
    piscina: false,
    paraMascotas: true,
    amueblado: true,
    image: "/casa2.jpg",
  },
  // Agrega más casas aquí
];

function DataInmueble() {
  const searchParams = useSearchParams();

  // Obtener los parámetros de la URL
  const minPriceFromUrl = parseInt(searchParams.get("minPrice"), 10) || 0;
  const maxPriceFromUrl =
    parseInt(searchParams.get("maxPrice"), 10) || Infinity;

  // Filtrar las casas según los parámetros minPrice y maxPrice
  const casasFiltradasPorPrecio = casasFiltradas.filter(
    (casa) => casa.precio >= minPriceFromUrl && casa.precio <= maxPriceFromUrl
  );

  return (
    <>
      <FilterBar />

      <section className={styles.contenDataCard}>
        {casasFiltradasPorPrecio.map((casa, index) => (
          <article key={index} className={styles.dataCard}>
            {/* Logo de la inmobiliaria */}
            <picture className={styles.logoInmobiliaria}>
              <Image
                src="https://cq0rr64ynnzymqt9.public.blob.vercel-storage.com/assets/logoInmobiliaria-sqPfve4cfKCj1QJOXbgpZC6UMGF5rF.jpg" // Cambia esto a tu logo real
                alt="Logo inmobiliaria"
                width={50}
                height={50}
              />
            </picture>

            {/* Imagen del inmueble */}
            <picture className={styles.fotoInmueble}>
              <Image
                src={casa.image || "/placeholder.jpg"} // Ruta de la imagen
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
                  {casa.patio && <GiHighGrass />}
                  {casa.parillero && <GiBarbecue />}
                  {casa.calefaccion && <PiThermometerHotFill />}
                  {casa.garage && <BiSolidCarGarage />}
                  {casa.piscina && <FaSwimmingPool />}
                  {casa.paraMascotas && <MdPets />}
                  {casa.amueblado && <FaCouch />}
                </span>
                {/* Botón de consulta */}
                <span className={styles.consult}>
                  <p>Consultar</p>
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default DataInmueble;
