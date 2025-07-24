import React, { useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { Country, countries } from '../data/countries';
import { motion } from 'framer-motion';
import { createRoot } from 'react-dom/client';
import CountryInfoModal from './CountryInfoModal';

const markerSvg = `<svg viewBox="-4 0 36 36">
  <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
  <circle fill="black" cx="14" cy="14" r="7"></circle>
</svg>`;

const GlobeComponent: React.FC = () => {
  const globeRef = useRef<GlobeMethods>(null);
  const [active, setActive] = useState<Country | null>(null);

  const createMarker = (country: Country) => {
    const el = document.createElement('div');
    const root = createRoot(el);
    root.render(
      <motion.div
        dangerouslySetInnerHTML={{ __html: markerSvg }}
        whileHover={{ scale: 1.3 }}
        style={{ display: 'inline-block' }}
        onClick={() => setActive(country)}
      />
    );
    el.style.pointerEvents = 'auto';
    el.style.cursor = 'pointer';
    return el;
  };

  return (
    <>
      <div className="w-full h-96">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          htmlElementsData={countries}
          htmlLat="lat"
          htmlLng="lng"
          htmlElement={createMarker}
        />
      </div>
      <CountryInfoModal country={active} onClose={() => setActive(null)} />
    </>
  );
};

export default GlobeComponent;
