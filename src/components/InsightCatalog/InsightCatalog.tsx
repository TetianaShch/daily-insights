import type { Insight } from "../../types/insight";
import styles from "./InsightCatalog.module.css";

type InsightCatalogProps = {
  insights: Insight[];
};

function InsightCatalog({ insights }: InsightCatalogProps) {
  return (
    <section className={styles.catalog}>
      <h2>Щоденні інсайти</h2>
      <p className={styles.subtitle}>
        Наші інсайти, які можуть стати й твоїми.
      </p>
      <ul className={styles.list}>
        {insights.map((insight) => (
          <li key={insight.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{insight.title}</h3>
            <p className={styles.keywords}>{insight.keywords.join(", ")}</p>
            <p className={styles.description}>
              {insight.description.slice(0, 100)}...
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InsightCatalog;
