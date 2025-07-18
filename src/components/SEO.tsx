import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';

const WEBSITE_URL = 'https://karimhammouche.com';

const SEO: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language as 'fr' | 'en') || 'fr';

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: WEBSITE_URL,
    name: 'Karim Hammouche | Portfolio',
    inLanguage: lang,
  };

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Karim Hammouche',
    url: WEBSITE_URL,
  };

  const projectData = projects.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title[lang],
    description: p.description[lang],
    image: p.image,
    ...(p.url ? { url: p.url } : {}),
  }));

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
      <script type="application/ld+json">{JSON.stringify(personData)}</script>
      {projectData.map((data, idx) => (
        <script key={projects[idx].id} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
