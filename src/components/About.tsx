import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animationVariants';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { resumeData } from '../data/resume';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });



  return (
    <section id="about" className="py-20 bg-dark relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block relative">
              {t('about.title')}
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-white"></span>
            </h2>

            <p className="text-gray-300 mb-6">{resumeData.summary}</p>

            <h3 className="text-xl font-semibold mb-2">Langues</h3>
            <ul className="list-disc pl-5 text-gray-300">
              {resumeData.languages.map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">Certifications</h3>
            <ul className="list-disc pl-5 text-gray-300">
              {resumeData.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-darker p-8 border border-gray-800">
            <h3 className="text-2xl font-semibold mb-6">Éducation</h3>
            <ul className="space-y-4">
              {resumeData.education.map((edu) => (
                <li key={edu.school} className="border-b border-gray-800 pb-3">
                  <p className="font-medium">{edu.school} - {edu.location}</p>
                  <p className="text-gray-400 text-sm">{edu.degree} ({edu.dates})</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
