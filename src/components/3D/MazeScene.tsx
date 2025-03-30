
import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import MazeWall from './MazeWall';
import MazeFloor from './MazeFloor';
import MazeCeiling from './MazeCeiling';
import MelanieCharacter from './MelanieCharacter';
import CatModel from './CatModel';
import { Maze } from '@/utils/mazeGenerator';

interface MazeSceneProps {
  maze: Maze;
  playerPosition: { x: number; y: number };
  playerDirection: number; // 0: north, 1: east, 2: south, 3: west
  isMoving: boolean;
}

const Scene: React.FC<MazeSceneProps> = ({ maze, playerPosition, playerDirection, isMoving }) => {
  const { grid, width, height, endPosition } = maze;
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  
  const { camera } = useThree();
  
  // Update camera to follow player
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.set(
        playerPosition.x, 
        1.5, 
        playerPosition.y + 2.5
      );
      camera.lookAt(playerPosition.x, 0.5, playerPosition.y);
    }
  }, [camera, playerPosition]);
  
  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      // Smoothly move camera to follow player
      const targetX = playerPosition.x;
      const targetY = 1.5; // Fixed height
      const targetZ = playerPosition.y + 2.5; // Camera is behind the player
      
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.1);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
      
      // Look at the player's position but slightly ahead
      const lookAtX = playerPosition.x + Math.sin(playerDirection * (Math.PI / 2)) * 0.5;
      const lookAtZ = playerPosition.y + Math.cos(playerDirection * (Math.PI / 2)) * 0.5;
      
      camera.lookAt(lookAtX, 0.5, lookAtZ);
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
      {/* Main lighting */}
      <ambientLight intensity={0.3} color="#b794f4" />
      <directionalLight 
        ref={directionalLightRef}
        position={[width / 2, 5, height / 2]} 
        intensity={0.5} 
        castShadow 
      />
      <pointLight 
        ref={pointLightRef}
        position={[playerPosition.x, 1.2, playerPosition.y]} 
        intensity={1} 
        color="#9B87F5" 
        distance={4} 
        castShadow
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
      
      {/* Visual effects - fog */}
      <fog attach="fog" args={['#120d24', 3, 8]} />
    </>
  );
};

const MazeScene: React.FC<MazeSceneProps> = (props) => {
  return (
    <div className="w-full h-96 relative">
      <Canvas shadows>
        <Scene {...props} />
        <OrbitControls enabled={false} />
      </Canvas>
    </div>
  );
};

export default MazeScene;
