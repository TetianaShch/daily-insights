import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import type { Insight } from "../../types/insight";

import styles from "./InsightCatalog.module.css";

type InsightCatalogProps = {
  insights: Insight[];
  title?: string;
  subtitle?: string;
};

function InsightCatalog({
  insights,
  title = "Щоденні інсайти",
  subtitle = "Наші інсайти, які можуть стати й твоїми.",
}: InsightCatalogProps) {
  const [searchParams] = useSearchParams();
  const activeKeyword = searchParams.get("tag");

  const [pagination, setPagination] = useState<{
    tag: string | null;
    count: number;
  }>({
    tag: null,
    count: 4,
  });

  const filteredInsights = activeKeyword
    ? insights.filter((insight) => insight.keywords.includes(activeKeyword))
    : insights;
  const visibleCount = pagination.tag === activeKeyword ? pagination.count : 4;

  const visibleInsights = filteredInsights.slice(0, visibleCount);

  const hasMore = visibleCount < filteredInsights.length;

  return (
    <section className={styles.catalog}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <ul className={styles.list}>
        {visibleInsights.map((insight) => (
          <li key={insight.id} className={styles.card}>
            <Link className={styles.cardContent} to={`/insight/${insight.id}`}>
              <h3 className={styles.cardTitle}>{insight.title}</h3>

              <p className={styles.description}>
                {insight.description.length > 100
                  ? `${insight.description.slice(0, 100)}...`
                  : insight.description}
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
      {hasMore && (
        <button
          className={styles.loadMoreButton}
          type="button"
          onClick={() =>
            setPagination({
              tag: activeKeyword,
              count: visibleCount + 4,
            })
          }
        >
          Показати ще
        </button>
      )}
    </section>
  );
}

export default InsightCatalog;
