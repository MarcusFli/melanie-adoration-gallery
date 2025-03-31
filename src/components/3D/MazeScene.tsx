
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import MazeWall from './MazeWall';
import MazeFloor from './MazeFloor';
import MazeCeiling from './MazeCeiling';
import MelanieCharacter from './MelanieCharacter';
import CatModel from './CatModel';
import { Maze } from '@/utils/mazeGenerator';
import ViewScopeWheel from '../game/ViewScopeWheel';

interface MazeSceneProps {
  maze: Maze;
  playerPosition: { x: number; y: number };
  playerDirection: number; // 0: north, 1: east, 2: south, 3: west
  isMoving: boolean;
}

interface SceneProps extends MazeSceneProps {
  cameraOffset: { x: number; y: number; z: number };
  cameraLookOffset: { x: number; y: number; z: number };
}

const Scene: React.FC<SceneProps> = ({ maze, playerPosition, playerDirection, isMoving, cameraOffset, cameraLookOffset }) => {
  const { grid, width, height, endPosition } = maze;
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  
  const { camera } = useThree();
  
  // Update camera to follow player
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.set(
        playerPosition.x + cameraOffset.x, 
        cameraOffset.y, 
        playerPosition.y + cameraOffset.z
      );
      
      // Look at the player's position plus any offset
      camera.lookAt(
        playerPosition.x + cameraLookOffset.x, 
        cameraLookOffset.y, 
        playerPosition.y + cameraLookOffset.z
      );
      
      // Set optimized camera properties
      camera.near = 0.1;
      camera.far = 100;
      camera.updateProjectionMatrix();
    }
  }, [camera, playerPosition, cameraOffset, cameraLookOffset]);
  
  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      // Smoothly move camera to follow player
      const targetX = playerPosition.x + cameraOffset.x;
      const targetY = cameraOffset.y;
      const targetZ = playerPosition.y + cameraOffset.z;
      
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.1);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
      
      // Look at the player's position but with offset
      const lookAtX = playerPosition.x + cameraLookOffset.x;
      const lookAtY = cameraLookOffset.y;
      const lookAtZ = playerPosition.y + cameraLookOffset.z;
      
      camera.lookAt(lookAtX, lookAtY, lookAtZ);
    }
    
    if (pointLightRef.current) {
      // Move light with player
      pointLightRef.current.position.set(playerPosition.x, 1.2, playerPosition.y);
    }
  });
  
  // Render maze walls
  const renderMaze = () => {
    const walls = [];
    let wallId = 0;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = grid[y][x];
        
        // Top wall
        if (cell.walls.top) {
          walls.push(
            <MazeWall 
              key={`wall-${wallId++}`} 
              position={[x, 0.5, y - 0.5]} 
              size={[1, 1, 0.1]} 
            />
          );
        }
        
        // Right wall
        if (cell.walls.right) {
          walls.push(
            <MazeWall 
              key={`wall-${wallId++}`} 
              position={[x + 0.5, 0.5, y]} 
              size={[0.1, 1, 1]} 
            />
          );
        }
        
        // Bottom wall (only for bottom row)
        if (y === height - 1 && cell.walls.bottom) {
          walls.push(
            <MazeWall 
              key={`wall-${wallId++}`} 
              position={[x, 0.5, y + 0.5]} 
              size={[1, 1, 0.1]} 
            />
          );
        }
        
        // Left wall (only for leftmost column)
        if (x === 0 && cell.walls.left) {
          walls.push(
            <MazeWall 
              key={`wall-${wallId++}`} 
              position={[x - 0.5, 0.5, y]} 
              size={[0.1, 1, 1]} 
            />
          );
        }
      }
    }
    
    return walls;
  };
  
  return (
    <>
      {/* Main lighting - optimized */}
      <ambientLight intensity={0.4} color="#b794f4" />
      <directionalLight 
        ref={directionalLightRef}
        position={[width / 2, 5, height / 2]} 
        intensity={0.4} 
        castShadow 
      />
      <pointLight 
        ref={pointLightRef}
        position={[playerPosition.x, 1.2, playerPosition.y]} 
        intensity={0.8} 
        color="#9B87F5" 
        distance={4} 
        decay={2}
      />
      
      {/* Environment */}
      <MazeFloor width={width} height={height} />
      <MazeCeiling width={width} height={height} />
      
      {/* Maze walls */}
      {renderMaze()}
      
      {/* Player character */}
      <MelanieCharacter 
        position={[playerPosition.x, 0.3, playerPosition.y]} 
        direction={playerDirection}
        isMoving={isMoving}
      />
      
      {/* Cat at the end of the maze */}
      <CatModel position={[endPosition.x, 0.3, endPosition.y]} />
      
      {/* Visual effects - optimized fog */}
      <fog attach="fog" args={['#120d24', 3.5, 10]} />
    </>
  );
};

const MazeScene: React.FC<MazeSceneProps> = (props) => {
  const [viewMode, setViewMode] = useState<'follow' | 'top' | 'first-person'>('follow');
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 2.5, z: 2.5 });
  const [cameraLookOffset, setLookOffset] = useState({ x: 0, y: 0.5, z: 0 });
  
  // Handle viewport rotation from the wheel
  const handleViewRotate = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (viewMode === 'follow' || viewMode === 'first-person') {
      switch (direction) {
        case 'up':
          setCameraOffset(prev => ({ 
            ...prev, 
            y: Math.min(prev.y + 0.5, 8), 
            z: Math.max(prev.z - 0.5, 0.5) 
          }));
          break;
        case 'down':
          setCameraOffset(prev => ({ 
            ...prev, 
            y: Math.max(prev.y - 0.5, 0.5), 
            z: Math.min(prev.z + 0.5, 6) 
          }));
          break;
        case 'left':
          setCameraOffset(prev => ({ 
            ...prev, 
            x: prev.x - 0.5 
          }));
          break;
        case 'right':
          setCameraOffset(prev => ({ 
            ...prev, 
            x: prev.x + 0.5 
          }));
          break;
      }
    } else if (viewMode === 'top') {
      // For top view, handle differently
      switch (direction) {
        case 'up':
          setCameraOffset(prev => ({ 
            ...prev,
            y: Math.min(prev.y + 1, 15)
          }));
          break;
        case 'down':
          setCameraOffset(prev => ({ 
            ...prev,
            y: Math.max(prev.y - 1, 4)
          }));
          break;
        case 'left':
          setCameraOffset(prev => ({ 
            ...prev, 
            x: prev.x - 1
          }));
          break;
        case 'right':
          setCameraOffset(prev => ({ 
            ...prev, 
            x: prev.x + 1
          }));
          break;
      }
    }
  };
  
  // Set different view modes
  const changeViewMode = (mode: 'follow' | 'top' | 'first-person') => {
    setViewMode(mode);
    
    switch (mode) {
      case 'follow':
        setCameraOffset({ x: 0, y: 2.5, z: 2.5 });
        setLookOffset({ x: 0, y: 0.5, z: 0 });
        break;
      case 'top':
        setCameraOffset({ x: 0, y: 8, z: 0 });
        setLookOffset({ x: 0, y: 0, z: 0 });
        break;
      case 'first-person':
        setCameraOffset({ x: 0, y: 0.7, z: 0 });
        setLookOffset({ x: 0, y: 0.7, z: -1 });
        break;
    }
  };
  
  return (
    <div className="w-full h-96 relative">
      <Canvas 
        shadows={{
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
      >
        <Scene 
          {...props}
          cameraOffset={cameraOffset}
          cameraLookOffset={cameraLookOffset}
        />
        <OrbitControls enabled={false} />
      </Canvas>
      
      {/* View mode buttons with improved styling */}
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        <button 
          className={`px-2 py-1 text-xs rounded-lg font-semibold border ${viewMode === 'follow' ? 'bg-melanie-purple border-white text-white' : 'bg-black/50 border-melanie-purple/30 text-gray-200 hover:bg-melanie-purple/30'}`}
          onClick={() => changeViewMode('follow')}
        >
          Follow
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded-lg font-semibold border ${viewMode === 'top' ? 'bg-melanie-purple border-white text-white' : 'bg-black/50 border-melanie-purple/30 text-gray-200 hover:bg-melanie-purple/30'}`}
          onClick={() => changeViewMode('top')}
        >
          Top View
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded-lg font-semibold border ${viewMode === 'first-person' ? 'bg-melanie-purple border-white text-white' : 'bg-black/50 border-melanie-purple/30 text-gray-200 hover:bg-melanie-purple/30'}`}
          onClick={() => changeViewMode('first-person')}
        >
          First Person
        </button>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-2 right-2 z-10 bg-black/50 text-white text-xs p-2 rounded-lg border border-melanie-purple/30">
        <p className="mb-1"><span className="text-melanie-purple font-bold">Arrow Keys:</span> Move & Rotate</p>
        <p><span className="text-melanie-purple font-bold">3D Scope:</span> Adjust Camera</p>
      </div>
      
      {/* 3D Scope wheel */}
      <ViewScopeWheel onRotate={handleViewRotate} />
    </div>
  );
};

export default MazeScene;
