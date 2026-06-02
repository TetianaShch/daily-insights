import { useParams } from "react-router-dom";

function InsightPage() {
  const { id } = useParams();

  return <h1>Insight {id}</h1>;
}

export default InsightPage;
