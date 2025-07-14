import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';

interface BlogLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const BlogLayout = ({ title, description, children }: BlogLayoutProps) => (
  <>
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
    <section className="min-h-screen py-20 bg-light dark:bg-dark text-black dark:text-white px-6 md:px-10">
      <div className="max-w-3xl mx-auto space-y-6">{children}</div>
    </section>
  </>
);

export default BlogLayout;
