
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
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
  zoom
}: { 
  playerPosition: { x: number; y: number }; 
  playerDirection: number;
  zoom: number;
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  
  useEffect(() => {
    if (controlsRef.current) {
      // Set zoom level
      camera.position.set(
        playerPosition.x,
        2.5 / zoom, // Adjust height based on zoom
        playerPosition.y
      );
      controlsRef.current.update();
    }
  }, [playerPosition, zoom, camera]);
  
  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      maxPolarAngle={Math.PI / 2 - 0.1}
      minPolarAngle={0.1}
      maxDistance={10}
      minDistance={1}
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
  
  // Handle zoom controls
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        // Zoom in
        setZoom(prev => Math.min(prev + 0.1, 2));
      } else {
        // Zoom out
        setZoom(prev => Math.max(prev - 0.1, 0.5));
      }
    };
    
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <Canvas>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        
        {/* Maze Ceiling */}
        <MazeCeiling 
          width={maze.width} 
          height={maze.height} 
          position={[maze.width / 2 - 0.5, 2, maze.height / 2 - 0.5]} 
        />
        
        {/* Maze Floor */}
        <MazeFloor 
          width={maze.width} 
          height={maze.height} 
          position={[maze.width / 2 - 0.5, 0, maze.height / 2 - 0.5]} 
        />
        
        {/* Maze Walls */}
        {maze.grid.map((row, y) => 
          row.map((cell, x) => (
            <React.Fragment key={`${x}-${y}`}>
              {cell.walls.top && (
                <MazeWall 
                  position={[x, 1, y - 0.5]} 
                  rotation={[0, 0, 0]} 
                  positionType={cell.specialPosition ? cell.specialPosition : 'normal'}
                />
              )}
              {cell.walls.right && (
                <MazeWall 
                  position={[x + 0.5, 1, y]} 
                  rotation={[0, Math.PI / 2, 0]} 
                  positionType={cell.specialPosition ? cell.specialPosition : 'normal'}
                />
              )}
              {cell.walls.bottom && (
                <MazeWall 
                  position={[x, 1, y + 0.5]} 
                  rotation={[0, 0, 0]} 
                  positionType={cell.specialPosition ? cell.specialPosition : 'normal'}
                />
              )}
              {cell.walls.left && (
                <MazeWall 
                  position={[x - 0.5, 1, y]} 
                  rotation={[0, Math.PI / 2, 0]} 
                  positionType={cell.specialPosition ? cell.specialPosition : 'normal'}
                />
              )}
            </React.Fragment>
          ))
        )}
        
        {/* Player Character */}
        <MelanieCharacter 
          position={[playerPosition.x, 0.3, playerPosition.y]} 
          direction={playerDirection}
          isMoving={isMoving}
        />
        
        {/* Cat (End Goal) */}
        <CatModel 
          position={[maze.endPosition.x, 0.25, maze.endPosition.y]} 
        />
        
        {/* Camera Controls */}
        <CameraController 
          playerPosition={playerPosition} 
          playerDirection={playerDirection}
          zoom={zoom}
        />
        
        <PerspectiveCamera 
          makeDefault 
          position={[playerPosition.x, 2.5, playerPosition.y]} 
          fov={60 / zoom} // Adjust FOV based on zoom level
        />
      </Canvas>
      
      {/* Zoom Controls UI */}
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
    </div>
  );
};

export default MazeScene;
