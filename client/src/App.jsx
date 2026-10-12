import BackgroundGlow from "./components/BackgroundGlow";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <BackgroundGlow />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
