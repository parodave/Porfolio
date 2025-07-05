import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const CursorEffect = lazy(() => import("./components/CursorEffect"));
const FloatingAgentIA = lazy(() => import("./components/FloatingAgentIA"));

function App() {
  return (
    <Suspense fallback={null}>
      <CursorEffect />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <FloatingAgentIA />
    </Suspense>
  );
}

export default App;
