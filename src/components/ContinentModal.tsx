'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { panelVariants } from '../animationVariants';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import type { Continent } from '../data/continents';

interface ContinentModalProps {
  continent: Continent | null;
  onClose: () => void;
  onViewProjects?: (continent: Continent) => void;
}

const ContinentModal: React.FC<ContinentModalProps> = ({
  continent,
  onClose,
  onViewProjects,
}) => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {continent && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key={continent.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={reduceMotion}
            variants={panelVariants}
            className="relative w-full max-w-md p-6 bg-white text-black rounded-lg dark:bg-zinc-900 dark:text-white"
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="mb-4 text-xl font-semibold text-center capitalize">
              {continent.name}
            </h2>

            {continent.image && (
              <img
                src={continent.image}
                alt={continent.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            {continent.description && (
              <p className="mb-4 text-sm text-center">{continent.description}</p>
            )}

            {onViewProjects && (
              <div className="text-center">
                <button
                  onClick={() => onViewProjects(continent)}
                  className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700"
                >
                  Voir les projets
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContinentModal;