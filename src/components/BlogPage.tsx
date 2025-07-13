import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';
import BlogLayout from './BlogLayout';
import BlogCard from './BlogCard';

const BlogPage = () => {
  const { t } = useTranslation();
  return (
    <BlogLayout title={t('blog.title')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((article) => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>
    </BlogLayout>
  );
};

export default BlogPage;
