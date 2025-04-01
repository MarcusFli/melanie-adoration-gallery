
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
    context.fillStyle = '#ffcdba';
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
    // Lighter skin tone for face
    context.fillStyle = '#ffdbcc';
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
    // Pink-ish color for lips
    context.fillStyle = '#ff9e9e';
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
    // Dark color for hair
    context.fillStyle = '#120d0a';
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
    context.fillStyle = '#ffdbcc';
    context.fillRect(0, 0, 32, 32);
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
      
      {/* Head */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial map={faceTexture} />
      </mesh>

      {/* Back of Head Hair (covering the bald spot) */}
      <mesh position={[0, 1.35, -0.15]}>
        <sphereGeometry args={[0.27, 16, 16, 0, Math.PI, Math.PI/2, Math.PI]} />
        <meshStandardMaterial map={hairTexture} color="#120d0a" />
      </mesh>
      
      {/* Top Hair */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.27, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
        <meshStandardMaterial map={hairTexture} color="#120d0a" />
      </mesh>
      
      {/* Side Hair (Left) */}
      <mesh position={[-0.2, 1.35, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial map={hairTexture} color="#120d0a" />
      </mesh>
      
      {/* Side Hair (Right) */}
      <mesh position={[0.2, 1.35, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial map={hairTexture} color="#120d0a" />
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
      
      {/* Smaller Eyelids */}
      <mesh position={[0.1, 1.43, 0.19]}>
        <planeGeometry args={[0.09, 0.02]} />
        <meshStandardMaterial color="#120d0a" />
      </mesh>
      <mesh position={[-0.1, 1.43, 0.19]}>
        <planeGeometry args={[0.09, 0.02]} />
        <meshStandardMaterial color="#120d0a" />
      </mesh>
      
      {/* More Attractive Nose */}
      <mesh position={[0, 1.35, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial map={noseTexture} color="#ffcdba" />
      </mesh>
      
      {/* Mouth */}
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
