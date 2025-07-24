'use client';

import React from 'react';
import GlobeGL from 'react-globe.gl';

const Globe: React.FC = () => (
  <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
    <GlobeGL globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" />
  </div>
);

export default Globe;
