
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ZoomIn, ZoomOut, Eye, EyeOff, User, Map } from 'lucide-react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import MazeFloor from './MazeFloor';
import MazeWall from './MazeWall';
import MazeCeiling from './MazeCeiling';
import MelanieCharacter from './MelanieCharacter';
import CatModel from './CatModel';
import { Maze } from '@/utils/mazeGenerator';

interface MazeSceneProps {
  maze: Maze;
  playerPosition: { x: number; y: number };
  playerDirection: number;
  isMoving: boolean;
}

// Camera control component
const CameraController = ({ 
  playerPosition, 
  playerDirection,
  zoom,
  viewMode
}: { 
  playerPosition: { x: number; y: number }; 
  playerDirection: number;
  zoom: number;
  viewMode: 'topDown' | 'follow' | 'firstPerson';
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const lastPositionRef = useRef({ x: playerPosition.x, y: playerPosition.y });
  const lastDirectionRef = useRef(playerDirection);
  
  useEffect(() => {
    if (controlsRef.current) {
      // Direction offset vectors for each cardinal direction
      const directionOffset = [
        [0, 0, -1], // North
        [1, 0, 0],  // East
        [0, 0, 1],  // South
        [-1, 0, 0]  // West
      ];

      const [offsetX, offsetY, offsetZ] = directionOffset[playerDirection];
      
      if (viewMode === 'firstPerson') {
        // First person view - position camera at player's eye level and looking in their direction
        camera.position.set(
          playerPosition.x,
          1.5, // Eye level
          playerPosition.y
        );
        
        // Look in the direction the player is facing
        const lookAtPosition = new THREE.Vector3(
          playerPosition.x + offsetX,
          1.5,
          playerPosition.y + offsetZ
        );
        
        camera.lookAt(lookAtPosition);
        
        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }
      } 
      else if (viewMode === 'follow') {
        // Follow view - position camera behind player
        const distanceBehind = 1.5;
        
        // Calculate position behind player based on direction
        const cameraX = playerPosition.x - offsetX * distanceBehind;
        const cameraZ = playerPosition.y - offsetZ * distanceBehind;
        
        camera.position.set(
          cameraX,
          2.0, // Slightly above player
          cameraZ
        );
        
        // Look at player's position plus a bit of offset in their facing direction
        const lookAtPosition = new THREE.Vector3(
          playerPosition.x + offsetX * 0.5,
          1.2, // Look at upper body
          playerPosition.y + offsetZ * 0.5
        );
        
        camera.lookAt(lookAtPosition);
        
        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }
      } 
      else {
        // Top-down view
        camera.position.set(
          playerPosition.x,
          5 / zoom, // Height based on zoom
          playerPosition.y 
        );
        
        camera.lookAt(playerPosition.x, 0, playerPosition.y);
        
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
      }
      
      // Update last position and direction
      lastPositionRef.current = { x: playerPosition.x, y: playerPosition.y };
      lastDirectionRef.current = playerDirection;
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    }
  }, [playerPosition, playerDirection, zoom, camera, viewMode]);
  
  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={viewMode === 'topDown'}
      enableZoom={viewMode === 'topDown'}
      enableRotate={viewMode === 'topDown'}
      maxPolarAngle={viewMode === 'topDown' ? Math.PI / 2 - 0.1 : Math.PI}
      minPolarAngle={viewMode === 'topDown' ? 0.1 : 0}
      maxDistance={viewMode === 'topDown' ? 10 : 0.1}
      minDistance={viewMode === 'topDown' ? 2 : 0.1}
    />
  );
};

const MazeScene: React.FC<MazeSceneProps> = ({ 
  maze, 
  playerPosition, 
  playerDirection,
  isMoving
}) => {
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'topDown' | 'follow' | 'firstPerson'>('topDown');
  
  // Handle zoom controls
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (viewMode === 'topDown') {
        if (e.deltaY < 0) {
          // Zoom in
          setZoom(prev => Math.min(prev + 0.1, 2));
        } else {
          // Zoom out
          setZoom(prev => Math.max(prev - 0.1, 0.5));
        }
      }
    };
    
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [viewMode]);

  // Cycle through view modes
  const cycleViewMode = () => {
    setViewMode(prev => {
      if (prev === 'topDown') return 'follow';
      if (prev === 'follow') return 'firstPerson';
      return 'topDown';
    });
  };

  // Get icon and label based on current view mode
  const getViewModeIcon = () => {
    switch (viewMode) {
      case 'topDown': return <Map className="h-5 w-5" />;
      case 'follow': return <User className="h-5 w-5" />;
      case 'firstPerson': return <Eye className="h-5 w-5" />;
    }
  };

  const getViewModeLabel = () => {
    switch (viewMode) {
      case 'topDown': return "Vista Aérea";
      case 'follow': return "Seguir";
      case 'firstPerson': return "Primera Persona";
    }
  };

  return (
    <div className="relative w-full h-full">
      <Canvas>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        
        {/* Maze Ceiling */}
        <MazeCeiling 
          width={maze.width} 
          height={maze.height}
        />
        
        {/* Maze Floor */}
        <MazeFloor 
          width={maze.width} 
          height={maze.height}
        />
        
        {/* Maze Walls */}
        {maze.grid.map((row, y) => 
          row.map((cell, x) => (
            <React.Fragment key={`${x}-${y}`}>
              {cell.walls.top && (
                <MazeWall 
                  position={[x, 1, y - 0.5]} 
                  rotationY={0}
                  positionType="normal"
                />
              )}
              {cell.walls.right && (
                <MazeWall 
                  position={[x + 0.5, 1, y]} 
                  rotationY={Math.PI / 2}
                  positionType="normal"
                />
              )}
              {cell.walls.bottom && (
                <MazeWall 
                  position={[x, 1, y + 0.5]} 
                  rotationY={0}
                  positionType="normal"
                />
              )}
              {cell.walls.left && (
                <MazeWall 
                  position={[x - 0.5, 1, y]} 
                  rotationY={Math.PI / 2}
                  positionType="normal"
                />
              )}
            </React.Fragment>
          ))
        )}
        
        {/* Player Character (only visible in top-down and follow views) */}
        {viewMode !== 'firstPerson' && (
          <MelanieCharacter 
            position={[playerPosition.x, 0.3, playerPosition.y]} 
            direction={playerDirection}
            isMoving={isMoving}
          />
        )}
        
        {/* Cat (End Goal) */}
        <CatModel 
          position={[maze.endPosition.x, 0.25, maze.endPosition.y]} 
        />
        
        {/* Camera Controls */}
        <CameraController 
          playerPosition={playerPosition} 
          playerDirection={playerDirection}
          zoom={zoom}
          viewMode={viewMode}
        />
      </Canvas>
      
      {/* View Mode Toggle Button */}
      <div className="absolute top-6 right-6 z-30">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-melanie-purple/30 text-white overflow-hidden">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex flex-col items-center gap-1 p-2 text-white hover:bg-melanie-purple/20"
            onClick={cycleViewMode}
          >
            {getViewModeIcon()}
            <span className="text-xs">{getViewModeLabel()}</span>
          </Button>
        </div>
      </div>
      
      {/* Zoom Controls UI (only in top-down view) */}
      {viewMode === 'topDown' && (
        <div className="absolute bottom-24 right-6 z-30 flex flex-col bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-melanie-purple/30">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-melanie-purple/20 mb-1"
            onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="text-xs text-center text-white py-1">
            {Math.round(zoom * 100)}%
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-melanie-purple/20 mt-1"
            onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MazeScene;
