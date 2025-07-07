import React, { Suspense, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorEffect from "./components/CursorEffect";
import FloatingAgentIA from "./components/FloatingAgentIA"; // ✅ Assure-toi que ce fichier existe bien
import ScrollToHash from "./components/ScrollToHash";
const BlogPage = React.lazy(() => import("./components/BlogPage"));
const ArticlePage = React.lazy(() => import("./components/ArticlePage"));
import { Routes, Route } from "react-router-dom";
import i18n from "./i18n";

const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Contact />
  </main>
);

function App() {
  // Update the <html> lang attribute whenever the i18n language changes
  useEffect(() => {
    const updateLang = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    i18n.on("languageChanged", updateLang);
    updateLang(i18n.language);

    return () => {
      i18n.off("languageChanged", updateLang);
    };
  }, []);

  return (
    <div>
      <CursorEffect />
      <ScrollToHash />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingAgentIA /> {/* ✅ Ton agent IA est intégré ici */}
    </div>
  );
}

export default App;
