
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ZoomIn, ZoomOut, Eye, EyeOff } from 'lucide-react';
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
  viewMode: 'firstPerson' | 'topDown';
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  
  useEffect(() => {
    if (controlsRef.current) {
      if (viewMode === 'firstPerson') {
        // First person view - position camera at player's eye level
        const directionOffset = [
          [0, 0, -0.5], // North
          [0.5, 0, 0],  // East
          [0, 0, 0.5],  // South
          [-0.5, 0, 0]  // West
        ];

        const [offsetX, offsetY, offsetZ] = directionOffset[playerDirection];
        
        camera.position.set(
          playerPosition.x + offsetX,
          1.5, // Eye level
          playerPosition.y + offsetZ
        );
        
        // Look in the direction the player is facing
        const lookAtPosition = new THREE.Vector3(
          playerPosition.x + offsetX * 10,
          1.5,
          playerPosition.y + offsetZ * 10
        );
        
        camera.lookAt(lookAtPosition);
      } else {
        // Top-down view
        camera.position.set(
          playerPosition.x,
          5 / zoom, // Height based on zoom
          playerPosition.y 
        );
        
        camera.lookAt(playerPosition.x, 0, playerPosition.y);
      }
      
      controlsRef.current.update();
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
  const [viewMode, setViewMode] = useState<'firstPerson' | 'topDown'>('topDown');
  
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

  // Toggle between first person and top-down view
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'topDown' ? 'firstPerson' : 'topDown');
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
        
        {/* Player Character (only visible in top-down view) */}
        {viewMode === 'topDown' && (
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
        
        {viewMode === 'topDown' && (
          <PerspectiveCamera 
            makeDefault 
            position={[playerPosition.x, 5, playerPosition.y]} 
            fov={60 / zoom} // Adjust FOV based on zoom level
          />
        )}
        
        {viewMode === 'firstPerson' && (
          <PerspectiveCamera 
            makeDefault 
            position={[playerPosition.x, 1.5, playerPosition.y]} 
            fov={70} 
          />
        )}
      </Canvas>
      
      {/* View Mode Toggle Button */}
      <div className="absolute top-6 right-6 z-30">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-melanie-purple/30 text-white"
          onClick={toggleViewMode}
          title={viewMode === 'topDown' ? "Switch to First Person" : "Switch to Top Down"}
        >
          {viewMode === 'topDown' ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </Button>
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
