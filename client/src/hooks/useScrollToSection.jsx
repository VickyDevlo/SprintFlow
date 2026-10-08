import { useCallback } from "react";

export const useScrollToSection = () => {
  const navigateToSection = useCallback((id) => {
    const path = id === "home" ? "/" : `/${id}`;

    window.history.pushState({}, "", path);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return { navigateToSection };
};
