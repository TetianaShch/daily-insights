import { Link } from "react-router-dom";
import styles from "./WelcomePage.module.css";

function WelcomePage() {
  return (
    <section className={styles.page}>
      <div className={styles.flower}>✿</div>

      <h1 className={styles.title}>Щоденні інсайти</h1>

      <p className={styles.subtitle}>
        Наші інсайти, які можуть стати й твоїми.
      </p>

      <div className={styles.actions}>
        <Link className={styles.primaryLink} to="/insight/today">
          Отримати інсайт дня
        </Link>

        <Link className={styles.secondaryLink} to="/insights">
          Переглянути всі інсайти
        </Link>
      </div>
    </section>
  );
}

export default WelcomePage;
