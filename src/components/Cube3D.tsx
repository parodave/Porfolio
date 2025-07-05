import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cube3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    mountNode.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Cube geometry with wireframe
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );

    // Create transparent faces
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    scene.add(line);

    // Position camera
    camera.position.z = 5;

    // Add particles inside the cube
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positionArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random positions within the cube
      positionArray[i] = (Math.random() - 0.5) * 2.5;
      positionArray[i + 1] = (Math.random() - 0.5) * 2.5;
      positionArray[i + 2] = (Math.random() - 0.5) * 2.5;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.004;
      cube.rotation.y += 0.004;
      line.rotation.x += 0.004;
      line.rotation.y += 0.004;
      particles.rotation.x += 0.002;
      particles.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      geometry.dispose();
      edges.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Cube3D;