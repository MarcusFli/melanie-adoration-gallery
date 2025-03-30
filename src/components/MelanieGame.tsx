
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, 
  Trophy, Volume2, VolumeX, Cat, HeartCrack, Sparkles
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { generateMaze } from '@/utils/mazeGenerator';
import MazeScene from './3D/MazeScene';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ImageLoader from './ImageLoader';

// Game constants
const INITIAL_MAZE_SIZE = 5;
const MAX_MAZE_SIZE = 15;

const MelanieGame: React.FC = () => {
  // Game state
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showAchievementDialog, setShowAchievementDialog] = useState<boolean>(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [showStory, setShowStory] = useState<boolean>(true);
  
  // Maze state
  const [maze, setMaze] = useState(generateMaze(INITIAL_MAZE_SIZE, INITIAL_MAZE_SIZE, 1));
  const [playerPosition, setPlayerPosition] = useState({ x: maze.startPosition.x, y: maze.startPosition.y });
  const [playerDirection, setPlayerDirection] = useState<number>(1); // 0: north, 1: east, 2: south, 3: west
  
  // Audio refs
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const effectsAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize game
  useEffect(() => {
    startGame();
    
    // Initialize audio
    const audio = new Audio('/lovable-uploads/c933c249-c927-447f-8e72-a4c08a0764e9.png');
    audio.loop = true;
    audio.volume = 0.4;
    backgroundAudioRef.current = audio;
    
    const effectsAudio = new Audio();
    effectsAudio.volume = 0.6;
    effectsAudioRef.current = effectsAudio;
    
    // Clean up audio on component unmount
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current.src = '';
      }
      
      if (effectsAudioRef.current) {
        effectsAudioRef.current.pause();
        effectsAudioRef.current.src = '';
      }
    };
  }, []);

  // Toggle sound
  const toggleSound = () => {
    if (backgroundAudioRef.current) {
      if (soundEnabled) {
        backgroundAudioRef.current.pause();
      } else {
        backgroundAudioRef.current.play().catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
      setSoundEnabled(!soundEnabled);
    }
  };

  // Play soundtrack when game starts
  useEffect(() => {
    if (backgroundAudioRef.current && soundEnabled && !gameOver) {
      backgroundAudioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
        setSoundEnabled(false);
      });
    }
  }, [soundEnabled, gameOver]);

  const startGame = () => {
    // Reset game state
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setAchievementUnlocked(false);
    
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

  // Play sound effects
  const playSound = (type: 'move' | 'wall' | 'win' | 'lose') => {
    if (!soundEnabled || !effectsAudioRef.current) return;
    
    let soundUrl = '';
    switch(type) {
      case 'move':
        soundUrl = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA8DcwePbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
        effectsAudioRef.current.volume = 0.3;
        break;
      case 'wall':
        soundUrl = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA8DI8Y/UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
        effectsAudioRef.current.volume = 0.4;
        break;
      case 'win':
        soundUrl = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAEAAAGLwCEhISEhISEhISEhISEhISEhKurq6urq6urq6urq6urq6ur0dHR0dHR0dHR0dHR0dHR0dH///////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAABi9CTsEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
        effectsAudioRef.current.volume = 0.6;
        break;
      case 'lose':
        soundUrl = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAEAAAGvQCbm5ubm5ubm5ubm5ubm5ubm8PDw8PDw8PDw8PDw8PDw8PD5OTk5OTk5OTk5OTk5OTk5OT///////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAABr125J/jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
        effectsAudioRef.current.volume = 0.5;
        break;
    }
    
    if (soundUrl) {
      effectsAudioRef.current.src = soundUrl;
      effectsAudioRef.current.play().catch(err => {
        console.error("Sound effect failed:", err);
      });
    }
  };

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
      movePlayer(newX, newY);
    } else if (newX !== x || newY !== y) {
      // Hit a wall
      playSound('wall');
    }
  }, [playerPosition, playerDirection, maze, gameOver, won, showStory]);

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
      movePlayer(newX, newY);
    } else if (newX !== x || newY !== y) {
      // Hit a wall
      playSound('wall');
    }
  };

  const movePlayer = (newX: number, newY: number) => {
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
          setShowAchievementDialog(true);
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

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-black/60 border border-melanie-purple/30 rounded-lg p-4 mb-6 text-center w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white">
            <span className="text-gray-400">Nivel:</span> {level}
          </div>
          <div className="text-xl font-bold text-melanie-purple">
            {gameOver ? "Game Over" : won ? "¡Nivel completado!" : "Melanie's Lost Cat"}
          </div>
          <div className="text-white">
            <span className="text-gray-400">Movimientos:</span> {score}
          </div>
        </div>
        
        <div className="relative mx-auto w-full">
          {/* Sound toggle */}
          <div className="absolute top-2 right-2 z-10">
            <Button 
              variant="outline" 
              size="icon"
              className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30 h-8 w-8"
              onClick={toggleSound}
            >
              {soundEnabled ? 
                <Volume2 className="h-4 w-4 text-white" /> : 
                <VolumeX className="h-4 w-4 text-white" />
              }
            </Button>
          </div>
          
          {/* Story overlay */}
          {showStory && (
            <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center p-6 rounded-lg">
              <div className="mb-6 max-w-md text-center">
                <HeartCrack className="w-12 h-12 text-melanie-purple mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-white mb-4">¡El gato de Melanie se ha perdido!</h3>
                <p className="text-gray-300 mb-4">
                  Melanie está desesperada por encontrar a su amado gato que se ha perdido en un laberinto
                  misterioso. Ayúdala a navegar por los 10 niveles para reunirse con su mascota.
                </p>
                <p className="text-gray-300 mb-4">
                  Con cada nivel, el laberinto se vuelve más grande y complejo. ¡Usa las flechas para moverte 
                  y encuentra el camino!
                </p>
                <div className="bg-melanie-purple/20 p-4 rounded-lg">
                  <p className="text-white text-sm">
                    <strong>Controles:</strong> Usa las flechas para moverte. Primero giras en la dirección 
                    que quieres ir, luego avanzas presionando la misma tecla nuevamente.
                  </p>
                </div>
              </div>
              <Button
                className="bg-melanie-purple hover:bg-melanie-purple/80"
                onClick={() => setShowStory(false)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Comenzar Aventura
              </Button>
            </div>
          )}
          
          {/* 3D Maze render */}
          <div className="maze-container mb-4 h-96 overflow-hidden rounded-lg">
            <MazeScene 
              maze={maze}
              playerPosition={playerPosition}
              playerDirection={playerDirection}
              isMoving={isMoving}
            />
          </div>
          
          {/* Game over overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded">
              <Skull className="w-16 h-16 text-melanie-purple mb-4" />
              <p className="text-xl text-white mb-4">¡Te has perdido en el laberinto!</p>
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
          <p>Ayuda a Melanie a encontrar a su gato perdido en este misterioso laberinto.</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Cat className="w-4 h-4 text-melanie-purple" />
            <span>Nivel {level}/10</span>
          </div>
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
              Has alcanzado el nivel 10 y revelado la verdadera identidad del gato
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="relative w-64 h-64 mb-4 rounded-lg overflow-hidden border-4 border-melanie-purple/50 shadow-lg shadow-melanie-purple/30">
              <ImageLoader
                src="/lovable-uploads/f15488f5-ed08-4d00-9aee-533cd4744d7c.png"
                alt="Gato mágico"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">¡Un gato mágico!</h3>
            <p className="text-center text-gray-300">
              Este gato especial tiene poderes místicos y ha elegido a Melanie como su compañera. ¡Completa todos los niveles para desbloquear su historia completa!
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
      
      {/* Help dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="absolute bottom-4 right-4 bg-black/40 border-melanie-purple/30">
            ?
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-black border border-melanie-purple/50 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Cómo jugar</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              <ul className="list-disc pl-5 space-y-2">
                <li>Usa las flechas del teclado o los botones en pantalla para moverte</li>
                <li>Primero apuntas en la dirección que quieres ir, luego avanzas</li>
                <li>Encuentra al gato para pasar al siguiente nivel</li>
                <li>El objetivo es superar los 10 niveles</li>
                <li>Con cada nivel, el laberinto se hace más grande y complejo</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-melanie-purple hover:bg-melanie-purple/80">Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <style>
        {`
          @keyframes ghost-float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
};

export default MelanieGame;
