import { Link } from 'react-router-dom';
import type { Article } from '../../data/articles';

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => (
  <Link
    to={`/blog/${article.slug}`}
    className="block rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-darker p-4 transform transition-transform hover:scale-105"
  >
    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
    <p className="text-sm text-gray-500 mb-1">{article.date}</p>
    {article.excerpt && <p className="text-gray-700 dark:text-gray-300">{article.excerpt}</p>}
  </Link>
);

export default ArticleCard;
