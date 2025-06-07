import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorEffect from "./components/CursorEffect";
import FloatingChat from "./components/FloatingChat"; // <--- ici seulement !

function App() {
  return (
    <div>
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
      <FloatingChat /> {/* Ne JAMAIS mettre AgentIA ailleurs que là */}
    </div>
  );
}
export default App;
