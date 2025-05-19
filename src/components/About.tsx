import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const details = [
    { label: 'Nom', value: 'Karim Hammouche' },
    { label: 'Âge', value: '29 ans' },
    { label: 'Nationalité', value: 'Française' },
    { label: 'Actuellement', value: 'en Thaïlande (2025)' },
  ];

  return (
    <section id="about" className="py-20 bg-dark relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block relative">
              À propos de moi
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-white"></span>
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p>
                Passionné par la technologie et l'entrepreneuriat, j'ai commencé ma carrière comme électricien à la SNCF
                avant de me réorienter dans le développement web. Ce parcours atypique m'a permis d'acquérir une
                polyvalence et une capacité d'adaptation précieuses.
              </p>
              <p>
                Entrepreneur dans l'âme, j'ai fondé et géré plusieurs entreprises, dont une société de location de voitures 
                et un fast-food. Ces expériences m'ont appris à résoudre des problèmes complexes, à gérer des équipes et 
                à développer une vision stratégique.
              </p>
              <p>
                Récemment, j'ai travaillé pour Rino Recycling à Brisbane, où j'ai pu mettre à profit mes compétences 
                techniques et ma créativité au service de projets innovants.
              </p>
              <p className="italic border-l-4 border-white pl-4 py-2 mt-6">
                "Chaque projet que je touche est une opportunité d'aller plus loin que ce qu'on attend de moi."
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-darker p-8 border border-gray-800">
            <h3 className="text-2xl font-semibold mb-6">Infos personnelles</h3>
            
            <div className="space-y-4">
              {details.map((detail, index) => (
                <div key={index} className="flex border-b border-gray-800 pb-3">
                  <span className="w-1/3 font-medium">{detail.label}</span>
                  <span className="w-2/3 text-gray-400">{detail.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Parcours</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Ancien électricien (SNCF), technicien environnemental et agent de livraison</li>
                <li>Développeur web formé à Le Wagon Paris (2023)</li>
                <li>Entrepreneur: location de voitures et fast-food</li>
                <li>Expérience récente: Rino Recycling à Brisbane (nov. 2024 – avril 2025)</li>
              </ul>
            </div>

            <div className="mt-8">
              <a 
                href="/KHBResume.pdf" 
                download 
                className="inline-flex items-center border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300"
              >
                <span className="mr-2">📄</span> Télécharger mon CV
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;