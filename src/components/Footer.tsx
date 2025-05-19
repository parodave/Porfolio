import React from 'react';
import { Linkedin, Github, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-10 bg-darker border-t border-gray-800 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <p className="text-lg font-bold">KH.</p>
          <p className="text-gray-400 text-sm mt-2">
            &copy; {new Date().getFullYear()} Karim Hammouche. Tous droits réservés.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex space-x-4">
            <a 
              href="https://linkedin.com/in/karim-h-497634248" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/parodave" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Retour en haut"
          >
            <span>Haut de page</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;