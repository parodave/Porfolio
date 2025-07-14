import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BlogArticle } from '@/data/blogData';

interface BlogCardProps {
  article: BlogArticle;
}

const BlogCard = ({ article }: BlogCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-darker rounded-lg p-4 shadow hover:shadow-lg"
  >
    <Link to={`/blog/${article.slug}`} className="block space-y-2">
      <h3 className="text-xl font-semibold">{article.title}</h3>
      <p className="text-sm text-gray-500">{article.date}</p>
      <p className="text-gray-700 dark:text-gray-300">{article.excerpt}</p>
    </Link>
  </motion.article>
);

export default BlogCard;
