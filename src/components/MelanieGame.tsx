
import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import MazeScene from './3D/MazeScene';
import GameControls from './game/GameControls';
import GameOverlays from './game/GameOverlays';
import GameDialogs from './game/GameDialogs';
import MusicUploader from './game/MusicUploader';
import MusicPlayer from './game/MusicPlayer';
import PDFViewer from './game/PDFViewer';
import { useGameState } from '@/hooks/useGameState';
import { useAudioManager } from '@/hooks/useAudioManager';
import { useGameControls } from '@/hooks/useGameControls';
import { Button } from './ui/button';

const MelanieGame: React.FC = () => {
  // UI state
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showAchievementDialog, setShowAchievementDialog] = useState<boolean>(false);
  const [showStory, setShowStory] = useState<boolean>(true);
  const [showPDFUploader, setShowPDFUploader] = useState<boolean>(false);
  const [showVictoryPDF, setShowVictoryPDF] = useState<boolean>(false);
  
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
    playSound,
    changeBackgroundMusic,
    currentTrack
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

  // Watch for game completion to show PDF
  useEffect(() => {
    if (gameState.gameCompleted) {
      setShowVictoryPDF(true);
    }
  }, [gameState.gameCompleted]);

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
          
          {/* Game option buttons */}
          <div className="absolute top-4 right-4 z-30 flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              className="bg-black/70 backdrop-blur-sm border border-melanie-purple/50 shadow-lg hover:bg-melanie-purple/20 hover:border-melanie-purple"
              onClick={() => setShowPDFUploader(true)}
              title="Upload Victory PDF"
            >
              <FileText className="h-5 w-5 text-melanie-purple" />
            </Button>
          </div>
          
          {/* 3D Maze render */}
          <div className="maze-container mb-4 h-96 overflow-hidden rounded-lg">
            <MazeScene 
              maze={gameState.maze}
              playerPosition={gameState.playerPosition}
              playerDirection={gameState.playerDirection}
              isMoving={gameState.isMoving}
            />
          </div>
          
          {/* Music controls */}
          <div className="flex space-x-2">
            <MusicUploader onSelectMusic={changeBackgroundMusic} />
            <MusicPlayer
              currentMusic={currentTrack}
              onSelectMusic={changeBackgroundMusic}
              soundEnabled={soundEnabled}
              toggleSound={toggleSound}
            />
          </div>
        </div>
      </div>

      {/* Modal dialogs */}
      <GameDialogs 
        showAchievementDialog={showAchievementDialog}
        setShowAchievementDialog={setShowAchievementDialog}
      />
      
      {/* PDF Uploader */}
      <PDFViewer 
        isOpen={showPDFUploader || (showVictoryPDF && gameState.gameCompleted)} 
        onClose={() => {
          setShowPDFUploader(false);
          setShowVictoryPDF(false);
        }}
        isGameCompleted={gameState.gameCompleted}
      />
      
      <style>
        {`
          @keyframes ghost-float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-5px); }
          }
          
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes spin-fast {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default MelanieGame;
