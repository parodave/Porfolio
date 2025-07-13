export interface BlogArticle {
  slug: string;
  title: {
    fr: string;
    en: string;
  };
  summary: {
    fr: string;
    en: string;
  };
  content: {
    fr: string;
    en: string;
  };
  date: string;
  audio: string;
  pdf: {
    fr: string;
    en: string;
  };
}

import { beepAudio } from './audio';

export const blogData: Record<string, BlogArticle> = {
  'premier-article': {
    slug: 'premier-article',
    title: {
      fr: 'Bienvenue sur mon blog',
      en: 'Welcome to my blog',
    },
    summary: {
      fr: 'Ceci est le premier article de mon blog.',
      en: 'This is the first article of my blog.',
    },
    content: {
      fr: `Ceci est le premier article de mon blog. Il contient un court extrait audio pour accompagner la lecture.`,
      en: `This is the first article of my blog. It contains a short audio snippet to accompany the reading.`,
    },
    date: '2025-01-01',
    audio: beepAudio,
    pdf: {
      fr: '/premier-article-fr.pdf',
      en: '/premier-article-en.pdf',
    },
  },
};
