import React from 'react';
import { Helmet } from 'react-helmet';

interface BlogLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ title, description, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </>
);

export default BlogLayout;
