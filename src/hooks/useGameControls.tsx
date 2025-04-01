
import { useCallback } from 'react';
import { GameState } from './useGameState';

interface UseGameControlsProps {
  gameState: GameState;
  setPlayerDirection: (direction: number) => void;
  movePlayer: (newX: number, newY: number, playSound: (type: 'move' | 'wall' | 'win' | 'lose') => void) => void;
  playSound: (type: 'move' | 'wall' | 'win' | 'lose') => void;
  showStory: boolean;
}

export function useGameControls({ 
  gameState, 
  setPlayerDirection, 
  movePlayer, 
  playSound,
  showStory
}: UseGameControlsProps) {
  const { playerPosition, playerDirection, maze, gameOver, won } = gameState;

  // Process movement based on direction
  const processMovement = useCallback((moveDirection: 'forward' | 'backward' | 'rotateLeft' | 'rotateRight') => {
    if (gameOver || won || showStory) return;
    
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;
    let newDirection = playerDirection;
    let canMove = false;
    
    switch (moveDirection) {
      case 'forward':
        // Move forward in the current direction
        switch (playerDirection) {
          case 0: // North
            newY -= 1;
            canMove = !maze.grid[y][x].walls.top;
            break;
          case 1: // East
            newX += 1;
            canMove = !maze.grid[y][x].walls.right;
            break;
          case 2: // South
            newY += 1;
            canMove = !maze.grid[y][x].walls.bottom;
            break;
          case 3: // West
            newX -= 1;
            canMove = !maze.grid[y][x].walls.left;
            break;
        }
        break;
        
      case 'backward':
        // Move backward in the current direction
        switch (playerDirection) {
          case 0: // North (backwards = South)
            newY += 1;
            canMove = !maze.grid[y][x].walls.bottom;
            break;
          case 1: // East (backwards = West)
            newX -= 1;
            canMove = !maze.grid[y][x].walls.left;
            break;
          case 2: // South (backwards = North)
            newY -= 1;
            canMove = !maze.grid[y][x].walls.top;
            break;
          case 3: // West (backwards = East)
            newX += 1;
            canMove = !maze.grid[y][x].walls.right;
            break;
        }
        break;
        
      case 'rotateLeft':
        // Rotate counter-clockwise
        newDirection = (playerDirection + 3) % 4;
        setPlayerDirection(newDirection);
        return;
        
      case 'rotateRight':
        // Rotate clockwise
        newDirection = (playerDirection + 1) % 4;
        setPlayerDirection(newDirection);
        return;
    }
    
    // Try to move
    if (canMove) {
      movePlayer(newX, newY, playSound);
    } else if (newX !== x || newY !== y) {
      // Hit a wall
      playSound('wall');
    }
  }, [playerPosition, playerDirection, maze, gameOver, won, showStory, setPlayerDirection, movePlayer, playSound]);

  // Handle keyboard input with support for both WASD and arrow keys
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default behavior for game control keys to avoid scrolling
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
      e.preventDefault();
    }
    
    switch (e.key) {
      // Forward movement
      case 'ArrowUp':
      case 'w':
      case 'W':
        processMovement('forward');
        break;
        
      // Backward movement
      case 'ArrowDown':
      case 's':
      case 'S':
        processMovement('backward');
        break;
        
      // Rotate left
      case 'ArrowLeft':
      case 'a':
      case 'A':
        processMovement('rotateLeft');
        break;
        
      // Rotate right
      case 'ArrowRight':
      case 'd':
      case 'D':
        processMovement('rotateRight');
        break;
        
      default:
        return;
    }
  }, [processMovement]);

  // Button movement controls with 360 degree movement
  const handleButtonMove = (direction: string) => {
    switch (direction) {
      case 'up':
        processMovement('forward');
        break;
      case 'down':
        processMovement('backward');
        break;
      case 'left':
        processMovement('rotateLeft');
        break;
      case 'right':
        processMovement('rotateRight');
        break;
    }
  };

  return {
    handleKeyDown,
    handleButtonMove
  };
}
