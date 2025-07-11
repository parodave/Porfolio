import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../animationVariants';
import Typewriter from 'typewriter-effect';
import Cube3D from './Cube3D';
import ResumeSelector from './ResumeSelector';
import { useTranslation } from 'react-i18next';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const typewriterTexts = t('hero.typewriter', { returnObjects: true });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-10"
    >
      {/* 🌫️ Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-light to-light dark:from-dark dark:to-darker opacity-60"></div>
      </div>

      {/* 💬 Zone principale */}
      <div className="z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-3/5"
        >
          <motion.h2
            variants={itemVariants}
            className="text-sm md:text-base uppercase tracking-widest mb-4 text-gray-500 dark:text-gray-400"
          >
            Karim Hammouche
          </motion.h2>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 min-h-[3rem] mb-8"
          >
            {mounted && (
              reduceMotion ? (
                <span>{typewriterTexts[0]}</span>
              ) : (
                <div className="flex items-center">
                  <Typewriter
                    options={{
                      strings: typewriterTexts,
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </div>
              )
            )}
          </motion.div>

          {/* 🌐 Boutons et sélecteur */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() =>
                  window.open(
                    'https://krglobalsolutionsltd.com/',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
                className="bg-zinc-800 text-white rounded-lg px-4 py-2 hover:bg-zinc-700 transition-all"
              >
                Découvrir KR Global Solutions
              </button>

              <ResumeSelector />
            </div>
          </motion.div>
        </motion.div>

        {/* 🔲 Cube 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion ? 0 : 0.3,
            ease: 'easeOut',
          }}
          className="w-full md:w-2/5 flex justify-center md:justify-end"
        >
          <div className="relative w-64 h-64 animate-float">
            <Cube3D reduceMotion={reduceMotion} />
          </div>
        </motion.div>
      </div>

      {/* 🖱️ Animation scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: reduceMotion ? 0 : 1.2,
          duration: reduceMotion ? 0 : 0.8,
          ease: 'easeOut',
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-5 h-10 border-2 border-gray-500 dark:border-white rounded-full flex justify-center">
          <motion.div
            animate={reduceMotion ? { y: 0 } : { y: [0, 12, 0] }}
            transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.2 }}
            className="w-1 h-2 bg-gray-500 dark:bg-white rounded-full mt-2"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;
