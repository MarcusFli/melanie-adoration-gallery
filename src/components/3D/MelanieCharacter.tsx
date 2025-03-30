
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface MelanieCharacterProps {
  position: [number, number, number];
  direction: number;
  isMoving: boolean;
}

const MelanieCharacter: React.FC<MelanieCharacterProps> = ({ position, direction, isMoving }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  
  const faceTexture = useTexture('/lovable-uploads/3a61898a-222f-4f13-bd6f-7ca84930e572.png');
  
  // Melanie character colors
  const clothesColor = new THREE.Color('#9B87F5'); // Purple for clothes
  const skinColor = new THREE.Color('#f8d8c8');    // Skin tone
  const hairColor = new THREE.Color('#4a2c1a');    // Dark brown hair
  
  useEffect(() => {
    if (faceTexture) {
      faceTexture.colorSpace = THREE.SRGBColorSpace;
      faceTexture.minFilter = THREE.LinearFilter;
      faceTexture.magFilter = THREE.NearestFilter;
    }
  }, [faceTexture]);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate character based on direction
      const targetRotation = direction * (Math.PI / 2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.2
      );
      
      // Walking animation
      if (isMoving) {
        // Moving animation
        const walkSpeed = 8;
        const walkIntensity = 0.2;
        
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = Math.sin(state.clock.elapsedTime * walkSpeed) * walkIntensity;
          rightLegRef.current.rotation.x = Math.sin(state.clock.elapsedTime * walkSpeed + Math.PI) * walkIntensity;
        }
        
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * walkSpeed + Math.PI) * walkIntensity;
          rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * walkSpeed) * walkIntensity;
        }
        
        // Small floating effect while moving
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.03;
      } else {
        // Idle animation
        const breatheSpeed = 1.5;
        const breatheIntensity = 0.05;
        
        if (bodyRef.current) {
          bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * breatheSpeed) * 0.02;
        }
        
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * breatheSpeed) * breatheIntensity;
          rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * breatheSpeed) * breatheIntensity;
        }
        
        // Reset leg positions
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = 0;
          rightLegRef.current.rotation.x = 0;
        }
        
        // Small idle floating
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={[position[0], position[1], position[2]]}
      castShadow
    >
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.2]} />
        <meshStandardMaterial 
          color={clothesColor} 
          roughness={0.7}
          emissive="#6d28d9"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          map={faceTexture} 
          roughness={0.7}
          emissive="#6d28d9"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.27, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={hairColor} roughness={0.7} />
      </mesh>
      
      {/* Arms */}
      <mesh 
        ref={leftArmRef} 
        position={[-0.3, 0.7, 0]} 
        castShadow
      >
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color={clothesColor} roughness={0.7} />
      </mesh>
      
      <mesh 
        ref={rightArmRef} 
        position={[0.3, 0.7, 0]} 
        castShadow
      >
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color={clothesColor} roughness={0.7} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.3, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      <mesh position={[0.3, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Legs */}
      <mesh 
        ref={leftLegRef} 
        position={[-0.15, 0.25, 0]} 
        castShadow
      >
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#4a47a3" roughness={0.7} />
      </mesh>
      
      <mesh 
        ref={rightLegRef} 
        position={[0.15, 0.25, 0]} 
        castShadow
      >
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#4a47a3" roughness={0.7} />
      </mesh>
      
      {/* Subtle glow */}
      <pointLight 
        position={[0, 0.8, 0]} 
        intensity={0.4} 
        color="#9B87F5" 
        distance={1.5}
        decay={2}
      />
    </group>
  );
};

export default MelanieCharacter;
