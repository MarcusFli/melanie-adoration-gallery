
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MazeWallProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}

const MazeWall: React.FC<MazeWallProps> = ({ position, size, color = '#8B5CF6' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Optional: Add subtle animations to walls
      meshRef.current.material.color.setHex(0x8B5CF6 + Math.sin(state.clock.elapsedTime * 0.5) * 0x111111);
    }
  });

  return (
    <mesh position={position} ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default MazeWall;
