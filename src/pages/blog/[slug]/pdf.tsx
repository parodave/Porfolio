import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogPosts } from '../../../data/blogData';

const PrintArticle: React.FC = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return null;

  return (
    <div className="p-6 space-y-4">
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.sections.map((section, idx) => (
        <div key={idx} className="space-y-2">
          {section.heading && <h2 className="text-xl font-semibold">{section.heading}</h2>}
          <p>{section.text}</p>
        </div>
      ))}
      <button
        onClick={() => window.print()}
        aria-label="Print article"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        Print
      </button>
    </div>
  );
};

export default PrintArticle;
