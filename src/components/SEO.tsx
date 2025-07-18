import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  titleKey: string;
  descriptionKey: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  titleKey,
  descriptionKey,
  image = '/vite.svg',
  url = typeof window !== 'undefined' ? window.location.href : ''
}) => {
  const { t } = useTranslation();
  const title = t(titleKey);
  const description = t(descriptionKey);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default SEO;
