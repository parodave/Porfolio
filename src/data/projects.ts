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
      en: 'Tech and e-commerce services with automation expertise.',
      fr: 'Services tech et e-commerce avec expertise en automatisation.'
    },
    url: ''
  },
  {
    id: 'felizbella',
    image: 'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg',
    tags: ['Cosmetics', 'Shopify', 'Branding', 'Marketing'],
    description: {
      en: 'E-commerce and branding project for a natural cosmetics line.',
      fr: 'Projet e-commerce et branding pour une ligne de cosmétiques naturels.'
    },
    url: ''
  },
  {
    id: 'khh',
    image: 'https://images.pexels.com/photos/21273694/pexels-photo-21273694.jpeg',
    tags: ['Real Estate', 'Airbnb', 'Automation', 'Invest'],
    description: {
      en: 'Experimental and cultural side-projects with web hosting and design.',
      fr: 'Projets expérimentaux et culturels avec hébergement et design.'
    },
    url: ''
  },
  {
    id: 'domaine',
    image: 'https://images.pexels.com/photos/5529519/pexels-photo-5529519.jpeg',
    tags: ['Agriculture', 'Organic', 'Morocco', 'Eco'],
    description: {
      en: 'Local organic farming venture with digital branding support.',
      fr: 'Exploitation agricole biologique locale avec soutien digital.'
    },
    url: ''
  },
  {
    id: 'fastfood',
    image: 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg',
    tags: ['Restaurant', 'Management', 'Marketing', 'Finance'],
    description: {
      en: 'Management and marketing for a restaurant franchise.',
      fr: 'Gestion et marketing pour une franchise de restauration rapide.'
    },
    url: ''
  },
  {
    id: 'turfu',
    image: 'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg',
    tags: ['Rental', 'Digital', 'CRM', 'Startup'],
    description: {
      en: 'UX/UI and branding for an innovative driving school.',
      fr: 'UX/UI et branding pour une auto-école innovante.'
    },
    url: ''
  },
  {
    id: 'tlfh',
    image: 'https://images.pexels.com/photos/6169661/pexels-photo-6169661.jpeg',
    tags: ['Logistics', 'Transport', 'B2B', 'Ops'],
    description: {
      en: 'Tech and visual consulting for a fashion platform.',
      fr: 'Conseil tech et visuel pour une plateforme de mode.'
    },
    url: ''
  },
  {
    id: 'wash',
    image: 'https://images.pexels.com/photos/6872572/pexels-photo-6872572.jpeg',
    tags: ['Car wash', 'Service', 'Process', 'Local'],
    description: {
      en: 'Website redesign and SEO for a local laundry service.',
      fr: 'Refonte de site et SEO pour un service de blanchisserie local.'
    },
    url: ''
  }
];
