import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';

const textureUrl = 'https://raw.githubusercontent.com/alexandrevacassin/codepen/refs/heads/main/planets/moon.jpg';

const Moon: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);
  const texture = useLoader(TextureLoader, textureUrl);

  useFrame(() => {
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Scene: React.FC = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, gl]);

  return (
    <>
      <pointLight position={[5, 5, 5]} intensity={0.5} />
      <Moon />
    </>
  );
};

const Moon3D: React.FC = () => (
  <div className="w-full h-64 sm:h-96 md:h-full">
    <Canvas style={{ background: 'transparent' }} camera={{ position: [0, 0, 6] }}>
      <Scene />
    </Canvas>
  </div>
);

export default Moon3D;
