import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const SocialLinks: React.FC = () => (
  <div className="flex space-x-4">
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
      href="https://github.com/parodave"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Github size={20} />
    </a>
  </div>
);

export default SocialLinks;
