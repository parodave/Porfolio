'use client';

import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import * as THREE from 'three';
import { useCountryStore } from '../store/countrySearch';
import { useTheme } from '../hooks/useTheme';
import { continents, Continent } from '../data/continents';
import ContinentModal from './ContinentModal';

const CountryGlobe: React.FC = () => {
  const globeRef = useRef<GlobeMethods>(null);
  const haloRef = useRef<THREE.Mesh>();
  const { theme } = useTheme();
  const selected = useCountryStore((s) => s.selected);
  const [globeUrl, setGlobeUrl] = useState('');
  const [activeContinent, setActiveContinent] = useState<Continent | null>(null);

  useEffect(() => {
    setGlobeUrl(
      theme === 'dark'
        ? '//unpkg.com/three-globe/example/img/earth-dark.jpg'
        : '//unpkg.com/three-globe/example/img/earthmap4k.jpg'
    );
  }, [theme]);

  useEffect(() => {
    if (globeRef.current && globeUrl) {
      globeRef.current.globeImageUrl(globeUrl);
    }
  }, [globeUrl]);

  useEffect(() => {
    if (selected && globeRef.current) {
      globeRef.current.pointOfView(
        { lat: selected.lat, lng: selected.lng, altitude: 1.5 },
        1000
      );
    }
  }, [selected]);

  // Create halo sphere around the globe
  useEffect(() => {
    if (!globeRef.current) return;

    const radius = globeRef.current.getGlobeRadius();
    const geometry = new THREE.SphereGeometry(radius * 1.02, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(geometry, material);
    halo.raycast = () => null;
    globeRef.current.scene().add(halo);
    haloRef.current = halo;

    return () => {
      globeRef.current?.scene().remove(halo);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Animate halo pulsing
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      if (haloRef.current) {
        const scale = 1.02 + Math.sin(Date.now() / 600) * 0.05;
        haloRef.current.scale.set(scale, scale, scale);
      }
      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="w-full h-96 relative">
      <Globe
        ref={globeRef}
        globeImageUrl={globeUrl}
        pointsData={continents}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointColor={() => 'orange'}
        pointRadius={0.5}
        onPointClick={(d) => setActiveContinent(d)}
      />
      <ContinentModal
        continent={activeContinent}
        onClose={() => setActiveContinent(null)}
        onViewProjects={(c) => console.log('View projects for', c.id)}
      />
    </div>
  );
};

export default CountryGlobe;
