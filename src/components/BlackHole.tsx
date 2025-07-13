import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const RotatingTorus: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2 + mouse.current.y * 0.4;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.4 + mouse.current.x * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.5, 0.5, 32, 100]} />
      <meshStandardMaterial color="#111" />
    </mesh>
  );
};

const BlackHole: React.FC = () => (
  <div className="absolute inset-0 -z-0 pointer-events-none">
    <Canvas className="w-full h-full" camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <RotatingTorus />
    </Canvas>
  </div>
);

export default BlackHole;
