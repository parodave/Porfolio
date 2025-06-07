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
// import AgentIA from './components/AgentIA'; // ⛔️ On ne l’affiche plus en mode intégré
import FloatingChat from './components/FloatingChat'; // ✅ Widget Messenger

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
      {/* <AgentIA />  // ⛔️ Supprime ou commente cette ligne */}
      <Footer />
      <FloatingChat /> {/* ✅ Widget Messenger, affiché partout */}
    </div>
  );
}

export default App;
