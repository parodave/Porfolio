import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  image: string;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
}

const projects: Project[] = [
  {
    id: 'felizbella',
    image: 'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg',
    title: { en: 'FelizBella', fr: 'FelizBella' },
    description: {
      en: 'E-commerce and branding project for a natural cosmetics line. Design of the online store, brand identity, social media, and SEO.',
      fr: 'Projet e-commerce et image de marque pour une ligne de cosmétiques naturels. Design de la boutique en ligne, identité visuelle, réseaux sociaux et SEO.',
    },
  },
  {
    id: 'kr-global',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
    title: { en: 'KR Global Solutions LTD', fr: 'KR Global Solutions LTD' },
    description: {
      en: 'Entrepreneurial company offering tech, web, and e-commerce services. Co-founded and operated from the UK with full-stack dev, hosting, and automation expertise.',
      fr: "Entreprise entrepreneuriale proposant des services tech, web et e-commerce. Co-fondée et opérée depuis le Royaume-Uni, avec expertise en dev full-stack, hébergement et automatisation.",
    },
  },
  {
    id: 'khh-global',
    image: 'https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg',
    title: { en: 'KHH Global Projects', fr: 'KHH Global Projects' },
    description: {
      en: 'Personal initiative gathering experimental, cultural, and artistic side-projects. Prototyping, web hosting, design systems and storytelling.',
      fr: "Initiative personnelle rassemblant des projets expérimentaux, culturels et artistiques. Prototypage, hébergement web, systèmes de design et narration.",
    },
  },
  {
    id: 'domaine-harrach',
    image: 'https://images.pexels.com/photos/2161476/pexels-photo-2161476.jpeg',
    title: { en: 'Domaine Harrach', fr: 'Domaine Harrach' },
    description: {
      en: 'Associate in the creation of a local organic farming project. Digital presence setup, branding, storytelling, and e-commerce support.',
      fr: "Associé dans la création d’un projet agricole local et biologique. Mise en place de la présence digitale, branding, narration et accompagnement e-commerce.",
    },
  },
  {
    id: '0240',
    image: 'https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg',
    title: { en: "0'240", fr: "0'240" },
    description: {
      en: 'Associate in an eco-conscious streetwear project. Brand identity, Shopify setup, and launch strategy.',
      fr: "Associé dans un projet streetwear éco-responsable. Identité de marque, mise en place Shopify et stratégie de lancement.",
    },
  },
  {
    id: 'turfu-driving',
    image: 'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg',
    title: { en: 'Turfu Driving', fr: 'Turfu Driving' },
    description: {
      en: 'UX/UI and design support for a new driving school concept. Branding, web prototype and mobile-first approach.',
      fr: "Support UX/UI et design pour un concept innovant d’auto-école. Branding, prototype web et approche mobile-first.",
    },
  },
  {
    id: 'tlfh',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    title: { en: 'TLFH', fr: 'TLFH' },
    description: {
      en: 'Tech and visual consulting for a fashion platform. Branding, Shopify, and influencer integration.',
      fr: 'Conseil tech et visuel pour une plateforme de mode. Branding, Shopify et intégration influenceurs.',
    },
  },
  {
    id: 'wash-center',
    image: 'https://images.pexels.com/photos/96629/pexels-photo-96629.jpeg',
    title: { en: 'Wash Center', fr: 'Wash Center' },
    description: {
      en: 'Website redesign and SEO improvements for a local laundry service. Content architecture, copywriting and Google ranking strategy.',
      fr: 'Refonte de site et amélioration SEO pour un service de blanchisserie local. Architecture de contenu, rédaction et stratégie de référencement.',
    },
  },
];

const ProjectCardsGrid: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title[lang]}
          description={project.description[lang]}
          image={project.image}
          tags={[]}
        />
      ))}
    </div>
  );
};

export default ProjectCardsGrid;
