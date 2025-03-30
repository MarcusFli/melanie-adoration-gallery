
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
      // Simplified color animation to avoid flickering
      const time = state.clock.elapsedTime * 0.3;
      const colorValue = 0x8B5CF6 + Math.sin(time) * 0x080808;
      meshRef.current.material.color.setHex(colorValue);
    }
  });

  return (
    <mesh position={position} ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
    </mesh>
  );
};

export default MazeWall;
