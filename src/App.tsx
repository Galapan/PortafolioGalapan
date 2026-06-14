import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Tech from "./components/Tech";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Tech />
        <Projects />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;
