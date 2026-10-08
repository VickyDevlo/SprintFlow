import { useRef, useEffect, useState, useCallback } from "react";
import { NAV_LINKS } from "../assets/assets";
import { MoveRight, TextAlignJustify, X } from "lucide-react";
import { useScrollToSection } from "../hooks/useScrollToSection";
import OpenFormModal from "./OpenFormModal";

const Navbar = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { navigateToSection } = useScrollToSection();

  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const pendingSectionRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const closeForm = useCallback(() => setIsFormOpen(false), []);

  const openForm = () => {
    setIsMenuOpen(false); // no focus call here, the modal manages focus
    setIsFormOpen(true);
  };

  const handleMobileClick = (id) => {
    pendingSectionRef.current = id;
    closeMenu();
  };

  const handleFormSubmit = (data) => {
    console.log(data); // TODO: send to your API
  };

  // Single scroll lock for both the drawer and the modal
  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isFormOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isFormOpen]);

  // Scroll to the chosen section once the drawer has closed and scroll is unlocked
  // (must stay below the scroll-lock effect so it runs after it)
  useEffect(() => {
    if (!isMenuOpen && pendingSectionRef.current) {
      navigateToSection(pendingSectionRef.current);
      pendingSectionRef.current = null;
    }
  }, [isMenuOpen, navigateToSection]);

  // Drawer: focus the close button on open, close on Escape (only while open)
  useEffect(() => {
    if (!isMenuOpen) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <header className="fixed left-0 right-0 z-50 w-full">
      <nav className="mx-auto flex max-w-full items-center justify-between py-3 px-4 backdrop-blur shadow-lg border-b border-border/40">
        <div
          onClick={() => navigateToSection("home")}
          className="flex cursor-pointer items-center gap-3 font-heading text-lg font-bold"
        >
          <span className="h-7 w-7 rounded-lg bg-linear-to-br from-gold to-coral" />
          SprintFlow
        </div>

        <ul className="hidden gap-8 text-muted md:flex">
          {NAV_LINKS.map((navLink) => (
            <li key={navLink.id}>
              <button
                onClick={() => navigateToSection(navLink.id)}
                className={`cursor-pointer transition hover:text-text ${
                  activeSection === navLink.id ? "text-text" : ""
                }`}
              >
                {navLink.label}
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
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
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
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <aside
          inert={!isMenuOpen}
          className={`fixed right-0 top-0 flex h-dvh w-72 max-w-[80%] flex-col bg-bg/40 p-6 shadow-2xl border-l border-border/40 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-end">
            <button
              ref={closeButtonRef}
              onClick={closeMenu}
              aria-label="Close menu"
              className="cursor-pointer p-1 hover:bg-white/5 rounded-full transition-all duration-300"
            >
              <X size={16} />
            </button>
          </div>

          <ul className="flex flex-col gap-2 text-muted">
            {NAV_LINKS.map((navLink) => (
              <li key={navLink.id}>
                <button
                  onClick={() => handleMobileClick(navLink.id)}
                  className={`w-full cursor-pointer rounded-lg px-3 py-3 text-left text-lg transition hover:bg-white/5 hover:text-text ${
                    activeSection === navLink.id ? "bg-white/5 text-text" : ""
                  }`}
                >
                  {navLink.label}
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
