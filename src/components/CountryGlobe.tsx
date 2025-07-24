import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import countries from '../../data/visitedCountries.json';

const CountryGlobe = () => {
  const globeRef = useRef<THREE.Mesh>(null);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

        <mesh ref={globeRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={new THREE.TextureLoader().load('/textures/earth_day.jpg')}
            roughness={1}
            metalness={0}
          />
        </mesh>

        {countries.map((country, index) => (
          <mesh
            key={index}
            position={[
              Math.cos(country.lng * (Math.PI / 180)) * Math.cos(country.lat * (Math.PI / 180)),
              Math.sin(country.lat * (Math.PI / 180)),
              Math.sin(country.lng * (Math.PI / 180)) * Math.cos(country.lat * (Math.PI / 180)),
            ]}
          >
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshStandardMaterial color="orange" emissive="red" />
          </mesh>
        ))}

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default CountryGlobe;
