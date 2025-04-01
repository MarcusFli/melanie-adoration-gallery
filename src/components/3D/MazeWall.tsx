
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MazeWallProps {
  position: [number, number, number];
  rotationY: number;
  positionType: string;
}

const MazeWall: React.FC<MazeWallProps> = ({ 
  position, 
  rotationY, 
  positionType = 'normal' 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Simplified color animation to avoid flickering
      const time = state.clock.elapsedTime * 0.3;
      const colorValue = 0x8B5CF6 + Math.sin(time) * 0x080808;
      meshRef.current.material.color.setHex(colorValue);
    }
  });

  // Default size for walls
  const size: [number, number, number] = [1, 2, 0.1];
  // Default color (can be modified based on positionType)
  const color = positionType === 'special' ? '#FF5CF6' : '#8B5CF6';

  return (
    <mesh 
      position={position} 
      rotation={[0, rotationY, 0]} 
      ref={meshRef} 
      castShadow 
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
    </mesh>
  );
};

export default MazeWall;
