
import React from 'react';

interface MazeFloorProps {
  width: number;
  height: number;
}

const MazeFloor: React.FC<MazeFloorProps> = ({ width, height }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 - 0.5, -0.5, height / 2 - 0.5]} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="#1A1F2C" />
    </mesh>
  );
};

export default MazeFloor;
