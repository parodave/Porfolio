import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getArticleBySlug } from '@/data/blogData';
import AudioPlayer from '@/components/blog/AudioPlayer';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  if (!article) return null;

  return (
    <section className="min-h-screen py-20 px-6 bg-light dark:bg-dark text-black dark:text-white">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <motion.h1 variants={item} className="text-3xl font-bold">
          {article.title}
        </motion.h1>
        <motion.p variants={item} className="text-sm text-gray-500">
          {article.date}
        </motion.p>
        <motion.blockquote variants={item} className="border-l-4 border-blue-500 pl-4 italic">
          {article.quote}
        </motion.blockquote>
        {article.audioUrl && (
          <motion.div variants={item}>
            <AudioPlayer src={article.audioUrl} />
          </motion.div>
        )}
        <motion.div variants={item} className="flex gap-4">
          <a
            href={article.pdfFR}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            PDF FR
          </a>
          <a
            href={article.pdfEN}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            PDF EN
          </a>
        </motion.div>
        <motion.p variants={item}>{article.contentFR}</motion.p>
        <motion.p variants={item}>{article.contentEN}</motion.p>
        <motion.div variants={item} whileHover={{ x: -4 }}>
          <Link to="/blog" className="text-blue-400 hover:underline">
            ← Back to blog
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ArticlePage;
