import { useEffect, useState } from "react";

export const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting);
        if (entering.length) setActive(entering[entering.length - 1].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
