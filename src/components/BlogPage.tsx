import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="min-h-screen py-20 bg-dark text-white px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('blog.title')}</h1>
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article.id} className="border-b border-gray-700 pb-4">
              <Link
                to={`/blog/${article.slug}`}
                className="text-xl text-blue-400 hover:underline"
              >
                {article.title[i18n.language] ?? article.title.en}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogPage;
