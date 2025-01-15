import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { useTranslations } from "next-intl";

export default async function Navbar({}) {
  const t = useTranslations("Navbar");

  return (
    <header className={styles.navbar}>
      <Link href="/">
        <picture>
          <Image
            src="https://cq0rr64ynnzymqt9.public.blob.vercel-storage.com/assets/casitaslogo-NEcdmOcZj2h7GXSyvcODmVzfsvzkPR.webp"
            alt="Logo Casitas"
            width={70}
            height={70}
          />
        </picture>
      </Link>
      <nav className={styles.navbarLeft}>
        <Link href="/rent">{t("rent")}</Link>
        <Link href="/sale">{t("sale")}</Link>
        <Link href="/agencies">{t("agencies")}</Link>
        <Link href="/featured">{t("featured")}</Link>
        <Link href="/map">{t("map")}</Link>
      </nav>
      <nav className={styles.navbarRight}>
        <Link className={styles.advertise} href="/advertise">
          {t("advertise")}
        </Link>
        <Link className={styles.login} href="/login">
          {t("login")}
        </Link>
      </nav>
    </header>
  );
}
