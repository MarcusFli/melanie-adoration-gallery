import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MelanieCharacterProps {
  position: [number, number, number];
  direction: number;
  isMoving: boolean;
}

const MelanieCharacter: React.FC<MelanieCharacterProps> = ({ position, direction, isMoving }) => {
  // Main refs
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  
  // Additional clothing refs
  const dressRef = useRef<THREE.Mesh>(null);
  const hairTopRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  
  // Enhanced character colors
  const skinColor = new THREE.Color('#f8d8c8');    // Skin tone
  const clothesColor = new THREE.Color('#9B87F5'); // Purple clothes
  const hairColor = new THREE.Color('#1a1a1a');    // Black hair
  const eyeColor = new THREE.Color('#4a2c0a');     // Brown eyes
  const lipsColor = new THREE.Color('#d98c8c');    // Lips
  const darkerClothes = new THREE.Color('#7E69AB'); // Darker purple for shading
  const jeansColor = new THREE.Color('#4a47a3');   // Jeans color
  
  // Create custom face texture
  const faceTexture = new THREE.CanvasTexture(createFaceTexture());
  
  // Create lips texture
  const lipsTexture = new THREE.CanvasTexture(createLipsTexture());
  
  // Create eye texture with detailed iris and pupil
  const eyeTexture = new THREE.CanvasTexture(createEyeTexture());
  
  // Create hair texture for more realistic look
  const hairTexture = new THREE.CanvasTexture(createHairTexture());
  
  // Create clothing texture with pattern
  const clothingTexture = new THREE.CanvasTexture(createClothingTexture());
  
  function createFaceTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base skin color
      context.fillStyle = '#f8d8c8';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle skin tone variations for realism
      context.fillStyle = '#f3d0bc';
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 15 + 5;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
      
      // Add subtle blush to cheeks
      context.fillStyle = 'rgba(240, 150, 150, 0.2)';
      context.beginPath();
      context.ellipse(160, 240, 50, 40, 0, 0, Math.PI * 2);
      context.ellipse(352, 240, 50, 40, 0, 0, Math.PI * 2);
      context.fill();
      
      // Add eyebrows with gradient
      const eyebrowGradient = context.createLinearGradient(150, 160, 150, 180);
      eyebrowGradient.addColorStop(0, '#1a1a1a');
      eyebrowGradient.addColorStop(1, '#3a3a3a');
      context.fillStyle = eyebrowGradient;
      
      // Left eyebrow
      context.beginPath();
      context.moveTo(130, 160);
      context.bezierCurveTo(160, 150, 190, 160, 210, 170);
      context.bezierCurveTo(190, 175, 160, 165, 130, 170);
      context.fill();
      
      // Right eyebrow
      context.beginPath();
      context.moveTo(300, 160);
      context.bezierCurveTo(330, 150, 360, 160, 380, 170);
      context.bezierCurveTo(360, 175, 330, 165, 300, 170);
      context.fill();
    }
    
    return canvas;
  }
  
  function createLipsTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient for lips
      const lipGradient = context.createLinearGradient(0, 30, 0, 80);
      lipGradient.addColorStop(0, '#d98c8c');
      lipGradient.addColorStop(0.5, '#e3a6a6');
      lipGradient.addColorStop(1, '#c27878');
      context.fillStyle = lipGradient;
      
      // Draw upper lip
      context.beginPath();
      context.moveTo(60, 40);
      context.bezierCurveTo(100, 20, 156, 20, 196, 40);
      context.bezierCurveTo(156, 50, 100, 50, 60, 40);
      context.fill();
      
      // Draw lower lip
      context.beginPath();
      context.moveTo(60, 40);
      context.bezierCurveTo(100, 70, 156, 70, 196, 40);
      context.bezierCurveTo(156, 90, 100, 90, 60, 40);
      context.fill();
      
      // Add lip shine
      context.fillStyle = 'rgba(255,255,255,0.3)';
      context.beginPath();
      context.ellipse(128, 45, 40, 10, 0, 0, Math.PI * 2);
      context.fill();
    }
    
    return canvas;
  }
  
  function createEyeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Draw white of eye
      context.fillStyle = '#ffffff';
      context.beginPath();
      context.ellipse(128, 128, 120, 120, 0, 0, Math.PI * 2);
      context.fill();
      
      // Draw iris with gradient
      const irisGradient = context.createRadialGradient(128, 128, 0, 128, 128, 60);
      irisGradient.addColorStop(0, '#7a5e38');
      irisGradient.addColorStop(0.7, '#4a2c0a');
      irisGradient.addColorStop(1, '#2a1600');
      context.fillStyle = irisGradient;
      context.beginPath();
      context.ellipse(128, 128, 60, 60, 0, 0, Math.PI * 2);
      context.fill();
      
      // Draw pupil
      context.fillStyle = '#000000';
      context.beginPath();
      context.ellipse(128, 128, 25, 25, 0, 0, Math.PI * 2);
      context.fill();
      
      // Add eye shine
      context.fillStyle = 'rgba(255,255,255,0.9)';
      context.beginPath();
      context.ellipse(100, 100, 15, 15, 0, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = 'rgba(255,255,255,0.5)';
      context.beginPath();
      context.ellipse(160, 110, 8, 8, 0, 0, Math.PI * 2);
      context.fill();
      
      // Add subtle iris detail
      context.strokeStyle = 'rgba(0,0,0,0.3)';
      context.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = 128 + Math.cos(angle) * 30;
        const y1 = 128 + Math.sin(angle) * 30;
        const x2 = 128 + Math.cos(angle) * 60;
        const y2 = 128 + Math.sin(angle) * 60;
        
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }
    }
    
    return canvas;
  }
  
  function createHairTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base hair color
      context.fillStyle = '#1a1a1a';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add hair strands for texture
      context.strokeStyle = '#2a2a2a';
      context.lineWidth = 2;
      
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * canvas.width;
        const length = Math.random() * 100 + 50;
        const curve = Math.random() * 30 - 15;
        
        context.beginPath();
        context.moveTo(x, 0);
        context.bezierCurveTo(
          x + curve, length / 3,
          x - curve, length / 2,
          x, length
        );
        context.stroke();
      }
      
      // Add highlights
      context.strokeStyle = 'rgba(80,80,80,0.5)';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const length = Math.random() * 150 + 50;
        
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, length);
        context.stroke();
      }
    }
    
    return canvas;
  }
  
  function createClothingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base color
      context.fillStyle = '#9B87F5';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle pattern
      context.fillStyle = '#8A76E4';
      
      // Create grid pattern
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if ((x / gridSize + y / gridSize) % 2 === 0) {
            context.fillRect(x, y, gridSize, gridSize);
          }
        }
      }
      
      // Add some random texture details
      context.fillStyle = '#B79FFF';
      for (let i = 0; i < 200; i++) {
        const size = Math.random() * 5 + 2;
        context.beginPath();
        context.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          size,
          0,
          Math.PI * 2
        );
        context.fill();
      }
    }
    
    return canvas;
  }

  // Animation logic
  useFrame((state) => {
    if (groupRef.current) {
      // Rotate character based on direction
      const targetRotation = direction * (Math.PI / 2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.2
      );
      
      if (isMoving) {
        // Walking animation
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
        
        // Subtle body movement while walking
        if (bodyRef.current) {
          bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * walkSpeed * 2) * 0.03;
          bodyRef.current.rotation.z = Math.sin(state.clock.elapsedTime * walkSpeed) * 0.03;
        }
        
        // Head bobbing slightly while walking
        if (headRef.current) {
          headRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * walkSpeed) * 0.02;
          headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * walkSpeed * 0.5) * 0.1;
        }
        
        // Dress movement
        if (dressRef.current) {
          dressRef.current.rotation.z = Math.sin(state.clock.elapsedTime * walkSpeed) * 0.03;
        }
        
        // Eye movement
        if (leftEyeRef.current && rightEyeRef.current) {
          const blinkRate = Math.sin(state.clock.elapsedTime * 0.5);
          if (blinkRate > 0.95) {
            leftEyeRef.current.scale.y = 0.1;
            rightEyeRef.current.scale.y = 0.1;
          } else {
            leftEyeRef.current.scale.y = 1;
            rightEyeRef.current.scale.y = 1;
          }
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
        
        // Subtle idle head movement
        if (headRef.current) {
          headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
          headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
        
        // Eye blinking
        if (leftEyeRef.current && rightEyeRef.current) {
          const blinkRate = Math.sin(state.clock.elapsedTime * 0.5);
          if (blinkRate > 0.95) {
            leftEyeRef.current.scale.y = 0.1;
            rightEyeRef.current.scale.y = 0.1;
          } else {
            leftEyeRef.current.scale.y = 1;
            rightEyeRef.current.scale.y = 1;
          }
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
      {/* Main dress/body */}
      <mesh ref={dressRef} position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.35, 0.7, 16]} />
        <meshStandardMaterial 
          map={clothingTexture}
          color={clothesColor} 
          roughness={0.6}
          metalness={0.1}
          emissive="#6d28d9"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Upper body/torso */}
      <mesh ref={bodyRef} position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.3, 16]} />
        <meshStandardMaterial 
          color={clothesColor} 
          roughness={0.6}
          metalness={0.1}
          emissive="#6d28d9"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Dress decorative belt */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <torusGeometry args={[0.22, 0.03, 16, 32]} />
        <meshStandardMaterial 
          color={darkerClothes} 
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
        <meshStandardMaterial 
          color={skinColor}
          roughness={0.6}
        />
      </mesh>
      
      {/* Head - more realistic with face texture */}
      <mesh ref={headRef} position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial 
          map={faceTexture}
          color={skinColor}
          roughness={0.6}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh ref={leftEyeRef} position={[-0.09, 1.2, 0.15]} castShadow>
        <sphereGeometry args={[0.05, 16, 16, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial 
          map={eyeTexture}
          roughness={0.3}
        />
      </mesh>
      
      <mesh ref={rightEyeRef} position={[0.09, 1.2, 0.15]} castShadow>
        <sphereGeometry args={[0.05, 16, 16, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial 
          map={eyeTexture}
          roughness={0.3}
        />
      </mesh>
      
      {/* Mouth/Lips */}
      <mesh position={[0, 1.05, 0.2]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <planeGeometry args={[0.15, 0.05]} />
        <meshStandardMaterial 
          map={lipsTexture}
          transparent={true}
          roughness={0.5}
        />
      </mesh>
      
      {/* Main hair */}
      <mesh ref={hairTopRef} position={[0, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.27, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          map={hairTexture}
          color={hairColor} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Bangs - more realistic */}
      <mesh position={[0, 1.25, 0.15]} castShadow>
        <boxGeometry args={[0.5, 0.25, 0.1]} />
        <meshStandardMaterial 
          map={hairTexture}
          color={hairColor} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Hair volume on sides */}
      <mesh position={[-0.2, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          map={hairTexture}
          color={hairColor} 
          roughness={0.8}
        />
      </mesh>
      
      <mesh position={[0.2, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          map={hairTexture}
          color={hairColor} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Hair strands */}
      <mesh position={[-0.2, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshStandardMaterial 
          map={hairTexture}
          color={hairColor} 
          roughness={0.8}
        />
      </mesh>
      
      <mesh position={[0.2, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshStandardMaterial 
          map={hairTexture}
          color={hairColor} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Arms - more rounded and detailed */}
      <mesh 
        ref={leftArmRef} 
        position={[-0.25, 0.7, 0]} 
        rotation={[0, 0, Math.PI * 0.1]}
        castShadow
      >
        <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
        <meshStandardMaterial color={clothesColor} roughness={0.6} />
      </mesh>
      
      <mesh 
        ref={rightArmRef} 
        position={[0.25, 0.7, 0]} 
        rotation={[0, 0, -Math.PI * 0.1]}
        castShadow
      >
        <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
        <meshStandardMaterial color={clothesColor} roughness={0.6} />
      </mesh>
      
      {/* Hands with detailed fingers */}
      <mesh position={[-0.32, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Thumb */}
      <mesh position={[-0.35, 0.54, 0.03]} rotation={[0, 0, Math.PI * 0.25]} castShadow>
        <capsuleGeometry args={[0.015, 0.04, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Other fingers */}
      <mesh position={[-0.38, 0.5, 0]} rotation={[0, 0, Math.PI * 0.5]} castShadow>
        <capsuleGeometry args={[0.015, 0.05, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      <mesh position={[0.32, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Thumb */}
      <mesh position={[0.35, 0.54, 0.03]} rotation={[0, 0, -Math.PI * 0.25]} castShadow>
        <capsuleGeometry args={[0.015, 0.04, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Other fingers */}
      <mesh position={[0.38, 0.5, 0]} rotation={[0, 0, -Math.PI * 0.5]} castShadow>
        <capsuleGeometry args={[0.015, 0.05, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Legs - more detailed and realistic */}
      <mesh 
        ref={leftLegRef} 
        position={[-0.12, 0.25, 0]} 
        castShadow
      >
        <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
        <meshStandardMaterial color={jeansColor} roughness={0.7} />
      </mesh>
      
      <mesh 
        ref={rightLegRef} 
        position={[0.12, 0.25, 0]} 
        castShadow
      >
        <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
        <meshStandardMaterial color={jeansColor} roughness={0.7} />
      </mesh>
      
      {/* Feet with more detail */}
      <mesh position={[-0.12, 0.05, 0.07]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.15]} />
        <meshStandardMaterial color="#000000" roughness={0.7} />
      </mesh>
      
      <mesh position={[0.12, 0.05, 0.07]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.15]} />
        <meshStandardMaterial color="#000000" roughness={0.7} />
      </mesh>
      
      {/* Shoe details */}
      <mesh position={[-0.12, 0.08, 0.13]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.03]} />
        <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.2} />
      </mesh>
      
      <mesh position={[0.12, 0.08, 0.13]} castShadow>
        <boxGeometry args={[0.08, 0.02, 0.03]} />
        <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.2} />
      </mesh>
      
      {/* Character subtle glow */}
      <pointLight 
        position={[0, 0.8, 0]} 
        intensity={0.7} 
        color="#9B87F5" 
        distance={1.8}
        decay={2}
      />
    </group>
  );
};

export default MelanieCharacter;
