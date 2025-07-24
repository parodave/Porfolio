'use client';

import React, { Suspense, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';
import countries from '../../data/countries.json';
import ContinentModal from './ContinentModal';

type Country = {
  name: string;
  lat: number;
  lng: number;
  continent: string;
};

const RADIUS = 2;

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

const Marker: React.FC<{
  country: Country;
  onSelect: (continent: string) => void;
}> = ({ country, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const position = latLngToVector3(country.lat, country.lng, RADIUS + 0.05);

  return (
    <mesh
      position={position.toArray()}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect(country.continent)}
    >
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="orange" />
      {hovered && (
        <Html distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div className="rounded bg-white px-1 py-0.5 text-xs text-black dark:bg-zinc-800 dark:text-white">
            {country.name}
          </div>
        </Html>
      )}
    </mesh>
  );
};

const Earth: React.FC = () => {
  const { theme } = useTheme();
  const dayTexture = useLoader(TextureLoader, '/textures/earth_day.jpg');
  const nightTexture = useLoader(TextureLoader, '/textures/earth_night.jpg');
  const texture = theme === 'dark' ? nightTexture : dayTexture;

  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Globe: React.FC = () => {
  const [continent, setContinent] = useState<string | null>(null);

  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
        {(countries as Country[]).map((c) => (
          <Marker key={c.name} country={c} onSelect={(cont) => setContinent(cont)} />
        ))}
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
      {continent && (
        <ContinentModal continent={continent} onClose={() => setContinent(null)} />
      )}
    </div>
  );
};

export default Globe;