import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants as defaultItemVariants } from '../animationVariants';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string; // <- rendu optionnel comme dans ProjectCard
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // ✅ Récupération localisée depuis les fichiers de traduction
  const rawProjects = t('projects.items', { returnObjects: true }) as Project[];
  const projects: Project[] = rawProjects;

  const itemVariants = {
    ...defaultItemVariants,
    hidden: { y: 30, opacity: 0 },
  };

  return (
    <section id="projects" className="py-20 bg-light dark:bg-dark relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('projects.title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                link={project.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
