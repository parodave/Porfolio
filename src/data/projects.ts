export interface Project {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  image: string;
  tags: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    id: 'kr',
    title: { fr: 'KR Global Solutions', en: 'KR Global Solutions' },
    description: {
      fr: `Co-fondateur de KR Global Solutions LTD, société tech spécialisée dans le développement SaaS, l’e-commerce et l’IA. Je crée des outils web sur mesure, automatise les processus métiers et accompagne la transformation digitale. Je développe également mes propres marques en ligne via KR Global.

Expertises : Développement SaaS · E-commerce (Shopify, WooCommerce) · Intégration IA & API · No-code/Low-code · Full-stack (HTML, CSS, JS) · UX/UI · Lancement de produits · Stratégie digitale & hébergement`,
      en: `Co-founder of KR Global Solutions LTD, a tech company specializing in SaaS, e-commerce, and AI development. I design custom web tools, automate business processes, and support digital transformation. I also launch my own online brands under KR Global.

Key skills: SaaS Development · E-commerce (Shopify, WooCommerce) · AI & API Integration · No-code/Low-code · Full-stack (HTML, CSS, JS) · UX/UI Design · Product Launch · Digital Strategy & Hosting`,
    },
    image: 'https://images.pexels.com/photos/6693638/pexels-photo-6693638.jpeg',
    tags: ['SaaS', 'E-commerce', 'Automation', 'IT'],
  },
  {
    id: 'felizbella',
    title: { fr: 'FelizBella', en: 'FelizBella' },
    description: {
      fr: `Co-fondateur de FelizBella, marque de cosmétiques naturels vendue en ligne. J’ai piloté le branding, la boutique e-commerce et la stratégie marketing.

Expertises : Création de marque (naming, design) · Développement e-commerce (Shopify, WooCommerce) · SEO · Réseaux sociaux · Suivi performance · Gestion client & logistique`,
      en: `Co-founder of FelizBella, a natural cosmetics brand sold online. I led branding, e-commerce development, and digital marketing strategy.

Key skills: Brand Creation (naming, design) · E-commerce (Shopify, WooCommerce) · SEO · Social Media · Performance Tracking · Customer & Logistics Management`,
    },
    image: 'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg',
    tags: ['Cosmetics', 'Shopify', 'Branding', 'Marketing'],
  },
  {
    id: 'khh',
    title: { fr: 'KHH Global Projects', en: 'KHH Global Projects' },
    description: {
      fr: `Co-fondateur d'une société de locations Airbnb au Maroc. Je gère deux biens à distance via des outils automatisés pour maximiser la rentabilité, tout en développant un portefeuille immobilier durable et conforme aux normes locales.`,
      en: `Co-founder of a property rental company in Morocco. I remotely manage two Airbnb units using automation tools to improve profitability and grow a compliant and sustainable real estate portfolio.`,
    },
    image: 'https://images.pexels.com/photos/21273694/pexels-photo-21273694.jpeg',
    tags: ['Real Estate', 'Airbnb', 'Automation', 'Invest'],
  },
  {
    id: 'domaine',
    title: { fr: 'Domaine Harrach', en: 'Domaine Harrach' },
    description: {
      fr: `Co-fondateur d’un domaine agricole bio au Maroc. Je contribue à la culture de fruits durables, au choix des cultures, à la vente locale, à l’optimisation des terres et à la vision à long terme du projet.`,
      en: `Co-founder of an organic agricultural estate in Morocco. I support fruit production using sustainable practices, project planning, local sales, and long-term development strategy.`,
    },
    image: 'https://images.pexels.com/photos/5529519/pexels-photo-5529519.jpeg',
    tags: ['Agriculture', 'Organic', 'Morocco', 'Eco'],
  },
  {
    id: 'fastfood',
    title: { fr: "0'240", en: "0'240" },
    description: {
      fr: `Associé dans un restaurant rapide local, avec un rôle actif dans la gestion, l’optimisation des coûts, le branding et le marketing de proximité.`,
      en: `Partner in a local fast-food restaurant, actively involved in management, cost optimization, branding, and local marketing.`,
    },
    image: 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg',
    tags: ['Food', 'Local Business', 'Branding'],
  },
  {
    id: 'turfu',
    title: { fr: 'Turfu Driving', en: 'Turfu Driving' },
    description: {
      fr: `Fondateur d’une société de location de véhicules 100 % digitale. Développement stratégique, gestion de flotte, automatisation CRM, partenariats commerciaux et optimisation des opérations par la tech.`,
      en: `Founder of a fully digital car rental company. Led strategic development, fleet management, CRM automation, business partnerships, and process optimization via tech.`,
    },
    image: 'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg',
    tags: ['Rental', 'Digital', 'CRM', 'Startup'],
  },
  {
    id: 'tlfh',
    title: { fr: 'TLFH', en: 'TLFH' },
    description: {
      fr: `Responsable des opérations dans une société de transport. Gestion de la flotte, planification, supervision des conducteurs, relation B2B, veille réglementaire et réduction des coûts logistiques.`,
      en: `Operations manager in a freight transport company. Managed fleet planning, driver supervision, B2B client relations, regulatory monitoring, and cost optimization.`,
    },
    image: 'https://images.pexels.com/photos/6169661/pexels-photo-6169661.jpeg',
    tags: ['Logistics', 'Transport', 'B2B', 'Ops'],
  },
  {
    id: 'wash',
    title: { fr: 'Wash Center', en: 'Wash Center' },
    description: {
      fr: `Co-fondateur d’un service de lavage auto. Je pilote la stratégie, les opérations, le marketing local, les stocks, la rentabilité, et la relation client.`,
      en: `Co-founder of a car wash service. I oversee strategy, operations, local marketing, inventory, profitability, and customer relations.`,
    },
    image: 'https://images.pexels.com/photos/6872572/pexels-photo-6872572.jpeg',
    tags: ['Car wash', 'Service', 'Process', 'Local'],
  },
];
