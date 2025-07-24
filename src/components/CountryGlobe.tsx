import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useCountryStore } from '../store/countrySearch';
import { useTheme } from '../hooks/useTheme';

const CountryGlobe: React.FC = () => {
  const globeRef = useRef<GlobeMethods>(null);
  const { theme } = useTheme();
  const selected = useCountryStore((s) => s.selected);
  const [globeUrl, setGlobeUrl] = useState('');

  useEffect(() => {
    setGlobeUrl(
      theme === 'dark'
        ? '//unpkg.com/three-globe/example/img/earth-dark.jpg'
        : '//unpkg.com/three-globe/example/img/earthmap4k.jpg',
    );
  }, [theme]);

  useEffect(() => {
    if (globeRef.current && globeUrl) {
      globeRef.current.globeImageUrl(globeUrl);
    }
  }, [globeUrl]);

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
      <Globe ref={globeRef} globeImageUrl={globeUrl} />
    </div>
  );
};

export default CountryGlobe;
