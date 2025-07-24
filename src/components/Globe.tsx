import React from 'react';
import GlobeGL from 'react-globe.gl';

export const Globe: React.FC = () => (
  <div className="w-full h-96">
    <GlobeGL globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" />
  </div>
);

export default Globe;
