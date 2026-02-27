import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Tech from "./components/Tech";
import ScrollProgress from "./components/ScrollProgress";

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Tech />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
