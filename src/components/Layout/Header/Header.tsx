import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          Daily Insights
        </NavLink>
        <nav className={styles.navigation}>
          <NavLink
            to="/insights"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Каталог
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
