import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { articles } from '../../data/articles';
import AudioPlayer from './AudioPlayer';
import StarryBackground from './StarryBackground';
import useScrollToTop from '../../hooks/useScrollToTop';

const ArticlePage: React.FC = () => {
  useScrollToTop();
  const { slug } = useParams<{ slug: string }>();
  const index = articles.findIndex((a) => a.slug === slug);
  const article = index >= 0 ? articles[index] : undefined;
  if (!article) return null;
  const prev = articles[index - 1];
  const next = articles[index + 1];

  return (
    <section className="min-h-screen py-20 bg-light dark:bg-dark text-black dark:text-white px-6 md:px-10 relative">
      <StarryBackground />
      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-sm text-gray-500">{article.date}</p>
        {article.quote && <blockquote className="border-l-4 border-blue-500 pl-4 italic">{article.quote}</blockquote>}
        <AudioPlayer src={article.audio} />
        <div className="flex gap-4">
          {article.pdfFr && (
            <a href={article.pdfFr} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              PDF FR
            </a>
          )}
          {article.pdfEn && (
            <a href={article.pdfEn} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              PDF EN
            </a>
          )}
        </div>
        <ReactMarkdown className="prose dark:prose-invert max-w-none">{article.content}</ReactMarkdown>
        <nav className="flex justify-between text-blue-400">
          {prev ? <Link to={`/blog/${prev.slug}`} className="hover:underline">← {prev.title}</Link> : <span />}
          {next ? <Link to={`/blog/${next.slug}`} className="hover:underline">{next.title} →</Link> : <span />}
        </nav>
        <div>
          <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlePage;
