import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
}

const SITE_URL = 'https://karimhammouche.com'

const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()

  const basePath = `${SITE_URL}${pathname}`
  const canonicalUrl = canonical || basePath
  const frUrl = `${basePath}?lang=fr`
  const enUrl = `${basePath}?lang=en`

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={frUrl} hrefLang="fr" />
      <link rel="alternate" href={enUrl} hrefLang="en" />
      <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />
    </Helmet>
  )
}

export default SEO
