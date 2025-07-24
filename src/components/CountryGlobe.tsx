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
        1000
      );
    }
  }, [selected]);

  return (
    <div className="w-full h-96 bg-black">
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="/public/textures/earth_day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        atmosphereColor="white"
        atmosphereAltitude={0.25}
      />
    </div>
  );
};

export default CountryGlobe;
