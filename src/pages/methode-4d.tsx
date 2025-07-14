import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { beepAudio } from '../data/audio';

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Methode4D: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / total) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen py-20 bg-light dark:bg-dark text-black dark:text-white px-6 md:px-10 relative">
      <motion.div style={{ width: `${progress}%` }} className="fixed top-0 left-0 h-1 bg-blue-500 z-20" />
      <Link to="/blog" className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md z-20 shadow">
        Retour au blog
      </Link>
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto space-y-6"
      >
        <motion.h1 variants={itemVariant} className="text-3xl font-bold">
          Méthode 4D / 4D Method
        </motion.h1>
        <motion.p variants={itemVariant}>
          La méthode 4D aide à clarifier, déléguer, différer puis faire disparaître les tâches inutiles.
        </motion.p>
        <motion.p variants={itemVariant}>
          The 4D method helps clarify, delegate, defer and finally delete useless tasks.
        </motion.p>
        <motion.blockquote variants={itemVariant} className="border-l-4 border-blue-500 pl-4 italic">
          « Ce qui se conçoit bien s'énonce clairement » – Boileau
        </motion.blockquote>
        <motion.audio variants={itemVariant} controls src={beepAudio} className="w-full">
          Your browser does not support the audio element.
        </motion.audio>
        <motion.div variants={itemVariant} className="flex gap-4">
          <a
            href="/methode-4d-fr.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            PDF FR
          </a>
          <a
            href="/methode-4d-en.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            PDF EN
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Methode4D;
