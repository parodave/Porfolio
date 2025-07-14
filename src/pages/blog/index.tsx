import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../../data/blogData';
import BlogLayout from '../../components/BlogLayout';

const BlogIndex: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BlogLayout title={t('blog.title')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-darker p-4 transform transition-transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-1">{post.date}</p>
            <p className="text-gray-700 dark:text-gray-300">{post.sections[0]?.text}</p>
          </Link>
        ))}
      </div>
    </BlogLayout>
  );
};

export default BlogIndex;
