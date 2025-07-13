import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

type MoonProps = JSX.IntrinsicElements['group'] & {
  reduceMotion?: boolean;
};

export default function Moon({ reduceMotion = false, ...props }: MoonProps) {
  const moonRef = useRef<Mesh>(null);
  const [error, setError] = useState(false);

  const { scene } = useGLTF('/moon/scene.gltf', true, (e) => {
    console.error('Erreur de chargement du modèle GLTF :', e);
    setError(true);
  });

  useEffect(() => {
    if (!scene) {
      setError(true);
    }
  }, [scene]);

  useFrame(() => {
    if (!reduceMotion && moonRef.current) {
      moonRef.current.rotation.y += 0.001;
    }
  });

  if (error || !scene) {
    return (
      <mesh {...props} ref={moonRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="gray" roughness={0.8} metalness={0.3} />
      </mesh>
    );
  }

  return (
    <group ref={moonRef} {...props} dispose={null}>
      <primitive object={scene} scale={2} position={[0, 0, 0]} />
    </group>
  );
}

useGLTF.preload('/moon/scene.gltf');
