
import React, { useState, useEffect } from 'react';
import { Cat } from 'lucide-react';
import MazeScene from './3D/MazeScene';
import GameControls from './game/GameControls';
import GameOverlays from './game/GameOverlays';
import GameDialogs from './game/GameDialogs';
import { useGameState } from '@/hooks/useGameState';
import { useAudioManager } from '@/hooks/useAudioManager';
import { useGameControls } from '@/hooks/useGameControls';

const MelanieGame: React.FC = () => {
  // UI state
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showAchievementDialog, setShowAchievementDialog] = useState<boolean>(false);
  const [showStory, setShowStory] = useState<boolean>(true);
  
  // Game hooks
  const { 
    gameState, 
    setAchievementUnlocked, 
    setGameOver, 
    setPlayerDirection, 
    movePlayer, 
    startGame 
  } = useGameState();
  
  const { 
    soundEnabled, 
    toggleSound, 
    playSound 
  } = useAudioManager();
  
  const { 
    handleKeyDown, 
    handleButtonMove 
  } = useGameControls({ 
    gameState, 
    setPlayerDirection, 
    movePlayer, 
    playSound,
    showStory
  });
  
  // Initialize game
  useEffect(() => {
    startGame();
  }, []);

  // Watch for achievement unlocks to show dialog
  useEffect(() => {
    if (gameState.achievementUnlocked && !showAchievementDialog) {
      setShowAchievementDialog(true);
    }
  }, [gameState.achievementUnlocked, showAchievementDialog]);

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
            <span className="text-gray-400">Nivel:</span> {gameState.level}
          </div>
          <div className="text-xl font-bold text-melanie-purple">
            {gameState.gameOver ? "Game Over" : gameState.won ? "¡Nivel completado!" : "Melanie's Lost Cat"}
          </div>
          <div className="text-white">
            <span className="text-gray-400">Movimientos:</span> {gameState.score}
          </div>
        </div>
        
        <div className="relative mx-auto w-full">
          <GameControls 
            showControls={showControls}
            setShowControls={setShowControls}
            handleButtonMove={handleButtonMove}
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
          />
          
          <GameOverlays 
            gameState={gameState}
            showStory={showStory}
            setShowStory={setShowStory}
            startGame={startGame}
          />
          
          {/* 3D Maze render */}
          <div className="maze-container mb-4 h-96 overflow-hidden rounded-lg">
            <MazeScene 
              maze={gameState.maze}
              playerPosition={gameState.playerPosition}
              playerDirection={gameState.playerDirection}
              isMoving={gameState.isMoving}
            />
          </div>
        </div>
      </div>

      <GameDialogs 
        showAchievementDialog={showAchievementDialog}
        setShowAchievementDialog={setShowAchievementDialog}
      />
      
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
