import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface Cube3DProps {
  reduceMotion?: boolean;
}

const SpinningBox: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (!reduceMotion) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshPhongMaterial
        color={0xffffff}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
      <Edges scale={1} color="white" />
    </mesh>
  );
};

const Cube3D: React.FC<Cube3DProps> = ({ reduceMotion = false }) => (
  <div className="w-full h-64 sm:h-96 md:h-full">
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <SpinningBox reduceMotion={reduceMotion} />
      <OrbitControls />
    </Canvas>
  </div>
);

export default Cube3D;
