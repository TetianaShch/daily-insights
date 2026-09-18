import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const isCatalogPage = pathname === "/insights";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Daily Insights
        </Link>
        <nav className={styles.navigation}>
          <Link to="/saved" className={styles.link}>
            Збережені
          </Link>
          <Link
            to={isCatalogPage ? "/insight/today" : "/insights"}
            className={styles.link}
          >
            {isCatalogPage ? "Інсайт дня" : "Каталог"}
          </Link>
          <button
            className={`${styles.themeToggle} ${
              theme === "dark" ? styles.dark : ""
            }`}
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Увімкнути темну тему"
                : "Увімкнути світлу тему"
            }
          >
            <span className={styles.sun} aria-hidden="true">
              ☀
            </span>

            <span className={styles.moon} aria-hidden="true">
              ☾
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
