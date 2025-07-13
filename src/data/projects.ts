export interface Project {
  id: string;
  image: string;
  tags: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    id: 'kr',
    image: 'https://images.pexels.com/photos/6693638/pexels-photo-6693638.jpeg',
    tags: ['SaaS', 'AI', 'Automation', 'e-commerce', 'Freelance'],
    url: ''
  },
  {
    id: 'felizbella',
    image: 'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg',
    tags: ['Cosmetics', 'Shopify', 'Branding', 'Marketing'],
    url: ''
  },
  {
    id: 'khh',
    image: 'https://images.pexels.com/photos/21273694/pexels-photo-21273694.jpeg',
    tags: ['Real Estate', 'Airbnb', 'Automation', 'Invest'],
    url: ''
  },
  {
    id: 'domaine',
    image: 'https://images.pexels.com/photos/5529519/pexels-photo-5529519.jpeg',
    tags: ['Agriculture', 'Organic', 'Morocco', 'Eco'],
    url: ''
  },
  {
    id: 'fastfood',
    image: 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg',
    tags: ['Restaurant', 'Management', 'Marketing', 'Finance'],
    url: ''
  },
  {
    id: 'turfu',
    image: 'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg',
    tags: ['Rental', 'Digital', 'CRM', 'Startup'],
    url: ''
  },
  {
    id: 'tlfh',
    image: 'https://images.pexels.com/photos/6169661/pexels-photo-6169661.jpeg',
    tags: ['Logistics', 'Transport', 'B2B', 'Ops'],
    url: ''
  },
  {
    id: 'wash',
    image: 'https://images.pexels.com/photos/6872572/pexels-photo-6872572.jpeg',
    tags: ['Car wash', 'Service', 'Process', 'Local'],
    url: ''
  }
];
