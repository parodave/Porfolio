import { Link } from 'react-router-dom';
import { Article } from '../data/articles';
import { useTranslation } from 'react-i18next';

interface BlogCardProps {
  article: Article;
}

const BlogCard = ({ article }: BlogCardProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const title = article.title[lang] ?? article.title.en;
  const summary = article.summary?.[lang] ?? article.summary?.en ?? '';
  const date = article.date;

  return (
    <Link
      to={`/blog/${article.slug}`}
      className="block rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-darker p-4 transform transition-transform hover:scale-105"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-1">{lang.toUpperCase()} &bull; {date}</p>
      <p className="text-gray-700 dark:text-gray-300">{summary}</p>
    </Link>
  );
};

export default BlogCard;
