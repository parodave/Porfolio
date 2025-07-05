import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Terminal, Figma, Database, Github, Settings, Users, Lightbulb, Brain, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: 'tech' | 'tools' | 'soft';
}

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    { name: 'HTML/CSS', icon: <Code size={28} />, category: 'tech' },
    { name: 'Ruby on Rails', icon: <Terminal size={28} />, category: 'tech' },
    { name: 'GitHub', icon: <Github size={28} />, category: 'tech' },
    { name: 'Figma', icon: <Figma size={28} />, category: 'tech' },
    { name: 'Web3', icon: <Database size={28} />, category: 'tech' },
    { name: 'CRM', icon: <Settings size={28} />, category: 'tools' },
    { name: 'Microsoft Office', icon: <Terminal size={28} />, category: 'tools' },
    { name: 'ChatGPT/IA', icon: <Brain size={28} />, category: 'tools' },
    { name: t('skills.softNames.autonomy'), icon: <Rocket size={28} />, category: 'soft' },
    { name: t('skills.softNames.rigor'), icon: <Settings size={28} />, category: 'soft' },
    { name: t('skills.softNames.initiative'), icon: <Lightbulb size={28} />, category: 'soft' },
    { name: t('skills.softNames.teamwork'), icon: <Users size={28} />, category: 'soft' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const filterSkills = (category: 'tech' | 'tools' | 'soft') => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section id="skills" className="py-20 bg-darker relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('skills.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-800">{t('skills.categories.tech')}</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {filterSkills('tech').map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="skill-icon flex flex-col items-center justify-center bg-dark border border-gray-800 p-6 rounded-md"
                >
                  <div className="text-white mb-3">{skill.icon}</div>
                  <span className="text-sm text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-800">{t('skills.categories.tools')}</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {filterSkills('tools').map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="skill-icon flex flex-col items-center justify-center bg-dark border border-gray-800 p-6 rounded-md"
                >
                  <div className="text-white mb-3">{skill.icon}</div>
                  <span className="text-sm text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-800">{t('skills.categories.soft')}</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {filterSkills('soft').map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="skill-icon flex flex-col items-center justify-center bg-dark border border-gray-800 p-6 rounded-md"
                >
                  <div className="text-white mb-3">{skill.icon}</div>
                  <span className="text-sm text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;