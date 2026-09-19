import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import InsightCatalog from "./pages/InsightCatalog/InsightCatalog";
import SavedInsightsPage from "./pages/SavedInsightsPage/SavedInsightsPage";
import { insights } from "./data/insights/index";

const InsightPage = lazy(() => import("./pages/InsightPage/InsightPage"));

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/insights"
            element={<InsightCatalog insights={insights} />}
          />
          <Route path="/saved" element={<SavedInsightsPage />} />
          <Route
            path="/insight/:id"
            element={
              <Suspense fallback={null}>
                <InsightPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
