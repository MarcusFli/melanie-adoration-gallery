
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

  // Handle keyboard input with 360 degree movement
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver || won || showStory) return;
    
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;
    let newDirection = playerDirection;
    let canMove = false;
    
    switch (e.key) {
      case 'ArrowUp':
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
        
      case 'ArrowDown':
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
        
      case 'ArrowLeft':
        // Rotate counter-clockwise
        newDirection = (playerDirection + 3) % 4;
        setPlayerDirection(newDirection);
        return;
        
      case 'ArrowRight':
        // Rotate clockwise
        newDirection = (playerDirection + 1) % 4;
        setPlayerDirection(newDirection);
        return;
        
      default:
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

  // Button movement controls with 360 degree movement
  const handleButtonMove = (direction: string) => {
    if (gameOver || won || showStory) return;
    
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;
    let newDirection = playerDirection;
    let canMove = false;
    
    switch (direction) {
      case 'up':
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
        
      case 'down':
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
        
      case 'left':
        // Rotate counter-clockwise
        newDirection = (playerDirection + 3) % 4;
        setPlayerDirection(newDirection);
        return;
        
      case 'right':
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
  };

  return {
    handleKeyDown,
    handleButtonMove
  };
}
