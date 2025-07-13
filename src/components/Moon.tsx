import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

export default function Moon(props: JSX.IntrinsicElements['group']) {
  const moonRef = useRef<Mesh>(null);
  const { scene } = useGLTF('/moon/scene.gltf');

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={moonRef} {...props} dispose={null}>
      <primitive object={scene} scale={2} position={[0, 0, 0]} />
    </group>
  );
}

useGLTF.preload('/moon/scene.gltf');
