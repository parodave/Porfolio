import React from 'react';
import { Twitter, Github, Linkedin, Globe, Handshake } from 'lucide-react';

const links = [
  { href: 'https://twitter.com/parodave', label: 'Twitter', Icon: Twitter },
  { href: 'https://github.com/parodave', label: 'GitHub', Icon: Github },
  { href: 'https://linkedin.com/in/karim-h-497634248', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://krglobalsolutionsltd.com/', label: 'KR Global Solutions', Icon: Globe },
  { href: 'https://www.fiverr.com/', label: 'Fiverr', Icon: Handshake },
];

const SocialLinks: React.FC = () => (
  <div className="flex gap-3">
    {links.map(({ href, label, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-5 h-5 text-white hover:opacity-80 transition rounded"
      >
        <Icon className="w-full h-full" />
      </a>
    ))}
  </div>
);

export default SocialLinks;
