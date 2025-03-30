
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

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver || won || showStory) return;
    
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;
    let newDirection = playerDirection;
    let canMove = false;
    
    switch (e.key) {
      case 'ArrowUp':
        if (playerDirection === 0) { // Already facing north
          newY -= 1;
          canMove = !maze.grid[y][x].walls.top;
        } else {
          newDirection = 0; // Turn to face north
        }
        break;
      case 'ArrowDown':
        if (playerDirection === 2) { // Already facing south
          newY += 1;
          canMove = !maze.grid[y][x].walls.bottom;
        } else {
          newDirection = 2; // Turn to face south
        }
        break;
      case 'ArrowLeft':
        if (playerDirection === 3) { // Already facing west
          newX -= 1;
          canMove = !maze.grid[y][x].walls.left;
        } else {
          newDirection = 3; // Turn to face west
        }
        break;
      case 'ArrowRight':
        if (playerDirection === 1) { // Already facing east
          newX += 1;
          canMove = !maze.grid[y][x].walls.right;
        } else {
          newDirection = 1; // Turn to face east
        }
        break;
      default:
        return;
    }
    
    // Always update direction
    setPlayerDirection(newDirection);
    
    // Try to move if facing the right direction
    if (canMove) {
      movePlayer(newX, newY, playSound);
    } else if (newX !== x || newY !== y) {
      // Hit a wall
      playSound('wall');
    }
  }, [playerPosition, playerDirection, maze, gameOver, won, showStory, setPlayerDirection, movePlayer, playSound]);

  // Button movement controls
  const handleButtonMove = (direction: string) => {
    if (gameOver || won || showStory) return;
    
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;
    let newDirection = playerDirection;
    let canMove = false;
    
    switch (direction) {
      case 'up':
        if (playerDirection === 0) { // Already facing north
          newY -= 1;
          canMove = !maze.grid[y][x].walls.top;
        } else {
          newDirection = 0; // Turn to face north
        }
        break;
      case 'down':
        if (playerDirection === 2) { // Already facing south
          newY += 1;
          canMove = !maze.grid[y][x].walls.bottom;
        } else {
          newDirection = 2; // Turn to face south
        }
        break;
      case 'left':
        if (playerDirection === 3) { // Already facing west
          newX -= 1;
          canMove = !maze.grid[y][x].walls.left;
        } else {
          newDirection = 3; // Turn to face west
        }
        break;
      case 'right':
        if (playerDirection === 1) { // Already facing east
          newX += 1;
          canMove = !maze.grid[y][x].walls.right;
        } else {
          newDirection = 1; // Turn to face east
        }
        break;
    }
    
    // Always update direction
    setPlayerDirection(newDirection);
    
    // Try to move if facing the right direction
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
