import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

const SpinningCube: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
};

const RotatingCube: React.FC = () => (
  <div className="w-full h-full">
    <Canvas className="w-full h-full" camera={{ position: [2, 2, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <SpinningCube />
      <OrbitControls enableZoom={false} />
    </Canvas>
  </div>
);

export default RotatingCube;
