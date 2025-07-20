import React from 'react';
import { RigidBody } from '@react-three/rapier';

import { generateTerrain } from '../utils/terrainGenerator';
import { loadBlockTexture } from '../utils/textureGenerator';

interface MinecraftWorldProps {
  onSelectCountry?: (country: string) => void;
}

const MinecraftWorld: React.FC<MinecraftWorldProps> = ({ onSelectCountry }) => {
  // Example terrain blocks
  const blocks = generateTerrain(10, 10);
  const texture = loadBlockTexture();

  return (
    <group>
      {blocks.map((pos, idx) => (
        <RigidBody key={idx} type="fixed" colliders="cuboid">
          <mesh
            position={pos}
            onClick={() => onSelectCountry && onSelectCountry('Morocco')}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={texture} />
          </mesh>
        </RigidBody>
      ))}
    </group>
  );
};

export default MinecraftWorld;
