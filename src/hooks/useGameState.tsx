
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { generateMaze } from '@/utils/mazeGenerator';

// Game constants
const INITIAL_MAZE_SIZE = 5;
const MAX_MAZE_SIZE = 15;
const MAX_LEVEL = 10;

export interface GameState {
  level: number;
  score: number;
  gameOver: boolean;
  won: boolean;
  achievementUnlocked: boolean;
  maze: ReturnType<typeof generateMaze>;
  playerPosition: { x: number; y: number };
  playerDirection: number; // 0: north, 1: east, 2: south, 3: west
  isMoving: boolean;
  gameCompleted: boolean;
}

export function useGameState() {
  // Game state
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  
  // Maze state
  const [maze, setMaze] = useState(() => generateMaze(INITIAL_MAZE_SIZE, INITIAL_MAZE_SIZE, 1));
  const [playerPosition, setPlayerPosition] = useState({ 
    x: 0, 
    y: 0 
  });
  const [playerDirection, setPlayerDirection] = useState<number>(1); // 0: north, 1: east, 2: south, 3: west
  
  // Initialize player position when maze changes
  useEffect(() => {
    setPlayerPosition({ 
      x: maze.startPosition.x, 
      y: maze.startPosition.y 
    });
  }, [maze]);

  const startGame = () => {
    // Reset game state
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setAchievementUnlocked(false);
    setGameCompleted(false);
    
    // Generate a new maze for level 1
    const newMaze = generateMaze(INITIAL_MAZE_SIZE, INITIAL_MAZE_SIZE, 1);
    setMaze(newMaze);
    setPlayerPosition({ x: newMaze.startPosition.x, y: newMaze.startPosition.y });
    setPlayerDirection(1); // Looking east initially
    
    toast({
      title: "¡Comienza la aventura!",
      description: "Ayuda a Melanie a encontrar a su gato perdido. Usa las flechas para moverte.",
      variant: "default",
      className: "bg-melanie-purple text-white"
    });
  };

  const movePlayer = (newX: number, newY: number, playSound: (type: 'move' | 'wall' | 'win' | 'lose') => void) => {
    // Play movement sound
    playSound('move');
    
    // Show movement animation
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 300);
    
    // Update player position
    setPlayerPosition({ x: newX, y: newY });
    setScore(prevScore => prevScore + 1);
    
    // Check if reached end (cat)
    if (newX === maze.endPosition.x && newY === maze.endPosition.y) {
      setWon(true);
      playSound('win');
      
      // Check if player completed the final level
      if (level === MAX_LEVEL) {
        setGameCompleted(true);
        toast({
          title: "¡Felicidades!",
          description: "¡Has completado todos los niveles y encontrado al gato de Melanie!",
          variant: "default",
          className: "bg-green-500 text-white"
        });
        return;
      }
      
      toast({
        title: "¡Nivel completado!",
        description: `Melanie ha avanzado al nivel ${level + 1}.`,
        variant: "default",
        className: "bg-green-500 text-white"
      });
      
      // Level up
      setTimeout(() => {
        const newLevel = level + 1;
        setLevel(newLevel);
        
        // Check for achievement at level 10
        if (newLevel === 10 && !achievementUnlocked) {
          setAchievementUnlocked(true);
        }
        
        // Generate a new, larger maze
        const newSize = Math.min(INITIAL_MAZE_SIZE + Math.floor(newLevel / 2), MAX_MAZE_SIZE);
        const newMaze = generateMaze(newSize, newSize, newLevel);
        setMaze(newMaze);
        setPlayerPosition({ x: newMaze.startPosition.x, y: newMaze.startPosition.y });
        setWon(false);
        
        toast({
          title: `¡Nivel ${newLevel}!`,
          description: "El laberinto se vuelve más complejo. ¡Sigue buscando a tu gato!",
          variant: "default",
          className: "bg-melanie-purple text-white"
        });
      }, 2000);
    }
  };

  return {
    gameState: {
      level,
      score,
      gameOver,
      won,
      achievementUnlocked,
      maze,
      playerPosition,
      playerDirection,
      isMoving,
      gameCompleted
    },
    setAchievementUnlocked,
    setGameOver,
    setPlayerDirection,
    movePlayer,
    startGame
  };
}
