import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';

const ArticlePage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return null;
  }

  return (
    <section className="min-h-screen py-20 bg-dark text-white px-6 md:px-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <audio controls src={article.audio} className="w-full">
          Your browser does not support the audio element.
        </audio>
        <p>{article.content}</p>
        <Link to="/blog" className="text-blue-400 hover:underline">
          {t('blog.back')}
        </Link>
      </div>
    </section>
  );
};

export default ArticlePage;
