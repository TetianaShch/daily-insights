import "./App.css";
import { Routes, Route } from "react-router-dom";

import InsightCatalog from "./components/InsightCatalog/InsightCatalog";
import { insights } from "./data/insights";
import InsightPage from "./pages/InsightPage/InsightPage";

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<InsightCatalog insights={insights} />} />
        <Route path="/insight/:id" element={<InsightPage />} />
      </Routes>
    </main>
  );
}

export default App;
