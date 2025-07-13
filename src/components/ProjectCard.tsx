import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
}) => (
  <div className="group rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-darker transform transition-transform hover:scale-105">
    <div className="relative">
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={title}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowUpRight size={20} />
        </a>
      )}
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-300 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-700/50">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectCard;
