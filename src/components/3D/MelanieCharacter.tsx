
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
      // Base nose color
      context.fillStyle = '#f0c5b5';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create nostril shapes
      context.fillStyle = '#d5a598';
      context.beginPath();
      context.arc(42, 85, 12, 0, Math.PI * 2);
      context.arc(86, 85, 12, 0, Math.PI * 2);
      context.fill();
      
      // Create nostril shadows
      context.fillStyle = '#b58577';
      context.beginPath();
      context.arc(42, 85, 6, 0, Math.PI * 2);
      context.arc(86, 85, 6, 0, Math.PI * 2);
      context.fill();
      
      // Create bridge shadow
      const gradient = context.createLinearGradient(64, 20, 64, 60);
      gradient.addColorStop(0, 'rgba(213, 165, 152, 0.2)');
      gradient.addColorStop(1, 'rgba(213, 165, 152, 0.6)');
      context.fillStyle = gradient;
      context.beginPath();
      context.moveTo(44, 20);
      context.quadraticCurveTo(64, 10, 84, 20);
      context.quadraticCurveTo(64, 60, 44, 20);
      context.fill();
    }
    
    return canvas;
  }
  
  function createEarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Base ear color
      context.fillStyle = '#f8d8c8';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add ear details
      const gradient = context.createRadialGradient(64, 64, 10, 64, 64, 50);
      gradient.addColorStop(0, '#f8d8c8');
      gradient.addColorStop(0.8, '#e5c6b6');
      gradient.addColorStop(1, '#d5b6a6');
      
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(64, 64, 50, 0, Math.PI * 2);
      context.fill();
      
      // Inner ear
      context.fillStyle = '#e8a897';
      context.beginPath();
      context.ellipse(64, 64, 25, 35, 0, 0, Math.PI * 2);
      context.fill();
    }
    
    return canvas;
  }
  
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
      
      // Add more defined cheek bones
      context.fillStyle = 'rgba(240, 150, 150, 0.1)';
      context.beginPath();
      context.ellipse(160, 220, 60, 50, 0, 0, Math.PI * 2);
      context.ellipse(352, 220, 60, 50, 0, 0, Math.PI * 2);
      context.fill();
      
      // Add eyebrows with gradient - make them more defined
      const eyebrowGradient = context.createLinearGradient(150, 160, 150, 180);
      eyebrowGradient.addColorStop(0, '#1a1a1a');
      eyebrowGradient.addColorStop(1, '#3a3a3a');
      context.fillStyle = eyebrowGradient;
      
      // Left eyebrow - curved and more defined
      context.beginPath();
      context.moveTo(130, 160);
      context.bezierCurveTo(160, 145, 190, 155, 210, 170);
      context.bezierCurveTo(190, 175, 160, 165, 130, 170);
      context.fill();
      
      // Right eyebrow - curved and more defined
      context.beginPath();
      context.moveTo(300, 160);
      context.bezierCurveTo(330, 145, 360, 155, 380, 170);
      context.bezierCurveTo(360, 175, 330, 165, 300, 170);
      context.fill();
      
      // Add freckles for extra realism
      context.fillStyle = 'rgba(210, 150, 120, 0.4)';
      for (let i = 0; i < 15; i++) {
        const x = 150 + Math.random() * 212;
        const y = 180 + Math.random() * 120;
        const radius = Math.random() * 2 + 1;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
      
      // Add contour to face for more shape
      const contourGradient = context.createRadialGradient(256, 256, 200, 256, 256, 256);
      contourGradient.addColorStop(0, 'rgba(0,0,0,0)');
      contourGradient.addColorStop(1, 'rgba(210, 150, 120, 0.15)');
      context.fillStyle = contourGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
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
      
      // Create gradient for lips - enhance colors
      const lipGradient = context.createLinearGradient(0, 30, 0, 80);
      lipGradient.addColorStop(0, '#e09595');   // Brighter top
      lipGradient.addColorStop(0.5, '#e3a6a6'); // Middle
      lipGradient.addColorStop(1, '#c27878');   // Darker bottom
      context.fillStyle = lipGradient;
      
      // Draw upper lip with more detail
      context.beginPath();
      context.moveTo(60, 40);
      context.bezierCurveTo(90, 30, 128, 25, 166, 30);
      context.bezierCurveTo(196, 40, 166, 50, 128, 50);
      context.bezierCurveTo(90, 50, 60, 40, 60, 40);
      context.fill();
      
      // Draw cupid's bow - more pronounced
      context.beginPath();
      context.moveTo(118, 35);
      context.quadraticCurveTo(128, 28, 138, 35);
      context.strokeStyle = '#c27878';
      context.lineWidth = 2;
      context.stroke();
      
      // Draw lower lip with more detail - fuller
      context.beginPath();
      context.moveTo(60, 40);
      context.bezierCurveTo(90, 75, 128, 90, 166, 75);
      context.bezierCurveTo(196, 40, 166, 95, 128, 95);
      context.bezierCurveTo(90, 95, 60, 40, 60, 40);
      context.fillStyle = lipGradient;
      context.fill();
      
      // Add lip shine and texture - more natural
      context.fillStyle = 'rgba(255,255,255,0.3)';
      context.beginPath();
      context.ellipse(128, 45, 40, 10, 0, 0, Math.PI * 2);
      context.fill();
      
      // Add subtle lip lines
      context.strokeStyle = 'rgba(180,100,100,0.2)';
      context.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        context.beginPath();
        context.moveTo(80 + i * 10, 50);
        context.lineTo(80 + i * 10, 75);
        context.stroke();
      }
      
      // Add lip edge definition
      context.strokeStyle = 'rgba(180,100,100,0.4)';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(60, 40);
      context.bezierCurveTo(90, 30, 128, 25, 166, 30);
      context.bezierCurveTo(196, 40, 166, 50, 128, 50);
      context.bezierCurveTo(90, 50, 60, 40, 60, 40);
      context.stroke();
      
      context.beginPath();
      context.moveTo(60, 40);
      context.bezierCurveTo(90, 75, 128, 90, 166, 75);
      context.bezierCurveTo(196, 40, 166, 95, 128, 95);
      context.bezierCurveTo(90, 95, 60, 40, 60, 40);
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
      
      // Add some very subtle blue/purple highlights
      context.strokeStyle = 'rgba(100,100,160,0.1)';
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width;
        const length = Math.random() * 150 + 50;
        
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, length);
        context.lineWidth = Math.random() * 3 + 1;
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
      
      // Add some fabric wrinkles
      context.strokeStyle = 'rgba(100,80,200,0.2)';
      for (let i = 0; i < 40; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const length = Math.random() * 100 + 50;
        const curveFactor = Math.random() * 50 - 25;
        
        context.beginPath();
        context.moveTo(startX, startY);
        context.quadraticCurveTo(
          startX + length/2 + curveFactor, 
          startY + curveFactor, 
          startX + length, 
          startY + Math.random() * 20 - 10
        );
        context.lineWidth = Math.random() * 2 + 1;
        context.stroke();
      }
    }
    
    return canvas;
  }

  // Animation logic
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate character based on direction
      const targetRotation = direction * (Math.PI / 2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.2
      );
      
      // Slow color change for character glow
      lightChangeTimeRef.current += delta * 0.2; // Reduced from original speed for slower changes
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
        
        {/* Nose - more prominent */}
        <mesh ref={noseRef} position={[0, 1.15, 0.22]} castShadow>
          <coneGeometry args={[0.05, 0.1, 16, 1, true]} />
          <meshStandardMaterial 
            map={noseTexture}
            color={skinColor}
            roughness={0.7}
          />
        </mesh>
        
        {/* Nostrils */}
        <mesh position={[-0.02, 1.12, 0.25]} castShadow>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial color="#4d3a33" roughness={0.7} />
        </mesh>
        
        <mesh position={[0.02, 1.12, 0.25]} castShadow>
          <sphereGeometry args={[0.01, 8, 8]} />
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
        
        {/* Eyelids - to make blinking more realistic */}
        <mesh position={[-0.09, 1.23, 0.22]} castShadow>
          <sphereGeometry args={[0.052, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        
        <mesh position={[0.09, 1.23, 0.22]} castShadow>
          <sphereGeometry args={[0.052, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        
        <mesh position={[-0.09, 1.17, 0.22]} rotation={[Math.PI, 0, 0]} castShadow>
          <sphereGeometry args={[0.052, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        
        <mesh position={[0.09, 1.17, 0.22]} rotation={[Math.PI, 0, 0]} castShadow>
          <sphereGeometry args={[0.052, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
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
