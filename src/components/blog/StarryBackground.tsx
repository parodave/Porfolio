import React from 'react';

const StarryBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 -z-10 bg-black [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px]"
  />
);

export default StarryBackground;
