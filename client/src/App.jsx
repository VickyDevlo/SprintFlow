import { useEffect } from "react";
import { useSelector } from "react-redux";
import BackgroundGlow from "./components/BackgroundGlow";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import Workspace from "./pages/Workspace";
import WorkspaceNavbar from "./components/WorkspaceNavbar";
import { useScrollToTop } from "./hooks/useScrollToTop";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const activeId = useSelector((state) => state.projects.activeId);

  // Keep the address bar in sync with what is on screen
  useEffect(() => {
    const sync = () => {
      const { pathname } = window.location;

      if (!isAuthenticated) {
        if (pathname !== "/") window.history.replaceState(null, "", "/");
      } else if (!pathname.startsWith("/workspace")) {
        window.history.replaceState(null, "", "/workspace");
      }
    };

    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [isAuthenticated]);
  useScrollToTop([isAuthenticated, activeId]);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <BackgroundGlow />
      {isAuthenticated ? (
        <>
          <WorkspaceNavbar />
          <Workspace />
        </>
      ) : (
        <>
          <Navbar />
          <main>
            <Home />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
