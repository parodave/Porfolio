import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(({ mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = mouse.x * Math.PI;
      meshRef.current.rotation.x = mouse.y * Math.PI;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#ad78dc"
        roughness={0.3}
        metalness={0.9}
        emissive="#5e2f93"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function AnimatedCube() {
  return (
    <Canvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Stars radius={80} depth={50} count={3000} factor={4} fade />
      <RotatingCube />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}
