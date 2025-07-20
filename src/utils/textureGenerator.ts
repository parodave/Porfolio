import * as THREE from "three";
import { TextureLoader } from 'three';

let cachedTexture: THREE.Texture | null = null;

export const loadBlockTexture = () => {
  if (cachedTexture) return cachedTexture;
  const loader = new TextureLoader();
  cachedTexture = loader.load(
    'https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/grass.jpg'
  );
  cachedTexture.magFilter = THREE.NearestFilter;
  cachedTexture.minFilter = THREE.NearestFilter;
  return cachedTexture;
};
