
import React from 'react';

interface MazeCeilingProps {
  width: number;
  height: number;
}

const MazeCeiling: React.FC<MazeCeilingProps> = ({ width, height }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[width / 2 - 0.5, 1.5, height / 2 - 0.5]} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="#121420" opacity={0.7} transparent />
    </mesh>
  );
};

export default MazeCeiling;
