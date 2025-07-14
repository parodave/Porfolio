import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';
import BlogLayout from './BlogLayout';

const ArticlePage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return null;

  const title = article.title[i18n.language] ?? article.title.en;
  const content = article.content[i18n.language] ?? article.content.en;

  return (
    <BlogLayout title={title} description={content}>
      <section className="min-h-screen py-20 bg-light dark:bg-dark text-black dark:text-white px-6 md:px-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          {article.audio && (
            <audio controls src={article.audio} className="w-full">
              Your browser does not support the audio element.
            </audio>
          )}
          <p>{content}</p>
          <Link to="/blog" className="text-blue-400 hover:underline block mt-8">
            ← {t('blog.back')}
          </Link>
        </div>
      </section>
    </BlogLayout>
  );
};

export default ArticlePage;
