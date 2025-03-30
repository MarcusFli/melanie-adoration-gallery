
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface MelanieCharacterProps {
  position: [number, number, number];
  direction: number;
  isMoving: boolean;
}

const MelanieCharacter: React.FC<MelanieCharacterProps> = ({ position, direction, isMoving }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/lovable-uploads/3a61898a-222f-4f13-bd6f-7ca84930e572.png');
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.NearestFilter; // Helps with pixelated textures
    }
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate character based on direction
      const targetRotation = direction * (Math.PI / 2);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation,
        0.2
      );
      
      // Add a slight floating animation
      if (isMoving) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.05;
      } else {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial 
        map={texture} 
        emissive="#6d28d9"
        emissiveIntensity={0.15}
        roughness={0.7} 
      />
      <pointLight intensity={0.2} distance={1.5} color="#9B87F5" />
    </mesh>
  );
};

export default MelanieCharacter;
