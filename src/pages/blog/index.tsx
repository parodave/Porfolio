import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from '@/components/blog/BlogCard';
import { blogArticles } from '@/data/blogData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const BlogIndex: React.FC = () => (
  <section className="min-h-screen py-20 px-6 bg-light dark:bg-dark text-black dark:text-white">
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {blogArticles.map((article) => (
        <motion.div key={article.slug} variants={item}>
          <BlogCard article={article} />
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default BlogIndex;
