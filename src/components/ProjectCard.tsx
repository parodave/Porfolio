import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="project-card group relative overflow-hidden border border-gray-300 dark:border-gray-800 bg-white dark:bg-darker"
  >
    <div className="relative h-72 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 dark:from-darker to-transparent opacity-90" />
    </div>
    <div className="p-8 relative z-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={24} />
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-400 mb-6">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </a>
);

export default ProjectCard;

