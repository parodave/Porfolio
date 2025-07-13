import { useParams, Link } from 'react-router-dom';
import { blogData } from '../data/blogData';
import { useTranslation } from 'react-i18next';

const ArticlePage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const article = slug ? blogData[slug] : undefined;

  if (!article) {
    return null;
  }

  return (
    <section className="min-h-screen py-20 bg-light dark:bg-dark text-black dark:text-white px-6 md:px-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">{article.title[i18n.language] ?? article.title.en}</h1>
        <audio controls src={article.audio} className="w-full">
          Your browser does not support the audio element.
        </audio>
        <p>{article.content[i18n.language] ?? article.content.en}</p>
        <Link to="/blog" className="text-blue-400 hover:underline">
          {t('blog.back')}
        </Link>
      </div>
    </section>
  );
};

export default ArticlePage;
