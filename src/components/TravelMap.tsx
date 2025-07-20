'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Starfield from './Starfield';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer:coarse)').matches);
  }, []);
  return isMobile;
};

type Vec2 = { x: number; y: number };

const CameraMover: React.FC<{ direction: React.MutableRefObject<Vec2> }> = ({ direction }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += direction.current.x;
    camera.position.z += direction.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const Terrain: React.FC = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <planeGeometry args={[50, 50, 64, 64]} />
    <meshStandardMaterial color="#272727" />
  </mesh>
);

const TravelMap: React.FC = () => {
  const isMobile = useIsMobile();
  const dirRef = useRef<Vec2>({ x: 0, y: 0 });
  const startRef = useRef<Vec2 | null>(null);

  const handleStart = (e: React.PointerEvent<HTMLDivElement>) => {
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    dirRef.current = { x: dx / 200, y: dy / 200 };
  };

  const handleEnd = () => {
    startRef.current = null;
    dirRef.current = { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <Starfield />
        <Terrain />
        <CameraMover direction={dirRef} />
        {!isMobile && <OrbitControls enableZoom={false} />}
      </Canvas>

      {isMobile && (
        <div
          className="absolute bottom-4 left-4 w-24 h-24 bg-gray-200 rounded-full opacity-75 touch-none"
          onPointerDown={handleStart}
          onPointerMove={handleMove}
          onPointerUp={handleEnd}
          onPointerLeave={handleEnd}
        />
      )}
    </div>
  );
};

export default TravelMap;
