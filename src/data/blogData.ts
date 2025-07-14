import { beepAudio } from './audio';

export interface BlogArticle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  contentFR: string;
  contentEN: string;
  quote: string;
  audioUrl: string;
  pdfFR: string;
  pdfEN: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'methode-4d',
    title: 'Méthode 4D',
    date: '2024-06-01',
    excerpt: 'La méthode 4D aide à organiser efficacement les tâches.',
    contentFR:
      "La méthode 4D aide à clarifier, déléguer, différer puis faire disparaître les tâches inutiles.",
    contentEN:
      'The 4D method helps clarify, delegate, defer and finally delete useless tasks.',
    quote: "« Ce qui se conçoit bien s'énonce clairement » – Boileau",
    audioUrl: beepAudio,
    pdfFR: '/methode-4d-fr.pdf',
    pdfEN: '/methode-4d-en.pdf'
  },
  {
    slug: 'premier-article',
    title: 'Bienvenue sur mon blog',
    date: '2025-07-13',
    excerpt: 'Ceci est le premier article de mon blog.',
    contentFR:
      'Ceci est le premier article de mon blog. Il contient un court extrait audio pour accompagner la lecture.',
    contentEN:
      'This is the first article of my blog. It contains a short audio snippet to accompany the reading.',
    quote: 'Knowledge is power',
    audioUrl: beepAudio,
    pdfFR: '/premier-article-fr.pdf',
    pdfEN: '/premier-article-en.pdf'
  }
];

export const getArticleBySlug = (slug: string) =>
  blogArticles.find((a) => a.slug === slug);
