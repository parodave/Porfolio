import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

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
    emailjs.init("w2jrqSt-GwSCQR7zM");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    try {
      setLoading(true);
      setError('');
      
      const result = await emailjs.sendForm(
        'default_service', 
        'template_2isjmxk',
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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-8 border border-gray-800 bg-darker">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    className="w-full bg-dark border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    className="w-full bg-dark border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-dark border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    placeholder="Votre message..."
                  ></textarea>
                </div>
                
                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send size={18} className="mr-2" />
                      Envoyer le message
                    </span>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  En soumettant ce formulaire, vous acceptez que vos données soient utilisées uniquement pour que je puisse vous contacter.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;