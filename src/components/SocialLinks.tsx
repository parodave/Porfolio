import React from 'react';
import { Twitter, Github, Linkedin, Globe, Handshake } from 'lucide-react';

const SocialLinks: React.FC = () => (
  <div className="flex space-x-4">
    <a
      href="https://twitter.com/parodave"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Twitter size={20} />
    </a>
    <a
      href="https://github.com/parodave"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Github size={20} />
    </a>
    <a
      href="https://linkedin.com/in/karim-h-497634248"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Linkedin size={20} />
    </a>
    <a
      href="https://krglobalsolutionsltd.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="KR Global Solutions"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Globe size={20} />
    </a>
    <a
      href="https://www.fiverr.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fiverr"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Handshake size={20} />
    </a>
  </div>
);

export default SocialLinks;
