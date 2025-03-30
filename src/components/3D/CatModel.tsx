
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CatModelProps {
  position: [number, number, number];
}

const CatModel: React.FC<CatModelProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  // Using a cat image for texture
  const texture = useTexture('/lovable-uploads/f15488f5-ed08-4d00-9aee-533cd4744d7c.png');
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.NearestFilter; // Helps with pixelated textures
    }
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate cat slowly
      meshRef.current.rotation.y += 0.01;
      
      // Make it float
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Glow effect when hovered
      if (hovered) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.05);
      }
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          map={texture} 
          emissive="#ffcc00" 
          emissiveIntensity={hovered ? 0.5 : 0.2} 
          roughness={0.7}
        />
      </mesh>
      {/* Add a subtle light around the cat */}
      <pointLight 
        position={[position[0], position[1] + 0.5, position[2]]} 
        intensity={0.6} 
        color="#ffcc00" 
        distance={2}
        decay={2}
      />
    </group>
  );
};

export default CatModel;
