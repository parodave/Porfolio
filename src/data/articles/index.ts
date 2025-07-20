import matter from 'gray-matter';
import { beepAudio } from '../beepAudio';

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  quote?: string;
  audio?: string;
  pdfFr?: string;
  pdfEn?: string;
  content: string;
}

const files = import.meta.glob('./*.md', { as: 'raw', eager: true });

export const articles: Article[] = Object.entries(files).map(([path, raw]) => {
  const { data, content } = matter(raw as string);
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const audio = data.audio === 'beep' ? beepAudio : data.audio;
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    excerpt: data.excerpt,
    quote: data.quote,
    audio,
    pdfFr: data.pdfFr,
    pdfEn: data.pdfEn,
    content,
  } as Article;
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getArticleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);
