import type { Insight } from "../../types/insight";
import styles from "./InsightCatalog.module.css";
import { Link, useSearchParams } from "react-router-dom";
import FlowerIcon from "../../components/FlowerIcon/FlowerIcon";

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
      <div className={styles.navigation}>
        <Link className={styles.backLink} to="/">
          <FlowerIcon />
          На головну
        </Link>

        <Link className={styles.todayLink} to="/insight/today">
          Інсат дня
          <FlowerIcon />
        </Link>
      </div>
      <h2 className={styles.title}>Щоденні інсайти</h2>
      <p className={styles.subtitle}>
        Наші інсайти, які можуть стати й твоїми.
      </p>
      <ul className={styles.list}>
        {filteredInsights.map((insight) => (
          <li key={insight.id} className={styles.card}>
            <Link className={styles.cardContent} to={`/insight/${insight.id}`}>
              <h3 className={styles.cardTitle}>{insight.title}</h3>

              <p className={styles.description}>
                {insight.description.slice(0, 100)}...
              </p>
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
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InsightCatalog;
