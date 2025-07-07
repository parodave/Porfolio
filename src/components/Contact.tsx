import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animationVariants';
import { useInView } from 'react-intersection-observer';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });



  return (
    <section id="contact" className="py-20 bg-light dark:bg-dark relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block relative">
              Contact
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-white"></span>
            </h2>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p>
                Vous avez un projet en tête ou une opportunité à me proposer ? 
                N'hésitez pas à me contacter. Je suis toujours ouvert aux nouvelles 
                collaborations et défis.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-gray-300 dark:border-white rounded-full flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <a
                      href="mailto:karim.hammouche1995@gmail.com"
                      className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      karim.hammouche1995@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-gray-300 dark:border-white rounded-full flex items-center justify-center">
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Réseaux</h3>
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
