// components/LandingLayout.jsx
import { Outlet } from "react-router";
import BackgroundGlow from "./BackgroundGlow";
import Navbar from "./Navbar";
import { useActiveSection } from "../hooks/useActiveSection";
import { NAV_LINKS } from "../assets/assets";
import Footer from "./Footer";

export default function LandingLayout() {
  const active = useActiveSection(NAV_LINKS.map((x) => x.id));
  return (
    <section className="relative min-h-screen overflow-hidden bg-bg px-4">
      <BackgroundGlow />
      <Navbar activeSection={active} />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </section>
  );
}
