import BuscadorCasas from "@/components/BuscadorCasas";
import Navbar from "../../components/Navbar";

export default async function HomePage() {
  return (
    <div>
      <Navbar />
      <BuscadorCasas />
    </div>
  );
}
