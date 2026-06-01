import type { Insight } from "../../types/insight";

type InsightCatalogProps = {
  insights: Insight[];
};

function InsightCatalog({ insights }: InsightCatalogProps) {
  return (
    <div className="insight-catalog">
      <h2>Інсайти на кожен день</h2>
      <ul>
        {insights.map((insight) => (
          <li key={insight.id}>
            <h3>{insight.title}</h3>
            <p>{insight.keywords.join(", ")}</p>
            <p>{insight.description.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InsightCatalog;
