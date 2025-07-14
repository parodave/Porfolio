import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';
import BlogLayout from './BlogLayout';

const ArticlePage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return null;
  }

  return (
    <BlogLayout title={article.title[i18n.language] ?? article.title.en}>
      <h1 className="text-3xl font-bold">{article.title[i18n.language] ?? article.title.en}</h1>
      <audio controls src={article.audio} className="w-full">
        Your browser does not support the audio element.
      </audio>
      <p>{article.content[i18n.language] ?? article.content.en}</p>
      <Link to="/blog" className="text-blue-400 hover:underline">
        {t('blog.back')}
      </Link>
    </BlogLayout>
  );
};

export default ArticlePage;
