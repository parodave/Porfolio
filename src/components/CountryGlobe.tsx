import React, { useEffect, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useCountryStore } from '../store/countrySearch';

const CountryGlobe: React.FC = () => {
  const globeRef = useRef<GlobeMethods>(null);
  const selected = useCountryStore((s) => s.selected);

  useEffect(() => {
    if (selected && globeRef.current) {
      globeRef.current.pointOfView(
        { lat: selected.lat, lng: selected.lng, altitude: 1.5 },
        1000,
      );
    }
  }, [selected]);

  return (
    <div className="w-full h-96">
      <Globe ref={globeRef} globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" />
    </div>
  );
};

export default CountryGlobe;
