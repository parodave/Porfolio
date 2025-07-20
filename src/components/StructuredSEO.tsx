import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'

const SITE_URL = 'https://karimhammouche.com'

export const getStructuredData = (lang: 'fr' | 'en') => {
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
    description: p.description[lang].join(' '),
    image: p.image,
    ...(p.url ? { url: p.url } : {}),
  }))

  return { websiteData, personData, projectData }
}

const StructuredSEO: React.FC = () => {
  const { i18n } = useTranslation()
  const lang = (i18n.language as 'fr' | 'en') || 'fr'

  const { websiteData, personData, projectData } = getStructuredData(lang)

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
  )
}

export default StructuredSEO
