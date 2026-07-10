import "./App.css";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import InsightCatalog from "./pages/InsightCatalog/InsightCatalog";
import InsightPage from "./pages/InsightPage/InsightPage";
import { insights } from "./data/insights/index";

function App() {
  return (
    <main className="app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/insights"
          element={<InsightCatalog insights={insights} />}
        />
        <Route path="/insight/:id" element={<InsightPage />} />
      </Routes>
    </main>
  );
}

export default App;
