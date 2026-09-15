import Navbar from "./components/Navbar";
import { domMax, LazyMotion, MotionConfig } from "framer-motion";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Tech from "./components/Tech";
import { ScrollStateProvider } from "./hooks/ScrollStateProvider";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        <ScrollStateProvider>
          <div className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-white selection:text-black">
            <Navbar />
            <main>
              <Hero />
              <AboutMe />
              <Tech />
              <Projects />
              <Contact />
            </main>
          </div>
        </ScrollStateProvider>
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
