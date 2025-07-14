import { ReactNode } from 'react';

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => (
  <section className="min-h-screen py-20 bg-light dark:bg-dark text-black dark:text-white px-6 md:px-10">
    <div className="max-w-3xl mx-auto space-y-6">{children}</div>
  </section>
);

export default BlogLayout;
