import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface Moon3DProps {
  reduceMotion?: boolean;
}

const textureUrl = 'https://raw.githubusercontent.com/alexandrevacassin/codepen/refs/heads/main/planets/moon.jpg';

const SpinningMoon: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, textureUrl);

  useFrame(() => {
    if (!reduceMotion) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
      <Edges scale={1.01} color="white" />
    </mesh>
  );
};

const Moon3D: React.FC<Moon3DProps> = ({ reduceMotion = false }) => (
  <div className="w-full h-64 sm:h-96 md:h-full">
    <Canvas style={{ background: 'transparent' }} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <SpinningMoon reduceMotion={reduceMotion} />
      <OrbitControls />
    </Canvas>
  </div>
);

export default Moon3D;
