// import Image from "next/image";
// import styles from "./page.module.css";
// import Navbar from "../../components/Navbar";

// export default function Home() {
//   return (
//     <>
//       <Navbar />
//     </>
//   );
// }
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
      <Navbar />
    </div>
  );
}
