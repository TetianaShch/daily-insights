import { Link, useParams } from "react-router-dom";
import { insights } from "../../data/insights";
import { authors } from "../../data/authors";
import styles from "./InsightPage.module.css";
import { getTodayInsight } from "../../utils/getTodayInsight";
import FlowerBurst from "../../components/FlowerBurst/FlowerBurst";

function InsightPage() {
  const { id } = useParams();
  const insight =
    id === "today"
      ? getTodayInsight()
      : insights.find((insight) => insight.id === id);

  if (!insight) {
    return (
      <section className={styles.page}>
        <Link className={styles.backLink} to="/">
          ← Назад
        </Link>
        <h1 className={styles.title}>Інсайт не знайдено</h1>
      </section>
    );
  }

  const author = authors[insight.author];

  return (
    <section className={styles.page}>
      <Link className={styles.backLink} to="/">
        ← Назад
      </Link>

      <article className={styles.article}>
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

        <p className={styles.description}>{insight.description}</p>

        <section className={styles.action}>
          <p className={styles.actionLabel}>
            <FlowerBurst />
            Маленька дія
          </p>
          <p>{insight.todo.replace("Маленька дія:", "").trim()}</p>
        </section>
        <a
          className={styles.author}
          href={author.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          — {author.name}
          <span className={styles.username}> {author.username}</span>
        </a>
      </article>
    </section>
  );
}

export default InsightPage;
