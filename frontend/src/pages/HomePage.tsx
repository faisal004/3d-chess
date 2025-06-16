import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">3D Chess</h1>
      <Button onClick={() => navigate('/game')}>Start Game</Button>
    </div>
  );
};

export default HomePage;
