import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
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
            {t('footer.rights', { year: new Date().getFullYear() })}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            aria-label={t('footer.backToTop')}
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;