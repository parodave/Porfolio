import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorEffect from './components/CursorEffect';
import AgentIA from './components/AgentIA'; // ✅ Import du composant AgentIA

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
      <AgentIA />   {/* ✅ Affichage de l’agent IA juste avant le Footer */}
      <Footer />
    </div>
  );
}

export default App;
