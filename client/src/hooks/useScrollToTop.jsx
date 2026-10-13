import { useEffect } from "react";

export const useScrollToTop = (deps = []) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
