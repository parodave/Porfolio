'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import countries from '../../data/visitedCountries.json';

const GlobeMesh = () => {
  const texture = useTexture('/textures/earth_day.jpg');
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} rotation={[0.3, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const CountryPoints = () => {
  return (
    <>
      {countries.map(({ lat, lng, name }) => {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        const r = 2.02;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * Math.sin(phi) * Math.sin(theta);
        return (
          <mesh key={name} position={[x, y, z]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="orange" />
          </mesh>
        );
      })}
    </>
  );
};

const Halo = () => (
  <mesh>
    <sphereGeometry args={[2.05, 64, 64]} />
    <meshBasicMaterial color="cyan" transparent opacity={0.04} />
  </mesh>
);

const Globe = () => (
  <div className="w-full h-[500px]">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <GlobeMesh />
      <CountryPoints />
      <Halo />
      <OrbitControls enableZoom={true} />
    </Canvas>
  </div>
);

export default Globe;
