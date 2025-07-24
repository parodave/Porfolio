import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { countries, type Country } from '../data/countries';
import { useCountryStore } from '../store/countrySearch';
import CountryModal from './CountryModal';

interface MarkerProps {
  country: Country;
  onSelect: (country: Country) => void;
}

const EARTH_TEXTURE =
  'https://unpkg.com/three-globe/example/img/earth-night.jpg';

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

const Marker: React.FC<MarkerProps> = ({ country, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const position = useMemo(
    () => latLngToVector3(country.lat, country.lng, 1.02),
    [country],
  );
  return (
    <mesh
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect(country)}
    >
      <sphereGeometry args={[hovered ? 0.03 : 0.02, 8, 8]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'red'} />
    </mesh>
  );
};

const GlobeScene: React.FC<{ onSelect: (c: Country) => void }> = ({ onSelect }) => {
  const texture = useTexture(EARTH_TEXTURE);
  const selected = useCountryStore((s) => s.selected);
  const { camera } = useThree();

  useEffect(() => {
    if (!selected) return;
    const { lat, lng } = selected;
    const pos = latLngToVector3(lat, lng, 2.5);
    camera.position.lerp(pos, 0.2);
    camera.lookAt(0, 0, 0);
  }, [selected, camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <group>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.05, 32, 32]} />
          <meshBasicMaterial
            color="#88c"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {countries.map((c) => (
          <Marker key={c.code} country={c} onSelect={onSelect} />
        ))}
      </group>
      <OrbitControls enableZoom={false} />
    </>
  );
};

const Globe: React.FC = () => {
  const setSelected = useCountryStore((s) => s.setSelected);
  const selected = useCountryStore((s) => s.selected);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = (c: Country) => {
    setSelected(c);
    setModalOpen(true);
  };

  return (
    <div className="w-full h-96 relative">
      <Canvas>
        <Suspense fallback={null}>
          <GlobeScene onSelect={handleSelect} />
        </Suspense>
      </Canvas>
      {modalOpen && selected && (
        <CountryModal
          country={selected.name.en}
          onClose={() => {
            setModalOpen(false);
            setSelected(undefined);
          }}
        />
      )}
    </div>
  );
};

export default Globe;
