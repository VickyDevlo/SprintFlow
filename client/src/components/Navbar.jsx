import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react"; // or "framer-motion", whichever you use
import { NAV_LINKS } from "../assets/assets";
import { MoveRight, TextAlignJustify, X } from "lucide-react";
import { useScrollToSection } from "../hooks/useScrollToSection";
import OpenFormModal from "./OpenFormModal";
import { useActiveSection } from "../hooks/useActiveSection";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [locked, setLocked] = useState(null);
  const { navigateToSection } = useScrollToSection();
  const IDS = NAV_LINKS.map(([id]) => id);

  const spy = useActiveSection(IDS);
  const active = locked ?? spy;
  const menuButtonRef = useRef(null);
  const pendingSectionRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const closeForm = useCallback(() => setIsFormOpen(false), []);

  const openForm = () => {
    setIsOpen(false);
    setIsFormOpen(true);
  };

  const handleClick = (id) => {
    navigateToSection(id);
    setLocked(id);
  };

  const handleMobileClick = (id) => {
    pendingSectionRef.current = id; // scroll after the drawer has closed
    closeMenu();
  };

  const handleFormSubmit = (data) => {
    console.log(data); // TODO: send to your API
  };

  // body scroll lock, Escape, resize, and deferred mobile navigation
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (!isOpen && pendingSectionRef.current) {
      const id = pendingSectionRef.current;
      pendingSectionRef.current = null;
      requestAnimationFrame(() => handleClick(id)); // body scroll is unlocked now
    }

    const onKey = (e) => e.key === "Escape" && isOpen && closeMenu();
    const onResize = () => window.innerWidth >= 768 && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // release the lock once the click-scroll has finished
  useEffect(() => {
    if (!locked) return;
    let idle;
    const fallback = setTimeout(() => setLocked(null), 1800);
    const onScroll = () => {
      clearTimeout(idle);
      idle = setTimeout(() => setLocked(null), 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(fallback);
      clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
    };
  }, [locked]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <nav className="max-w-full mx-auto w-full flex h-14 items-center justify-between gap-2 rounded-3xl md:rounded-full border border-border backdrop-blur pl-2 pr-2 sm:pl-3">
        <div
          onClick={() => handleClick("home")}
          className="flex cursor-pointer items-center gap-3 font-heading text-lg font-bold"
        >
          <span className="h-7 w-7 rounded-lg bg-linear-to-br from-gold to-coral" />
          SprintFlow
        </div>

        <ul className="hidden gap-8 text-muted md:flex">
          {NAV_LINKS.map(([id, label]) => (
            <li key={id}>
              <button
                onClick={() => navigateToSection(id)}
                className={`cursor-pointer transition hover:text-text ${
                  active === id ? "text-text" : ""
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={openForm}
          className="group hidden md:flex cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-5 py-2 font-bold text-bg transition-all duration-300 hover:brightness-110"
        >
          <span className="hidden lg:inline-block">Get Started</span>
          <MoveRight
            size={16}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </button>

        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="md:hidden p-1 border border-border rounded-md cursor-pointer"
        >
          <TextAlignJustify size={16} />
        </button>
      </nav>

      {/* Mobile drawer (outside <nav> so backdrop-blur doesn't trap fixed positioning) */}
      <div className="md:hidden">
        <div
          onClick={closeMenu}
          aria-hidden="true"
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <aside 
          aria-hidden={!isOpen}
          className={`fixed right-0 top-0 flex h-dvh w-72 max-w-[80%] flex-col bg-bg/40 p-6 shadow-2xl border-l border-border/40 backdrop-blur transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-end">
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="cursor-pointer p-1 hover:bg-white/5 rounded-full transition-all duration-300"
            >
              <X size={16} />
            </button>
          </div>

          <ul className="flex flex-col gap-2 text-muted">
            {NAV_LINKS.map(([id, label]) => (
              <li key={id}>
                <button
                  onClick={() => handleMobileClick(id)}
                  className={`w-full cursor-pointer rounded-lg px-3 py-3 text-left text-lg transition hover:bg-white/5 hover:text-text ${
                    active === id ? "bg-white/5 text-text" : ""
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={openForm}
            className="group mt-auto flex cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-5 py-2 font-bold text-bg transition-all duration-300 hover:brightness-110"
          >
            Get Started
            <MoveRight
              size={16}
              strokeWidth={3}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </button>
        </aside>
      </div>

      <OpenFormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />
    </header>
  );
};

export default Navbar;
