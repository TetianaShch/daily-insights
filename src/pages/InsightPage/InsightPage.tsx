import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import FlowerBurst from "../../components/FlowerBurst/FlowerBurst";
import FlowerIcon from "../../components/FlowerIcon/FlowerIcon";
import Reflections from "../../components/Reflections/Reflections";

import { authors } from "../../data/authors";
import { insights } from "../../data/insights/index";

import { getInsightByDate } from "../../utils/getInsightByDate";

import Sidebar from "./Sidebar/Sidebar";

import styles from "./InsightPage.module.css";

function InsightPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { id } = useParams();

  const isTodayPage = id === "today";

  const formattedDate = selectedDate.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const insight = isTodayPage
    ? getInsightByDate(selectedDate)
    : insights.find((insight) => insight.id === id);

  if (!insight) {
    return (
      <section className={styles.page}>
        <Link className={styles.backLink} to="/insights">
          <FlowerIcon />
          Назад
        </Link>

        <h1 className={styles.title}>Інсайт не знайдено</h1>
      </section>
    );
  }

  const author = authors[insight.author];

  if (!author) {
    return null;
  }

  return (
    <section
      className={`${styles.page} ${isTodayPage ? styles.dailyPage : ""}`}
    >
      <div className={isTodayPage ? styles.dailyLayout : undefined}>
        {isTodayPage && (
          <Sidebar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        )}

        <article className={styles.article}>
          <div className={styles.articleContent}>
            <div className={styles.keywords}>
              {insight.keywords.map((keyword) => (
                <Link
                  className={styles.keyword}
                  key={keyword}
                  to={`/insights?tag=${encodeURIComponent(keyword)}`}
                >
                  {keyword}
                </Link>
              ))}
            </div>
            {isTodayPage && (
              <div className={styles.metaRow}>
                <p className={styles.date}>Інсайт дня · {formattedDate}</p>
                <span className={styles.saveIcon} aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M6 4.5h12v15l-6-3.5-6 3.5v-15Z" />
                  </svg>
                </span>
              </div>
            )}
            <h1 className={styles.title}>{insight.title}</h1>

            <div className={styles.authorRow}>
              <a
                className={styles.author}
                href={author.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                — {author.name}
                <span className={styles.username}> {author.username}</span>
              </a>
            </div>

            <p className={styles.description}>{insight.description}</p>

            <section className={styles.action}>
              <p className={styles.actionLabel}>
                <FlowerBurst />
                Маленька дія
              </p>

              <p>{insight.todo.replace("Маленька дія:", "").trim()}</p>
            </section>

            <Reflections insightId={insight.id} />
          </div>
        </article>
      </div>
    </section>
  );
}

export default InsightPage;
