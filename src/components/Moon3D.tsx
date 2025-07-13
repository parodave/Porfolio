import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface Moon3DProps {
  reduceMotion?: boolean;
}

const SpinningSphere: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (!reduceMotion) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshPhongMaterial color={0xffffff} transparent opacity={0.15} />
      <Edges scale={1} color="white" />
    </mesh>
  );
};

const Moon3D: React.FC<Moon3DProps> = ({ reduceMotion = false }) => (
  <div className="w-full h-64 sm:h-96 md:h-full">
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <SpinningSphere reduceMotion={reduceMotion} />
      <OrbitControls />
    </Canvas>
  </div>
);

export default Moon3D;
