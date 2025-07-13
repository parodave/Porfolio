import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants as defaultItemVariants } from '../animationVariants';
import { useInView } from 'react-intersection-observer';
import {
  ArrowUpRight,
  Car,
  Utensils,
  Globe,
  Brush,
  Home,
  Leaf,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

interface Project {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  tags: string[];
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectIcons = [
    <Globe size={24} />,
    <Brush size={24} />,
    <Home size={24} />,
    <Leaf size={24} />,
    <Truck size={24} />,
    <Sparkles size={24} />,
    <Car size={24} />,
    <Utensils size={24} />,
  ];
  const projectKeys = [
    'kr',
    'felizbella',
    'realestate',
    'rino',
    'logistics',
    'cleaning',
    'rental',
    'restaurant',
  ];

  const projects: Project[] = projectKeys.map((key, idx) => ({
    title: t(`projects.${key}.title`),
    description: t(`projects.${key}.description`),
    image: `https://via.placeholder.com/600x400?text=${key}`,
    tags: [],
    icon: projectIcons[idx % projectIcons.length],
  }));

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
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="project-card group relative overflow-hidden border border-gray-300 dark:border-gray-800 bg-white dark:bg-darker"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 dark:from-darker to-transparent opacity-90"></div>
              </div>
              
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mr-4">
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={24} />
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-400 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
