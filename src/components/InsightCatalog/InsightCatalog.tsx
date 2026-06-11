import type { Insight } from "../../types/insight";
import styles from "./InsightCatalog.module.css";
import { Link, useSearchParams } from "react-router-dom";

type InsightCatalogProps = {
  insights: Insight[];
};

function InsightCatalog({ insights }: InsightCatalogProps) {
  const [searchParams] = useSearchParams();
  const activeKeyword = searchParams.get("tag");

  const filteredInsights = activeKeyword
    ? insights.filter((insight) => insight.keywords.includes(activeKeyword))
    : insights;

  return (
    <section className={styles.catalog}>
      <Link className={styles.backLink} to="/">
        ← Назад
      </Link>
      <h2>Щоденні інсайти</h2>
      <p className={styles.subtitle}>
        Наші інсайти, які можуть стати й твоїми.
      </p>
      <ul className={styles.list}>
        {filteredInsights.map((insight) => (
          <li key={insight.id} className={styles.card}>
            <Link className={styles.cardLink} to={`/insight/${insight.id}`}>
              <h3 className={styles.cardTitle}>{insight.title}</h3>
            </Link>

            <p className={styles.keywords}>
              {insight.keywords.map((keyword) => (
                <Link
                  key={keyword}
                  to={`/insights?tag=${encodeURIComponent(keyword)}`}
                  className={
                    keyword === activeKeyword
                      ? styles.activeKeyword
                      : styles.keywordLink
                  }
                >
                  {keyword}
                </Link>
              ))}
            </p>

            <Link className={styles.cardLink} to={`/insight/${insight.id}`}>
              <p className={styles.description}>
                {insight.description.slice(0, 100)}...
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InsightCatalog;
