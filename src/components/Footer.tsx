import React from 'react';
import { ArrowUp } from 'lucide-react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-10 bg-darker border-t border-gray-800 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Colonne gauche */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="text-lg font-bold">KH.</p>
            <p className="text-gray-400 text-sm mt-2">
              &copy; {new Date().getFullYear()} Karim Hammouche. Tous droits réservés.
            </p>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a
              href="mailto:karim@karimhammouche.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Envoyer un email"
            >
              karim@karimhammouche.com
            </a>

            <SocialLinks />

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
      </div>
    </footer>
  );
};

export default Footer;
