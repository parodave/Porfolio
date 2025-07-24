import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useCountryStore } from '../store/countrySearch';
import { continents, Continent } from '../data/continents';
import ContinentModal from './ContinentModal';

const CountryGlobe: React.FC = () => {
  const globeRef = useRef<GlobeMethods>(null);
  const selected = useCountryStore((s) => s.selected);
  const [activeContinent, setActiveContinent] = useState<Continent | null>(null);

  useEffect(() => {
    if (selected && globeRef.current) {
      globeRef.current.pointOfView(
        { lat: selected.lat, lng: selected.lng, altitude: 1.5 },
        1000,
      );
    }
  }, [selected]);

  return (
    <div className="w-full h-96 relative">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={continents}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointColor={() => 'orange'}
        pointRadius={0.5}
        onPointClick={(d) => setActiveContinent(d)}
      />
      <ContinentModal
        continent={activeContinent}
        onClose={() => setActiveContinent(null)}
        onViewProjects={(c) => console.log('View projects for', c.id)}
      />
    </div>
  );
};

export default CountryGlobe;
