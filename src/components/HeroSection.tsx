import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeSelector from './ResumeSelector';
import Spinner from './Spinner';

const RotatingCube = lazy(() => import('./RotatingCube'));

const texts = ['J\u2019apprends.', 'Je cr\u00e9e.', 'Je partage.'];

const HeroSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center py-20 px-6 gap-10 bg-white dark:bg-black transition-colors duration-500">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Je ne suis pas qu’un développeur.</h1>
        <div className="h-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={texts[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="block text-2xl text-gray-600 dark:text-gray-300"
            >
              {texts[index]}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            className="bg-zinc-800 text-white rounded-lg px-4 py-2 hover:bg-zinc-700 transition-colors"
            onClick={() =>
              window.open('https://krglobalsolutionsltd.com/', '_blank', 'noopener,noreferrer')
            }
          >
            Découvrir KR Global Solutions
          </button>
          <ResumeSelector />
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <Suspense fallback={<Spinner />}>
          <RotatingCube />
        </Suspense>
      </div>
    </section>
  );
};

export default HeroSection;
