'use client';

import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useTheme } from '../hooks/useTheme';

const Earth: React.FC = () => {
  const { theme } = useTheme();
  const dayTexture = useLoader(TextureLoader, '/textures/earth_day.jpg');
  const nightTexture = useLoader(TextureLoader, '/textures/earth_night.jpg');
  const texture = theme === 'dark' ? nightTexture : dayTexture;

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Globe: React.FC = () => (
  <div className="w-full h-96">
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  </div>
);

export default Globe;
