import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Car, Utensils } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  tags: string[];
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      title: 'Turfu Driving',
      description: 'Entreprise de location de véhicules avec système de gestion automatisé via CRM. Gestion complète de la flotte, des réservations et de la maintenance.',
      image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      icon: <Car size={24} />,
      tags: ['Entrepreneuriat', 'Gestion', 'CRM', 'Service client']
    },
    {
      title: '0\'240',
      description: 'Fast-food avec gestion totale : personnel, budget, approvisionnement et qualité client. Développement de l\'identité de marque et optimisation des processus.',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      icon: <Utensils size={24} />,
      tags: ['Restauration', 'Management', 'Marketing', 'Finance']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-dark relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projets</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez mes projets entrepreneuriaux et professionnels les plus significatifs.
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
              className="project-card group relative overflow-hidden border border-gray-800 bg-darker"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent opacity-90"></div>
              </div>
              
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mr-4">
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={24} />
                  </span>
                </div>
                
                <p className="text-gray-400 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-3 py-1 text-xs border border-gray-700 text-gray-300"
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