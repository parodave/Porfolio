import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import { getStructuredData } from '../utils/structuredData'

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
