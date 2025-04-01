
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create textures for the character
const createEyeTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = 'white';
    context.fillRect(0, 0, 64, 64);
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(32, 32, 16, 0, Math.PI * 2);
    context.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const createNoseTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  if (context) {
    // Warmer, olive-toned skin for Latina character
    context.fillStyle = '#c39f81';
    context.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// New textures for additional character parts
const createFaceTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (context) {
    // Warmer, olive-toned skin for Latina character
    context.fillStyle = '#c39f81';
    context.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const createLipsTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 16;
  const context = canvas.getContext('2d');
  if (context) {
    // Deeper red for lips
    context.fillStyle = '#c73030';
    context.fillRect(0, 0, 32, 16);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const createHairTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (context) {
    // Darker black hair
    context.fillStyle = '#0a0a0a';
    context.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const createClothingTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (context) {
    // Purple for clothing
    context.fillStyle = '#9b87f5';
    context.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const createEarTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  if (context) {
    // Warmer, olive-toned skin for Latina character
    context.fillStyle = '#c39f81';
    context.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const createTattooTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (context) {
    // Base color (transparent)
    context.clearRect(0, 0, 128, 128);
    
    // Add a tribal/floral pattern tattoo
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    
    // Draw a simple floral design
    context.beginPath();
    context.moveTo(30, 64);
    context.bezierCurveTo(45, 44, 75, 44, 90, 64);
    context.bezierCurveTo(75, 84, 45, 84, 30, 64);
    context.stroke();
    
    // Add some details
    context.beginPath();
    context.moveTo(60, 40);
    context.lineTo(60, 24);
    context.stroke();
    
    context.beginPath();
    context.arc(60, 20, 4, 0, Math.PI * 2);
    context.stroke();
    
    // Add another detail
    context.beginPath();
    context.moveTo(30, 80);
    context.bezierCurveTo(45, 100, 75, 100, 90, 80);
    context.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Pre-create textures
const eyeTexture = createEyeTexture();
const noseTexture = createNoseTexture();
const faceTexture = createFaceTexture();
const lipsTexture = createLipsTexture();
const hairTexture = createHairTexture();
const clothingTexture = createClothingTexture();
const earTexture = createEarTexture();
const tattooTexture = createTattooTexture();

interface MelanieCharacterProps {
  position: [number, number, number];
  direction: number;
  isMoving: boolean;
}

const MelanieCharacter: React.FC<MelanieCharacterProps> = ({ position, direction, isMoving }) => {
  const characterRef = useRef<THREE.Group>(null);
  
  // Animation
  useFrame(() => {
    if (characterRef.current && isMoving) {
      // Add some bobbing animation when moving
      characterRef.current.position.y = position[1] + Math.sin(Date.now() * 0.01) * 0.05;
    }
  });
  
  // Update character direction
  useEffect(() => {
    if (characterRef.current) {
      characterRef.current.rotation.y = direction * Math.PI / 2;
    }
  }, [direction]);

  return (
    <group ref={characterRef} position={position} rotation={[0, direction * Math.PI / 2, 0]}>
      {/* Body */}
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
        <meshStandardMaterial map={clothingTexture} color="#9b87f5" />
      </mesh>
      
      {/* Left Arm */}
      <group position={[-0.25, 0.9, 0]}>
        {/* Upper Arm */}
        <mesh position={[0, -0.15, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        
        {/* Lower Arm */}
        <mesh position={[-0.12, -0.3, 0]} rotation={[0, 0, -0.6]}>
          <capsuleGeometry args={[0.04, 0.25, 8, 16]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        
        {/* Hand */}
        <mesh position={[-0.25, -0.4, 0]} rotation={[0, 0, -0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        
        {/* Fingers */}
        <mesh position={[-0.29, -0.45, 0.02]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.01, 0.06, 4, 8]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        <mesh position={[-0.31, -0.42, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.01, 0.06, 4, 8]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        <mesh position={[-0.32, -0.39, -0.02]} rotation={[0, 0, -0.1]}>
          <capsuleGeometry args={[0.01, 0.06, 4, 8]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
      </group>
      
      {/* Right Arm with Tattoo */}
      <group position={[0.25, 0.9, 0]}>
        {/* Upper Arm with Tattoo */}
        <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        {/* Tattoo layer */}
        <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.052, 0.26, 8, 16]} />
          <meshStandardMaterial map={tattooTexture} transparent opacity={0.85} />
        </mesh>
        
        {/* Lower Arm */}
        <mesh position={[0.12, -0.3, 0]} rotation={[0, 0, 0.6]}>
          <capsuleGeometry args={[0.04, 0.25, 8, 16]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        
        {/* Hand */}
        <mesh position={[0.25, -0.4, 0]} rotation={[0, 0, 0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        
        {/* Fingers */}
        <mesh position={[0.29, -0.45, 0.02]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.01, 0.06, 4, 8]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        <mesh position={[0.31, -0.42, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.01, 0.06, 4, 8]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
        <mesh position={[0.32, -0.39, -0.02]} rotation={[0, 0, 0.1]}>
          <capsuleGeometry args={[0.01, 0.06, 4, 8]} />
          <meshStandardMaterial color="#c39f81" />
        </mesh>
      </group>
      
      {/* Belly Button with Piercing */}
      <group position={[0, 0.7, 0.2]}>
        {/* Belly button */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#b38e70" />
        </mesh>
        {/* Piercing */}
        <mesh position={[0, -0.03, 0.02]}>
          <torusGeometry args={[0.015, 0.003, 8, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Head */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial map={faceTexture} />
      </mesh>

      {/* Hair - Revised to not cover face */}
      {/* Back of Head Hair */}
      <mesh position={[0, 1.35, -0.1]}>
        <sphereGeometry args={[0.27, 32, 32, Math.PI/2, Math.PI, 0, Math.PI]} />
        <meshStandardMaterial map={hairTexture} color="#0a0a0a" />
      </mesh>
      
      {/* Top Hair */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.27, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
        <meshStandardMaterial map={hairTexture} color="#0a0a0a" />
      </mesh>
      
      {/* Side Hair (Left) - Adjusted to not cover face */}
      <mesh position={[-0.2, 1.35, -0.08]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial map={hairTexture} color="#0a0a0a" />
      </mesh>
      
      {/* Side Hair (Right) - Adjusted to not cover face */}
      <mesh position={[0.2, 1.35, -0.08]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial map={hairTexture} color="#0a0a0a" />
      </mesh>
      
      {/* Hair at nape of neck */}
      <mesh position={[0, 1.2, -0.15]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial map={hairTexture} color="#0a0a0a" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.1, 1.4, 0.18]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.08, 0.04]} />
        <meshStandardMaterial map={eyeTexture} />
      </mesh>
      <mesh position={[-0.1, 1.4, 0.18]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.08, 0.04]} />
        <meshStandardMaterial map={eyeTexture} />
      </mesh>
      
      {/* Eyelids */}
      <mesh position={[0.1, 1.43, 0.19]}>
        <planeGeometry args={[0.09, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[-0.1, 1.43, 0.19]}>
        <planeGeometry args={[0.09, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.35, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial map={noseTexture} color="#c39f81" />
      </mesh>
      
      {/* Mouth/Lips */}
      <mesh position={[0, 1.28, 0.21]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.1, 0.03]} />
        <meshStandardMaterial map={lipsTexture} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.25, 1.38, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial map={earTexture} />
      </mesh>
      <mesh position={[0.25, 1.38, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial map={earTexture} />
      </mesh>
    </group>
  );
};

export default MelanieCharacter;
