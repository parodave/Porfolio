import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { projects } from '../data/projects'

interface SEOProps {
  titleKey?: string
  descriptionKey?: string
  image?: string
  url?: string
  canonical?: string
}

const SITE_URL = 'https://karimhammouche.com'

const SEO: React.FC<SEOProps> = ({
  titleKey,
  descriptionKey,
  image = '/vite.svg',
  url,
  canonical,
}) => {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  const lang = (i18n.language as 'fr' | 'en') || 'fr'
  const baseUrl = url || `${SITE_URL}${pathname}`
  const canonicalUrl = canonical || baseUrl
  const frUrl = `${baseUrl}?lang=fr`
  const enUrl = `${baseUrl}?lang=en`

  const title = titleKey ? t(titleKey) : 'Karim Hammouche – Portfolio'
  const description = descriptionKey ? t(descriptionKey) : 'Portfolio de Karim Hammouche, développeur créatif et entrepreneur.'

  // JSON-LD : données structurées Schema.org
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: 'Karim Hammouche | Portfolio',
    inLanguage: lang,
  }

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Karim Hammouche',
    url: SITE_URL,
  }

  const projectData = projects.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title[lang],
    description: p.description[lang],
    image: p.image,
    ...(p.url ? { url: p.url } : {}),
  }))

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang pour le multilingue */}
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:image" content={image} />

      {/* Langue et direction (RTL si arabe) */}
      <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />

      {/* Données structurées (JSON-LD) */}
      <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
      <script type="application/ld+json">{JSON.stringify(personData)}</script>
      {projectData.map((data, idx) => (
        <script key={projects[idx].id} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}

export default SEO
