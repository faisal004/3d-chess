import { Loader } from "lucide-react";
import React from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const GamePage = React.lazy(() => import("../pages/GamePage"));

const AppRoutes: React.FC = () => (
  <React.Suspense fallback={<div className="h-screen flex items-center justify-center">
    <Loader className="animate-spin"/>
  </div>}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  </React.Suspense>
);

export default AppRoutes;
