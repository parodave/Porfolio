import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

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
    <div className="relative w-full h-[300px] sm:h-[400px]">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="lightblue" />
        </mesh>
        <CameraMover direction={dirRef} />
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
