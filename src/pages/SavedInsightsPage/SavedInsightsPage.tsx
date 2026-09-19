import InsightCatalog from "../InsightCatalog/InsightCatalog";
import { Link } from "react-router-dom";

import FlowerIcon from "../../components/FlowerIcon/FlowerIcon";
import styles from "./SavedInsightsPage.module.css";

import { insights } from "../../data/insights/index";

function SavedInsightsPage() {
  const savedIds: string[] = JSON.parse(
    localStorage.getItem("savedInsights") ?? "[]",
  );

  const savedInsights = insights.filter((insight) =>
    savedIds.includes(insight.id),
  );

  if (savedInsights.length === 0) {
    return (
      <section className={styles.emptyPage}>
        <div className={styles.emptyState}>
          <div className={styles.flower}>
            <FlowerIcon />
          </div>

          <h1 className={styles.emptyTitle}>
            Тут поки немає збережених інсайтів.
          </h1>

          <Link className={styles.catalogLink} to="/insights">
            Перейти до каталогу
          </Link>
        </div>
      </section>
    );
  }

  return (
    <InsightCatalog
      insights={savedInsights}
      title="Збережені інсайти"
      subtitle="Те, до чого хочеться повернутися."
    />
  );
}

export default SavedInsightsPage;
