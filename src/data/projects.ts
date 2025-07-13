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
      en: `Co-founder and director of KR Global Solutions LTD, a company specializing in SaaS platforms, e-commerce store creation, and AI integration. I work internationally as a freelancer building smart web tools, automating business processes, and supporting digital transformation. In parallel, I develop my own e-commerce brands and SaaS products under the KR Global name.

• Custom SaaS development
• E-commerce store creation and management (Shopify, WooCommerce, etc.)
• AI integration (chatbots, automations, AI copilots)
• Business process automation (API, no-code/low-code tools)
• Full-stack web development (HTML, CSS, JavaScript)
• UX/UI design & user experience optimization
• Freelance project management & internal product launches
• Digital strategy & business transformation
• Hosting, DNS, and technical infrastructure
• Digital marketing & online product sales
• Entrepreneurial mindset & project ownership
• Remote work & international collaboration`,
      fr: `Co-fondateur et directeur de KR Global Solutions LTD, une société spécialisée dans le développement de plateformes SaaS, la création de boutiques e-commerce et l’intégration de l’IA. En tant que freelance à l’international, je conçois des outils web intelligents, j’automatise des processus métiers, et j’accompagne la transformation digitale. En parallèle, je développe mes propres marques e-commerce et produits SaaS sous l'identité KR Global.

• Développement de solutions SaaS sur mesure
• Création et gestion de boutiques e-commerce (Shopify, WooCommerce)
• Intégration d'IA (chatbots, automatisations, copilotes IA)
• Automatisation des processus (API, no-code/low-code)
• Développement full-stack (HTML, CSS, JS)
• UX/UI design & optimisation de l’expérience utilisateur
• Lancement de produits & gestion de projets freelance
• Stratégie digitale & transformation d’entreprise
• Infrastructure technique (hébergement, DNS, sécurité)
• Marketing digital & ventes en ligne
• Esprit entrepreneurial & autonomie projet
• Collaboration à distance & à l’international`
    },
    url: ''
  },
  {
    id: 'felizbella',
    image: 'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg',
    tags: ['Cosmetics', 'Shopify', 'Branding', 'Marketing'],
    description: {
      en: `Co-founder of FelizBella, a cosmetics brand launched with business partners to sell natural beauty products online. I contributed to brand creation, e-commerce development, digital marketing, and sales operations.

• Cosmetic brand creation (naming, branding, packaging design)
• E-commerce store setup (Shopify, WooCommerce)
• Digital marketing strategy (social media, paid campaigns, SEO)
• Entrepreneurship & project coordination
• B2C online sales (checkout, payment, shipping)
• Performance monitoring (KPIs, traffic, conversion rates)
• Customer support & returns management
• Visual content creation & brand storytelling
• Supplier relations & inventory management
• Online advertising (Meta Ads, Google Ads)`,
      fr: `Co-fondateur de FelizBella, une marque de cosmétiques naturels lancée avec des partenaires. J’ai contribué à la création de l’univers de marque, au développement e-commerce, à la stratégie marketing digitale et à la gestion des ventes.

• Branding complet (naming, design packaging, storytelling)
• Développement de la boutique (Shopify, WooCommerce)
• Stratégie marketing digital (SEO, social media, campagnes payantes)
• Vente B2C en ligne : tunnel d’achat, paiements, expéditions
• Création de contenu visuel & gestion des réseaux
• Analyse de performance (KPIs, taux de conversion)
• Service client & gestion des retours
• Relations fournisseurs & logistique
• Gestion des stocks & publicités en ligne (Meta, Google Ads)`
    },
    url: ''
  },
  {
    id: 'khh',
    image: 'https://images.pexels.com/photos/21273694/pexels-photo-21273694.jpeg',
    tags: ['Real Estate', 'Airbnb', 'Automation', 'Invest'],
    description: {
      en: `Real estate investor and co-founder of a short-term rental company based in Morocco. I acquired and manage two Airbnb properties remotely using automated tools to maximize profitability. Long-term goal: expand the real estate portfolio and build a sustainable rental business.

• Rental property investment & profitability optimization
• Real estate company formation and management
• Remote property management & automation (Airbnb, channel managers)
• Long-term wealth strategy & portfolio vision
• Booking management & guest relations
• International property portfolio development
• Regulatory compliance & local tax understanding`,
      fr: `Investisseur immobilier et co-fondateur d'une entreprise de locations de courte durée au Maroc. Gestion à distance de deux propriétés Airbnb via des outils automatisés pour maximiser la rentabilité. Objectif : développer un portefeuille locatif durable.

• Investissement locatif & rentabilité
• Création et gestion de société immobilière
• Gestion automatisée des propriétés (Airbnb, channel managers)
• Stratégie patrimoniale à long terme
• Gestion des réservations & relations clients
• Développement du portefeuille immobilier à l’international
• Conformité réglementaire & fiscalité locale`
    },
    url: ''
  },
  {
    id: 'domaine',
    image: 'https://images.pexels.com/photos/5529519/pexels-photo-5529519.jpeg',
    tags: ['Agriculture', 'Organic', 'Morocco', 'Eco'],
    description: {
      en: `Co-founder of a 3-hectare family-run organic farm in Morocco, launched in partnership with relatives. The project focuses on sustainable fruit cultivation and distribution.

• Organic agriculture & sustainability
• Family entrepreneurship & collaborative planning
• Farm development & land optimization
• Agro-project structuring & crop management
• Local food distribution strategy
• Long-term business growth vision
• Social & ecological impact awareness`,
      fr: `Co-fondateur d’un domaine familial bio de 3 hectares au Maroc. Projet axé sur la culture et la distribution de fruits selon des pratiques agricoles durables et respectueuses de l’environnement.

• Agriculture biologique & durabilité
• Entrepreneuriat familial & planification collaborative
• Optimisation des terres & développement agricole
• Choix des cultures & structuration de projet
• Stratégie de distribution locale
• Vision à long terme pour le développement du domaine
• Sensibilité sociale et écologique`
    },
    url: ''
  },
  {
    id: 'fastfood',
    image: 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg',
    tags: ['Restaurant', 'Management', 'Marketing', 'Finance'],
    description: {
      en: `Passionate entrepreneur who successfully founded and managed a thriving fast-food establishment. Demonstrated expertise in business creation, day-to-day operations, team management, and customer satisfaction.

• Founded and launched the business, developing the concept and setting up operations.
• Led all aspects including strategy, daily operations, and business development.
• Recruited, trained, and managed staff.
• Oversaw budgeting, cost control, and revenue tracking.
• Ensured high service quality and customer experience.
• Negotiated with suppliers for cost-effective procurement.`,
      fr: `Entrepreneur passionné ayant fondé et géré avec succès un établissement de restauration rapide. Expérience complète en création d’entreprise, gestion quotidienne, management d’équipe et satisfaction client.

• Création du concept, choix stratégique de l'emplacement, mise en place des opérations.
• Gestion intégrale : exploitation, planification stratégique, développement commercial.
• Recrutement, formation et supervision du personnel.
• Gestion financière : budget, coûts, suivi des revenus.
• Garantie de la qualité du service et de l’expérience client.
• Négociation avec les fournisseurs pour optimiser coûts et approvisionnement.`
    },
    url: ''
  },
  {
    id: 'turfu',
    image: 'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg',
    tags: ['Rental', 'Digital', 'CRM', 'Startup'],
    description: {
      en: `Visionary entrepreneur who founded and managed a digital vehicle rental company. Skilled in business creation, digital marketing, and operational management.

• Launched a modern and tech-driven vehicle rental service.
• Built and executed digital marketing strategies.
• Managed vehicle fleet, maintenance, and customer logistics.
• Implemented a CRM to streamline operations and support.
• Identified opportunities for expansion and growth.
• Leveraged technology to enhance user experience and processes.`,
      fr: `Fondateur d’une entreprise de location de véhicules 100 % digitale. Spécialiste en marketing numérique, optimisation des processus, et gestion opérationnelle.

• Lancement d’une société innovante dans le secteur de la mobilité.
• Mise en place de stratégies marketing digitales performantes.
• Gestion de flotte : entretien, logistique, rentabilité.
• Implémentation d’un CRM pour automatiser la gestion client.
• Développement commercial, partenariats stratégiques.
• Utilisation de la tech pour optimiser l’expérience utilisateur et les opérations.`
    },
    url: ''
  },
  {
    id: 'tlfh',
    image: 'https://images.pexels.com/photos/6169661/pexels-photo-6169661.jpeg',
    tags: ['Logistics', 'Transport', 'B2B', 'Ops'],
    description: {
      en: `As Associate and Operations Manager at TLFH, a freight transport company serving B2B clients, I was responsible for route planning, driver coordination, and delivery supervision.

• Logistics & route management
• Team coordination & schedule planning
• B2B client relations & commercial negotiation
• Freight transport regulations & compliance
• Quality control & on-time delivery
• Operational monitoring & reporting
• Workflow optimization & cost reduction
• Strategic decision-making & analytical thinking
• Professional communication & customer service
• Autonomy & problem-solving under pressure`,
      fr: `Responsable des opérations dans une entreprise de transport de marchandises. Expert en logistique, coordination, et gestion de la relation client B2B.

• Planification des itinéraires & gestion de la flotte.
• Coordination des conducteurs & supervision des livraisons.
• Négociation commerciale & gestion client.
• Veille réglementaire & conformité transport.
• Optimisation des flux & réduction des coûts.
• Reporting opérationnel & décisions stratégiques.
• Excellente communication & gestion de crise.`
    },
    url: ''
  },
  {
    id: 'wash',
    image: 'https://images.pexels.com/photos/6872572/pexels-photo-6872572.jpeg',
    tags: ['Car wash', 'Service', 'Process', 'Local'],
    description: {
      en: `Associate at Wash Center, a company specialized in interior and exterior vehicle cleaning for individuals and corporate clients.

• Car cleaning services (B2B & B2C)
• Project launch & concept development
• Team management & daily operations
• Digital marketing & local outreach
• Supplier negotiation & logistics
• Process optimization & service quality
• Client relations & professional autonomy`,
      fr: `Co-fondateur d’un service de nettoyage de véhicules pour clients particuliers et professionnels. Intervention sur tous les aspects : lancement, stratégie, opérations et marketing.

• Développement du projet & du concept de service.
• Gestion d’équipe & opérations quotidiennes.
• Stratégie digitale locale (réseaux, référencement, promos).
• Négociation avec les fournisseurs & gestion des stocks.
• Amélioration des process & de la rentabilité.
• Suivi qualité & relation clientèle.`
    },
    url: ''
  }
];