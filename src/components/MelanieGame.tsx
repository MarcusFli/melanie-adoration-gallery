
import React, { useState, useEffect, useCallback } from 'react';
import { Ghost, Heart, Skull, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import ImageLoader from './ImageLoader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Game constants
const GRID_SIZE = 10;
const GHOST_COUNT = 5;
const SPEED = 200; // ms per move
const ACHIEVEMENT_LEVEL = 10;

interface Position {
  x: number;
  y: number;
}

interface GameEntity extends Position {
  id: number;
}

const MelanieGame: React.FC = () => {
  const [melanie, setMelanie] = useState<Position>({ x: 0, y: 0 });
  const [lover, setLover] = useState<Position>({ x: GRID_SIZE - 1, y: GRID_SIZE - 1 });
  const [ghosts, setGhosts] = useState<GameEntity[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showAchievementDialog, setShowAchievementDialog] = useState<boolean>(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState<boolean>(false);

  // Initialize game
  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    // Reset game state
    setMelanie({ x: 0, y: 0 });
    setLover({ x: GRID_SIZE - 1, y: GRID_SIZE - 1 });
    setGameOver(false);
    setWon(false);
    setScore(0);
    setLevel(1);
    setAchievementUnlocked(false);
    
    // Create initial ghosts
    const initialGhosts = [];
    for (let i = 0; i < GHOST_COUNT; i++) {
      initialGhosts.push({
        id: i,
        x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
        y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
      });
    }
    setGhosts(initialGhosts);
    
    toast({
      title: "¡Comienza la aventura!",
      description: "Ayuda a Melanie a encontrar a su amado. Usa las flechas para moverte.",
      variant: "default",
      className: "bg-melanie-purple text-white"
    });
  };

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver || won) return;
    
    let newX = melanie.x;
    let newY = melanie.y;
    
    switch (e.key) {
      case 'ArrowUp':
        newY = Math.max(0, melanie.y - 1);
        break;
      case 'ArrowDown':
        newY = Math.min(GRID_SIZE - 1, melanie.y + 1);
        break;
      case 'ArrowLeft':
        newX = Math.max(0, melanie.x - 1);
        break;
      case 'ArrowRight':
        newX = Math.min(GRID_SIZE - 1, melanie.x + 1);
        break;
      default:
        return;
    }
    
    movePlayer(newX, newY);
  }, [melanie, gameOver, won, ghosts]);

  // Button movement controls
  const handleButtonMove = (direction: string) => {
    if (gameOver || won) return;
    
    let newX = melanie.x;
    let newY = melanie.y;
    
    switch (direction) {
      case 'up':
        newY = Math.max(0, melanie.y - 1);
        break;
      case 'down':
        newY = Math.min(GRID_SIZE - 1, melanie.y + 1);
        break;
      case 'left':
        newX = Math.max(0, melanie.x - 1);
        break;
      case 'right':
        newX = Math.min(GRID_SIZE - 1, melanie.x + 1);
        break;
    }
    
    movePlayer(newX, newY);
  };

  const movePlayer = (newX: number, newY: number) => {
    // Update Melanie's position
    setMelanie({ x: newX, y: newY });
    setScore(prevScore => prevScore + 1);
    
    // Check if reached lover
    if (newX === lover.x && newY === lover.y) {
      setWon(true);
      toast({
        title: "¡Victoria!",
        description: `¡Melanie encontró a su amado! Nivel ${level} completado con ${score} puntos.`,
        variant: "default",
        className: "bg-green-500 text-white"
      });
      
      // Level up
      setTimeout(() => {
        const newLevel = level + 1;
        setLevel(newLevel);
        
        // Check for achievement
        if (newLevel === ACHIEVEMENT_LEVEL && !achievementUnlocked) {
          setAchievementUnlocked(true);
          setShowAchievementDialog(true);
        }
        
        const newGhostCount = GHOST_COUNT + level;
        const newGhosts = [];
        for (let i = 0; i < newGhostCount; i++) {
          newGhosts.push({
            id: i,
            x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
            y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
          });
        }
        setGhosts(newGhosts);
        setMelanie({ x: 0, y: 0 });
        setWon(false);
        
        toast({
          title: `¡Nivel ${newLevel}!`,
          description: "Los fantasmas son más numerosos ahora. ¡Ten cuidado!",
          variant: "default",
          className: "bg-melanie-purple text-white"
        });
      }, 2000);
    }
    
    // Move ghosts
    moveGhosts();
  };

  const moveGhosts = () => {
    const newGhosts = ghosts.map(ghost => {
      // Random movement
      const direction = Math.floor(Math.random() * 4);
      let newX = ghost.x;
      let newY = ghost.y;
      
      switch (direction) {
        case 0: // up
          newY = Math.max(0, ghost.y - 1);
          break;
        case 1: // down
          newY = Math.min(GRID_SIZE - 1, ghost.y + 1);
          break;
        case 2: // left
          newX = Math.max(0, ghost.x - 1);
          break;
        case 3: // right
          newX = Math.min(GRID_SIZE - 1, ghost.x + 1);
          break;
      }
      
      return { ...ghost, x: newX, y: newY };
    });
    
    setGhosts(newGhosts);
    
    // Check for collisions
    checkCollisions(newGhosts);
  };

  const checkCollisions = (currentGhosts: GameEntity[]) => {
    // Check if Melanie collided with any ghost
    const collision = currentGhosts.some(ghost => 
      ghost.x === melanie.x && ghost.y === melanie.y
    );
    
    if (collision) {
      setGameOver(true);
      toast({
        title: "¡Juego terminado!",
        description: `Los fantasmas atraparon a Melanie. Puntuación final: ${score}`,
        variant: "destructive"
      });
    }
  };

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Render the game grid
  const renderGrid = () => {
    const grid = [];
    
    for (let y = 0; y < GRID_SIZE; y++) {
      const row = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        // Determine cell content
        let content = null;
        let cellClass = "bg-melanie-purple-dark/20 border border-melanie-purple/20";
        
        // Check if Melanie is here
        if (melanie.x === x && melanie.y === y) {
          // Show Melanie's image instead of "M" text
          content = (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-full overflow-hidden rounded-full">
                <ImageLoader
                  src="/lovable-uploads/3a61898a-222f-4f13-bd6f-7ca84930e572.png"
                  alt="Melanie"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
          cellClass = "bg-melanie-purple/40 border border-melanie-purple/50";
        }
        // Check if lover is here
        else if (lover.x === x && lover.y === y) {
          content = <Heart className="w-5 h-5 text-red-500" />;
          cellClass = "bg-melanie-purple/10 border border-melanie-purple/50";
        }
        // Check if any ghost is here
        else {
          const ghost = ghosts.find(g => g.x === x && g.y === y);
          if (ghost) {
            content = <Ghost className="w-5 h-5 text-white/70" />;
            cellClass = "bg-black/50 border border-melanie-purple/30";
          }
        }
        
        row.push(
          <div key={`${x}-${y}`} className={`w-full aspect-square ${cellClass} flex items-center justify-center`}>
            {content}
          </div>
        );
      }
      grid.push(
        <div key={y} className="flex">
          {row}
        </div>
      );
    }
    
    return grid;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-black/60 border border-melanie-purple/30 rounded-lg p-4 mb-6 text-center w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white">
            <span className="text-gray-400">Nivel:</span> {level}
          </div>
          <div className="text-xl font-bold text-melanie-purple">
            {gameOver ? "Game Over" : won ? "¡Victoria!" : "Melanie's Nightmare"}
          </div>
          <div className="text-white">
            <span className="text-gray-400">Puntos:</span> {score}
          </div>
        </div>
        
        <div className="relative mx-auto w-full max-w-lg">
          {/* Game board */}
          <div className="grid-container mb-4">
            {renderGrid()}
          </div>
          
          {/* Game over overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded">
              <Skull className="w-16 h-16 text-melanie-purple mb-4" />
              <p className="text-xl text-white mb-4">¡Los fantasmas atraparon a Melanie!</p>
              <Button 
                className="bg-melanie-purple hover:bg-melanie-purple/80"
                onClick={startGame}
              >
                Intentar de nuevo
              </Button>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="mt-4">
          <button 
            className="text-white text-sm mb-2 hover:text-melanie-purple"
            onClick={() => setShowControls(!showControls)}
          >
            {showControls ? "Ocultar controles" : "Mostrar controles"}
          </button>
          
          {showControls && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30"
                  onClick={() => handleButtonMove('up')}
                >
                  <ArrowUp className="h-4 w-4 text-white" />
                </Button>
              </div>
              <div className="flex justify-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30"
                  onClick={() => handleButtonMove('left')}
                >
                  <ArrowLeft className="h-4 w-4 text-white" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30"
                  onClick={() => handleButtonMove('down')}
                >
                  <ArrowDown className="h-4 w-4 text-white" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30"
                  onClick={() => handleButtonMove('right')}
                >
                  <ArrowRight className="h-4 w-4 text-white" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-1">También puedes usar las teclas de dirección</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-gray-400 text-sm">
          <p>Ayuda a Melanie a llegar hasta su amado (♥) evitando a los fantasmas.</p>
        </div>
      </div>

      {/* Level 10 Achievement Dialog */}
      <Dialog open={showAchievementDialog} onOpenChange={setShowAchievementDialog}>
        <DialogContent className="bg-black border border-melanie-purple/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2 text-melanie-purple">
              <Trophy className="h-6 w-6" /> ¡Logro Desbloqueado!
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Has alcanzado el nivel {ACHIEVEMENT_LEVEL} y desbloqueado un nuevo personaje
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="relative w-64 h-64 mb-4 rounded-lg overflow-hidden border-4 border-melanie-purple/50 shadow-lg shadow-melanie-purple/30">
              <ImageLoader
                src="/lovable-uploads/f15488f5-ed08-4d00-9aee-533cd4744d7c.png"
                alt="Personaje desbloqueado"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">¡Amigo secreto de Melanie!</h3>
            <p className="text-center text-gray-300">
              Este personaje especial aparecerá en tus próximas aventuras. ¡Continúa jugando para descubrir más sorpresas!
            </p>
          </div>
          <div className="flex justify-center">
            <Button 
              className="bg-melanie-purple hover:bg-melanie-purple/80"
              onClick={() => setShowAchievementDialog(false)}
            >
              Continuar la aventura
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MelanieGame;
