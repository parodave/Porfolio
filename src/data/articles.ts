export interface Article {
  id: string;
  slug: string;
  title: Record<string, string>;
  summary?: Record<string, string>;
  content: Record<string, string>;
  date: string;
  audio: string;
}

import { beepAudio } from './audio';

export const articles: Article[] = [
  {
    id: '1',
  slug: 'premier-article',
  title: {
    fr: 'Bienvenue sur mon blog',
    en: 'Welcome to my blog',
    es: 'Bienvenido a mi blog',
    ja: '私のブログへようこそ',
    zh: '欢迎来到我的博客',
    ar: 'مرحبًا بكم في مدونتي',
    th: 'ยินดีต้อนรับสู่บล็อกของฉัน',
  },
  summary: {
    fr: 'Ceci est le premier article de mon blog.',
    en: 'This is the first article of my blog.',
    es: 'Este es el primer artículo de mi blog.',
    ja: 'これは私のブログの最初の記事です。',
    zh: '这是我的博客的第一篇文章。',
    ar: 'هذه هي أول مقالة في مدونتي.',
    th: 'นี่คือบทความแรกของบล็อกของฉัน',
  },
  content: {
    fr: `Ceci est le premier article de mon blog. Il contient un court extrait audio pour accompagner la lecture.`,
    en: `This is the first article of my blog. It contains a short audio snippet to accompany the reading.`,
    es: `Este es el primer artículo de mi blog. Contiene un breve fragmento de audio para acompañar la lectura.`,
    ja: `これは私のブログの最初の記事です。 読書を補う短いオーディオクリップが含まれています。`,
    zh: `这是我的博客的第一篇文章。 它包含一个简短的音频片段以伴随阅读。`,
    ar: `هذه هي أول مقالة في مدونتي. تحتوي على مقطع صوتي قصير لمرافقة القراءة.`,
    th: `นี่คือบทความแรกของบล็อกของฉัน มีคลิปเสียงสั้นเพื่อประกอบการอ่าน`,
  },
  date: '2025-07-13',
  audio: beepAudio
  }
];
