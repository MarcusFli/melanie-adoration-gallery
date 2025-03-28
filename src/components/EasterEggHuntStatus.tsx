
import React from 'react';
import { useEasterEggs } from '../context/EasterEggContext';
import { Button } from '@/components/ui/button';
import { Award, Timer, Lock, LockOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const EasterEggHuntStatus: React.FC = () => {
  const { 
    collectedEggs, 
    totalEggs, 
    timeRemaining, 
    isHuntActive,
    hasCompletedHunt,
    startHunt 
  } = useEasterEggs();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Positioned on the right side, with more space from the top to avoid overlapping the navbar
  if (!isHuntActive && !hasCompletedHunt) {
    return (
      <div className="fixed top-32 right-4 z-40">
        <Button 
          onClick={startHunt}
          className="bg-melanie-purple hover:bg-melanie-purple/80"
        >
          <Award className="mr-2 h-4 w-4" />
          Iniciar Búsqueda de Huevos
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-32 right-4 z-40 flex flex-col items-end gap-4">
      {/* Show Secret Gallery link if hunt is completed */}
      {hasCompletedHunt && (
        <Link to="/secret-gallery">
          <Button className="bg-green-500 hover:bg-green-600">
            <LockOpen className="mr-2 h-4 w-4" />
            Galería Secreta
          </Button>
        </Link>
      )}
      
      {/* Hunt controls */}
      {!isHuntActive && hasCompletedHunt ? (
        <Button 
          onClick={startHunt}
          className="bg-green-500 hover:bg-green-600"
        >
          <Award className="mr-2 h-4 w-4" />
          ¡Completado! Jugar de nuevo
        </Button>
      ) : isHuntActive && (
        <div className="flex items-center gap-4">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-melanie-purple/30">
            <div className="flex items-center gap-2 text-white">
              <Award className="h-4 w-4 text-melanie-purple" />
              <span>{collectedEggs.length}/{totalEggs} Huevos</span>
            </div>
          </div>
          {timeRemaining !== null && (
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-melanie-purple/30">
              <div className="flex items-center gap-2 text-white">
                <Timer className="h-4 w-4 text-melanie-purple" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EasterEggHuntStatus;
