
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
  
  // Melanie character colors
  const clothesColor = new THREE.Color('#9B87F5'); // Purple for clothes
  const skinColor = new THREE.Color('#f8d8c8');    // Skin tone
  const hairColor = new THREE.Color('#1a1a1a');    // Black hair
  const eyeColor = new THREE.Color('#4a2c0a');     // Brown eyes
  
  // Create custom face texture
  const faceTexture = new THREE.CanvasTexture(createFaceTexture());
  
  function createFaceTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Fill with skin tone
      context.fillStyle = '#f8d8c8';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw brown eyes
      context.fillStyle = '#4a2c0a';
      context.beginPath();
      context.ellipse(85, 100, 15, 8, 0, 0, 2 * Math.PI);
      context.ellipse(170, 100, 15, 8, 0, 0, 2 * Math.PI);
      context.fill();
      
      // Draw eyelashes
      context.strokeStyle = '#1a1a1a';
      context.lineWidth = 2;
      for (let i = -2; i <= 2; i++) {
        context.beginPath();
        context.moveTo(85 + i * 5, 92);
        context.lineTo(85 + i * 5, 82);
        context.stroke();
        
        context.beginPath();
        context.moveTo(170 + i * 5, 92);
        context.lineTo(170 + i * 5, 82);
        context.stroke();
      }
      
      // Draw mouth
      context.strokeStyle = '#d98c8c';
      context.lineWidth = 3;
      context.beginPath();
      context.arc(128, 170, 30, 0.1 * Math.PI, 0.9 * Math.PI);
      context.stroke();
      
      // Draw eyebrows
      context.fillStyle = '#1a1a1a';
      context.beginPath();
      context.rect(65, 75, 40, 5);
      context.rect(150, 75, 40, 5);
      context.fill();
    }
    
    return canvas;
  }

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
      {/* Body - more realistic with curves */}
      <mesh ref={bodyRef} position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 16]} />
        <meshStandardMaterial 
          color={clothesColor} 
          roughness={0.7}
          emissive="#6d28d9"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Head - more realistic with face texture */}
      <mesh ref={headRef} position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial 
          map={faceTexture}
          color={skinColor}
          roughness={0.7}
        />
      </mesh>
      
      {/* Hair - black */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.27, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={hairColor} roughness={0.6} />
      </mesh>
      
      {/* Bangs - more realistic hair */}
      <mesh position={[0, 1.05, 0.15]} castShadow>
        <boxGeometry args={[0.5, 0.15, 0.12]} />
        <meshStandardMaterial color={hairColor} roughness={0.6} />
      </mesh>
      
      {/* Hair strands */}
      <mesh position={[-0.2, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color={hairColor} roughness={0.6} />
      </mesh>
      
      <mesh position={[0.2, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color={hairColor} roughness={0.6} />
      </mesh>
      
      {/* Arms - more rounded */}
      <mesh 
        ref={leftArmRef} 
        position={[-0.25, 0.7, 0]} 
        castShadow
      >
        <capsuleGeometry args={[0.07, 0.4, 8, 16]} />
        <meshStandardMaterial color={clothesColor} roughness={0.7} />
      </mesh>
      
      <mesh 
        ref={rightArmRef} 
        position={[0.25, 0.7, 0]} 
        castShadow
      >
        <capsuleGeometry args={[0.07, 0.4, 8, 16]} />
        <meshStandardMaterial color={clothesColor} roughness={0.7} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.25, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      <mesh position={[0.25, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Legs - more rounded */}
      <mesh 
        ref={leftLegRef} 
        position={[-0.12, 0.25, 0]} 
        castShadow
      >
        <capsuleGeometry args={[0.07, 0.4, 8, 16]} />
        <meshStandardMaterial color="#4a47a3" roughness={0.7} />
      </mesh>
      
      <mesh 
        ref={rightLegRef} 
        position={[0.12, 0.25, 0]} 
        castShadow
      >
        <capsuleGeometry args={[0.07, 0.4, 8, 16]} />
        <meshStandardMaterial color="#4a47a3" roughness={0.7} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.12, 0.05, 0.05]} castShadow>
        <boxGeometry args={[0.1, 0.06, 0.2]} />
        <meshStandardMaterial color="#000000" roughness={0.7} />
      </mesh>
      
      <mesh position={[0.12, 0.05, 0.05]} castShadow>
        <boxGeometry args={[0.1, 0.06, 0.2]} />
        <meshStandardMaterial color="#000000" roughness={0.7} />
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
