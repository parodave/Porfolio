import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle } from 'lucide-react';
import CompactContactForm from './CompactContactForm';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    try {
      setLoading(true);
      setError('');
      
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current
      );
      
      if (result.text === 'OK') {
        setSuccess(true);
        formRef.current.reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <section id="contact" className="py-20 bg-dark relative px-6 md:px-10">
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
            
            <div className="space-y-6 text-gray-300">
              <p>
                Vous avez un projet en tête ou une opportunité à me proposer ? 
                N'hésitez pas à me contacter. Je suis toujours ouvert aux nouvelles 
                collaborations et défis.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-400">karim.hammouche1995@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center">
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Réseaux</h3>
                    <a 
                      href="https://linkedin.com/in/karim-h-497634248" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                    {" | "}
                    <a 
                      href="https://github.com/parodave" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-gray-800 bg-darker">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
                <p className="text-gray-400">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <CompactContactForm
                formRef={formRef}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;