import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { pathname } = useLocation();
  const isCatalogPage = pathname === "/insights";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Daily Insights
        </Link>
        <nav className={styles.navigation}>
          <Link
            to={isCatalogPage ? "/insight/today" : "/insights"}
            className={styles.link}
          >
            {isCatalogPage ? "Інсайт дня" : "Каталог"}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
