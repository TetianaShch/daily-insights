import InsightCatalog from "../InsightCatalog/InsightCatalog";

import { insights } from "../../data/insights/index";

function SavedInsightsPage() {
  const savedIds: string[] = JSON.parse(
    localStorage.getItem("savedInsights") ?? "[]",
  );

  const savedInsights = insights.filter((insight) =>
    savedIds.includes(insight.id),
  );

  return (
    <InsightCatalog
      insights={savedInsights}
      title="Збережені інсайти"
      subtitle="Те, до чого хочеться повернутися."
    />
  );
}

export default SavedInsightsPage;
