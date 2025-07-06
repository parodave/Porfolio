export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  audio: string;
}

import { beepAudio } from './audio';

export const articles: Article[] = [
  {
    id: '1',
    slug: 'premier-article',
    title: 'Bienvenue sur mon blog',
    content: `Ceci est le premier article de mon blog. Il contient un court extrait audio pour accompagner la lecture.`,
    audio: beepAudio
  }
];
