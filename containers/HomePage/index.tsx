import React from "react";
import AboutSection from "./AboutSection";
import Hero from "./Hero";
import WhySection from "./WhySection";

const HomePage = (): JSX.Element => {
  return (
    <>
      <Hero />
      <WhySection />
      <AboutSection />
    </>
  );
};

export default HomePage;
