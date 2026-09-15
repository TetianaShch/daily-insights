import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CalendarStrip from "../../components/CalendarStrip/CalendarStrip";
import { insights } from "../../data/insights/index";
import { authors } from "../../data/authors";
import styles from "./InsightPage.module.css";
import { getInsightByDate } from "../../utils/getInsightByDate";
import FlowerBurst from "../../components/FlowerBurst/FlowerBurst";
import FlowerIcon from "../../components/FlowerIcon/FlowerIcon";
import Reflections from "../../components/Reflections/Reflections";

function InsightPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();
  const insight =
    id === "today"
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
    <section className={styles.page}>
      <Link className={styles.backLink} to="/insights">
        <FlowerIcon />
        Назад
      </Link>
      <CalendarStrip
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
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
    </section>
  );
}

export default InsightPage;
