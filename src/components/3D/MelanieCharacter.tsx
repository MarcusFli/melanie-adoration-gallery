
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
  
  // Additional refs for facial features
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftEarRef = useRef<THREE.Mesh>(null);
  const rightEarRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const noseRef = useRef<THREE.Mesh>(null);
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);
  
  // Clothing refs
  const dressRef = useRef<THREE.Mesh>(null);
  const hairTopRef = useRef<THREE.Mesh>(null);
  const hairBackRef = useRef<THREE.Mesh>(null);
  
  // Color change for lights
  const [lightColor, setLightColor] = useState(new THREE.Color('#9B87F5'));
  const lightChangeTimeRef = useRef(0);
  
  // Enhanced character colors
  const skinColor = new THREE.Color('#f8d8c8');    // Skin tone
  const clothesColor = new THREE.Color('#9B87F5'); // Purple clothes
  const hairColor = new THREE.Color('#1a1a1a');    // Black hair
  const eyeColor = new THREE.Color('#4a2c0a');     // Brown eyes
  const lipsColor = new THREE.Color('#d98c8c');    // Lips
  const darkerClothes = new THREE.Color('#7E69AB'); // Darker purple for shading
  const jeansColor = new THREE.Color('#4a47a3');   // Jeans color
  
  // Create face texture function
  function createFaceTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base skin color
      context.fillStyle = '#f8d8c8';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create softer blush on cheeks
      const blushGradient = context.createRadialGradient(64, 140, 5, 64, 140, 30);
      blushGradient.addColorStop(0, 'rgba(225, 150, 150, 0.4)');
      blushGradient.addColorStop(1, 'rgba(225, 150, 150, 0)');
      
      context.fillStyle = blushGradient;
      context.beginPath();
      context.arc(64, 140, 30, 0, Math.PI * 2);
      context.fill();
      
      const blushGradient2 = context.createRadialGradient(192, 140, 5, 192, 140, 30);
      blushGradient2.addColorStop(0, 'rgba(225, 150, 150, 0.4)');
      blushGradient2.addColorStop(1, 'rgba(225, 150, 150, 0)');
      
      context.fillStyle = blushGradient2;
      context.beginPath();
      context.arc(192, 140, 30, 0, Math.PI * 2);
      context.fill();
      
      // Add subtle skin highlights for more dimension
      context.fillStyle = 'rgba(255, 255, 255, 0.1)';
      context.beginPath();
      context.ellipse(128, 100, 100, 70, 0, 0, Math.PI * 2);
      context.fill();
    }
    
    return canvas;
  }
  
  // Create lips texture function
  function createLipsTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Transparent background
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create lip gradient for more natural look
      const lipGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      lipGradient.addColorStop(0, '#d98c8c');
      lipGradient.addColorStop(0.5, '#e09d9d');
      lipGradient.addColorStop(1, '#d98c8c');
      
      context.fillStyle = lipGradient;
      
      // Upper lip shape
      context.beginPath();
      context.moveTo(20, 20);
      context.quadraticCurveTo(64, 5, 108, 20);
      context.quadraticCurveTo(64, 35, 20, 20);
      context.fill();
      
      // Lower lip shape - slightly fuller
      context.beginPath();
      context.moveTo(20, 22);
      context.quadraticCurveTo(64, 50, 108, 22);
      context.quadraticCurveTo(64, 25, 20, 22);
      context.fill();
      
      // Add subtle lip gloss highlight
      context.fillStyle = 'rgba(255, 255, 255, 0.3)';
      context.beginPath();
      context.ellipse(64, 23, 40, 5, 0, 0, Math.PI);
      context.fill();
    }
    
    return canvas;
  }
  
  // Create hair texture function
  function createHairTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base hair color
      context.fillStyle = '#1a1a1a';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle hair strands and highlights
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const width = Math.random() * 4 + 1;
        const height = Math.random() * 20 + 10;
        const angle = Math.random() * Math.PI;
        
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        
        // Vary strand colors slightly for more natural look
        const brightness = Math.random() * 20 + 10;
        context.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        context.fillRect(-width/2, -height/2, width, height);
        
        context.restore();
      }
      
      // Add subtle highlight areas
      context.fillStyle = 'rgba(80, 80, 80, 0.2)';
      context.beginPath();
      context.ellipse(128, 128, 100, 80, 0, 0, Math.PI * 2);
      context.fill();
    }
    
    return canvas;
  }
  
  // Create clothing texture function
  function createClothingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base clothing color - purple
      context.fillStyle = '#9B87F5';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle pattern to clothing
      context.strokeStyle = 'rgba(155, 135, 245, 0.7)';
      context.lineWidth = 2;
      
      // Create grid pattern
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }
      
      // Add shading/highlight
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    return canvas;
  }
  
  // Create ear texture function
  function createEarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base ear color - slightly darker than skin tone
      context.fillStyle = '#f0d0b8';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add ear canal
      context.fillStyle = '#e0c0a8';
      context.beginPath();
      context.arc(64, 64, 20, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = '#d0b098';
      context.beginPath();
      context.arc(64, 64, 12, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = '#a08070';
      context.beginPath();
      context.arc(64, 64, 6, 0, Math.PI * 2);
      context.fill();
      
      // Add highlights
      context.fillStyle = 'rgba(255, 255, 255, 0.3)';
      context.beginPath();
      context.ellipse(50, 50, 30, 20, Math.PI/4, 0, Math.PI * 2);
      context.fill();
    }
    
    return canvas;
  }

  // Create custom face texture
  const [faceTexture] = useState(() => new THREE.CanvasTexture(createFaceTexture()));
  
  // Create lips texture
  const [lipsTexture] = useState(() => new THREE.CanvasTexture(createLipsTexture()));
  
  // Create eye texture with detailed iris and pupil
  const [eyeTexture] = useState(() => new THREE.CanvasTexture(createEyeTexture()));
  
  // Create hair texture for more realistic look
  const [hairTexture] = useState(() => new THREE.CanvasTexture(createHairTexture()));
  
  // Create clothing texture with pattern
  const [clothingTexture] = useState(() => new THREE.CanvasTexture(createClothingTexture()));
  
  // Create ear texture
  const [earTexture] = useState(() => new THREE.CanvasTexture(createEarTexture()));
  
  // Create nose texture
  const [noseTexture] = useState(() => new THREE.CanvasTexture(createNoseTexture()));
  
  function createNoseTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base nose color - more natural tone
      context.fillStyle = '#f5d0c5';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create softer, more refined nose shape
      context.fillStyle = '#f0c5b5';
      context.beginPath();
      context.ellipse(64, 64, 40, 50, 0, 0, Math.PI * 2);
      context.fill();
      
      // Create nostril shapes - more subtle and natural
      context.fillStyle = '#e0b5a8';
      context.beginPath();
      context.ellipse(50, 85, 10, 8, 0, 0, Math.PI * 2);
      context.ellipse(78, 85, 10, 8, 0, 0, Math.PI * 2);
      context.fill();
      
      // Create nostril shadows - softer
      context.fillStyle = '#d0a598';
      context.beginPath();
      context.ellipse(50, 85, 5, 4, 0, 0, Math.PI * 2);
      context.ellipse(78, 85, 5, 4, 0, 0, Math.PI * 2);
      context.fill();
      
      // Create bridge highlight for more defined shape
      const gradient = context.createLinearGradient(64, 20, 64, 70);
      gradient.addColorStop(0, 'rgba(255, 245, 240, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 245, 240, 0.1)');
      context.fillStyle = gradient;
      context.beginPath();
      context.moveTo(54, 30);
      context.quadraticCurveTo(64, 20, 74, 30);
      context.quadraticCurveTo(64, 70, 54, 30);
      context.fill();
      
      // Add subtle contours
      context.strokeStyle = 'rgba(210, 180, 170, 0.2)';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(64, 40);
      context.lineTo(64, 80);
      context.stroke();
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
      
      // Add more realistic sclera texture with subtle veins
      context.strokeStyle = 'rgba(255,100,100,0.05)';
      context.lineWidth = 0.5;
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const length = Math.random() * 80 + 40;
        const startX = 128 + Math.cos(angle) * 70;
        const startY = 128 + Math.sin(angle) * 70;
        const endX = 128 + Math.cos(angle) * length;
        const endY = 128 + Math.sin(angle) * length;
        
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
      }
      
      // Draw iris with gradient - more detailed
      const irisGradient = context.createRadialGradient(128, 128, 0, 128, 128, 60);
      irisGradient.addColorStop(0, '#8c6e48');  // Lighter center
      irisGradient.addColorStop(0.6, '#6a4c28'); // Mid tone
      irisGradient.addColorStop(0.8, '#4a2c0a'); // Dark brown
      irisGradient.addColorStop(1, '#2a1600');   // Almost black edge
      context.fillStyle = irisGradient;
      context.beginPath();
      context.ellipse(128, 128, 60, 60, 0, 0, Math.PI * 2);
      context.fill();
      
      // Add iris texture - starburst pattern
      context.strokeStyle = 'rgba(80,50,0,0.3)';
      context.lineWidth = 0.5;
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const x1 = 128 + Math.cos(angle) * 20;
        const y1 = 128 + Math.sin(angle) * 20;
        const x2 = 128 + Math.cos(angle) * 60;
        const y2 = 128 + Math.sin(angle) * 60;
        
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }
      
      // Add iris ring - more definition
      context.strokeStyle = '#1a0d00';
      context.lineWidth = 2;
      context.beginPath();
      context.arc(128, 128, 60, 0, Math.PI * 2);
      context.stroke();
      
      // Draw pupil - softer edge
      const pupilGradient = context.createRadialGradient(128, 128, 0, 128, 128, 28);
      pupilGradient.addColorStop(0, '#000000');
      pupilGradient.addColorStop(0.9, '#000000');
      pupilGradient.addColorStop(1, 'rgba(0,0,0,0.9)');
      context.fillStyle = pupilGradient;
      context.beginPath();
      context.ellipse(128, 128, 25, 25, 0, 0, Math.PI * 2);
      context.fill();
      
      // Add multiple eye shine highlights for realism
      context.fillStyle = 'rgba(255,255,255,0.9)';
      context.beginPath();
      context.ellipse(100, 100, 15, 15, 0, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = 'rgba(255,255,255,0.7)';
      context.beginPath();
      context.ellipse(150, 110, 8, 8, 0, 0, Math.PI * 2);
      context.fill();
      
      context.fillStyle = 'rgba(255,255,255,0.4)';
      context.beginPath();
      context.ellipse(135, 140, 5, 5, 0, 0, Math.PI * 2);
      context.fill();
    }
    
    return canvas;
  }
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate character based on direction
      const targetRotation = direction * (Math.PI / 2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.2
      );
      
      // Slow color change for character glow (reduced by 50%)
      lightChangeTimeRef.current += delta * 0.1; // Further reduced from 0.2 to 0.1
      const hue = (Math.sin(lightChangeTimeRef.current) + 1) / 2;
      const color = new THREE.Color().setHSL(hue, 0.6, 0.6);
      setLightColor(color);
      
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
          
          // Add some sideways arm movement for realism
          leftArmRef.current.rotation.z = -0.1 + Math.sin(state.clock.elapsedTime * walkSpeed) * 0.05;
          rightArmRef.current.rotation.z = 0.1 + Math.sin(state.clock.elapsedTime * walkSpeed) * 0.05;
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
        
        // Eye movement and blinking
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
        
        // Pupil movement
        if (leftPupilRef.current && rightPupilRef.current) {
          const lookX = Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
          const lookY = Math.cos(state.clock.elapsedTime * 0.7) * 0.01;
          
          leftPupilRef.current.position.x = -0.09 + lookX;
          leftPupilRef.current.position.y = 1.2 + lookY;
          
          rightPupilRef.current.position.x = 0.09 + lookX;
          rightPupilRef.current.position.y = 1.2 + lookY;
        }
        
        // Mouth animation while walking - subtle smile/frown changes
        if (mouthRef.current) {
          mouthRef.current.scale.x = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
          mouthRef.current.scale.y = 1.0 + Math.cos(state.clock.elapsedTime * 3) * 0.1;
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
          
          // Keep natural arm position
          leftArmRef.current.rotation.z = -0.1;
          rightArmRef.current.rotation.z = 0.1;
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
        
        // Occasional random eye movement during idle
        if (leftPupilRef.current && rightPupilRef.current) {
          const lookX = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
          const lookY = Math.cos(state.clock.elapsedTime * 0.4) * 0.01;
          
          leftPupilRef.current.position.x = -0.09 + lookX;
          leftPupilRef.current.position.y = 1.2 + lookY;
          
          rightPupilRef.current.position.x = 0.09 + lookX;
          rightPupilRef.current.position.y = 1.2 + lookY;
        }
        
        // Subtle mouth movements for idle breathing
        if (mouthRef.current) {
          mouthRef.current.scale.y = 1.0 + Math.sin(state.clock.elapsedTime * breatheSpeed) * 0.05;
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
      {/* Position front of character to face Z direction by default */}
      <group rotation={[0, Math.PI, 0]}>
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
        
        {/* Improved nose - smaller, more refined shape */}
        <mesh ref={noseRef} position={[0, 1.15, 0.22]} castShadow>
          <coneGeometry args={[0.04, 0.08, 16, 1, true]} />
          <meshStandardMaterial 
            map={noseTexture}
            color={skinColor}
            roughness={0.7}
          />
        </mesh>
        
        {/* Nostrils - more subtle */}
        <mesh position={[-0.015, 1.12, 0.24]} castShadow>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#4d3a33" roughness={0.7} />
        </mesh>
        
        <mesh position={[0.015, 1.12, 0.24]} castShadow>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#4d3a33" roughness={0.7} />
        </mesh>
        
        {/* Eyes - using offset to make them more visible from the front */}
        <mesh ref={leftEyeRef} position={[-0.09, 1.2, 0.2]} castShadow>
          <sphereGeometry args={[0.05, 16, 16, 0, Math.PI * 2, 0, Math.PI]} />
          <meshStandardMaterial 
            map={eyeTexture}
            roughness={0.3}
          />
        </mesh>
        
        <mesh ref={rightEyeRef} position={[0.09, 1.2, 0.2]} castShadow>
          <sphereGeometry args={[0.05, 16, 16, 0, Math.PI * 2, 0, Math.PI]} />
          <meshStandardMaterial 
            map={eyeTexture}
            roughness={0.3}
          />
        </mesh>
        
        {/* Eye whites - subtle shadow to create depth */}
        <mesh position={[-0.09, 1.2, 0.19]} castShadow>
          <ringGeometry args={[0.048, 0.05, 16, 1]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.2} />
        </mesh>
        
        <mesh position={[0.09, 1.2, 0.19]} castShadow>
          <ringGeometry args={[0.048, 0.05, 16, 1]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.2} />
        </mesh>
        
        {/* Pupils - moved forward for better visibility */}
        <mesh ref={leftPupilRef} position={[-0.09, 1.2, 0.25]} castShadow>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial 
            color="black"
            roughness={0.3}
          />
        </mesh>
        
        <mesh ref={rightPupilRef} position={[0.09, 1.2, 0.25]} castShadow>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial 
            color="black"
            roughness={0.3}
          />
        </mesh>
        
        {/* Smaller eyelids for more opened eyes */}
        <mesh position={[-0.09, 1.23, 0.22]} castShadow>
          <sphereGeometry args={[0.052, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        
        <mesh position={[0.09, 1.23, 0.22]} castShadow>
          <sphereGeometry args={[0.052, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        
        <mesh position={[-0.09, 1.17, 0.22]} rotation={[Math.PI, 0, 0]} castShadow>
          <sphereGeometry args={[0.052, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        
        <mesh position={[0.09, 1.17, 0.22]} rotation={[Math.PI, 0, 0]} castShadow>
          <sphereGeometry args={[0.052, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        
        {/* Ears */}
        <mesh ref={leftEarRef} position={[-0.25, 1.15, 0]} rotation={[0, -Math.PI/2, 0]} castShadow>
          <sphereGeometry args={[0.06, 16, 16, 0, Math.PI, 0, Math.PI]} />
          <meshStandardMaterial 
            map={earTexture}
            color={skinColor}
            roughness={0.6}
          />
        </mesh>
        
        <mesh ref={rightEarRef} position={[0.25, 1.15, 0]} rotation={[0, Math.PI/2, 0]} castShadow>
          <sphereGeometry args={[0.06, 16, 16, 0, Math.PI, 0, Math.PI]} />
          <meshStandardMaterial 
            map={earTexture}
            color={skinColor}
            roughness={0.6}
          />
        </mesh>
        
        {/* Mouth/Lips - moved forward for better visibility */}
        <mesh ref={mouthRef} position={[0, 1.05, 0.24]} rotation={[Math.PI / 6, 0, 0]} castShadow>
          <planeGeometry args={[0.15, 0.05]} />
          <meshStandardMaterial 
            map={lipsTexture}
            transparent={true}
            roughness={0.5}
          />
        </mesh>
        
        {/* Lip detail - add volume */}
        <mesh position={[0, 1.04, 0.24]} rotation={[Math.PI / 5, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.015, 16, 1, true]} />
          <meshStandardMaterial color={lipsColor} roughness={0.5} />
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
        
        {/* Back of head hair - covers the back completely */}
        <mesh ref={hairBackRef} position={[0, 1.05, -0.1]} castShadow>
          <sphereGeometry args={[0.24, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial 
            map={hairTexture}
            color={hairColor} 
            roughness={0.8}
          />
        </mesh>
        
        {/* Additional hair at the back of neck */}
        <mesh position={[0, 0.9, -0.15]} castShadow>
          <boxGeometry args={[0.35, 0.3, 0.2]} />
          <meshStandardMaterial 
            map={hairTexture}
            color={hairColor} 
            roughness={0.8}
          />
        </mesh>
        
        {/* Hair bangs - moved forward */}
        <mesh position={[0, 1.25, 0.18]} castShadow>
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
        
        {/* Enhanced arms - more realistic joints and shape */}
        <group position={[-0.25, 0.8, 0]} rotation={[0, 0, Math.PI * 0.1]}>
          {/* Upper arm */}
          <mesh 
            ref={leftArmRef} 
            position={[0, -0.1, 0]} 
            castShadow
          >
            <capsuleGeometry args={[0.05, 0.15, 8, 16]} />
            <meshStandardMaterial color={clothesColor} roughness={0.6} />
          </mesh>
          
          {/* Lower arm with joint connecting to upper arm */}
          <mesh 
            position={[0, -0.25, 0]} 
            rotation={[0.2, 0, 0]}
            castShadow
          >
            <capsuleGeometry args={[0.04, 0.15, 8, 16]} />
            <meshStandardMaterial color={clothesColor} roughness={0.6} />
          </mesh>
          
          {/* Hand */}
          <mesh position={[0, -0.4, 0.05]} castShadow>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
          
          {/* Thumb */}
          <mesh position={[-0.03, -0.4, 0.08]} rotation={[0.3, -0.3, 0.5]} castShadow>
            <capsuleGeometry args={[0.015, 0.04, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
          
          {/* Fingers */}
          <mesh position={[0, -0.46, 0.06]} rotation={[0.5, 0, 0]} castShadow>
            <capsuleGeometry args={[0.015, 0.05, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
        </group>
        
        {/* Right arm with similar enhancements */}
        <group position={[0.25, 0.8, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
          {/* Upper arm */}
          <mesh 
            ref={rightArmRef} 
            position={[0, -0.1, 0]} 
            castShadow
          >
            <capsuleGeometry args={[0.05, 0.15, 8, 16]} />
            <meshStandardMaterial color={clothesColor} roughness={0.6} />
          </mesh>
          
          {/* Lower arm with joint connecting to upper arm */}
          <mesh 
            position={[0, -0.25, 0]} 
            rotation={[0.2, 0, 0]}
            castShadow
          >
            <capsuleGeometry args={[0.04, 0.15, 8, 16]} />
            <meshStandardMaterial color={clothesColor} roughness={0.6} />
          </mesh>
          
          {/* Hand */}
          <mesh position={[0, -0.4, 0.05]} castShadow>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
          
          {/* Thumb */}
          <mesh position={[0.03, -0.4, 0.08]} rotation={[0.3, 0.3, -0.5]} castShadow>
            <capsuleGeometry args={[0.015, 0.04, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
          
          {/* Fingers */}
          <mesh position={[0, -0.46, 0.06]} rotation={[0.5, 0, 0]} castShadow>
            <capsuleGeometry args={[0.015, 0.05, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
        </group>
        
        {/* Legs - more realistic with proper joints */}
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
        
        {/* Character subtle glow with slower color change */}
        <pointLight 
          position={[0, 0.8, 0]} 
          intensity={0.7} 
          color={lightColor} 
          distance={1.8}
          decay={2}
        />
      </group>
    </group>
  );
};

export default MelanieCharacter;
