import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import Cube3D from './Cube3D';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Textes animés par langue
  const typewriterTexts = t('hero.typewriter', { returnObjects: true }) as string[];

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-10"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-dark to-darker opacity-60"></div>
      </div>

      <div className="z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-3/5"
        >
          <motion.h2
            variants={itemVariants}
            className="text-sm md:text-base uppercase tracking-widest mb-4 text-gray-400"
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
            className="text-xl md:text-2xl text-gray-300 min-h-[3rem] mb-8"
          >
            {mounted && (
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
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <a
              href="#projects"
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 inline-block"
            >
              {t("hero.cta")}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full md:w-2/5 flex justify-center md:justify-end"
        >
          <div className="relative w-64 h-64 animate-float">
            <Cube3D />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-5 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white rounded-full mt-2"
          />
        </div>
        <p className="mt-2 text-sm text-gray-400">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;
