import { Link, useParams } from "react-router-dom";
import { insights } from "../../data/insights";

function InsightPage() {
  const { id } = useParams();
  const insight = insights.find((insight) => insight.id === id);

  if (!insight) {
    return (
      <section>
        <Link to="/">← Назад</Link>
        <h1>Інсайт не знайдено</h1>
      </section>
    );
  }

  return (
    <section>
      <Link to="/">← Назад</Link>

      <h1>{insight.title}</h1>

      <p>{insight.keywords.join(", ")}</p>

      <p>{insight.description}</p>

      <h2>Маленька дія</h2>
      <p>{insight.todo}</p>
    </section>
  );
}

export default InsightPage;
