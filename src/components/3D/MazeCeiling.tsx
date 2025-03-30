
import React from 'react';
import * as THREE from 'three';

interface MazeCeilingProps {
  width: number;
  height: number;
}

const MazeCeiling: React.FC<MazeCeilingProps> = ({ width, height }) => {
  return (
    <mesh 
      rotation={[Math.PI / 2, 0, 0]} 
      position={[width / 2 - 0.5, 1.01, height / 2 - 0.5]} 
      receiveShadow
    >
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="#121420" roughness={0.9} transparent opacity={0.7} />
    </mesh>
  );
};

export default MazeCeiling;
