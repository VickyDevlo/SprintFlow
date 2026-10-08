import { useEffect } from "react";
import { useParams } from "react-router";
import HeroSection from "../components/HeroSection";
import Tasks from "./Tasks";
import Collaboration from "./Collaboration";
import HowItWorks from "./HowItWorks";
import Tech from "./Tech";
import { CallToAction } from "../components/CallToAction";

export const Home = () => {
  const { section } = useParams();

  useEffect(() => {
    if (!section) return;
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  }, [section]);

  return (
    <>
      <HeroSection />
      <Tasks />
      <Collaboration />
      <HowItWorks />
      <Tech/>
      <CallToAction/>
    </>
  );
};
