import React from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const GamePage = React.lazy(() => import("../pages/GamePage"));
const TestPage = React.lazy(() => import("../pages/testPage"));

const AppRoutes: React.FC = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  </React.Suspense>
);

export default AppRoutes;
