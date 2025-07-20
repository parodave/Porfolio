import React from 'react';
import { articles } from '../../data/articles';
import ArticleCard from './ArticleCard';
import StarryBackground from './StarryBackground';
import useScrollToTop from '../../hooks/useScrollToTop';

const Blog: React.FC = () => {
  useScrollToTop();
  return (
    <section className="min-h-screen py-20 bg-light dark:bg-dark text-black dark:text-white px-6 md:px-10 relative">
      <StarryBackground />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
};

export default Blog;
