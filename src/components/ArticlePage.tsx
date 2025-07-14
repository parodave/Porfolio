import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import BlogLayout from './BlogLayout';
import { containerVariants, itemVariants } from '../animationVariants';
import { blogPosts } from '../data/blogData';
import AudioPlayer from './AudioPlayer';
import DownloadPDFButtons from './DownloadPDFButtons';
import { Helmet } from 'react-helmet';

const ArticlePage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return null;

  const description = post.sections[0]?.text;

  return (
    <BlogLayout>
      <Helmet>
        <title>{post.title}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1 variants={itemVariants} className="text-3xl font-bold">
          {post.title}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-sm text-gray-500">
          {post.date}
        </motion.p>
        {post.audioUrl && (
          <motion.div variants={itemVariants}>
            <AudioPlayer
              src={post.audioUrl}
              aria-label="Article audio"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            />
          </motion.div>
        )}
        {post.pdfLinks && (
          <motion.div variants={itemVariants}>
            <DownloadPDFButtons pdfLinks={post.pdfLinks} />
          </motion.div>
        )}
        {post.sections.map((section, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            {section.heading && (
              <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
            )}
            <p>{section.text}</p>
          </motion.div>
        ))}
        <Link
          to="/blog"
          aria-label={t('blog.back')}
          className="text-blue-400 hover:underline block mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          ← {t('blog.back')}
        </Link>
      </motion.div>
    </BlogLayout>
  );
};

export default ArticlePage;
