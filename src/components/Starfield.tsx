'use client';

import React from 'react';
import { Stars } from '@react-three/drei';

const Starfield: React.FC = () => (
  <Stars
    radius={100}
    depth={50}
    count={2000}
    factor={4}
    saturation={0}
    fade
    renderOrder={-1}
    speed={1}
  />
);

export default Starfield;
