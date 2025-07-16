import React from 'react';

const GlobalBackground: React.FC = () => {
  return (
    <div className="stars fixed inset-0 w-full h-full -z-10 pointer-events-none dark:block hidden" />
  );
};

export default GlobalBackground;
