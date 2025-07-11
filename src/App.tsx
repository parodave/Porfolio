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
import FloatingAgentIA from "./components/FloatingAgentIA";
import ScrollToHash from "./components/ScrollToHash";
const BlogPage = React.lazy(() => import("./components/BlogPage"));
const ArticlePage = React.lazy(() => import("./components/ArticlePage"));
import { Routes, Route } from "react-router-dom";
import i18n from "./i18n";

// 📈 Fonction pour initialiser Google Analytics
const initGA = (id: string) => {
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${id}`);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", id);
};

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
  // 🧠 Langue
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

  // 📊 Init Google Analytics uniquement en production (pas en localhost)
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      const GA_ID = import.meta.env.VITE_GA_ID;
      if (GA_ID) initGA(GA_ID);
    }
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
      <FloatingAgentIA />
    </div>
  );
}

export default App;
