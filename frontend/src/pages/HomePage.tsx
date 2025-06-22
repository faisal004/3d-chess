import HeroSection from "@/components/homePage/hero-section";
import HowDoesWork from "@/components/homePage/how-does-work";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <HeroSection />
      <HowDoesWork />
    </div>
  );
};

export default HomePage;
