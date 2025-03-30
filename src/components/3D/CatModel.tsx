
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CatModelProps {
  position: [number, number, number];
}

const CatModel: React.FC<CatModelProps> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  // Use the cat image texture
  const texture = useTexture('/lovable-uploads/320954f8-fe29-4097-b8c9-3d4e0aaf3d52.png');
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.NearestFilter;
    }
  }, [texture]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += 0.005;
      
      // Make it float
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      
      // Tail movement
      if (bodyRef.current) {
        bodyRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.02;
      }
      
      // Head movement
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      }
      
      // Glow effect when hovered
      if (hovered && groupRef.current) {
        groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.05);
      }
    }
  });

  // Cream color for the cat
  const catColor = new THREE.Color('#f5e8d8');
  
  return (
    <group 
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cat body */}
      <mesh 
        ref={bodyRef}
        position={[0, 0.05, 0]}
        castShadow
      >
        <capsuleGeometry args={[0.25, 0.5, 8, 16]} />
        <meshStandardMaterial 
          color={catColor}
          roughness={0.7}
          emissive="#ffeecc"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Cat head with texture */}
      <mesh 
        ref={headRef}
        position={[0, 0.25, 0.3]}
        castShadow
      >
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.7}
          emissive="#ffeecc"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Ears */}
      <mesh position={[0.15, 0.45, 0.3]} rotation={[0, 0, 0.5]} castShadow>
        <coneGeometry args={[0.08, 0.2, 16]} />
        <meshStandardMaterial color={catColor} />
      </mesh>
      
      <mesh position={[-0.15, 0.45, 0.3]} rotation={[0, 0, -0.5]} castShadow>
        <coneGeometry args={[0.08, 0.2, 16]} />
        <meshStandardMaterial color={catColor} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0, -0.4]} rotation={[0.5, 0, 0]} castShadow>
        <capsuleGeometry args={[0.05, 0.6, 8, 16]} />
        <meshStandardMaterial color={catColor} />
      </mesh>
      
      {/* Add a subtle light around the cat */}
      <pointLight 
        position={[0, 0.5, 0]} 
        intensity={0.6} 
        color="#ffffcc" 
        distance={2}
        decay={2}
      />
    </group>
  );
};

export default CatModel;
