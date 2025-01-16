import BuscadorCasas from "@/components/BuscadorCasas";
import Navbar from "../../components/Navbar";

export default async function HomePage({ params }) {
  const { locale } = await params;

  return (
    <div>
      <Navbar />
      <BuscadorCasas locale={locale} />
    </div>
  );
}
