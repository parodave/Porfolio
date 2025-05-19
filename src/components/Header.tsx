import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Accueil', href: '#hero' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Expérience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10 ${
        scrolled ? 'bg-darker/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold"
        >
          KH.
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8"
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </motion.nav>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
            display: isOpen ? 'flex' : 'none'
          }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 top-16 bg-darker flex-col items-center pt-10 z-40 md:hidden"
        >
          <div className="flex flex-col items-center space-y-8 w-full">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xl text-white hover:text-gray-300 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;