import "./App.css";
import InsightCatalog from "./components/InsightCatalog/InsightCatalog";
import { insights } from "./data/insights";

function App() {
  return (
    <main className="app">
      <InsightCatalog insights={insights} />
    </main>
  );
}

export default App;
