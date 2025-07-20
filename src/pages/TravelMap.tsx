import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import MinecraftWorld from '../components/MinecraftWorld';
import CountryModal from '../components/CountryModal';
import CountryInfo from '../components/CountryInfo';

const TravelMap: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <Physics gravity={[0, -9.81, 0]}>
          <MinecraftWorld onSelectCountry={setSelectedCountry} />
        </Physics>
        <OrbitControls />
      </Canvas>
      <CountryInfo country={selectedCountry} />
      <CountryModal
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
};

export default TravelMap;
