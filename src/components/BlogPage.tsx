import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import BlogCard from './BlogCard';
import useScrollToTop from '../hooks/useScrollToTop';

const BlogPage = () => {
  useScrollToTop();
  const { t } = useTranslation();

  return (
    <BlogLayout title={t('blog.title')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((article) => (
          <BlogCard key={article.id} article={article} />
        ))}
        {/* Lien spécifique vers la méthode 4D */}
        <div className="border border-gray-700 rounded-lg p-4 hover:shadow-md transition">
          <Link to="/blog/methode-4d" className="text-xl text-blue-400 hover:underline">
            Méthode 4D / 4D Method
          </Link>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('blog.methode4d.description', 'Découvrez la méthodologie 4D utilisée dans mes projets.')}
          </p>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogPage;
