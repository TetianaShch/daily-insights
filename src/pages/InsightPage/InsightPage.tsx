import { Link, useParams } from "react-router-dom";
import { insights } from "../../data/insights";
import styles from "./InsightPage.module.css";
import { getTodayInsight } from "../../utils/getTodayInsight";

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

  return (
    <section className={styles.page}>
      <Link className={styles.backLink} to="/">
        ← Назад
      </Link>

      <article className={styles.article}>
        <div className={styles.keywords}>
          {insight.keywords.map((keyword) => (
            <span className={styles.keyword} key={keyword}>
              {keyword}
            </span>
          ))}
        </div>

        <h1 className={styles.title}>{insight.title}</h1>

        <p className={styles.description}>{insight.description}</p>

        <section className={styles.action}>
          <p className={styles.actionLabel}>Маленька дія</p>
          <p>{insight.todo.replace("Маленька дія:", "").trim()}</p>
        </section>
      </article>
    </section>
  );
}

export default InsightPage;
