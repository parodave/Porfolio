'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Starfield from './Starfield';

const Terrain: React.FC = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <planeGeometry args={[50, 50, 64, 64]} />
    <meshStandardMaterial color="#272727" />
  </mesh>
);

const TravelMap: React.FC = () => (
  <div className="w-full h-screen">
    <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <Starfield />
      <Terrain />
      <OrbitControls enableZoom={false} />
    </Canvas>
  </div>
);

export default TravelMap;
