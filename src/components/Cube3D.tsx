import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import useDarkMode from '../hooks/useDarkMode';

const SpinningCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#f5f5f5" />
    </mesh>
  );
};

const Cube3D: React.FC = () => {
  const [theme] = useDarkMode();
  const background = theme === 'dark' ? '#000000' : '#ffffff';
  const lightColor = theme === 'dark' ? '#ffffff' : '#000000';

  return (
    <Canvas
      className="w-full h-full"
      style={{ background }}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.5} color={lightColor} />
      <directionalLight position={[2, 2, 2]} intensity={1} color={lightColor} />
      <Suspense fallback={null}>
        <SpinningCube />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export default Cube3D;
