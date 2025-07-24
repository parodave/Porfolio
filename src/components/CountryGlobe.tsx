import React, { useEffect, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import * as THREE from 'three';
import { useCountryStore } from '../store/countrySearch';

const CountryGlobe: React.FC = () => {
  const globeRef = useRef<GlobeMethods>(null);
  const haloRef = useRef<THREE.Mesh>();
  const selected = useCountryStore((s) => s.selected);

  useEffect(() => {
    if (selected && globeRef.current) {
      globeRef.current.pointOfView(
        { lat: selected.lat, lng: selected.lng, altitude: 1.5 },
        1000,
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
    <div className="w-full h-96">
      <Globe ref={globeRef} globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" />
    </div>
  );
};

export default CountryGlobe;
