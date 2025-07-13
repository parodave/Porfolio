export interface Project {
  id: string;
  image: string;
  tags: string[];
  description: {
    en: string;
    fr: string;
  };
  url?: string;
}

export const projects: Project[] = [
  {
    id: 'kr',
    image: 'https://images.pexels.com/photos/6693638/pexels-photo-6693638.jpeg',
    tags: ['SaaS', 'AI', 'Automation', 'e-commerce', 'Freelance'],
    description: {
      en: `Co-founder of KR Global Solutions LTD, a company specialized in SaaS platforms, e-commerce development, and AI integration. I help businesses digitally transform using smart web tools, automation, and tailored strategies.`,
      fr: `Co-fondateur de KR Global Solutions LTD, société spécialisée dans le développement de plateformes SaaS, boutiques e-commerce et intégration d’IA. J’accompagne des entreprises dans leur transformation digitale à travers des outils web intelligents, des automatisations, et des stratégies sur mesure.`
    },
    url: ''
  },
  {
    id: 'felizbella',
    image: 'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg',
    tags: ['Cosmetics', 'Shopify', 'Branding', 'Marketing'],
    description: {
      en: `Co-founder of FelizBella, a natural cosmetics brand. I led branding, e-commerce development, marketing strategy (SEO, social media, ads), and managed sales, logistics, returns, and campaigns.`,
      fr: `Co-fondateur de FelizBella, marque de cosmétiques naturels. J’ai piloté le branding, la création de la boutique en ligne, la stratégie marketing (SEO, réseaux sociaux, pubs), ainsi que la gestion des ventes, retours, logistique et campagnes.`
    },
    url: ''
  },
  {
    id: 'khh',
    image: 'https://images.pexels.com/photos/21273694/pexels-photo-21273694.jpeg',
    tags: ['Real Estate', 'Airbnb', 'Automation', 'Invest'],
    description: {
      en: `Co-founder of a property rental company in Morocco. I remotely manage two Airbnb units using automation tools to improve profitability and grow a compliant and sustainable real estate portfolio.`,
      fr: `Co-fondateur d'une société de locations Airbnb au Maroc. Je gère deux biens à distance via des outils automatisés pour maximiser la rentabilité, tout en développant un portefeuille immobilier durable et conforme aux normes locales.`
    },
    url: ''
  },
  {
    id: 'domaine',
    image: 'https://images.pexels.com/photos/5529519/pexels-photo-5529519.jpeg',
    tags: ['Agriculture', 'Organic', 'Morocco', 'Eco'],
    description: {
      en: `Co-founder of an organic agricultural estate in Morocco. I support fruit production using sustainable practices, project planning, local sales, and long-term development strategy.`,
      fr: `Co-fondateur d’un domaine agricole bio au Maroc. Je contribue à la culture de fruits durables, au choix des cultures, à la vente locale, à l’optimisation des terres et à la vision à long terme du projet.`
    },
    url: ''
  },
  {
    id: 'fastfood',
    image: 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg',
    tags: ['Restaurant', 'Management', 'Marketing', 'Finance'],
    description: {
      en: `Founder and manager of a fast-food restaurant. I handled concept creation, daily operations, team management, profitability tracking, customer satisfaction, and supplier negotiations.`,
      fr: `Fondateur et gérant d’un fast-food. Création du concept, gestion opérationnelle, management d’équipe, suivi de la rentabilité, satisfaction client et négociation fournisseurs.`
    },
    url: ''
  },
  {
    id: 'turfu',
    image: 'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg',
    tags: ['Rental', 'Digital', 'CRM', 'Startup'],
    description: {
      en: `Founder of a fully digital car rental company. Led strategic development, fleet management, CRM automation, business partnerships, and process optimization via tech.`,
      fr: `Fondateur d’une société de location de véhicules 100 % digitale. Développement stratégique, gestion de flotte, automatisation CRM, partenariats commerciaux et optimisation des opérations par la tech.`
    },
    url: ''
  },
  {
    id: 'tlfh',
    image: 'https://images.pexels.com/photos/6169661/pexels-photo-6169661.jpeg',
    tags: ['Logistics', 'Transport', 'B2B', 'Ops'],
    description: {
      en: `Operations manager in a freight transport company. Managed fleet planning, driver supervision, B2B client relations, regulatory monitoring, and cost optimization.`,
      fr: `Responsable des opérations dans une société de transport. Gestion de la flotte, planification, supervision des conducteurs, relation B2B, veille réglementaire et réduction des coûts logistiques.`
    },
    url: ''
  },
  {
    id: 'wash',
    image: 'https://images.pexels.com/photos/6872572/pexels-photo-6872572.jpeg',
    tags: ['Car wash', 'Service', 'Process', 'Local'],
    description: {
      en: `Co-founder of a car wash service. I oversee strategy, operations, local marketing, inventory, profitability, and customer relations.`,
      fr: `Co-fondateur d’un service de lavage auto. Je pilote la stratégie, les opérations, le marketing local, les stocks, la rentabilité, et la relation client.`
    },
    url: ''
  }
];