import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const ProjectCardsGrid: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title[i18n.language as 'fr' | 'en']}
          description={project.description[i18n.language as 'fr' | 'en']}
          image={project.image}
          tags={project.tags}
          link={project.url}
        />
      ))}
    </div>
  );
};

export default ProjectCardsGrid;
