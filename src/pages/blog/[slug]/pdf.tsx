import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../../../data/blogData';

const PrintArticle: React.FC = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return null;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.sections.map((section, idx) => (
        <div key={idx} className="space-y-2">
          {section.heading && <h2 className="text-xl font-semibold">{section.heading}</h2>}
          <p>{section.text}</p>
        </div>
      ))}
      <button
        onClick={() => window.print()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Print
      </button>
    </div>
  );
};

export default PrintArticle;
