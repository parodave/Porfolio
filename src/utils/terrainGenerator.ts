export const generateTerrain = (width: number, depth: number) => {
  const blocks: [number, number, number][] = [];
  for (let x = 0; x < width; x++) {
    for (let z = 0; z < depth; z++) {
      blocks.push([x, 0, z]);
    }
  }
  return blocks;
};
