import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { BsBag, BsSearch } from "react-icons/bs";
import { Inter } from "next/font/google";
import { useCartStore } from "@/store";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export function Layout({ children }: { children: React.ReactNode }) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const router = useRouter();

  const numberOfProducts = useCartStore((state) => state.numberOfProducts);

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
    if (!searchInputValue) {
      return;
    }
    router.push(`/search?q=${searchInputValue}`);
    setSearchInputValue("");
  }

  return (
    <div className={`${inter.variable} font-inter`}>
      <div className={styles.headerContainer}>
        <div className={styles.brandHeader}>
          <div className={styles.brandLinks}>
            <Link target="_blank" href="https://snowplow.io/">
              Help
            </Link>
            |
          </div>
          <div className={styles.brandLinks}>
            <Link target="_blank" href="https://snowplow.io/">
              Store locator
            </Link>
            |
          </div>
          <div className={styles.brandLinks}>
            <Link target="_blank" href="https://snowplow.io/">
              Sign up
            </Link>
          </div>
        </div>
        <header className={styles.header}>
          <div className={styles.headerLayout}>
            <div className={styles.logo}>
              <Link href="/" className={styles.logoLink}>
                <Image src="/logo.svg" width={36} height={32} alt="Logo" />
              </Link>
            </div>
            <div className={styles.prenav}>
              <nav>
                <div className={styles.preList}>
                  <ul className={styles.list}>
                    <li>
                      <Link href="/category">All</Link>
                    </li>
                    <li>
                      <Link href="/category/men-shoes">Men</Link>
                    </li>
                    <li>
                      <Link href="/category/women-shoes">Women</Link>
                    </li>
                    <li>
                      <Link href="/category/kid-shoes">Kids</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className={styles.postNav}>
              <div className={styles.searchContainer}>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    value={searchInputValue}
                    name="q"
                    id="searchInput"
                    placeholder="Search"
                    type="text"
                    onChange={(e) => setSearchInputValue(e.target.value)}
                  />
                  <button type="submit">
                    <BsSearch />
                  </button>
                </form>
              </div>
              <div className={styles.cartIndicator}>
                <Link href="/cart">
                  <BsBag />
                  {Boolean(numberOfProducts) && (
                    <div className={styles.cartQuantity}>
                      {numberOfProducts}
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
      <main className={styles.mainContent}>{children}</main>
      <div>
        <footer className={styles.footer}>
          <div className={styles.footerInternal}>
            <div className={styles.subFooter}>
              <div className={styles.copyright}>
                © 2023 Snowplow | All rights reserved
              </div>
              <div className={styles.policies}>
                <ul>
                  <li>
                    <a target="_blank" href="https://snowplow.io/">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://snowplow.io/">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
